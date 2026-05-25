import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { SERVICES, PORTFOLIO } from "@/content/site";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, jobs] = await Promise.all([
    db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } }).catch(() => []),
    db.jobPosting.findMany({ where: { status: "OPEN" }, select: { slug: true, updatedAt: true } }).catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.85 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/careers`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/quote`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = PORTFOLIO.map((p) => ({
    url: `${BASE}/case-studies/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((j) => ({
    url: `${BASE}/careers/${j.slug}`,
    lastModified: j.updatedAt,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes, ...jobRoutes];
}
