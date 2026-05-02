"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, Shield, Award, Star, BarChart3, Zap, BadgeCheck, Globe } from "lucide-react";

const STATS = [
  { num: "2,500+", label: "Businesses Registered", Icon: BarChart3 },
  { num: "48hrs", label: "Average Turnaround", Icon: Zap },
  { num: "100%", label: "CAC Accredited", Icon: BadgeCheck },
  { num: "36", label: "States Covered", Icon: Globe },
];

const TRUST = [
  { icon: Shield, label: "CAC Accredited Agent" },
  { icon: Award, label: "FIRS Registered" },
  { icon: CheckCircle, label: "SSL Secured" },
  { icon: Star, label: "5-Star Rated Service" },
  { icon: CheckCircle, label: "10+ Years Experience" },
];

function Counter({ value }: { value: string }) {
  return (
    <span
      className="text-4xl md:text-5xl font-black"
      style={{
        fontFamily: "var(--font-poppins)",
        background: "linear-gradient(135deg, #C8902A 0%, #E8AE4A 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {value}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ background: "#FAFAF8" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E0D8",
                boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
              }}
            >
            <div
                className="text-3xl mb-3 w-14 h-14 rounded-xl flex items-center justify-center mx-auto"
                style={{ background: "rgba(200,144,42,0.08)" }}
              >
                <stat.Icon size={26} style={{ color: "#C8902A" }} />
              </div>
              <Counter value={stat.num} />
              <p className="mt-2 text-sm font-medium" style={{ color: "#64748B" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 py-6 px-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0B1F3A 0%, #0F2847 100%)",
            border: "1px solid rgba(200,144,42,0.2)",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase w-full md:w-auto text-center"
            style={{ color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}
          >
            Trusted By
          </span>
          {TRUST.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-center gap-2"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              <Icon size={15} style={{ color: "#E8AE4A" }} />
              <span className="text-sm font-medium whitespace-nowrap">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
