import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Enquiry pages were renamed; keep old links working.
  async redirects() {
    return [
      { source: "/contact/remodel", destination: "/contact/consultation", permanent: true },
      { source: "/contact/new-build", destination: "/contact/consultation", permanent: true },
      { source: "/contact/meet", destination: "/contact/visit", permanent: true },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
