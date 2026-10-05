// Force SSR on every request - prevents stale build-time data
export const dynamic = 'force-dynamic';

import React from 'react';
import { getCollectionsSSR } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import ContactPage from '@/components/ContactPage';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-helper';

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata(
    'contact',
    'Contact Us - Travinno Partner Onboarding',
    'Reach out to establish a B2B partner contract or make custom travel inquiries with Travinno.',
    '/contact'
  );
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
