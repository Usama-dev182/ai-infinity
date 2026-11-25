import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Code2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/marketing/animation";
import { ContactForm } from "@/components/forms/ContactForm";
import { WhatsAppLink } from "@/components/marketing/whatsapp-link";
import { SITE } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact – AI Infinity Labs",
  description:
    "Get in touch with AI Infinity Labs. We respond to all enquiries within 24 hours.",
  canonicalPath: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <Badge variant="gradient" className="mb-4">Get in touch</Badge>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">
                Let&apos;s <span className="gradient-text">talk about</span> your project
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-10">
                Have a question, project idea, or want to explore a partnership?
                We respond to all enquiries within 24 hours.
              </p>

              <div className="space-y-4">
                <Link
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                    <Mail className="w-5 h-5 text-[var(--text-brand)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                    {SITE.email}
                  </span>
                </Link>
                <Link href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-[var(--text-brand)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">LinkedIn</span>
                </Link>
                <Link href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                  <Code2 className="w-5 h-5 text-[var(--text-brand)]" />
                </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">GitHub</span>
                </Link>
                <Link href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                    <ExternalLink className="w-5 h-5 text-[var(--text-brand)]" />
                  </div>
                  <span className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Upwork</span>
                </Link>
                <WhatsAppLink />
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-8">
                <ContactForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
