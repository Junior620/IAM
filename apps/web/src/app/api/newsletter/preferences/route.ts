import { newsletterPreferenceSchema } from "@iam/contracts";
import { getResend } from "@/lib/server/mail";
import { resendAllTopicPreferences } from "@/lib/server/newsletter";
import { getRedis } from "@/lib/server/redis";

type ManageRecord = { email: string; locale: "fr" | "en"; interests: string[] };

export async function POST(request: Request) {
  const parsed = newsletterPreferenceSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!parsed.success)
    return Response.json({ error: "Invalid preferences" }, { status: 400 });
  const redis = getRedis();
  const resend = getResend();
  if (!redis || !resend)
    return Response.json({ error: "Service not configured" }, { status: 503 });

  const key = `iam:newsletter:manage:${parsed.data.token}`;
  const record = await redis.get<ManageRecord>(key);
  if (!record)
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 401 },
    );

  if (parsed.data.unsubscribe) {
    const result = await resend.contacts.update({
      email: record.email,
      unsubscribed: true,
    });
    if (result.error)
      return Response.json({ error: "Provider error" }, { status: 502 });
    await redis.del(key);
    return Response.json({ ok: true, unsubscribed: true });
  }

  const topics = resendAllTopicPreferences(parsed.data.interests);
  const result = await resend.contacts.topics.update({
    email: record.email,
    topics,
  });
  if (result.error)
    return Response.json({ error: "Provider error" }, { status: 502 });
  await redis.set(
    key,
    { ...record, interests: parsed.data.interests },
    { ex: 60 * 60 * 24 * 180 },
  );
  return Response.json({ ok: true });
}
