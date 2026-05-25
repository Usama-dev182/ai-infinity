import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, error, ...props }, ref) => {
  return (
    <div className="w-full">
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border bg-[var(--surface-card)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors",
          "border-[var(--surface-border)] focus:border-[var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[var(--color-error)] focus:ring-[var(--color-error)]/20",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
