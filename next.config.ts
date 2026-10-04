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

// Preview deployments (the develop branch's dev domain and pull request URLs) stay out of search results.
const isPreviewDeployment = process.env.VERCEL_ENV === "preview";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  trailingSlash: true,
  images: {
    // A week: long enough for repeat visits, short enough that a replaced photo shows up soon.
    minimumCacheTTL: 604_800,
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
      ...(isPreviewDeployment
        ? [
            {
              source: "/:path*",
              headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
            },
          ]
        : []),
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=2592000",
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
