import { SearchInterface } from "@/components/search-interface";
import { getLocaleFromLang } from "@/lib/content";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) return {};
  const canonical = locale === "en" ? "/en/recherche" : "/recherche";
  return {
    title: locale === "en" ? "Search" : "Recherche",
    description:
      locale === "en"
        ? "Search approved IAM pharmaceutical content."
        : "Rechercher dans les contenus pharmaceutiques approuvés de l’IAM.",
    alternates: {
      canonical,
      languages: {
        fr: "/recherche",
        en: "/en/recherche",
        "x-default": "/recherche",
      },
    },
    robots: { index: false, follow: true },
  };
}

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ lang }, query] = await Promise.all([params, searchParams]);
  const locale = getLocaleFromLang(lang);
  if (!locale) notFound();
  return (
    <main id="contenu">
      <section className="page-hero page-hero--with-image page-hero--editorial">
        <div className="container">
          <p className="eyebrow">IAM</p>
          <h1>{locale === "en" ? "Search" : "Recherche"}</h1>
          <p>
            {locale === "en"
              ? "Find approved institutional, scientific and operational content."
              : "Trouvez les contenus institutionnels, scientifiques et opérationnels approuvés."}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container narrow">
          <SearchInterface
            locale={locale}
            initialQuery={
              typeof query.q === "string" ? query.q.slice(0, 120) : ""
            }
          />
        </div>
      </section>
    </main>
  );
}
