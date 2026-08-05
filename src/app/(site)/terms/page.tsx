// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollections } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import TermsPage from '@/components/TermsPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - Travinno',
  description: 'Read the legal and commercial terms of service for contracting and booking with Travinno.',
};

export default async function TermsPageRoute() {
  const collections = await getCollections();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <TermsPage />
    </>
  );
}
