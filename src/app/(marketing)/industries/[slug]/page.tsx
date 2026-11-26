import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { Section, SectionHeading } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { FaqList } from "@/components/marketing/faq-list";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { INDUSTRY_PAGES, getIndustry } from "@/content/industries";
import { getService, serviceHref } from "@/content/services";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { caseStudiesForIndustry } from "@/lib/content/case-study-model";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 300;
export const dynamicParams = false;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry?.hasDetailPage || !industry.seo) return {};
  return buildMetadata({
    title: industry.seo.title,
    description: industry.seo.description,
    keywords: industry.seo.keywords,
    canonicalPath: `/industries/${industry.slug}`,
    ogType: "Industry",
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry?.hasDetailPage) notFound();

  const published = await getPublishedCaseStudies();
  const caseStudies = caseStudiesForIndustry(published, industry);
  const services = (industry.relatedServices ?? []).map(getService).filter((s) => s !== undefined);
  const contactHref = `/contact?industry=${industry.slug}`;
  const label = industry.audienceLabel ?? industry.name.toLowerCase();

  return (
    <>
      <PageEventTracker eventName="industry_view" params={{ industry: industry.slug }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ])}
      />

      <section className="relative border-b border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative container-page py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8">
            <TrackedLink
              href="/industries"
              eventName="nav_click"
              params={{ label: "All industries", location: `industry:${industry.slug}`, destination: "/industries" }}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)]"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" /> All industries
            </TrackedLink>
          </nav>
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--text-brand)]">{industry.name}</p>
            <h1 className="mt-3 text-heading-1 font-extrabold text-[var(--text-primary)]">{industry.heroTitle}</h1>
            <p className="mt-6 text-lead text-[var(--text-secondary)]">{industry.heroDescription}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="gradient" size="lg">
                <TrackedLink
                  href={contactHref}
                  eventName="cta_click"
                  params={{ label: "Discuss Your Project", location: `industry:${industry.slug}:hero`, destination: contactHref }}
                >
                  Discuss Your Project <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </TrackedLink>
              </Button>
              <Button asChild variant="outline" size="lg">
                <TrackedLink
                  href="#solutions"
                  eventName="cta_click"
                  params={{ label: "See solutions", location: `industry:${industry.slug}:hero`, destination: "#solutions" }}
                >
                  See solutions
                </TrackedLink>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {industry.challenges && (
        <Section labelledBy="challenges-heading">
          <SectionHeading
            id="challenges-heading"
            eyebrow="The challenge"
            title={`What slows ${label} teams down`}
            align="left"
          />
          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {industry.challenges.map((c) => (
              <StaggerItem key={c.title}>
                <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                  <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                  <p className="mt-2 text-[var(--text-secondary)]">{c.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {industry.solutions && (
        <Section muted id="solutions" labelledBy="solutions-heading">
          <SectionHeading
            id="solutions-heading"
            eyebrow="What we can build"
            title={`AI solutions for ${label}`}
            description="Potential solutions we design and engineer. Each one is scoped to your listings, tools and team, and they can be combined."
            align="left"
          />
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industry.solutions.map((s) => (
              <StaggerItem key={s.title}>
                <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                  <h3 className="font-semibold text-[var(--text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-meta text-[var(--text-secondary)]">{s.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      )}

      {industry.approach && (
        <Section labelledBy="industry-approach-heading">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <FadeUp>
              <h2 id="industry-approach-heading" className="text-heading-2 font-bold text-[var(--text-primary)]">
                How we approach {label} AI
              </h2>
              <ul className="mt-6 space-y-4">
                {industry.approach.map((step) => (
                  <li key={step} className="flex gap-3 text-[var(--text-secondary)]">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                    {step}
                  </li>
                ))}
              </ul>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2 className="text-heading-3 font-bold text-[var(--text-primary)] mb-4">Related services</h2>
              <ul className="grid gap-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <TrackedLink
                      href={serviceHref(s)}
                      eventName="service_card_click"
                      params={{ slug: s.slug, location: `industry:${industry.slug}` }}
                      className="group flex items-center gap-4 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 hover:border-[var(--brand-primary)]/40 transition-colors"
                    >
                      <ServiceIconTile name={s.icon} size="sm" />
                      <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--text-brand)]">{s.title}</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </Section>
      )}

      {caseStudies.length > 0 && (
        <Section muted labelledBy="industry-work-heading">
          <SectionHeading id="industry-work-heading" eyebrow="Case study" title="Related work" align="left" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study) => (
              <CaseStudyCard key={study.slug} study={study} location={`industry:${industry.slug}`} />
            ))}
          </div>
        </Section>
      )}

      {industry.faqs && (
        <Section labelledBy="industry-faq-heading">
          <div className="max-w-3xl mx-auto">
            <SectionHeading id="industry-faq-heading" eyebrow="FAQ" title={`Questions about ${label} AI`} />
            <FaqList items={industry.faqs} />
          </div>
        </Section>
      )}

      <CtaBanner
        location={`industry:${industry.slug}:final`}
        title={`Exploring AI for your ${label} business?`}
        description="Share your lead flow and the questions your team answers most. We'll suggest where conversational AI and automation could help first."
        primary={{ label: "Discuss Your Project", href: contactHref }}
      />
    </>
  );
}
