import type { Metadata } from "next";
import { Suspense } from "react";
import { CalendarClock, Mail, ExternalLink, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppLink } from "@/components/marketing/whatsapp-link";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/content/site";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Us — Discuss Your AI Project",
  description:
    "Tell us about your AI product, agent or automation idea. We reply within 1–2 business days with practical next steps, often a short discovery call.",
  canonicalPath: "/contact",
  ogType: "Contact",
});

const NEXT_STEPS = [
  { title: "We read your message", description: "A senior engineer reviews it and replies within 1–2 business days." },
  { title: "Short discovery call", description: "We clarify the problem, constraints and what success looks like." },
  { title: "Recommended next step", description: "A scoped proposal, a prototype plan, or honest advice if AI isn't the right fit." },
];

function FormFallback() {
  return (
    <div className="space-y-3 text-[var(--text-secondary)]" aria-busy="true">
      <p>Loading the contact form…</p>
      <p className="text-sm">
        If it doesn&apos;t appear, email us at{" "}
        <a href={`mailto:${SITE.email}`} className="text-[var(--text-brand)] underline underline-offset-2">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}

export default function ContactPage() {
  const contactLinks = [
    { href: `mailto:${SITE.email}`, label: SITE.email, icon: Mail, external: false },
    { href: SITE.linkedin, label: "LinkedIn", icon: ExternalLink, external: true },
    { href: SITE.upwork, label: "Upwork", icon: ExternalLink, external: true },
    { href: SITE.github, label: "GitHub", icon: Code2, external: true },
  ].filter((l): l is typeof l & { href: string } => Boolean(l.href));

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
      <section className="relative bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative container-page py-14 lg:py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
            <div>
              <Badge variant="gradient" className="mb-5">Discuss your project</Badge>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)]">
                Let&apos;s talk about <span className="gradient-text">what you&apos;re building</span>
              </h1>
              <p className="mt-6 text-lead text-[var(--text-secondary)]">
                Share the problem you want to solve. You&apos;ll hear back from an engineer, not a sales team.
              </p>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">What happens next</h2>
              <ol className="mt-4 space-y-4">
                {NEXT_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--brand-primary)]/10 text-[var(--text-brand)] font-semibold text-sm flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{step.title}</p>
                      <p className="text-meta text-[var(--text-secondary)]">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-10 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                <div className="flex items-start gap-3">
                  <CalendarClock aria-hidden="true" className="w-5 h-5 mt-0.5 text-[var(--text-brand)] shrink-0" />
                  <div>
                    <h2 className="font-semibold text-[var(--text-primary)]">Prefer a discovery call?</h2>
                    {SITE.bookingUrl ? (
                      <>
                        <p className="mt-1 text-meta text-[var(--text-secondary)]">
                          Pick a time that suits you for a free, no-obligation conversation.
                        </p>
                        <Button asChild variant="outline" size="sm" className="mt-4">
                          <TrackedAnchor
                            href={SITE.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            eventName="booking_click"
                            params={{ location: "contact_page" }}
                          >
                            Book a discovery call <span className="sr-only">(opens in a new tab)</span>
                          </TrackedAnchor>
                        </Button>
                      </>
                    ) : (
                      <p className="mt-1 text-meta text-[var(--text-secondary)]">
                        Mention it in your message and include your time zone — we&apos;ll reply with a few time options.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <h2 className="mt-10 text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Other ways to reach us</h2>
              <ul className="mt-4 space-y-3">
                {contactLinks.map(({ href, label, icon: Icon, external }) => (
                  <li key={label}>
                    <TrackedAnchor
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      eventName="social_click"
                      params={{ label: external ? label : "Email", location: "contact_page", destination: external ? href : "mailto" }}
                      className="flex items-center gap-4 group"
                    >
                      <span className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center">
                        <Icon aria-hidden="true" className="w-5 h-5 text-[var(--text-brand)]" />
                      </span>
                      <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] break-all">
                        {label}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </span>
                    </TrackedAnchor>
                  </li>
                ))}
                <li>
                  <WhatsAppLink />
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 sm:p-8 shadow-sm">
              <h2 className="text-heading-3 font-bold text-[var(--text-primary)] mb-6">Send us a message</h2>
              <Suspense fallback={<FormFallback />}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
