import type { ContentRecord, ContentRepository, Locale } from "@iam/contracts";
import { getSanityClient } from "./client";
import { approvedBySlugQuery, approvedSearchQuery } from "./queries";
import type {
  ApprovedBySlugQueryResult,
  ApprovedSearchQueryResult,
} from "../types.generated";

function toContentRecord(item: {
  id: string;
  locale: "fr" | "en" | null;
  slug: string | null;
  title: string | null;
  kind?: string | null;
  summary?: string | null;
  body?: unknown[] | null;
  editorialStatus: "draft" | "inReview" | "approved" | "archived" | null;
  verificationStatus: "draft" | "verified" | "archived" | null;
  verifiedAt?: string | null;
  sourceTitle?: string | null;
  sourceUrl: string | null;
}): ContentRecord | null {
  if (!item.locale || !item.slug || !item.title || !item.editorialStatus)
    return null;
  return {
    id: item.id,
    locale: item.locale,
    slug: item.slug,
    title: item.title,
    editorialStatus: item.editorialStatus,
    ...(item.kind ? { kind: item.kind } : {}),
    ...(item.summary ? { summary: item.summary } : {}),
    ...(item.body ? { body: item.body } : {}),
    ...(item.verificationStatus
      ? { verificationStatus: item.verificationStatus }
      : {}),
    ...(item.verifiedAt ? { verifiedAt: item.verifiedAt } : {}),
    ...(item.sourceTitle ? { sourceTitle: item.sourceTitle } : {}),
    ...(item.sourceUrl ? { sourceUrl: item.sourceUrl } : {}),
  };
}

export class SanityContentRepository implements ContentRepository {
  async search(query: string, locale: Locale): Promise<ContentRecord[]> {
    const client = getSanityClient();
    if (!client) return [];
    const results = await client.fetch<ApprovedSearchQueryResult>(
      approvedSearchQuery,
      {
        locale,
        search: `*${query.replace(/[\[\]*]/g, "")}*`,
      },
    );
    return results.flatMap((item) => {
      const record = toContentRecord(item);
      return record ? [record] : [];
    });
  }

  async getBySlug(slug: string, locale: Locale): Promise<ContentRecord | null> {
    const client = getSanityClient();
    if (!client) return null;
    const result = await client.fetch<ApprovedBySlugQueryResult>(
      approvedBySlugQuery,
      { locale, slug },
    );
    return result ? toContentRecord(result) : null;
  }
}
