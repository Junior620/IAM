import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { safeReturnPath } from "@/lib/server/newsletter";

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (
    !process.env.SANITY_REVALIDATE_SECRET ||
    url.searchParams.get("secret") !== process.env.SANITY_REVALIDATE_SECRET
  ) {
    return new Response("Invalid token", { status: 401 });
  }
  const draft = await draftMode();
  draft.enable();
  redirect(safeReturnPath(url.searchParams.get("redirect")));
}
