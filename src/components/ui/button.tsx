import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] shadow-md hover:shadow-lg hover:-translate-y-0.5",
        secondary:
          "bg-[var(--surface-bg-muted)] text-[var(--text-primary)] border border-[var(--surface-border)] hover:bg-[var(--surface-border)] hover:-translate-y-0.5",
        outline:
          "border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] bg-transparent hover:bg-[var(--brand-primary)] hover:text-white hover:-translate-y-0.5",
        ghost:
          "text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)] hover:text-[var(--text-primary)]",
        link:
          "text-[var(--text-link)] underline-offset-4 hover:underline p-0 h-auto",
        gradient:
          "bg-gradient-to-r from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:opacity-95",
        destructive:
          "bg-[var(--color-error)] text-white hover:opacity-90",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-5 py-2",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span>Loading…</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
