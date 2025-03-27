import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: `/api/:path*`,
        destination: `http://localhost:4040/:path*`,
      },
    ];
  },
};

export default nextConfig;
