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
}

const PAGE_SIZE = 100;

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
 * Lists contact and quote leads as one pipeline (most recent first, capped at PAGE_SIZE).
 * Callers must enforce ADMIN authorization.
 */
export async function listLeads(filters: LeadFilters): Promise<{ leads: LeadRecord[]; truncated: boolean }> {
  const stage = filters.stage ? { stage: filters.stage as LeadStage } : {};
  const contactWhere: Prisma.ContactSubmissionWhereInput = {
    AND: [stage, searchWhere(filters.q), sourceWhere(filters.source)],
  };
  const quoteWhere: Prisma.QuoteRequestWhereInput = {
    AND: [stage, searchWhere(filters.q), sourceWhere(filters.source)],
  };

  const [contacts, quotes] = await Promise.all([
    filters.type === "quote"
      ? []
      : db.contactSubmission.findMany({ where: contactWhere, orderBy: { createdAt: "desc" }, take: PAGE_SIZE + 1 }),
    filters.type === "contact"
      ? []
      : db.quoteRequest.findMany({ where: quoteWhere, orderBy: { createdAt: "desc" }, take: PAGE_SIZE + 1 }),
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
  ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return { leads: merged.slice(0, PAGE_SIZE), truncated: merged.length > PAGE_SIZE };
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
