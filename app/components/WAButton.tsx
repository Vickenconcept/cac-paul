"use client";

import { useState } from "react";
import LeadCaptureModal from "./LeadCaptureModal";

interface WAButtonProps {
  waUrl: string;
  source?: string;
  modalTitle?: string;
  modalSubtitle?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

/**
 * Drop-in wrapper for any WhatsApp CTA. Shows the lead-capture modal first,
 * then opens WhatsApp once the user submits their details (or skips).
 */
export default function WAButton({
  waUrl,
  source = "website",
  modalTitle,
  modalSubtitle,
  className,
  style,
  onClick,
  children,
}: WAButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        onClick={() => {
          onClick?.();
          setOpen(true);
        }}
      >
        {children}
      </button>

      <LeadCaptureModal
        isOpen={open}
        onClose={() => setOpen(false)}
        waUrl={waUrl}
        source={source}
        title={modalTitle}
        subtitle={modalSubtitle}
      />
    </>
  );
}
