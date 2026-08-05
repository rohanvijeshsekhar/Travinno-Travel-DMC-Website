import React from 'react';
import { getCollections } from '@/lib/db-server';
import { db } from '@/lib/db';
import DBHydrator from '@/components/DBHydrator';
import HomeScrollEffects from '@/components/HomeScrollEffects';
import TwinklingStars from '@/components/TwinklingStars';
import lazyLoad from 'next/dynamic';

// Force SSR on every request so pages always reflect live MySQL data.
// Without this, Next.js pre-renders pages at BUILD TIME when MySQL is
// unreachable from GitHub Actions, baking stale data into the HTML.
// The client then falls back to a slow /api/collections fetch (4–10s delay).
export const dynamic = 'force-dynamic';

// Above the fold - eagerly loaded
import CinematicHero from '@/components/CinematicHero';
import ScrollIndicator from '@/components/ScrollIndicator';

// Below the fold - dynamically lazy loaded to improve mobile TTI and Reduce JavaScript execution time
const EditorialSection = lazyLoad(() => import('@/components/EditorialSection'), { ssr: true });
const DestinationStorySection = lazyLoad(() => import('@/components/ui/destination-story-section'), { ssr: true });
const ExpertiseSection = lazyLoad(() => import('@/components/ExpertiseSection'), { ssr: true });
const TestimonialsSection = lazyLoad(() => import('@/components/TestimonialsSection'), { ssr: true });
const OurJourney = lazyLoad(() => import('@/components/OurJourney'), { ssr: true });
const LogoCloudSection = lazyLoad(() => import('@/components/LogoCloudSection'), { ssr: true });
const WhyTravinno = lazyLoad(() => import('@/components/WhyTravinno'), { ssr: true });
const ContactCTA = lazyLoad(() => import('@/components/ContactCTA'), { ssr: true });

export async function generateMetadata() {
  const collections = await getCollections();
  const seoList = collections['travinno_seo'] || [];
  const entry = seoList.find((item: any) => item.page === 'home');
  return {
    title: entry?.title || 'Travinno - Crafting Journeys, Creating Memories',
    description: entry?.description || 'Premium B2B travel partner contract for luxury custom packages, destination management, and leisure travel.',
  };
}

export default async function HomePage() {
  // 1. Fetch collections from database on the server
  const collections = await getCollections();

  // 2. Load defaults first, then overwrite with server collections
  db._loadDefaults();
  Object.keys(collections).forEach((key) => {
    if (collections[key] !== undefined && collections[key] !== null) {
      db.collections[key] = collections[key];
    }
  });
  db.initialized = true;

  return (
    <>
      {/* Hydrate the client-side db cache with server data before child components mount */}
      <DBHydrator data={collections} />

      {/* Global Home Page scroll, Lenis, and ScrollTrigger initializers */}
      <HomeScrollEffects />

      {/* Hero Section Container (100% Viewport Height) */}
      <div
        className="home-hero-fade"
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Cinematic Living Photograph Experience */}
        <CinematicHero />

        {/* Smooth bottom blend overlay to fade images into the page background */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '250px',
            background: 'linear-gradient(to bottom, transparent 0%, #050505 100%)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />

        {/* Minimal Scroll Indicator */}
        <ScrollIndicator />
      </div>

      {/* Minimalist Editorial Section */}
      <div className="home-editorial-fade-wrap">
        <EditorialSection />
      </div>

      {/* Destinations Showcase Section */}
      <div
        id="destinations"
        className="home-destinations-fade-wrap destinations-section"
        style={{
          backgroundColor: '#050505',
          padding: '100px 24px 0 24px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Background Reddish-Orange-Black Gradient with Static Check Pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(245, 242, 236, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 242, 236, 0.05) 1px, transparent 1px), radial-gradient(circle at 50% 20%, rgba(193, 18, 31, 0.14) 0%, transparent 45%), radial-gradient(circle at 85% 75%, rgba(230, 80, 20, 0.03) 0%, transparent 60%)',
            backgroundSize: '100px 100px, 100px 100px, auto, auto',
            backgroundRepeat: 'repeat, repeat, no-repeat, no-repeat',
            backgroundColor: '#050505',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Twinkling & Drifting Stars — paused via IntersectionObserver when off-screen */}
        <TwinklingStars />

        {/* Top Smooth Blend Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '160px',
            background: 'linear-gradient(to bottom, #050505 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        {/* Bottom Smooth Blend Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '160px',
            background: 'linear-gradient(to top, #050505 0%, transparent 100%)',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />

        <div
          className="destinations-heading-container"
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            textAlign: 'center',
            boxSizing: 'border-box',
            padding: '0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              border: '1px solid rgba(193, 18, 31, 0.15)',
              borderRadius: '100px',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              color: 'rgba(255, 255, 255, 0.85)',
              marginBottom: '12px',
              background: 'rgba(193, 18, 31, 0.05)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#C1121F',
                borderRadius: '50%',
                display: 'inline-block',
              }}
            />
            Fly Higher
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 500,
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              color: '#F5F2EC',
              margin: '0 0 16px 0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <span>Beyond Every</span>
            <span className="journey-allura-text" style={{ marginTop: '4px' }}>
              Borders
            </span>
          </h2>
        </div>

        <div className="destinations-cards-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          <DestinationStorySection />
        </div>
      </div>

      {/* Our Expertise Section */}
      <div id="services" className="home-services-fade-wrap">
        <ExpertiseSection />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="home-testimonials-fade-wrap">
        <TestimonialsSection />
      </div>

      {/* Our Journey Section */}
      <div id="journey" className="home-journey-fade-wrap">
        <OurJourney />
      </div>

      {/* Partner Section */}
      <div id="partners" className="home-contact-fade-wrap">
        <LogoCloudSection />
      </div>

      {/* Why Travinno Grid Section */}
      <div id="why" className="home-why-fade-wrap">
        <WhyTravinno />
      </div>

      {/* Contact CTA Section */}
      <div id="contact" className="home-contact-cta-fade-wrap">
        <ContactCTA />
      </div>
    </>
  );
}
