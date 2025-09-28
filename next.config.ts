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
  }
};

export default nextConfig;
