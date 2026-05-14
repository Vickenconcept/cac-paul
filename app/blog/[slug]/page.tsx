import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_BRAND_ONLINE } from "@/app/lib/brand";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import BlogArticleWhatsAppCta from "../../components/BlogArticleWhatsAppCta";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: [post.category, "CAC Nigeria", "Business Registration"],
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const postData = await getPostBySlug(slug);
  if (!postData) notFound();

  const post = postData;
  const allPosts = await getAllPosts();
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_BRAND_ONLINE,
    },
    datePublished: post.publishedAt,
    articleSection: post.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <Navbar />
      <main className="min-h-screen pt-[70px]">
        {/* Article header */}
        <div
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <ArrowLeft size={15} /> Back to Blog
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span
                className="text-xs font-bold tracking-wide px-3 py-1 rounded-full"
                style={{ background: "rgba(200,144,42,0.15)", color: "#E8AE4A", border: "1px solid rgba(200,144,42,0.3)" }}
              >
                <Tag size={10} className="inline mr-1" />
                {post.category}
              </span>
            </div>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(200,144,42,0.2)", color: "#E8AE4A" }}
                >
                  {post.author.trim().charAt(0).toUpperCase()}
                </div>
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {post.publishedAt}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Article body */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">
            {/* Content */}
            <article>
              <div
                className="blog-content text-base leading-relaxed"
                style={{ color: "#1A1A2E" }}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <BlogArticleWhatsAppCta articleTitle={post.title} articleSlug={post.slug} />
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block space-y-6 sticky top-24">
              <div
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
              >
                <h4 className="font-bold text-sm mb-4" style={{ color: "#0B1F3A" }}>
                  Our Services
                </h4>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: "Business Name — ₦45,000", wa: "Business Name registration" },
                    { label: "Ltd Company — ₦100,000", wa: "Private Limited Company" },
                    { label: "NGO / Trustees — ₦150,000", wa: "NGO registration" },
                  ].map((item) => (
                    <li key={item.label}>
                      <a
                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                          `Hello ${SITE_BRAND_ONLINE}, I need ${item.wa}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium transition-colors"
                        style={{ color: "#0B1F3A" }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#C8902A" }}
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <div
                  className="p-5 rounded-2xl"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
                >
                  <h4 className="font-bold text-sm mb-4" style={{ color: "#0B1F3A" }}>
                    Related Articles
                  </h4>
                  <ul className="space-y-3">
                    {related.map((rp) => (
                      <li key={rp.id}>
                        <Link
                          href={`/blog/${rp.slug}`}
                          className="text-sm leading-snug hover:underline"
                          style={{ color: "#64748B" }}
                        >
                          {rp.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
