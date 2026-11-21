import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ihsan was renamed to Bustandeen; keep old case-study links working
  async redirects() {
    return [{ source: "/projects/ihsan", destination: "/projects/bustandeen", permanent: true }];
  },
};

export default nextConfig;
