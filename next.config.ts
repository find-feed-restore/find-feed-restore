import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/trailer-ministry/",
        destination: "/we-need-trailers/",
        permanent: true,
      },
      {
        source: "/terms/",
        destination: "/terms-conditions/",
        permanent: true,
      },
      {
        source: "/news/",
        destination: "/news-media/",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/board-staff/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
