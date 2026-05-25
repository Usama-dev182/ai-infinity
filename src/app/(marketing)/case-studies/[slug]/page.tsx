import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { PORTFOLIO } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PORTFOLIO.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) return {};
  return buildMetadata({
    title: `${project.title} Case Study – AI Infinity Labs`,
    description: project.description,
    canonicalPath: `/case-studies/${project.slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = PORTFOLIO.find((p) => p.slug === slug);
  if (!project) notFound();

  const otherProjects = PORTFOLIO.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Case Studies
            </Link>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <Badge variant="outline" className="mb-4">{project.industry}</Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-[var(--text-secondary)] mb-8 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-4">
                {project.url && (
                  <Button asChild variant="gradient" size="lg">
                    <Link href={project.url} target="_blank" rel="noopener noreferrer">
                      Visit Live Site <ExternalLink className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                )}
                <Button asChild variant="outline" size="lg">
                  <Link href="/quote">Start Your Project <ArrowRight className="w-4 h-4 ml-2" /></Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="space-y-4">
                {/* Meta */}
                <div className="glass-card rounded-xl p-6 border border-[var(--surface-border)]">
                  <dl className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">Client</dt>
                      <dd className="text-sm text-[var(--text-primary)] font-medium">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-1">Industry</dt>
                      <dd className="text-sm text-[var(--text-primary)] font-medium">{project.industry}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-2">Services</dt>
                      <dd className="flex flex-wrap gap-2">
                        {project.services.map((s) => (
                          <Badge key={s} variant="gradient" className="text-xs">{s}</Badge>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Tech Stack */}
                <div className="glass-card rounded-xl p-6 border border-[var(--surface-border)]">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="section-padding border-y border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">Outcomes</h2>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.outcomes.map((o) => (
              <StaggerItem key={o.label}>
                <div className="glass-card rounded-xl p-6 border border-[var(--surface-border)] text-center">
                  <div className="text-3xl font-extrabold gradient-text mb-1">{o.value}</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">{o.label}</div>
                  <div className="text-xs text-[var(--text-muted)]">{o.description}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Challenge / Solution */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">What we built</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-lg">{project.description}</p>
            <ul className="space-y-3">
              {["Production-ready code with full TypeScript coverage",
                "Scalable architecture following industry best practices",
                "Performance optimised for Core Web Vitals",
                "Integrated CI/CD and automated tests"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-[var(--text-secondary)]">{item}</span>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* More case studies */}
      {otherProjects.length > 0 && (
        <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">More Case Studies</h2>
            </FadeUp>
            <StaggerContainer className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((p) => (
                <StaggerItem key={p.slug}>
                  <Link href={`/case-studies/${p.slug}`} className="group block glass-card rounded-xl p-6 border border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40 transition-all">
                    <Badge variant="outline" className="mb-3 text-xs">{p.industry}</Badge>
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover:gradient-text mb-2 transition-all">{p.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-3">{p.description}</p>
                    <span className="inline-flex items-center text-sm font-medium text-[var(--brand-primary)] gap-1 group-hover:gap-2 transition-all">
                      Read case study <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}
    </>
  );
}
