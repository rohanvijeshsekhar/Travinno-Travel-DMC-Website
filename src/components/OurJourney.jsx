"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import logoImg from '../assets/logo.webp';

const milestones = [
  { step: 'MILESTONE 01', year: 'APR 2017', title: 'FOUNDED', action: 'Free Zone Inception', desc: 'Started with a Free Zone license as a solo venture.' },
  { step: 'MILESTONE 02', year: '2020', title: 'TEAM EXPANDED', action: '25 Specialists', desc: 'Grew team to 25 dedicated travel specialists.' },
  { step: 'MILESTONE 03', year: '2021', title: '100K TRAVELLERS', action: 'Passenger Milestone', desc: 'Served over 100,000 travellers worldwide.' },
  { step: 'MILESTONE 04', year: '2022', title: 'FLEET EXPANSION', action: '10 Premium Vehicles', desc: 'Expanded fleet to 10 luxury custom vehicles.' },
  { step: 'MILESTONE 05', year: '2023', title: 'THAILAND OFFICE', action: 'SE Asia Hub', desc: 'Opened regional Thailand hub with local team.' },
  { step: 'MILESTONE 06', year: '2026', title: 'GLOBAL NETWORK', action: '7 Markets & 75+ Staff', desc: 'Scaled to 7 global markets with 75+ professionals.' }
];

// Background Coordinates removed to prevent text overlaps

const CornerBrackets = () => (
  <>
    {/* Top-Left Bracket */}
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: '16px',
      height: '16px',
      borderTop: '2px solid rgba(255, 255, 255, 0.15)',
      borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
      pointerEvents: 'none',
      zIndex: 2
    }} />
    {/* Top-Right Bracket */}
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '16px',
      height: '16px',
      borderTop: '2px solid rgba(255, 255, 255, 0.15)',
      borderRight: '2px solid rgba(255, 255, 255, 0.15)',
      pointerEvents: 'none',
      zIndex: 2
    }} />
    {/* Bottom-Left Bracket */}
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      width: '16px',
      height: '16px',
      borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
      borderLeft: '2px solid rgba(255, 255, 255, 0.15)',
      pointerEvents: 'none',
      zIndex: 2
    }} />
    {/* Bottom-Right Bracket */}
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '16px',
      height: '16px',
      borderBottom: '2px solid rgba(255, 255, 255, 0.15)',
      borderRight: '2px solid rgba(255, 255, 255, 0.15)',
      pointerEvents: 'none',
      zIndex: 2
    }} />
  </>
);

const BackgroundIllustrations = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="journey-bg-illustrations">
      <svg
        viewBox="0 0 1920 800"
        fill="none"
        stroke="#F3EEE6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio={isMobile ? "xMinYMid slice" : "xMidYMid slice"}
        style={{ width: '100%', height: '100%' }}
      >
        {/* LEFT SIDE: Thailand-inspired architectural & landscape sketch (strokeOpacity 0.08) */}
        <g id="thailand-journey-sketch" strokeOpacity="0.10">
          {/* Wat Arun Style Temple Spire (Prang) */}
          <path d="M 230,700 L 230,580 L 238,580 L 238,510 L 244,510 L 244,430 L 248,430 L 248,220 L 252,220 L 252,430 L 256,430 L 256,510 L 262,510 L 262,580 L 270,580 L 270,700 Z M 210,700 H 290" />
          <line x1="248" y1="240" x2="252" y2="240" />
          <line x1="248" y1="270" x2="252" y2="270" />
          <line x1="247" y1="300" x2="253" y2="300" />
          <line x1="247" y1="330" x2="253" y2="330" />
          <line x1="246" y1="360" x2="254" y2="360" />
          <line x1="246" y1="390" x2="254" y2="390" />
          <line x1="245" y1="415" x2="255" y2="415" />
          <path d="M 220,700 L 220,640 H 280 V 700" />
          <path d="M 200,700 L 200,670 H 300 V 700" />
          <path d="M 230,600 Q 250,590 270,600" />
          <path d="M 220,660 Q 250,650 280,660" />
          <path d="M 210,685 Q 250,675 290,685" />
          
          <path d="M 150,700 L 150,600 L 154,600 L 154,520 L 158,520 L 158,400 L 162,400 L 162,520 L 166,520 L 166,600 L 170,600 L 170,700 Z" />
          <path d="M 330,700 L 330,600 L 334,600 L 334,520 L 338,520 L 338,400 L 342,400 L 342,520 L 346,520 L 346,600 L 350,600 L 350,700 Z" />

          {/* Long-tail Boat */}
          <path d="M 70,690 C 80,720 150,730 260,725 C 275,720 280,710 275,705 C 250,712 180,705 95,680 Z" />
          <path d="M 70,690 Q 62,680 58,670" />
          <path d="M 70,690 Q 65,685 62,678" />
          <path d="M 58,670 Q 52,672 55,678 T 62,678" />
          <line x1="270" y1="715" x2="330" y2="745" />
          <path d="M 330,745 Q 335,740 338,748 T 330,745" />

          {/* Limestone Cliffs */}
          <path d="M -20,50 Q 30,120 10,250 T 50,480 T -10,680" />
          <path d="M -20,120 Q 50,220 30,350 T 80,550 T 20,680" />
          <path d="M -10,180 Q 20,195 40,190" />
          <path d="M 10,320 Q 35,310 55,330" />
          <path d="M 25,490 Q 50,480 70,500" />
          <path d="M 15,220 Q 25,240 10,250" />
          <path d="M 45,390 Q 55,420 35,430" />
          <path d="M 60,450 Q 70,470 55,485" />

          {/* Tropical Palm Trees */}
          <path d="M 110,700 Q 115,640 105,580" />
          <path d="M 105,580 Q 80,565 65,570" />
          <path d="M 105,580 Q 85,540 75,530" />
          <path d="M 105,580 Q 105,530 108,510" />
          <path d="M 105,580 Q 125,540 135,530" />
          <path d="M 105,580 Q 130,565 140,580" />
          
          <path d="M 420,700 Q 405,620 380,540" />
          <path d="M 380,540 Q 350,530 335,540" />
          <path d="M 380,540 Q 355,500 345,490" />
          <path d="M 380,540 Q 380,480 385,460" />
          <path d="M 380,540 Q 405,490 415,480" />
          <path d="M 380,540 Q 410,530 420,545" />

          {/* Lotus Flowers */}
          <path d="M 120,740 Q 120,730 125,725 Q 130,730 130,740" />
          <path d="M 115,740 Q 118,732 125,732 Q 132,732 135,740" />
          <path d="M 108,740 Q 115,742 125,743 Q 135,742 142,740" />
          <path d="M 105,743 C 120,746 130,746 145,743" />
          <path d="M 220,760 Q 220,750 225,745 Q 230,750 230,760" />
          <path d="M 215,760 Q 218,752 225,752 Q 232,752 235,760" />
          <path d="M 195,762 Q 210,766 225,767 Q 240,766 255,762" />

          {/* Gentle River Outline */}
          <path d="M -50,710 Q 100,730 250,705 T 550,720" />
          <path d="M -50,750 Q 80,780 220,745 T 550,760" />
          <path d="M -50,780 Q 150,810 320,775 T 550,795" />

          {/* Flying Birds */}
          <path d="M 100,150 Q 105,145 110,150 Q 115,145 120,150" />
          <path d="M 180,120 Q 185,115 190,120 Q 195,115 200,120" />
          <path d="M 310,180 Q 315,175 320,180 Q 325,175 330,180" />

          {/* Small Travel Compass */}
          <circle cx="460" cy="220" r="32" />
          <circle cx="460" cy="220" r="28" strokeDasharray="3 3" />
          <path d="M 460,220 L 476,204 L 464,216 Z" fill="none" />
          <path d="M 460,220 L 444,236 L 456,224 Z" fill="none" />
          <path d="M 460,195 V 191 M 460,245 V 249 M 435,220 H 431 M 485,220 H 489" />
          <text x="458" y="186" fill="#F3EEE6" fontSize="6" fontFamily="sans-serif">N</text>
        </g>

        {/* RIGHT SIDE: Bali-inspired architectural & landscape sketch (strokeOpacity 0.08) */}
        <g id="bali-journey-sketch" strokeOpacity="0.10">
          {/* Balinese Split Gate (Candi Bentar) */}
          <path d="M 1480,700 V 650 H 1520 V 700 Z" />
          <path d="M 1490,650 V 580 H 1520 V 650 Z" />
          <path d="M 1500,580 V 500 H 1520 V 580 Z" />
          <path d="M 1508,500 L 1512,380 H 1520 V 500 Z" />
          <path d="M 1515,380 L 1518,300 H 1520 V 380 Z" />
          <line x1="1485" y1="675" x2="1520" y2="675" />
          <line x1="1495" y1="615" x2="1520" y2="615" />
          <line x1="1505" y1="540" x2="1520" y2="540" />
          <line x1="1512" y1="440" x2="1520" y2="440" />
          <path d="M 1490,650 Q 1485,640 1492,645" />
          <path d="M 1500,580 Q 1495,570 1502,575" />
          <path d="M 1508,500 Q 1502,490 1510,495" />

          <path d="M 1540,700 V 650 H 1580 V 700 Z" />
          <path d="M 1540,650 V 580 H 1570 V 650 Z" />
          <path d="M 1540,580 V 500 H 1560 V 580 Z" />
          <path d="M 1540,500 H 1548 L 1552,380 V 500 Z" />
          <path d="M 1540,380 H 1542 L 1545,300 V 380 Z" />
          <line x1="1540" y1="675" x2="1575" y2="675" />
          <line x1="1540" y1="615" x2="1565" y2="615" />
          <line x1="1540" y1="540" x2="1555" y2="540" />
          <line x1="1540" y1="440" x2="1548" y2="440" />
          <path d="M 1570,650 Q 1575,640 1568,645" />
          <path d="M 1560,580 Q 1565,570 1558,575" />
          <path d="M 1552,500 Q 1558,490 1550,495" />

          <path d="M 1460,700 H 1600" />
          <path d="M 1500,708 H 1560" />
          <path d="M 1510,716 H 1550" />

          {/* Rice Terraces */}
          <path d="M 1320,800 Q 1450,710 1620,770" />
          <path d="M 1400,750 Q 1550,670 1720,720" />
          <path d="M 1520,680 Q 1650,610 1820,660" />
          <line x1="1450" y1="740" x2="1455" y2="760" />
          <line x1="1560" y1="700" x2="1565" y2="725" />
          <line x1="1650" y1="645" x2="1655" y2="670" />

          {/* Balinese Pavilion (Bale) */}
          <path d="M 1350,600 L 1380,540 L 1410,600 Z M 1380,540 V 535 M 1380,535 L 1376,535 H 1384" />
          <line x1="1360" y1="600" x2="1360" y2="655" />
          <line x1="1372" y1="600" x2="1372" y2="655" />
          <line x1="1388" y1="600" x2="1388" y2="655" />
          <line x1="1400" y1="600" x2="1400" y2="655" />
          <path d="M 1345,655 H 1415 V 665 H 1345 Z" />
          <line x1="1340" y1="665" x2="1420" y2="665" />

          {/* Tropical Volcanic Mountains */}
          <path d="M 1600,550 Q 1750,260 1760,260 T 1940,520" />
          <path d="M 1720,530 Q 1850,320 1860,320 T 1980,480" />
          <path d="M 1760,260 Q 1770,350 1785,420" />
          <path d="M 1860,320 Q 1870,390 1880,440" />

          {/* Tropical Palm Trees */}
          <path d="M 1445,700 Q 1435,620 1415,550" />
          <path d="M 1415,550 Q 1385,540 1370,550" />
          <path d="M 1415,550 Q 1390,510 1380,500" />
          <path d="M 1415,550 Q 1415,490 1420,470" />
          <path d="M 1415,550 Q 1440,500 1450,490" />
          <path d="M 1415,550 Q 1445,540 1455,555" />
          
          <path d="M 1780,680 Q 1795,600 1820,530" />
          <path d="M 1820,530 Q 1790,520 1775,530" />
          <path d="M 1820,530 Q 1795,490 1785,480" />
          <path d="M 1820,530 Q 1820,470 1825,450" />
          <path d="M 1820,530 Q 1845,485 1855,475" />
          <path d="M 1820,530 Q 1850,520 1860,535" />

          {/* Ocean Waves */}
          <path d="M 1580,750 Q 1650,735 1740,755 T 1950,730" />
          <path d="M 1600,770 Q 1700,760 1790,780 T 1950,760" />
          <path d="M 1640,795 Q 1740,785 1830,800 T 1950,785" />

          {/* Frangipani Flowers */}
          <path d="M 1620,730 C 1624,726 1628,728 1630,730 C 1632,732 1630,736 1628,738 C 1626,740 1622,738 1620,736 C 1618,734 1616,730 1620,730 Z" />
          <path d="M 1650,740 C 1654,736 1658,738 1660,740 C 1662,742 1660,746 1658,748 C 1656,750 1652,748 1650,746 C 1648,744 1646,740 1650,740 Z" />

          {/* Subtle Airplane Silhouette */}
          <path d="M 1730,120 L 1750,112 L 1755,107 V 102 L 1760,109 L 1780,105 L 1783,109 L 1763,112 L 1767,121 L 1760,119 L 1757,114 Z" />
        </g>
      </svg>
    </div>
  );
};

export default function OurJourney() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: '-100px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] // Custom premium ease-out
      }
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const autoplayTimerRef = useRef(null);
  const hoverTimerRef = useRef(null);

  // Responsive detector
  useEffect(() => {
    setIsMounted(true);
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Autoplay Loop Logic
  useEffect(() => {
    if (!isInView || isPaused) return;

    const delay = 1000;
    
    autoplayTimerRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev >= milestones.length - 1 ? 0 : prev + 1));
    }, delay);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [isInView, activeIndex, isPaused]);

  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3000); // Resume autoplay after 3 seconds of inactivity
  };

  const handleCardClick = (idx) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setIsPaused(true);
    setActiveIndex(idx);
    // Restart inactivity timer to resume autoplay later
    hoverTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 4000); 
  };

  return (
    <section 
      id="journey"
      ref={containerRef}
      className="journey-section"
      style={{
        width: '100%',
        padding: '50px 0',
        backgroundColor: '#0B0B0B',
        backgroundImage: `
          linear-gradient(to bottom, #050505 0%, transparent 100px, transparent calc(100% - 100px), #050505 100%),
          radial-gradient(circle at 50% 50%, rgba(193, 18, 31, 0.07) 0%, transparent 70%)
        `,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      <div className="section-blend-overlay blend-to-05" />
      <BackgroundIllustrations />
      <style>{`
        /* Continuous Subtle Particle Drift */
        .journey-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 1;
        }

        .journey-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float-up infinite linear;
        }

        @keyframes float-up {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10% {
            opacity: 0.12;
          }
          90% {
            opacity: 0.12;
          }
          100% {
            transform: translateY(-80px);
            opacity: 0;
          }
        }

        /* Pulsing Glow Animation */
        @keyframes pulse-glow {
          0% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.65;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.85;
          }
        }
      `}</style>

      {/* Header outside the box */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-120px" }}
        style={{
          width: '95%',
          maxWidth: '1300px',
          marginBottom: '36px',
          textAlign: 'center',
          boxSizing: 'border-box',
          padding: '0 8px', // aligned with card grid edges
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto 36px auto'
        }}
      >
        <motion.span
          variants={itemVariants}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            border: '1px solid rgba(193, 18, 31, 0.15)',
            borderRadius: '100px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '12px',
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
          Our Journey
        </motion.span>
        <motion.h2
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            color: '#F5F2EC',
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <span>Growing</span>
          <span>
            Beyond
            <span className="journey-allura-text">Borders</span>
          </span>
        </motion.h2>
        <motion.p
          variants={itemVariants}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            lineHeight: 1.8,
            letterSpacing: '-0.02em',
            color: 'rgba(245, 242, 236, 0.6)',
            fontWeight: 300,
            marginTop: '16px',
            marginBottom: 0,
            maxWidth: '620px',
            textAlign: 'center',
            margin: '16px auto 0 auto'
          }}
        >
          A visual timeline of Travinno’s journey from a single vision to a leading global destination management partner.
        </motion.p>
      </motion.div>

      {/* Main Frame Container */}
      <div
        style={{
          width: '95%',
          maxWidth: '1300px',
          height: isMobile ? 'auto' : '260px',
          borderRadius: '28px',
          backgroundColor: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 24px 80px rgba(0, 0, 0, 0.65)',
          position: 'relative',
          overflow: 'hidden',
          padding: isMobile ? '40px 20px' : '40px 60px',
          boxSizing: 'border-box'
        }}
      >
        {/* HUD corner brackets */}
        <CornerBrackets />

        {/* Background Engineering Grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `
              linear-gradient(rgba(247, 245, 242, 0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(247, 245, 242, 0.02) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            zIndex: 0,
            maskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 30%, transparent 95%)'
          }}
        />

        {/* Background coordinates removed */}

        {/* Soft Crimson Glow in Background */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '50%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(193, 18, 31, 0.06) 0%, rgba(193, 18, 31, 0) 70%)',
            filter: 'blur(160px)',
            pointerEvents: 'none',
            zIndex: 1,
            animation: 'pulse-glow 8s ease-in-out infinite alternate'
          }}
        />

        {/* Floating Particles - rendered client-side only to avoid SSR hydration mismatch */}
        <div className="journey-particles">
          {isMounted && Array.from({ length: 15 }).map((_, i) => {
            // Use a seeded deterministic approach: derive values from index
            const seed1 = ((i * 7919 + 1) % 100);
            const seed2 = ((i * 6271 + 3) % 15);
            const seed3 = ((i * 5381 + 7) % 8);
            return (
              <div
                key={`particle-${i}`}
                className="journey-particle"
                style={{
                  left: `${seed1}%`,
                  animationDelay: `${seed2}s`,
                  animationDuration: `${12 + seed3}s`
                }}
              />
            );
          })}
        </div>

        {/* Camera Subtle Breathing Effect Wrapper */}
        <motion.div
          animate={{
            scale: [1.0, 1.004, 1.0]
          }}
          transition={{
            duration: 16,
            ease: 'easeInOut',
            repeat: Infinity
          }}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 2
          }}
        >
          {/* Header has been moved outside */}

          {!isMobile ? (
            /* DESKTOP HIGH-FIDELITY LAYOUT */
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              
              {/* Row 1: Interactive Step Cards */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: `repeat(${milestones.length}, 1fr)`, 
                  width: '100%'
                }}
              >
                {milestones.map((milestone, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={`card-wrapper-${idx}`}
                      style={{ padding: '0 8px' }}
                    >
                      <div
                        onClick={() => handleCardClick(idx)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{
                          background: 'rgba(17, 17, 17, 0.85)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: isActive ? '1.5px solid #C1121F' : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: isActive ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 15px rgba(193, 18, 31, 0.2)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          borderRadius: '10px',
                          padding: '10px 8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                          transform: isActive ? 'translateY(-2px)' : 'none'
                        }}
                      >
                        <div
                          style={{
                            fontFamily: 'monospace',
                            fontSize: '9px',
                            fontWeight: 'bold',
                            letterSpacing: '0.5px',
                            color: isActive ? '#C1121F' : 'rgba(255, 255, 255, 0.4)',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {milestone.step}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#F7F5F2',
                            letterSpacing: '0.5px',
                            margin: '4px 0',
                            textTransform: 'uppercase'
                          }}
                        >
                          {milestone.title}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '8.5px',
                            color: 'rgba(247, 245, 242, 0.35)',
                            lineHeight: '1.2'
                          }}
                        >
                          {milestone.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Timeline 2 - Year Axis */}
              <div 
                style={{ 
                  position: 'relative', 
                  height: '50px', 
                  marginTop: '20px' 
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: `calc(100% / ${milestones.length * 2})`,
                    right: `calc(100% / ${milestones.length * 2})`,
                    top: '15px',
                    height: '2px'
                  }}
                >
                  {/* Timeline Background Line */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: 0,
                      height: '1px',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)'
                    }}
                  />
                  {/* Timeline Active Path */}
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '1px',
                      backgroundColor: '#C1121F',
                      width: `${(activeIndex / (milestones.length - 1)) * 100}%`,
                      transition: 'width 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />

                  {/* Ticks and Year labels along Timeline 2 */}
                  {milestones.map((milestone, idx) => {
                    const isPassed = idx <= activeIndex;
                    const isActive = idx === activeIndex;
                    return (
                      <div
                        key={`tick2-${idx}`}
                        style={{
                          position: 'absolute',
                          left: `${(idx / (milestones.length - 1)) * 100}%`,
                          transform: 'translateX(-50%)',
                          top: '-4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center'
                        }}
                      >
                        {/* Vertical Tick Mark */}
                        <div
                          style={{
                            width: '1px',
                            height: '10px',
                            backgroundColor: isPassed ? '#C1121F' : 'rgba(255, 255, 255, 0.25)',
                            transition: 'background-color 0.4s ease'
                          }}
                        />

                        {/* Year text below Timeline 2 */}
                        <div
                          style={{
                            marginTop: '12px',
                            fontFamily: 'monospace',
                            fontSize: '10px',
                            fontWeight: isPassed ? 'bold' : 'normal',
                            color: isActive ? '#C1121F' : isPassed ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.3)',
                            transition: 'color 0.4s ease'
                          }}
                        >
                          {milestone.year}
                        </div>
                      </div>
                    );
                  })}

                  {/* Gliding Active Indicator Logo Pointer */}
                  <img
                    src={logoImg.src || logoImg}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    width="26"
                    height="26"
                    style={{
                      position: 'absolute',
                      left: `${(activeIndex / (milestones.length - 1)) * 100}%`,
                      top: '0px',
                      width: '26px',
                      height: '26px',
                      objectFit: 'contain',
                      transform: 'translate(-50%, -100%)', // Align the bottom tip of the logo exactly on the line
                      filter: 'drop-shadow(0 0 8px rgba(193, 18, 31, 0.8))',
                      transition: 'left 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                      zIndex: 3
                    }}
                  />
                </div>
              </div>

            </div>
          ) : (
            /* MOBILE STACKED DEVICE TIMELINE */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Vertical Stack Timeline */}
              <div style={{ position: 'relative', paddingLeft: '32px' }}>
                
                {/* Vertical Loop */}
                {milestones.map((milestone, idx) => {
                  const isActive = idx === activeIndex;
                  const isPassed = idx <= activeIndex;
                  return (
                    <div
                      key={`mob-step-${idx}`}
                      onClick={() => handleCardClick(idx)}
                      style={{
                        position: 'relative',
                        marginBottom: '24px',
                        cursor: 'pointer'
                      }}
                    >
                      {/* Vertical line segment centered behind the pointer/dot */}
                      <div
                        style={{
                          position: 'absolute',
                          left: '-24px',
                          top: idx === 0 ? '16px' : '0px', // start line at the first dot center
                          bottom: idx === milestones.length - 1 ? 'calc(100% - 16px)' : '-24px', // end line at the last dot center
                          width: '1px',
                          transform: 'translateX(-50%)',
                          zIndex: 1
                        }}
                      >
                        {/* Background Grey Line segment */}
                        <div
                          style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            backgroundColor: 'rgba(255, 255, 255, 0.12)'
                          }}
                        />
                        {/* Active Red Line segment */}
                        {isPassed && (
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              // If it is the active item, the red line stops at the pointer center (16px from top)
                              // otherwise it fills the entire segment to the bottom of this item's spacing
                              bottom: isActive 
                                ? (idx === 0 ? '100%' : 'calc(100% - 16px)') // stops at top: 16px
                                : 0,
                              left: 0,
                              width: '100%',
                              backgroundColor: '#C1121F',
                              transition: 'bottom 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                            }}
                          />
                        )}
                      </div>
                      {/* Active Indicator Pin / Dot on vertical line */}
                      {isActive ? (
                        <img
                          src={logoImg.src || logoImg}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          width="20"
                          height="20"
                          style={{
                            position: 'absolute',
                            left: '-24px',
                            top: '16px',
                            width: '20px',
                            height: '20px',
                            objectFit: 'contain',
                            transform: 'translate(-50%, -50%)',
                            filter: 'drop-shadow(0 0 6px rgba(193, 18, 31, 0.6))',
                            zIndex: 3
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-24px',
                            top: '16px',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: isPassed ? '#C1121F' : 'rgba(255, 255, 255, 0.25)',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 2,
                            transition: 'all 0.3s ease'
                          }}
                        />
                      )}

                      {/* Stack Card */}
                      <div
                        style={{
                          background: 'rgba(17, 17, 17, 0.85)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: isActive ? '1.5px solid #C1121F' : '1px solid rgba(255, 255, 255, 0.06)',
                          boxShadow: isActive ? 'inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 0 15px rgba(193, 18, 31, 0.2)' : 'inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                          borderRadius: '10px',
                          padding: '14px',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontSize: '10px',
                              color: isActive ? '#C1121F' : 'rgba(255, 255, 255, 0.4)',
                              fontWeight: 'bold'
                            }}
                          >
                            {milestone.step}
                          </span>
                          <span
                            style={{
                              fontFamily: 'monospace',
                              fontSize: '11px',
                              color: isActive ? '#C1121F' : 'rgba(255, 255, 255, 0.6)',
                              fontWeight: 'bold'
                            }}
                          >
                            {milestone.year}
                          </span>
                        </div>
                        <h4
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '13px',
                            fontWeight: 700,
                            color: '#FFFFFF',
                            margin: '6px 0 4px 0',
                            textTransform: 'uppercase'
                          }}
                        >
                          {milestone.title}
                        </h4>
                        <div
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '10px',
                            color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                            marginBottom: '4px'
                          }}
                        >
                          {milestone.action}
                        </div>
                        <p
                          style={{
                            fontFamily: 'var(--font-sans)',
                            fontSize: '9px',
                            color: 'rgba(255, 255, 255, 0.3)',
                            margin: 0
                          }}
                        >
                          {milestone.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
