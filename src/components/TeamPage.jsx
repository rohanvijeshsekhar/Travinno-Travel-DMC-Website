"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Gem, Compass, Map, Wind, Activity, Anchor } from 'lucide-react';
import { db } from '../lib/db';

const HERO_IMAGE = 'images/team_hero.png';

const GLOBAL_LOCATIONS = [
  'Dubai',
  'Thailand',
  'India',
  'Kenya',
  'Malaysia',
  'Vietnam',
  'Singapore'
];

const FINAL_TEAM_IMAGE = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920';
const faderTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const DESTINATION_METADATA = {
  'Dubai': { tagline: 'Oasis of Luxury' },
  'Thailand': { tagline: 'Tropical Horizons' },
  'India': { tagline: 'Heritage & Grandeur' },
  'Kenya': { tagline: 'Untamed Wilderness' },
  'Malaysia': { tagline: 'Rainforest Horizons' },
  'Vietnam': { tagline: 'Emerald Estuaries' },
  'Singapore': { tagline: 'Garden City Innovation' }
};

const renderLocationIcon = (locName) => {
  const size = 20;
  const strokeWidth = 1.3;
  const color = '#C1121F';
  
  switch (locName) {
    case 'Dubai': return <Compass size={size} strokeWidth={strokeWidth} color={color} />;
    case 'Thailand': return <Map size={size} strokeWidth={strokeWidth} color={color} />;
    case 'India': return <Gem size={size} strokeWidth={strokeWidth} color={color} />;
    case 'Kenya': return <Wind size={size} strokeWidth={strokeWidth} color={color} />;
    case 'Malaysia': return <Activity size={size} strokeWidth={strokeWidth} color={color} />;
    case 'Vietnam': return <Anchor size={size} strokeWidth={strokeWidth} color={color} />;
    case 'Singapore': return <Globe size={size} strokeWidth={strokeWidth} color={color} />;
    default: return <Compass size={size} strokeWidth={strokeWidth} color={color} />;
  }
};

export default function TeamPage() {
  const [teamList, setTeamList] = useState(() => db.getTeam());
  const [ctaStars, setCtaStars] = useState([]);

  useEffect(() => {
    setCtaStars(
      Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        top: `${(i * 4973 + 13) % 100}%`,
        left: `${(i * 7919 + 7) % 100}%`,
        size: ((i * 3 + 1) % 20) / 10 + 1,
        delay: `${(i * 6271 + 3) % 8}s`,
        duration: `${6 + (i * 5381 + 5) % 8}s`,
        driftX: (((i * 2053 + 11) % 40) - 20),
        driftY: (((i * 1777 + 17) % 40) - 20)
      }))
    );
  }, []);

  useEffect(() => {
    const handleUpdate = () => setTeamList(db.getTeam());
    window.addEventListener('travinno-db-update', handleUpdate);
    return () => window.removeEventListener('travinno-db-update', handleUpdate);
  }, []);

  const resolveImgPath = (src) => {
    if (!src) return '';
    if (src.startsWith('data:') || src.startsWith('http')) return src;
    const clean = src.startsWith('/') ? src.slice(1) : src;
    return `/demo/${clean}`;
  };

  // Sort team list by display order (ascending)
  const sortedTeam = [...teamList].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  // Managing Director is the executive leader (isLeader === true)
  const managingDirector = sortedTeam.find(m => m.isLeader);
  
  // Standard team members are the non-leaders
  const teamMembers = sortedTeam.filter(m => !m.isLeader);

  return (
    <div 
      style={{ 
        backgroundColor: '#050505', 
        color: '#F5F2EC', 
        width: '100%', 
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <style>{`
        /* Optimize scroll-fade rendering layers */
        .team-hero-fade {
          will-change: auto;
        }

        /* Float animation for Managing Director */
        @keyframes mdFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .md-featured-img {
          animation: mdFloat 6s ease-in-out infinite;
          max-width: 100%;
          height: auto;
          max-height: 520px;
          object-fit: contain;
        }

        /* Editorial split grid for MD */
        .md-section-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        /* Grid layout for Team members */
        .team-members-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px 40px;
          margin-top: 40px;
        }

        .team-member-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          box-sizing: border-box;
        }

        .team-member-img-wrap {
          width: 100%;
          height: 350px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          position: relative;
          overflow: visible;
          margin-bottom: 24px;
        }

        .team-member-img {
          height: 100%;
          width: auto;
          max-width: 100%;
          object-fit: contain;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, filter;
        }

        .team-member-name {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 500;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .team-member-title {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(245, 242, 236, 0.5);
          letter-spacing: 1px;
          text-transform: uppercase;
          margin: 0;
          transition: color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hover States for Team Members */
        .team-member-item:hover .team-member-img {
          transform: scale(1.05) translateY(-8px);
          filter: drop-shadow(0 15px 25px rgba(193, 18, 31, 0.35));
        }

        .team-member-item:hover .team-member-name {
          color: #C1121F;
        }

        .team-member-item:hover .team-member-title {
          color: rgba(245, 242, 236, 0.9);
        }

        .glass-box {
          width: 260px;
          height: 150px;
          padding: 20px 24px;
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 -3px 8px rgba(193, 18, 31, 0.03);
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
          position: relative;
          box-sizing: border-box;
        }

        .glass-box:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(193, 18, 31, 0.45);
          transform: translateY(-8px) scale(1.03);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4), inset 0 -4px 15px rgba(193, 18, 31, 0.2), 0 0 15px rgba(193, 18, 31, 0.15);
        }

        .glass-box-icon-container {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(193, 18, 31, 0.05);
          border: 1px solid rgba(193, 18, 31, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 14px;
          transition: all 0.35s ease;
        }

        .glass-box:hover .glass-box-icon-container {
          background: rgba(193, 18, 31, 0.1);
          border-color: rgba(193, 18, 31, 0.3);
          transform: scale(1.05);
        }





        /* Media Queries for Grid and Split */
        @media (max-width: 991px) {
          .hero-artwork-container {
            width: 100% !important;
            height: 480px !important;
            right: 0 !important;
            top: 0 !important;
            mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%) !important;
          }
          .hero-artwork-container img {
            opacity: 0.45 !important;
          }
          .md-section-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .team-members-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px 30px;
          }
        }

        @media (max-width: 600px) {
          .team-members-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      {/* Base solid black background layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#050505',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Grid lines overlay layer drawn on top of the artwork but below text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245, 242, 236, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 242, 236, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px, 50px 50px',
          backgroundRepeat: 'repeat, repeat',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* Subtle Background/Foreground Editorial Hero Artwork */}
      <div
        className="hero-artwork-container"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '54%',
          height: '580px',
          pointerEvents: 'none',
          zIndex: 1,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 70%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 70%)'
        }}
      >
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <img
            src={resolveImgPath(HERO_IMAGE)}
            alt="The Team Behind Every Journey"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.38,
              filter: 'contrast(80%) brightness(65%)',
              transition: 'opacity 0.5s ease',
              WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)'
            }}
          />
        </motion.div>
      </div>

      <div 
        className="team-hero-fade"
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '160px 24px 80px 24px', 
          boxSizing: 'border-box' 
        }}
      >
        
        {/* 1. HERO SECTION */}
        <section style={{ marginBottom: '70px', position: 'relative' }}>
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 3 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={faderTransition}
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
                letterSpacing: '0.05em',
                color: 'rgba(245, 242, 236, 0.85)',
                marginBottom: '16px',
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
              TEAM
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 450,
                lineHeight: 1.15,
                color: '#F5F2EC',
                margin: '0 0 16px 0',
                letterSpacing: '-0.5px'
              }}
            >
              The People Behind <br />
              <span
                style={{
                  fontFamily: "'Allura', cursive",
                  fontSize: '1.25em',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  lineHeight: '1.2',
                  display: 'inline-block',
                  marginTop: '-4px',
                  paddingBottom: '0px',
                  background: 'linear-gradient(to bottom, #F5F2EC 20%, #E8A7A7 60%, #C1121F 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Every Journey
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                lineHeight: 1.65,
                color: '#F5F2EC',
                margin: 0,
                maxWidth: '680px',
                fontWeight: 300
              }}
            >
              Behind every unforgettable journey is a passionate team of travel specialists, destination experts, and professionals committed to delivering exceptional experiences.
            </motion.p>
          </div>
        </section>



        {/* 2. MANAGING DIRECTOR SECTION */}
        {managingDirector && (
          <section style={{ marginBottom: '140px', position: 'relative' }}>
            <div className="md-section-grid">
              
              {/* Left Side: Transparent floating PNG image */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img
                  src={resolveImgPath(managingDirector.image)}
                  alt={`${managingDirector.name} - Managing Director`}
                  className="md-featured-img"
                />
              </div>

              {/* Right Side: Introduction & Signature */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#C1121F',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px'
                  }}>
                    {managingDirector.position || 'Managing Director'}
                  </span>
                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                    fontWeight: 450,
                    color: '#F5F2EC',
                    margin: 0,
                    letterSpacing: '-0.5px'
                  }}>
                    {managingDirector.name}
                  </h2>
                </div>

                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  color: 'rgba(245, 242, 236, 0.7)',
                  fontWeight: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}>
                  {managingDirector.bio ? (
                    managingDirector.bio.split('\n\n').map((para, idx) => (
                      <p key={idx} style={{ margin: 0 }}>{para}</p>
                    ))
                  ) : (
                    <p style={{ margin: 0 }}>No personal message configured.</p>
                  )}
                </div>

                {managingDirector.signature && (
                  <div style={{ marginTop: '20px' }}>
                    <span style={{
                      fontFamily: "'Allura', cursive",
                      fontSize: '2.5rem',
                      color: '#F5F2EC',
                      display: 'inline-block',
                      background: 'linear-gradient(to right, #F5F2EC 30%, #E8A7A7 70%, #C1121F 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      transform: 'rotate(-4deg)'
                    }}>
                      {managingDirector.signature}
                    </span>
                  </div>
                )}
              </div>

            </div>
          </section>
        )}

        {/* 3. TEAM MEMBERS SECTION */}
        <section style={{ marginBottom: '140px', position: 'relative' }}>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 450,
            color: '#F5F2EC',
            marginBottom: '40px',
            letterSpacing: '-0.5px'
          }}>
            Our <span className="journey-allura-text" style={{ marginLeft: '6px' }}>Specialists</span>
          </h2>

          <div className="team-members-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member-item">
                <div className="team-member-img-wrap">
                  {member.image ? (
                    <img
                      src={resolveImgPath(member.image)}
                      alt={`${member.name} - ${member.position}`}
                      className="team-member-img"
                    />
                  ) : (
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                  )}
                </div>
                <h4 className="team-member-name">{member.name}</h4>
                <p className="team-member-title">{member.position}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. GLOBAL TEAM LOCATIONS */}
        <section 
          style={{
            backgroundColor: '#050505',
            padding: '120px 0',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '0px'
          }}
        >
          {/* Subtle red radial glow at the center */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(193, 18, 31, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
              filter: 'blur(60px)',
              zIndex: 1,
              pointerEvents: 'none'
            }}
          />

          {/* Background travel network illustrations (Increased opacity to 10%) */}
          <div 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              pointerEvents: 'none', 
              zIndex: 1, 
              overflow: 'hidden', 
              opacity: 0.10
            }}
          >
            <svg viewBox="0 0 1440 600" fill="none" stroke="#F5F2EC" strokeWidth="1" style={{ width: '100%', height: '100%' }}>
              <g transform="translate(1200, 120)">
                <circle cx="0" cy="0" r="80" strokeDasharray="3,3" />
                <circle cx="0" cy="0" r="10" />
                <path d="M 0,-110 L 10,-20 L 0,0 L -10,-20 Z" fill="#F5F2EC" />
                <path d="M 0,110 L 10,20 L 0,0 L -10,20 Z" />
                <path d="M 110,0 L 20,10 L 0,0 L 20,-10 Z" fill="#F5F2EC" />
                <path d="M -110,0 L -20,10 L 0,0 L -20,-10 Z" />
              </g>

              <g transform="translate(100, 80)">
                <path d="M 150,120 L 320,100 L 480,220 L 680,180 L 850,300 L 1050,220" strokeWidth="0.75" strokeDasharray="5,5" />
                <path d="M 320,100 L 520,320 L 680,180 M 480,220 L 520,320 M 850,300 L 900,450" strokeWidth="0.75" strokeDasharray="5,5" />
                <path d="M 150,120 Q 350,50 680,180" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 480,220 Q 700,100 1050,220" strokeWidth="1" strokeDasharray="2,2" />
                <path d="M 520,320 Q 700,400 850,300" strokeWidth="1" strokeDasharray="2,2" />
                
                <circle cx="150" cy="120" r="4" fill="#F5F2EC" />
                <circle cx="320" cy="100" r="4" fill="#F5F2EC" />
                <circle cx="480" cy="220" r="4" fill="#F5F2EC" />
                <circle cx="680" cy="180" r="4" fill="#F5F2EC" />
                <circle cx="850" cy="300" r="4" fill="#F5F2EC" />
                <circle cx="1050" cy="220" r="4" fill="#F5F2EC" />
                <circle cx="520" cy="320" r="4" fill="#F5F2EC" />
                <circle cx="900" cy="450" r="4" fill="#F5F2EC" />

                <line x1="0" y1="150" x2="1200" y2="150" strokeDasharray="10,10" strokeWidth="0.5" />
                <line x1="0" y1="300" x2="1200" y2="300" strokeDasharray="10,10" strokeWidth="0.5" />
                <line x1="400" y1="0" x2="400" y2="500" strokeDasharray="10,10" strokeWidth="0.5" />
                <line x1="800" y1="0" x2="800" y2="500" strokeDasharray="10,10" strokeWidth="0.5" />

                <text x="20" y="140" fill="#F5F2EC" fontSize="10" fontFamily="monospace">N 25° 15' 47" / E 55° 17' 52"</text>
                <text x="820" y="290" fill="#F5F2EC" fontSize="10" fontFamily="monospace">N 1° 21' 53" / E 103° 49' 11"</text>
              </g>
            </svg>
          </div>

          {/* Left Side Travel Illustration (Increased opacity to 10%) */}
          <div 
            style={{ 
              position: 'absolute', 
              left: '2%', 
              top: '55%', 
              transform: 'translateY(-50%)', 
              width: '260px', 
              height: '260px', 
              opacity: 0.10, 
              pointerEvents: 'none', 
              zIndex: 1 
            }}
          >
            <svg viewBox="0 0 200 200" fill="none" stroke="#F5F2EC" strokeWidth="0.8">
              <circle cx="100" cy="100" r="90" strokeDasharray="3,3" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="50" />
              <circle cx="100" cy="100" r="15" />
              <path d="M 100,10 L 100,190 M 10,100 L 190,100" />
              <path d="M 36.36,36.36 L 163.64,163.64 M 36.36,163.64 L 163.64,36.36" strokeDasharray="2,2" />
              <polygon points="100,20 105,80 95,80" fill="#F5F2EC" />
              <polygon points="100,180 105,120 95,120" />
              <polygon points="20,100 80,105 80,95" fill="#F5F2EC" />
              <polygon points="180,100 120,105 120,95" />
              <text x="96" y="16" fill="#F5F2EC" fontSize="8" fontFamily="sans-serif" fontWeight="bold">N</text>
              <text x="97" y="191" fill="#F5F2EC" fontSize="8" fontFamily="sans-serif" fontWeight="bold">S</text>
              <text x="183" y="103" fill="#F5F2EC" fontSize="8" fontFamily="sans-serif" fontWeight="bold">E</text>
              <text x="10" y="103" fill="#F5F2EC" fontSize="8" fontFamily="sans-serif" fontWeight="bold">W</text>
            </svg>
          </div>

          {/* Right Side Travel Illustration (Increased opacity to 10%) */}
          <div 
            style={{ 
              position: 'absolute', 
              right: '2%', 
              top: '55%', 
              transform: 'translateY(-50%)', 
              width: '260px', 
              height: '260px', 
              opacity: 0.10, 
              pointerEvents: 'none', 
              zIndex: 1 
            }}
          >
            <svg viewBox="0 0 200 200" fill="none" stroke="#F5F2EC" strokeWidth="0.8">
              <ellipse cx="100" cy="100" rx="90" ry="40" />
              <ellipse cx="100" cy="100" rx="90" ry="15" />
              <ellipse cx="100" cy="100" rx="90" ry="70" />
              <ellipse cx="100" cy="100" rx="40" ry="90" />
              <ellipse cx="100" cy="100" rx="15" ry="90" />
              <ellipse cx="100" cy="100" rx="70" ry="90" />
              <circle cx="100" cy="100" r="90" />
              <path d="M 20,120 Q 90,20 180,100" strokeWidth="1" strokeDasharray="3,3" />
              <path d="M 180,100 L 175,93 L 180,95 L 186,96 Z" fill="#F5F2EC" />
              <circle cx="45" cy="55" r="2.5" fill="#F5F2EC" />
              <circle cx="140" cy="45" r="2" fill="#F5F2EC" />
              <circle cx="155" cy="140" r="2.5" fill="#F5F2EC" />
              <circle cx="75" cy="165" r="2" fill="#F5F2EC" />
            </svg>
          </div>

          {/* Bottom Left Skyline Illustration (Increased opacity to 10%) */}
          <div 
            style={{ 
              position: 'absolute', 
              left: '1%', 
              bottom: '0', 
              width: '350px', 
              height: '110px', 
              opacity: 0.10, 
              pointerEvents: 'none', 
              zIndex: 1 
            }}
          >
            <svg viewBox="0 0 300 100" fill="none" stroke="#F5F2EC" strokeWidth="0.8" style={{ width: '100%', height: '100%' }}>
              <path d="M 10,100 L 25,50 L 28,50 L 32,25 L 36,50 L 39,50 L 54,100" />
              <line x1="28" y1="60" x2="36" y2="60" />
              <line x1="30" y1="75" x2="34" y2="75" />
              <path d="M 70,100 L 70,80 L 78,80 L 78,72 C 78,60 92,60 92,72 L 92,80 L 100,80 L 100,100" />
              <path d="M 64,100 L 64,65 L 66,65 L 66,100" />
              <path d="M 106,100 L 106,65 L 108,65 L 108,100" />
              <path d="M 125,100 C 160,90 185,50 160,10 L 150,10 L 150,100" />
              <path d="M 150,25 C 165,35 170,55 150,65" />
              <path d="M 150,5 C 190,15 180,100 180,100" />
              <path d="M 210,100 L 215,80 L 217,80 L 217,55 L 219,55 L 219,10 L 221,10 L 221,55 L 223,55 L 223,80 L 225,80 L 230,100" />
              <line x1="210" y1="100" x2="230" y2="100" />
              <line x1="0" y1="100" x2="300" y2="100" strokeWidth="1" />
            </svg>
          </div>

          {/* Bottom Right Skyline Illustration (Increased opacity to 10%) */}
          <div 
            style={{ 
              position: 'absolute', 
              right: '1%', 
              bottom: '0', 
              width: '350px', 
              height: '110px', 
              opacity: 0.10, 
              pointerEvents: 'none', 
              zIndex: 1 
            }}
          >
            <svg viewBox="0 0 300 100" fill="none" stroke="#F5F2EC" strokeWidth="0.8" style={{ width: '100%', height: '100%' }}>
              <path d="M 20,100 L 25,50 L 35,50 L 40,100" />
              <path d="M 48,100 L 53,50 L 63,50 L 68,100" />
              <path d="M 76,100 L 81,50 L 91,50 L 96,100" />
              <path d="M 18,48 C 50,43 75,43 102,48 L 98,54 C 75,49 50,49 22,54 Z" fill="rgba(245,242,236,0.03)" />
              <path d="M 135,100 L 140,40 L 144,40 L 144,12 L 146,12 L 146,40 L 150,40 L 155,100" />
              <path d="M 175,100 L 180,40 L 184,40 L 184,12 L 186,12 L 186,40 L 190,40 L 195,100" />
              <path d="M 149,60 L 181,60 M 149,64 L 181,64" />
              <path d="M 225,100 C 230,85 240,85 245,92 C 248,80 260,80 265,100" />
              <path d="M 270,100 C 273,92 280,92 285,100" />
              <line x1="0" y1="100" x2="300" y2="100" strokeWidth="1" />
            </svg>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ textAlign: 'center', marginBottom: '60px' }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '2.5px',
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '12px'
              }}>
                OUR GLOBAL PRESENCE
              </span>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 450,
                color: '#F5F2EC',
                margin: '0 0 16px 0',
                letterSpacing: '-0.5px'
              }}>
                Where We Create <span className="journey-allura-text" style={{ marginLeft: '4px' }}>Experiences</span>
              </h2>
              <p style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                color: 'rgba(245, 242, 236, 0.65)',
                margin: 0,
                fontWeight: 300
              }}>
                Providing bespoke hospitality and seamless destination management services across key global regions.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', flexWrap: 'wrap' }}>
                {GLOBAL_LOCATIONS.slice(0, 4).map((loc) => {
                  const meta = DESTINATION_METADATA[loc] || { tagline: 'Luxury Travel Partner' };
                  return (
                    <div key={loc} className="glass-box">
                      <div className="glass-box-icon-container">
                        {renderLocationIcon(loc)}
                      </div>
                      <span 
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          letterSpacing: '1px',
                          color: '#FFFFFF',
                          marginBottom: '6px'
                        }}
                      >
                        {loc}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 400,
                          color: 'rgba(255, 255, 255, 0.45)',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {meta.tagline}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', width: '100%', flexWrap: 'wrap' }}>
                {GLOBAL_LOCATIONS.slice(4).map((loc) => {
                  const meta = DESTINATION_METADATA[loc] || { tagline: 'Luxury Travel Partner' };
                  return (
                    <div key={loc} className="glass-box">
                      <div className="glass-box-icon-container">
                        {renderLocationIcon(loc)}
                      </div>
                      <span 
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '1.2rem',
                          fontWeight: 500,
                          letterSpacing: '1px',
                          color: '#FFFFFF',
                          marginBottom: '6px'
                        }}
                      >
                        {loc}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.72rem',
                          fontWeight: 400,
                          color: 'rgba(255, 255, 255, 0.45)',
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {meta.tagline}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. JOIN OUR JOURNEY CTA (Orange Gradient Space Theme) */}
        <section
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '50vh',
            backgroundColor: '#050505',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px 24px',
            boxSizing: 'border-box',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <style>{`
            @keyframes starMoveTeam {
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
            .animate-star-move-team {
              animation-name: starMoveTeam;
            }
          `}</style>

          {/* Starry Space Background */}
          <div 
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
            {ctaStars.map((star) => (
              <span
                key={star.id}
                className="animate-star-move-team"
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
          </div>

          {/* Faint background outline typography */}
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

          {/* Cherry Red Glowing Gradients & Footer Blending */}
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '300px',
              background: 'linear-gradient(to top, rgba(193, 18, 31, 0.28) 0%, rgba(193, 18, 31, 0.08) 50%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '-120px',
              left: '-10%',
              width: '55%',
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
              right: '-10%',
              width: '55%',
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
              bottom: '-100px',
              left: '20%',
              width: '60%',
              height: '240px',
              background: 'radial-gradient(circle, rgba(193, 18, 31, 0.42) 0%, transparent 70%)',
              filter: 'blur(80px)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '140px',
              background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
              pointerEvents: 'none',
              zIndex: 2
            }}
          />

          <div style={{ position: 'relative', zIndex: 3, maxWidth: '720px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                border: '1px solid rgba(193, 18, 31, 0.25)',
                borderRadius: '100px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '16px',
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
              Explore active opportunities
            </span>
            
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              color: '#F5F2EC',
              margin: '0 0 16px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <span>Join Our</span>
              <span className="journey-allura-text" style={{ marginTop: '4px' }}>Team</span>
            </h2>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              lineHeight: 1.65,
              color: 'rgba(255, 255, 255, 0.65)',
              maxWidth: '560px',
              margin: '0 auto 36px auto',
              fontWeight: 300
            }}>
              We're always looking for passionate professionals who believe in designing exceptional travel experiences. Explore active roles across our global offices.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/demo/careers/"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: '#000000',
                  backgroundColor: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '12px 32px',
                  borderRadius: '100px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C1121F';
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(193, 18, 31, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.color = '#000000';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.1)';
                }}
              >
                Explore Careers
              </a>
              <a 
                href="/demo/contact/"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '1px',
                  color: '#FFFFFF',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  textDecoration: 'none',
                  padding: '12px 32px',
                  borderRadius: '100px',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

    </div>
  );
}
