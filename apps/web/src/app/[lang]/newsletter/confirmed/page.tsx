import { getLocaleFromLang } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter",
  robots: { index: false, follow: false },
};

export default async function NewsletterConfirmedPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const locale = getLocaleFromLang(lang);
  if (!locale) notFound();
  const state = query.state;
  const messages = {
    fr: {
      success: [
        "Inscription confirmée",
        "Bienvenue dans IAM Pharmaceutical Intelligence. Un email de bienvenue vous a été envoyé.",
      ],
      invalid: [
        "Lien invalide ou expiré",
        "Revenez au formulaire pour demander un nouveau lien de confirmation.",
      ],
      unavailable: [
        "Service momentanément indisponible",
        "Votre inscription n’a pas été activée. Vous pourrez réessayer plus tard.",
      ],
    },
    en: {
      success: [
        "Subscription confirmed",
        "Welcome to IAM Pharmaceutical Intelligence. A welcome email has been sent.",
      ],
      invalid: [
        "Invalid or expired link",
        "Return to the form to request a new confirmation link.",
      ],
      unavailable: [
        "Service temporarily unavailable",
        "Your subscription was not activated. Please try again later.",
      ],
    },
  } as const;
  const key =
    state === "success" || state === "unavailable" ? state : "invalid";
  const [title, summary] = messages[locale][key];
  return (
    <main className="section">
      <div className="container narrow">
        <p className="eyebrow">Newsletter</p>
        <h1>{title}</h1>
        <p className="lead">{summary}</p>
      </div>
    </main>
  );
}
