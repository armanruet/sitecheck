/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  basePath: '/sitecheck',
  assetPrefix: '/sitecheck',
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig 