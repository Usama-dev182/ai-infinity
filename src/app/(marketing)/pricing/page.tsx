import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, Code2, Brain, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { SITE } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Pricing & Engagement Models",
  description:
    "Transparent pricing and engagement models for AI development, full-stack engineering, and consulting. Fixed-price projects, retainers, and time & materials — no surprises.",
  keywords: [
    "ai development pricing",
    "software development cost",
    "ai integration cost",
    "hire ai developer",
    "development agency pricing",
  ],
  canonicalPath: "/pricing",
});

const engagementModels = [
  {
    icon: Zap,
    name: "Fixed-Price Project",
    tagline: "You know what you want. We deliver exactly that.",
    range: "From $1,500",
    description:
      "Defined scope, defined timeline, defined cost. Ideal for MVPs, specific feature builds, AI integrations, and automation systems with clear inputs and outputs.",
    includes: [
      "Detailed project proposal within 48 hours",
      "Milestone-based delivery with weekly updates",
      "30-day bug-fix warranty post-launch",
      "Full codebase with documentation handover",
      "1 revision round on each milestone",
    ],
    cta: "/quote",
    ctaLabel: "Get a Fixed-Price Quote",
    highlight: false,
  },
  {
    icon: Code2,
    name: "Monthly Retainer",
    tagline: "A dedicated senior engineer on your team, month-to-month.",
    range: "$2,000–$4,500 / month",
    description:
      "Rolling monthly engagements for ongoing product development, feature iteration, or AI system maintenance. Ideal for funded startups and growing product teams.",
    includes: [
      "Dedicated senior engineer (40 hrs/week or part-time)",
      "Slack access with same-day response during business hours",
      "Weekly demo and planning calls",
      "Priority turnaround on urgent requests",
      "No lock-in — cancel with 2 weeks' notice",
    ],
    cta: "/contact",
    ctaLabel: "Discuss a Retainer",
    highlight: true,
  },
  {
    icon: Brain,
    name: "Consulting & Advisory",
    tagline: "Expert guidance without the full-build commitment.",
    range: "From $50 / hour",
    description:
      "Architecture reviews, AI strategy sessions, technical due diligence, and team workshops. Billed hourly or as a day-rate engagement.",
    includes: [
      "Architecture and code review sessions",
      "AI strategy and roadmap workshops",
      "Technical due diligence for investors or acquirers",
      "Team upskilling workshops (half-day or full-day)",
      "Written recommendations delivered after each session",
    ],
    cta: "/consulting",
    ctaLabel: "View Consulting Services",
    highlight: false,
  },
];

const projectExamples = [
  {
    type: "AI Chatbot Integration",
    range: "$1,500–$4,000",
    timeline: "2–4 weeks",
    description: "Custom LLM-powered chatbot with RAG, knowledge base integration, and production guardrails.",
  },
  {
    type: "AI Automation Workflow",
    range: "$2,000–$6,000",
    timeline: "3–5 weeks",
    description: "Multi-step agentic automation system — email triage, document processing, CRM workflows, or custom business processes.",
  },
  {
    type: "SaaS MVP",
    range: "$4,000–$10,000",
    timeline: "5–8 weeks",
    description: "Full-stack Next.js SaaS with auth, billing, admin dashboard, and production deployment.",
  },
  {
    type: "RAG / Knowledge Base System",
    range: "$2,500–$7,000",
    timeline: "3–6 weeks",
    description: "Internal AI assistant with semantic search over your private documents, Slack/web UI, and citation engine.",
  },
  {
    type: "Landing Page / Marketing Site",
    range: "$800–$2,000",
    timeline: "1–2 weeks",
    description: "High-performance Next.js marketing site with CMS, animations, SEO, and OG image generation.",
  },
  {
    type: "Technical Architecture Review",
    range: "$400–$1,200",
    timeline: "3–5 days",
    description: "Expert review of your existing system with a written recommendation report and a summary call.",
  },
];

const guarantees = [
  "No upfront payment — we invoice at milestones",
  "Project proposal within 48 hours, no obligation",
  "NDA signed before any technical discussion",
  "30-day bug-fix warranty on all delivered code",
  "Full source code ownership transferred on delivery",
  "Clean documentation so your team can own what we build",
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="gradient" className="mb-4">Pricing</Badge>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">
                Transparent Pricing.{" "}
                <span className="gradient-text">No Surprises.</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                We offer three engagement models to fit how you work. Every project starts with a free
                30-minute scoping call and a written proposal — no commitment, no jargon.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Engagement models */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => {
              const Icon = model.icon;
              return (
                <StaggerItem key={model.name}>
                  <div
                    className={`h-full rounded-2xl border flex flex-col p-8 transition-all hover:shadow-xl ${
                      model.highlight
                        ? "bg-cta-gradient border-transparent text-white shadow-[0_0_60px_rgba(99,102,241,0.3)]"
                        : "glass-card border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40"
                    }`}
                  >
                    {model.highlight && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold w-fit mb-4">
                        <Star className="w-3 h-3 fill-white" /> Most Popular
                      </div>
                    )}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                        model.highlight ? "bg-white/20" : "bg-[var(--brand-primary)]/10"
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${model.highlight ? "text-white" : "text-[var(--text-brand)]"}`} />
                    </div>

                    <h2 className={`text-xl font-bold mb-1 ${model.highlight ? "text-white" : "text-[var(--text-primary)]"}`}>
                      {model.name}
                    </h2>
                    <p className={`text-sm mb-2 ${model.highlight ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                      {model.tagline}
                    </p>
                    <p className={`text-2xl font-extrabold mb-4 ${model.highlight ? "text-white" : "gradient-text"}`}>
                      {model.range}
                    </p>
                    <p className={`text-sm leading-relaxed mb-6 ${model.highlight ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
                      {model.description}
                    </p>

                    <ul className="space-y-2.5 mb-8 flex-1">
                      {model.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle
                            className={`w-4 h-4 mt-0.5 shrink-0 ${model.highlight ? "text-white/80" : "text-green-500"}`}
                          />
                          <span className={model.highlight ? "text-white/90" : "text-[var(--text-secondary)]"}>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      variant={model.highlight ? "secondary" : "gradient"}
                      size="lg"
                      className={`w-full ${model.highlight ? "bg-white text-[var(--text-brand)] hover:bg-white/90 font-bold" : ""}`}
                    >
                      <TrackedLink
                        href={model.cta}
                        eventName="cta_click"
                        params={{ label: model.ctaLabel, location: `pricing:${model.name}`, destination: model.cta }}
                      >
                        {model.ctaLabel} <ArrowRight className="w-4 h-4 ml-2" />
                      </TrackedLink>
                    </Button>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Project range examples */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge variant="gradient" className="mb-4">Indicative Ranges</Badge>
              <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-4">
                What Does a Typical Project Cost?
              </h2>
              <p className="text-[var(--text-secondary)]">
                Every project is scoped individually — but here are realistic ranges for common project types based
                on our recent work.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectExamples.map((ex) => (
              <StaggerItem key={ex.type}>
                <div className="glass-card rounded-xl border border-[var(--surface-border)] p-6 hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{ex.type}</h3>
                    <span className="text-xs text-[var(--text-brand)] font-bold whitespace-nowrap">{ex.range}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">{ex.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                    Typical timeline: {ex.timeline}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeUp>
            <p className="text-center text-sm text-[var(--text-muted)] mt-8">
              Ranges vary based on complexity, integrations, and design requirements. All projects receive a
              detailed written proposal before any work begins.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Guarantees / trust signals */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="glass-card rounded-3xl border border-[var(--surface-border)] p-10 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge variant="gradient" className="mb-4">Our Commitments</Badge>
                  <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-4">
                    What You Can Always{" "}
                    <span className="gradient-text">Count On</span>
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    We&apos;d rather turn down a project than do it badly. Every engagement comes with a set of
                    standard commitments — not in the fine print, just in how we work.
                  </p>
                </div>
                <ul className="space-y-3">
                  {guarantees.map((g) => (
                    <li key={g} className="flex items-start gap-3 text-sm">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-[var(--text-secondary)]">{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Ready to Start?</Badge>
            <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-4">
              Get a Proposal in <span className="gradient-text">48 Hours</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg mb-8">
              Tell us what you&apos;re building. We&apos;ll respond with a clear scope, timeline, and fixed price —
              no commitment needed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="gradient" size="xl">
                <Link href="/quote">
                  Request a Quote <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href={`mailto:${SITE.email}`}>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Email Us Directly
                </a>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
