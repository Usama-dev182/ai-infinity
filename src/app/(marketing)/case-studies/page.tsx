import type { Metadata } from "next";
import { StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { PageHero, Section } from "@/components/marketing/section";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — AI & Software Engineering Projects",
  description:
    "Engineering case studies from AI Infinity Labs: SaaS platforms, AI integrations and automation systems, with our role and the work described for each project.",
  keywords: ["AI case studies", "AI product engineering portfolio", "SaaS development case study"],
  canonicalPath: "/case-studies",
  ogType: "Case Studies",
});

export default async function CaseStudiesPage() {
  const studies = await getPublishedCaseStudies();

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Case Studies", path: "/case-studies" }])} />
      <PageHero
        eyebrow="Case studies"
        title={
          <>
            Engineering work, <span className="gradient-text">explained</span>
          </>
        }
        description="A selection of platforms, AI integrations and automation systems. Each case study describes our role and what we built."
      />

      <Section>
        {studies.length === 0 ? (
          <p className="text-center text-[var(--text-secondary)]">New case studies are being prepared. Please check back soon.</p>
        ) : (
          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studies.map((study) => (
              <StaggerItem key={study.slug}>
                <CaseStudyCard study={study} location="case_studies_index" headingLevel="h2" />
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </Section>

      <CtaBanner location="case_studies_index_cta" title="Have a project in mind?" />
    </>
  );
}
