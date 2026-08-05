// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollections } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import TeamPage from '@/components/TeamPage';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const collections = await getCollections();
  const seoList = collections['travinno_seo'] || [];
  const entry = seoList.find((item: any) => item.page === 'team');
  return {
    title: entry?.title || 'Our Executive Leadership & Travel Specialists - Travinno',
    description: entry?.description || 'Meet the passionate professionals and travel specialists behind Travinno.',
  };
}

export default async function TeamPageRoute() {
  const collections = await getCollections();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <TeamPage />
    </>
  );
}
