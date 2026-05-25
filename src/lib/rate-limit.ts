import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// In-memory fallback for local dev when Upstash credentials are not set
let redis: Redis | null = null;

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
} catch {
  // no-op in local dev
}

// 5 requests per 60 seconds per IP for public form endpoints
export const formRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(5, "60 s"), prefix: "rl:form" })
  : null;

// 10 requests per 60 seconds per IP for AI demo endpoint
export const aiDemoRatelimit = redis
  ? new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(10, "60 s"), prefix: "rl:ai" })
  : null;

export async function checkRateLimit(
  limiterKey: "form" | "ai-demo",
  identifier: string
): Promise<boolean> {
  const limiter = limiterKey === "form" ? formRatelimit : aiDemoRatelimit;
  if (!limiter) return false; // not rate limited in dev
  const result = await limiter.limit(identifier);
  return !result.success; // returns true if SHOULD be blocked
}
