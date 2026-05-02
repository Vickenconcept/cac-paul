"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowLeft, Save, Eye } from "lucide-react";

const TiptapEditor = dynamic(() => import("../../../components/TiptapEditor"), { ssr: false });

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    category: "Business Registration",
    author: "Paul & Associates",
    readTime: "5 min read",
    featured: false,
    coverImage: "",
  });
  const [content, setContent] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !content) {
      alert("Please fill in the title and write some content.");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, content }),
    });
    if (res.ok) {
      router.push("/admin/posts");
    } else {
      alert("Failed to save post. Please try again.");
      setSaving(false);
    }
  }

  const CATEGORIES = [
    "Business Registration",
    "Business Structure",
    "Compliance",
    "Legal Tips",
    "NGO & Non-Profits",
    "Post-Incorporation",
    "CAC Updates",
    "General",
  ];

  return (
    <div className="space-y-5 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg"
            style={{ color: "#64748B", border: "1px solid #E2E0D8", background: "#FFFFFF" }}
          >
            <ArrowLeft size={14} /> Posts
          </Link>
          <h1 className="text-lg font-bold" style={{ color: "#0B1F3A" }}>
            New Blog Post
          </h1>
        </div>
        <button
          form="post-form"
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl font-bold cursor-pointer disabled:opacity-60"
          style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
        >
          <Save size={14} />
          {saving ? "Saving…" : "Publish Post"}
        </button>
      </div>

      <form id="post-form" onSubmit={handleSave}>
        <div className="grid lg:grid-cols-[1fr_300px] gap-7">
          {/* Main editor */}
          <div className="space-y-5">
            <div
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
            >
              <label className="block text-xs font-bold mb-2" style={{ color: "#0B1F3A" }}>
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="E.g. How to Register a Business Name in Nigeria"
                required
                className="w-full text-lg font-bold outline-none"
                style={{ color: "#0B1F3A", border: "none", background: "transparent" }}
              />
            </div>

            <div
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
            >
              <label className="block text-xs font-bold mb-2" style={{ color: "#0B1F3A" }}>
                Excerpt / Meta Description *
              </label>
              <textarea
                name="excerpt"
                value={form.excerpt}
                onChange={handleChange}
                placeholder="A short summary of the post (used in blog listing and SEO meta description)…"
                rows={3}
                className="w-full text-sm outline-none resize-none"
                style={{ color: "#64748B", border: "none", background: "transparent" }}
              />
            </div>

            <div>
              <div className="text-xs font-bold mb-2" style={{ color: "#0B1F3A" }}>
                Post Content *
              </div>
              <TiptapEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your blog post content here…"
              />
            </div>
          </div>

          {/* Sidebar settings */}
          <div className="space-y-5">
            <div
              className="p-5 rounded-2xl"
              style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
            >
              <h3 className="text-sm font-bold mb-4" style={{ color: "#0B1F3A" }}>
                Post Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>
                    Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #E2E0D8", background: "#FAFAF8", color: "#1A1A2E" }}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Author</label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #E2E0D8", background: "#FAFAF8", color: "#1A1A2E" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    value={form.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 5 min read"
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #E2E0D8", background: "#FAFAF8", color: "#1A1A2E" }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "#64748B" }}>Cover Image URL</label>
                  <input
                    type="url"
                    name="coverImage"
                    value={form.coverImage}
                    onChange={handleChange}
                    placeholder="https://…"
                    className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                    style={{ border: "1px solid #E2E0D8", background: "#FAFAF8", color: "#1A1A2E" }}
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#C8902A]"
                  />
                  <span className="text-sm font-medium" style={{ color: "#1A1A2E" }}>
                    Mark as Featured
                  </span>
                </label>
              </div>
            </div>

            <div
              className="p-4 rounded-2xl text-sm"
              style={{ background: "rgba(200,144,42,0.06)", border: "1px solid rgba(200,144,42,0.2)", color: "#64748B" }}
            >
              <div className="flex items-start gap-2">
                <Eye size={14} className="shrink-0 mt-0.5" style={{ color: "#C8902A" }} />
                <p>After publishing, your post will be live on the blog immediately.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
