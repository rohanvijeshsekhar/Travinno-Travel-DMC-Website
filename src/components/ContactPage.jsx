"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { db } from '../lib/db';

const faderTransition = { duration: 1.2, ease: [0.25, 1, 0.5, 1] };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    agencyName: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What services does Travinno offer?",
      a: "Travinno is a leading B2B travel solutions provider, specializing in customized tour packages, corporate travel management, destination marketing, and MICE (Meetings, Incentives, Conferences, and Exhibitions) services. Our goal is to deliver seamless travel experiences while securing our partners interests."
    },
    {
      q: "How can I book a tour or hotel through Travinno?",
      a: "You can book by contacting our team via email, phone, or through our website. Our travel experts will assist in customizing your itinerary and ensuring the best deals for you and your clients."
    },
    {
      q: "Does Travinno offer B2B travel solutions?",
      a: "Yes! We specialize in B2B travel partnerships, providing hotel contracting, destination representation, and exclusive collaborations with travel agencies & tour operators worldwide."
    },
    {
      q: "Which destinations does Travinno handle?",
      a: "We focus on key travel destinations such as Dubai (UAE), Thailand, and Vietnam, offering well-curated experiences for leisure, business, and group travelers."
    },
    {
      q: "Can Travinno handle large group bookings and MICE events?",
      a: "Absolutely! We have extensive experience managing group tours, corporate retreats, meetings, incentives, conferences, and exhibitions (MICE) with fully customized solutions tailored to specific requirements."
    },
    {
      q: "Why should I choose Travinno over other travel service providers?",
      a: "Travinno is trusted by a global network of travel partners, ensuring reliable services, competitive pricing, and seamless operations. Our industry expertise and strong connections help travel agencies and tour operators maximize profitability while delivering exceptional experiences to their clients."
    },
    {
      q: "Where are Travinno’s offices located?",
      a: "Travinno has a strong presence with own offices in Dubai, India, and Thailand. With a dedicated team of over 70 professionals, we ensure seamless operations and exceptional service across these key destinations."
    },
    {
      q: "Does Travinno have its own fleet for operations?",
      a: "Yes! Travinno operates a diverse fleet of vehicles, ranging from premium saloon cars to luxury coaches, catering to different travel needs, whether it's airport transfers, city tours, corporate travel, or large group operations."
    }
  ];

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = "Full name is required";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address";
    }

    if (!formData.phoneNumber.trim()) {
      tempErrors.phoneNumber = "Phone number is required";
    }

    if (!formData.message.trim()) tempErrors.message = "Message is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newInq = {
        id: 'inq_' + Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        agencyName: formData.agencyName,
        message: formData.message,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        read: false
      };
      const currentList = db.getInquiries();
      db.saveInquiries([newInq, ...currentList], `New contact inquiry received from ${newInq.name}`);

      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        agencyName: '',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#F5F2EC', width: '100%', minHeight: '100vh', position: 'relative', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        /* Contact Form Styles */
        .premium-input-field {
          background-color: rgba(255, 255, 255, 0.015) !important;
          border: 1px solid rgba(245, 242, 236, 0.08) !important;
          border-radius: 14px !important;
          color: #F5F2EC !important;
          font-family: 'Satoshi', sans-serif !important;
          font-size: 0.98rem !important;
          padding: 16px 20px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
          outline: none !important;
        }

        .premium-input-field:focus {
          border-color: #C1121F !important;
          background-color: rgba(245, 242, 236, 0.02) !important;
          box-shadow: 0 0 16px rgba(193, 18, 31, 0.12) !important;
        }

        .premium-input-field::placeholder {
          color: rgba(245, 242, 236, 0.25) !important;
        }

        /* Two-column layout grid */
        .contact-layout-grid {
          display: grid;
          grid-template-columns: 4.2fr 5.8fr;
          gap: 40px;
          margin-top: 48px;
        }

        @media (max-width: 1023px) {
          .contact-layout-grid {
            display: flex;
            flex-direction: column;
            gap: 40px;
          }
          
          /* Order stack: Form first, then office info */
          .office-info-col {
            order: 2;
          }
          
          .contact-form-col {
            order: 1;
          }
        }

        /* Divider lines between offices */
        .office-section {
          padding: 32px 0;
          border-bottom: 1px solid rgba(245, 242, 236, 0.08);
          position: relative;
          z-index: 2;
        }

        .office-section:first-of-type {
          padding-top: 0;
        }

        .office-section:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }

        /* Minimal links hovers */
        .editorial-contact-link {
          color: rgba(245, 242, 236, 0.65);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .editorial-contact-link:hover {
          color: #C1121F;
        }

        /* FAQ Accordion Transitions */
        .faq-item-container {
          border-bottom: 1px solid rgba(245, 242, 236, 0.08);
          border-radius: 0px;
          background-color: transparent;
          border: none;
          padding: 20px 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          box-sizing: border-box;
        }

        .faq-item-container.is-open {
          background: linear-gradient(135deg, rgba(20, 20, 22, 0.5) 0%, rgba(193, 18, 31, 0.035) 50%, rgba(10, 10, 12, 0.8) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(245, 242, 236, 0.07);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 30px rgba(0, 0, 0, 0.35);
          border-radius: 16px;
          padding: 24px;
        }

        @media (max-width: 991px) {
          .hero-artwork-container {
            width: 100% !important;
            height: 520px !important;
            right: 0 !important;
            top: 0 !important;
            transform: none !important;
            mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%) !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%) !important;
          }
          .hero-artwork-container img {
            opacity: 0.45 !important;
            border-radius: 0px !important;
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
          backgroundImage: 'linear-gradient(rgba(245, 242, 236, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 242, 236, 0.04) 1px, transparent 1px)',
          backgroundSize: '100px 100px, 100px 100px',
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
        {/* Subtle Floating Movement wrapper (2-3px) */}
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
            src="/demo/images/contact_hero.png"
            alt="Contact Desk Workspace Editorial"
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

      <div style={{ position: 'relative', zIndex: 3, maxWidth: '1200px', margin: '0 auto', padding: '160px 24px 120px 24px', boxSizing: 'border-box' }}>
        
        {/* HERO SECTION */}
        <section style={{ marginBottom: '16px' }}>
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
            Contact Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...faderTransition, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2.5rem, 6vw, 4.4rem)',
              fontWeight: 500,
              lineHeight: 1.15,
              color: '#F5F2EC',
              margin: '0 0 16px 0'
            }}
          >
            Reach Out To <br />
            <span
              style={{
                fontFamily: "'Allura', cursive",
                fontSize: '1.25em',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1.0,
                display: 'inline-block',
                textTransform: 'none',
                background: 'linear-gradient(to bottom, #F5F2EC 15%, #FF6B6B 65%, #C1121F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginTop: '-4px',
                paddingTop: '0px'
              }}
            >
              Our Experts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ ...faderTransition, delay: 0.2 }}
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
            Our dedicated team is ready to coordinate your custom destination logistics and itinerary details. Get in touch with one of our specialized offices.
          </motion.p>
        </section>

        {/* LAYOUT GRID */}
        <div className="contact-layout-grid">

          {/* LEFT COLUMN: OFFICE INFORMATION BOX */}
          <motion.div 
            className="office-info-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...faderTransition, delay: 0.3 }}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.45) 0%, rgba(10, 10, 12, 0.8) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(245, 242, 236, 0.07)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 80px rgba(0, 0, 0, 0.55)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 48px)',
              overflow: 'hidden',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Enhanced Reddish Gradient Wash inside Office Box */}
            <div
              style={{
                position: 'absolute',
                bottom: '-15%',
                left: '-10%',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(193, 18, 31, 0.06) 0%, rgba(234, 28, 41, 0.005) 60%, transparent 100%)',
                filter: 'blur(50px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            {/* Dubai Office */}
            <div className="office-section">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 500, color: '#F5F2EC', margin: '0 0 16px 0' }}>Dubai Office</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0' }}>Travinno Tourism LLC</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'rgba(245, 242, 236, 0.75)' }}>
                    Room No: 213, Abdullah Saeed Belhabb Building, Damascus Street 3, Al Qusais, Dubai, United Arab Emirates
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', flexShrink: 0 }} />
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.86rem' }}>
                    <a href="tel:+971042955141" className="editorial-contact-link">+971 (04) 2955141</a>
                    <span style={{ color: 'rgba(245, 242, 236, 0.2)' }}>|</span>
                    <a href="tel:+971507481902" className="editorial-contact-link">+971 (0) 507481902</a>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  {/* WhatsApp monochrome outline SVG */}
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.4 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <a href="https://wa.me/+971507481902" target="_blank" rel="noopener noreferrer" className="editorial-contact-link" style={{ fontSize: '0.86rem' }}>
                    +971 50 748 1902 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            {/* Thailand Office */}
            <div className="office-section">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 500, color: '#F5F2EC', margin: '0 0 16px 0' }}>Thailand Office</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0' }}>Travinno Co Ltd</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'rgba(245, 242, 236, 0.75)' }}>
                    Room Number P01 P Floor, Soi Sukhumvit 25, Sukhumvit Rd, Klongtoey Nua Sub-district, Wattana District, Bangkok 10110
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', flexShrink: 0 }} />
                  <a href="tel:+660968639332" className="editorial-contact-link" style={{ fontSize: '0.86rem' }}>+66 (0) 9686 39332</a>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.4 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <a href="https://wa.me/+66622800621" target="_blank" rel="noopener noreferrer" className="editorial-contact-link" style={{ fontSize: '0.86rem' }}>
                    +66 62 280 0621 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

            {/* India Office */}
            <div className="office-section">
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 500, color: '#F5F2EC', margin: '0 0 16px 0' }}>India Office</h2>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 4px 0' }}>Travinno</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', marginTop: '3px', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'rgba(245, 242, 236, 0.75)' }}>
                    2nd Floor, Kailas Building, Karshaka Road, Cochin-16, Kerala
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={15} style={{ color: 'rgba(245, 242, 236, 0.4)', flexShrink: 0 }} />
                  <a href="tel:+919048818862" className="editorial-contact-link" style={{ fontSize: '0.86rem' }}>+91 90488 18862</a>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, opacity: 0.4 }}>
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  <a href="https://wa.me/+919048818862" target="_blank" rel="noopener noreferrer" className="editorial-contact-link" style={{ fontSize: '0.86rem' }}>
                    +91 90488 18862 (WhatsApp)
                  </a>
                </div>
              </div>
            </div>

          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM BOX */}
          <motion.div 
            className="contact-form-col"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...faderTransition, delay: 0.4 }}
            style={{
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(20, 20, 22, 0.45) 0%, rgba(10, 10, 12, 0.8) 100%)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(245, 242, 236, 0.07)',
              boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 80px rgba(0, 0, 0, 0.55)',
              borderRadius: '24px',
              padding: 'clamp(24px, 4vw, 48px)',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Enhanced Reddish Gradient Wash inside Form Box */}
            <div
              style={{
                position: 'absolute',
                top: '-15%',
                right: '-10%',
                width: '450px',
                height: '450px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(193, 18, 31, 0.07) 0%, rgba(234, 28, 41, 0.005) 60%, transparent 100%)',
                filter: 'blur(60px)',
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            <div style={{ position: 'relative', zIndex: 2 }}>
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="redesign-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
                  >
                    {/* Full Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Full Name *</label>
                      <input 
                        type="text" 
                        className="premium-input-field" 
                        placeholder="e.g. Alexander Mercer"
                        value={formData.fullName}
                        onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      />
                      {errors.fullName && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', marginTop: '4px' }}>{errors.fullName}</span>}
                    </div>

                    {/* Email Address */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Email Address *</label>
                      <input 
                        type="email" 
                        className="premium-input-field" 
                        placeholder="alexander@mercer.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                      {errors.email && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', marginTop: '4px' }}>{errors.email}</span>}
                    </div>

                    {/* Phone Number */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Phone Number *</label>
                      <input 
                        type="tel" 
                        className="premium-input-field" 
                        placeholder="+971 50 123 4567"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      />
                      {errors.phoneNumber && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', marginTop: '4px' }}>{errors.phoneNumber}</span>}
                    </div>

                    {/* Agency Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Agency Name</label>
                      <input 
                        type="text" 
                        className="premium-input-field" 
                        placeholder="e.g. Mercer Travel Agency"
                        value={formData.agencyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, agencyName: e.target.value }))}
                      />
                    </div>

                    {/* Message */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Message *</label>
                      <textarea 
                        className="premium-input-field" 
                        placeholder="Outline your inquiry details here. A luxury consultant will reply shortly."
                        style={{ minHeight: '140px', resize: 'vertical' }}
                        value={formData.message}
                        onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      />
                      {errors.message && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', marginTop: '4px' }}>{errors.message}</span>}
                    </div>

                    {/* CTA Action */}
                    <div style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                      <motion.button
                        type="submit"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(8px)',
                          WebkitBackdropFilter: 'blur(8px)',
                          border: '1px solid rgba(245, 242, 236, 0.1)',
                          padding: '16px 36px',
                          borderRadius: '100px',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          color: '#F5F2EC',
                          letterSpacing: '1.5px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                          transition: 'border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease'
                        }}
                        whileHover={{ 
                          scale: 1.02, 
                          backgroundColor: 'rgba(193, 18, 31, 0.1)',
                          borderColor: '#C1121F',
                          boxShadow: '0 6px 24px rgba(193, 18, 31, 0.25)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Enquiry <ArrowRight size={16} />
                      </motion.button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="redesign-success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ 
                      textAlign: 'center', 
                      padding: '60px 40px', 
                      border: '1px solid rgba(245, 242, 236, 0.08)',
                      borderRadius: '14px',
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      gap: '24px' 
                    }}
                  >
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(193, 18, 31, 0.15)', border: '1px solid rgba(193, 18, 31, 0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <CheckCircle2 size={26} style={{ color: '#C1121F' }} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 500, color: '#F5F2EC', margin: 0 }}>Enquiry Sent</h3>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.94rem', lineHeight: 1.6, color: 'rgba(245, 242, 236, 0.65)', maxWidth: '420px', margin: 0 }}>
                      Your inquiry details have been registered. A specialized destination team member will follow up with your agency coordinates shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(245, 242, 236, 0.25)',
                        padding: '10px 24px',
                        borderRadius: '100px',
                        color: '#F5F2EC',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.8rem',
                        letterSpacing: '1px',
                        cursor: 'pointer',
                        marginTop: '12px',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = '#C1121F'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(245, 242, 236, 0.25)'}
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

        {/* FAQ ACCORDION SECTION */}
        <section style={{ maxWidth: '900px', margin: '140px auto 0 auto', position: 'relative', zIndex: 5 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.1rem, 5vw, 3rem)', fontWeight: 500, color: '#F5F2EC', margin: '0 0 12px 0' }}>
              Your questions, answered
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1rem', color: 'rgba(245, 242, 236, 0.55)', margin: 0 }}>
              Answers to the most frequently asked questions.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index}
                  className={`faq-item-container ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      background: 'transparent',
                      border: 'none',
                      color: '#F5F2EC',
                      cursor: 'pointer',
                      textAlign: 'left',
                      padding: 0,
                      outline: 'none'
                    }}
                  >
                    <span style={{ 
                      fontFamily: 'var(--font-sans)', 
                      fontSize: '1.04rem', 
                      fontWeight: 500, 
                      color: isOpen ? '#F5F2EC' : 'rgba(245, 242, 236, 0.85)', 
                      transition: 'color 0.3s' 
                    }}>
                      {faq.q}
                    </span>
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', 
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' 
                    }}>
                      <ChevronDown size={18} style={{ color: isOpen ? '#C1121F' : 'rgba(245, 242, 236, 0.4)' }} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p style={{ 
                          fontFamily: 'var(--font-sans)', 
                          fontSize: '0.94rem', 
                          lineHeight: 1.65, 
                          color: 'rgba(245, 242, 236, 0.65)', 
                          margin: 0 
                        }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
