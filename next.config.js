/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn-images-1.medium.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        pathname: '**',
      },
    ],
  },
}

module.exports = nextConfig 