import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { SITE_BRAND_ONLINE, SITE_CANONICAL_URL } from "@/app/lib/brand";
import { metaDescription } from "@/app/lib/blog-seo";

export const runtime = "edge";
export const alt = "CACPro blog article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostOgImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "CAC Registration Guide";
  const category = post?.category ?? "CAC Resources";
  const excerpt = post ? metaDescription(post.excerpt, 140) : "Expert guides for Nigerian business registration and CAC compliance.";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(145deg, #060F1C 0%, #0B1F3A 45%, #0F2847 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,144,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(200,144,42,0.07) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "17px",
                fontWeight: 900,
                color: "#060F1C",
              }}
            >
              CP
            </div>
            <span style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 700 }}>
              {SITE_BRAND_ONLINE}
            </span>
          </div>
          <div
            style={{
              background: "rgba(200,144,42,0.12)",
              border: "1px solid rgba(200,144,42,0.35)",
              borderRadius: "100px",
              padding: "8px 18px",
              color: "#E8AE4A",
              fontSize: "14px",
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <span
            style={{
              color: "#E8AE4A",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            CAC Guide · Nigeria
          </span>
          <div
            style={{
              fontSize: title.length > 70 ? "44px" : "52px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.1,
              display: "flex",
            }}
          >
            {title}
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "22px", margin: 0, lineHeight: 1.4 }}>
            {excerpt}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(200,144,42,0.25)",
            paddingTop: "24px",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "16px" }}>
            Accredited CAC Agent · Business Registration Nigeria
          </span>
          <span style={{ color: "#E8AE4A", fontSize: "16px", fontWeight: 600 }}>
            {SITE_CANONICAL_URL.replace(/^https?:\/\//i, "")}/blog
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
