"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Milestone travel journal dataset
const journalPages = [
  {
    year: '2017',
    date: 'April 14, 2017',
    city: 'Dubai',
    country: 'United Arab Emirates',
    coordinates: '25.2048° N, 55.2708° E',
    title: 'FOUNDED',
    action: 'Free Zone Inception',
    story: 'We set out with a simple license and an absolute conviction: to design extraordinary journeys. Operating as a single-person venture in a fast-moving metropolis, we laid the groundwork for a new standard in bespoke travel curations.',
    quote: '"Every great journey begins with a single step into the unknown."',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    stampColor: '#c1121f',
    stampText: 'DXB / ENTRY',
    noteLeft: 'Day 1: Just a desk, a telephone, and a vision of bespoke travel.',
    noteRight: 'Emirati soil holds infinite opportunities. First client itinerary approved!'
  },
  {
    year: '2018',
    date: 'March 09, 2018',
    city: 'Dubai Mainland & Kochi',
    country: 'UAE & India',
    coordinates: '9.9312° N, 76.2673° E',
    title: 'EXPANSION',
    action: 'Dubai Mainland & India Offices',
    story: 'Transitioning to a mainland Dubai license allowed us to scale up. Simultaneously, opening our operational headquarters in Vietnam, bridged our execution capabilities directly with the ground team.',
    quote: '"Borders are lines on a map; our mission is to build the bridges between them."',
    photo: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80',
    stampColor: '#1a365d',
    stampText: 'COK / IMMIGRATION',
    noteLeft: 'Kochi office opened! The green backwaters inspire our curated local circuits.',
    noteRight: 'Two hubs, one standard. Our client portfolio is expanding rapidly.'
  },
  {
    year: '2020',
    date: 'September 22, 2020',
    city: 'Dubai Head Office',
    country: 'United Arab Emirates',
    coordinates: '25.2048° N, 55.2708° E',
    title: 'GROWING TEAM',
    action: '25 Dedicated Specialists',
    story: 'Our strength has always been our people. In a year of global challenges, we grew our family to 25 dedicated travel specialists, refining our logistics operations and expanding our luxury concierge capabilities.',
    quote: '"The value of travel is not in the transit, but in the expertise that shields it."',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    stampColor: '#c1121f',
    stampText: 'TRAVINNO HQ / OK',
    noteLeft: '25 specialists now. Our logistics control room runs 24/7.',
    noteRight: 'Every detail of the itinerary is audited by three different teams.'
  },
  {
    year: '2021',
    date: 'December 18, 2021',
    city: 'Global Network',
    country: 'Middle East & Europe',
    coordinates: '48.8566° N, 2.3522° E',
    title: '100K TRAVELLERS',
    action: 'A Major Milestone',
    story: 'We successfully designed and executed journeys for over 100,000 discerning travellers. From private desert escapes to grand family getaways, our operations team proved that seamless execution is our signature.',
    quote: '"One hundred thousand stories, each curated with personal devotion."',
    photo: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    stampColor: '#2b5c3f',
    stampText: 'PASSENGER METRIC / 100K',
    noteLeft: 'A massive milestone. Feedback sheets show 99.4% satisfaction.',
    noteRight: 'Luxury is about making the complex look completely effortless.'
  },
  {
    year: '2022',
    date: 'June 05, 2022',
    city: 'Dubai Logistics',
    country: 'United Arab Emirates',
    coordinates: '25.2048° N, 55.2708° E',
    title: 'FLEET EXPANSION',
    action: 'Premium Luxury Vehicles',
    story: 'To ensure absolute control over the guest experience from arrival to departure, we launched our private transport division with a fleet of custom-configured premium vehicles. First-class travel on ground.',
    quote: '"Control the transit, control the comfort, command the experience."',
    photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    stampColor: '#1a365d',
    stampText: 'FLEET DEPT / PERMIT',
    noteLeft: 'Acquired custom luxury vans. Interior feels like a private jet cabin.',
    noteRight: 'Ground transfers are now fully managed by our in-house chauffeurs.'
  },
  {
    year: '2023',
    date: 'October 30, 2023',
    city: 'Bangkok',
    country: 'Thailand',
    coordinates: '13.7563° N, 100.5018° E',
    title: 'THAILAND OFFICE',
    action: 'Southeast Asian Hub',
    story: 'Expanding into Southeast Asia, we established a regional office in Bangkok. Backed by a full local team, this hub enables us to design unique destination experiences across Thailand, Vietnam, and Indonesia.',
    quote: '"The East holds secret pathways; we have local eyes to reveal them."',
    photo: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80',
    stampColor: '#c1121f',
    stampText: 'BKK / ARRIVAL 30OCT',
    noteLeft: 'Bangkok team is live. Curating luxury villas in Phuket and Koh Samui.',
    noteRight: 'Bridging UAE luxury benchmarks with warm Thai hospitality.'
  },
  {
    year: '2026',
    date: 'January 01, 2026',
    city: 'Global Network',
    country: '7 Markets',
    coordinates: '24.4539° N, 54.3773° E',
    title: 'GLOBAL NETWORK',
    action: '7 Markets & 75+ Staff',
    story: 'Today, Travinno represents a global family of over 75 travel field professionals managing portfolios across 7 major travel markets. We continue to challenge boundaries, making travel a form of high art.',
    quote: '"Our network spans the globe, but our devotion remains personal."',
    photo: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80',
    stampColor: '#c1121f',
    stampText: 'TRAVINNO GLOBAL / 2026',
    noteLeft: '75+ professionals, 7 markets, and one shared passion for detail.',
    noteRight: 'The journal continues. The next destination is waiting.'
  }
];

export default function AboutJourney() {
  const containerRef = useRef(null);
  const bookRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('down'); // 'down' (forward) or 'up' (backward)
  const [flippingFrom, setFlippingFrom] = useState(0);
  const [flippingTo, setFlippingTo] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollDir, setScrollDir] = useState('forward');
  const prevIndexRef = useRef(0);

  useEffect(() => {
    if (activeIndex > prevIndexRef.current) {
      setScrollDir('forward');
    } else if (activeIndex < prevIndexRef.current) {
      setScrollDir('backward');
    }
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Refs to store activeIndex and isFlipping state to prevent duplicate ScrollTrigger rebuilding on state changes
  const activeIndexRef = useRef(activeIndex);
  const isFlippingRef = useRef(isFlipping);
  const isPage7ScrollLockedRef = useRef(false);
  const page7LockTimeoutRef = useRef(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    isFlippingRef.current = isFlipping;
  }, [isFlipping]);

  // Monitor viewport size for layout layout responsiveness
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Intercept scroll down events when Page 7 (Vietnam) is locked
  useEffect(() => {
    let lastTouchY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        lastTouchY = e.touches[0].clientY;
      }
    };

    const handleWheelAndTouch = (e) => {
      if (isPage7ScrollLockedRef.current && activeIndexRef.current === 6) {
        let isScrollDown = false;
        if (e.type === 'wheel') {
          isScrollDown = e.deltaY > 0;
        } else if (e.type === 'touchmove' && e.touches && e.touches[0]) {
          const currentTouchY = e.touches[0].clientY;
          isScrollDown = currentTouchY < lastTouchY;
          lastTouchY = currentTouchY;
        }

        if (isScrollDown) {
          e.preventDefault();
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('wheel', handleWheelAndTouch, { passive: false });
    window.addEventListener('touchmove', handleWheelAndTouch, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('wheel', handleWheelAndTouch);
      window.removeEventListener('touchmove', handleWheelAndTouch);
    };
  }, []);

  // GSAP ScrollTrigger to hook scroll position to journal page indices
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const isMobileViewport = window.innerWidth < 1024;
    const snapPoints = [0, 0.08, 0.22, 0.36, 0.50, 0.64, 0.78, 0.92, 1.0];

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: isMobileViewport ? "top 16px" : "top top",
        end: isMobileViewport ? "+=2600" : "+=2200",
        pin: true,
        scrub: true,
        anticipatePin: isMobileViewport ? 0 : 1,
        invalidateOnRefresh: true,
        snap: isMobileViewport ? false : {
          snapTo: snapPoints,
          duration: { min: 0.25, max: 0.5 },
          ease: "power1.out",
          delay: 0.15
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Find the index of the closest snap point
          let closestK = 0;
          let minDiff = Infinity;
          for (let k = 0; k < snapPoints.length; k++) {
            const diff = Math.abs(progress - snapPoints[k]);
            if (diff < minDiff) {
              minDiff = diff;
              closestK = k;
            }
          }

          // Map the snap point index (0 to 8) to the 7 journal page indices (0 to 6)
          let targetIdx = 0;
          if (closestK <= 1) {
            targetIdx = 0; // Page 1 (0 or 0.08)
          } else if (closestK === 2) {
            targetIdx = 1; // Page 2 (0.22)
          } else if (closestK === 3) {
            targetIdx = 2; // Page 3 (0.36)
          } else if (closestK === 4) {
            targetIdx = 3; // Page 4 (0.50)
          } else if (closestK === 5) {
            targetIdx = 4; // Page 5 (0.64)
          } else if (closestK === 6) {
            targetIdx = 5; // Page 6 (0.78)
          } else {
            targetIdx = 6; // Page 7 (0.92 or 1.0)
          }
          
          const currentActive = activeIndexRef.current;
          const currentFlipping = isFlippingRef.current;

          if (targetIdx !== currentActive) {
            if (isMobileViewport) {
              // Update state immediately on mobile touch scroll to ensure high responsiveness
              setActiveIndex(targetIdx);
              if (targetIdx === 6) {
                isPage7ScrollLockedRef.current = true;
                if (page7LockTimeoutRef.current) {
                  clearTimeout(page7LockTimeoutRef.current);
                }
                page7LockTimeoutRef.current = setTimeout(() => {
                  isPage7ScrollLockedRef.current = false;
                }, 1000);
              }
            } else if (!currentFlipping) {
              // Standard timed 3D flip flow for desktop viewports
              const dir = targetIdx > currentActive ? 'down' : 'up';
              setFlipDirection(dir);
              setFlippingFrom(currentActive);
              setFlippingTo(targetIdx);
              setIsFlipping(true);

              const duration = 450;
              setTimeout(() => {
                setActiveIndex(targetIdx);
                setIsFlipping(false);
              }, duration);
            }
          }
        }
      });
    }, container);

    // Refresh ScrollTrigger to calculate correct layout offsets after assets and fonts are ready
    const handleLayoutRefresh = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLayoutRefresh);
    if (document.fonts) {
      document.fonts.ready.then(handleLayoutRefresh);
    }

    // Backup timeouts to catch delayed DOM reflows and render cycles
    const t1 = setTimeout(handleLayoutRefresh, 150);
    const t2 = setTimeout(handleLayoutRefresh, 600);
    const t3 = setTimeout(handleLayoutRefresh, 1500);

    return () => {
      ctx.revert();
      window.removeEventListener('load', handleLayoutRefresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Render left scrapbook page
  const renderLeftPage = (idx) => {
    const data = journalPages[idx];
    return (
      <div className="journal-page journal-page-left">
        {/* Embossed seal watermark in bottom left */}
        <div className="embossed-seal">
          <svg viewBox="0 0 100 100" className="embossed-seal-svg">
            <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
            <path d="M 30,50 L 50,30 L 70,50 L 50,70 Z" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
            <text x="50" y="54" fill="rgba(0,0,0,0.06)" fontSize="6" fontFamily="var(--font-sans)" fontWeight="bold" textAnchor="middle" letterSpacing="1">TRAVINNO</text>
          </svg>
        </div>

        {/* Vintage Paper Overlay Details */}
        <div className="page-header-row">
          <div className="page-year-giant">{data.year}</div>
          <div className="page-coordinates">
            <span className="metadata-label">GPS:</span> {data.coordinates}
          </div>
        </div>

        <div className="page-location-sub">
          <span className="metadata-city">{data.city}</span>
          <span className="metadata-divider">/</span>
          <span className="metadata-country">{data.country}</span>
        </div>

        {/* Vintage Travel Photograph Container (Scrapbook styled) */}
        <div className="vintage-photo-container">
          {/* Tape holding photo top left */}
          <div className="tape tape-tl" />
          {/* Tape holding photo bottom right */}
          <div className="tape tape-br" />
          
          <img 
            src={data.photo} 
            alt={`Vintage scrapbook photograph of ${data.city}, ${data.country} – Travinno Trusted DMC history`} 
            loading="lazy"
            decoding="async"
            className="vintage-photo-img" 
          />

          {/* Paper shadow overlay */}
          <div className="photo-inner-shadow" />
        </div>

        {/* Coffee cup stain watermark */}
        {idx % 3 === 0 && (
          <div className="coffee-stain">
            <svg viewBox="0 0 150 150" style={{ width: '100%', height: '100%', opacity: 0.12 }}>
              <path d="M 75,10 C 110,10 140,40 140,75 C 140,110 110,140 75,140 C 40,140 10,110 10,75 C 10,40 40,10 75,10 Z" fill="none" stroke="#8b4513" strokeWidth="2" strokeDasharray="15 3 2 3" />
              <path d="M 75,15 C 108,15 135,42 135,75 C 135,108 108,135 75,135 C 42,135 15,108 15,75 C 15,42 42,15 75,15 Z" fill="none" stroke="#8b4513" strokeWidth="1.2" />
            </svg>
          </div>
        )}

        {/* Polaroid frame decorative shadow */}
        {idx % 2 === 1 && (
          <div className="vintage-polaroid-backing" />
        )}

        {/* Hand written note at the bottom */}
        <div className="handwritten-note left-handwritten">
          {data.noteLeft}
        </div>

        {/* Distressed Passport Stamp */}
        <div 
          className="passport-stamp" 
          style={{ 
            borderColor: data.stampColor, 
            color: data.stampColor,
            transform: `rotate(${idx % 2 === 0 ? -12 : 8}deg)`
          }}
        >
          <div className="stamp-inner" style={{ borderColor: data.stampColor }}>
            <span className="stamp-text-top">IMMIGRATION APPROVED</span>
            <span className="stamp-main-code">{data.stampText}</span>
            <span className="stamp-text-bottom">TRAVINNO EXPEDITIONS</span>
          </div>
        </div>
      </div>
    );
  };

  // Render right diary page
  const renderRightPage = (idx) => {
    const data = journalPages[idx];
    return (
      <div className="journal-page journal-page-right">
        {/* Notebook ruling lines */}
        <div className="notebook-rulings">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={`rule-${i}`} className="notebook-line" />
          ))}
        </div>

        {/* Date written in diary */}
        <div className="diary-handwritten-date">
          {data.date}
        </div>

        {/* Section Title */}
        <h3 className="diary-serif-title">
          {data.title}
          <span className="diary-understrike" />
        </h3>

        {/* Action/subtitle */}
        <div className="diary-handwritten-action">
          {data.action}
        </div>

        {/* Story copy (Editorial printed body font styled like a luxury log) */}
        <p className="diary-story-paragraph">
          {data.story.split(' ').map((word, i) => {
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            const highlightWords = ['bespoke', 'extraordinary', 'mainland', 'headquarters', 'specialists', 'satisfaction', 'discerning', 'logistics', 'fleet', 'premium', 'Southeast', 'regional', 'global', 'professionals'];
            const shouldHighlight = highlightWords.includes(cleanWord.toLowerCase());
            return (
              <React.Fragment key={i}>
                <span className={shouldHighlight ? "red-underline-word" : ""}>
                  {word}
                </span>
                {' '}
              </React.Fragment>
            );
          })}
        </p>

        {/* Quote container */}
        <div className="diary-quote-box">
          <p className="diary-quote-text">
            {data.quote}
          </p>
        </div>

        {/* Handwritten footnote notes */}
        <div className="handwritten-note right-handwritten">
          {data.noteRight}
        </div>

        {/* Signature styled handwritten notes */}
        <div className="diary-signature-row">
          <div className="diary-seal-container">
            <div className="wax-seal">
              <div className="wax-seal-outer" />
              <div className="wax-seal-inner">
                <span className="seal-emblem">T</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Helper to render the about heading section symmetrically on desktop and mobile
  const renderHeadingSection = () => {
    return (
      <div 
        className="about-heading-section"
        style={{
          width: '100%',
          backgroundColor: '#000000',
          padding: isMobile ? '0px 24px 10px 24px' : '24px 24px 0px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 5
        }}
      >
        <span
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
            marginBottom: '10px',
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
          Our History
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: isMobile ? '1.7rem' : 'clamp(2.2rem, 3.8vw, 3.2rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '0.02em',
            color: '#F5F2EC',
            margin: '0',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <span>Stories that</span>
          <span className="about-inspire-cursive" style={{ marginTop: '2px' }}>Inspire</span>
        </h2>
        {!isMobile && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'rgba(245, 242, 236, 0.55)',
              lineHeight: 1.7,
              margin: '18px 0 0 0',
              maxWidth: '480px',
              textAlign: 'center',
              letterSpacing: '0.01em'
            }}
          >
            Seven chapters of passion, purpose and discovery —<br />
            the story of Travinno, told one destination at a time.
          </p>
        )}
      </div>
    );
  };

  // Variants for directional top active sheet transition on mobile
  const cardVariants = {
    enter: (direction) => {
      if (direction === 'backward') {
        const isEven = activeIndex % 2 === 0;
        return {
          x: isEven ? -400 : 400,
          rotate: isEven ? -5 : 5,
          opacity: 0,
          scale: 1
        };
      }
      return {
        x: 0,
        rotate: 0,
        opacity: 0,
        scale: 0.96
      };
    },
    center: {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      opacity: 1,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.22), 0 5px 15px rgba(0, 0, 0, 0.08)'
    },
    exit: (direction) => {
      if (direction === 'forward') {
        const isEven = activeIndex % 2 === 0;
        return {
          x: isEven ? -400 : 400,
          rotate: isEven ? -5 : 5,
          opacity: 0,
          scale: 1
        };
      }
      return {
        x: 0,
        rotate: 0,
        opacity: 0,
        scale: 0.96
      };
    }
  };

  // Render a premium paper sheet for the mobile travel journal stack
  const renderPaperCard = (data, idx) => {
    return (
      <div className="mobile-paper-card">
        {/* Paper texture overlay (faint cotton/linen grain pattern) */}
        <div className="paper-texture-overlay" />

        {/* Top Header Row: Coordinates & Page Indicator */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          zIndex: 2
        }}>
          <span style={{
            fontFamily: 'monospace',
            fontSize: '0.62rem',
            color: 'rgba(43, 31, 29, 0.45)',
            letterSpacing: '0.05em'
          }}>
            {data.coordinates}
          </span>
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#c1121f',
            letterSpacing: '0.1em'
          }}>
            0{idx + 1} / 07
          </span>
        </div>

        {/* Year & Date */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '6px',
          zIndex: 2
        }}>
          <div style={{
            fontFamily: 'var(--font-journal-serif)',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#1a0f0d',
            lineHeight: 1
          }}>
            {data.year}
          </div>
          <div style={{
            fontFamily: 'var(--font-journal-hand)',
            fontSize: '0.9rem',
            color: 'rgba(193, 18, 31, 0.75)'
          }}>
            {data.date}
          </div>
        </div>

        <div style={{
          fontFamily: 'var(--font-journal-serif)',
          fontSize: '0.72rem',
          color: 'rgba(43, 31, 29, 0.55)',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          zIndex: 2
        }}>
          {data.city} <span style={{ color: '#c1121f', margin: '0 4px' }}>•</span> {data.country}
        </div>

        <div className="vintage-photo-container" style={{
          width: '100%',
          height: '95px',
          margin: '0 0 6px 0',
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 6px 15px rgba(0,0,0,0.08)',
          flexShrink: 0,
          zIndex: 2
        }}>
          <img 
            src={data.photo} 
            alt={`Travel log photograph of ${data.city}`} 
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        <h3 style={{
          fontFamily: 'var(--font-journal-serif)',
          fontSize: '1.15rem',
          fontWeight: 700,
          color: '#1a0f0d',
          margin: '0',
          textTransform: 'uppercase',
          lineHeight: 1.2,
          zIndex: 2
        }}>
          {data.title}
        </h3>
        <div style={{
          width: '32px',
          height: '1px',
          backgroundColor: '#c1121f',
          marginBottom: '4px',
          zIndex: 2
        }} />

        {/* Action subtitle */}
        <div style={{
          fontFamily: 'var(--font-journal-hand)',
          fontSize: '0.82rem',
          color: 'rgba(43, 31, 29, 0.65)',
          marginBottom: '4px',
          zIndex: 2
        }}>
          {data.action}
        </div>

        <p style={{
          fontFamily: 'var(--font-journal-serif)',
          fontSize: '0.72rem',
          lineHeight: '1.4',
          color: '#3b2c29',
          margin: '0 0 6px 0',
          textAlign: 'justify',
          zIndex: 2
        }}>
          {data.story.split(' ').map((word, i) => {
            const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
            const highlightWords = ['bespoke', 'extraordinary', 'mainland', 'headquarters', 'specialists', 'satisfaction', 'discerning', 'logistics', 'fleet', 'premium', 'Southeast', 'regional', 'global', 'professionals'];
            const shouldHighlight = highlightWords.includes(cleanWord.toLowerCase());
            return (
              <React.Fragment key={i}>
                <span className={shouldHighlight ? "red-underline-word" : ""}>
                  {word}
                </span>
                {' '}
              </React.Fragment>
            );
          })}
        </p>

        {/* Quote Block */}
        <div style={{
          marginTop: 'auto',
          paddingLeft: '10px',
          borderLeft: '1.5px solid rgba(193, 18, 31, 0.4)',
          marginBottom: '4px',
          zIndex: 2
        }}>
          <p style={{
            fontFamily: 'var(--font-journal-serif)',
            fontSize: '0.65rem',
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: 'rgba(43, 31, 29, 0.7)'
          }}>
            {data.quote}
          </p>
        </div>
      </div>
    );
  };


  const getVisiblePages = () => {
    if (!isFlipping) {
      return {
        left: activeIndex,
        right: activeIndex,
        isFlipping: false
      };
    }
    
    // Page is turning
    if (flipDirection === 'down') {
      // Scrolling down (forward): page flipping from activeIndex (flippingFrom) to target (flippingTo)
      return {
        left: flippingFrom,
        right: flippingTo,
        flippingFront: flippingFrom, // front of turning page shows old right page
        flippingBack: flippingTo,    // back of turning page shows new left page
        isFlipping: true,
        progressDirection: 'forward'
      };
    } else {
      // Scrolling up (backward): page flipping from activeIndex (flippingFrom) to target (flippingTo)
      return {
        left: flippingTo,
        right: flippingFrom,
        flippingFront: flippingTo, // front of turning page shows new right page
        flippingBack: flippingFrom,   // back of turning page shows old left page
        isFlipping: true,
        progressDirection: 'backward'
      };
    }
  };

  const pages = getVisiblePages();

  return (
    <>
      {/* Scrollable heading section - Rendered only on desktop */}
      {!isMobile && renderHeadingSection()}

      <div 
        ref={containerRef} 
        className="journal-experience-container"
        style={{ 
          position: 'relative', 
          height: '100vh',
          backgroundColor: '#000000',
          backgroundImage: `
            linear-gradient(rgba(245, 242, 236, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          width: '100%',
          boxSizing: 'border-box'
        }}
      >
      {/* Import vintage and handwriting fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Allura&family=Alex+Brush&family=Caveat:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Reenie+Beanie&display=swap');
        
        .journal-experience-container {
          --color-paper: #f5f2ec;
          --font-journal-serif: 'Playfair Display', Georgia, serif;
          --font-journal-hand: 'Caveat', cursive, sans-serif;
          --font-journal-note: 'Reenie Beanie', cursive, sans-serif;
        }

        .about-heading-section {
          position: relative;
        }

        .about-heading-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(245, 242, 236, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 1;
        }

        .about-inspire-cursive {
          font-family: 'Alex Brush', 'Allura', cursive;
          font-size: 1.4em;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.2;
          display: inline-block;
          text-transform: none;
          vertical-align: middle;
          background: linear-gradient(to bottom, #F5F2EC 15%, #FF6B6B 65%, #C1121F 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .journal-sticky-viewport {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background-color: #000000;
          background-image: 
            linear-gradient(rgba(245, 242, 236, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          padding: 20px 30px 30px 30px;
        }

        .journal-editorial-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 50% 50%, rgba(245, 242, 236, 0.03) 0%, transparent 80%),
                      radial-gradient(circle at 15% 15%, rgba(193, 18, 31, 0.04) 0%, transparent 60%);
          pointer-events: none;
          z-index: 1;
        }

        /* Leather book cover outer */
        .leather-book {
          position: relative;
          width: min(1040px, 94vw);
          height: min(650px, 80vh);
          background-color: #1e120d;
          background-image: 
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%),
            radial-gradient(circle at 50% 100%, rgba(0,0,0,0.4) 0%, transparent 60%);
          border-radius: 18px;
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.9), 
            0 10px 30px rgba(0, 0, 0, 0.7),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.6);
          padding: 16px;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
        }

        /* Leather stitching border */
        .leather-stitching {
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: 8px;
          right: 8px;
          border: 1px dashed rgba(245, 242, 236, 0.08);
          border-radius: 12px;
          pointer-events: none;
        }

        /* Main double page structure */
        .book-inner-pages {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          box-shadow: 0 12px 35px rgba(0,0,0,0.6);
          border-radius: 4px;
          perspective: 2000px; /* Crucial for realistic 3D rotations */
          overflow: visible;
        }

        /* Stationary Page base components */
        .static-page-half {
          width: 50%;
          height: 100%;
          background-color: var(--color-paper);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .static-left {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          box-shadow: inset 15px 0 35px rgba(0,0,0,0.06), inset -10px 0 15px rgba(0,0,0,0.05);
          border-right: 1px solid rgba(0, 0, 0, 0.15);
        }

        .static-right {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          box-shadow: inset -15px 0 35px rgba(0,0,0,0.06), inset 10px 0 15px rgba(0,0,0,0.05);
          border-left: 1px solid rgba(0, 0, 0, 0.15);
        }

        /* Book spine shadow separator */
        .book-center-spine {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 24px;
          transform: translateX(-50%);
          background: linear-gradient(to right, 
            rgba(0,0,0,0.18) 0%, 
            rgba(0,0,0,0.4) 40%, 
            rgba(0,0,0,0.4) 60%, 
            rgba(0,0,0,0.18) 100%
          );
          z-index: 10;
          pointer-events: none;
          border-left: 1px solid rgba(0, 0, 0, 0.05);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }

        /* Immersive Page turn elements */
        .flipping-page-container {
          position: absolute;
          left: 50%;
          top: 0;
          width: 50%;
          height: 100%;
          transform-style: preserve-3d;
          transform-origin: left center;
          z-index: 8;
          pointer-events: none;
        }

        .flipping-page-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background-color: var(--color-paper);
          overflow: hidden;
          box-sizing: border-box;
        }

        /* Front face of folding page (lying on the right originally) */
        .face-front {
          z-index: 2;
          transform: rotateY(0deg);
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          box-shadow: inset -15px 0 35px rgba(0,0,0,0.06);
          border-left: 1px solid rgba(0,0,0,0.1);
        }

        /* Back face of folding page (visible when turned past 90 degrees) */
        .face-back {
          z-index: 1;
          transform: rotateY(180deg);
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          box-shadow: inset 15px 0 35px rgba(0,0,0,0.06);
          border-right: 1px solid rgba(0,0,0,0.1);
        }

        /* Dynamic shadow overlay inside flipping sheet to simulate paper curl */
        .curl-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 15;
          mix-blend-mode: multiply;
        }

        /* Landing shadow cast on the static left page during flip */
        .landing-shadow {
          position: absolute;
          top: 0;
          left: 0;
          width: 50%;
          height: 100%;
          pointer-events: none;
          z-index: 7;
          background: linear-gradient(to right, rgba(0,0,0,0) 20%, rgba(0,0,0,0.2) 90%, rgba(0,0,0,0) 100%);
          mix-blend-mode: multiply;
          transform-origin: left center;
        }

        /* Styles for turning page transitions (GSAP/CSS triggered) */
        .page-fold-active-forward {
          animation: foldPageForward 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .page-fold-active-backward {
          animation: foldPageBackward 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        @keyframes foldPageForward {
          0% {
            transform: rotateY(0deg) skewY(0deg);
          }
          35% {
            transform: rotateY(-65deg) skewY(-2.5deg); /* Slight paper lift bend/skew */
          }
          70% {
            transform: rotateY(-135deg) skewY(1.8deg);
          }
          100% {
            transform: rotateY(-180deg) skewY(0deg);
          }
        }

        @keyframes foldPageBackward {
          0% {
            transform: rotateY(-180deg) skewY(0deg);
          }
          35% {
            transform: rotateY(-115deg) skewY(2.5deg);
          }
          70% {
            transform: rotateY(-45deg) skewY(-1.8deg);
          }
          100% {
            transform: rotateY(0deg) skewY(0deg);
          }
        }

        /* Shadow animations */
        .shadow-fade-forward {
          animation: shadowAnimationForward 0.45s linear forwards;
        }

        .shadow-fade-backward {
          animation: shadowAnimationBackward 0.45s linear forwards;
        }

        @keyframes shadowAnimationForward {
          0% {
            background: rgba(0, 0, 0, 0);
          }
          50% {
            background: rgba(0, 0, 0, 0.16);
          }
          100% {
            background: rgba(0, 0, 0, 0);
          }
        }

        @keyframes shadowAnimationBackward {
          0% {
            background: rgba(0, 0, 0, 0);
          }
          50% {
            background: rgba(0, 0, 0, 0.16);
          }
          100% {
            background: rgba(0, 0, 0, 0);
          }
        }

        /* Underlaying static page shadow casting */
        .landing-shadow-active {
          animation: landingShadowAnim 0.45s ease-in-out forwards;
        }

        @keyframes landingShadowAnim {
          0% {
            opacity: 0;
            transform: scaleX(0);
          }
          45% {
            opacity: 0.7;
            transform: scaleX(0.7);
          }
          85% {
            opacity: 0.3;
            transform: scaleX(0.9);
          }
          100% {
            opacity: 0;
            transform: scaleX(1);
          }
        }

        /* -------------------------------------------------------------
           INDIVIDUAL JOURNAL PAGE STYLES (SCRAPBOOK & DIARY WRITING)
        ------------------------------------------------------------- */
        .journal-page {
          width: 100%;
          height: 100%;
          position: relative;
          box-sizing: border-box;
          padding: 24px 32px;
          display: flex;
          flex-direction: column;
          background-color: var(--color-paper);
          color: #2b1f1d;
          user-select: none;
        }

        .journal-page-left {
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }

        .journal-page-right {
          border-left: 1px solid rgba(0, 0, 0, 0.05);
        }

        /* Embellished seal watermark */
        .embossed-seal {
          position: absolute;
          bottom: 24px;
          left: 24px;
          width: 76px;
          height: 76px;
          pointer-events: none;
          opacity: 0.6;
        }

        .embossed-seal-svg {
          width: 100%;
          height: 100%;
        }

        /* Giant vintage year label */
        .page-header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 4px;
        }

        .page-year-giant {
          font-family: var(--font-journal-serif);
          font-size: 3.4rem;
          font-weight: 700;
          color: #1a0f0d;
          letter-spacing: -1.5px;
          line-height: 1;
        }

        .page-coordinates {
          font-family: monospace;
          font-size: 0.72rem;
          color: rgba(43, 31, 29, 0.45);
          letter-spacing: 0.5px;
        }

        .metadata-label {
          color: #c1121f;
          font-weight: bold;
        }

         .page-location-sub {
          font-family: var(--font-journal-serif);
          font-size: 1.1rem;
          font-style: italic;
          color: rgba(43, 31, 29, 0.75);
          margin-bottom: 16px;
        }

        .metadata-city {
          font-weight: bold;
          color: #1a0f0d;
        }

        .metadata-divider {
          margin: 0 6px;
          color: rgba(193, 18, 31, 0.3);
        }

        .metadata-country {
          font-size: 0.95rem;
        }

        /* Photo attachment scrapbooking */
        .vintage-photo-container {
          position: relative;
          width: 100%;
          height: 200px;
          background: #efebdf;
          padding: 8px;
          box-sizing: border-box;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 
            0 4px 15px rgba(0,0,0,0.08), 
            0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 18px;
          transform: rotate(-1.5deg);
        }

        .vintage-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: sepia(0.65) contrast(1.1) brightness(0.85); /* Premium Vintage Scrapbook photographic filter */
          border-radius: 1px;
        }

        .photo-inner-shadow {
          position: absolute;
          top: 8px;
          left: 8px;
          right: 8px;
          bottom: 8px;
          box-shadow: inset 0 0 15px rgba(0,0,0,0.15);
          pointer-events: none;
        }

        /* Adhesive tape styling */
        .tape {
          position: absolute;
          width: 50px;
          height: 16px;
          background-color: rgba(244, 237, 219, 0.42);
          backdrop-filter: blur(0.5px);
          -webkit-backdrop-filter: blur(0.5px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          z-index: 10;
          transform: rotate(-25deg);
        }

        .tape-tl {
          top: -4px;
          left: -12px;
          transform: rotate(-35deg);
        }

        .tape-br {
          bottom: -4px;
          right: -12px;
          transform: rotate(-30deg);
        }

        .vintage-polaroid-backing {
          position: absolute;
          top: 76px;
          left: 40px;
          width: 90%;
          height: 270px;
          background: rgba(0,0,0,0.015);
          border: 1px dashed rgba(0,0,0,0.05);
          transform: rotate(2deg);
          z-index: -1;
          pointer-events: none;
        }

        /* Coffee stains */
        .coffee-stain {
          position: absolute;
          bottom: -20px;
          right: -25px;
          width: 140px;
          height: 140px;
          pointer-events: none;
          z-index: 1;
        }

        /* Distressed passport stamp */
        .passport-stamp {
          position: absolute;
          bottom: 24px;
          right: 36px;
          border: 1.5px solid;
          padding: 6px 12px;
          font-family: var(--font-journal-serif);
          font-size: 0.65rem;
          font-weight: bold;
          text-align: center;
          letter-spacing: 1.5px;
          border-radius: 4px;
          opacity: 0.48;
          z-index: 5;
          user-select: none;
        }

        .stamp-inner {
          border: 1px solid;
          padding: 4px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }

        .stamp-text-top, .stamp-text-bottom {
          font-size: 0.4rem;
          letter-spacing: 1px;
        }

        .stamp-main-code {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
        }

        /* Handwritten notes */
        .handwritten-note {
          font-family: var(--font-journal-hand);
          font-size: 1.15rem;
          line-height: 1.25;
          color: #3b2820;
          font-weight: 500;
          z-index: 3;
        }

        .left-handwritten {
          margin-top: auto;
          max-width: 80%;
          line-height: 1.2;
          font-style: italic;
          transform: rotate(-1deg);
        }

        .right-handwritten {
          position: absolute;
          bottom: 110px;
          left: 44px;
          max-width: 65%;
          transform: rotate(-1.5deg);
          line-height: 1.2;
          opacity: 0.85;
        }

        /* Ruled lines on the diary side */
        .notebook-rulings {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          padding: 36px 0;
          box-sizing: border-box;
          pointer-events: none;
          z-index: 0;
        }

        .notebook-line {
          flex: 1;
          border-bottom: 1px solid rgba(30, 80, 150, 0.045); /* faint notebook blue ruled lines */
          width: 100%;
        }

        .diary-handwritten-date {
          font-family: var(--font-journal-hand);
          font-size: 1.1rem;
          color: rgba(193, 18, 31, 0.7);
          margin-bottom: 16px;
          transform: rotate(-1deg);
          z-index: 2;
        }

        .diary-serif-title {
          font-family: var(--font-journal-serif);
          font-size: 1.8rem;
          font-weight: 700;
          color: #1a0f0d;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 4px 0;
          position: relative;
          z-index: 2;
        }

        .diary-understrike {
          display: block;
          width: 48px;
          height: 1.5px;
          background-color: #c1121f;
          margin-top: 4px;
        }

        .diary-handwritten-action {
          font-family: var(--font-journal-hand);
          font-size: 1.2rem;
          color: rgba(43, 31, 29, 0.65);
          margin-bottom: 24px;
          z-index: 2;
        }

        .diary-story-paragraph {
          font-family: var(--font-journal-serif);
          font-size: 0.95rem;
          line-height: 1.75;
          color: #2b1f1d;
          margin: 0 0 28px 0;
          text-align: justify;
          z-index: 2;
          font-weight: 400;
        }

        /* Red underlined keywords */
        .red-underline-word {
          position: relative;
          display: inline-block;
        }

        .red-underline-word::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          right: 0;
          height: 1.5px;
          background-color: rgba(193, 18, 31, 0.55);
          transform: rotate(-0.5deg);
        }

        .diary-quote-box {
          position: relative;
          padding-left: 20px;
          margin-bottom: 20px;
          border-left: 2px solid rgba(193, 18, 31, 0.3);
          z-index: 2;
        }

        .diary-quote-text {
          font-family: var(--font-journal-serif);
          font-size: 0.88rem;
          font-style: italic;
          line-height: 1.6;
          color: rgba(43, 31, 29, 0.7);
          margin: 0;
        }

        /* Signature and Wax seal alignment */
        .diary-signature-row {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 2;
        }

        .diary-seal-container {
          position: relative;
          width: 50px;
          height: 50px;
        }

        /* Immersive wax seal styling */
        .wax-seal {
          position: absolute;
          top: -10px;
          left: 0;
          width: 48px;
          height: 48px;
          filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));
          transform: rotate(-5deg);
        }

        .wax-seal-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, #a81c1c 20%, #7e0a0a 75%, #590404 100%);
          border-radius: 48% 52% 46% 54% / 52% 48% 52% 48%; /* irregular circle outer wax mold */
          box-shadow: inset 1px 1px 3px rgba(255,255,255,0.25);
        }

        .wax-seal-inner {
          position: absolute;
          top: 15%;
          left: 15%;
          width: 70%;
          height: 70%;
          background: #7e0a0a;
          border-radius: 50%;
          border: 1px solid rgba(0,0,0,0.15);
          box-shadow: inset 0 0 5px rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .seal-emblem {
          font-family: var(--font-journal-serif);
          font-size: 0.9rem;
          font-weight: bold;
          color: #ff9999;
          opacity: 0.35;
          text-shadow: 1px 1px 1px #000;
        }

        .diary-signature {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .sig-label {
          font-family: monospace;
          font-size: 0.65rem;
          color: rgba(43, 31, 29, 0.4);
          letter-spacing: 0.5px;
        }

        .sig-name {
          font-family: var(--font-journal-hand);
          font-size: 1.4rem;
          font-weight: 700;
          color: #2b1f1d;
          line-height: 1;
          margin-top: 4px;
        }

        /* -------------------------------------------------------------
           MOBILE LUXURY TRAVEL JOURNAL PAPER DECK / STACK
        ------------------------------------------------------------- */
        .mobile-paper-stack-container {
          position: relative;
          width: min(350px, 90vw);
          height: min(460px, 66vh);
          margin: 0 auto;
          perspective: 1000px;
          z-index: 2;
        }

        @media (max-width: 1023px) {
          .journal-sticky-viewport {
            padding-top: 68px !important;
            padding-bottom: 20px !important;
            flex-direction: column !important;
            justify-content: flex-start !important;
            align-items: center !important;
            box-sizing: border-box;
          }
        }

        .mobile-paper-card {
          position: absolute;
          width: 100%;
          height: 100%;
          background-color: #F7F5F2;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-sizing: border-box;
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          color: #2b1f1d;
          transform-style: preserve-3d;
          will-change: transform, opacity;
        }

        .paper-texture-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: radial-gradient(rgba(0, 0, 0, 0.015) 1px, transparent 0);
          background-size: 8px 8px;
          opacity: 0.5;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>

      {/* Floating coordinates grid overlay behind book */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `
            linear-gradient(rgba(245, 242, 236, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
          zIndex: 0,
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 160px, black calc(100% - 160px), transparent 100%)'
        }}
      />

        {/* Sticky full-screen view wrapper */}
        <div className="journal-sticky-viewport">
          {/* Soft radial backdrop glow */}
          <div className="journal-editorial-glow" />

        {/* Floating Progress Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '24px' : 'auto',
            top: isMobile ? 'auto' : '110px',
            right: isMobile ? '24px' : '50px',
            fontFamily: 'monospace',
            fontSize: '12px',
            letterSpacing: '2px',
            zIndex: 10,
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            userSelect: 'none',
            color: 'rgba(255,255,255,0.7)',
            backgroundColor: 'rgba(0,0,0,0.4)',
            padding: '6px 12px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)'
          }}
        >
          <span style={{ color: '#C1121F', fontWeight: 'bold', fontSize: '14px' }}>
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span style={{ color: 'rgba(255, 255, 255, 0.25)' }}>/</span>
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>07</span>
        </div>

        {/* DESKTOP MODE: Double page leather journal */}
        {!isMobile ? (
          <div ref={bookRef} className="leather-book">
            {/* Thread Stitching Accent */}
            <div className="leather-stitching" />

            {/* Inner Pages container */}
            <div className="book-inner-pages">
              {/* Static left page underlay */}
              <div className="static-page-half static-left">
                {renderLeftPage(pages.left)}
              </div>

              {/* Static right page underlay */}
              <div className="static-page-half static-right">
                {renderRightPage(pages.right)}
              </div>

              {/* Spine Shadow Separation */}
              <div className="book-center-spine" />

              {/* Active turning page sheet */}
              {pages.isFlipping && (
                <div 
                  className={`flipping-page-container ${
                    flipDirection === 'down' 
                      ? 'page-fold-active-forward' 
                      : 'page-fold-active-backward'
                  }`}
                >
                  {/* Front of folding sheet (story) */}
                  <div className="flipping-page-face face-front">
                    {renderRightPage(pages.flippingFront)}
                    
                    {/* Shadow overlay matching paper curl */}
                    <div 
                      className={`curl-shadow ${
                        flipDirection === 'down' 
                          ? 'shadow-fade-forward' 
                          : 'shadow-fade-backward'
                      }`}
                    />
                  </div>

                  {/* Back of folding sheet (next scrapbook page) */}
                  <div className="flipping-page-face face-back">
                    {renderLeftPage(pages.flippingBack)}

                    <div 
                      className={`curl-shadow ${
                        flipDirection === 'down' 
                          ? 'shadow-fade-forward' 
                          : 'shadow-fade-backward'
                      }`}
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  </div>
                </div>
              )}

              {/* Landing shadow cast on the static left page during flip */}
              {pages.isFlipping && (
                <div 
                  className={`landing-shadow ${
                    flipDirection === 'down' ? 'landing-shadow-active' : ''
                  }`}
                />
              )}
            </div>
          </div>
        ) : (
          /* MOBILE MODE: Stack of premium travel journal paper sheets */
          <>
            {renderHeadingSection()}
            <div className="mobile-paper-stack-container" style={{ margin: '8px auto 0 auto' }}>
              {/* Static background collage sheets (Paper 4) */}
              <div 
                className="mobile-paper-card"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  transform: 'translateY(24px) rotate(0.8deg)',
                  zIndex: 1,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                  pointerEvents: 'none'
                }}
              >
                <div className="paper-texture-overlay" />
              </div>

              {/* Static background collage sheets (Paper 3) */}
              <div 
                className="mobile-paper-card"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  transform: 'translateY(16px) rotate(-1deg)',
                  zIndex: 2,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  pointerEvents: 'none'
                }}
              >
                <div className="paper-texture-overlay" />
              </div>

              {/* Static background collage sheets (Paper 2) */}
              <div 
                className="mobile-paper-card"
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  top: 0,
                  left: 0,
                  transform: 'translateY(8px) rotate(0.7deg)',
                  zIndex: 3,
                  boxShadow: '0 4px 10px rgba(0,0,0,0.06)',
                  pointerEvents: 'none'
                }}
              >
                <div className="paper-texture-overlay" />
              </div>

              {/* Dynamic active paper sheet (Paper 1) */}
              <AnimatePresence mode="popLayout" custom={scrollDir}>
                <motion.div
                  key={`active-paper-${activeIndex}`}
                  custom={scrollDir}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: 'spring',
                    stiffness: 75,
                    damping: 18,
                    mass: 0.8
                  }}
                  className="mobile-paper-card"
                  style={{ zIndex: 4 }}
                >
                  {renderPaperCard(journalPages[activeIndex], activeIndex)}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  </>
  );
}
