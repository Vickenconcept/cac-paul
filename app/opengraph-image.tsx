import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Paul & Associates — Accredited CAC Agent Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #060F1C 0%, #0B1F3A 50%, #0F2847 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid lines background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,144,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(200,144,42,0.06) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            display: "flex",
          }}
        />

        {/* Top: Logo + Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: 900,
                color: "#060F1C",
              }}
            >
              P&A
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "#FFFFFF", fontSize: "22px", fontWeight: 700 }}>
                Paul &amp; Associates
              </span>
              <span
                style={{
                  color: "#E8AE4A",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                ACCREDITED CAC AGENT
              </span>
            </div>
          </div>

          {/* Badge */}
          <div
            style={{
              background: "rgba(200,144,42,0.15)",
              border: "1px solid rgba(200,144,42,0.4)",
              borderRadius: "100px",
              padding: "8px 20px",
              color: "#E8AE4A",
              fontSize: "13px",
              fontWeight: 600,
              display: "flex",
            }}
          >
            ✦ RC Verified · CAC Licensed
          </div>
        </div>

        {/* Middle: Main heading */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#FFFFFF",
              lineHeight: 1.05,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Register Your Business,</span>
            <span
              style={{
                background: "linear-gradient(135deg, #C8902A, #E8AE4A)",
                backgroundClip: "text",
                color: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              The Right Way.
            </span>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "22px",
              margin: 0,
              maxWidth: "700px",
            }}
          >
            Nigeria&apos;s trusted accredited CAC Agent for business name registration,
            company incorporation, and post-incorporation compliance.
          </p>
        </div>

        {/* Bottom: Pricing pills */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {[
            { label: "Business Name", price: "₦45,000" },
            { label: "Ltd Company", price: "₦100,000" },
            { label: "NGO / Trustees", price: "₦150,000" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(200,144,42,0.25)",
                borderRadius: "12px",
                padding: "14px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <span style={{ color: "#E8AE4A", fontSize: "20px", fontWeight: 800 }}>
                {item.price}
              </span>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>
                {item.label}
              </span>
            </div>
          ))}
          <div
            style={{
              marginLeft: "auto",
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
              display: "flex",
            }}
          >
            paulcacservices.ng
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
