// First-party lead attribution: UTM parameters, landing page and referrer.
// Pure helpers (no DOM) so they can be unit tested; the browser wrapper lives in
// components/analytics/attribution-capture.tsx.
//
// Privacy: no cookies; stored in sessionStorage for the visit only; query strings are
// stripped from landing page and referrer; only sent with a form the visitor submits.
//
// This module is deliberately dependency-free (no zod) because it runs on every page.
// The server re-validates with `attributionSchema` (attribution-schema.ts).

export const ATTRIBUTION_STORAGE_KEY = "ail_attribution_v1";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export const UTM_VALUE_PATTERN = /^[\w\s.\-+/:%@()&,]*$/u;
export const LANDING_PAGE_PATTERN = /^\/[^\s?#]*$/;

export interface Attribution {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
  capturedAt?: string;
}

const isHttpUrl = (value: string) => {
  try {
    return /^https?:$/.test(new URL(value).protocol);
  } catch {
    return false;
  }
};

/** Keeps only well-formed fields (same rules as the server schema). Never throws. */
export function cleanAttribution(input: unknown): Attribution | undefined {
  if (!input || typeof input !== "object") return undefined;
  const raw = input as Record<string, unknown>;
  const out: Attribution = {};
  for (const key of ["utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm"] as const) {
    const v = raw[key];
    if (typeof v === "string" && v.trim() && v.length <= 150 && UTM_VALUE_PATTERN.test(v)) out[key] = v.trim();
  }
  if (typeof raw.landingPage === "string" && raw.landingPage.length <= 300 && LANDING_PAGE_PATTERN.test(raw.landingPage)) {
    out.landingPage = raw.landingPage;
  }
  if (typeof raw.referrer === "string" && raw.referrer.length <= 300 && isHttpUrl(raw.referrer)) out.referrer = raw.referrer;
  if (typeof raw.capturedAt === "string" && raw.capturedAt.length <= 40) out.capturedAt = raw.capturedAt;
  return out;
}

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
  return cleanAttribution(result) ?? { landingPage: result.landingPage };
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
