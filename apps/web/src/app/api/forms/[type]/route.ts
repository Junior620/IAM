import { formSubmissionSchema, submissionTypeSchema } from "@iam/contracts";
import { escapeHtml, getMailProvider } from "@/lib/server/mail";
import { getRateLimiter, requestFingerprint } from "@/lib/server/rate-limit";
import { publicError } from "@/lib/server/configuration";
import { verifyTurnstile } from "@/lib/server/turnstile";

const recipients = {
  contact: "IAM_CONTACT_EMAIL",
  partnership: "IAM_PARTNERSHIPS_EMAIL",
  science: "IAM_SCIENCE_EMAIL",
  expert: "IAM_SCIENCE_EMAIL",
  training: "IAM_CONTACT_EMAIL",
  event: "IAM_CONTACT_EMAIL",
  shortage: "IAM_PHARMACEUTICAL_ALERTS_EMAIL",
  media: "IAM_MEDIA_EMAIL",
  project: "IAM_PARTNERSHIPS_EMAIL",
  philanthropy: "IAM_PHILANTHROPY_EMAIL",
} as const;

export async function POST(
  request: Request,
  context: RouteContext<"/api/forms/[type]">,
) {
  const { type } = await context.params;
  const typeResult = submissionTypeSchema.safeParse(type);
  if (!typeResult.success)
    return Response.json({ error: "Unknown form" }, { status: 404 });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const locale =
    typeof raw === "object" && raw && "locale" in raw && raw.locale === "en"
      ? "en"
      : "fr";
  const parsed = formSubmissionSchema.safeParse({
    ...(raw as object),
    type: typeResult.data,
  });
  if (!parsed.success) {
    return Response.json(
      {
        error:
          locale === "en"
            ? "Please check the required fields."
            : "Vérifiez les champs obligatoires.",
      },
      { status: 400 },
    );
  }
  if (parsed.data.website) return Response.json({ ok: true });

  const limiter = getRateLimiter();
  if (limiter) {
    const rate = await limiter.limit(`${type}:${requestFingerprint(request)}`);
    if (!rate.success)
      return Response.json({ error: "Too many requests" }, { status: 429 });
  } else if (process.env.NODE_ENV === "production") {
    return publicError(locale);
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, request))) {
    return Response.json(
      {
        error:
          locale === "en"
            ? "Anti-spam verification failed."
            : "La vérification anti-spam a échoué.",
      },
      { status: 400 },
    );
  }

  const mail = getMailProvider();
  const recipient = process.env[recipients[typeResult.data]];
  if (!mail || !recipient) return publicError(locale);

  const data = parsed.data;
  try {
    await Promise.all([
      mail.sendTransactional({
        to: recipient,
        replyTo: data.email,
        subject:
          `[IAM] ${typeResult.data}: ${data.firstName} ${data.lastName ?? ""}`.trim(),
        html: `<h1>Nouveau message IAM</h1><p><strong>Type :</strong> ${escapeHtml(typeResult.data)}</p><p><strong>Nom :</strong> ${escapeHtml(`${data.firstName} ${data.lastName ?? ""}`)}</p><p><strong>Email :</strong> ${escapeHtml(data.email)}</p><p><strong>Pays :</strong> ${escapeHtml(data.country)}</p><p><strong>Organisation :</strong> ${escapeHtml(data.organization ?? "")}</p><p><strong>Message :</strong><br>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p><p>Consentement reçu via le formulaire IAM.</p>`,
      }),
      mail.sendTransactional({
        to: data.email,
        subject:
          locale === "en"
            ? "IAM has received your request"
            : "L’IAM a reçu votre demande",
        html:
          locale === "en"
            ? `<h1>Request received</h1><p>Hello ${escapeHtml(data.firstName)},</p><p>Your request has been routed to the relevant IAM team. This message does not constitute medical advice or confirmation of eligibility.</p>`
            : `<h1>Demande reçue</h1><p>Bonjour ${escapeHtml(data.firstName)},</p><p>Votre demande a été transmise à l’équipe IAM concernée. Ce message ne constitue ni un conseil médical ni une confirmation d’éligibilité.</p>`,
      }),
    ]);
    return Response.json({
      ok: true,
      message:
        locale === "en"
          ? "A confirmation has been sent by email."
          : "Une confirmation vous a été envoyée par email.",
    });
  } catch {
    return Response.json(
      {
        error:
          locale === "en"
            ? "The message could not be sent."
            : "Le message n’a pas pu être envoyé.",
      },
      { status: 502 },
    );
  }
}
