import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement reveal animations — markup only, no client JavaScript.
 *
 * These wrappers render plain elements with `.reveal` / `.reveal-stagger` classes.
 * A single `RevealObserver` (mounted once per layout) decides, from one batched
 * IntersectionObserver callback, which elements start below the fold and animates them
 * in when they are scrolled into view. Server HTML is always fully visible, so content
 * shows without JavaScript, with `prefers-reduced-motion`, and in layouts that do not
 * mount the observer. Styles live in `globals.css`.
 */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal transition starts. */
  delay?: number;
}

export function FadeUp({ children, delay = 0, className }: RevealProps) {
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <div className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}

export function StaggerContainer({ children, className }: Omit<RevealProps, "delay">) {
  return <div className={cn("reveal-stagger", className)}>{children}</div>;
}

export function StaggerItem({ children, className }: Omit<RevealProps, "delay">) {
  return <div className={className}>{children}</div>;
}
