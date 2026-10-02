'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export default function HomeScrollEffects() {
  useEffect(() => {
    // Prevent the browser from automatically restoring scroll position on refresh.
    // This ensures ScrollTrigger always calculates page offsets from a clean y=0 state,
    // eliminating layout-shift calculations clashing on reload.
    if (typeof window !== 'undefined') {
      if (window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    // Only run on client side
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // Initialize Lenis smooth scroll
    // IMPORTANT: smoothTouch and syncTouch must stay FALSE on real mobile devices.
    // Enabling them intercepts native momentum scrolling and runs JS-driven scroll
    // on the main thread, which creates severe jitter with GSAP ScrollTrigger pinning.
    // (This is the same configuration as the working CSR version.)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouchDevice,
      smoothTouch: false,
      syncTouch: false,
    } as any);
    
    // @ts-ignore
    window.lenis = lenis;
    // @ts-ignore
    window.ScrollTrigger = ScrollTrigger;

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Sync Lenis with GSAP ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);

    // If a pending scroll target was stored in sessionStorage (cross-page nav), consume it
    const pendingTarget = sessionStorage.getItem('travinno_pending_scroll');
    if (pendingTarget) {
      sessionStorage.removeItem('travinno_pending_scroll');
      
      const doScroll = () => {
        const el = document.getElementById(pendingTarget);
        if (!el) return;

        const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
        const absoluteTop = Math.max(0, el.getBoundingClientRect().top + scrollY - 80);
        lenis.scrollTo(absoluteTop, { duration: 1.2 });
      };

      // @ts-ignore
      if (window.travinnoScrollTriggerReady) {
        doScroll();
      } else {
        let resolved = false;
        const handleReady = () => {
          if (resolved) return;
          resolved = true;
          window.removeEventListener('travinnoScrollTriggerReady', handleReady);
          requestAnimationFrame(() => {
            requestAnimationFrame(doScroll);
          });
        };
        window.addEventListener('travinnoScrollTriggerReady', handleReady);
        setTimeout(handleReady, 2500); // safety fallback timeout
      }
    }

    return () => {
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      // @ts-ignore
      window.lenis = null;
      ScrollTrigger.normalizeScroll(false);
      if (typeof window !== 'undefined' && window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  return null;
}
