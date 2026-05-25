import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors border",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/20",
        secondary:
          "bg-[var(--surface-bg-muted)] text-[var(--text-secondary)] border-[var(--surface-border)]",
        outline:
          "border-[var(--surface-border)] text-[var(--text-secondary)] bg-transparent",
        success:
          "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
        warning:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        error:
          "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
        gradient:
          "bg-gradient-to-r from-[var(--brand-gradient-start)]/10 to-[var(--brand-gradient-end)]/10 text-[var(--brand-primary)] border-[var(--brand-primary)]/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
