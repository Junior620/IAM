import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { ReactNode } from "react";
import {
  ContentTemplate,
  type TemplateDocument,
  type TemplateKind,
} from "@/components/content-template";
import { AboutPage } from "@/components/about-page";
import { AcademyPage } from "@/components/academy-page";
import { ArtistPartnershipPage } from "@/components/artist-partnership-page";
import { GalleryPage } from "@/components/gallery-page";
import { MissionVisionPage } from "@/components/mission-vision-page";
import { ServicesPage } from "@/components/services-page";
import { StructuredData } from "@/components/structured-data";
import { UnderConstructionPage } from "@/components/under-construction-page";
import {
  getLegalPageMetadata,
  isLegalPagePath,
  LegalPage,
} from "@/components/legal-page";
import {
  DetailPage,
  GenericPage,
  NewsletterPage,
} from "@/components/generic-page";
import {
  getLocaleFromLang,
  getPageEntry,
  localizePath,
  pillars,
  programmes,
  type Locale,
} from "@/lib/content";
import {
  breadcrumbStructuredData,
  getStaticPageSeo,
  isIndexingEnabled,
  isPagePublished,
} from "@/lib/seo";
import { SanityContentRepository } from "@/sanity/lib/repository";

const templateKinds: Record<string, TemplateKind> = {
  pillar: "pillar",
  program: "program",
  project: "project",
  publication: "publication",
  report: "publication",
  policyBrief: "publication",
  dataset: "publication",
  article: "news",
  newsletterIssue: "news",
  event: "event",
  course: "course",
  author: "profile",
  researcher: "profile",
  teamMember: "profile",
  governanceMember: "profile",
  scientificCouncilMember: "profile",
  trainer: "profile",
  partner: "partner",
  laboratory: "partner",
  country: "country",
  location: "country",
  alert: "alert",
  shortageAlert: "alert",
  pharmacovigilanceAlert: "alert",
  falsifiedMedicineAlert: "alert",
  donorCampaign: "campaign",
  callForProjects: "campaign",
};

function templateKind(kind?: string): TemplateKind {
  return kind ? (templateKinds[kind] ?? "institutional") : "institutional";
}

function templateEyebrow(kind: TemplateKind, locale: Locale) {
  const labels: Record<TemplateKind, [string, string]> = {
    institutional: [
      "Information institutionnelle",
      "Institutional information",
    ],
    pillar: ["Priorité stratégique", "Strategic priority"],
    program: ["Programme", "Programme"],
    project: ["Projet", "Project"],
    publication: ["Science & données", "Science & data"],
    news: ["Actualités & médias", "News & media"],
    event: ["Événement", "Event"],
    course: ["Académie", "Academy"],
    profile: ["Expertise", "Expertise"],
    partner: ["Partenariat", "Partnership"],
    country: ["Action en Afrique", "Action in Africa"],
    alert: ["Alerte institutionnelle", "Institutional alert"],
    campaign: ["Appel à mobilisation", "Call to action"],
  };
  return labels[kind][locale === "fr" ? 0 : 1];
}

const detailPaths = new Set([
  "/alertes",
  "/institut/notre-approche",
  ...pillars.map((item) => `/priorites/${item.slug}`),
  ...programmes
    .filter((item) => !getPageEntry(item.path))
    .map((item) => item.path),
]);

function resolve(locale: Locale, slug: string[]) {
  const path = `/${slug.join("/")}`;
  const entry = getPageEntry(path);
  const knownDetail = detailPaths.has(path);
  return { path, entry, knownDetail, canonical: localizePath(locale, path) };
}

function detailCopy(path: string, locale: Locale) {
  const pillar = pillars.find((item) => `/priorites/${item.slug}` === path);
  if (pillar) return pillar[locale];
  const programme = programmes.find((item) => item.path === path);
  if (programme) return programme[locale];
  if (path === "/alertes") {
    return locale === "fr"
      ? {
          title: "Alertes pharmaceutiques",
          summary: "Espace de publication des alertes validées par l’IAM.",
        }
      : {
          title: "Pharmaceutical alerts",
          summary: "Publication area for alerts validated by IAM.",
        };
  }
  return locale === "fr"
    ? {
        title: "Contenu en préparation",
        summary: "Cette page est en cours de validation éditoriale.",
      }
    : {
        title: "Content in preparation",
        summary: "This page is undergoing editorial validation.",
      };
}

function PageWithBreadcrumb({
  locale,
  path,
  title,
  children,
}: {
  locale: Locale;
  path: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <StructuredData
        data={breadcrumbStructuredData({ locale, path, title })}
      />
      {children}
    </>
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[...slug]">): Promise<Metadata> {
  const values = await params;
  const locale = getLocaleFromLang(values.lang);
  if (!locale) return {};
  const result = resolve(locale, values.slug);
  const legalMetadata = isLegalPagePath(result.path)
    ? getLegalPageMetadata(result.path, locale)
    : null;
  const cmsRecord =
    result.entry || legalMetadata
      ? null
      : await new SanityContentRepository().getBySlug(
          values.slug.at(-1) ?? "",
          locale,
        );
  const staticSeo = getStaticPageSeo(result.path, locale);
  const fallbackDetail = result.knownDetail
    ? detailCopy(result.path, locale)
    : null;
  const title =
    staticSeo?.title ??
    legalMetadata?.title ??
    result.entry?.[locale].title ??
    cmsRecord?.title ??
    fallbackDetail?.title ??
    (locale === "fr"
      ? "IAM, Information pharmaceutique"
      : "IAM, Pharmaceutical information");
  const description =
    staticSeo?.description ??
    legalMetadata?.description ??
    result.entry?.[locale].summary ??
    cmsRecord?.summary ??
    fallbackDetail?.summary ??
    (locale === "fr"
      ? "Contenu institutionnel, scientifique et pharmaceutique de l’IAM."
      : "Institutional, scientific and pharmaceutical information from IAM.");
  const isArtistPartnership = result.path === "/partenariats/anna-snijder";
  const isFeaturePagePending = !isPagePublished(result.path);
  const isEditoriallyIncomplete = Boolean(legalMetadata || result.knownDetail);
  const hasPublicContent = Boolean(result.entry || cmsRecord || legalMetadata);
  const shouldIndex =
    isIndexingEnabled() &&
    hasPublicContent &&
    !isFeaturePagePending &&
    !isEditoriallyIncomplete;
  const hasVerifiedTranslation = Boolean(
    result.entry || legalMetadata || result.knownDetail,
  );
  const openGraphLocale = locale === "fr" ? "fr_CM" : "en_US";
  return {
    title,
    description,
    ...(isArtistPartnership
      ? {
          keywords:
            locale === "fr"
              ? [
                  "Anna Snijder",
                  "artiste plasticienne internationale",
                  "art et santé",
                  "Institut Africain du Médicament",
                  "mécénat artistique",
                ]
              : [
                  "Anna Snijder",
                  "international visual artist",
                  "art and health",
                  "African Institute of Medicine",
                  "art philanthropy",
                ],
          openGraph: {
            type: "article" as const,
            title,
            description,
            url: result.canonical,
            locale: openGraphLocale,
            images: [
              {
                url: "/og.png",
                width: 1200,
                height: 630,
                alt:
                  locale === "fr"
                    ? "Collaboration entre Anna Snijder et l’Institut Africain du Médicament"
                    : "Collaboration between Anna Snijder and the African Institute of Medicine",
              },
            ],
          },
          twitter: {
            card: "summary_large_image" as const,
            title,
            description,
            images: ["/og.png"],
          },
        }
      : {}),
    ...(!isArtistPartnership
      ? {
          openGraph: {
            type: "website" as const,
            title,
            description,
            url: result.canonical,
            locale: openGraphLocale,
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
            card: "summary_large_image" as const,
            title,
            description,
            images: ["/og.png"],
          },
        }
      : {}),
    alternates: {
      canonical: result.canonical,
      ...(hasVerifiedTranslation
        ? {
            languages: {
              fr: localizePath("fr", result.path),
              en: localizePath("en", result.path),
              "x-default": localizePath("fr", result.path),
            },
          }
        : {}),
    },
    robots: shouldIndex
      ? { index: true, follow: true }
      : { index: false, follow: true, noarchive: true },
  };
}

export default async function Page({
  params,
  searchParams,
}: PageProps<"/[lang]/[...slug]">) {
  const [values, query] = await Promise.all([params, searchParams]);
  const locale = getLocaleFromLang(values.lang);
  if (!locale) notFound();
  const result = resolve(locale, values.slug);
  const renderPage = (title: string, children: ReactNode) => (
    <PageWithBreadcrumb locale={locale} path={result.path} title={title}>
      {children}
    </PageWithBreadcrumb>
  );
  if (isLegalPagePath(result.path)) {
    const legalMetadata = getLegalPageMetadata(result.path, locale);
    return renderPage(
      legalMetadata.title,
      <LegalPage locale={locale} path={result.path} />,
    );
  }
  if (result.path === "/newsletter" && !isPagePublished(result.path))
    return renderPage(
      result.entry?.[locale].title ?? "Newsletter",
      <UnderConstructionPage locale={locale} page="newsletter" />,
    );
  if (result.path === "/newsletter")
    return renderPage(
      result.entry?.[locale].title ?? "Newsletter",
      <NewsletterPage locale={locale} />,
    );
  if (result.path === "/institut/a-propos")
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <AboutPage locale={locale} />,
    );
  if (result.path === "/institut/mission-vision")
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <MissionVisionPage locale={locale} />,
    );
  if (result.path === "/institut/nos-services")
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <ServicesPage locale={locale} />,
    );
  if (result.path === "/academie")
    return renderPage(
      result.entry?.[locale].title ?? "Académie IAM",
      <AcademyPage locale={locale} />,
    );
  if (result.path === "/actualites-medias/galerie")
    return renderPage(
      result.entry?.[locale].title ?? "Galerie IAM",
      <GalleryPage locale={locale} />,
    );
  if (result.path === "/partenariats/anna-snijder")
    return renderPage(
      result.entry?.[locale].title ?? "Anna Snijder",
      <ArtistPartnershipPage locale={locale} />,
    );
  if (result.path === "/institut" && !isPagePublished(result.path))
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <UnderConstructionPage locale={locale} />,
    );
  if (result.path === "/participer" && !isPagePublished(result.path))
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <UnderConstructionPage locale={locale} page="participate" />,
    );
  if (result.path === "/actualites-medias" && !isPagePublished(result.path))
    return renderPage(
      result.entry?.[locale].title ?? "IAM",
      <UnderConstructionPage locale={locale} page="media" />,
    );
  if (result.entry) {
    const formType = typeof query.type === "string" ? query.type : "contact";
    return renderPage(
      result.entry[locale].title,
      <GenericPage locale={locale} entry={result.entry} formType={formType} />,
    );
  }

  const record = await new SanityContentRepository().getBySlug(
    values.slug.at(-1) ?? "",
    locale,
  );
  if (record) {
    const kind = templateKind(record.kind);
    const body =
      Array.isArray(record.body) && record.body.length > 0 ? (
        <div className="prose">
          <PortableText value={record.body as PortableTextBlock[]} />
        </div>
      ) : undefined;
    const document: TemplateDocument = {
      kind,
      title: record.title,
      eyebrow: templateEyebrow(kind, locale),
      summary:
        record.summary ??
        (locale === "fr"
          ? "Contenu approuvé et publié par l’Institut Africain du Médicament."
          : "Content approved and published by the African Medicines Institute."),
      ...(record.verifiedAt ? { verifiedAt: record.verifiedAt } : {}),
      ...(record.sourceTitle ? { sourceTitle: record.sourceTitle } : {}),
      ...(record.sourceUrl ? { sourceUrl: record.sourceUrl } : {}),
      ...(body ? { body } : {}),
    };
    return renderPage(
      record.title,
      <ContentTemplate locale={locale} document={document} />,
    );
  }

  if (result.knownDetail)
    return renderPage(
      detailCopy(result.path, locale).title,
      <DetailPage locale={locale} slug={values.slug} />,
    );
  notFound();
}
