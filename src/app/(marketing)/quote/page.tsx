import type { Metadata } from "next";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/marketing/animation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Request a Quote – AI Infinity Labs",
  description:
    "Tell us about your project and get a detailed proposal from AI Infinity Labs within 24–48 hours.",
  canonicalPath: "/quote",
});

const benefits = [
  "Detailed technical proposal within 48 hours",
  "Fixed-price or time & materials — your choice",
  "No commitment required to receive proposal",
  "Direct access to senior engineers from day one",
];

export default function QuotePage() {
  return (
    <>
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <Badge variant="gradient" className="mb-4">Request a Quote</Badge>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">
                Start your <span className="gradient-text">next project</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-10">
                Fill in the form and we&apos;ll get back to you with a detailed proposal — no obligation,
                no jargon.
              </p>

              <ul className="space-y-4">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="text-[var(--text-secondary)]">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 glass-card rounded-xl border border-[var(--surface-border)] p-5 flex items-start gap-4">
                <ArrowRight className="w-5 h-5 text-[var(--text-brand)] mt-0.5 shrink-0" />
                <p className="text-sm text-[var(--text-secondary)]">
                  Prefer a call? Email us at{" "}
                  <a href="mailto:infousamaali1@gmail.com" className="text-[var(--text-brand)] hover:underline">
                    infousamaali1@gmail.com
                  </a>{" "}
                  and we&apos;ll schedule a discovery call.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-8">
                <QuoteForm />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
