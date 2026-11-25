import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/** Brand mark: gradient tile with the Zap glyph, optionally followed by the wordmark. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] items-center justify-center shadow-sm",
        className
      )}
    >
      <Zap className="w-4 h-4 text-white" />
    </span>
  );
}
