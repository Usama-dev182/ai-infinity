import { Database, Inbox, Sparkles, UserCheck, RefreshCw } from "lucide-react";

const STEPS = [
  { icon: Inbox, title: "Inquiry received", detail: "Website, email or chat", tag: "Trigger" },
  { icon: Database, title: "Context assembled", detail: "CRM history + your knowledge base", tag: "Retrieval" },
  { icon: Sparkles, title: "AI qualifies & drafts reply", detail: "Structured output, validated", tag: "LLM" },
  { icon: UserCheck, title: "Person approves high-value cases", detail: "Human-in-the-loop checkpoint", tag: "Review" },
  { icon: RefreshCw, title: "CRM updated, follow-up scheduled", detail: "Logged and monitored", tag: "Action" },
] as const;

/**
 * Hero visual: an example AI workflow. Clearly labelled as illustrative so it can't be
 * mistaken for client data or performance claims.
 */
export function IllustrativeWorkflow() {
  return (
    <figure className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <p className="text-sm font-semibold text-[var(--text-primary)]">Example: AI lead-qualification workflow</p>
        <span className="text-[11px] font-semibold uppercase tracking-wider rounded-full px-2.5 py-1 bg-[var(--surface-bg-muted)] text-[var(--text-muted)] border border-[var(--surface-border)]">
          Illustrative
        </span>
      </div>
      <ol className="p-5 space-y-1">
        {STEPS.map(({ icon: Icon, title, detail, tag }, i) => (
          <li key={title} className="relative flex gap-4 pb-4 last:pb-0">
            {i < STEPS.length - 1 && (
              <span aria-hidden="true" className="absolute left-[19px] top-10 bottom-0 w-px bg-[var(--surface-border)]" />
            )}
            <span className="relative z-10 w-10 h-10 rounded-xl bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center shrink-0">
              <Icon aria-hidden="true" className="w-4.5 h-4.5 text-[var(--text-brand)]" />
            </span>
            <div className="min-w-0 pt-0.5 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--surface-bg-muted)] text-[var(--text-muted)]">
                  {tag}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <figcaption className="px-5 py-3 border-t border-[var(--surface-border)] text-xs text-[var(--text-muted)]">
        A typical pattern we design: automation for routine steps, AI for language understanding, people for judgement.
        Not client data.
      </figcaption>
    </figure>
  );
}
