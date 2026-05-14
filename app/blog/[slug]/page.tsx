import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_BRAND_ONLINE } from "@/app/lib/brand";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
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

              {/* Article CTA */}
              <div
                className="mt-12 p-7 rounded-2xl text-center"
                style={{
                  background: "linear-gradient(135deg, #0B1F3A, #0F2847)",
                  border: "1px solid rgba(200,144,42,0.25)",
                }}
              >
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Ready to Register Your Business?
                </h3>
                <p className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  Contact us on WhatsApp for a free consultation and get started today.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                    `Hello ${SITE_BRAND_ONLINE}, I read your article on "${post.title}" and I need help.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: "#25D366" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
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
