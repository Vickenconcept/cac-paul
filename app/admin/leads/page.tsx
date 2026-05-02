"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  message: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

const SOURCE_LABELS: Record<string, string> = {
  "hero": "Hero",
  "cta-section": "CTA",
  "whatsapp-float": "WhatsApp Float",
  "faq": "FAQ",
  "website": "Website",
};

function sourceBadge(source: string) {
  const colors: Record<string, { bg: string; color: string }> = {
    hero: { bg: "rgba(99,102,241,0.1)", color: "#6366F1" },
    "cta-section": { bg: "rgba(200,144,42,0.1)", color: "#C8902A" },
    "whatsapp-float": { bg: "rgba(37,211,102,0.1)", color: "#16A34A" },
    faq: { bg: "rgba(11,31,58,0.08)", color: "#0B1F3A" },
    website: { bg: "rgba(100,116,139,0.1)", color: "#64748B" },
  };
  const style = colors[source] ?? colors.website;
  return (
    <span
      className="text-xs px-2.5 py-0.5 rounded-full font-medium"
      style={{ background: style.bg, color: style.color }}
    >
      {SOURCE_LABELS[source] ?? source}
    </span>
  );
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchLeads = useCallback(async (p: number) => {
    setLoading(true);
    const res = await fetch(`/api/leads?page=${p}&limit=${PAGE_SIZE}`);
    const data = await res.json();
    setLeads(data.leads ?? []);
    setTotal(data.total ?? 0);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLeads(page); }, [page, fetchLeads]);

  function exportCSV() {
    const header = "Name,Phone,Email,Source,Date\n";
    const rows = leads.map((l) =>
      `"${l.name}","${l.phone}","${l.email}","${l.source}","${new Date(l.createdAt).toLocaleString("en-NG")}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-page-${page}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-5 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#0B1F3A" }}>Leads</h1>
          <p className="text-sm mt-1" style={{ color: "#64748B" }}>
            {total} contact{total !== 1 ? "s" : ""} captured
          </p>
        </div>
        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-semibold cursor-pointer disabled:opacity-40"
          style={{ border: "1px solid #E2E0D8", background: "#FFFFFF", color: "#0B1F3A" }}
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
      >
        {loading ? (
          <div className="text-center py-16 text-sm" style={{ color: "#64748B" }}>
            Loading leads…
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-20">
            <Users size={40} className="mx-auto mb-3 opacity-20" />
            <p className="text-sm" style={{ color: "#64748B" }}>No leads captured yet</p>
            <p className="text-xs mt-2" style={{ color: "#94A3B8" }}>
              Leads will appear here when visitors fill the WhatsApp contact form
            </p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div
              className="hidden md:grid grid-cols-[1.5fr_1fr_1.5fr_100px_100px] px-5 py-3 text-xs font-bold uppercase tracking-wider"
              style={{ borderBottom: "1px solid #F0EDE6", color: "#94A3B8", background: "#FAFAF8" }}
            >
              <span>Contact</span>
              <span>Phone</span>
              <span>Email</span>
              <span>Source</span>
              <span>Date</span>
            </div>

            <div className="divide-y" style={{ borderColor: "#F0EDE6" }}>
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col md:grid md:grid-cols-[1.5fr_1fr_1.5fr_100px_100px] md:items-center gap-1 md:gap-0 px-5 py-4"
                >
                  {/* Name */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                      style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A" }}
                    >
                      {(lead.name?.[0] ?? "?").toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "#0B1F3A" }}>
                        {lead.name || "Anonymous"}
                      </div>
                      {lead.message && (
                        <div className="text-xs truncate max-w-[200px]" style={{ color: "#94A3B8" }}>
                          {lead.message}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-1.5 text-sm" style={{ color: "#64748B" }}>
                    <Phone size={12} className="shrink-0" style={{ color: "#C8902A" }} />
                    {lead.phone || "—"}
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-1.5 text-sm truncate" style={{ color: "#64748B" }}>
                    <Mail size={12} className="shrink-0" style={{ color: "#6366F1" }} />
                    {lead.email || "—"}
                  </div>

                  {/* Source */}
                  <div>{sourceBadge(lead.source)}</div>

                  {/* Date */}
                  <div className="text-xs" style={{ color: "#94A3B8" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{ borderTop: "1px solid #F0EDE6" }}
            >
              <span className="text-xs" style={{ color: "#94A3B8" }}>
                Page {page} of {totalPages} · {total} total leads
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

                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let p: number;
                  if (totalPages <= 7) {
                    p = i + 1;
                  } else if (page <= 4) {
                    p = i + 1;
                  } else if (page >= totalPages - 3) {
                    p = totalPages - 6 + i;
                  } else {
                    p = page - 3 + i;
                  }
                  return (
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
                  );
                })}

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
          </>
        )}
      </div>
    </div>
  );
}
