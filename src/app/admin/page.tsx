import React from 'react';
import { getCollections } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import AdminPanel from '@/components/AdminPanel';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'CMS Admin Panel - Travinno',
  description: 'Control and update destinations, slides, jobs, applications, and blogs for Travinno.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPageRoute() {
  const collections = await getCollections();

  // Seed server-side cache
  Object.keys(collections).forEach((key) => {
    db.collections[key] = collections[key];
  });
  db.initialized = true;

  return (
    <>
      <DBHydrator data={collections} />
      <div style={{ minHeight: '100vh' }}>
        <AdminPanel />
      </div>
    </>
  );
}
