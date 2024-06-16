
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
        source: '/wasm-test',
        destination: `https://prismatic-shortbread-d520b8.netlify.app`,
      },
      {
        source: '/wasm-test/:path*',
        destination: `https://prismatic-shortbread-d520b8.netlify.app/:path*`,
      },
      {
        source: '/wasm-shuttle',
        destination: `https://bevy-game.shuttleapp.rs`,
      },
      {
        source: '/wasm-shuttle/:path*',
        destination: `https://bevy-game.shuttleapp.rs/:path*`,
      }
    ]
  },
  headers: async () => {
    return [
      {
        source: "/wasm-test",
        headers: getCorsHeaders(),
      },
      {
        source: "/wasm-test/:path*",
        headers: getCorsHeaders(),
      },
      {
        source: "/wasm-shuttle",
        headers: getCorsHeaders(),
      },
      {
        source: "/wasm-shuttle/:path*",
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
