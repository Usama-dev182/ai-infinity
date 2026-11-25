// First-party lead attribution: UTM parameters, landing page and referrer.
// Pure helpers (no DOM) so they can be unit tested; the browser wrapper lives in
// components/analytics/attribution-capture.tsx.
//
// Privacy: no cookies; stored in sessionStorage for the visit only; query strings are
// stripped from landing page and referrer; only sent with a form the visitor submits.

import { z } from "zod";

export const ATTRIBUTION_STORAGE_KEY = "ail_attribution_v1";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

const utmValue = z
  .string()
  .trim()
  .max(150)
  .regex(/^[\w\s.\-+/:%@()&,]*$/u, "Invalid characters");

export const attributionSchema = z
  .object({
    utmSource: utmValue.optional(),
    utmMedium: utmValue.optional(),
    utmCampaign: utmValue.optional(),
    utmContent: utmValue.optional(),
    utmTerm: utmValue.optional(),
    landingPage: z.string().trim().max(300).regex(/^\/[^\s?#]*$/, "Must be a path").optional(),
    referrer: z.string().trim().max(300).url().optional(),
    capturedAt: z.string().max(40).optional(),
  })
  .strip();

export type Attribution = z.infer<typeof attributionSchema>;

const toCamel: Record<(typeof UTM_KEYS)[number], keyof Attribution> = {
  utm_source: "utmSource",
  utm_medium: "utmMedium",
  utm_campaign: "utmCampaign",
  utm_content: "utmContent",
  utm_term: "utmTerm",
};

/** Origin + path only (drops query and fragment, which may contain personal data). */
export function sanitizeReferrer(referrer: string | undefined, currentHost: string): string | undefined {
  if (!referrer) return undefined;
  try {
    const url = new URL(referrer);
    if (!/^https?:$/.test(url.protocol) || url.host === currentHost) return undefined;
    return `${url.origin}${url.pathname}`.slice(0, 300);
  } catch {
    return undefined;
  }
}

/** Builds attribution for the current page view. */
export function buildAttribution(input: { href: string; referrer?: string; now?: Date }): Attribution {
  const url = new URL(input.href);
  const result: Attribution = {
    landingPage: url.pathname.slice(0, 300),
    referrer: sanitizeReferrer(input.referrer, url.host),
    capturedAt: (input.now ?? new Date()).toISOString(),
  };
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(key)?.trim();
    if (value) (result as Record<string, string>)[toCamel[key]] = value.slice(0, 150);
  }
  return attributionSchema.safeParse(result).data ?? { landingPage: result.landingPage };
}

export const hasCampaign = (a?: Attribution) => Boolean(a?.utmSource || a?.utmMedium || a?.utmCampaign);

/**
 * Attribution model: keep the first touch of the visit, but a later visit landing with
 * explicit campaign parameters (e.g. a LinkedIn post) replaces it.
 */
export function mergeAttribution(existing: Attribution | undefined, incoming: Attribution): Attribution {
  if (!existing) return incoming;
  if (hasCampaign(incoming)) return incoming;
  return existing;
}

/** Simple source label for reports: utm_source, referrer host, or "direct". */
export function sourceLabel(a: { utmSource?: string | null; referrer?: string | null }) {
  if (a.utmSource) return a.utmSource.toLowerCase();
  if (a.referrer) {
    try {
      return new URL(a.referrer).hostname.replace(/^www\./, "");
    } catch {
      return "referral";
    }
  }
  return "direct";
}
