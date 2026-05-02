"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Star } from "lucide-react";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

const PLANS = [
  {
    id: "business-name",
    name: "Business Name",
    price: "₦45,000",
    sub: "All-inclusive. No hidden fees.",
    tagline: "Perfect for sole traders, freelancers & small businesses",
    popular: false,
    color: "#1A3A5C",
    features: [
      "Name availability search",
      "CAC Business Name registration",
      "Certificate of Registration",
      "Certified True Copy (CTC)",
      "Digital + physical delivery",
      "1 year compliance reminder",
    ],
    waMessage: "Hello Paul & Associates, I want to register a Business Name (₦45,000 package).",
  },
  {
    id: "limited-company",
    name: "Private Limited (Ltd)",
    price: "₦100,000",
    sub: "Up to 1,000,000 shares inclusive.",
    tagline: "For serious businesses ready to scale and attract investors",
    popular: true,
    color: "#C8902A",
    features: [
      "Name availability search",
      "Memorandum & Articles of Association",
      "CAC Ltd Incorporation filing",
      "Certificate of Incorporation (RC No.)",
      "Status Report & CTC",
      "Company seal (optional)",
      "Post-incorporation advisory",
      "1 year compliance reminder",
    ],
    waMessage:
      "Hello Paul & Associates, I want to incorporate a Private Limited Company (₦100,000 package).",
  },
  {
    id: "ngo",
    name: "NGO / Incorporated Trustees",
    price: "₦150,000",
    sub: "Includes publication, gazette & all CAC fees.",
    tagline: "For non-profits, faith bodies & community associations",
    popular: false,
    color: "#1A3A5C",
    features: [
      "Name availability search",
      "Constitution drafting",
      "Newspaper publication",
      "CAC gazette & filing",
      "Certificate of Incorporation",
      "Tax exemption guidance",
      "Full post-registration support",
    ],
    waMessage:
      "Hello Paul & Associates, I want to register an NGO / Incorporated Trustees (₦150,000 package).",
  },
];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" ref={ref} className="py-20 md:py-28" style={{ background: "#F4F1E8" }}>
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
            Transparent Pricing
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-5"
            style={{ color: "#0B1F3A" }}
          >
            Simple, All-Inclusive{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Packages
            </span>
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
            Government charges and our professional fees — clearly itemized, zero surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-7 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: plan.popular ? "#0B1F3A" : "#FFFFFF",
                border: plan.popular ? "2px solid #C8902A" : "1px solid #E2E0D8",
                boxShadow: plan.popular
                  ? "0 20px 60px rgba(200,144,42,0.25)"
                  : "0 4px 20px rgba(0,0,0,0.05)",
                transform: plan.popular ? "scale(1.03)" : "scale(1)",
              }}
            >
              {plan.popular && (
                <div
                  className="text-center py-2 text-xs font-bold tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                    color: "#060F1C",
                  }}
                >
                  <Star size={11} className="inline mr-1" />
                  Most Popular
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: plan.popular ? "#FFFFFF" : "#0B1F3A" }}
                >
                  {plan.name}
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: plan.popular ? "rgba(255,255,255,0.55)" : "#64748B" }}
                >
                  {plan.tagline}
                </p>

                <div className="mb-2">
                  <span
                    className="text-4xl font-black"
                    style={{
                      fontFamily: "var(--font-poppins)",
                      color: plan.popular ? "#E8AE4A" : "#0B1F3A",
                    }}
                  >
                    {plan.price}
                  </span>
                  <span className="text-sm ml-2" style={{ color: plan.popular ? "rgba(255,255,255,0.5)" : "#64748B" }}>
                    starting
                  </span>
                </div>
                <p
                  className="text-xs mb-7"
                  style={{ color: plan.popular ? "rgba(200,144,42,0.8)" : "#C8902A" }}
                >
                  {plan.sub}
                </p>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        size={15}
                        className="shrink-0 mt-0.5"
                        style={{ color: plan.popular ? "#E8AE4A" : "#C8902A" }}
                      />
                      <span style={{ color: plan.popular ? "rgba(255,255,255,0.75)" : "#1A1A2E" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(plan.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3.5 rounded-xl font-bold text-sm inline-flex items-center justify-center gap-2 transition-all duration-200"
                  style={
                    plan.popular
                      ? {
                          background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                          color: "#060F1C",
                          boxShadow: "0 4px 20px rgba(200,144,42,0.4)",
                        }
                      : {
                          background: "#0B1F3A",
                          color: "#FFFFFF",
                        }
                  }
                >
                  Get Started <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-10 text-sm"
          style={{ color: "#64748B" }}
        >
          Need a custom quote for PLC, foreign company, or post-incorporation services?{" "}
          <a
            href={`https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20need%20a%20custom%20quote%20for%20my%20registration.`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
            style={{ color: "#C8902A" }}
          >
            Contact us →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
