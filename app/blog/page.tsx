import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";
import { FeaturedPostCard, RegularPostCard, EmptyBlog } from "../components/BlogCards";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog & Resources — CAC Registration Guides Nigeria",
  description:
    "Free guides, tips, and resources on business registration, company incorporation, CAC compliance, and legal requirements for entrepreneurs in Nigeria.",
  alternates: { canonical: "/blog" },
};

export const dynamic = "force-dynamic";

const CATEGORIES = ["All", "Business Registration", "Business Structure", "Compliance", "Legal Tips"];

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const regular = posts.filter((p) => !p.featured);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[70px]">
        {/* Hero */}
        <section
          className="py-20 md:py-24"
          style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span
              className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5"
              style={{ background: "rgba(200,144,42,0.15)", color: "#E8AE4A", border: "1px solid rgba(200,144,42,0.3)" }}
            >
              Blog &amp; Resources
            </span>
            <h1
              className="text-4xl md:text-5xl font-black text-white mb-5"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              CAC Registration{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Guides &amp; Tips
              </span>
            </h1>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
              Free expert resources to help Nigerian entrepreneurs register, incorporate, and
              maintain compliant businesses — from our accredited legal team.
            </p>
          </div>
        </section>

        {/* Blog content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-12">
            {CATEGORIES.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: cat === "All" ? "#0B1F3A" : "#FFFFFF",
                  color: cat === "All" ? "#FFFFFF" : "#0B1F3A",
                  border: "1px solid #E2E0D8",
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Featured posts */}
          {featured.length > 0 && (
            <div className="mb-14">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: "#0B1F3A" }}>
                <BookOpen size={18} style={{ color: "#C8902A" }} />
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-2 gap-7">
                {featured.map((post) => (
                  <FeaturedPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {/* All posts */}
          {regular.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-6" style={{ color: "#0B1F3A" }}>
                All Articles
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {regular.map((post) => (
                  <RegularPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 && <EmptyBlog />}
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
