"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WAButton from "./WAButton";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "/blog" },
];

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";
const WA_URL = `https://wa.me/${WHATSAPP}?text=Hello%20Paul%20%26%20Associates%2C%20I%20need%20help%20with%20CAC%20registration.`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = useCallback(
    (hash: string) => {
      setOpen(false);
      if (pathname === "/") {
        // Already on home page — smooth scroll
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        // On another page — navigate home with hash, page will scroll on load
        router.push(`/${hash}`);
      }
    },
    [pathname, router]
  );

  // When landing on home page with a hash (e.g. from blog nav click), scroll to section
  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const hash = window.location.hash;
      const attempt = (tries: number) => {
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
          // Clean the hash from URL without triggering reload
          history.replaceState(null, "", "/");
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 200);
        }
      };
      setTimeout(() => attempt(5), 100);
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    href.startsWith("#") && pathname === "/" && activeSection === href.slice(1);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(11, 31, 58, 0.97)" : "rgba(11, 31, 58, 0.92)",
        backdropFilter: "blur(16px)",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
              style={{
                background: "linear-gradient(135deg, #C8902A 0%, #E8AE4A 100%)",
                color: "#060F1C",
              }}
            >
              P&amp;A
            </div>
            <div className="flex flex-col">
              <span
                className="font-bold text-white leading-tight text-base"
              >
                Paul &amp; Associates
              </span>
              <span
                className="text-xs leading-tight"
                style={{ color: "#E8AE4A", fontSize: "0.65rem", letterSpacing: "0.08em" }}
              >
                ACCREDITED CAC AGENT
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.href.startsWith("#") ? (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    color: isActive(link.href) ? "#E8AE4A" : "rgba(255,255,255,0.85)",
                    background: isActive(link.href) ? "rgba(200,144,42,0.12)" : "transparent",
                  }}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                  style={{
                    color: pathname === link.href ? "#E8AE4A" : "rgba(255,255,255,0.85)",
                    background: pathname === link.href ? "rgba(200,144,42,0.12)" : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <WAButton
              waUrl={WA_URL}
              source="navbar"
              modalTitle="Get Started Today"
              modalSubtitle="Leave your contact details and we'll walk you through the registration process on WhatsApp."
              className="hidden sm:inline-flex btn-primary text-sm cursor-pointer"
              style={{ padding: "0.625rem 1.25rem", fontSize: "0.875rem" }}
            >
              Get Started
            </WAButton>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-md text-white cursor-pointer"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(6, 15, 28, 0.98)",
              borderTop: "1px solid rgba(200,144,42,0.2)",
            }}
          >
            <nav className="flex flex-col p-4 gap-1">
              {NAV_LINKS.map((link) =>
                link.href.startsWith("#") ? (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 mt-2" style={{ borderTop: "1px solid rgba(200,144,42,0.2)" }}>
                <WAButton
                  waUrl={WA_URL}
                  source="navbar-mobile"
                  modalTitle="Get Started Today"
                  modalSubtitle="Leave your contact details and we'll walk you through the registration process on WhatsApp."
                  className="btn-primary w-full justify-center cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Get Started on WhatsApp
                </WAButton>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
