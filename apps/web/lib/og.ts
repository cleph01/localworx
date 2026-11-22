// Shared bits for the link-preview (Open Graph) images.
import { readFileSync } from "fs";
import { join } from "path";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG = {
  ink: "#0b1f36",
  paper: "#fbf7ef",
  orange: "#f7931a",
  slate: "#9fb7cb",
  faint: "rgba(251,247,239,0.6)",
};

let logo: string | undefined;
/** The LocalWorx badge as a data URL (read once per server instance). */
export function logoSrc(): string {
  logo ??= `data:image/png;base64,${readFileSync(join(process.cwd(), "public/logo.png")).toString("base64")}`;
  return logo;
}

/** Shrink long shop names so they stay on two lines. */
export function nameSize(name: string): number {
  const n = name.length;
  return n <= 16 ? 92 : n <= 26 ? 78 : n <= 40 ? 64 : 52;
}

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: "normal" };
const fontCache = new Map<string, Promise<ArrayBuffer | null>>();

/** Fetch a Google font as TTF (satori can't read woff2). Cached per server instance. */
function googleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  const key = `${family}:${weight}`;
  if (!fontCache.has(key)) {
    fontCache.set(
      key,
      (async () => {
        const css = await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`, {
          headers: { "User-Agent": "Mozilla/4.0" }, // old UA → TTF links
        }).then((r) => (r.ok ? r.text() : ""));
        const url = css.match(/src: url\((https:[^)]+)\) format\('(?:truetype|opentype)'\)/)?.[1];
        if (!url) return null;
        const res = await fetch(url);
        return res.ok ? res.arrayBuffer() : null;
      })().catch(() => {
        fontCache.delete(key); // try again next time
        return null;
      }),
    );
  }
  return fontCache.get(key)!;
}

/** Brand fonts for ImageResponse; empty list (default font) if Google Fonts is unreachable. */
export async function ogFonts(): Promise<OgFont[]> {
  const want = [
    ["Inter", 400],
    ["Inter", 600],
    ["Inter", 700],
    ["Fraunces", 600],
  ] as const;
  const loaded = await Promise.all(want.map(([f, w]) => googleFont(f, w)));
  return want.flatMap(([name, weight], i) => (loaded[i] ? [{ name, data: loaded[i]!, weight, style: "normal" as const }] : []));
}

export const SANS = "Inter, sans-serif";
export const DISPLAY = "Fraunces, Inter, serif";
