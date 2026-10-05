import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize images: serve WebP automatically, allow both relative and base64 images
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        // Immutable version-hashed binary images served via /api/image/
        source: '/api/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Dynamic live data API routes (collections, ping, upload, save, reset) must never be cached
        source: '/api/((?!image).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
      {
        // Static assets (images, fonts, videos, partners, icons) - cache long-term
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf|otf|mp4|webm)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // HTML pages: allow browser Back/Forward cache (bfcache) and intermediate
        // caches to store responses, but always revalidate before serving.
        // This prevents ChunkLoadError on redeploy because stale HTML is
        // revalidated on every navigation, while still allowing instant bfcache
        // hits and avoiding the full round-trip cost of no-store.
        source: '/((?!api|_next/static|_next/image|favicon|images|fonts|video|partners).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

