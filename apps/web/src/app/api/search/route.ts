import { localeSchema } from "@iam/contracts";
import { searchIndex } from "@/lib/content";
import { SanityContentRepository } from "@/sanity/lib/repository";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim().slice(0, 120) ?? "";
  const localeResult = localeSchema.safeParse(
    url.searchParams.get("locale") ?? "fr",
  );
  if (!localeResult.success || query.length < 2)
    return Response.json({ results: [] });

  const needle = query.toLocaleLowerCase(localeResult.data);
  const localResults = searchIndex(localeResult.data)
    .filter((item) =>
      `${item.title} ${item.summary}`
        .toLocaleLowerCase(localeResult.data)
        .includes(needle),
    )
    .slice(0, 12);

  const remoteResults = (
    await new SanityContentRepository().search(query, localeResult.data)
  ).map((item) => ({
    title: item.title,
    summary: "",
    path: `${localeResult.data === "en" ? "/en" : ""}/${item.slug}`,
    type:
      item.verificationStatus === "verified"
        ? localeResult.data === "en"
          ? "Verified content"
          : "Contenu vérifié"
        : "IAM",
  }));
  const unique = new Map(
    [...remoteResults, ...localResults].map((item) => [item.path, item]),
  );
  return Response.json({ results: [...unique.values()].slice(0, 20) });
}
