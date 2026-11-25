import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Users, AlertTriangle } from "lucide-react";
import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { FaqList } from "@/components/marketing/faq-list";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICE_PAGES, getService, serviceHref } from "@/content/services";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { caseStudiesForService } from "@/lib/content/case-study-model";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";

export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.href) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    canonicalPath: `/services/${service.slug}`,
    ogType: "Service",
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service || service.href) notFound();

  const related = service.related.map(getService).filter((s) => s !== undefined);
  const caseStudies = caseStudiesForService(await getPublishedCaseStudies(), service.slug).slice(0, 3);
  const quoteHref = `/contact?service=${service.slug}`;

  return (
    <>
      <PageEventTracker eventName="service_view" params={{ service: service.slug }} />
      <JsonLd
        data={[
          serviceJsonLd(service),
          breadcrumbJsonLd([
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative border-b border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative container-page py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <TrackedLink
              href="/services"
              eventName="nav_click"
              params={{ label: "Back to services", location: `service_detail:${service.slug}`, destination: "/services" }}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)]"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" /> All services
            </TrackedLink>
          </nav>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
            <div>
              <ServiceIconTile name={service.icon} size="lg" />
              <h1 className="mt-6 text-heading-1 font-extrabold text-[var(--text-primary)]">{service.title}</h1>
              <p className="mt-3 text-lg font-medium text-[var(--text-brand)]">{service.tagline}</p>
              <p className="mt-5 text-lead text-[var(--text-secondary)] max-w-2xl">{service.description}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="gradient" size="lg">
                  <TrackedLink
                    href={quoteHref}
                    eventName="cta_click"
                    params={{ label: "Discuss Your Project", location: `service_detail:${service.slug}:hero`, destination: quoteHref }}
                  >
                    Discuss Your Project <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <TrackedLink
                    href="/case-studies"
                    eventName="cta_click"
                    params={{ label: "Explore Our Work", location: `service_detail:${service.slug}:hero`, destination: "/case-studies" }}
                  >
                    Explore Our Work
                  </TrackedLink>
                </Button>
              </div>
            </div>
            <FadeUp delay={0.1}>
              <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                  Capabilities
                </h2>
                <ul className="space-y-3">
                  {service.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-3 text-[var(--text-secondary)]">
                      <CheckCircle2 aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Audience & problems */}
      <Section labelledBy="fit-heading">
        <SectionHeading id="fit-heading" eyebrow="Is this for you?" title="Who it's for and what it solves" />
        <div className="grid lg:grid-cols-2 gap-6">
          <FadeUp className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7">
            <h3 className="flex items-center gap-2 text-heading-3 font-semibold text-[var(--text-primary)]">
              <Users aria-hidden="true" className="w-5 h-5 text-[var(--text-brand)]" /> Who it&apos;s for
            </h3>
            <ul className="mt-5 space-y-3">
              {service.audience.map((a) => (
                <li key={a} className="flex gap-3 text-[var(--text-secondary)]">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp delay={0.1} className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7">
            <h3 className="flex items-center gap-2 text-heading-3 font-semibold text-[var(--text-primary)]">
              <AlertTriangle aria-hidden="true" className="w-5 h-5 text-[var(--text-brand)]" /> Problems we solve
            </h3>
            <ul className="mt-5 space-y-3">
              {service.problems.map((p) => (
                <li key={p} className="flex gap-3 text-[var(--text-secondary)]">
                  <span aria-hidden="true" className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-secondary)] shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </Section>

      {/* Solution & approach */}
      <Section muted labelledBy="approach-heading">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Our approach</Badge>
            <h2 id="approach-heading" className="text-heading-2 font-bold text-[var(--text-primary)]">
              How we&apos;d solve it
            </h2>
            <div className="mt-5 space-y-4 text-[var(--text-secondary)]">
              {service.solution.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </FadeUp>
          <StaggerContainer className="grid sm:grid-cols-2 gap-4 content-start">
            {service.approach.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                  <span className="font-mono text-sm font-semibold text-[var(--text-brand)]">0{i + 1}</span>
                  <h3 className="mt-1 font-semibold text-[var(--text-primary)]">{step.title}</h3>
                  <p className="mt-2 text-meta text-[var(--text-secondary)]">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </Section>

      {/* Use cases & deliverables */}
      <Section labelledBy="usecases-heading">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12">
          <div>
            <h2 id="usecases-heading" className="text-heading-2 font-bold text-[var(--text-primary)] mb-8">
              Typical use cases
            </h2>
            <StaggerContainer className="grid sm:grid-cols-2 gap-4">
              {service.useCases.map((u) => (
                <StaggerItem key={u.title}>
                  <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                    <h3 className="font-semibold text-[var(--text-primary)]">{u.title}</h3>
                    <p className="mt-2 text-meta text-[var(--text-secondary)]">{u.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <FadeUp>
            <h2 className="text-heading-2 font-bold text-[var(--text-primary)] mb-8">What you receive</h2>
            <ul className="space-y-3 rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <CheckCircle2 aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-success-text)]" />
                  {d}
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </Section>

      {/* Technologies */}
      <Section muted labelledBy="tech-heading">
        <SectionHeading
          id="tech-heading"
          eyebrow="Technologies"
          title="Tools we commonly use"
          description="Chosen per project for quality, cost, maintainability and your existing stack."
        />
        <ul className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {service.techStack.map((tech) => (
            <li
              key={tech}
              className="px-4 py-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] text-sm font-medium text-[var(--text-secondary)]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      {/* Related case studies */}
      {caseStudies.length > 0 && (
        <Section labelledBy="related-work-heading">
          <SectionHeading id="related-work-heading" eyebrow="Related work" title="Case studies" />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard study={study} location={`service_detail:${service.slug}`} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <Section muted={caseStudies.length > 0} labelledBy="service-faq-heading">
          <div className="max-w-3xl mx-auto">
            <SectionHeading id="service-faq-heading" eyebrow="FAQ" title={`${service.shortTitle} questions`} />
            <FaqList items={service.faqs} />
          </div>
        </Section>
      )}

      {/* Related services */}
      {related.length > 0 && (
        <Section labelledBy="related-services-heading">
          <h2 id="related-services-heading" className="text-heading-3 font-bold text-[var(--text-primary)] mb-6">
            Related services
          </h2>
          <ul className="grid md:grid-cols-3 gap-4">
            {related.map((s) => (
              <li key={s.slug}>
                <TrackedLink
                  href={serviceHref(s)}
                  eventName="service_card_click"
                  params={{ slug: s.slug, location: `service_detail:${service.slug}:related` }}
                  className="group flex items-start gap-4 h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 hover:border-[var(--brand-primary)]/40 transition-colors"
                >
                  <ServiceIconTile name={s.icon} size="sm" />
                  <span>
                    <span className="block font-semibold text-[var(--text-primary)] group-hover:text-[var(--text-brand)]">
                      {s.title}
                    </span>
                    <span className="block mt-1 text-meta text-[var(--text-secondary)]">{s.tagline}</span>
                  </span>
                </TrackedLink>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CtaBanner
        location={`service_detail:${service.slug}:final`}
        title={`Let's talk about your ${service.shortTitle.toLowerCase()} project`}
        primary={{ label: "Discuss Your Project", href: quoteHref }}
      />
    </>
  );
}
