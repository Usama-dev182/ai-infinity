import { z } from "zod";
import {
  BUDGET_OPTIONS,
  ENTRY_POINTS,
  LEAD_INDUSTRY_OPTIONS,
  LEAD_SERVICE_OPTIONS,
  LEAD_STAGES,
  TIMELINE_OPTIONS,
  type LeadStageValue,
} from "@/content/lead-options";
import { attributionSchema } from "@/lib/leads/attribution";

// ─── Shared lead fields ───────────────────────────────────────────────────────

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Empty string → undefined; otherwise must be one of the allowlisted values. */
const optionalChoice = (values: readonly string[]) =>
  z
    .union([z.literal(""), z.enum(values as [string, ...string[]])])
    .optional()
    .transform((v) => (v ? v : undefined));

// Values sent by the previous quote form (cached clients) → current option values.
const LEGACY_VALUES: Record<string, string> = {
  "Full Stack Development": "full-stack-development",
  "AI Integrations": "ai-integrations",
  "AI Automation & Agentic AI": "ai-automation",
  "Other / Not sure yet": "not-sure",
  "< $5,000": "under-5k",
  "$5,000 – $15,000": "5k-15k",
  "$15,000 – $50,000": "15k-50k",
  "$50,000+": "50k-plus",
  ASAP: "asap",
  "1–2 months": "1-2-months",
  "3–6 months": "3-6-months",
  "6+ months": "exploring",
};
const withLegacy = <T extends z.ZodType>(schema: T) =>
  z.preprocess((v) => (typeof v === "string" ? (LEGACY_VALUES[v] ?? v) : v), schema);

const serviceValues = LEAD_SERVICE_OPTIONS.map((o) => o.value);
const industryValues = LEAD_INDUSTRY_OPTIONS.map((o) => o.value);

const antiSpam = {
  // honeypot
  _honey: z.string().max(0).optional(),
  // render timestamp (ms since epoch)
  _ts: z.union([z.string(), z.number()]).optional(),
};

const leadQualification = {
  service: withLegacy(optionalChoice(serviceValues)),
  industry: optionalChoice(industryValues),
  budget: withLegacy(optionalChoice(BUDGET_OPTIONS.map((o) => o.value))),
  timeline: withLegacy(optionalChoice(TIMELINE_OPTIONS.map((o) => o.value))),
  entryPoint: optionalChoice(ENTRY_POINTS.map((o) => o.value)),
  // Attribution is best-effort: invalid data is dropped rather than rejecting the lead.
  attribution: attributionSchema.optional().catch(undefined),
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: optionalText(40),
  company: optionalText(150),
  subject: optionalText(200),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters)")
    .max(5000, "Please keep your message under 5,000 characters"),
  ...leadQualification,
  ...antiSpam,
});

export type ContactFormData = z.input<typeof contactSchema>;
export type ContactLead = z.output<typeof contactSchema>;

// ─── Quote Request ────────────────────────────────────────────────────────────

export const quoteSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(200),
  phone: optionalText(40),
  company: optionalText(150),
  description: z
    .string()
    .trim()
    .min(30, "Please describe your project in at least 30 characters")
    .max(10000),
  hearAboutUs: optionalText(200),
  ...leadQualification,
  ...antiSpam,
});

export type QuoteFormData = z.input<typeof quoteSchema>;
export type QuoteLead = z.output<typeof quoteSchema>;

// ─── Admin: lead pipeline update ──────────────────────────────────────────────

export const leadUpdateSchema = z.object({
  id: z.string().min(1).max(64),
  type: z.enum(["contact", "quote"]),
  stage: z.enum(LEAD_STAGES.map((s) => s.value) as [LeadStageValue, ...LeadStageValue[]]),
  adminNotes: z.string().max(5000).optional().default(""),
});

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

// ─── Client-side form schemas (UX validation only; the API re-validates strictly) ──

const formName = z.string().trim().min(2, "Please enter your name").max(100);
const formEmail = z.string().trim().email("Please enter a valid email address").max(200);

export const contactFormSchema = z.object({
  name: formName,
  email: formEmail,
  company: z.string().max(150, "Please shorten this"),
  service: z.string(),
  industry: z.string(),
  budget: z.string(),
  timeline: z.string(),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail (at least 20 characters)")
    .max(5000, "Please keep your message under 5,000 characters"),
  _honey: z.string(),
  _ts: z.number().optional(),
});
export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const quoteFormSchema = z.object({
  name: formName,
  email: formEmail,
  company: z.string().max(150, "Please shorten this"),
  service: z.string().min(1, "Please choose the closest option"),
  industry: z.string(),
  budget: z.string(),
  timeline: z.string(),
  description: z
    .string()
    .trim()
    .min(30, "Please describe your project in at least 30 characters")
    .max(10000),
  _honey: z.string(),
  _ts: z.number().optional(),
});
export type QuoteFormValues = z.infer<typeof quoteFormSchema>;
