"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const expertiseData = [
  {
    waypoint: 'LEISURE',
    title: 'Leisure Travel',
    description: 'Curated travel experiences designed around comfort, discovery and unforgettable moments.'
  },
  {
    waypoint: 'GROUPS',
    title: 'Group Tours',
    description: 'Seamless planning and execution for leisure groups, educational tours and special interest travel.'
  },
  {
    waypoint: 'EVENTS',
    title: 'MICE & Events',
    description: 'Professional management of meetings, incentives, conferences and destination events.'
  },
  {
    waypoint: 'CORP',
    title: 'Corporate Travel',
    description: 'Reliable travel solutions tailored for businesses and corporate travellers.'
  },
  {
    waypoint: 'GROUND',
    title: 'Ground Handling',
    description: 'End-to-end destination support, transfers, logistics and operational coordination.'
  },
  {
    waypoint: 'LUXURY',
    title: 'Luxury Experiences',
    description: 'Exclusive experiences crafted for discerning travellers seeking something extraordinary.'
  }
];

const pathVariants = {
  hidden: { pathLength: 0, stroke: "rgba(247, 245, 242, 0.2)" },
  visible: { 
    pathLength: 1, 
    stroke: "rgba(247, 245, 242, 0.35)",
    transition: { duration: 1.2, ease: "easeOut" }
  },
  hover: {
    pathLength: [0, 1],
    stroke: "#C1121F",
    transition: {
      pathLength: { duration: 1.5, ease: "easeInOut" },
      stroke: { duration: 0.3 }
    }
  }
};

const CardIllustration = ({ index, isHovered }) => {
  const animateState = isHovered ? "hover" : "visible";
  const strokeColor = isHovered ? "#C1121F" : "rgba(247, 245, 242, 0.3)";
  
  switch (index) {
    case 0: // Leisure Travel: palm tree, sun, waves, suitcase
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.circle cx="90" cy="30" r="10" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M90 12 V16" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M90 44 V48" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M72 30 H76" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M104 30 H108" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M77.3 17.3 L80.1 20.1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M99.9 39.9 L102.7 42.7" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M77.3 42.7 L80.1 39.9" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M99.9 20.1 L102.7 17.3" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M30 100 Q 42 75, 45 45" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 25 35, 15 45" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 32 25, 30 15" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 55 25, 65 20" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 65 38, 75 35" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 55 55, 60 70" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M45 45 Q 35 55, 20 60" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M15 105 Q 30 100 45 105 T 75 105 T 105 105" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.rect x="75" y="80" width="22" height="18" rx="2" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M82 80 V 75 H 90 V 80" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="81" y1="84" x2="81" y2="94" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="91" y1="84" x2="91" y2="94" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    case 1: // Group Tours: people, route marker, flag
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.circle cx="60" cy="65" r="9" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M42 95 Q 42 80 60 80 T 78 95" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.circle cx="43" cy="73" r="7" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M29 95 Q 29 83 43 83 T 57 95" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.circle cx="77" cy="73" r="7" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M63 95 Q 63 83 77 83 T 91 95" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M 25 35 C 25 24, 39 24, 39 35 C 39 45, 25 55, 25 55 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.circle cx="32" cy="35" r="3" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.line x1="88" y1="95" x2="88" y2="30" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 88 30 L 108 38 L 88 46 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M32 55 Q 50 40 70 50 T 88 30" strokeDasharray="3,3" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    case 2: // MICE & Events: conference table, presentation screen, building
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.rect x="35" y="25" width="50" height="30" rx="1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="30" y1="25" x2="90" y2="25" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M60 55 V 68 M60 68 L 52 76 M60 68 L 68 76" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 45 47 L 55 38 L 65 42 L 75 32" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M 12 95 V 50 H 26 V 95 M 19 50 V 95 M 12 60 H 26 M 12 75 H 26 M 12 90 H 26" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 94 95 V 40 H 108 V 95 M 101 40 V 95 M 94 50 H 108 M 94 65 H 108 M 94 80 H 108" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.polygon points="30,85 90,85 100,95 20,95" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="25" y1="95" x2="25" y2="105" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="95" y1="95" x2="95" y2="105" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="32" y1="85" x2="32" y2="92" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="88" y1="85" x2="88" y2="92" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    case 3: // Corporate Travel: briefcase, airplane, laptop
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.rect x="40" y="65" width="40" height="26" rx="3" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 52 65 V 60 H 68 V 65" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="48" y="70" width="4" height="4" rx="0.5" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="68" y="70" width="4" height="4" rx="0.5" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.rect x="18" y="82" width="24" height="15" rx="1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 14 97 H 46 L 42 101 H 18 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <g transform="translate(85, 35) rotate(-35) scale(0.6)">
            <motion.path d="M0,-20 L2,-5 L20,5 L20,8 L2,5 L2,15 L8,20 L8,22 L0,20 L-8,22 L-8,20 L-2,15 L-2,5 L-20,8 L-20,5 L-2,-5 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          </g>
          
          <motion.path d="M 40 70 Q 60 55 72 45" strokeDasharray="3,3" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    case 4: // Ground Handling: airport runway, shuttle, baggage
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.line x1="15" y1="100" x2="45" y2="50" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="75" y1="100" x2="55" y2="50" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="45" y1="100" x2="50" y2="50" strokeDasharray="4,6" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.rect x="55" y="62" width="50" height="24" rx="4" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="60" y="66" width="10" height="8" rx="1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="74" y="66" width="10" height="8" rx="1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="88" y="66" width="10" height="8" rx="1" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.circle cx="68" cy="86" r="5" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.circle cx="92" cy="86" r="5" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.rect x="18" y="80" width="20" height="14" rx="2" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 24 80 V 76 H 32 V 80" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    case 5: // Luxury Experiences: yacht, helicopter, luxury villa
      return (
        <svg viewBox="0 0 120 120" fill="none" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "100%", height: "100%" }}>
          <motion.path d="M 20 86 H 88 L 98 75 H 32 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 38 75 H 80 L 76 66 H 45 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 48 66 H 70 L 67 58 H 53 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 10 90 Q 25 88 40 90 T 70 90 T 100 90 T 112 90" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.ellipse cx="88" cy="35" rx="12" ry="7" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 98 35 L 112 30" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="112" y1="24" x2="112" y2="36" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="72" y1="25" x2="104" y2="25" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="88" y1="25" x2="88" y2="28" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.path d="M 80 44 H 96 M 84 42 V 44 M 92 42 V 44" variants={pathVariants} initial="hidden" animate={animateState} />
          
          <motion.path d="M 15 75 V 50 H 50 V 75 Z" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.line x1="10" y1="50" x2="55" y2="50" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="22" y="56" width="18" height="12" variants={pathVariants} initial="hidden" animate={animateState} />
          <motion.rect x="42" y="63" width="6" height="12" variants={pathVariants} initial="hidden" animate={animateState} />
        </svg>
      );
    default:
      return null;
  }
};

const ExpertiseCard = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="expertise-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: (index % 3) * 0.12 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="card-illustration-container"
        style={{
          opacity: isHovered ? 0.08 : 0.04,
          filter: isHovered ? "drop-shadow(0 0 6px rgba(193, 18, 31, 0.85))" : "none"
        }}
      >
        <CardIllustration index={index} isHovered={isHovered} />
      </div>
      
      <div className="card-hud-header">
        <span className="card-waypoint">{item.waypoint}</span>
        <div className={`radar-pulse-dot ${isHovered ? 'radar-active' : ''}`} />
      </div>

      <h3 className="expertise-card-title">{item.title}</h3>
      <p className="expertise-card-desc">{item.description}</p>
    </motion.div>
  );
};

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
    <div className="expertise-bg-illustrations">
      <svg
        viewBox="0 0 1920 1080"
        fill="none"
        stroke="#F3EEE6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio={isMobile ? "xMinYMid slice" : "xMidYMid slice"}
        style={{ width: "100%", height: "100%" }}
      >
        {/* LEFT SIDE: Dubai-inspired architectural sketch (strokeOpacity 0.08) */}
        <g id="dubai-architectural-sketch" strokeOpacity="0.10">
          {/* Burj Khalifa */}
          <line x1="220" y1="130" x2="220" y2="820" />
          <path d="M 216,280 V 380 M 224,280 V 380" />
          <path d="M 212,380 V 500 H 228 V 380 Z" />
          <path d="M 204,500 V 620 H 236 V 500 Z" />
          <path d="M 194,620 V 740 H 246 V 620 Z" />
          <path d="M 180,740 V 820 H 260 V 740 Z" />
          {/* Cross lines / overshoots */}
          <line x1="170" y1="820" x2="270" y2="820" />
          <line x1="185" y1="740" x2="255" y2="740" />
          <line x1="198" y1="620" x2="242" y2="620" />
          <line x1="208" y1="500" x2="232" y2="500" />
          <line x1="214" y1="380" x2="226" y2="380" />
          {/* Accent rings */}
          <path d="M 200,650 Q 220,640 240,650" />
          <path d="M 190,770 Q 220,760 250,770" />

          {/* Burj Al Arab */}
          <path d="M 430,300 Q 450,550 430,820" />
          <path d="M 430,320 Q 340,580 430,790" />
          {/* Diagonal braces */}
          <path d="M 380,480 L 436,440" />
          <path d="M 358,580 L 439,530" />
          <path d="M 370,680 L 441,620" />
          <path d="M 398,750 L 442,700" />
          {/* Horizontal lines */}
          <path d="M 390,440 C 400,445 410,445 425,443" />
          <path d="M 370,520 C 390,525 410,525 428,522" />
          <path d="M 360,600 C 380,605 400,605 429,602" />
          <path d="M 365,680 C 390,685 415,685 430,682" />
          {/* Helipad */}
          <path d="M 380,390 H 425" />
          <path d="M 382,390 L 372,398 H 400" />
          {/* Base */}
          <path d="M 320,820 Q 430,790 460,820" />

          {/* Luxury Yacht */}
          <path d="M 300,845 L 450,845 C 475,845 480,832 490,825 L 430,825 C 410,825 390,832 300,832 Z" />
          <path d="M 340,825 L 350,812 H 410 L 420,825 Z" />
          <path d="M 360,812 L 370,802 H 400 L 405,812 Z" />
          <line x1="385" y1="802" x2="385" y2="792" />
          <line x1="385" y1="792" x2="392" y2="792" />

          {/* Desert Dunes */}
          <path d="M -50,920 Q 150,800 350,880 T 750,850" />
          <path d="M -50,850 Q 80,780 250,830 T 600,810" />
          <path d="M -50,950 Q 200,880 450,920 T 900,890" />

          {/* Palm Trees */}
          {/* Palm 1 */}
          <path d="M 100,830 Q 95,780 85,730" />
          <path d="M 85,730 Q 60,710 45,720" />
          <path d="M 85,730 Q 65,690 55,680" />
          <path d="M 85,730 Q 85,680 88,660" />
          <path d="M 85,730 Q 105,690 115,680" />
          <path d="M 85,730 Q 110,720 120,735" />
          {/* Palm 2 */}
          <path d="M 520,860 Q 525,820 535,770" />
          <path d="M 535,770 Q 510,755 495,760" />
          <path d="M 535,770 Q 515,730 505,720" />
          <path d="M 535,770 Q 535,720 540,700" />
          <path d="M 535,770 Q 555,730 565,720" />
          <path d="M 535,770 Q 560,755 570,770" />

          {/* Minimal Skyline */}
          <line x1="50" y1="820" x2="180" y2="820" />
          <line x1="260" y1="820" x2="320" y2="820" />
          <line x1="460" y1="820" x2="600" y2="820" />
          <path d="M 80,820 V 720 H 110 V 820" />
          <path d="M 130,820 V 680 H 155 V 820" />
          <path d="M 280,820 V 700 H 305 V 820" />
          <path d="M 490,820 V 730 H 515 V 820" />
          <path d="M 540,820 V 650 H 565 V 820" />

          {/* Airplane */}
          <path d="M 150,280 L 175,275 L 180,270 V 265 L 185,272 L 205,268 L 208,272 L 188,275 L 192,284 L 185,282 L 182,277 Z" />
        </g>

        {/* RIGHT SIDE: Malaysia-inspired architectural sketch (strokeOpacity 0.08) */}
        <g id="malaysia-architectural-sketch" strokeOpacity="0.10">
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

          {/* Traditional Roof Silhouette */}
          <path d="M 1320,750 Q 1380,710 1440,750" />
          <path d="M 1320,750 L 1300,790 H 1460 L 1440,750 Z" />
          <path d="M 1315,760 H 1445" />
          <line x1="1330" y1="790" x2="1330" y2="820" />
          <line x1="1430" y1="790" x2="1430" y2="820" />
          <line x1="1340" y1="790" x2="1340" y2="840" />
          <line x1="1420" y1="790" x2="1420" y2="840" />

          {/* Tropical Palm Tree */}
          <path d="M 1820,840 Q 1830,770 1845,710" />
          <path d="M 1845,710 Q 1870,695 1885,705" />
          <path d="M 1845,710 Q 1865,670 1875,660" />
          <path d="M 1845,710 Q 1845,660 1840,640" />
          <path d="M 1845,710 Q 1825,670 1815,660" />
          <path d="M 1845,710 Q 1820,695 1810,705" />

          {/* Rainforest Foliage */}
          <path d="M 1470,820 Q 1450,780 1420,770" />
          <path d="M 1460,800 Q 1445,790 1440,795" />
          <path d="M 1450,785 Q 1435,775 1430,780" />
          <path d="M 1480,830 Q 1500,790 1520,780" />
          <path d="M 1490,810 Q 1505,800 1510,805" />

          {/* Mountains & Waves */}
          <path d="M 1200,850 Q 1350,780 1500,830 T 1800,800" />
          <path d="M 1350,830 Q 1550,740 1750,820 T 1950,800" />
          <path d="M 1250,860 C 1300,870 1350,850 1400,860 C 1450,870 1500,850 1550,860 C 1600,870 1650,850 1700,860" />

          {/* Airplane */}
          <path d="M 1420,220 L 1445,215 L 1450,210 V 205 L 1455,212 L 1475,208 L 1478,212 L 1458,215 L 1462,224 L 1455,222 L 1452,217 Z" />
        </g>
      </svg>
    </div>
  );
};

function ExpertiseSection() {
  return (
    <section className="expertise-section">
      <BackgroundIllustrations />
      
      {/* Center aligned expertise header */}
      <div className="expertise-header-container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="expertise-pill"
          >
            <span className="expertise-pill-dot" />
            Our Expertise
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            className="expertise-heading"
          >
            <span>Destination</span>
            <span className="expertise-gradient-text expertise-allura-text">Management</span>
          </motion.h2>
        </div>
      </div>

      <div className="expertise-container">
        <div className="expertise-grid">
          {expertiseData.map((item, index) => (
            <ExpertiseCard 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(ExpertiseSection);
