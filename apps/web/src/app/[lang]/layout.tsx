import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer, Header } from "@/components/header";
import { getLocaleFromLang } from "@/lib/content";
import { sanityConfigured } from "@/sanity/lib/client";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: false,
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: { default: "Institut Africain du Médicament", template: "%s | IAM" },
  description:
    "Plateforme panafricaine de coopération pharmaceutique, scientifique et institutionnelle.",
  applicationName: "IAM",
  alternates: {
    canonical: "/",
    languages: { fr: "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    siteName: "Institut Africain du Médicament",
    title: "Institut Africain du Médicament",
    description:
      "Faire progresser le médicament en Afrique, de la recherche à l’accès.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Institut Africain du Médicament — science, données et accès",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Institut Africain du Médicament",
    description:
      "Faire progresser le médicament en Afrique, de la recherche à l’accès.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const locale = getLocaleFromLang((await params).lang);
  if (!locale) notFound();
  const preview = (await draftMode()).isEnabled;
  const VisualEditing =
    preview && sanityConfigured
      ? (await import("next-sanity/visual-editing")).VisualEditing
      : null;
  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Institut Africain du Médicament",
        alternateName: "IAM",
        url: siteUrl,
        areaServed: "Africa",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Institut Africain du Médicament",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}${locale === "en" ? "/en" : ""}/recherche?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        {VisualEditing ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
