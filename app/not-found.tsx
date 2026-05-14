import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { SITE_BRAND_ONLINE } from "./lib/brand";

export const metadata: Metadata = {
  title: `Page not found | ${SITE_BRAND_ONLINE}`,
  robots: { index: false },
};
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        className="min-h-screen flex items-center justify-center pt-[70px] px-4"
        style={{ background: "#FAFAF8" }}
      >
        <div className="text-center max-w-md">
          <div
            className="text-8xl font-black mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            404
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ color: "#0B1F3A" }}>
            Page Not Found
          </h1>
          <p className="text-base mb-8" style={{ color: "#64748B" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="btn-primary">
            Back to Homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}