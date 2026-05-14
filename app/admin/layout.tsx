"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  LogOut,
  Eye,
  Menu,
  X,
} from "lucide-react";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin2025";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/posts", label: "Blog Posts", icon: BookOpen, exact: false },
  { href: "/admin/leads", label: "Leads", icon: Users, exact: false },
];

function Sidebar({ onLogout, onClose }: { onLogout: () => void; onClose?: () => void }) {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div
      className="flex flex-col h-full"
      style={{ background: "#0B1F3A", borderRight: "1px solid rgba(200,144,42,0.12)" }}
    >
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
            >
              P&amp;A
            </div>
            <div>
              <div className="text-white font-bold text-sm">Admin Panel</div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                Content Manager
              </div>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-white opacity-60 cursor-pointer">
              <X size={18} />
            </button>
          )}
        </div>

        <nav className="space-y-1">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150"
                style={{
                  background: active ? "rgba(200,144,42,0.12)" : "transparent",
                  color: active ? "#E8AE4A" : "rgba(255,255,255,0.65)",
                  borderLeft: active ? "3px solid #C8902A" : "3px solid transparent",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl transition-colors"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          <Eye size={15} /> View Website
        </Link>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl w-full cursor-pointer transition-colors"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <LogOut size={15} /> Sign out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem("cac_admin_auth") === "true");
  }, []);

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

  // Loading state (checking session)
  if (authed === null) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0B1F3A" }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: "#C8902A", borderTopColor: "transparent" }}
        />
      </div>
    );
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
            <h1 className="text-xl font-bold text-white mb-1">Admin Panel</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
              CACPro · Palmary Green Kampos Limited
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
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF" }}
              />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-sm cursor-pointer"
              style={{ background: "linear-gradient(135deg, #C8902A, #E8AE4A)", color: "#060F1C" }}
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

  // Authenticated layout
  return (
    <div className="min-h-screen flex" style={{ background: "#F4F1E8" }}>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:z-30">
        <Sidebar onLogout={logout} />
      </div>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: "rgba(0,0,0,0.5)" }}
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden"
            >
              <Sidebar onLogout={logout} onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <div
          className="sticky top-0 z-20 px-4 sm:px-6 py-3 flex items-center gap-3"
          style={{
            background: "rgba(244,241,232,0.95)",
            borderBottom: "1px solid #E2E0D8",
            backdropFilter: "blur(8px)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg cursor-pointer"
            style={{ color: "#0B1F3A" }}
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg"
            style={{ color: "#64748B", border: "1px solid #E2E0D8", background: "#FFFFFF" }}
          >
            <Eye size={12} /> View Site
          </Link>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
