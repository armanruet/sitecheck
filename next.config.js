/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['cdn-images-1.medium.com'],
  },
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig 