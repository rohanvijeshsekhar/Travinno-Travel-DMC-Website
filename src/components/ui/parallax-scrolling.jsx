"use client";

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import AboutJourney from '../AboutJourney';
import AboutStats from '../AboutStats';
import AboutPurpose from '../AboutPurpose';

function AboutIntroBackground() {
  const bgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const bgElement = bgRef.current;
    if (bgElement) {
      gsap.to(bgElement, {
        scrollTrigger: {
          trigger: bgElement.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: -12,
        ease: "none"
      });
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      ref={bgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '115%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
        backgroundColor: '#000000'
      }}
    >
      <style>{`
        @keyframes pulseRoute {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -40;
          }
        }
        @keyframes blinkPoint {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 0.95; transform: scale(1.2); }
        }
        @keyframes bgStarDrift {
          0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0.15; }
          50% { transform: translateY(-30px) translateX(15px) scale(1.1); opacity: 0.45; }
          100% { transform: translateY(-60px) translateX(30px) scale(0.8); opacity: 0.15; }
        }
      `}</style>

      {isMobile ? (
        /* Responsive Mobile Layout (viewBox 0 0 600 1000) */
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 600 1000" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.85 }}
        >
          {/* World map contours */}
          <path 
            d="M 100,220 Q 130,350 200,430 T 260,600 Q 280,700 230,850 Z" 
            stroke="rgba(245, 242, 236, 0.08)" 
            strokeWidth="1.2" 
            fill="none" 
          />
          <path 
            d="M 280,300 Q 350,200 450,150 T 550,100 Q 580,250 550,500 T 400,650 Z" 
            stroke="rgba(245, 242, 236, 0.08)" 
            strokeWidth="1.2" 
            fill="none" 
          />

          {/* Contour loops */}
          <circle cx="50" cy="120" r="100" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="50" cy="120" r="160" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="550" cy="150" r="120" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="550" cy="150" r="190" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />

          {/* Travel routes */}
          <path 
            d="M 80,480 Q 200,580 300,750" 
            stroke="rgba(245, 242, 236, 0.1)" 
            strokeWidth="1" 
            fill="none" 
          />
          <path 
            d="M 80,480 Q 300,320 520,865" 
            stroke="rgba(245, 242, 236, 0.11)" 
            strokeWidth="1" 
            fill="none" 
          />

          {/* Active flight paths */}
          <path 
            d="M 80,480 Q 250,520 480,560" 
            stroke="rgba(193, 18, 31, 0.48)" 
            strokeWidth="1.2" 
            strokeDasharray="6, 12" 
            fill="none"
            style={{ animation: 'pulseRoute 4s infinite linear' }}
          />
          <path 
            d="M 300,750 Q 420,700 520,865" 
            stroke="rgba(193, 18, 31, 0.44)" 
            strokeWidth="1.2" 
            strokeDasharray="6, 12" 
            fill="none"
            style={{ animation: 'pulseRoute 5s infinite linear' }}
          />

          {/* DUBAI SKYLINE (Bottom Left) */}
          <path 
            d="M 0,1000 L 40,1000 L 40,920 L 50,920 L 50,1000 M 60,1000 L 60,900 L 75,900 L 75,1000 M 80,1000 L 80,840 L 95,840 L 95,1000 M 105,1000 L 105,880 L 120,880 L 120,810 L 128,810 L 128,700 L 132,700 L 132,580 L 134,530 L 136,580 L 136,700 L 140,700 L 140,810 L 148,810 L 148,880 L 160,880 L 160,1000 M 170,1000 L 170,910 L 185,910 L 185,1000 Z" 
            stroke="rgba(245, 242, 236, 0.18)" 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="134" cy="530" r="2.5" fill="#C1121F" style={{ animation: 'blinkPoint 1.8s infinite ease-in-out', transformOrigin: '134px 530px' }} />

          {/* PETRONAS TOWERS & MBS SINGAPORE (Bottom Right) */}
          <path 
            d="M 380,1000 L 380,820 L 388,820 L 388,760 L 396,760 L 396,700 L 402,700 L 402,620 L 404,620 L 404,700 L 410,700 L 410,760 L 418,760 L 418,820 L 426,820 L 426,1000 M 456,1000 L 456,820 L 464,820 L 464,760 L 472,760 L 472,700 L 478,700 L 478,620 L 480,620 L 480,700 L 486,700 L 486,760 L 494,760 L 494,820 L 502,820 L 502,1000 M 418,800 L 456,800 M 515,1000 L 515,890 L 545,890 L 545,1000 M 560,1000 L 560,890 L 590,890 L 590,1000 M 505,885 L 600,885 L 590,873 L 515,873 Z" 
            stroke="rgba(245, 242, 236, 0.18)" 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="403" cy="620" r="2.5" fill="#C1121F" style={{ animation: 'blinkPoint 2.2s infinite ease-in-out', transformOrigin: '403px 620px' }} />
          <circle cx="479" cy="620" r="2.5" fill="#C1121F" style={{ animation: 'blinkPoint 2.2s infinite ease-in-out', transformOrigin: '479px 620px' }} />
          <circle cx="585" cy="880" r="2" fill="#C1121F" style={{ animation: 'blinkPoint 2.5s infinite ease-in-out', transformOrigin: '585px 880px' }} />

          {/* Coordinates */}
          <text x="20" y="80" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="9" letterSpacing="0.5">25.2048° N, 55.2708° E</text>
          <text x="20" y="95" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="9" letterSpacing="0.5">DXB / INBOUND</text>

          <text x="580" y="80" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="9" letterSpacing="0.5" textAnchor="end">1.3521° N, 103.8198° E</text>
          <text x="580" y="95" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="9" letterSpacing="0.5" textAnchor="end">SIN / OUTBOUND</text>
        </svg>
      ) : (
        /* Premium Desktop Layout (viewBox 0 0 1920 1080) */
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 1920 1080" 
          preserveAspectRatio="xMidYMid slice" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.85 }}
        >
          {/* World map landmass contours */}
          <path 
            d="M 300,200 Q 320,350 400,420 T 480,600 Q 520,700 480,850 Q 550,900 620,800 T 680,600 Q 640,400 750,300 T 680,100 Z" 
            stroke="rgba(245, 242, 236, 0.08)" 
            strokeWidth="1.2" 
            fill="none" 
          />
          <path 
            d="M 750,300 Q 850,200 1000,150 T 1300,100 Q 1450,150 1550,300 T 1600,600 Q 1500,750 1350,700 T 1000,800 Q 900,900 800,850 T 700,750 Z" 
            stroke="rgba(245, 242, 236, 0.08)" 
            strokeWidth="1.2" 
            fill="none" 
          />

          {/* Global contour loops */}
          <circle cx="100" cy="150" r="180" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="100" cy="150" r="240" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="100" cy="150" r="300" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />

          <circle cx="1800" cy="200" r="220" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="1800" cy="200" r="300" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />
          <circle cx="1800" cy="200" r="380" stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.8" />

          {/* Travel lines */}
          <path 
            d="M 200,450 Q 550,550 900,820" 
            stroke="rgba(245, 242, 236, 0.1)" 
            strokeWidth="1" 
            fill="none" 
          />
          <path 
            d="M 200,450 Q 900,300 1760,895" 
            stroke="rgba(245, 242, 236, 0.11)" 
            strokeWidth="1" 
            fill="none" 
          />

          {/* Active flight paths */}
          <path 
            d="M 200,450 Q 700,500 1510,580" 
            stroke="rgba(193, 18, 31, 0.48)" 
            strokeWidth="1.2" 
            strokeDasharray="6, 12" 
            fill="none"
            style={{ animation: 'pulseRoute 4s infinite linear' }}
          />
          <path 
            d="M 900,820 Q 1200,750 1760,895" 
            stroke="rgba(193, 18, 31, 0.44)" 
            strokeWidth="1.2" 
            strokeDasharray="6, 12" 
            fill="none"
            style={{ animation: 'pulseRoute 5s infinite linear' }}
          />

          {/* DUBAI SKYLINE */}
          <path 
            d="M 10,1080 L 80,1080 L 80,980 L 95,980 L 95,1080 M 110,1080 L 110,950 L 130,950 L 130,1080 M 140,1080 L 140,890 L 160,890 L 160,1080 M 175,1080 L 175,930 L 195,930 L 195,850 L 205,850 L 205,730 L 212,730 L 212,560 L 215,500 L 218,560 L 218,730 L 225,730 L 225,850 L 235,850 L 235,930 L 255,930 L 255,1080 M 270,1080 L 270,960 L 290,960 L 290,1080 M 310,1080 L 310,1020 L 330,1020 L 330,1080 Z" 
            stroke="rgba(245, 242, 236, 0.18)" 
            strokeWidth="1" 
            fill="none" 
          />
          <circle 
            cx="216.5" 
            cy="500" 
            r="2.5" 
            fill="#C1121F" 
            style={{ animation: 'blinkPoint 1.8s infinite ease-in-out', transformOrigin: '216.5px 500px' }} 
          />

          {/* PETRONAS TOWERS & MBS SINGAPORE */}
          <path 
            d="M 1480,1080 L 1480,820 L 1490,820 L 1490,750 L 1500,750 L 1500,680 L 1508,680 L 1508,580 L 1510,580 L 1510,680 L 1518,680 L 1518,750 L 1528,750 L 1528,820 L 1538,820 L 1538,1080 M 1578,1080 L 1578,820 L 1588,820 L 1588,750 L 1598,750 L 1598,680 L 1606,680 L 1606,580 L 1608,580 L 1608,680 L 1616,680 L 1616,750 L 1626,750 L 1626,820 L 1636,820 L 1636,1080 M 1528,800 L 1578,800 M 1528,790 L 1578,790" 
            stroke="rgba(245, 242, 236, 0.18)" 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="1509" cy="580" r="2.5" fill="#C1121F" style={{ animation: 'blinkPoint 2.2s infinite ease-in-out', transformOrigin: '1509px 580px' }} />
          <circle cx="1607" cy="580" r="2.5" fill="#C1121F" style={{ animation: 'blinkPoint 2.2s infinite ease-in-out', transformOrigin: '1607px 580px' }} />

          <path 
            d="M 1680,1080 L 1680,900 L 1715,900 L 1715,1080 M 1740,1080 L 1740,900 L 1775,900 L 1775,1080 M 1800,1080 L 1800,900 L 1835,900 L 1835,1080 M 1660,895 L 1855,895 L 1835,880 L 1680,880 Z" 
            stroke="rgba(245, 242, 236, 0.18)" 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="1840" cy="890" r="2" fill="#C1121F" style={{ animation: 'blinkPoint 2.5s infinite ease-in-out', transformOrigin: '1840px 890px' }} />

          {/* Abstract Travel Coordinates */}
          <text x="50" y="80" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="10" letterSpacing="1">25.2048° N, 55.2708° E</text>
          <text x="50" y="100" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="10" letterSpacing="1">DXB / INBOUND</text>

          <text x="1650" y="80" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="10" letterSpacing="1">1.3521° N, 103.8198° E</text>
          <text x="1650" y="100" fill="rgba(245, 242, 236, 0.35)" fontFamily="monospace" fontSize="10" letterSpacing="1">SIN / OUTBOUND</text>
        </svg>
      )}

      {/* Particles */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(12)].map((_, i) => {
          const size = ((i * 3 + 1) % 15) / 10 + 1.2;
          const left = `${(i * 7919 + 7) % 95}%`;
          const top = `${(i * 4973 + 13) % 95}%`;
          const duration = `${(i * 5381 + 7) % 12 + 8}s`;
          const delay = `${(i * 6271 + 3) % 5}s`;
          return (
            <div 
              key={i}
              style={{
                position: 'absolute',
                left,
                top,
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: 'rgba(245, 242, 236, 0.45)',
                borderRadius: '50%',
                boxShadow: '0 0 4px rgba(255, 255, 255, 0.5)',
                animation: `bgStarDrift ${duration} infinite ease-in-out`,
                animationDelay: delay
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ParallaxComponent() {
  const parallaxRef = useRef(null);
  const heroImageRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (heroImageRef.current) {
      gsap.to(heroImageRef.current, {
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        yPercent: 15,
        ease: "none"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef} style={{ backgroundColor: '#050505', overflow: 'hidden' }}>
      {/* Cinematic Full-screen Centered Hero */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '92vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#050505'
      }}>
        {/* Background Image Layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '115%', // taller for parallax space
          zIndex: 1,
          overflow: 'hidden'
        }}>
          <img
            ref={heroImageRef}
            src="/demo/images/about_hero.png"
            alt="Travinno Team Strategy Session"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.15) brightness(0.4)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* Ambient Overlays & Lighting */}
        {/* 1. Subtle grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(245, 242, 236, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 242, 236, 0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
          zIndex: 2,
          opacity: 0.7,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%)'
        }} />

        {/* 2. Top fade gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(to bottom, #050505 0%, rgba(5,5,5,0.7) 40%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3
        }} />

        {/* 3. Bottom fade gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '380px',
          background: 'linear-gradient(to top, #050505 0%, rgba(5,5,5,0.85) 45%, rgba(5,5,5,0.3) 75%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3
        }} />



        {/* Centered Typography Hero Content */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '850px',
          width: '90%',
          textAlign: 'center',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px'
        }}>
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              border: '1px solid rgba(193, 18, 31, 0.18)',
              borderRadius: '100px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: 'rgba(245, 242, 236, 0.85)',
              background: 'rgba(193, 18, 31, 0.05)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#C1121F',
                borderRadius: '50%',
                display: 'inline-block'
              }}
            />
            ABOUT TRAVINNO
          </motion.span>

          {/* Main Serif Heading with Cursive accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
              fontWeight: 450,
              lineHeight: 1.15,
              color: '#F5F2EC',
              margin: '0 0 8px 0',
              letterSpacing: '-0.5px'
            }}
          >
            Beyond Destinations, <br />
            We Create <span className="journey-allura-text" style={{ fontSize: '1.25em', textTransform: 'none', marginLeft: '6px', verticalAlign: 'middle' }}>Experiences</span>
          </motion.h1>

          {/* Elegant Sans-serif Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.95rem, 1.6vw, 1.12rem)',
              lineHeight: 1.75,
              color: 'rgba(245, 242, 236, 0.72)',
              margin: '0 auto',
              maxWidth: '680px',
              fontWeight: 400
            }}
          >
            We are curators of extraordinary journeys, designing bespoke travel curations that transcend boundaries. Combining meticulous local expertise with global standards, we craft elevated, seamless experiences across the world's most desired destinations.
          </motion.p>
        </div>
      </section>

      {/* Scroll-Linked Vertical Journey Timeline */}
      <AboutJourney />

      {/* Brand statistics & value proposition section */}
      <AboutStats />

      {/* Editorial Purpose, Mission & Vision section */}
      <AboutPurpose />
    </div>
  );
}
