import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { CaseStudyArticle } from "@/components/marketing/case-study-article";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getPublishedCaseStudies,
  getPublishedCaseStudy,
  getStaticPublishedSlugs,
} from "@/lib/content/case-studies";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const revalidate = 300;
// Published database case studies are rendered on demand; drafts always 404.
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getStaticPublishedSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getPublishedCaseStudy(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.seo?.title ?? `${study.title} — Case Study`,
    description: study.seo?.description ?? study.summary,
    keywords: study.seo?.keywords,
    canonicalPath: `/case-studies/${study.slug}`,
    ogType: "Case Study",
    type: "article",
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const all = await getPublishedCaseStudies();
  const study = all.find((c) => c.slug === slug);
  if (!study) notFound();

  const related = all.filter((c) => c.slug !== slug).slice(0, 3);

  return (
    <>
      <PageEventTracker eventName="case_study_view" params={{ slug: study.slug }} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Case Studies", path: "/case-studies" },
          { name: study.title, path: `/case-studies/${study.slug}` },
        ])}
      />
      <CaseStudyArticle study={study} related={related} />
      <CtaBanner
        location={`case_study:${study.slug}:final`}
        title="Planning something similar?"
        description="Tell us what you're building. We'll share how we'd approach it and what we'd validate first."
      />
    </>
  );
}
