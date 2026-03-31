/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.repliers.io',
      },
      {
        protocol: 'https',
        hostname: '**.repliers.media',
      },
      {
        protocol: 'https',
        hostname: 'cdn.repliers.io',
      },
    ],
  },
};

export default nextConfig;
