"use client";
import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const Hero: React.FC = () => {
  const { content, loading } = useSiteContent('hero', {
    title: 'SuperShift Labs',
    subtitle: 'Design & Development Studio',
    description: 'We craft exceptional digital experiences through innovative web development, mobile apps, and cloud solutions that drive business transformation.',
    cta_text: 'Explore Services'
  });

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900/20" aria-label="Hero section">
      <div className="absolute inset-0 bg-black/20"></div>
      <img 
        src="https://d64gsuwffb70l.cloudfront.net/68d794bf6b2a864c0bdbf728_1758958817530_82b6efd2.webp"
        alt="SuperShift Labs Studio - Modern digital workspace with innovative technology"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        loading="eager"
        fetchPriority="high"
      />
      
      <article className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
            {content.title.includes('SuperShift') ? (
              <>
                Super<span className="text-green-400 glow-text">Shift</span> Labs
              </>
            ) : (
              content.title
            )}
          </h1>
          <p className="text-xl md:text-2xl text-green-200 font-light">
            {content.subtitle}
          </p>
        </div>
        
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {content.description}
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={() => scrollToSection('services')}
            className="px-8 py-4 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
          >
            {content.cta_text}
          </button>
        </div>
      </article>
      
      <nav className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-label="Scroll to content">
        <button 
          onClick={() => scrollToSection('services')}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down to services section"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </nav>
    </section>
  );
};

export default Hero;