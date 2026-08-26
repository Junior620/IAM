import Link from "next/link";
import {
  BadgeCheck,
  BookOpenCheck,
  Building2,
  CalendarClock,
  GraduationCap,
  Laptop,
  MapPin,
  Microscope,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { MedicalDisclaimer } from "./medical-disclaimer";
import { ButtonLink, Container } from "./ui";

const content = {
  fr: {
    eyebrow: "Académie IAM",
    title: "Nos formations",
    summary:
      "Des parcours construits autour des besoins des professionnels, des institutions et des acteurs de terrain pour faire évoluer durablement les pratiques de santé.",
    heroLabel: "Formation · accompagnement · suivi",
    formatsEyebrow: "Formats pédagogiques",
    formatsTitle: "Apprendre, pratiquer et transmettre.",
    formatsSummary:
      "L’IAM articule plusieurs modalités afin d’adapter chaque intervention au niveau des participants, à leur environnement professionnel et aux objectifs recherchés.",
    formats: [
      {
        title: "Formation de formateurs",
        text: "Développer les capacités des partenaires nationaux pour organiser une transmission durable des compétences.",
        icon: UsersRound,
      },
      {
        title: "Formation en salle",
        text: "Proposer des formations initiales et des sessions de recyclage centrées sur la prise en charge et les pratiques professionnelles.",
        icon: GraduationCap,
      },
      {
        title: "Tutorat de proximité",
        text: "Accompagner régulièrement les professionnels dans leur environnement de travail et au plus près de leurs pratiques.",
        icon: Stethoscope,
      },
      {
        title: "Parcours qualifiants",
        text: "Articuler formation diplômante, apprentissage en ligne et stages pratiques dans des services de référence.",
        icon: Laptop,
      },
    ],
    workshopsEyebrow: "Champs de formation",
    workshopsTitle: "Nos ateliers de formation",
    workshopsNote:
      "Ces thématiques présentent les domaines d’intervention de l’IAM. Elles ne constituent pas l’annonce d’une session actuellement ouverte à l’inscription.",
    workshops: [
      "Fabrication des savons et autres produits cosmétiques",
      "Évaluation de la sécurité et de la qualité des produits cosmétiques",
      "Guide pratique d’hygiène et de sécurité",
      "Atelier sur l’approvisionnement des médicaments",
      "Renforcement des capacités et échanges d’expériences entre les représentants des programmes de lutte, les responsables de laboratoires d’analyse et les pharmaciens",
      "Amélioration de la qualité des soins par une gestion optimale des produits de soins et le suivi des patients",
      "Prise en charge psychologique des patients",
      "Quality Health Care : qualité des systèmes de soins",
      "Gestion efficace de l’approvisionnement en intrants, des prélèvements et des circuits de soins",
      "Application du cycle DAQ (Démarche d’amélioration de la qualité)",
      "Atelier sur les bases de la gestion de production",
    ],
    modulesEyebrow: "Pédagogie appliquée",
    modulesTitle: "Des modules interactifs adaptés aux réalités du terrain",
    modules: [
      "Évaluation de la sécurité et de la qualité des produits cosmétiques",
      "Dépistage et conseil à l’initiative du soignant",
      "Prévention de la transmission",
      "Tutorat clinique",
      "Supervision formative",
      "Qualité des systèmes de soins",
    ],
    joinEyebrow: "Agir avec l’IAM",
    joinTitle: "Rejoignez l’Institut Africain du Médicament",
    joinCta: "Contactez-nous",
    audiencesEyebrow: "À qui s’adressent nos formations ?",
    audiencesTitle: "Des parcours adaptés à chaque responsabilité.",
    audiences: [
      {
        title: "Professionnels de santé",
        text: "Pharmaciens, médecins, soignants et personnels engagés dans la prise en charge.",
        icon: Stethoscope,
      },
      {
        title: "Institutions & organisations",
        text: "Ministères, directions, établissements sanitaires et structures pharmaceutiques.",
        icon: Building2,
      },
      {
        title: "Chercheurs & formateurs",
        text: "Experts, enseignants et responsables de la transmission des connaissances.",
        icon: Microscope,
      },
      {
        title: "Acteurs de terrain",
        text: "Équipes, associations et relais impliqués dans l’information et la mobilisation communautaire.",
        icon: MapPin,
      },
    ],
    catalogEyebrow: "Catalogue vérifié",
    catalogTitle: "Les inscriptions ouvriront après validation des sessions.",
    catalogText:
      "Aucune formation n’est actuellement publiée comme ouverte à l’inscription. Chaque fiche précisera le programme, les prérequis, les formateurs, les dates, le lieu ou le format en ligne, les modalités d’évaluation et les conditions de participation.",
    catalogStatus: "Aucune session ouverte actuellement",
    catalogCta: "Manifester votre intérêt",
    methodEyebrow: "Notre méthode pédagogique",
    methodTitle: "Une formation ne s’arrête pas à la salle.",
    methodText:
      "L’amélioration durable des pratiques repose sur un besoin bien défini, des objectifs précis et un suivi continu après la formation.",
    method: [
      {
        title: "Identifier le besoin",
        text: "Analyser le contexte, les pratiques et les compétences à renforcer.",
      },
      {
        title: "Construire le parcours",
        text: "Définir les objectifs, les contenus, les modalités et les critères d’évaluation.",
      },
      {
        title: "Former en situation",
        text: "Relier les connaissances aux réalités professionnelles et aux gestes utiles.",
      },
      {
        title: "Suivre dans la durée",
        text: "Maintenir l’appui entre les sessions et observer l’évolution des pratiques.",
      },
    ],
    ctaEyebrow: "Construire une formation",
    ctaTitle: "Parlez-nous de vos besoins en compétences.",
    ctaText:
      "L’IAM peut étudier une demande institutionnelle ou collective et préparer un parcours adapté au contexte, sous réserve de validation du périmètre et des ressources mobilisées.",
    cta: "Présenter votre demande",
  },
  en: {
    eyebrow: "IAM Academy",
    title: "Our training programmes",
    summary:
      "Learning pathways designed around the needs of professionals, institutions and field stakeholders to support lasting improvements in health practice.",
    heroLabel: "Training · support · follow-up",
    formatsEyebrow: "Learning formats",
    formatsTitle: "Learn, practise and pass knowledge on.",
    formatsSummary:
      "IAM combines several learning methods to adapt each intervention to participants’ experience, professional environment and intended objectives.",
    formats: [
      {
        title: "Training of trainers",
        text: "Build the capabilities of national partners to support sustainable knowledge transfer.",
        icon: UsersRound,
      },
      {
        title: "Classroom training",
        text: "Provide initial training and refresher sessions focused on care delivery and professional practice.",
        icon: GraduationCap,
      },
      {
        title: "Local mentoring",
        text: "Support professionals regularly in their working environment and as close as possible to their practice.",
        icon: Stethoscope,
      },
      {
        title: "Qualifying pathways",
        text: "Combine diploma-based education, online learning and practical placements in reference services.",
        icon: Laptop,
      },
    ],
    workshopsEyebrow: "Training fields",
    workshopsTitle: "Our training workshops",
    workshopsNote:
      "These topics outline IAM’s training fields. They do not indicate that a session is currently open for registration.",
    workshops: [
      "Production of soap and other cosmetic products",
      "Assessment of the safety and quality of cosmetic products",
      "Practical guide to hygiene and safety",
      "Workshop on medicine supply",
      "Capacity building and experience sharing among disease-control programme representatives, analytical laboratory managers and pharmacists",
      "Improving the quality of care through optimal management of healthcare products and patient follow-up",
      "Psychological care for patients",
      "Quality Health Care: quality of care systems",
      "Effective management of supplies, specimens and care pathways",
      "Application of the QI cycle (Quality Improvement approach)",
      "Workshop on the fundamentals of production management",
    ],
    modulesEyebrow: "Applied learning",
    modulesTitle: "Interactive modules adapted to field realities",
    modules: [
      "Assessment of the safety and quality of cosmetic products",
      "Provider-initiated testing and counselling",
      "Prevention of transmission",
      "Clinical mentoring",
      "Supportive supervision",
      "Quality of care systems",
    ],
    joinEyebrow: "Work with IAM",
    joinTitle: "Join the African Medicines Institute",
    joinCta: "Contact us",
    audiencesEyebrow: "Who are our programmes for?",
    audiencesTitle: "Pathways adapted to every responsibility.",
    audiences: [
      {
        title: "Health professionals",
        text: "Pharmacists, physicians, caregivers and staff involved in care delivery.",
        icon: Stethoscope,
      },
      {
        title: "Institutions & organisations",
        text: "Ministries, directorates, health facilities and pharmaceutical organisations.",
        icon: Building2,
      },
      {
        title: "Researchers & trainers",
        text: "Experts, teachers and people responsible for transferring knowledge.",
        icon: Microscope,
      },
      {
        title: "Field stakeholders",
        text: "Teams, associations and local relays involved in information and community mobilisation.",
        icon: MapPin,
      },
    ],
    catalogEyebrow: "Verified catalogue",
    catalogTitle: "Registration will open once sessions are approved.",
    catalogText:
      "No course is currently published as open for registration. Each course page will specify the programme, prerequisites, trainers, dates, venue or online format, assessment methods and participation conditions.",
    catalogStatus: "No sessions currently open",
    catalogCta: "Register your interest",
    methodEyebrow: "Our learning method",
    methodTitle: "Training does not end in the classroom.",
    methodText:
      "Lasting improvements in practice depend on a clearly defined need, precise objectives and continuous post-training support.",
    method: [
      {
        title: "Identify the need",
        text: "Assess the context, current practice and capabilities to strengthen.",
      },
      {
        title: "Design the pathway",
        text: "Define objectives, content, formats and assessment criteria.",
      },
      {
        title: "Train through practice",
        text: "Connect knowledge with professional realities and useful actions.",
      },
      {
        title: "Provide lasting support",
        text: "Maintain support between sessions and monitor changes in practice.",
      },
    ],
    ctaEyebrow: "Design a programme",
    ctaTitle: "Tell us about your capability needs.",
    ctaText:
      "IAM can review an institutional or collective request and prepare a pathway adapted to the context, subject to validation of its scope and required resources.",
    cta: "Submit your request",
  },
} as const;

export function AcademyPage({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <main id="contenu" className="academy-page">
      <section className="academy-hero">
        <Container>
          <nav
            className="breadcrumb"
            aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
          >
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <span>{t.title}</span>
          </nav>
          <div className="academy-hero__content">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="academy-hero__summary">{t.summary}</p>
            <div className="academy-hero__label">
              <BookOpenCheck aria-hidden="true" />
              <span>{t.heroLabel}</span>
            </div>
          </div>
        </Container>
      </section>

      <section className="medical-disclaimer-section">
        <Container>
          <MedicalDisclaimer locale={locale} />
        </Container>
      </section>

      <section className="academy-formats section">
        <Container>
          <header className="academy-section-header">
            <div>
              <p className="eyebrow">{t.formatsEyebrow}</p>
              <h2>{t.formatsTitle}</h2>
            </div>
            <p>{t.formatsSummary}</p>
          </header>
          <div className="academy-formats__grid">
            {t.formats.map((format, index) => {
              const Icon = format.icon;
              return (
                <article key={format.title}>
                  <div>
                    <span>0{index + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{format.title}</h3>
                  <p>{format.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        className="academy-curriculum section"
        aria-labelledby="academy-workshops-title"
      >
        <Container>
          <div className="academy-curriculum__block">
            <header className="academy-curriculum__header">
              <p className="eyebrow">{t.workshopsEyebrow}</p>
              <h2 id="academy-workshops-title">{t.workshopsTitle}</h2>
              <p className="academy-curriculum__note">{t.workshopsNote}</p>
            </header>
            <ol className="academy-curriculum__list">
              {t.workshops.map((workshop, index) => (
                <li key={workshop}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{workshop}</p>
                </li>
              ))}
            </ol>
          </div>

          <div
            className="academy-curriculum__block academy-curriculum__block--modules"
            aria-labelledby="academy-modules-title"
          >
            <header className="academy-curriculum__header">
              <p className="eyebrow">{t.modulesEyebrow}</p>
              <h2 id="academy-modules-title">{t.modulesTitle}</h2>
            </header>
            <ol className="academy-curriculum__list">
              {t.modules.map((module, index) => (
                <li key={module}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{module}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="academy-join" aria-labelledby="academy-join-title">
        <Container>
          <div className="academy-join__content">
            <p className="eyebrow">{t.joinEyebrow}</p>
            <h2 id="academy-join-title">{t.joinTitle}</h2>
            <ButtonLink
              href={localizePath(locale, "/contact?type=training")}
              variant="primary"
            >
              {t.joinCta}
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="academy-audiences section">
        <Container>
          <header className="academy-section-header academy-section-header--light">
            <div>
              <p className="eyebrow">{t.audiencesEyebrow}</p>
              <h2>{t.audiencesTitle}</h2>
            </div>
          </header>
          <div className="academy-audiences__grid">
            {t.audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <article key={audience.title}>
                  <Icon aria-hidden="true" />
                  <h3>{audience.title}</h3>
                  <p>{audience.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="academy-catalog section" id="catalogue">
        <Container className="academy-catalog__grid">
          <div>
            <p className="eyebrow">{t.catalogEyebrow}</p>
            <h2>{t.catalogTitle}</h2>
            <p>{t.catalogText}</p>
          </div>
          <aside className="academy-catalog__status">
            <CalendarClock aria-hidden="true" />
            <strong>{t.catalogStatus}</strong>
            <p>
              {locale === "fr"
                ? "Laissez-nous votre demande pour être orienté vers l’équipe formation."
                : "Send us your request so it can be directed to the training team."}
            </p>
            <ButtonLink
              href={localizePath(locale, "/contact?type=training")}
              variant="primary"
            >
              {t.catalogCta}
            </ButtonLink>
          </aside>
        </Container>
      </section>

      <section className="academy-method section">
        <Container>
          <header className="academy-method__header">
            <p className="eyebrow">{t.methodEyebrow}</p>
            <h2>{t.methodTitle}</h2>
            <p>{t.methodText}</p>
          </header>
          <ol className="academy-method__list">
            {t.method.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="academy-cta section">
        <Container className="academy-cta__grid">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
          </div>
          <div>
            <BadgeCheck aria-hidden="true" />
            <p>{t.ctaText}</p>
            <ButtonLink
              href={localizePath(locale, "/contact?type=training")}
              variant="light"
            >
              {t.cta}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
