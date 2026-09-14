import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Footer, Header } from "@/components/header";
import { CookieConsent } from "@/components/cookie-consent";
import { AssistantChat } from "@/components/assistant-chat";
import { StructuredData } from "@/components/structured-data";
import { getLocaleFromLang } from "@/lib/content";
import {
  isIndexingEnabled,
  organizationStructuredData,
  SITE_NAME,
  SITE_URL,
  websiteStructuredData,
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | IAM" },
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
        alt: "Institut Africain du Médicament, science, données et accès",
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
  robots: isIndexingEnabled()
    ? { index: true, follow: true }
    : { index: false, follow: false, noarchive: true },
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
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [organizationStructuredData(), websiteStructuredData(locale)],
  };
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sourceSerif.variable}`}
    >
      <body>
        <StructuredData data={structuredData} />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
        <AssistantChat locale={locale} />
        <CookieConsent locale={locale} />
        {VisualEditing ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
