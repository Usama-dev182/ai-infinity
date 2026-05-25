// Shared TypeScript types used across the application

import type { BlogPost, CaseStudy, JobPosting, ContactSubmission, QuoteRequest, CareerApplication, User, SiteSettings } from "@prisma/client";

// Re-export Prisma types for convenience
export type { BlogPost, CaseStudy, JobPosting, ContactSubmission, QuoteRequest, CareerApplication, User, SiteSettings };

// ─── API Response wrapper ─────────────────────────────────────────────────────

export type ApiResponse<T = void> =
  | { success: true; data: T; message?: string }
  | { success: false; error: string; details?: unknown };

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── Service content types (from site.ts) ────────────────────────────────────

export interface ServiceItem {
  slug: string;
  title: string;
  shortTitle: string;
  icon: string;
  tagline: string;
  description: string;
  keywords: string[];
  techStack: string[];
  features: string[];
}

export interface PortfolioItem {
  slug: string;
  title: string;
  client: string;
  industry: string;
  description: string;
  outcomes: { label: string; value: string; description: string }[];
  services: string[];
  techStack: string[];
  url?: string;
  featured: boolean;
}

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  avatar: string;
}

export interface StatItem {
  value: string;
  label: string;
}

// ─── Admin session extensions ─────────────────────────────────────────────────

export type UserRole = "ADMIN" | "EDITOR";

export interface AdminSession {
  user: {
    id: string;
    email: string;
    name?: string | null;
    role: UserRole;
  };
}
