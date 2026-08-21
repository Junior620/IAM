import { ConfirmationEmail } from "@iam/emails";
import { newsletterSubscriptionSchema } from "@iam/contracts";
import { getSiteUrl, publicError } from "@/lib/server/configuration";
import { getResend } from "@/lib/server/mail";
import {
  pendingSubscriptionTtlSeconds,
  type PendingSubscription,
} from "@/lib/server/newsletter";
import { getRateLimiter, requestFingerprint } from "@/lib/server/rate-limit";
import { getRedis } from "@/lib/server/redis";
import { verifyTurnstile } from "@/lib/server/turnstile";

export async function POST(request: Request) {
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
  const parsed = newsletterSubscriptionSchema.safeParse(raw);
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
    const rate = await limiter.limit(
      `newsletter:${requestFingerprint(request)}`,
    );
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

  const redis = getRedis();
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!redis || !resend || !from) return publicError(locale);

  const token = crypto.randomUUID();
  const pending: PendingSubscription = {
    ...parsed.data,
    createdAt: new Date().toISOString(),
  };
  await redis.set(`iam:newsletter:pending:${token}`, pending, {
    ex: pendingSubscriptionTtlSeconds,
  });
  const actionUrl = `${getSiteUrl()}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  const result = await resend.emails.send({
    from,
    to: parsed.data.email,
    subject:
      locale === "en"
        ? "Confirm your IAM subscription"
        : "Confirmez votre inscription à l’IAM",
    react: ConfirmationEmail({
      firstName: parsed.data.firstName,
      actionUrl,
      locale,
    }),
  });
  if (result.error) {
    await redis.del(`iam:newsletter:pending:${token}`);
    return Response.json(
      {
        error:
          locale === "en"
            ? "Confirmation could not be sent."
            : "La confirmation n’a pas pu être envoyée.",
      },
      { status: 502 },
    );
  }
  return Response.json({
    ok: true,
    message:
      locale === "en"
        ? "Open the confirmation email to complete your subscription."
        : "Ouvrez l’email de confirmation pour terminer votre inscription.",
  });
}
