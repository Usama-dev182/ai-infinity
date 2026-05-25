import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { blogPostSchema } from "@/lib/validators";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || (session.user as { role?: string }).role !== "ADMIN") return null;
  return session;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const post = await db.blogPost.findUnique({ where: { id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

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

  const existing = await db.blogPost.findUnique({
    where: { id },
    select: { status: true, publishedAt: true },
  });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const { coverImage, metaTitle, metaDescription, ...rest } = parsed.data;

  // Set publishedAt when first publishing; clear it when un-publishing
  const publishedAt =
    rest.status === "PUBLISHED" && !existing.publishedAt
      ? new Date()
      : rest.status !== "PUBLISHED"
        ? null
        : existing.publishedAt;

  try {
    const post = await db.blogPost.update({
      where: { id },
      data: {
        ...rest,
        coverImage: coverImage || null,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        publishedAt,
      },
    });
    return NextResponse.json(post);
  } catch (err: unknown) {
    const msg = (err as { code?: string })?.code === "P2002"
      ? "A post with this slug already exists."
      : "Failed to update post.";
    return NextResponse.json({ error: msg }, { status: 409 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const existing = await db.blogPost.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.blogPost.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
