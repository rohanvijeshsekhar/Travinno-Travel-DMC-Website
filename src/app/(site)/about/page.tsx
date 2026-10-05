// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import { ParallaxComponent } from '@/components/ui/parallax-scrolling';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-helper';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    'about',
    'About Our Journey - Travinno',
    'Explore the legacy, core purpose, and chronological journey of Travinno.',
    '/about'
  );
}

export default async function AboutPage() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <ParallaxComponent />
    </>
  );
}
