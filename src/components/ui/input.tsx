import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  /** Optional hint rendered under the field and linked via aria-describedby. */
  hint?: string;
}

export const fieldClassName = (error?: string) =>
  cn(
    "flex w-full rounded-lg border bg-[var(--surface-card)] px-3 text-base sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
    "border-[var(--surface-border)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/25",
    "disabled:cursor-not-allowed disabled:opacity-50",
    error && "border-[var(--color-error)] focus:ring-[var(--color-error)]/25"
  );

/** Builds the aria-describedby value and ids for a field's hint and error messages. */
export function describedBy(id: string | undefined, hint?: string, error?: string) {
  if (!id) return { hintId: undefined, errorId: undefined, describedBy: undefined };
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return { hintId, errorId, describedBy: [hintId, errorId].filter(Boolean).join(" ") || undefined };
}

export function FieldMessages({
  hint,
  error,
  hintId,
  errorId,
}: {
  hint?: string;
  error?: string;
  hintId?: string;
  errorId?: string;
}) {
  return (
    <>
      {hint && (
        <p id={hintId} className="mt-1 text-xs text-[var(--text-muted)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1 text-xs font-medium text-[var(--color-error-text)]">
          {error}
        </p>
      )}
    </>
  );
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, hint, id, ...props }, ref) => {
    const ids = describedBy(id, hint, error);
    return (
      <div className="w-full">
        <input
          id={id}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={ids.describedBy}
          className={cn(fieldClassName(error), "h-11", className)}
          ref={ref}
          {...props}
        />
        <FieldMessages hint={hint} error={error} hintId={ids.hintId} errorId={ids.errorId} />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
