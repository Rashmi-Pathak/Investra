import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@investra/theme", "@investra/animations"],
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
