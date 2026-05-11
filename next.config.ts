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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "ik-fooduganda.com" }],
        destination: "https://ikfoodug.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ik-fooduganda.com" }],
        destination: "https://ikfoodug.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
