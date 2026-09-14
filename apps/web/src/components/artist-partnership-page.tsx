import Link from "next/link";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  HeartHandshake,
  Landmark,
  Layers3,
  Mail,
  MapPin,
  Palette,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { Locale } from "@/lib/content";
import { localizePath } from "@/lib/content";
import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/seo";
import { Container } from "./ui";

const artistSite = "https://www.annasnijder.com";
const artistEmail = "info@annasnijder.com";

const content = {
  fr: {
    breadcrumb: "Partenariats",
    eyebrow: "Art × Santé × Impact social × Afrique",
    title: "Anna Snijder",
    role: "Artiste plasticienne internationale",
    summary:
      "Une collaboration où la création artistique contribue à soutenir la mission scientifique et institutionnelle de l’IAM.",
    discover: "Découvrir son travail",
    engagementCta: "Voir son engagement",
    mediaStatus: "Visuel provisoire",
    mediaLabel: "Portrait de démonstration généré par IA",
    mediaNote: "À remplacer par le portrait officiel d’Anna Snijder",
    mediaAlt: "Portrait provisoire d’une artiste dans son atelier de peinture",
    introEyebrow: "Présentation de l’artiste",
    introTitle:
      "Une peinture abstraite guidée par ce qui demeure sous la surface.",
    intro:
      "Anna Snijder est une artiste plasticienne internationale spécialisée dans la peinture abstraite. Sa pratique avance par intuition et par superposition : chaque couche conserve une trace, une tension et une part de l’histoire de l’œuvre.",
    principles: [
      ["Intuition", "Laisser le geste ouvrir une direction inattendue."],
      ["Force", "Construire une présence visuelle franche et durable."],
      ["Vulnérabilité", "Accueillir la sensibilité comme matière de création."],
      ["Mémoire", "Préserver l’histoire inscrite dans chaque couche."],
    ],
    engagementEyebrow: "Art et responsabilité sociale",
    engagementTitle: "Une rencontre devenue engagement auprès de l’IAM.",
    engagementIntro:
      "Anna Snijder a rencontré le fondateur de l’Institut Africain du Médicament, le Dr Didier Mouliom, lors d’une exposition internationale. Elle a été particulièrement marquée par la vision de l’IAM et par sa volonté de relier progrès scientifique, sécurité des médicaments et amélioration des soins de santé sur le continent africain.",
    engagementPoints: [
      "Sécurité des médicaments",
      "Progrès scientifique",
      "Amélioration des soins de santé",
      "Santé sur le continent africain",
    ],
    donationEyebrow: "Un soutien concret",
    donationTitle:
      "Chaque acquisition peut aussi contribuer à la mission de l’IAM.",
    donationIntro:
      "Anna Snijder s’engage à reverser à l’Institut Africain du Médicament, au Cameroun, un pourcentage fixe du produit de la vente de chacune de ses œuvres et commandes artistiques.",
    quote:
      "Parce que je crois que l’accès à des soins de santé et à des médicaments sûrs est un droit humain fondamental, je reverse un pourcentage fixe du produit de chaque vente directement à l’Institut Africain du Médicament (IAM) au Cameroun, qu’il s’agisse d’œuvres libres ou de commandes.",
    percentageNote:
      "Le pourcentage contractuel exact n’est pas affiché publiquement.",
    representationEyebrow: "Représentation & collections",
    representationTitle: "Une pratique inscrite dans un réseau international.",
    representationIntro:
      "Les œuvres d’Anna Snijder sont présentes dans des collections privées et d’entreprises, ainsi qu’auprès de gouvernements et de ministères. Aux Pays-Bas, elle est notamment représentée par Imhof Fine Arts, située dans le centre historique de Maastricht.",
    collections: [
      ["Collections privées", "Œuvres acquises par des collectionneurs."],
      [
        "Collections d’entreprises",
        "Présence dans des environnements professionnels.",
      ],
      ["Gouvernements", "Œuvres intégrées à des collections publiques."],
      ["Ministères", "Présence au sein de collections institutionnelles."],
    ],
    studioEyebrow: "Atelier Anna Snijder",
    studioTitle: "Commandes & visites d’atelier sur rendez-vous",
    country: "Pays-Bas",
    visitSite: "Visiter le site de l’artiste",
    writeArtist: "Écrire à l’atelier",
    iamEyebrow: "Référence institutionnelle",
    founder: "Fondateur : Dr Didier Mouliom",
    iamAddress:
      "Bonamoussadi, Bloc 24, en face de la Perception, Douala, Cameroun",
    postOffice: "Boîte postale : 5426 Douala, Cameroun",
    iamLink: "Découvrir l’Institut Africain du Médicament",
  },
  en: {
    breadcrumb: "Partnerships",
    eyebrow: "Art × Health × Social impact × Africa",
    title: "Anna Snijder",
    role: "International visual artist",
    summary:
      "A collaboration in which artistic creation helps support IAM’s scientific and institutional mission.",
    discover: "Discover her work",
    engagementCta: "Explore her commitment",
    mediaStatus: "Temporary visual",
    mediaLabel: "AI-generated demonstration portrait",
    mediaNote: "To be replaced with Anna Snijder’s official portrait",
    mediaAlt: "Temporary portrait of an artist in her painting studio",
    introEyebrow: "Introducing the artist",
    introTitle: "Abstract painting guided by what remains beneath the surface.",
    intro:
      "Anna Snijder is an international visual artist specialising in abstract painting. Her practice develops through intuition and layering: every layer retains a trace, a tension and part of the work’s history.",
    principles: [
      ["Intuition", "Allowing the gesture to open an unexpected direction."],
      ["Strength", "Building a direct and lasting visual presence."],
      ["Vulnerability", "Welcoming sensitivity as creative material."],
      ["Memory", "Preserving the history held within every layer."],
    ],
    engagementEyebrow: "Art and social responsibility",
    engagementTitle: "A meeting that grew into a commitment to IAM.",
    engagementIntro:
      "Anna Snijder met the founder of the African Institute of Medicine, Dr Didier Mouliom, during an international exhibition. She was particularly moved by IAM’s vision and its determination to connect scientific progress, medicine safety and improved health care across the African continent.",
    engagementPoints: [
      "Medicine safety",
      "Scientific progress",
      "Improved health care",
      "Health across the African continent",
    ],
    donationEyebrow: "Tangible support",
    donationTitle: "Every acquisition can also contribute to IAM’s mission.",
    donationIntro:
      "Anna Snijder is committed to donating a fixed percentage of the proceeds from every artwork and commissioned piece to the African Institute of Medicine in Cameroon.",
    quote:
      "Because I believe that access to healthcare and safe medicines is a fundamental human right, I donate a fixed percentage of every sale directly to the African Institute of Medicine (IAM) in Cameroon, whether it is an independent artwork or a commission.",
    percentageNote:
      "The exact contractual percentage is not displayed publicly.",
    representationEyebrow: "Representation & collections",
    representationTitle: "A practice connected to an international network.",
    representationIntro:
      "Anna Snijder’s works are held in private and corporate collections, as well as by governments and ministries. In the Netherlands, she is notably represented by Imhof Fine Arts, located in the historic centre of Maastricht.",
    collections: [
      ["Private collections", "Works acquired by individual collectors."],
      ["Corporate collections", "A presence in professional environments."],
      ["Governments", "Works included in public collections."],
      ["Ministries", "A presence within institutional collections."],
    ],
    studioEyebrow: "Anna Snijder Studio",
    studioTitle: "Commissions & studio visits by appointment",
    country: "The Netherlands",
    visitSite: "Visit the artist’s website",
    writeArtist: "Email the studio",
    iamEyebrow: "Institutional reference",
    founder: "Founder: Dr Didier Mouliom",
    iamAddress:
      "Bonamoussadi, Block 24, opposite the Tax Office, Douala, Cameroon",
    postOffice: "P.O. Box 5426, Douala, Cameroon",
    iamLink: "Discover the African Institute of Medicine",
  },
} as const;

export function ArtistPartnershipPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const icons = [Sparkles, ShieldCheck, Layers3, HeartHandshake];
  const collectionIcons = [Palette, Building2, Landmark, ShieldCheck];
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Anna Snijder",
    jobTitle:
      locale === "fr"
        ? "Artiste plasticienne internationale"
        : "International visual artist",
    url: artistSite,
    sameAs: [artistSite],
    affiliation: {
      "@type": "Organization",
      name: "Institut Africain du Médicament",
      url: SITE_URL,
    },
  };

  return (
    <main id="contenu" className="artist-partnership">
      <StructuredData data={structuredData} />

      <section className="artist-hero">
        <Container>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <Link href={localizePath(locale, "/partenariats")}>
              {t.breadcrumb}
            </Link>
            <span>/</span>
            <span>Anna Snijder</span>
          </nav>

          <div className="artist-hero__grid">
            <div className="artist-hero__content">
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="artist-hero__role">{t.role}</p>
              <p className="artist-hero__summary">{t.summary}</p>
              <div className="button-row">
                <a
                  className="button button--light"
                  href={artistSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.discover}
                  <ArrowUpRight aria-hidden="true" size={17} />
                </a>
                <a className="button button--ghost" href="#engagement">
                  {t.engagementCta}
                  <ArrowDown aria-hidden="true" size={17} />
                </a>
              </div>
            </div>

            <figure className="artist-hero__media">
              <Image
                className="artist-hero__portrait"
                src="/images/partners/anna-snijder-portrait-placeholder.png"
                alt={t.mediaAlt}
                fill
                priority
                sizes="(max-width: 580px) 100vw, (max-width: 900px) 560px, 38vw"
              />
              <span className="artist-hero__status">{t.mediaStatus}</span>
              <figcaption>
                <Palette aria-hidden="true" />
                <strong>{t.mediaLabel}</strong>
                <small>{t.mediaNote}</small>
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="artist-intro section">
        <Container>
          <header className="artist-section-heading">
            <p className="eyebrow">{t.introEyebrow}</p>
            <h2>{t.introTitle}</h2>
            <p className="text-justify">{t.intro}</p>
          </header>

          <div className="artist-principles">
            {t.principles.map(([title, description], index) => {
              const Icon = icons[index] ?? Sparkles;
              return (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="artist-engagement section" id="engagement">
        <Container className="artist-engagement__grid">
          <div>
            <p className="eyebrow">{t.engagementEyebrow}</p>
            <h2>{t.engagementTitle}</h2>
          </div>
          <div>
            <p className="artist-engagement__intro text-justify">
              {t.engagementIntro}
            </p>
            <ul>
              {t.engagementPoints.map((point, index) => (
                <li key={point}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="artist-donation section">
        <Container className="artist-donation__grid">
          <div className="artist-donation__heading">
            <p className="eyebrow">{t.donationEyebrow}</p>
            <h2>{t.donationTitle}</h2>
            <p className="text-justify">{t.donationIntro}</p>
          </div>
          <blockquote>
            <Quote aria-hidden="true" />
            <p>“{t.quote}”</p>
            <footer>Anna Snijder</footer>
            <small>{t.percentageNote}</small>
          </blockquote>
        </Container>
      </section>

      <section className="artist-representation section">
        <Container>
          <header className="artist-section-heading artist-section-heading--wide">
            <p className="eyebrow">{t.representationEyebrow}</p>
            <h2>{t.representationTitle}</h2>
            <p className="text-justify">{t.representationIntro}</p>
          </header>
          <div className="artist-collections">
            {t.collections.map(([title, description], index) => {
              const Icon = collectionIcons[index] ?? Palette;
              return (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="artist-studio section">
        <Container className="artist-studio__grid">
          <div>
            <p className="eyebrow">{t.studioEyebrow}</p>
            <h2>{t.studioTitle}</h2>
          </div>
          <address className="artist-studio__card">
            <MapPin aria-hidden="true" />
            <strong>Atelier Anna Snijder</strong>
            <span>Kobaltstraat 7C</span>
            <span>1411 AM Naarden</span>
            <span>{t.country}</span>
            <div className="artist-studio__links">
              <a href={artistSite} target="_blank" rel="noopener noreferrer">
                {t.visitSite}
                <ArrowUpRight aria-hidden="true" size={16} />
              </a>
              <a href={`mailto:${artistEmail}`}>
                <Mail aria-hidden="true" size={16} />
                {artistEmail}
              </a>
            </div>
          </address>
        </Container>
      </section>

      <section className="artist-iam-reference">
        <Container className="artist-iam-reference__grid">
          <div>
            <p className="eyebrow">{t.iamEyebrow}</p>
            <strong>Institut Africain du Médicament (IAM)</strong>
          </div>
          <address>
            <span>{t.founder}</span>
            <span>{t.iamAddress}</span>
            <span>{t.postOffice}</span>
          </address>
          <Link href={localizePath(locale, "/institut/a-propos")}>
            {t.iamLink}
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </Container>
      </section>
    </main>
  );
}
