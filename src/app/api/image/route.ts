import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// In-process image cache: keyed by "collection:itemId:field"
// TTL is 1 hour. Cache is busted by the ?v= version param in the URL,
// so when admin uploads a new image the URL changes and browser re-fetches.
const imageCache = new Map<string, { buf: Buffer; mime: string; at: number }>();
const TTL = 60 * 60 * 1000; // 1 hour ms

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const col  = sp.get('c');   // collection key  e.g. travinno_destinations
    const id   = sp.get('i');   // item id          e.g. dubai
    const field = sp.get('f') || 'image'; // field name e.g. image / desktopImage
    const ver  = sp.get('v') || ''; // version (cache buster, ignored server-side)

    if (!col || !id) {
      return new NextResponse('Missing c or i param', { status: 400 });
    }

    const cacheKey = `${col}:${id}:${field}`;
    const cached = imageCache.get(cacheKey);
    if (cached && Date.now() - cached.at < TTL) {
      return new NextResponse(cached.buf, {
        headers: {
          'Content-Type': cached.mime,
          'Cache-Control': 'public, max-age=3600, immutable',
        },
      });
    }

    // Import lazily to avoid circular deps and keep this route fast
    const { getCollections } = await import('@/lib/db-server');
    const data = await getCollections();
    const items: any[] = Array.isArray(data[col]) ? data[col] : [];

    const item = items.find(
      (it: any) => String(it?.id) === String(id) || String(it?.name) === String(id)
    );

    if (!item) {
      return new NextResponse(`Item ${id} not found in ${col}`, { status: 404 });
    }

    const rawVal: string = item[field];

    if (!rawVal || typeof rawVal !== 'string') {
      return new NextResponse('Field not found or not a string', { status: 404 });
    }

    // If it's already a file path (not base64), redirect to the static file
    if (!rawVal.startsWith('data:')) {
      const clean = rawVal.startsWith('/') ? rawVal : `/${rawVal}`;
      return NextResponse.redirect(new URL(`/demo${clean}`, req.url));
    }

    // Parse data URI
    const match = rawVal.match(/^data:([^;]+);base64,(.+)$/s);
    if (!match) {
      return new NextResponse('Invalid data URI', { status: 422 });
    }

    const mime = match[1];
    const buf = Buffer.from(match[2], 'base64');

    // Cache for next request
    imageCache.set(cacheKey, { buf, mime, at: Date.now() });

    return new NextResponse(buf, {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'public, max-age=3600, immutable',
        'X-Image-Source': 'mysql-base64',
      },
    });
  } catch (err: any) {
    console.error('[api/image] error:', err.message);
    return new NextResponse('Internal error: ' + err.message, { status: 500 });
  }
}
