import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  agentRules: false,
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/entre" : "",
  assetPrefix: isGitHubPages ? "/entre/" : undefined,
  images: { unoptimized: true },
};

export default nextConfig;
