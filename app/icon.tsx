import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #0F2847 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
        }}
      >
        {/* Gold ring */}
        <div
          style={{
            position: "absolute",
            width: "54px",
            height: "54px",
            borderRadius: "12px",
            border: "2px solid rgba(200,144,42,0.5)",
            display: "flex",
          }}
        />
        {/* P&A text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              color: "#C8902A",
              fontSize: "22px",
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-0.5px",
            }}
          >
            P&amp;A
          </span>
          <div
            style={{
              width: "24px",
              height: "2px",
              background: "linear-gradient(90deg, #C8902A, #E8AE4A)",
              borderRadius: "1px",
              marginTop: "3px",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
