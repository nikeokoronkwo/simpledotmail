import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/docs", // for microfrontend application
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
