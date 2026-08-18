"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function CinematicHero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by some mobile browsers until user interaction
      });
    }
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#050505',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <source src="/video/videonew.MP4" type="video/mp4" />
        <source src="/video/0615.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Dark Gradient & Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(5, 5, 5, 0.35) 0%, rgba(5, 5, 5, 0.65) 100%), linear-gradient(180deg, rgba(5, 5, 5, 0.5) 0%, rgba(5, 5, 5, 0.2) 40%, rgba(5, 5, 5, 0.7) 100%)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Centered Editorial Overlay Content */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          width: '90%',
          maxWidth: '1200px',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.75rem, 4.2vw, 3.4rem)',
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: '#F5F2EC',
            margin: '0 0 14px 0',
            lineHeight: 1.15,
            textShadow: '0 2px 16px rgba(0, 0, 0, 0.65)',
            whiteSpace: 'normal',
          }}
        >
          Curators Of Extraordinary Journeys
        </h1>

        <p
          style={{
            fontFamily: "'General Sans', 'Inter', sans-serif",
            fontSize: 'clamp(0.78rem, 1.6vw, 1.05rem)',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(245, 242, 236, 0.85)',
            margin: '0 0 36px 0',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          Bespoke B2B Travel &amp; Destination Management
        </p>

        {/* Fixed Explore CTA Outline Button */}
        <div style={{ pointerEvents: 'auto' }}>
          <Link
            href="/destinations"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '2.2px',
              textTransform: 'uppercase',
              color: '#F5F2EC',
              background: 'rgba(5, 5, 5, 0.25)',
              border: '1px solid rgba(245, 242, 236, 0.85)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              padding: '16px 36px',
              borderRadius: '0px',
              textDecoration: 'none',
              transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5F2EC';
              e.currentTarget.style.color = '#000000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(5, 5, 5, 0.25)';
              e.currentTarget.style.color = '#F5F2EC';
            }}
          >
            Explore Destinations &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
