import { NextResponse } from 'next/server';
import { getCollections } from '@/lib/db-server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getCollections();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
