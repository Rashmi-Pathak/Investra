import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@investra/theme", "@investra/animations"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
