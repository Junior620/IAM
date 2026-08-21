import { NewsletterPreferences } from "@/components/newsletter-preferences";
import { getLocaleFromLang } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter preferences",
  robots: { index: false, follow: false },
};

export default async function NewsletterPreferencesPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const locale = getLocaleFromLang(lang);
  const token = typeof query.token === "string" ? query.token : "";
  if (!locale || !/^[0-9a-f-]{36}$/i.test(token)) notFound();
  return (
    <main className="section">
      <div className="container narrow">
        <p className="eyebrow">IAM Pharmaceutical Intelligence</p>
        <h1>
          {locale === "en"
            ? "Manage your preferences"
            : "Gérer vos préférences"}
        </h1>
        <p className="lead">
          {locale === "en"
            ? "Choose your topics or unsubscribe. Your email address is never exposed in this link."
            : "Choisissez vos thèmes ou désabonnez-vous. Votre adresse email n’est jamais exposée dans ce lien."}
        </p>
        <NewsletterPreferences locale={locale} token={token} />
      </div>
    </main>
  );
}
