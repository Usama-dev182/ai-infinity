import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { FieldMessages, describedBy, fieldClassName } from "@/components/ui/input";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly (SelectOption | string)[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

/** Styled native <select>: fully keyboard/screen-reader accessible on every platform. */
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, placeholder, error, hint, id, ...props }, ref) => {
    const ids = describedBy(id, hint, error);
    return (
      <div className="w-full">
        <div className="relative">
          <select
            id={id}
            ref={ref}
            aria-invalid={error ? true : undefined}
            aria-describedby={ids.describedBy}
            className={cn(fieldClassName(error), "h-11 appearance-none pr-9", className)}
            {...props}
          >
            {placeholder !== undefined && <option value="">{placeholder}</option>}
            {options.map((option) => {
              const { value, label } = typeof option === "string" ? { value: option, label: option } : option;
              return (
                <option key={value} value={value}>
                  {label}
                </option>
              );
            })}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]"
          />
        </div>
        <FieldMessages hint={hint} error={error} hintId={ids.hintId} errorId={ids.errorId} />
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
