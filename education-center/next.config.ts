import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 靜態輸出，方便之後部署到 GitHub Pages 或其他靜態主機
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
