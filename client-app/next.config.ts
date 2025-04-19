import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/your-repo-name', // Replace with your GitHub repo name
  trailingSlash: true,
};

export default nextConfig;
