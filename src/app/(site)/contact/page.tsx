// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import ContactPage from '@/components/ContactPage';
import type { Metadata } from 'next';

export async function generateMetadata() {
  const collections = await getCollectionsSSR();
  const seoList = collections['travinno_seo'] || [];
  const entry = seoList.find((item: any) => item.page === 'contact');
  return {
    title: entry?.title || 'Contact Us - Travinno Partner Onboarding',
    description: entry?.description || 'Reach out to establish a B2B partner contract or make custom travel inquiries with Travinno.',
  };
}

export default async function ContactPageRoute() {
  const collections = await getCollectionsSSR();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <ContactPage />
    </>
  );
}
