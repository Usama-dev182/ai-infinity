import { z } from "zod";

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
  // honeypot
  _honey: z.string().max(0).optional(),
  // timestamp (ms since epoch)
  _ts: z.union([z.string(), z.number()]).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;

// ─── Quote Request ────────────────────────────────────────────────────────────

export const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(30, "Please describe your project in at least 30 characters").max(10000),
  hearAboutUs: z.string().optional(),
  _honey: z.string().max(0).optional(),
  _ts: z.union([z.string(), z.number()]).optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;

// ─── Career Application ───────────────────────────────────────────────────────

export const careerApplicationSchema = z.object({
  jobPostingId: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  coverLetter: z.string().min(30, "Please write at least 30 characters").max(5000),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  _honey: z.string().max(0).optional(),
  _ts: z.union([z.string(), z.number()]).optional(),
});

export type CareerApplicationFormData = z.infer<typeof careerApplicationSchema>;

// ─── Blog Post Admin ──────────────────────────────────────────────────────────

export const blogPostSchema = z.object({
  title: z.string().min(5).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().min(20).max(500),
  content: z.string().min(100),
  coverImage: z.string().url().optional().or(z.literal("")),
  author: z.string().default("Usama Ali"),
  category: z.string().default("General"),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  readTime: z.number().int().min(1).max(120).default(5),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  metaTitle: z.string().max(70).optional(),
  metaDescription: z.string().max(160).optional(),
  keywords: z.array(z.string()).default([]),
});

export type BlogPostFormData = z.infer<typeof blogPostSchema>;

// ─── Job Posting Admin ────────────────────────────────────────────────────────

export const jobPostingSchema = z.object({
  title: z.string().min(3).max(200),
  slug: z.string().min(3).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  department: z.string().min(2),
  level: z.enum(["Junior", "Mid", "Senior", "Lead"]),
  employmentType: z.enum(["Full-time", "Part-time", "Contract"]).default("Full-time"),
  location: z.string().default("Remote"),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  description: z.string().min(100),
  requirements: z.array(z.string()).default([]),
  niceToHave: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  status: z.enum(["OPEN", "CLOSED", "PAUSED"]).default("OPEN"),
});

export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
