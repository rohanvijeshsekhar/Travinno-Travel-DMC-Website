// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import PrivacyPage from '@/components/PrivacyPage';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-helper';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    'privacy',
    'Privacy Policy - Travinno',
    'Understand how Travinno handles personal information and B2B partner data securely.',
    '/privacy'
  );
}

export default async function PrivacyPageRoute() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <PrivacyPage />
    </>
  );
}
