"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Home, Compass, Users, Mail, MapPin, Briefcase, MessageSquare, BookOpen, Shield } from 'lucide-react';

const innerTPath = "M 78.80,88.83 L 77.99,89.92 L 76.90,91.00 L 76.09,92.08 L 75.00,92.62 L 73.91,93.17 L 72.83,93.44 L 71.74,93.71 L 70.65,93.98 L 69.57,93.98 L 68.48,94.25 L 67.39,94.25 L 66.30,93.98 L 65.22,93.71 L 64.13,93.44 L 63.04,92.90 L 61.96,92.08 L 61.14,91.00 L 60.60,89.92 L 60.33,88.83 L 60.05,87.75 L 59.78,86.67 L 59.78,85.58 L 59.78,84.50 L 59.78,83.42 L 59.78,82.33 L 59.78,81.25 L 59.78,80.17 L 59.78,79.08 L 59.78,78.00 L 59.78,76.92 L 59.78,75.83 L 59.78,74.75 L 59.78,73.67 L 59.78,72.58 L 59.78,71.50 L 59.78,70.42 L 59.78,69.33 L 59.78,68.25 L 59.78,67.17 L 59.78,66.08 L 59.78,65.00 L 59.78,63.92 L 59.78,62.83 L 59.78,61.75 L 59.78,60.67 L 59.78,59.58 L 60.05,58.50 L 61.14,58.50 L 62.23,58.50 L 63.32,58.50 L 64.40,58.50 L 65.49,58.50 L 66.58,58.50 L 67.66,58.50 L 68.75,58.50 L 69.84,58.50 L 70.92,58.50 L 72.01,58.50 L 73.10,58.50 L 74.18,58.50 L 75.27,58.50 L 76.36,58.23 L 76.36,57.15 L 76.36,56.06 L 76.36,54.98 L 76.36,53.90 L 76.36,52.81 L 76.36,51.73 L 76.36,50.65 L 76.36,49.56 L 76.36,48.48 L 76.36,47.40 L 76.36,46.31 L 76.36,45.23 L 76.36,44.15 L 75.27,43.88 L 74.18,43.88 L 73.10,43.88 L 72.01,43.88 L 70.92,43.88 L 69.84,43.88 L 68.75,43.88 L 67.66,43.88 L 66.58,43.88 L 65.49,43.88 L 64.40,43.88 L 63.32,43.88 L 62.23,43.88 L 61.14,43.88 L 60.05,43.88 L 59.78,42.79 L 59.78,41.71 L 59.78,40.62 L 59.78,39.54 L 59.78,38.46 L 59.78,37.38 L 59.78,36.29 L 59.78,35.21 L 59.78,34.12 L 59.78,33.04 L 59.78,31.96 L 59.78,30.88 L 59.78,29.79 L 59.78,28.71 L 59.51,27.62 L 58.42,27.62 L 57.34,27.62 L 56.25,27.62 L 55.16,27.62 L 54.08,27.62 L 52.99,27.62 L 51.90,27.62 L 50.82,27.62 L 49.73,27.62 L 48.64,27.62 L 47.55,27.62 L 46.47,27.62 L 45.38,27.62 L 44.29,27.62 L 43.21,27.62 L 42.12,27.62 L 41.03,27.62 L 40.22,28.17 L 40.22,29.25 L 40.22,30.33 L 40.22,31.42 L 40.22,32.50 L 40.22,33.58 L 40.22,34.67 L 40.22,35.75 L 40.22,36.83 L 40.22,37.92 L 40.22,39.00 L 40.22,40.08 L 40.22,41.17 L 40.22,42.25 L 40.22,43.33 L 40.22,44.42 L 40.22,45.50 L 40.22,46.58 L 40.22,47.67 L 40.22,48.75 L 40.22,49.83 L 40.22,50.92 L 40.22,52.00 L 40.22,53.08 L 40.22,54.17 L 40.22,55.25 L 40.22,56.33 L 40.22,57.42 L 40.22,58.50 L 40.22,59.58 L 40.22,60.67 L 40.22,61.75 L 40.22,62.83 L 40.22,63.92 L 40.22,65.00 L 40.22,66.08 L 40.22,67.17 L 40.22,68.25 L 40.22,69.33 L 40.22,70.42 L 40.22,71.50 L 40.22,72.58 L 40.22,73.67 L 40.22,74.75 L 40.22,75.83 L 40.22,76.92 L 40.22,78.00 L 40.22,79.08 L 40.22,80.17 L 40.22,81.25 L 40.22,82.33 L 40.22,83.42 L 40.22,84.50 L 40.22,85.58 L 40.22,86.67 L 40.22,87.75 L 40.49,88.83 L 40.49,89.92 L 40.76,91.00 L 40.76,92.08 L 41.03,93.17 L 41.30,94.25 L 41.58,95.33 L 42.12,96.42 L 42.66,97.50";
const outerPinPath = "M 42.66,97.50 L 43.48,99.12 L 44.57,100.75 L 45.92,102.38 L 47.28,103.73 L 48.91,105.08 L 50.54,106.17 L 52.17,106.98 L 53.80,107.52 L 55.43,108.06 L 57.07,108.60 L 58.15,109.15 L 56.52,110.50 L 54.89,111.85 L 53.26,113.48 L 51.63,114.83 L 50.00,116.19 L 48.37,115.10 L 46.74,113.48 L 45.11,112.12 L 43.48,110.50 L 41.85,109.15 L 40.22,107.52 L 38.59,106.17 L 36.96,104.54 L 35.33,103.19 L 33.70,101.56 L 32.07,100.21 L 30.43,98.58 L 28.80,96.96 L 27.17,95.33 L 25.54,93.71 L 23.91,92.08 L 22.55,90.46 L 20.92,88.83 L 19.57,87.21 L 18.21,85.58 L 17.12,83.96 L 15.76,82.33 L 14.67,80.71 L 13.59,79.08 L 12.50,77.46 L 11.68,75.83 L 10.87,74.21 L 10.05,72.58 L 9.24,70.96 L 8.70,69.33 L 8.15,67.71 L 7.61,66.08 L 7.34,64.46 L 7.07,62.83 L 6.79,61.21 L 6.52,59.58 L 6.52,57.96 L 6.52,56.33 L 6.52,54.71 L 6.52,53.08 L 6.79,51.46 L 7.07,49.83 L 7.34,48.21 L 7.61,46.58 L 8.15,44.96 L 8.70,43.33 L 9.24,41.71 L 9.78,40.08 L 10.60,38.46 L 11.41,36.83 L 12.23,35.21 L 13.32,33.58 L 14.40,31.96 L 15.76,30.33 L 17.12,28.71 L 18.48,27.08 L 20.11,25.73 L 21.74,24.10 L 23.37,23.02 L 25.00,21.67 L 26.63,20.58 L 28.26,19.77 L 29.89,18.69 L 31.52,18.15 L 33.15,17.33 L 34.78,16.79 L 36.41,15.98 L 38.04,15.71 L 39.67,15.17 L 41.30,14.90 L 42.93,14.62 L 44.57,14.35 L 45.92,14.08 L 47.55,14.08 L 49.18,14.08 L 50.82,14.08 L 52.45,14.08 L 54.08,14.08 L 55.71,14.35 L 57.34,14.62 L 58.97,14.90 L 60.60,15.44 L 62.23,15.71 L 63.86,16.25 L 65.49,16.79 L 67.12,17.60 L 68.75,18.15 L 70.38,18.96 L 72.01,20.04 L 73.64,20.85 L 75.27,21.94 L 76.90,23.29 L 78.53,24.65 L 80.16,26.00 L 81.79,27.62 L 83.15,29.25 L 84.51,30.88 L 85.60,32.50 L 86.68,34.12 L 87.77,35.75 L 88.59,37.38 L 89.40,39.00 L 90.22,40.62 L 90.76,42.25 L 91.30,43.88 L 91.85,45.50 L 92.12,47.12 L 92.66,48.75 L 92.93,50.38 L 92.93,52.00 L 93.21,53.62 L 93.21,55.25 L 93.21,56.88 L 93.21,58.50 L 93.21,60.12 L 92.93,61.75 L 92.66,63.38 L 92.39,65.00 L 91.85,66.62 L 91.30,68.25 L 90.76,69.88 L 90.22,71.50 L 89.40,73.12 L 88.59,74.75 L 87.77,76.38 L 86.96,78.00 L 85.87,79.62 L 84.78,81.25 L 83.70,82.88 L 82.34,84.50 L 81.25,86.12 L 79.89,87.75 L 79.08,88.56";

export default function Header() {
  const isLockedMode = false;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null); // 'company', 'destinations', or null
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('home');
  const [scrollDirection, setScrollDirection] = useState('up');

  // Track active tab via URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#about') {
        setActiveTab('about');
      } else if (hash === '#team') {
        setActiveTab('team');
      } else if (hash === '#contact') {
        setActiveTab('contact');
      } else if (hash === '#careers') {
        setActiveTab('careers');
      } else if (hash === '#blog') {
        setActiveTab('blog');
      } else if (hash === '#destinations') {
        setActiveTab('destinations');
      } else {
        setActiveTab('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const [activeMobileItem, setActiveMobileItem] = useState('home');

  // Sync activeMobileItem with activeTab when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      if (activeTab === 'about' || activeTab === 'team' || activeTab === 'services' || activeTab === 'careers' || activeTab === 'blog') {
        setActiveMobileItem('company');
        setMobileCompanyOpen(true);
        setMobileDestinationsOpen(false);
      } else if (activeTab === 'destinations') {
        setActiveMobileItem('destinations');
        setMobileCompanyOpen(false);
        setMobileDestinationsOpen(true);
      } else if (activeTab === 'contact') {
        setActiveMobileItem('contact');
        setMobileCompanyOpen(false);
        setMobileDestinationsOpen(false);
      } else {
        setActiveMobileItem('home');
        setMobileCompanyOpen(false);
        setMobileDestinationsOpen(false);
      }
    }
  }, [isMobileMenuOpen, activeTab]);

  // Track scroll direction for dock hide/show animation
  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (direction !== scrollDirection && Math.abs(scrollY - lastScrollY) > 8) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => window.removeEventListener('scroll', updateScrollDirection);
  }, [scrollDirection]);

  // Framer Motion scroll hooks to fade the logo color from White to Accent Red
  const { scrollY } = useScroll();
  const logoColor = useTransform(scrollY, [0, 650], ['#FFFFFF', '#C1121F']);

  const companyItems = [
    { name: 'About Us', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Services', href: '/#services' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' }
  ];

  const destinationItems = [
    { name: 'Dubai', index: 0 },
    { name: 'Thailand', index: 1 },
    { name: 'Singapore', index: 2 },
    { name: 'Malaysia', index: 3 },
    { name: 'Vietnam', index: 4 },
    { name: 'Kenya', index: 5 },
    { name: 'Bali', index: 6 }
  ];

  const handleDropdownItemClick = (e, href) => {
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);
    
    const hashMatch = href && href.includes('#') ? href.split('#')[1] : null;
    
    if (hashMatch) {
      const isHomeSection = ['services', 'testimonials', 'contact', 'why', 'journey', 'destinations'].includes(hashMatch);
      
      if (isHomeSection) {
        const isOnHomePage = typeof window !== 'undefined' && (
          window.location.pathname === '/demo' || 
          window.location.pathname === '/demo/' || 
          window.location.pathname === '/'
        );
        
        if (isOnHomePage) {
          e.preventDefault();
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const el = document.getElementById(hashMatch);
              if (!el) return;
              const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
              const absoluteTop = Math.max(0, el.getBoundingClientRect().top + scrollY - 80);
              if (window.lenis) {
                window.lenis.scrollTo(absoluteTop, { duration: 1.2 });
              } else {
                window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
              }
            });
          });
        } else {
          sessionStorage.setItem('travinno_pending_scroll', hashMatch);
        }
      }
    }
  };

  return (
    <>
      {/* Backdrop Blur Overlay (rendered outside header to sit behind floating navbar) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dim background a little
              backdropFilter: 'blur(4px)',          // Subtle blur
              WebkitBackdropFilter: 'blur(4px)',
              zIndex: 999,                          // Below header-container (z-index: 1000)
              pointerEvents: 'auto'
            }}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut', delay: 0.1 }}
        className="header-container"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '24px 6%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          pointerEvents: 'auto',
          background: isMobileMenuOpen 
            ? 'rgba(0, 0, 0, 0.4)' 
            : 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
          backdropFilter: isMobileMenuOpen ? 'blur(4px)' : 'none',
          WebkitBackdropFilter: isMobileMenuOpen ? 'blur(4px)' : 'none',
          border: 'none',
          boxShadow: 'none',
          transition: 'background 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease'
        }}
      >
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center',
          filter: isMobileMenuOpen ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease'
        }}
      >
        <Link
          href="/"
          aria-label="Go to Travinno Homepage"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}
        >
          <svg
            viewBox="0 0 100 130"
            style={{
              height: '51px',
              width: 'auto',
              display: 'block'
            }}
          >
            <motion.path
              d={`${outerPinPath} ${innerTPath}`}
              fillRule="evenodd"
              style={{ fill: logoColor }}
              stroke="none"
            />
          </svg>
        </Link>
      </div>

      {/* Desktop Menu Navigation Links (matching screenshot layout) */}
      <div 
        className="desktop-nav-container"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'auto'
        }}
      >
        <nav 
          style={{ 
            display: 'flex', 
            gap: '26px', 
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            padding: '4px 24px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
            boxSizing: 'border-box'
          }}
        >

          {/* Link: Home */}
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              opacity: 0.8,
              padding: '4px 0',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.color = 'var(--accent-red)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            Home
          </Link>

          {/* Dropdown: Company */}
          <div
            onMouseEnter={() => setHoveredMenu('company')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={{ position: 'relative', paddingTop: '4px', paddingBottom: '4px' }}
          >
            <a
              href="#about"
              onClick={(e) => {
                if (isLockedMode) {
                  e.preventDefault();
                }
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: hoveredMenu === 'company' || activeTab === 'about' || activeTab === 'team' || activeTab === 'services' || activeTab === 'careers' || activeTab === 'blog' ? 'var(--accent-red)' : 'var(--text-primary)',
                textDecoration: 'none',
                opacity: hoveredMenu === 'company' || activeTab === 'about' || activeTab === 'team' || activeTab === 'services' || activeTab === 'careers' || activeTab === 'blog' ? 1 : 0.8,
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              Company
              <span style={{ fontSize: '0.55rem', transition: 'transform 0.3s ease', transform: hoveredMenu === 'company' ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </a>

            <AnimatePresence>
              {hoveredMenu === 'company' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '200px',
                    backgroundColor: 'rgba(10, 10, 12, 0.96)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px 0px 0px 24px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    padding: '16px 0',
                    marginTop: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000
                  }}
                >
                   {companyItems.map((item) => (
                    <Link
                      key={item.name}
                      href={isLockedMode ? "#" : item.href}
                      onClick={(e) => {
                        if (isLockedMode) {
                          e.preventDefault();
                        } else {
                          handleDropdownItemClick(e, item.href);
                        }
                      }}
                      style={{
                        padding: '10px 24px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: isLockedMode ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        borderLeft: '2px solid transparent',
                        borderRadius: '12px 0px 0px 12px',
                        cursor: isLockedMode ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => {
                        if (!isLockedMode) {
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.backgroundColor = 'rgba(234, 28, 41, 0.06)';
                          e.currentTarget.style.borderLeftColor = 'var(--accent-red)';
                          e.currentTarget.style.paddingLeft = '28px';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLockedMode) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.paddingLeft = '24px';
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {isLockedMode && <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>🔒</span>}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dropdown: Destinations */}
          <div
            onMouseEnter={() => setHoveredMenu('destinations')}
            onMouseLeave={() => setHoveredMenu(null)}
            style={{ position: 'relative', paddingTop: '4px', paddingBottom: '4px' }}
          >
            <Link
              href="/destinations"
              onClick={(e) => {
                if (isLockedMode) {
                  e.preventDefault();
                }
              }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: hoveredMenu === 'destinations' || activeTab === 'destinations' ? 'var(--accent-red)' : 'var(--text-primary)',
                textDecoration: 'none',
                opacity: hoveredMenu === 'destinations' || activeTab === 'destinations' ? 1 : 0.8,
                padding: '4px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              Destinations
              <span style={{ fontSize: '0.55rem', transition: 'transform 0.3s ease', transform: hoveredMenu === 'destinations' ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
            </Link>

            <AnimatePresence>
              {hoveredMenu === 'destinations' && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '200px',
                    backgroundColor: 'rgba(10, 10, 12, 0.96)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '24px 0px 0px 24px',
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                    padding: '16px 0',
                    marginTop: '0px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 1000
                  }}
                >
                   {destinationItems.map((item) => (
                    <Link
                      key={item.name}
                      href={isLockedMode ? "#" : `/destinations/#destination-${item.name.toLowerCase()}`}
                      onClick={(e) => {
                        if (isLockedMode) {
                          e.preventDefault();
                        } else {
                          setIsMobileMenuOpen(false);
                          setHoveredMenu(null);
                          const isOnDestinationsPage = typeof window !== 'undefined' && window.location.pathname.includes('/destinations');
                          if (isOnDestinationsPage) {
                            e.preventDefault();
                            const targetHash = `#destination-${item.name.toLowerCase()}`;
                            window.location.hash = targetHash;
                            window.dispatchEvent(new Event('hashchange'));
                            window.dispatchEvent(new Event('travinno-destination-change'));
                          }
                        }
                      }}
                      style={{
                        padding: '10px 24px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        color: isLockedMode ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        borderLeft: '2px solid transparent',
                        borderRadius: '12px 0px 0px 12px',
                        cursor: isLockedMode ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => {
                        if (!isLockedMode) {
                          e.currentTarget.style.color = '#FFFFFF';
                          e.currentTarget.style.backgroundColor = 'rgba(234, 28, 41, 0.06)';
                          e.currentTarget.style.borderLeftColor = 'var(--accent-red)';
                          e.currentTarget.style.paddingLeft = '28px';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isLockedMode) {
                          e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.borderLeftColor = 'transparent';
                          e.currentTarget.style.paddingLeft = '24px';
                        }
                      }}
                    >
                      <span>{item.name}</span>
                      {isLockedMode && <span style={{ fontSize: '0.65rem', opacity: 0.5 }}>🔒</span>}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Link: Contact */}
          <Link
            href="/contact"
            onClick={(e) => {
              if (isLockedMode) {
                e.preventDefault();
              }
            }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: activeTab === 'contact' ? 'var(--accent-red)' : 'var(--text-primary)',
              textDecoration: 'none',
              opacity: activeTab === 'contact' ? 1 : (isLockedMode ? 0.45 : 0.8),
              padding: '4px 0',
              cursor: isLockedMode ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!isLockedMode) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.color = 'var(--accent-red)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLockedMode) {
                e.currentTarget.style.opacity = activeTab === 'contact' ? '1' : '0.8';
                e.currentTarget.style.color = activeTab === 'contact' ? 'var(--accent-red)' : 'var(--text-primary)';
              }
            }}
          >
            Contact {isLockedMode && "🔒"}
          </Link>

        </nav>
      </div>



      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Toggle Navigation Menu"
        style={{ pointerEvents: 'auto' }}
      >
        <span />
        <span />
      </button>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          /* Right Slide-in Drawer */
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: '85%',
                maxWidth: '360px',
                height: '100vh', // fallback
                height: '100dvh', // dynamic viewport height for mobile
                backgroundColor: '#050505',
                borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '32px 0px 0px 32px',
                boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.85)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '24px 20px calc(80px + env(safe-area-inset-bottom)) 20px',
                boxSizing: 'border-box',
                pointerEvents: 'auto',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
            {/* Bright, premium Cherry Red Glow Wash at bottom of menu */}
            <div
              style={{
                position: 'absolute',
                bottom: '-120px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '130%',
                height: '480px',
                background: 'radial-gradient(ellipse at 50% 100%, rgba(193, 18, 31, 0.45) 0%, rgba(193, 18, 31, 0.15) 55%, transparent 85%)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            />

            {/* Background Graphic Illustration (matching Footer style) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.65
              }}
            >

              <svg
                viewBox="0 0 360 800"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  pointerEvents: 'none'
                }}
              >
                {/* 1. Fine Dotted World Grid Lines */}
                <g stroke="rgba(245, 242, 236, 0.05)" strokeWidth="0.5" strokeDasharray="1.5 8" fill="none">
                  {/* Latitudes */}
                  <line x1="10" y1="100" x2="350" y2="100" />
                  <line x1="10" y1="220" x2="350" y2="220" />
                  <line x1="10" y1="340" x2="350" y2="340" />
                  <line x1="10" y1="460" x2="350" y2="460" />
                  <line x1="10" y1="580" x2="350" y2="580" />
                  <line x1="10" y1="700" x2="350" y2="700" />
                  {/* Longitudes */}
                  <line x1="60" y1="20" x2="60" y2="780" />
                  <line x1="180" y1="20" x2="180" y2="780" />
                  <line x1="300" y1="20" x2="300" y2="780" />
                </g>

                {/* 2. Star Constellations */}
                <g stroke="rgba(245, 242, 236, 0.08)" strokeWidth="0.5" fill="none">
                  <polyline points="40,150 70,135 100,155" />
                  <circle cx="40" cy="150" r="1.2" fill="rgba(245, 242, 236, 0.3)" />
                  <circle cx="70" cy="135" r="2" fill="#C82D2D" fillOpacity="0.4" />
                  <circle cx="100" cy="155" r="1" fill="rgba(245, 242, 236, 0.2)" />
                </g>

                {/* 3. Compass Outline in Background (Bottom Right) */}
                <g transform="translate(280, 680)">
                  <circle cx="0" cy="0" r="90" stroke="rgba(245, 242, 236, 0.12)" strokeWidth="0.6" fill="none" />
                  <circle cx="0" cy="0" r="80" stroke="rgba(245, 242, 236, 0.08)" strokeWidth="0.5" strokeDasharray="2 2" fill="none" />
                  <circle cx="0" cy="0" r="50" stroke="rgba(245, 242, 236, 0.08)" strokeWidth="0.5" fill="none" />
                  
                  {/* Compass needle */}
                  <path d="M 0,-60 L 3,0 L 0,8 L -3,0 Z" fill="none" stroke="rgba(200, 45, 45, 0.2)" strokeWidth="0.6" />
                  <path d="M 0,60 L 3,0 L 0,-8 L -3,0 Z" fill="none" stroke="rgba(245, 242, 236, 0.1)" strokeWidth="0.6" />
                  
                  {/* Cardinal Points */}
                  <text x="0" y="-68" textAnchor="middle" fontSize="6.5" fill="rgba(245, 242, 236, 0.3)" stroke="none" fontFamily="var(--font-sans)">N</text>
                  <text x="0" y="74" textAnchor="middle" fontSize="6.5" fill="rgba(245, 242, 236, 0.3)" stroke="none" fontFamily="var(--font-sans)">S</text>
                </g>

                {/* 4. Luxury Passport stamp */}
                <g transform="translate(110, 620) rotate(-10)" opacity="0.1" stroke="rgba(245, 242, 236, 0.8)" strokeWidth="0.5" fill="none">
                  <circle cx="0" cy="0" r="22" />
                  <circle cx="0" cy="0" r="19" strokeDasharray="1 1.5" />
                  <text x="0" y="-6" textAnchor="middle" fontSize="4.2" fill="#F5F2EC" stroke="none" fontFamily="var(--font-sans)">TRAVINNO</text>
                  <text x="0" y="2" textAnchor="middle" fontSize="3.5" fill="#C82D2D" stroke="none" fontFamily="var(--font-sans)">★ DXB ★</text>
                  <text x="0" y="8" textAnchor="middle" fontSize="3.5" fill="#F5F2EC" stroke="none" fontFamily="var(--font-mono)">ENTRY 2026</text>
                </g>

                {/* 5. Flowing Route line */}
                <path
                  d="M 60,180 C 120,240 100,320 200,380 C 300,440 220,540 280,680"
                  fill="none"
                  stroke="rgba(245, 242, 236, 0.15)"
                  strokeWidth="0.6"
                  strokeDasharray="3 4"
                />
                
                {/* Route airplane icon */}
                <g transform="translate(130, 310) rotate(35) scale(0.7) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.18)" strokeWidth="0.7" fill="none">
                  <path d="M 12,2 L 14,9 L 22,12 L 14,15 L 12,22 L 10,15 L 2,12 L 10,9 Z" />
                </g>
              </svg>
            </div>

            {/* Top Section (Header & Links) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 2 }}>
                {/* Header: Logo + Close Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Logo (Travinno SVG logo pin) */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <svg
                      viewBox="0 0 100 130"
                      style={{
                        height: '44px',
                        width: 'auto',
                        display: 'block'
                      }}
                    >
                      <path
                        d={`${outerPinPath} ${innerTPath}`}
                        fillRule="evenodd"
                        fill="#FFFFFF"
                        stroke="none"
                      />
                    </svg>
                  </div>

                  {/* Close Icon Circle Button */}
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close menu"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'}
                  >
                    <span style={{ fontSize: '1.2rem', fontWeight: 300, lineHeight: 1 }}>✕</span>
                  </button>
                </div>

                {/* Divider Line */}
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.05)', marginTop: '-8px' }} />

                {/* Navigation Links list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {/* Link 1: Home */}
                  <div style={{ position: 'relative' }}>
                    {activeMobileItem === 'home' && (
                      <div style={{
                        position: 'absolute',
                        left: '4px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '38px',
                        borderLeft: '2.5px solid #800000',
                        borderTopLeftRadius: '14px',
                        borderBottomLeftRadius: '14px'
                      }} />
                    )}
                    <Link
                      href="/"
                      onClick={() => {
                        setActiveMobileItem('home');
                        setActiveTab('home');
                        setIsMobileMenuOpen(false);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '10px 0px 10px 16px',
                        color: activeMobileItem === 'home' ? '#800000' : 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: activeMobileItem === 'home' ? 600 : 500,
                        transition: 'all 0.25s'
                      }}
                    >
                      <Home size={18} strokeWidth={2.2} />
                      Home
                    </Link>
                  </div>

                  {/* Link 2: Company Accordion */}
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ position: 'relative' }}>
                      {activeMobileItem === 'company' && (
                        <div style={{
                          position: 'absolute',
                          left: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '12px',
                          height: '38px',
                          borderLeft: '2.5px solid #800000',
                          borderTopLeftRadius: '14px',
                          borderBottomLeftRadius: '14px'
                        }} />
                      )}
                      <button
                        onClick={() => {
                          setActiveMobileItem('company');
                          setMobileCompanyOpen(!mobileCompanyOpen);
                          setMobileDestinationsOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 0px 10px 16px',
                          background: 'none',
                          border: 'none',
                          color: activeMobileItem === 'company' ? '#800000' : 'rgba(255, 255, 255, 0.7)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1rem',
                          fontWeight: activeMobileItem === 'company' ? 600 : 500,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.25s'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Users size={18} strokeWidth={2.2} />
                          Company
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          {mobileCompanyOpen ? '▲' : '▼'}
                        </span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {mobileCompanyOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '56px',
                            gap: '12px',
                            marginTop: '4px',
                            marginBottom: '10px'
                          }}
                        >
                           {companyItems.map((item) => (
                            <Link
                              key={item.name}
                              href={isLockedMode ? "#" : item.href}
                              onClick={(e) => {
                                if (isLockedMode) {
                                  e.preventDefault();
                                } else {
                                  handleDropdownItemClick(e, item.href);
                                }
                              }}
                              style={{
                                color: isLockedMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                transition: 'color 0.2s',
                                cursor: isLockedMode ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                              onMouseEnter={(e) => {
                                if (!isLockedMode) e.currentTarget.style.color = '#800000';
                              }}
                              onMouseLeave={(e) => {
                                if (!isLockedMode) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                              }}
                            >
                              {item.name} {isLockedMode && "🔒"}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Link 3: Destinations Accordion */}
                  <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <div style={{ position: 'relative' }}>
                      {activeMobileItem === 'destinations' && (
                        <div style={{
                          position: 'absolute',
                          left: '4px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '12px',
                          height: '38px',
                          borderLeft: '2.5px solid #800000',
                          borderTopLeftRadius: '14px',
                          borderBottomLeftRadius: '14px'
                        }} />
                      )}
                      <button
                        onClick={() => {
                          setActiveMobileItem('destinations');
                          setMobileDestinationsOpen(!mobileDestinationsOpen);
                          setMobileCompanyOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '10px 0px 10px 16px',
                          background: 'none',
                          border: 'none',
                          color: activeMobileItem === 'destinations' ? '#800000' : 'rgba(255, 255, 255, 0.7)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1rem',
                          fontWeight: activeMobileItem === 'destinations' ? 600 : 500,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.25s'
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <Compass size={18} strokeWidth={2.2} />
                          Destinations
                        </span>
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          {mobileDestinationsOpen ? '▲' : '▼'}
                        </span>
                      </button>
                    </div>

                    <AnimatePresence>
                      {mobileDestinationsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '56px',
                            gap: '12px',
                            marginTop: '4px',
                            marginBottom: '10px'
                          }}
                        >
                          <Link
                            href="/destinations"
                            onClick={() => setIsMobileMenuOpen(false)}
                            style={{
                              color: 'rgba(255, 255, 255, 0.65)',
                              fontSize: '0.9rem',
                              textDecoration: 'none',
                              fontFamily: 'var(--font-sans)',
                              fontWeight: 500,
                              transition: 'color 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                              paddingBottom: '8px',
                              marginBottom: '4px'
                            }}
                          >
                            Explore All Destinations
                          </Link>
                          {destinationItems.map((item) => (
                            <Link
                              key={item.name}
                              href={isLockedMode ? "#" : `/destinations/#destination-${item.name.toLowerCase()}`}
                              onClick={(e) => {
                                if (isLockedMode) {
                                  e.preventDefault();
                                } else {
                                  setIsMobileMenuOpen(false);
                                  setHoveredMenu(null);
                                  const isOnDestinationsPage = typeof window !== 'undefined' && window.location.pathname.includes('/destinations');
                                  if (isOnDestinationsPage) {
                                    e.preventDefault();
                                    const targetHash = `#destination-${item.name.toLowerCase()}`;
                                    window.location.hash = targetHash;
                                    window.dispatchEvent(new Event('hashchange'));
                                    window.dispatchEvent(new Event('travinno-destination-change'));
                                  }
                                }
                              }}
                              style={{
                                color: isLockedMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.5)',
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 400,
                                transition: 'color 0.2s',
                                cursor: isLockedMode ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}
                              onMouseEnter={(e) => {
                                if (!isLockedMode) e.currentTarget.style.color = '#800000';
                              }}
                              onMouseLeave={(e) => {
                                if (!isLockedMode) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)';
                              }}
                            >
                              {item.name} {isLockedMode && "🔒"}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Link 4: Contact */}
                  <div style={{ position: 'relative' }}>
                    {activeMobileItem === 'contact' && (
                      <div style={{
                        position: 'absolute',
                        left: '4px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '12px',
                        height: '38px',
                        borderLeft: '2.5px solid #800000',
                        borderTopLeftRadius: '14px',
                        borderBottomLeftRadius: '14px'
                      }} />
                    )}
                    <Link
                      href="/contact"
                      onClick={(e) => {
                        if (isLockedMode) {
                          e.preventDefault();
                        } else {
                          setActiveMobileItem('contact');
                          setActiveTab('contact');
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '10px 0px 10px 16px',
                        color: isLockedMode
                          ? 'rgba(255, 255, 255, 0.35)'
                          : activeMobileItem === 'contact' ? '#800000' : 'rgba(255, 255, 255, 0.7)',
                        textDecoration: 'none',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '1rem',
                        fontWeight: !isLockedMode && activeMobileItem === 'contact' ? 600 : 500,
                        transition: 'all 0.25s',
                        cursor: isLockedMode ? 'not-allowed' : 'pointer'
                      }}
                    >
                      <Mail size={18} strokeWidth={2.2} />
                      Contact {isLockedMode && "🔒"}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bottom Section (CTA + Utilities) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                {/* CTA Button "Get in Touch" */}
                {isLockedMode ? (
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    style={{
                      width: '80%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.35)',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '12px 0',
                      borderRadius: '100px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'not-allowed',
                      transition: 'all 0.3s'
                    }}
                  >
                    Get in Touch 🔒
                  </a>
                ) : (
                  <a
                    href="#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      width: '80%',
                      backgroundColor: '#800000',
                      color: '#FFFFFF',
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      padding: '12px 0',
                      borderRadius: '100px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 8px 24px rgba(128, 0, 0, 0.3)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#600000';
                      e.currentTarget.style.boxShadow = '0 8px 28px rgba(128, 0, 0, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#800000';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(128, 0, 0, 0.3)';
                    }}
                  >
                    Get in Touch <span style={{ fontSize: '1.1rem' }}>→</span>
                  </a>
                )}

                {/* Call Us & Email links at the bottom */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-sans)',
                  letterSpacing: '0.5px'
                }}>
                  <a
                    href="tel:+97145260000"
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#800000'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)'}
                  >
                    📞 Call Us
                  </a>
                  <span>•</span>
                  <span
                    style={{
                      color: 'rgba(255, 255, 255, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    TRAVINNO
                  </span>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  </>
  );
}
