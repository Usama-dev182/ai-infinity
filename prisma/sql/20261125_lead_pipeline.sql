-- Lead pipeline & attribution — ADDITIVE ONLY, safe to re-run.
--
-- Generated with `prisma migrate diff` from the previous schema, then made idempotent.
-- No columns are dropped, renamed or retyped; existing rows get stage = 'NEW'.
--
-- Apply BEFORE deploying the application code that writes these columns.
-- Option A (reviewed SQL):  psql "$DATABASE_URL" -f prisma/sql/20261125_lead_pipeline.sql
-- Option B (Prisma):         npx prisma db push   (review the plan; it must show no data-loss warnings)
--
-- Take a backup / Neon branch first. Do not run against production without owner approval.

DO $$
BEGIN
  CREATE TYPE "LeadStage" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'DISCOVERY_SCHEDULED', 'PROPOSAL_SENT', 'WON', 'LOST');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

ALTER TABLE "contact_submissions"
  ADD COLUMN IF NOT EXISTS "service" TEXT,
  ADD COLUMN IF NOT EXISTS "industry" TEXT,
  ADD COLUMN IF NOT EXISTS "budget" TEXT,
  ADD COLUMN IF NOT EXISTS "timeline" TEXT,
  ADD COLUMN IF NOT EXISTS "entryPoint" TEXT,
  ADD COLUMN IF NOT EXISTS "stage" "LeadStage" NOT NULL DEFAULT 'NEW',
  ADD COLUMN IF NOT EXISTS "utmSource" TEXT,
  ADD COLUMN IF NOT EXISTS "utmMedium" TEXT,
  ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT,
  ADD COLUMN IF NOT EXISTS "utmContent" TEXT,
  ADD COLUMN IF NOT EXISTS "utmTerm" TEXT,
  ADD COLUMN IF NOT EXISTS "landingPage" TEXT,
  ADD COLUMN IF NOT EXISTS "referrer" TEXT;

ALTER TABLE "quote_requests"
  ADD COLUMN IF NOT EXISTS "industry" TEXT,
  ADD COLUMN IF NOT EXISTS "entryPoint" TEXT,
  ADD COLUMN IF NOT EXISTS "stage" "LeadStage" NOT NULL DEFAULT 'NEW',
  ADD COLUMN IF NOT EXISTS "utmSource" TEXT,
  ADD COLUMN IF NOT EXISTS "utmMedium" TEXT,
  ADD COLUMN IF NOT EXISTS "utmCampaign" TEXT,
  ADD COLUMN IF NOT EXISTS "utmContent" TEXT,
  ADD COLUMN IF NOT EXISTS "utmTerm" TEXT,
  ADD COLUMN IF NOT EXISTS "landingPage" TEXT,
  ADD COLUMN IF NOT EXISTS "referrer" TEXT;

CREATE INDEX IF NOT EXISTS "contact_submissions_stage_idx" ON "contact_submissions"("stage");
CREATE INDEX IF NOT EXISTS "contact_submissions_createdAt_idx" ON "contact_submissions"("createdAt");
CREATE INDEX IF NOT EXISTS "quote_requests_stage_idx" ON "quote_requests"("stage");
CREATE INDEX IF NOT EXISTS "quote_requests_createdAt_idx" ON "quote_requests"("createdAt");

-- Optional, owner decision: carry over the legacy inbox status into the new pipeline.
-- UPDATE "contact_submissions" SET "stage" = 'CONTACTED' WHERE "status" = 'REPLIED' AND "stage" = 'NEW';
-- UPDATE "quote_requests"      SET "stage" = 'CONTACTED' WHERE "status" = 'REPLIED' AND "stage" = 'NEW';
