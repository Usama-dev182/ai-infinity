import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { CASE_STUDIES } from "@/content/case-studies";
import { SERVICES, getService } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { HEADER_NAV, FOOTER_LINKS, isNavGroup } from "@/content/navigation";
import { STATS, TESTIMONIALS, VERIFIED_STATS, VERIFIED_TESTIMONIALS } from "@/content/site";
import {
  isPublished,
  mapDbCaseStudy,
  mergeCaseStudies,
  toServiceSlug,
  verifiedOutcomes,
  type DbCaseStudyRow,
} from "@/lib/content/case-study-model";
import { ogImageUrl, resolveTitle, stripBrandSuffix } from "@/lib/seo";

test("existing service URLs are preserved", () => {
  for (const slug of ["full-stack-development", "ai-integrations", "ai-automation"]) {
    assert.ok(getService(slug), `missing legacy service ${slug}`);
  }
});

test("every cross-reference between content modules resolves", () => {
  for (const s of SERVICES) for (const r of s.related) assert.ok(getService(r), `${s.slug} → ${r}`);
  for (const c of CASE_STUDIES) for (const s of c.services) assert.ok(getService(s), `${c.slug} → ${s}`);
  for (const i of INDUSTRIES) {
    for (const s of i.relatedServices ?? []) assert.ok(getService(s), `${i.slug} → ${s}`);
    for (const c of i.relatedCaseStudies ?? []) assert.ok(CASE_STUDIES.some((x) => x.slug === c), `${i.slug} → ${c}`);
  }
});

test("the real-estate case study stays approval-gated", () => {
  const re = CASE_STUDIES.find((c) => c.slug === "real-estate-conversational-ai");
  assert.ok(re);
  assert.equal(re.status, "draft", "must stay draft until the owner approves publication");
  assert.equal(re.outcomes.length, 0, "no outcomes without verification");
  assert.ok(re.capabilities?.every((c) => c.status === "unconfirmed"));
});

test("no unverified claim is exposed through the verified selectors", () => {
  assert.ok(VERIFIED_STATS.every((s) => s.verified));
  assert.ok(VERIFIED_TESTIMONIALS.every((t) => t.verified));
  assert.ok(STATS.some((s) => !s.verified) || STATS.every((s) => s.verified));
  assert.ok(TESTIMONIALS.length >= VERIFIED_TESTIMONIALS.length);
  for (const c of CASE_STUDIES) assert.ok(verifiedOutcomes(c).every((o) => o.verified));
});

test("navigation only links to routes that exist", () => {
  const appDir = path.join(process.cwd(), "src/app/(marketing)");
  const links = [
    ...HEADER_NAV.flatMap((i) => (isNavGroup(i) ? i.children : [i])),
    ...FOOTER_LINKS,
  ];
  for (const { href } of links) {
    const [route] = href.split("?");
    const segments = route.split("/").filter(Boolean);
    const staticPage = path.join(appDir, ...segments, "page.tsx");
    const dynamicPage = segments.length ? path.join(appDir, ...segments.slice(0, -1), "[slug]", "page.tsx") : staticPage;
    assert.ok(existsSync(staticPage) || existsSync(dynamicPage), `no route for ${href}`);
  }
});

const dbRow: DbCaseStudyRow = {
  slug: "db-study",
  title: "DB Study",
  description: "Summary",
  content: "Para one.\n\nPara two.",
  clientName: "Client",
  clientIndustry: "SaaS",
  coverImage: null,
  services: ["Full Stack Development", "ai-agents", "unknown"],
  techStack: ["Next.js"],
  outcomes: [{ label: "Speed", value: "2x", description: "faster" }, { label: "Hidden", value: "?", verified: false }, "bad"],
  featured: false,
  status: "PUBLISHED",
  metaTitle: null,
  metaDescription: null,
  keywords: [],
  updatedAt: new Date(0),
};

test("database case studies map to the content model", () => {
  const c = mapDbCaseStudy(dbRow);
  assert.deepEqual(c.services, ["full-stack-development", "ai-agents"]);
  assert.deepEqual(c.overview, ["Para one.", "Para two."]);
  assert.equal(verifiedOutcomes(c).length, 1);
  assert.equal(c.status, "published");
  assert.equal(mapDbCaseStudy({ ...dbRow, status: "DRAFT" }).status, "draft");
  assert.equal(toServiceSlug("AI Automation & Agentic AI"), "ai-automation");
});

test("code entries win slug conflicts and drafts are filtered out", () => {
  const conflicting = mapDbCaseStudy({ ...dbRow, slug: "daspire-platform", title: "Overwritten" });
  const merged = mergeCaseStudies(CASE_STUDIES, [conflicting, mapDbCaseStudy(dbRow)]);
  assert.equal(merged.find((c) => c.slug === "daspire-platform")?.title, "Daspire");
  assert.ok(merged.some((c) => c.slug === "db-study"));
  const published = merged.filter(isPublished);
  assert.ok(!published.some((c) => c.slug === "real-estate-conversational-ai"));
});

test("titles never repeat the brand and OG URLs are bounded", () => {
  assert.deepEqual(resolveTitle("AI Infinity Labs – Home"), { absolute: "AI Infinity Labs – Home" });
  assert.equal(resolveTitle("Pricing"), "Pricing");
  assert.equal(stripBrandSuffix("Blog – AI Infinity Labs"), "Blog");
  const url = new URL(ogImageUrl({ title: "t".repeat(500), description: "d".repeat(500) }), "https://x.test");
  assert.ok((url.searchParams.get("title") ?? "").length <= 110);
  assert.ok((url.searchParams.get("description") ?? "").length <= 180);
});
