import { NextResponse } from "next/server";
import { getAllPosts, createPost, generateSlug } from "@/lib/posts";
import { SITE_BRAND_ONLINE } from "@/app/lib/brand";

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, excerpt, content, category, author, readTime, featured, coverImage } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const slug = body.slug || generateSlug(title);
    const publishedAt = body.publishedAt || new Date().toISOString().split("T")[0];

    const post = await createPost({
      slug,
      title,
      excerpt: excerpt || "",
      content,
      category: category || "General",
      author: author || SITE_BRAND_ONLINE,
      publishedAt,
      readTime: readTime || "5 min read",
      featured: featured || false,
      coverImage: coverImage || "",
    });

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to create post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
