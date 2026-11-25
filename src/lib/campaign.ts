// Campaign (UTM) links for social distribution. Pure functions; safe on client and server.
//
// Conventions
// - Posts we publish ourselves: utm_medium=social, utm_source=<network>.
// - Visitors sharing a page:     utm_medium=share,  utm_source=<network> or "copy-link".
// - utm_campaign identifies the content: "case-study-<slug>", "service-<slug>", "industry-<slug>",
//   "tool-<slug>", "home", or the path joined with dashes.
// Values only use characters that the attribution capture accepts (see UTM_VALUE_PATTERN).

import { UTM_VALUE_PATTERN } from "@/lib/leads/attribution";

export const CAMPAIGN_SOURCES = ["linkedin", "x", "youtube", "upwork", "newsletter"] as const;
export type CampaignSource = (typeof CAMPAIGN_SOURCES)[number];

export interface CampaignParams {
  source: string;
  medium: "social" | "share" | "email" | "video";
  campaign: string;
  /** Optional: identifies a specific post or placement. */
  content?: string;
}

const PREFIXES: Record<string, string> = {
  "case-studies": "case-study",
  services: "service",
  industries: "industry",
  tools: "tool",
  blog: "blog",
};

/** Normalises free text into a UTM-safe token: lowercase, dashes, max 100 chars. */
export function utmToken(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 100);
}

/** Campaign name for a site path, e.g. "/case-studies/foo" → "case-study-foo". */
export function campaignKey(path: string): string {
  const segments = path.split(/[?#]/)[0].split("/").filter(Boolean);
  if (segments.length === 0) return "home";
  const [first, ...rest] = segments;
  const prefix = PREFIXES[first];
  if (prefix && rest.length) return utmToken([prefix, ...rest].join("-"));
  return utmToken(segments.join("-"));
}

/** Absolute URL for `path` on `base`, with UTM parameters. */
export function campaignUrl(path: string, params: CampaignParams, base: string): string {
  const url = new URL(path, base);
  const entries: [string, string | undefined][] = [
    ["utm_source", utmToken(params.source)],
    ["utm_medium", params.medium],
    ["utm_campaign", utmToken(params.campaign)],
    ["utm_content", params.content ? utmToken(params.content) : undefined],
  ];
  for (const [key, value] of entries) {
    if (value && UTM_VALUE_PATTERN.test(value)) url.searchParams.set(key, value);
  }
  return url.toString();
}

export type ShareNetwork = "linkedin" | "x";

/** Share-dialog URL for a network. The shared page URL already carries its UTM parameters. */
export function shareIntentUrl(network: ShareNetwork, pageUrl: string, text: string): string {
  if (network === "linkedin") {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
  }
  return `https://x.com/intent/post?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(text)}`;
}
