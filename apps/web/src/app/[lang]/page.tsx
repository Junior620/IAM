import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home-page";
import { getLocaleFromLang } from "@/lib/content";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]">): Promise<Metadata> {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) return {};
  const title =
    locale === "fr"
      ? "Institut Africain du Médicament | Coopération pharmaceutique"
      : "African Institute of Medicine | Pharmaceutical cooperation";
  const description =
    locale === "fr"
      ? "L’IAM relie science, institutions et professionnels pour renforcer la coopération pharmaceutique, les compétences et l’accès au médicament en Afrique."
      : "IAM connects science, institutions and professionals to strengthen pharmaceutical cooperation, skills and access to medicines in Africa.";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: locale === "fr" ? "/" : "/en",
      languages: { fr: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: locale === "fr" ? "/" : "/en",
      locale: locale === "fr" ? "fr_CM" : "en_US",
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt:
            locale === "fr"
              ? "Institut Africain du Médicament"
              : "African Institute of Medicine",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) notFound();
  return <HomePage locale={locale} />;
}
