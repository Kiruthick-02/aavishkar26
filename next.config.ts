import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for Docker/Hugging Face
  productionBrowserSourceMaps: false, // Reduces memory usage significantly
  images: {
    unoptimized: true, // Required if 'sharp' is not installed in Docker
    remotePatterns: [
      {
        protocol: "https",
        hostname: "slelguoygbfzlpylpxfs.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Memory management for build time
  experimental: {
    workerThreads: false, 
    cpus: 1
  },
};

export default nextConfig;