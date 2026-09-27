import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  allowedDevOrigins: ["172.28.247.148"],
};

export default nextConfig;
