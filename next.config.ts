import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "t3.ftcdn.net",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com",
        pathname: "/**"
      }
    ]
  },
  // Output configuration for Docker
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  // Skip ESLint during builds for Docker
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript type checking during builds for Docker
  typescript: {
    ignoreBuildErrors: true,
  },
  // Server external packages for better Docker support
  serverExternalPackages: ['@prisma/client', 'bcryptjs']
};

export default nextConfig;
