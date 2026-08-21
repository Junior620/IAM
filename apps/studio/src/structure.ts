import type { StructureResolver } from "sanity/structure";

const groups = [
  ["Configuration", ["siteSettings", "navigation", "page", "redirect"]],
  [
    "Programmes & impact",
    [
      "pillar",
      "program",
      "project",
      "country",
      "location",
      "impactMetric",
      "partner",
      "callForProjects",
      "donorCampaign",
      "youthAmbassador",
      "testimonial",
    ],
  ],
  [
    "Science & édition",
    [
      "article",
      "publication",
      "report",
      "policyBrief",
      "dataset",
      "author",
      "researcher",
      "medicinalPlant",
      "laboratory",
      "newsletterIssue",
      "mediaAsset",
    ],
  ],
  [
    "Personnes & activités",
    [
      "teamMember",
      "governanceMember",
      "scientificCouncilMember",
      "event",
      "course",
      "trainer",
    ],
  ],
  [
    "Alertes",
    [
      "alert",
      "shortageAlert",
      "pharmacovigilanceAlert",
      "falsifiedMedicineAlert",
    ],
  ],
] as const;

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenus IAM")
    .items(
      groups.map(([title, types]) =>
        S.listItem()
          .title(title)
          .child(
            S.list()
              .title(title)
              .items(types.map((type) => S.documentTypeListItem(type))),
          ),
      ),
    );
