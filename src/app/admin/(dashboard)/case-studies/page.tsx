import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getAllCaseStudiesForAdmin } from "@/lib/content/case-studies";
import { verifiedOutcomes } from "@/lib/content/case-study-model";
import { requireSession } from "@/lib/authz";

export const dynamic = "force-dynamic";

export default async function AdminCaseStudiesPage() {
  await requireSession();
  const studies = await getAllCaseStudiesForAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Case Studies</h1>
      <p className="text-[var(--text-secondary)] mb-6 max-w-3xl">
        Public pages combine code-managed case studies (<code className="text-xs">src/content/case-studies.ts</code>,
        reviewed through version control) with published database entries. Drafts are never public — use Preview to
        review them. Unverified outcomes are hidden on public pages.
      </p>

      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--surface-border)] text-xs text-[var(--text-muted)] uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-4 py-3 text-left">Title</th>
              <th scope="col" className="px-4 py-3 text-left hidden md:table-cell">Industry</th>
              <th scope="col" className="px-4 py-3 text-left">Source</th>
              <th scope="col" className="px-4 py-3 text-left">Status</th>
              <th scope="col" className="px-4 py-3 text-left hidden lg:table-cell">Outcomes</th>
              <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--surface-border)]">
            {studies.map((s) => {
              const verified = verifiedOutcomes(s).length;
              return (
                <tr key={`${s.source}:${s.slug}`} className="hover:bg-[var(--surface-bg-subtle)]">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">
                    {s.title}
                    <span className="block text-xs font-normal text-[var(--text-muted)]">/case-studies/{s.slug}</span>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] hidden md:table-cell">{s.industry}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{s.source === "code" ? "Code" : "Database"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={s.status === "published" ? "success" : "warning"}>
                      {s.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] hidden lg:table-cell">
                    {verified}/{s.outcomes.length} verified
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link
                      href={`/admin/case-studies/preview/${s.slug}`}
                      className="text-sm font-medium text-[var(--text-brand)] hover:underline"
                    >
                      Preview
                    </Link>
                    {s.status === "published" && (
                      <Link href={`/case-studies/${s.slug}`} className="ml-4 text-sm text-[var(--text-secondary)] hover:underline">
                        View
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
