import { describe, expect, it } from "vitest";
import { schemaTypes } from ".";

const requiredDocumentTypes = [
  "siteSettings",
  "navigation",
  "page",
  "redirect",
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
  "teamMember",
  "governanceMember",
  "scientificCouncilMember",
  "event",
  "course",
  "trainer",
  "alert",
  "shortageAlert",
  "pharmacovigilanceAlert",
  "falsifiedMedicineAlert",
] as const;

describe("Sanity schema", () => {
  it("contains every required document type", () => {
    const names = new Set(schemaTypes.map((type) => type.name));
    for (const name of requiredDocumentTypes)
      expect(names.has(name), name).toBe(true);
  });

  it("keeps source and rich text as reusable object types", () => {
    const names = new Set(schemaTypes.map((type) => type.name));
    expect(names.has("source")).toBe(true);
    expect(names.has("portableText")).toBe(true);
  });
});
