import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { db } from "@/lib/db";
import { BlogPostForm } from "@/components/forms/BlogPostForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </Link>
        <span className="text-[var(--text-muted)]">/</span>
        <span className="text-sm text-[var(--text-secondary)] truncate max-w-xs">{post.title}</span>
        {post.status === "PUBLISHED" && (
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs text-[var(--brand-primary)] hover:underline"
          >
            View live <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Edit Post</h1>

      <BlogPostForm
        postId={post.id}
        defaultValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage ?? "",
          author: post.author,
          category: post.category,
          tags: post.tags,
          featured: post.featured,
          status: post.status,
          readTime: post.readTime,
          metaTitle: post.metaTitle ?? "",
          metaDescription: post.metaDescription ?? "",
          keywords: post.keywords,
        }}
      />
    </div>
  );
}
