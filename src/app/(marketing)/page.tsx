import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Calculator, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { FaqList } from "@/components/marketing/faq-list";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { IllustrativeWorkflow } from "@/components/marketing/illustrative-workflow";
import { AiSolutionAdvisor } from "@/components/marketing/ai-solution-advisor";
import {
  CREDENTIALS,
  FAQ_ITEMS,
  FOUNDER,
  PROCESS_STEPS,
  SITE,
  VERIFIED_TESTIMONIALS,
} from "@/content/site";
import { SERVICES, serviceHref } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/content/navigation";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { featuredCaseStudies } from "@/lib/content/case-study-model";
import { buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "AI Infinity Labs – AI Product Engineering & Intelligent Automation",
  description: SITE.description,
  keywords: [
    "AI product engineering",
    "custom AI SaaS development",
    "AI agent development",
    "applied AI engineering",
    "LLM integration services",
    "intelligent workflow automation",
    "conversational AI development",
  ],
  canonicalPath: "/",
});

const PROBLEMS = [
  {
    problem: "Leads wait hours for a reply, and sales time goes to contacts who aren't ready.",
    title: "Lead qualification",
    solution: "AI-assisted capture, scoring and routing, with drafted first responses and automatic CRM updates.",
    service: "ai-automation",
  },
  {
    problem: "Support teams answer the same questions repeatedly while urgent requests queue up.",
    title: "Customer support",
    solution: "Assistants grounded in your knowledge base that triage, draft replies and escalate to people.",
    service: "ai-agents",
  },
  {
    problem: "Hours lost each week copying data between CRM, email, spreadsheets and internal tools.",
    title: "Manual operations",
    solution: "Workflow automation with validation, alerts and an exception queue for edge cases.",
    service: "ai-automation",
  },
  {
    problem: "Invoices, forms and contracts are read and re-keyed by hand before anything can happen.",
    title: "Document processing",
    solution: "Extraction into validated structured data, with low-confidence items routed for review.",
    service: "ai-integrations",
  },
  {
    problem: "A promising AI product idea with no clear path from prototype to production.",
    title: "Building an AI SaaS product",
    solution: "Feasibility, prototyping and MVP engineering on an architecture you can keep scaling.",
    service: "ai-product-engineering",
  },
] as const;

const CAPABILITY_GROUPS = [
  { title: "AI & LLMs", items: ["OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "LlamaIndex", "pgvector"] },
  { title: "Agents & automation", items: ["OpenAI Agents SDK", "LangGraph", "PydanticAI", "Model Context Protocol", "n8n", "Make.com"] },
  { title: "Product engineering", items: ["React", "Next.js", "TypeScript", "Node.js", "Python", "FastAPI"] },
  { title: "Data & infrastructure", items: ["PostgreSQL", "Redis", "Prisma", "Docker", "Vercel", "AWS"] },
] as const;

export default async function HomePage() {
  const caseStudies = await getPublishedCaseStudies();
  const featured = featuredCaseStudies(caseStudies);
  const detailedIndustry = INDUSTRIES.find((i) => i.hasDetailPage);
  const otherIndustries = INDUSTRIES.filter((i) => !i.hasDetailPage);
  // Only verified/working profile URLs are defined (see SOCIAL_PROFILES).
  const founderProfile = FOUNDER.linkedin
    ? { label: "LinkedIn", href: FOUNDER.linkedin }
    : FOUNDER.github
      ? { label: "GitHub", href: FOUNDER.github }
      : undefined;

  return (
    <>
      {/* ─── 1. HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[var(--surface-border)]">
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]" />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_55%)]" />
        <div className="relative container-page pt-14 pb-16 lg:pt-24 lg:pb-24">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center">
            <div>
              <Badge variant="gradient" className="mb-6">
                {SITE.positioning}
              </Badge>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)]">
                Building <span className="gradient-text">AI-Powered</span> Products That Matter
              </h1>
              <p className="mt-6 text-lead text-[var(--text-secondary)] max-w-2xl">{SITE.description}</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="gradient" size="xl">
                  <TrackedLink
                    href={PRIMARY_CTA.href}
                    eventName="cta_click"
                    params={{ label: PRIMARY_CTA.label, location: "home_hero", destination: PRIMARY_CTA.href }}
                  >
                    {PRIMARY_CTA.label}
                    <ArrowRight aria-hidden="true" className="w-5 h-5" />
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <TrackedLink
                    href={SECONDARY_CTA.href}
                    eventName="cta_click"
                    params={{ label: SECONDARY_CTA.label, location: "home_hero", destination: SECONDARY_CTA.href }}
                  >
                    {SECONDARY_CTA.label}
                  </TrackedLink>
                </Button>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-meta text-[var(--text-secondary)]">
                {["Founder-led, senior engineering", "From prototype to production", "Industry-agnostic"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 aria-hidden="true" className="w-4 h-4 text-[var(--text-brand)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <FadeUp delay={0.1}>
              <IllustrativeWorkflow />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── 2. CREDIBILITY ─────────────────────────────────────── */}
      <section aria-labelledby="credibility-heading" className="border-b border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container-page py-10">
          <h2 id="credibility-heading" className="sr-only">
            Why teams work with us
          </h2>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CREDENTIALS.map((c) => {
              const external = c.href.startsWith("http");
              return (
                <StaggerItem key={c.title}>
                  <p className="font-semibold text-[var(--text-primary)]">{c.title}</p>
                  <p className="mt-1 text-meta text-[var(--text-secondary)]">{c.description}</p>
                  <TrackedLink
                    href={c.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    eventName="cta_click"
                    params={{ label: c.linkLabel, location: "home_credibility", destination: c.href }}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-brand)] hover:underline"
                  >
                    {c.linkLabel}
                    {external ? (
                      <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                    )}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </TrackedLink>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── 3. FEATURED WORK ───────────────────────────────────── */}
      {featured.length > 0 && (
        <Section labelledBy="work-heading">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SectionHeading
              id="work-heading"
              eyebrow="Featured work"
              title="Engineering we've shipped"
              description="Selected client platforms and systems. Each case study describes our role and the work itself."
              align="left"
              className="mb-0 lg:mb-0"
            />
            <Button asChild variant="outline" className="shrink-0">
              <TrackedLink
                href="/case-studies"
                eventName="cta_click"
                params={{ label: "All case studies", location: "home_work", destination: "/case-studies" }}
              >
                All case studies <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </TrackedLink>
            </Button>
          </div>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard study={study} location="home_featured" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {/* ─── 4. SERVICES ────────────────────────────────────────── */}
      <Section muted labelledBy="services-heading">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title={
            <>
              AI product engineering, <span className="gradient-text">end to end</span>
            </>
          }
          description="Six connected service areas — so the strategy, the AI and the software around it are designed by the same team."
        />
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug}>
              <TrackedLink
                href={serviceHref(service)}
                eventName="service_card_click"
                params={{ slug: service.slug, location: "home_services" }}
                className="group flex flex-col h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7 hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-[border-color,box-shadow]"
              >
                <ServiceIconTile name={service.icon} />
                <h3 className="mt-5 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--text-brand)] transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-meta text-[var(--text-secondary)] flex-1">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-brand)]">
                  Explore {service.shortTitle}
                  <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </TrackedLink>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ─── 5. PROBLEMS → SOLUTIONS ────────────────────────────── */}
      <Section labelledBy="problems-heading">
        <SectionHeading
          id="problems-heading"
          eyebrow="Business problems we solve"
          title="Start from the problem, not the model"
          description="The most valuable AI work usually removes a specific bottleneck. These are the ones we're asked about most."
        />
        <StaggerContainer className="grid lg:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {PROBLEMS.map((p) => {
            const service = SERVICES.find((s) => s.slug === p.service);
            return (
              <StaggerItem key={p.title} className="h-full">
                <article className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{p.title}</h3>
                  <dl className="mt-3 space-y-3 text-meta">
                    <div>
                      <dt className="font-medium text-[var(--text-muted)]">The problem</dt>
                      <dd className="text-[var(--text-secondary)]">{p.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-[var(--text-muted)]">How we approach it</dt>
                      <dd className="text-[var(--text-primary)]">{p.solution}</dd>
                    </div>
                  </dl>
                  {service && (
                    <TrackedLink
                      href={serviceHref(service)}
                      eventName="service_card_click"
                      params={{ slug: service.slug, location: "home_problems" }}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-brand)] hover:underline"
                    >
                      {service.title} <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                    </TrackedLink>
                  )}
                </article>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </Section>

      {/* ─── 6. INTERACTIVE AI EXPERIENCE ───────────────────────── */}
      <Section muted labelledBy="advisor-heading">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Try it</Badge>
            <h2 id="advisor-heading" className="text-heading-2 font-bold text-[var(--text-primary)]">
              Explore your AI opportunity in two minutes
            </h2>
            <p className="mt-4 text-lead text-[var(--text-secondary)]">
              Pick a challenge and talk it through with our AI Solution Advisor — a small, working example of the
              kind of guarded, context-aware assistant we build.
            </p>
            <ul className="mt-6 space-y-2 text-meta text-[var(--text-secondary)]">
              {[
                "Bounded conversation memory and input limits",
                "Prompt-injection guardrails and personal-data redaction",
                "Rate limiting and a graceful non-AI fallback",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                  {item}
                </li>
              ))}
            </ul>
            <TrackedLink
              href="/tools/ai-roi-calculator"
              eventName="cta_click"
              params={{ label: "ROI calculator", location: "home_interactive", destination: "/tools/ai-roi-calculator" }}
              className="group mt-8 flex items-center gap-4 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 hover:border-[var(--brand-primary)]/40 transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
                <Calculator aria-hidden="true" className="w-5 h-5 text-[var(--text-brand)]" />
              </span>
              <span>
                <span className="block font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-brand)]">
                  AI automation ROI calculator
                </span>
                <span className="block text-meta text-[var(--text-secondary)]">
                  Estimate hours saved, value and payback for a workflow.
                </span>
              </span>
              <ArrowRight aria-hidden="true" className="w-4 h-4 ml-auto text-[var(--text-brand)]" />
            </TrackedLink>
          </FadeUp>
          <FadeUp delay={0.1}>
            <AiSolutionAdvisor location="home_advisor" />
          </FadeUp>
        </div>
      </Section>

      {/* ─── 7. INDUSTRIES ──────────────────────────────────────── */}
      <Section labelledBy="industries-heading">
        <SectionHeading
          id="industries-heading"
          eyebrow="Industries"
          title="Industry-agnostic engineering, with real specialisation"
          description="The patterns behind AI products and automation transfer across sectors. Real estate and PropTech is where we have hands-on conversational AI experience."
        />
        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 max-w-6xl mx-auto">
          {detailedIndustry && (
            <FadeUp className="h-full">
              <TrackedLink
                href={`/industries/${detailedIndustry.slug}`}
                eventName="industry_card_click"
                params={{ slug: detailedIndustry.slug, location: "home_industries" }}
                className="group flex flex-col h-full rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--surface-card)] p-8 hover:shadow-lg transition-shadow"
              >
                <Badge variant="default" className="w-fit mb-4">Specialisation</Badge>
                <h3 className="text-heading-3 font-bold text-[var(--text-primary)]">{detailedIndustry.name}</h3>
                <p className="mt-3 text-[var(--text-secondary)] flex-1">{detailedIndustry.shortDescription}</p>
                <span className="mt-6 inline-flex items-center gap-1 font-medium text-[var(--text-brand)]">
                  Explore real estate AI
                  <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </TrackedLink>
            </FadeUp>
          )}
          <StaggerContainer className="grid gap-4">
            {otherIndustries.map((industry) => (
              <StaggerItem key={industry.slug}>
                <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
                  <h3 className="font-semibold text-[var(--text-primary)]">{industry.name}</h3>
                  <p className="mt-1 text-meta text-[var(--text-secondary)]">{industry.shortDescription}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      {/* ─── 7. PROCESS ─────────────────────────────────────────── */}
      <Section muted labelledBy="process-heading">
        <SectionHeading
          id="process-heading"
          eyebrow="How we deliver"
          title="An engineering process built to reduce risk early"
          description="We validate the hardest assumptions first, then build in short, visible iterations."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {PROCESS_STEPS.map((step) => (
            <StaggerItem key={step.step}>
              <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                <span className="font-mono text-sm font-semibold text-[var(--text-brand)]">{step.step}</span>
                <h3 className="mt-2 font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 text-meta text-[var(--text-secondary)]">{step.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ─── 8. TECHNICAL CAPABILITIES ──────────────────────────── */}
      <Section labelledBy="capabilities-heading">
        <SectionHeading
          id="capabilities-heading"
          eyebrow="Technical capabilities"
          title="Proven tools, chosen for the problem"
          description="We're model- and vendor-agnostic, and choose the simplest stack that meets your quality, cost and compliance needs."
        />
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAPABILITY_GROUPS.map((group) => (
            <StaggerItem key={group.title}>
              <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)] mb-4">{group.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant="secondary">{item}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* ─── 9. TESTIMONIALS (verified only) ────────────────────── */}
      {VERIFIED_TESTIMONIALS.length > 0 && (
        <Section labelledBy="testimonials-heading">
          <SectionHeading id="testimonials-heading" eyebrow="Client feedback" title="What clients say" />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFIED_TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <figure className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7">
                  <Quote aria-hidden="true" className="w-6 h-6 text-[var(--text-brand)] mb-4" />
                  <blockquote className="text-[var(--text-secondary)]">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption className="mt-5 text-meta">
                    <span className="font-semibold text-[var(--text-primary)]">{t.author}</span>
                    <span className="text-[var(--text-muted)]">
                      {" "}
                      — {t.title}, {t.company}
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {/* ─── 10. FOUNDER ────────────────────────────────────────── */}
      <Section muted labelledBy="founder-heading">
        <div className="grid md:grid-cols-[auto_1fr] gap-10 lg:gap-14 items-center max-w-5xl mx-auto">
          <FadeUp>
            <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-[var(--surface-border)] shadow-md mx-auto">
              <Image
                src={FOUNDER.avatar}
                alt={`Portrait of ${FOUNDER.name}`}
                width={224}
                height={288}
                sizes="(min-width: 640px) 224px, 192px"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Badge variant="gradient" className="mb-4">Who you&apos;ll work with</Badge>
            <h2 id="founder-heading" className="text-heading-2 font-bold text-[var(--text-primary)]">
              {FOUNDER.name}
            </h2>
            <p className="mt-1 font-medium text-[var(--text-brand)]">{FOUNDER.title}</p>
            <p className="mt-5 text-[var(--text-secondary)]">{FOUNDER.bio}</p>
            <p className="mt-4 text-[var(--text-secondary)]">
              Every engagement is led by a senior engineer, from the first discovery conversation to production.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <TrackedLink href="/about" eventName="cta_click" params={{ label: "About us", location: "home_founder", destination: "/about" }}>
                  About AI Infinity Labs
                </TrackedLink>
              </Button>
              {founderProfile && (
                <Button asChild variant="ghost">
                  <TrackedLink
                    href={founderProfile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="social_click"
                    params={{ label: founderProfile.label, location: "home_founder", destination: founderProfile.href }}
                  >
                    {founderProfile.label} <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </TrackedLink>
                </Button>
              )}
            </div>
          </FadeUp>
        </div>
      </Section>

      {/* ─── 11. FAQ ────────────────────────────────────────────── */}
      <Section labelledBy="faq-heading">
        <div className="max-w-3xl mx-auto">
          <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions we're often asked" />
          <FaqList items={FAQ_ITEMS} />
          <p className="mt-8 text-center text-[var(--text-secondary)]">
            Something else?{" "}
            <TrackedLink
              href="/contact"
              eventName="cta_click"
              params={{ label: "Ask us directly", location: "home_faq", destination: "/contact" }}
              className="font-medium text-[var(--text-brand)] hover:underline"
            >
              Ask us directly
            </TrackedLink>
          </p>
        </div>
      </Section>

      {/* ─── 12. FINAL CTA ──────────────────────────────────────── */}
      <CtaBanner location="home_final" />
    </>
  );
}
