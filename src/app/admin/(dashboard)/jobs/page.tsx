import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { Plus } from "lucide-react";

export default async function AdminJobsPage() {
  const jobs = await db.jobPosting.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, slug: true, title: true, status: true, department: true, employmentType: true, createdAt: true },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Job Postings</h1>
        <Button asChild variant="gradient" size="sm">
          <Link href="/admin/jobs/new"><Plus className="w-4 h-4 mr-1" /> New Job</Link>
        </Button>
      </div>
      <div className="glass-card rounded-xl border border-[var(--surface-border)] overflow-hidden">
        {jobs.length === 0 ? (
          <div className="p-12 text-center text-[var(--text-muted)]">No job postings yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-[var(--surface-border)] text-xs text-[var(--text-muted)] uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Department</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Created</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-border)]">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-[var(--surface-bg-subtle)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{job.title}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] hidden md:table-cell">{job.department}</td>
                  <td className="px-4 py-3 text-[var(--text-muted)] hidden lg:table-cell">{formatDate(job.createdAt)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={job.status === "OPEN" ? "success" : job.status === "PAUSED" ? "warning" : "secondary"}
                      className="text-xs"
                    >
                      {job.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/jobs/${job.id}`}>Edit</Link>
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
