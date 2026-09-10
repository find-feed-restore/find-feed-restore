import type { NextConfig } from "next";

const securityHeaders: Array<{ key: string; value: string }> = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
        source: "/:path*",
        headers: securityHeaders,
      },
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
      {
        source: "/about/",
        destination: "/board-staff/",
        permanent: true,
      },
      {
        source: "/feed/",
        destination: "/news-media/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
