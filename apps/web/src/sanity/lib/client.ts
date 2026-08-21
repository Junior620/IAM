import { createClient, type SanityClient } from "next-sanity";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const sanityApiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-09";
export const sanityConfigured = Boolean(sanityProjectId && sanityDataset);

let publishedClient: SanityClient | null = null;
let previewClient: SanityClient | null = null;

export function getSanityClient({ preview = false } = {}) {
  if (!sanityConfigured || !sanityProjectId) return null;
  const cachedClient = preview ? previewClient : publishedClient;
  if (cachedClient) return cachedClient;

  const nextClient = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: !preview,
    perspective: preview ? "drafts" : "published",
    stega: preview,
    ...(preview && process.env.SANITY_API_READ_TOKEN
      ? { token: process.env.SANITY_API_READ_TOKEN }
      : {}),
  });
  if (preview) previewClient = nextClient;
  else publishedClient = nextClient;
  return nextClient;
}
