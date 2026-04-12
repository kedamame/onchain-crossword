/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imagedelivery.net' },
      { protocol: 'https', hostname: '*.farcaster.xyz' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },
};

module.exports = nextConfig;
