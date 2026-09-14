import type { PortableTextBlock } from "@portabletext/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
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
  type Locale,
} from "@/lib/content";
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

function resolve(locale: Locale, slug: string[]) {
  const path = `/${slug.join("/")}`;
  const entry = getPageEntry(path);
  const knownDetail =
    path.startsWith("/institut/") ||
    path.startsWith("/priorites/") ||
    path.startsWith("/programmes/") ||
    path.startsWith("/actualites-medias/") ||
    ["/alertes", "/recherche", "/accessibilite"].includes(path);
  return { path, entry, knownDetail, canonical: localizePath(locale, path) };
}

function isInstitutePagePublished() {
  return process.env.INSTITUTE_PAGE_ENABLED === "true";
}

function isParticipatePagePublished() {
  return process.env.PARTICIPATE_PAGE_ENABLED === "true";
}

function isNewsMediaPagePublished() {
  return process.env.NEWS_MEDIA_PAGE_ENABLED === "true";
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
  const title =
    legalMetadata?.title ??
    result.entry?.[locale].title ??
    cmsRecord?.title ??
    (locale === "fr"
      ? "IAM, Information pharmaceutique"
      : "IAM, Pharmaceutical information");
  const description =
    legalMetadata?.description ??
    result.entry?.[locale].summary ??
    cmsRecord?.summary ??
    (locale === "fr"
      ? "Contenu institutionnel, scientifique et pharmaceutique de l’IAM."
      : "Institutional, scientific and pharmaceutical information from IAM.");
  const isArtistPartnership = result.path === "/partenariats/anna-snijder";
  const isInstitutePagePending =
    result.path === "/institut" && !isInstitutePagePublished();
  const isParticipatePagePending =
    result.path === "/participer" && !isParticipatePagePublished();
  const isNewsMediaPagePending =
    result.path === "/actualites-medias" && !isNewsMediaPagePublished();
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
    alternates: {
      canonical: result.canonical,
      languages: {
        fr: localizePath("fr", result.path),
        en: localizePath("en", result.path),
      },
    },
    ...(isInstitutePagePending ||
    isParticipatePagePending ||
    isNewsMediaPagePending
      ? { robots: { index: false, follow: true } }
      : {}),
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
  if (isLegalPagePath(result.path)) {
    return <LegalPage locale={locale} path={result.path} />;
  }
  if (result.path === "/newsletter") return <NewsletterPage locale={locale} />;
  if (result.path === "/institut/a-propos")
    return <AboutPage locale={locale} />;
  if (result.path === "/institut/mission-vision")
    return <MissionVisionPage locale={locale} />;
  if (result.path === "/institut/nos-services")
    return <ServicesPage locale={locale} />;
  if (result.path === "/academie") return <AcademyPage locale={locale} />;
  if (result.path === "/actualites-medias/galerie")
    return <GalleryPage locale={locale} />;
  if (result.path === "/partenariats/anna-snijder")
    return <ArtistPartnershipPage locale={locale} />;
  if (result.path === "/institut" && !isInstitutePagePublished())
    return <UnderConstructionPage locale={locale} />;
  if (result.path === "/participer" && !isParticipatePagePublished())
    return <UnderConstructionPage locale={locale} page="participate" />;
  if (result.path === "/actualites-medias" && !isNewsMediaPagePublished())
    return <UnderConstructionPage locale={locale} page="media" />;
  if (result.entry) {
    const formType = typeof query.type === "string" ? query.type : "contact";
    return (
      <GenericPage locale={locale} entry={result.entry} formType={formType} />
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
    return <ContentTemplate locale={locale} document={document} />;
  }

  if (result.knownDetail)
    return <DetailPage locale={locale} slug={values.slug} />;
  notFound();
}
