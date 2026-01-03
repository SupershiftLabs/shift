"use client";
import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "What web development services do you offer in Davenport, Iowa?",
      answer: "SuperShift Labs offers comprehensive web development services including custom web applications, responsive websites, e-commerce platforms, and progressive web apps (PWAs). We specialize in React, Next.js, and modern JavaScript frameworks to build fast, scalable solutions for Iowa businesses."
    },
    {
      question: "How long does it take to build a website?",
      answer: "Our standard 5-page services website takes 4-7 days. More complex projects like e-commerce stores take 2-4 weeks, while custom web applications typically require 4-10 weeks. We offer rush delivery options for urgent projects in the Davenport and Quad Cities area."
    },
    {
      question: "Do you build mobile apps for iOS and Android?",
      answer: "Yes! We build cross-platform mobile apps using React Native and Expo, which allows us to deploy to both iOS and Android from a single codebase. This saves time and cost while maintaining native performance. We serve clients throughout Iowa and the Midwest."
    },
    {
      question: "What's included in your pricing?",
      answer: "All packages include modern React/Next.js development, mobile-first responsive design, SEO optimization, and 30 days of free post-launch support. We also offer optional add-ons like domain setup, hosting, SEO optimization, and rush delivery for Davenport and Iowa businesses."
    },
    {
      question: "Do you provide ongoing support and maintenance?",
      answer: "Absolutely! We offer ongoing support, maintenance, and hosting packages starting at $65/month or $600/year. This includes updates, security patches, performance monitoring, and technical support for your website or app."
    },
    {
      question: "Can you help with SEO and Google rankings?",
      answer: "Yes! All our websites are built with SEO best practices including semantic HTML, schema markup, optimized meta tags, and fast loading speeds. We also offer comprehensive SEO packages ($750) including Google Business optimization, keyword research, and local SEO for Iowa businesses."
    },
    {
      question: "Do you work with businesses outside of Davenport and Iowa?",
      answer: "While we're based in Davenport, Iowa, we work with clients throughout the Quad Cities, across Iowa, the Midwest, and nationwide. We communicate effectively via video calls, email, and project management tools to serve remote clients."
    },
    {
      question: "What makes SuperShift Labs different from other agencies?",
      answer: "We focus on speed, quality, and modern technology. Unlike WordPress agencies, we build with React/Next.js for blazing-fast performance. We deliver most projects in days, not months, and provide transparent pricing with no hidden fees. Plus, we're local to Davenport with Midwest values."
    }
  ];

  // Generate FAQ Schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section 
      id="faq" 
      className="py-20 bg-gray-900"
      aria-labelledby="faq-heading"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <header className="text-center mb-12">
          <h2 id="faq-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-green-400">Questions</span>
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about our web development and mobile app services in Davenport, Iowa
          </p>
        </header>

        <div className="space-y-4" role="list">
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-green-400/50 transition-colors"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              role="listitem"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 hover:bg-gray-750 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 
                  className="text-lg font-semibold text-white pr-4"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <svg
                  className={`w-6 h-6 text-green-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div className="px-6 pb-5">
                  <p 
                    className="text-gray-300 leading-relaxed"
                    itemProp="text"
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
            aria-label="Contact SuperShift Labs for more information"
          >
            Get In Touch
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
