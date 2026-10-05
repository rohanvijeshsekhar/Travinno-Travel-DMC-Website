// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import BlogPage from '@/components/BlogPage';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-helper';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    'blog',
    'Travel Journal & Insights - Travinno',
    'Read the latest travel tips, destinations guides, and B2B hospitality insights by Travinno editors.',
    '/blog'
  );
}

export default async function BlogPageRoute() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <BlogPage />
    </>
  );
}
