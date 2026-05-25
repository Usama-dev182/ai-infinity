"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { blogPostSchema, BlogPostFormData } from "@/lib/validators";
import { BLOG_CATEGORIES } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, AlertCircle, Loader2, Eye, Save } from "lucide-react";

interface BlogPostFormProps {
  postId?: string;
  defaultValues?: Partial<BlogPostFormData> & { slug?: string };
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 200);
}

const SELECT_CLASS =
  "w-full rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] text-[var(--text-primary)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]";

// Zod v4: input type has optional fields for fields with .default(); output type has them required
type BlogPostInput = z.input<typeof blogPostSchema>;

export function BlogPostForm({ postId, defaultValues }: BlogPostFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const isEdit = !!postId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostInput, unknown, BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      author: "Usama Ali",
      category: "General",
      tags: [],
      featured: false,
      status: "DRAFT",
      readTime: 5,
      metaTitle: "",
      metaDescription: "",
      keywords: [],
      ...defaultValues,
    },
  });

  const title = watch("title");

  // Auto-generate slug from title when creating
  useEffect(() => {
    if (!isEdit && title) {
      setValue("slug", toSlug(title), { shouldValidate: false });
    }
  }, [title, isEdit, setValue]);

  const onSubmit = async (data: BlogPostFormData) => {
    setError(null);
    const url = isEdit ? `/api/admin/posts/${postId}` : "/api/admin/posts";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      const msg =
        typeof json?.error === "string"
          ? json.error
          : "Something went wrong. Please try again.";
      setError(msg);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push("/admin/posts"), 1500);
  };

  if (success) {
    return (
      <div className="glass-card rounded-xl border border-green-500/20 p-12 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
          Post {isEdit ? "updated" : "created"} successfully!
        </h3>
        <p className="text-[var(--text-secondary)]">Redirecting back to posts list…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl">
      {/* ── Content ─────────────────────────────────────── */}
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-6 space-y-5">
        <h2 className="text-base font-semibold text-[var(--text-primary)] uppercase tracking-wider text-xs text-[var(--text-muted)]">
          Content
        </h2>

        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" {...register("title")} placeholder="AI Automation for Business Workflows" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">
            Slug *{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">
              (auto-generated, lowercase with hyphens)
            </span>
          </Label>
          <Input
            id="slug"
            {...register("slug")}
            placeholder="ai-automation-for-business-workflows"
            className="font-mono text-sm"
          />
          {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">
            Excerpt *{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">(shown in listings and search results)</span>
          </Label>
          <Textarea
            id="excerpt"
            {...register("excerpt")}
            rows={3}
            placeholder="A concise 1–2 sentence summary visible in blog listings and Google search results."
          />
          {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">
            Content *{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">(HTML — use &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;a&gt;)</span>
          </Label>
          <Textarea
            id="content"
            {...register("content")}
            rows={24}
            placeholder="<p>Start writing your article...</p>&#10;<h2>Section Heading</h2>&#10;<p>Content here.</p>"
            className="font-mono text-xs leading-relaxed"
          />
          {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            {...register("coverImage")}
            placeholder="https://images.unsplash.com/photo-..."
          />
          {errors.coverImage && (
            <p className="text-red-500 text-xs mt-1">{errors.coverImage.message}</p>
          )}
        </div>
      </div>

      {/* ── Publishing ───────────────────────────────────── */}
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-6">
        <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-5">
          Publishing
        </h2>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="status">Status *</Label>
            <select id="status" {...register("status")} className={SELECT_CLASS}>
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select id="category" {...register("category")} className={SELECT_CLASS}>
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register("author")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="readTime">Read Time (minutes)</Label>
            <Input
              id="readTime"
              type="number"
              min={1}
              max={120}
              {...register("readTime", { valueAsNumber: true })}
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="tagsInput">
              Tags{" "}
              <span className="text-xs text-[var(--text-muted)] font-normal">(comma-separated)</span>
            </Label>
            <Input
              id="tagsInput"
              placeholder="ai, automation, workflow"
              defaultValue={defaultValues?.tags?.join(", ") ?? ""}
              onChange={(e) => {
                const arr = e.target.value
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean);
                setValue("tags", arr);
              }}
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              className="w-4 h-4 rounded accent-[var(--brand-primary)]"
            />
            <Label htmlFor="featured" className="cursor-pointer font-normal">
              Feature this post (shown prominently on blog)
            </Label>
          </div>
        </div>
      </div>

      {/* ── SEO ──────────────────────────────────────────── */}
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-6 space-y-5">
        <h2 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">SEO</h2>

        <div className="space-y-2">
          <Label htmlFor="metaTitle">
            Meta Title{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">(max 70 chars — leave blank to use post title)</span>
          </Label>
          <Input id="metaTitle" {...register("metaTitle")} maxLength={70} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">
            Meta Description{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">(max 160 chars)</span>
          </Label>
          <Textarea id="metaDescription" {...register("metaDescription")} rows={3} maxLength={160} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywordsInput">
            Keywords{" "}
            <span className="text-xs text-[var(--text-muted)] font-normal">(comma-separated)</span>
          </Label>
          <Input
            id="keywordsInput"
            placeholder="ai automation, workflow automation, business ai"
            defaultValue={defaultValues?.keywords?.join(", ") ?? ""}
            onChange={(e) => {
              const arr = e.target.value
                .split(",")
                .map((k) => k.trim())
                .filter(Boolean);
              setValue("keywords", arr);
            }}
          />
        </div>
      </div>

      {/* ── Error ──────────────────────────────────────── */}
      {error && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* ── Actions ────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3 pb-8">
        <Button type="submit" variant="gradient" disabled={isSubmitting} className="gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving…
            </>
          ) : (
            <>
              <Save className="w-4 h-4" /> {isEdit ? "Update Post" : "Create Post"}
            </>
          )}
        </Button>

        {isEdit && defaultValues?.slug && (
          <Button type="button" variant="outline" asChild>
            <a href={`/blog/${defaultValues.slug}`} target="_blank" rel="noopener noreferrer" className="gap-2">
              <Eye className="w-4 h-4" /> Preview
            </a>
          </Button>
        )}

        <Button type="button" variant="ghost" onClick={() => router.push("/admin/posts")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
