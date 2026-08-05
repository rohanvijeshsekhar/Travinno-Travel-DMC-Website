"use client";

import React, { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

// SVG paths generated from Travinno logo
const innerTPath = "M 78.80,88.83 L 77.99,89.92 L 76.90,91.00 L 76.09,92.08 L 75.00,92.62 L 73.91,93.17 L 72.83,93.44 L 71.74,93.71 L 70.65,93.98 L 69.57,93.98 L 68.48,94.25 L 67.39,94.25 L 66.30,93.98 L 65.22,93.71 L 64.13,93.44 L 63.04,92.90 L 61.96,92.08 L 61.14,91.00 L 60.60,89.92 L 60.33,88.83 L 60.05,87.75 L 59.78,86.67 L 59.78,85.58 L 59.78,84.50 L 59.78,83.42 L 59.78,82.33 L 59.78,81.25 L 59.78,80.17 L 59.78,79.08 L 59.78,78.00 L 59.78,76.92 L 59.78,75.83 L 59.78,74.75 L 59.78,73.67 L 59.78,72.58 L 59.78,71.50 L 59.78,70.42 L 59.78,69.33 L 59.78,68.25 L 59.78,67.17 L 59.78,66.08 L 59.78,65.00 L 59.78,63.92 L 59.78,62.83 L 59.78,61.75 L 59.78,60.67 L 59.78,59.58 L 60.05,58.50 L 61.14,58.50 L 62.23,58.50 L 63.32,58.50 L 64.40,58.50 L 65.49,58.50 L 66.58,58.50 L 67.66,58.50 L 68.75,58.50 L 69.84,58.50 L 70.92,58.50 L 72.01,58.50 L 73.10,58.50 L 74.18,58.50 L 75.27,58.50 L 76.36,58.23 L 76.36,57.15 L 76.36,56.06 L 76.36,54.98 L 76.36,53.90 L 76.36,52.81 L 76.36,51.73 L 76.36,50.65 L 76.36,49.56 L 76.36,48.48 L 76.36,47.40 L 76.36,46.31 L 76.36,45.23 L 76.36,44.15 L 75.27,43.88 L 74.18,43.88 L 73.10,43.88 L 72.01,43.88 L 70.92,43.88 L 69.84,43.88 L 68.75,43.88 L 67.66,43.88 L 66.58,43.88 L 65.49,43.88 L 64.40,43.88 L 63.32,43.88 L 62.23,43.88 L 61.14,43.88 L 60.05,43.88 L 59.78,42.79 L 59.78,41.71 L 59.78,40.62 L 59.78,39.54 L 59.78,38.46 L 59.78,37.38 L 59.78,36.29 L 59.78,35.21 L 59.78,34.12 L 59.78,33.04 L 59.78,31.96 L 59.78,30.88 L 59.78,29.79 L 59.78,28.71 L 59.51,27.62 L 58.42,27.62 L 57.34,27.62 L 56.25,27.62 L 55.16,27.62 L 54.08,27.62 L 52.99,27.62 L 51.90,27.62 L 50.82,27.62 L 49.73,27.62 L 48.64,27.62 L 47.55,27.62 L 46.47,27.62 L 45.38,27.62 L 44.29,27.62 L 43.21,27.62 L 42.12,27.62 L 41.03,27.62 L 40.22,28.17 L 40.22,29.25 L 40.22,30.33 L 40.22,31.42 L 40.22,32.50 L 40.22,33.58 L 40.22,34.67 L 40.22,35.75 L 40.22,36.83 L 40.22,37.92 L 40.22,39.00 L 40.22,40.08 L 40.22,41.17 L 40.22,42.25 L 40.22,43.33 L 40.22,44.42 L 40.22,45.50 L 40.22,46.58 L 40.22,47.67 L 40.22,48.75 L 40.22,49.83 L 40.22,50.92 L 40.22,52.00 L 40.22,53.08 L 40.22,54.17 L 40.22,55.25 L 40.22,56.33 L 40.22,57.42 L 40.22,58.50 L 40.22,59.58 L 40.22,60.67 L 40.22,61.75 L 40.22,62.83 L 40.22,63.92 L 40.22,65.00 L 40.22,66.08 L 40.22,67.17 L 40.22,68.25 L 40.22,69.33 L 40.22,70.42 L 40.22,71.50 L 40.22,72.58 L 40.22,73.67 L 40.22,74.75 L 40.22,75.83 L 40.22,76.92 L 40.22,78.00 L 40.22,79.08 L 40.22,80.17 L 40.22,81.25 L 40.22,82.33 L 40.22,83.42 L 40.22,84.50 L 40.22,85.58 L 40.22,86.67 L 40.22,87.75 L 40.49,88.83 L 40.49,89.92 L 40.76,91.00 L 40.76,92.08 L 41.03,93.17 L 41.30,94.25 L 41.58,95.33 L 42.12,96.42 L 42.66,97.50";

const outerPinPath = "M 42.66,97.50 L 43.48,99.12 L 44.57,100.75 L 45.92,102.38 L 47.28,103.73 L 48.91,105.08 L 50.54,106.17 L 52.17,106.98 L 53.80,107.52 L 55.43,108.06 L 57.07,108.60 L 58.15,109.15 L 56.52,110.50 L 54.89,111.85 L 53.26,113.48 L 51.63,114.83 L 50.00,116.19 L 48.37,115.10 L 46.74,113.48 L 45.11,112.12 L 43.48,110.50 L 41.85,109.15 L 40.22,107.52 L 38.59,106.17 L 36.96,104.54 L 35.33,103.19 L 33.70,101.56 L 32.07,100.21 L 30.43,98.58 L 28.80,96.96 L 27.17,95.33 L 25.54,93.71 L 23.91,92.08 L 22.55,90.46 L 20.92,88.83 L 19.57,87.21 L 18.21,85.58 L 17.12,83.96 L 15.76,82.33 L 14.67,80.71 L 13.59,79.08 L 12.50,77.46 L 11.68,75.83 L 10.87,74.21 L 10.05,72.58 L 9.24,70.96 L 8.70,69.33 L 8.15,67.71 L 7.61,66.08 L 7.34,64.46 L 7.07,62.83 L 6.79,61.21 L 6.52,59.58 L 6.52,57.96 L 6.52,56.33 L 6.52,54.71 L 6.52,53.08 L 6.79,51.46 L 7.07,49.83 L 7.34,48.21 L 7.61,46.58 L 8.15,44.96 L 8.70,43.33 L 9.24,41.71 L 9.78,40.08 L 10.60,38.46 L 11.41,36.83 L 12.23,35.21 L 13.32,33.58 L 14.40,31.96 L 15.76,30.33 L 17.12,28.71 L 18.48,27.08 L 20.11,25.73 L 21.74,24.10 L 23.37,23.02 L 25.00,21.67 L 26.63,20.58 L 28.26,19.77 L 29.89,18.69 L 31.52,18.15 L 33.15,17.33 L 34.78,16.79 L 36.41,15.98 L 38.04,15.71 L 39.67,15.17 L 41.30,14.90 L 42.93,14.62 L 44.57,14.35 L 45.92,14.08 L 47.55,14.08 L 49.18,14.08 L 50.82,14.08 L 52.45,14.08 L 54.08,14.08 L 55.71,14.35 L 57.34,14.62 L 58.97,14.90 L 60.60,15.44 L 62.23,15.71 L 63.86,16.25 L 65.49,16.79 L 67.12,17.60 L 68.75,18.15 L 70.38,18.96 L 72.01,20.04 L 73.64,20.85 L 75.27,21.94 L 76.90,23.29 L 78.53,24.65 L 80.16,26.00 L 81.79,27.62 L 83.15,29.25 L 84.51,30.88 L 85.60,32.50 L 86.68,34.12 L 87.77,35.75 L 88.59,37.38 L 89.40,39.00 L 90.22,40.62 L 90.76,42.25 L 91.30,43.88 L 91.85,45.50 L 92.12,47.12 L 92.66,48.75 L 92.93,50.38 L 92.93,52.00 L 93.21,53.62 L 93.21,55.25 L 93.21,56.88 L 93.21,58.50 L 93.21,60.12 L 92.93,61.75 L 92.66,63.38 L 92.39,65.00 L 91.85,66.62 L 91.30,68.25 L 90.76,69.88 L 90.22,71.50 L 89.40,73.12 L 88.59,74.75 L 87.77,76.38 L 86.96,78.00 L 85.87,79.62 L 84.78,81.25 L 83.70,82.88 L 82.34,84.50 L 81.25,86.12 L 79.89,87.75 L 79.08,88.56";

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null);

  // Lock scroll and drive the ENTIRE exit via pure JS timers.
  // Do NOT rely on Framer Motion for the container opacity —
  // FM v12 applies animate={opacity:0} immediately during SSR hydration.
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Fade-out: start CSS transition at 1800ms (animation is complete by 2.2s)
    const fadeTimer = setTimeout(() => {
      if (loaderRef.current) {
        loaderRef.current.style.transition = 'opacity 0.7s ease-in-out';
        loaderRef.current.style.opacity = '0';
      }
    }, 1800);

    // Unmount: call onComplete at 2500ms (after fade finishes)
    const exitTimer = setTimeout(() => {
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(fadeTimer);
      clearTimeout(exitTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // empty deps — runs once on mount only

  return (
    <div
      ref={loaderRef}
      className="fullscreen-loader"
      style={{
        opacity: 1,           // always start fully visible — no FM involvement
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#050505',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 1. Grid Check Backdrop with increased opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg style={{ width: '100%', height: '100%' }}>
          <defs>
            <pattern id="loader-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#loader-grid)" />
        </svg>
      </div>

      {/* 2. Left Corner (Bottom Left) Malaysia Buildings Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.22, y: 0 }}
        transition={{ delay: 0.4, duration: 1.0, ease: "easeOut" }}
        style={{
          position: 'absolute',
          bottom: '4%',
          left: '5%',
          width: '240px',
          height: '360px',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      >
        <svg viewBox="0 0 280 720" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <g stroke="rgba(255, 255, 255, 0.7)" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <g transform="translate(-1480, -130)">
              {/* Petronas Twin Towers */}
              <line x1="1540" y1="160" x2="1540" y2="820" />
              <line x1="1700" y1="160" x2="1700" y2="820" />
              <path d="M 1540,480 H 1700 M 1540,490 H 1700 M 1610,480 V 490 M 1630,480 V 490 M 1620,480 V 490" />
              {/* Tower 1 */}
              <path d="M 1536,260 V 340 H 1544 V 260 Z" />
              <path d="M 1530,340 V 420 H 1550 V 340 Z" />
              <path d="M 1522,420 V 520 H 1558 V 420 Z" />
              <path d="M 1512,520 V 640 H 1568 V 520 Z" />
              <path d="M 1500,640 V 750 H 1580 V 640 Z" />
              <path d="M 1480,750 V 820 H 1600 V 750 Z" />
              {/* Tower 2 */}
              <path d="M 1696,260 V 340 H 1704 V 260 Z" />
              <path d="M 1690,340 V 420 H 1710 V 340 Z" />
              <path d="M 1682,420 V 520 H 1718 V 420 Z" />
              <path d="M 1672,520 V 640 H 1728 V 520 Z" />
              <path d="M 1660,640 V 750 H 1740 V 640 Z" />
              <path d="M 1640,750 V 820 H 1760 V 750 Z" />
              {/* Accents / Overshoots */}
              <line x1="1490" y1="750" x2="1590" y2="750" />
              <line x1="1505" y1="640" x2="1575" y2="640" />
              <line x1="1518" y1="520" x2="1562" y2="520" />
              <line x1="1650" y1="750" x2="1750" y2="750" />
              <line x1="1665" y1="640" x2="1735" y2="640" />
              <line x1="1678" y1="520" x2="1722" y2="520" />
            </g>
          </g>
          {/* Label text */}
          <text
            x="140"
            y="710"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.15)"
            fontFamily="var(--font-sans)"
            fontSize="24"
            letterSpacing="0.15em"
          >
            KUL // 3.1578° N, 101.7119° E
          </text>
        </svg>
      </motion.div>



      {/* 4. Center Logo Reveal Component Layer */}
      <div className="loader-logo-wrapper" style={{ position: 'relative', width: '120px', height: '156px', zIndex: 10 }}>
        <svg
          viewBox="0 0 100 130"
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        >
          {/* Step 1: Draw T path (Duration 0.8s, fades out at 1.8s) */}
          <motion.path
            d={innerTPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{
              pathLength: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] },
              opacity: { delay: 1.8, duration: 0.4, ease: "easeOut" }
            }}
          />

          {/* Step 2: Draw outer destination pin outline (Duration 1.0s, starts after 0.8s, fades out at 1.8s) */}
          <motion.path
            d={outerPinPath}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            initial={{ pathLength: 0, opacity: 1 }}
            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
            transition={{
              pathLength: { delay: 0.8, duration: 1.0, ease: [0.25, 0.1, 0.25, 1.0] },
              opacity: { delay: 1.8, duration: 0.4, ease: "easeOut" }
            }}
          />

          {/* Step 3: Filled combined path (evenodd cutout) fades in smoothly (Duration 0.4s, starts after 1.8s) */}
          <motion.path
            d={`${outerPinPath} ${innerTPath}`}
            fillRule="evenodd"
            fill="#EA1C29" // Original brand red extracted from PNG
            stroke="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.8,
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        </svg>
      </div>

      {/* Step 4: Brand elements container layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '24px',
          zIndex: 10,
          width: '100%',
          maxWidth: '600px'
        }}
      >
        {/* Brand Name Logo - fades in at 2.2s */}
        <motion.img
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.6,
            ease: "easeOut"
          }}
          src="/demo/images/logo_loading.png"
          alt="Travinno Logo"
          width="135"
          height="24"
          style={{
            height: '24px',
            width: 'auto',
            objectFit: 'contain',
            userSelect: 'none',
            marginBottom: '8px'
          }}
        />

        {/* Tagline - fades in at 2.4s */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.2,
            duration: 0.6,
            ease: "easeOut"
          }}
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '0.18em',
            color: 'rgba(245, 242, 236, 0.22)',
            textTransform: 'uppercase',
            textAlign: 'center',
            userSelect: 'none',
            marginBottom: '28px'
          }}
        >
          CRAFTING JOURNEYS, CREATING MEMORIES
        </motion.div>

        {/* Loading Progress Bar - animates from 0s for 3.7s */}
        <div
          style={{
            width: '80%',
            maxWidth: '240px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 1.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            style={{
              height: '100%',
              backgroundColor: '#EA1C29',
              borderRadius: '100px'
            }}
          />
        </div>
      </div>
    </div>
  );
}
