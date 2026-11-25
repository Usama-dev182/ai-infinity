// GA4 event helpers — call these from client components.
//
// Privacy rule: never send personal data or free text typed by visitors (names, emails,
// messages, advisor prompts, calculator amounts). Only send identifiers we control
// (slugs, option ids, buckets, form names).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/** Track a custom GA4 event (undefined params are dropped). */
export function trackEvent(eventName: string, params?: AnalyticsParams) {
  const clean = params
    ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined))
    : undefined;
  gtag("event", eventName, clean);
}

/** Event catalogue — keep in sync with docs/implementation-progress.md (Phase 9). */
export const EVENTS = {
  ctaClick: "cta_click",
  navClick: "nav_click",
  serviceView: "service_view",
  caseStudyView: "case_study_view",
  industryView: "industry_view",
  demoStarted: "demo_started",
  demoMessage: "demo_message",
  demoCompleted: "demo_completed",
  demoError: "demo_error",
  roiCalculated: "roi_calculator_used",
  consultationStarted: "consultation_started",
  leadSubmitted: "generate_lead",
  formError: "form_submit_error",
  bookingClick: "booking_click",
} as const;

export type LeadFormName = "contact" | "quote" | "career";

// ── Funnel helpers ────────────────────────────────────────────────────────────

/** First interaction with a lead form (fires once per page view per form). */
export function trackConsultationStarted(form: LeadFormName, location?: string) {
  trackEvent(EVENTS.consultationStarted, { form, location });
}

/** Successful lead submission. Uses GA4's recommended `generate_lead` event. */
export function trackLeadSubmitted(
  form: LeadFormName,
  params: { service?: string; industry?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string }
) {
  trackEvent(EVENTS.leadSubmitted, { form, ...params });
  // Kept for continuity with existing GA reports.
  if (form === "contact") trackEvent("contact_form_submit", { category: "lead" });
  if (form === "quote") trackEvent("quote_form_submit", { category: "lead" });
}

export type FormErrorReason = "validation" | "rate_limited" | "server" | "network";

export function trackFormError(form: LeadFormName, reason: FormErrorReason) {
  trackEvent(EVENTS.formError, { form, reason });
}

export function trackBookingClick(location: string) {
  trackEvent(EVENTS.bookingClick, { location });
}

// ── Pre-existing helpers (kept for compatibility) ─────────────────────────────

export function trackContactFormSubmit() {
  trackEvent("contact_form_submit", { category: "lead" });
}

export function trackQuoteFormSubmit() {
  trackEvent("quote_form_submit", { category: "lead" });
}

export function trackWhatsAppClick() {
  trackEvent("whatsapp_click", { category: "lead" });
}

export function trackEmailClick() {
  trackEvent("email_click", { category: "lead" });
}

export function trackBlogView(slug: string) {
  trackEvent("blog_view", { slug });
}

export function trackServiceView(service: string) {
  trackEvent(EVENTS.serviceView, { service });
}

export function trackCtaClick(label: string, location: string, destination: string) {
  trackEvent(EVENTS.ctaClick, { label, location, destination });
}

export function trackBlogCardClick(slug: string, location: string) {
  trackEvent("blog_card_click", { slug, location });
}

export function trackServiceCardClick(slug: string, location: string) {
  trackEvent("service_card_click", { slug, location });
}

export function trackNavClick(label: string, location: string, destination: string) {
  trackEvent(EVENTS.navClick, { label, location, destination });
}

export function trackSocialClick(label: string, location: string, destination: string) {
  trackEvent("social_click", { label, location, destination });
}
