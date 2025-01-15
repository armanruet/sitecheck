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
  basePath: process.env.NODE_ENV === 'production' ? '/armanruet.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/armanruet.github.io' : '',
}

module.exports = nextConfig 