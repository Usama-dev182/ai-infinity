import Image from "next/image";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  Brain,
  Zap,
  Code2,
  Star,
  Clock,
  Calendar,
  Sparkles,
  Layers,
  Cpu,
  Server,
  GitBranch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { FOUNDER, SITE, VERIFIED_STATS } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Consulting – Strategy, Architecture & Hands-On Guidance | AI Infinity Labs",
  description:
    "Work directly with Usama Ali for 1-on-1 AI consulting. Get expert guidance on AI strategy, LLM architecture, agentic systems, and full-stack AI product development.",
  keywords: [
    "AI consulting services",
    "AI strategy consultant",
    "LLM architecture consulting",
    "agentic AI consultant",
    "AI product development consulting",
    "hire AI consultant",
    "full stack AI consulting",
  ],
  canonicalPath: "/consulting",
});

const consultingServices = [
  {
    icon: Brain,
    title: "AI Strategy & Roadmapping",
    description:
      "Cut through the AI hype. Get a clear, actionable plan for integrating AI into your product or business — prioritised by ROI and feasibility.",
    points: [
      "AI opportunity assessment for your business",
      "Build vs buy analysis for AI features",
      "LLM vendor selection (OpenAI, Cohere, Gemini, Mistral)",
      "6–12 month AI roadmap with milestones",
    ],
  },
  {
    icon: Layers,
    title: "Architecture Review & Design",
    description:
      "Get an expert second opinion on your AI or full-stack system design before you build — or audit what you've already built.",
    points: [
      "RAG pipeline and vector DB architecture",
      "Agent orchestration design (LangGraph, CrewAI, AutoGen)",
      "API and data layer design for AI workloads",
      "Scalability, cost, and reliability audit",
    ],
  },
  {
    icon: Zap,
    title: "Agentic AI & Automation",
    description:
      "Direct hands-on guidance to design and ship autonomous AI agents and business automation workflows — fast.",
    points: [
      "Multi-agent system design and implementation",
      "n8n / Make / Zapier AI workflow architecture",
      "Custom tool and API integration for agents",
      "Human-in-the-loop safety and fallback design",
    ],
  },
  {
    icon: Code2,
    title: "Code Review & Technical Mentorship",
    description:
      "Level up your team's AI and full-stack engineering skills with targeted code reviews, pair programming, and structured mentoring.",
    points: [
      "AI codebase review and refactoring guidance",
      "TypeScript / React / Next.js best practices",
      "Prompt engineering and LLM integration patterns",
      "Junior-to-senior developer mentoring sessions",
    ],
  },
  {
    icon: Cpu,
    title: "AI SaaS Product Advisory",
    description:
      "Building an AI SaaS? Get a strategic co-pilot to help you validate, architect, and launch a profitable AI product.",
    points: [
      "Idea validation and ICP alignment",
      "Tech stack selection and MVP scoping",
      "Monetisation model and pricing strategy",
      "Go-to-market and product positioning advice",
    ],
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    description:
      "Need a trusted engineer to build or extend your product? We design and ship production-grade full-stack applications — fast, clean, and maintainable.",
    points: [
      "React / Next.js frontend architecture & implementation",
      "Node.js / FastAPI backend and API design",
      "Database design, optimisation, and migrations",
      "CI/CD, cloud deployment, and performance tuning",
    ],
  },
  {
    icon: Server,
    title: "DevOps & Deployment",
    description:
      "Ship confidently and scale reliably. From containerisation to cloud infrastructure, we set up the pipelines and platforms your team needs to deploy fast and sleep soundly.",
    points: [
      "Docker & Kubernetes containerisation and orchestration",
      "CI/CD pipelines with GitHub Actions, GitLab CI, or Jenkins",
      "Cloud deployment on AWS, GCP, Azure, Vercel, or Railway",
      "Infrastructure as Code with Terraform or Pulumi",
    ],
  },
  {
    icon: GitBranch,
    title: "Agile & Project Delivery",
    description:
      "Move faster without the chaos. We embed agile practices that actually fit your team — no pointless ceremonies, just effective delivery rhythms.",
    points: [
      "Scrum and Kanban board setup (Jira, Linear, GitHub Projects)",
      "Sprint planning, backlog grooming, and retrospectives",
      "User story mapping and acceptance criteria workshops",
      "Agile transformation coaching for remote-first teams",
    ],
  },
  {
    icon: Star,
    title: "Team Training & Workshops",
    description:
      "Upskill your engineering or product team with a live, tailored workshop on AI development practices.",
    points: [
      "Custom AI/LLM workshops (2–4 hours)",
      "Hands-on labs: building RAG, agents, and automations",
      "AI product thinking for non-technical founders",
      "Remote or on-site delivery available",
    ],
  },
];

const engagementTypes = [
  {
    name: "Discovery Call",
    duration: "30 min",
    price: "Free",
    description:
      "Let's understand your challenge and see if we're a good fit. No commitment, no sales pitch.",
    features: [
      "Problem framing",
      "Initial recommendations",
      "Engagement scoping",
    ],
    cta: "Book Free Call",
    href: SITE.whatsapp,
    external: true,
    highlighted: false,
  },
  {
    name: "Expert Session",
    duration: "60–90 min",
    price: "Custom",
    description:
      "Focused, deep-dive session on a specific problem — architecture, strategy, or code.",
    features: [
      "Pre-session preparation",
      "Screen share & whiteboarding",
      "Written action plan delivered",
      "1 week async follow-up",
    ],
    cta: "Request a Session",
    href: "/contact",
    external: false,
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Ongoing Retainer",
    duration: "Monthly",
    price: "Custom",
    description:
      "Dedicated advisory time each month — for teams moving fast and needing consistent expert input.",
    features: [
      "Async Q&A (Slack / email)",
      "Weekly or bi-weekly calls",
      "Architecture & code reviews",
      "Priority response SLA",
    ],
    cta: "Let's Talk",
    href: "/contact",
    external: false,
    highlighted: false,
  },
];

const processSteps = [
  {
    step: "01",
    title: "Book a Free Call",
    description:
      "Start with a no-obligation 30-minute discovery call. We'll understand your problem, goals, and constraints.",
  },
  {
    step: "02",
    title: "Receive a Proposal",
    description:
      "Within 24 hours you'll receive a clear scope, engagement format, and any relevant preparation materials.",
  },
  {
    step: "03",
    title: "Deep-Dive Session",
    description:
      "We work through your challenge together — whiteboarding, reviewing, designing, or strategising in real time.",
  },
  {
    step: "04",
    title: "Action Plan Delivered",
    description:
      "You leave every session with concrete next steps, written recommendations, and optional follow-up support.",
  },
];

// Unverified: hidden until the owner confirms each quote is real and approved for publication.
const testimonials: { quote: string; author: string; company: string; verified: boolean }[] = [
  {
    quote:
      "Usama helped us go from a vague 'add AI' brief to a concrete RAG architecture shipped in 3 weeks. Genuinely one of the sharpest AI engineers I've worked with.",
    author: "Product Lead",
    company: "B2B SaaS, London",
    verified: false,
  },
  {
    quote:
      "The architecture review alone saved us from a six-figure mistake. The feedback was direct, actionable, and immediately applicable.",
    author: "CTO",
    company: "FinTech Startup",
    verified: false,
  },
  {
    quote:
      "Best investment we made all quarter. Our team went from 'AI-curious' to shipping agents in under a month after Usama's workshop.",
    author: "Engineering Manager",
    company: "E-commerce Platform",
    verified: false,
  },
];

export default function ConsultingPage() {
  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-bg-subtle)] via-[var(--surface-bg)] to-[var(--surface-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.08),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <FadeUp>
                <Badge variant="gradient" className="mb-6 inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  1-on-1 Expert Consulting
                </Badge>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">
                  Ship Smarter with{" "}
                  <span className="gradient-text">AI Expertise</span>{" "}
                  in Your Corner
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 max-w-xl">
                  Work directly with{" "}
                  <span className="text-[var(--text-primary)] font-semibold">{FOUNDER.name}</span> —
                  AI engineer and founder of AI Infinity Labs — for focused, high-impact consulting
                  on AI strategy, architecture, automation, and product development.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-3 mb-10">
                  {["AI Strategy", "LLM Architecture", "Agentic AI", "Code Review", "Team Training"].map((tag) => (
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
                  <TrackedAnchor
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="cta_click"
                    params={{ label: "Book Free Call", location: "consulting_hero" }}
                  >
                    <Button variant="gradient" size="xl" className="group">
                      Book a Free Discovery Call
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </TrackedAnchor>
                  <Button asChild variant="outline" size="xl">
                    <TrackedLink
                      href="/case-studies"
                      eventName="cta_click"
                      params={{ label: "See Case Studies", location: "consulting_hero" }}
                    >
                      See Case Studies
                    </TrackedLink>
                  </Button>
                </div>
              </FadeUp>
            </div>

            {/* Right — Founder card */}
            <FadeUp delay={0.3}>
              <div className="glass-card rounded-3xl border border-[var(--surface-border)] p-8 shadow-xl">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-cta-gradient p-0.5 flex-shrink-0 shadow-lg">
                    <div className="w-full h-full rounded-[10px] overflow-hidden">
                      <Image
                        src={FOUNDER.avatar}
                        alt={FOUNDER.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-primary)] text-lg">{FOUNDER.name}</p>
                    <p className="text-sm text-[var(--text-muted)]">{FOUNDER.title}</p>
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
                  {FOUNDER.bio}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {VERIFIED_STATS.map((s) => (
                    <div
                      key={s.label}
                      className="bg-[var(--surface-bg-muted)] rounded-xl p-4 text-center border border-[var(--surface-border)]"
                    >
                      <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF STRIP ─────────────────────────────────── */}
      <section className="py-6 border-y border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[var(--text-muted)]">
            {[
              "⚡ Rapid turnaround",
              "🌍 Remote, international clients",
              "🔒 NDA-friendly",
              "📅 Flexible scheduling",
            ].map((item) => (
              <span key={item} className="font-medium">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONSULTING AREAS ───────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">What I Help With</Badge>
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)] mb-4">
                Nine Areas Where I Can{" "}
                <span className="gradient-text">Move the Needle</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                From high-level strategy to hands-on architecture and code — focused engagements
                that produce real, measurable outcomes.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultingServices.map((svc) => {
              const Icon = svc.icon;
              return (
                <StaggerItem key={svc.title}>
                  <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-7 h-full hover:border-[var(--brand-primary)]/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-cta-gradient flex items-center justify-center mb-5 shadow-md group-hover:shadow-lg transition-shadow">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3">{svc.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                      {svc.description}
                    </p>
                    <ul className="space-y-2">
                      {svc.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-xs text-[var(--text-muted)]">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5 shrink-0" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── ENGAGEMENT TYPES ───────────────────────────────────── */}
      <section className="section-padding bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">Engagement Options</Badge>
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)] mb-4">
                Choose How We Work{" "}
                <span className="gradient-text">Together</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                Flexible formats to suit your timeline, budget, and the depth of challenge you&apos;re solving.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 items-start">
            {engagementTypes.map((tier) => (
              <StaggerItem key={tier.name}>
                <div
                  className={`relative rounded-2xl border p-8 h-full flex flex-col transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-cta-gradient border-transparent shadow-2xl scale-[1.02]"
                      : "glass-card border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40"
                  }`}
                >
                  {tier.badge && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-[var(--text-brand)] text-xs font-bold px-4 py-1 rounded-full shadow-md whitespace-nowrap">
                      {tier.badge}
                    </span>
                  )}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className={`w-4 h-4 ${tier.highlighted ? "text-white/70" : "text-[var(--text-muted)]"}`} />
                      <span className={`text-sm ${tier.highlighted ? "text-white/70" : "text-[var(--text-muted)]"}`}>
                        {tier.duration}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-extrabold mb-1 ${tier.highlighted ? "text-white" : "text-[var(--text-primary)]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-sm font-semibold mb-3 ${tier.highlighted ? "text-white/80" : "text-[var(--text-brand)]"}`}>
                      {tier.price}
                    </p>
                    <p className={`text-sm leading-relaxed ${tier.highlighted ? "text-white/80" : "text-[var(--text-secondary)]"}`}>
                      {tier.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm">
                        <CheckCircle className={`w-4 h-4 shrink-0 ${tier.highlighted ? "text-white/80" : "text-green-500"}`} />
                        <span className={tier.highlighted ? "text-white/90" : "text-[var(--text-secondary)]"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.external ? (
                    <TrackedAnchor
                      href={tier.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName="consulting_cta_click"
                      params={{ tier: tier.name, location: "consulting_tiers" }}
                    >
                      <Button
                        variant="gradient"
                        className="w-full"
                      >
                        {tier.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </TrackedAnchor>
                  ) : (
                    <Button
                      asChild
                      variant={tier.highlighted ? "outline" : "gradient"}
                      className={`w-full ${tier.highlighted ? "bg-white text-[var(--text-brand)] hover:bg-white/90 border-transparent font-semibold" : ""}`}
                    >
                      <TrackedLink
                        href={tier.href}
                        eventName="consulting_cta_click"
                        params={{ tier: tier.name, location: "consulting_tiers" }}
                      >
                        {tier.cta}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </TrackedLink>
                    </Button>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── PROCESS ────────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">How It Works</Badge>
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)] mb-4">
                From First Message to{" "}
                <span className="gradient-text">Clear Action Plan</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                A lightweight, no-nonsense process so you can move fast.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <StaggerItem key={step.step}>
                <div className="relative glass-card rounded-2xl border border-[var(--surface-border)] p-7 h-full hover:border-[var(--brand-primary)]/30 transition-all">
                  <span className="text-5xl font-extrabold text-[var(--text-brand)]/15 block mb-4 leading-none">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-3">{step.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight className="w-5 h-5 text-[var(--text-muted)]" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ─── TESTIMONIALS (verified only) ───────────────────────── */}
      {testimonials.some((t) => t.verified) && (
      <section className="section-padding bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge variant="gradient" className="mb-4">Client Feedback</Badge>
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)]">
                What Clients <span className="gradient-text">Say</span>
              </h2>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {testimonials.filter((t) => t.verified).map((t) => (
              <StaggerItem key={t.author}>
                <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-7 h-full hover:border-[var(--brand-primary)]/30 transition-all flex flex-col">
                  <div className="flex items-center gap-0.5 mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed italic mb-6 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)] text-sm">{t.author}</p>
                    <p className="text-xs text-[var(--text-muted)]">{t.company}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      )}

      {/* ─── BOTTOM CTA ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden bg-cta-gradient p-10 md:p-16 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
              <div className="relative">
                <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                  Book your first session
                </Badge>
                <h2 className="text-heading-2 font-extrabold text-white mb-4">
                  Ready to Move Faster?
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10">
                  Whether you need a one-off architecture review or an ongoing strategic partner,
                  start with a free 30-minute call — no commitment, no sales pitch.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <TrackedAnchor
                    href={SITE.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="consulting_cta_click"
                    params={{ label: "Book Free Call", location: "consulting_bottom_cta" }}
                  >
                    <Button
                      variant="outline"
                      size="xl"
                      className="bg-white text-[var(--text-brand)] hover:bg-white/90 border-transparent font-semibold"
                    >
                      <Calendar className="w-5 h-5 mr-2" />
                      Book Free Discovery Call
                    </Button>
                  </TrackedAnchor>
                  <Button
                    asChild
                    variant="outline"
                    size="xl"
                    className="border-white/40 text-white hover:bg-white/10 hover:border-white/70"
                  >
                    <TrackedLink
                      href="/contact"
                      eventName="consulting_cta_click"
                      params={{ label: "Send Message", location: "consulting_bottom_cta" }}
                    >
                      Send a Message
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </TrackedLink>
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
