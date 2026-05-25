import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { PORTFOLIO } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case Studies – AI Infinity Labs",
  description:
    "Explore real-world projects delivered by AI Infinity Labs — AI integrations, full-stack web apps, and automation systems that moved the needle for our clients.",
  keywords: ["AI integration case studies", "full stack development portfolio", "web app case study"],
  canonicalPath: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <>
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Case Studies</Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-6 max-w-2xl leading-tight">
              Work that <span className="gradient-text">speaks for itself</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
              A selection of projects across AI integrations, full-stack applications, and automation workflows.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PORTFOLIO.map((project) => (
              <StaggerItem key={project.slug}>
                <Link href={`/case-studies/${project.slug}`} className="group block h-full">
                  <div className="glass-card rounded-2xl border border-[var(--surface-border)] overflow-hidden h-full hover:border-[var(--brand-primary)]/40 hover:shadow-xl transition-all">
                    <div className="h-48 bg-gradient-to-br from-[var(--brand-gradient-start)]/20 via-[var(--brand-gradient-end)]/10 to-transparent flex items-center justify-center">
                      <span className="text-5xl font-bold gradient-text">{project.title[0]}</span>
                    </div>
                    <div className="p-6">
                      <Badge variant="outline" className="mb-3 text-xs">{project.industry}</Badge>
                      <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:gradient-text mb-2 transition-all">
                        {project.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                        ))}
                        {project.techStack.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{project.techStack.length - 3}</Badge>
                        )}
                      </div>
                      <span className="inline-flex items-center text-sm font-medium text-[var(--brand-primary)] gap-1 group-hover:gap-2 transition-all">
                        Read case study <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-xl px-4 text-center">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Have a project in mind?</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              We&apos;re open to new collaborations. Tell us what you&apos;re building.
            </p>
            <Button asChild variant="gradient" size="lg">
              <Link href="/quote">Request a Quote <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
