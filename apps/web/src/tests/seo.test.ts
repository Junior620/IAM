import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  absoluteUrl,
  breadcrumbStructuredData,
  isIndexingEnabled,
  isPagePublished,
  organizationStructuredData,
  socialImageUrl,
  SITE_URL,
} from "@/lib/seo";

describe("SEO configuration", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("INSTITUTE_PAGE_ENABLED", "false");
    vi.stubEnv("PARTICIPATE_PAGE_ENABLED", "false");
    vi.stubEnv("NEWS_MEDIA_PAGE_ENABLED", "false");
    vi.stubEnv("NEWSLETTER_PAGE_ENABLED", "false");
  });

  afterEach(() => vi.unstubAllEnvs());

  it("uses one stable canonical domain", () => {
    expect(SITE_URL).toBe("https://iam-afrique.org");
    expect(absoluteUrl("/academie")).toBe("https://iam-afrique.org/academie");
    expect(organizationStructuredData()).toMatchObject({
      "@type": "Organization",
      url: SITE_URL,
      name: "Institut Africain du Médicament",
    });
    expect(
      socialImageUrl({
        VERCEL_PROJECT_PRODUCTION_URL: "iam-web-blond.vercel.app",
      }),
    ).toBe("https://iam-web-blond.vercel.app/og-share.png");
    expect(socialImageUrl({})).toBe(
      "https://iam-web-blond.vercel.app/og-share.png",
    );
  });

  it("blocks indexing outside production and supports an explicit kill switch", () => {
    expect(isIndexingEnabled({ NODE_ENV: "development" })).toBe(false);
    expect(
      isIndexingEnabled({ NODE_ENV: "production", VERCEL_ENV: "preview" }),
    ).toBe(false);
    expect(
      isIndexingEnabled({
        NODE_ENV: "production",
        VERCEL_ENV: "production",
        SEO_ALLOW_INDEXING: "false",
      }),
    ).toBe(false);
    expect(
      isIndexingEnabled({ NODE_ENV: "production", VERCEL_ENV: "production" }),
    ).toBe(true);
  });

  it("keeps gated pages private until their publication flag is enabled", () => {
    expect(isPagePublished("/newsletter", {})).toBe(false);
    expect(
      isPagePublished("/newsletter", { NEWSLETTER_PAGE_ENABLED: "true" }),
    ).toBe(true);
    expect(isPagePublished("/academie", {})).toBe(true);
  });

  it("lists only canonical, public and indexable pages", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls.length).toBeGreaterThan(0);
    expect(urls.every((url) => url.startsWith(SITE_URL))).toBe(true);
    expect(urls).toContain(`${SITE_URL}/`);
    expect(urls).toContain(`${SITE_URL}/en/academie`);
    expect(urls).not.toContain(`${SITE_URL}/recherche`);
    expect(urls).not.toContain(`${SITE_URL}/newsletter`);
    expect(urls).not.toContain(`${SITE_URL}/mentions-legales`);
    expect(urls.some((url) => url.includes("/programmes/"))).toBe(false);
    expect(urls.some((url) => url.includes("/priorites/acces-"))).toBe(false);
  });

  it("publishes strict preview robots and production discovery directives", () => {
    vi.stubEnv("VERCEL_ENV", "preview");
    expect(robots()).toEqual({
      rules: [{ userAgent: "*", disallow: "/" }],
    });

    vi.stubEnv("VERCEL_ENV", "production");
    expect(robots()).toMatchObject({
      host: SITE_URL,
      sitemap: `${SITE_URL}/sitemap.xml`,
    });
  });

  it("builds absolute breadcrumb entities", () => {
    expect(
      breadcrumbStructuredData({
        locale: "en",
        path: "/academie",
        title: "IAM Academy",
      }),
    ).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, item: `${SITE_URL}/en` },
        { position: 2, item: `${SITE_URL}/en/academie` },
      ],
    });
  });
});
