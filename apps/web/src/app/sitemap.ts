import type { MetadataRoute } from "next";
import { isIndexingEnabled, isPagePublished, SITE_URL } from "@/lib/seo";
import { getSanityClient } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

const verifiedStaticPaths = [
  "",
  "/institut/a-propos",
  "/institut/mission-vision",
  "/institut/nos-services",
  "/priorites",
  "/academie",
  "/actualites-medias/galerie",
  "/partenariats",
  "/partenariats/anna-snijder",
  "/contact",
] as const;

const featureFlaggedPaths = [
  "/institut",
  "/participer",
  "/actualites-medias",
  "/newsletter",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexingEnabled()) return [];

  const paths = new Set<string>(verifiedStaticPaths);
  for (const path of featureFlaggedPaths) {
    if (isPagePublished(path)) paths.add(path);
  }

  const client = getSanityClient();
  if (client) {
    try {
      const settings = await client.fetch(settingsQuery);
      if (settings?.montrealEnabled) paths.add("/montreal");
    } catch {
      // A CMS outage must not block generation of the verified static sitemap.
    }
  }
  return [...paths].flatMap((path) => {
    const fr = `${SITE_URL}${path || "/"}`;
    const en = `${SITE_URL}/en${path}`;
    const alternates = { languages: { fr, en, "x-default": fr } };
    return [
      {
        url: fr,
        priority: path ? 0.7 : 1,
        alternates,
      },
      {
        url: en,
        priority: path ? 0.7 : 1,
        alternates,
      },
    ];
  });
}
