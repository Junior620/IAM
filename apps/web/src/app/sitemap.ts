import type { MetadataRoute } from "next";
import { legalPagePaths } from "@/components/legal-page";
import { pageEntries, pillars, programmes } from "@/lib/content";
import { getSanityClient } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const paths = new Set<string>([
    "",
    "/alertes",
    "/recherche",
    "/newsletter",
    "/institut/a-propos",
    "/institut/notre-approche",
    "/actualites-medias/galerie",
    ...legalPagePaths,
    ...pageEntries.map((item) => item.path),
    ...pillars.map((item) => `/priorites/${item.slug}`),
    ...programmes.map((item) => item.path),
  ]);
  const client = getSanityClient();
  if (client) {
    try {
      const settings = await client.fetch(settingsQuery);
      if (settings?.montrealEnabled) paths.add("/montreal");
    } catch {
      // A CMS outage must not block generation of the verified static sitemap.
    }
  }
  const now = new Date();
  return [...paths].flatMap((path) => {
    const fr = `${base}${path || "/"}`;
    const en = `${base}/en${path}`;
    const alternates = { languages: { fr, en, "x-default": fr } };
    return [
      {
        url: fr,
        lastModified: now,
        changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
        priority: path ? 0.7 : 1,
        alternates,
      },
      {
        url: en,
        lastModified: now,
        changeFrequency: path ? ("monthly" as const) : ("weekly" as const),
        priority: path ? 0.7 : 1,
        alternates,
      },
    ];
  });
}
