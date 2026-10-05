'use client';

import React, { useState, useEffect, useCallback } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

export default function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // Reset loader completion state on every page mount/refresh
    if (typeof window !== 'undefined') {
      (window as any).travinnoLoaderCompleted = false;
    }

    // 1. Detect if touch/mobile device once at mount
    setIsTouchDevice(
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );

    // 2. In Next.js SSR the layout is preserved across client-side navigations,
    //    so React state alone ensures:
    //    - Full page load / refresh  → component remounts → showLoader is true (displays loading screen)
    //    - SPA navigation (Link)     → layout stays mounted → showLoader stays false (seamless transition)

    // 3. Register custom cursor-following coordinates (desktop/hover pointer devices only)
    if (window.matchMedia('(hover: hover)').matches) {
      const handleMouseMove = (e: MouseEvent) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false);
    if (typeof window !== 'undefined') {
      (window as any).travinnoLoaderCompleted = true;
    }
    window.dispatchEvent(new Event('travinnoLoaderComplete'));
  }, []); // stable reference — never changes


  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        backgroundColor: '#050505',
        colorScheme: 'dark',
        overflowX: 'clip',
        position: 'relative',
      }}
    >
      {/* Fullscreen Loading Experience (session-gated) */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* Floating Transparent Navigation Header */}
      <Header />

      {/* Animated Film Grain Overlay — hidden on mobile via CSS */}
      <div className="film-grain" />

      {/* Cursor-following spotlight — desktop only */}
      {!isTouchDevice && <div className="cursor-glow" />}

      {/* Main content body - hidden while loader is active so video/content can never bleed through */}
      <main
        style={{
          width: '100%',
          position: 'relative',
          visibility: showLoader ? 'hidden' : 'visible',
          opacity: showLoader ? 0 : 1,
          transition: 'opacity 0.4s ease-out',
        }}
      >
        {children}
      </main>

      {/* Global Footer Section */}
      <Footer />
    </div>
  );
}
