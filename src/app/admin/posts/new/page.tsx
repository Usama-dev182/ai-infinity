import { BlogPostForm } from "@/components/forms/BlogPostForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewPostPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/posts"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">New Blog Post</h1>
      <BlogPostForm />
    </div>
  );
}
