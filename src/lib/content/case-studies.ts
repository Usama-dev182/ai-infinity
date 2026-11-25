import "server-only";
import { CASE_STUDIES } from "@/content/case-studies";
import { db } from "@/lib/db";
import {
  isPublished,
  mapDbCaseStudy,
  mergeCaseStudies,
  type CaseStudyRecord,
} from "@/lib/content/case-study-model";

/**
 * Case study repository: one entry point for every page that lists or renders case studies.
 * Merges code-managed entries (src/content/case-studies.ts) with database rows.
 * Database failures degrade to code-only content instead of breaking public pages.
 */
async function loadDatabaseCaseStudies(where?: { status: "PUBLISHED" }): Promise<CaseStudyRecord[]> {
  try {
    const rows = await db.caseStudy.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        slug: true,
        title: true,
        description: true,
        content: true,
        clientName: true,
        clientIndustry: true,
        coverImage: true,
        services: true,
        techStack: true,
        outcomes: true,
        featured: true,
        status: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true,
        updatedAt: true,
      },
    });
    return rows.map(mapDbCaseStudy);
  } catch {
    return [];
  }
}

/** Published case studies only — safe for public pages and the sitemap. */
export async function getPublishedCaseStudies(): Promise<CaseStudyRecord[]> {
  const database = await loadDatabaseCaseStudies({ status: "PUBLISHED" });
  return mergeCaseStudies(CASE_STUDIES, database).filter(isPublished);
}

export async function getPublishedCaseStudy(slug: string) {
  return (await getPublishedCaseStudies()).find((c) => c.slug === slug);
}

/** Every case study regardless of status — admin views only (callers must enforce auth). */
export async function getAllCaseStudiesForAdmin(): Promise<CaseStudyRecord[]> {
  const database = await loadDatabaseCaseStudies();
  return mergeCaseStudies(CASE_STUDIES, database);
}

/** Published slugs known at build time (code-managed) for static generation. */
export function getStaticPublishedSlugs() {
  return CASE_STUDIES.filter(isPublished).map((c) => c.slug);
}
