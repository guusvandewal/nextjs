/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.NEXT_IMAGE_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_IMAGE_DOMAIN,
        port: '',
        pathname: '**',
      },

      {
        protocol: 'https',
        hostname: 'guus.local',
        port: '443',
        pathname: '**',
      },

      {
        protocol: 'https',
        hostname: 'backend.guusvandewal.nl',
        port: '443',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/jsonapi/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  reactStrictMode: true,
}

module.exports = nextConfig
