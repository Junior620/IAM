// @vitest-environment node

import { createRequire } from "node:module";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SanityContentRepository } from "@/sanity/lib/repository";

const { fetchContent } = vi.hoisted(() => ({ fetchContent: vi.fn() }));

vi.mock("@/sanity/lib/client", () => ({
  getSanityClient: () => ({ fetch: fetchContent }),
}));

// Execute the production query with the GROQ engine bundled with Sanity.
const require = createRequire(import.meta.url);
const nextSanityRequire = createRequire(require.resolve("next-sanity"));
const sanityRequire = createRequire(nextSanityRequire.resolve("sanity"));
const groq = sanityRequire("groq-js") as {
  parse(query: string): unknown;
  evaluate(
    query: unknown,
    options: {
      dataset: Array<Record<string, unknown>>;
      params: Record<string, string>;
    },
  ): Promise<{ get(): Promise<unknown> }>;
};

const documents = [
  {
    _id: "approved-course",
    _type: "course",
    language: "fr",
    slug: { current: "atelier-cosmetique" },
    title: "Atelier cosmétique IAM",
    summary: "Un atelier consacré à la qualité des produits cosmétiques.",
    excerpt: "Cet extrait est moins détaillé que le résumé.",
    editorialStatus: "approved",
    verificationStatus: "verified",
  },
  {
    _id: "approved-article",
    _type: "article",
    language: "fr",
    slug: { current: "cooperation-cosmetique" },
    title: "Coopération cosmétique",
    excerpt: "Une rencontre des partenaires de l’IAM sur la cosmétique.",
    editorialStatus: "approved",
  },
  {
    _id: "draft-course",
    _type: "course",
    language: "fr",
    slug: { current: "atelier-cosmetique-brouillon" },
    title: "Atelier cosmétique non publié",
    summary: "Ce brouillon ne doit pas alimenter l’assistant.",
    editorialStatus: "draft",
  },
  {
    _id: "unverified-course",
    _type: "course",
    language: "fr",
    slug: { current: "atelier-cosmetique-non-verifie" },
    title: "Atelier cosmétique non vérifié",
    summary: "Ce contenu non vérifié ne doit pas alimenter l’assistant.",
    editorialStatus: "approved",
    verificationStatus: "draft",
  },
];

describe("assistant Sanity knowledge", () => {
  beforeEach(() => {
    fetchContent.mockReset();
    fetchContent.mockImplementation(
      async (query: string, params: Record<string, string>) => {
        const result = await groq.evaluate(groq.parse(query), {
          dataset: documents,
          params,
        });
        return result.get();
      },
    );
  });

  it("returns approved summaries, excerpt fallbacks and document types", async () => {
    const results = await new SanityContentRepository().search(
      "cosmétique",
      "fr",
    );

    expect(results).toHaveLength(2);
    expect(results).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "approved-course",
          slug: "atelier-cosmetique",
          kind: "course",
          summary:
            "Un atelier consacré à la qualité des produits cosmétiques.",
        }),
        expect.objectContaining({
          id: "approved-article",
          kind: "article",
          summary:
            "Une rencontre des partenaires de l’IAM sur la cosmétique.",
        }),
      ]),
    );
  });

  it("keeps source slugs resolvable by the site's CMS page lookup", async () => {
    const repository = new SanityContentRepository();
    const results = await repository.search("cosmétique", "fr");

    for (const result of results) {
      expect(await repository.getBySlug(result.slug, "fr")).toEqual(
        expect.objectContaining({ id: result.id, slug: result.slug }),
      );
    }
  });

  it("passes cancellation to the CMS client", async () => {
    const controller = new AbortController();
    await new SanityContentRepository().search("cosmétique", "fr", {
      signal: controller.signal,
    });

    expect(fetchContent).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ locale: "fr" }),
      { signal: controller.signal },
    );
  });
});
