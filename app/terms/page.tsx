import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { SITE_BRAND_ONLINE } from "../lib/brand";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms, services, and consultation information for ${SITE_BRAND_ONLINE} — business registration, support, branding, and growth in Nigeria.`,
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const SERVICES = [
  {
    num: "01",
    title: "Start & Grow Your Business",
    body: "Practical guidance for entrepreneurs, startups, and small business owners looking to establish their business properly, meet key requirements, and grow with confidence. We help you build the right foundation from day one.",
  },
  {
    num: "02",
    title: "Business Support Services",
    body: "Helping entrepreneurs and businesses manage administrative requirements, documentation needs, industry-specific obligations, and other important operational matters, so nothing slips through the cracks.",
  },
  {
    num: "03",
    title: "Branding & Business Growth",
    body: "Logo design, corporate profiles, branding materials, and business development support to present your business with authority and attract the clients you deserve.",
  },
  {
    num: "04",
    title: "Brand Protection",
    body: "Support for protecting your business name, brand, creative works, and intellectual property, safeguarding what you've worked hard to build from day one.",
  },
  {
    num: "05",
    title: "Business Plans & Strategic Documentation",
    body: "Business plans, feasibility studies, proposals, investor-ready documents, and growth strategies built to communicate your vision and set you up for measurable success.",
  },
] as const;

const WHY_US = [
  {
    title: "Practical, not just theoretical",
    body: "We give you actionable guidance that moves your business forward, not generic advice that leaves you guessing what to do next.",
  },
  {
    title: "One team, many solutions",
    body: "From incorporation to brand protection to investor documents, access everything you need from a single trusted partner.",
  },
  {
    title: "Your success is our priority",
    body: "We work alongside you with the care and commitment of a partner who has a genuine stake in seeing your business thrive.",
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[70px]">
        <section
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
              style={{
                background: "rgba(200,144,42,0.15)",
                color: "#E8AE4A",
                border: "1px solid rgba(200,144,42,0.3)",
              }}
            >
              Legal
            </span>
            <h1
              className="text-3xl md:text-4xl font-black text-white mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Terms &amp; Conditions
            </h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
              Last updated:{" "}
              {new Date().toLocaleDateString("en-NG", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </section>

        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="space-y-10 text-[0.95rem] leading-relaxed text-[#3D4F63]">
            <section>
              <h2
                className="font-[family-name:var(--font-poppins)] text-2xl md:text-3xl font-black text-[#0B1F3A] mb-4"
              >
                Elevate Your Business. Now.
              </h2>
              <p>
                Get a <strong className="text-[#0B1F3A]">FREE 30-Minute Consultation</strong> and discover
                the best way to start, grow, protect, and manage your business. Our team provides practical
                support and expert guidance so you can focus on building your business with confidence.
              </p>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-6">
                Here&apos;s How We Can Help
              </h2>
              <ol className="space-y-8">
                {SERVICES.map((item) => (
                  <li key={item.num} className="flex gap-4">
                    <span
                      className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "rgba(200,144,42,0.12)",
                        color: "#C8902A",
                        fontFamily: "var(--font-poppins)",
                      }}
                    >
                      {item.num}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[#0B1F3A] mb-2">
                        {item.title}
                      </h3>
                      <p>{item.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-6">
                Why {SITE_BRAND_ONLINE}?
              </h2>
              <ul className="space-y-5">
                {WHY_US.map((item) => (
                  <li key={item.title}>
                    <h3 className="font-[family-name:var(--font-poppins)] text-base font-semibold text-[#0B1F3A] mb-1.5">
                      {item.title}
                    </h3>
                    <p>{item.body}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="rounded-2xl p-6 md:p-8"
              style={{ background: "#FAFAF8", border: "1px solid #E2E0D8" }}
            >
              <h2 className="font-[family-name:var(--font-poppins)] text-lg font-bold text-[#0B1F3A] mb-3">
                Ready to Take the Next Step?
              </h2>
              <p className="mb-4">
                Fill out the form and one of our consultants will contact you within 24 hours to discuss
                the best solution for your business.
              </p>
              <p className="text-sm mb-6" style={{ color: "#64748B" }}>
                Your information is private and will never be shared. See our{" "}
                <Link
                  href="/privacy"
                  className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A]"
                >
                  Privacy Policy
                </Link>{" "}
                for details on how we handle your data.
              </p>
              <Link
                href="/#faq"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                style={{
                  background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                  color: "#060F1C",
                }}
              >
                Get in touch
              </Link>
            </section>
          </div>

          <p className="mt-12 pt-8 border-t text-sm" style={{ borderColor: "#E2E0D8", color: "#6B7A8D" }}>
            <Link
              href="/"
              className="text-[#C8902A] underline underline-offset-2 hover:text-[#0B1F3A] font-medium"
            >
              ← Back to home
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
