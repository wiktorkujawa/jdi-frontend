/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    API_URL: process.env.API_URL,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: `${process.env.API_URL}:path*`,
  //     },
  //   ]
  // },
  output: 'standalone',
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dlznycnmy/image/upload',
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com"
    //   }
    // ],
    domains: ["res.cloudinary.com"],
    minimumCacheTTL: 1500000
  }
};

module.exports = nextConfig;
