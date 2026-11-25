import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/marketing/animation";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  /** Heading level; defaults to h2. */
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children?: ReactNode;
}

/** Standard section header: eyebrow badge, heading, supporting copy. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Tag = "h2",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <FadeUp
      className={cn(
        "mb-12 lg:mb-14",
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <Badge variant="gradient" className="mb-4">
          {eyebrow}
        </Badge>
      )}
      <Tag
        id={id}
        className={cn(
          "font-bold text-[var(--text-primary)]",
          Tag === "h1" ? "text-heading-1 font-extrabold" : "text-heading-2"
        )}
      >
        {title}
      </Tag>
      {description && <p className="mt-4 text-lead text-[var(--text-secondary)]">{description}</p>}
      {children}
    </FadeUp>
  );
}

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}

/** Interior page hero with optional right-hand column. */
export function PageHero({ eyebrow, title, description, children, aside }: PageHeroProps) {
  return (
    <section className="relative border-b border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]"
      />
      <div className="relative container-page py-16 lg:py-24">
        <div className={cn(aside && "grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start")}>
          <div className="max-w-3xl">
            {eyebrow && (
              <Badge variant="gradient" className="mb-5">
                {eyebrow}
              </Badge>
            )}
            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)]">{title}</h1>
            {description && <p className="mt-6 text-lead text-[var(--text-secondary)] max-w-2xl">{description}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div>{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
  muted = false,
  id,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "section-padding",
        muted && "bg-[var(--surface-bg-subtle)] border-y border-[var(--surface-border)]",
        className
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}
