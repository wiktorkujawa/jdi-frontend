/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  env: {
    API_URL: process.env.API_URL,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN
  },
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ],
    minimumCacheTTL: 1500000
  }
};

module.exports = nextConfig;
