import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/trailer-ministry",
        destination: "/we-need-trailers",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
