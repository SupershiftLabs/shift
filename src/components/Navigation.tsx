"use client";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, []);

  const navItems = useMemo(() => [
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'FAQ', id: 'faq' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' }
  ], []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 pointer-events-auto ${
      isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg border-b border-green-500/20' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="relative h-10 w-10">
              <Image 
                src="/logo.png" 
                alt="SuperShift Labs Logo" 
                width={40}
                height={40}
                className="object-contain"
                priority
                quality={75}
              />
            </div>
            <div className={`text-xl font-bold transition-colors ${
              isScrolled ? 'text-white' : 'text-white'
            }`}>
              Super<span className="text-green-400">Shift</span> Labs
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition-colors hover:text-green-400 ${
                  isScrolled ? 'text-gray-300' : 'text-white/90'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('pricing')}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-green-500 hover:bg-gray-50 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 text-green-500 font-semibold hover:bg-green-50 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default React.memo(Navigation);