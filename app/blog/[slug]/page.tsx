import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_BRAND_ONLINE } from "@/app/lib/brand";
import {
  buildPostMetadata,
  buildPostStructuredData,
  toIsoDate,
} from "@/app/lib/blog-seo";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import BlogArticleWhatsAppCta from "../../components/BlogArticleWhatsAppCta";
import { Calendar, Clock, ArrowLeft, Tag, ChevronRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found", robots: { index: false, follow: false } };
  return buildPostMetadata(post);
}

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || "2348012345678";

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const publishedIso = toIsoDate(post.publishedAt);
  const structuredData = buildPostStructuredData(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Navbar />
      <main className="min-h-screen pt-[70px]">
        <header
          className="py-16 md:py-20"
          style={{ background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 100%)" }}
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={14} />
                </li>
                <li>
                  <Link href="/blog" className="hover:underline">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>
                  <ChevronRight size={14} />
                </li>
                <li>
                  <span style={{ color: "rgba(255,255,255,0.75)" }} aria-current="page">
                    Article
                  </span>
                </li>
              </ol>
            </nav>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm mb-8 transition-colors"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              <ArrowLeft size={15} aria-hidden /> Back to Blog
            </Link>

            <p className="mb-5">
              <span
                className="text-xs font-bold tracking-wide px-3 py-1 rounded-full"
                style={{ background: "rgba(200,144,42,0.15)", color: "#E8AE4A", border: "1px solid rgba(200,144,42,0.3)" }}
              >
                <Tag size={10} className="inline mr-1" aria-hidden />
                {post.category}
              </span>
            </p>

            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
              <address className="flex items-center gap-2 not-italic">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(200,144,42,0.2)", color: "#E8AE4A" }}
                  aria-hidden
                >
                  {post.author.trim().charAt(0).toUpperCase()}
                </div>
                <span rel="author">{post.author}</span>
              </address>
              <time dateTime={publishedIso} className="flex items-center gap-1.5">
                <Calendar size={13} aria-hidden />
                <span>{post.publishedAt}</span>
              </time>
              <span className="flex items-center gap-1.5">
                <Clock size={13} aria-hidden />
                <span>{post.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 items-start">
            <article itemScope itemType="https://schema.org/BlogPosting">
              <meta itemProp="headline" content={post.title} />
              <meta itemProp="description" content={post.excerpt} />
              <meta itemProp="datePublished" content={publishedIso} />
              <meta itemProp="author" content={post.author} />
              <meta itemProp="articleSection" content={post.category} />

              <div
                className="blog-content text-base leading-relaxed"
                style={{ color: "#1A1A2E" }}
                itemProp="articleBody"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <BlogArticleWhatsAppCta articleTitle={post.title} articleSlug={post.slug} />
            </article>

            <aside className="hidden lg:block space-y-6 sticky top-24" aria-label="Article sidebar">
              <div
                className="p-5 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
              >
                <h2 className="font-bold text-sm mb-4" style={{ color: "#0B1F3A" }}>
                  Our Services
                </h2>
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
                          aria-hidden
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <nav
                  className="p-5 rounded-2xl"
                  style={{ background: "#FFFFFF", border: "1px solid #E2E0D8" }}
                  aria-label="Related articles"
                >
                  <h2 className="font-bold text-sm mb-4" style={{ color: "#0B1F3A" }}>
                    Related Articles
                  </h2>
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
                </nav>
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
