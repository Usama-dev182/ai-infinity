import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { FRONTEND_EXPERTISE } from "@/content/site";

const chipClass =
  "inline-flex items-center rounded-full border border-[var(--brand-primary)]/25 bg-[var(--brand-primary)]/[0.08] px-3 py-1 text-sm font-medium text-[var(--text-primary)]";

/**
 * The founder's core frontend expertise.
 * - "full" (About page): grouped by area, with a heading.
 * - "compact" (homepage founder block): one row of chips.
 */
export function FounderExpertise({ variant = "full", className }: { variant?: "full" | "compact"; className?: string }) {
  if (variant === "compact") {
    const items = FRONTEND_EXPERTISE.flatMap((g) => g.items);
    return (
      <div className={className}>
        <p className="mb-3 text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">Core frontend expertise</p>
        <ul className="flex flex-wrap gap-2" aria-label="Core frontend expertise">
          {items.map((item) => (
            <li key={item} className={chipClass}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="founder-expertise-heading"
      className={cn("rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 sm:p-6", className)}
    >
      <h3 id="founder-expertise-heading" className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
        <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-cta-gradient text-white">
          <Code2 className="w-4 h-4" />
        </span>
        Core expertise: frontend engineering
      </h3>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        {FRONTEND_EXPERTISE.map((group) => (
          <div key={group.label}>
            <dt className="mb-2 text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className={chipClass}>
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
