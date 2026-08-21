import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Compass,
  Database,
  Eye,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Microscope,
  Network,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { ButtonLink, Container, SectionHeader } from "./ui";

const content = {
  fr: {
    eyebrow: "Mission & vision",
    title: "Faire de la connaissance une capacité d’action.",
    summary:
      "L’Institut Africain du Médicament relie la science, les institutions et les acteurs de terrain afin de faire progresser le médicament en Afrique, de la recherche à l’accès.",
    signal: "Science · Accès · Coopération",
    identityEyebrow: "Qui nous sommes ?",
    identityTitle: "L’Institut Africain du Médicament en chiffres :",
    identityMetrics: [
      { value: "2008", label: "Année de création" },
      { value: "282", label: "Projets réalisés" },
      { value: "+30", label: "Employés professionnels" },
      { value: "+50", label: "Partenaires dans le monde" },
    ],
    founderSignature: "Didier Mouliom",
    founderName: "Dr Didier Mouliom",
    founderRole: "CEO, IAM",
    approachEyebrow: "Notre approche",
    approachTitle: "Une formation construite autour de chaque besoin.",
    approachText:
      "Notre approche consiste à identifier un besoin en formation, à le définir précisément, puis à proposer un plan individuel adapté aux objectifs et au contexte de chaque participant.",
    approachItems: [
      {
        title: "Former les formateurs",
        text: "Développer les capacités des formateurs issus des partenaires nationaux afin de favoriser la transmission durable des compétences.",
      },
      {
        title: "Former en salle",
        text: "Organiser des formations initiales et des sessions de recyclage consacrées à la prise en charge.",
      },
      {
        title: "Accompagner en proximité",
        text: "Proposer un tutorat clinique régulier directement auprès des professionnels dans leur environnement de travail.",
      },
      {
        title: "Ouvrir des parcours qualifiants",
        text: "Articuler formation diplômante, apprentissage en ligne et stages pratiques dans des services de référence.",
      },
    ],
    approachCaption:
      "Session de travail consacrée à la définition et au suivi des besoins de formation.",
    partnersEyebrow: "Nos partenaires",
    partnersTitle: "Ils nous font confiance",
    partnersSummary:
      "Un réseau d’organisations mobilisées autour des enjeux pharmaceutiques, scientifiques et professionnels.",
    expertiseEyebrow: "Compétences mobilisées",
    expertiseTitle: "Notre expertise",
    expertiseSummary:
      "Des compétences complémentaires pour accompagner les acteurs du médicament, de la santé et de la qualité de vie.",
    expertiseGroups: [
      {
        title: "Réglementation & produits",
        items: [
          "Affaires réglementaires",
          "Essais cliniques",
          "Développement de produits cosmétiques et coordination de tests",
        ],
      },
      {
        title: "Compétences & soins",
        items: [
          "Ressources humaines et recrutement de pharmaciens et de médecins",
          "Formation continue et renforcement des capacités",
          "Éducation thérapeutique du patient",
        ],
      },
      {
        title: "Communication & communautés",
        items: [
          "Associations de patients et de soignants",
          "Communication médiatique et hors média : séminaires, colloques et conférences",
          "Mobilisation communautaire",
        ],
      },
      {
        title: "Systèmes & opérations",
        items: [
          "Chaînes d’approvisionnement et distribution pharmaceutique",
          "Systèmes d’information sanitaire",
          "Management de projet",
        ],
      },
    ],
    mandateEyebrow: "Nos missions",
    mandateTitle: "Former et accompagner les acteurs du système sanitaire.",
    mandateText:
      "L’IAM concentre son action sur des enjeux qui relient les compétences professionnelles, la qualité des produits de santé, l’organisation des parcours et l’accès aux médicaments.",
    mandates: [
      "Favoriser l’accès à des médicaments abordables",
      "Contribuer à la qualité des médicaments",
      "Renforcer la sécurité et la qualité des produits cosmétiques",
      "Développer le contrôle qualité et l’assurance qualité des produits de santé",
      "Contribuer à l’amélioration de la qualité de vie des populations",
      "Accompagner les pharmaciens et les acteurs du système pharmaceutique",
      "Améliorer l’organisation des circuits de soins et d’approvisionnement en intrants",
    ],
    methodologyEyebrow: "Notre méthodologie d’intervention",
    methodologyTitle: "De l’état des lieux à la décision.",
    methodologyText:
      "L’IAM a adopté une méthodologie de renforcement des capacités et d’accompagnement au changement structurée en quatre phases complémentaires.",
    methodologyPhases: [
      {
        title: "Analyser et planifier",
        text: "Définir les actions de renforcement des compétences à partir d’un état des lieux et d’objectifs précis d’amélioration de la qualité.",
      },
      {
        title: "Mettre en œuvre",
        text: "Déployer les actions retenues pour renforcer les compétences, améliorer l’organisation et faire évoluer les conditions matérielles de travail.",
      },
      {
        title: "Suivre les résultats",
        text: "Observer la mise en place des changements, puis analyser l’évolution des données de prise en charge et des indicateurs de qualité.",
      },
      {
        title: "Évaluer l’impact",
        text: "Mesurer les effets sur la qualité de la prise en charge afin de décider d’adopter, d’adapter ou d’abandonner les actions testées.",
      },
    ],
    methodologyPrimaryCaption:
      "Les outils numériques soutiennent le suivi des pratiques et des indicateurs.",
    methodologyArchiveCaption:
      "Concertation professionnelle autour des enjeux pharmaceutiques.",
    expertiseCaption:
      "Présentation institutionnelle des savoir-faire de l’IAM.",
    verificationNote:
      "Les agréments, partenaires techniques et prestations réalisées seront documentés individuellement avant leur publication.",
    actionEyebrow: "De l’intention à l’action",
    actionTitle: "Quatre verbes pour guider notre engagement.",
    actionSummary:
      "La mission de l’IAM se traduit par une méthode simple : comprendre les enjeux, relier les acteurs, structurer l’action et transmettre les connaissances.",
    actions: [
      {
        title: "Éclairer",
        text: "Rendre les connaissances scientifiques et institutionnelles compréhensibles, traçables et utiles.",
      },
      {
        title: "Relier",
        text: "Créer un dialogue continu entre décideurs, scientifiques, professionnels et société civile.",
      },
      {
        title: "Structurer",
        text: "Donner aux programmes des objectifs, des méthodes, des responsabilités et des preuves clairement définis.",
      },
      {
        title: "Transmettre",
        text: "Développer les compétences nécessaires pour comprendre l’innovation et mieux agir sur le terrain.",
      },
    ],
    principlesEyebrow: "Nos principes de conduite",
    principlesTitle: "Une ambition exigeante dans sa manière d’agir.",
    principlesSummary:
      "La valeur d’une mission dépend aussi des règles qui encadrent sa mise en œuvre.",
    principles: [
      {
        title: "La preuve avant la promesse",
        text: "Les résultats, chiffres, partenaires et territoires ne sont publiés qu’après vérification de leurs sources.",
      },
      {
        title: "L’utilité avant la visibilité",
        text: "Chaque initiative doit répondre à un besoin identifiable et produire une ressource réellement mobilisable.",
      },
      {
        title: "La coopération responsable",
        text: "Les rôles, contributions, consentements et responsabilités doivent être explicites et documentés.",
      },
    ],
    commitmentEyebrow: "Cap commun",
    commitmentTitle: "Construire avec rigueur, publier avec transparence.",
    commitmentText:
      "Cette page présente l’orientation stratégique de l’IAM. Les programmes, partenaires, pays, membres de gouvernance et résultats associés restent soumis à une validation documentaire avant publication.",
    programmes: "Découvrir nos services",
    contact: "Échanger avec l’IAM",
  },
  en: {
    eyebrow: "Mission & vision",
    title: "Turning knowledge into the capacity to act.",
    summary:
      "The African Institute of Medicine connects science, institutions and frontline stakeholders to advance medicine in Africa, from research to access.",
    signal: "Science · Access · Cooperation",
    identityEyebrow: "Who we are",
    identityTitle: "The African Institute of Medicine in figures:",
    identityMetrics: [
      { value: "2008", label: "Founding year" },
      { value: "282", label: "Projects completed" },
      { value: "+30", label: "Professional employees" },
      { value: "+50", label: "Partners worldwide" },
    ],
    founderSignature: "Didier Mouliom",
    founderName: "Dr Didier Mouliom",
    founderRole: "CEO, IAM",
    approachEyebrow: "Our approach",
    approachTitle: "Training designed around each need.",
    approachText:
      "Our approach is to identify and precisely define a training need, then propose an individual plan adapted to each participant’s objectives and context.",
    approachItems: [
      {
        title: "Train the trainers",
        text: "Build the capabilities of trainers from national partner organisations to support sustainable knowledge transfer.",
      },
      {
        title: "Deliver classroom training",
        text: "Organise initial training and refresher sessions focused on care delivery.",
      },
      {
        title: "Provide local support",
        text: "Offer regular clinical mentoring to professionals directly in their working environment.",
      },
      {
        title: "Enable qualifying pathways",
        text: "Combine diploma-based education, online learning and practical placements in reference services.",
      },
    ],
    approachCaption:
      "Working session dedicated to defining and monitoring training needs.",
    partnersEyebrow: "Our partners",
    partnersTitle: "They place their trust in us",
    partnersSummary:
      "A network of organisations engaged in pharmaceutical, scientific and professional priorities.",
    expertiseEyebrow: "Capabilities",
    expertiseTitle: "Our expertise",
    expertiseSummary:
      "Complementary capabilities supporting stakeholders across medicine, health and quality of life.",
    expertiseGroups: [
      {
        title: "Regulation & products",
        items: [
          "Regulatory affairs",
          "Clinical trials",
          "Cosmetic product development and test coordination",
        ],
      },
      {
        title: "Capabilities & care",
        items: [
          "Human resources and recruitment of pharmacists and physicians",
          "Continuing education and capacity building",
          "Therapeutic patient education",
        ],
      },
      {
        title: "Communication & communities",
        items: [
          "Patient and caregiver associations",
          "Media and non-media communication: seminars, symposia and conferences",
          "Community mobilisation",
        ],
      },
      {
        title: "Systems & operations",
        items: [
          "Pharmaceutical supply chains and distribution",
          "Health information systems",
          "Project management",
        ],
      },
    ],
    mandateEyebrow: "Our missions",
    mandateTitle: "Train and support health-system professionals.",
    mandateText:
      "IAM focuses its action on issues connecting professional capabilities, health-product quality, care pathways and access to medicines.",
    mandates: [
      "Promote access to affordable medicines",
      "Contribute to medicine quality",
      "Strengthen the safety and quality of cosmetic products",
      "Develop quality control and quality assurance for health products",
      "Contribute to improving quality of life",
      "Support pharmacists and other pharmaceutical-system stakeholders",
      "Improve the organisation of care pathways and medical-supply chains",
    ],
    methodologyEyebrow: "Our intervention methodology",
    methodologyTitle: "From assessment to decision.",
    methodologyText:
      "IAM uses a four-phase methodology for capacity building and change support, with each phase informing the next.",
    methodologyPhases: [
      {
        title: "Assess and plan",
        text: "Define capacity-building actions from an initial assessment and clear objectives for improving quality.",
      },
      {
        title: "Implement",
        text: "Deploy the selected actions to strengthen capabilities, improve organisation and enhance material working conditions.",
      },
      {
        title: "Monitor results",
        text: "Track the implementation of changes and analyse trends in care data and quality indicators.",
      },
      {
        title: "Evaluate impact",
        text: "Measure effects on quality of care to decide whether tested actions should be adopted, adapted or discontinued.",
      },
    ],
    methodologyPrimaryCaption:
      "Digital tools support the monitoring of practices and indicators.",
    methodologyArchiveCaption:
      "Professional dialogue on pharmaceutical priorities.",
    expertiseCaption: "Institutional presentation of IAM’s capabilities.",
    verificationNote:
      "Approvals, technical partners and completed services will be documented individually before publication.",
    actionEyebrow: "From intent to action",
    actionTitle: "Four verbs to guide our commitment.",
    actionSummary:
      "IAM’s mission follows a straightforward method: understand the issues, connect stakeholders, structure action and share knowledge.",
    actions: [
      {
        title: "Clarify",
        text: "Make scientific and institutional knowledge understandable, traceable and useful.",
      },
      {
        title: "Connect",
        text: "Create continuous dialogue between decision-makers, scientists, professionals and civil society.",
      },
      {
        title: "Structure",
        text: "Give programmes clearly defined objectives, methods, responsibilities and evidence.",
      },
      {
        title: "Share",
        text: "Develop the capabilities needed to understand innovation and act more effectively in the field.",
      },
    ],
    principlesEyebrow: "Our operating principles",
    principlesTitle: "An ambitious purpose, pursued with discipline.",
    principlesSummary:
      "The value of a mission also depends on the rules that guide its implementation.",
    principles: [
      {
        title: "Evidence before promise",
        text: "Results, figures, partners and territories are only published once their sources have been verified.",
      },
      {
        title: "Usefulness before visibility",
        text: "Every initiative must address an identifiable need and produce a resource that can genuinely be used.",
      },
      {
        title: "Responsible cooperation",
        text: "Roles, contributions, consent and responsibilities must be explicit and documented.",
      },
    ],
    commitmentEyebrow: "A shared direction",
    commitmentTitle: "Build with rigour, publish with transparency.",
    commitmentText:
      "This page presents IAM’s strategic direction. Related programmes, partners, countries, governance members and outcomes remain subject to documentary validation before publication.",
    programmes: "Explore our services",
    contact: "Talk to IAM",
  },
} as const;

const actionIcons = [Microscope, Network, Compass, BookOpenCheck] as const;
const principleIcons = [BadgeCheck, Eye, Handshake] as const;
const expertiseGroupIcons = [
  Scale,
  GraduationCap,
  HeartHandshake,
  Database,
] as const;
const partnerLogos = [
  {
    name: "African Pharmaceutical Forum (APF)",
    src: "/images/partners/apf.png",
    width: 184,
    height: 196,
  },
  {
    name: "HelioScience",
    src: "/images/partners/helioscience.png",
    width: 267,
    height: 63,
  },
  {
    name: "VisaTox",
    src: "/images/partners/visatox.png",
    width: 349,
    height: 136,
  },
  {
    name: "Savante Consulting",
    src: "/images/partners/savante-consulting.png",
    width: 304,
    height: 78,
  },
  {
    name: "ADEPRO",
    src: "/images/partners/adepro.png",
    width: 322,
    height: 107,
  },
] as const;

export function MissionVisionPage({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <main id="contenu">
      <section className="mission-vision-hero">
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
          <div className="mission-vision-hero__grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1>{t.title}</h1>
              <p className="mission-vision-hero__summary">{t.summary}</p>
            </div>
            <div className="mission-vision-hero__signal" aria-hidden="true">
              <span>
                <Compass />
              </span>
              <strong>IAM</strong>
              <small>{t.signal}</small>
            </div>
          </div>
        </Container>
      </section>

      <section className="mission-vision-expertise section" id="expertise">
        <Container>
          <SectionHeader
            eyebrow={t.expertiseEyebrow}
            title={t.expertiseTitle}
            summary={t.expertiseSummary}
          />
          <div className="mission-vision-expertise__grid">
            {t.expertiseGroups.map((group, groupIndex) => {
              const Icon = expertiseGroupIcons[groupIndex] ?? BadgeCheck;
              return (
                <article key={group.title}>
                  <div className="mission-vision-expertise__group-heading">
                    <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                    <Icon aria-hidden="true" />
                    <h2>{group.title}</h2>
                  </div>
                  <ol>
                    {group.items.map((item, itemIndex) => (
                      <li key={item}>
                        <span>
                          {String(groupIndex * 3 + itemIndex + 1).padStart(
                            2,
                            "0",
                          )}
                        </span>
                        <h3>{item}</h3>
                      </li>
                    ))}
                  </ol>
                </article>
              );
            })}
          </div>
          <p className="mission-vision-expertise__note">
            <ShieldCheck aria-hidden="true" />
            {t.verificationNote}
          </p>
        </Container>
      </section>

      <section className="mission-vision-mandates section" id="missions">
        <Container>
          <div className="mission-vision-mandates__header">
            <div>
              <p className="eyebrow">{t.mandateEyebrow}</p>
              <h2>{t.mandateTitle}</h2>
            </div>
            <div className="mission-vision-mandates__context">
              <p className="mission-vision-mandates__intro">{t.mandateText}</p>
              <figure className="mission-vision-mandates__media">
                <Image
                  src="/images/mission-vision/iam-expertise-presentation.png"
                  alt={
                    locale === "fr"
                      ? "Présentation des savoir-faire de l’Institut Africain du Médicament"
                      : "Presentation of the African Institute of Medicine’s capabilities"
                  }
                  width={781}
                  height={1303}
                  sizes="(max-width: 820px) calc(100vw - 40px), 520px"
                />
                <figcaption>{t.expertiseCaption}</figcaption>
              </figure>
            </div>
          </div>
          <ol className="mission-vision-mandates__list">
            {t.mandates.map((mission, index) => (
              <li key={mission}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{mission}</strong>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="mission-vision-methodology section" id="methodologie">
        <Container>
          <div className="mission-vision-methodology__header">
            <div>
              <p className="eyebrow">{t.methodologyEyebrow}</p>
              <h2>{t.methodologyTitle}</h2>
            </div>
            <p>{t.methodologyText}</p>
          </div>
          <div className="mission-vision-methodology__body">
            <div className="mission-vision-methodology__media">
              <figure className="mission-vision-methodology__primary">
                <Image
                  src="/images/mission-vision/methodology-pharmacist.png"
                  alt={
                    locale === "fr"
                      ? "Pharmacien utilisant un outil numérique dans une pharmacie"
                      : "Pharmacist using a digital tool in a pharmacy"
                  }
                  width={921}
                  height={1113}
                  sizes="(max-width: 820px) calc(100vw - 40px), 430px"
                />
                <figcaption>{t.methodologyPrimaryCaption}</figcaption>
              </figure>
              <figure className="mission-vision-methodology__archive">
                <Image
                  src="/images/mission-vision/methodology-conference.png"
                  alt={
                    locale === "fr"
                      ? "Participants réunis lors d’une rencontre professionnelle pharmaceutique"
                      : "Participants at a pharmaceutical professional meeting"
                  }
                  width={960}
                  height={640}
                  sizes="(max-width: 820px) calc(100vw - 40px), 430px"
                />
                <figcaption>{t.methodologyArchiveCaption}</figcaption>
              </figure>
            </div>
            <ol className="mission-vision-methodology__phases">
              {t.methodologyPhases.map((phase, index) => (
                <li key={phase.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{phase.title}</h3>
                    <p>{phase.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="mission-vision-identity" id="qui-nous-sommes">
        <Image
          className="mission-vision-identity__background"
          src="/images/mission-vision/iam-team-health-professionals.png"
          alt=""
          fill
          sizes="100vw"
        />
        <div className="mission-vision-identity__overlay" aria-hidden="true" />
        <Container className="mission-vision-identity__content">
          <p className="mission-vision-identity__eyebrow">
            {t.identityEyebrow}
          </p>
          <h2>{t.identityTitle}</h2>
          <dl className="mission-vision-identity__metrics">
            {t.identityMetrics.map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
          <div
            className="mission-vision-identity__signature"
            aria-hidden="true"
          >
            {t.founderSignature}
          </div>
          <div className="mission-vision-identity__founder">
            <p>{t.founderName}</p>
            <span>{t.founderRole}</span>
          </div>
        </Container>
      </section>

      <section className="mission-vision-approach section" id="notre-approche">
        <Container>
          <div className="mission-vision-approach__header">
            <div>
              <p className="eyebrow">{t.approachEyebrow}</p>
              <h2>{t.approachTitle}</h2>
            </div>
            <p>{t.approachText}</p>
          </div>
          <div className="mission-vision-approach__body">
            <figure className="mission-vision-approach__media">
              <Image
                src="/images/mission-vision/approach-working-session.png"
                alt={
                  locale === "fr"
                    ? "Équipe réunie autour d’ordinateurs lors d’une session de travail"
                    : "Team gathered around computers during a working session"
                }
                width={919}
                height={526}
                sizes="(max-width: 820px) calc(100vw - 40px), 590px"
              />
              <figcaption>{t.approachCaption}</figcaption>
            </figure>
            <ol className="mission-vision-approach__list">
              {t.approachItems.map((item, index) => (
                <li key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="mission-vision-partners section" id="partenaires">
        <Container>
          <div className="mission-vision-partners__header">
            <div>
              <p className="eyebrow">{t.partnersEyebrow}</p>
              <h2>{t.partnersTitle}</h2>
            </div>
            <p>{t.partnersSummary}</p>
          </div>
        </Container>
        <div
          className="mission-vision-partners__marquee"
          role="region"
          aria-label={t.partnersEyebrow}
          tabIndex={0}
        >
          <div className="mission-vision-partners__track">
            {[0, 1].map((copyIndex) => (
              <ul
                key={copyIndex}
                aria-hidden={copyIndex === 1 ? "true" : undefined}
              >
                {partnerLogos.map((partner) => (
                  <li key={`${copyIndex}-${partner.name}`}>
                    <Image
                      src={partner.src}
                      alt={copyIndex === 0 ? partner.name : ""}
                      width={partner.width}
                      height={partner.height}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section className="mission-vision-actions section">
        <Container>
          <SectionHeader
            eyebrow={t.actionEyebrow}
            title={t.actionTitle}
            summary={t.actionSummary}
          />
          <div className="mission-vision-actions__grid">
            {t.actions.map((action, index) => {
              const Icon = actionIcons[index] ?? ShieldCheck;
              return (
                <article key={action.title}>
                  <div>
                    <span>0{index + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h2>{action.title}</h2>
                  <p>{action.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="mission-vision-principles section">
        <Container>
          <SectionHeader
            eyebrow={t.principlesEyebrow}
            title={t.principlesTitle}
            summary={t.principlesSummary}
          />
          <div className="mission-vision-principles__grid">
            {t.principles.map((principle, index) => {
              const Icon = principleIcons[index] ?? ShieldCheck;
              return (
                <article key={principle.title}>
                  <Icon aria-hidden="true" />
                  <h2>{principle.title}</h2>
                  <p>{principle.text}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="mission-vision-commitment section">
        <Container className="mission-vision-commitment__grid">
          <div>
            <p className="eyebrow">{t.commitmentEyebrow}</p>
            <h2>{t.commitmentTitle}</h2>
          </div>
          <div>
            <p>{t.commitmentText}</p>
            <div className="button-row">
              <ButtonLink href={localizePath(locale, "/institut/nos-services")}>
                {t.programmes}
              </ButtonLink>
              <ButtonLink
                href={localizePath(locale, "/contact")}
                variant="secondary"
              >
                {t.contact}
              </ButtonLink>
            </div>
            <Link
              className="mission-vision-commitment__institution"
              href={localizePath(locale, "/institut")}
            >
              {locale === "fr"
                ? "Voir l’espace institutionnel"
                : "Visit the institutional area"}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
