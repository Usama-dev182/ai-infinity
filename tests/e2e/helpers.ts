import { expect, type Page } from "@playwright/test";

/** Records gtag calls so analytics events can be asserted without loading GA. */
export async function stubAnalytics(page: Page) {
  await page.addInitScript(() => {
    (window as unknown as { __events: unknown[][] }).__events = [];
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag = (...args: unknown[]) =>
      (window as unknown as { __events: unknown[][] }).__events.push(args);
  });
}

export async function events(page: Page, name?: string) {
  const all = await page.evaluate(() => (window as unknown as { __events: unknown[][] }).__events ?? []);
  return all
    .filter((e) => e[0] === "event" && (!name || e[1] === name))
    .map((e) => ({ name: e[1] as string, params: (e[2] ?? {}) as Record<string, unknown> }));
}

/** Waits for hydration so client handlers are attached. */
export async function ready(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.waitForFunction(() => document.readyState === "complete");
  await page.waitForTimeout(500);
}

/** Lead-writing tests only run against localhost to protect production data. */
export function allowWrites(baseURL: string | undefined) {
  return Boolean(baseURL && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(baseURL)) || process.env.E2E_ALLOW_WRITES === "1";
}

/** Values in analytics events must never contain personal data typed by the visitor. */
export function expectNoPii(params: Record<string, unknown>, forbidden: string[]) {
  const serialized = JSON.stringify(params);
  for (const value of forbidden) expect(serialized).not.toContain(value);
}
