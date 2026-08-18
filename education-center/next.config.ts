import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/site";

const nextConfig: NextConfig = {
  // 靜態輸出 + GitHub Pages 子路徑部署
  // 發布位置：https://candylots.github.io/OpenClaw/education-center/
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
