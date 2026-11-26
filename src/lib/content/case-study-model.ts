// Pure case-study logic (no I/O) — shared by the repository, pages and tests.

import type { CaseStudy, CaseStudyOutcome } from "@/content/case-studies";
import { SERVICES } from "@/content/services";

export type CaseStudySource = "code" | "database";
export type CaseStudyRecord = CaseStudy & { source: CaseStudySource; updatedAt?: Date };

/** Shape of the Prisma `CaseStudy` row fields we read. */
export interface DbCaseStudyRow {
  slug: string;
  title: string;
  description: string;
  content: string;
  clientName: string;
  clientIndustry: string | null;
  coverImage: string | null;
  services: string[];
  techStack: string[];
  outcomes: unknown;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  metaTitle: string | null;
  metaDescription: string | null;
  keywords: string[];
  updatedAt: Date;
}

// Service titles used before the catalogue was restructured.
const LEGACY_SERVICE_TITLES: Record<string, string> = {
  "full stack development": "full-stack-development",
  "ai integrations": "ai-integrations",
  "ai automation & agentic ai": "ai-automation",
};

/** Accepts a service slug or (current or legacy) title and returns a catalogue slug, if known. */
export function toServiceSlug(value: string): string | undefined {
  const key = value.trim().toLowerCase();
  const bySlugOrTitle = SERVICES.find((s) => s.slug === key || s.title.toLowerCase() === key);
  return bySlugOrTitle?.slug ?? LEGACY_SERVICE_TITLES[key];
}

function parseOutcomes(value: unknown): CaseStudyOutcome[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const o = item as Record<string, unknown>;
    if (typeof o.label !== "string" || typeof o.value !== "string") return [];
    return [
      {
        label: o.label,
        value: o.value,
        description: typeof o.description === "string" ? o.description : "",
        // Published DB entries are authored by an admin; an explicit `verified: false` hides an outcome.
        verified: o.verified !== false,
      },
    ];
  });
}

export function mapDbCaseStudy(row: DbCaseStudyRow): CaseStudyRecord {
  const paragraphs = row.content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    slug: row.slug,
    title: row.title,
    summary: row.description,
    client: row.clientName,
    industry: row.clientIndustry ?? "",
    status: row.status === "PUBLISHED" ? "published" : "draft",
    featured: row.featured,
    services: row.services.map(toServiceSlug).filter((s): s is string => Boolean(s)),
    techStack: row.techStack,
    overview: paragraphs.length ? paragraphs : undefined,
    outcomes: parseOutcomes(row.outcomes),
    cover: row.coverImage ? { src: row.coverImage, alt: `${row.title} cover image` } : null,
    seo: {
      title: row.metaTitle ?? undefined,
      description: row.metaDescription ?? undefined,
      keywords: row.keywords.length ? row.keywords : undefined,
    },
    source: "database",
    updatedAt: row.updatedAt,
  };
}

/** Code entries win on slug conflicts so existing URLs keep their reviewed content. */
export function mergeCaseStudies(code: CaseStudy[], database: CaseStudyRecord[]): CaseStudyRecord[] {
  const merged: CaseStudyRecord[] = code.map((c) => ({ ...c, source: "code" as const }));
  const seen = new Set(merged.map((c) => c.slug));
  for (const row of database) {
    if (!seen.has(row.slug)) {
      merged.push(row);
      seen.add(row.slug);
    }
  }
  return merged;
}

export const isPublished = (c: Pick<CaseStudy, "status">) => c.status === "published";

export function verifiedOutcomes(c: Pick<CaseStudy, "outcomes">) {
  return c.outcomes.filter((o) => o.verified);
}

export function caseStudiesForService<T extends Pick<CaseStudy, "services">>(list: T[], serviceSlug: string) {
  return list.filter((c) => c.services.includes(serviceSlug));
}

/** Homepage "Featured work": featured entries in content order. Pass published entries only. */
export function featuredCaseStudies<T extends Pick<CaseStudy, "featured">>(list: T[], limit = 3) {
  return list.filter((c) => c.featured).slice(0, limit);
}

/** Case studies for an industry page: explicitly related, or tagged with the industry. */
export function caseStudiesForIndustry<T extends Pick<CaseStudy, "slug" | "industrySlug">>(
  list: T[],
  industry: { slug: string; relatedCaseStudies?: string[] }
) {
  return list.filter((c) => industry.relatedCaseStudies?.includes(c.slug) || c.industrySlug === industry.slug);
}
