import { localizePath, type Locale } from "@/lib/content";

export type AssistantSource = {
  title: string;
  path: string;
};

export type AssistantKnowledgeEntry = AssistantSource & {
  id: string;
  content: string;
  keywords: string[];
};

const knowledge: Record<Locale, AssistantKnowledgeEntry[]> = {
  fr: [
    {
      id: "institute",
      title: "À propos de l’IAM",
      path: "/institut/a-propos",
      content:
        "L’Institut Africain du Médicament a été créé en 2008 par le Dr Didier Mouliom. Il rassemble scientifiques, institutions, professionnels, industrie et société civile pour faire progresser le médicament en Afrique, de la recherche à l’accès.",
      keywords: [
        "institut",
        "iam",
        "histoire",
        "création",
        "fondateur",
        "didier mouliom",
        "mission",
        "afrique",
      ],
    },
    {
      id: "services",
      title: "Nos services",
      path: "/institut/nos-services",
      content:
        "L’IAM intervient dans douze domaines : affaires réglementaires, essais cliniques, produits cosmétiques et tests, recrutement de professionnels de santé, formation continue, éducation thérapeutique, appui aux patients et soignants, communication professionnelle, mobilisation communautaire, distribution pharmaceutique, systèmes d’information sanitaire et management de projet.",
      keywords: [
        "service",
        "expertise",
        "réglementation",
        "essai clinique",
        "cosmétique",
        "recrutement",
        "distribution",
        "projet",
      ],
    },
    {
      id: "field-actions",
      title: "Nos actions sur le terrain",
      path: "/institut/nos-services#actions-terrain",
      content:
        "Les actions de terrain comprennent l’appui aux politiques de santé, le renforcement des compétences, le conseil en organisation, la promotion et la distribution des produits pharmaceutiques ainsi que l’amélioration des infrastructures sanitaires.",
      keywords: [
        "terrain",
        "politique de santé",
        "compétence",
        "organisation",
        "infrastructure",
        "équipement",
      ],
    },
    {
      id: "academy",
      title: "Académie et formations IAM",
      path: "/academie",
      content:
        "L’Académie IAM propose des ateliers et modules adaptés aux réalités du terrain. Les thèmes comprennent les produits cosmétiques, l’hygiène et la sécurité, l’approvisionnement des médicaments, la qualité des soins, la psychologie des patients, la gestion de production, le dépistage, la prévention de la transmission, le tutorat clinique et la supervision formative.",
      keywords: [
        "académie",
        "formation",
        "atelier",
        "module",
        "cours",
        "apprendre",
        "inscription",
      ],
    },
    {
      id: "priorities",
      title: "Les priorités de l’IAM",
      path: "/priorites",
      content:
        "Les huit priorités de l’IAM sont l’accès aux médicaments et les ruptures, la recherche et le développement, la pharmacopée africaine, la pharmacovigilance, la qualité et les médicaments falsifiés, l’industrialisation africaine, la formation continue, puis la solidarité, le sport et la santé.",
      keywords: [
        "priorité",
        "accès médicament",
        "recherche",
        "pharmacopée",
        "pharmacovigilance",
        "qualité",
        "industrialisation",
        "solidarité",
      ],
    },
    {
      id: "alerts",
      title: "Centre d’alertes",
      path: "/alertes",
      content:
        "Le centre d’alertes organise l’information relative à la pharmacovigilance, aux ruptures de stock, aux rappels et à la qualité ainsi qu’aux médicaments falsifiés. Le site ne propose pas encore de parcours public pour transmettre un signalement médical urgent.",
      keywords: [
        "alerte",
        "rupture",
        "rappel",
        "falsifié",
        "pharmacovigilance",
        "signalement",
      ],
    },
    {
      id: "partnerships",
      title: "Partenariats",
      path: "/partenariats",
      content:
        "L’IAM accueille les propositions de coopération scientifique, institutionnelle, technique, pédagogique ou philanthropique. Chaque relation publiée doit préciser le programme concerné, la contribution et les résultats validés. Les demandes sont orientées depuis le formulaire de contact.",
      keywords: [
        "partenaire",
        "partenariat",
        "coopération",
        "collaboration",
        "soutenir",
        "don",
        "philanthropie",
      ],
    },
    {
      id: "gallery",
      title: "Galerie et photothèque",
      path: "/actualites-medias/galerie",
      content:
        "La galerie documente les événements et actions de l’IAM, notamment IAM au DUPHAT 2020, le projet de réglementation cosmétique au Cameroun et la remise de dons aux enfants victimes de la crise anglophone à l’occasion de la Journée mondiale du pharmacien 2021.",
      keywords: [
        "galerie",
        "photo",
        "photothèque",
        "duphat",
        "événement",
        "don",
        "cameroun",
      ],
    },
    {
      id: "generation-health",
      title: "Génération Santé Afrique",
      path: "/programmes/generation-sante-afrique",
      content:
        "Génération Santé Afrique mobilise les jeunes autour de la prévention, de l’activité physique, de la solidarité, de l’engagement citoyen et de l’accès équitable aux soins dans un cadre protecteur.",
      keywords: [
        "génération santé",
        "jeune",
        "prévention",
        "sport",
        "activité physique",
        "solidarité",
      ],
    },
    {
      id: "contact",
      title: "Contacter l’IAM",
      path: "/contact",
      content:
        "L’IAM est situé à Bonamoussadi, Bloc 24, en face de la Perception, Douala, Cameroun. Téléphones : +237 696 21 68 09 et +237 233 47 10 65. Adresse électronique : institutafricaindumedicament@gmail.com. Boîte postale : 5426 Douala.",
      keywords: [
        "contact",
        "adresse",
        "téléphone",
        "email",
        "douala",
        "bonamoussadi",
        "localisation",
      ],
    },
    {
      id: "privacy",
      title: "Confidentialité et données personnelles",
      path: "/confidentialite",
      content:
        "Les formulaires et l’assistant IAM ne doivent recevoir aucune donnée de santé, information sur un patient ou situation urgente. L’assistant ne fournit aucun diagnostic, aucune prescription et aucune recommandation médicale personnalisée.",
      keywords: [
        "confidentialité",
        "donnée personnelle",
        "vie privée",
        "diagnostic",
        "conseil médical",
        "sécurité",
      ],
    },
  ],
  en: [
    {
      id: "institute",
      title: "About IAM",
      path: "/institut/a-propos",
      content:
        "The African Institute of Medicine was founded in 2008 by Dr Didier Mouliom. It brings together scientists, institutions, professionals, industry and civil society to advance medicine in Africa, from research to access.",
      keywords: [
        "institute",
        "iam",
        "history",
        "founded",
        "founder",
        "didier mouliom",
        "mission",
        "africa",
      ],
    },
    {
      id: "services",
      title: "Our services",
      path: "/institut/nos-services",
      content:
        "IAM works across twelve areas: regulatory affairs, clinical trials, cosmetic products and testing, health-professional recruitment, continuing education, therapeutic education, support for patients and caregivers, professional communication, community mobilisation, pharmaceutical distribution, health information systems and project management.",
      keywords: [
        "service",
        "expertise",
        "regulation",
        "clinical trial",
        "cosmetic",
        "recruitment",
        "distribution",
        "project",
      ],
    },
    {
      id: "field-actions",
      title: "Our work in the field",
      path: "/institut/nos-services#actions-terrain",
      content:
        "Field activities include health-policy support, capacity building, organisational consulting, promotion and distribution of pharmaceutical products, and improvements to health infrastructure.",
      keywords: [
        "field",
        "health policy",
        "capacity",
        "organisation",
        "infrastructure",
        "equipment",
      ],
    },
    {
      id: "academy",
      title: "IAM Academy and courses",
      path: "/academie",
      content:
        "IAM Academy offers workshops and modules adapted to field realities. Topics include cosmetic products, hygiene and safety, medicine supply, quality of care, patient psychology, production management, screening, transmission prevention, clinical tutoring and formative supervision.",
      keywords: [
        "academy",
        "training",
        "workshop",
        "module",
        "course",
        "learn",
        "registration",
      ],
    },
    {
      id: "priorities",
      title: "IAM priorities",
      path: "/priorites",
      content:
        "IAM has eight priorities: access to medicines and shortages, research and development, African pharmacopoeia, pharmacovigilance, quality and falsified medicines, African industrialisation, continuing education, and solidarity, sport and health.",
      keywords: [
        "priority",
        "medicine access",
        "research",
        "pharmacopoeia",
        "pharmacovigilance",
        "quality",
        "industrialisation",
        "solidarity",
      ],
    },
    {
      id: "alerts",
      title: "Alerts centre",
      path: "/alertes",
      content:
        "The alerts centre organises information about pharmacovigilance, shortages, recalls and quality, and falsified medicines. The website does not yet provide a public pathway for urgent medical reports.",
      keywords: [
        "alert",
        "shortage",
        "recall",
        "falsified",
        "pharmacovigilance",
        "report",
      ],
    },
    {
      id: "partnerships",
      title: "Partnerships",
      path: "/partenariats",
      content:
        "IAM welcomes scientific, institutional, technical, educational and philanthropic cooperation proposals. Every published relationship should identify the programme, contribution and verified outcomes. Requests are routed through the contact form.",
      keywords: [
        "partner",
        "partnership",
        "cooperation",
        "collaboration",
        "support",
        "donation",
        "philanthropy",
      ],
    },
    {
      id: "gallery",
      title: "Gallery and photo library",
      path: "/actualites-medias/galerie",
      content:
        "The gallery documents IAM events and field activities, including IAM at DUPHAT 2020, the cosmetics-regulation project in Cameroon and donations to children affected by the Anglophone crisis for World Pharmacists Day 2021.",
      keywords: [
        "gallery",
        "photo",
        "library",
        "duphat",
        "event",
        "donation",
        "cameroon",
      ],
    },
    {
      id: "generation-health",
      title: "Generation Health Africa",
      path: "/programmes/generation-sante-afrique",
      content:
        "Generation Health Africa mobilises young people around prevention, physical activity, solidarity, civic engagement and equitable access to care within a protective framework.",
      keywords: [
        "generation health",
        "youth",
        "prevention",
        "sport",
        "physical activity",
        "solidarity",
      ],
    },
    {
      id: "contact",
      title: "Contact IAM",
      path: "/contact",
      content:
        "IAM is located at Bonamoussadi, Block 24, opposite the Tax Office, Douala, Cameroon. Phone numbers: +237 696 21 68 09 and +237 233 47 10 65. Email: institutafricaindumedicament@gmail.com. P.O. Box: 5426 Douala.",
      keywords: [
        "contact",
        "address",
        "phone",
        "email",
        "douala",
        "bonamoussadi",
        "location",
      ],
    },
    {
      id: "privacy",
      title: "Privacy and personal data",
      path: "/confidentialite",
      content:
        "IAM forms and assistant must not receive health data, patient information or urgent situations. The assistant provides no diagnosis, prescription or personalised medical recommendation.",
      keywords: [
        "privacy",
        "personal data",
        "health data",
        "diagnosis",
        "medical advice",
        "security",
      ],
    },
  ],
};

const stopWords = new Set([
  "about",
  "are",
  "available",
  "avec",
  "avez",
  "bonjour",
  "bonsoir",
  "can",
  "ces",
  "cette",
  "comment",
  "dans",
  "des",
  "does",
  "estce",
  "est",
  "fait",
  "hello",
  "how",
  "iam",
  "information",
  "informations",
  "les",
  "leur",
  "merci",
  "nous",
  "our",
  "please",
  "pour",
  "propose",
  "proposent",
  "provide",
  "provides",
  "que",
  "quel",
  "quels",
  "quelle",
  "quelles",
  "qui",
  "salut",
  "site",
  "sont",
  "sur",
  "the",
  "there",
  "these",
  "this",
  "une",
  "vos",
  "votre",
  "vous",
  "what",
  "which",
  "with",
  "you",
  "your",
]);

function normalise(value: string) {
  return value
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\p{Default_Ignorable_Code_Point}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9+]+/g, " ")
    .trim();
}

const tokenAliases: Record<string, string> = {
  appeler: "contact",
  contactez: "contact",
  contacter: "contact",
  coordonnee: "contact",
  courriel: "email",
  mail: "email",
  joindre: "contact",
  disponible: "available",
  inscription: "registration",
  inscrire: "registration",
  register: "registration",
  registering: "registration",
  enrolment: "registration",
  enrollment: "registration",
  signup: "registration",
};

function stemToken(token: string) {
  if (token.length > 4 && token.endsWith("ies")) token = `${token.slice(0, -3)}y`;
  else if (token.length > 4 && token.endsWith("s") && !token.endsWith("ss"))
    token = token.slice(0, -1);
  return tokenAliases[token] ?? token;
}

export function assistantSearchTerms(value: string): string[] {
  return [...new Set(normalise(value).split(" ").map(stemToken))].filter(
    (token) => token.length > 2 && !stopWords.has(token),
  );
}

export function isAssistantGreeting(query: string) {
  return /^(bonjour|bonsoir|salut|hello|hi|good morning|good afternoon|good evening)(?: (?:iam|assistant|a vous|tout le monde|there))*$/.test(
    normalise(query),
  );
}

export function isAssistantOutOfScope(query: string) {
  return /\b(meteo|weather|horoscope|astrologie|astrology|bitcoin|crypto|cryptocurrency|recette de cuisine|cooking recipe|capitale de|capital of|match de football|football match|football score|gagne le match|won the match|resultat du match|score du match)\b/.test(
    normalise(query),
  );
}

export function selectAssistantKnowledge(
  query: string,
  locale: Locale,
  additionalEntries: AssistantKnowledgeEntry[] = [],
) {
  if (isAssistantOutOfScope(query) || isAssistantGreeting(query)) return [];
  const tokens = assistantSearchTerms(query);
  if (tokens.length === 0) {
    if (/\biam\b/.test(normalise(query))) {
      return knowledge[locale]
        .filter((entry) => entry.id === "institute")
        .map((entry) => ({ ...entry, score: 10 }));
    }
    return [];
  }
  return [...additionalEntries, ...knowledge[locale]]
    .map((entry) => {
      const title = new Set(assistantSearchTerms(entry.title));
      const keywords = new Set(assistantSearchTerms(entry.keywords.join(" ")));
      const content = new Set(assistantSearchTerms(entry.content));
      let score = 0;
      let meaningfulMatches = 0;
      let contentMatches = 0;
      for (const token of tokens) {
        if (title.has(token)) score += 6;
        if (keywords.has(token)) score += 4;
        if (title.has(token) || keywords.has(token)) meaningfulMatches += 1;
        if (content.has(token)) {
          score += 1;
          contentMatches += 1;
        }
      }
      // A substring or an incidental word in a paragraph is not a source match.
      if (
        meaningfulMatches === 0 &&
        (contentMatches < 2 || contentMatches / tokens.length < 0.6)
      ) score = 0;
      return { ...entry, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 4);
}

export type AssistantInputKind = "safe" | "medical" | "personal";

export function classifyAssistantInput(message: string): AssistantInputKind {
  const text = normalise(message);
  const medicalText = text
    .replace(/\btraitement des donnees\b/g, "gestion des donnees")
    .replace(/\bdata treatment\b/g, "data processing")
    .replace(/\b(?:take|taking) ((?:(?:a|the|your|these|iam|some) )?)(courses?|training|classes?|workshops?)\b/g, "attend $1$2")
    .replace(/\b(?:prendre|prends|prend) ((?:(?:des|les|vos|ces|un|une|la|le) )?)(cours|formations?|ateliers?)\b/g, "suivre $1$2");
  const personalMedicalRequest = [
    /\b(?:je prends|j ai mal|je souffre|je suis malade|je suis enceinte|j ai de la fievre|i take|i am sick|i feel sick|i am pregnant|i have a fever)\b/,
    /\b(?:puis je|dois je|peux tu|pouvez vous|peut on|can i|should i|can you|should we)\b.{0,65}\b(?:prendre|prescrire|traiter|diagnostiquer|soigner|melanger|take|prescribe|treat|diagnose|mix)\b/,
    /\b(?:quelle?s?|quel?s?|combien|what|which|how much|how many)\b.{0,55}\b(?:doses?|dosages?|posologies?|traitements?|medicaments? prendre|pills?|treatments?|medicine should)\b/,
    /\b(?:mes|mon|ma|my|notre|our)\b.{0,45}\b(?:symptomes?|diagnostics?|traitements?|douleurs?|ordonnances?|symptoms?|diagnosis|diagnoses|treatments?|prescriptions?|pain)\b/,
    /\b(?:j ai|je suis|i have|i am|mon enfant|mon bebe|ma fille|mon fils|ma mere|mon pere|my child|my baby|my daughter|my son|my mother|my father)\b.{0,60}\b(?:malade|mal|fievre|diabete|diabetique|cancer|asthme|enceinte|douleurs?|symptomes?|symptoms?|diagnostics?|diagnosis|diabetes|diabetic|cough|fever|sick|pregnant|pain|fatigue|toux|vomissements?|diarrhee|nausees?|vertiges?|headache|nausea|rash|bleeding)\b/,
    /\b(?:ne respire plus|ne respire pas|not breathing|can t breathe|inconscient|unconscious|perd connaissance|me suicider|hurt myself)\b/,
    /\b\d+(?:[.,]\d+)?\s*(?:mg|mcg|comprime[s]?|tablets?|pills?)\b/,
  ];
  if (personalMedicalRequest.some((pattern) => pattern.test(medicalText))) return "medical";

  const personalData = [
    /[\w.+-]+@[\w.-]+\.[a-z]{2,}/i,
    /(?:\+?\d[\s().-]*){8,}/,
    /\b(?:je m appelle|mon nom est|mon prenom est|my name is|j habite|mon adresse est|my address is|i live at)\b/i,
    /\b(?:date de naissance|birth date|date of birth|ne le|nee le|born on)\b.{0,30}\d/i,
    /\b(?:dossier|identifiant patient|numero de patient|patient id|medical record)\b.{0,25}\d/i,
  ];
  if (personalData.some((pattern) => pattern.test(message) || pattern.test(text)))
    return "personal";

  const medicalTopic =
    /\b(?:posologies?|dosages?|doses?|diagnostics?|diagnostiquer|diagnosis|diagnoses|diagnose|diagnosed|symptomes?|symptoms?|traitements?|treatments?|ordonnances?|prescriptions?|prescrire|prescribe|effets? indesirables?|effets? secondaires?|side effects?|urgences?|emergencies|emergency|enceintes?|grossesses?|pregnant|pregnancy|pregnancies)\b/;
  const institutionalTopic =
    /\b(?:formations?|ateliers?|modules?|cours|academie|services?|missions?|politiques?|confidentialite|protection des donnees|donnees personnelles|training|workshops?|courses?|academy|policies|privacy|data protection|personal data)\b/;
  if (medicalTopic.test(text) && !institutionalTopic.test(text)) return "medical";
  return "safe";
}

// Only visitor turns belong here. Client-supplied assistant turns are untrusted
// and must be excluded from external model input by the API handler.
export function classifyAssistantHistory(
  messages: ReadonlyArray<{ role: "user" | "assistant"; content: string }>,
): AssistantInputKind {
  for (const message of messages) {
    if (message.role !== "user") continue;
    const kind = classifyAssistantInput(message.content);
    if (kind !== "safe") return kind;
  }
  return "safe";
}

export function safetyAnswer(
  kind: Exclude<AssistantInputKind, "safe">,
  locale: Locale,
) {
  if (kind === "medical") {
    return locale === "fr"
      ? "Je ne peux pas interpréter des symptômes, proposer un diagnostic, une posologie ou un traitement. Consultez un professionnel de santé. En cas d’urgence, contactez immédiatement les services d’urgence de votre région. Ne partagez ici aucune donnée médicale personnelle."
      : "I cannot interpret symptoms or provide a diagnosis, dosage or treatment. Please consult a qualified health professional. In an emergency, contact your local emergency services immediately. Do not share personal medical data here.";
  }
  return locale === "fr"
    ? "Pour protéger votre vie privée, je ne peux pas traiter ce message car il semble contenir une donnée personnelle ou une information concernant un patient. Reformulez votre question sans nom, adresse, numéro, dossier ou donnée médicale."
    : "To protect your privacy, I cannot process this message because it appears to contain personal or patient information. Please rephrase without names, addresses, numbers, records or medical data.";
}

export function localAssistantAnswer(
  query: string,
  locale: Locale,
  entries: Array<AssistantKnowledgeEntry & { score?: number }>,
) {
  if (isAssistantGreeting(query)) {
    return locale === "fr"
      ? "Bonjour. Je peux vous renseigner sur l’Institut, ses services, ses formations, ses priorités, ses partenariats et les informations pratiques du site. Que souhaitez-vous savoir ?"
      : "Hello. I can help you find information about the Institute, its services, courses, priorities, partnerships and practical details. What would you like to know?";
  }
  const best = entries[0];
  if (isAssistantOutOfScope(query) || !best) {
    return locale === "fr"
      ? "Je réponds uniquement aux questions sur l’IAM et les contenus de son site. Je n’ai pas trouvé d’information correspondante. Vous pouvez reformuler votre question ou consulter la page Contact."
      : "I can only answer questions about IAM and its website content. I could not find matching information. You can rephrase your question or visit the Contact page.";
  }
  const requestedDetail = [
    { question: /\b(?:tarifs?|prix|coutent|coute|cout|prices?|fees?|cost|costs|how much)\b/, source: /\b(?:tarifs?|prix|cout|prices?|fees?|cost|cfa|fcfa|eur|usd)\b/ },
    { question: /\b(?:horaires?|opening hours)\b/, source: /\b(?:horaires?|ouvert|ouverte|opening hours|open from)\b/ },
    { question: /\b(?:prochaine?s? formations?|prochains? ateliers?|next courses?|next training|training dates)\b/, source: /\b(?:janvier|fevrier|mars|avril|mai|juin|juillet|aout|septembre|octobre|novembre|decembre|january|february|march|april|may|june|july|august|september|october|november|december)\b|\b\d{1,2}[ /-]\d{1,2}[ /-]\d{4}\b/ },
  ].find((detail) => detail.question.test(normalise(query)));
  if (requestedDetail && !requestedDetail.source.test(normalise(best.content))) {
    return locale === "fr"
      ? `Les contenus disponibles sur « ${best.title} » ne permettent pas de confirmer ce détail. Contactez l’IAM pour obtenir une information à jour.`
      : `The available content about “${best.title}” does not confirm that detail. Please contact IAM for up-to-date information.`;
  }
  return best.content;
}

export function publicAssistantSources(
  entries: Array<AssistantKnowledgeEntry & { score?: number }>,
  locale: Locale,
): AssistantSource[] {
  return entries.slice(0, 3).map((entry) => ({
    title: entry.title,
    path: localizePath(locale, entry.path),
  }));
}
