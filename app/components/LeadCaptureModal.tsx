"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, User, ArrowRight, MessageCircle } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  waUrl: string;
  source?: string;
  title?: string;
  subtitle?: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  waUrl,
  source = "modal",
  title = "Before We Connect",
  subtitle = "Leave your details and we'll reach out right away — or skip straight to WhatsApp.",
}: LeadCaptureModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });
    } catch {
      // silently fail — don't block the user
    }
    setSaving(false);
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  function handleSkip() {
    window.open(waUrl, "_blank", "noopener,noreferrer");
    onClose();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "rgba(6,15,28,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="w-full max-w-md rounded-2xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
                pointerEvents: "auto",
              }}
            >
              {/* Header */}
              <div
                className="px-6 py-5 flex items-start justify-between"
                style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(200,144,42,0.15)" }}
                  >
                    <MessageCircle size={20} style={{ color: "#E8AE4A" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{title}</h3>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Paul &amp; Associates CAC Services
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white opacity-50 hover:opacity-100 transition-opacity cursor-pointer mt-1"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-sm mb-5" style={{ color: "#64748B" }}>
                  {subtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0B1F3A" }}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#C8902A" }}
                      />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        placeholder="e.g. Emeka Okafor"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: errors.name ? "1.5px solid #EF4444" : "1.5px solid #E2E0D8",
                          background: "#FAFAF8",
                          color: "#1A1A2E",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = errors.name ? "#EF4444" : "#C8902A")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = errors.name ? "#EF4444" : "#E2E0D8")
                        }
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs mt-1 text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0B1F3A" }}>
                      WhatsApp / Phone Number *
                    </label>
                    <div className="relative">
                      <Phone
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#C8902A" }}
                      />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                        placeholder="e.g. 08012345678"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: errors.phone ? "1.5px solid #EF4444" : "1.5px solid #E2E0D8",
                          background: "#FAFAF8",
                          color: "#1A1A2E",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderColor = errors.phone ? "#EF4444" : "#C8902A")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderColor = errors.phone ? "#EF4444" : "#E2E0D8")
                        }
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs mt-1 text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "#0B1F3A" }}>
                      Email Address{" "}
                      <span className="font-normal" style={{ color: "#64748B" }}>(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: "#C8902A" }}
                      />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        placeholder="e.g. emeka@gmail.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{
                          border: "1.5px solid #E2E0D8",
                          background: "#FAFAF8",
                          color: "#1A1A2E",
                        }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "#C8902A")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E0D8")}
                      />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                      color: "#060F1C",
                      boxShadow: "0 4px 20px rgba(200,144,42,0.35)",
                    }}
                  >
                    {saving ? "Saving…" : (
                      <>
                        Save &amp; Open WhatsApp <ArrowRight size={15} />
                      </>
                    )}
                  </button>
                </form>

                {/* Skip */}
                <button
                  onClick={handleSkip}
                  className="w-full mt-3 py-2 text-sm cursor-pointer transition-colors"
                  style={{ color: "#64748B" }}
                >
                  Skip and go directly to WhatsApp →
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
