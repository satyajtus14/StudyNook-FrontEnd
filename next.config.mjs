/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  logging: {
    fetches: { fullUrl: false },
  },

  images: {
    remotePatterns: [
          {
        protocol: "https",
        hostname: "mockmind-api.uifaces.co",  
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
};

export default nextConfig;