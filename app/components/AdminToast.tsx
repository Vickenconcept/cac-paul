"use client";

import { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export type AdminToastType = "success" | "error";

interface AdminToastProps {
  message: string;
  type: AdminToastType;
  onDismiss: () => void;
}

export default function AdminToast({ message, type, onDismiss }: AdminToastProps) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSuccess = type === "success";

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[200] flex items-start gap-3 px-4 py-3 rounded-xl shadow-lg max-w-sm"
      style={{
        background: "#0B1F3A",
        color: "#FFFFFF",
        border: `1px solid ${isSuccess ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)"}`,
      }}
    >
      {isSuccess ? (
        <CheckCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#4ADE80" }} />
      ) : (
        <AlertCircle size={18} className="shrink-0 mt-0.5" style={{ color: "#F87171" }} />
      )}
      <p className="text-sm flex-1 leading-snug">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 p-0.5 rounded opacity-70 hover:opacity-100 cursor-pointer"
        aria-label="Dismiss"
      >
        <X size={16} />
      </button>
    </div>
  );
}
