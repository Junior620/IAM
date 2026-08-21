import type { MetadataRoute } from "next";
import { getSanityClient } from "@/sanity/lib/client";
import { settingsQuery } from "@/sanity/lib/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ).replace(/\/$/, "");
  const disallow = ["/api/", "/studio/"];
  const client = getSanityClient();
  let montrealEnabled = false;
  if (client) {
    try {
      montrealEnabled = Boolean(
        (await client.fetch(settingsQuery))?.montrealEnabled,
      );
    } catch {
      montrealEnabled = false;
    }
  }
  if (!montrealEnabled) disallow.push("/montreal", "/en/montreal");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
