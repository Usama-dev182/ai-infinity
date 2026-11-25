"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { AlertCircle, CheckCircle } from "lucide-react";

/** Error banner announced to assistive tech and focused so keyboard users land on it. */
export function FormErrorAlert({ message }: { message: string | null }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (message) ref.current?.focus();
  }, [message]);
  if (!message) return null;
  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-[var(--color-error-text)] outline-none"
    >
      <AlertCircle aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}

/** Success panel; receives focus so screen readers announce the outcome. */
export function FormSuccess({ title, children }: { title: string; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-8 text-center outline-none"
    >
      <CheckCircle aria-hidden="true" className="w-12 h-12 text-[var(--color-success)] mx-auto mb-4" />
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">{title}</h2>
      {children && <div className="text-[var(--text-secondary)] space-y-3">{children}</div>}
    </div>
  );
}

/** Hidden honeypot field (bots fill it; people never see it). */
export function HoneypotField(props: React.ComponentProps<"input">) {
  return (
    <div aria-hidden="true" className="hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...props} />
      </label>
    </div>
  );
}
