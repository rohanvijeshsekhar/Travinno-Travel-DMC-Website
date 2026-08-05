'use client';

import React, { useEffect } from 'react';
import { db } from '@/lib/db';

interface DBHydratorProps {
  data: Record<string, any>;
}

export default function DBHydrator({ data }: DBHydratorProps) {
  // ── Synchronous render-phase update ────────────────────────────────────────
  // This runs BEFORE any child component's render, so page-level components
  // that read from db.collections in their useState initializers always get
  // the fresh SSR data from MySQL — not the stale build-time INITIAL_* defaults.
  if (data) {
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        db.collections[key] = data[key];
      }
    });
  }

  // Signal db.init() that SSR already provided the latest server data.
  // This skips the client-side /api/ping + /api/collections double-fetch
  // which was causing the 4–10 second delay after admin panel updates.
  db.ssrHydrated = Object.keys(data || {}).length > 0;

  // Initialize on first load (takes the fast SSR path since ssrHydrated=true)
  db.init();

  // ── Post-mount broadcast ────────────────────────────────────────────────────
  // db.init() only broadcasts on the very FIRST call (db.initialized guard).
  // On SPA navigations the new page's DBHydrator has fresh SSR data but
  // db.initialized is already true, so db.init() is a no-op and the broadcast
  // never fires. Layout components (Header, Footer) that are already mounted
  // never learn about the new data and continue showing stale content.
  //
  // Fix: always dispatch 'travinno-db-update' from useEffect on every mount.
  // On SPA navigation, DBHydrator unmounts (it's in the page, not the layout)
  // and remounts on the new page, so this useEffect fires every time.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Broadcast fresh data to all currently-mounted components including
    // the persistent layout (Header, Footer) so they re-render immediately.
    window.dispatchEvent(new CustomEvent('travinno-db-update'));

    // ── SEO title/description update ─────────────────────────────────────────
    const defaultTitle = document.title;
    const defaultDescEl = document.querySelector('meta[name="description"]');
    const defaultDesc = defaultDescEl ? defaultDescEl.getAttribute('content') : '';

    const handleHashTitle = () => {
      const hash = window.location.hash;
      let pageKey = '';
      if (hash === '#services') pageKey = 'services';
      else if (hash === '#testimonials') pageKey = 'testimonials';

      const seoList = db.collections['travinno_seo'] || [];

      if (pageKey) {
        const entry = seoList.find((item: any) => item.page === pageKey);
        if (entry) {
          if (entry.title) document.title = entry.title;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && entry.description) {
            metaDesc.setAttribute('content', entry.description);
          }
        }
      } else {
        const path = window.location.pathname;
        let routeKey = 'home';
        if (path.includes('/about')) routeKey = 'about';
        else if (path.includes('/blog')) routeKey = 'blog';
        else if (path.includes('/careers')) routeKey = 'careers';
        else if (path.includes('/contact')) routeKey = 'contact';
        else if (path.includes('/destinations')) routeKey = 'destinations';
        else if (path.includes('/team')) routeKey = 'team';

        const entry = seoList.find((item: any) => item.page === routeKey);
        if (entry) {
          if (entry.title) document.title = entry.title;
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc && entry.description) {
            metaDesc.setAttribute('content', entry.description);
          }
        } else {
          document.title = defaultTitle;
          if (defaultDescEl && defaultDesc) {
            defaultDescEl.setAttribute('content', defaultDesc);
          }
        }
      }
    };

    window.addEventListener('hashchange', handleHashTitle);
    window.addEventListener('travinno-db-update', handleHashTitle);

    // Run initially on mount
    handleHashTitle();

    return () => {
      window.removeEventListener('hashchange', handleHashTitle);
      window.removeEventListener('travinno-db-update', handleHashTitle);
    };
  }, []); // fires on every mount (each SPA navigation remounts this component)

  return null;
}
