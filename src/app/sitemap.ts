import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { SERVICE_PAGES } from "@/content/services";
import { INDUSTRY_PAGES } from "@/content/industries";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com";

// Regenerate hourly so newly published posts, jobs and case studies appear without a redeploy.
export const revalidate = 3600;

type Freq = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: Freq }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/industries", priority: 0.8, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.85, changeFrequency: "weekly" },
  { path: "/consulting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/quote", priority: 0.6, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/tech-talks", priority: 0.6, changeFrequency: "weekly" },
  { path: "/tools", priority: 0.6, changeFrequency: "monthly" },
  { path: "/tools/ai-solution-advisor", priority: 0.7, changeFrequency: "monthly" },
  { path: "/tools/ai-roi-calculator", priority: 0.7, changeFrequency: "monthly" },
  { path: "/products", priority: 0.5, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.5, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [posts, jobs, caseStudies] = await Promise.all([
    db.blogPost
      .findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } })
      .catch(() => []),
    db.jobPosting.findMany({ where: { status: "OPEN" }, select: { slug: true, updatedAt: true } }).catch(() => []),
    getPublishedCaseStudies(),
  ]);

  return [
    ...STATIC_ROUTES.map((r) => ({
      url: `${BASE}${r.path}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    })),
    ...SERVICE_PAGES.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...INDUSTRY_PAGES.map((i) => ({
      url: `${BASE}/industries/${i.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    // Drafts are excluded by getPublishedCaseStudies().
    ...caseStudies.map((c) => ({
      url: `${BASE}/case-studies/${c.slug}`,
      lastModified: c.updatedAt ?? now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...jobs.map((j) => ({
      url: `${BASE}/careers/${j.slug}`,
      lastModified: j.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
