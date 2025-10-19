import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for dynamic rendering with large file counts
  experimental: {
    largePageDataBytes: 512 * 1000,
  },
  
  // Increase timeout for dynamic pages
  staticPageGenerationTimeout: 180,
  
  // Enable standalone output for better performance
  output: 'standalone',
};

export default nextConfig;
