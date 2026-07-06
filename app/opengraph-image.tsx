import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.name} — Software Engineer · Data Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0a09",
          color: "#faf6f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#fbbf24", fontSize: 28 }}>
          <span style={{ color: "#f97316" }}>$</span> whoami
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 700, marginTop: 24, letterSpacing: -2 }}>
          {site.name}
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 16, color: "#f97316" }}>
          Software Engineer · Data Engineer
        </div>
        <div style={{ display: "flex", fontSize: 26, marginTop: 40, color: "#a8a29e" }}>
          Full-stack products · ML pipelines · {site.location}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)",
            display: "flex",
          }}
        />
      </div>
    ),
    size
  );
}
