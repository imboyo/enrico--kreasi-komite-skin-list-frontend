import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-1494790108377-be9c29b29330",
        search: "?auto=format&fit=crop&w=160&q=80",
      },
    ],
  },
};

export default nextConfig;
