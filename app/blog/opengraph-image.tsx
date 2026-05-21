import { ImageResponse } from "next/og";
import { SITE_BRAND_ONLINE } from "../lib/brand";

export const runtime = "edge";
export const alt = `${SITE_BRAND_ONLINE} Blog — CAC Guides for Nigeria`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogIndexOgImage() {
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

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <span
            style={{
              color: "#E8AE4A",
              fontSize: "14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Blog &amp; Resources
          </span>
          <div style={{ fontSize: "60px", fontWeight: 900, color: "#FFFFFF", lineHeight: 1.05, display: "flex" }}>
            CAC Registration{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Guides &amp; Tips
            </span>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "24px", margin: 0, maxWidth: "900px" }}>
            Free expert articles on business name registration, company incorporation, annual returns, and CAC
            compliance in Nigeria.
          </p>
        </div>

        <div style={{ display: "flex", gap: "14px" }}>
          {["Business Registration", "Compliance", "Legal Tips"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,144,42,0.25)",
                borderRadius: "100px",
                padding: "10px 20px",
                color: "rgba(255,255,255,0.75)",
                fontSize: "15px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
