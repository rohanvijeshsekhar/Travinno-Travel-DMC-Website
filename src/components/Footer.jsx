"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

const innerTPath = "M 78.80,88.83 L 77.99,89.92 L 76.90,91.00 L 76.09,92.08 L 75.00,92.62 L 73.91,93.17 L 72.83,93.44 L 71.74,93.71 L 70.65,93.98 L 69.57,93.98 L 68.48,94.25 L 67.39,94.25 L 66.30,93.98 L 65.22,93.71 L 64.13,93.44 L 63.04,92.90 L 61.96,92.08 L 61.14,91.00 L 60.60,89.92 L 60.33,88.83 L 60.05,87.75 L 59.78,86.67 L 59.78,85.58 L 59.78,84.50 L 59.78,83.42 L 59.78,82.33 L 59.78,81.25 L 59.78,80.17 L 59.78,79.08 L 59.78,78.00 L 59.78,76.92 L 59.78,75.83 L 59.78,74.75 L 59.78,73.67 L 59.78,72.58 L 59.78,71.50 L 59.78,70.42 L 59.78,69.33 L 59.78,68.25 L 59.78,67.17 L 59.78,66.08 L 59.78,65.00 L 59.78,63.92 L 59.78,62.83 L 59.78,61.75 L 59.78,60.67 L 59.78,59.58 L 60.05,58.50 L 61.14,58.50 L 62.23,58.50 L 63.32,58.50 L 64.40,58.50 L 65.49,58.50 L 66.58,58.50 L 67.66,58.50 L 68.75,58.50 L 69.84,58.50 L 70.92,58.50 L 72.01,58.50 L 73.10,58.50 L 74.18,58.50 L 75.27,58.50 L 76.36,58.23 L 76.36,57.15 L 76.36,56.06 L 76.36,54.98 L 76.36,53.90 L 76.36,52.81 L 76.36,51.73 L 76.36,50.65 L 76.36,49.56 L 76.36,48.48 L 76.36,47.40 L 76.36,46.31 L 76.36,45.23 L 76.36,44.15 L 75.27,43.88 L 74.18,43.88 L 73.10,43.88 L 72.01,43.88 L 70.92,43.88 L 69.84,43.88 L 68.75,43.88 L 67.66,43.88 L 66.58,43.88 L 65.49,43.88 L 64.40,43.88 L 63.32,43.88 L 62.23,43.88 L 61.14,43.88 L 60.05,43.88 L 59.78,42.79 L 59.78,41.71 L 59.78,40.62 L 59.78,39.54 L 59.78,38.46 L 59.78,37.38 L 59.78,36.29 L 59.78,35.21 L 59.78,34.12 L 59.78,33.04 L 59.78,31.96 L 59.78,30.88 L 59.78,29.79 L 59.78,28.71 L 59.51,27.62 L 58.42,27.62 L 57.34,27.62 L 56.25,27.62 L 55.16,27.62 L 54.08,27.62 L 52.99,27.62 L 51.90,27.62 L 50.82,27.62 L 49.73,27.62 L 48.64,27.62 L 47.55,27.62 L 46.47,27.62 L 45.38,27.62 L 44.29,27.62 L 43.21,27.62 L 42.12,27.62 L 41.03,27.62 L 40.22,28.17 L 40.22,29.25 L 40.22,30.33 L 40.22,31.42 L 40.22,32.50 L 40.22,33.58 L 40.22,34.67 L 40.22,35.75 L 40.22,36.83 L 40.22,37.92 L 40.22,39.00 L 40.22,40.08 L 40.22,41.17 L 40.22,42.25 L 40.22,43.33 L 40.22,44.42 L 40.22,45.50 L 40.22,46.58 L 40.22,47.67 L 40.22,48.75 L 40.22,49.83 L 40.22,50.92 L 40.22,52.00 L 40.22,53.08 L 40.22,54.17 L 40.22,55.25 L 40.22,56.33 L 40.22,57.42 L 40.22,58.50 L 40.22,59.58 L 40.22,60.67 L 40.22,61.75 L 40.22,62.83 L 40.22,63.92 L 40.22,65.00 L 40.22,66.08 L 40.22,67.17 L 40.22,68.25 L 40.22,69.33 L 40.22,70.42 L 40.22,71.50 L 40.22,72.58 L 40.22,73.67 L 40.22,74.75 L 40.22,75.83 L 40.22,76.92 L 40.22,78.00 L 40.22,79.08 L 40.22,80.17 L 40.22,81.25 L 40.22,82.33 L 40.22,83.42 L 40.22,84.50 L 40.22,85.58 L 40.22,86.67 L 40.22,87.75 L 40.49,88.83 L 40.49,89.92 L 40.76,91.00 L 40.76,92.08 L 41.03,93.17 L 41.30,94.25 L 41.58,95.33 L 42.12,96.42 L 42.66,97.50";
const outerPinPath = "M 42.66,97.50 L 43.48,99.12 L 44.57,100.75 L 45.92,102.38 L 47.28,103.73 L 48.91,105.08 L 50.54,106.17 L 52.17,106.98 L 53.80,107.52 L 55.43,108.06 L 57.07,108.60 L 58.15,109.15 L 56.52,110.50 L 54.89,111.85 L 53.26,113.48 L 51.63,114.83 L 50.00,116.19 L 48.37,115.10 L 46.74,113.48 L 45.11,112.12 L 43.48,110.50 L 41.85,109.15 L 40.22,107.52 L 38.59,106.17 L 36.96,104.54 L 35.33,103.19 L 33.70,101.56 L 32.07,100.21 L 30.43,98.58 L 28.80,96.96 L 27.17,95.33 L 25.54,93.71 L 23.91,92.08 L 22.55,90.46 L 20.92,88.83 L 19.57,87.21 L 18.21,85.58 L 17.12,83.96 L 15.76,82.33 L 14.67,80.71 L 13.59,79.08 L 12.50,77.46 L 11.68,75.83 L 10.87,74.21 L 10.05,72.58 L 9.24,70.96 L 8.70,69.33 L 8.15,67.71 L 7.61,66.08 L 7.34,64.46 L 7.07,62.83 L 6.79,61.21 L 6.52,59.58 L 6.52,57.96 L 6.52,56.33 L 6.52,54.71 L 6.52,53.08 L 6.79,51.46 L 7.07,49.83 L 7.34,48.21 L 7.61,46.58 L 8.15,44.96 L 8.70,43.33 L 9.24,41.71 L 9.78,40.08 L 10.60,38.46 L 11.41,36.83 L 12.23,35.21 L 13.32,33.58 L 14.40,31.96 L 15.76,30.33 L 17.12,28.71 L 18.48,27.08 L 20.11,25.73 L 21.74,24.10 L 23.37,23.02 L 25.00,21.67 L 26.63,20.58 L 28.26,19.77 L 29.89,18.69 L 31.52,18.15 L 33.15,17.33 L 34.78,16.79 L 36.41,15.98 L 38.04,15.71 L 39.67,15.17 L 41.30,14.90 L 42.93,14.62 L 44.57,14.35 L 45.92,14.08 L 47.55,14.08 L 49.18,14.08 L 50.82,14.08 L 52.45,14.08 L 54.08,14.08 L 55.71,14.35 L 57.34,14.62 L 58.97,14.90 L 60.60,15.44 L 62.23,15.71 L 63.86,16.25 L 65.49,16.79 L 67.12,17.60 L 68.75,18.15 L 70.38,18.96 L 72.01,20.04 L 73.64,20.85 L 75.27,21.94 L 76.90,23.29 L 78.53,24.65 L 80.16,26.00 L 81.79,27.62 L 83.15,29.25 L 84.51,30.88 L 85.60,32.50 L 86.68,34.12 L 87.77,35.75 L 88.59,37.38 L 89.40,39.00 L 90.22,40.62 L 90.76,42.25 L 91.30,43.88 L 91.85,45.50 L 92.12,47.12 L 92.66,48.75 L 92.93,50.38 L 92.93,52.00 L 93.21,53.62 L 93.21,55.25 L 93.21,56.88 L 93.21,58.50 L 93.21,60.12 L 92.93,61.75 L 92.66,63.38 L 92.39,65.00 L 91.85,66.62 L 91.30,68.25 L 90.76,69.88 L 90.22,71.50 L 89.40,73.12 L 88.59,74.75 L 87.77,76.38 L 86.96,78.00 L 85.87,79.62 L 84.78,81.25 L 83.70,82.88 L 82.34,84.50 L 81.25,86.12 L 79.89,87.75 L 79.08,88.56";

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const checkScrollTop = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      style={{
        position: 'relative',
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(245, 242, 236, 0.08)',
        padding: '90px 24px 60px 24px',
        overflow: 'hidden',
        zIndex: 10,
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        @keyframes drawRoute {
          0% {
            stroke-dashoffset: 1500;
          }
          70% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          85% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
          100% {
            stroke-dashoffset: 1500;
            opacity: 0;
          }
        }
      `}</style>
      {/* Background Graphic Illustrations */}
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
          opacity: 0.8
        }}
      >
        {/* Glow Wash */}
        <div
          style={{
            position: 'absolute',
            bottom: '-25%',
            right: '-10%',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(193, 18, 31, 0.06) 0%, rgba(234, 28, 41, 0.015) 50%, transparent 100%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        />

        {/* Bespoke Luxury Travel Illustration SVG */}
        <svg
          viewBox="0 0 1000 600"
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
          {/* 1. Fine Dotted World Grid Overlay (increased opacity) */}
          <g stroke="rgba(245, 242, 236, 0.08)" strokeWidth="0.5" strokeDasharray="1.5 10" fill="none">
            {/* Latitudes */}
            <line x1="20" y1="60" x2="980" y2="60" />
            <line x1="20" y1="160" x2="980" y2="160" />
            <line x1="20" y1="260" x2="980" y2="260" />
              <line x1="20" y1="360" x2="980" y2="360" />
              <line x1="20" y1="460" x2="980" y2="460" />
              <line x1="20" y1="560" x2="980" y2="560" />
              {/* Longitudes */}
              <line x1="100" y1="20" x2="100" y2="580" />
              <line x1="250" y1="20" x2="250" y2="580" />
              <line x1="400" y1="20" x2="400" y2="580" />
              <line x1="550" y1="20" x2="550" y2="580" />
              <line x1="700" y1="20" x2="700" y2="580" />
              <line x1="850" y1="20" x2="850" y2="580" />
            </g>

            {/* 2. Star Constellations and Coordinate Ticks (increased opacity) */}
            <g stroke="rgba(245, 242, 236, 0.12)" strokeWidth="0.5" fill="none">
              {/* Constellation A (Left Side) */}
              <polyline points="70,120 100,105 130,125 155,100" />
              <circle cx="70" cy="120" r="1.5" fill="rgba(245, 242, 236, 0.35)" stroke="none" />
              <circle cx="100" cy="105" r="1" fill="rgba(245, 242, 236, 0.25)" stroke="none" />
              <circle cx="130" cy="125" r="2.2" fill="#C82D2D" fillOpacity="0.4" stroke="none" />
              <circle cx="155" cy="100" r="1" fill="rgba(245, 242, 236, 0.25)" stroke="none" />

              {/* Constellation B (Right Side) */}
              <polyline points="800,70 825,95 860,85 885,115" />
              <circle cx="800" cy="70" r="1" fill="rgba(245, 242, 236, 0.25)" stroke="none" />
              <circle cx="825" cy="95" r="1.8" fill="rgba(245, 242, 236, 0.45)" stroke="none" />
              <circle cx="860" cy="85" r="1.2" fill="rgba(245, 242, 236, 0.25)" stroke="none" />
              <circle cx="885" cy="115" r="2" fill="#C82D2D" fillOpacity="0.4" stroke="none" />
            </g>

            {/* 3. Passport stamps & Travel Marks (increased opacity) */}
            {/* Dubai Stamp (Top Left) */}
            <g transform="translate(100, 70) rotate(-12)" opacity="0.14" stroke="rgba(245, 242, 236, 0.9)" strokeWidth="0.6" fill="none">
              <circle cx="0" cy="0" r="24" />
              <circle cx="0" cy="0" r="21" strokeDasharray="1.5 1.5" />
              <text x="0" y="-8" textAnchor="middle" fontSize="4.5" fill="#F5F2EC" stroke="none" letterSpacing="0.08em" fontFamily="var(--font-sans)">TRAVINNO</text>
              <text x="0" y="1" textAnchor="middle" fontSize="4" fill="#C82D2D" stroke="none" letterSpacing="0.05em" fontFamily="var(--font-sans)">★ DXB ★</text>
              <text x="0" y="8" textAnchor="middle" fontSize="4" fill="#F5F2EC" stroke="none" letterSpacing="0.05em" fontFamily="var(--font-mono)">ENTRY 2026</text>
            </g>
            {/* Bangkok Stamp (Bottom Left) */}
            <g transform="translate(120, 480) rotate(15)" opacity="0.12" stroke="rgba(245, 242, 236, 0.9)" strokeWidth="0.6" fill="none">
              <polygon points="-20,-20 20,-20 28,-10 28,10 20,20 -20,20 -28,10 -28,-10" />
              <text x="0" y="-7" textAnchor="middle" fontSize="4" fill="#F5F2EC" stroke="none" letterSpacing="0.1em" fontFamily="var(--font-sans)">MANAGEMENT</text>
              <text x="0" y="2" textAnchor="middle" fontSize="5" fill="#C82D2D" stroke="none" letterSpacing="0.08em" fontFamily="var(--font-sans)">PASSED</text>
              <text x="0" y="10" textAnchor="middle" fontSize="3.5" fill="#F5F2EC" stroke="none" letterSpacing="0.05em" fontFamily="var(--font-mono)">BKK / CUSTOMS</text>
            </g>

            {/* 4. Left Side: Compas Illustration (Slowly rotates 2° back and forth) */}
            <motion.g
              animate={{ rotate: [0, 2, 0] }}
              transition={{
                duration: 20,
                ease: "easeInOut",
                repeat: Infinity
              }}
              style={{ originX: '250px', originY: '300px' }}
            >
              {/* Outer coordinate ring (increased opacity) */}
              <circle cx="250" cy="300" r="130" stroke="rgba(245, 242, 236, 0.22)" strokeWidth="0.8" fill="none" />
              {/* Dotted scale ring */}
              <circle cx="250" cy="300" r="118" stroke="rgba(245, 242, 236, 0.16)" strokeWidth="0.6" strokeDasharray="3 3" fill="none" />
              {/* Inner ring */}
              <circle cx="250" cy="300" r="80" stroke="rgba(245, 242, 236, 0.16)" strokeWidth="0.8" fill="none" />

              {/* Radial Ticks */}
              <g transform="translate(250, 300)" stroke="rgba(245, 242, 236, 0.18)" strokeWidth="0.8" fill="none">
                <line x1="0" y1="-122" x2="0" y2="-130" />
                <line x1="0" y1="122" x2="0" y2="130" />
                <line x1="-122" y1="0" x2="-130" y2="0" />
                <line x1="122" y1="0" x2="130" y2="0" />
                {/* Diagonals */}
                <line x1="-86" y1="-86" x2="-92" y2="-92" />
                <line x1="86" y1="-86" x2="92" y2="-92" />
                <line x1="-86" y1="86" x2="-92" y2="92" />
                <line x1="86" y1="86" x2="92" y2="92" />
              </g>

              {/* Cardinal Letters */}
              <text x="250" y="180" textAnchor="middle" fontSize="10" fill="rgba(245, 242, 236, 0.45)" fontFamily="var(--font-sans)" fontWeight="400" letterSpacing="0.05em" stroke="none">N</text>
              <text x="250" y="430" textAnchor="middle" fontSize="10" fill="rgba(245, 242, 236, 0.45)" fontFamily="var(--font-sans)" fontWeight="400" letterSpacing="0.05em" stroke="none">S</text>
              <text x="130" y="303" textAnchor="middle" fontSize="10" fill="rgba(245, 242, 236, 0.45)" fontFamily="var(--font-sans)" fontWeight="400" letterSpacing="0.05em" stroke="none">W</text>
              <text x="370" y="303" textAnchor="middle" fontSize="10" fill="rgba(245, 242, 236, 0.45)" fontFamily="var(--font-sans)" fontWeight="400" letterSpacing="0.05em" stroke="none">E</text>

              {/* Compass needle (increased opacity outline) */}
              <path d="M 250,210 L 254,300 L 250,312 L 246,300 Z" fill="none" stroke="rgba(200, 45, 45, 0.28)" strokeWidth="0.8" />
              <path d="M 250,390 L 254,300 L 250,288 L 246,300 Z" fill="none" stroke="rgba(245, 242, 236, 0.16)" strokeWidth="0.8" />
            </motion.g>

            {/* 5. Logo Integration (Fixed in center, no rotate, no distort) */}
            <g transform="translate(250, 300) translate(-26, -34) scale(0.55)">
              <path
                d={`${outerPinPath} ${innerTPath}`}
                fillRule="evenodd"
                fill="none"
                stroke="#C82D2D"
                strokeWidth="1.5"
                opacity="0.85"
              />
            </g>

            {/* 6. Flowing Travel Route (Slow draw-in when footer enters, increased opacity) */}
            {/* Base dotted route */}
            <motion.path
              d="M 250,300 C 290,260 330,230 370,230 C 410,230 440,180 480,170 C 520,160 560,190 600,200 C 640,210 670,170 710,160 C 750,150 780,210 810,220 C 840,230 870,260 880,300 C 890,340 850,370 810,410 C 770,450 720,440 680,470 C 640,500 600,520 550,520"
              fill="none"
              stroke="rgba(245, 242, 236, 0.22)"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 4.5, ease: "easeOut" }}
            />
            {/* Elegant animated connecting route line plotting gradually */}
            <path
              d="M 370,230 C 410,230 440,180 480,170 C 520,160 560,190 600,200 C 640,210 670,170 710,160 C 750,150 780,210 810,220 C 840,230 870,260 880,300 C 890,340 850,370 810,410 C 770,450 720,440 680,470 C 640,500 600,520 550,520"
              fill="none"
              stroke="#C1121F"
              strokeWidth="1.2"
              strokeDasharray="1500"
              strokeDashoffset="1500"
              style={{
                animation: 'drawRoute 12s infinite linear',
                filter: 'drop-shadow(0 0 2px rgba(193, 18, 31, 0.65))'
              }}
            />
            {/* Glowing Destination Nodes with sequential pulsing and text labels */}
            {[
              { cx: 370, cy: 230, label: "DUBAI", labelY: 244, delay: "0s" },
              { cx: 600, cy: 200, label: "THAILAND", labelY: 214, delay: "2s" },
              { cx: 710, cy: 160, label: "MALAYSIA", labelY: 146, delay: "3.5s" },
              { cx: 810, cy: 220, label: "SINGAPORE", labelY: 206, delay: "5s" },
              { cx: 880, cy: 300, label: "VIETNAM", labelY: 314, delay: "6.8s" },
              { cx: 680, cy: 470, label: "KENYA", labelY: 484, delay: "8.5s" }
            ].map((node, index) => (
              <g key={index}>
                <circle cx={node.cx} cy={node.cy} r="2.5" fill="none" stroke="#C1121F" strokeWidth="1">
                  <animate attributeName="r" values="2.5;7.5;2.5" dur="3s" repeatCount="indefinite" begin={node.delay} />
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" begin={node.delay} />
                </circle>
                <circle cx={node.cx} cy={node.cy} r="2.5" fill="#C1121F" style={{ filter: 'drop-shadow(0 0 2.5px rgba(193, 18, 31, 0.95))' }} />
                <text 
                  x={node.cx} 
                  y={node.labelY} 
                  textAnchor="middle" 
                  fontSize="6.5" 
                  fill="rgba(245, 242, 236, 0.45)" 
                  fontFamily="var(--font-sans)" 
                  fontWeight="500" 
                  letterSpacing="0.08em"
                  stroke="none"
                >
                  {node.label}
                </text>
              </g>
            ))}

            {/* 7. Travel Icons along the Route (increased opacity, thin stroke, crimson accents) */}
            {/* Icon 1: Airplane at (370, 230) */}
            <g transform="translate(370, 230) scale(0.9) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 12,2 L 14,9 L 22,12 L 14,15 L 12,22 L 10,15 L 2,12 L 10,9 Z" />
              <circle cx="12" cy="2" r="1" fill="#C82D2D" stroke="none" fillOpacity="0.85" />
            </g>
            {/* Icon 2: Globe at (480, 170) */}
            <g transform="translate(480, 170) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <circle cx="12" cy="12" r="10" />
              <path d="M 12,2 A 5,10 0 0,0 12,22 A 5,10 0 0,0 12,2" />
              <path d="M 12,2 A 2.2,10 0 0,0 12,22 A 2.2,10 0 0,0 12,2" />
              <line x1="2.2" y1="12" x2="21.8" y2="12" />
              <path d="M 4,7 C 8,9 16,9 20,7" stroke="#C82D2D" strokeWidth="0.6" />
            </g>
            {/* Icon 3: Palm Tree at (600, 200) */}
            <g transform="translate(600, 200) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 12,22 Q 10,14 12,8" />
              <path d="M 12,8 Q 5,6 2,9 M 12,8 Q 6,3 7,1 M 12,8 Q 13,3 17,2 M 12,8 Q 18,5 21,8 M 12,8 Q 17,11 19,15 M 12,8 Q 8,10 5,14" />
              <circle cx="6" cy="5" r="1.5" stroke="#C82D2D" strokeWidth="0.7" />
            </g>
            {/* Icon 4: Luxury Hotel Silhouette at (710, 160) */}
            <g transform="translate(710, 160) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <rect x="3" y="6" width="5" height="16" />
              <path d="M 8,11 L 14,11 M 8,16 L 14,16" />
              <rect x="14" y="3" width="7" height="19" />
              <line x1="5.5" y1="9" x2="5.5" y2="20" strokeDasharray="1 2.5" />
              <line x1="17.5" y1="6" x2="17.5" y2="20" strokeDasharray="1 2.5" />
              <line x1="21" y1="3" x2="21" y2="1" stroke="#C82D2D" strokeWidth="0.8" />
            </g>
            {/* Icon 5: Mountain Outline at (810, 220) */}
            <g transform="translate(810, 220) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 2,20 L 11,5 L 20,20" />
              <path d="M 12,20 L 17,11 L 22,20" />
              <path d="M 9,8 L 11,10 L 13,8" />
              <circle cx="11" cy="5" r="1.2" fill="#C82D2D" stroke="none" fillOpacity="0.85" />
            </g>
            {/* Icon 6: Ocean Waves at (880, 300) */}
            <g transform="translate(880, 300) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 2,9 Q 7,6 12,9 T 22,9" />
              <path d="M 2,14 Q 7,11 12,14 T 22,14" />
              <path d="M 6,19 Q 11,16 16,19" stroke="#C82D2D" strokeWidth="0.7" />
            </g>
            {/* Icon 7: Cruise Ship at (810, 410) */}
            <g transform="translate(810, 410) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 2,15 L 20,15 L 22,11 L 5,11 Z" />
              <rect x="6" y="7" width="12" height="4" />
              <rect x="9" y="4" width="7" height="3" />
              <line x1="11" y1="4" x2="11" y2="1.5" />
              <line x1="14" y1="4" x2="14" y2="1.5" stroke="#C82D2D" />
              <path d="M 0,17 C 5,18 7,16 12,17 C 17,18 19,16 24,17" />
            </g>
            {/* Icon 8: Hot Air Balloon at (680, 470) */}
            <g transform="translate(680, 470) scale(0.95) translate(-12, -12)" stroke="rgba(245, 242, 236, 0.24)" strokeWidth="0.8" fill="none">
              <path d="M 12,2 C 6,2 6,12 10,16 L 14,16 C 18,12 18,2 12,2 Z" />
              <path d="M 12,2 C 9.2,2 9.2,12 11,16 M 12,2 C 14.8,2 14.8,12 13,16" />
              <line x1="10" y1="16" x2="11" y2="19" />
              <line x1="14" y1="16" x2="13" y2="19" />
              <rect x="11" y="19" width="2" height="2" />
              <path d="M 10,16 H 14" stroke="#C82D2D" strokeWidth="0.8" />
            </g>

            {/* Route Destination Marker (Crimson pin and pulsing auras at (550, 520)) */}
            <g transform="translate(550, 520)">
              {/* Dynamic Pulsing Dotted Circle */}
              <circle cx="0" cy="0" r="10" fill="none" stroke="#C82D2D" strokeWidth="1.0" opacity="0.5">
                <animate attributeName="r" values="6;16;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0.1;0.7" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Mini Crimson Location Pin */}
              <g transform="translate(-10, -10) scale(0.85)">
                <path d="M 12,2 C 8,2 5,5 5,9 C 5,14 12,22 12,22 C 12,22 19,14 19,9 C 19,5 16,2 12,2 Z" fill="none" stroke="#C82D2D" strokeWidth="1.2" />
                <circle cx="12" cy="9" r="2.2" fill="#C82D2D" stroke="none" />
              </g>
            </g>

            {/* 8. Very small floating dust particles (Looping slow drift) */}
            {[
              { id: 1, cx: 300, cy: 120, x: [0, 10, -5, 0], y: [0, -12, -20, 0], dur: 12 },
              { id: 2, cx: 850, cy: 140, x: [0, -12, 8, 0], y: [0, -16, -8, 0], dur: 15 },
              { id: 3, cx: 480, cy: 450, x: [0, 8, -4, 0], y: [0, -20, -12, 0], dur: 18 },
              { id: 4, cx: 910, cy: 420, x: [0, -8, 10, 0], y: [0, -12, -25, 0], dur: 14 }
            ].map((p) => (
              <motion.circle
                key={p.id}
                cx={p.cx}
                cy={p.cy}
                r="1"
                fill="rgba(245, 242, 236, 0.55)"
                animate={{ x: p.x, y: p.y }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </svg>

        {/* Big Backdrop Outline Typography */}
        <div
          style={{
            position: 'absolute',
            bottom: '-45px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(5.5rem, 15vw, 14.5rem)',
            fontWeight: 900,
            letterSpacing: '0.22em',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(245, 242, 236, 0.07)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            zIndex: 1
          }}
        >
          TRAVINNO
        </div>
      </div>

      {/* Main Footer Directory (Inside Max Width Container) */}
      <div
        className="footer-directory-grid"
        style={{
          position: 'relative',
          maxWidth: '1240px',
          margin: '0 auto 60px auto',
          display: 'grid',
          gap: '40px',
          zIndex: 2
        }}
      >
        {/* Brand Information column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* SVG Logo */}
            <svg viewBox="0 0 100 130" style={{ width: '34px', height: '44px', display: 'block' }}>
              <path
                d={`${outerPinPath} ${innerTPath}`}
                fillRule="evenodd"
                fill="#C1121F"
                stroke="none"
              />
            </svg>
            <img
              src="/demo/images/logo_loading.png"
              alt="Travinno"
              width="140"
              height="25"
              style={{
                height: '25px',
                width: 'auto',
                objectFit: 'contain',
                display: 'block',
                userSelect: 'none'
              }}
            />
          </div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.86rem',
              lineHeight: 1.6,
              color: 'rgba(245, 242, 236, 0.65)',
              margin: 0,
              maxWidth: '300px'
            }}
          >
            Orchestrating extraordinary journeys, bespoke itineraries, and trusted destination management services at competitive rates worldwide.
          </p>
          {/* Social Handles */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            {[
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                ), 
                href: 'https://instagram.com/travinno' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                ), 
                href: 'https://linkedin.com/company/travinno' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                ), 
                href: 'https://facebook.com/travinno' 
              },
              { 
                icon: (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                ), 
                href: 'https://youtube.com/travinno' 
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(245, 242, 236, 0.08)',
                  color: 'rgba(245, 242, 236, 0.65)',
                  backgroundColor: 'rgba(245, 242, 236, 0.02)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F5F2EC';
                  e.currentTarget.style.backgroundColor = 'rgba(193, 18, 31, 0.15)';
                  e.currentTarget.style.borderColor = '#C1121F';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(193, 18, 31, 0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(245, 242, 236, 0.65)';
                  e.currentTarget.style.backgroundColor = 'rgba(245, 242, 236, 0.02)';
                  e.currentTarget.style.borderColor = 'rgba(245, 242, 236, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Destinations Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#F5F2EC',
              margin: 0
            }}
          >
            Destinations
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'Dubai', href: '/destinations#destination-dubai' },
              { name: 'Kenya', href: '/destinations#destination-kenya' },
              { name: 'Thailand', href: '/destinations#destination-thailand' },
              { name: 'Bali', href: '/destinations#destination-bali' },
              { name: 'Singapore', href: '/destinations#destination-singapore' },
              { name: 'Malaysia', href: '/destinations#destination-malaysia' },
              { name: 'Vietnam', href: '/destinations#destination-vietnam' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    if (typeof window !== 'undefined') {
                      const isDestPage = window.location.pathname.includes('/destinations');
                      if (isDestPage) {
                        e.preventDefault();
                        const targetHash = `#destination-${link.name.toLowerCase()}`;
                        window.location.hash = targetHash;
                        window.dispatchEvent(new Event('hashchange'));
                        window.dispatchEvent(new Event('travinno-destination-change'));
                      }
                    }
                  }}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'rgba(245, 242, 236, 0.55)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5F2EC';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245, 242, 236, 0.55)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#F5F2EC',
              margin: 0
            }}
          >
            Company
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { name: 'About Us', href: '/about' },
              { name: 'Our Expertise', href: '/#services' },
              { name: 'Our Journey', href: '/#journey' },
              { name: 'Why Travinno', href: '/#why' },
              { name: 'Careers', href: '/careers' },
              { name: 'Get in Touch', href: '/contact' }
            ].map((link, idx) => (
              <li key={idx}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    const hashMatch = link.href && link.href.includes('#') ? link.href.split('#')[1] : null;
                    if (hashMatch) {
                      const isHomeSection = ['services', 'testimonials', 'contact', 'why', 'journey', 'destinations'].includes(hashMatch);
                      if (isHomeSection) {
                        const isOnHomePage = typeof window !== 'undefined' && (
                          window.location.pathname === '/' || 
                          window.location.pathname === '/demo' || 
                          window.location.pathname === '/demo/'
                        );
                        if (isOnHomePage) {
                          e.preventDefault();
                          const el = document.getElementById(hashMatch);
                          if (el) {
                            const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop || 0;
                            const absoluteTop = Math.max(0, el.getBoundingClientRect().top + scrollY - 80);
                            if (window.lenis) {
                              window.lenis.scrollTo(absoluteTop, { duration: 1.2 });
                            } else {
                              window.scrollTo({ top: absoluteTop, behavior: 'smooth' });
                            }
                          }
                        } else {
                          sessionStorage.setItem('travinno_pending_scroll', hashMatch);
                        }
                      }
                    }
                  }}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.84rem',
                    color: 'rgba(245, 242, 236, 0.55)',
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#F5F2EC';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'rgba(245, 242, 236, 0.55)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Office details column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.05rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: '#F5F2EC',
              margin: 0
            }}
          >
            Global Offices
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'rgba(245, 242, 236, 0.65)', lineHeight: 1.5 }}>
              Dubai <span style={{ fontSize: '0.62rem', color: 'rgba(245, 242, 236, 0.4)', marginLeft: '3px', verticalAlign: 'super' }}>AE</span>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'rgba(245, 242, 236, 0.65)', lineHeight: 1.5 }}>
              Thailand <span style={{ fontSize: '0.62rem', color: 'rgba(245, 242, 236, 0.4)', marginLeft: '3px', verticalAlign: 'super' }}>TH</span>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'rgba(245, 242, 236, 0.65)', lineHeight: 1.5 }}>
              Kenya <span style={{ fontSize: '0.62rem', color: 'rgba(245, 242, 236, 0.4)', marginLeft: '3px', verticalAlign: 'super' }}>KE</span>
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.84rem', color: 'rgba(245, 242, 236, 0.65)', lineHeight: 1.5 }}>
              India <span style={{ fontSize: '0.62rem', color: 'rgba(245, 242, 236, 0.4)', marginLeft: '3px', verticalAlign: 'super' }}>IN</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom copyright & back to top */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1240px',
          margin: '0 auto',
          paddingTop: '24px',
          borderTop: '1px solid rgba(245, 242, 236, 0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '16px',
          zIndex: 2
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: 'rgba(245, 242, 236, 0.4)'
          }}
        >
          &copy; {new Date().getFullYear()} TRAVINNO. All rights reserved.
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {[
            { text: 'Privacy Policy', href: '/privacy' },
            { text: 'Terms of Service', href: '/terms' },
            { text: 'Cookie Settings', href: '#company' }
          ].map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                color: 'rgba(245, 242, 236, 0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#F5F2EC'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245, 242, 236, 0.4)'}
            >
              {link.text}
            </Link>
          ))}
        </div>

        {/* Back To Top Button */}
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              backgroundColor: '#050505',
              border: '1px solid rgba(245, 242, 236, 0.1)',
              color: '#F5F2EC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 999,
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.5)'
            }}
            whileHover={{
              backgroundColor: '#C1121F',
              borderColor: '#C1121F',
              boxShadow: '0px 0px 15px rgba(193, 18, 31, 0.6)',
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </div>
    </footer>
  );
}
export default React.memo(Footer);
