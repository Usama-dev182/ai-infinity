import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { CaseStudyCover } from "@/components/marketing/case-study-cover";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({
  study,
  location,
  headingLevel: Heading = "h3",
}: {
  study: Pick<CaseStudy, "slug" | "title" | "summary" | "industry" | "techStack" | "cover" | "projectType" | "engagement">;
  location: string;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <TrackedLink
      href={`/case-studies/${study.slug}`}
      eventName="case_study_card_click"
      params={{ slug: study.slug, location }}
      className="group flex flex-col h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] overflow-hidden hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-[border-color,box-shadow]"
    >
      <CaseStudyCover
        cover={study.cover}
        decorative
        sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
        className="border-b border-[var(--surface-border)]"
      />
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {study.industry && <Badge variant="secondary">{study.industry}</Badge>}
          {study.projectType && <span className="text-caption font-medium text-[var(--text-muted)]">{study.projectType}</span>}
        </div>
        <Heading className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-brand)] transition-colors">
          {study.title}
        </Heading>
        <p className="text-meta text-[var(--text-secondary)] line-clamp-3">{study.summary}</p>
        {study.engagement && <p className="mt-3 text-caption text-[var(--text-muted)]">{study.engagement}</p>}
        <div className="flex-1" />
        {study.techStack.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mt-4" aria-label="Technologies">
            {study.techStack.slice(0, 4).map((t) => (
              <li key={t}>
                <Badge variant="outline">{t}</Badge>
              </li>
            ))}
          </ul>
        )}
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--text-brand)]">
          Read case study
          <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </TrackedLink>
  );
}
