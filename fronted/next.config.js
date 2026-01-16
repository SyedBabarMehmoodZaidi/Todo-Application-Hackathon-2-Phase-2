/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-url.vercel.app',
  },
  async rewrites() {
    return [
      // Proxy API requests to the backend
      {
        source: '/api/:path*',
        destination: process.env.API_DESTINATION || 'http://localhost:8000/:path*',
      },
    ]
  }
};

module.exports = nextConfig;