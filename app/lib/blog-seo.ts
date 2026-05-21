import type { Metadata } from "next";
import type { Post } from "@/lib/posts";
import { SITE_BRAND_ONLINE, SITE_CANONICAL_URL, SITE_LEGAL_NAME } from "./brand";

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}

export function postUrl(slug: string): string {
  return `${SITE_CANONICAL_URL}${postPath(slug)}`;
}

export function toIsoDate(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return new Date().toISOString();
  return parsed.toISOString();
}

export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

export function postKeywords(post: Post): string[] {
  const categoryTerms: Record<string, string[]> = {
    "Business Registration": [
      "register business name Nigeria",
      "CAC business name registration",
      "CAMA 2020 registration",
    ],
    "Business Structure": [
      "business name vs limited company",
      "private limited company Nigeria",
      "company incorporation Nigeria",
    ],
    Compliance: [
      "CAC annual returns",
      "CAC compliance Nigeria",
      "post incorporation compliance",
    ],
    "Legal Tips": ["CAC legal requirements", "entrepreneur legal tips Nigeria"],
  };

  return [
    post.category,
    "CAC Nigeria",
    "Corporate Affairs Commission",
    "business registration Nigeria",
    SITE_BRAND_ONLINE,
    SITE_LEGAL_NAME,
    ...(categoryTerms[post.category] ?? []),
  ];
}

export function resolvePostOgImage(post: Post): string {
  const cover = post.coverImage?.trim();
  if (!cover) return `${SITE_CANONICAL_URL}/blog/${post.slug}/opengraph-image`;
  if (cover.startsWith("http://") || cover.startsWith("https://")) return cover;
  if (cover.startsWith("/")) return `${SITE_CANONICAL_URL}${cover}`;
  return `${SITE_CANONICAL_URL}/${cover}`;
}

export function buildPostMetadata(post: Post): Metadata {
  const description = metaDescription(post.excerpt);
  const url = postUrl(post.slug);
  const published = toIsoDate(post.publishedAt);
  const modified = post.updatedAt ? toIsoDate(post.updatedAt) : published;
  const ogImage = resolvePostOgImage(post);

  return {
    title: post.title,
    description,
    keywords: postKeywords(post),
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: SITE_LEGAL_NAME,
    category: post.category,
    robots: { index: true, follow: true },
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      locale: "en_NG",
      url,
      title: post.title,
      description,
      siteName: `${SITE_BRAND_ONLINE} · ${SITE_LEGAL_NAME}`,
      publishedTime: published,
      modifiedTime: modified,
      authors: [post.author],
      section: post.category,
      tags: postKeywords(post),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export function buildBlogIndexMetadata(): Metadata {
  const title = `Blog & CAC Guides | ${SITE_BRAND_ONLINE}`;
  const description = metaDescription(
    `Free CAC registration guides from ${SITE_BRAND_ONLINE} (${SITE_LEGAL_NAME}): business name registration, company incorporation, annual returns, and compliance for Nigerian entrepreneurs.`
  );

  return {
    title,
    description,
    keywords: [
      "CAC blog Nigeria",
      "business registration guide",
      "company incorporation guide",
      "CAC annual returns guide",
      SITE_BRAND_ONLINE,
      "Corporate Affairs Commission tips",
    ],
    alternates: { canonical: "/blog" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_NG",
      url: `${SITE_CANONICAL_URL}/blog`,
      title,
      description,
      siteName: `${SITE_BRAND_ONLINE} · ${SITE_LEGAL_NAME}`,
      images: [
        {
          url: `${SITE_CANONICAL_URL}/blog/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${SITE_BRAND_ONLINE} Blog — CAC Guides for Nigeria`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_CANONICAL_URL}/blog/opengraph-image`],
    },
  };
}

export function buildPostStructuredData(post: Post) {
  const url = postUrl(post.slug);
  const published = toIsoDate(post.publishedAt);
  const modified = post.updatedAt ? toIsoDate(post.updatedAt) : published;
  const image = resolvePostOgImage(post);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_CANONICAL_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_CANONICAL_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: metaDescription(post.excerpt, 300),
        image: [image],
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        datePublished: published,
        dateModified: modified,
        author: {
          "@type": "Organization",
          name: post.author,
          url: SITE_CANONICAL_URL,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_BRAND_ONLINE,
          legalName: SITE_LEGAL_NAME,
          url: SITE_CANONICAL_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_CANONICAL_URL}/logo.svg`,
          },
        },
        articleSection: post.category,
        keywords: postKeywords(post).join(", "),
        inLanguage: "en-NG",
        isAccessibleForFree: true,
        isPartOf: {
          "@type": "Blog",
          "@id": `${SITE_CANONICAL_URL}/blog#blog`,
          name: `${SITE_BRAND_ONLINE} Blog`,
          url: `${SITE_CANONICAL_URL}/blog`,
        },
      },
    ],
  };
}

export function buildBlogIndexStructuredData(posts: Post[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_CANONICAL_URL}/blog#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_CANONICAL_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_CANONICAL_URL}/blog` },
        ],
      },
      {
        "@type": "CollectionPage",
        "@id": `${SITE_CANONICAL_URL}/blog#webpage`,
        url: `${SITE_CANONICAL_URL}/blog`,
        name: `${SITE_BRAND_ONLINE} Blog & Resources`,
        description: `CAC registration guides and compliance articles from ${SITE_BRAND_ONLINE}.`,
        isPartOf: { "@id": `${SITE_CANONICAL_URL}/#website` },
        inLanguage: "en-NG",
      },
      {
        "@type": "Blog",
        "@id": `${SITE_CANONICAL_URL}/blog#blog`,
        url: `${SITE_CANONICAL_URL}/blog`,
        name: `${SITE_BRAND_ONLINE} Blog`,
        publisher: { "@id": `${SITE_CANONICAL_URL}/#organization` },
        blogPost: posts.map((post) => ({
          "@type": "BlogPosting",
          "@id": postUrl(post.slug),
          headline: post.title,
          description: metaDescription(post.excerpt, 200),
          datePublished: toIsoDate(post.publishedAt),
          url: postUrl(post.slug),
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_CANONICAL_URL}/blog#itemlist`,
        itemListElement: posts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: post.title,
          url: postUrl(post.slug),
        })),
      },
    ],
  };
}
