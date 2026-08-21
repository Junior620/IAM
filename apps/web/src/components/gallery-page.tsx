import Link from "next/link";
import { Camera, ImageIcon, ShieldCheck } from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import {
  GalleryGrid,
  type GalleryCategory,
  type GalleryItem,
} from "./gallery-grid";
import { ButtonLink, Container } from "./ui";

const categories: Array<{
  id: GalleryCategory;
  fr: string;
  en: string;
}> = [
  { id: "duphat2020", fr: "DUPHAT 2020", en: "DUPHAT 2020" },
  {
    id: "cosmetics",
    fr: "Réglementation cosmétique",
    en: "Cosmetics regulation",
  },
  {
    id: "schoolSupport2021",
    fr: "Soutien scolaire NOSO 2021",
    en: "NOSO school support 2021",
  },
  { id: "institution", fr: "Vie de l’Institut", en: "Institute life" },
  { id: "training", fr: "Formations", en: "Training" },
  { id: "meetings", fr: "Rencontres", en: "Meetings" },
  { id: "science", fr: "Science & santé", en: "Science & health" },
];

const media = [
  {
    id: "duphat-2020-01",
    src: "/images/gallery/duphat-2020-01.png",
    category: "duphat2020",
    format: "wide",
    fr: {
      title: "IAM au DUPHAT 2020",
      alt: "Représentants de l’IAM et professionnels réunis à l’entrée du DUPHAT 2020",
    },
    en: {
      title: "IAM at DUPHAT 2020",
      alt: "IAM representatives and professionals gathered at the entrance to DUPHAT 2020",
    },
  },
  {
    id: "duphat-2020-02",
    src: "/images/gallery/duphat-2020-02.jpg",
    category: "duphat2020",
    format: "landscape",
    fr: {
      title: "Rencontres professionnelles au DUPHAT 2020",
      alt: "Participants réunis sur un espace d’exposition pendant le DUPHAT 2020",
    },
    en: {
      title: "Professional meetings at DUPHAT 2020",
      alt: "Participants gathered at an exhibition stand during DUPHAT 2020",
    },
  },
  {
    id: "duphat-2020-03",
    src: "/images/gallery/duphat-2020-03.jpg",
    category: "duphat2020",
    format: "landscape",
    fr: {
      title: "Échanges au Pharma Business Hub",
      alt: "Trois participants posant devant l’espace Pharma Business Hub du DUPHAT 2020",
    },
    en: {
      title: "Discussions at the Pharma Business Hub",
      alt: "Three participants standing at the DUPHAT 2020 Pharma Business Hub",
    },
  },
  {
    id: "duphat-2020-04",
    src: "/images/gallery/duphat-2020-04.jpg",
    category: "duphat2020",
    format: "portrait",
    fr: {
      title: "Coopération pharmaceutique internationale",
      alt: "Deux participants réunis dans l’espace d’exposition du DUPHAT 2020",
    },
    en: {
      title: "International pharmaceutical cooperation",
      alt: "Two participants gathered in the DUPHAT 2020 exhibition space",
    },
  },
  {
    id: "duphat-2020-05",
    src: "/images/gallery/duphat-2020-05.jpg",
    category: "duphat2020",
    format: "wide",
    fr: {
      title: "Délégation et acteurs du secteur au DUPHAT 2020",
      alt: "Groupe de professionnels réuni sur un stand du salon DUPHAT 2020",
    },
    en: {
      title: "Delegation and sector representatives at DUPHAT 2020",
      alt: "Group of professionals gathered at a DUPHAT 2020 exhibition stand",
    },
  },
  {
    id: "cosmetic-regulation-01",
    src: "/images/gallery/cosmetic-regulation-01.jpg",
    category: "cosmetics",
    format: "landscape",
    fr: {
      title: "Projet de réglementation cosmétique au Cameroun",
      alt: "Deux participants devant l’entrée d’un atelier national consacré à la qualité des médicaments et des produits de consommation courante",
    },
    en: {
      title: "Cosmetics regulation project in Cameroon",
      alt: "Two participants at the entrance to a national workshop on the quality of medicines and consumer products",
    },
  },
  {
    id: "cosmetic-regulation-02",
    src: "/images/gallery/cosmetic-regulation-02.jpg",
    category: "cosmetics",
    format: "landscape",
    fr: {
      title: "Participants à la séance de travail",
      alt: "Trois participants assis à une table avec les documents de la séance de travail",
    },
    en: {
      title: "Participants in the working session",
      alt: "Three participants seated at a table with working-session documents",
    },
  },
  {
    id: "cosmetic-regulation-03",
    src: "/images/gallery/cosmetic-regulation-03.jpg",
    category: "cosmetics",
    format: "landscape",
    fr: {
      title: "Partenaires du projet réunis au Cameroun",
      alt: "Groupe de partenaires réuni devant un bâtiment à l’occasion de la séance de travail",
    },
    en: {
      title: "Project partners gathered in Cameroon",
      alt: "Group of partners gathered outside a building for the working session",
    },
  },
  {
    id: "cosmetic-regulation-04",
    src: "/images/gallery/cosmetic-regulation-04.jpg",
    category: "cosmetics",
    format: "landscape",
    fr: {
      title: "Présentation de l’IAM et de HelioScience",
      alt: "Participants devant les supports de présentation de l’IAM et de HelioScience",
    },
    en: {
      title: "IAM and HelioScience presentation",
      alt: "Participants standing beside IAM and HelioScience presentation banners",
    },
  },
  {
    id: "cosmetic-regulation-05",
    src: "/images/gallery/cosmetic-regulation-05.jpg",
    category: "cosmetics",
    format: "landscape",
    fr: {
      title: "Travaux en groupe sur le projet réglementaire",
      alt: "Participants réunis autour d’une table pendant la séance de travail sur le projet réglementaire",
    },
    en: {
      title: "Group work on the regulatory project",
      alt: "Participants gathered around a table during the regulatory project working session",
    },
  },
  {
    id: "school-support-noso-2021-01",
    src: "/images/gallery/school-support-noso-2021-01.jpg",
    category: "schoolSupport2021",
    format: "wide",
    fr: {
      title: "Remise de fournitures scolaires aux enfants du NOSO",
      alt: "Élèves réunis autour d’une table de fournitures scolaires pendant l’action de soutien",
    },
    en: {
      title: "Donation of school supplies to children from the NOSO regions",
      alt: "Pupils gathered around a table of school supplies during the support initiative",
    },
  },
  {
    id: "school-support-noso-2021-02",
    src: "/images/gallery/school-support-noso-2021-02.jpg",
    category: "schoolSupport2021",
    format: "portrait",
    fr: {
      title: "Mobilisation pour le soutien scolaire",
      alt: "Membres de l’organisation et enfants réunis devant les supports institutionnels au Cameroun",
    },
    en: {
      title: "Mobilisation for school support",
      alt: "Organisation members and children gathered in front of institutional displays in Cameroon",
    },
  },
  {
    id: "school-support-noso-2021-03",
    src: "/images/gallery/school-support-noso-2021-03.jpg",
    category: "schoolSupport2021",
    format: "portrait",
    fr: {
      title: "L’IAM engagé aux côtés des jeunes pharmaciens",
      alt: "Bannières de l’IAM et des jeunes pharmaciens camerounais sur le lieu de l’action",
    },
    en: {
      title: "IAM working alongside young pharmacists",
      alt: "IAM and Cameroon Young Pharmacists banners at the initiative venue",
    },
  },
  {
    id: "school-support-noso-2021-04",
    src: "/images/gallery/school-support-noso-2021-04.jpg",
    category: "schoolSupport2021",
    format: "portrait",
    fr: {
      title: "Accompagnement éducatif des enfants",
      alt: "Un professionnel présentant un support éducatif à plusieurs enfants en tenue scolaire",
    },
    en: {
      title: "Educational support for children",
      alt: "A professional presenting educational material to several children in school uniform",
    },
  },
  {
    id: "school-support-noso-2021-05",
    src: "/images/gallery/school-support-noso-2021-05.jpg",
    category: "schoolSupport2021",
    format: "portrait",
    fr: {
      title: "Journée mondiale du pharmacien 2021",
      alt: "Un représentant posant avec deux enfants devant les supports de l’action de soutien scolaire",
    },
    en: {
      title: "World Pharmacists Day 2021",
      alt: "A representative standing with two children in front of the school-support initiative displays",
    },
  },
  {
    id: "professional-meeting",
    src: "/images/gallery/professional-meeting.jpg",
    category: "meetings",
    format: "wide",
    fr: {
      title: "Rencontre professionnelle autour de la pharmacie",
      alt: "Participants réunis autour d’une table lors d’une rencontre pharmaceutique",
    },
    en: {
      title: "Professional meeting on pharmacy",
      alt: "Participants seated around a table during a pharmaceutical meeting",
    },
  },
  {
    id: "working-session",
    src: "/images/gallery/working-session.jpg",
    category: "training",
    format: "landscape",
    fr: {
      title: "Séance de travail en équipe",
      alt: "Équipe réunie autour d’ordinateurs pendant une séance de travail",
    },
    en: {
      title: "Team working session",
      alt: "Team gathered around computers during a working session",
    },
  },
  {
    id: "iam-expertise",
    src: "/images/gallery/iam-expertise.jpg",
    category: "institution",
    format: "portrait",
    fr: {
      title: "Présentation des savoir-faire de l’IAM",
      alt: "Représentant de l’IAM devant une bannière présentant les domaines d’expertise de l’Institut",
    },
    en: {
      title: "Presentation of IAM expertise",
      alt: "IAM representative beside a banner presenting the Institute’s areas of expertise",
    },
  },
  {
    id: "pharmacist-practice",
    src: "/images/gallery/pharmacist-in-practice.jpg",
    category: "training",
    format: "portrait",
    fr: {
      title: "Pratique professionnelle en environnement pharmaceutique",
      alt: "Professionnel de santé utilisant une tablette dans une pharmacie",
    },
    en: {
      title: "Professional practice in a pharmacy setting",
      alt: "Health professional using a tablet in a pharmacy",
    },
  },
  {
    id: "iam-helioscience",
    src: "/images/gallery/iam-helioscience.jpg",
    category: "science",
    format: "wide",
    fr: {
      title: "Présentation IAM et HelioScience",
      alt: "Deux représentants auprès des bannières de l’IAM et de HelioScience",
    },
    en: {
      title: "IAM and HelioScience presentation",
      alt: "Two representatives beside IAM and HelioScience banners",
    },
  },
  {
    id: "iam-international",
    src: "/images/gallery/iam-international.jpg",
    category: "institution",
    format: "landscape",
    fr: {
      title: "L’IAM dans un cadre international",
      alt: "Représentant de l’IAM devant une carte du monde",
    },
    en: {
      title: "IAM in an international setting",
      alt: "IAM representative standing in front of a world map",
    },
  },
  {
    id: "health-professionals",
    src: "/images/gallery/health-professionals.jpg",
    category: "institution",
    format: "wide",
    fr: {
      title: "Professionnels de santé réunis",
      alt: "Groupe de professionnels de santé en blouse blanche",
    },
    en: {
      title: "Health professionals gathered together",
      alt: "Group of health professionals wearing white coats",
    },
  },
  {
    id: "pharmacy-practice",
    src: "/images/gallery/pharmacy-practice.jpg",
    category: "science",
    format: "landscape",
    fr: {
      title: "Gestion des produits de santé",
      alt: "Pharmacien consultant des produits dans les rayonnages d’une pharmacie",
    },
    en: {
      title: "Healthcare product management",
      alt: "Pharmacist reviewing products on pharmacy shelves",
    },
  },
  {
    id: "training-products",
    src: "/images/gallery/training-products.jpg",
    category: "training",
    format: "wide",
    fr: {
      title: "Formation autour des produits pharmaceutiques",
      alt: "Professionnel rédigeant un document dans un environnement pharmaceutique",
    },
    en: {
      title: "Training on pharmaceutical products",
      alt: "Professional writing a document in a pharmaceutical setting",
    },
  },
] as const;

const content = {
  fr: {
    breadcrumb: "Galerie & photothèque",
    eyebrow: "Actualités & médias",
    title: "Galerie & photothèque",
    summary:
      "Une mémoire visuelle des rencontres, formations et activités qui donnent corps à l’action de l’Institut.",
    heroLabel: "Archives visuelles IAM",
    introEyebrow: "Mémoire visuelle",
    introTitle: "Voir l’Institut en action.",
    introText:
      "Cette première sélection rassemble les médias déjà transmis pour le nouveau site. Les informations historiques sont volontairement limitées aux éléments que les images permettent de décrire avec certitude.",
    policyTitle: "Publication responsable",
    policyText:
      "Les dates, lieux, événements, auteurs et autorisations d’utilisation doivent être confirmés avant la publication éditoriale définitive de chaque média.",
    galleryEyebrow: "Photothèque",
    galleryTitle: "Explorer les images",
    gallerySummary:
      "Filtrez la sélection, puis ouvrez une image pour la consulter en grand format.",
    all: "Toutes les images",
    filters: "Filtrer la photothèque",
    results: "images affichées",
    open: "Agrandir l’image",
    close: "Fermer l’image",
    previous: "Image précédente",
    next: "Image suivante",
    credit: "Provenance",
    rights: "Droits",
    supplied: "Visuel transmis pour le site de l’IAM",
    rightsPending: "Validation éditoriale et droits à documenter",
    minorRightsPending:
      "Publication publique conditionnée à la validation des autorisations de représentation des enfants.",
    ctaEyebrow: "Médias & documentation",
    ctaTitle: "Vous disposez des crédits ou des informations manquantes ?",
    ctaText:
      "Transmettez les dates, lieux, événements, auteurs et autorisations afin de compléter durablement les archives de l’Institut.",
    cta: "Contacter l’équipe médias",
  },
  en: {
    breadcrumb: "Gallery & photo library",
    eyebrow: "News & media",
    title: "Gallery & photo library",
    summary:
      "A visual record of the meetings, training activities and moments that bring the Institute’s work to life.",
    heroLabel: "IAM visual archive",
    introEyebrow: "Visual record",
    introTitle: "See the Institute in action.",
    introText:
      "This initial selection brings together media already supplied for the new website. Historical information is deliberately limited to what can be described with certainty from the images.",
    policyTitle: "Responsible publishing",
    policyText:
      "Dates, locations, events, authors and permissions must be confirmed before each item receives final editorial publication.",
    galleryEyebrow: "Photo library",
    galleryTitle: "Explore the images",
    gallerySummary:
      "Filter the selection, then open an image to view it at a larger size.",
    all: "All images",
    filters: "Filter the photo library",
    results: "images displayed",
    open: "Enlarge image",
    close: "Close image",
    previous: "Previous image",
    next: "Next image",
    credit: "Source",
    rights: "Rights",
    supplied: "Visual supplied for the IAM website",
    rightsPending: "Editorial validation and rights documentation pending",
    minorRightsPending:
      "Public release is conditional on validation of the children’s image permissions.",
    ctaEyebrow: "Media & documentation",
    ctaTitle: "Do you have the missing credits or information?",
    ctaText:
      "Send dates, locations, event details, authorship and permissions to help complete the Institute’s lasting archive.",
    cta: "Contact the media team",
  },
} as const;

export function GalleryPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const galleryItems: GalleryItem[] = media.map((item) => ({
    id: item.id,
    src: item.src,
    title: item[locale].title,
    alt: item[locale].alt,
    category: item.category,
    categoryLabel:
      categories.find((category) => category.id === item.category)?.[locale] ??
      item.category,
    format: item.format,
    ...(item.category === "cosmetics"
      ? {
          description:
            locale === "fr"
              ? "Séance de travail sur le projet de réglementation cosmétique au Cameroun, avec le LANACOME, ADREPO, HelioScience et VisaTox."
              : "Working session on the cosmetics regulation project in Cameroon, with LANACOME, ADREPO, HelioScience and VisaTox.",
        }
      : item.category === "schoolSupport2021"
        ? {
            description:
              locale === "fr"
                ? "Remise de dons et soutien scolaire aux enfants victimes de la crise anglophone dans les régions du Nord-Ouest et du Sud-Ouest du Cameroun, à l’occasion de la Journée mondiale du pharmacien 2021."
                : "Donation and school support for children affected by the Anglophone crisis in Cameroon’s North-West and South-West regions, for World Pharmacists Day 2021.",
          }
        : {}),
    credit: t.supplied,
    rights:
      item.category === "schoolSupport2021"
        ? t.minorRightsPending
        : t.rightsPending,
  }));

  return (
    <main id="contenu" className="gallery-page">
      <section className="gallery-hero">
        <Container>
          <nav
            className="breadcrumb"
            aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
          >
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <Link href={localizePath(locale, "/actualites-medias")}>
              {locale === "fr" ? "Actualités & médias" : "News & media"}
            </Link>
            <span>/</span>
            <span>{t.breadcrumb}</span>
          </nav>
          <div className="gallery-hero__content">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p>{t.summary}</p>
            <div className="gallery-hero__label">
              <Camera aria-hidden="true" />
              <span>{t.heroLabel}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="gallery-intro section">
        <Container className="gallery-intro__grid">
          <div>
            <p className="eyebrow">{t.introEyebrow}</p>
            <h2>{t.introTitle}</h2>
            <p>{t.introText}</p>
          </div>
          <aside>
            <ShieldCheck aria-hidden="true" />
            <div>
              <h3>{t.policyTitle}</h3>
              <p>{t.policyText}</p>
            </div>
          </aside>
        </Container>
      </section>

      <section className="gallery-library section">
        <Container>
          <header className="gallery-library__header">
            <div>
              <p className="eyebrow">{t.galleryEyebrow}</p>
              <h2>{t.galleryTitle}</h2>
            </div>
            <p>{t.gallerySummary}</p>
          </header>
          <GalleryGrid
            items={galleryItems}
            categories={categories.map((category) => ({
              id: category.id,
              label: category[locale],
            }))}
            labels={{
              all: t.all,
              filters: t.filters,
              results: t.results,
              open: t.open,
              close: t.close,
              previous: t.previous,
              next: t.next,
              credit: t.credit,
              rights: t.rights,
            }}
          />
        </Container>
      </section>

      <section className="gallery-cta section">
        <Container className="gallery-cta__grid">
          <ImageIcon aria-hidden="true" />
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
            <p>{t.ctaText}</p>
          </div>
          <ButtonLink
            href={localizePath(locale, "/contact?type=media")}
            variant="light"
          >
            {t.cta}
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
