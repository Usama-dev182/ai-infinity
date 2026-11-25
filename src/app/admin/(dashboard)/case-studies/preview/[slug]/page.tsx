import { notFound } from "next/navigation";
import { CaseStudyArticle } from "@/components/marketing/case-study-article";
import { getAllCaseStudiesForAdmin } from "@/lib/content/case-studies";
import { requireSession } from "@/lib/authz";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Authenticated preview — the only place draft case studies can be viewed. */
export default async function CaseStudyPreviewPage({ params }: Props) {
  await requireSession();
  const { slug } = await params;
  const study = (await getAllCaseStudiesForAdmin()).find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <div className="-m-6 lg:-m-8">
      <div
        role="status"
        className="sticky top-0 z-30 border-b border-amber-500/30 bg-amber-50 dark:bg-amber-950/60 px-6 py-3 text-sm text-[var(--color-warning-text)]"
      >
        <strong>Preview{study.status === "draft" ? " — draft, not public" : ""}.</strong> Unverified outcomes are hidden
        exactly as on the public site. Capability statuses marked &ldquo;to be confirmed&rdquo; must be confirmed by the
        owner before publishing.
      </div>
      <div className="bg-[var(--surface-bg)]">
        <CaseStudyArticle study={study} related={[]} />
      </div>
    </div>
  );
}
