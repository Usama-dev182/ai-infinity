import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import type { TechTalk } from "@/content/tech-talks";
import { cn } from "@/lib/utils";

interface YouTubeCardProps {
  video: TechTalk;
  featured?: boolean;
}

const categoryVariant: Record<string, string> = {
  "AI Agents":       "from-[#6366f1] to-[#8b5cf6]",
  "LLMs":            "from-[#06b6d4] to-[#6366f1]",
  "AI Automation":   "from-[#0ea5e9] to-[#06b6d4]",
  "Vibe Coding":     "from-[#a855f7] to-[#ec4899]",
  "AI SaaS":         "from-[#6366f1] to-[#06b6d4]",
  "Machine Learning":  "from-[#10b981] to-[#06b6d4]",
  "Full Stack Dev":    "from-[#3b82f6] to-[#6366f1]",
  "Coding Tools":      "from-[#8b5cf6] to-[#3b82f6]",
  "Consulting":           "from-[#f43f5e] to-[#f97316]",
  "Communication Skills": "from-[#14b8a6] to-[#06b6d4]",
  "Workshops":            "from-[#f59e0b] to-[#f97316]",
  "Tech Talk":       "from-[#6366f1] to-[#06b6d4]",
};

export function YouTubeCard({ video, featured = false }: YouTubeCardProps) {
  const gradientClass = categoryVariant[video.category] ?? "from-[#6366f1] to-[#06b6d4]";
  const isPending = video.id.startsWith("PENDING_");
  const thumbnailUrl = isPending ? null : `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const videoUrl = isPending ? null : `https://www.youtube.com/watch?v=${video.id}`;

  const cardContent = (
    <div
      className={cn(
        "group block rounded-2xl overflow-hidden border border-[var(--surface-border)]",
        "glass-card transition-all duration-300",
        !isPending && "hover:border-[var(--brand-primary)]/50 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]",
        featured && "md:col-span-2"
      )}
    >
      {/* Thumbnail */}
      <div className={cn("relative overflow-hidden bg-[var(--surface-bg-muted)]", featured ? "h-56 sm:h-64" : "h-44")}>
        {isPending ? (
          /* Coming Soon placeholder */
          <div className={cn("w-full h-full bg-gradient-to-br opacity-20", gradientClass)} />
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumbnailUrl!}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src.includes("maxresdefault")) {
                img.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
              }
            }}
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Play button or Coming Soon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {isPending ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-sm">
              Coming Soon
            </span>
          ) : (
            <div
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center",
                "bg-gradient-to-br",
                gradientClass,
                "shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100",
                "transition-all duration-300"
              )}
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </div>
          )}
        </div>

        {/* Category badge — top left */}
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white",
              "bg-gradient-to-r",
              gradientClass
            )}
          >
            {video.category}
          </span>
        </div>

        {/* Featured indicator */}
        {featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="gradient" className="text-[10px]">Featured</Badge>
          </div>
        )}
      </div>

      {/* Text content */}
      <div className="p-4">
        <h3
          className={cn(
            "font-semibold text-[var(--text-primary)] leading-snug mb-2 line-clamp-2",
            "group-hover:text-[var(--brand-primary)] transition-colors",
            featured ? "text-base" : "text-sm"
          )}
        >
          {video.title}
        </h3>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2 mb-3">
          {video.description}
        </p>
        <div className="flex items-center gap-1 text-xs text-[var(--brand-primary)] font-medium">
          {isPending ? (
            <span className="text-[var(--text-muted)]">Video uploading soon</span>
          ) : (
            <>
              <ExternalLink className="w-3 h-3" />
              Watch on YouTube
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (isPending) return cardContent;

  return (
    <TrackedAnchor
      href={videoUrl!}
      target="_blank"
      rel="noopener noreferrer"
      eventName="tech_talk_click"
      params={{ videoId: video.id, title: video.title, category: video.category }}
    >
      {cardContent}
    </TrackedAnchor>
  );
}
