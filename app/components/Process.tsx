"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MessageCircle,
  Search,
  ClipboardList,
  Landmark,
  Trophy,
  type LucideIcon,
} from "lucide-react";

interface Step {
  num: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

const STEPS: Step[] = [
  {
    num: "01",
    title: "Consultation",
    description:
      "Tell us about your business and goals. We advise you on the best structure — Business Name, Ltd, PLC, or NGO — based on your needs and industry.",
    Icon: MessageCircle,
  },
  {
    num: "02",
    title: "Name Search",
    description:
      "We conduct an instant name availability search on the CAC portal to confirm your preferred name is available and not already in use.",
    Icon: Search,
  },
  {
    num: "03",
    title: "Documentation",
    description:
      "Submit required KYC documents digitally. We prepare all forms, Memoranda, Articles of Association, and supporting board resolutions.",
    Icon: ClipboardList,
  },
  {
    num: "04",
    title: "CAC Filing",
    description:
      "We file all documents on your behalf through the accredited CAC portal and pay all applicable government charges — nothing left to you.",
    Icon: Landmark,
  },
  {
    num: "05",
    title: "Certificate Delivery",
    description:
      "Receive your CAC Certificate of Incorporation or Registration digitally — and by courier if a physical copy is requested.",
    Icon: Trophy,
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" ref={ref} className="py-20 md:py-28" style={{ background: "#FAFAF8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A", border: "1px solid rgba(200,144,42,0.25)" }}
          >
            How It Works
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-5"
            style={{ color: "#0B1F3A" }}
          >
            From Inquiry to Certificate{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in 5 Simple Steps
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
            Our streamlined process is designed to be completely stress-free. Most clients never
            leave their home or office.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-0.5"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(200,144,42,0.3), rgba(200,144,42,0.3), transparent)",
            }}
            aria-hidden="true"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex flex-col items-center text-center relative"
              >
                {/* Step number circle */}
                <div
                  className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-5 border-4"
                  style={{
                    background: "#FFFFFF",
                    borderColor: "rgba(200,144,42,0.3)",
                    boxShadow: "0 0 0 8px rgba(200,144,42,0.06)",
                  }}
                >
                  <step.Icon size={26} style={{ color: "#C8902A" }} />
                </div>
                {/* Step badge */}
                <span
                  className="text-xs font-black tracking-widest mb-2"
                  style={{
                    background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {step.num}
                </span>
                <h3
                  className="text-base font-bold mb-3"
                  style={{ color: "#0B1F3A" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748B" }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
