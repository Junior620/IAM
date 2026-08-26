import { describe, expect, it } from "vitest";
import {
  getLocaleFromLang,
  getPageEntry,
  localizePath,
  searchIndex,
} from "@/lib/content";

describe("localised content contracts", () => {
  it("keeps French unprefixed and English under /en", () => {
    expect(localizePath("fr", "/institut")).toBe("/institut");
    expect(localizePath("en", "/institut")).toBe("/en/institut");
    expect(localizePath("fr", "/")).toBe("/");
    expect(localizePath("en", "/")).toBe("/en");
  });

  it("rejects unknown locale values", () => {
    expect(getLocaleFromLang("de")).toBeNull();
  });

  it("indexes only declared public framework content", () => {
    expect(searchIndex("fr").length).toBeGreaterThan(10);
    expect(getPageEntry("/programmes")).toBeNull();
    expect(getPageEntry("/institut/a-propos")?.fr.eyebrow).toBe(
      "À propos de nous",
    );
    expect(getPageEntry("/institut/mission-vision")?.fr.eyebrow).toBe(
      "Mission & vision",
    );
    expect(getPageEntry("/partenariats/anna-snijder")?.en.eyebrow).toBe(
      "Artistic collaboration",
    );
    expect(
      searchIndex("fr").some(
        (item) => item.path === "/partenariats/anna-snijder",
      ),
    ).toBe(true);
  });
});
