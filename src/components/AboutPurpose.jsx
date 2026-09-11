"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Smooth scroll-linked zoom and vertical parallax offsets
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1.0]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div 
      ref={containerRef}
      className="editorial-image-container"
      style={{
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}
    >
      <motion.img 
        src={src} 
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          scale,
          y,
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />
    </div>
  );
}

function FadeInContainer({ children, delay = 0, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPurpose() {
  return (
    <div className="about-editorial-section">
      <style>{`
        .about-editorial-section {
          background-color: #050505;
          width: 100%;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          color: #F5F2EC;
        }

        /* Continuous checked grid pattern background matching History section opacity */
        .about-editorial-grid-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(245, 242, 236, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
          z-index: 0;
        }

        /* Editorial spacing containers */
        .editorial-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        /* Purpose Section: Centered full-width hero */
        .purpose-hero {
          padding: 140px 24px 60px 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .about-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border: 1px solid rgba(193, 18, 31, 0.15);
          border-radius: 100px;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
          background: rgba(193, 18, 31, 0.05);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }

        .about-badge-dot {
          width: 6px;
          height: 6px;
          background-color: #C1121F;
          border-radius: 50%;
          display: inline-block;
        }

        .about-heading-cursive {
          font-family: 'Allura', cursive;
          font-size: 1.35em;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1;
          display: inline-block;
          text-transform: none;
          vertical-align: middle;
          background: linear-gradient(to bottom, #F5F2EC 15%, #FF6B6B 65%, #C1121F 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding-left: 4px;
          padding-right: 12px;
        }

        .purpose-heading {
          font-family: var(--font-heading), 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.8vw, 3rem);
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: 0.01em;
          color: #F5F2EC;
          max-width: 900px;
          margin: 0 auto 32px auto;
        }

        .purpose-paragraph {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1rem, 1.2vw, 1.15rem);
          line-height: 1.8;
          color: rgba(245, 242, 236, 0.65);
          max-width: 680px;
          margin: 0 auto 40px auto;
          letter-spacing: 0.01em;
        }

        .red-accent-line {
          width: 60px;
          height: 1px;
          background-color: #C1121F;
          margin: 0 auto;
        }

        /* Two column editorial spreads (Mission & Vision) */
        .editorial-spread {
          padding: 80px 24px;
          display: grid;
          grid-template-columns: 4.5fr 5.5fr;
          align-items: center;
          gap: 8%;
        }

        .editorial-spread .editorial-image-container {
          order: 1;
        }
        .editorial-spread .editorial-text-col {
          order: 2;
        }

        .editorial-spread.reverse {
          grid-template-columns: 5.5fr 4.5fr;
        }

        .editorial-spread.reverse .editorial-image-container {
          order: 2;
        }
        .editorial-spread.reverse .editorial-text-col {
          order: 1;
        }

        .editorial-text-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .editorial-text-col.centered {
          padding: 0 40px;
        }

        .editorial-heading {
          font-family: var(--font-heading), 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 400;
          line-height: 1.2;
          color: #F5F2EC;
          margin: 0 0 24px 0;
          letter-spacing: 0.01em;
        }

        .editorial-paragraph-sub {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(245, 242, 236, 0.65);
          margin: 0;
          letter-spacing: 0.01em;
        }

        .editorial-divider {
          width: 40px;
          height: 1px;
          background-color: rgba(193, 18, 31, 0.35);
          margin-bottom: 24px;
        }

        @media (max-width: 1023px) {
          .purpose-hero {
            padding: 35px 20px 20px 20px;
          }
          .editorial-spread, .editorial-spread.reverse {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 24px 20px;
          }
          .editorial-image-container, .editorial-text-col {
            order: 0 !important;
          }
          .editorial-image-container {
            width: 100% !important;
            max-width: 100% !important;
            aspect-ratio: 4/3 !important;
            margin: 0 !important;
          }
          .editorial-text-col.centered {
            padding: 0;
          }
        }
      `}</style>

      {/* Grid checked background layer */}
      <div className="about-editorial-grid-bg" />

      <div className="editorial-wrapper">
        {/* SECTION 1: Our Purpose */}
        <section className="purpose-hero">
          <FadeInContainer>
            <div className="about-badge">
              <span className="about-badge-dot" />
              Our Purpose
            </div>
            <h2 className="purpose-heading">
              To build meaningful relationships and deliver out-of-this-world experiences.
            </h2>
            <div className="red-accent-line" />
          </FadeInContainer>
        </section>

        {/* SECTION 2: Our Mission */}
        <section className="editorial-spread">
          <div className="editorial-text-col centered">
            <FadeInContainer>
              <div className="about-badge">
                <span className="about-badge-dot" />
                Our Mission
              </div>
              <h3 className="editorial-heading">
                Driven by <span className="about-heading-cursive">Excellence</span>
              </h3>
              <div className="editorial-divider" />
              <p className="editorial-paragraph-sub">
                To deliver immaculate destination management services defined by unparalleled local expertise, prompt responsiveness, and custom craftsmanship. By aligning global quality standards with native insights, we empower travelers and advisors to experience the extraordinary with absolute trust and peace of mind.
              </p>
            </FadeInContainer>
          </div>
          <FadeInContainer delay={0.15} className="editorial-image-container">
            <div 
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80" 
                alt="Detailed travel map and curation tools, representing Travinno's mission"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.25) brightness(0.9)'
                }}
              />
            </div>
          </FadeInContainer>
        </section>

        {/* SECTION 3: Our Vision */}
        <section className="editorial-spread reverse">
          <div className="editorial-text-col centered">
            <FadeInContainer>
              <div className="about-badge">
                <span className="about-badge-dot" />
                Our Vision
              </div>
              <h3 className="editorial-heading">
                Beyond <span className="about-heading-cursive">Tomorrow</span>
              </h3>
              <div className="editorial-divider" />
              <p className="editorial-paragraph-sub">
                To establish Travinno as the definitive global benchmark for luxury destination management—renowned for setting new heights of bespoke curation, sustainable travel ethics, and service excellence across Asia and the Middle East.
              </p>
            </FadeInContainer>
          </div>
          <FadeInContainer delay={0.15} className="editorial-image-container">
            <div 
              style={{
                width: '100%',
                aspectRatio: '4/3',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=1200&q=80" 
                alt="Traveler standing on a mountain peak overlooking a vast landscape, symbolizing Travinno's vision"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.25) brightness(0.9)'
                }}
              />
            </div>
          </FadeInContainer>
        </section>
      </div>
    </div>
  );
}
