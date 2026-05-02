"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Scale,
  TrendingUp,
  Users,
  Globe,
  Search,
  CalendarCheck,
  UserCog,
  FileEdit,
  MapPin,
  Coins,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import WAButton from "./WAButton";

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

interface Service {
  Icon: LucideIcon;
  title: string;
  description: string;
  tag: "pre" | "post";
}

const SERVICES: Service[] = [
  {
    Icon: Building2,
    title: "Business Name Registration",
    description:
      "Register your sole proprietorship or partnership business name quickly with the CAC. Includes name search, availability check, and full registration certificate — ideal for small businesses and startups.",
    tag: "pre",
  },
  {
    Icon: Scale,
    title: "Private Limited Company (Ltd)",
    description:
      "Incorporate your Private Limited Liability Company (RC number) with up to 50 shareholders. We prepare all Memoranda, Articles of Association, and CAC forms — fully compliant from day one.",
    tag: "pre",
  },
  {
    Icon: TrendingUp,
    title: "Public Limited Company (PLC)",
    description:
      "Incorporate a Public Limited Company for large-scale operations, capital market listing, or wide public shareholding — complete with regulatory advisory and CAC filing.",
    tag: "pre",
  },
  {
    Icon: Users,
    title: "NGO / Incorporated Trustees",
    description:
      "Register non-profits, religious bodies, community associations, charities, and foundations as Incorporated Trustees under the Companies and Allied Matters Act (CAMA 2020).",
    tag: "pre",
  },
  {
    Icon: Globe,
    title: "Foreign Company Registration",
    description:
      "Set up a branch of your foreign company or a wholly-owned Nigerian subsidiary. We guide you through CAC's foreign company registration requirements end-to-end.",
    tag: "pre",
  },
  {
    Icon: Search,
    title: "Business Name Availability Search",
    description:
      "Conduct a thorough name availability and trademark search on the CAC database before committing to your brand name — avoid costly rejections and legal conflicts.",
    tag: "pre",
  },
  {
    Icon: CalendarCheck,
    title: "Annual Returns Filing",
    description:
      "Avoid strike-off and penalties with timely annual returns filing. We handle your annual statutory filings and keep your company status active and in good standing with the CAC.",
    tag: "post",
  },
  {
    Icon: UserCog,
    title: "Change of Directors / Shareholders",
    description:
      "Adding or removing directors, transferring shares, or updating shareholder details? We prepare all CAC Form CAC1.1, CAC 7, and supporting resolutions accurately.",
    tag: "post",
  },
  {
    Icon: FileEdit,
    title: "Amendment of Memoranda & Articles",
    description:
      "Lawfully update your company's Memorandum and Articles of Association to reflect new business objectives, governance structure, or shareholder agreements.",
    tag: "post",
  },
  {
    Icon: MapPin,
    title: "Change of Registered Address",
    description:
      "Moved offices? We update your registered address on CAC records promptly, keeping your company's official details accurate and compliant.",
    tag: "post",
  },
  {
    Icon: Coins,
    title: "Share Allotment & Capital Increase",
    description:
      "Allot additional shares to existing or new shareholders, increase your authorized share capital, and update the CAC register accordingly — structured for future investment rounds.",
    tag: "post",
  },
  {
    Icon: RefreshCw,
    title: "Company Restoration & Re-activation",
    description:
      "Has your company been struck off the CAC register? We handle the full restoration process — filing outstanding returns, paying levies, and reinstating your company to active status.",
    tag: "post",
  },
];

export default function Services() {
  const [activeTab, setActiveTab] = useState<"pre" | "post">("pre");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = SERVICES.filter((s) => s.tag === activeTab);

  return (
    <section id="services" ref={ref} className="py-20 md:py-28" style={{ background: "#F4F1E8" }}>
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
            style={{ background: "rgba(200,144,42,0.12)", color: "#C8902A", border: "1px solid rgba(200,144,42,0.25)" }}
          >
            What We Do
          </span>
          <h2 className="text-4xl md:text-5xl font-black mb-5 text-balance" style={{ color: "#0B1F3A" }}>
            Complete CAC Services,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Start to Finish
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#64748B" }}>
            From choosing your business structure to maintaining compliance year after year — we
            handle every step so you can focus on building.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div
            className="inline-flex rounded-xl p-1.5 gap-1"
            style={{ background: "#0B1F3A" }}
          >
            {(["pre", "post"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-250 cursor-pointer"
                style={{
                  background: activeTab === tab ? "linear-gradient(135deg,#C8902A,#E8AE4A)" : "transparent",
                  color: activeTab === tab ? "#060F1C" : "rgba(255,255,255,0.6)",
                }}
              >
                {tab === "pre" ? "Pre-Incorporation" : "Post-Incorporation"}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-6 rounded-2xl cursor-default"
              style={{
                background: "#FFFFFF",
                border: "1px solid #E2E0D8",
                boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 40px rgba(200,144,42,0.15)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,144,42,0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "#E2E0D8";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: "rgba(200,144,42,0.08)" }}
              >
                <service.Icon size={22} style={{ color: "#C8902A" }} />
              </div>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#C8902A" }}>
                {service.tag === "pre" ? "Pre-Incorporation" : "Post-Incorporation"}
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ color: "#0B1F3A" }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "#64748B" }}>
                {service.description}
              </p>
              <WAButton
                waUrl={`https://wa.me/${WHATSAPP}?text=Hello%2C%20I%20need%20help%20with%20${encodeURIComponent(service.title)}`}
                source="services"
                modalTitle={service.title}
                modalSubtitle="Leave your contact details and we'll reach out to guide you through this service on WhatsApp."
                className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-3 transition-all duration-200 cursor-pointer"
                style={{ color: "#C8902A" }}
              >
                Enquire Now <ArrowRight size={14} />
              </WAButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
