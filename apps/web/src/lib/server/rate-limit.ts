import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import type { RateLimiter } from "@iam/contracts";
import { getRedis } from "./redis";

let limiter: RateLimiter | null | undefined;

export interface AssistantRateLimiter {
  limit(key: string): Promise<{
    success: boolean;
    reset: number;
    reason?: string;
  }>;
}

let assistantLimiter: AssistantRateLimiter | null | undefined;

export function getRateLimiter(): RateLimiter | null {
  if (limiter !== undefined) return limiter;
  const redis = getRedis();
  if (!redis) return (limiter = null);
  limiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "iam:forms",
    analytics: false,
  });
  return limiter;
}

export function getAssistantRateLimiter(): AssistantRateLimiter | null {
  if (assistantLimiter !== undefined) return assistantLimiter;
  const redis = getRedis();
  if (!redis) return (assistantLimiter = null);
  assistantLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(20, "10 m"),
    prefix: "iam:assistant",
    timeout: 2_000,
    analytics: false,
  });
  return assistantLimiter;
}

export function requestFingerprint(request: Request) {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const address =
    forwarded || request.headers.get("cf-connecting-ip") || "anonymous";
  const secret = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!secret) return "anonymous";
  return createHmac("sha256", secret)
    .update("iam:forms:v1:")
    .update(address)
    .digest("hex");
}
