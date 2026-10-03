"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { db } from '../lib/db';

const DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'The Art of Slow Travel in Kenya',
    category: 'Expeditions',
    readTime: '5 min read',
    date: 'June 28, 2026',
    image: 'images/destinations/kenya.webp',
    description: 'An editorial guide on experiencing the untamed beauty of East Africa at a refined, deliberate pace.',
    content: (
      <>
        <p className="article-lead">
          In a world dominated by instant gratification and rapid itineraries, slow travel emerges as a profound rebellion. To travel slowly through Kenya is to align oneself with the timeless rhythm of the savannah, where life is measured not by hours, but by the migration of herds and the setting of the equatorial sun.
        </p>
        <h2>Redefining the Safari Experience</h2>
        <p>
          Traditional safaris often feel like a race to check off the "Big Five" from a dashboard. Slow travel invites you to step out of the safari vehicle. On a walking safari through the Maasai Mara, accompanied by a local Maasai guide, the landscape transforms. You begin to notice the track of a leopard in the soft dust, the medicinal properties of the acacia tree, and the warning calls of the superb starling.
        </p>
        <blockquote>
          "Slow travel is not about seeing everything; it is about feeling everything you see."
        </blockquote>
        <h2>Conservation and Connection</h2>
        <p>
          By staying in community-owned conservancies rather than crowded public reserves, travellers establish a direct, positive footprint. Here, luxury is defined by space, silence, and genuine human connection. An evening spent sharing stories around a campfire with local elders offers a depth of understanding that no museum could ever replicate.
        </p>
        <h2>Practical Tips for Your Journey</h2>
        <ul>
          <li><strong>Spend at least four nights in one location:</strong> This allows you to unpack, relax, and establish a connection with the local guides and wildlife patterns.</li>
          <li><strong>Embrace the midday lull:</strong> When the heat peaks and animals retreat to the shade, read, reflect, or simply listen to the hum of the wild.</li>
          <li><strong>Choose low-impact lodges:</strong> Support retreats that run on solar energy, harvest rainwater, and actively employ local community members.</li>
        </ul>
      </>
    )
  },
  {
    id: 2,
    title: 'Navigating the Sacred Sanctuaries of Bali',
    category: 'Culture',
    readTime: '6 min read',
    date: 'June 15, 2026',
    image: 'images/destinations/bali.webp',
    description: "Discovering the hidden water temples and spiritual heritage of Indonesia's most mystical island.",
    content: (
      <>
        <p className="article-lead">
          Bali is more than a tropical escape; it is a living, breathing tapestry of devotion. To truly navigate its sacred sanctuaries is to look past the beaches and dive deep into the cultural veins that keep this island spiritually alive.
        </p>
        <h2>The Water Temples of Ubud</h2>
        <p>
          At the heart of Balinese spiritual life is water. Tirta Empul, the famous water temple near Ubud, serves as a site for ritual purification. Visitors and locals alike step into the crystal-clear springs to wash away negative energies. Further north, the volcanic lake temples like Pura Ulun Danu Bratan seem to float on water, acting as guardians of the island's crucial irrigation networks.
        </p>
        <blockquote>
          "In Bali, every temple is a bridge between the physical world and the sacred unseen."
        </blockquote>
        <h2>Etiquette and Reverence</h2>
        <p>
          When visiting Balinese temples, respect is paramount. Wearing a traditional sash and sarong is a basic sign of respect. But true reverence lies in your presence—moving quietly, avoiding stepping on offering baskets (canang sari) laid out on the ground, and honoring the daily ceremonies that take place.
        </p>
        <h2>Hidden Gems Beyond the Crowds</h2>
        <p>
          While temples like Uluwatu and Tanah Lot offer stunning sunsets, the true magic lies in the lesser-known sanctuaries. Nestled in the misty forests of Mount Batukaru, Pura Luhur Batukaru remains untouched by massive tourism, wrapped in dense foliage and silent devotion.
        </p>
      </>
    )
  },
  {
    id: 3,
    title: 'Vietnam’s Culinary Secrets: A Connoisseur’s Diary',
    category: 'Gastronomy',
    readTime: '8 min read',
    date: 'May 30, 2026',
    image: 'images/destinations/vietnam.webp',
    description: "An intimate journey through Kaiseki dining and the ancient tea ceremonies of Vietnam's cultural heart.",
    content: (
      <>
        <p className="article-lead">
          Vietnamese cuisine is a masterclass in balance. It is a sensory journey where sweet, sour, salty, bitter, and hot elements meet in perfect harmony. From the royal tables of Hue to the vibrant street food stalls of Hanoi, every bite tells a story of heritage and adaptation.
        </p>
        <h2>The Royal Heritage of Hue</h2>
        <p>
          In the former imperial capital of Hue, dining was historically elevated to an art form. Royal chefs created intricate, multi-course dishes designed to please the emperors. Today, this tradition lives on in delicate bites like banh beo (steamed rice cakes) and bun bo Hue (spicy beef noodle soup), where complex spice blends reflect a rich dynastic legacy.
        </p>
        <blockquote>
          "A Vietnamese dish is a landscape painted in fresh herbs, rich broths, and delicate spices."
        </blockquote>
        <h2>The Art of the Broth</h2>
        <p>
          Nowhere is the dedication to culinary perfection more visible than in a bowl of Pho. A master broth takes upwards of twelve hours to simmer, drawing deep flavors from charred ginger, star anise, cinnamon, and roasted beef bones. It is a slow culinary craft that demands patience and absolute precision.
        </p>
        <h2>Street Food Connoisseurship</h2>
        <p>
          The true heart of Vietnamese gastronomy lies on the street. Pull up a tiny plastic stool on a Hanoi sidewalk, and order a bowl of Bun Cha—grilled pork belly served over cold rice noodles with fresh herbs and a tangy dipping sauce. It is simple, unpretentious, and gastronomically perfect.
        </p>
      </>
    )
  },
  {
    id: 4,
    title: 'Bespoke Yachting Across Thailand’s Islands',
    category: 'Escapes',
    readTime: '4 min read',
    date: 'May 12, 2026',
    image: 'images/destinations/thailand.webp',
    description: 'Sailing the dramatic cliffs and azure coves of southern Thailand on a custom-designed private charter.',
    content: (
      <>
        <p className="article-lead">
          The Andaman Sea is a legendary playground of towering limestone cliffs, hidden lagoons, and vibrant coral reefs. To explore these waters on a private yacht charter is to experience the coastal magic of Southern Thailand in its purest, most exclusive form.
        </p>
        <h2>Phang Nga Bay: A Geological Wonder</h2>
        <p>
          Cruising through Phang Nga Bay feels like entering another world. Massive limestone karsts rise vertically out of the emerald water, creating dramatic passageways. A yacht charter allows you to avoid the crowds, entering hidden sea caves (hongs) by kayak when the tide is just right.
        </p>
        <blockquote>
          "On the open water, luxury is defined by the freedom to drop anchor in any cove that captures your heart."
        </blockquote>
        <h2>Tailored Itineraries</h2>
        <p>
          Whether sailing to the world-famous Phi Phi Islands or exploring the pristine, uninhabited shores of the Similan archipelago, a bespoke itinerary is customized to your preferences. Spend the morning snorkeling with sea turtles, the afternoon enjoying a beach barbecue prepared by your private onboard chef, and the evening watching the stars from the deck.
        </p>
        <h2>Selecting the Right Vessel</h2>
        <p>
          From sleek motor yachts built for speed to elegant sailing catamarans designed for stability and space, choosing the right yacht defines your experience. Every charter comes fully crewed, ensuring flawless service and expert navigation through Thailand’s tropical waters.
        </p>
      </>
    )
  },
  {
    id: 5,
    title: 'Modern Architecture Whispers in Singapore',
    category: 'Metropolis',
    readTime: '5 min read',
    date: 'April 22, 2026',
    image: 'images/destinations/singapore.webp',
    description: "Exploring the futuristic skyline and lush green skyscrapers of Southeast Asia's ultimate metropolis.",
    content: (
      <>
        <p className="article-lead">
          Singapore is a city that has successfully bridged the gap between urban density and tropical nature. Known as the "City in a Garden," its architectural philosophy is a blueprint for the future of green metropolitan design.
        </p>
        <h2>Gardens by the Bay: A Biophilic Marvel</h2>
        <p>
          The iconic Supertrees of Gardens by the Bay are not just visual spectacles; they are environmental workhorses. Standing up to 50 meters tall, these vertical gardens house exotic plants, collect rainwater, and generate solar power for the park. Nearby, the massive glass domes recreate cool mountain climates, housing thousands of plant species from around the world.
        </p>
        <blockquote>
          "In Singapore, concrete does not conquer nature—it houses it."
        </blockquote>
        <h2>Green Sky-Terraces and Vertical Integration</h2>
        <p>
          Throughout the city, skyscrapers feature open-air sky parks, cascading waterfalls, and vertical greenery. Buildings like the Oasia Hotel Downtown and Jewel Changi Airport challenge the traditional box-like structure of modern towers, weaving lush foliage into the structural skeleton.
        </p>
        <h2>Smart City Living</h2>
        <p>
          Behind the green facades lies a sophisticated web of smart technology. Sensors monitor energy consumption, optimize traffic flow, and manage waste. Singapore is a living lab, proving that sustainability and high-tech urban living can coexist seamlessly.
        </p>
      </>
    )
  },
  {
    id: 6,
    title: 'Bespoke Luxury Retreats in Dubai',
    category: 'Hotels',
    readTime: '7 min read',
    date: 'April 05, 2026',
    image: 'images/destinations/dubai.webp',
    description: 'A curated collection of the most extraordinary penthouse desert escapes and private island resorts.',
    content: (
      <>
        <p className="article-lead">
          Dubai is a global synonym for luxury, a place where hospitality is constantly redefined. To check into one of its bespoke retreats is to experience a level of service and design that borders on the extraordinary.
        </p>
        <h2>Desert Escapes: Luxury in the Dunes</h2>
        <p>
          Far from the skyscrapers, retreats like Al Maha offer private pool villas nestled in the rolling dunes of the Dubai Desert Conservation Reserve. Here, guests can spot free-roaming Arabian oryx, enjoy sunset camel treks, and dine under a canopy of stars, enjoying absolute privacy and silence.
        </p>
        <blockquote>
          "Dubai hospitality turns the impossible into standard service."
        </blockquote>
        <h2>Private Islands and Beachfront Penthouses</h2>
        <p>
          Back on the coast, private island resorts like One&Only The Palm offer secluded beachfront villas with private docks, allowing guests to arrive by yacht. Penthouse suites overlooking the Dubai Marina offer private infinity pools, custom-designed furniture, and 24-hour butler service.
        </p>
        <h2>A Cultural Shift Toward Wellness</h2>
        <p>
          The latest wave of luxury hospitality in Dubai focuses on holistic wellness. State-of-the-art spas, personalized nutrition plans, and silent meditation gardens are becoming the new benchmark, offering a balanced escape in a fast-paced metropolis.
        </p>
      </>
    )
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [blogPosts, setBlogPosts] = useState(() => db.getBlogs());
  const viewportRef = useRef(null);

  // Load and subscribe to DB updates
  useEffect(() => {
    const handleUpdate = () => setBlogPosts(db.getBlogs());
    window.addEventListener('travinno-db-update', handleUpdate);
    return () => window.removeEventListener('travinno-db-update', handleUpdate);
  }, []);

  // Reset scroll position to top when a post is opened/closed
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    }
  }, [selectedPost]);

  // Synchronize state with URL hash (enables reload/back navigation to work seamlessly)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#blog-post-(\d+)/);
      if (match) {
        const id = parseInt(match[1]);
        const post = blogPosts.find(p => p.id === id);
        if (post) {
          setSelectedPost(post);
          return;
        }
      }
      setSelectedPost(null);
    };

    window.addEventListener('hashchange', handleHash);
    handleHash(); // check on initial mount

    return () => window.removeEventListener('hashchange', handleHash);
  }, [blogPosts]);

  const scrollLeft = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#F5F2EC', width: '100%', minHeight: '100vh', position: 'relative', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <style>{`
        .blog-container {
          position: relative;
          z-index: 3;
          max-width: 1200px;
          margin: 0 auto;
          padding: 160px 24px 120px 24px;
          box-sizing: border-box;
        }

        .carousel-viewport {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 16px 4px 32px 4px;
          margin-top: 12px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE/Edge */
        }
        .carousel-viewport::-webkit-scrollbar {
          display: none; /* Chrome/Safari */
        }

        .premium-square-card {
          flex: 0 0 calc(25% - 18px);
          min-width: 270px;
          display: flex;
          flex-direction: column;
          background: linear-gradient(180deg, rgba(16, 16, 20, 0.75) 0%, rgba(10, 10, 12, 0.95) 100%);
          border: 1px solid rgba(245, 242, 236, 0.08);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03), 0 12px 30px rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          box-sizing: border-box;
          cursor: pointer;
          aspect-ratio: 1 / 1.12;
          position: relative;
        }

        .premium-square-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 10% 20%, rgba(193, 18, 31, 0.02) 0%, transparent 40%);
          pointer-events: none;
          z-index: 0;
        }

        .premium-square-card:hover {
          border-color: rgba(193, 18, 31, 0.6);
          background: linear-gradient(180deg, rgba(24, 24, 30, 0.85) 0%, rgba(15, 15, 18, 0.98) 100%);
          transform: translateY(-6px);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 20px 40px rgba(0, 0, 0, 0.65),
            0 0 40px rgba(193, 18, 31, 0.06);
        }

        .card-image-wrapper {
          width: 100%;
          height: 48%;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid rgba(245, 242, 236, 0.06);
        }

        .card-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(90%) brightness(70%);
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease;
        }

        .premium-square-card:hover .card-image-wrapper img {
          transform: scale(1.08);
          filter: contrast(100%) brightness(85%);
        }

        .card-info-content {
          padding: 18px 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          z-index: 1;
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          color: rgba(245, 242, 236, 0.45);
          margin-bottom: 4px;
        }

        .card-category {
          color: #C1121F;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .card-title {
          font-family: var(--font-heading);
          font-size: 1.08rem;
          font-weight: 450;
          color: #F5F2EC;
          margin: 0 0 8px 0;
          line-height: 1.35;
          letter-spacing: -0.1px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }

        .premium-square-card:hover .card-title {
          color: #FFFFFF;
        }

        .card-desc {
          font-family: var(--font-sans);
          font-size: 0.8rem;
          line-height: 1.45;
          color: rgba(245, 242, 236, 0.6);
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 300;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 0.68rem;
          color: rgba(245, 242, 236, 0.4);
          font-family: var(--font-sans);
        }

        .card-action-arrow {
          display: flex;
          align-items: center;
          color: rgba(245, 242, 236, 0.6);
          transition: all 0.3s ease;
        }

        .premium-square-card:hover .card-action-arrow {
          color: #C1121F;
          transform: translateX(4px);
        }

        .slider-control-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(245, 242, 236, 0.12);
          background-color: rgba(10, 10, 12, 0.5);
          color: #F5F2EC;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          outline: none;
        }

        .slider-control-btn:hover {
          border-color: #C1121F;
          color: #FFFFFF;
          background-color: rgba(193, 18, 31, 0.12);
        }

        /* EDITORIAL DETAIL VIEW STYLING */
        .editorial-detail-container {
          position: relative;
          z-index: 3;
          width: 100%;
          box-sizing: border-box;
        }

        .editorial-detail-hero {
          width: 100%;
          height: 33.3vh;
          min-height: 320px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid rgba(245, 242, 236, 0.08);
        }

        .editorial-detail-hero img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: contrast(95%) brightness(60%);
        }

        .editorial-detail-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(5, 5, 5, 0.35) 0%, rgba(5, 5, 5, 0.95) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 100px 24px 32px 24px;
          box-sizing: border-box;
          z-index: 2;
        }

        .editorial-detail-hero-content {
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .editorial-detail-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          color: rgba(245, 242, 236, 0.65);
        }

        .editorial-detail-title {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 4vw, 2.8rem);
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
          fontSize: 0.82rem;
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

        .editorial-body-content {
          max-width: 780px;
          margin: 0 auto;
          padding: 56px 24px 140px 24px;
          box-sizing: border-box;
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.6vw, 1.12rem);
          line-height: 1.85;
          color: rgba(245, 242, 236, 0.78);
          font-weight: 300;
        }

        .editorial-body-content p {
          margin-bottom: 28px;
        }

        .editorial-body-content .article-lead {
          font-size: clamp(1.15rem, 2vw, 1.35rem);
          line-height: 1.7;
          color: #F5F2EC;
          margin-bottom: 40px;
          font-weight: 300;
          border-left: 2px solid #C1121F;
          padding-left: 20px;
        }

        .editorial-body-content h2 {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 450;
          color: #F5F2EC;
          margin: 48px 0 20px 0;
          letter-spacing: -0.2px;
        }

        .editorial-body-content blockquote {
          margin: 40px 0;
          padding: 24px 32px;
          background: rgba(193, 18, 31, 0.03);
          border-left: 3px solid #C1121F;
          border-radius: 0 12px 12px 0;
          font-family: var(--font-heading);
          font-size: 1.3rem;
          font-style: italic;
          color: #FFFFFF;
          line-height: 1.6;
        }

        .editorial-body-content ul {
          margin: 24px 0 32px 0;
          padding-left: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .editorial-body-content li {
          margin-bottom: 4px;
        }

        .editorial-body-content strong {
          color: #F5F2EC;
          font-weight: 500;
        }

        @media (max-width: 1200px) {
          .premium-square-card {
            flex: 0 0 calc(33.333% - 16px);
          }
        }

        @media (max-width: 900px) {
          .premium-square-card {
            flex: 0 0 calc(50% - 12px);
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
          .carousel-viewport {
            scroll-snap-type: x mandatory;
            padding-left: 16px !important;
            padding-right: 16px !important;
            scroll-padding: 0 16px;
          }
          .premium-square-card {
            flex: 0 0 calc(100% - 32px) !important;
            min-width: unset !important;
            scroll-snap-align: center;
            scroll-snap-stop: always;
          }
        }
      `}</style>

      {/* RENDER DETAILED EDITORIAL VIEW */}
      {selectedPost ? (
        <div className="editorial-detail-container">
          
          {/* Header/Hero Section occupying exactly 1/3 of the viewport */}
          <div className="editorial-detail-hero">
            <img
              src={selectedPost.image && (selectedPost.image.startsWith('data:') || selectedPost.image.startsWith('http')) ? selectedPost.image : (selectedPost.image.startsWith('/') ? selectedPost.image : `/${selectedPost.image}`)}
              alt={selectedPost.title}
            />
            <div className="editorial-detail-hero-overlay">
              <div className="editorial-detail-hero-content" style={{ marginBottom: 'auto' }}>
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    window.location.hash = 'blog';
                  }}
                  className="back-nav-btn"
                >
                  <ArrowLeft size={16} />
                  Back to Journal
                </button>
              </div>
              
              <div className="editorial-detail-hero-content">
                <div className="editorial-detail-meta">
                  <span style={{ color: '#C1121F', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {selectedPost.category}
                  </span>
                  <span style={{ width: '4px', height: '4px', backgroundColor: 'rgba(245, 242, 236, 0.3)', borderRadius: '50%' }} />
                  <span>{selectedPost.date}</span>
                  <span style={{ width: '4px', height: '4px', backgroundColor: 'rgba(245, 242, 236, 0.3)', borderRadius: '50%' }} />
                  <span>{selectedPost.readTime}</span>
                </div>
                <h1 className="editorial-detail-title">{selectedPost.title}</h1>
              </div>
            </div>
          </div>

          {/* Main article narrative content below the hero */}
          <div className="editorial-body-content">
            {typeof selectedPost.content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
            ) : (
              selectedPost.content
            )}
          </div>

        </div>
      ) : (
        /* RENDER STANDARD INDEX VIEW */
        <>
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
                src="/images/blog_hero.png"
                alt="Travel Planning Editorial"
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

          <div className="blog-container">
            
            {/* HERO SECTION */}
            <section style={{ marginBottom: '48px', position: 'relative' }}>
              
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
                  BLOG
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
                  Travel Knowledge <br />
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
                    & Storytelling
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
                  Reflections, guides and perspectives on the art of luxury travel and destination planning.
                </motion.p>
              </div>
            </section>

            {/* ARTICLES SECTION */}
            <section style={{ position: 'relative' }}>
              
              {/* Section Header with Left Badge and Right Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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
                  Latest Editorial
                </motion.div>

                {/* Slider control arrows */}
                <div style={{ display: 'flex', gap: '10px', zIndex: 10 }}>
                  <button
                    onClick={scrollLeft}
                    aria-label="Previous posts"
                    className="slider-control-btn"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={scrollRight}
                    aria-label="Next posts"
                    className="slider-control-btn"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Horizontal scrolling track */}
              <div className="carousel-viewport" ref={viewportRef}>
                {blogPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.08 }}
                    className="premium-square-card"
                    onClick={() => {
                      setSelectedPost(post);
                      window.location.hash = `blog-post-${post.id}`;
                    }}
                  >
                    <div className="card-image-wrapper">
                      <img
                        src={post.image && (post.image.startsWith('data:') || post.image.startsWith('http')) ? post.image : (post.image.startsWith('/') ? post.image : `/${post.image}`)}
                        alt={post.title}
                      />
                    </div>
                    <div className="card-info-content">
                      <div>
                        <div className="card-meta">
                          <span className="card-category">{post.category}</span>
                          <span style={{ fontSize: '0.7rem' }}>{post.readTime}</span>
                        </div>
                        <h3 className="card-title">{post.title}</h3>
                        <p className="card-desc">{post.description}</p>
                      </div>
                      <div className="card-footer">
                        <span>{post.date}</span>
                        <div className="card-action-arrow">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {/* Spacer to preserve right padding on scroll */}
                <div style={{ flex: '0 0 24px', width: '24px', pointerEvents: 'none' }} />
              </div>
            </section>
            
          </div>
        </>
      )}
    </div>
  );
}
