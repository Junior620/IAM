import { WelcomeEmail } from "@iam/emails";
import { getSiteUrl } from "@/lib/server/configuration";
import { getResend } from "@/lib/server/mail";
import {
  preferenceTokenTtlSeconds,
  resendTopics,
  type PendingSubscription,
} from "@/lib/server/newsletter";
import { getRedis } from "@/lib/server/redis";

function confirmationUrl(
  locale: "fr" | "en",
  state: "success" | "invalid" | "unavailable",
) {
  const path =
    locale === "en" ? "/en/newsletter/confirmed" : "/newsletter/confirmed";
  return `${getSiteUrl()}${path}?state=${state}`;
}

function privateRedirect(location: string) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Cache-Control": "private, no-store, max-age=0",
      "Referrer-Policy": "no-referrer",
    },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token || token.length > 100)
    return privateRedirect(confirmationUrl("fr", "invalid"));

  const redis = getRedis();
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!redis || !resend || !from)
    return privateRedirect(confirmationUrl("fr", "unavailable"));

  const key = `iam:newsletter:pending:${token}`;
  const pending = await redis.get<PendingSubscription>(key);
  if (!pending) return privateRedirect(confirmationUrl("fr", "invalid"));

  const topics = resendTopics(pending.interests);
  const created = await resend.contacts.create({
    email: pending.email,
    firstName: pending.firstName,
    ...(pending.lastName ? { lastName: pending.lastName } : {}),
    unsubscribed: false,
    topics,
    properties: {
      country: pending.country,
      profile: pending.profile,
      locale: pending.locale,
    },
  });
  if (created.error) {
    const updated = await resend.contacts.update({
      email: pending.email,
      firstName: pending.firstName,
      ...(pending.lastName ? { lastName: pending.lastName } : {}),
      unsubscribed: false,
      properties: {
        country: pending.country,
        profile: pending.profile,
        locale: pending.locale,
      },
    });
    if (updated.error)
      return privateRedirect(confirmationUrl(pending.locale, "unavailable"));
    if (topics.length)
      await resend.contacts.topics.update({ email: pending.email, topics });
  }

  await redis.del(key);
  const preferenceToken = crypto.randomUUID();
  await redis.set(
    `iam:newsletter:manage:${preferenceToken}`,
    {
      email: pending.email,
      locale: pending.locale,
      interests: pending.interests,
    },
    { ex: preferenceTokenTtlSeconds },
  );
  const preferencesPath =
    pending.locale === "en"
      ? "/en/newsletter/preferences"
      : "/newsletter/preferences";
  await resend.emails.send({
    from,
    to: pending.email,
    subject:
      pending.locale === "en"
        ? "Welcome to IAM Pharmaceutical Intelligence"
        : "Bienvenue dans IAM Pharmaceutical Intelligence",
    react: WelcomeEmail({
      firstName: pending.firstName,
      locale: pending.locale,
      actionUrl: `${getSiteUrl()}${preferencesPath}?token=${encodeURIComponent(preferenceToken)}`,
    }),
  });
  return privateRedirect(confirmationUrl(pending.locale, "success"));
}
