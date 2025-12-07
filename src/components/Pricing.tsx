"use client";
import React from 'react';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      name: 'Starter',
      price: '$2,500',
      period: 'one-time',
      description: 'Perfect for small businesses and startups looking to establish their digital presence',
      features: [
        'Single Page Website',
        'Responsive Design',
        'Basic SEO Optimization',
        'Contact Form Integration',
        'Mobile Optimization',
        '1 Month Support',
        'Social Media Links',
        'Fast Loading Speed'
      ],
      highlight: false,
      cta: 'Get Started',
      icon: '🚀'
    },
    {
      name: 'Professional',
      price: '$5,500',
      period: 'one-time',
      description: 'Ideal for growing businesses that need a comprehensive web solution',
      features: [
        'Up to 5 Pages',
        'Custom Design',
        'Advanced SEO',
        'Content Management System',
        'E-commerce Ready',
        '3 Months Support',
        'Analytics Integration',
        'Email Integration',
        'Blog Functionality',
        'Performance Optimization'
      ],
      highlight: true,
      cta: 'Most Popular',
      icon: '⭐'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'project-based',
      description: 'Comprehensive solutions for large-scale projects with complex requirements',
      features: [
        'Unlimited Pages',
        'Custom Web Application',
        'Advanced Features',
        'API Integration',
        'Database Design',
        '6+ Months Support',
        'Priority Support',
        'Custom Integrations',
        'Dedicated Project Manager',
        'Scalable Architecture',
        'Security Audit',
        'Training & Documentation'
      ],
      highlight: false,
      cta: 'Contact Us',
      icon: '💎'
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent <span className="text-green-400">Pricing</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Choose the perfect plan for your business. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-2 border-green-400 shadow-2xl shadow-green-500/20'
                  : 'bg-gray-800/50 border border-gray-700 hover:border-green-400/50'
              }`}
            >
              {/* Popular Badge */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Icon */}
              <div className="text-5xl mb-4">{plan.icon}</div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

              {/* Price */}
              <div className="mb-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.price !== 'Custom' && (
                  <span className="text-gray-400 ml-2">/ {plan.period}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 mb-6 leading-relaxed">{plan.description}</p>

              {/* Features List */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('contact')}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-green-500 hover:bg-green-600 text-black'
                    : 'bg-gray-700 hover:bg-green-500 text-white hover:text-black'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            All plans include a free consultation and project planning session
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Flexible Payment Terms</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
