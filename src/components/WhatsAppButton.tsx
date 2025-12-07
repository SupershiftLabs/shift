"use client";
import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="sms:+13195370228"
      className="fixed bottom-4 right-4 w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg shadow-blue-500/50 z-50 group"
      aria-label="Send Message"
    >
      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      
      {/* Tooltip */}
      <span className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Send Message
      </span>
    </a>
  );
};

export default WhatsAppButton;
