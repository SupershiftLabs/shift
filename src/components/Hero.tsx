"use client";
import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false); // Hide text until video finishes
  const [isMobile, setIsMobile] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Memoize fallback to prevent infinite re-renders
  const fallbackContent = useMemo(() => ({
    title: 'SuperShift Labs',
    subtitle: 'Web Development & Mobile Apps | Davenport, Iowa',
    description: 'Leading web development and mobile app agency in Davenport, Iowa. We craft exceptional digital experiences through innovative web development, mobile apps, and cloud solutions that drive business transformation. Serving Iowa businesses with modern technology solutions.',
    cta_text: 'Get Started'
  }), []);

  const { content, loading } = useSiteContent('hero', fallbackContent);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, don't show text until video ends (or immediately if no video)
      if (mobile) {
        // Wait for video to load/play on mobile
        setShowText(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fallback: Show text after 10 seconds if video hasn't ended (in case video fails)
    const fallbackTimer = setTimeout(() => {
      if (!showText) {
        console.log('Video timeout - showing text as fallback');
        setShowText(true);
        setVideoPlayed(true);
      }
    }, 10000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(fallbackTimer);
    };
  }, [showText]);

  // Handle video end event
  const handleVideoEnd = useCallback(() => {
    setVideoPlayed(true);
    setShowText(true);
    // Don't loop - let video element fade out and show static image
  }, []);

  // Handle video loaded event
  const handleVideoLoaded = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Handle video error - show text immediately if video fails to load
  const handleVideoError = useCallback(() => {
    console.log('Video failed to load - showing text immediately');
    setVideoPlayed(true);
    setShowText(true);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Don't wait for loading - show hero immediately with fallback content
  // if (loading) {
  //   return (
  //     <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900/20">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
  //     </section>
  //   );
  // }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900/20" 
      aria-label="SuperShift Labs - Professional Web Development and Mobile App Development Services in Davenport, Iowa"
      itemScope 
      itemType="https://schema.org/Organization"
      role="banner"
    >
      {/* Static background - always present, lowest layer (z-0) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
      
      {/* Video background - desktop OR mobile (if mobile video exists), above image (z-10) */}
      {!videoPlayed && (
        <div className="absolute inset-0 z-10">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop={false}
            playsInline
            onEnded={handleVideoEnd}
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
            preload={isMobile ? "metadata" : "auto"}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            poster="https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp"
          >
            {/* Use mobile-optimized video if available, otherwise fallback to desktop video */}
            {isMobile ? (
              <>
                <source src="/hero-video-mobile.mp4" type="video/mp4" />
                <source src="/hero-video.mp4" type="video/mp4" />
              </>
            ) : (
              <source src="/hero-video.mp4" type="video/mp4" />
            )}
            {/* Fallback to image if video fails to load */}
          </video>
        </div>
      )}
      
      {/* Darker overlay on mobile for better text readability (z-20) */}
      <div className={`absolute inset-0 z-20 ${isMobile ? 'bg-black/50' : 'bg-black/30'}`} role="presentation"></div>
      
      <article className={`relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} itemScope itemType="https://schema.org/LocalBusiness">
        <header className="mb-4 sm:mb-6">
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2" 
            itemProp="name"
          >
            {content.title.includes('SuperShift') ? (
              <>
                Super<span className="text-green-400 glow-text">Shift</span> Labs
              </>
            ) : (
              content.title
            )}
          </h1>
          <h2 
            className="text-lg sm:text-xl md:text-2xl text-green-200 font-light px-2" 
            itemProp="slogan"
          >
            Professional Web Development &amp; Mobile Apps in Davenport, Iowa
          </h2>
        </header>
        
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2" 
          itemProp="description"
        >
          Leading Iowa software agency specializing in custom web applications, mobile app development, and cloud solutions. Serving Davenport, Quad Cities, and businesses across Iowa with modern, scalable technology solutions.
        </p>
        
        <div className="flex justify-center px-4">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 touch-manipulation text-center"
            aria-label="View our web development, mobile app, and cloud services in Davenport, Iowa"
            itemProp="url"
          >
            Explore Our Services →
          </a>
        </div>
        
        {/* Enhanced structured data for SEO */}
        <meta itemProp="address" content="Davenport, Iowa 52801, USA" />
        <meta itemProp="addressLocality" content="Davenport" />
        <meta itemProp="addressRegion" content="Iowa" />
        <meta itemProp="addressCountry" content="US" />
        <meta itemProp="telephone" content="+1-319-537-0228" />
        <meta itemProp="email" content="admin@supershiftlabs.com" />
        <meta itemProp="priceRange" content="$$" />
        <meta itemProp="areaServed" content="Iowa, Davenport, Quad Cities, Midwest" />
        <link itemProp="url" href="https://supershiftlabs.com" />
      </article>
    </section>
  );
};

export default React.memo(Hero);