"use client";

import Link from "next/link";
import type { Post } from "@/lib/posts";
import { Calendar, Clock, ArrowRight, Tag, BookOpen } from "lucide-react";

export function FeaturedPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group p-7 rounded-2xl flex flex-col gap-4"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E0D8",
        boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
        textDecoration: "none",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.boxShadow = "0 12px 40px rgba(200,144,42,0.15)";
        el.style.borderColor = "rgba(200,144,42,0.35)";
        el.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
        el.style.borderColor = "#E2E0D8";
        el.style.transform = "translateY(0)";
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="text-xs font-bold tracking-wide px-3 py-1 rounded-full"
          style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A" }}
        >
          <Tag size={10} className="inline mr-1" />
          {post.category}
        </span>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{ background: "#0B1F3A", color: "#E8AE4A" }}
        >
          Featured
        </span>
      </div>
      <h3
        className="text-xl font-bold leading-snug"
        style={{ color: "#0B1F3A" }}
      >
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#64748B" }}>
        {post.excerpt}
      </p>
      <div
        className="flex items-center justify-between pt-4"
        style={{ borderTop: "1px solid #F0EDE6" }}
      >
        <div className="flex items-center gap-4 text-xs" style={{ color: "#64748B" }}>
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.publishedAt}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>
        <span
          className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
          style={{ color: "#C8902A" }}
        >
          Read <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export function RegularPostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group p-6 rounded-2xl flex flex-col gap-3"
      style={{
        background: "#FFFFFF",
        border: "1px solid #E2E0D8",
        textDecoration: "none",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.boxShadow = "0 8px 30px rgba(200,144,42,0.12)";
        el.style.borderColor = "rgba(200,144,42,0.3)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.boxShadow = "none";
        el.style.borderColor = "#E2E0D8";
      }}
    >
      <span
        className="text-xs font-bold tracking-wide px-3 py-1 rounded-full self-start"
        style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A" }}
      >
        {post.category}
      </span>
      <h3 className="text-base font-bold leading-snug" style={{ color: "#0B1F3A" }}>
        {post.title}
      </h3>
      <p className="text-sm leading-relaxed flex-1" style={{ color: "#64748B" }}>
        {post.excerpt.slice(0, 100)}…
      </p>
      <div
        className="flex items-center gap-3 text-xs pt-2"
        style={{ color: "#64748B", borderTop: "1px solid #F0EDE6" }}
      >
        <span className="flex items-center gap-1">
          <Clock size={11} /> {post.readTime}
        </span>
        <span>{post.publishedAt}</span>
      </div>
    </Link>
  );
}

export function EmptyBlog() {
  return (
    <div className="text-center py-20" style={{ color: "#64748B" }}>
      <BookOpen size={48} className="mx-auto mb-4 opacity-30" />
      <p className="text-lg font-medium">No articles yet. Check back soon!</p>
    </div>
  );
}
