import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Kept off (as in Gepeto): plain server rendering is easier to read and reason about.
  cacheComponents: false,
  transpilePackages: ["@localworx/shared"],
  // Extra dev origins (e.g. a Tailscale IP) as a comma-separated list in DEV_ORIGINS.
  allowedDevOrigins: process.env.DEV_ORIGINS?.split(",").filter(Boolean) ?? [],
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Camera for nothing, geolocation only for check-ins on this origin.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;
