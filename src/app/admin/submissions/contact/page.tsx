import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function ContactSubmissionsPage() {
  const submissions = await db.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Contact Submissions</h1>
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="glass-card rounded-xl border border-[var(--surface-border)] p-12 text-center text-[var(--text-muted)]">
            No submissions yet.
          </div>
        ) : (
          submissions.map((s) => (
            <div key={s.id} className="glass-card rounded-xl border border-[var(--surface-border)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{s.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{s.email}</p>
                  {s.company && <p className="text-xs text-[var(--text-muted)]">{s.company}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={s.status === "NEW" ? "warning" : s.status === "REPLIED" ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {s.status}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(s.createdAt)}</span>
                </div>
              </div>
              {s.subject && <p className="text-sm font-medium text-[var(--text-secondary)] mb-2">{s.subject}</p>}
              <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">{s.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
