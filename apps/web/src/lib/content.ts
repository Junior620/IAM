import type { Locale } from "@iam/contracts";
import {
  Activity,
  BadgeCheck,
  BookOpenCheck,
  Boxes,
  BriefcaseBusiness,
  Compass,
  Factory,
  HeartHandshake,
  Images,
  Leaf,
  type LucideIcon,
  Microscope,
  PackageSearch,
  Palette,
  RadioTower,
  Scale,
  ShieldCheck,
  Users,
} from "lucide-react";

export type { Locale };

export const locales: Locale[] = ["fr", "en"];

export function localizePath(locale: Locale, path: string) {
  const cleanPath = path === "/" ? "" : path;
  return locale === "en" ? `/en${cleanPath}` || "/en" : cleanPath || "/";
}

export function getLocaleFromLang(lang: string): Locale | null {
  return lang === "fr" || lang === "en" ? lang : null;
}

export type SectionKey =
  | "evidence"
  | "alerts"
  | "pillars"
  | "programs"
  | "map"
  | "science"
  | "impact"
  | "youth"
  | "publications"
  | "partners"
  | "philanthropy"
  | "news"
  | "newsletter";

type Copy = {
  utility: {
    alert: string;
    newsletter: string;
    contact: string;
    support: string;
    search: string;
  };
  nav: string[];
  hero: {
    eyebrow: string;
    title: string;
    summary: string;
    partner: string;
    alerts: string;
  };
  sections: Record<
    SectionKey,
    { eyebrow: string; title: string; summary: string }
  >;
  common: {
    explore: string;
    sourcePolicy: string;
    noAlert: string;
    menu: string;
    close: string;
  };
};

export const copy: Record<Locale, Copy> = {
  fr: {
    utility: {
      alert: "Centre d’alertes",
      newsletter: "Newsletter",
      contact: "Contact",
      support: "Soutenir l’IAM",
      search: "Rechercher",
    },
    nav: [
      "L’Institut",
      "Priorités",
      "Académie",
      "Participer",
      "Actualités & médias",
    ],
    hero: {
      eyebrow: "Institut créé en 2008 par le Dr Didier Mouliom",
      title:
        "Faire progresser le médicament en Afrique, de la recherche à l’accès.",
      summary:
        "L’IAM rassemble scientifiques, institutions, professionnels et partenaires pour améliorer la disponibilité, la sécurité, la qualité et l’innovation pharmaceutique sur le continent.",
      partner: "Devenir partenaire",
      alerts: "Consulter les alertes",
    },
    sections: {
      evidence: {
        eyebrow: "Notre standard",
        title: "La preuve avant la promesse.",
        summary:
          "Chaque chiffre, partenariat et résultat public doit être daté, sourcé et validé.",
      },
      alerts: {
        eyebrow: "Information opérationnelle",
        title: "Veiller, signaler, agir.",
        summary:
          "Un point d’accès conçu pour les ruptures, rappels, alertes de sécurité et médicaments falsifiés.",
      },
      pillars: {
        eyebrow: "Huit priorités",
        title: "Une vision complète du médicament.",
        summary:
          "De la recherche à l’accès, l’IAM structure son action autour des enjeux qui relient science, industrie, santé publique et société.",
      },
      programs: {
        eyebrow: "Programmes structurants",
        title: "Transformer les priorités en action.",
        summary:
          "Des cadres d’intervention conçus pour réunir les expertises, documenter les résultats et faciliter la coopération.",
      },
      map: {
        eyebrow: "Présence africaine",
        title: "Une lecture continentale, des réalités nationales.",
        summary:
          "Chaque présence est reliée à un programme, un partenaire et une source — jamais à une simple affirmation de couverture.",
      },
      science: {
        eyebrow: "Science & pharmacopée",
        title: "Relier savoirs, preuves et innovation.",
        summary:
          "La pharmacopée africaine est abordée avec les exigences de la botanique, de la chimie, de la sécurité et du partage équitable des bénéfices.",
      },
      impact: {
        eyebrow: "Impact documenté",
        title: "Des résultats racontés avec méthode.",
        summary:
          "Les récits d’impact seront publiés avec consentement, contexte, résultat mesurable et date de vérification.",
      },
      youth: {
        eyebrow: "Génération Santé Afrique",
        title: "Donner aux jeunes les moyens d’agir pour la santé.",
        summary:
          "Une initiative de prévention, d’activité physique, de solidarité et d’engagement citoyen portée dans un cadre protecteur.",
      },
      publications: {
        eyebrow: "Publications & veille",
        title: "Une intelligence pharmaceutique utile.",
        summary:
          "Rapports, études, notes publiques et données seront accessibles dans une bibliothèque bilingue et filtrable.",
      },
      partners: {
        eyebrow: "Coopérer",
        title: "Des partenariats expliqués, pas seulement affichés.",
        summary:
          "Chaque relation publiée précisera le programme, la contribution et les résultats validés.",
      },
      philanthropy: {
        eyebrow: "Philanthropie",
        title: "Soutenir un programme en toute transparence.",
        summary:
          "Les paiements resteront désactivés jusqu’à validation juridique et activation d’un compte marchand officiel.",
      },
      news: {
        eyebrow: "Actualités & événements",
        title: "Suivre ce qui change le secteur.",
        summary:
          "Une grille lisible distinguera l’urgent, l’institutionnel, la science et les rendez-vous professionnels.",
      },
      newsletter: {
        eyebrow: "IAM Pharmaceutical Intelligence",
        title: "Choisissez les informations qui comptent pour vous.",
        summary:
          "Une newsletter bilingue et segmentée, avec double confirmation et préférences modifiables.",
      },
    },
    common: {
      explore: "Explorer",
      sourcePolicy: "Donnée publiée uniquement après vérification",
      noAlert: "Aucune alerte institutionnelle active",
      menu: "Menu",
      close: "Fermer",
    },
  },
  en: {
    utility: {
      alert: "Alerts centre",
      newsletter: "Newsletter",
      contact: "Contact",
      support: "Support IAM",
      search: "Search",
    },
    nav: [
      "The Institute",
      "Priorities",
      "Academy",
      "Get involved",
      "News & media",
    ],
    hero: {
      eyebrow: "Pan-African pharmaceutical cooperation",
      title: "Advancing medicine in Africa, from research to access.",
      summary:
        "IAM brings together scientists, institutions, professionals and partners to improve the availability, safety, quality and innovation of medicines across the continent.",
      partner: "Become a partner",
      alerts: "View alerts",
    },
    sections: {
      evidence: {
        eyebrow: "Our standard",
        title: "Evidence before promise.",
        summary:
          "Every public figure, partnership and outcome must be dated, sourced and approved.",
      },
      alerts: {
        eyebrow: "Operational information",
        title: "Monitor, report, act.",
        summary:
          "One entry point designed for shortages, recalls, safety alerts and falsified medicines.",
      },
      pillars: {
        eyebrow: "Eight priorities",
        title: "A complete view of medicine.",
        summary:
          "From research to access, IAM connects science, industry, public health and society.",
      },
      programs: {
        eyebrow: "Structuring programmes",
        title: "Turning priorities into action.",
        summary:
          "Frameworks designed to assemble expertise, document outcomes and make cooperation easier.",
      },
      map: {
        eyebrow: "African presence",
        title: "A continental view, grounded nationally.",
        summary:
          "Each public presence links to a programme, a partner and a source — never a broad unsupported claim.",
      },
      science: {
        eyebrow: "Science & pharmacopoeia",
        title: "Connecting knowledge, evidence and innovation.",
        summary:
          "African pharmacopoeia is approached through botany, chemistry, safety and equitable benefit-sharing.",
      },
      impact: {
        eyebrow: "Documented impact",
        title: "Outcomes told with method.",
        summary:
          "Impact stories will include consent, context, measurable outcomes and a verification date.",
      },
      youth: {
        eyebrow: "Generation Health Africa",
        title: "Giving young people the means to act for health.",
        summary:
          "A protective framework for prevention, physical activity, solidarity and civic participation.",
      },
      publications: {
        eyebrow: "Publications & intelligence",
        title: "Useful pharmaceutical intelligence.",
        summary:
          "Reports, research, policy briefs and data will live in a bilingual, filterable library.",
      },
      partners: {
        eyebrow: "Cooperate",
        title: "Partnerships explained, not merely displayed.",
        summary:
          "Every published relationship will identify its programme, contribution and verified outcomes.",
      },
      philanthropy: {
        eyebrow: "Philanthropy",
        title: "Support a programme transparently.",
        summary:
          "Payments remain disabled until legal review and an official merchant account are in place.",
      },
      news: {
        eyebrow: "News & events",
        title: "Follow what is changing the sector.",
        summary:
          "A clear grid will distinguish urgent updates, institutional news, science and professional events.",
      },
      newsletter: {
        eyebrow: "IAM Pharmaceutical Intelligence",
        title: "Choose the intelligence that matters to you.",
        summary:
          "A bilingual, segmented newsletter with double confirmation and editable preferences.",
      },
    },
    common: {
      explore: "Explore",
      sourcePolicy: "Published only after verification",
      noAlert: "No active institutional alert",
      menu: "Menu",
      close: "Close",
    },
  },
};

export const navItems = [
  { fr: "L’Institut", en: "The Institute", path: "/institut" },
  { fr: "Priorités", en: "Priorities", path: "/priorites" },
  { fr: "Académie", en: "Academy", path: "/academie" },
  { fr: "Participer", en: "Get involved", path: "/participer" },
  { fr: "Actualités & médias", en: "News & media", path: "/actualites-medias" },
] as const;

export type Pillar = {
  number: string;
  icon: LucideIcon;
  fr: { title: string; summary: string };
  en: { title: string; summary: string };
  slug: string;
};

export const pillars: Pillar[] = [
  {
    number: "01",
    icon: PackageSearch,
    slug: "acces-medicaments",
    fr: {
      title: "Accès & ruptures",
      summary:
        "Disponibilité, accessibilité, chaîne d’approvisionnement et signalements.",
    },
    en: {
      title: "Access & shortages",
      summary:
        "Availability, affordability, supply chains and field reporting.",
    },
  },
  {
    number: "02",
    icon: Microscope,
    slug: "recherche-developpement",
    fr: {
      title: "Recherche & développement",
      summary:
        "Collaborations, essais, innovation thérapeutique et publications.",
    },
    en: {
      title: "Research & development",
      summary:
        "Collaborations, trials, therapeutic innovation and publications.",
    },
  },
  {
    number: "03",
    icon: Leaf,
    slug: "pharmacopee-africaine",
    fr: {
      title: "Pharmacopée africaine",
      summary: "Botanique, chimie, sécurité, savoirs et partage équitable.",
    },
    en: {
      title: "African pharmacopoeia",
      summary:
        "Botany, chemistry, safety, knowledge and equitable benefit-sharing.",
    },
  },
  {
    number: "04",
    icon: RadioTower,
    slug: "pharmacovigilance",
    fr: {
      title: "Pharmacovigilance",
      summary:
        "Surveillance, alertes, signalement sécurisé et coopération réglementaire.",
    },
    en: {
      title: "Pharmacovigilance",
      summary:
        "Monitoring, alerts, secure reporting and regulatory cooperation.",
    },
  },
  {
    number: "05",
    icon: ShieldCheck,
    slug: "qualite-medicaments",
    fr: {
      title: "Qualité & médicaments falsifiés",
      summary:
        "Contrôle, rappels, traçabilité et lutte contre les produits sous-standards.",
    },
    en: {
      title: "Quality & falsified medicines",
      summary:
        "Control, recalls, traceability and substandard product prevention.",
    },
  },
  {
    number: "06",
    icon: Factory,
    slug: "industrialisation",
    fr: {
      title: "Industrialisation africaine",
      summary:
        "Production locale, capacités, technologie, emplois et investissements.",
    },
    en: {
      title: "African industrialisation",
      summary: "Local production, capacity, technology, jobs and investment.",
    },
  },
  {
    number: "07",
    icon: BookOpenCheck,
    slug: "formation-continue",
    fr: {
      title: "Formation continue",
      summary: "Parcours, webinaires, ressources et compétences vérifiables.",
    },
    en: {
      title: "Continuing education",
      summary: "Learning paths, webinars, resources and verifiable skills.",
    },
  },
  {
    number: "08",
    icon: HeartHandshake,
    slug: "solidarite-sante",
    fr: {
      title: "Solidarité, sport & santé",
      summary:
        "Prévention, jeunesse, activité physique et accès équitable aux soins.",
    },
    en: {
      title: "Solidarity, sport & health",
      summary:
        "Prevention, youth, physical activity and equitable access to care.",
    },
  },
];

export const alertCategories = [
  {
    icon: Activity,
    fr: "Pharmacovigilance",
    en: "Pharmacovigilance",
    tone: "red",
  },
  {
    icon: PackageSearch,
    fr: "Ruptures de stock",
    en: "Medicine shortages",
    tone: "amber",
  },
  {
    icon: ShieldCheck,
    fr: "Rappels & qualité",
    en: "Recalls & quality",
    tone: "emerald",
  },
  {
    icon: BadgeCheck,
    fr: "Médicaments falsifiés",
    en: "Falsified medicines",
    tone: "navy",
  },
] as const;

export const programmes = [
  {
    icon: Boxes,
    path: "/programmes/observatoire",
    fr: {
      label: "Infrastructure de données",
      title: "Observatoire africain du médicament",
      summary:
        "Un cadre pour relier disponibilité, qualité, alertes et capacités pharmaceutiques à des sources vérifiées.",
    },
    en: {
      label: "Data infrastructure",
      title: "African Medicines Observatory",
      summary:
        "A framework connecting availability, quality, alerts and pharmaceutical capacity to verified sources.",
    },
  },
  {
    icon: BookOpenCheck,
    path: "/academie",
    fr: {
      label: "Renforcement des capacités",
      title: "Académie IAM",
      summary:
        "Une architecture de formation continue pour professionnels, institutions, chercheurs et acteurs de terrain.",
    },
    en: {
      label: "Capacity building",
      title: "IAM Academy",
      summary:
        "A continuing education architecture for professionals, institutions, researchers and field practitioners.",
    },
  },
  {
    icon: Users,
    path: "/programmes/generation-sante-afrique",
    fr: {
      label: "Jeunesse & prévention",
      title: "Génération Santé Afrique",
      summary:
        "Mobiliser la jeunesse autour de la prévention, de l’activité physique, de la solidarité et de l’accès équitable.",
    },
    en: {
      label: "Youth & prevention",
      title: "Generation Health Africa",
      summary:
        "Mobilising young people around prevention, physical activity, solidarity and equitable access.",
    },
  },
] as const;

export type PageEntry = {
  path: string;
  icon: LucideIcon;
  fr: {
    eyebrow: string;
    title: string;
    summary: string;
    intro: string;
    bullets: string[];
  };
  en: {
    eyebrow: string;
    title: string;
    summary: string;
    intro: string;
    bullets: string[];
  };
};

export const pageEntries: PageEntry[] = [
  {
    path: "/institut",
    icon: Scale,
    fr: {
      eyebrow: "L’Institut",
      title: "Une plateforme de coopération pour le médicament en Afrique.",
      summary:
        "Mission, mandat, gouvernance et transparence forment le socle de la confiance.",
      intro:
        "L’IAM structure la coopération entre science, institutions, professionnels, industrie et société civile. Son statut juridique détaillé, sa chronologie officielle et sa gouvernance seront publiés après validation documentaire.",
      bullets: [
        "Mission et vision",
        "Histoire et chronologie",
        "Statut et mandat",
        "Gouvernance et conseil scientifique",
        "Transparence et rapports",
      ],
    },
    en: {
      eyebrow: "The Institute",
      title: "A cooperation platform for medicine in Africa.",
      summary:
        "Mission, mandate, governance and transparency form the foundation of trust.",
      intro:
        "IAM structures cooperation between science, institutions, professionals, industry and civil society. Its legal status, official timeline and governance will be published once documentary validation is complete.",
      bullets: [
        "Mission and vision",
        "History and timeline",
        "Legal status and mandate",
        "Governance and scientific council",
        "Transparency and reports",
      ],
    },
  },
  {
    path: "/institut/a-propos",
    icon: Users,
    fr: {
      eyebrow: "À propos de nous",
      title: "À propos de l’Institut Africain du Médicament",
      summary:
        "L’Institut Africain du Médicament – Quality of Life (IAM-QoL) a été créé en 2008 afin de former les professionnels de santé et d’informer le grand public.",
      intro:
        "L’IAM crée des passerelles entre les expertises et les institutions afin de transformer la connaissance en action utile.",
      bullets: ["Science", "Accès", "Coopération", "Compétences"],
    },
    en: {
      eyebrow: "About us",
      title: "About the African Institute of Medicine",
      summary:
        "The African Institute of Medicine – Quality of Life (IAM-QoL) was established in 2008 to train health professionals and inform the public.",
      intro:
        "IAM builds bridges between expertise and institutions to turn knowledge into useful action.",
      bullets: ["Science", "Access", "Cooperation", "Capabilities"],
    },
  },
  {
    path: "/institut/mission-vision",
    icon: Compass,
    fr: {
      eyebrow: "Mission & vision",
      title: "Faire de la connaissance une capacité d’action.",
      summary:
        "La mission et la vision de l’IAM relient la science, les institutions, les compétences et l’accès au médicament.",
      intro:
        "L’IAM transforme la connaissance en ressources utiles, relie les acteurs et structure la coopération pharmaceutique autour de besoins identifiables.",
      bullets: ["Éclairer", "Relier", "Structurer", "Transmettre"],
    },
    en: {
      eyebrow: "Mission & vision",
      title: "Turning knowledge into the capacity to act.",
      summary:
        "IAM’s mission and vision connect science, institutions, capabilities and access to medicine.",
      intro:
        "IAM turns knowledge into useful resources, connects stakeholders and structures pharmaceutical cooperation around identifiable needs.",
      bullets: ["Clarify", "Connect", "Structure", "Share"],
    },
  },
  {
    path: "/institut/nos-services",
    icon: BriefcaseBusiness,
    fr: {
      eyebrow: "Nos services",
      title: "Des expertises mobilisées au service des systèmes de santé.",
      summary:
        "Douze domaines d’intervention structurés autour de la réglementation, des compétences, des communautés et des opérations.",
      intro:
        "L’IAM prépare chaque intervention à partir d’un besoin identifié, d’un périmètre clair et de résultats attendus définis avec le demandeur.",
      bullets: [
        "Réglementation & produits",
        "Compétences & soins",
        "Communication & communautés",
        "Systèmes & opérations",
      ],
    },
    en: {
      eyebrow: "Our services",
      title: "Expertise mobilised to strengthen health systems.",
      summary:
        "Twelve areas of intervention structured around regulation, capabilities, communities and operations.",
      intro:
        "IAM prepares each intervention from an identified need, a clear scope and expected outcomes agreed with the requesting organisation.",
      bullets: [
        "Regulation & products",
        "Capabilities & care",
        "Communication & communities",
        "Systems & operations",
      ],
    },
  },
  {
    path: "/priorites",
    icon: Activity,
    fr: {
      eyebrow: "Priorités pharmaceutiques",
      title: "Huit enjeux, une même exigence de santé publique.",
      summary: "Les priorités de l’IAM couvrent tout le cycle du médicament.",
      intro:
        "Cette architecture évite de confondre missions, prestations et projets. Chaque priorité disposera de programmes, contenus, sources, responsables et résultats propres.",
      bullets: pillars.map((item) => item.fr.title),
    },
    en: {
      eyebrow: "Pharmaceutical priorities",
      title: "Eight challenges, one public-health standard.",
      summary: "IAM priorities span the full medicine lifecycle.",
      intro:
        "This architecture separates missions, services and projects. Each priority will have its own programmes, content, sources, owners and outcomes.",
      bullets: pillars.map((item) => item.en.title),
    },
  },
  {
    path: "/academie",
    icon: BookOpenCheck,
    fr: {
      eyebrow: "Académie IAM",
      title: "Nos formations — Académie IAM",
      summary:
        "Des parcours construits autour des besoins des professionnels, des institutions et des acteurs de terrain.",
      intro:
        "Le catalogue public ne présente que les formations effectivement ouvertes. Les anciens thèmes de formation sont conservés dans le CMS comme matière éditoriale à réviser.",
      bullets: [
        "Catalogue des formations",
        "Parcours et webinaires",
        "Formateurs vérifiés",
        "Calendrier et inscription",
        "Vérification des certificats",
      ],
    },
    en: {
      eyebrow: "IAM Academy",
      title: "Our training programmes — IAM Academy",
      summary:
        "Learning pathways designed around the needs of professionals, institutions and field stakeholders.",
      intro:
        "The public catalogue only shows courses that are genuinely open. Historical training topics remain in the CMS for editorial review.",
      bullets: [
        "Course catalogue",
        "Learning paths and webinars",
        "Verified trainers",
        "Calendar and registration",
        "Certificate verification",
      ],
    },
  },
  {
    path: "/participer",
    icon: Users,
    fr: {
      eyebrow: "Participer",
      title:
        "Mettre en relation les expertises, les projets et les volontés d’agir.",
      summary:
        "Chercheurs, professionnels, jeunes, institutions et société civile disposent de parcours distincts.",
      intro:
        "Les candidatures sont routées vers le service concerné, sans créer de profil public avant validation et consentement.",
      bullets: [
        "Devenir expert",
        "Proposer un projet",
        "Participer à un événement",
        "Programme jeunesse",
        "S’abonner aux alertes",
      ],
    },
    en: {
      eyebrow: "Get involved",
      title: "Connecting expertise, projects and the will to act.",
      summary:
        "Researchers, professionals, young people, institutions and civil society follow distinct pathways.",
      intro:
        "Applications are routed to the appropriate service, without creating a public profile before approval and consent.",
      bullets: [
        "Become an expert",
        "Propose a project",
        "Attend an event",
        "Youth programme",
        "Subscribe to alerts",
      ],
    },
  },
  {
    path: "/actualites-medias",
    icon: RadioTower,
    fr: {
      eyebrow: "Actualités & médias",
      title:
        "Une information hiérarchisée selon l’urgence et l’action attendue.",
      summary:
        "Actualités, communiqués, événements, veille et ressources médias.",
      intro:
        "Les contenus distinguent les alertes urgentes, les décisions institutionnelles, les analyses scientifiques et les événements afin de réduire la surcharge informationnelle.",
      bullets: [
        "Actualités",
        "Communiqués",
        "Événements",
        "Veille pharmaceutique",
        "Kit média",
      ],
    },
    en: {
      eyebrow: "News & media",
      title: "Information prioritised by urgency and expected action.",
      summary: "News, statements, events, intelligence and media resources.",
      intro:
        "Content separates urgent alerts, institutional decisions, scientific analysis and events to reduce information overload.",
      bullets: [
        "News",
        "Statements",
        "Events",
        "Pharmaceutical intelligence",
        "Media kit",
      ],
    },
  },
  {
    path: "/actualites-medias/galerie",
    icon: Images,
    fr: {
      eyebrow: "Galerie & photothèque",
      title: "La mémoire visuelle de l’Institut Africain du Médicament.",
      summary:
        "Une sélection bilingue et accessible des rencontres, formations et activités de l’IAM.",
      intro:
        "Chaque média publié est accompagné d’une description et d’un statut documentaire explicite.",
      bullets: [
        "Vie de l’Institut",
        "Formations",
        "Rencontres",
        "Science et santé",
      ],
    },
    en: {
      eyebrow: "Gallery & photo library",
      title: "The visual record of the African Medicines Institute.",
      summary:
        "An accessible bilingual selection of IAM meetings, training activities and institutional moments.",
      intro:
        "Every published item includes a description and an explicit documentation status.",
      bullets: ["Institute life", "Training", "Meetings", "Science and health"],
    },
  },
  {
    path: "/partenariats",
    icon: HeartHandshake,
    fr: {
      eyebrow: "Partenariats",
      title: "Coopérer sur un objectif clair et un résultat documenté.",
      summary:
        "Institutions, universités, industriels et fondations disposent d’un point d’entrée dédié.",
      intro:
        "Les logos ne sont jamais utilisés seuls : chaque partenaire publié est relié à la nature de la coopération, au programme concerné et aux résultats vérifiés.",
      bullets: [
        "Gouvernements et institutions",
        "Universités et chercheurs",
        "Industrie",
        "Fondations",
        "Mécénat d’entreprise",
      ],
    },
    en: {
      eyebrow: "Partnerships",
      title: "Cooperate around a clear goal and a documented outcome.",
      summary:
        "Institutions, universities, industry and foundations have a dedicated entry point.",
      intro:
        "Logos never stand alone: every published partner is connected to the nature of the cooperation, the relevant programme and verified outcomes.",
      bullets: [
        "Governments and institutions",
        "Universities and researchers",
        "Industry",
        "Foundations",
        "Corporate philanthropy",
      ],
    },
  },
  {
    path: "/partenariats/anna-snijder",
    icon: Palette,
    fr: {
      eyebrow: "Collaboration artistique",
      title: "Anna Snijder — Artiste plasticienne internationale",
      summary:
        "Une collaboration entre création artistique, santé et impact social au service de la mission de l’IAM.",
      intro:
        "Anna Snijder soutient l’Institut Africain du Médicament en reversant une part fixe du produit de la vente de ses œuvres et commandes artistiques.",
      bullets: [
        "Peinture abstraite",
        "Art et responsabilité sociale",
        "Soutien à la mission de l’IAM",
        "Représentation internationale",
      ],
    },
    en: {
      eyebrow: "Artistic collaboration",
      title: "Anna Snijder — International visual artist",
      summary:
        "A collaboration connecting artistic creation, health and social impact in support of IAM’s mission.",
      intro:
        "Anna Snijder supports the African Institute of Medicine by donating a fixed share of the proceeds from her artworks and commissions.",
      bullets: [
        "Abstract painting",
        "Art and social responsibility",
        "Support for IAM’s mission",
        "International representation",
      ],
    },
  },
  {
    path: "/contact",
    icon: RadioTower,
    fr: {
      eyebrow: "Contact",
      title: "Diriger chaque demande vers la bonne équipe.",
      summary:
        "Contact général, partenariats, coopération scientifique, médias et signalements.",
      intro:
        "Les coordonnées professionnelles définitives doivent être configurées avant activation des envois. Aucun message n’est stocké dans Sanity.",
      bullets: [
        "Contact général",
        "Partenariats",
        "Coopération scientifique",
        "Médias",
        "Signalement de pénurie",
      ],
    },
    en: {
      eyebrow: "Contact",
      title: "Route every request to the right team.",
      summary:
        "General enquiries, partnerships, scientific cooperation, media and reporting.",
      intro:
        "Final professional contact addresses must be configured before email delivery is enabled. No message is stored in Sanity.",
      bullets: [
        "General enquiries",
        "Partnerships",
        "Scientific cooperation",
        "Media",
        "Shortage reporting",
      ],
    },
  },
];

export function getPageEntry(path: string) {
  const normalized = `/${path.split("/").filter(Boolean).join("/")}`;
  return pageEntries.find((entry) => entry.path === normalized) ?? null;
}

export const searchIndex = (locale: Locale) => [
  ...pageEntries.map((entry) => ({
    title: entry[locale].title,
    summary: entry[locale].summary,
    path: localizePath(locale, entry.path),
    type: entry[locale].eyebrow,
  })),
  ...pillars.map((pillar) => ({
    title: pillar[locale].title,
    summary: pillar[locale].summary,
    path: localizePath(locale, `/priorites/${pillar.slug}`),
    type: locale === "fr" ? "Priorité" : "Priority",
  })),
];
