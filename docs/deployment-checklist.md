# Deployment checklist

For releasing `feature/final-enhancements` (and confirming the earlier lead-pipeline release) to
https://aiinfinitylabs.com. Merging to `main` deploys to production on Vercel automatically, so
**merging is deploying**: it needs the owner's approval.

Nothing in this checklist has been run against production by the development process. Every step
that touches production is the owner's to run.

---

## 0. Before merging

- [ ] CI is green on the pull request (lint, typecheck, unit tests, build, E2E against a throwaway
      Postgres; see `.github/workflows/ci.yml`).
- [ ] Review the Vercel **preview deployment** of the branch: homepage, `/case-studies`, a case
      study, a service page, `/contact`, `/tools/ai-solution-advisor`, in light and dark mode, on a phone.
- [ ] Preview deployments must not use the production database for anything that writes test data.
      Check the `DATABASE_URL` scope in Vercel → Settings → Environment Variables (Production vs Preview).
- [ ] This branch needs **no new database migration**. The new lead entry points (`case-study`,
      `service-page`) are stored in the existing `entryPoint` text column.

## 1. Database: back up, then apply the lead-pipeline migration (if not already applied)

The code already in production (PR #4) reads and writes the lead-pipeline columns. If the migration
has not been applied yet, contact and quote submissions can fail. **Do this first.**

1. **Back up.** In the Neon console, go to Branches → *Create branch* from the production branch,
   named e.g. `pre-lead-pipeline-2026-11`. A branch is an instant copy-on-write restore point. With the
   CLI: `neonctl branches create --project-id <project> --name pre-lead-pipeline-2026-11`.
2. **Preview** (read-only). The output must contain only `CREATE TYPE`, `ADD COLUMN` and
   `CREATE INDEX`, and **no `DROP`**. If it says the diff is empty, the migration is already applied:
   skip to step 4.
   ```bash
   DATABASE_URL="<direct production DATABASE_URL>" npx prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma --script
   ```
3. **Apply** the reviewed, additive SQL in a single transaction (`-1`), using the **direct** (non-pooled)
   connection string:
   ```bash
   psql "<direct production DATABASE_URL>" -v ON_ERROR_STOP=1 -1 -f prisma/sql/20261125_lead_pipeline.sql
   ```
   Without a local `psql`:
   `docker run --rm -i postgres:17-alpine psql "<url>" -v ON_ERROR_STOP=1 -1 -f - < prisma/sql/20261125_lead_pipeline.sql`
4. **Verify:** re-run step 2 (it should report no difference), and:
   ```bash
   psql "<direct production DATABASE_URL>" -c "SELECT table_name, column_name FROM information_schema.columns
     WHERE table_name IN ('contact_submissions','quote_requests') AND column_name IN ('stage','utmSource','entryPoint')
     ORDER BY 1,2;"
   ```
   Expect 6 rows.
5. *(Optional, owner decision.)* Carry the legacy "replied" status into the new pipeline. The two
   `UPDATE` statements are commented out at the end of the SQL file.

**What the migration does (reviewed 2026-11-26):**
- It only adds things: an enum (`LeadStage`), nullable text columns, a `stage` column with
  default `NEW`, and four indexes.
- It never drops, renames or retypes anything.
- On PostgreSQL 11+, adding a column with a constant default changes only metadata (no table rewrite).
- The index builds lock writes briefly, which doesn't matter at the current lead volume.

**Tested locally** on a throwaway database:
- Created the schema from before the migration, with an existing lead row.
- Applied the SQL twice. The second run is a no-op ("already exists, skipping").
- The existing row kept its data and got `stage = NEW`.
- `prisma migrate diff` against `prisma/schema.prisma` reported **"No difference detected."**

**Rollback:** the previous application code ignores the new columns, so a code rollback needs no
database change. To return the data itself to its earlier state, restore from the Neon branch.
Don't drop columns by hand.

## 2. Environment variables (Vercel → Project → Settings → Environment Variables → Production)

`NEXT_PUBLIC_*` values are compiled into the build. **Redeploy after changing them.**

| Variable | Needed | If missing or wrong | How to verify |
| --- | --- | --- | --- |
| `DATABASE_URL` | Yes | Pages that read the DB, the forms and admin fail | Admin → Leads loads |
| `AUTH_SECRET` | Yes | Admin login fails | Generate with `openssl rand -base64 32`; log in |
| `AUTH_URL` | Yes | Auth callbacks can use the wrong host | `https://aiinfinitylabs.com` |
| `NEXT_PUBLIC_SITE_URL` | Yes | Falls back to `https://aiinfinitylabs.com` | Canonical tag in page source |
| `OPENAI_API_KEY` | For real AI replies | Advisor answers with scripted guidance (`"fallback": true`). **This is the current production state.** | Section 5 |
| `OPENAI_MODEL` | Optional | Code default is used | Section 5 |
| `RESEND_API_KEY` | For lead emails | Leads are saved but no notification is sent | Section 6 |
| `EMAIL_FROM` | With Resend | Sending fails unless the address is on a domain verified in Resend | Section 6 |
| `EMAIL_TO` | With Resend | Falls back to the inbox hard-coded in `src/lib/email.ts` | Section 6 |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Recommended | Rate limits are per serverless instance (weaker); logs warn `[rate-limit] Upstash Redis is not configured` | Section 4 |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | For analytics | No Google Analytics | Section 8 |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | The "book a call" link on `/contact` is hidden | Section 7 |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | For the Search Console meta-tag method | No verification tag | Section 9 |
| `CLOUDINARY_*`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | For admin image uploads | Uploads fail | Upload an image in the admin |
| `ADMIN_PASSWORD` | **Not in Vercel** | Only used by the local password script | — |

## 3. Admin password

Set a new password (12+ characters) for the existing admin account. Run it from a trusted machine;
the password is never stored in Vercel:

```bash
DATABASE_URL="<direct production DATABASE_URL>" ADMIN_PASSWORD="<new password>" npm run admin:set-password
# optional: ADMIN_EMAIL="<admin email>" if there is more than one admin
```

The script only updates an existing ADMIN user. `prisma/seed.ts` refuses non-local databases unless
`SEED_ALLOW_REMOTE=1`, so the seed cannot overwrite production by accident.

- [ ] Log in at `/admin/login` with the new password, and confirm the old one no longer works.

## 4. Upstash (shared rate limiting)

- [ ] Both variables are set for Production, then redeploy.
- [ ] Vercel → Logs: the `[rate-limit] Upstash Redis is not configured` warning no longer appears.
- [ ] Upstash console → Data Browser: rate-limit keys appear after one advisor message or form submission.

## 5. OpenAI (AI Solution Advisor)

```bash
curl -s https://aiinfinitylabs.com/api/ai/demo -H 'content-type: application/json' \
  -d '{"message":"We get 200 support emails a day about order status. What could AI do?"}'
```

- [ ] The response has a `reply` and **no** `"fallback": true`. If `fallback` is still `true`, the
      key is missing, invalid, out of credit, or the model name is wrong. Vercel logs show
      `[ai-advisor] provider error …` with the provider's message; no configuration is exposed to visitors.
- [ ] Set a monthly usage limit in the OpenAI dashboard. The site rate-limits per visitor, but a
      spend cap is the backstop.

## 6. Resend (lead notifications)

- [ ] The sending domain is verified in Resend (SPF and DKIM records), and `EMAIL_FROM` uses it.
- [ ] Submitting the test lead in section 10 delivers a notification to `EMAIL_TO`. Check spam too.

## 7. Booking URL

- [ ] If you use a scheduling tool, set `NEXT_PUBLIC_BOOKING_URL`, redeploy, and confirm the booking
      link on `/contact` opens the right calendar.

## 8. Google Analytics

- [ ] GA4 → Realtime shows `page_view` while browsing the site.
- [ ] Mark `generate_lead` as a **key event** (Admin → Events).
- [ ] Optional: register custom dimensions for `location`, `service`, `industry`, `network` and
      `campaign` so funnel and share reports can be broken down.
- [ ] Campaign links from `/admin/campaign-links` show under Reports → Acquisition → Traffic
      acquisition → *Session campaign*.

## 9. Google Search Console

- [ ] Verify the domain (a DNS TXT record is preferred; the meta tag via
      `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` also works).
- [ ] Submit `https://aiinfinitylabs.com/sitemap.xml`.
- [ ] Use URL Inspection → *Request indexing* for new or changed pages (case studies, services, industries).

## 10. Post-deploy smoke test (production)

- [ ] These return 200 and render correctly on a phone and on desktop:
      `/`, `/case-studies`, `/case-studies/daspire-platform`, `/services/ai-agents`, `/industries/real-estate`,
      `/tools/ai-solution-advisor`, `/tools/ai-roi-calculator`, `/contact`, `/quote`.
- [ ] `/case-studies/real-estate-conversational-ai` returns **404** (draft) until publication is approved.
- [ ] `/sitemap.xml` lists the published case studies and not the draft.
- [ ] Share buttons on a case study open LinkedIn and X with a URL containing `utm_medium=share`.
- [ ] **One** test lead, sent through
      `https://aiinfinitylabs.com/case-studies/daspire-platform?utm_source=qa&utm_medium=test&utm_campaign=deploy-check`:
      case study → service page → *Discuss Your Project* → submit. Check that:
      - the success message shows;
      - the email notification arrives;
      - Admin → Leads shows source `qa`, campaign `deploy-check`, landing page `/case-studies/daspire-platform`
        and entry point "Service page".

      Then set the lead's stage to *Lost*, with the note "deploy test".
- [ ] `/admin/campaign-links` loads, and the copy buttons copy tagged links.
- [ ] Automated tests that write leads are **never** pointed at production (`tests/e2e/helpers.ts`
      allows writes on localhost only).

## 11. Rollback

- **Code:** Vercel → Deployments → the previous production deployment → *Instant Rollback*.
- **Database:** no action needed, because the changes are additive. Restore from the Neon branch
  only if data itself must be reverted.

## 12. Privacy and consent (owner and legal decisions)

- [ ] **Cookie consent.** Google Analytics sets cookies, and the privacy policy says so, but the site
      asks for no consent. For visitors in the EU or UK, analytics cookies normally need prior consent.
      Options:
      - a consent banner with GA Consent Mode v2 (analytics off until accepted);
      - a cookieless analytics tool;
      - accept the risk if the audience is outside those regions.

      Owner decision; not implemented.
- [ ] Consider listing the service providers that process visitor data in the privacy policy:
      Vercel (hosting), Neon (database), Resend (email), Upstash (rate limiting, which uses IP
      addresses), OpenAI (advisor messages) and Google (analytics).
- [ ] The 24-month retention period stated in the privacy policy needs a periodic clean-up (manual
      or scheduled); nothing deletes old leads automatically yet.

## 13. Publishing the real-estate case study (only after explicit owner approval)

1. In `src/content/case-studies.ts`, set `status: "published"` and `featured: true`, and add the
   **confirmed** `techStack`.
2. Update the tests:
   - In `tests/unit/content.test.ts`, the "stays approval-gated" test becomes a "published"
     assertion. Keep the "drafts never reach public selections" test.
   - In `tests/e2e/journeys.spec.ts`, retarget the "draft case study is not public" test at
     another draft, or remove it if none remain.
3. Run `npm test` and the E2E suite, then open a PR. After deploy:
   - check the page, its social preview image (e.g. LinkedIn Post Inspector), the sitemap entry and
     the homepage "Featured work";
   - request indexing in Search Console;
   - share it using the links on `/admin/campaign-links`.
