import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminCaseStudiesPage() {
  const studies = await db.caseStudy.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, status: true, clientIndustry: true, createdAt: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Case Studies</h1>
        <Button asChild variant="gradient" size="sm">
          <Link href="/admin/case-studies/new"><Plus className="w-4 h-4 mr-1" /> New Study</Link>
        </Button>
      </div>
      <div className="glass-card rounded-xl border border-[var(--surface-border)] overflow-hidden">
        {studies.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)]">No case studies yet. Create your first!</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--surface-border)] text-xs text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Industry</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Created</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-border)]">
              {studies.map((s) => (
                <tr key={s.id} className="hover:bg-[var(--surface-bg-subtle)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{s.title}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{s.clientIndustry}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] hidden lg:table-cell">{formatDate(s.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={s.status === "PUBLISHED" ? "success" : s.status === "ARCHIVED" ? "secondary" : "warning"}
                      className="text-xs"
                    >
                      {s.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/case-studies/${s.id}`}>Edit</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
