import type { Metadata } from "next";
import { absoluteUrl } from "./utils";
import { SITE } from "@/content/site";

const BRAND = SITE.name;

interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[];
  /** Absolute or root-relative image URL. Defaults to a generated branded image. */
  ogImage?: string;
  /** Eyebrow shown on the generated OG image, e.g. "Service" or "Case Study". */
  ogType?: string;
  canonicalPath?: string;
  noIndex?: boolean;
  type?: "website" | "article";
}

/**
 * Root layout applies the "%s | AI Infinity Labs" template. Titles that already contain the
 * brand are emitted as absolute so the brand never appears twice.
 */
export function resolveTitle(title: string): Metadata["title"] {
  return title.includes(BRAND) ? { absolute: title } : title;
}

/** Strips the brand suffix variants used in older titles ("… – AI Infinity Labs"). */
export function stripBrandSuffix(title: string) {
  return title.replace(/\s*[–|-]\s*AI Infinity Labs\s*$/i, "").trim();
}

/** URL of the generated Open Graph image for a page. */
export function ogImageUrl({ title, description, type }: { title: string; description?: string; type?: string }) {
  const params = new URLSearchParams({ title: stripBrandSuffix(title).slice(0, 110) });
  if (description) params.set("description", description.slice(0, 180));
  if (type) params.set("type", type.slice(0, 32));
  return `/api/og?${params.toString()}`;
}

export function buildMetadata(options: SeoOptions): Metadata {
  const { title, description, keywords, ogImage, ogType, canonicalPath, noIndex, type = "website" } = options;

  const canonical = canonicalPath ? absoluteUrl(canonicalPath) : undefined;
  const socialTitle = title.includes(BRAND) ? title : `${title} | ${BRAND}`;
  const image = ogImage ?? ogImageUrl({ title, description, type: ogType });

  return {
    title: resolveTitle(title),
    description,
    keywords: keywords?.join(", "),
    alternates: canonical ? { canonical } : undefined,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      type,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: socialTitle }],
      siteName: BRAND,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
      ...(SITE.xSite ? { site: SITE.xSite } : {}),
      ...(SITE.xCreator ? { creator: SITE.xCreator } : {}),
    },
  };
}

// ─── JSON-LD Helpers ──────────────────────────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: BRAND,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo.png"),
    slogan: SITE.tagline,
    description: SITE.description,
    founder: { "@type": "Person", name: "Usama Ali", url: absoluteUrl("/about") },
    sameAs: [SITE.linkedin, SITE.github, SITE.upwork, SITE.youtube],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE.email,
      contactType: "sales",
      url: absoluteUrl("/contact"),
    },
    knowsAbout: [
      "AI product engineering",
      "Large language model integration",
      "AI agents",
      "Retrieval-augmented generation",
      "Business process automation",
      "Full-stack web development",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: BRAND,
    url: absoluteUrl("/"),
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function serviceJsonLd(service: { title: string; description: string; slug: string; capabilities: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} capabilities`,
      itemListElement: service.capabilities.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
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
    image: post.coverImage ?? absoluteUrl(ogImageUrl({ title: post.title, type: "Article" })),
    datePublished: post.publishedAt?.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: BRAND,
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
      name: BRAND,
      sameAs: absoluteUrl("/"),
    },
    jobLocation: {
      "@type": "Place",
      address: job.location === "Remote" ? { "@type": "PostalAddress", addressCountry: "PK" } : job.location,
    },
    url: absoluteUrl(`/careers/${job.slug}`),
  };
}

/** Breadcrumbs from root-relative paths: [{ name: "Services", path: "/services" }, …]. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
