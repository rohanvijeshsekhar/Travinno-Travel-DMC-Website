"use client";

import { useEffect } from 'react';

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      const msg = (e.message || '') + ' ' + (e.filename || '');
      if (
        msg.indexOf('ChunkLoadError') !== -1 ||
        (msg.indexOf('_next/static/chunks') !== -1 && (e.target as HTMLElement)?.tagName === 'SCRIPT')
      ) {
        if (!sessionStorage.getItem('chunk_reload_attempted')) {
          sessionStorage.setItem('chunk_reload_attempted', '1');
          window.location.reload();
        }
      }
    };

    window.addEventListener('error', handleError, true);
    return () => window.removeEventListener('error', handleError, true);
  }, []);

  return null;
}
