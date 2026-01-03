"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
  const componentId = useRef(Math.random().toString(36).substr(2, 9));
  // Show text immediately since there's no video
  const [showText, setShowText] = useState(true);
  const [videoEnded, setVideoEnded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Memoize fallback to prevent infinite re-renders
  const fallbackContent = useMemo(() => ({
    title: 'SuperShift Labs',
    subtitle: 'Web Development & Mobile Apps | Davenport, Iowa',
    description: 'Leading web development and mobile app agency in Davenport, Iowa. We craft exceptional digital experiences through innovative web development, mobile apps, and cloud solutions that drive business transformation. Serving Iowa businesses with modern technology solutions.',
    cta_text: 'Get Started'
  }), []);

  console.log(`🎬 [${componentId.current}] Hero render - showText:`, showText, 'videoEnded:', videoEnded, 'audioEnabled:', audioEnabled);

  const { content, loading } = useSiteContent('hero', fallbackContent);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Try to unmute on any user interaction
    const handleFirstInteraction = () => {
      const video = videoRef.current;
      if (video && !audioEnabled) {
        console.log('🔊 User interacted, attempting to unmute...');
        video.muted = false;
        video.volume = 1.0;
        setAudioEnabled(true);
        console.log('✅ Audio unmuted after user interaction');
        
        // Remove listeners after first interaction
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('touchstart', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [audioEnabled]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      console.log(`⚠️ [${componentId.current}] Video ref not ready yet, waiting...`);
      return;
    }
    
    console.log(`✅ [${componentId.current}] Video element found, setting up event listeners`);

    // Try to play with audio, fall back to muted if blocked
    const tryPlayWithAudio = async () => {
      if (!video) return;
      
      // DON'T try to unmute here - it will pause the video!
      // Only unmute after user interaction
      console.log('🔇 Video playing muted (will unmute on user click)');
    };

    const handleVideoEnd = () => {
      console.log(`✅ [${componentId.current}] Video ended naturally, showing text in 300ms`);
      setVideoEnded(true);
      // Show text with animation after video ends
      setTimeout(() => {
        console.log(`👁️ [${componentId.current}] NOW SHOWING TEXT`);
        setShowText(true);
      }, 300);
    };

    // For mobile, show text faster or immediately if video fails
    const handleVideoError = () => {
      console.log('❌ Video failed to load, but will NOT show text until video ends or timer expires');
      // DON'T show text immediately - let it stay hidden
      // Text will only show when video actually ends
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
    };
  }, [videoRef.current]); // Re-run when video ref becomes available

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEnableAudio = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      console.log('🔊 User clicked to enable audio');
      video.muted = false;
      video.volume = 1.0;
      
      // If video already ended, restart it
      if (videoEnded) {
        video.currentTime = 0;
        await video.play();
        setVideoEnded(false);
        setShowText(false);
      }
      
      setAudioEnabled(true);
      console.log('✅ Audio enabled');
    } catch (error) {
      console.error('❌ Failed to enable audio:', error);
    }
  };

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
      aria-label="SuperShift Labs - Web Development and Mobile Apps in Davenport Iowa"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      {/* Darker overlay on mobile for better text readability */}
      <div className={`absolute inset-0 ${isMobile ? 'bg-black/60' : 'bg-black/40'}`} role="presentation"></div>
      
      {/* Static background image */}
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp"
        alt="SuperShift Labs Studio - Modern digital workspace with innovative technology in Davenport Iowa"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Unmute icon hidden since no video */}
      {false && !audioEnabled && !videoEnded && (
        <button
          onClick={handleEnableAudio}
          className="fixed bottom-8 right-8 z-50 p-3 bg-green-500 hover:bg-green-600 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg animate-pulse"
          aria-label="Click to unmute audio"
          title="Click to unmute"
        >
          <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z" />
            <path d="M12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" />
          </svg>
        </button>
      )}
      
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