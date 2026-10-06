import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['puppeteer'],
  experimental: {
    // Enable optimizations for App router
  },
};

export default nextConfig;
