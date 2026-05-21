import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "36px",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "32px",
            border: "3px solid rgba(200,144,42,0.55)",
            display: "flex",
          }}
        />
        <span
          style={{
            color: "#E8AE4A",
            fontSize: "56px",
            fontWeight: 900,
            letterSpacing: "-1px",
          }}
        >
          CP
        </span>
      </div>
    ),
    { ...size }
  );
}
