/** @type {import('next').NextConfig} */
const nextConfig = {    
  images: {
    domains: ['sgp1.digitaloceanspaces.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.deepsense.space',
      },
    ],
  },
};

export default nextConfig;