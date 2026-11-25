import { test } from "node:test";
import assert from "node:assert/strict";
import { attributionSchema } from "@/lib/leads/attribution-schema";
import {
  buildAttribution,
  cleanAttribution,
  mergeAttribution,
  sanitizeReferrer,
  sourceLabel,
} from "@/lib/leads/attribution";
import { contactSchema, quoteSchema, leadUpdateSchema } from "@/lib/validators";
import { escapeHtml } from "@/lib/escape-html";

test("buildAttribution captures UTM, path and external referrer without query strings", () => {
  const a = buildAttribution({
    href: "https://aiinfinitylabs.com/industries/real-estate?utm_source=linkedin&utm_medium=social&utm_campaign=launch&email=x@y.z",
    referrer: "https://www.linkedin.com/feed/?trk=abc",
  });
  assert.equal(a.utmSource, "linkedin");
  assert.equal(a.utmMedium, "social");
  assert.equal(a.utmCampaign, "launch");
  assert.equal(a.landingPage, "/industries/real-estate");
  assert.equal(a.referrer, "https://www.linkedin.com/feed/");
  assert.ok(!JSON.stringify(a).includes("x@y.z"));
});

test("internal and non-http referrers are ignored", () => {
  assert.equal(sanitizeReferrer("https://aiinfinitylabs.com/blog", "aiinfinitylabs.com"), undefined);
  assert.equal(sanitizeReferrer("android-app://com.slack", "aiinfinitylabs.com"), undefined);
  assert.equal(sanitizeReferrer("not a url", "aiinfinitylabs.com"), undefined);
});

test("first touch is kept unless a later visit carries campaign parameters", () => {
  const first = { landingPage: "/", referrer: "https://google.com/" };
  assert.deepEqual(mergeAttribution(first, { landingPage: "/blog" }), first);
  const campaign = { landingPage: "/tools", utmSource: "x" };
  assert.deepEqual(mergeAttribution(first, campaign), campaign);
});

test("sourceLabel prefers utm_source, then referrer host, else direct", () => {
  assert.equal(sourceLabel({ utmSource: "LinkedIn" }), "linkedin");
  assert.equal(sourceLabel({ referrer: "https://www.google.com/" }), "google.com");
  assert.equal(sourceLabel({}), "direct");
});

test("attribution schema rejects script-like values", () => {
  assert.equal(attributionSchema.safeParse({ landingPage: "javascript:alert(1)" }).success, false);
  assert.equal(attributionSchema.safeParse({ utmSource: "<img src=x>" }).success, false);
});

test("client-side cleanAttribution applies the same rules without zod", () => {
  const cleaned = cleanAttribution({
    utmSource: "linkedin",
    utmMedium: "<script>",
    landingPage: "javascript:alert(1)",
    referrer: "ftp://x",
    extra: "dropped",
  });
  assert.deepEqual(cleaned, { utmSource: "linkedin" });
  assert.equal(cleanAttribution("nope"), undefined);
  // Anything cleanAttribution keeps must also pass the server schema.
  const sample = cleanAttribution({ utmSource: "x", landingPage: "/a", referrer: "https://b.com/c" });
  assert.equal(attributionSchema.safeParse(sample).success, true);
});

const validContact = {
  name: "Jane Smith",
  email: "jane@example.com",
  message: "We need help qualifying inbound leads faster.",
};

test("contact schema: optional fields may be empty, choices are allowlisted", () => {
  const ok = contactSchema.parse({ ...validContact, service: "", industry: "", budget: "" });
  assert.equal(ok.service, undefined);
  assert.equal(contactSchema.safeParse({ ...validContact, service: "hacking" }).success, false);
  assert.equal(contactSchema.parse({ ...validContact, service: "ai-agents" }).service, "ai-agents");
});

test("invalid attribution is dropped without rejecting the lead", () => {
  const parsed = contactSchema.parse({ ...validContact, attribution: { landingPage: "javascript:x" } });
  assert.equal(parsed.attribution, undefined);
});

test("quote schema maps values sent by the previous form version", () => {
  const parsed = quoteSchema.parse({
    name: "Legacy",
    email: "legacy@example.com",
    description: "A sufficiently long description of the project.",
    service: "AI Integrations",
    budget: "< $5,000",
    timeline: "ASAP",
  });
  assert.equal(parsed.service, "ai-integrations");
  assert.equal(parsed.budget, "under-5k");
  assert.equal(parsed.timeline, "asap");
});

test("lead update schema only accepts known stages and types", () => {
  assert.equal(leadUpdateSchema.safeParse({ id: "1", type: "contact", stage: "WON" }).success, true);
  assert.equal(leadUpdateSchema.safeParse({ id: "1", type: "career", stage: "WON" }).success, false);
  assert.equal(leadUpdateSchema.safeParse({ id: "1", type: "quote", stage: "DELETED" }).success, false);
});

test("escapeHtml neutralises HTML in user-provided email content", () => {
  assert.equal(escapeHtml(`<script>alert("x")</script> & 'y'`), "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#39;y&#39;");
});
