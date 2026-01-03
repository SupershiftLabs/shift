"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
  const [showText, setShowText] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { content, loading } = useSiteContent('hero', {
    title: 'SuperShift Labs',
    subtitle: 'Web Development & Mobile Apps | Davenport, Iowa',
    description: 'Leading web development and mobile app agency in Davenport, Iowa. We craft exceptional digital experiences through innovative web development, mobile apps, and cloud solutions that drive business transformation. Serving Iowa businesses with modern technology solutions.',
    cta_text: 'Get Started'
  });

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const video = videoRef.current;
    if (!video) {
      // If no video, show text after brief delay
      const noVideoTimer = setTimeout(() => {
        setShowText(true);
      }, 500);
      
      return () => {
        window.removeEventListener('resize', checkMobile);
        clearTimeout(noVideoTimer);
      };
    }

    // Try to play with audio, fall back to muted if blocked
    const tryPlayWithAudio = async () => {
      try {
        // Video is already playing muted due to autoPlay
        // Try to unmute it
        video.muted = false;
        console.log('🔊 Audio enabled');
      } catch (error) {
        console.log('🔇 Could not enable audio, keeping muted');
      }
    };

    const handleVideoEnd = () => {
      console.log('✅ Video ended naturally, showing text in 300ms');
      setVideoEnded(true);
      // Show text with animation after video ends
      setTimeout(() => {
        setShowText(true);
      }, 300);
    };

    // For mobile, show text faster or immediately if video fails
    const handleVideoError = () => {
      console.log('❌ Video failed to load, showing text immediately');
      setShowText(true);
    };

    // Log when video starts playing
    const handleVideoPlay = () => {
      console.log('▶️ Video started playing');
      // Try to unmute after video starts
      tryPlayWithAudio();
    };

    // Log video duration when metadata loads
    const handleLoadedMetadata = () => {
      console.log(`📹 Video duration: ${video.duration.toFixed(1)} seconds`);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);
    video.addEventListener('play', handleVideoPlay);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      video.removeEventListener('play', handleVideoPlay);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('resize', checkMobile);
    };
  }, []); // Empty dependency array - only run once on mount

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900/20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      </section>
    );
  }

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900/20" 
      aria-label="SuperShift Labs - Web Development and Mobile Apps in Davenport Iowa"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      {/* Darker overlay on mobile for better text readability */}
      <div className={`absolute inset-0 ${isMobile ? 'bg-black/60' : 'bg-black/40'}`} role="presentation"></div>
      
      {/* Background Video */}
      <video 
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${videoEnded ? 'opacity-30' : 'opacity-40'} ${isMobile ? 'object-cover' : 'object-cover'}`}
        poster="https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp"
        aria-hidden="true"
        title="SuperShift Labs modern digital workspace"
        style={{ objectPosition: isMobile ? 'center' : 'center' }}
      >
        <source src="/_users_e6370e0d-ba45-4336-819f-edb18e468e55_generated_dd1c1b0a-dbde-4ed2-bd28-6ee35d4c0dfd_generated_video.MP4" type="video/mp4" />
        {/* Fallback image if video doesn't load */}
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp"
          alt="SuperShift Labs Studio - Modern digital workspace with innovative technology in Davenport Iowa"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>
      
      <article className={`relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-1000 ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} itemScope itemType="https://schema.org/Organization">
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
            {content.subtitle}
          </h2>
        </header>
        
        <p 
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2" 
          itemProp="description"
        >
          {content.description}
        </p>
        
        <div className="flex justify-center px-4">
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('services');
            }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-green-500 hover:bg-green-600 active:bg-green-700 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 touch-manipulation text-center"
            aria-label="Explore web development and mobile app services"
          >
            {content.cta_text}
          </a>
        </div>
        
        {/* Hidden structured data for SEO */}
        <meta itemProp="address" content="Davenport, IA, USA" />
        <meta itemProp="telephone" content="+1-319-537-0228" />
        <meta itemProp="email" content="admin@supershiftlabs.com" />
        <link itemProp="url" href="https://supershiftlabs.com" />
      </article>
      
      {/* Scroll button - only show after text appears, hidden on small mobile */}
      {showText && (
        <nav 
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:flex" 
          aria-label="Scroll to content"
        >
          <button 
            onClick={() => scrollToSection('services')}
            className="flex flex-col items-center text-white/70 hover:text-white active:text-green-400 transition-colors group touch-manipulation"
            aria-label="Scroll down to services section"
            title="Scroll to view our services"
          >
            <span className="text-xs sm:text-sm mb-2 font-light">Scroll to explore</span>
            <svg 
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-1 group-active:translate-y-2 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              aria-hidden="true" 
              role="img"
            >
              <title>Scroll down arrow</title>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </nav>
      )}
    </section>
  );
};

export default Hero;