"use client";
import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Navigation from './Navigation';
import Hero from './Hero';
import Services from './Services';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import AdminDashboard from './AdminDashboard';
import AdminAuth from './AdminAuth';
import SEOChecker from './SEOChecker';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();
  const [showAdmin, setShowAdmin] = useState(false);

  // Listen for admin access shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdmin(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // Simple admin toggle (in production, this would be behind authentication)
  const toggleAdmin = () => {
    setShowAdmin(!showAdmin);
  };

  if (showAdmin) {
    return (
      <AdminAuth>
        <div>
          <button
            onClick={toggleAdmin}
            className="fixed top-4 right-20 z-50 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Back to Site
          </button>
          <AdminDashboard />
        </div>
      </AdminAuth>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Services />
      <Projects />
      <About />
      <SEOChecker />
      <Contact />
      <Footer />
      
      {/* Admin Access Button - Bottom left */}
      <button
        onClick={toggleAdmin}
        className="fixed bottom-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-lg text-sm font-semibold border border-gray-600 z-50"
      >
        Admin
      </button>
      
      {/* Message Button - Bottom right */}
      <a
        href="sms:+13194708878"
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/50 z-50 group"
        aria-label="Send Message"
      >
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Send Message
        </span>
      </a>
    </div>
  );
};

export default AppLayout;
