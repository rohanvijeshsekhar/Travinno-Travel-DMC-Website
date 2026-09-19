"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Globe, Key, UserCheck, Mail } from 'lucide-react';

const faderTransition = { duration: 1.0, ease: [0.25, 1, 0.5, 1] };

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'overview',
      label: '1. Overview',
      icon: <Shield size={16} />,
      title: 'Privacy Overview',
      content: (
        <>
          <p className="editorial-paragraph">
            At Travinno, we orchestrate extraordinary luxury journeys, bespoke itineraries, and elite destination management services worldwide. As part of our commitment to delivering an unparalleled level of service, we hold ourselves to the highest standards of data protection, privacy, and confidentiality.
          </p>
          <p className="editorial-paragraph">
            This Privacy Policy details how we collect, process, utilize, and protect your personal information when you interact with our platforms, consult with our travel specialists, or commission our services. We ensure all personal data is handled in strict compliance with the General Data Protection Regulation (GDPR), the UAE Data Protection Laws, and other applicable international privacy regulations.
          </p>
        </>
      )
    },
    {
      id: 'collection',
      label: '2. Information We Collect',
      icon: <Eye size={16} />,
      title: 'Information We Collect',
      content: (
        <>
          <p className="editorial-paragraph">
            To curate bespoke, high-end travel experiences, we collect specific information necessary to organize flights, accommodations, visa processes, yacht charters, and VIP transfers. This includes:
          </p>
          <ul className="premium-policy-list">
            <li><strong>Identity & Personal Details:</strong> Full name, date of birth, gender, nationality, passport details (including copy scans where required for flight/hotel bookings).</li>
            <li><strong>Contact Information:</strong> Phone numbers, primary and secondary email addresses, physical address, and emergency contact details.</li>
            <li><strong>Travel Preferences & Profile details:</strong> Preferred airlines, seat configurations, dietary requirements, medical conditions (specifically allergies or physical limitations relevant to safety), loyalty program details, and special anniversaries.</li>
            <li><strong>Financial & Transaction Details:</strong> Secure billing details, billing addresses, and payment histories related to luxury packages commission.</li>
          </ul>
        </>
      )
    },
    {
      id: 'usage',
      label: '3. How We Use Data',
      icon: <FileText size={16} />,
      title: 'How We Use Your Data',
      content: (
        <>
          <p className="editorial-paragraph">
            Your personal data is processed solely for legitimate business purposes under the following legal bases:
          </p>
          <table className="premium-policy-table">
            <thead>
              <tr>
                <th>Purpose of Processing</th>
                <th>Legal Basis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Executing Travel Bookings:</strong> Reserving luxury villas, flights, yacht charters, and local destination handlers.</td>
                <td>Performance of a Contract</td>
              </tr>
              <tr>
                <td><strong>Client Relationship Support:</strong> Sending updates, handling emergencies, and offering 24/7 global concierge support.</td>
                <td>Performance of a Contract</td>
              </tr>
              <tr>
                <td><strong>Curating Tailored Proposals:</strong> Analyzing your preferences to suggest matching private islands or exclusive packages.</td>
                <td>Legitimate Interest / Consent</td>
              </tr>
              <tr>
                <td><strong>Regulatory & Legal Compliance:</strong> Compliance with aviation authorities, border controls, tax records, and local laws.</td>
                <td>Legal Obligation</td>
              </tr>
            </tbody>
          </table>
        </>
      )
    },
    {
      id: 'security',
      label: '4. Data Security',
      icon: <Lock size={16} />,
      title: 'Securing Your Information',
      content: (
        <>
          <p className="editorial-paragraph">
            We implement state-of-the-art administrative, physical, and digital security measures to defend your personal data from unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p className="editorial-paragraph">
            All credit card transactions, passport details, and travel itineraries are encrypted using Secure Socket Layer (SSL/TLS) protocols. Our Hostinger MySQL database clusters are protected behind robust firewalls and undergo regular automated backups. Access to sensitive travel profiles is strictly limited to authorized travel specialists and coordinators.
          </p>
        </>
      )
    },
    {
      id: 'sharing',
      label: '5. Sharing & Transfers',
      icon: <Globe size={16} />,
      title: 'Third Party Data Sharing',
      content: (
        <>
          <p className="editorial-paragraph">
            We never trade, sell, or rent your personal data to third-party marketers. To successfully coordinate your travel, we share strictly relevant details with the following:
          </p>
          <ul className="premium-policy-list">
            <li><strong>Service Partners:</strong> Airlines, hotels, yacht charters, transport operators, and local destination management teams.</li>
            <li><strong>Border Controls & Safety:</strong> Customs, immigration, and aviation safety agencies where required by international treaties.</li>
            <li><strong>Trusted Tech Vendors:</strong> Secure payment processors, database managers, and communication channels.</li>
          </ul>
        </>
      )
    },
    {
      id: 'cookies',
      label: '6. Cookies & Logs',
      icon: <Key size={16} />,
      title: 'Cookies & Analytics',
      content: (
        <>
          <p className="editorial-paragraph">
            Our platform uses cookies and session logs to deliver a seamless browsing experience. We use analytical cookies (like Google Analytics) to study visitor behavior, monitor page speed, and refine user interface layouts.
          </p>
          <p className="editorial-paragraph">
            You can modify your browser settings to reject cookies, though doing so might restrict some premium features or visual layouts on our dynamic pages.
          </p>
        </>
      )
    },
    {
      id: 'rights',
      label: '7. Your Legal Rights',
      icon: <UserCheck size={16} />,
      title: 'Your Privacy Rights',
      content: (
        <>
          <p className="editorial-paragraph">
            Depending on your legal jurisdiction (such as GDPR in Europe), you hold various rights over your personal data:
          </p>
          <ul className="premium-policy-list">
            <li><strong>The Right to Access:</strong> Ask for details of all personal data we hold about you.</li>
            <li><strong>The Right to Rectification:</strong> Request correction of any inaccurate or outdated details.</li>
            <li><strong>The Right to Erasure:</strong> Ask us to delete your personal profile (the "right to be forgotten"), subject to outstanding travel bookings or regulatory record-keeping rules.</li>
            <li><strong>The Right to Object/Restrict:</strong> Withdraw consent for marketing emails at any point.</li>
          </ul>
        </>
      )
    },
    {
      id: 'contact',
      label: '8. Contact Us',
      icon: <Mail size={16} />,
      title: 'Contact Our Data Officer',
      content: (
        <>
          <p className="editorial-paragraph">
            If you have questions about this Privacy Policy, wish to exercise your legal data rights, or want to update your travel profiles, contact our dedicated data privacy office:
          </p>
          <div style={{
            marginTop: '20px',
            backgroundColor: 'rgba(245, 242, 236, 0.02)',
            border: '1px solid rgba(245, 242, 236, 0.06)',
            borderRadius: '12px',
            padding: '20px',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            color: 'rgba(245, 242, 236, 0.75)'
          }}>
            <strong>Travinno Privacy Office</strong><br />
            Level 15, The Gate District, DIFC, UAE<br />
            Email: <a href="mailto:privacy@travinno.com" style={{ color: '#C1121F', textDecoration: 'none' }}>privacy@travinno.com</a><br />
            Phone: +971 4 575 6105
          </div>
        </>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={faderTransition}
      style={{
        backgroundColor: '#050505',
        color: '#F5F2EC',
        width: '100%',
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        boxSizing: 'border-box'
      }}
    >
      <style>{`
        .editorial-paragraph {
          font-family: 'Satoshi', sans-serif;
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(245, 242, 236, 0.7);
          margin-bottom: 20px;
        }

        .premium-policy-list {
          font-family: 'Satoshi', sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(245, 242, 236, 0.7);
          padding-left: 20px;
          margin-bottom: 24px;
        }

        .premium-policy-list li {
          margin-bottom: 12px;
        }

        .premium-policy-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 24px;
          margin-bottom: 24px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.92rem;
          text-align: left;
        }

        .premium-policy-table th {
          border-bottom: 2px solid rgba(245, 242, 236, 0.12);
          padding: 12px 8px;
          color: #F5F2EC;
          font-weight: 600;
        }

        .premium-policy-table td {
          border-bottom: 1px solid rgba(245, 242, 236, 0.06);
          padding: 14px 8px;
          color: rgba(245, 242, 236, 0.65);
          vertical-align: top;
        }

        .premium-policy-table tr:hover td {
          color: #F5F2EC;
          background-color: rgba(245, 242, 236, 0.01);
        }

        .policy-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          font-family: 'Satoshi', sans-serif;
          font-size: 0.95rem;
          color: rgba(245, 242, 236, 0.45);
          background: transparent;
          border: none;
          border-left: 2px solid rgba(245, 242, 236, 0.06);
          text-align: left;
          width: 100%;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .policy-nav-item:hover {
          color: #F5F2EC;
          border-left-color: rgba(245, 242, 236, 0.3);
          background-color: rgba(245, 242, 236, 0.015);
        }

        .policy-nav-item.active {
          color: #C1121F;
          border-left-color: #C1121F;
          background-color: rgba(193, 18, 31, 0.03);
          font-weight: 500;
        }

        .policy-layout-grid {
          display: grid;
          grid-template-columns: 2.8fr 7.2fr;
          gap: 50px;
          margin-top: 48px;
        }

        @media (max-width: 900px) {
          .policy-layout-grid {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          .policy-sidebar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            border-bottom: 1px solid rgba(245, 242, 236, 0.08);
            padding-bottom: 20px;
          }
          .policy-nav-item {
            width: auto;
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 16px;
          }
          .policy-nav-item.active {
            border-bottom-color: #C1121F;
            background-color: rgba(193, 18, 31, 0.05);
          }
        }
      `}</style>

      {/* Base background overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(rgba(245, 242, 236, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 242, 236, 0.03) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto', padding: '160px 24px 120px 24px', boxSizing: 'border-box' }}>
        
        {/* Header */}
        <header style={{ marginBottom: '40px', borderBottom: '1px solid rgba(245, 242, 236, 0.08)', paddingBottom: '30px' }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C1121F',
              display: 'block',
              marginBottom: '12px'
            }}
          >
            Data Protection & Security
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: 400,
              color: '#F5F2EC',
              margin: 0,
              lineHeight: 1.15
            }}
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.9rem',
              color: 'rgba(245, 242, 236, 0.45)',
              marginTop: '12px',
              margin: 0
            }}
          >
            Last Updated: July 11, 2026 • Version 2.0
          </motion.p>
        </header>

        {/* Policy Body Layout */}
        <div className="policy-layout-grid">
          
          {/* Sidebar Navigation */}
          <div className="policy-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={`policy-nav-item ${activeSection === sec.id ? 'active' : ''}`}
                onClick={() => setActiveSection(sec.id)}
              >
                {sec.icon}
                {sec.label}
              </button>
            ))}
          </div>

          {/* Reading Pane Content */}
          <div style={{ minHeight: '400px' }}>
            {sections.map((sec) => sec.id === activeSection && (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 400,
                    color: '#F5F2EC',
                    marginTop: 0,
                    marginBottom: '24px'
                  }}
                >
                  {sec.title}
                </h2>
                {sec.content}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
