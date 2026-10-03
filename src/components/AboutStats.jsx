"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function CountUp({ to, suffix = "", duration = 1.8 }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  React.useEffect(() => {
    if (!isInView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easedProgress = progress * (2 - progress);
      setCount(Math.floor(easedProgress * to));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function AboutStats() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10px" });

  const stats = [
    {
      id: "clients",
      value: 200,
      suffix: "K+",
      label: "Happy clients",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', color: '#C1121F' }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      id: "professionals",
      value: 75,
      suffix: "+",
      label: "Travel professionals",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', color: '#C1121F' }}>
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      )
    },
    {
      id: "agents",
      value: 1000,
      suffix: "+",
      label: "Agents around the globe",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', color: '#C1121F' }}>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      )
    },
    {
      id: "experience",
      value: 20,
      suffix: "+",
      label: "Years of expertise",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', color: '#C1121F' }}>
          <circle cx="12" cy="8" r="7" />
          <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
        </svg>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="about-stats-section"
    >
      <style>{`
        .about-stats-section {
          position: relative;
          background-color: #000000;
          padding: 80px 24px 100px 24px;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        @media (max-width: 1023px) {
          .about-stats-section {
            padding: 30px 20px 25px 20px;
          }
        }

        /* Checked background grid layer for AboutStats matching History section opacity */
        .about-stats-grid-bg {
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

        .about-stats-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .about-stats-heading {
          font-family: var(--font-heading), 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3.2vw, 2.6rem);
          font-weight: 400;
          line-height: 1.5;
          letter-spacing: 0.01em;
          color: #F5F2EC;
          text-align: center;
          margin: 0 auto 60px auto;
          max-width: 850px;
        }

        .stats-highlight {
          font-weight: 500;
          color: #F5F2EC;
        }

        .stats-cursive-highlight {
          font-family: 'Allura', cursive;
          font-size: 1.45em;
          font-weight: 400;
          letter-spacing: 0.02em;
          line-height: 1.2;
          display: inline-block;
          text-transform: none;
          vertical-align: -0.05em;
          background: linear-gradient(to bottom, #F5F2EC 15%, #FF6B6B 65%, #C1121F 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 4px;
          padding-top: 8px;
          padding-bottom: 24px;
          margin-bottom: -24px;
          padding-left: 2px;
          padding-right: 14px;
          overflow: visible;
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
        }

        .about-stat-card {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.045) 0%, rgba(255, 255, 255, 0.015) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(245, 242, 236, 0.09);
          border-radius: 14px;
          padding: 36px 30px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 10px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .about-stat-card:hover {
          transform: translateY(-6px);
          border-color: rgba(193, 18, 31, 0.5);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.65),
            0 0 35px rgba(193, 18, 31, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
        }

        .about-stat-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 10% 10%, rgba(193, 18, 31, 0.04) 0%, transparent 50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .about-stat-card:hover::before {
          opacity: 1;
        }

        .about-stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(193, 18, 31, 0.06);
          border: 1px solid rgba(193, 18, 31, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 4px 12px rgba(193, 18, 31, 0.08);
        }

        .about-stat-number {
          font-family: var(--font-heading), 'Playfair Display', Georgia, serif;
          font-size: clamp(2rem, 3.2vw, 2.5rem);
          font-weight: 500;
          color: #F5F2EC;
          margin: 0 0 10px 0;
          line-height: 1;
          letter-spacing: -0.01em;
          background: linear-gradient(180deg, #FFFFFF 40%, rgba(245, 242, 236, 0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-stat-label {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.92rem;
          color: rgba(245, 242, 236, 0.55);
          margin: 0;
          line-height: 1.4;
          letter-spacing: 0.02em;
          font-weight: 400;
        }

        @media (max-width: 1023px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .about-stats-section {
            padding: 80px 20px;
          }
        }

        @media (max-width: 639px) {
          .about-stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .about-stats-heading {
            margin-bottom: 40px;
          }
          .about-stat-card {
            padding: 24px 20px;
          }
        }
      `}</style>

      {/* Grid checked background pattern */}
      <div className="about-stats-grid-bg" />

      {/* Decorative ambient background glows */}
      <div 
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(193, 18, 31, 0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '-10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 242, 236, 0.02) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div className="about-stats-container">
        {/* Animated heading */}
        <motion.h2 
          className="about-stats-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Offers <span className="stats-highlight">personalized</span> travel solutions for{' '}
          <span className="stats-cursive-highlight">UAE</span>,{' '}
          <span className="stats-cursive-highlight">Thailand</span>,{' '}
          <span className="stats-cursive-highlight">Vietnam</span>,{' '}
          <span className="stats-cursive-highlight">Kenya</span>,{' '}
          <span className="stats-cursive-highlight">Malaysia</span>,{' '}
          <span className="stats-cursive-highlight">Singapore</span> and{' '}
          <span className="stats-cursive-highlight">Bali</span>.
        </motion.h2>

        {/* Animated stats grid */}
        <motion.div 
          className="about-stats-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat) => (
            <motion.div 
              key={stat.id}
              className="about-stat-card"
              variants={itemVariants}
            >
              <div className="about-stat-icon-wrapper">
                {stat.icon}
              </div>
              <h3 className="about-stat-number">
                {isInView ? (
                  <CountUp to={stat.value} suffix={stat.suffix} />
                ) : (
                  <span>0{stat.suffix}</span>
                )}
              </h3>
              <p className="about-stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
