import { Metadata } from "next";
import { absoluteUrl } from "./utils";

interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

export function buildMetadata(options: SeoOptions): Metadata {
  const { title, description, keywords, ogImage, canonicalPath, noIndex, type = "website" } = options;

  const canonical = canonicalPath ? absoluteUrl(canonicalPath) : undefined;
  const image = ogImage ?? absoluteUrl("/images/og-default.png");

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      type,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      siteName: "AI Infinity Labs",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// ─── JSON-LD Helpers ──────────────────────────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Infinity Labs",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo.png"),
    sameAs: [
      "https://www.linkedin.com/in/info-usama-ali/",
      "https://github.com/Usama-dev182",
      "https://www.upwork.com/freelancers/~012a332067f71fa1bd",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "infousamaali1@gmail.com",
      contactType: "customer service",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AI Infinity Labs",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/blog?q={search_term_string}") },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string | null;
  publishedAt?: Date | null;
  updatedAt: Date;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: post.coverImage ?? absoluteUrl("/images/og-default.png"),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "AI Infinity Labs",
      logo: { "@type": "ImageObject", url: absoluteUrl("/images/logo.png") },
    },
  };
}

export function jobPostingJsonLd(job: {
  title: string;
  description: string;
  slug: string;
  location: string;
  employmentType: string;
  publishedAt?: Date | null;
  closesAt?: Date | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.publishedAt?.toISOString() ?? new Date().toISOString(),
    validThrough: job.closesAt?.toISOString(),
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: "AI Infinity Labs",
      sameAs: absoluteUrl("/"),
    },
    jobLocation: {
      "@type": "Place",
      address: job.location === "Remote" ? { "@type": "PostalAddress", addressCountry: "PK" } : job.location,
    },
    url: absoluteUrl(`/careers/${job.slug}`),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
