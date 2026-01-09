/** @type {import('next').NextConfig} */
const nextConfig = {
  
  experimental: {
    turbo: false
  },

  
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },

  reactStrictMode: true,
  swcMinify: true
};

module.exports = nextConfig;
