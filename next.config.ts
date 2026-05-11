import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ikfoodug.com",
      },
    ],
  },
};

export default nextConfig;
