import Link from "next/link";
import {
  Building2,
  Clock3,
  Construction,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { ButtonLink, Container } from "./ui";

type PendingPage = "institute" | "participate";

const content = {
  institute: {
    fr: {
      home: "Accueil",
      breadcrumbLabel: "Fil d’Ariane",
      eyebrow: "Espace institutionnel",
      status: "Finalisation en cours",
      title: "Cette page se construit avec soin.",
      summary:
        "Nous préparons un espace institutionnel clair, fiable et documenté. Il sera publié dès que sa mise en ligne aura été validée.",
      availability: "Ouverture prochaine",
      progress: "Préparation de la page",
      points: [
        ["Contenus en révision", FileCheck2],
        ["Informations contrôlées", ShieldCheck],
        ["Publication à venir", Clock3],
      ],
      homeAction: "Retour à l’accueil",
      contactAction: "Nous contacter",
      note: "Merci pour votre patience.",
    },
    en: {
      home: "Home",
      breadcrumbLabel: "Breadcrumb",
      eyebrow: "Institutional area",
      status: "Finalisation in progress",
      title: "This page is being built with care.",
      summary:
        "We are preparing a clear, reliable and documented institutional space. It will be published as soon as its release has been approved.",
      availability: "Opening soon",
      progress: "Page preparation",
      points: [
        ["Content under review", FileCheck2],
        ["Information being verified", ShieldCheck],
        ["Publication forthcoming", Clock3],
      ],
      homeAction: "Return home",
      contactAction: "Contact us",
      note: "Thank you for your patience.",
    },
  },
  participate: {
    fr: {
    home: "Accueil",
    breadcrumbLabel: "Fil d’Ariane",
    eyebrow: "Participer",
    status: "Finalisation en cours",
    title: "Votre espace de participation arrive bientôt.",
    summary:
      "Nous préparons des parcours clairs pour collaborer, proposer une initiative et contribuer aux actions de l’IAM. Cet espace sera publié après validation de ses modalités.",
    availability: "Ouverture prochaine",
    progress: "Préparation des parcours",
    points: [
      ["Parcours en préparation", FileCheck2],
      ["Modalités en validation", ShieldCheck],
      ["Accès prochainement", Clock3],
    ],
    homeAction: "Retour à l’accueil",
    contactAction: "Nous contacter",
    note: "Merci pour votre patience.",
  },
    en: {
    home: "Home",
    breadcrumbLabel: "Breadcrumb",
    eyebrow: "Get involved",
    status: "Finalisation in progress",
    title: "Your participation space is coming soon.",
    summary:
      "We are preparing clear pathways to collaborate, propose an initiative and contribute to IAM activities. This space will be published once its participation terms have been approved.",
    availability: "Opening soon",
    progress: "Participation pathways",
    points: [
      ["Pathways in preparation", FileCheck2],
      ["Terms being validated", ShieldCheck],
      ["Access coming soon", Clock3],
    ],
    homeAction: "Return home",
    contactAction: "Contact us",
    note: "Thank you for your patience.",
  },
  },
} as const;

export function UnderConstructionPage({
  locale,
  page = "institute",
}: {
  locale: Locale;
  page?: PendingPage;
}) {
  const copy = content[page][locale];

  return (
    <main className="construction-page" id="contenu">
      <Container>
        <nav
          className="construction-page__breadcrumb"
          aria-label={copy.breadcrumbLabel}
        >
          <Link href={localizePath(locale, "/")}>{copy.home}</Link>
          <span aria-hidden="true">/</span>
          <span>{copy.eyebrow}</span>
        </nav>

        <section className="construction-page__panel" aria-labelledby="construction-title">
          <div className="construction-page__content">
            <div className="construction-page__status">
              <span className="construction-page__status-dot" aria-hidden="true" />
              {copy.status}
            </div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="construction-title">{copy.title}</h1>
            <p className="construction-page__summary">{copy.summary}</p>

            <ul className="construction-page__points">
              {copy.points.map(([label, Icon]) => (
                <li key={label}>
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="construction-page__actions">
              <ButtonLink href={localizePath(locale, "/")} variant="light">
                {copy.homeAction}
              </ButtonLink>
              <ButtonLink
                href={localizePath(locale, "/contact")}
                variant="ghost"
              >
                {copy.contactAction}
              </ButtonLink>
            </div>
            <p className="construction-page__note">{copy.note}</p>
          </div>

          <div className="construction-page__visual" aria-hidden="true">
            <div className="construction-page__grid" />
            <div className="construction-page__orbit construction-page__orbit--one" />
            <div className="construction-page__orbit construction-page__orbit--two" />
            <div className="construction-page__building">
              <Building2 />
              <span className="construction-page__tool">
                <Construction />
              </span>
            </div>
            <div className="construction-page__visual-copy">
              <strong>{copy.availability}</strong>
              <span>{copy.progress}</span>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
