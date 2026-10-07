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

    // ── SEO title/description/canonical/OG/Twitter update ──────────────────
    const applySeoTags = (entry: any, defaultPath: string) => {
      if (!entry) return;

      // 1. Title
      if (entry.title) {
        document.title = entry.title;
      }

      // 2. Description
      if (entry.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', entry.description);
      }

      // 3. Keywords / Focus words
      if (entry.keywords) {
        let metaKw = document.querySelector('meta[name="keywords"]');
        if (!metaKw) {
          metaKw = document.createElement('meta');
          metaKw.setAttribute('name', 'keywords');
          document.head.appendChild(metaKw);
        }
        metaKw.setAttribute('content', entry.keywords);
      }

      // 4. Canonical URL
      const canonicalUrl = entry.canonical && entry.canonical.trim() !== ''
        ? entry.canonical.trim()
        : (entry.url && entry.url.trim() !== '' ? entry.url.trim() : `https://travinno.com${defaultPath}`);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonicalUrl);

      // 5. Robots / Indexing
      const isIndexable = entry.indexable !== false;
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', isIndexable ? 'index, follow' : 'noindex, nofollow');

      // 6. OpenGraph tags
      const setMetaProperty = (prop: string, val?: string) => {
        if (!val) return;
        let el = document.querySelector(`meta[property="${prop}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('property', prop);
          document.head.appendChild(el);
        }
        el.setAttribute('content', val);
      };

      setMetaProperty('og:title', entry.title);
      setMetaProperty('og:description', entry.description);
      setMetaProperty('og:url', canonicalUrl);
      if (entry.ogImage) {
        const ogVal = entry.ogImage.startsWith('data:')
          ? `https://travinno.com/api/image/?c=travinno_seo&i=${encodeURIComponent(entry.page || 'home')}&f=ogImage`
          : (entry.ogImage.startsWith('/') ? `https://travinno.com${entry.ogImage}` : entry.ogImage);
        setMetaProperty('og:image', ogVal);
      }

      // 7. Twitter Card tags
      const setMetaName = (name: string, val?: string) => {
        if (!val) return;
        let el = document.querySelector(`meta[name="${name}"]`);
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute('name', name);
          document.head.appendChild(el);
        }
        el.setAttribute('content', val);
      };

      setMetaName('twitter:title', entry.title);
      setMetaName('twitter:description', entry.description);
      if (entry.ogImage) {
        const twVal = entry.ogImage.startsWith('data:')
          ? `https://travinno.com/api/image/?c=travinno_seo&i=${encodeURIComponent(entry.page || 'home')}&f=ogImage`
          : (entry.ogImage.startsWith('/') ? `https://travinno.com${entry.ogImage}` : entry.ogImage);
        setMetaName('twitter:image', twVal);
      }
    };

    const handleSeoSync = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      let pageKey = '';
      let defaultPath = path || '/';

      if (hash === '#services') {
        pageKey = 'services';
        defaultPath = '/#services';
      } else if (hash === '#testimonials') {
        pageKey = 'testimonials';
        defaultPath = '/#testimonials';
      } else if (path.includes('/about')) {
        pageKey = 'about';
        defaultPath = '/about';
      } else if (path.includes('/blog')) {
        pageKey = 'blog';
        defaultPath = '/blog';
      } else if (path.includes('/careers')) {
        pageKey = 'careers';
        defaultPath = '/careers';
      } else if (path.includes('/contact')) {
        pageKey = 'contact';
        defaultPath = '/contact';
      } else if (path.includes('/destinations')) {
        pageKey = 'destinations';
        defaultPath = '/destinations';
      } else if (path.includes('/team')) {
        pageKey = 'team';
        defaultPath = '/team';
      } else if (path.includes('/privacy')) {
        pageKey = 'privacy';
        defaultPath = '/privacy';
      } else if (path.includes('/terms')) {
        pageKey = 'terms';
        defaultPath = '/terms';
      } else if (path === '/' || path === '') {
        pageKey = 'home';
        defaultPath = '/';
      }

      const seoList = db.collections['travinno_seo'] || [];
      const entry = seoList.find((item: any) => item.page === pageKey);

      if (entry) {
        applySeoTags(entry, defaultPath);
      }
    };

    window.addEventListener('hashchange', handleSeoSync);
    window.addEventListener('travinno-db-update', handleSeoSync);

    // Run initially on mount
    handleSeoSync();

    return () => {
      window.removeEventListener('hashchange', handleSeoSync);
      window.removeEventListener('travinno-db-update', handleSeoSync);
    };
  }, []); // fires on every mount (each SPA navigation remounts this component)

  return null;
}
