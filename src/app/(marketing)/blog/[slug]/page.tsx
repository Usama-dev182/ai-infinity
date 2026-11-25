import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Tag } from "lucide-react";
import { ShareButton } from "@/components/marketing/share-button";
import { PageEventTracker } from "@/components/analytics/page-event-tracker";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/marketing/animation";
import { cache } from "react";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { db } from "@/lib/db";
import { formatDate, calculateReadTime } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const posts = await db.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

// Deduplicates the query between generateMetadata and the page within one request.
const getPublishedPost = cache((slug: string) => db.blogPost.findFirst({ where: { slug, status: "PUBLISHED" } }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? "",
    keywords: post.keywords,
    canonicalPath: `/blog/${post.slug}`,
    ogImage: post.ogImageUrl ?? post.coverImage ?? undefined,
    ogType: "Article",
    type: "article",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const readTime = post.readTime ?? calculateReadTime(post.content);

  return (
    <>
      <PageEventTracker eventName="blog_view" params={{ slug: post.slug }} />
      <JsonLd
        data={[
          articleJsonLd(post),
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)] pt-16 pb-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-brand)] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>

            {post.category && (
              <Badge variant="gradient" className="mb-4 capitalize">{post.category}</Badge>
            )}

            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-3xl leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-8">
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {readTime} min read
              </span>
              {post.tags && post.tags.length > 0 && (
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4" />
                  {post.tags.slice(0, 3).join(", ")}
                </span>
              )}
            </div>
          </FadeUp>

          {/* Cover image — spans hero width, bleeds into content */}
          {post.coverImage && (
            <FadeUp>
              <div className="relative rounded-2xl overflow-hidden shadow-xl -mb-16 z-10" style={{ height: "420px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface-bg)]/40 to-transparent" />
              </div>
            </FadeUp>
          )}

          {!post.coverImage && (
            <div
              className="rounded-2xl -mb-8 z-10 relative"
              style={{
                height: "8px",
                background: "linear-gradient(90deg, var(--brand-gradient-start), var(--brand-gradient-end))",
              }}
            />
          )}
        </div>
      </section>

      {/* ── Body (article + sidebar) ──────────────────────── */}
      <section className="pt-24 pb-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_288px] xl:grid-cols-[1fr_320px] gap-12 xl:gap-16 items-start">

            {/* Main Article */}
            <FadeUp>
              <article>
                <div
                  className="prose-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Bottom nav */}
                <div className="mt-14 pt-8 border-t border-[var(--surface-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <Button asChild variant="outline">
                    <Link href="/blog"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog</Link>
                  </Button>
                  <ShareButton />
                </div>
              </article>
            </FadeUp>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-6">

                {/* Author */}
                <div className="glass-card rounded-xl p-5 border border-[var(--surface-border)]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                      style={{ background: "linear-gradient(135deg,var(--brand-gradient-start),var(--brand-gradient-end))" }}
                    >
                      UA
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[var(--text-primary)]">Usama Ali</p>
                      <p className="text-xs text-[var(--text-muted)]">AI Engineer & Founder</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    5+ years building AI agents, RAG systems, and full-stack products for startups and enterprises worldwide.
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs capitalize">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div>
                  <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">Share</h3>
                  <ShareButton />
                </div>

                {/* CTA */}
                <div
                  className="rounded-xl p-5 border"
                  style={{
                    background: "linear-gradient(135deg,color-mix(in srgb,var(--brand-primary) 8%,transparent),color-mix(in srgb,var(--brand-accent) 5%,transparent))",
                    borderColor: "color-mix(in srgb,var(--brand-primary) 30%,transparent)",
                  }}
                >
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">Build with AI</h3>
                  <p className="text-xs text-[var(--text-secondary)] mb-4 leading-relaxed">
                    Ready to deploy AI agents or automate workflows in your business? Let&apos;s talk.
                  </p>
                  <Button asChild variant="gradient" className="w-full text-sm h-9">
                    <TrackedLink
                      href="/contact"
                      eventName="cta_click"
                      params={{ label: "Book a Free Call", location: "blog_detail_sidebar", destination: "/contact" }}
                    >
                      Book a Free Call
                    </TrackedLink>
                  </Button>
                </div>

              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

