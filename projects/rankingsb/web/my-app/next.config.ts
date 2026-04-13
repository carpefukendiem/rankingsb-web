import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/locations/the-funk-zone-seo",
        destination: "/locations/santa-barbara-seo",
        permanent: true,
      },
      {
        source: "/locations/hope-ranch-seo",
        destination: "/locations/santa-barbara-seo",
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
