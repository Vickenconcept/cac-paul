"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import WAButton from "./WAButton";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";
const WA_URL = `https://wa.me/${WHATSAPP}?text=Hello%20Paul%20%26%20Associates%2C%20I%20have%20a%20question%20about%20CAC%20registration.`;

const FAQS = [
  {
    q: "What is the difference between a Business Name and a Limited Company?",
    a: "A Business Name (sole proprietorship/partnership) is simpler and cheaper but offers no legal separation between you and the business. A Limited Company (Ltd) is a separate legal entity — it can own assets, sue, and be sued independently, making it ideal for growth, investors, and government contracts.",
  },
  {
    q: "How long does company incorporation take?",
    a: "With complete documents, Business Name registration typically takes 24–48 hours. Limited Company (Ltd) incorporation takes 48–72 hours on the CAC portal. NGO/Incorporated Trustees can take 4–6 weeks due to mandatory newspaper publication requirements.",
  },
  {
    q: "What documents do I need to incorporate a company?",
    a: "You'll need a valid government-issued ID (NIN, International Passport, or Driver's License), proof of address, passport photograph, and details of all directors and shareholders. For foreign directors, a notarized passport and residence permit may be required.",
  },
  {
    q: "Can I register a company without being physically present?",
    a: "Yes! Our service is 100% remote-friendly. All documents are submitted and processed digitally. Your certificate is delivered via email and courier if physical copies are needed. We serve clients across Nigeria and in the diaspora.",
  },
  {
    q: "What happens if I don't file annual returns?",
    a: "Failure to file annual returns attracts penalties and can eventually lead to your company being struck off the CAC register. A struck-off company loses its legal status. We can help you file outstanding returns, pay penalties, and restore your company's active status.",
  },
  {
    q: "Are your fees inclusive of CAC government charges?",
    a: "Yes. Our quoted prices include all CAC filing fees, stamp duties, and our professional service charge. There are no hidden extras. Any additional cost (e.g., physical courier, company seal) is communicated upfront before you commit.",
  },
  {
    q: "Can a foreigner own 100% of a Nigerian company?",
    a: "Yes. Under Nigerian law, foreigners can own 100% of shares in most sectors. Some sectors (e.g., oil and gas, banking) have local content requirements. We advise on sector-specific regulations and assist with NIPC registration where applicable.",
  },
  {
    q: "Do you provide post-registration support beyond CAC?",
    a: "Yes! We also assist with Tax Identification Number (TIN) registration, SCUML compliance, NAFDAC/SON registration referrals, and ongoing corporate secretarial support — ensuring your business is fully set up for operations.",
  },
  {
    q: "What is the shareholding limit for the ₦100,000 Ltd package?",
    a: "The ₦100,000 Private Limited Company package covers incorporations where the total authorized share capital is equal to or below 1,000,000 shares. If your share capital exceeds this threshold, contact us for a custom quote.",
  },
];

function FAQItem({ faq, idx }: { faq: { q: string; a: string }; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid #E2E0D8", background: "#FFFFFF" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
        style={{ background: open ? "rgba(200,144,42,0.04)" : "transparent" }}
      >
        <span
          className="text-sm md:text-base font-semibold leading-snug"
          style={{ color: "#0B1F3A" }}
        >
          {faq.q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{ color: "#C8902A", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "#64748B", borderTop: "1px solid #F0EDE6" }}
            >
              <span className="block pt-4">{faq.a}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="py-20 md:py-28" style={{ background: "#F4F1E8" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(200,144,42,0.1)", color: "#C8902A", border: "1px solid rgba(200,144,42,0.25)" }}
          >
            FAQs
          </span>
          <h2
            className="text-4xl md:text-5xl font-black mb-5"
            style={{ color: "#0B1F3A" }}
          >
            Questions We Hear{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Every Day
            </span>
          </h2>
          <p className="text-base" style={{ color: "#64748B" }}>
            Everything you need to know about registering and maintaining your business in Nigeria.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col gap-3 mb-12">
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} idx={i} />
          ))}
        </div>

        {/* WhatsApp CTA for unanswered questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center p-8 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0B1F3A 0%, #0F2847 100%)",
            border: "1px solid rgba(200,144,42,0.25)",
          }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(200,144,42,0.15)" }}
          >
            <MessageCircle size={26} style={{ color: "#E8AE4A" }} />
          </div>
          <h3
            className="text-xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Don&apos;t see your question here?
          </h3>
          <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.6)" }}>
            Our legal team is available on WhatsApp to answer any question — no matter how specific.
            Most questions are answered within minutes.
          </p>
          <WAButton
            waUrl={WA_URL}
            source="faq"
            modalTitle="Ask Us Anything"
            modalSubtitle="Leave your details and our team will answer your question on WhatsApp — usually within minutes."
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer"
            style={{
              background: "#25D366",
              color: "#FFFFFF",
              boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Ask on WhatsApp
          </WAButton>
        </motion.div>
      </div>
    </section>
  );
}
