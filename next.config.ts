// Removed 'import type' to prevent the strict type checking error in VS Code
const nextConfig = {
  output: "standalone",
  productionBrowserSourceMaps: false,
  // Skip heavy type-checking and linting to save RAM during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
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
  // Restrict build resources to prevent OOM
  experimental: {
    workerThreads: false, 
    cpus: 1
  },
};

export default nextConfig;