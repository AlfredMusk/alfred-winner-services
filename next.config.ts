import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    loader: "custom", loaderFile: "./src/lib/image-loader.ts",
    // Match the pre-generated widths instead of advertising rounded-up assets.
    deviceSizes: [480, 768, 1200], imageSizes: [64, 128, 256],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: `default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://static.cloudflareinsights.com/beacon.min.js https://static.cloudflareinsights.com/beacon.min.js/; script-src-attr 'none'; style-src 'self'${process.env.NODE_ENV === "development" ? " 'unsafe-inline'" : ""}; style-src-elem 'self'${process.env.NODE_ENV === "development" ? " 'unsafe-inline'" : ""}; style-src-attr 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; media-src 'self'; manifest-src 'self'; upgrade-insecure-requests` },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Strict-Transport-Security", value: "max-age=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;
