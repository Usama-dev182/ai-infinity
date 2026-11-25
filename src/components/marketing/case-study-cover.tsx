import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CaseStudyCover as Cover } from "@/content/case-studies";

/** Branded illustration used when a case study has no cover of its own. */
export const FALLBACK_COVER: Cover = {
  src: "/images/case-studies/fallback.svg",
  alt: "",
};

/**
 * Case study cover in a fixed 16:9 frame, so there is never a layout shift.
 *
 * The frame has a branded gradient background: if the image is missing or fails to load,
 * that background is what shows. In cards the cover is decorative (the title follows it),
 * so `decorative` renders it with empty alt text.
 */
export function CaseStudyCover({
  cover,
  sizes,
  decorative = false,
  preload = false,
  className,
}: {
  cover?: Cover | null;
  /** Rendered width hints for responsive image selection. */
  sizes: string;
  decorative?: boolean;
  /** Only for an above-the-fold hero cover. */
  preload?: boolean;
  className?: string;
}) {
  const image = cover ?? FALLBACK_COVER;
  return (
    <div
      className={cn(
        "relative aspect-[16/9] overflow-hidden bg-[#0b1022] bg-gradient-to-br from-[#1e1b4b] via-[#0b1022] to-[#083344]",
        className
      )}
    >
      <Image
        src={image.src}
        alt={decorative ? "" : image.alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
      />
    </div>
  );
}
