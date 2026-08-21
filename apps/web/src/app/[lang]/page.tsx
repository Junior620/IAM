import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { getLocaleFromLang } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) return {};
  return {
    title:
      locale === "fr"
        ? "Faire progresser le médicament en Afrique"
        : "Advancing medicine in Africa",
    description:
      locale === "fr"
        ? "Plateforme panafricaine de coopération pharmaceutique, scientifique et institutionnelle."
        : "A Pan-African platform for pharmaceutical, scientific and institutional cooperation.",
    alternates: {
      canonical: locale === "fr" ? "/" : "/en",
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) notFound();
  return <HomePage locale={locale} />;
}
