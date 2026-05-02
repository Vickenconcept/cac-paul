"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, BookOpen, TrendingUp, Clock, ArrowRight, PlusCircle } from "lucide-react";
import type { Post } from "@/lib/posts";
import type { Lead } from "@/lib/leads";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [pRes, lRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/leads?limit=50"),
      ]);
      const postsData = await pRes.json();
      const leadsData = await lRes.json();
      setPosts(postsData);
      setLeads(leadsData.leads ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - 7);

  const leadsThisWeek = leads.filter(
    (l) => new Date(l.createdAt) >= startOfWeek
  ).length;

  const STATS = [
    {
      label: "Total Leads",
      value: loading ? "—" : leads.length.toString(),
      icon: Users,
      color: "#C8902A",
      sub: `${leadsThisWeek} this week`,
      href: "/admin/leads",
    },
    {
      label: "Blog Posts",
      value: loading ? "—" : posts.length.toString(),
      icon: BookOpen,
      color: "#0B1F3A",
      sub: `${posts.filter((p) => p.featured).length} featured`,
      href: "/admin/posts",
    },
    {
      label: "This Week's Leads",
      value: loading ? "—" : leadsThisWeek.toString(),
      icon: TrendingUp,
      color: "#16A34A",
      sub: "New enquiries",
      href: "/admin/leads",
    },
    {
      label: "Latest Post",
      value: loading ? "—" : (posts[0]?.publishedAt ?? "—"),
      icon: Clock,
      color: "#6366F1",
      sub: posts[0]?.title?.slice(0, 22) + (posts[0]?.title?.length > 22 ? "…" : "") || "No posts yet",
      href: "/admin/posts",
    },
  ];

  const recentLeads = leads.slice(0, 5);
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0B1F3A" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            Welcome back — here&apos;s an overview of your site activity.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="hidden sm:flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-semibold"
          style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
        >
          <PlusCircle size={15} /> New Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, icon: Icon, color, sub, href }) => (
          <Link
            key={label}
            href={href}
            className="p-5 rounded-2xl flex flex-col gap-3 transition-all duration-200"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E2E0D8",
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `${color}15` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="text-2xl font-black" style={{ color: "#0B1F3A" }}>
                {value}
              </div>
              <div className="text-xs font-semibold mt-0.5" style={{ color: "#64748B" }}>
                {label}
              </div>
              <div className="text-xs mt-1" style={{ color: "#94A3B8" }}>
                {sub}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid #F0EDE6" }}
          >
            <h2 className="font-bold text-sm" style={{ color: "#0B1F3A" }}>
              Recent Leads
            </h2>
            <Link
              href="/admin/leads"
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "#C8902A" }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-10 text-sm" style={{ color: "#94A3B8" }}>
              Loading…
            </div>
          ) : recentLeads.length === 0 ? (
            <div className="text-center py-10 text-sm" style={{ color: "#94A3B8" }}>
              No leads yet
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#F0EDE6" }}>
              {recentLeads.map((lead) => (
                <div key={lead.id} className="px-5 py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A" }}
                  >
                    {(lead.name?.[0] ?? "?").toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: "#0B1F3A" }}>
                      {lead.name || "Anonymous"}
                    </div>
                    <div className="text-xs truncate" style={{ color: "#64748B" }}>
                      {lead.phone} {lead.email ? `· ${lead.email}` : ""}
                    </div>
                  </div>
                  <div className="text-xs shrink-0" style={{ color: "#94A3B8" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Posts */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
        >
          <div
            className="px-5 py-4 flex items-center justify-between"
            style={{ borderBottom: "1px solid #F0EDE6" }}
          >
            <h2 className="font-bold text-sm" style={{ color: "#0B1F3A" }}>
              Recent Posts
            </h2>
            <Link
              href="/admin/posts"
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: "#C8902A" }}
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-10 text-sm" style={{ color: "#94A3B8" }}>Loading…</div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm mb-3" style={{ color: "#94A3B8" }}>No posts yet</p>
              <Link
                href="/admin/posts/new"
                className="text-xs font-semibold"
                style={{ color: "#C8902A" }}
              >
                + Create your first post
              </Link>
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: "#F0EDE6" }}>
              {recentPosts.map((post) => (
                <div key={post.id} className="px-5 py-3 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(11,31,58,0.06)" }}
                  >
                    <BookOpen size={13} style={{ color: "#0B1F3A" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate" style={{ color: "#0B1F3A" }}>
                      {post.title}
                    </div>
                    <div className="text-xs" style={{ color: "#64748B" }}>
                      {post.category} · {post.publishedAt}
                    </div>
                  </div>
                  {post.featured && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A" }}
                    >
                      Featured
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
