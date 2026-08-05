// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import CareersPage from '@/components/CareersPage';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const collections = await getCollectionsSSR();
  const seoList = collections['travinno_seo'] || [];
  const entry = seoList.find((item: any) => item.page === 'careers');
  return {
    title: entry?.title || 'Careers at Travinno - Join Our Team',
    description: entry?.description || 'Join the dynamic Travinno team. Apply for premium travel and operations positions around the globe.',
  };
}

export default async function CareersPageRoute() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <CareersPage />
    </>
  );
}
