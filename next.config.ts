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
  env: { NEXT_PUBLIC_BASE_PATH: isGitHubPages ? "/entre" : "" },
  images: { unoptimized: true },
};

export default nextConfig;
