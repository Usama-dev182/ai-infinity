import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") return null;
  return session;
}

export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = blogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { coverImage, metaTitle, metaDescription, ...rest } = parsed.data;

  try {
    const post = await db.blogPost.create({
      data: {
        ...rest,
        coverImage: coverImage || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        publishedAt: rest.status === "PUBLISHED" ? new Date() : null,
      },
    });
    return NextResponse.json(post, { status: 201 });
  } catch (err: unknown) {
    const msg = (err as { code?: string })?.code === "P2002"
      ? "A post with this slug already exists."
      : "Failed to create post.";
    return NextResponse.json({ error: msg }, { status: 409 });
  }
}
