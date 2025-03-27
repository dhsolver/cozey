import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    if (process.env.NODE_ENV === "production") {
      return [];
    }

    return [
      {
        source: `/api/:path*`,
        destination: `http://localhost:4040/:path*`,
      },
    ];
  },
};

export default nextConfig;
