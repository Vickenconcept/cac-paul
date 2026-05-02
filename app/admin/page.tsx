"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@/lib/posts";
import {
  LayoutDashboard,
  PlusCircle,
  Edit,
  Trash2,
  Eye,
  BookOpen,
  Calendar,
  Clock,
  LogOut,
} from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2025";

export default function AdminPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("cac_admin_auth");
    if (stored === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) fetchPosts();
  }, [authed]);

  async function fetchPosts() {
    setLoading(true);
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("cac_admin_auth", "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  function logout() {
    sessionStorage.removeItem("cac_admin_auth");
    setAuthed(false);
  }

  async function deletePost(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    await fetchPosts();
    setDeleting(null);
  }

  // Login screen
  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
      >
        <div
          className="w-full max-w-sm p-8 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(200,144,42,0.2)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="text-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl mx-auto mb-4"
              style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
            >
              P&amp;A
            </div>
            <h1
              className="text-xl font-bold text-white mb-1"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Admin Panel
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              Paul &amp; Associates CAC Services
            </p>
          </div>

          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.7)" }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#FFFFFF",
                }}
              />
            </div>
            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                color: "#060F1C",
              }}
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/" className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
              ← Back to website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen" style={{ background: "#F4F1E8" }}>
      {/* Sidebar */}
      <div
        className="fixed top-0 left-0 h-full w-64 flex flex-col z-30 hidden lg:flex"
        style={{
          background: "#0B1F3A",
          borderRight: "1px solid rgba(200,144,42,0.15)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
            >
              P&amp;A
            </div>
            <div>
              <div className="text-white font-bold text-sm">Admin Panel</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Content Manager</div>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { icon: LayoutDashboard, label: "Dashboard", active: true },
              { icon: BookOpen, label: "Blog Posts", active: false },
            ].map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  background: active ? "rgba(200,144,42,0.1)" : "transparent",
                  color: active ? "#E8AE4A" : "rgba(255,255,255,0.6)",
                }}
              >
                <Icon size={16} />
                {label}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm cursor-pointer"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <div
          className="px-6 py-4 flex items-center justify-between sticky top-0 z-20"
          style={{
            background: "rgba(244,241,232,0.95)",
            borderBottom: "1px solid #E2E0D8",
            backdropFilter: "blur(8px)",
          }}
        >
          <h1 className="text-lg font-bold" style={{ color: "#0B1F3A" }}>
            Blog Posts
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg transition-colors"
              style={{ color: "#64748B", border: "1px solid #E2E0D8" }}
            >
              <Eye size={14} /> View Site
            </Link>
            <button
              onClick={logout}
              className="lg:hidden flex items-center gap-1.5 text-sm px-3 py-2 rounded-lg cursor-pointer"
              style={{ color: "#64748B" }}
            >
              <LogOut size={14} />
            </button>
            <Link
              href="/admin/new"
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg font-semibold"
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                color: "#060F1C",
              }}
            >
              <PlusCircle size={15} />
              New Post
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Posts", value: posts.length.toString(), icon: BookOpen },
              { label: "Featured", value: posts.filter((p) => p.featured).length.toString(), icon: Eye },
              { label: "Categories", value: [...new Set(posts.map((p) => p.category))].length.toString(), icon: LayoutDashboard },
              { label: "Latest Post", value: posts[0]?.publishedAt || "—", icon: Calendar },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="p-4 rounded-xl"
                style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} style={{ color: "#C8902A" }} />
                  <span className="text-xs" style={{ color: "#64748B" }}>{label}</span>
                </div>
                <div className="text-xl font-bold" style={{ color: "#0B1F3A" }}>{value}</div>
              </div>
            ))}
          </div>

          {/* Posts table */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
          >
            <div
              className="px-6 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid #E2E0D8" }}
            >
              <h2 className="font-bold" style={{ color: "#0B1F3A" }}>All Posts</h2>
            </div>

            {loading ? (
              <div className="text-center py-12" style={{ color: "#64748B" }}>Loading posts…</div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={40} className="mx-auto mb-3 opacity-30" style={{ color: "#C8902A" }} />
                <p style={{ color: "#64748B" }}>No posts yet. Create your first one!</p>
                <Link
                  href="/admin/new"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-lg text-sm font-semibold"
                  style={{ background: "#0B1F3A", color: "#E8AE4A" }}
                >
                  <PlusCircle size={14} /> Create First Post
                </Link>
              </div>
            ) : (
              <div className="divide-y" style={{ borderColor: "#F0EDE6" }}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start gap-4 px-6 py-4 hover:bg-[#FAFAF8] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3
                          className="font-semibold text-sm leading-snug"
                          style={{ color: "#0B1F3A" }}
                        >
                          {post.title}
                        </h3>
                        {post.featured && (
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-medium shrink-0"
                            style={{ background: "rgba(200,144,42,0.12)", color: "#C8902A" }}
                          >
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
                        <span>{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {post.publishedAt}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {post.readTime}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: "#64748B", border: "1px solid #E2E0D8" }}
                        title="View post"
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        href={`/admin/edit/${post.id}`}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: "#0B1F3A", border: "1px solid #E2E0D8" }}
                        title="Edit post"
                      >
                        <Edit size={14} />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id, post.title)}
                        disabled={deleting === post.id}
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer disabled:opacity-50"
                        style={{ color: "#EF4444", border: "1px solid #FEE2E2" }}
                        title="Delete post"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
