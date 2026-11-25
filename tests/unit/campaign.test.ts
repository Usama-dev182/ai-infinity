import { test } from "node:test";
import assert from "node:assert/strict";
import { campaignKey, campaignUrl, shareIntentUrl, utmToken } from "@/lib/campaign";
import { buildAttribution } from "@/lib/leads/attribution";
import { attributionSchema } from "@/lib/leads/attribution-schema";
import { CREDENTIALS, SITE, SOCIAL_PROFILES, socialUrl } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";

const BASE = "https://aiinfinitylabs.com";

test("campaignKey names campaigns after the page", () => {
  assert.equal(campaignKey("/"), "home");
  assert.equal(campaignKey("/case-studies/real-estate-conversational-ai"), "case-study-real-estate-conversational-ai");
  assert.equal(campaignKey("/services/ai-agents?x=1"), "service-ai-agents");
  assert.equal(campaignKey("/industries/real-estate"), "industry-real-estate");
  assert.equal(campaignKey("/tools/ai-roi-calculator#top"), "tool-ai-roi-calculator");
  assert.equal(campaignKey("/consulting"), "consulting");
});

test("utmToken produces lowercase, dash-separated, bounded values", () => {
  assert.equal(utmToken("  Launch Week: Real Estate!  "), "launch-week-real-estate");
  assert.equal(utmToken("x".repeat(300)).length, 100);
});

test("campaign links round-trip through lead attribution", () => {
  const url = campaignUrl(
    "/case-studies/daspire-platform",
    { source: "LinkedIn", medium: "social", campaign: "case-study-daspire-platform", content: "Post 2026-11-25" },
    BASE
  );
  assert.equal(
    url,
    "https://aiinfinitylabs.com/case-studies/daspire-platform?utm_source=linkedin&utm_medium=social&utm_campaign=case-study-daspire-platform&utm_content=post-2026-11-25"
  );
  const attribution = buildAttribution({ href: url, referrer: "https://www.linkedin.com/" });
  assert.equal(attribution.utmSource, "linkedin");
  assert.equal(attribution.utmMedium, "social");
  assert.equal(attribution.utmCampaign, "case-study-daspire-platform");
  assert.equal(attribution.landingPage, "/case-studies/daspire-platform");
  assert.equal(attributionSchema.safeParse(attribution).success, true, "server accepts it");
});

test("share intents encode the tagged page URL", () => {
  const page = campaignUrl("/services/ai-agents", { source: "x", medium: "share", campaign: "service-ai-agents" }, BASE);
  const x = new URL(shareIntentUrl("x", page, "AI Agents & Agentic Systems"));
  assert.equal(x.hostname, "x.com");
  assert.equal(x.searchParams.get("url"), page);
  assert.equal(x.searchParams.get("text"), "AI Agents & Agentic Systems");
  const li = new URL(shareIntentUrl("linkedin", page, "ignored"));
  assert.equal(li.searchParams.get("url"), page);
});

test("social profiles reported as not found are never linked", () => {
  for (const [network, profile] of Object.entries(SOCIAL_PROFILES)) {
    const url = socialUrl(network as keyof typeof SOCIAL_PROFILES);
    if (profile.status === "not-found") assert.equal(url, undefined, network);
    else assert.equal(url, profile.url, network);
  }
  assert.equal(SITE.github, SOCIAL_PROFILES.github.url);
  const sameAs = (organizationJsonLd() as { sameAs: string[] }).sameAs;
  assert.ok(sameAs.every(Boolean));
  for (const profile of Object.values(SOCIAL_PROFILES)) {
    if (profile.status === "not-found" && profile.url) assert.ok(!sameAs.includes(profile.url));
  }
  assert.ok(CREDENTIALS.every((c) => typeof c.href === "string" && c.href.length > 0));
});
