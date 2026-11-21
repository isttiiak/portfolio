import { readFile } from "fs/promises";
import path from "path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.name} | Software Engineer · Data Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const photo = await readFile(path.join(process.cwd(), "cv/photo/istiak.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0c0a09",
          color: "#faf6f0",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#fbbf24", fontSize: 26 }}>
            <span style={{ color: "#f97316" }}>$</span> whoami
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              fontWeight: 700,
              marginTop: 18,
              letterSpacing: -3,
              color: "#faf6f0",
            }}
          >
            {site.name}
          </div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 10, color: "#f97316", fontWeight: 700 }}>
            Software Engineer · Data Engineer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              marginTop: 28,
              color: "#a8a29e",
              lineHeight: 1.5,
              maxWidth: 680,
            }}
          >
            Full-stack products and end-to-end data pipelines: React apps with AI features, ML models
            served over FastAPI.
          </div>
          <div style={{ display: "flex", gap: 28, marginTop: 40, fontSize: 22, color: "#78716c" }}>
            <span style={{ display: "flex", color: "#fbbf24" }}>istiak.is-a.dev</span>
            <span style={{ display: "flex" }}>github.com/isttiiak</span>
            <span style={{ display: "flex" }}>Dhaka, Bangladesh</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 264,
            height: 264,
            borderRadius: 132,
            border: "6px solid #f97316",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <img
            src={photoSrc}
            alt=""
            width={252}
            height={252}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 126 }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 12,
            background: "linear-gradient(90deg, #fbbf24, #f97316, #c2410c)",
            display: "flex",
          }}
        />
      </div>
    ),
    size
  );
}
