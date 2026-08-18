import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  trailingSlash: true,
  images: {
    minimumCacheTTL: 86_400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
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
