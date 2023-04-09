/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "res.cloudinary.com"
    //   }
    // ],
    domains: [
      "res.cloudinary.com"
    ],
    minimumCacheTTL: 1500000
  }
};

module.exports = nextConfig;
