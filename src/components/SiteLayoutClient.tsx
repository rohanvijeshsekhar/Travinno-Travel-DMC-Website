'use client';

import React, { useState, useEffect, useCallback } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

export default function SiteLayoutClient({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    // 1. Session-gating: skip loader if user already saw it in this session
    try {
      if (typeof window !== 'undefined' && sessionStorage.getItem('travinno_session_loaded')) {
        setShowLoader(false);
        (window as any).travinnoLoaderCompleted = true;
        window.dispatchEvent(new Event('travinnoLoaderComplete'));
      }
    } catch (e) {
      // Ignore private browsing storage quota exceptions
    }

    // 2. Detect if touch/mobile device once at mount
    setIsTouchDevice(
      window.matchMedia('(hover: none) and (pointer: coarse)').matches
    );

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
      try {
        sessionStorage.setItem('travinno_session_loaded', '1');
      } catch (e) {}
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

      {/* Main content body */}
      <main style={{ width: '100%', position: 'relative' }}>{children}</main>

      {/* Global Footer Section */}
      <Footer />
    </div>
  );
}
