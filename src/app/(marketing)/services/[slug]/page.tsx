import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, ArrowLeft, Code2, Brain, Zap } from "lucide-react";
import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { SERVICES } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

const serviceIcons = { Code2, Brain, Zap };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return buildMetadata({
    title: `${service.title} – AI Infinity Labs`,
    description: service.description,
    keywords: service.keywords,
    canonicalPath: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <>
      <PageEventTracker eventName="service_view" params={{ service: service.slug }} />

      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
          </FadeUp>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center mb-6 shadow-xl">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <Badge variant="gradient" className="mb-4">{service.shortTitle}</Badge>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                  {service.title}
                </h1>
                <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild variant="gradient" size="lg">
                    <TrackedLink
                      href="/quote"
                      eventName="cta_click"
                      params={{ label: "Get a Quote", location: `service_detail:${service.slug}`, destination: "/quote" }}
                    >
                      Get a Quote <ArrowRight className="w-4 h-4 ml-2" />
                    </TrackedLink>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <TrackedLink
                      href="/contact"
                      eventName="cta_click"
                      params={{ label: "Talk to Us", location: `service_detail:${service.slug}`, destination: "/contact" }}
                    >
                      Talk to Us
                    </TrackedLink>
                  </Button>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="glass-card rounded-2xl p-8 border border-[var(--surface-border)]">
                <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-5">
                  What&apos;s included
                </p>
                <ul className="space-y-4">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Technology Stack</h2>
              <p className="text-[var(--text-secondary)]">
                We use the right tools for the job — modern, proven, and production-ready.
              </p>
            </div>
          </FadeUp>
          <StaggerContainer className="flex flex-wrap justify-center gap-3">
            {service.techStack.map((tech) => (
              <StaggerItem key={tech}>
                <div className="px-5 py-2.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] text-sm font-medium text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)] transition-colors">
                  {tech}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Keywords / SEO section */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <Badge variant="gradient" className="mb-6">Why Choose Us</Badge>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6">
              Senior-level expertise, <span className="gradient-text">startup speed</span>
            </h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-10">
              Our team brings 5+ years of hands-on engineering experience across global projects — delivering
              enterprise quality at pace. Every engagement comes with clear communication, code reviews, and
              results you can measure.
            </p>
            <Button asChild variant="gradient" size="lg">
              <TrackedLink
                href="/quote"
                eventName="cta_click"
                params={{ label: "Start Your Project", location: `service_detail:${service.slug}`, destination: "/quote" }}
              >
                Start Your Project
              </TrackedLink>
            </Button>
          </FadeUp>
        </div>
      </section>

      {/* Other services */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 text-center">
              Explore Other Services
            </h2>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherServices.map((s) => {
              const OtherIcon = serviceIcons[s.icon as keyof typeof serviceIcons];
              return (
                <StaggerItem key={s.slug}>
                  <TrackedLink
                    href={`/services/${s.slug}`}
                    className="group block"
                    eventName="service_card_click"
                    params={{ slug: s.slug, location: `service_detail:${service.slug}:other_services` }}
                  >
                    <div className="glass-card rounded-xl p-6 border border-[var(--surface-border)] hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center shrink-0">
                          <OtherIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[var(--text-primary)] group-hover:gradient-text mb-1 transition-all">
                            {s.title}
                          </h3>
                          <p className="text-sm text-[var(--text-secondary)]">{s.tagline}</p>
                        </div>
                      </div>
                    </div>
                  </TrackedLink>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
