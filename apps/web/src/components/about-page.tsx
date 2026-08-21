import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Beaker,
  BookOpenCheck,
  FileCheck2,
  Network,
  Quote,
  Scale,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { localizePath, type Locale } from "@/lib/content";
import { ButtonLink, Container, SectionHeader } from "./ui";

const content = {
  fr: {
    eyebrow: "À propos de nous",
    title: "À propos de l’Institut Africain du Médicament",
    summary:
      "L’Institut Africain du Médicament – Quality of Life (IAM-QoL) a été créé en 2008 avec l’approbation des ministères de la Santé du Cameroun et de la France, afin de former les professionnels de santé et d’informer le grand public sur les enjeux pharmaceutiques et les innovations du secteur médical.",
    introEyebrow: "Notre raison d’être",
    introTitle:
      "Une approche africaine du médicament, pensée dans toute sa chaîne de valeur.",
    intro:
      "La recherche, la qualité, la réglementation, la production, la distribution et le bon usage sont interdépendants. L’IAM crée des passerelles entre les expertises et les institutions afin de transformer la connaissance en action utile.",
    principles: [
      {
        title: "Science",
        text: "Rendre les connaissances compréhensibles, traçables et mobilisables.",
      },
      {
        title: "Accès",
        text: "Relier l’innovation aux réalités des systèmes de santé et des territoires.",
      },
      {
        title: "Coopération",
        text: "Faire converger les compétences autour d’objectifs clairement définis.",
      },
    ],
    storyLabel: "Témoignage du fondateur",
    storyEyebrow: "Notre histoire",
    storyTitle: "Former, informer et rapprocher l’innovation du patient.",
    storyIntro:
      "Le Dr Didier Mouliom revient sur l’origine de l’Institut et sur une conviction fondatrice : une innovation en santé ne prend tout son sens que lorsqu’elle est comprise et utile au patient.",
    storyThemes: ["Formation", "Patient", "E-santé"],
    storyQuote: [
      "J’ai créé l’Institut en 2009, avec l’agrément des ministères de la Santé du Cameroun et de France, pour former les professionnels et le grand public aux problématiques, aux innovations et à l’utilisation de la médecine moderne. Comment maîtriser son diabète, comprendre les enjeux d’une chimiothérapie ou d’une radiothérapie lorsque l’on est atteint d’un cancer ? Toutes ces questions sont complexes, non seulement pour les malades, mais aussi pour les aidants et les familles. Ainsi, en Afrique, où existe encore la dimension du spirituel, on ne sait pas toujours comment se comporter devant un malade psychiatrique ; on peut avoir l’impression qu’on lui a lancé un sort…",
      "On doit former des personnes à reconnaître une schizophrénie et à dire clairement qu’une personne est malade. L’industrie pharmaceutique apporte des solutions et des innovations auxquelles les laboratoires en France nous donnent accès, via le Leem, à nous, pharmaciens acteurs de terrain. Si je me déplace partout dans le monde pour cette cause, c’est pour marquer mon soutien à cette initiative qui nous permet de rencontrer les ministres de la Santé et leurs équipes, afin de favoriser les échanges entre l’industrie et ceux qui opèrent dans les hôpitaux ou les dispensaires.",
      "Comme l’a dit le Pr Geissbuhler, l’important est de toucher le patient : c’est par lui que l’on va faire passer l’e-santé. La France l’a fait ; c’est important. La créatrice du Dossier pharmaceutique français, Isabelle Adenot, était là pour le prouver.",
      "Je m’occupe beaucoup de transferts de patients d’Afrique en Europe. Mais si nous disposons un jour d’un dossier patient numérisé, il est évident que cela va tout révolutionner : nous aurons immédiatement accès aux traitements en cours, et n’importe quel expert dans le monde pourra le consulter et en tirer les conclusions. Ce sera une avancée fondamentale dans la mise en place des systèmes de santé.",
    ],
    storyAttribution: "Dr Didier Mouliom",
    storyRole: "Fondateur de l’IAM-QoL",
    storyNoteTitle: "Note de transparence",
    storyNote:
      "Ce témoignage mentionne 2009 et des agréments ministériels. Cette formulation est conservée dans la parole du fondateur ; la chronologie officielle et les agréments cités devront être rapprochés des pièces justificatives avant publication définitive.",
    missionEyebrow: "Notre mission",
    missionTitle:
      "Créer les conditions d’une action pharmaceutique mieux reliée.",
    missionSummary:
      "L’IAM organise son action autour de quatre fonctions complémentaires, sans publier de résultat, partenaire ou chiffre qui ne soit documenté.",
    actions: [
      [
        "Orienter les priorités",
        "Identifier les enjeux qui structurent le cycle du médicament.",
      ],
      [
        "Structurer les programmes",
        "Relier objectifs, territoires, expertises et méthodes.",
      ],
      [
        "Partager la connaissance",
        "Publier des contenus scientifiques et institutionnels sourcés.",
      ],
      [
        "Développer les compétences",
        "Préparer des parcours utiles aux professionnels et institutions.",
      ],
    ],
    teamEyebrow: "Direction et expertise",
    teamTitle: "Notre équipe",
    teamSummary:
      "Six membres réuniront les compétences nécessaires pour porter la mission de l’Institut. Chaque profil sera présenté ici après validation de ses informations et de son portrait.",
    teamMembers: [
      {
        name: "M. Didier Mouliom",
        area: "Direction générale",
        role: "Fondateur & Directeur Général",
        image: "/images/team/didier-mouliom.png",
        imageAlt: "Portrait de M. Didier Mouliom",
      },
      {
        name: "M. Rostand SAGU",
        area: "Qualité & réglementation",
        role: "Directeur Qualité et Affaires réglementaires",
        image: "/images/team/rostand-sagu.png",
        imageAlt: "Portrait de M. Rostand SAGU",
      },
      {
        name: "M. MFOMOGNAM MAPOURE BELLINI RIQUET",
        area: "Ressources humaines",
        role: "Responsable RH",
        image: "/images/team/mfomognam-mapoure-bellini-riquet.png",
        imageAlt: "Portrait de M. MFOMOGNAM MAPOURE BELLINI RIQUET",
      },
      {
        name: "Mme Bouambo Vanneck Chancelle",
        area: "Marketing",
        role: "Responsable marketing",
        image: "/images/team/bouambo-vanneck-chancelle.png",
        imageAlt: "Portrait de Mme Bouambo Vanneck Chancelle",
      },
      {
        name: "M. Kevin Nye",
        area: "Ressources humaines",
        role: "HR Lead",
        image: "/images/team/kevin-nye.png",
        imageAlt: "Portrait de M. Kevin Nye",
      },
      {
        name: "M. Alex Young",
        area: "Support & relations usagers",
        role: "Customer Support Lead",
        image: "/images/team/alex-young.png",
        imageAlt: "Portrait de M. Alex Young",
      },
    ],
    historyEyebrow: "Repère institutionnel",
    historyTitle: "Un institut créé en 2008.",
    historyText:
      "L’Institut Africain du Médicament a été créé par le Dr Didier Mouliom avec l’ambition de rapprocher la science, la coopération et l’accès au médicament sur le continent.",
    verificationTitle: "Une histoire publiée avec rigueur",
    verificationText:
      "La chronologie détaillée, le statut juridique, la gouvernance et les mandats seront complétés à mesure que les pièces justificatives seront validées. L’IAM est distinct de l’Agence africaine du médicament (AMA) et aucun lien institutionnel n’est présumé.",
    approach: "Découvrir notre approche",
    contact: "Contacter l’IAM",
  },
  en: {
    eyebrow: "About us",
    title: "About the African Institute of Medicine",
    summary:
      "The African Institute of Medicine – Quality of Life (IAM-QoL) was established in 2008 with the approval of the Cameroonian and French ministries of health, to train health professionals and inform the public about pharmaceutical issues and innovations in the medical sector.",
    introEyebrow: "Our purpose",
    introTitle:
      "An African approach to medicine across its entire value chain.",
    intro:
      "Research, quality, regulation, production, distribution and appropriate use are interdependent. IAM builds bridges between expertise and institutions to turn knowledge into useful action.",
    principles: [
      {
        title: "Science",
        text: "Make knowledge understandable, traceable and actionable.",
      },
      {
        title: "Access",
        text: "Connect innovation with the realities of health systems and territories.",
      },
      {
        title: "Cooperation",
        text: "Bring expertise together around clearly defined objectives.",
      },
    ],
    storyLabel: "Founder’s testimony",
    storyEyebrow: "Our story",
    storyTitle:
      "Training, informing and bringing innovation closer to patients.",
    storyIntro:
      "Dr Didier Mouliom reflects on the Institute’s origins and a founding conviction: health innovation only reaches its full potential when it is understood and useful to patients.",
    storyThemes: ["Training", "Patients", "Digital health"],
    storyQuote: [
      "I founded the Institute in 2009, with the approval of the Cameroonian and French ministries of health, to train professionals and the public in the issues, innovations and use of modern medicine. How can someone manage diabetes or understand the implications of chemotherapy or radiotherapy when they have cancer? These questions are complex, not only for patients but also for carers and families. In Africa, where the spiritual dimension remains present, people do not always know how to respond to a person living with a psychiatric condition; they may believe that a spell has been cast on them…",
      "We must train people to recognise schizophrenia and state clearly that someone is ill. The pharmaceutical industry brings solutions and innovations to which laboratories in France give us access, through Leem, as pharmacists working in the field. If I travel around the world for this cause, it is to show my support for this initiative, which enables us to meet health ministers and their teams and foster dialogue between industry and those working in hospitals or dispensaries.",
      "As Professor Geissbuhler said, what matters is reaching the patient: digital health will advance through them. France has done this, and that matters. Isabelle Adenot, who created the French Pharmaceutical Record, was there to demonstrate it.",
      "I am closely involved in transferring patients from Africa to Europe. But if we one day have a digital patient record, it is clear that this will transform everything: we will have immediate access to ongoing treatments, and any expert anywhere in the world will be able to consult it and draw conclusions. It will be a fundamental step forward in building health systems.",
    ],
    storyAttribution: "Dr Didier Mouliom",
    storyRole: "Founder of IAM-QoL",
    storyNoteTitle: "Transparency note",
    storyNote:
      "This testimony refers to 2009 and to ministerial approvals. This wording is preserved as part of the founder’s account; the official timeline and the approvals cited must be reconciled with supporting documents before final publication.",
    missionEyebrow: "Our mission",
    missionTitle:
      "Creating the conditions for better-connected pharmaceutical action.",
    missionSummary:
      "IAM organises its work around four complementary functions, without publishing any undocumented outcome, partner or figure.",
    actions: [
      [
        "Set priorities",
        "Identify the issues that shape the medicine lifecycle.",
      ],
      [
        "Structure programmes",
        "Connect objectives, territories, expertise and methods.",
      ],
      [
        "Share knowledge",
        "Publish sourced scientific and institutional content.",
      ],
      [
        "Build capabilities",
        "Prepare useful pathways for professionals and institutions.",
      ],
    ],
    teamEyebrow: "Leadership and expertise",
    teamTitle: "Our team",
    teamSummary:
      "Six members will bring together the expertise needed to advance the Institute’s mission. Each profile will appear here once its information and portrait have been validated.",
    teamMembers: [
      {
        name: "Mr Didier Mouliom",
        area: "Executive leadership",
        role: "Founder & Chief Executive Officer",
        image: "/images/team/didier-mouliom.png",
        imageAlt: "Portrait of Mr Didier Mouliom",
      },
      {
        name: "Mr Rostand SAGU",
        area: "Quality & regulation",
        role: "Director of Quality and Regulatory Affairs",
        image: "/images/team/rostand-sagu.png",
        imageAlt: "Portrait of Mr Rostand SAGU",
      },
      {
        name: "Mr MFOMOGNAM MAPOURE BELLINI RIQUET",
        area: "Human resources",
        role: "Human Resources Manager",
        image: "/images/team/mfomognam-mapoure-bellini-riquet.png",
        imageAlt: "Portrait of Mr MFOMOGNAM MAPOURE BELLINI RIQUET",
      },
      {
        name: "Ms Bouambo Vanneck Chancelle",
        area: "Marketing",
        role: "Marketing Manager",
        image: "/images/team/bouambo-vanneck-chancelle.png",
        imageAlt: "Portrait of Ms Bouambo Vanneck Chancelle",
      },
      {
        name: "Mr Kevin Nye",
        area: "Human resources",
        role: "HR Lead",
        image: "/images/team/kevin-nye.png",
        imageAlt: "Portrait of Mr Kevin Nye",
      },
      {
        name: "Mr Alex Young",
        area: "Customer support",
        role: "Customer Support Lead",
        image: "/images/team/alex-young.png",
        imageAlt: "Portrait of Mr Alex Young",
      },
    ],
    historyEyebrow: "Institutional milestone",
    historyTitle: "An institute established in 2008.",
    historyText:
      "The African Institute of Medicine was established by Dr Didier Mouliom with the ambition of bringing science, cooperation and access to medicine closer together across the continent.",
    verificationTitle: "A history published with rigour",
    verificationText:
      "The detailed timeline, legal status, governance and mandates will be completed as supporting documents are validated. IAM is distinct from the African Medicines Agency (AMA), and no institutional relationship is assumed.",
    approach: "Discover our approach",
    contact: "Contact IAM",
  },
} as const;

const principleIcons = [Beaker, ShieldCheck, Network] as const;
const actionIcons = [Scale, Network, BookOpenCheck, UsersRound] as const;

export function AboutPage({ locale }: { locale: Locale }) {
  const t = content[locale];
  const teamMembers = [...t.teamMembers];

  return (
    <main id="contenu">
      <section className="about-hero">
        <div className="about-hero__media" aria-hidden="true">
          <Image
            className="about-hero__image"
            src="/images/about-hero-pharmacist.png"
            alt=""
            fill
            priority
            sizes="100vw"
          />
        </div>
        <Container>
          <nav
            className="breadcrumb"
            aria-label={locale === "fr" ? "Fil d’Ariane" : "Breadcrumb"}
          >
            <Link href={localizePath(locale, "/")}>
              {locale === "fr" ? "Accueil" : "Home"}
            </Link>
            <span>/</span>
            <span>{t.eyebrow}</span>
          </nav>
          <div className="about-hero__grid">
            <div>
              <p className="eyebrow">{t.eyebrow}</p>
              <h1 className="sr-only">{t.title}</h1>
              <p className="about-hero__summary">{t.summary}</p>
              <div className="button-row">
                <ButtonLink
                  href={localizePath(locale, "/institut/notre-approche")}
                >
                  {t.approach}
                </ButtonLink>
                <ButtonLink
                  href={localizePath(locale, "/contact")}
                  variant="secondary"
                >
                  {t.contact}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="about-intro section">
        <Container>
          <div className="about-intro__grid">
            <SectionHeader
              eyebrow={t.introEyebrow}
              title={t.introTitle}
              summary={t.intro}
            />
            <div className="about-principles">
              {t.principles.map((principle, index) => {
                const Icon = principleIcons[index] ?? Beaker;
                return (
                  <article key={principle.title}>
                    <Icon aria-hidden="true" />
                    <span>0{index + 1}</span>
                    <h2>{principle.title}</h2>
                    <p>{principle.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="about-story section" id="notre-histoire">
        <Container className="about-story__grid">
          <header className="about-story__heading">
            <p className="eyebrow">{t.storyLabel}</p>
            <h2>{t.storyEyebrow}</h2>
            <p className="about-story__lead">{t.storyTitle}</p>
            <p>{t.storyIntro}</p>
            <ul
              aria-label={
                locale === "fr" ? "Thèmes du témoignage" : "Testimony themes"
              }
            >
              {t.storyThemes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
          </header>

          <div className="about-story__testimony">
            <Quote className="about-story__quote-icon" aria-hidden="true" />
            <blockquote>
              {t.storyQuote.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <footer>
                <strong>{t.storyAttribution}</strong>
                <span>{t.storyRole}</span>
              </footer>
            </blockquote>
            <aside className="about-story__note" id="note-de-transparence">
              <FileCheck2 aria-hidden="true" />
              <div>
                <h3>{t.storyNoteTitle}</h3>
                <p>{t.storyNote}</p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="about-mission section">
        <Container>
          <SectionHeader
            eyebrow={t.missionEyebrow}
            title={t.missionTitle}
            summary={t.missionSummary}
            invert
          />
          <div className="about-actions">
            {t.actions.map(([title, description], index) => {
              const Icon = actionIcons[index] ?? Scale;
              return (
                <article key={title}>
                  <div>
                    <span>0{index + 1}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="about-team section" id="notre-equipe">
        <Container>
          <SectionHeader
            eyebrow={t.teamEyebrow}
            title={t.teamTitle}
            summary={t.teamSummary}
          />
          <div
            className={`about-team__grid${
              teamMembers.length === 4
                ? " about-team__grid--four"
                : teamMembers.length === 5
                  ? " about-team__grid--five"
                  : ""
            }`}
          >
            {teamMembers.map((member, index) => (
              <article className="about-team__member" key={member.name}>
                <div className="about-team__portrait">
                  <Image
                    src={member.image}
                    alt={member.imageAlt}
                    fill
                    sizes="(max-width: 580px) 100vw, (max-width: 1024px) 50vw, 410px"
                  />
                  <span aria-hidden="true">0{index + 1}</span>
                </div>
                <div className="about-team__identity">
                  <p>{member.area}</p>
                  <h3
                    className={
                      member.name.length > 28
                        ? "about-team__name--long"
                        : undefined
                    }
                  >
                    {member.name}
                  </h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="about-history section">
        <Container className="about-history__grid">
          <article className="about-history__milestone">
            <p className="eyebrow">{t.historyEyebrow}</p>
            <strong>2008</strong>
            <h2>{t.historyTitle}</h2>
            <p>{t.historyText}</p>
          </article>
          <aside className="about-history__verification">
            <BadgeCheck aria-hidden="true" />
            <div>
              <h2>{t.verificationTitle}</h2>
              <p>{t.verificationText}</p>
              <Link href={localizePath(locale, "/institut")}>
                {locale === "fr"
                  ? "Voir l’espace institutionnel"
                  : "Visit the institutional area"}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </aside>
        </Container>
      </section>
    </main>
  );
}
