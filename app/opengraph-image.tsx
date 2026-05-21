import { ImageResponse } from "next/og";
import { SITE_BRAND_ONLINE, SITE_CANONICAL_URL } from "./lib/brand";

export const runtime = "edge";
export const alt = `${SITE_BRAND_ONLINE} | Accredited CAC Agent Nigeria`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const STATS = [
  { num: "2,500+", label: "Businesses Registered", sub: "And counting" },
  { num: "48hrs", label: "Average Turnaround", sub: "Most done in 24hrs" },
  { num: "100%", label: "CAC Accredited", sub: "Licensed & verified" },
  { num: "36", label: "States Covered", sub: "Fully remote service" },
];

export default function OgImage() {
  const domain = SITE_CANONICAL_URL.replace(/^https?:\/\//i, "");

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(145deg, #060F1C 0%, #0B1F3A 45%, #0F2847 75%, #0B1F3A 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "48px 56px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
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

        <div style={{ display: "flex", flex: 1, gap: "40px", alignItems: "center" }}>
          {/* Left — matches site hero */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: "20px",
              maxWidth: "620px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(200,144,42,0.12)",
                border: "1px solid rgba(200,144,42,0.35)",
                borderRadius: "100px",
                padding: "10px 18px",
                color: "#E8AE4A",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                width: "fit-content",
              }}
            >
              ✦ Accredited CAC Agent · RC Verified
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "52px",
                fontWeight: 900,
                color: "#FFFFFF",
                lineHeight: 1.05,
              }}
            >
              <span>Register Your Business,</span>
              <span
                style={{
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #C8902A 0%, #E8AE4A 50%, #C8902A 100%)",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                The Right Way.
              </span>
            </div>

            <p
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "18px",
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              Nigeria&apos;s trusted accredited CAC Agent for seamless business name registration,
              company incorporation, and post incorporation compliance.
            </p>

            <div style={{ display: "flex", gap: "14px", marginTop: "4px" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                  color: "#060F1C",
                  fontWeight: 700,
                  fontSize: "16px",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  display: "flex",
                }}
              >
                Start Registration →
              </div>
              <div
                style={{
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "16px",
                  padding: "14px 28px",
                  borderRadius: "10px",
                  display: "flex",
                }}
              >
                Explore Services ⌄
              </div>
            </div>
          </div>

          {/* Right — hero stats grid */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "440px",
              gap: "16px",
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  width: "208px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(200,144,42,0.2)",
                  borderRadius: "16px",
                  padding: "22px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                    backgroundClip: "text",
                    color: "transparent",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.num}
                </span>
                <span style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600 }}>
                  {stat.label}
                </span>
                <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px" }}>
                  {stat.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(200,144,42,0.2)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: 900,
                color: "#060F1C",
              }}
            >
              CP
            </div>
            <span style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 700 }}>
              {SITE_BRAND_ONLINE}
            </span>
            <span
              style={{
                color: "#E8AE4A",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginLeft: "8px",
              }}
            >
              Accredited CAC Agent
            </span>
          </div>
          <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px" }}>{domain}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
