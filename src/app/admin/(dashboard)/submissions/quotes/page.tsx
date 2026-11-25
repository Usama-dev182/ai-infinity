import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/authz";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export default async function QuoteSubmissionsPage() {
  await requireAdmin();
  const quotes = await db.quoteRequest.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Quote Requests</h1>
      <div className="space-y-4">
        {quotes.length === 0 ? (
          <div className="glass-card rounded-xl border border-[var(--surface-border)] p-12 text-center text-[var(--text-muted)]">
            No quote requests yet.
          </div>
        ) : (
          quotes.map((q) => (
            <div key={q.id} className="glass-card rounded-xl border border-[var(--surface-border)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">{q.name}</p>
                  <p className="text-sm text-[var(--text-muted)]">{q.email}</p>
                  {q.company && <p className="text-xs text-[var(--text-muted)]">{q.company}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={q.status === "NEW" ? "warning" : q.status === "REPLIED" ? "success" : "secondary"}
                    className="text-xs"
                  >
                    {q.status}
                  </Badge>
                  <span className="text-xs text-[var(--text-muted)]">{formatDate(q.createdAt)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-[var(--text-muted)] mb-3">
                {q.projectType && <span>Service: {q.projectType}</span>}
                {q.budget && <span>Budget: {q.budget}</span>}
                {q.timeline && <span>Timeline: {q.timeline}</span>}
              </div>
              <p className="text-sm text-[var(--text-secondary)] whitespace-pre-wrap">{q.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
