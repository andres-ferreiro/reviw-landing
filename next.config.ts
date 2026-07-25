import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root: the dashboard's package-lock.json one level up
  // otherwise gets misdetected as this project's root.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gpagwuhcgnxmbjgenogr.supabase.co",
        pathname: "/storage/v1/object/public/general-assets/**",
      },
    ],
  },
};

export default nextConfig;
