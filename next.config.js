/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })

    return config
  },
  async rewrites() {
    return [
      {
        source: '/wasm/bevy-sandbox',
        destination: 'https://bevy-axum.netlify.app/',
      },
      {
        source: '/wasm/assets/:path*',
        destination: 'https://bevy-axum.netlify.app/assets/:path*',
      },
    ]
  },
  env: {
    API_URL: process.env.API_URL,
    APP_URL: process.env.APP_URL,
    MY_SECRET_TOKEN: process.env.MY_SECRET_TOKEN,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL
  },
  output: 'standalone',
  images: {
    loader: 'custom',
    loaderFile: './loader.ts',
    formats: ['image/avif', 'image/webp'],
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
