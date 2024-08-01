
const getCorsHeaders = () => {
  const headers = {};

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Credentials"] = "true";
  headers["Access-Control-Allow-Methods"] =
    "GET,OPTIONS,PATCH,DELETE,POST,PUT";
  headers["Access-Control-Allow-Headers"] =
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};

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
        source: '/bevy-sandbox',
        destination: `https://bevy-axum.netlify.app/`,
      },
    ]
  },
  headers: async () => {
    return [
      {
        source: "/bevy-sandbox",
        headers: getCorsHeaders(),
      },
    ];
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
