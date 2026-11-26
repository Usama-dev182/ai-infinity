import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { PageHero, Section } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { SERVICE_AREAS_LABEL, SERVICES, serviceHref } from "@/content/services";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "AI Product Engineering, AI Agents & Automation Services",
  description:
    "AI product engineering, applied AI and LLM engineering, AI agents, intelligent business automation, full-stack engineering, and AI consulting — from idea to production.",
  keywords: [
    "AI product engineering services",
    "AI agent development",
    "LLM integration services",
    "intelligent workflow automation",
    "custom AI SaaS development",
    "full stack development services",
  ],
  canonicalPath: "/services",
  ogType: "Services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title={
          <>
            From AI idea to <span className="gradient-text">production system</span>
          </>
        }
        description={`${SERVICE_AREAS_LABEL} covering strategy, applied AI, agents, automation, frontend and the software foundation around them. Start with one, or combine them across a product's lifecycle.`}
      />

      <Section>
        <StaggerContainer className="flex flex-wrap justify-center gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.slug} className="w-full md:w-[calc((100%-1.5rem)/2)]">
              <article className="flex flex-col h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7 lg:p-8">
                <div className="flex items-start gap-4">
                  <ServiceIconTile name={service.icon} />
                  <div>
                    <h2 className="text-heading-3 font-bold text-[var(--text-primary)]">{service.title}</h2>
                    <p className="mt-1 text-meta text-[var(--text-muted)]">{service.tagline}</p>
                  </div>
                </div>
                <p className="mt-5 text-[var(--text-secondary)]">{service.description}</p>
                <ul className="mt-5 grid sm:grid-cols-2 gap-x-4 gap-y-2 flex-1">
                  {service.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-meta text-[var(--text-secondary)]">
                      <CheckCircle2 aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                      {c}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Button asChild variant="outline">
                    <TrackedLink
                      href={serviceHref(service)}
                      eventName="service_card_click"
                      params={{ slug: service.slug, location: "services_listing" }}
                    >
                      {service.href ? "Explore consulting" : `Explore ${service.shortTitle}`}
                      <ArrowRight aria-hidden="true" className="w-4 h-4" />
                    </TrackedLink>
                  </Button>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      <CtaBanner
        location="services_listing_cta"
        title="Not sure which service you need?"
        description="Describe the problem and we'll recommend an approach — including when a smaller, non-AI solution is the better choice."
      />
    </>
  );
}
