import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/may-bong",
  assetPrefix: "/may-bong/",
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
