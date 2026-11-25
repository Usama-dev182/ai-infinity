// Shared TypeScript types used across the application.

import type {
  BlogPost,
  CaseStudy as CaseStudyRow,
  JobPosting,
  ContactSubmission,
  QuoteRequest,
  CareerApplication,
  User,
  SiteSettings,
} from "@prisma/client";

// Prisma models (the DB case study row is aliased to avoid clashing with the content model).
export type { BlogPost, CaseStudyRow, JobPosting, ContactSubmission, QuoteRequest, CareerApplication, User, SiteSettings };

// Content models live next to their content.
export type { Service, ServiceIconName } from "@/content/services";
export type { CaseStudy, CaseStudyOutcome, CapabilityStatus, PublicationStatus } from "@/content/case-studies";
export type { Industry } from "@/content/industries";
export type { StatItem, TestimonialItem } from "@/content/site";

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

// ─── Admin session ────────────────────────────────────────────────────────────

export type { AppRole as UserRole, AppSessionUser } from "@/lib/authz";
