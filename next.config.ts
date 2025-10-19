import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    largePageDataBytes: 512 * 1000,
  },
  // Increase build timeout
  staticPageGenerationTimeout: 180,
};

export default nextConfig;
