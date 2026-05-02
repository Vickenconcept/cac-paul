import { supabase } from "./supabase";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
  coverImage: string;
}

// Supabase uses snake_case columns — map to camelCase for the app
function mapRow(row: Record<string, unknown>): Post {
  return {
    id: row.id as string,
    slug: row.slug as string,
    title: row.title as string,
    excerpt: row.excerpt as string,
    content: row.content as string,
    category: row.category as string,
    author: row.author as string,
    publishedAt: row.published_at as string,
    readTime: row.read_time as string,
    featured: row.featured as boolean,
    coverImage: row.cover_image as string,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Supabase getAllPosts error:", error.message);
    return [];
  }
  return (data ?? []).map(mapRow);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function getPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function createPost(post: Omit<Post, "id">): Promise<Post> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
      published_at: post.publishedAt,
      read_time: post.readTime,
      featured: post.featured,
      cover_image: post.coverImage,
    })
    .select()
    .single();

  if (error || !data) throw new Error(error?.message ?? "Failed to create post");
  return mapRow(data);
}

export async function updatePost(
  id: string,
  updates: Partial<Post>
): Promise<Post | null> {
  const dbUpdates: Record<string, unknown> = {};
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
  if (updates.title !== undefined) dbUpdates.title = updates.title;
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt;
  if (updates.content !== undefined) dbUpdates.content = updates.content;
  if (updates.category !== undefined) dbUpdates.category = updates.category;
  if (updates.author !== undefined) dbUpdates.author = updates.author;
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt;
  if (updates.readTime !== undefined) dbUpdates.read_time = updates.readTime;
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured;
  if (updates.coverImage !== undefined) dbUpdates.cover_image = updates.coverImage;

  const { data, error } = await supabase
    .from("posts")
    .update(dbUpdates)
    .eq("id", id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRow(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  return !error;
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
