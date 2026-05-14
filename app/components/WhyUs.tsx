"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  MessageSquare,
  Lock,
  Globe,
  Building,
  type LucideIcon,
} from "lucide-react";

interface Reason {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const REASONS: Reason[] = [
  {
    Icon: ShieldCheck,
    title: "Fully Accredited by the CAC",
    description:
      "We are an experienced CAC accredited agent registered with the Corporate Affairs Commission. Your filings go through properly, first time, every time.",
  },
  {
    Icon: Zap,
    title: "Fast, Guaranteed Turnaround",
    description:
      "Standard incorporation in 24 to 72 hours. We track every application and notify you at each stage: no ghosting, no delays, no excuses.",
  },
  {
    Icon: MessageSquare,
    title: "Dedicated Registration Advisory",
    description:
      "You get a dedicated accredited agent, not a chatbot. We advise on the right structure, compliance obligations, and regulatory requirements for your industry.",
  },
  {
    Icon: Lock,
    title: "100% Transparent Pricing",
    description:
      "No hidden fees. No surprises. You see everything upfront: our fee, CAC government charges, and any stamp duties. What we quote is what you pay.",
  },
  {
    Icon: Globe,
    title: "Nationwide Remote Service",
    description:
      "Serving clients across all 36 states and the FCT, and in the diaspora. Everything is handled digitally. You never need to visit a CAC office.",
  },
  {
    Icon: Building,
    title: "10+ Years of Legal Experience",
    description:
      "Over a decade of CAC filings, corporate compliance, and accredited agency work. We have seen every scenario and know how to handle yours.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 relative overflow-hidden" style={{ background: "#0B1F3A" }}>
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(200,144,42,0.12) 1px, transparent 0)",
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #C8902A 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(200,144,42,0.15)", color: "#E8AE4A", border: "1px solid rgba(200,144,42,0.3)" }}
            >
              Why Choose Us
            </span>
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight"
                          >
              Nigeria&apos;s Most Reliable{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                CAC Registration Partner
              </span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.75, fontSize: "1.0625rem" }}>
              We are an experienced CAC accredited agent, fully accredited with the Commission. Since
              2014 we have helped thousands of entrepreneurs, SMEs, NGOs, and corporations establish and
              maintain their legal presence in Nigeria.
            </p>
          </motion.div>

          {/* Credential badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-wrap gap-4 lg:justify-end lg:pt-8"
          >
            {[
              { label: "🏛️ Accredited CAC Agent", sub: "Since 2014" },
              { label: "A+ CAC Rated", sub: "Premium status" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="px-6 py-4 rounded-2xl text-center"
                style={{
                  background: "rgba(200,144,42,0.08)",
                  border: "1px solid rgba(200,144,42,0.25)",
                }}
              >
                <div className="text-white font-bold text-base mb-1">{badge.label}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {badge.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="p-6 rounded-2xl group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(200,144,42,0.12)",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(200,144,42,0.07)";
                el.style.borderColor = "rgba(200,144,42,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(200,144,42,0.12)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(200,144,42,0.12)" }}
              >
                <reason.Icon size={22} style={{ color: "#E8AE4A" }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{reason.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
