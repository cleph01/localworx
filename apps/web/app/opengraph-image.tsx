// Link-preview image (texts, iMessage, social posts). Every page inherits it unless it
// defines its own.
import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "LocalWorx — Build a stronger town, one paid shoutout at a time";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/logo.png")).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1f36",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(247,147,26,0.20), transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 44 }}>
          <div
            style={{
              width: 92,
              height: 92,
              background: "#fbf7ef",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={logo} width={72} height={70} alt="" style={{ objectFit: "contain" }} />
          </div>
          <span style={{ fontSize: 66, fontWeight: 700, color: "#fbf7ef", letterSpacing: "-0.03em", lineHeight: 1 }}>
            LocalWorx
          </span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#fbf7ef",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            maxWidth: 940,
            marginBottom: 24,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 14px",
          }}
        >
          <span>Build a stronger town,</span>
          <span style={{ color: "#f7931a" }}>one paid shoutout at a time.</span>
        </div>

        <div style={{ fontSize: 26, color: "rgba(251,247,239,0.6)", textAlign: "center", maxWidth: 820, lineHeight: 1.45 }}>
          Neighbors earn Bitcoin for bringing customers to local shops.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(251,247,239,0.06)",
            border: "1px solid rgba(251,247,239,0.12)",
            borderRadius: 100,
            padding: "8px 22px",
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#f7931a" }} />
          <span style={{ fontSize: 18, color: "rgba(251,247,239,0.6)", fontWeight: 500, letterSpacing: "0.02em" }}>
            localworx.io
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
