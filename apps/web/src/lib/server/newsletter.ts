import type { NewsletterSubscription } from "@iam/contracts";

export const pendingSubscriptionTtlSeconds = 60 * 60 * 24;
export const preferenceTokenTtlSeconds = 60 * 60 * 24 * 180;

export type PendingSubscription = NewsletterSubscription & {
  createdAt: string;
};

const topicEnvironmentKeys: Record<
  NewsletterSubscription["interests"][number],
  string
> = {
  alerts: "RESEND_TOPIC_ALERTS",
  research: "RESEND_TOPIC_RESEARCH",
  industry: "RESEND_TOPIC_INDUSTRY",
  training: "RESEND_TOPIC_TRAINING",
  philanthropy: "RESEND_TOPIC_PHILANTHROPY",
  institutional: "RESEND_TOPIC_INSTITUTIONAL",
};

export function resendTopics(interests: NewsletterSubscription["interests"]) {
  return interests.flatMap((interest) => {
    const id = process.env[topicEnvironmentKeys[interest]];
    return id ? [{ id, subscription: "opt_in" as const }] : [];
  });
}

export function resendAllTopicPreferences(
  interests: NewsletterSubscription["interests"],
) {
  return (
    Object.keys(topicEnvironmentKeys) as NewsletterSubscription["interests"]
  ).flatMap((interest) => {
    const id = process.env[topicEnvironmentKeys[interest]];
    return id
      ? [
          {
            id,
            subscription: interests.includes(interest)
              ? ("opt_in" as const)
              : ("opt_out" as const),
          },
        ]
      : [];
  });
}

export function safeReturnPath(path: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}
