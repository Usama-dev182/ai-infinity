import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function CareerSubmissionsPage() {
  const applications = await db.careerApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { job: { select: { title: true } } },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Career Applications</h1>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div className="glass-card rounded-xl border border-[var(--surface-border)] p-12 text-center text-[var(--text-muted)]">
            No applications yet.
          </div>
        ) : (
          applications.map((a) => (
            <div key={a.id} className="glass-card rounded-xl border border-[var(--surface-border)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{a.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{a.email}</p>
                  {a.job && <p className="text-xs text-[var(--text-brand)]">Applying for: {a.job.title}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={a.status === "NEW" ? "warning" : a.status === "HIRED" ? "success" : a.status === "REJECTED" ? "error" : "secondary"}
                    className="text-xs"
                  >
                    {a.status}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(a.createdAt)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-xs mb-3">
                {a.linkedinUrl && (
                  <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-brand)] hover:underline">LinkedIn</a>
                )}
                {a.portfolioUrl && (
                  <a href={a.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-[var(--text-brand)] hover:underline">Portfolio</a>
                )}
              </div>
              {a.coverLetter && (
                <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">{a.coverLetter}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
