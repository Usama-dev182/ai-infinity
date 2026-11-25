import "server-only";
import { NextResponse, type NextRequest } from "next/server";
import type { ZodType } from "zod";
import { db } from "@/lib/db";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendLeadConfirmation, sendLeadNotification, type LeadNotification } from "@/lib/email";
import { isValidSubmissionTimestamp } from "@/lib/utils";
import { contactSchema, quoteSchema, type ContactLead, type QuoteLead } from "@/lib/validators";
import { optionLabel } from "@/content/lead-options";
import type { Attribution } from "@/lib/leads/attribution";

const noStore = { "Cache-Control": "no-store" };
const MAX_BODY_BYTES = 64_000;

function attributionColumns(a?: Attribution) {
  return {
    utmSource: a?.utmSource,
    utmMedium: a?.utmMedium,
    utmCampaign: a?.utmCampaign,
    utmContent: a?.utmContent,
    utmTerm: a?.utmTerm,
    landingPage: a?.landingPage,
    referrer: a?.referrer,
  };
}

interface LeadHandler<T> {
  schema: ZodType<T & { _honey?: string; _ts?: string | number }>;
  persist: (lead: T) => Promise<unknown>;
  notification: (lead: T) => Omit<LeadNotification, "persisted">;
}

const handlers = {
  contact: {
    schema: contactSchema,
    persist: (l: ContactLead) =>
      db.contactSubmission.create({
        data: {
          name: l.name,
          email: l.email,
          phone: l.phone,
          company: l.company,
          // Legacy column — keep a readable subject for existing views/exports.
          subject: l.subject ?? optionLabel("service", l.service) ?? optionLabel("entryPoint", l.entryPoint),
          message: l.message,
          service: l.service,
          industry: l.industry,
          budget: l.budget,
          timeline: l.timeline,
          entryPoint: l.entryPoint,
          ...attributionColumns(l.attribution),
        },
      }),
    notification: (l: ContactLead) => ({
      kind: "contact" as const,
      name: l.name,
      email: l.email,
      company: l.company,
      phone: l.phone,
      subject: l.subject,
      message: l.message,
      service: l.service,
      industry: l.industry,
      budget: l.budget,
      timeline: l.timeline,
      entryPoint: l.entryPoint,
      attribution: l.attribution,
    }),
  } satisfies LeadHandler<ContactLead>,
  quote: {
    schema: quoteSchema,
    persist: (l: QuoteLead) =>
      db.quoteRequest.create({
        data: {
          name: l.name,
          email: l.email,
          phone: l.phone,
          company: l.company,
          // Stored as a readable title, consistent with existing rows.
          projectType: optionLabel("service", l.service),
          budget: optionLabel("budget", l.budget),
          timeline: optionLabel("timeline", l.timeline),
          description: l.description,
          hearAboutUs: l.hearAboutUs,
          industry: l.industry,
          entryPoint: l.entryPoint,
          ...attributionColumns(l.attribution),
        },
      }),
    notification: (l: QuoteLead) => ({
      kind: "quote" as const,
      name: l.name,
      email: l.email,
      company: l.company,
      phone: l.phone,
      message: l.description,
      service: l.service,
      industry: l.industry,
      budget: l.budget,
      timeline: l.timeline,
      entryPoint: l.entryPoint,
      attribution: l.attribution,
    }),
  } satisfies LeadHandler<QuoteLead>,
};

/**
 * Validates, persists and notifies for a public lead form.
 * Reliability: a database failure does not lose the lead if the notification email is
 * delivered; the visitor sees an error only when both fail.
 */
export async function handleLeadSubmission(req: NextRequest, kind: keyof typeof handlers) {
  const limit = await rateLimit("form", getClientIp(req.headers));
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a minute." },
      { status: 429, headers: { ...noStore, "Retry-After": String(Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000))) } }
    );
  }

  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413, headers: noStore });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400, headers: noStore });
  }

  const handler = handlers[kind] as LeadHandler<ContactLead | QuoteLead>;
  const parsed = handler.schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed.", issues: parsed.error.flatten() },
      { status: 422, headers: noStore }
    );
  }

  const { _honey, _ts, ...lead } = parsed.data;
  if (_honey) return NextResponse.json({ ok: true }, { headers: noStore }); // silently drop bots
  if (_ts !== undefined && !isValidSubmissionTimestamp(_ts)) {
    return NextResponse.json(
      { error: "The form expired or was submitted too quickly. Please reload the page and try again." },
      { status: 400, headers: noStore }
    );
  }

  let persisted = false;
  try {
    await handler.persist(lead as ContactLead & QuoteLead);
    persisted = true;
  } catch (error) {
    // Never log the submission itself (personal data).
    console.error(`[leads] failed to persist ${kind} lead:`, error instanceof Error ? error.message : "unknown");
  }

  const notified = await sendLeadNotification({ ...handler.notification(lead as ContactLead & QuoteLead), persisted });

  if (!persisted && !notified) {
    return NextResponse.json(
      { error: "We couldn't send your message right now." },
      { status: 503, headers: noStore }
    );
  }

  await sendLeadConfirmation(lead.email, lead.name);
  return NextResponse.json({ ok: true }, { headers: noStore });
}
