import type { NextConfig } from "next";

const repoName = "OpenClaw";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages
  output: "export",
  trailingSlash: true,
  // Serve under https://candylots.github.io/OpenClaw/
  basePath: `/${repoName}`,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
