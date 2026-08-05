import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/demo',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize images: serve WebP automatically, allow both relative and base64 images
  images: {
    formats: ['image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        // API routes must never be cached — they serve live DB data
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
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

