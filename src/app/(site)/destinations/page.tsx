// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import DestinationsPage from '@/components/DestinationsPage';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-helper';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    'destinations',
    'Luxury Destinations Showcase - Travinno',
    'Discover futuristic cities, private deserts, and tropical archipelagos designed by Travinno specialists.',
    '/destinations'
  );
}

export default async function DestinationsPageRoute() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <DestinationsPage />
    </>
  );
}
