import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => ({}))) as {
    slug?: string;
    language?: string;
    type?: string;
  };
  revalidateTag("sanity", "max");
  if (body.slug)
    revalidatePath(
      body.language === "en" ? `/en/${body.slug}` : `/${body.slug}`,
    );
  revalidatePath("/", "layout");
  return Response.json({ revalidated: true, now: Date.now() });
}
