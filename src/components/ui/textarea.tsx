import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldMessages, describedBy, fieldClassName } from "@/components/ui/input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, hint, id, ...props }, ref) => {
    const ids = describedBy(id, hint, error);
    return (
      <div className="w-full">
        <textarea
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={ids.describedBy}
          className={cn(fieldClassName(error), "min-h-[120px] py-2.5 resize-y", className)}
          ref={ref}
          {...props}
        />
        <FieldMessages hint={hint} error={error} hintId={ids.hintId} errorId={ids.errorId} />
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
