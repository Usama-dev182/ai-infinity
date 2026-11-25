import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { PageHero, Section } from "@/components/marketing/section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { INDUSTRIES } from "@/content/industries";
import { getService, serviceHref } from "@/content/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Industries — AI Solutions Across Sectors",
  description:
    "Industry-agnostic AI product engineering and automation, with a specialisation in real estate and PropTech conversational AI.",
  canonicalPath: "/industries",
  ogType: "Industries",
});

export default function IndustriesPage() {
  const detailed = INDUSTRIES.filter((i) => i.hasDetailPage);
  const others = INDUSTRIES.filter((i) => !i.hasDetailPage);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Industries", path: "/industries" }])} />
      <PageHero
        eyebrow="Industries"
        title={
          <>
            Engineering that transfers <span className="gradient-text">across industries</span>
          </>
        }
        description="AI products, agents and automation rely on the same engineering foundations in every sector. We add depth where we have hands-on experience, starting with real estate and PropTech."
      />

      <Section labelledBy="specialisations-heading">
        <h2 id="specialisations-heading" className="text-heading-2 font-bold text-[var(--text-primary)] mb-8">
          Specialisations
        </h2>
        <div className="grid gap-6">
          {detailed.map((industry) => (
            <FadeUp key={industry.slug}>
              <TrackedLink
                href={`/industries/${industry.slug}`}
                eventName="industry_card_click"
                params={{ slug: industry.slug, location: "industries_index" }}
                className="group grid md:grid-cols-[1fr_auto] gap-6 items-center rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--surface-card)] p-8 hover:shadow-lg transition-shadow"
              >
                <div>
                  <Badge variant="default" className="mb-3">Specialisation</Badge>
                  <h3 className="text-heading-3 font-bold text-[var(--text-primary)]">{industry.name}</h3>
                  <p className="mt-2 text-[var(--text-secondary)] max-w-2xl">{industry.shortDescription}</p>
                </div>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--text-brand)]">
                  Explore <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </TrackedLink>
            </FadeUp>
          ))}
        </div>
      </Section>

      <Section muted labelledBy="other-industries-heading">
        <h2 id="other-industries-heading" className="text-heading-2 font-bold text-[var(--text-primary)]">
          Other sectors we work with
        </h2>
        <p className="mt-3 mb-8 text-[var(--text-secondary)] max-w-2xl">
          These engagements typically start from a specific workflow or product idea. The services below are the usual
          starting points.
        </p>
        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {others.map((industry) => (
            <StaggerItem key={industry.slug} className="h-full">
              <div className="h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6">
                <h3 className="font-semibold text-[var(--text-primary)]">{industry.name}</h3>
                <p className="mt-2 text-meta text-[var(--text-secondary)]">{industry.shortDescription}</p>
                <ul className="mt-4 space-y-1.5">
                  {(industry.relatedServices ?? []).map((slug) => {
                    const s = getService(slug);
                    return s ? (
                      <li key={slug}>
                        <TrackedLink
                          href={serviceHref(s)}
                          eventName="service_card_click"
                          params={{ slug, location: `industries_index:${industry.slug}` }}
                          className="text-sm font-medium text-[var(--text-brand)] hover:underline"
                        >
                          {s.title}
                        </TrackedLink>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <CtaBanner
        location="industries_index_cta"
        title="Working in a different industry?"
        description="Tell us about the workflow or product you have in mind. We'll be honest about where AI can help and where it can't."
      />
    </>
  );
}
