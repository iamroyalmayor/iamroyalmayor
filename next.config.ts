import type { NextConfig } from "next";

// Static export: the `out/` folder deploys as-is to Vercel, Netlify, or any static host.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
