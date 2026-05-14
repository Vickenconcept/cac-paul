"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail } from "lucide-react";
import LeadCaptureModal from "./LeadCaptureModal";
import { SITE_BRAND_ONLINE } from "../lib/brand";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";
const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "info@paulcacservices.ng";
const WA_URL = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hello ${SITE_BRAND_ONLINE}, I am ready to register my business.`)}`;

export default function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section ref={ref} className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0B1F3A" }}>
      {/* Decorative radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200,144,42,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,144,42,0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{ background: "rgba(200,144,42,0.15)", color: "#E8AE4A", border: "1px solid rgba(200,144,42,0.3)" }}
          >
            Ready to Start?
          </span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Ready to Make Your{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Business Official?
            </span>
          </h2>
          <p
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Join over 2,500 entrepreneurs and businesses who trusted CACPro to get
            them registered, compliant, and investor-ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary text-base px-8 py-4"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </button>
            <a
              href={`mailto:${EMAIL}?subject=CAC%20Registration%20Enquiry`}
              className="btn-outline text-base px-8 py-4 flex items-center gap-2"
            >
              <Mail size={18} />
              Send an Email
            </a>
          </div>

          <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Average response time: under 2 hours on business days
          </p>
        </motion.div>
      </div>

      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        waUrl={WA_URL}
        source="cta-section"
        title="Make Your Business Official"
        subtitle="Leave your contact details — we'll connect with you on WhatsApp and guide you through the registration process."
      />
    </section>
  );
}
