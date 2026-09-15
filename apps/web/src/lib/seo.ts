import type { Locale } from "@/lib/content";

export const SITE_URL = "https://iam-afrique.org";
export const SITE_NAME = "Institut Africain du Médicament";
const SOCIAL_ASSET_FALLBACK_URL = "https://iam-web-blond.vercel.app";

const staticPageSeo: Record<
  string,
  Record<Locale, { title: string; description: string }>
> = {
  "/institut/a-propos": {
    fr: {
      title: "À propos de l’Institut Africain du Médicament",
      description:
        "Découvrez l’histoire, le rôle et l’approche de l’Institut Africain du Médicament, créé en 2008 pour former et informer sur les enjeux de santé.",
    },
    en: {
      title: "About the African Institute of Medicine",
      description:
        "Discover the history, role and approach of the African Institute of Medicine, established in 2008 to train and inform on health issues.",
    },
  },
  "/institut/mission-vision": {
    fr: {
      title: "Mission et vision",
      description:
        "La mission de l’IAM relie science, institutions, compétences et accès au médicament afin de transformer la connaissance en action utile.",
    },
    en: {
      title: "Mission and vision",
      description:
        "IAM connects science, institutions, skills and access to medicines to turn knowledge into practical action.",
    },
  },
  "/institut/nos-services": {
    fr: {
      title: "Services pharmaceutiques et appui aux systèmes de santé",
      description:
        "Découvrez les services de l’IAM en réglementation, formation, organisation, communication en santé et appui aux opérations pharmaceutiques.",
    },
    en: {
      title: "Pharmaceutical services and health systems support",
      description:
        "Explore IAM services in regulation, training, organisation, health communication and pharmaceutical operations support.",
    },
  },
  "/priorites": {
    fr: {
      title: "Priorités pharmaceutiques en Afrique",
      description:
        "Accès aux médicaments, recherche, pharmacovigilance, qualité, production locale, formation et solidarité structurent les priorités de l’IAM.",
    },
    en: {
      title: "Pharmaceutical priorities in Africa",
      description:
        "Access to medicines, research, pharmacovigilance, quality, local production, training and solidarity shape IAM priorities.",
    },
  },
  "/academie": {
    fr: {
      title: "Formations pharmaceutiques et santé",
      description:
        "Découvrez les ateliers et modules de formation IAM pour les professionnels, institutions, chercheurs et acteurs de terrain en Afrique.",
    },
    en: {
      title: "Pharmaceutical and health training",
      description:
        "Explore IAM workshops and training modules for professionals, institutions, researchers and field stakeholders in Africa.",
    },
  },
  "/actualites-medias/galerie": {
    fr: {
      title: "Galerie photo de l’IAM",
      description:
        "Parcourez les photographies des rencontres, formations, partenariats et actions de terrain de l’Institut Africain du Médicament.",
    },
    en: {
      title: "IAM photo gallery",
      description:
        "Browse photographs of the African Institute of Medicine’s meetings, training, partnerships and field activities.",
    },
  },
  "/partenariats": {
    fr: {
      title: "Partenariats pharmaceutiques et scientifiques",
      description:
        "L’IAM construit des coopérations documentées avec les institutions, universités, chercheurs, industriels et fondations.",
    },
    en: {
      title: "Pharmaceutical and scientific partnerships",
      description:
        "IAM builds documented cooperation with institutions, universities, researchers, industry and foundations.",
    },
  },
  "/partenariats/anna-snijder": {
    fr: {
      title: "Anna Snijder, art et engagement pour la santé",
      description:
        "Découvrez la collaboration artistique entre Anna Snijder et l’Institut Africain du Médicament au service de la santé et de l’impact social.",
    },
    en: {
      title: "Anna Snijder, art and commitment to health",
      description:
        "Discover the artistic collaboration between Anna Snijder and the African Institute of Medicine in support of health and social impact.",
    },
  },
  "/contact": {
    fr: {
      title: "Contacter l’Institut Africain du Médicament",
      description:
        "Coordonnées et formulaire de contact de l’IAM à Douala pour les demandes générales, partenariats, médias et coopérations scientifiques.",
    },
    en: {
      title: "Contact the African Institute of Medicine",
      description:
        "IAM contact details and enquiry form in Douala for general enquiries, partnerships, media and scientific cooperation.",
    },
  },
  "/newsletter": {
    fr: {
      title: "Newsletter de l’Institut Africain du Médicament",
      description:
        "Page d’inscription aux communications de l’IAM, actuellement en préparation.",
    },
    en: {
      title: "African Institute of Medicine newsletter",
      description:
        "IAM communications subscription page, currently in preparation.",
    },
  },
};

export function getStaticPageSeo(path: string, locale: Locale) {
  return staticPageSeo[path]?.[locale] ?? null;
}

type RuntimeEnvironment = Record<string, string | undefined>;

export function isIndexingEnabled(
  environment: RuntimeEnvironment = process.env,
) {
  if (environment.SEO_ALLOW_INDEXING === "false") return false;
  if (environment.VERCEL_ENV && environment.VERCEL_ENV !== "production") {
    return false;
  }
  return environment.NODE_ENV === "production";
}

export function isPagePublished(
  path: string,
  environment: RuntimeEnvironment = process.env,
) {
  if (path === "/institut") {
    return environment.INSTITUTE_PAGE_ENABLED === "true";
  }
  if (path === "/participer") {
    return environment.PARTICIPATE_PAGE_ENABLED === "true";
  }
  if (path === "/actualites-medias") {
    return environment.NEWS_MEDIA_PAGE_ENABLED === "true";
  }
  if (path === "/newsletter") {
    return environment.NEWSLETTER_PAGE_ENABLED === "true";
  }
  return true;
}

export function absoluteUrl(path = "/") {
  const normalized = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${SITE_URL}${normalized}`;
}

export function socialImageUrl(environment: RuntimeEnvironment = process.env) {
  const vercelHost =
    environment.VERCEL_PROJECT_PRODUCTION_URL ?? environment.VERCEL_URL;
  if (vercelHost) {
    const host = vercelHost.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}/og-share.png?v=20260915`;
  }
  return `${SOCIAL_ASSET_FALLBACK_URL}/og-share.png?v=20260915`;
}

export function organizationStructuredData() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: "IAM",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/brand/iam-logo-official.png"),
    },
    description:
      "Plateforme panafricaine de coopération pharmaceutique, scientifique et institutionnelle.",
    foundingDate: "2008",
    areaServed: {
      "@type": "Continent",
      name: "Africa",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Bonamoussadi, Bloc 24, en face de la Perception",
      postOfficeBoxNumber: "BP 5426",
      addressLocality: "Douala",
      addressCountry: "CM",
    },
    email: "institutafricaindumedicament@gmail.com",
    telephone: "+237696216809",
  };
}

export function websiteStructuredData(locale: Locale) {
  const searchPath = locale === "en" ? "/en/recherche" : "/recherche";
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl(searchPath)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbStructuredData({
  locale,
  path,
  title,
}: {
  locale: Locale;
  path: string;
  title: string;
}) {
  const localizedPath = locale === "en" ? `/en${path}` : path;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: absoluteUrl(locale === "en" ? "/en" : "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: absoluteUrl(localizedPath),
      },
    ],
  };
}

export function serializeStructuredData(value: object) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
