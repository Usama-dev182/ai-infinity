import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, Code2, Brain, Zap, Star, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { SERVICES, STATS, PORTFOLIO, TESTIMONIALS, TECH_STACK_BADGES, PROCESS_STEPS, SITE, FAQ_ITEMS, CLIENT_LOGOS } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Infinity Labs – AI Integration & Full Stack Development Agency",
  description:
    "We build cutting-edge AI integrations, agentic AI systems, RAG pipelines, and full-stack web applications that help businesses scale and automate intelligently. Based in Pakistan, serving global clients.",
  keywords: [
    "AI integration services",
    "AI automation agency",
    "agentic AI development company",
    "full stack development company",
    "React TypeScript development",
    "Next.js agency",
    "LLM integration",
    "RAG system development",
    "AI-powered web applications",
    "custom software development Pakistan",
  ],
  canonicalPath: "/",
  ogImage: "/api/og?title=AI+Infinity+Labs&subtitle=Building+AI-Powered+Products+That+Matter",
});

const serviceIcons = { Code2, Brain, Zap };

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-bg)] via-[var(--surface-bg-subtle)] to-[var(--surface-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.08),transparent_60%)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <FadeUp>
                <Badge variant="gradient" className="mb-6 px-3 py-1 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-First Software Agency · Lahore, Pakistan
                </Badge>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] mb-6">
                  Building{" "}
                  <span className="gradient-text">AI-Powered</span>{" "}
                  Products That{" "}
                  <span className="gradient-text">Matter</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                  We craft enterprise-grade AI integrations, agentic workflows, and full-stack web
                  applications — using React, Next.js, Python, and cutting-edge LLM technology — that help
                  businesses scale and automate intelligently.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["AI Integrations", "Agentic AI", "Full Stack Dev", "RAG Systems"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full text-xs font-medium bg-[var(--surface-bg-muted)] text-[var(--text-secondary)] border border-[var(--surface-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="gradient" size="xl" className="group">
                    <Link href="/quote">
                      Request a Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <Link href="/case-studies">View Our Work</Link>
                  </Button>
                </div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="mt-10 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1">
                    Trusted by clients across 5+ countries on Upwork
                  </span>
                </div>
              </FadeUp>
            </div>

            {/* Right — floating glass cards */}
            <div className="hidden lg:block relative h-[520px]">
              <FadeUp delay={0.2}>
                <div className="absolute top-0 right-0 w-80 glass-card rounded-2xl p-6 glow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--text-primary)]">AI Integration</p>
                      <p className="text-xs text-[var(--text-muted)]">LLM · RAG · Agents</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {["OpenAI GPT-4o integrated", "RAG pipeline live", "Vector DB connected"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.35}>
                <div className="absolute top-52 left-0 w-72 glass-card rounded-2xl p-5">
                  <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Next.js", "TypeScript", "Python", "OpenAI", "LangChain"].map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border border-[var(--brand-primary)]/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeUp>

              <FadeUp delay={0.5}>
                <div className="absolute bottom-0 right-10 w-64 glass-card rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Project Delivery</p>
                    <span className="text-xs text-green-500 font-medium">✓ On time</span>
                  </div>
                  <div className="w-full bg-[var(--surface-bg-muted)] rounded-full h-2 mb-2">
                    <div className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full w-[92%]" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">92% on-time delivery rate</p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ──────────────────────────────────────────── */}
      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-4xl font-extrabold gradient-text mb-1">{stat.value}</p>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── SERVICES BENTO ─────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">What We Do</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Services Built for the{" "}
                <span className="gradient-text">AI Era</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                From pixel-perfect frontends to production-grade AI systems — we deliver end-to-end
                engineering excellence.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
              return (
                <StaggerItem key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="group block h-full">
                    <div className="glass-card h-full rounded-2xl p-7 border border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3 group-hover:gradient-text transition-all">
                        {service.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {service.techStack.slice(0, 4).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-[var(--brand-primary)] font-medium">
                        Learn more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TECH STACK ─────────────────────────────────────────── */}
      <section className="py-14 bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)] overflow-hidden">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-8">
              Technologies We Master
            </p>
          </FadeUp>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_STACK_BADGES.map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PORTFOLIO ──────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <Badge variant="gradient" className="mb-4">Case Studies</Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
                  Real Projects, <span className="gradient-text">Real Impact</span>
                </h2>
              </div>
              <Button asChild variant="outline">
                <Link href="/case-studies">
                  View All Work <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PORTFOLIO.filter((p) => p.featured).map((project) => (
              <StaggerItem key={project.slug}>
                <Card className="group h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40">
                  {/* Cover placeholder */}
                  <div className="h-48 bg-gradient-to-br from-[var(--brand-gradient-start)]/20 to-[var(--brand-gradient-end)]/20 flex items-center justify-center border-b border-[var(--surface-border)]">
                    <span className="text-2xl font-bold gradient-text">{project.title[0]}</span>
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 text-xs">{project.industry}</Badge>
                    <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2 group-hover:gradient-text transition-all">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.map((t) => (
                        <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                    <Link
                      href={`/case-studies/${project.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[var(--brand-primary)] hover:underline"
                    >
                      Read case study <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────────────────── */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">Our Process</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                How We <span className="gradient-text">Work</span>
              </h2>
              <p className="text-[var(--text-secondary)] text-lg">
                A structured, agile-driven process that keeps you informed at every step.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step) => (
              <StaggerItem key={step.step}>
                <div className="text-center lg:text-left">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center text-white font-bold text-sm mb-4 mx-auto lg:mx-0 shadow-md">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                What Clients <span className="gradient-text">Say</span>
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <StaggerItem key={t.id}>
                <div className="glass-card rounded-2xl p-7 h-full border border-[var(--surface-border)] hover:border-[var(--brand-primary)]/30 hover:shadow-lg transition-all">
                  <div className="flex gap-0.5 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6 italic">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">{t.author}</p>
                      <p className="text-xs text-[var(--text-muted)]">
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── CLIENT LOGO STRIP ──────────────────────────────────── */}
      <section className="py-12 bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <p className="text-center text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-8">
              Trusted by teams at
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
              {CLIENT_LOGOS.map((logo) => (
                <a
                  key={logo.name}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-1.5"
                  aria-label={logo.name}
                >
                  <span className="text-xl font-extrabold text-[var(--text-muted)] group-hover:text-[var(--brand-primary)] transition-colors tracking-tight">
                    {logo.name}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                    {logo.industry}
                  </span>
                </a>
              ))}
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xl font-extrabold text-[var(--text-muted)] tracking-tight">
                  + More
                </span>
                <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                  Global clients
                </span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-12">
              <Badge variant="gradient" className="mb-4">FAQ</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
                Questions We Get <span className="gradient-text">All the Time</span>
              </h2>
              <p className="text-[var(--text-secondary)]">
                Straight answers — no sales fluff.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="space-y-3">
            {FAQ_ITEMS.map((faq) => (
              <StaggerItem key={faq.question}>
                <details className="group glass-card rounded-xl border border-[var(--surface-border)] overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none select-none hover:bg-[var(--surface-bg-muted)]/50 transition-colors">
                    <span className="font-semibold text-[var(--text-primary)] text-sm leading-snug">
                      {faq.question}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 group-open:rotate-90" />
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <FadeUp>
            <p className="text-center text-sm text-[var(--text-muted)] mt-8">
              More questions?{" "}
              <Link href="/contact" className="text-[var(--brand-primary)] hover:underline font-medium">
                Just ask us directly →
              </Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] p-12 lg:p-20 text-center shadow-2xl glow">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
              <div className="relative">
                <Badge className="mb-6 bg-white/20 text-white border-white/30">
                  Let&apos;s Build Together
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
                  Have an AI or software project in mind?
                </h2>
                <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
                  Whether it&apos;s a full-stack web app, an LLM integration, or an autonomous AI workflow —
                  let&apos;s talk about what we can build together.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    asChild
                    size="xl"
                    className="bg-white text-[var(--brand-primary)] font-bold hover:bg-white/90 shadow-lg"
                  >
                    <Link href="/quote">
                      Request a Quote <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="xl"
                    variant="outline"
                    className="border-white/50 text-white hover:bg-white/10 hover:border-white"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
