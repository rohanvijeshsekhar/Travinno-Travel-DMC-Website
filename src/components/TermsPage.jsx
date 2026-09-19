"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ClipboardList, AlertTriangle, UserCheck, ShieldAlert, BadgeDollarSign, HelpCircle, Scale } from 'lucide-react';

const faderTransition = { duration: 1.0, ease: [0.25, 1, 0.5, 1] };

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: 'acceptance',
      label: '1. Acceptance of Terms',
      icon: <ClipboardList size={16} />,
      title: 'Acceptance of Terms & Conditions',
      content: (
        <>
          <p className="editorial-paragraph">
            Welcome to Travinno. These Terms of Service ("Terms") govern your access to and use of the Travinno website, bespoke travel planning tools, concierge services, and booking platforms.
          </p>
          <p className="editorial-paragraph">
            By engaging our services, commissioning a luxury itinerary, or accessing our platforms, you acknowledge that you have read, understood, and agreed to be bound by these Terms. If you are acting on behalf of a corporate entity or group of passengers, you warrant that you have the authority to accept these Terms on their behalf.
          </p>
        </>
      )
    },
    {
      id: 'bookings',
      label: '2. Bookings & Payments',
      icon: <BadgeDollarSign size={16} />,
      title: 'Reservations, Deposits & Billing',
      content: (
        <>
          <p className="editorial-paragraph">
            To secure bespoke travel reservations (including hotels, private villas, flights, yacht charters, and local excursions), specific deposit schedules are required:
          </p>
          <ul className="premium-policy-list">
            <li><strong>Quotes and Proposals:</strong> All rates quoted are subject to availability and currency fluctuations until a formal booking confirmation is issued.</li>
            <li><strong>Deposit Requirements:</strong> A non-refundable deposit (typically 30% of the total package value, unless specified otherwise for high-season bookings) is required to initialize reservations.</li>
            <li><strong>Final Payments:</strong> The remaining balance must be paid at least 30 days prior to the travel departure date. Failure to make timely payments may result in booking cancellation and forfeiture of deposits.</li>
          </ul>
        </>
      )
    },
    {
      id: 'cancellations',
      label: '3. Cancellation & Refunds',
      icon: <AlertTriangle size={16} />,
      title: 'Cancellations, Re-bookings & Refunds',
      content: (
        <>
          <p className="editorial-paragraph">
            Because luxury travel bookings involve multiple third-party operators (such as international airlines and boutique hotels), cancellations are subject to strict conditions:
          </p>
          <ul className="premium-policy-list">
            <li><strong>Client-Initiated Cancellations:</strong> Requests must be submitted in writing. Cancellation fees vary based on the date of request relative to your departure date.</li>
            <li><strong>Supplier Fees:</strong> Any fees charged by airlines, resorts, or cruise liners will be passed directly to the client. Promotional or peak-season bookings are frequently 100% non-refundable.</li>
            <li><strong>Refund Processing:</strong> Approved refunds will be processed via the original payment method, minus bank processing charges, within 14 to 30 business days.</li>
          </ul>
        </>
      )
    },
    {
      id: 'obligations',
      label: '4. Client Responsibilities',
      icon: <UserCheck size={16} />,
      title: 'Travel Documents, Visas & Passports',
      content: (
        <>
          <p className="editorial-paragraph">
            It is the sole responsibility of the traveler to ensure compliance with international border, health, and transit regulations:
          </p>
          <ul className="premium-policy-list">
            <li><strong>Passport Validity:</strong> Passports must be valid for at least 6 months beyond your scheduled return date and contain sufficient blank pages.</li>
            <li><strong>Visas and Permits:</strong> Clients must secure appropriate entry visas and transit approvals for all destinations and layover hubs.</li>
            <li><strong>Health and Vaccinations:</strong> Travelers must comply with local medical mandates, health declarations, and vaccination recommendations required by destination countries.</li>
          </ul>
        </>
      )
    },
    {
      id: 'liability',
      label: '5. Limitation of Liability',
      icon: <ShieldAlert size={16} />,
      title: 'Limitation of Liability & Insurance',
      content: (
        <>
          <p className="editorial-paragraph">
            Travinno acts as an agent connecting clients with top-tier travel providers. While we vet all partners thoroughly, we hold no liability for service interruptions, flight delays, hotel overbookings, or bodily injury caused by third-party suppliers.
          </p>
          <p className="editorial-paragraph">
            We **strongly recommend** that all travelers purchase comprehensive luxury travel insurance covering trip cancellation, medical evacuation, personal baggage loss, and adventure activities before starting their journey.
          </p>
        </>
      )
    },
    {
      id: 'intellectual',
      label: '6. Intellectual Property',
      icon: <FileText size={16} />,
      title: 'Proprietary Content & Trademarks',
      content: (
        <>
          <p className="editorial-paragraph">
            All materials displayed on our platforms—including customized itineraries, text, brand marks, high-resolution visuals, layouts, and logos—are the exclusive intellectual property of Travinno or licensed partners.
          </p>
          <p className="editorial-paragraph">
            No part of our content, itineraries, or design systems may be reproduced, distributed, or repurposed for commercial travel planning outside of Travinno without our express written consent.
          </p>
        </>
      )
    },
    {
      id: 'governing',
      label: '7. Governing Law',
      icon: <Scale size={16} />,
      title: 'Governing Law & Dispute Resolution',
      content: (
        <>
          <p className="editorial-paragraph">
            These Terms and any travel booking disputes are governed by and construed in accordance with the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates.
          </p>
          <p className="editorial-paragraph">
            Any disputes arising from these Terms or travel contracts that cannot be resolved amicably shall be submitted to the exclusive jurisdiction of the competent courts of Dubai, UAE.
          </p>
        </>
      )
    },
    {
      id: 'help',
      label: '8. Queries & Contact',
      icon: <HelpCircle size={16} />,
      title: 'Questions Regarding Terms',
      content: (
        <>
          <p className="editorial-paragraph">
            Should you require clarification on any of the sections listed in our Terms of Service, or want to discuss travel agreements, contact our legal compliance office:
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
            <strong>Travinno Legal & Compliance Hub</strong><br />
            Level 15, The Gate District, DIFC, UAE<br />
            Email: <a href="mailto:legal@travinno.com" style={{ color: '#C1121F', textDecoration: 'none' }}>legal@travinno.com</a><br />
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

        .terms-nav-item {
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

        .terms-nav-item:hover {
          color: #F5F2EC;
          border-left-color: rgba(245, 242, 236, 0.3);
          background-color: rgba(245, 242, 236, 0.015);
        }

        .terms-nav-item.active {
          color: '#C1121F';
          border-left-color: #C1121F;
          background-color: rgba(193, 18, 31, 0.03);
          font-weight: 500;
        }

        .terms-layout-grid {
          display: grid;
          grid-template-columns: 2.8fr 7.2fr;
          gap: 50px;
          margin-top: 48px;
        }

        @media (max-width: 900px) {
          .terms-layout-grid {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
          .terms-sidebar {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            border-bottom: 1px solid rgba(245, 242, 236, 0.08);
            padding-bottom: 20px;
          }
          .terms-nav-item {
            width: auto;
            border-left: none;
            border-bottom: 2px solid transparent;
            padding: 8px 16px;
          }
          .terms-nav-item.active {
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
            Agreement of Service
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
            Terms of Service
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

        {/* Terms Body Layout */}
        <div className="terms-layout-grid">
          
          {/* Sidebar Navigation */}
          <div className="terms-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {sections.map((sec) => (
              <button
                key={sec.id}
                className={`terms-nav-item ${activeSection === sec.id ? 'active' : ''}`}
                style={{
                  color: activeSection === sec.id ? '#C1121F' : 'rgba(245, 242, 236, 0.45)',
                  borderLeftColor: activeSection === sec.id ? '#C1121F' : 'rgba(245, 242, 236, 0.06)',
                  backgroundColor: activeSection === sec.id ? 'rgba(193, 18, 31, 0.03)' : 'transparent'
                }}
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
