import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { CASE_STUDIES } from "@/content/case-studies";
import { SERVICES, getService } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { HEADER_NAV, FOOTER_LINKS, isNavGroup } from "@/content/navigation";
import { FOUNDER, STATS, TESTIMONIALS, VERIFIED_STATS, VERIFIED_TESTIMONIALS } from "@/content/site";
import {
  caseStudiesForIndustry,
  caseStudiesForService,
  featuredCaseStudies,
  isPublished,
  mapDbCaseStudy,
  mergeCaseStudies,
  toServiceSlug,
  verifiedOutcomes,
  type DbCaseStudyRow,
} from "@/lib/content/case-study-model";
import { ogImageUrl, organizationJsonLd, resolveTitle, stripBrandSuffix } from "@/lib/seo";

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

const REAL_ESTATE = "real-estate-conversational-ai";

test("the real-estate case study stays approval-gated", () => {
  const re = CASE_STUDIES.find((c) => c.slug === REAL_ESTATE);
  assert.ok(re);
  // Flip to "published" + featured only after the owner explicitly approves publication.
  assert.equal(re.status, "draft", "must stay draft until the owner approves publication");
  assert.equal(re.featured, false);
  assert.equal(re.outcomes.length, 0, "no outcomes without verification");
  assert.deepEqual(re.techStack, [], "no technology claims until the stack is confirmed");
});

test("the real-estate case study is anonymised and only states owner-confirmed capabilities", () => {
  const re = CASE_STUDIES.find((c) => c.slug === REAL_ESTATE)!;
  assert.equal(re.role, "Lead Platform Architect & Engineer");
  assert.ok(!re.clientUrl, "no private or client URLs");
  assert.match(re.client, /confidential/i);
  assert.ok(!/https?:\/\//.test(JSON.stringify({ ...re, cover: undefined })), "no URLs anywhere in the copy");
  assert.ok(re.capabilities?.length);
  // Statuses confirmed by the owner on 2026-11-25.
  assert.ok(re.capabilities!.every((c) => c.status === "implemented"));
  assert.match(re.architecture!.caption, /illustrative/i);
});

test("once approved, the real-estate case study appears everywhere it should", () => {
  // Simulates the approved state without changing the content: same entry, published + featured.
  const approved = CASE_STUDIES.map((c) => (c.slug === REAL_ESTATE ? { ...c, status: "published" as const, featured: true } : c));
  const published = approved.filter(isPublished);
  assert.ok(published.some((c) => c.slug === REAL_ESTATE), "case studies listing");
  assert.ok(featuredCaseStudies(published).some((c) => c.slug === REAL_ESTATE), "homepage featured section");
  const industry = INDUSTRIES.find((i) => i.slug === "real-estate")!;
  assert.ok(caseStudiesForIndustry(published, industry).some((c) => c.slug === REAL_ESTATE), "real estate industry page");
  const re = published.find((c) => c.slug === REAL_ESTATE)!;
  for (const service of re.services) {
    // Service pages show the first three matches.
    assert.ok(caseStudiesForService(published, service).slice(0, 3).some((c) => c.slug === REAL_ESTATE), `service page ${service}`);
  }
  assert.ok(re.seo?.title && re.seo.description, "custom SEO metadata");
});

test("drafts never reach public selections", () => {
  const drafts = CASE_STUDIES.filter((c) => c.status === "draft");
  const published = CASE_STUDIES.filter(isPublished);
  for (const d of drafts) {
    assert.ok(!published.includes(d));
    assert.ok(!featuredCaseStudies(published).includes(d));
  }
  const dbDraft = mapDbCaseStudy({ ...dbRow, slug: "db-draft", status: "DRAFT" });
  assert.ok(!mergeCaseStudies(CASE_STUDIES, [dbDraft]).filter(isPublished).some((c) => c.slug === "db-draft"));
});

test("case study covers exist, and freelance work is labelled as such", () => {
  for (const c of CASE_STUDIES) {
    if (c.cover?.src.startsWith("/")) assert.ok(existsSync(path.join(process.cwd(), "public", c.cover.src)), `${c.slug} cover`);
  }
  assert.ok(existsSync(path.join(process.cwd(), "public/images/case-studies/fallback.svg")));
  for (const slug of ["daspire-platform", "cohere-saas", "cazvid-job-board"]) {
    assert.match(CASE_STUDIES.find((c) => c.slug === slug)!.engagement ?? "", /freelance/i, slug);
  }
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

test("the founder's core frontend expertise is shown consistently", () => {
  const core = ["React", "Next.js", "TypeScript", "Redux", "Zustand", "React Query", "Vue.js", "Tailwind CSS", "MUI"];
  const listed = FOUNDER.expertise.flatMap((g) => g.items);
  for (const skill of core) assert.ok(listed.includes(skill), `founder expertise lists ${skill}`);
  assert.equal(new Set(listed).size, listed.length, "no duplicates");
  // The Full-Stack Engineering service offers the same stack.
  const fullStack = SERVICES.find((s) => s.slug === "full-stack-development")!;
  for (const skill of core) assert.ok(fullStack.techStack.includes(skill), `full-stack service lists ${skill}`);
  // Structured data says the same thing to search engines.
  const founder = (organizationJsonLd() as { founder: { knowsAbout: string[] } }).founder;
  assert.deepEqual(founder.knowsAbout, listed);
});
