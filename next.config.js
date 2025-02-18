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
  basePath: process.env.GITHUB_ACTIONS ? '/sitecheck' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '/sitecheck' : '',
  trailingSlash: true,
}

module.exports = nextConfig 