import "server-only";
import type { LeadStage, Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { sourceLabel } from "@/lib/leads/attribution";
import type { LeadStageValue } from "@/content/lead-options";

export type LeadType = "contact" | "quote";

export interface LeadRecord {
  id: string;
  type: LeadType;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  summary: string;
  message: string;
  service: string | null;
  industry: string | null;
  budget: string | null;
  timeline: string | null;
  entryPoint: string | null;
  stage: LeadStageValue;
  adminNotes: string | null;
  source: string;
  utmMedium: string | null;
  utmCampaign: string | null;
  landingPage: string | null;
  referrer: string | null;
  createdAt: Date;
}

export interface LeadFilters {
  type?: LeadType;
  stage?: LeadStageValue;
  /** utm_source value, referrer host, or "direct". */
  source?: string;
  q?: string;
  /** 1-based page number. */
  page?: number;
}

export const LEADS_PAGE_SIZE = 50;
/** Offset paging merges two tables, so deep pages cost more; admin volumes keep this small. */
export const LEADS_MAX_PAGE = 100;

export interface LeadPage {
  leads: LeadRecord[];
  page: number;
  total: number;
  hasNext: boolean;
}

function searchWhere(q?: string) {
  if (!q) return {};
  const contains = { contains: q, mode: "insensitive" as const };
  return { OR: [{ name: contains }, { email: contains }, { company: contains }] };
}

function sourceWhere(source?: string) {
  if (!source) return {};
  if (source === "direct") return { utmSource: null, referrer: null };
  return { OR: [{ utmSource: { equals: source, mode: "insensitive" as const } }, { referrer: { contains: source } }] };
}

/**
 * Lists contact and quote leads as one pipeline, most recent first, one page at a time.
 * Both tables are read up to the end of the requested page and merged, which keeps the
 * ordering exact across lead types. Callers must enforce ADMIN authorization.
 */
export async function listLeads(filters: LeadFilters): Promise<LeadPage> {
  const page = Math.min(Math.max(1, Math.floor(filters.page ?? 1)), LEADS_MAX_PAGE);
  const skip = (page - 1) * LEADS_PAGE_SIZE;
  const take = skip + LEADS_PAGE_SIZE;
  const stage = filters.stage ? { stage: filters.stage as LeadStage } : {};
  const contactWhere: Prisma.ContactSubmissionWhereInput = {
    AND: [stage, searchWhere(filters.q), sourceWhere(filters.source)],
  };
  const quoteWhere: Prisma.QuoteRequestWhereInput = {
    AND: [stage, searchWhere(filters.q), sourceWhere(filters.source)],
  };

  const includeContacts = filters.type !== "quote";
  const includeQuotes = filters.type !== "contact";
  const orderBy = [{ createdAt: "desc" as const }, { id: "desc" as const }];

  const [contacts, quotes, contactTotal, quoteTotal] = await Promise.all([
    includeContacts ? db.contactSubmission.findMany({ where: contactWhere, orderBy, take }) : [],
    includeQuotes ? db.quoteRequest.findMany({ where: quoteWhere, orderBy, take }) : [],
    includeContacts ? db.contactSubmission.count({ where: contactWhere }) : 0,
    includeQuotes ? db.quoteRequest.count({ where: quoteWhere }) : 0,
  ]);

  const merged: LeadRecord[] = [
    ...contacts.map((c) => ({
      id: c.id,
      type: "contact" as const,
      name: c.name,
      email: c.email,
      company: c.company,
      phone: c.phone,
      summary: c.subject ?? "Contact enquiry",
      message: c.message,
      service: c.service,
      industry: c.industry,
      budget: c.budget,
      timeline: c.timeline,
      entryPoint: c.entryPoint,
      stage: c.stage,
      adminNotes: c.adminNotes,
      source: sourceLabel(c),
      utmMedium: c.utmMedium,
      utmCampaign: c.utmCampaign,
      landingPage: c.landingPage,
      referrer: c.referrer,
      createdAt: c.createdAt,
    })),
    ...quotes.map((q) => ({
      id: q.id,
      type: "quote" as const,
      name: q.name,
      email: q.email,
      company: q.company,
      phone: q.phone,
      summary: q.projectType ?? "Quote request",
      message: q.description,
      service: q.projectType,
      industry: q.industry,
      budget: q.budget,
      timeline: q.timeline,
      entryPoint: q.entryPoint,
      stage: q.stage,
      adminNotes: q.adminNotes,
      source: sourceLabel(q),
      utmMedium: q.utmMedium,
      utmCampaign: q.utmCampaign,
      landingPage: q.landingPage,
      referrer: q.referrer,
      createdAt: q.createdAt,
    })),
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime() || compareIds(b, a));

  const total = contactTotal + quoteTotal;
  return {
    leads: merged.slice(skip, take),
    page,
    total,
    hasNext: take < total && page < LEADS_MAX_PAGE,
  };
}

/** Stable tie-break for leads created in the same millisecond. */
function compareIds(a: LeadRecord, b: LeadRecord) {
  const ka = `${a.type}:${a.id}`;
  const kb = `${b.type}:${b.id}`;
  return ka < kb ? -1 : ka > kb ? 1 : 0;
}

/** Pipeline counts per stage across both lead types. */
export async function countLeadsByStage(): Promise<Record<LeadStageValue, number>> {
  const [contacts, quotes] = await Promise.all([
    db.contactSubmission.groupBy({ by: ["stage"], _count: { _all: true } }),
    db.quoteRequest.groupBy({ by: ["stage"], _count: { _all: true } }),
  ]);
  const totals = {} as Record<LeadStageValue, number>;
  for (const row of [...contacts, ...quotes]) {
    totals[row.stage] = (totals[row.stage] ?? 0) + row._count._all;
  }
  return totals;
}

/** Distinct sources seen in leads (for the filter dropdown). */
export async function listLeadSources(): Promise<string[]> {
  const [contacts, quotes] = await Promise.all([
    db.contactSubmission.findMany({ select: { utmSource: true, referrer: true }, take: 500, orderBy: { createdAt: "desc" } }),
    db.quoteRequest.findMany({ select: { utmSource: true, referrer: true }, take: 500, orderBy: { createdAt: "desc" } }),
  ]);
  return [...new Set([...contacts, ...quotes].map(sourceLabel))].sort();
}

export async function updateLeadStage(input: {
  id: string;
  type: LeadType;
  stage: LeadStageValue;
  adminNotes: string;
}) {
  const data = { stage: input.stage as LeadStage, adminNotes: input.adminNotes || null };
  if (input.type === "contact") {
    await db.contactSubmission.update({ where: { id: input.id }, data });
  } else {
    await db.quoteRequest.update({ where: { id: input.id }, data });
  }
}
