"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const IS_TOUCH = typeof window !== 'undefined'
  ? window.matchMedia('(hover: none) and (pointer: coarse)').matches
  : false;

function StarryBackground() {
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const count = IS_TOUCH ? 18 : 40;
    const starArray = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${(i * 4973 + 13) % 100}%`,
      left: `${(i * 7919 + 7) % 100}%`,
      size: ((i * 3 + 1) % 20) / 10 + 1,
      delay: `${(i * 6271 + 3) % 8}s`,
      duration: `${6 + (i * 5381 + 5) % 8}s`,
      driftX: (((i * 2053 + 11) % 40) - 20),
      driftY: (((i * 1777 + 17) % 40) - 20)
    }));
    setStars(starArray);
  }, []);

  // Pause animations when section is off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const spans = el.querySelectorAll('.animate-star-move');
        const state = entry.isIntersecting ? 'running' : 'paused';
        spans.forEach(s => { s.style.animationPlayState = state; });
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stars]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className="animate-star-move"
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: '#ffffff',
            borderRadius: '50%',
            boxShadow: `0 0 ${star.size * 2}px #ffffff`,
            opacity: 0.15,
            animationDelay: star.delay,
            animationDuration: star.duration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            ['--drift-x']: `${star.driftX}px`,
            ['--drift-y']: `${star.driftY}px`
          }}
        />
      ))}
      <style>{`
        @keyframes starMove {
          0% {
            opacity: 0.15;
            transform: translate(0, 0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translate(calc(var(--drift-x) * 0.5), calc(var(--drift-y) * 0.5)) scale(1.3);
          }
          100% {
            opacity: 0.15;
            transform: translate(var(--drift-x), var(--drift-y)) scale(1);
          }
        }
        .animate-star-move {
          animation-name: starMove;
        }
      `}</style>
    </div>
  );
}

function ContactCTA() {
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none) and (pointer: coarse)').matches);
  }, []);

  return (
    <section
      id="contact"
      className="contact-cta-section"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '75vh',
        backgroundColor: '#050505',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'clamp(40px, 6vw, 70px) 24px clamp(80px, 10vw, 120px) 24px',
        boxSizing: 'border-box'
      }}
    >
      {/* Starry Space Background */}
      <StarryBackground />

      {/* Large faint background outline typography */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(5rem, 15vw, 15rem)',
          fontWeight: 900,
          letterSpacing: '0.05em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.08)',
          pointerEvents: 'none',
          zIndex: 1,
          userSelect: 'none'
        }}
      >
        TRAVINNO
      </div>

      {/* Red and Orange Glowing Gradients at the bottom */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '350px',
          background: 'linear-gradient(to top, rgba(193, 18, 31, 0.28) 0%, rgba(247, 127, 0, 0.12) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />
      {/* Glow orbs: blur(80px) is GPU-expensive — skip on mobile, use CSS gradient only */}
      {!isTouch && (
        <>
          <div 
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: '12%',
              width: '45%',
              height: '280px',
              background: 'radial-gradient(circle, rgba(193, 18, 31, 0.45) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '-120px',
              right: '12%',
              width: '45%',
              height: '280px',
              background: 'radial-gradient(circle, rgba(247, 127, 0, 0.4) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
        </>
      )}

      {/* Smooth bottom blend overlay */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '180px',
          background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />

      {/* Content wrapper */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '900px',
          width: '100%'
        }}
      >
        {/* Top badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            border: '1px solid rgba(193, 18, 31, 0.35)',
            borderRadius: '100px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '28px',
            background: 'rgba(193, 18, 31, 0.05)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)'
          }}
        >
          <span style={{ width: '6px', height: '6px', backgroundColor: '#C1121F', borderRadius: '50%', display: 'inline-block' }} />
          Let's create something extraordinary
        </motion.span>

        {/* Main Heading with Red-to-Orange gradient on "journey today." */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.2rem, 5.2vw, 4.4rem)',
            fontWeight: 500,
            lineHeight: 1.25,
            letterSpacing: '0.02em',
            color: '#FFFFFF',
            margin: '0 0 20px 0'
          }}
        >
          A Partnership That Goes <br />
          <span 
            style={{
              fontFamily: "'Allura', cursive",
              fontSize: '1.25em',
              background: 'linear-gradient(to right, #C1121F 20%, #F77F00 85%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline-block',
              fontWeight: 400,
              textTransform: 'none',
              letterSpacing: 'normal',
              lineHeight: 1.0,
              paddingTop: '6px',
              paddingBottom: '20px',
              marginBottom: '-20px'
            }}
          >
            Beyond Travel.
          </span>
        </motion.h2>

        {/* Sub-heading description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 0.72, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            lineHeight: 1.7,
            color: '#FFFFFF',
            maxWidth: '700px',
            margin: '0 auto 45px auto',
            fontWeight: 300,
            padding: '0 20px',
            boxSizing: 'border-box'
          }}
        >
          From bespoke leisure escapes to ultra-luxury destination experiences — we orchestrate travel that inspires, connects, and stays with you forever.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            width: '100%',
            padding: '0 16px',
            boxSizing: 'border-box'
          }}
        >
          <Link
            href="/contact"
            className="contact-cta-primary"
            style={{
              padding: '14px 28px',
              borderRadius: '30px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: '#FFFFFF',
              color: '#050505',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)',
              display: 'inline-block'
            }}
          >
            Contact Us
          </Link>
          <Link
            href="/destinations"
            className="contact-cta-secondary"
            style={{
              padding: '14px 28px',
              borderRadius: '30px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 600,
              backgroundColor: 'transparent',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              display: 'inline-block'
            }}
          >
            Destinations
          </Link>
        </motion.div>
      </div>

      {/* Button Hover styles */}
      <style>{`
        .contact-cta-primary {
          will-change: transform, box-shadow, background-color;
        }
        .contact-cta-primary:hover {
          background-color: #F5F2EC !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 22px rgba(255, 255, 255, 0.18) !important;
        }
        .contact-cta-secondary {
          will-change: transform, background-color, border-color;
        }
        .contact-cta-secondary:hover {
          border-color: #FFFFFF !important;
          background-color: rgba(255, 255, 255, 0.06) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}
export default React.memo(ContactCTA);
