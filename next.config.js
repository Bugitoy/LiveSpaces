/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.builder.io"],
  },
  // Simplified webpack config to avoid potential issues
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  // Temporarily disable experimental features
  // experimental: {
  //   webpackBuildWorker: true,
  // },
};

module.exports = nextConfig;
