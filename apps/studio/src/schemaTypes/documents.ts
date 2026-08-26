import {
  defineArrayMember,
  defineField,
  defineType,
  type FieldDefinition,
  type SchemaTypeDefinition,
} from "sanity";

type DocumentOptions = {
  name: string;
  title: string;
  group: string;
  sourceRequired?: boolean;
  verificationRequired?: boolean;
  extra?: FieldDefinition[];
};

const editorialOptions = [
  { title: "Brouillon", value: "draft" },
  { title: "En révision", value: "inReview" },
  { title: "Approuvé", value: "approved" },
  { title: "Archivé", value: "archived" },
];

const verificationOptions = [
  { title: "Brouillon", value: "draft" },
  { title: "Vérifié", value: "verified" },
  { title: "Archivé", value: "archived" },
];

function commonFields(name: string): FieldDefinition[] {
  return [
    defineField({
      name: "language",
      title: "Langue",
      type: "string",
      options: {
        list: [
          { title: "Français", value: "fr" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "translationOf",
      title: "Traduction de",
      type: "reference",
      to: [{ type: name }],
      options: { disableNew: true },
    }),
    defineField({
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Résumé",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(320),
    }),
    defineField({ name: "body", title: "Contenu", type: "portableText" }),
    defineField({
      name: "editorialStatus",
      title: "Statut éditorial",
      type: "string",
      initialValue: "draft",
      options: { list: editorialOptions, layout: "radio" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verificationStatus",
      title: "Statut de vérification",
      type: "string",
      initialValue: "draft",
      options: { list: verificationOptions, layout: "radio" },
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      of: [defineArrayMember({ type: "source" })],
    }),
    defineField({
      name: "verifiedAt",
      title: "Dernière vérification",
      type: "datetime",
    }),
    defineField({
      name: "seoDescription",
      title: "Description SEO",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ];
}

function documentType(options: DocumentOptions): SchemaTypeDefinition {
  return defineType({
    name: options.name,
    title: options.title,
    type: "document",
    groups: [
      { name: "content", title: "Contenu", default: true },
      { name: "proof", title: "Preuve & validation" },
    ],
    fields: [
      ...commonFields(options.name).map((field) => ({
        ...field,
        group: [
          "editorialStatus",
          "verificationStatus",
          "sources",
          "verifiedAt",
        ].includes(field.name)
          ? "proof"
          : "content",
      })),
      ...(options.extra ?? []),
    ],
    validation: (Rule) =>
      Rule.custom((value) => {
        const document = value as Record<string, unknown> | undefined;
        if (document?.editorialStatus !== "approved") return true;
        if (!document.title || !document.slug || !document.language)
          return "Publication bloquée : titre, langue et slug sont obligatoires.";
        if (
          options.verificationRequired &&
          document.verificationStatus !== "verified"
        )
          return "Publication bloquée : le contenu doit être vérifié.";
        if (
          options.sourceRequired &&
          (!Array.isArray(document.sources) || document.sources.length === 0)
        )
          return "Publication bloquée : au moins une source normalisée est obligatoire.";
        if (
          (options.verificationRequired || options.sourceRequired) &&
          !document.verifiedAt
        )
          return "Publication bloquée : la date de vérification est obligatoire.";
        return true;
      }),
    preview: {
      select: {
        title: "title",
        language: "language",
        status: "editorialStatus",
      },
      prepare: ({ title, language, status }) => ({
        title,
        subtitle: `${String(language ?? "-").toUpperCase()} · ${status ?? "draft"}`,
      }),
    },
  });
}

const relation = (name: string, title: string, to: string[]): FieldDefinition =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "reference",
        to: to.map((type) => ({ type })),
      }),
    ],
  });

const dateRange = [
  defineField({ name: "startsAt", title: "Début", type: "datetime" }),
  defineField({ name: "endsAt", title: "Fin", type: "datetime" }),
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({
      name: "legalName",
      title: "Dénomination légale",
      type: "string",
    }),
    defineField({ name: "contactEmail", title: "Email public", type: "email" }),
    defineField({
      name: "montrealEnabled",
      title: "Activer la page Montréal",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "institutionalBar",
      title: "Barre institutionnelle",
      type: "string",
    }),
    defineField({
      name: "logo",
      title: "Logo officiel",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Texte alternatif",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Paramètres du site" }) },
});

export const navigation = documentType({
  name: "navigation",
  title: "Navigation",
  group: "configuration",
  extra: [
    defineField({
      name: "items",
      title: "Liens",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Libellé",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Lien",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
export const page = documentType({
  name: "page",
  title: "Page",
  group: "configuration",
});
export const redirect = defineType({
  name: "redirect",
  title: "Redirection",
  type: "document",
  fields: [
    defineField({
      name: "source",
      title: "Ancienne route",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^\//),
    }),
    defineField({
      name: "destination",
      title: "Nouvelle route",
      type: "string",
      validation: (Rule) => Rule.required().regex(/^\//),
    }),
    defineField({
      name: "permanent",
      title: "Permanente",
      type: "boolean",
      initialValue: true,
    }),
  ],
});

export const programmeDocuments = [
  documentType({
    name: "pillar",
    title: "Pilier",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
  }),
  documentType({
    name: "program",
    title: "Programme",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      relation("countries", "Pays vérifiés", ["country"]),
      relation("partners", "Partenaires", ["partner"]),
    ],
  }),
  documentType({
    name: "project",
    title: "Projet",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      relation("programs", "Programmes", ["program"]),
      relation("countries", "Pays", ["country"]),
      relation("metrics", "Indicateurs", ["impactMetric"]),
    ],
  }),
  documentType({
    name: "country",
    title: "Pays",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "isoCode",
        title: "Code ISO 3166-1 alpha-2",
        type: "string",
        validation: (Rule) => Rule.required().regex(/^[A-Z]{2}$/),
      }),
    ],
  }),
  documentType({
    name: "location",
    title: "Lieu",
    group: "programmes",
    verificationRequired: true,
    extra: [
      defineField({
        name: "coordinates",
        title: "Coordonnées",
        type: "geopoint",
      }),
      relation("country", "Pays", ["country"]),
    ],
  }),
  documentType({
    name: "impactMetric",
    title: "Indicateur d’impact",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "value",
        title: "Valeur",
        type: "number",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "unit",
        title: "Unité",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "period",
        title: "Période",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
    ],
  }),
  documentType({
    name: "partner",
    title: "Partenaire",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({ name: "logo", title: "Logo autorisé", type: "image" }),
      defineField({
        name: "agreementEvidence",
        title: "Justificatif de partenariat",
        type: "file",
      }),
    ],
  }),
  documentType({
    name: "callForProjects",
    title: "Appel à projets",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: dateRange,
  }),
  documentType({
    name: "donorCampaign",
    title: "Campagne philanthropique",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "paymentsEnabled",
        title: "Paiements activés",
        type: "boolean",
        initialValue: false,
      }),
    ],
  }),
  documentType({
    name: "youthAmbassador",
    title: "Ambassadeur jeunesse",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "consentValidUntil",
        title: "Consentement valide jusqu’au",
        type: "date",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "portrait",
        title: "Portrait licencié",
        type: "image",
      }),
    ],
  }),
  documentType({
    name: "testimonial",
    title: "Témoignage",
    group: "programmes",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "consentValidUntil",
        title: "Consentement valide jusqu’au",
        type: "date",
        validation: (Rule) => Rule.required(),
      }),
    ],
  }),
];

const scientificNames = [
  ["article", "Article"],
  ["publication", "Publication"],
  ["report", "Rapport"],
  ["policyBrief", "Note de politique publique"],
  ["dataset", "Jeu de données"],
  ["author", "Auteur"],
  ["researcher", "Chercheur"],
  ["medicinalPlant", "Plante médicinale"],
  ["laboratory", "Laboratoire"],
  ["newsletterIssue", "Numéro de newsletter"],
  ["mediaAsset", "Média"],
] as const;
export const scientificDocuments = scientificNames.map(([name, title]) =>
  documentType({
    name,
    title,
    group: "science",
    sourceRequired: true,
    verificationRequired: true,
    extra:
      name === "mediaAsset"
        ? [
            defineField({
              name: "asset",
              title: "Fichier",
              type: "file",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "credit",
              title: "Crédit",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "rights",
              title: "Droits",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ]
        : [],
  }),
);

const peopleNames = [
  ["teamMember", "Membre de l’équipe"],
  ["governanceMember", "Membre de gouvernance"],
  ["scientificCouncilMember", "Membre du conseil scientifique"],
  ["event", "Événement"],
  ["course", "Formation"],
  ["trainer", "Formateur"],
] as const;
export const peopleDocuments = peopleNames.map(([name, title]) =>
  documentType({
    name,
    title,
    group: "people",
    sourceRequired: true,
    verificationRequired: true,
    extra: name === "event" || name === "course" ? dateRange : [],
  }),
);

const alertNames = [
  ["alert", "Alerte"],
  ["shortageAlert", "Alerte de rupture"],
  ["pharmacovigilanceAlert", "Alerte de pharmacovigilance"],
  ["falsifiedMedicineAlert", "Alerte médicament falsifié"],
] as const;
export const alertDocuments = alertNames.map(([name, title]) =>
  documentType({
    name,
    title,
    group: "alerts",
    sourceRequired: true,
    verificationRequired: true,
    extra: [
      defineField({
        name: "authority",
        title: "Autorité compétente",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "emergencyGuidance",
        title: "Orientation d’urgence",
        type: "text",
      }),
    ],
  }),
);
