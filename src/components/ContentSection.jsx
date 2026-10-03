"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import Link from 'next/link';

// GSAP Magnetic Hook (disabled or subtle pull for minimal flat buttons)
function useMagnetic(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Extremely subtle pull to keep buttons calm
      gsap.to(el, {
        x: x * 0.12,
        y: y * 0.12,
        duration: 0.35,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}

export default function ContentSection() {
  const primaryBtnRef = useRef(null);

  useMagnetic(primaryBtnRef);

  return (
    <div
      className="hero-content-section"
      style={{
        position: 'absolute',
        top: '52%', // Adjusted slightly lower for better visual balance
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '90%',
        maxWidth: '1200px'
      }}
    >
      {/* Editorial Condensed Uppercase Headline */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
        style={{
          marginBottom: '20px',
          overflow: 'hidden'
        }}
      >
        <h1
          className="hero-headline"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '3.2vw',
            minFontSize: '32px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#F5F2EC',
            margin: 0,
            lineHeight: 1.25,
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
          }}
        >
          Curators of <span className="highlight-gradient">Extraordinary Journeys</span>
        </h1>
      </motion.div>

      {/* Subheading (Single line, small, uppercase) */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
        className="hero-subheading"
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: 500,
          lineHeight: '1.5',
          letterSpacing: '0.22em',
          color: '#F5F2EC',
          textTransform: 'uppercase',
          margin: '0 0 45px 0',
          opacity: 0.9,
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
      >
        Trusted DMC specialists across the Middle East, Asia and emerging destinations.
      </motion.p>

      {/* Centered CTA Buttons (Horizontal stack) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
        className="hero-buttons-container"
        style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          pointerEvents: 'auto'
        }}
      >
        {/* Primary button (Thin White border, transparent background, white hover fill) */}
        <div style={{ position: 'relative' }} className="hero-btn-wrapper">
          <Link
            href="/destinations"
            ref={primaryBtnRef}
            className="hero-btn hero-btn-primary"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#F5F2EC',
              background: 'transparent',
              border: '1px solid #F5F2EC',
              padding: '16px 36px',
              borderRadius: '100px',
              boxShadow: 'none',
              transition: 'all 0.35s ease',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F2EC';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#F5F2EC';
            }}
          >
            Explore Destinations
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
