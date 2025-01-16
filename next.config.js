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
  basePath: '/armanruet52.github.io',
  assetPrefix: '/armanruet52.github.io',
}

module.exports = nextConfig 