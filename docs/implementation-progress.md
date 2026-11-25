# Implementation Progress — `feature/ai-product-engineering-growth`

Plan: [`website-enhancement-plan.md`](./website-enhancement-plan.md). This file is updated at the end of each phase.

## Status overview

| Phase | Status |
| --- | --- |
| 0. Audit & plan | Done |
| 1. Design system & UX | Done |
| 2. Positioning & homepage | Not started |
| 3. Services | Not started |
| 4. Industries | Not started |
| 5. Case studies | Not started |
| 6. Interactive experiences | Not started |
| 7. Lead generation | Not started |
| 8. SEO & social | Not started |
| 9. Analytics | Not started |
| 10. Security & performance | Not started |
| 11. QA | Not started |

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
