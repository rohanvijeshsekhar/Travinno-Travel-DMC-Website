"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Animated SVG Visual Components ---

function LocalExpertiseVisual({ isHovered }) {
  const rotationDuration = isHovered ? "21s" : "25s";
  const lineSpeed = isHovered ? "3s" : "3.5s";
  
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background radar/grid rings */}
      <circle cx="200" cy="120" r="100" stroke="rgba(255,255,255,0.02)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="200" cy="120" r="70" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
      <circle cx="200" cy="120" r="40" stroke="rgba(255,255,255,0.01)" strokeWidth="1" strokeDasharray="1 5" />
      
      {/* Rotating Globe Grid */}
      <g style={{ transformOrigin: '200px 120px', animation: `spin ${rotationDuration} linear infinite` }}>
        <circle cx="200" cy="120" r="80" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <ellipse cx="200" cy="120" rx="80" ry="25" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <ellipse cx="200" cy="120" rx="25" ry="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <ellipse cx="200" cy="120" rx="80" ry="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <ellipse cx="200" cy="120" rx="55" ry="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <line x1="120" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <line x1="130" y1="90" x2="270" y2="90" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        <line x1="130" y1="150" x2="270" y2="150" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
      </g>
      
      {/* Compass Compass Dial in the corner */}
      <g transform="translate(320, 60)">
        <circle cx="0" cy="0" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="2 3" />
        <g style={{
          animation: `compass-wiggle 6s ease-in-out infinite`,
          transformOrigin: '0px 0px'
        }}>
          <path d="M0,-16 L4,0 L0,4 L-4,0 Z" fill="#C1121F" opacity="0.8" />
          <path d="M0,16 L4,0 L0,-4 L-4,0 Z" fill="rgba(255,255,255,0.3)" />
        </g>
      </g>
      
      {/* Interactive Travel Routes */}
      <path d="M 150 140 Q 200 80 250 130" stroke="rgba(193, 18, 31, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
        <animate attributeName="stroke-dashoffset" values="40;0" dur={lineSpeed} repeatCount="indefinite" />
      </path>
      
      <path d="M 130 110 Q 180 150 260 100" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" strokeDasharray="3 3" fill="none">
        <animate attributeName="stroke-dashoffset" values="-30;0" dur={lineSpeed} repeatCount="indefinite" />
      </path>

      {/* Pulsing Destination Pins */}
      <g transform="translate(150, 140)">
        <circle r="3" fill="#C1121F" />
        <circle r="7" stroke="#C1121F" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="3;10;3" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
      
      <g transform="translate(250, 130)">
        <circle r="3" fill="#C1121F" />
        <circle r="7" stroke="#C1121F" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="3;9;3" dur="2.5s" repeatCount="indefinite" delay="0.5s" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.5s" repeatCount="indefinite" delay="0.5s" />
        </circle>
      </g>

      <g transform="translate(260, 100)">
        <circle r="2" fill="rgba(255,255,255,0.7)" />
      </g>
      
      <g transform="translate(130, 110)">
        <circle r="2" fill="rgba(255,255,255,0.7)" />
      </g>
    </svg>
  );
}

function TrustedPartnershipsVisual({ isHovered }) {
  const lineSpeed = isHovered ? "2.5s" : "3.5s";
  const pulseDur = isHovered ? "2s" : "3s";
  
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Background ambient network grid & orbital connection rings */}
      <circle cx="200" cy="120" r="105" stroke="rgba(255,255,255,0.025)" strokeWidth="1" strokeDasharray="3 4" />
      <ellipse cx="200" cy="125" rx="140" ry="55" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 3" />
      <ellipse cx="200" cy="125" rx="140" ry="55" stroke="#C1121F" strokeWidth="1.2" strokeDasharray="6 8" opacity="0.35">
        <animate attributeName="stroke-dashoffset" values="50;0" dur={lineSpeed} repeatCount="indefinite" />
      </ellipse>

      {/* Network Connection Lines between people nodes */}
      <line x1="115" y1="125" x2="200" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="285" y1="125" x2="200" y2="52" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" strokeDasharray="3 3" />
      
      {/* Main Bridge between Left & Right Partners */}
      <path d="M 125 125 C 160 95, 240 95, 275 125" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" />
      <path d="M 125 130 C 160 160, 240 160, 275 130" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" fill="none" />

      {/* Animated Flowing Energy Beams connecting people */}
      <path d="M 125 125 C 160 95, 240 95, 275 125" stroke="#C1121F" strokeWidth="1.5" strokeDasharray="6 6" fill="none">
        <animate attributeName="stroke-dashoffset" values="40;0" dur={lineSpeed} repeatCount="indefinite" />
      </path>
      <path d="M 125 130 C 160 160, 240 160, 275 130" stroke="rgba(245,242,236,0.5)" strokeWidth="1.2" strokeDasharray="4 4" fill="none">
        <animate attributeName="stroke-dashoffset" values="-30;0" dur={lineSpeed} repeatCount="indefinite" />
      </path>

      {/* Central Collaboration / Handshake Synergy Node */}
      <g transform="translate(200, 125)">
        <circle r="22" fill="rgba(11,11,11,0.9)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle r="28" stroke="#C1121F" strokeWidth="1" opacity="0.35">
          <animate attributeName="r" values="22;32;22" dur={pulseDur} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0;0.4" dur={pulseDur} repeatCount="indefinite" />
        </circle>
        
        {/* Handshake / Partnership Clasp Icon */}
        <g transform="translate(-10, -8) scale(0.85)" stroke={isHovered ? "#FFFFFF" : "#F5F2EC"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 2 15 L 7 10 L 11 12 L 15 8" />
          <path d="M 7 10 L 10 7 L 14 10 L 12 13" fill="rgba(193,18,31,0.3)" stroke="#C1121F" />
          <path d="M 22 15 L 17 10 L 13 12 L 9 8" />
          <path d="M 17 10 L 14 7 L 10 10 L 12 13" />
        </g>
        <circle r="3" fill="#C1121F" />
      </g>

      {/* TOP PARTNER NODE (Travel Specialist / Coordinator) */}
      <g transform="translate(200, 52)">
        <circle r="16" fill="rgba(15,15,15,0.85)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="0" cy="-3" r="4.5" fill={isHovered ? "#FFFFFF" : "rgba(245,242,236,0.85)"} />
        <path d="M -8 11 C -8 5, 8 5, 8 11" stroke={isHovered ? "#FFFFFF" : "rgba(245,242,236,0.7)"} strokeWidth="1.2" fill="none" />
        <circle r="2" cx="0" cy="15" fill="#C1121F" />
      </g>

      {/* LEFT PERSON FIGURE (Travel Partner / Agent) */}
      <g transform="translate(115, 125)">
        <circle r="26" fill="rgba(15,15,15,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle r="30" stroke="#C1121F" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        
        {/* Head */}
        <circle cx="0" cy="-6" r="7.5" fill={isHovered ? "#FFFFFF" : "#F5F2EC"} />
        {/* Body/Shoulders */}
        <path d="M -14 16 C -14 6, 14 6, 14 16" stroke={isHovered ? "#FFFFFF" : "#F5F2EC"} strokeWidth="1.8" strokeLinecap="round" fill="rgba(193,18,31,0.2)" />
        {/* Tie/Badge Accent */}
        <path d="M 0 7 L 0 13" stroke="#C1121F" strokeWidth="1.5" />
        
        {/* Active status indicator badge */}
        <circle cx="16" cy="-14" r="3.5" fill="#C1121F" />
        <circle cx="16" cy="-14" r="6" stroke="#C1121F" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="r" values="3.5;7.5;3.5" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* RIGHT PERSON FIGURE (DMC Specialist / Hospitality Partner) */}
      <g transform="translate(285, 125)">
        <circle r="26" fill="rgba(15,15,15,0.9)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle r="30" stroke="#C1121F" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />
        
        {/* Head */}
        <circle cx="0" cy="-6" r="7.5" fill={isHovered ? "#FFFFFF" : "#F5F2EC"} />
        {/* Body/Shoulders */}
        <path d="M -14 16 C -14 6, 14 6, 14 16" stroke={isHovered ? "#FFFFFF" : "#F5F2EC"} strokeWidth="1.8" strokeLinecap="round" fill="rgba(193,18,31,0.2)" />
        {/* Tie/Badge Accent */}
        <path d="M 0 7 L 0 13" stroke="#C1121F" strokeWidth="1.5" />

        {/* Active status indicator badge */}
        <circle cx="-16" cy="-14" r="3.5" fill="#C1121F" />
        <circle cx="-16" cy="-14" r="6" stroke="#C1121F" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="r" values="3.5;7.5;3.5" dur="2.8s" repeatCount="indefinite" delay="0.4s" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.8s" repeatCount="indefinite" delay="0.4s" />
        </circle>
      </g>

      {/* Bottom Floating Network Badges */}
      <g transform="translate(145, 195)">
        <rect x="-35" y="-10" width="70" height="20" rx="10" fill="rgba(20,20,20,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="0" y="3" fill="rgba(245,242,236,0.65)" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.8" textAnchor="middle">AGENTS</text>
        <line x1="0" y1="-10" x2="-20" y2="-45" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
      </g>

      <g transform="translate(255, 195)">
        <rect x="-35" y="-10" width="70" height="20" rx="10" fill="rgba(20,20,20,0.85)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="0" y="3" fill="rgba(245,242,236,0.65)" fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.8" textAnchor="middle">HOTELS</text>
        <line x1="0" y1="-10" x2="20" y2="-45" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
      </g>
    </svg>
  );
}

function SupportVisual({ isHovered, sectionVisible }) {
  const [time, setTime] = useState(0);
  const visibleRef = useRef(sectionVisible);

  useEffect(() => {
    visibleRef.current = sectionVisible;
  }, [sectionVisible]);

  useEffect(() => {
    let frameId;
    const tick = () => {
      if (visibleRef.current) {
        setTime(prev => prev + (isHovered ? 0.25 : 0.22));
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  const lonAngle = time;
  const dxbAngle = time + 120;
  const sinAngle = time + 240;

  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Dashboard frame structure */}
      <rect x="20" y="15" width="360" height="210" rx="6" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <line x1="20" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
      <line x1="220" y1="15" x2="220" y2="130" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

      {/* Clocks section */}
      <g transform="translate(25, 20)">
        {/* London Clock */}
        <g transform="translate(45, 45)">
          <circle cx="0" cy="0" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="-22" x2="0" y2="-19" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="19" x2="0" y2="22" stroke="rgba(255,255,255,0.15)" />
          <line x1="-22" y1="0" x2="-19" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="19" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="0" x2="0" y2="-10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" transform={`rotate(${lonAngle / 12})`} />
          <line x1="0" y1="0" x2="0" y2="-16" stroke="#C1121F" strokeWidth="1" transform={`rotate(${lonAngle})`} />
          <text x="0" y="32" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" letterSpacing="1" fontFamily="var(--font-sans)">LON</text>
        </g>

        {/* Dubai Clock */}
        <g transform="translate(100, 45)">
          <circle cx="0" cy="0" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="-22" x2="0" y2="-19" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="19" x2="0" y2="22" stroke="rgba(255,255,255,0.15)" />
          <line x1="-22" y1="0" x2="-19" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="19" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="0" x2="0" y2="-10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" transform={`rotate(${dxbAngle / 12})`} />
          <line x1="0" y1="0" x2="0" y2="-16" stroke="#C1121F" strokeWidth="1" transform={`rotate(${dxbAngle})`} />
          <text x="0" y="32" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" letterSpacing="1" fontFamily="var(--font-sans)">DXB</text>
        </g>

        {/* Singapore Clock */}
        <g transform="translate(155, 45)">
          <circle cx="0" cy="0" r="22" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="0" y1="-22" x2="0" y2="-19" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="19" x2="0" y2="22" stroke="rgba(255,255,255,0.15)" />
          <line x1="-22" y1="0" x2="-19" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="19" y1="0" x2="22" y2="0" stroke="rgba(255,255,255,0.15)" />
          <line x1="0" y1="0" x2="0" y2="-10" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" transform={`rotate(${sinAngle / 12})`} />
          <line x1="0" y1="0" x2="0" y2="-16" stroke="#C1121F" strokeWidth="1" transform={`rotate(${sinAngle})`} />
          <text x="0" y="32" fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" letterSpacing="1" fontFamily="var(--font-sans)">SIN</text>
        </g>
      </g>

      {/* Radar rings (Subtle notification sweep) */}
      <g transform="translate(300, 70)">
        <circle r="30" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
        <circle r="25" stroke="rgba(193, 18, 31, 0.15)" strokeWidth="1.5">
          <animate attributeName="r" values="5;32;5" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;0.7;0" dur="4s" repeatCount="indefinite" />
        </circle>
        <line x1="0" y1="0" x2="20" y2="-20" stroke="rgba(193, 18, 31, 0.4)" strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur={isHovered ? "6s" : "7s"} repeatCount="indefinite" />
        </line>
        <circle r="3" fill="#C1121F" />
      </g>

      {/* Mini Flight Board Status Panel */}
      <g transform="translate(35, 142)">
        <text x="0" y="10" fill="rgba(255,255,255,0.22)" fontSize="8" letterSpacing="1.2" fontFamily="monospace">OPS REAL-TIME STATUS</text>
        <rect x="290" y="1" width="40" height="11" rx="2" fill="rgba(193,18,31,0.1)" stroke="rgba(193,18,31,0.2)" strokeWidth="0.5" />
        <text x="310" y="9" fill="#C1121F" fontSize="7" textAnchor="middle" letterSpacing="0.5" fontFamily="monospace" className="animate-pulse">ONLINE</text>
        
        {/* Row 1 */}
        <g transform="translate(0, 24)">
          <text x="0" y="10" fill="rgba(255,255,255,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">EK 501</text>
          <text x="65" y="10" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">DXB</text>
          <text x="130" y="10" fill="rgba(255,255,255,0.3)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">14:20</text>
          <text x="195" y="10" fill="rgba(255,255,255,0.7)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">MONITORING</text>
          <circle cx="280" cy="7" r="2.5" fill="#C1121F" className="animate-pulse" />
          <text x="295" y="10" fill="#C1121F" fontSize="9" letterSpacing="0.5" fontFamily="monospace">ON TIME</text>
        </g>

        {/* Row 2 */}
        <g transform="translate(0, 42)">
          <text x="0" y="10" fill="rgba(255,255,255,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">SQ 318</text>
          <text x="65" y="10" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">SIN</text>
          <text x="130" y="10" fill="rgba(255,255,255,0.3)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">16:55</text>
          <text x="195" y="10" fill="rgba(255,255,255,0.7)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">ACTIVE</text>
          <circle cx="280" cy="7" r="2.5" fill="#C1121F" />
          <text x="295" y="10" fill="#C1121F" fontSize="9" letterSpacing="0.5" fontFamily="monospace">ARRIVED</text>
        </g>

        {/* Row 3 */}
        <g transform="translate(0, 60)">
          <text x="0" y="10" fill="rgba(255,255,255,0.6)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">LH 772</text>
          <text x="65" y="10" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">FRA</text>
          <text x="130" y="10" fill="rgba(255,255,255,0.3)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">18:10</text>
          <text x="195" y="10" fill="rgba(255,255,255,0.7)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">STANDBY</text>
          <circle cx="280" cy="7" r="2.5" fill="rgba(255,255,255,0.15)" />
          <text x="295" y="10" fill="rgba(255,255,255,0.3)" fontSize="9" letterSpacing="0.5" fontFamily="monospace">SCHEDULED</text>
        </g>
      </g>
    </svg>
  );
}

function GlobalNetworkVisual({ isHovered }) {
  const flightDuration = isHovered ? "15.5s" : "18s";
  
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(200, 120)">
        {/* Globe Base Sphere */}
        <circle cx="0" cy="0" r="92" fill="rgba(8, 8, 8, 0.4)" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
        
        {/* Latitude lines */}
        <path d="M -92 0 H 92" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
        <path d="M -80 -45 H 80" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
        <path d="M -80 45 H 80" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
        
        {/* Longitude arches */}
        <ellipse cx="0" cy="0" rx="92" ry="92" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" fill="none" />
        <ellipse cx="0" cy="0" rx="60" ry="92" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" fill="none" />
        <ellipse cx="0" cy="0" rx="30" ry="92" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" fill="none" />
        <line x1="0" y1="-92" x2="0" y2="92" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
        
        {/* Minimalist continent land outlines */}
        <path d="M -48 -28 Q -32 -18 -28 -38 Q -8 -42 -12 -18 Q -3 -8 -18 12 Q -38 18 -42 3 Q -58 -8 -48 -28 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
        <path d="M 12 -8 Q 32 -28 48 -12 Q 58 8 42 28 Q 28 38 18 18 Q 3 8 12 -8 Z" fill="rgba(255, 255, 255, 0.015)" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.8" />
        
        {/* Curved Connection Path */}
        <path id="network-flight-path" d="M -55 -10 Q 0 -55 45 8" stroke="rgba(193, 18, 31, 0.3)" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
        <path d="M -55 -10 Q 0 -55 45 8" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="60" strokeDashoffset="60" fill="none">
          <animate attributeName="stroke-dashoffset" values="120;0" dur={flightDuration} repeatCount="indefinite" />
        </path>

        <path d="M -25 25 Q 12 55 35 -15" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

        {/* Plane icon traveling along flight path */}
        <g>
          <path d="M-5,-3.5 L5,0 L-5,3.5 L-3,0 Z" fill="#C1121F" stroke="#C1121F" strokeWidth="0.5" />
          <animateMotion dur={flightDuration} repeatCount="indefinite" rotate="auto">
            <mpath href="#network-flight-path" />
          </animateMotion>
        </g>
        
        {/* Locations */}
        <g transform="translate(-55, -10)">
          <circle r="3" fill="#C1121F" />
          <circle r="6" stroke="#C1121F" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="r" values="3;7;3" dur="4.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="4.2s" repeatCount="indefinite" />
          </circle>
        </g>
        
        <g transform="translate(45, 8)">
          <circle r="3" fill="#C1121F" />
          <circle r="6" stroke="#C1121F" strokeWidth="0.5" opacity="0.5">
            <animate attributeName="r" values="3;7;3" dur="3.8s" repeatCount="indefinite" delay="1.8s" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3.8s" repeatCount="indefinite" delay="1.8s" />
          </circle>
        </g>
      </g>
    </svg>
  );
}

function OperationalExcellenceVisual({ isHovered }) {
  const lineSpeed = isHovered ? "3s" : "3.5s";
  
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="180" x2="370" y2="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      
      {/* Luxury Chauffeur Sedan Outline */}
      <g transform="translate(60, 110)">
        <path d="M 10 70 
                 L 20 70 
                 C 25 55, 45 55, 50 70 
                 L 130 70 
                 C 135 55, 155 55, 160 70 
                 L 180 70 
                 Q 185 70, 185 62 
                 L 182 50
                 Q 180 43, 170 43
                 L 155 43
                 L 130 25
                 Q 125 20, 115 20
                 L 70 20
                 Q 58 20, 48 35
                 L 25 50
                 Q 10 52, 10 60
                 Z" 
              stroke="rgba(255, 255, 255, 0.16)" 
              strokeWidth="1.2" 
              fill="rgba(8,8,8,0.5)" />
        
        {/* Window partitions */}
        <path d="M 52 46 L 70 26 L 105 26 L 105 46 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        <path d="M 112 46 L 112 26 L 132 26 L 150 46 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
        
        {/* Wheels */}
        <circle cx="35" cy="70" r="14" fill="#050505" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
        <circle cx="35" cy="70" r="6" stroke="#C1121F" strokeWidth="0.8" />
        
        <circle cx="145" cy="70" r="14" fill="#050505" stroke="rgba(255,255,255,0.12)" strokeWidth="1.2" />
        <circle cx="145" cy="70" r="6" stroke="#C1121F" strokeWidth="0.8" />

        {/* Headlight illumination */}
        <path d="M 10 60 L -15 60 L -30 65 L -15 70 Z" fill="rgba(193, 18, 31, 0.12)" opacity={isHovered ? 1 : 0.4} className="transition-opacity duration-300" />
        <line x1="10" y1="60" x2="-15" y2="60" stroke="#C1121F" strokeWidth="0.8" opacity={isHovered ? 1 : 0.4} />
      </g>

      {/* Executive Luggage Outline */}
      <g transform="translate(285, 115)">
        <rect x="0" y="20" width="28" height="38" rx="2" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" fill="rgba(8,8,8,0.5)" />
        <path d="M 8 20 L 8 13 Q 8 9, 14 9 Q 20 9, 20 13 L 20 20" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.2" fill="none" />
        <line x1="9" y1="28" x2="19" y2="28" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" />
        <line x1="9" y1="37" x2="19" y2="37" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" />
        <line x1="9" y1="46" x2="19" y2="46" stroke="rgba(255, 255, 255, 0.06)" strokeWidth="0.8" />
        
        {/* Executive briefcase leaning */}
        <rect x="23" y="30" width="20" height="26" rx="2" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" fill="rgba(8,8,8,0.6)" transform="rotate(8, 23, 30)" />
      </g>

      {/* Airport transfer path */}
      <path d="M 280 60 Q 230 40 180 60 T 80 60" stroke="rgba(255,255,255,0.03)" strokeWidth="2" fill="none" />
      <path d="M 280 60 Q 230 40 180 60 T 80 60" stroke="#C1121F" strokeWidth="1.5" strokeDasharray="4 4" fill="none">
        <animate attributeName="stroke-dashoffset" values="30;0" dur={lineSpeed} repeatCount="indefinite" />
      </path>

      {/* Map endpoints */}
      <g transform="translate(80, 60)">
        <circle r="2" fill="rgba(255,255,255,0.6)" />
      </g>
      
      <g transform="translate(280, 60)">
        <circle r="2" fill="rgba(255,255,255,0.6)" />
      </g>
    </svg>
  );
}

function ProvenExperienceVisual({ isHovered }) {
  const driftSpeed = isHovered ? "19s" : "22s";
  
  return (
    <svg className="w-full h-full" viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* World Map Dotted Pattern (subtle backdrop) */}
      <g style={{
        animation: `drift ${driftSpeed} ease-in-out infinite alternate`,
        transformOrigin: '200px 120px'
      }} opacity="0.1">
        {/* N. America */}
        <circle cx="65" cy="50" r="1.5" fill="white" />
        <circle cx="80" cy="55" r="1.5" fill="white" />
        <circle cx="60" cy="65" r="1.5" fill="white" />
        <circle cx="75" cy="70" r="1.5" fill="white" />
        <circle cx="90" cy="75" r="1.5" fill="#C1121F" />
        
        {/* S. America */}
        <circle cx="100" cy="115" r="1.5" fill="white" />
        <circle cx="110" cy="130" r="1.5" fill="white" />
        <circle cx="115" cy="145" r="1.5" fill="white" />
        <circle cx="120" cy="160" r="1.5" fill="white" />
        
        {/* Africa / Europe */}
        <circle cx="175" cy="60" r="1.5" fill="white" />
        <circle cx="190" cy="55" r="1.5" fill="white" />
        <circle cx="185" cy="70" r="1.5" fill="white" />
        <circle cx="180" cy="95" r="1.5" fill="white" />
        <circle cx="190" cy="110" r="1.5" fill="white" />
        <circle cx="200" cy="135" r="1.5" fill="white" />
        <circle cx="210" cy="155" r="1.5" fill="white" />
        
        {/* Asia / Australia */}
        <circle cx="225" cy="75" r="1.5" fill="white" />
        <circle cx="240" cy="80" r="1.5" fill="white" />
        <circle cx="255" cy="70" r="1.5" fill="white" />
        <circle cx="250" cy="95" r="1.5" fill="white" />
        <circle cx="270" cy="90" r="1.5" fill="#C1121F" />
        <circle cx="285" cy="100" r="1.5" fill="white" />
        <circle cx="305" cy="150" r="1.5" fill="white" />
        <circle cx="315" cy="160" r="1.5" fill="white" />
        <circle cx="295" cy="165" r="1.5" fill="white" />
        
        {/* Connection networks */}
        <line x1="90" y1="75" x2="175" y2="60" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="175" y1="60" x2="270" y2="90" stroke="rgba(193,18,31,0.22)" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="270" y1="90" x2="305" y2="150" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="2 2" />
      </g>

      {/* Statistics Typography */}
      {/* 20+ Years */}
      <g transform="translate(60, 95)">
        <text x="0" y="0" fill={isHovered ? "#fff" : "#F5F2EC"} fontSize="30" fontWeight="500" fontFamily="var(--font-heading)" letterSpacing="0.5" className="transition-colors duration-300">20+</text>
        <text x="0" y="16" fill="rgba(245, 242, 236, 0.4)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1.2">YEARS OF EXPERTISE</text>
      </g>
      
      {/* 200K+ Travellers */}
      <g transform="translate(240, 95)">
        <text x="12" y="0" fill={isHovered ? "#fff" : "#F5F2EC"} fontSize="30" fontWeight="500" fontFamily="var(--font-heading)" letterSpacing="0.5" className="transition-colors duration-300">200K+</text>
        <text x="0" y="16" fill="rgba(245, 242, 236, 0.4)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1.2">HAPPY TRAVELLERS</text>
      </g>

      
      {/* 75+ Travel Professionals */}
      <g transform="translate(200, 165)">
        <text x="0" y="0" fill={isHovered ? "#C1121F" : "rgba(245,242,236,0.85)"} fontSize="34" fontWeight="500" fontFamily="var(--font-heading)" letterSpacing="0.5" className="transition-colors duration-300" textAnchor="middle">75+</text>
        <text x="0" y="16" fill="rgba(245, 242, 236, 0.4)" fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="1.5" textAnchor="middle">TRAVEL PROFESSIONALS</text>
      </g>
    </svg>
  );
}

// --- Main WhyTravinno Component ---

const whyData = [
  {
    title: 'Local Expertise',
    description: 'Deep destination knowledge backed by experienced teams on the ground across every market we serve.'
  },
  {
    title: 'Trusted Partnerships',
    description: 'Building trusted partnerships across travel agents, hotels, excursion providers, transport companies, and all travel service partners.'
  },
  {
    title: '24/7 Support',
    description: 'Dedicated operational assistance ensuring every journey runs smoothly from arrival to departure.'
  },
  {
    title: 'Global Network',
    description: 'Connecting a trusted global network of travel agents through lasting partnerships.'
  },
  {
    title: 'Operational Excellence',
    description: 'Meticulous planning, seamless execution and attention to detail at every stage of the journey.'
  },
  {
    title: 'Proven Experience',
    description: 'Over two decades of expertise delivering memorable travel experiences and long-term client relationships.'
  }
];

function WhyTravinno() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getVisualComponent = (index, isHovered) => {
    switch (index) {
      case 0: return <LocalExpertiseVisual isHovered={isHovered} />;
      case 1: return <TrustedPartnershipsVisual isHovered={isHovered} />;
      case 2: return <SupportVisual isHovered={isHovered} sectionVisible={sectionVisible} />;
      case 3: return <GlobalNetworkVisual isHovered={isHovered} />;
      case 4: return <OperationalExcellenceVisual isHovered={isHovered} />;
      case 5: return <ProvenExperienceVisual isHovered={isHovered} />;
      default: return null;
    }
  };

  return (
    <section id="why" ref={sectionRef} className="why-section relative overflow-hidden">
      {/* Inline styles for keyframe animations self-containment */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes compass-wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes drift {
          0% { transform: translate(-4px, -4px) scale(0.99); }
          100% { transform: translate(4px, 4px) scale(1.01); }
        }
      `}} />

      <div className="why-container">
        <motion.span
          className="why-title"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="red-dot" /> Why Travinno
        </motion.span>

        <motion.h2
          className="why-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          style={{ marginBottom: '20px' }}
        >
          Experience <span className="journey-allura-text" style={{ verticalAlign: 'baseline', margin: '0 4px' }}>Travinno</span> Excellence
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '16px',
            lineHeight: 1.8,
            letterSpacing: '-0.02em',
            color: 'rgba(245, 242, 236, 0.6)',
            fontWeight: 300,
            maxWidth: '620px',
            textAlign: 'center',
            margin: '0 auto 60px auto'
          }}
        >
          Discover how we deliver seamless travel management, unparalleled local expertise, and operational excellence for travel professionals worldwide.
        </motion.p>

        <div className="why-grid">
          {whyData.map((item, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <motion.div
                key={index}
                className="why-card group overflow-hidden"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 + (index % 3) * 0.12 }}
              >
                {/* Soft crimson ambient glow at the top center, slightly increasing opacity on hover */}
                <div 
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-500 z-0 rounded-[22px] bg-[radial-gradient(circle_at_50%_0%,rgba(193,18,31,0.08)_0%,transparent_70%)] ${isHovered ? 'opacity-100' : 'opacity-40'}`} 
                />

                {/* Animated vector visual container */}
                <div className="why-card-visual flex items-center justify-center overflow-hidden z-2 relative bg-[#040404] transition-all duration-500 group-hover:bg-[#070707] group-hover:brightness-110">
                  {getVisualComponent(index, isHovered)}
                </div>

                {/* Content Panel structured with flex-grow to push description to bottom */}
                <div className="why-card-content relative z-10 flex flex-col flex-grow">
                  <h3 className="why-card-title text-white/80 group-hover:text-white transition-all duration-500 ease-in-out">
                    {item.title}
                  </h3>
                  <p className="why-card-desc text-white/50 group-hover:text-white/75 transition-all duration-500 ease-in-out pb-3">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default React.memo(WhyTravinno);

