"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../lib/db';

// Travinno location pin coordinates from scratch_logo_paths.json
const PIN_PATHS = {
  outer: "M 42.66,97.50 L 43.48,99.12 L 44.57,100.75 L 45.92,102.38 L 47.28,103.73 L 48.91,105.08 L 50.54,106.17 L 52.17,106.98 L 53.80,107.52 L 55.43,108.06 L 57.07,108.60 L 58.15,109.15 L 56.52,110.50 L 54.89,111.85 L 53.26,113.48 L 51.63,114.83 L 50.00,116.19 L 48.37,115.10 L 46.74,113.48 L 45.11,112.12 L 43.48,110.50 L 41.85,109.15 L 40.22,107.52 L 38.59,106.17 L 36.96,104.54 L 35.33,103.19 L 33.70,101.56 L 32.07,100.21 L 30.43,98.58 L 28.80,96.96 L 27.17,95.33 L 25.54,93.71 L 23.91,92.08 L 22.55,90.46 L 20.92,88.83 L 19.57,87.21 L 18.21,85.58 L 17.12,83.96 L 15.76,82.33 L 14.67,80.71 L 13.59,79.08 L 12.50,77.46 L 11.68,75.83 L 10.87,74.21 L 10.05,72.58 L 9.24,70.96 L 8.70,69.33 L 8.15,67.71 L 7.61,66.08 L 7.34,64.46 L 7.07,62.83 L 6.79,61.21 L 6.52,59.58 L 6.52,57.96 L 6.52,56.33 L 6.52,54.71 L 6.52,53.08 L 6.79,51.46 L 7.07,49.83 L 7.34,48.21 L 7.61,46.58 L 8.15,44.96 L 8.70,43.33 L 9.24,41.71 L 9.78,40.08 L 10.60,38.46 L 11.41,36.83 L 12.23,35.21 L 13.32,33.58 L 14.40,31.96 L 15.76,30.33 L 17.12,28.71 L 18.48,27.08 L 20.11,25.73 L 21.74,24.10 L 23.37,23.02 L 25.00,21.67 L 26.63,20.58 L 28.26,19.77 L 29.89,18.69 L 31.52,18.15 L 33.15,17.33 L 34.78,16.79 L 36.41,15.98 L 38.04,15.71 L 39.67,15.17 L 41.30,14.90 L 42.93,14.62 L 44.57,14.35 L 45.92,14.08 L 47.55,14.08 L 49.18,14.08 L 50.82,14.08 L 52.45,14.08 L 54.08,14.08 L 55.71,14.35 L 57.34,14.62 L 58.97,14.90 L 60.60,15.44 L 62.23,15.71 L 63.86,16.25 L 65.49,16.79 L 67.12,17.60 L 68.75,18.15 L 70.38,18.96 L 72.01,20.04 L 73.64,20.85 L 75.27,21.94 L 76.90,23.29 L 78.53,24.65 L 80.16,26.00 L 81.79,27.62 L 83.15,29.25 L 84.51,30.88 L 85.60,32.50 L 86.68,34.12 L 87.77,35.75 L 88.59,37.38 L 89.40,39.00 L 90.22,40.62 L 90.76,42.25 L 91.30,43.88 L 91.85,45.50 L 92.12,47.12 L 92.66,48.75 L 92.93,50.38 L 92.93,52.00 L 93.21,53.62 L 93.21,55.25 L 93.21,56.88 L 93.21,58.50 L 93.21,60.12 L 92.93,61.75 L 92.66,63.38 L 92.39,65.00 L 91.85,66.62 L 91.30,68.25 L 90.76,69.88 L 90.22,71.50 L 89.40,73.12 L 88.59,74.75 L 87.77,76.38 L 86.96,78.00 L 85.87,79.62 L 84.78,81.25 L 83.70,82.88 L 82.34,84.50 L 81.25,86.12 L 79.89,87.75 L 79.08,88.56 Z",
  inner: "M 78.80,88.83 L 77.99,89.92 L 76.90,91.00 L 76.09,92.08 L 75.00,92.62 L 73.91,93.17 L 72.83,93.44 L 71.74,93.71 L 70.65,93.98 L 69.57,93.98 L 68.48,94.25 L 67.39,94.25 L 66.30,93.98 L 65.22,93.71 L 64.13,93.44 L 63.04,92.90 L 61.96,92.08 L 61.14,91.00 L 60.60,89.92 L 60.33,88.83 L 60.05,87.75 L 59.78,86.67 L 59.78,85.58 L 59.78,84.50 L 59.78,83.42 L 59.78,82.33 L 59.78,81.25 L 59.78,80.17 L 59.78,79.08 L 59.78,78.00 L 59.78,76.92 L 59.78,75.83 L 59.78,74.75 L 59.78,73.67 L 59.78,72.58 L 59.78,71.50 L 59.78,70.42 L 59.78,69.33 L 59.78,68.25 L 59.78,67.17 L 59.78,66.08 L 59.78,65.00 L 59.78,63.92 L 59.78,62.83 L 59.78,61.75 L 59.78,60.67 L 59.78,59.58 L 60.05,58.50 L 61.14,58.50 L 62.23,58.50 L 63.32,58.50 L 64.40,58.50 L 65.49,58.50 L 66.58,58.50 L 67.66,58.50 L 68.75,58.50 L 69.84,58.50 L 70.92,58.50 L 72.01,58.50 L 73.10,58.50 L 74.18,58.50 L 75.27,58.50 L 76.36,58.23 L 76.36,57.15 L 76.36,56.06 L 76.36,54.98 L 76.36,53.90 L 76.36,52.81 L 76.36,51.73 L 76.36,50.65 L 76.36,49.56 L 76.36,48.48 L 76.36,47.40 L 76.36,46.31 L 76.36,45.23 L 76.36,44.15 L 75.27,43.88 L 74.18,43.88 L 73.10,43.88 L 72.01,43.88 L 70.92,43.88 L 69.84,43.88 L 68.75,43.88 L 67.66,43.88 L 66.58,43.88 L 65.49,43.88 L 64.40,43.88 L 63.32,43.88 L 62.23,43.88 L 61.14,43.88 L 60.05,43.88 L 59.78,42.79 L 59.78,41.71 L 59.78,40.62 L 59.78,39.54 L 59.78,38.46 L 59.78,37.38 L 59.78,36.29 L 59.78,35.21 L 59.78,34.12 L 59.78,33.04 L 59.78,31.96 L 59.78,30.88 L 59.78,29.79 L 59.78,28.71 L 59.51,27.62 L 58.42,27.62 L 57.34,27.62 L 56.25,27.62 L 55.16,27.62 L 54.08,27.62 L 52.99,27.62 L 51.90,27.62 L 50.82,27.62 L 49.73,27.62 L 48.64,27.62 L 47.55,27.62 L 46.47,27.62 L 45.38,27.62 L 44.29,27.62 L 43.21,27.62 L 42.12,27.62 L 41.03,27.62 L 40.22,28.17 L 40.22,29.25 L 40.22,30.33 L 40.22,31.42 L 40.22,32.50 L 40.22,33.58 L 40.22,34.67 L 40.22,35.75 L 40.22,36.83 L 40.22,37.92 L 40.22,39.00 L 40.22,40.08 L 40.22,41.17 L 40.22,42.25 L 40.22,43.33 L 40.22,44.42 L 40.22,45.50 L 40.22,46.58 L 40.22,47.67 L 40.22,48.75 L 40.22,49.83 L 40.22,50.92 L 40.22,52.00 L 40.22,53.08 L 40.22,54.17 L 40.22,55.25 L 40.22,56.33 L 40.22,57.42 L 40.22,58.50 L 40.22,59.58 L 40.22,60.67 L 40.22,61.75 L 40.22,62.83 L 40.22,63.92 L 40.22,65.00 L 40.22,66.08 L 40.22,67.17 L 40.22,68.25 L 40.22,69.33 L 40.22,70.42 L 40.22,71.50 L 40.22,72.58 L 40.22,73.67 L 40.22,74.75 L 40.22,75.83 L 40.22,76.92 L 40.22,78.00 L 40.22,79.08 L 40.22,80.17 L 40.22,81.25 L 40.22,82.33 L 40.22,83.42 L 40.22,84.50 L 40.22,85.58 L 40.22,86.67 L 40.22,87.75 L 40.49,88.83 L 40.49,89.92 L 40.76,91.00 L 40.76,92.08 L 41.03,93.17 L 41.30,94.25 L 41.58,95.33 L 42.12,96.42 L 42.66,97.50 Z"
};

const PARTNER_NAMES = [
  "One&Only Resorts", "Marriott Bonvoy", "Emirates Airline", "Singapore Airlines", "Anantara Hotels",
  "Ritz-Carlton", "Four Seasons Hotels", "Qatar Airways", "Jumeirah Hotels", "Banyan Tree",
  "Aman Resorts", "Mandarin Oriental", "Rosewood Hotels", "Shangri-La Hotels", "Belmond",
  "Six Senses", "Soneva Resorts", "Abercrombie & Kent", "Virtuoso Travel", "Signature Travel Network",
  "Serandipians", "Preferred Hotels", "Relais & Châteaux", "Small Luxury Hotels", "The Peninsula Hotels",
  "St. Regis Hotels", "Waldorf Astoria", "Conrad Hotels", "Park Hyatt", "InterContinental",
  "Kempinski Hotels", "Taj Hotels", "Oberoi Hotels", "Alila Hotels", "Como Hotels",
  "Singita Lodges", "Cheval Blanc", "LVMH Hospitality", "Red Carnation Hotels", "Rocco Forte Hotels",
  "Oetker Collection", "Auberge Resorts", "Montage Hotels", "Kerzner International", "Luxury Gold",
  "Trafalgar Tours", "Uniworld Cruises", "Silversea Cruises", "Regent Seven Seas", "Seabourn Cruises",
  "Belmond Train Services", "Orient Express"
];

// Generate list of 52 partners pointing to the user's WebP assets in public/partners
const PARTNERS_DATA = Array.from({ length: 52 }, (_, i) => {
  const num = i + 1;
  return {
    id: num,
    src: `/partners/partner-${num}.webp`,
    alt: PARTNER_NAMES[i] || `Luxury Travel Partner ${num}`
  };
});

// Component for rendering WebP logos with proportional widths and hover filters
const PartnerLogo = ({ partner }) => {
  const finalSrc = partner.src && (partner.src.startsWith('data:') || partner.src.startsWith('http') || partner.src.startsWith('https:'))
    ? partner.src
    : (partner.src.startsWith('/') ? partner.src : `/${partner.src}`);

  return (
    <div className="partner-logo-item">
      <img 
        src={finalSrc} 
        alt={partner.alt} 
        className="partner-logo-img animate-fade-in"
        loading="lazy"
        decoding="async"
        width="120"
        height="40"
      />
    </div>
  );
};

// Component for Travinno Pin divider
const TravinnoPin = () => (
  <div className="pin-divider">
    <svg viewBox="0 0 100 125" className="w-full h-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d={PIN_PATHS.outer} />
      <path d={PIN_PATHS.inner} />
    </svg>
  </div>
);
// Subcomponent: Background Illustrations matching the pattern of other sections
const BackgroundIllustrations = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    setIsMobile(media.matches);
    const listener = (e) => setIsMobile(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  return (
    <div className="logo-cloud-bg-illustrations">
      <svg
        viewBox="0 0 1920 600"
        fill="none"
        stroke="#F3EEE6"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        preserveAspectRatio={isMobile ? "xMaxYMid slice" : "xMidYMid slice"}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Scenic editorial line-art travel scene (strokeOpacity 0.06-0.08) */}
        <g strokeOpacity="0.08">

          {/* RIGHT SCENE: Global Infrastructure & Partner Welcoming */}
          
          {/* Modern Skyline */}
          <g transform="translate(1280, 180)">
            <path d="M 0,300 L 0,40 L 10,20 L 20,40 L 20,300" />
            <path d="M 35,300 L 35,70 L 65,45 L 65,300" />
            <path d="M 80,300 L 80,120 L 92,120 L 92,90 L 105,90 L 105,300" />
            <path d="M 120,300 L 120,30 L 123,0 L 126,30 L 126,300" />
            <line x1="8" y1="50" x2="8" y2="280" strokeDasharray="4,8" strokeWidth="0.8" />
            <line x1="12" y1="50" x2="12" y2="280" strokeDasharray="4,8" strokeWidth="0.8" />
            <line x1="48" y1="70" x2="48" y2="280" strokeDasharray="5,10" strokeWidth="0.8" />
            <line x1="56" y1="70" x2="56" y2="280" strokeDasharray="5,10" strokeWidth="0.8" />
          </g>

          {/* Professionals Greeting */}
          <g transform="translate(1460, 370)">
            <circle cx="10" cy="15" r="4" />
            <path d="M 10,19 Q 12,30 11,46" />
            <path d="M 10,22 Q 18,24 23,20" />
            <line x1="8" y1="46" x2="6" y2="65" />
            <line x1="12" y1="46" x2="14" y2="65" />
          </g>
          <g transform="translate(1495, 370)">
            <circle cx="10" cy="15" r="4" />
            <path d="M 10,19 Q 7,30 9,46" />
            <path d="M 10,22 Q 4,24 6,29 C 7,30 9,28 10,27" />
            <line x1="7" y1="46" x2="7" y2="65" />
            <line x1="11" y1="46" x2="11" y2="65" />
          </g>

          {/* Airport Terminal Architecture */}
          <g transform="translate(1540, 200)">
            <path d="M 0,280 Q 60,60 180,100 Q 240,120 300,180" />
            <path d="M 10,280 Q 60,80 180,120 Q 240,140 295,200" />
            <line x1="70" y1="85" x2="35" y2="280" />
            <line x1="140" y1="100" x2="105" y2="280" />
            <line x1="210" y1="130" x2="175" y2="280" />
            <line x1="0" y1="260" x2="300" y2="260" />
            <line x1="50" y1="160" x2="42" y2="260" strokeWidth="0.8" />
            <line x1="120" y1="130" x2="112" y2="260" strokeWidth="0.8" />
            <line x1="190" y1="145" x2="182" y2="260" strokeWidth="0.8" />
          </g>

          {/* Airplane taking off */}
          <g transform="translate(1680, 80) rotate(-22) scale(1.1)">
            <path d="M -220,50 Q -110,25 0,0" strokeDasharray="2,4" opacity="0.6" />
            <path d="M-15,0 L5,0 L18,-4 L21,0 L18,4 L5,0 L-6,11 L-9,11 L-5,0 L-12,0 L-15,3 L-16.5,3 L-15,0 L-16.5,-3 L-15,-3 L-12,0 L-5,0 L-9,-11 L-7,-11 Z" strokeWidth="1.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

function LogoCloudSection() {
  const marqueeRef = useRef(null);
  const [partners, setPartners] = useState(() => {
    const dbLogos = db.getLogos();
    return dbLogos.map((src, i) => ({
      id: i,
      src,
      alt: PARTNER_NAMES[i] || `Luxury Travel Partner ${i + 1}`
    }));
  });

  useEffect(() => {
    const handleUpdate = () => {
      const updated = db.getLogos();
      setPartners(updated.map((src, i) => ({
        id: i,
        src,
        alt: PARTNER_NAMES[i] || `Luxury Travel Partner ${i + 1}`
      })));
    };
    window.addEventListener('travinno-db-update', handleUpdate);
    return () => window.removeEventListener('travinno-db-update', handleUpdate);
  }, []);

  // Pause the CSS marquee animation when the section is off-screen
  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const track = el.querySelector('.partners-marquee-track');
        if (track) {
          track.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
        }
      },
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pre-generate loop elements for the marquee track
  const marqueeItems = partners.map((partner) => ({ type: 'logo', data: partner }));

  // Duplicate the entire set of items to create a seamless infinite track
  const loopTrack = [...marqueeItems, ...marqueeItems];

  return (
    <section ref={marqueeRef} className="logo-cloud-section">
      {/* Editorial subtle grid blend overlay */}
      <div className="section-blend-overlay blend-to-05" style={{ pointerEvents: 'none' }} />

      <BackgroundIllustrations />

      <div className="logo-cloud-container">
        {/* Header Section */}
        <div className="logo-cloud-header">
          <motion.span
            className="logo-cloud-title"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <span className="red-dot" /> Our Global Network
          </motion.span>
          
          <motion.h2
            className="logo-cloud-main-heading"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            Trusted by Industry{' '}
            <span className="leaders-allura-text">Leaders</span>
          </motion.h2>
          
          <motion.p
            className="logo-cloud-intro"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            Proudly partnering with leading hotels, tourism boards, airlines and destination experts across the world.
          </motion.p>
        </div>

        {/* Continuous Infinite Marquee Row */}
        <div className="partners-marquee-container">
          <div className="partners-marquee-track">
            {loopTrack.map((item, idx) => {
              if (item.type === 'logo') {
                return (
                  <PartnerLogo 
                    key={`logo-${item.data.id}-${idx}`} 
                    partner={item.data} 
                  />
                );
              } else {
                return (
                  <TravinnoPin 
                    key={`pin-divider-${idx}`} 
                  />
                );
              }
            })}
          </div>
        </div>


        {/* Separator Line */}
        <motion.div
          className="partners-separator-line"
          initial={{ opacity: 0, scaleX: 0.8 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 }}
        />
      </div>
    </section>
  );
}
export default React.memo(LogoCloudSection);
