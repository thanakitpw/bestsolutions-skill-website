import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pin tracing root to this project (a stray ~/package-lock.json confused inference)
  outputFileTracingRoot: process.cwd(),
  async redirects() {
    return [
      {
        source: "/courses/website-intensive-2-hours",
        destination: "/courses/website-shortcut",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
