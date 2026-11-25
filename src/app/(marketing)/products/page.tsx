import type { Metadata } from "next";
import Link from "next/link";
import { Rocket, Bell, ArrowRight, Sparkles, Package, Cpu, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Products – AI Infinity Labs",
  description:
    "We're building a suite of AI-powered SaaS tools and developer products. Join the waitlist to be the first to know when we launch.",
  canonicalPath: "/products",
});

const UPCOMING_PRODUCTS = [
  {
    icon: Cpu,
    name: "AI Agent Builder",
    description:
      "A no-code / low-code platform to build, deploy, and monitor autonomous AI agents with custom tools, memory, and multi-step reasoning — without writing a single line of infrastructure code.",
    tags: ["Agentic AI", "No-Code", "LLM Orchestration"],
  },
  {
    icon: Layers,
    name: "RAG Toolkit",
    description:
      "A plug-and-play Retrieval-Augmented Generation toolkit that lets developers connect any data source — PDFs, databases, websites — to any LLM in minutes.",
    tags: ["RAG", "Developer Tool", "Open Source"],
  },
  {
    icon: Package,
    name: "InboxAI",
    description:
      "AI-powered email and CRM assistant that auto-drafts replies, summarises threads, extracts action items, and integrates with Gmail and Outlook.",
    tags: ["Productivity", "Email AI", "SaaS"],
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[var(--brand-primary)]/8 blur-[120px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-[var(--brand-accent)]/6 blur-[80px]" />
        </div>

        {/* Animated grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-24">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-[var(--brand-primary)]/30 text-[var(--text-brand)] text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Something exciting is coming
            </div>

            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6 leading-[1.1]">
              Our{" "}
              <span className="gradient-text">Products</span>
              <br />
              are in the Works
            </h1>

            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
              We&apos;re building a suite of AI-powered tools for developers and businesses.
              Real products that solve real problems — launching soon.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild variant="gradient" size="lg" className="gap-2 text-base px-8">
                <Link href="/contact">
                  <Bell className="w-4 h-4" />
                  Join the Waitlist
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-base">
                <Link href="/services">
                  Explore our Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </FadeUp>

          {/* Floating badge */}
          <FadeUp delay={0.3}>
            <div className="mt-16 inline-flex items-center gap-3 glass-card rounded-2xl border border-[var(--surface-border)] px-6 py-4">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--brand-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--brand-primary)]" />
              </div>
              <p className="text-sm text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">Actively building</span>
                {" "}— early access available. <Link href="/contact" className="text-[var(--text-brand)] underline underline-offset-2">Join the waitlist</Link>.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Upcoming products preview */}
      <section className="py-24 bg-[var(--surface-bg)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-16">
              <Badge variant="gradient" className="mb-4">What&apos;s Coming</Badge>
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)] mb-4">
                A Sneak Peek
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Here&apos;s a glimpse of what we&apos;re building. Each product is designed to save hours of engineering work.
              </p>
            </div>
          </FadeUp>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {UPCOMING_PRODUCTS.map((product) => (
              <StaggerItem key={product.name}>
                <div className="relative group glass-card rounded-2xl border border-[var(--surface-border)] p-7 h-full flex flex-col hover:border-[var(--brand-primary)]/40 transition-all duration-300 hover:shadow-xl overflow-hidden">
                  {/* Coming soon ribbon */}
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                  </div>

                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                  <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center mb-5 group-hover:bg-[var(--brand-primary)]/20 transition-colors">
                    <product.icon className="w-6 h-6 text-[var(--text-brand)]" />
                  </div>

                  <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{product.name}</h3>
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed flex-1">{product.description}</p>

                  <div className="flex flex-wrap gap-2 mt-5">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-b from-[var(--surface-bg)] to-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <div className="glass-card rounded-3xl border border-[var(--surface-border)] p-12">
              <Rocket className="w-12 h-12 text-[var(--text-brand)] mx-auto mb-6" />
              <h2 className="text-heading-2 font-extrabold text-[var(--text-primary)] mb-4">
                Be the First to Know
              </h2>
              <p className="text-[var(--text-secondary)] mb-8 text-lg">
                Drop us a message and we&apos;ll notify you the moment our first product goes live.
                Early users get lifetime discounts.
              </p>
              <Button asChild variant="gradient" size="lg" className="gap-2 px-10 text-base">
                <Link href="/contact">
                  <Bell className="w-4 h-4" />
                  Get Early Access
                </Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
