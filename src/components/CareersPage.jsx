"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Clock, Upload, X, CheckCircle, ArrowRight } from 'lucide-react';
import { db } from '../lib/db';

// Future-proof, modifiable job listings data structure
const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Travel Consultant',
    location: 'Dubai, UAE',
    type: 'Full-Time',
    description: 'Help create premium leisure and corporate travel experiences for global clients.',
    status: 'Open'
  },
  {
    id: 2,
    title: 'Operations & Destination Coordinator',
    location: 'Cochin, India',
    type: 'Full-Time',
    description: 'Coordinate ground logistics, hotel contracts, and transit operations for luxury tours.',
    status: 'Open'
  },
  {
    id: 3,
    title: 'Luxury Travel Representative',
    location: 'Bangkok, Thailand',
    type: 'Contract',
    description: 'Deliver bespoke local guiding, transfer coordination, and VIP guest relations.',
    status: 'Open'
  },
  {
    id: 4,
    title: 'Digital Marketing Lead',
    location: 'London, UK',
    type: 'Full-Time',
    description: 'Direct digital brand strategies, campaigns, and audience growth across global luxury sectors.',
    status: 'Closed'
  }
];

export default function CareersPage() {
  const [jobs, setJobs] = useState(() => db.getCareers());

  useEffect(() => {
    const handleUpdate = () => setJobs(db.getCareers());
    window.addEventListener('travinno-db-update', handleUpdate);
    return () => window.removeEventListener('travinno-db-update', handleUpdate);
  }, []);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: ''
  });

  const [errors, setErrors] = useState({});

  // Filter only open positions
  const openPositions = jobs.filter(job => job.status === 'Open');

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  // Escape key close handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const openApplyModal = (job = null) => {
    setSelectedJob(job);
    setIsModalOpen(true);
    setFormSubmitted(false);
    setSelectedFile(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      coverLetter: ''
    });
    setErrors({});
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, file: 'File exceeds the maximum size limit of 5MB.' }));
        setSelectedFile(null);
      } else {
        setSelectedFile(file);
        setErrors(prev => {
          const copy = { ...prev };
          delete copy.file;
          return copy;
        });
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email formatting.';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required.';
    if (!selectedFile) newErrors.file = 'Please upload your CV/Resume.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newApp = {
      id: 'app_' + Date.now(),
      jobTitle: selectedJob ? selectedJob.title : 'General Inquiry',
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      coverLetter: formData.coverLetter || '',
      fileName: selectedFile ? selectedFile.name : 'resume.pdf',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    const list = db.getApplications();
    db.saveApplications([...list, newApp], `New job application from ${newApp.fullName} for ${newApp.jobTitle}`);

    setFormSubmitted(true);
  };

  const faderTransition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] };

  return (
    <div style={{ backgroundColor: '#050505', color: '#F5F2EC', width: '100%', minHeight: '100vh', position: 'relative', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        /* Local Careers Section styling to keep index.css lean */
        .careers-container {
          position: relative; 
          z-index: 2; 
          max-width: 1200px; 
          margin: 0 auto; 
          padding: 160px 24px 120px 24px; 
          box-sizing: border-box;
        }

        .job-card-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 20px;
        }

        .premium-job-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          background: linear-gradient(180deg, rgba(16, 16, 20, 0.7) 0%, rgba(10, 10, 12, 0.9) 100%);
          border: 1px solid rgba(245, 242, 236, 0.09);
          border-radius: 18px;
          padding: 36px 40px;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 30px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
        }

        .premium-job-card:hover {
          border-color: rgba(193, 18, 31, 0.65);
          background: linear-gradient(180deg, rgba(24, 24, 30, 0.85) 0%, rgba(15, 15, 18, 0.98) 100%);
          transform: translateY(-6px);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.08), 
            0 20px 40px -10px rgba(193, 18, 31, 0.22), 
            0 30px 60px -15px rgba(0, 0, 0, 0.85);
        }

        .job-card-info {
          flex: 0 0 300px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .job-card-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          color: rgba(245, 242, 236, 0.45);
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .meta-item svg {
          stroke-width: 2px;
        }

        .job-card-title {
          font-family: var(--font-heading);
          font-size: 1.45rem;
          font-weight: 500;
          color: #F5F2EC;
          margin: 4px 0 0 0;
          letter-spacing: -0.2px;
        }

        .job-card-desc {
          flex: 1;
          font-family: var(--font-sans);
          font-size: 0.94rem;
          line-height: 1.65;
          color: rgba(245, 242, 236, 0.65);
          font-weight: 300;
          max-width: 480px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .job-card-action {
          flex: 0 0 auto;
        }

        .premium-apply-btn {
          background: transparent;
          border: 1px solid rgba(245, 242, 236, 0.15);
          padding: 12px 28px;
          border-radius: 100px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          color: #F5F2EC;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .premium-job-card:hover .premium-apply-btn {
          background-color: #C1121F;
          border-color: #C1121F;
          color: #F5F2EC;
          box-shadow: 0 4px 16px rgba(193, 18, 31, 0.25);
        }

        /* Form Inputs */
        .premium-input-field {
          background-color: rgba(255, 255, 255, 0.015) !important;
          border: 1px solid rgba(245, 242, 236, 0.08) !important;
          border-radius: 14px !important;
          color: #F5F2EC !important;
          font-family: var(--font-sans) !important;
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

        /* File Upload */
        .premium-file-upload {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 24px 20px;
          background: rgba(255, 255, 255, 0.012);
          border: 1px dashed rgba(245, 242, 236, 0.15);
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
        }

        .premium-file-upload:hover {
          border-color: #C1121F;
          background-color: rgba(245, 242, 236, 0.015);
        }

        /* Glassmorphic Form Submit Button */
        .glassy-submit-btn {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(245, 242, 236, 0.1);
          padding: 16px 36px;
          border-radius: 100px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          color: #F5F2EC;
          letter-spacing: 1.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          width: 100%;
        }

        .glassy-submit-btn:hover {
          background-color: rgba(193, 18, 31, 0.1);
          border-color: #C1121F;
          box-shadow: 0 6px 24px rgba(193, 18, 31, 0.25);
          transform: translateY(-1px);
        }

        /* Modal Overlay and Window */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(5, 5, 5, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
        }

        .modal-content {
          background-color: #0c0c0e;
          border: 1px solid rgba(245, 242, 236, 0.08);
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          padding: 40px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.8);
          box-sizing: border-box;
        }

        .modal-close-btn {
          position: absolute;
          top: 24px;
          right: 24px;
          background: transparent;
          border: none;
          color: rgba(245, 242, 236, 0.4);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }

        .modal-close-btn:hover {
          color: #F5F2EC;
          transform: scale(1.1);
        }

        @media (max-width: 991px) {
          .premium-job-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
            padding: 30px;
          }
          .job-card-info {
            flex: none;
            width: 100%;
          }
          .job-card-desc {
            max-width: 100%;
          }
          .job-card-action {
            width: 100%;
          }
          .premium-apply-btn {
            width: 100%;
            justify-content: center;
          }
        }
        
        @media (max-width: 576px) {
          .modal-content {
            padding: 32px 24px;
          }
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
            src="/demo/images/careers_hero.png"
            alt="Executive Workspace Editorial"
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

      <div className="careers-container">
        
        {/* HERO SECTION */}
        <section style={{ marginBottom: '24px', position: 'relative' }}>
          
          <div style={{ maxWidth: '640px', position: 'relative', zIndex: 3 }}>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
              Careers
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
              Build Extraordinary <br />
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
                Journeys With Us
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
              Join a passionate team creating exceptional travel experiences across global destinations. At Travinno, every role contributes to unforgettable journeys.
            </motion.p>
          </div>
        </section>

        {/* OPEN POSITIONS / AVAILABLE OPPORTUNITIES */}
        <section style={{ position: 'relative' }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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
            Available Opportunities
          </motion.div>

          {openPositions.length > 0 ? (
            <div className="job-card-grid">
              {openPositions.map((job, idx) => (
                <motion.div
                  key={job.id}
                  className="premium-job-card"
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                >
                  <div className="job-card-info">
                    <div className="job-card-meta">
                      <div className="meta-item">
                        <MapPin size={13} style={{ color: '#C1121F' }} />
                        <span>{job.location}</span>
                      </div>
                      <span>•</span>
                      <div className="meta-item">
                        <Briefcase size={13} style={{ color: 'rgba(245, 242, 236, 0.5)' }} />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <h3 className="job-card-title">{job.title}</h3>
                  </div>

                  <p className="job-card-desc">{job.description}</p>

                  <div className="job-card-action">
                    <button onClick={() => openApplyModal(job)} className="premium-apply-btn">
                      Apply Now <ArrowRight size={13} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            /* EMPTY STATE */
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                textAlign: 'center',
                padding: '80px 40px',
                border: '1px solid rgba(245, 242, 236, 0.06)',
                borderRadius: '20px',
                background: 'rgba(255, 255, 255, 0.005)'
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 500, margin: '0 0 12px 0', color: '#F5F2EC' }}>No Current Openings</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.96rem', color: 'rgba(245, 242, 236, 0.55)', margin: '0 0 32px 0', fontWeight: 300 }}>
                We’re always looking for exceptional talent. Check back soon for future opportunities.
              </p>
              <button onClick={() => openApplyModal(null)} className="premium-apply-btn" style={{ margin: '0 auto' }}>
                Send Your Resume <ArrowRight size={13} />
              </button>
            </motion.div>
          )}
        </section>

      </div>

      {/* APPLICATION MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button className="modal-close-btn" onClick={closeModal} aria-label="Close Modal">
                <X size={20} />
              </button>

              {!formSubmitted ? (
                <>
                  <div style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 500, color: '#F5F2EC', margin: '0 0 8px 0' }}>
                      Submit Your Application
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '1px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>
                        Applying for
                      </span>
                      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '1.05rem', fontWeight: 500, color: '#C1121F' }}>
                        {selectedJob ? selectedJob.title : 'General Application'}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Position Applied For */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Position Applied For</label>
                      <input
                        type="text"
                        className="premium-input-field"
                        value={selectedJob ? selectedJob.title : 'General Application'}
                        disabled
                        style={{ opacity: 0.6, cursor: 'not-allowed', backgroundColor: 'rgba(255, 255, 255, 0.005) !important' }}
                      />
                    </div>

                    {/* Full Name */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Full Name *</label>
                      <input
                        type="text"
                        placeholder="e.g. Alexander Mercer"
                        className="premium-input-field"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                      />
                      {errors.fullName && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>{errors.fullName}</span>}
                    </div>

                    {/* Email Address */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Email Address *</label>
                      <input
                        type="email"
                        placeholder="alexander@mercer.com"
                        className="premium-input-field"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                      {errors.email && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>{errors.email}</span>}
                    </div>

                    {/* Phone Number */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Phone Number *</label>
                      <input
                        type="tel"
                        placeholder="+971 4 575 6105"
                        className="premium-input-field"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                      {errors.phone && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)' }}>{errors.phone}</span>}
                    </div>

                    {/* Upload CV / Resume */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Upload CV / Resume *</label>
                      <label className="premium-file-upload">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                        <Upload size={18} style={{ color: selectedFile ? '#C1121F' : 'rgba(245, 242, 236, 0.4)' }} />
                        <span style={{ fontSize: '0.86rem', color: selectedFile ? '#F5F2EC' : 'rgba(245, 242, 236, 0.6)', fontWeight: 500 }}>
                          {selectedFile ? selectedFile.name : 'Select PDF, DOC, or DOCX'}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'rgba(245, 242, 236, 0.3)' }}>Max file size 5MB</span>
                      </label>
                      {errors.file && <span style={{ color: '#C1121F', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', marginTop: '4px' }}>{errors.file}</span>}
                    </div>

                    {/* Cover Letter */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(245, 242, 236, 0.45)', textTransform: 'uppercase' }}>Cover Letter (Optional)</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us why you want to design luxury travel experiences with us..."
                        className="premium-input-field"
                        style={{ resize: 'vertical', minHeight: '100px' }}
                        value={formData.coverLetter}
                        onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                      />
                    </div>

                    <button type="submit" className="glassy-submit-btn" style={{ marginTop: '8px' }}>
                      Submit Application
                    </button>
                  </form>
                </>
              ) : (
                /* SUCCESS STATE */
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    textAlign: 'center',
                    padding: '30px 10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '20px'
                  }}
                >
                  <CheckCircle size={56} style={{ color: '#C1121F' }} />
                  <div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 500, color: '#F5F2EC', margin: '0 0 10px 0' }}>
                      Application Received
                    </h2>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.94rem', color: 'rgba(245, 242, 236, 0.65)', lineHeight: 1.6, maxWidth: '380px', margin: '0 auto', fontWeight: 300 }}>
                      Thank you for applying. A member of our luxury coordination team will review your CV and be in touch soon.
                    </p>
                  </div>
                  <button onClick={closeModal} className="premium-apply-btn" style={{ marginTop: '12px' }}>
                    Close Window
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
