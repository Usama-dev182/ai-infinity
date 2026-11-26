import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Code2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { FOUNDER, SITE, VERIFIED_STATS } from "@/content/site";
import { FounderExpertise } from "@/components/marketing/founder-expertise";
import { SERVICES, serviceHref } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Founder-Led AI Product Engineering",
  description:
    "Meet the team behind AI Infinity Labs: a founder-led AI product engineering company building intelligent software, AI agents and automation for clients across industries.",
  keywords: [
    "AI software agency",
    "about AI Infinity Labs",
    "Usama Ali full stack engineer",
    "AI development company Pakistan",
  ],
  canonicalPath: "/about",
});

const values = [
  {
    title: "Engineering Excellence",
    description:
      "We write clean, tested, well-documented code. Code reviews, TypeScript everywhere, and CI/CD pipelines are non-negotiable.",
  },
  {
    title: "AI-First Mindset",
    description:
      "We don't bolt on AI as an afterthought. We architect systems from day one to embrace LLMs, embeddings, and autonomous agents.",
  },
  {
    title: "Transparent Communication",
    description:
      "No surprises. Weekly updates, shared roadmaps, and clear estimates keep you informed at every stage of the project.",
  },
  {
    title: "Outcome-Oriented",
    description:
      "We measure success by business impact — not lines of code. Every technical decision is tied back to your goals.",
  },
];

const experience = [
  {
    company: "eBrainX Solutions",
    role: "Senior Full Stack Engineer",
    period: "2022 – 2024",
    description:
      "Frontend architecture and React performance work for SaaS products.",
  },
  {
    company: "Techling Pvt",
    role: "Software Engineer",
    period: "2021 – 2022",
    description:
      "Built full-stack features for fintech and healthcare clients, integrating third-party APIs and payment gateways.",
  },
  {
    company: "AI Infinity Labs",
    role: "Founder & Lead Engineer",
    period: "2024 – Present",
    description:
      "Running an independent AI-focused agency delivering AI integrations, automation systems, and high-performance web apps.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">About Us</Badge>
            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6 max-w-3xl">
              A boutique agency that ships <span className="gradient-text">real AI products</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              AI Infinity Labs was founded with a single belief: small, elite teams outperform bloated agencies every time.
              We combine senior-level engineering craft with deep AI expertise to build products that actually work.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 divide-x divide-[var(--surface-border)] max-w-2xl mx-auto">
            {VERIFIED_STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="py-10 px-4 text-center">
                  <div className="text-4xl font-extrabold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              {/* w-fit: the "Available" tag is positioned against the photo, not the whole column. */}
              <div className="relative w-fit mx-auto lg:mx-0">
                <div className="w-72 h-96 rounded-2xl bg-cta-gradient p-0.5">
                  <div className="w-full h-full rounded-2xl bg-[var(--surface-bg)] overflow-hidden">
                    <Image
                      src={FOUNDER.avatar}
                      alt={FOUNDER.name}
                      width={288}
                      height={384}
                      className="w-full h-full object-cover object-top"
                      preload
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 glass-card rounded-xl px-4 py-2 border border-[var(--surface-border)] text-sm font-medium text-[var(--text-secondary)] hidden lg:block">
                  Available for new projects
                  <span className="ml-2 w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div>
                <Badge variant="secondary" className="mb-4">Founder</Badge>
                <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-2">{FOUNDER.name}</h2>
                <p className="text-[var(--text-brand)] font-semibold mb-5">{FOUNDER.title}</p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 text-lg">{FOUNDER.bio}</p>
                <FounderExpertise className="mb-6" />
                <div className="flex flex-wrap items-center gap-3">
                  {FOUNDER.github && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={FOUNDER.github} target="_blank" rel="noopener noreferrer">
                        <Code2 className="w-4 h-4 mr-2" /> GitHub
                      </Link>
                    </Button>
                  )}
                  {FOUNDER.linkedin && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={FOUNDER.linkedin} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> LinkedIn
                      </Link>
                    </Button>
                  )}
                  {SITE.upwork && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={SITE.upwork} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" /> Upwork
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-10 text-center">Experience</h2>
          </FadeUp>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-[var(--surface-border)]" aria-hidden="true" />
            <StaggerContainer className="space-y-10">
              {experience.map((exp, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-6 pl-14 relative">
                    <div className="absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-[var(--brand-primary)] bg-[var(--surface-bg)]" />
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-semibold text-[var(--text-primary)]">{exp.company}</h3>
                        <Badge variant="secondary" className="text-xs">{exp.period}</Badge>
                      </div>
                      <p className="text-[var(--text-brand)] text-sm mb-2">{exp.role}</p>
                      <p className="text-[var(--text-secondary)] text-sm">{exp.description}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <Badge variant="gradient" className="mb-4">Our Values</Badge>
              <h2 className="text-heading-2 font-bold text-[var(--text-primary)]">
                How we work, every single project
              </h2>
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="glass-card rounded-xl p-6 border border-[var(--surface-border)] h-full">
                  <h3 className="font-semibold text-[var(--text-primary)] mb-3">{v.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Services CTA */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-4">
                What we build
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Six connected service areas, from AI strategy to production software.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {SERVICES.map((s) => (
              <StaggerItem key={s.slug}>
                <Link href={serviceHref(s)} className="group block glass-card rounded-xl p-6 border border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40 transition-all">
                  <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-brand)] mb-2 transition-colors">{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{s.tagline}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <div className="text-center">
            <Button asChild variant="gradient" size="lg">
              <Link href="/contact">
                Discuss Your Project <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
