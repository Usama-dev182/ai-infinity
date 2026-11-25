import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting with a production-safe fallback.
 *
 * - Upstash Redis (shared across instances) is used when configured.
 * - Otherwise — or if Redis errors — an in-memory sliding-window limiter is used.
 *   It is per-instance (weaker on serverless), but requests are never left unlimited.
 */

export interface RateLimitPolicy {
  /** Max requests per window. */
  limit: number;
  /** Window length in seconds. */
  windowSeconds: number;
}

export const RATE_LIMITS = {
  form: { limit: 5, windowSeconds: 60 },
  "ai-demo": { limit: 10, windowSeconds: 60 },
  "ai-demo-daily": { limit: 60, windowSeconds: 24 * 60 * 60 },
  // Admin sign-in attempts, keyed separately by IP and by email.
  login: { limit: 10, windowSeconds: 15 * 60 },
} as const satisfies Record<string, RateLimitPolicy>;

export type RateLimitKey = keyof typeof RATE_LIMITS;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  /** Epoch ms when the oldest counted request leaves the window. */
  reset: number;
}

// ─── In-memory sliding window ─────────────────────────────────────────────────

const MAX_TRACKED_KEYS = 10_000;

export class MemoryRateLimiter {
  private hits = new Map<string, number[]>();

  constructor(private readonly policy: RateLimitPolicy, private readonly now: () => number = Date.now) {}

  limit(identifier: string): RateLimitResult {
    const now = this.now();
    const windowMs = this.policy.windowSeconds * 1000;
    const recent = (this.hits.get(identifier) ?? []).filter((t) => now - t < windowMs);

    if (recent.length >= this.policy.limit) {
      this.hits.set(identifier, recent);
      return { success: false, remaining: 0, reset: recent[0] + windowMs };
    }

    recent.push(now);
    // Re-insert so Map order approximates least-recently-used for eviction.
    this.hits.delete(identifier);
    this.hits.set(identifier, recent);
    if (this.hits.size > MAX_TRACKED_KEYS) {
      const oldest = this.hits.keys().next().value;
      if (oldest !== undefined) this.hits.delete(oldest);
    }
    return { success: true, remaining: this.policy.limit - recent.length, reset: recent[0] + windowMs };
  }
}

// ─── Upstash ──────────────────────────────────────────────────────────────────

function createRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  try {
    return new Redis({ url, token });
  } catch {
    return null;
  }
}

const redis = createRedis();

if (!redis && process.env.NODE_ENV === "production") {
  console.warn(
    "[rate-limit] Upstash Redis is not configured; using per-instance in-memory rate limiting. " +
      "Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN for shared limits."
  );
}

const memoryLimiters = new Map<RateLimitKey, MemoryRateLimiter>();
const redisLimiters = new Map<RateLimitKey, Ratelimit>();

function memoryLimiter(key: RateLimitKey) {
  let limiter = memoryLimiters.get(key);
  if (!limiter) {
    limiter = new MemoryRateLimiter(RATE_LIMITS[key]);
    memoryLimiters.set(key, limiter);
  }
  return limiter;
}

function redisLimiter(key: RateLimitKey) {
  if (!redis) return null;
  let limiter = redisLimiters.get(key);
  if (!limiter) {
    const { limit, windowSeconds } = RATE_LIMITS[key];
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
      prefix: `rl:${key}`,
    });
    redisLimiters.set(key, limiter);
  }
  return limiter;
}

export async function rateLimit(key: RateLimitKey, identifier: string): Promise<RateLimitResult> {
  const remote = redisLimiter(key);
  if (remote) {
    try {
      const result = await remote.limit(identifier);
      return { success: result.success, remaining: result.remaining, reset: result.reset };
    } catch (error) {
      console.error(`[rate-limit] Redis error for "${key}", falling back to memory limiter`, error);
    }
  }
  return memoryLimiter(key).limit(identifier);
}

/** Backwards-compatible helper: returns `true` when the request should be blocked. */
export async function checkRateLimit(key: RateLimitKey, identifier: string): Promise<boolean> {
  return !(await rateLimit(key, identifier)).success;
}

/**
 * Best-effort client IP. Prefers `x-real-ip` (set by the hosting platform), then the first
 * `x-forwarded-for` hop. Falls back to a shared bucket so unknown clients are still limited.
 */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || "unknown";
}
