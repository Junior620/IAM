import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Database,
  FileCheck2,
  FlaskConical,
  HandHeart,
  Leaf,
  LockKeyhole,
  Network,
  ScanSearch,
  Scale,
  ShieldCheck,
} from "lucide-react";
import {
  alertCategories,
  copy,
  localizePath,
  pillars,
  programmes,
  type Locale,
} from "@/lib/content";
import { AfricaDataVisual } from "./map-visual";
import { HeroGlobe } from "./hero-globe";
import { NewsletterForm } from "./newsletter-form";
import {
  Badge,
  ButtonLink,
  Container,
  DividerLabel,
  SectionHeader,
} from "./ui";

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <>
      <main id="contenu">
        <section className="hero">
          <div className="hero__media" aria-hidden="true">
            <Image
              className="hero__media-image"
              src="/images/iam-hero-pharmacist-v2.png"
              alt=""
              fill
              priority
              sizes="100vw"
            />
          </div>
          <Container className="hero__grid">
            <div className="hero__content">
              <p className="eyebrow">{t.hero.eyebrow}</p>
              <h1>{t.hero.title}</h1>
              <p className="hero__summary">{t.hero.summary}</p>
              <div className="button-row">
                <ButtonLink
                  href={localizePath(locale, "/institut/nos-services")}
                >
                  {locale === "fr"
                    ? "Découvrir nos services"
                    : "Explore our services"}
                </ButtonLink>
                <ButtonLink
                  href={localizePath(locale, "/partenariats")}
                  variant="secondary"
                >
                  {t.hero.partner}
                </ButtonLink>
              </div>
              <Link
                className="text-link text-link--light"
                href={localizePath(locale, "/alertes")}
                prefetch={false}
              >
                <ShieldCheck aria-hidden="true" size={18} />
                {t.hero.alerts}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <HeroGlobe locale={locale} />
          </Container>
          <div className="hero__rail" aria-hidden="true">
            <span>01</span>
            <span />
            <span>08</span>
          </div>
        </section>

        <section className="evidence section">
          <Container>
            <SectionHeader {...t.sections.evidence} />
            <div className="evidence-grid">
              <article>
                <FileCheck2 aria-hidden="true" />
                <p>
                  {locale === "fr"
                    ? "Source identifiable"
                    : "Identifiable source"}
                </p>
                <strong>
                  {locale === "fr" ? "Traçabilité" : "Traceability"}
                </strong>
              </article>
              <article>
                <BadgeCheck aria-hidden="true" />
                <p>
                  {locale === "fr"
                    ? "Validation responsable"
                    : "Responsible review"}
                </p>
                <strong>
                  {locale === "fr" ? "Vérification" : "Verification"}
                </strong>
              </article>
              <article>
                <CalendarDays aria-hidden="true" />
                <p>
                  {locale === "fr" ? "Date et périmètre" : "Date and scope"}
                </p>
                <strong>{locale === "fr" ? "Actualité" : "Currency"}</strong>
              </article>
              <article>
                <LockKeyhole aria-hidden="true" />
                <p>
                  {locale === "fr"
                    ? "Consentement et droits"
                    : "Consent and rights"}
                </p>
                <strong>{locale === "fr" ? "Intégrité" : "Integrity"}</strong>
              </article>
            </div>
            <p className="source-rule">
              <CheckCircle2 aria-hidden="true" size={17} />
              {t.common.sourcePolicy}
            </p>
          </Container>
        </section>

        <section className="about-home section">
          <Container className="about-home__grid">
            <figure className="about-home__visual">
              <Image
                className="about-home__image"
                src="/images/home-about-team.webp"
                alt={
                  locale === "fr"
                    ? "Une équipe de pharmaciens échange autour d’un document et d’une tablette dans une pharmacie"
                    : "A pharmacy team reviews a document and a tablet in a pharmacy"
                }
                fill
                sizes="(max-width: 820px) 100vw, 42vw"
              />
              <span className="about-home__index">
                {locale === "fr" ? "IAM / Depuis 2008" : "IAM / Since 2008"}
              </span>
              <figcaption>
                <strong>
                  {locale === "fr"
                    ? "Une expertise collective, de la pharmacie de terrain à la coopération scientifique."
                    : "Collective expertise, from pharmacy practice to scientific cooperation."}
                </strong>
                <span>
                  {locale === "fr"
                    ? "Science · Accès · Coopération"
                    : "Science · Access · Cooperation"}
                </span>
              </figcaption>
            </figure>
            <div className="about-home__content">
              <SectionHeader
                eyebrow={locale === "fr" ? "À propos de nous" : "About us"}
                title={
                  locale === "fr"
                    ? "Un institut africain au service du médicament."
                    : "An African institute serving medicine."
                }
                summary={
                  locale === "fr"
                    ? "Créé en 2008 par le Dr Didier Mouliom, l’Institut Africain du Médicament contribue à faire progresser le médicament en Afrique, de la recherche à l’accès."
                    : "Established in 2008 by Dr Didier Mouliom, the African Institute of Medicine helps advance medicine in Africa, from research to access."
                }
              />
              <div className="about-home__principles">
                <div>
                  <FlaskConical aria-hidden="true" />
                  <span>
                    {locale === "fr" ? "Science utile" : "Useful science"}
                  </span>
                </div>
                <div>
                  <Network aria-hidden="true" />
                  <span>{locale === "fr" ? "Coopération" : "Cooperation"}</span>
                </div>
                <div>
                  <Scale aria-hidden="true" />
                  <span>
                    {locale === "fr" ? "Action rigoureuse" : "Rigorous action"}
                  </span>
                </div>
              </div>
              <ButtonLink href={localizePath(locale, "/institut/a-propos")}>
                {locale === "fr"
                  ? "Découvrir l’Institut"
                  : "Discover the Institute"}
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="alerts-section section">
          <Container>
            <div className="section-split">
              <SectionHeader {...t.sections.alerts} />
              <div className="alert-status">
                <span className="status-dot" />
                <strong>{t.common.noAlert}</strong>
                <small>
                  {locale === "fr"
                    ? "Dernière vérification : contenu institutionnel"
                    : "Latest check: institutional content"}
                </small>
              </div>
            </div>
            <div className="alert-grid">
              {alertCategories.map(({ icon: Icon, tone, ...labels }) => (
                <Link
                  key={labels.fr}
                  className={`alert-card alert-card--${tone}`}
                  href={localizePath(locale, "/alertes")}
                >
                  <Icon aria-hidden="true" />
                  <span>{labels[locale]}</span>
                  <ArrowRight aria-hidden="true" size={17} />
                </Link>
              ))}
            </div>
            <div className="safety-note">
              <ShieldCheck aria-hidden="true" />
              <p>
                <strong>
                  {locale === "fr" ? "Sécurité d’abord." : "Safety first."}
                </strong>{" "}
                {locale === "fr"
                  ? "Ce site ne fournit ni diagnostic ni conseil médical personnalisé. En cas d’urgence, contactez les services de santé compétents."
                  : "This website does not provide diagnoses or personalised medical advice. In an emergency, contact the appropriate health services."}
              </p>
            </div>
          </Container>
        </section>

        <section className="pillars-section section">
          <Container>
            <SectionHeader {...t.sections.pillars} />
            <div className="pillars-grid">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <Link
                    className="pillar-card"
                    href={localizePath(locale, `/priorites/${pillar.slug}`)}
                    key={pillar.number}
                  >
                    <div className="pillar-card__top">
                      <span>{pillar.number}</span>
                      <Icon aria-hidden="true" />
                    </div>
                    <h3>{pillar[locale].title}</h3>
                    <p>{pillar[locale].summary}</p>
                    <span className="card-link">
                      {t.common.explore}
                      <ArrowRight aria-hidden="true" size={16} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="programmes-section section">
          <Container>
            <SectionHeader {...t.sections.programs} />
            <div className="programmes-grid">
              {programmes.map((program, index) => {
                const Icon = program.icon;
                return (
                  <article
                    className={`program-card program-card--${index + 1}`}
                    key={program.path}
                  >
                    <div className="program-card__meta">
                      <Badge>{program[locale].label}</Badge>
                      <span>0{index + 1}</span>
                    </div>
                    <Icon aria-hidden="true" size={34} />
                    <h3>{program[locale].title}</h3>
                    <p>{program[locale].summary}</p>
                    <Link
                      className="card-link"
                      href={localizePath(locale, program.path)}
                    >
                      {t.common.explore}
                      <ArrowRight aria-hidden="true" size={16} />
                    </Link>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="map-section section">
          <Container className="map-section__grid">
            <div>
              <SectionHeader {...t.sections.map} />
              <ul className="plain-list">
                <li>
                  {locale === "fr"
                    ? "Programmes géolocalisés"
                    : "Geolocated programmes"}
                </li>
                <li>
                  {locale === "fr"
                    ? "Institutions et laboratoires reliés"
                    : "Linked institutions and laboratories"}
                </li>
                <li>
                  {locale === "fr"
                    ? "Sources et dates visibles"
                    : "Visible sources and dates"}
                </li>
                <li>
                  {locale === "fr"
                    ? "Liste accessible équivalente"
                    : "Equivalent accessible list"}
                </li>
              </ul>
            </div>
            <AfricaDataVisual locale={locale} />
          </Container>
        </section>

        <section className="science-section section">
          <Container>
            <div className="section-split">
              <SectionHeader {...t.sections.science} />
              <div className="molecule-mark" aria-hidden="true">
                <Leaf />
                <span />
                <FlaskConical />
              </div>
            </div>
            <div className="science-grid">
              <article className="science-feature">
                <Image
                  className="science-feature__image"
                  src="/images/home-pharmacopoeia-research.webp"
                  alt={
                    locale === "fr"
                      ? "Deux chercheurs africains étudient des plantes médicinales dans un laboratoire"
                      : "Two African researchers study medicinal plants in a laboratory"
                  }
                  fill
                  sizes="(max-width: 820px) 100vw, 63vw"
                />
                <span className="science-feature__number">03</span>
                <Leaf aria-hidden="true" size={38} />
                <h3>
                  {locale === "fr"
                    ? "Jumeau scientifique de la pharmacopée africaine"
                    : "Scientific twin of the African pharmacopoeia"}
                </h3>
                <p>
                  {locale === "fr"
                    ? "Relier plante, taxonomie, territoire, usages, preuves, molécules, toxicité, interactions et propriété intellectuelle."
                    : "Connecting plants, taxonomy, territories, uses, evidence, molecules, toxicity, interactions and intellectual property."}
                </p>
                <Link
                  className="card-link"
                  href={localizePath(
                    locale,
                    "/priorites/pharmacopee-africaine",
                  )}
                >
                  {t.common.explore}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              </article>
              <div className="science-stack">
                <article>
                  <BookOpen aria-hidden="true" />
                  <div>
                    <h3>
                      {locale === "fr"
                        ? "Bibliothèque scientifique"
                        : "Scientific library"}
                    </h3>
                    <p>
                      {locale === "fr"
                        ? "DOI, auteurs, méthodes, sources et relecteurs."
                        : "DOIs, authors, methods, sources and reviewers."}
                    </p>
                  </div>
                </article>
                <article>
                  <ScanSearch aria-hidden="true" />
                  <div>
                    <h3>
                      {locale === "fr"
                        ? "Appels à collaborations"
                        : "Calls for collaboration"}
                    </h3>
                    <p>
                      {locale === "fr"
                        ? "Chercheurs, laboratoires et projets reliés par expertise."
                        : "Researchers, laboratories and projects connected by expertise."}
                    </p>
                  </div>
                </article>
                <article>
                  <Database aria-hidden="true" />
                  <div>
                    <h3>
                      {locale === "fr"
                        ? "Données réutilisables"
                        : "Reusable data"}
                    </h3>
                    <p>
                      {locale === "fr"
                        ? "Méthodologies, formats et dates de mise à jour."
                        : "Methodologies, formats and update dates."}
                    </p>
                  </div>
                </article>
              </div>
            </div>
          </Container>
        </section>

        <section className="impact-section section">
          <Container>
            <SectionHeader {...t.sections.impact} />
            <div className="impact-method">
              <div>
                <span>01</span>
                <h3>{locale === "fr" ? "Consentement" : "Consent"}</h3>
                <p>
                  {locale === "fr"
                    ? "Droits écrits et périmètre de publication."
                    : "Written rights and publication scope."}
                </p>
              </div>
              <div>
                <span>02</span>
                <h3>{locale === "fr" ? "Contexte" : "Context"}</h3>
                <p>
                  {locale === "fr"
                    ? "Programme, territoire, période et méthode."
                    : "Programme, territory, timeframe and method."}
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>{locale === "fr" ? "Résultat" : "Outcome"}</h3>
                <p>
                  {locale === "fr"
                    ? "Indicateur sourcé et date de vérification."
                    : "Sourced indicator and verification date."}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="youth-section section">
          <Container className="youth-grid">
            <figure className="youth-visual">
              <Image
                className="youth-visual__image"
                src="/images/home-youth-health.webp"
                alt={
                  locale === "fr"
                    ? "De jeunes adultes et des pharmaciens préparent une activité de prévention et d’activité physique"
                    : "Young adults and pharmacists prepare a prevention and physical activity session"
                }
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
              <figcaption className="youth-visual__caption">
                {locale === "fr"
                  ? "Jeunes adultes · prévention · engagement"
                  : "Young adults · prevention · engagement"}
              </figcaption>
              <div className="youth-visual__track">
                <span>{locale === "fr" ? "Prévention" : "Prevention"}</span>
                <span>
                  {locale === "fr" ? "Activité physique" : "Activity"}
                </span>
                <span>{locale === "fr" ? "Solidarité" : "Solidarity"}</span>
              </div>
            </figure>
            <div>
              <SectionHeader {...t.sections.youth} />
              <p className="youth-note">
                {locale === "fr"
                  ? "Les profils d’ambassadeurs, images de mineurs et résultats restent masqués tant que les autorisations nécessaires ne sont pas archivées."
                  : "Ambassador profiles, images of minors and outcomes remain hidden until the required permissions are archived."}
              </p>
              <div className="button-row">
                <ButtonLink
                  href={localizePath(
                    locale,
                    "/programmes/generation-sante-afrique",
                  )}
                >
                  {locale === "fr"
                    ? "Découvrir l’initiative"
                    : "Discover the initiative"}
                </ButtonLink>
                <ButtonLink
                  href={localizePath(locale, "/partenariats#soutenir")}
                  variant="secondary"
                >
                  {locale === "fr"
                    ? "Soutenir le programme"
                    : "Support the programme"}
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>

        <section className="publications-section section">
          <Container>
            <SectionHeader {...t.sections.publications} />
            <div className="library-grid">
              {[
                [
                  BookOpen,
                  locale === "fr"
                    ? "Publications scientifiques"
                    : "Scientific publications",
                  locale === "fr"
                    ? "Références, DOI et niveau de preuve"
                    : "References, DOIs and evidence level",
                ],
                [
                  FileCheck2,
                  locale === "fr"
                    ? "Rapports institutionnels"
                    : "Institutional reports",
                  locale === "fr"
                    ? "Mandat, méthode et période couverte"
                    : "Mandate, method and reporting period",
                ],
                [
                  Database,
                  locale === "fr"
                    ? "Données & méthodologies"
                    : "Data & methodologies",
                  locale === "fr"
                    ? "Formats, sources et réutilisation"
                    : "Formats, sources and reuse",
                ],
                [
                  BookOpen,
                  locale === "fr"
                    ? "Notes de politique publique"
                    : "Policy briefs",
                  locale === "fr"
                    ? "Synthèses pour l’action publique"
                    : "Briefs for public action",
                ],
              ].map(([Icon, title, summary]) => {
                const I = Icon as typeof BookOpen;
                return (
                  <article key={String(title)}>
                    <I aria-hidden="true" />
                    <h3>{String(title)}</h3>
                    <p>{String(summary)}</p>
                    <span className="verification-chip">
                      <BadgeCheck aria-hidden="true" size={14} />
                      {locale === "fr"
                        ? "Publication après validation"
                        : "Published after review"}
                    </span>
                  </article>
                );
              })}
            </div>
          </Container>
        </section>

        <section className="partners-section section">
          <Container className="partners-grid">
            <div>
              <SectionHeader {...t.sections.partners} />
              <ButtonLink href={localizePath(locale, "/partenariats")}>
                {t.hero.partner}
              </ButtonLink>
            </div>
            <div className="partner-proof">
              <div>
                <span>01</span>
                <p>
                  {locale === "fr"
                    ? "Nature de la coopération"
                    : "Nature of cooperation"}
                </p>
              </div>
              <div>
                <span>02</span>
                <p>
                  {locale === "fr"
                    ? "Programme concerné"
                    : "Relevant programme"}
                </p>
              </div>
              <div>
                <span>03</span>
                <p>
                  {locale === "fr" ? "Résultat validé" : "Verified outcome"}
                </p>
              </div>
            </div>
          </Container>
        </section>

        <section className="philanthropy-section section" id="soutenir">
          <Container className="philanthropy-grid">
            <div>
              <HandHeart aria-hidden="true" size={48} />
              <SectionHeader {...t.sections.philanthropy} invert />
            </div>
            <div className="philanthropy-panel">
              <Badge tone="copper">
                {locale === "fr"
                  ? "Paiement non activé"
                  : "Payments not enabled"}
              </Badge>
              <h3>
                {locale === "fr"
                  ? "Préparer une coopération philanthropique"
                  : "Prepare a philanthropic partnership"}
              </h3>
              <p>
                {locale === "fr"
                  ? "Décrivez votre intérêt. L’équipe concernée répondra lorsque les coordonnées professionnelles et le routage sécurisé seront configurés."
                  : "Tell us about your interest. The relevant team will respond once professional contact details and secure routing are configured."}
              </p>
              <ButtonLink
                href={localizePath(locale, "/contact?type=philanthropy")}
                variant="light"
              >
                {locale === "fr" ? "Proposer un soutien" : "Propose support"}
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="news-section section">
          <Container>
            <SectionHeader {...t.sections.news} />
            <div className="news-empty">
              <div>
                <span className="live-dot" />
                {locale === "fr"
                  ? "Flux éditorial vérifié"
                  : "Verified editorial feed"}
              </div>
              <h3>
                {locale === "fr"
                  ? "Les actualités seront visibles dès leur validation dans Sanity."
                  : "News will appear as soon as it is approved in Sanity."}
              </h3>
              <p>
                {locale === "fr"
                  ? "Aucun communiqué, événement ou résultat n’est inventé pour remplir l’interface."
                  : "No statement, event or outcome is invented to fill the interface."}
              </p>
              <ButtonLink
                href={localizePath(locale, "/actualites-medias")}
                variant="secondary"
              >
                {locale === "fr"
                  ? "Voir le centre médias"
                  : "Open the media centre"}
              </ButtonLink>
            </div>
          </Container>
        </section>

        <section className="newsletter-section section">
          <Container className="newsletter-grid">
            <div>
              <SectionHeader {...t.sections.newsletter} invert />
              <div className="newsletter-trust">
                <span>
                  <CheckCircle2 aria-hidden="true" />
                  Double opt-in
                </span>
                <span>
                  <ShieldCheck aria-hidden="true" />
                  {locale === "fr"
                    ? "Préférences contrôlées"
                    : "Controlled preferences"}
                </span>
                <span>
                  <LockKeyhole aria-hidden="true" />
                  {locale === "fr" ? "Données minimales" : "Minimal data"}
                </span>
              </div>
            </div>
            <NewsletterForm locale={locale} />
          </Container>
        </section>
        <DividerLabel>
          {locale === "fr"
            ? "Science · coopération · accès"
            : "Science · cooperation · access"}
        </DividerLabel>
      </main>
    </>
  );
}
