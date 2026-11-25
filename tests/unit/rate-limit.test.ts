import { test } from "node:test";
import assert from "node:assert/strict";
import { MemoryRateLimiter, checkRateLimit, getClientIp } from "@/lib/rate-limit";

test("memory limiter enforces a sliding window", () => {
  let now = 1_000_000;
  const limiter = new MemoryRateLimiter({ limit: 3, windowSeconds: 60 }, () => now);
  assert.equal(limiter.limit("ip").success, true);
  assert.equal(limiter.limit("ip").success, true);
  const third = limiter.limit("ip");
  assert.equal(third.success, true);
  assert.equal(third.remaining, 0);
  assert.equal(limiter.limit("ip").success, false, "4th request in window is blocked");
  assert.equal(limiter.limit("other-ip").success, true, "keys are independent");

  now += 61_000;
  assert.equal(limiter.limit("ip").success, true, "window slides");
});

test("checkRateLimit still limits when Redis is not configured (fail-safe)", async () => {
  delete process.env.UPSTASH_REDIS_REST_URL;
  const id = `test-${Math.random()}`;
  const results: boolean[] = [];
  for (let i = 0; i < 7; i++) results.push(await checkRateLimit("form", id));
  // form policy: 5 per minute → requests 6 and 7 are blocked
  assert.deepEqual(results, [false, false, false, false, false, true, true]);
});

test("getClientIp prefers the platform header, then the first forwarded hop", () => {
  assert.equal(getClientIp(new Headers({ "x-real-ip": "203.0.113.5", "x-forwarded-for": "1.1.1.1" })), "203.0.113.5");
  assert.equal(getClientIp(new Headers({ "x-forwarded-for": " 198.51.100.7 , 10.0.0.1" })), "198.51.100.7");
  assert.equal(getClientIp(new Headers()), "unknown");
});
