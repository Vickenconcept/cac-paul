"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import {
  PlusCircle, Edit, Trash2, Eye, BookOpen, Calendar, Clock,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 10;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts");
    setPosts(await res.json());
    setLoading(false);
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    await fetchPosts();
    setDeleting(null);
  }

  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0B1F3A" }}>Blog Posts</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-semibold"
          style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
        >
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
      >
        {loading ? (
          <div className="text-center py-16 text-sm" style={{ color: "#64748B" }}>
            Loading posts…
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm mb-4" style={{ color: "#64748B" }}>No posts yet</p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "#0B1F3A", color: "#E8AE4A" }}
            >
              <PlusCircle size={14} /> Create First Post
            </Link>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div
              className="hidden md:grid grid-cols-[1fr_160px_100px_100px] px-5 py-3 text-xs font-bold uppercase tracking-wider"
              style={{ borderBottom: "1px solid #F0EDE6", color: "#94A3B8", background: "#FAFAF8" }}
            >
              <span>Post</span>
              <span>Category</span>
              <span>Date</span>
              <span className="text-right">Actions</span>
            </div>

            <div className="divide-y" style={{ borderColor: "#F0EDE6" }}>
              {paginated.map((post) => (
                <div
                  key={post.id}
                  className="flex md:grid md:grid-cols-[1fr_160px_100px_100px] items-start md:items-center gap-3 px-5 py-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold leading-snug" style={{ color: "#0B1F3A" }}>
                        {post.title}
                      </span>
                      {post.featured && (
                        <span
                          className="text-xs px-2 py-0.5 rounded-full shrink-0"
                          style={{ background: "rgba(200,144,42,0.12)", color: "#C8902A" }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: "#94A3B8" }}>
                      <span className="md:hidden">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                  </div>

                  <div className="hidden md:block text-sm truncate" style={{ color: "#64748B" }}>
                    {post.category}
                  </div>

                  <div className="hidden md:flex items-center gap-1 text-xs" style={{ color: "#94A3B8" }}>
                    <Calendar size={11} /> {post.publishedAt}
                  </div>

                  <div className="flex items-center gap-2 md:justify-end shrink-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      title="View"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                      style={{ borderColor: "#E2E0D8", color: "#64748B" }}
                    >
                      <Eye size={13} />
                    </Link>
                    <Link
                      href={`/admin/edit/${post.id}`}
                      title="Edit"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border transition-colors"
                      style={{ borderColor: "#E2E0D8", color: "#0B1F3A" }}
                    >
                      <Edit size={13} />
                    </Link>
                    <button
                      onClick={() => deletePost(post.id, post.title)}
                      disabled={deleting === post.id}
                      title="Delete"
                      className="w-8 h-8 rounded-lg flex items-center justify-center border cursor-pointer disabled:opacity-40"
                      style={{ borderColor: "#FEE2E2", color: "#EF4444" }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderTop: "1px solid #F0EDE6" }}
              >
                <span className="text-xs" style={{ color: "#94A3B8" }}>
                  Page {page} of {totalPages} · {posts.length} posts
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border cursor-pointer disabled:opacity-40"
                    style={{ borderColor: "#E2E0D8", color: "#64748B" }}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className="w-8 h-8 rounded-lg text-xs font-semibold cursor-pointer"
                      style={{
                        background: p === page ? "#0B1F3A" : "transparent",
                        color: p === page ? "#E8AE4A" : "#64748B",
                        border: `1px solid ${p === page ? "#0B1F3A" : "#E2E0D8"}`,
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg flex items-center justify-center border cursor-pointer disabled:opacity-40"
                    style={{ borderColor: "#E2E0D8", color: "#64748B" }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
