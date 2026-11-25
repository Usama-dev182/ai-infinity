import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { CaseStudy } from "@/content/case-studies";

export function CaseStudyCard({
  study,
  location,
  headingLevel: Heading = "h3",
}: {
  study: Pick<CaseStudy, "slug" | "title" | "summary" | "industry" | "techStack">;
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
      <div
        aria-hidden="true"
        className="h-36 bg-gradient-to-br from-[var(--brand-gradient-start)]/15 via-[var(--brand-accent)]/10 to-[var(--brand-gradient-end)]/15 flex items-center justify-center border-b border-[var(--surface-border)]"
      >
        <span className="text-4xl font-bold gradient-text">{study.title[0]}</span>
      </div>
      <div className="flex flex-col flex-1 p-6">
        {study.industry && (
          <Badge variant="secondary" className="mb-3 w-fit">
            {study.industry}
          </Badge>
        )}
        <Heading className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--text-brand)] transition-colors">
          {study.title}
        </Heading>
        <p className="text-meta text-[var(--text-secondary)] mb-4 flex-1">{study.summary}</p>
        <ul className="flex flex-wrap gap-1.5 mb-5" aria-label="Technologies">
          {study.techStack.slice(0, 4).map((t) => (
            <li key={t}>
              <Badge variant="outline">{t}</Badge>
            </li>
          ))}
        </ul>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-brand)]">
          Read case study
          <ArrowRight aria-hidden="true" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </TrackedLink>
  );
}
