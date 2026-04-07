import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output not needed for buildpack deployment
  //   output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hopluccorp.vn',
        port: '',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
