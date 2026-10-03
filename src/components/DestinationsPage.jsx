"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Luggage, Hotel, Car, Users } from 'lucide-react';
import { db } from '../lib/db';

const DEFAULT_DESTINATIONS = [
  {
    id: 'dubai',
    name: 'Dubai',
    region: 'Middle East',
    tagline: 'Futuristic architectural marvels meet ancient desert sands.',
    image: 'images/destinations/dubai.webp',
    description: 'Dubai stands as a monumental oasis of modern ambition and timeless allure, where futuristic architectural marvels rise dramatically from the golden sands of the Arabian Desert. Beyond the gleaming glass towers and ultra-luxury shopping domains lies a destination of rich cultural contrasts—from heritage souks and traditional dhows sailing the historic creek to private yacht charters along the modern marina. Visitors can transition seamlessly from the dynamic energy of world-class Michelin-starred dining to the absolute stillness of a private luxury conservation camp nestled deep within the desert dunes under a canopy of stars.',
    experiences: [
      'Private Yacht Cruise past Palm Jumeirah',
      'Ultra-luxury Desert Conservation Camp with private pool villas',
      'Bespoke culinary experience with private Michelin-starred chefs'
    ],
    itinerary: [
      { day: 1, title: 'Arrival & Skyline Check-in', desc: 'Chauffeur arrival to your beachfront penthouse. Evening cocktail reception overlooking the Dubai Marina.' },
      { day: 2, title: 'Private Desert Safari Expedition', desc: '4x4 dunes exploration in the Conservation Reserve, followed by falconry demonstrations and a custom tented dinner.' },
      { day: 3, title: 'Bespoke Yacht Charter', desc: 'A full-day luxury catamaran cruise with private chef lunch and sunset harbor docking.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'kenya',
    name: 'Kenya',
    region: 'East Africa',
    tagline: 'Witness the majesty of the great wilderness.',
    image: 'images/destinations/kenya.webp',
    description: 'Kenya is the cradle of the wild, an untamed land of sweeping savannahs, ancient acacia trees, and dramatic volcanic landscapes that capture the raw essence of East Africa. It is a sanctuary where the rhythm of life is dictated by the great migration, and where the air is filled with the calls of the wild at daybreak. From eco-luxury tented camps situated along private conservancies to personalized hot air balloon safaris over the Maasai Mara, Kenya offers an intimate, slow-paced journey into nature, guided by Maasai warriors who share their deep ancestral knowledge and heritage.',
    experiences: [
      'Hot air balloon safari at sunrise over Maasai Mara',
      'Walking safari guided by Maasai warriors',
      'Stays in eco-luxury community-owned lodges'
    ],
    itinerary: [
      { day: 1, title: 'Acacia Lodge Arrival', desc: 'Fly in by private charter to the Mara conservancy. Afternoon game drive followed by a sundowner drink.' },
      { day: 2, title: 'Sunrise Balloon Safari & Bush Breakfast', desc: 'Soar above the migrating herds, then land for a champagne breakfast in the open savannah.' },
      { day: 3, title: 'Cultural Expedition', desc: 'An intimate, respectful afternoon sharing stories and local history in a traditional Maasai homestead.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'bali',
    name: 'Bali',
    region: 'Southeast Asia',
    tagline: 'Immersive spiritual rituals in tropical sanctuaries.',
    image: 'images/destinations/bali.webp',
    description: 'Bali is a spiritual sanctuary where deep-rooted Hindu traditions blend seamlessly with tropical volcanic peaks, sacred rivers, and pristine coastal shores. Known as the Island of the Gods, it is a landscape carpeted in emerald-green rice terraces and dotted with stone temples shrouded in morning mist. Visitors are invited to immerse themselves in purification rituals at holy springs, walk through rainforest canopies in Ubud, and stay in magnificent private pool villas that overlook deep river gorges, offering a profound sense of peace, healing, and cultural discovery.',
    experiences: [
      'Private purification ceremony at Tirta Empul',
      'Guided mountain trekking through volcanic craters',
      'Lush rainforest pool villas in Ubud'
    ],
    itinerary: [
      { day: 1, title: 'Forest Sanctuary Check-in', desc: 'Arrive at your valley-facing pool villa in Ubud. Evening sound healing meditation session.' },
      { day: 2, title: 'Purification & Cultural History', desc: 'A private guide leads you through Tirta Empul water temple rituals and ancient carvings.' },
      { day: 3, title: 'Tropical Coastline Cruise', desc: 'Sail to the nearby Gili islands on a classic wooden yacht, snorkeling with sea turtles.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'thailand',
    name: 'Thailand',
    region: 'Southeast Asia',
    tagline: 'Sailing emerald coves and tasting vibrant cultures.',
    image: 'images/destinations/thailand.webp',
    description: 'Thailand is a sensory marvel of gold-leaf temples, bustling night markets, and pristine archipelagos rising from clear turquoise waters. From the historic capital of Bangkok to the secluded white-sand shores of Koh Samui, the kingdom offers an extraordinary balance of high-end indulgence and authentic heritage. Private catamaran charters navigate the limestone karsts of Phang Nga Bay, while custom cooking masterclasses with master chefs reveal the intricate balance of sweet, sour, salty, and spicy flavors that define the country’s revered culinary tradition.',
    experiences: [
      'Private catamaran cruise through Phang Nga Bay',
      'Bespoke cooking masterclass with heritage chefs',
      'Secluded beachfront pool retreats in Koh Samui'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Phuket', desc: 'Luxury yacht transfer to your private island beach villa. Sunset dinner on the shore.' },
      { day: 2, title: 'Phang Nga Hongs Sea Caves', desc: 'Explore hidden sea caves and bays by private sea-kayak with a naturalist guide.' },
      { day: 3, title: 'Gastronomy Discovery', desc: 'A tailored tour through ancient food markets followed by a private cooking masterclass.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'singapore',
    name: 'Singapore',
    region: 'Southeast Asia',
    tagline: 'Exploring biophilic skyscrapers and smart architecture.',
    image: 'images/destinations/singapore.webp',
    description: 'Singapore is a futuristic biophilic metropolis where steel-and-glass skyscrapers are enveloped in vertical gardens and sprawling rain forests. This island city-state is a global hub of innovation, culinary excellence, and rich multi-cultural heritage, seamlessly linking historical shophouses with high-altitude rooftop lounges. From after-hours tours of the iconic Gardens by the Bay domes to bespoke heritage walking trails through historic districts, Singapore offers a refined, hyper-modern urban experience unlike any other.',
    experiences: [
      'Private evening tour of Gardens by the Bay dome',
      'Exclusive rooftop mixology sessions in Marina Bay',
      'Bespoke heritage tours of Chinatown and Little India'
    ],
    itinerary: [
      { day: 1, title: 'Sleek Sky-suite Check-in', desc: 'Arrive at your high-altitude suite. Evening champagne toast at Marina Bay Sands.' },
      { day: 2, title: 'Gardens & Future Architecture', desc: 'An private after-hours walkthrough of the Cloud Forest and Flower Dome biophilic spaces.' },
      { day: 3, title: 'Historical Heritage Trail', desc: 'Explore historic shophouses, tasting award-winning local dishes and modern fusion cuisine.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    region: 'Southeast Asia',
    tagline: 'Intimate tea rituals and dynamic culinary paths.',
    image: 'images/destinations/vietnam.webp',
    description: 'Vietnam is a country of quiet elegance and spectacular natural beauty, defined by misty mountain peaks, emerald rice paddies, and thousands of towering limestone islands in Halong Bay. Its rich history is woven into the fabric of lantern-lit ancient trading towns and imperial cities, where traditional tea ceremonies offer a window into a graceful heritage. The country’s cuisine is a masterclass in fresh herbs and delicate balance, offering sophisticated travelers an authentic, multi-layered journey through time and culture.',
    experiences: [
      'Private junk boat cruise in Halong Bay',
      'Kaiseki-inspired royal cuisine tour in Hue',
      'Traditional tea ceremony guided by master brewers'
    ],
    itinerary: [
      { day: 1, title: 'Halong Bay Boarding', desc: 'Embark on a luxury classic wooden junk boat. Cruise past the towering karsts.' },
      { day: 2, title: 'Imperial Gastronomy in Hue', desc: 'Flight to Hue. Evening tasting of imperial multi-course banquets.' },
      { day: 3, title: 'Master Tea Ceremony', desc: 'Learn the slow art of traditional Vietnamese tea brewing in a silent pavilion.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
    region: 'Southeast Asia',
    tagline: 'Ancient rainforests meet dynamic culture.',
    image: 'images/destinations/malaysia.webp',
    description: 'Malaysia is a vibrant tapestry of prehistoric tropical rainforests, colonial heritage towns, and hyper-modern skylines that reflect a diverse multi-cultural identity. From the towering spires of Kuala Lumpur to the pristine, ancient jungles of Taman Negara, it is a destination where nature and cosmopolitan sophistication exist side-by-side. Guests can explore the culinary streets and rich Peranakan history of Penang, charter a private helicopter to the pristine beaches of Langkawi, or walk along night-canopy suspension bridges in the heart of the world\'s oldest jungle.',
    experiences: [
      'Helicopter charter over Langkawi archipelago',
      'Guided rainforest night canopy walk in Taman Negara',
      'Curated colonial history trail through Penang'
    ],
    itinerary: [
      { day: 1, title: 'Penang Mansion Check-in', desc: 'Check in to a restored heritage mansion. Traditional Peranakan dinner experience.' },
      { day: 2, title: 'Rainforest Canopy Walk', desc: 'Private transfer to the prehistoric jungle. Guided trek spotting rare birdlife and flora.' },
      { day: 3, title: 'Langkawi Archipelago flight', desc: 'Helicopter tour over the 99 islands of Langkawi, docking at a quiet beach resort.' }
    ],
    services: { tours: true, hotels: true, transfers: true, corporate: true }
  }
];

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [activeDestination, setActiveDestination] = useState(null);
  const [destinationsData, setDestinationsData] = useState(() => {
    const dbData = db.getDestinations();
    return dbData && dbData.length > 0 ? dbData : DEFAULT_DESTINATIONS;
  });

  // Load and subscribe to DB updates
  useEffect(() => {
    const handleUpdate = () => setDestinationsData(db.getDestinations());
    window.addEventListener('travinno-db-update', handleUpdate);
    return () => window.removeEventListener('travinno-db-update', handleUpdate);
  }, []);

  // Sync scroll on open/close
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [activeDestination]);

  // Synchronize state with URL hash — consults DEFAULT_DESTINATIONS as fallback
  useEffect(() => {
    const resolveById = (id) => {
      const targetId = (id || '').toLowerCase();
      const allData = destinationsData.length > 0 ? destinationsData : DEFAULT_DESTINATIONS;
      return allData.find(d => (d.id || '').toLowerCase() === targetId) || DEFAULT_DESTINATIONS.find(d => (d.id || '').toLowerCase() === targetId);
    };

    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#destination-([^?#/]+)/);
      if (match) {
        const dest = resolveById(match[1]);
        if (dest) {
          setActiveDestination(dest);
          window.scrollTo(0, 0);
          if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
          }
          return;
        }
      }
      // Only clear if hash is genuinely gone or points to the listing
      if (!hash || hash === '#destinations' || hash === '#') {
        setActiveDestination(null);
      }
    };

    window.addEventListener('hashchange', handleHash);
    window.addEventListener('popstate', handleHash);
    window.addEventListener('travinno-destination-change', handleHash);
    handleHash(); // check on initial mount

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('popstate', handleHash);
      window.removeEventListener('travinno-destination-change', handleHash);
    };
  }, [destinationsData]);

  const regions = ['All', 'Middle East', 'Southeast Asia', 'East Africa'];

  const filteredDestinations = selectedRegion === 'All'
    ? destinationsData
    : destinationsData.filter(d => d.region === selectedRegion);

  return (
    <div style={{ backgroundColor: '#050505', color: '#F5F2EC', width: '100%', minHeight: '100vh', position: 'relative', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        .destinations-container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 160px 24px 120px 24px;
          box-sizing: border-box;
        }

        /* Regions filter tabs */
        .filter-tabs-container {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 32px;
          position: relative;
          z-index: 5;
        }

        .filter-tab {
          padding: 8px 20px;
          border: 1px solid rgba(245, 242, 236, 0.15);
          background: rgba(255, 255, 255, 0.02);
          color: rgba(245, 242, 236, 0.7);
          border-radius: 100px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          outline: none;
        }

        .filter-tab:hover {
          border-color: rgba(193, 18, 31, 0.4);
          color: #F5F2EC;
          background: rgba(193, 18, 31, 0.05);
        }

        .filter-tab.active {
          border-color: #C1121F;
          background: #C1121F;
          color: #FFFFFF;
          box-shadow: 0 4px 15px rgba(193, 18, 31, 0.25);
        }

        /* Destinations card grid */
        .destinations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          margin-top: 10px;
        }

        .destination-editorial-card {
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, rgba(16, 16, 20, 0.75) 0%, rgba(10, 10, 12, 0.95) 100%);
          border: 1px solid rgba(245, 242, 236, 0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 30px rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          box-sizing: border-box;
          aspect-ratio: 1 / 1.15;
          position: relative;
        }

        .destination-editorial-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 20%, rgba(193, 18, 31, 0.02) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .destination-editorial-card:hover {
          border-color: rgba(193, 18, 31, 0.65);
          background: linear-gradient(180deg, rgba(24, 24, 30, 0.85) 0%, rgba(15, 15, 18, 0.98) 100%);
          transform: translateY(-6px);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 20px 40px rgba(0, 0, 0, 0.65),
            0 0 40px rgba(193, 18, 31, 0.06);
        }

        .destination-img-wrapper {
          width: 100%;
          height: 52%;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(245, 242, 236, 0.06);
        }

        .destination-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(95%) brightness(90%);
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .destination-editorial-card:hover .destination-img-wrapper img {
          transform: scale(1.08);
          filter: contrast(100%) brightness(100%);
        }

        .destination-content-block {
          padding: 22px 24px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          z-index: 1;
        }

        .destination-meta-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          color: rgba(245, 242, 236, 0.45);
          margin-bottom: 6px;
        }

        .destination-region-badge {
          color: #C1121F;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .destination-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 450;
          color: #F5F2EC;
          margin: 0 0 6px 0;
          line-height: 1.3;
          letter-spacing: -0.2px;
          transition: color 0.3s ease;
        }

        .destination-editorial-card:hover .destination-card-title {
          color: #FFFFFF;
        }

        .destination-card-tagline {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          line-height: 1.45;
          color: rgba(245, 242, 236, 0.6);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 300;
        }

        .destination-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
          font-size: 0.68rem;
          color: rgba(245, 242, 236, 0.4);
          font-family: var(--font-sans);
        }

        .destination-card-arrow {
          display: flex;
          align-items: center;
          color: rgba(245, 242, 236, 0.6);
          transition: all 0.3s ease;
        }

        .destination-editorial-card:hover .destination-card-arrow {
          color: #C1121F;
          transform: translateX(4px);
        }

        /* EDITORIAL DETAIL VIEW STYLING */
        .destination-detail-page {
          position: relative;
          z-index: 3;
          width: 100%;
          box-sizing: border-box;
        }

        .destination-detail-hero {
          width: 100%;
          height: 33.3vh;
          min-height: 320px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 242, 236, 0.08);
        }

        .destination-detail-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(100%) brightness(92%);
        }

        .destination-detail-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(5, 5, 5, 0.25) 0%, rgba(5, 5, 5, 0.45) 50%, rgba(5, 5, 5, 0.8) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 100px 24px 32px 24px;
          box-sizing: border-box;
          z-index: 2;
        }

        .destination-detail-hero-content {
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .destination-detail-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(245, 242, 236, 0.65);
        }

        .destination-detail-title {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 450;
          line-height: 1.2;
          color: #F5F2EC;
          margin: 0;
          letter-spacing: -0.4px;
        }

        .back-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: rgba(245, 242, 236, 0.6);
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
          width: fit-content;
        }

        .back-nav-btn:hover {
          color: #C1121F;
          transform: translateX(-4px);
        }

        .destination-detail-body {
          max-width: 900px;
          margin: 0 auto;
          padding: 56px 24px 140px 24px;
          box-sizing: border-box;
          font-family: var(--font-sans);
        }

        .destination-detail-desc {
          font-size: clamp(0.92rem, 1.4vw, 1.08rem);
          line-height: 1.8;
          color: rgba(245, 242, 236, 0.75);
          font-weight: 300;
          margin-bottom: 48px;
          border-left: 2px solid #C1121F;
          padding-left: 24px;
        }

        /* Services Included Section Styles */
        .services-included-section {
          margin-top: 48px;
          margin-bottom: 56px;
        }

        .services-grid-container {
          display: grid;
          gap: 20px;
          margin-top: 32px;
        }

        @media (max-width: 1024px) {
          .services-grid-container {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px;
          }
        }

        @media (max-width: 640px) {
          .services-grid-container {
            grid-template-columns: 1fr !important;
            gap: 16px;
          }
        }

        .premium-service-card {
          background: rgba(255, 255, 255, 0.018);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(193, 18, 31, 0.55);
          border-radius: 20px;
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          aspect-ratio: 1 / 1;
          justify-content: center;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3), 0 0 15px rgba(193, 18, 31, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        @media (max-width: 640px) {
          .premium-service-card {
            aspect-ratio: auto;
            min-height: 180px;
            padding: 24px 20px;
          }
        }

        .premium-service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(193, 18, 31, 0) 0%, rgba(193, 18, 31, 0) 100%);
          transition: background 0.4s ease;
          pointer-events: none;
          z-index: 0;
        }

        .premium-service-card:hover {
          transform: translateY(-8px);
          border-color: #C1121F;
          box-shadow: 0 12px 40px rgba(193, 18, 31, 0.12), 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .premium-service-card:hover::before {
          background: radial-gradient(circle at center, rgba(193, 18, 31, 0.035) 0%, transparent 70%);
        }

        .premium-service-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(245, 242, 236, 0.02);
          border: 1px solid rgba(245, 242, 236, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          color: rgba(245, 242, 236, 0.7);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 1;
        }

        .premium-service-card:hover .premium-service-icon-wrapper {
          color: #C1121F;
          background: rgba(193, 18, 31, 0.08);
          border-color: rgba(193, 18, 31, 0.25);
          transform: scale(1.1);
        }

        .premium-service-title {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          font-weight: 500;
          color: #F5F2EC;
          margin: 0 0 10px 0;
          letter-spacing: -0.1px;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .premium-service-card:hover .premium-service-title {
          color: #FFFFFF;
        }

        .premium-service-desc {
          font-family: var(--font-sans);
          font-size: 0.76rem;
          line-height: 1.5;
          color: rgba(245, 242, 236, 0.45);
          margin: 0;
          font-weight: 300;
          z-index: 1;
          transition: color 0.3s ease;
        }

        .premium-service-card:hover .premium-service-desc {
          color: rgba(245, 242, 236, 0.7);
        }


        .detail-sections-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 48px;
        }

        .detail-section-title {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 450;
          color: #F5F2EC;
          margin: 0 0 24px 0;
          border-bottom: 1px solid rgba(245, 242, 236, 0.08);
          padding-bottom: 10px;
          letter-spacing: -0.2px;
        }

        .experiences-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .experience-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          font-size: 0.95rem;
          line-height: 1.55;
          color: rgba(245, 242, 236, 0.7);
        }

        .itinerary-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .itinerary-day-card {
          background: rgba(255, 255, 255, 0.015);
          border: 1px solid rgba(245, 242, 236, 0.05);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .itinerary-day-num {
          font-size: 0.7rem;
          font-weight: 600;
          color: #C1121F;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .itinerary-day-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 450;
          color: #F5F2EC;
          margin: 0;
        }

        .itinerary-day-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: rgba(245, 242, 236, 0.55);
          margin: 6px 0 0 0;
          font-weight: 300;
        }

        @media (max-width: 991px) {
          .destinations-grid {
            grid-template-columns: repeat(2, 1fr);
          }
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

        @media (max-width: 768px) {
          .detail-sections-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .destination-detail-body {
            padding: 40px 20px 80px 20px;
          }
        }

        @media (max-width: 600px) {
          .destinations-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* RENDER DETAILED VIEW */}
      {activeDestination ? (
        <div className="destination-detail-page">
          
          {/* Header Image banner occupying 1/3 viewport height */}
          <div className="destination-detail-hero">
            <img
              src={activeDestination.image && (activeDestination.image.startsWith('data:') || activeDestination.image.startsWith('http')) ? activeDestination.image : (activeDestination.image.startsWith('/') ? activeDestination.image : `/${activeDestination.image}`)}
              alt={activeDestination.name}
            />
            <div className="destination-detail-hero-overlay">
              <div className="destination-detail-hero-content" style={{ marginBottom: 'auto' }}>
                <button
                  onClick={() => {
                    setActiveDestination(null);
                    window.location.hash = 'destinations';
                  }}
                  className="back-nav-btn"
                >
                  <ArrowLeft size={16} />
                  Back to Destinations
                </button>
              </div>

              <div className="destination-detail-hero-content">
                <div className="destination-detail-meta">
                  <span style={{ color: '#C1121F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {activeDestination.region}
                  </span>
                  <span style={{ width: '4px', height: '4px', backgroundColor: 'rgba(245, 242, 236, 0.3)', borderRadius: '50%' }} />
                  <span>Custom Itinerary</span>
                </div>
                <h1 className="destination-detail-title">{activeDestination.name}</h1>
                <p style={{ color: 'rgba(245, 242, 236, 0.7)', fontSize: '0.95rem', margin: '4px 0 0 0', fontWeight: 300 }}>
                  {activeDestination.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Main article narrative content below the hero */}
          <div className="destination-detail-body">
            <p className="destination-detail-desc" style={{ marginBottom: '64px' }}>
              {activeDestination.description}
            </p>

            {/* Services Available Section */}
            {(() => {
              const services = activeDestination.services || { tours: true, hotels: true, transfers: true, corporate: true };
              const availableServices = [
                {
                  key: 'tours',
                  title: 'Tour Packages',
                  desc: 'Custom-tailored sightseeing, excursions, and guided itineraries.',
                  icon: <Luggage size={24} strokeWidth={1.2} />
                },
                {
                  key: 'hotels',
                  title: 'Hotel Bookings',
                  desc: 'Exclusive reservations at handpicked 5-star luxury resorts and villas.',
                  icon: <Hotel size={24} strokeWidth={1.2} />
                },
                {
                  key: 'transfers',
                  title: 'Airport Transfers',
                  desc: 'Chauffeur services and private premium vehicle transfers.',
                  icon: <Car size={24} strokeWidth={1.2} />
                },
                {
                  key: 'corporate',
                  title: 'Corporate & Group Travel',
                  desc: 'Tailored meetings, team retreats, and coordinated group journeys.',
                  icon: <Users size={24} strokeWidth={1.2} />
                }
              ];
              const activeServices = availableServices.filter(s => services[s.key] !== false);

              if (activeServices.length === 0) return null;

              return (
                <div
                  className="services-grid-container"
                  style={{
                    gridTemplateColumns: `repeat(${activeServices.length}, 1fr)`,
                    marginTop: '44px',
                    marginBottom: '56px'
                  }}
                >
                  {activeServices.map((service) => (
                    <div key={service.key} className="premium-service-card">
                      <div
                        className="premium-service-icon-wrapper"
                        style={{
                          color: '#C1121F',
                          backgroundColor: 'rgba(193, 18, 31, 0.05)',
                          borderColor: 'rgba(193, 18, 31, 0.2)'
                        }}
                      >
                        {service.icon}
                      </div>
                      <h3 className="premium-service-title">{service.title}</h3>
                      <p className="premium-service-desc">{service.desc}</p>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Inquiry Call to Action */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a
                href="/contact/"
                style={{
                  backgroundColor: '#C1121F',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  padding: '12px 32px',
                  borderRadius: '100px',
                  boxShadow: '0 8px 24px rgba(193, 18, 31, 0.25)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#a00f19';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(193, 18, 31, 0.45)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C1121F';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(193, 18, 31, 0.25)';
                  e.currentTarget.style.transform = 'translateY(0px)';
                }}
              >
                Inquire About This Journey <ArrowRight size={14} />
              </a>
            </div>
          </div>

        </div>
      ) : (
        /* RENDER STANDARD INDEX VIEW */
        <>
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

          {/* Grid lines overlay layer */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `
                linear-gradient(rgba(245, 242, 236, 0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245, 242, 236, 0.04) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px, 100px 100px, 100px 100px',
              backgroundRepeat: 'repeat, repeat, repeat',
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
            {/* Subtle Floating Movement wrapper */}
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
                src="/images/destinations_hero.png"
                alt="Global Destinations map compass"
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

          <div className="destinations-container">
            
            {/* HERO SECTION */}
            <section style={{ marginBottom: '40px', position: 'relative' }}>
              
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
                  Explore
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
                  Our Extraordinary <br />
                  <span
                    style={{
                      fontFamily: "'Allura', cursive",
                      fontSize: '1.25em',
                      fontWeight: 400,
                      letterSpacing: '0.02em',
                      lineHeight: '1.2',
                      display: 'inline-block',
                      marginTop: '-4px',
                      paddingTop: '6px',
                      paddingBottom: '20px',
                      marginBottom: '-20px',
                      background: 'linear-gradient(to bottom, #F5F2EC 10%, #D64550 50%, #C1121F 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Destinations
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
                  A curated collection of the world's most remarkable luxury destinations, bespoke itineraries, and elite travel experiences.
                </motion.p>
              </div>
            </section>

            {/* DESTINATIONS FILTER & GRID SECTION */}
            <section style={{ position: 'relative' }}>
              
              {/* Region filter tabs */}
              <div className="filter-tabs-container">
                {regions.map((region) => (
                  <button
                    key={region}
                    className={`filter-tab ${selectedRegion === region ? 'active' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Grid listing */}
              <div className="destinations-grid">
                {filteredDestinations.map((dest, idx) => (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.06 }}
                    className="destination-editorial-card"
                    onClick={() => {
                      setActiveDestination(dest);
                      window.location.hash = `destination-${dest.id}`;
                    }}
                  >
                    <div className="destination-img-wrapper">
                      <img
                        src={dest.image && (dest.image.startsWith('data:') || dest.image.startsWith('http')) ? dest.image : (dest.image.startsWith('/') ? dest.image : `/${dest.image}`)}
                        alt={dest.name}
                      />
                    </div>
                    <div className="destination-content-block">
                      <div>
                        <div className="destination-meta-line">
                          <span className="destination-region-badge">{dest.region}</span>
                        </div>
                        <h3 className="destination-card-title">{dest.name}</h3>
                        <p className="destination-card-tagline">{dest.tagline}</p>
                      </div>
                      <div className="destination-card-footer">
                        <span>Explore Bespoke Journeys</span>
                        <div className="destination-card-arrow">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
