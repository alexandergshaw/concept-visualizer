import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/concept-visualizer', // Replace with your GitHub repo name
  trailingSlash: true,
};

export default nextConfig;
