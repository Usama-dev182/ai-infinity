# AI Infinity Labs — Website Enhancement Plan

Branch: `feature/ai-product-engineering-growth`
Audit date: 2026-11-25
Framework: Next.js 16.2.6 (App Router, Turbopack), React 19.2, Tailwind CSS v4, Prisma 7 (PostgreSQL via `@prisma/adapter-pg`), NextAuth v5 beta, Resend, Upstash Redis, OpenAI SDK v6.

This document records what the audit found, what was verified and how, and the plan to address it.
Progress against this plan is tracked in [`implementation-progress.md`](./implementation-progress.md).

> **Confidentiality note.** This repository may be public. This document contains no credentials,
> hostnames, private client names, or proprietary implementation details, and nothing that follows should
> add any.

---

## 1. Existing architecture

| Area | Implementation |
| --- | --- |
| Routing | App Router. `src/app/(marketing)` route group (header + footer layout), `src/app/admin` (session-gated layout), `src/app/api/*` route handlers. |
| Content | Mostly static, typed-by-inference arrays in `src/content/site.ts` (services, portfolio, testimonials, stats, FAQ, process). Blog posts and job postings live in PostgreSQL. |
| Design system | CSS custom properties in `src/app/globals.css` (light + `.dark`), Tailwind v4 arbitrary values (`text-[var(--…)]`), CVA-based `Button`/`Badge`, simple `Card`, `Input`, `Textarea`, `Label`. Geist + Geist Mono via `next/font`. |
| Animation | `framer-motion` wrappers (`FadeUp`, `StaggerContainer`, `StaggerItem`) and header dropdown/mobile menu. |
| Theming | `next-themes` with `class` strategy, system default. |
| Database | Prisma models: `User`, `Account`, `Session`, `BlogPost`, `CaseStudy`, `JobPosting`, `ContactSubmission`, `QuoteRequest`, `CareerApplication`, `SiteSettings`. Schema is applied with `prisma db push`; there is no `prisma/migrations` directory. |
| Auth | NextAuth v5 credentials provider, JWT sessions, `role` (`ADMIN`/`EDITOR`) copied into the token. Admin API routes check `role === "ADMIN"`; the admin layout only checks for a session. |
| Forms | `ContactForm`, `QuoteForm`, `CareerApplicationForm` (react-hook-form + zod) → `/api/contact`, `/api/quote`, `/api/careers/apply`. Honeypot + timestamp anti-spam. Email notifications via Resend. |
| AI demo | `AiDemoWidget` (client) → `/api/ai/demo` (OpenAI `gpt-4o-mini`, 300 tokens). The widget is **not rendered on any page**. |
| SEO | `buildMetadata()` in `src/lib/seo.ts`, JSON-LD helpers, `sitemap.ts`, `robots.ts`, dynamic OG image at `/api/og`. |
| Analytics | GA4 via `next/script` (`google-analytics.tsx`), manual `page_view`, `TrackedLink`/`TrackedAnchor`/`PageEventTracker`, helpers in `src/lib/analytics.ts`. |
| Security | Global security headers + CSP in `next.config.ts`, Upstash rate limiting in `src/lib/rate-limit.ts`. |

---

## 2. Baseline (before any change)

| Check | Result |
| --- | --- |
| `npm run lint` | **Fails**: 8 errors, 5 warnings (all pre-existing) — `react/no-unescaped-entities` (blog post page, pricing), `react-hooks/purity` (`Date.now()` during render in Contact/Quote/Career forms), `react-hooks/set-state-in-effect` (header, theme toggle), empty interface (skeleton), unused imports. |
| `npm run typecheck` | Passes. |
| `npm run build` | Passes (50 routes). |
| Automated tests | None exist. |
| `npm audit --omit=dev` | 23 advisories (4 critical: `next`, `next-auth`, `@auth/core`, `@auth/prisma-adapter`; 13 high). |
| Screenshots | Captured at 360, 390, 768, 1024, 1440 px (light; dark at 390 and 1440) for `/`, `/services`, `/case-studies`, `/contact`. No horizontal overflow found on those pages. Stored outside the repository (session scratchpad), not committed. |

Runtime verification used a **throwaway local PostgreSQL container** and overrides for every external
service (email key invalid, Redis unset, GA unset), so no production data, email, or analytics was touched.

---

## 3. Verified issues

Each item lists how it was verified: **[S]** source inspection, **[R]** runtime test on the local
server, **[P]** read-only request to the production site.

### 3.1 Reliability and correctness

| # | Issue | Evidence | Affected files |
| --- | --- | --- | --- |
| R1 | **Admin login is unreachable — infinite redirect.** `admin/login` is inside `admin/layout.tsx`, which redirects every unauthenticated request to `/admin/login`. | [S][R] `/admin/login → 307 /admin/login`; [P] same on production. | `src/app/admin/layout.tsx`, `src/app/admin/login/page.tsx` |
| R2 | **Contact/quote forms fail silently.** The client ignores non-2xx responses. The API has no `try/catch` around the DB write; a DB error returns an empty-body 500. | [S][R] stopped the local DB → `500`, empty body; form shows nothing. | `src/components/forms/ContactForm.tsx`, `QuoteForm.tsx`, `CareerApplicationForm.tsx`, `src/app/api/contact/route.ts`, `api/quote/route.ts`, `api/careers/apply/route.ts` |
| R3 | **Rate limiting is disabled without Redis.** `checkRateLimit` returns "not limited" when Upstash env vars are absent. | [S][R] 8 rapid requests, none limited. | `src/lib/rate-limit.ts` |
| R4 | **AI demo sends only the latest message** (no conversational context) and is not rendered anywhere. Model is hard-coded although `OPENAI_MODEL` exists. When unconfigured it tells visitors to "Add your OPENAI_API_KEY" (leaks configuration). | [S][R] | `src/components/marketing/ai-demo-widget.tsx`, `src/app/api/ai/demo/route.ts` |
| R5 | Admin links point to routes that do not exist: `/admin/case-studies/new`, `/admin/case-studies/[id]`, `/admin/jobs/new`, `/admin/settings`. | [R] all 404. | `src/app/admin/page.tsx`, `admin/case-studies/page.tsx`, `components/admin/sidebar.tsx` |
| R6 | Admin pages that list personal data (contacts, quotes, applications) only require *a* session, not the `ADMIN` role. | [S] | `src/app/admin/layout.tsx` |
| R7 | User input is interpolated into notification email HTML without escaping (HTML injection into the owner's inbox). | [S] | `src/lib/email.ts` |
| R8 | `new Resend(process.env.RESEND_API_KEY)` runs at module load; a missing key throws at import and takes the whole form route down. | [S] | `src/lib/email.ts` |
| R9 | `prisma/seed.ts` falls back to a hard-coded default admin password when `ADMIN_PASSWORD` is unset. | [S] | `prisma/seed.ts` |

### 3.2 Content integrity (claims that need owner verification)

| # | Claim | Where |
| --- | --- | --- |
| C1 | Hero card "92% on-time delivery rate"; floating "OpenAI GPT-4o integrated / RAG pipeline live" status cards. | `(marketing)/page.tsx` |
| C2 | Stats "50+ Projects Delivered", "20+ Happy Clients" (also "🏆 20+ happy clients", "UK · US · EU · MENA"). | `content/site.ts` `STATS`, `consulting/page.tsx` |
| C3 | Four homepage testimonials with named people at named companies; avatar images referenced do not exist in `public/`. | `content/site.ts` `TESTIMONIALS` |
| C4 | Three consulting testimonials. | `consulting/page.tsx` |
| C5 | Portfolio outcomes: "40% faster page loads" (Daspire), "10+ API integrations" (Cohere), "70% of tier-1 support", "6 hrs → 4 min", "500+ emails per day" (AI support automation). | `content/site.ts` `PORTFOLIO` |
| C6 | Every case study page shows the same four generic achievements ("full TypeScript coverage", "CI/CD and automated tests", …) regardless of project. | `case-studies/[slug]/page.tsx` |
| C7 | "Trusted by clients across 5+ countries on Upwork"; FAQ "Our clients span the UK, USA, Canada, UAE, and Australia". | `(marketing)/page.tsx`, `content/site.ts` |
| C8 | Privacy policy says the site uses no tracking cookies, but Google Analytics is loaded when configured. | `privacy/page.tsx` |
| C9 | Seeded blog posts contain performance/ROI statements ("most of our clients hit breakeven within the first quarter"). These are database records and are **not** modified by this work. | `prisma/seed.ts` / DB |

### 3.3 UX, accessibility and design

| # | Issue | Evidence |
| --- | --- | --- |
| U1 | Muted text fails WCAG AA: light `#94a3b8` on white = 2.56:1; dark `#475569` on `#020817` = 2.64:1. | [S] contrast computed |
| U2 | Brand indigo `#6366f1` used as small text on white ≈ 4.47:1 (below 4.5:1). White text on the cyan end of the gradient buttons ≈ 2.4:1. Gradient heading text on light backgrounds (cyan end) < 3:1. | [S] |
| U3 | 47 animated elements are server-rendered with `opacity:0`; content is invisible if JS fails or is slow, and the hero `<h1>` waits for hydration (hurts LCP). No reduced-motion support. | [R] SSR HTML |
| U4 | Desktop dropdowns open on hover only; no `aria-expanded`, no click/Escape support. Mobile menu has no `aria-expanded`/`aria-controls`, no max-height scrolling, closes via `setState` in an effect (lint error). | [S] |
| U5 | No skip link; `<main>` has no id. Inputs show errors without `aria-invalid`/`aria-describedby`. Honeypot input lacks `autoComplete="off"`. | [S] |
| U6 | Hero floating cards overlap each other at 1440 px. | [R] screenshot |
| U7 | Inconsistent section spacing, card styles, and many ad-hoc heading sizes; no typography scale. | [S] |

### 3.4 SEO and social

| # | Issue | Evidence |
| --- | --- | --- |
| S1 | Brand duplicated in every page title (`About – AI Infinity Labs \| AI Infinity Labs`). | [R] |
| S2 | Default OG image `/images/og-default.png`, JSON-LD logo `/images/logo.png`, and `/apple-touch-icon.png` all 404. | [R][P] |
| S3 | Homepage OG URL passes `subtitle`, but the OG route reads `description`. OG route accepts unbounded text. | [S] |
| S4 | Sitemap omits `/products`, `/consulting`, `/pricing`, `/tech-talks`, `/privacy`, `/terms`, and is generated once at build time (new blog posts are missing until the next deploy). | [S][P] |
| S5 | `robots.txt` disallows `/api/`, which also blocks `/api/og` social images for crawlers that honour robots. | [S] |
| S6 | `WebSite` JSON-LD declares a `SearchAction` for `/blog?q=` but the blog has no search. JSON-LD is not escaped for `<`. | [S] |
| S7 | Twitter `site`/`creator` handles are hard-coded but not verified to belong to the company. | [S] |
| S8 | Admin pages have no `noindex`. | [S] |

### 3.5 Case study architecture

Verified: public `/case-studies` and `/case-studies/[slug]` read the static `PORTFOLIO` array; `/admin/case-studies`
reads the Prisma `CaseStudy` table and links to create/edit pages that do not exist. The two sources are disconnected,
there is no draft state for static entries, and there is no per-project content beyond a one-paragraph description.

### 3.6 Security and dependencies

* Critical advisories in `next` and `next-auth`/`@auth/core` (see baseline).
* CSP allows `'unsafe-eval'` in production (only required by the dev server).
* Rate limiter identity uses the first `x-forwarded-for` entry (client-controlled on some hosts).

---

## 4. Implementation plan and priorities

Priority: **P0** = broken functionality or integrity risk, **P1** = core goals of this initiative, **P2** = valuable improvements.

| Phase | Scope | Priority |
| --- | --- | --- |
| 1. Design system & UX | Accessible colour tokens (`--text-brand`, CTA gradient, gradient text per theme), responsive typography scale, reduced-motion, progressive-enhancement reveal animations (no SSR `opacity:0`), accessible header dropdowns + scrollable mobile menu, skip link, accessible form fields. Fix pre-existing lint errors touched by this work. | P0/P1 |
| 2. Positioning & homepage | New positioning copy, hero with labelled illustrative workflow (no fake metrics), verified-only credibility, restructured sections, gate unverified stats/testimonials behind explicit `verified` flags. | P0/P1 |
| 3. Services | Typed service catalogue (6 categories), richer service detail template (audience, problems, solution, use cases, deliverables, approach, tech, related work, FAQ, CTA). Preserve existing slugs; add `ai-product-engineering` and `ai-agents`; consulting category links to existing `/consulting`. | P1 |
| 4. Industries | `/industries` index + `/industries/real-estate`. No empty industry pages. | P1 |
| 5. Case studies | Typed case study model with `status`, contributions, challenges/solutions, capability status, verified outcomes, SEO; repository that merges published static entries with published DB rows; draft-safe routing (404 + excluded from sitemap) with an admin-only preview. New real-estate case study committed as **draft**. | P0/P1 |
| 6. Interactive experiences | AI Solution Advisor (bounded history, validation, guardrails, rate limits, deterministic fallback), ROI calculator tool. | P1 |
| 7. Lead generation | Progressive contact form, attribution capture (UTM, landing page, referrer), lead lifecycle stages, unified admin leads view with filters and notes, configurable booking link, reliable error feedback. Additive schema change only. | P0/P1 |
| 8. SEO & social | Title fix, OG images/assets, structured data (Organization, Service, Breadcrumb), sitemap completeness, robots, noindex admin. | P0/P1 |
| 9. Analytics | Typed event catalogue, funnel events, no PII. | P1 |
| 10. Security & performance | Rate limiter fallback, email escaping, CSP tightening, dependency patches, seed hardening. | P0 |
| 11. QA | Unit tests (`node:test` + `tsx`, no new runtime deps), Playwright E2E against system Chrome, before/after screenshots. | P1 |

### Key technical decisions

1. **Static content stays in code, behind typed models.** Services, industries and case studies are typed modules under
   `src/content/`. Version control is the review gate for public claims, and nothing confidential is committed.
2. **Case study repository** (`src/lib/content/case-studies.ts`) merges code-managed entries with *published* DB rows.
   Drafts never render publicly and never appear in the sitemap.
3. **Claims are gated, not deleted.** `verified: false` items stay in the source for the owner to confirm and are not
   rendered until they are confirmed.
4. **Database changes are additive only.** They add new nullable columns and a new enum with a default, and come with a
   reviewed SQL script. **Nothing is applied to any shared database by this work.**
5. **Form routes degrade safely.** If persistence fails, the notification email is still attempted. The visitor gets a
   clear error only when both paths fail.
6. **No new runtime dependencies.** `@playwright/test` is added as a dev dependency for E2E tests and uses the
   system Chrome.

---

## 5. Risks

| Risk | Mitigation |
| --- | --- |
| Deploying code before the additive schema change → Prisma errors on lead insert. | Form route still sends the email notification when the DB write fails. Deployment notes require the schema step first. |
| Hiding unverified claims reduces apparent social proof. | Reversible via `verified: true` per item; owner checklist lists every item. |
| Removing framer-motion from reveal animations changes motion feel. | CSS transitions keep the same fade-up character, honour reduced motion, and keep content visible without JS. |
| Framework security patch (`next`) may alter behaviour. | Patch-level within 16.x, full build + E2E re-run. |
| In-memory rate limiting is per-instance on serverless. | Documented. Redis stays the primary limiter in production; the in-memory limiter is a safety net. |
| Real-estate case study accuracy/confidentiality. | Committed as draft with every capability marked "to be confirmed". Generic, anonymised wording. Owner approval required before publishing. |

---

## 6. Acceptance criteria

* Unauthenticated `/admin/login` renders the login form; `/admin/*` requires a session; lead data requires `ADMIN`.
* Contact and quote forms show success, validation, rate-limit and server-error states; a DB outage does not lose the lead silently.
* Rate limiting applies with and without Redis.
* AI advisor sends bounded history, enforces input/output limits, rate limits, never reveals configuration, and degrades to deterministic guidance.
* No unverified statistic, testimonial or outcome is rendered.
* Every important page has a unique title (no duplicated brand), canonical URL, OG/Twitter image that resolves (200), and breadcrumb/service structured data where relevant.
* Sitemap includes every public marketing route and excludes drafts.
* Body text contrast ≥ 4.5:1 and large text ≥ 3:1 in both themes; keyboard can operate navigation, dropdowns (Escape closes), mobile menu, forms, advisor and calculator; content is visible with JS disabled; reduced motion honoured.
* Lint and typecheck pass; build passes; unit and E2E suites pass (or failures are documented).
