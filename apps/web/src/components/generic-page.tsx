import Link from "next/link";
import { BadgeCheck, Palette } from "lucide-react";
import type { Locale, PageEntry } from "@/lib/content";
import { copy, localizePath, pillars, programmes } from "@/lib/content";
import { ContactForm } from "./contact-form";
import { NewsletterForm } from "./newsletter-form";
import { MedicalDisclaimer } from "./medical-disclaimer";
import { ButtonLink, Checklist, Container } from "./ui";

type PageHeroVariant =
  "institute" | "priorities" | "participate" | "editorial" | "contact";

function heroVariantForPath(path: string): PageHeroVariant {
  if (path === "/contact") return "contact";
  if (path === "/participer" || path === "/partenariats") {
    return "participate";
  }
  if (path.startsWith("/actualites-medias") || path === "/newsletter") {
    return "editorial";
  }
  if (
    path.startsWith("/priorites") ||
    path.startsWith("/programmes") ||
    path === "/alertes"
  ) {
    return "priorities";
  }
  return "institute";
}

function pageHeroClass(variant: PageHeroVariant, detail = false) {
  return [
    "page-hero",
    "page-hero--with-image",
    `page-hero--${variant}`,
    detail ? "page-hero--detail" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function GenericPage({
  locale,
  entry,
  formType = "contact",
}: {
  locale: Locale;
  entry: PageEntry;
  formType?: string;
}) {
  const data = entry[locale];
  const Icon = entry.icon;
  const isContact = entry.path === "/contact";
  const heroVariant = heroVariantForPath(entry.path);
  return (
    <main id="contenu">
      <section className={pageHeroClass(heroVariant)}>
        <Container>
          <div className="breadcrumb">
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <span>{data.eyebrow}</span>
          </div>
          <div className="page-hero__grid">
            <div>
              <p className="eyebrow">{data.eyebrow}</p>
              <h1>{data.title}</h1>
              <p>{data.summary}</p>
            </div>
            <div className="page-hero__icon">
              <Icon aria-hidden="true" />
              <span>
                IAM /{" "}
                {String(
                  entry.path.split("/").filter(Boolean)[0] ?? "home",
                ).toUpperCase()}
              </span>
            </div>
          </div>
        </Container>
      </section>
      <section className="page-content section">
        <Container className="page-content__grid">
          <article>
            <p className="lead text-justify">{data.intro}</p>
            {entry.path === "/priorites" ? (
              <MedicalDisclaimer locale={locale} />
            ) : null}
            <Checklist items={data.bullets} />
            {entry.path === "/institut" && (
              <ButtonLink
                className="page-content__mission-link"
                href={localizePath(locale, "/institut/mission-vision")}
                variant="secondary"
              >
                {locale === "fr"
                  ? "Découvrir notre mission et notre vision"
                  : "Discover our mission and vision"}
              </ButtonLink>
            )}
            {entry.path === "/institut" && (
              <aside className="ama-note">
                <BadgeCheck aria-hidden="true" />
                <p className="text-justify">
                  <strong>
                    {locale === "fr" ? "IAM et AMA" : "IAM and AMA"}
                  </strong>
                  <br />
                  {locale === "fr"
                    ? "L’Institut Africain du Médicament est présenté comme une organisation distincte de l’Agence africaine du médicament créée par traité de l’Union africaine. Aucun lien institutionnel n’est présumé."
                    : "The African Institute of Medicine is presented as an organisation distinct from the African Medicines Agency established by African Union treaty. No institutional link is assumed."}
                </p>
              </aside>
            )}
            {entry.path === "/partenariats" && (
              <aside className="partnership-feature">
                <div className="partnership-feature__icon">
                  <Palette aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow">
                    {locale === "fr"
                      ? "Collaboration artistique"
                      : "Artistic collaboration"}
                  </p>
                  <h2>Anna Snijder × IAM</h2>
                  <p>
                    {locale === "fr"
                      ? "Découvrir une collaboration qui relie création artistique, santé et impact social."
                      : "Discover a collaboration connecting artistic creation, health and social impact."}
                  </p>
                  <ButtonLink
                    href={localizePath(locale, "/partenariats/anna-snijder")}
                    variant="secondary"
                  >
                    {locale === "fr"
                      ? "Découvrir la collaboration"
                      : "Discover the collaboration"}
                  </ButtonLink>
                </div>
              </aside>
            )}
          </article>
          <aside className="page-side">
            <p className="eyebrow">
              {locale === "fr"
                ? "Principe de publication"
                : "Publishing principle"}
            </p>
            <h2>{copy[locale].sections.evidence.title}</h2>
            <p>{copy[locale].sections.evidence.summary}</p>
            <ButtonLink
              href={localizePath(locale, "/contact")}
              variant="secondary"
            >
              {locale === "fr" ? "Poser une question" : "Ask a question"}
            </ButtonLink>
          </aside>
        </Container>
      </section>
      {entry.path === "/priorites" && (
        <section className="subcards section">
          <Container>
            <div className="pillars-grid pillars-grid--compact">
              {pillars.map((p) => {
                const PIcon = p.icon;
                return (
                  <Link
                    className="pillar-card"
                    key={p.slug}
                    href={localizePath(locale, `/priorites/${p.slug}`)}
                  >
                    <div className="pillar-card__top">
                      <span>{p.number}</span>
                      <PIcon />
                    </div>
                    <h3>{p[locale].title}</h3>
                    <p>{p[locale].summary}</p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
      {isContact && (
        <section className="contact-section section">
          <Container className="contact-section__grid">
            <div>
              <p className="eyebrow">
                {locale === "fr" ? "Formulaire sécurisé" : "Secure form"}
              </p>
              <h2>
                {locale === "fr"
                  ? "Parlez-nous de votre demande."
                  : "Tell us about your request."}
              </h2>
              <p>
                {locale === "fr"
                  ? "L’envoi reste désactivé tant que les adresses professionnelles, l’anti-spam et le service email ne sont pas configurés."
                  : "Delivery remains disabled until professional addresses, anti-spam and the email service are configured."}
              </p>
            </div>
            <ContactForm locale={locale} type={formType} />
          </Container>
        </section>
      )}
    </main>
  );
}

export function DetailPage({
  locale,
  slug,
}: {
  locale: Locale;
  slug: string[];
}) {
  const joined = slug.join("/");
  const pillar = pillars.find((item) => `priorites/${item.slug}` === joined);
  const program = programmes.find((item) => item.path.slice(1) === joined);
  const title =
    pillar?.[locale]?.title ??
    program?.[locale]?.title ??
    (locale === "fr"
      ? "Contenu en préparation éditoriale"
      : "Content under editorial preparation");
  const summary =
    pillar?.[locale]?.summary ??
    program?.[locale]?.summary ??
    (locale === "fr"
      ? "Cette page est prête à recevoir un contenu vérifié depuis Sanity."
      : "This page is ready to receive verified content from Sanity.");
  const Icon = pillar?.icon ?? program?.icon ?? BadgeCheck;
  const heroVariant = heroVariantForPath(`/${joined}`);
  return (
    <main id="contenu">
      <section className={pageHeroClass(heroVariant, true)}>
        <Container>
          <div className="breadcrumb">
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <span>{title}</span>
          </div>
          <div className="page-hero__grid">
            <div>
              <p className="eyebrow">IAM</p>
              <h1>{title}</h1>
              <p>{summary}</p>
            </div>
            <div className="page-hero__icon">
              <Icon aria-hidden="true" />
              <span>
                {locale === "fr"
                  ? "Contenu structuré et sourcé"
                  : "Structured, sourced content"}
              </span>
            </div>
          </div>
        </Container>
      </section>
      <section className="detail-content section">
        <Container>
          <MedicalDisclaimer locale={locale} />
          <div className="detail-empty">
            <BadgeCheck aria-hidden="true" />
            <h2>
              {locale === "fr"
                ? "Publication sous contrôle éditorial"
                : "Editorially controlled publishing"}
            </h2>
            <p>
              {locale === "fr"
                ? "Les projets, responsables, pays, partenaires, chiffres et documents associés n’apparaîtront ici qu’après validation de leur source."
                : "Projects, owners, countries, partners, figures and documents will only appear here after source verification."}
            </p>
            <ButtonLink
              href={localizePath(locale, "/contact")}
              variant="secondary"
            >
              {locale === "fr" ? "Contacter l’IAM" : "Contact IAM"}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

export function NewsletterPage({ locale }: { locale: Locale }) {
  return (
    <main id="contenu">
      <section className={pageHeroClass("editorial")}>
        <Container>
          <p className="eyebrow">IAM Pharmaceutical Intelligence</p>
          <h1>{copy[locale].sections.newsletter.title}</h1>
          <p>{copy[locale].sections.newsletter.summary}</p>
        </Container>
      </section>
      <section className="newsletter-page section">
        <Container>
          <NewsletterForm locale={locale} />
        </Container>
      </section>
    </main>
  );
}
