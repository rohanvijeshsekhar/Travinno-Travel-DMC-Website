"use client";

import { useEffect } from 'react';

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      const msg = (e.message || '') + ' ' + (e.filename || '');
      // Only reload on genuine ChunkLoadError when a build chunk hash change occurs
      if (msg.indexOf('ChunkLoadError') !== -1) {
        const lastReload = sessionStorage.getItem('chunk_reload_ts');
        const now = Date.now();
        // Guard against reload loops: maximum 1 reload per 60 seconds
        if (!lastReload || now - parseInt(lastReload, 10) > 60000) {
          sessionStorage.setItem('chunk_reload_ts', String(now));
          window.location.reload();
        }
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  return null;
}
