// GA4 event helpers — call these from client components

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/** Track a custom GA4 event */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  gtag("event", eventName, params);
}

// ── Pre-built event helpers ───────────────────────────────────────────────────

/** Fired when the contact form is successfully submitted */
export function trackContactFormSubmit() {
  trackEvent("contact_form_submit", { category: "lead" });
}

/** Fired when the quote form is successfully submitted */
export function trackQuoteFormSubmit() {
  trackEvent("quote_form_submit", { category: "lead" });
}

/** Fired when a user clicks the WhatsApp link */
export function trackWhatsAppClick() {
  trackEvent("whatsapp_click", { category: "lead" });
}

/** Fired when a user clicks an email link */
export function trackEmailClick() {
  trackEvent("email_click", { category: "lead" });
}

/** Fired when a blog post is viewed (call with slug) */
export function trackBlogView(slug: string) {
  trackEvent("blog_view", { slug });
}

/** Fired when a service page is viewed */
export function trackServiceView(service: string) {
  trackEvent("service_view", { service });
}

/** Fired when a primary CTA button/link is clicked */
export function trackCtaClick(label: string, location: string, destination: string) {
  trackEvent("cta_click", {
    label,
    location,
    destination,
  });
}

/** Fired when a blog card is clicked from a listing surface */
export function trackBlogCardClick(slug: string, location: string) {
  trackEvent("blog_card_click", {
    slug,
    location,
  });
}

/** Fired when a service card is clicked from a listing surface */
export function trackServiceCardClick(slug: string, location: string) {
  trackEvent("service_card_click", {
    slug,
    location,
  });
}

/** Fired when a header or primary navigation item is clicked */
export function trackNavClick(label: string, location: string, destination: string) {
  trackEvent("nav_click", {
    label,
    location,
    destination,
  });
}

/** Fired when a footer social link is clicked */
export function trackSocialClick(label: string, location: string, destination: string) {
  trackEvent("social_click", {
    label,
    location,
    destination,
  });
}
