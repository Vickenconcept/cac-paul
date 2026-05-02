import { NextResponse } from "next/server";
import { getAllPosts, createPost, generateSlug } from "@/lib/posts";

export async function GET() {
  const posts = getAllPosts();
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

    const post = createPost({
      slug,
      title,
      excerpt: excerpt || "",
      content,
      category: category || "General",
      author: author || "Paul & Associates",
      publishedAt,
      readTime: readTime || "5 min read",
      featured: featured || false,
      coverImage: coverImage || "",
    });

    return NextResponse.json(post, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
