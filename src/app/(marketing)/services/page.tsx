import type { Metadata } from "next";
import { ArrowRight, CheckCircle, ChevronRight, Code2, Brain, Zap } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { SERVICES } from "@/content/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Services – Full Stack Development, AI Integrations & AI Automation",
  description:
    "AI Infinity Labs offers full-stack web development, AI integrations with OpenAI/LangChain, and agentic AI automation. Build smarter products faster.",
  keywords: [
    "AI integration services agency",
    "full stack development services",
    "AI automation services",
    "agentic AI development",
    "LLM integration company",
    "React Next.js development services",
  ],
  canonicalPath: "/services",
});

const serviceIcons = { Code2, Brain, Zap };

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <div className="text-center max-w-4xl mx-auto">
              <Badge variant="gradient" className="mb-6">Our Services</Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
                Engineering Excellence for the{" "}
                <span className="gradient-text">Age of AI</span>
              </h1>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
                We specialise in three high-impact service areas — each backed by deep expertise, proven
                delivery, and a focus on measurable business outcomes.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {SERVICES.map((service, i) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons];
              const isEven = i % 2 === 0;
              return (
                <FadeUp key={service.slug} delay={i * 0.1}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-[var(--surface-border)] hover:border-[var(--brand-primary)]/30">
                    <CardContent className="p-0">
                      <div className={`grid lg:grid-cols-2 gap-0 ${isEven ? "" : "lg:flex-row-reverse"}`}>
                        {/* Content */}
                        <div className={`p-8 lg:p-12 ${isEven ? "order-1" : "order-1 lg:order-2"}`}>
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center mb-6 shadow-lg">
                            <Icon className="w-7 h-7 text-white" />
                          </div>
                          <Badge variant="gradient" className="mb-4 text-xs">{service.shortTitle}</Badge>
                          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
                            {service.title}
                          </h2>
                          <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                            {service.description}
                          </p>
                          <ul className="space-y-3 mb-8">
                            {service.features.map((f) => (
                              <li key={f} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <Button asChild variant="gradient">
                            <TrackedLink
                              href={`/services/${service.slug}`}
                              eventName="service_card_click"
                              params={{ slug: service.slug, location: "services_listing" }}
                            >
                              Learn More <ChevronRight className="w-4 h-4 ml-1" />
                            </TrackedLink>
                          </Button>
                        </div>

                        {/* Tech visual */}
                        <div className={`bg-gradient-to-br from-[var(--brand-gradient-start)]/10 to-[var(--brand-gradient-end)]/10 p-8 lg:p-12 flex flex-col justify-center ${isEven ? "order-2" : "order-2 lg:order-1"}`}>
                          <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                            Tech Stack
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {service.techStack.map((tech) => (
                              <Badge key={tech} variant="default" className="text-sm px-3 py-1">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <blockquote className="mt-8 border-l-4 border-[var(--brand-primary)] pl-4">
                            <p className="text-sm italic text-[var(--text-secondary)]">
                              &ldquo;{service.tagline}&rdquo;
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <FadeUp>
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8">
              Tell us about your project and we&apos;ll recommend the right approach.
            </p>
            <Button asChild variant="gradient" size="lg">
              <TrackedLink
                href="/quote"
                eventName="cta_click"
                params={{ label: "Start with a Free Consultation", location: "services_listing_cta", destination: "/quote" }}
              >
                Start with a Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
              </TrackedLink>
            </Button>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
