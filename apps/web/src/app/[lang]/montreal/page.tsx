import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getLocaleFromLang } from "@/lib/content";
import { getSanityClient } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) return {};
  const client = getSanityClient();
  const enabled = client
    ? Boolean(
        (await client.fetch(settingsQuery).catch(() => null))?.montrealEnabled,
      )
    : false;
  const canonical = locale === "en" ? "/en/montreal" : "/montreal";
  return {
    title: "IAM Montréal",
    description:
      locale === "en"
        ? "IAM international scientific cooperation in Montréal."
        : "Coopération scientifique internationale de l’IAM à Montréal.",
    alternates: {
      canonical,
      languages: { fr: "/montreal", en: "/en/montreal" },
    },
    robots: { index: enabled, follow: enabled },
  };
}

export default async function MontrealPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = getLocaleFromLang(lang);
  if (!locale) notFound();
  const preview = (await draftMode()).isEnabled;
  const client = getSanityClient({ preview });
  if (!client) notFound();
  const settings = await client.fetch(settingsQuery);
  if (!preview && !settings?.montrealEnabled) notFound();
  return (
    <main className="section">
      <div className="container narrow">
        <p className="eyebrow">IAM Montréal</p>
        <h1>
          {locale === "en"
            ? "A bridge for scientific cooperation"
            : "Un pont pour la coopération scientifique"}
        </h1>
        <p className="lead">
          {locale === "en"
            ? "This page is controlled by the institutional settings in Sanity."
            : "Cette page est contrôlée par les paramètres institutionnels dans Sanity."}
        </p>
        {preview && !settings?.montrealEnabled ? (
          <p className="notice">Preview only — the public page is disabled.</p>
        ) : null}
      </div>
    </main>
  );
}
