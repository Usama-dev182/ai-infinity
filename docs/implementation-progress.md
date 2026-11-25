# Implementation Progress — `feature/ai-product-engineering-growth`

Plan: [`website-enhancement-plan.md`](./website-enhancement-plan.md). This file is updated at the end of each phase.

## Status overview

| Phase | Status |
| --- | --- |
| 0. Audit & plan | Done |
| 1. Design system & UX | Done |
| 2. Positioning & homepage | Done |
| 3. Services | Done |
| 4. Industries | Done |
| 5. Case studies | Done |
| 6. Interactive experiences | Done |
| 7. Lead generation | Done (schema change **not applied** to any shared DB) — code landed in owner commit `e43c170` ("all changes"), docs in `8af475d` |
| 8. SEO & social | Done |
| 9. Analytics | Done |
| 10. Security & performance | Done (2 residual advisories documented) |
| 11. QA | Done — 37 unit + 39 E2E tests passing |

## Phase 0 — Audit & plan

* Audited the architecture, content, forms, admin, SEO, analytics, and security configuration (see plan §1–3).
* Baseline: lint fails (8 errors / 5 warnings, pre-existing); typecheck passes; build passes; no test suite; 23 production dependency advisories.
* Runtime verification ran on a local throwaway PostgreSQL container with all external services overridden (no production DB writes, no email, no analytics).
* Read-only production checks confirmed the admin login redirect loop, the missing OG/logo/touch-icon assets, and the incomplete sitemap.

Changed files: `docs/website-enhancement-plan.md`, `docs/implementation-progress.md`.

## Phase 1 — Design system & UX

**Problems addressed:** U1–U5, U7, and the client half of R2 (silent form failures).

* **Tokens** (`globals.css`): `--text-muted` light `#5b6b82` (≥ 4.95:1 on every light surface), dark `#94a3b8` (≥ 5.7:1); dark `--text-secondary` `#cbd5e1`. New `--text-brand` (`#4f46e5` light / `#818cf8` dark) replaces brand indigo for text, which was 4.47:1. CTA gradient `#4f46e5 → #0e7490` keeps white text ≥ 5.3:1 (the cyan stop was 2.43:1). Gradient text and feedback text colours are now theme-aware. The brand colours themselves (`#6366F1`, `#06B6D4`, `#A855F7`) are unchanged and still used for fills, borders and the logo.
* **Typography**: responsive scale `text-heading-1` (36→60px), `text-heading-2` (30→40px), `text-heading-3` (22→24px), `text-lead`, `text-body`, `text-meta`, `text-caption`. Body line height is 1.65, and headings use `text-wrap: balance`. Applied to every marketing `h1` and section `h2`.
* **Motion**: framer-motion reveal wrappers are replaced with an IntersectionObserver plus CSS implementation, keeping the same `FadeUp`/`StaggerContainer`/`StaggerItem` API. Server HTML is always visible, only below-the-fold content is hidden before it is revealed, and `prefers-reduced-motion` disables all animation and smooth scrolling.
* **Header**: dropdowns follow the disclosure pattern (click/Enter/Space, `aria-expanded`/`aria-controls`, Escape returns focus, outside click and blur close; hover only for fine pointers). The mobile menu has `aria-expanded`, a solid background, scrolls on short screens (`max-height: 100dvh − header`), closes on Escape and on navigation (derived state, no effect). framer-motion is no longer imported anywhere. A skip link and `main#main-content` landmark were added.
* **Forms**: `Input`/`Textarea`/new `Select` set `aria-invalid` and `aria-describedby` and support hints. `Label` announces "(required)". A shared `useFormSubmit` hook gives every public form explicit success/validation/rate-limit/server-error states and maps server field errors onto inputs. `FormErrorAlert`/`FormSuccess` move focus and are announced. Honeypot fields have `autocomplete=off`.
* **Lint**: all 8 pre-existing errors fixed (2 warnings remain: an unused import on the homepage, rewritten in Phase 2, and react-hook-form `watch()` in `BlogPostForm`, which the React Compiler can't optimise and is harmless).
* **Navigation config** moved to `src/content/navigation.ts` (header + footer share one source). The primary CTA is "Discuss Your Project" → `/contact`.

**Verified (local, Playwright + system Chrome):** the skip link is the first tab stop; Enter opens the dropdown and focus moves into it; Escape closes it and returns focus to the button; the mobile menu scrolls at 360×560 and closes on Escape; with JS disabled, no section content is hidden (the 4 remaining zero-opacity nodes are hover-only logo captions removed in Phase 2).

## Phases 2–5 — Positioning, services, industries, case studies

Committed together because they share the new content model.

### Content architecture (SOLID: content, data access and presentation separated)

| Module | Responsibility |
| --- | --- |
| `src/content/services.ts` | Typed service catalogue (6 categories) — single source for home, `/services`, service pages, nav, footer. |
| `src/content/industries.ts` | Industries; only `hasDetailPage` industries get a route. |
| `src/content/case-studies.ts` | Code-managed case studies with `status`, role, contributions, capability status, architecture layers, verified outcomes, SEO. |
| `src/lib/content/case-study-model.ts` | Pure logic (no I/O): DB row mapping, merge (code wins on slug conflicts), publication filter, verified outcomes. Unit-testable. |
| `src/lib/content/case-studies.ts` | Repository (`server-only`): merges code entries with Prisma `CaseStudy` rows; DB failures degrade to code-only content. |
| `src/content/site.ts` | Brand copy; `STATS`/`TESTIMONIALS` carry `verified` flags; `CREDENTIALS` link to public evidence. |
| `src/content/navigation.ts` | Header/footer navigation derived from the catalogues. |

Shared presentation components: `SectionHeading`, `PageHero`, `Section`, `ServiceIcon(Tile)`, `CaseStudyCard`, `CaseStudyArticle`, `FaqList`, `CtaBanner`, `IllustrativeWorkflow`, `JsonLd`, `BrandMark`.

### Phase 2 — Homepage
* Positioning: "AI Product Engineering & Intelligent Automation". The tagline "Building AI-Powered Products That Matter" is kept as the H1, and the description matches the brief.
* Hero: "Discuss Your Project" → `/contact` and "Explore Our Work" → `/case-studies`. Floating status cards and the "92% on-time delivery" bar are replaced by an `IllustrativeWorkflow` labelled **"Illustrative … Not client data."** The H1 is not animated, so LCP doesn't wait for JS.
* Sections: hero → credibility (evidence links) → featured work → 6 services → problems/solutions (5) → industries → process → technical capabilities → testimonials (**verified only, currently hidden**) → founder → FAQ → final CTA. The interactive advisor section is added in Phase 6.
* Removed the unverifiable "Trusted by clients across 5+ countries", the stats bar (50+/20+), and the "Trusted by teams at" logo strip (it listed Upwork as a client).

### Phase 3 — Services
* Existing URLs preserved: `/services/full-stack-development` (now "Full-Stack Engineering"), `/services/ai-integrations` ("Applied AI & LLM Engineering"), `/services/ai-automation` ("Intelligent Business Automation").
* New: `/services/ai-product-engineering`, `/services/ai-agents`. "AI Consulting & Prototyping" points to the existing `/consulting` page (a duplicate page would be thin). `/services/ai-consulting` permanently redirects to `/consulting`.
* Each service page covers capabilities, audience, problems, proposed solution, approach steps, use cases, deliverables, technologies, related **published** case studies, FAQ, related services, CTA, plus `Service` and `BreadcrumbList` JSON-LD. Copy describes approach and capabilities only, with no outcome claims.

### Phase 4 — Industries
* `/industries` (specialisations + other sectors that link to services, with no thin pages) and `/industries/real-estate` (challenges, potential solutions, approach, related services, related published case studies, FAQ, CTA). Other industries return 404 by design (`dynamicParams = false`).

### Phase 5 — Case studies & admin
* Public pages now use the repository. Drafts 404 publicly and are excluded from the sitemap. Generic achievements are no longer appended to every project; outcomes render only when `verified: true`.
* **New draft:** `real-estate-conversational-ai`. Anonymised ("Real estate technology venture (confidential)"), role "Lead Platform Architect & Engineer", every capability marked **"Status to be confirmed"**, and a public-safe generic architecture. No names, URLs, prompts, screenshots or metrics.
* Admin login loop fixed (R1): the guarded layout moved to the `app/admin/(dashboard)` route group (URLs unchanged); `app/admin/layout.tsx` is unauthenticated and `noindex`. `src/lib/authz.ts` adds `requireSession`/`requireAdmin`. Contact, quote and application pages now require the `ADMIN` role (R6).
* Admin case studies page lists code and DB entries with source, status, verified-outcome count, and an authenticated **Preview** (`/admin/case-studies/preview/[slug]`). Dead links (`/admin/case-studies/new`, `/admin/jobs/new`, `/admin/settings`) removed (R5).
* Fixed: the contact page "Upwork" link pointed to LinkedIn.

**Verified locally:** every new route returns 200; the draft case study returns 404 publicly and is absent from the sitemap; the admin preview redirects to login when signed out and renders after login (local seeded test user); `/admin/login` renders (no loop); no horizontal overflow at 360/390/1024/1440; titles no longer repeat the brand; with JS disabled, 0 content elements are hidden; the desktop nav moved to ≥1280px after the logo wrapped at 1024px.

## Phase 6 — Interactive experiences

**Problem (R3, R4):** the demo widget wasn't rendered anywhere and sent only the latest message. Its API hard-coded the model, told visitors to "Add your OPENAI_API_KEY", returned 503 on provider errors, and rate limiting was off without Redis.

* **Rate limiting** (`src/lib/rate-limit.ts`): Upstash when configured. A bounded in-memory sliding window covers missing Redis *or* Redis errors (fail-safe, not fail-open), with a production warning when Redis is absent. `getClientIp()` prefers the platform-set `x-real-ip`. Policies: forms 5/min; advisor 10/min plus 60/day per IP.
* **AI Solution Advisor** (`/api/ai/demo`, same URL, legacy `{message}` still accepted):
  * zod validation; industry and challenge are **allowlisted** ids (never free text in the system prompt); body size cap; `Cache-Control: no-store`.
  * Bounded context: last 8 messages / 4,000 chars; 600 chars per visitor message; 8 visitor turns per conversation; assistant echoes truncated (the client is untrusted); 450 output tokens; reply clamped to 2,000 chars.
  * Privacy: emails, card-like numbers and phone numbers (≥ 9 digits) are redacted before leaving the server; conversations are not stored; the UI warns against sharing personal data.
  * Guardrails: the system prompt treats all conversation content as untrusted, and refuses to reveal the prompt or configuration, invent prices, results or clients, or go off-topic.
  * Model from `OPENAI_MODEL` (default `gpt-4o-mini`), 20 s timeout, 1 retry. **Unconfigured or failing provider → deterministic guidance** (`fallback: true`); configuration is never revealed.
* **UI** (`AiSolutionAdvisor`): industry and challenge chips (`aria-pressed`), a `role="log"` live region, auto-scroll inside the log only, a loading indicator, an error with retry, a character counter, a turn limit with consultation hand-off, a privacy note, and a contextual CTA (`/contact?topic=advisor&service=…&industry=…`).
* **ROI calculator** (`src/lib/roi.ts` + `RoiCalculator`): hours saved/month, annual time value, first-year and ongoing net benefit, first-year ROI (only when costs exist), payback (only when implementation cost exists and monthly net > 0). Inputs are clamped with visible range hints; currency selector; illustrative disclaimer; CTA.
* Pages: `/tools`, `/tools/ai-solution-advisor`, `/tools/ai-roi-calculator` (`WebApplication` JSON-LD), plus a homepage "Try it" section. Added to Resources nav, footer and sitemap.
* Removed the unused `ai-demo-widget.tsx`.

**Verified locally:**
* API: validation (non-allowlisted context → 422; last message from assistant → 422; > 600 chars → 422); no key → fallback; legacy format works; 12 rapid requests → 10 × 200 then 2 × 429 without Redis.
* Success path against a **local mock OpenAI server**: payload has the env model, `max_completion_tokens: 450`, allowlisted context only; email/phone/card redacted while "2024-2025" is kept.
* Browser (390 px): chips → reply → keyboard follow-up → contextual CTA; analytics events contain ids only.
* ROI outputs match hand-calculated values; out-of-range input is capped with a hint.

**Not verified:** a real model's response quality and guardrail compliance. The local `.env.local` `OPENAI_API_KEY` is a placeholder (401 from the provider), and the endpoint degraded to fallback correctly. **Owner action:** test on a preview deployment with the real key.

## Phase 7 — Lead generation

**Problems:** R2 (silent failures, unhandled DB errors), R7 (HTML injection in emails), R8 (missing Resend key crashed routes at import). There was no qualification data, no attribution, no lead lifecycle, and contact/quote leads lived in separate read-only lists.

* **Schema (additive only):** `LeadStage` enum (New → Contacted → Qualified → Discovery scheduled → Proposal sent → Won/Lost); nullable `service`, `industry`, `budget`, `timeline`, `entryPoint`, UTM fields, `landingPage` and `referrer` on `contact_submissions` / `quote_requests`; `stage` defaults to `NEW`; indexes on `stage` and `createdAt`. The legacy `status` column is untouched.
  * Reviewed, idempotent SQL: `prisma/sql/20261125_lead_pipeline.sql` (generated by `prisma migrate diff`, wrapped in `IF NOT EXISTS`).
  * Verified on the **local** database only: applied twice without error, the existing row was preserved (`stage = NEW`), and `prisma migrate diff` against the database is empty.
* **Forms:** the contact form uses progressive disclosure (name, email, optional service and message first; company, industry, budget and timeline in a collapsible section) and pre-fills `?service`, `?industry` and `?topic` from the page that linked to it. The quote form adds industry and uses shared allowlisted options. The client has a simple UX schema; the server schema is strict and maps legacy quote-form values.
* **Attribution:** `AttributionCapture` stores UTM params, landing path and external referrer (query strings stripped) in **sessionStorage** for the visit; no cookies. Campaign links override earlier direct visits. It is sent only with a submitted form, and invalid attribution is dropped without rejecting the lead.
* **Reliability:** `handleLeadSubmission()` (shared by `/api/contact` and `/api/quote`) adds rate limiting, a body size cap, honeypot and timing checks, then persist → notify. If the DB write fails, the notification email (marked "only copy") still goes out. The visitor gets a 503 only when both fail. Emails are HTML-escaped, subjects stripped of newlines, and the Resend client is created lazily.
* **Admin:** `/admin/leads` (ADMIN only) shows pipeline counts per stage, filters (type, stage, source, search), qualification and attribution details per lead, and a stage + notes update via a server action that re-checks `requireAdmin()`. `/admin/submissions/contact|quotes` redirect to the filtered view. The dashboard shows "New leads".
* **Discovery call:** the contact page explains what happens next. A booking button appears only when `NEXT_PUBLIC_BOOKING_URL` is set (no booking URL was invented); otherwise visitors are asked to mention it in the message.
* **Privacy policy** updated to reflect reality (Google Analytics cookies, attribution, advisor processing). **Needs owner/legal review.**

**Verified locally (browser + API):** a LinkedIn UTM landing on `/industries/real-estate` → CTA → contact form pre-filled with industry (details auto-expanded) → accessible validation (`aria-invalid` + `aria-describedby`) → success panel → DB row with service, industry, budget, `stage=NEW`, `utm_source=linkedin`, medium, campaign and landing page. GA events: `consultation_started`, `generate_lead` (ids and UTM only). DB down with email unavailable → 503 plus a visible error with an email fallback. Form rate limit 5/min → 429. Legacy quote payload → 200, mapped labels. Malicious attribution dropped, lead kept. Admin: signed-out `/admin/leads` → login; source filter; stage/notes update persisted; legacy URL redirects.

**Deployment order (required):** apply `prisma/sql/20261125_lead_pipeline.sql` (or `prisma db push`) to the production database **before** deploying this branch. Otherwise Prisma inserts fail. Leads still arrive by email, but they are not stored.

## Phase 8 — SEO & social

* **Titles (S1):** `buildMetadata()` emits titles containing the brand as `absolute`, and all page titles were rewritten without brand suffixes, so the brand appears exactly once.
* **Images (S2, S3):** every page gets a page-specific generated OG/X image (`/api/og?title&description&type`) unless it supplies its own. The OG route was rebuilt with the brand mark and positioning; input is clamped to 110/180/32 chars; cached for a day at the browser and a week at the CDN; the legacy `subtitle` param still works. The broken `/images/og-default.png` references were removed. `public/images/logo.png` (512²) and `src/app/apple-icon.png` (180², file convention) were generated from the existing header mark (`public/images/logo-mark.svg`). The manual `apple-touch-icon`/favicon `<link>`s were removed (Next adds them).
* **Structured data:** `JsonLd` component escapes `<` (Next.js guide); Organization (`@id`, logo, founder, `sameAs` incl. YouTube, `knowsAbout`) and WebSite (the invalid `SearchAction` removed, S6); `Service` + `BreadcrumbList` on service pages; Breadcrumbs on all listing and detail pages; `Article` + Breadcrumb on blog posts; `WebApplication` on the ROI calculator; job postings now escaped.
* **Crawling:** `robots.txt` allows `/api/og` (S5) and disallows `/admin` and other `/api/`. The sitemap covers all public routes and drafts are excluded (Phase 5). `X-Robots-Tag: noindex, nofollow` is sent on `/admin/*` and `noindex` on non-OG APIs. The admin layout is `noindex` (S8).
* **Social:** unverified X handles removed (S7, V12). Google verification meta is emitted only when its env var is set.
* **CSP:** `'unsafe-eval'` dev-only; added `base-uri`, `form-action`, `object-src 'none'`; allowed YouTube thumbnail hosts (Tech Talks thumbnails would have been blocked once real video IDs are added).
* Blog post query deduplicated between metadata and page with React `cache()`.

**Verified locally (scripted audit of 26 public pages with a Googlebot UA):** unique titles, brand appears once, one `<h1>` per page, canonical, Twitter card, valid JSON-LD on every page, and all 26 OG images return `200 image/png`. Metadata is in `<head>` for Googlebot, LinkedInBot and Twitterbot (Next's blocking-metadata bot list).

## Phase 9 — Analytics

Reuses the existing GA4 integration. Event catalogue (`src/lib/analytics.ts` → `EVENTS`):

| Event | When | Params (no PII) |
| --- | --- | --- |
| `cta_click` | Primary/secondary CTAs everywhere | label, location, destination |
| `nav_click`, `service_card_click`, `case_study_card_click`, `industry_card_click`, `tool_card_click` | Navigation and cards | slug/label, location |
| `service_view`, `case_study_view`, `industry_view`, `blog_view` | Detail page views | slug |
| `demo_started` / `demo_message` / `demo_completed` / `demo_error` | AI advisor | challenge id, industry id, turn, fallback, trigger, status |
| `roi_calculator_used` | First calculator interaction | location, has_costs, payback bucket |
| `consultation_started` | First focus in a lead form | form, location |
| `generate_lead` (+ legacy `contact_form_submit` / `quote_form_submit`) | Successful submission | form, service, industry, utm_source/medium/campaign |
| `form_submit_error` | Failed submission | form, reason (validation / rate_limited / server / network) |
| `booking_click` | Booking link (when configured) | location |
| `social_click`, `outbound_click`, `whatsapp_click` | External links | label, location |

* **Privacy fix:** GA previously loaded on `/admin` and sent full URLs, and the new leads search puts names and emails in the query string. GA now never loads or sends page views on `/admin`, sets the official `ga-disable-<ID>` flag on private paths, and reports only `utm_*` query parameters in `page_location`.
* Suggested GA4 setup (owner): mark `generate_lead` as a key event; create funnel exploration `cta_click → consultation_started → generate_lead`; segment by `utm_source`. Qualified leads, discovery calls and win rate are tracked in `/admin/leads` (stages), not GA. **No analytics data was available or reported in this work.**

## Phase 10 — Security & performance

* **Dependencies:** `next` 16.2.6 → **16.4.6**, `eslint-config-next` 16.4.6, `next-auth` beta.31 → **beta.32** (`@auth/core` 0.41.3), `@auth/prisma-adapter` 2.11.3, plus a non-breaking `npm audit fix`. Removed unused `framer-motion` and `@vercel/og`. Production advisories went from **23 (4 critical, 13 high) to 4 high, 0 critical**. Remaining: `prisma` CLI → `@prisma/config` → `effect` (build tooling; the only "fix" is a downgrade to Prisma 6) and `sharp` (libvips/libheif CVEs; the fix is a major bump that needs Next compatibility checks).
* **Auth:** admin sign-in limited to 10 attempts per 15 min per IP and per email. `prisma/seed.ts` refuses to run without `ADMIN_PASSWORD` (≥ 12 chars); the hard-coded fallback was removed (R9).
* **Rate limiting, validation, escaping, error handling and CSP:** see Phases 6–8.
* **Performance:**
  * Reveal animations no longer hide server HTML (Phase 1), so the LCP element renders immediately.
  * Removed the unused React Query provider from every page.
  * The header gets menu data as props, so the service and industry copy (~19 KB gz) stays out of the client bundle.
  * Client attribution is zod-free (zod now loads only where forms need it).
  * The blog post query is deduplicated, and OG images are cached.
* **Lighthouse** (homepage, Lighthouse 13.6, system Chrome, local `next start` + local DB). Live-site numbers are the *baseline code on Vercel*, so performance is indicative only (different network/CDN):

  | | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
  | --- | --- | --- | --- | --- | --- | --- | --- |
  | Baseline (live), mobile | 71 | 100 | 96 | 100 | 1.3 s | 0 | 2,330 ms |
  | After (local), mobile | 72 | 100 | 100 | 100 | 0.9 s | 0 | 2,270 ms |
  | Baseline (live), desktop | 83 | 100 | 96 | 100 | 0.7 s | 0 | 330 ms |
  | After (local), desktop | 98 | 100 | 100 | 100 | 0.4 s | 0 | 140 ms |

  Mobile lab TBT (4× CPU throttling) is dominated by hydrating a long homepage. HTML size is unchanged at 247 KB vs 250 KB, so this is not a regression. **Core Web Vitals targets are lab-only so far; no field data was available.** Recommended next steps: measure field INP (Vercel Speed Insights / CrUX); if INP > 200 ms, lazy-load the below-the-fold advisor and trim homepage sections.

## Phase 11 — Testing & QA

| Check | Result |
| --- | --- |
| `npm run lint` | **0 errors**, 1 warning (pre-existing: react-hook-form `watch()` in `BlogPostForm` can't be optimised by the React Compiler) |
| `npm run typecheck` | Pass |
| `npm run build` | Pass (57 routes) |
| `npm test` (node:test + tsx, no new runtime deps) | **37/37 pass** — ROI maths, rate limiter, advisor bounds/redaction/allowlists, attribution (client/server parity), lead validation & legacy mapping, HTML escaping, content cross-references, draft gating, nav → route existence, SEO helpers |
| `npm run test:e2e` (Playwright, system Chrome, against `next start`) | **39/39 pass** — see below |

E2E coverage: homepage → service (CTA carries the service) · homepage → case study (no generic or unverified claims) · draft 404 + absent from sitemap · admin auth redirects · contact validation (`aria-invalid`/`aria-describedby`) + visible, focused server error · industry page → inquiry with UTM attribution and PII-free `generate_lead` · quote success · advisor success, 429, network failure + retry, bounded history sent · advisor API fallback never reveals configuration · ROI maths and capping · keyboard skip link and dropdown Escape · theme toggle · no-JS content visibility · mobile menu (scroll, Escape, closes on navigation) · no horizontal overflow at 360/390/768/1024 px · touch targets ≥ 24 px · **axe-core WCAG 2.0–2.2 A/AA: 0 violations on 10 key pages in light and dark**.

How to run locally (never against production — lead-writing tests skip non-localhost targets):

```bash
docker run -d --name ai-infinity-test-db -e POSTGRES_USER=aitest -e POSTGRES_PASSWORD=localtest \
  -e POSTGRES_DB=ai_infinity_test -p 127.0.0.1:55433:5432 postgres:17-alpine
export DATABASE_URL=postgresql://aitest:localtest@127.0.0.1:55433/ai_infinity_test
export RESEND_API_KEY=re_invalid UPSTASH_REDIS_REST_URL= UPSTASH_REDIS_REST_TOKEN= NEXT_PUBLIC_GA_MEASUREMENT_ID=
npx prisma db push && ADMIN_PASSWORD=<local-only-password> npm run db:seed
npm run build && npx next start -p 3100 &
npm test && npm run test:e2e
```

Screenshots: before/after at 360, 390, 768, 1024 and 1440 px (light; dark at 390 and 1440) for `/`, `/services`, `/case-studies` and `/contact` were captured during the session. They're kept outside the repository and were not committed. No horizontal overflow at any width, before or after.

---

## Known issues & limitations

1. **Live LLM path not exercised.** The local `OPENAI_API_KEY` is a placeholder (401). The success path was verified against a mock OpenAI-compatible server, and failure → fallback was verified for real. Test on a preview deployment.
2. **Mobile lab TBT ≈ 2.3 s** (same as baseline). See the Phase 10 recommendations.
3. **Two residual high advisories** (`prisma` CLI → `effect`, `sharp`). See Phase 10.
4. **In-memory rate limiting is per instance.** Keep Upstash configured in production. Without proxy headers (`x-real-ip`/`x-forwarded-for`), all clients share one bucket — fine on Vercel; check if self-hosting.
5. **Leads view** shows the 100 most recent matches per filter (no pagination yet).
6. **DB case study editor** (`/admin/case-studies/new`) does not exist. Code-managed case studies are the primary path; DB rows are still merged and rendered if created.
7. **Consent banner** not implemented (GA runs without a prior opt-in). Owner/legal decision.
8. **OG image font** is the renderer's default regular weight (bundling Geist would add a font fetch per image).
9. Unused dependencies left in place for the owner to decide: `@tanstack/react-query(-devtools)`, `cloudinary`, `@t3-oss/env-nextjs`, `date-fns`, several `@radix-ui/*` packages.
10. **Process note:** an owner commit `e43c170` ("all changes") was made and pushed mid-session; it contains the Phase 7 code. History was not rewritten.

## Owner approvals & actions required before release

| Priority | Action |
| --- | --- |
| **P0** | Apply `prisma/sql/20261125_lead_pipeline.sql` (or `prisma db push`) to production **before** deploying (backup / Neon branch first). |
| **P0** | Confirm the production admin password is not the old seed default (the old seed fell back to a hard-coded password when `ADMIN_PASSWORD` was unset). Rotate if unsure. |
| **P0** | Review the deployment on a **Vercel preview** (Next 16.4.6 + next-auth beta.32 upgrades): sign in, submit a test lead, run the advisor with the real key. |
| P1 | Work through the **Owner verification checklist** below (claims, testimonials, stats, case study outcomes). |
| P1 | Real-estate case study: confirm each capability status, the anonymised wording and client permission, then set `status: "published"`. |
| P1 | Privacy policy changes — legal review; decide on a consent banner. |
| P2 | Set `NEXT_PUBLIC_BOOKING_URL` if you use Cal.com/Calendly. Confirm X handles if you want `twitter:site`. Mark `generate_lead` as a GA4 key event. |
| P2 | Decide on the unused dependencies and on raising `sharp` to 0.35. |

---

## Owner verification checklist

Nothing below is rendered until confirmed. Flip the flag (or edit the copy) only with evidence you are comfortable publishing.

| # | Item | Location | Current state |
| --- | --- | --- | --- |
| V1 | Stats "50+ Projects Delivered", "20+ Happy Clients" | `src/content/site.ts` `STATS` | `verified: false` (hidden) |
| V2 | "5+ Years Experience" | `STATS` | shown — consistent with founder timeline; please confirm |
| V3 | 4 homepage testimonials (named people/companies; avatar files never existed) | `TESTIMONIALS` | hidden — need real quotes + permission |
| V4 | 3 consulting testimonials | `consulting/page.tsx` | hidden |
| V5 | Daspire "40% faster page loads", "Redesigned" | `case-studies.ts` | hidden |
| V6 | Cohere "10+ API integrations", "Scalable" | `case-studies.ts` | hidden |
| V7 | Cazvid "Global", "Performance"; "world's largest" wording removed from summary | `case-studies.ts` | hidden |
| V8 | AI Support Automation: whole project + "500+ emails/day", "70% tier-1", "6 hrs → 4 min" | `case-studies.ts` | **case study still published** with neutral summary; outcomes hidden. Confirm the project or unpublish. |
| V9 | Real-estate case study: every capability status, the "Active engagement" status, client approval to publish an anonymised case study | `case-studies.ts` | `status: "draft"` |
| V10 | About page: "reducing LCP by 40%" (eBrainX role) | `about/page.tsx` | still shown (career history) — please confirm |
| V11 | Business terms in FAQ/pricing: NDA "always", 30-day bug-fix warranty, start "within 1–2 weeks", "proposal within 48 hours" | `site.ts`, `pricing`, `quote` | still shown — confirm they reflect current terms |
| V12 | X/Twitter handles `@aiinfinitylabs`, `@usamaali` (previously hard-coded) | `SITE.xSite/xCreator` | removed until confirmed |
| V13 | Seeded blog posts contain ROI/performance statements | database | **not modified** — review in admin |
| V14 | Privacy policy rewrite (analytics cookies, attribution, advisor) | `privacy/page.tsx` | updated to match actual behaviour — **legal review needed**; consider a consent banner for EU/UK visitors |
| V15 | Reply-time promises: contact page "within 1–2 business days"; previously "within 24 hours" on the contact page | `contact/page.tsx`, emails | aligned to the original email's "1–2 business days" — confirm |
