"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    rating: 5,
    text: "I needed my company incorporated in less than 3 days before a major contract signing. The team delivered in exactly 48 hours. Certificate, status report: everything. Absolutely phenomenal service.",
    displayName: "A. O.",
    location: "Lagos",
  },
  {
    rating: 5,
    text: "I had been struggling to file our annual returns for two years. They sorted everything: outstanding filings, penalties addressed, company restored. I should have reached out sooner!",
    displayName: "B. M.",
    location: "Abuja",
  },
  {
    rating: 5,
    text: "They registered our NGO from start to finish: constitution, newspaper publication, gazette. Transparent, professional, and genuinely knowledgeable about nonprofit compliance. Highly recommend!",
    displayName: "F. E.",
    location: "Port Harcourt",
  },
  {
    rating: 5,
    text: "As a diaspora Nigerian registering a business remotely, I was skeptical. The team guided me every step, answered every question, and I have my RC number without setting foot in Nigeria. Outstanding!",
    displayName: "K. A.",
    location: "UK",
  },
  {
    rating: 5,
    text: "The name change and amendment of our objects clause was handled flawlessly. What I thought would take months took just two weeks. Their post incorporation expertise is unmatched in Nigeria.",
    displayName: "T. N.",
    location: "Kano",
  },
  {
    rating: 5,
    text: "We used them for the share allotment when we brought on investors. They prepared all the board resolutions, CAC filings, and share certificates: clean, error free, and investor ready.",
    displayName: "D. O.",
    location: "Lagos",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [page, setPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(TESTIMONIALS.length / perPage);
  const shown = TESTIMONIALS.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: "#FAFAF8" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A", border: "1px solid rgba(200,144,42,0.25)" }}
          >
            Client Stories
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-5"
            style={{ color: "#0B1F3A" }}
          >
            Trusted by Founders{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Across Nigeria
            </span>
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "#64748B" }}>
            From first time entrepreneurs to established enterprises: see what our clients say about
            working with us.
          </p>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          >
            {shown.map((t) => (
              <div
                key={`${t.displayName}-${t.location}-${page}`}
                className="p-7 rounded-2xl flex flex-col gap-4"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E0D8",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} style={{ color: "#E8AE4A", fontSize: "0.9rem" }}>★</span>
                  ))}
                </div>
                <Quote size={20} style={{ color: "rgba(200,144,42,0.3)" }} />
                <p className="text-sm leading-relaxed flex-1 italic" style={{ color: "#1A1A2E" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #F0EDE6" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #0B1F3A, #1A3A5C)",
                      color: "#E8AE4A",
                    }}
                  >
                    {t.displayName.replace(/\.\s*/g, "").replace(/\s/g, "")}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "#0B1F3A" }}>
                      {t.displayName}
                    </div>
                    <div className="text-xs" style={{ color: "#64748B" }}>
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: "#C8902A", color: "#C8902A" }}
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background: i === page ? "#C8902A" : "#E2E0D8",
                  transform: i === page ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ borderColor: "#C8902A", color: "#C8902A" }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
