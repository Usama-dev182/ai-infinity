"use client";

import { useState } from "react";

import { Play, PlayCircle, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { YouTubeCard } from "@/components/marketing/youtube-card";
import { TECH_TALKS, TECH_TALK_CATEGORIES, type TechTalkCategory } from "@/content/tech-talks";
import { SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function TechTalksClient() {
  const [activeCategory, setActiveCategory] = useState<TechTalkCategory | "All">("All");

  const filtered =
    activeCategory === "All"
      ? TECH_TALKS
      : TECH_TALKS.filter((v) => v.category === activeCategory);

  const featured = filtered.filter((v) => v.featured);
  const rest = filtered.filter((v) => !v.featured);

  return (
    <>
      {/* ─── HERO ───────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(6,182,212,0.08),transparent_60%)]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Badge variant="gradient" className="mb-4 inline-flex items-center gap-1.5">
              <Play className="w-3 h-3 fill-current" />
              Tech Talks with Usama Ali
            </Badge>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-[var(--text-primary)] mb-6 max-w-3xl">
              Learn{" "}
              <span className="gradient-text">AI & Automation</span>
              {" "}from a Practitioner
            </h1>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8 leading-relaxed">
              Real-world deep dives on Agentic AI, LLM integrations, workflow automation, AI SaaS
              building, and vibe coding — straight from the engineer who builds these systems every day.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Agentic AI", "LLMs", "AI Automation", "Vibe Coding", "Workshops"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-xs font-medium bg-[var(--surface-bg-muted)] text-[var(--text-secondary)] border border-[var(--surface-border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <TrackedAnchor
              href={SITE.youtube}
              target="_blank"
              rel="noopener noreferrer"
              eventName="youtube_channel_click"
              params={{ location: "tech_talks_hero" }}
            >
              <Button variant="gradient" size="xl" className="group">
                <PlayCircle className="w-5 h-5 mr-2" />
                Subscribe to the Channel
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </TrackedAnchor>
          </FadeUp>
        </div>
      </section>

      {/* ─── FILTER BAR ─────────────────────────────────────────── */}
      <section className="sticky top-[64px] z-30 bg-[var(--surface-bg)]/80 backdrop-blur-md border-b border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none">
            {(["All", ...TECH_TALK_CATEGORIES] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as TechTalkCategory | "All")}
                className={cn(
                  "shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border",
                  activeCategory === cat
                    ? "bg-gradient-to-r from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] text-white border-transparent shadow-md"
                    : "border-[var(--surface-border)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO GRID ─────────────────────────────────────────── */}
      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <FadeUp>
              <div className="text-center py-24">
                <p className="text-[var(--text-muted)] text-lg mb-6">No videos in this category yet. Check back soon!</p>
                <TrackedAnchor
                  href={SITE.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="youtube_channel_click"
                  params={{ location: "tech_talks_empty" }}
                >
                  <Button variant="gradient">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    Watch on YouTube
                  </Button>
                </TrackedAnchor>
              </div>
            </FadeUp>
          ) : (
            <>
              {/* Featured videos */}
              {featured.length > 0 && (
                <div className="mb-10">
                  <FadeUp>
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-6">
                      Featured
                    </h2>
                  </FadeUp>
                  <StaggerContainer className="grid md:grid-cols-2 gap-6">
                    {featured.map((video) => (
                      <StaggerItem key={video.id + video.title}>
                        <YouTubeCard video={video} featured />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}

              {/* All other videos */}
              {rest.length > 0 && (
                <div>
                  {featured.length > 0 && (
                    <FadeUp>
                      <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-6">
                        All Videos
                      </h2>
                    </FadeUp>
                  )}
                  <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rest.map((video) => (
                      <StaggerItem key={video.id + video.title}>
                        <YouTubeCard video={video} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ─── CHANNEL CTA ────────────────────────────────────────── */}
      <section className="section-padding border-t border-[var(--surface-border)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--brand-gradient-start)] via-[#7c3aed] to-[var(--brand-gradient-end)] p-10 md:p-14 text-center">
              {/* subtle radial shine */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
                  <PlayCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                  Subscribe & Level Up Your AI Skills
                </h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                  New videos every week on Agentic AI, LLM integration, vibe coding, and building
                  real AI-powered products. Join the community.
                </p>
                <TrackedAnchor
                  href={SITE.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="youtube_channel_click"
                  params={{ location: "tech_talks_cta_bottom" }}
                >
                  <Button
                    variant="outline"
                    size="xl"
                    className="bg-white text-[var(--brand-primary)] hover:bg-white/90 border-transparent font-semibold"
                  >
                    <PlayCircle className="w-5 h-5 mr-2" />
                    Subscribe on YouTube
                  </Button>
                </TrackedAnchor>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
