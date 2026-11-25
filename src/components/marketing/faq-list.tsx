import { ChevronRight } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

/** Native <details> accordion: keyboard and screen-reader accessible without JS. */
export function FaqList({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((faq) => (
        <details
          key={faq.question}
          className="group rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] overflow-hidden"
        >
          <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-[var(--surface-bg-subtle)] transition-colors">
            <span className="font-semibold text-[var(--text-primary)] leading-snug">{faq.question}</span>
            <ChevronRight
              aria-hidden="true"
              className="w-4 h-4 text-[var(--text-muted)] shrink-0 transition-transform duration-200 group-open:rotate-90"
            />
          </summary>
          <div className="px-5 pb-5 text-[var(--text-secondary)] leading-relaxed">{faq.answer}</div>
        </details>
      ))}
    </div>
  );
}
