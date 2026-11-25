import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com";
  return {
    rules: [
      {
        userAgent: "*",
        // Social crawlers (e.g. X) honour robots.txt, so OG images must stay fetchable.
        allow: ["/", "/api/og"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
