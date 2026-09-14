import Link from "next/link";
import {
  Beaker,
  BriefcaseBusiness,
  Building2,
  Database,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Megaphone,
  PackageCheck,
  RadioTower,
  Scale,
  Sparkles,
  Stethoscope,
  Truck,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { MedicalDisclaimer } from "./medical-disclaimer";
import { ButtonLink, Container } from "./ui";

type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type ServiceGroup = {
  title: string;
  summary: string;
  services: Service[];
};

const content = {
  fr: {
    eyebrow: "Nos services",
    title: "Des expertises mobilisées au service des systèmes de santé.",
    summary:
      "L’IAM accompagne les organisations, les professionnels et les projets qui agissent sur le médicament, la qualité des produits de santé et le renforcement des capacités.",
    heroLabel: "12 domaines d’intervention",
    introEyebrow: "Une offre structurée",
    introTitle: "Du besoin identifié à une réponse adaptée.",
    introText:
      "Chaque intervention commence par la compréhension du contexte, des objectifs et des responsabilités. Le périmètre, les livrables, les compétences mobilisées et les critères de suivi sont ensuite précisés avec le demandeur.",
    groups: [
      {
        title: "Réglementation & produits",
        summary:
          "Sécuriser les démarches, la qualité et le développement des produits de santé.",
        services: [
          {
            title: "Affaires réglementaires",
            description:
              "Appui à la compréhension des exigences, à la structuration documentaire et à la préparation des démarches réglementaires.",
            icon: Scale,
          },
          {
            title: "Essais cliniques",
            description:
              "Accompagnement méthodologique et coordination des besoins liés à la préparation et au suivi des essais.",
            icon: FlaskConical,
          },
          {
            title: "Produits cosmétiques & tests",
            description:
              "Accompagnement du développement de produits cosmétiques et coordination de tests avec les expertises habilitées.",
            icon: Sparkles,
          },
        ],
      },
      {
        title: "Compétences & soins",
        summary:
          "Développer les compétences et soutenir les professionnels dans leurs pratiques.",
        services: [
          {
            title: "Ressources humaines & recrutement",
            description:
              "Identification des besoins et accompagnement du recrutement de pharmaciens, de médecins et de profils de santé.",
            icon: UsersRound,
          },
          {
            title: "Formation continue",
            description:
              "Conception de formations et d’actions de renforcement des capacités adaptées aux publics et aux contextes.",
            icon: GraduationCap,
          },
          {
            title: "Éducation thérapeutique du patient",
            description:
              "Conception de démarches pédagogiques favorisant la compréhension des traitements et l’autonomie du patient.",
            icon: Stethoscope,
          },
        ],
      },
      {
        title: "Communication & communautés",
        summary:
          "Créer les conditions d’un dialogue utile entre institutions, professionnels et populations.",
        services: [
          {
            title: "Patients & soignants",
            description:
              "Appui aux dynamiques associatives et aux échanges entre patients, aidants et professionnels de santé.",
            icon: HeartHandshake,
          },
          {
            title: "Communication professionnelle",
            description:
              "Conception de séminaires, colloques, conférences et dispositifs de communication médiatique ou hors média.",
            icon: Megaphone,
          },
          {
            title: "Mobilisation communautaire",
            description:
              "Préparation d’actions de proximité pour informer, sensibiliser et favoriser la participation des communautés.",
            icon: RadioTower,
          },
        ],
      },
      {
        title: "Systèmes & opérations",
        summary:
          "Structurer les flux, l’information et le pilotage nécessaires à l’action sanitaire.",
        services: [
          {
            title: "Distribution pharmaceutique",
            description:
              "Appui à l’organisation des chaînes d’approvisionnement et de distribution des produits pharmaceutiques.",
            icon: Truck,
          },
          {
            title: "Systèmes d’information sanitaire",
            description:
              "Cadrage des besoins d’information, des circuits de données et des outils utiles au suivi des activités.",
            icon: Database,
          },
          {
            title: "Management de projet",
            description:
              "Structuration des objectifs, responsabilités, étapes, risques, livrables et indicateurs de suivi d’un projet.",
            icon: BriefcaseBusiness,
          },
        ],
      },
    ] satisfies ServiceGroup[],
    processEyebrow: "Notre manière d’intervenir",
    processTitle: "Une collaboration lisible à chaque étape.",
    process: [
      {
        title: "Cadrer",
        text: "Comprendre le besoin, le contexte, les bénéficiaires et les contraintes.",
      },
      {
        title: "Concevoir",
        text: "Définir le périmètre, les compétences, les livrables et le calendrier.",
      },
      {
        title: "Déployer",
        text: "Mettre en œuvre les actions avec des responsabilités clairement établies.",
      },
      {
        title: "Évaluer",
        text: "Suivre les résultats et documenter les enseignements de l’intervention.",
      },
    ],
    verification:
      "Les agréments, références, partenaires techniques et prestations réalisées sont publiés uniquement après validation documentaire.",
    trainingTitle:
      "Rejoignez nos formations et devenez un professionnel de santé",
    trainingCta: "Nos formations",
    fieldActionsEyebrow: "Interventions",
    fieldActionsTitle: "Nos actions sur le terrain",
    fieldActionsSummary:
      "Des interventions complémentaires pour accompagner les décideurs, les équipes et les structures sanitaires et pharmaceutiques.",
    fieldActions: [
      {
        title: "Appui aux politiques de santé",
        icon: Landmark,
        description: "",
        items: [
          "Appui, conseil et expertise auprès des décideurs : ministère de la Santé, directions régionales et groupes techniques",
          "Influence et amélioration des normes et procédures nationales",
        ],
        pending: "",
      },
      {
        title: "Renforcement des compétences",
        icon: GraduationCap,
        description:
          "Le travail de fond entrepris par l’IAM sur l’amélioration de ses méthodes pédagogiques a relevé l’importance du suivi post-formation et de l’appui continu entre les formations, afin d’obtenir un réel changement des pratiques des personnels.",
        items: [],
        pending: "",
      },
      {
        title: "Conseil en organisation",
        icon: Workflow,
        description: "",
        items: [
          "Conduite du changement dans les structures sanitaires et pharmaceutiques",
          "Conseil organisationnel pour améliorer les circuits des patients, l’approvisionnement en intrants et les prélèvements biologiques, ainsi que la répartition des tâches et la communication au sein des équipes",
        ],
        pending: "",
      },
      {
        title: "Promotion et distribution des produits pharmaceutiques",
        icon: Truck,
        description: "",
        items: [],
        pending: "Périmètre opérationnel en cours de documentation.",
      },
      {
        title: "Amélioration des infrastructures",
        icon: Building2,
        description: "",
        items: [
          "Conditions matérielles : aide à l’achat d’équipement",
          "Infrastructure : réhabilitation et aménagement",
        ],
        pending: "",
      },
    ],
    ctaEyebrow: "Parlons de votre besoin",
    ctaTitle: "Préparer une intervention avec l’IAM.",
    ctaText:
      "Présentez votre organisation, votre contexte et l’objectif recherché. La demande sera orientée vers l’interlocuteur approprié.",
    cta: "Nous contacter",
  },
  en: {
    eyebrow: "Our services",
    title: "Expertise mobilised to strengthen health systems.",
    summary:
      "IAM supports organisations, professionals and projects working on medicines, health-product quality and capacity building.",
    heroLabel: "12 areas of intervention",
    introEyebrow: "A structured offer",
    introTitle: "From an identified need to a tailored response.",
    introText:
      "Every intervention begins with an understanding of the context, objectives and responsibilities. Scope, deliverables, capabilities and monitoring criteria are then agreed with the requesting organisation.",
    groups: [
      {
        title: "Regulation & products",
        summary:
          "Support sound processes, quality and the development of health products.",
        services: [
          {
            title: "Regulatory affairs",
            description:
              "Support in understanding requirements, structuring documentation and preparing regulatory processes.",
            icon: Scale,
          },
          {
            title: "Clinical trials",
            description:
              "Methodological support and coordination of needs related to trial preparation and monitoring.",
            icon: FlaskConical,
          },
          {
            title: "Cosmetic products & testing",
            description:
              "Support for cosmetic-product development and coordination of testing with qualified expertise.",
            icon: Sparkles,
          },
        ],
      },
      {
        title: "Capabilities & care",
        summary:
          "Develop capabilities and support health professionals in their practice.",
        services: [
          {
            title: "Human resources & recruitment",
            description:
              "Needs assessment and recruitment support for pharmacists, physicians and other health profiles.",
            icon: UsersRound,
          },
          {
            title: "Continuing education",
            description:
              "Design of training and capacity-building activities adapted to audiences and contexts.",
            icon: GraduationCap,
          },
          {
            title: "Therapeutic patient education",
            description:
              "Design of educational approaches supporting treatment understanding and patient autonomy.",
            icon: Stethoscope,
          },
        ],
      },
      {
        title: "Communication & communities",
        summary:
          "Enable useful dialogue between institutions, professionals and communities.",
        services: [
          {
            title: "Patients & caregivers",
            description:
              "Support for associations and dialogue between patients, caregivers and health professionals.",
            icon: HeartHandshake,
          },
          {
            title: "Professional communication",
            description:
              "Design of seminars, symposia, conferences and media or non-media communication activities.",
            icon: Megaphone,
          },
          {
            title: "Community mobilisation",
            description:
              "Preparation of local activities to inform, raise awareness and encourage community participation.",
            icon: RadioTower,
          },
        ],
      },
      {
        title: "Systems & operations",
        summary:
          "Structure the flows, information and management required for health action.",
        services: [
          {
            title: "Pharmaceutical distribution",
            description:
              "Support for organising pharmaceutical-product supply chains and distribution.",
            icon: Truck,
          },
          {
            title: "Health information systems",
            description:
              "Scoping information needs, data flows and tools that support activity monitoring.",
            icon: Database,
          },
          {
            title: "Project management",
            description:
              "Structuring project objectives, responsibilities, stages, risks, deliverables and indicators.",
            icon: BriefcaseBusiness,
          },
        ],
      },
    ] satisfies ServiceGroup[],
    processEyebrow: "How we work",
    processTitle: "Clear collaboration at every stage.",
    process: [
      {
        title: "Scope",
        text: "Understand the need, context, beneficiaries and constraints.",
      },
      {
        title: "Design",
        text: "Define scope, capabilities, deliverables and the delivery schedule.",
      },
      {
        title: "Deliver",
        text: "Implement activities with clearly established responsibilities.",
      },
      {
        title: "Evaluate",
        text: "Monitor results and document lessons from the intervention.",
      },
    ],
    verification:
      "Approvals, references, technical partners and completed services are published only after documentary validation.",
    trainingTitle:
      "Join our training programmes and become a health professional",
    trainingCta: "Our courses",
    fieldActionsEyebrow: "Interventions",
    fieldActionsTitle: "Our work in the field",
    fieldActionsSummary:
      "Complementary interventions supporting decision-makers, teams, and health and pharmaceutical organisations.",
    fieldActions: [
      {
        title: "Health policy support",
        icon: Landmark,
        description: "",
        items: [
          "Support, advice and expertise for decision-makers: Ministry of Health, regional directorates and technical groups",
          "Influence and improvement of national standards and procedures",
        ],
        pending: "",
      },
      {
        title: "Capacity building",
        icon: GraduationCap,
        description:
          "IAM’s work to improve its teaching methods has highlighted the importance of post-training monitoring and continuous support between sessions in order to achieve lasting changes in staff practice.",
        items: [],
        pending: "",
      },
      {
        title: "Organisational consulting",
        icon: Workflow,
        description: "",
        items: [
          "Change management in health and pharmaceutical organisations",
          "Organisational advice to improve patient pathways, medical-supply chains and biological-sample flows, together with task allocation and communication within teams",
        ],
        pending: "",
      },
      {
        title: "Promotion and distribution of pharmaceutical products",
        icon: Truck,
        description: "",
        items: [],
        pending: "Operational scope currently being documented.",
      },
      {
        title: "Infrastructure improvement",
        icon: Building2,
        description: "",
        items: [
          "Material conditions: support for equipment purchases",
          "Infrastructure: rehabilitation and facility improvements",
        ],
        pending: "",
      },
    ],
    ctaEyebrow: "Tell us about your need",
    ctaTitle: "Prepare an intervention with IAM.",
    ctaText:
      "Introduce your organisation, context and intended objective. The request will be directed to the appropriate contact.",
    cta: "Contact us",
  },
} as const;

export function ServicesPage({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <main id="contenu" className="services-page">
      <section className="services-hero">
        <Container>
          <nav
            className="breadcrumb"
            aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
          >
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <Link href={localizePath(locale, "/institut")}>
              {locale === "fr" ? "L’Institut" : "The Institute"}
            </Link>
            <span>/</span>
            <span>{t.eyebrow}</span>
          </nav>
          <div className="services-hero__grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="services-hero__summary">{t.summary}</p>
            </div>
            <div className="services-hero__signal" aria-hidden="true">
              <PackageCheck />
              <strong>12</strong>
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

      <section className="services-intro section">
        <Container className="services-intro__grid">
          <div>
            <p className="eyebrow">{t.introEyebrow}</p>
            <h2>{t.introTitle}</h2>
          </div>
          <p className="text-justify">{t.introText}</p>
        </Container>
      </section>

      <section className="services-catalog" aria-label={t.eyebrow}>
        <Container>
          {t.groups.map((group, groupIndex) => (
            <section className="services-group" key={group.title}>
              <header className="services-group__header">
                <span>0{groupIndex + 1}</span>
                <h2>{group.title}</h2>
                <p>{group.summary}</p>
              </header>
              <div className="services-group__grid">
                {group.services.map((service, serviceIndex) => {
                  const Icon = service.icon;
                  const serviceNumber = groupIndex * 3 + serviceIndex + 1;
                  return (
                    <article className="service-card" key={service.title}>
                      <div className="service-card__top">
                        <span>{String(serviceNumber).padStart(2, "0")}</span>
                        <Icon aria-hidden="true" />
                      </div>
                      <h3>{service.title}</h3>
                      <p className="text-justify">{service.description}</p>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
          <div className="services-verification">
            <Beaker aria-hidden="true" />
            <p>{t.verification}</p>
          </div>
        </Container>
      </section>

      <section className="services-process section">
        <Container>
          <header className="services-process__header">
            <p className="eyebrow">{t.processEyebrow}</p>
            <h2>{t.processTitle}</h2>
          </header>
          <ol className="services-process__list">
            {t.process.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section
        className="services-training"
        aria-labelledby="services-training-title"
      >
        <div className="services-training__content">
          <h2 id="services-training-title">{t.trainingTitle}</h2>
          <Link
            className="button button--primary services-training__button"
            href={localizePath(locale, "/academie")}
          >
            {t.trainingCta}
          </Link>
        </div>
      </section>

      <section className="services-field-actions section" id="actions-terrain">
        <Container>
          <header className="services-field-actions__header">
            <div>
              <p className="eyebrow">{t.fieldActionsEyebrow}</p>
              <h2>{t.fieldActionsTitle}</h2>
            </div>
            <p>{t.fieldActionsSummary}</p>
          </header>
          <div className="services-field-actions__grid">
            {t.fieldActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <article className="field-action-card" key={action.title}>
                  <div className="field-action-card__top">
                    <span>0{index + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{action.title}</h3>
                  {action.description && (
                    <p className="text-justify">{action.description}</p>
                  )}
                  {action.items.length > 0 && (
                    <ul>
                      {action.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {action.pending && (
                    <p className="field-action-card__pending">
                      {action.pending}
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="services-cta section">
        <Container className="services-cta__grid">
          <div>
            <p className="eyebrow">{t.ctaEyebrow}</p>
            <h2>{t.ctaTitle}</h2>
          </div>
          <div>
            <p>{t.ctaText}</p>
            <ButtonLink
              href={localizePath(locale, "/contact?type=partnership")}
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
