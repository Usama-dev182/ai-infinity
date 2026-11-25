import type { Metadata } from "next";
import { Clock, Calendar } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { buildMetadata } from "@/lib/seo";
import { db } from "@/lib/db";
import { formatDate, calculateReadTime } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Blog — AI Engineering & Automation Insights",
  description:
    "Insights on AI engineering, full-stack development, and building intelligent software systems. Written by practitioners.",
  keywords: [
    "AI engineering blog",
    "Next.js tutorials",
    "LLM integration guide",
    "full stack development tips",
  ],
  canonicalPath: "/blog",
});

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      slug: true,
      title: true,
      excerpt: true,
      category: true,
      coverImage: true,
      publishedAt: true,
      content: true,
      readTime: true,
    },
  }).catch(() => []);

  return (
    <>
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Blog</Badge>
            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6 max-w-2xl">
              Insights on <span className="gradient-text">AI & Engineering</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
              Practical guides, deep dives, and lessons learned from building production AI systems and full-stack applications.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <FadeUp>
              <div className="text-center py-20">
                <p className="text-[var(--text-muted)] text-lg mb-6">Articles coming soon. Stay tuned!</p>
                <Button asChild variant="gradient">
                  <TrackedLink
                    href="/contact"
                    eventName="cta_click"
                    params={{ label: "Get notified", location: "blog_empty_state", destination: "/contact" }}
                  >
                    Get notified
                  </TrackedLink>
                </Button>
              </div>
            </FadeUp>
          ) : (
            <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <StaggerItem key={post.id}>
                  <TrackedLink
                    href={`/blog/${post.slug}`}
                    className="group block h-full"
                    eventName="blog_card_click"
                    params={{ slug: post.slug, location: "blog_listing" }}
                  >
                    <div className="glass-card rounded-2xl border border-[var(--surface-border)] overflow-hidden h-full hover:border-[var(--brand-primary)]/40 hover:shadow-xl transition-all">
                      {post.coverImage && (
                        <div className="h-48 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      )}
                      {!post.coverImage && (
                        <div className="h-48 bg-gradient-to-br from-[var(--brand-gradient-start)]/20 to-[var(--brand-gradient-end)]/10" />
                      )}
                      <div className="p-6">
                        {post.category && (
                          <Badge variant="outline" className="mb-3 text-xs capitalize">{post.category}</Badge>
                        )}
                        <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:gradient-text mb-2 transition-all line-clamp-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">{post.excerpt}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                          {post.publishedAt && (
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {post.readTime ?? calculateReadTime(post.content)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </TrackedLink>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}
