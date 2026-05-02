"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Shield, Clock, Award } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

const BADGES = [
  { icon: Shield, label: "CAC Accredited Agent" },
  { icon: Award, label: "RC Verified" },
  { icon: Clock, label: "24–72hr Turnaround" },
];

export default function Hero() {
  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        background: "linear-gradient(145deg, #060F1C 0%, #0B1F3A 45%, #0F2847 75%, #0B1F3A 100%)",
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(200,144,42,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,144,42,0.04) 0%, transparent 50%)",
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,144,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(200,144,42,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8 tracking-widest uppercase"
              style={{
                background: "rgba(200,144,42,0.12)",
                border: "1px solid rgba(200,144,42,0.3)",
                color: "#E8AE4A",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8AE4A] animate-pulse" />
              ✦ Accredited CAC Agent &nbsp;|&nbsp; RC Verified
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
              style={{ color: "#FFFFFF" }}
            >
              Register Your{" "}
              <span className="block">Business,</span>
              <span
                className="block italic"
                style={{
                  background: "linear-gradient(135deg, #C8902A 0%, #E8AE4A 50%, #C8902A 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                The Right Way.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              Nigeria&apos;s trusted accredited CAC Agent for seamless business name registration,
              company incorporation, and all post-incorporation compliance — handled by certified
              legal professionals, delivered without stress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <a
                href={`https://wa.me/${WHATSAPP}?text=Hello%20Paul%20%26%20Associates%2C%20I%20want%20to%20start%20my%20business%20registration.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Start Registration <ArrowRight size={18} />
              </a>
              <button
                onClick={scrollToServices}
                className="btn-outline flex items-center gap-2"
              >
                Explore Services <ChevronDown size={16} />
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {BADGES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  <Icon size={14} style={{ color: "#E8AE4A" }} />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Stats cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:grid grid-cols-2 gap-5"
          >
            {[
              { num: "2,500+", label: "Businesses Registered", sub: "And counting" },
              { num: "48hrs", label: "Average Turnaround", sub: "Most done in 24hrs" },
              { num: "100%", label: "CAC Accredited", sub: "Licensed & verified" },
              { num: "36", label: "States Covered", sub: "Fully remote service" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,144,42,0.15)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <span
                  className="text-4xl font-black mb-1"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.num}
                </span>
                <span className="text-white font-semibold text-sm mb-1">{stat.label}</span>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {stat.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollToServices}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} style={{ color: "rgba(200,144,42,0.6)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
