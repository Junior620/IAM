import { createHmac } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import type { RateLimiter } from "@iam/contracts";
import { getRedis } from "./redis";

let limiter: RateLimiter | null | undefined;

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
