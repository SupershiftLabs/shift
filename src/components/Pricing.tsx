"use client";
import React from 'react';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      name: '5-Page Services Site',
      price: '$1,800 – $2,500',
      period: '4–7 days',
      description: 'Home • About • Services • Portfolio • Contact\nMobile-perfect and SEO-ready',
      features: [
        'Single Page Application (SPA)',
        '5 core pages included',
        'Mobile-first responsive design',
        'SEO-optimized structure',
        'React/Next.js modern stack',
        'Blazing fast performance',
        'Free 30-day post-launch tweaks'
      ],
      highlight: false,
      cta: 'Get Started',
      icon: '⚡',
      delivery: '4–7 days'
    },
    {
      name: 'Services Site + Lead Machine',
      price: '$2,800 – $3,800',
      period: '6–9 days',
      description: 'Everything in Services Site plus powerful lead generation tools',
      features: [
        'Everything in 5-Page Site',
        'Booking system integration',
        'Email capture forms',
        'Strategic pop-ups',
        'Lead management dashboard',
        'Automated email responses',
        'Analytics tracking',
        'Conversion optimization'
      ],
      highlight: true,
      cta: 'Most Popular',
      icon: '🚀',
      delivery: '6–9 days'
    },
    {
      name: 'Full Headless CMS Site',
      price: '$4,200 – $6,000',
      period: '9–14 days',
      description: 'Client edits text, images, blog, services themselves (no WordPress bloat)',
      features: [
        'Everything in Lead Machine',
        'Headless CMS integration',
        'Edit content yourself',
        'Blog management',
        'Image gallery control',
        'Services page editor',
        'No WordPress complexity',
        'Training included'
      ],
      highlight: false,
      cta: 'Get Started',
      icon: '✏️',
      delivery: '9–14 days'
    }
  ];

  const advancedPlans = [
    {
      name: 'Complete E-commerce Store',
      price: '$5,500 – $9,000',
      period: '2–4 weeks',
      description: 'Full-featured online store with everything you need to sell',
      features: [
        'Product catalog',
        'Shopping cart',
        'Secure checkout',
        'Inventory management',
        'Discount codes',
        'Abandoned cart emails',
        'Payment integration',
        'Order tracking'
      ],
      icon: '🛒',
      delivery: '2–4 weeks'
    },
    {
      name: 'Custom Web App / SaaS',
      price: '$10,000 – $25,000+',
      period: '4–10 weeks',
      description: 'Advanced web applications with custom functionality',
      features: [
        'User dashboards',
        'Login & authentication',
        'Subscription management',
        'Workflow automation',
        'API integrations',
        'Database architecture',
        'Admin panel',
        'Scalable infrastructure'
      ],
      icon: '💻',
      delivery: '4–10 weeks'
    },
    {
      name: 'Mobile Apps',
      price: 'Price on Request',
      period: 'Custom timeline',
      description: 'iOS & Android native apps built with React Native',
      features: [
        'React Native development',
        'Expo framework',
        'Cross-platform (iOS & Android)',
        'API integration',
        'Push notifications',
        'App store deployment',
        'Ongoing maintenance',
        'Updates & support'
      ],
      icon: '📱',
      delivery: 'Custom'
    }
  ];

  const addOns = [
    { name: 'Domain + DNS setup', price: '$150' },
    { name: 'First-year hosting & updates', price: '$600/yr or $65/mo' },
    { name: 'Full SEO + Google Business optimization', price: '$750' },
    { name: 'Rush delivery (under 5 days)', price: '+30%' }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="pricing" 
      className="py-20 px-6 bg-gradient-to-br from-gray-950 via-gray-900 to-black relative overflow-hidden"
      aria-labelledby="pricing-heading"
      itemScope 
      itemType="https://schema.org/OfferCatalog"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 id="pricing-heading" className="text-4xl md:text-5xl font-bold text-white mb-4" itemProp="name">
            SuperShift Labs – <span className="text-green-400">2026 Pricing</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-3" itemProp="description">
            Lightning-fast websites & apps built in days, not months for Iowa businesses.
          </p>
          <p className="text-lg text-green-400 font-medium">
            Davenport, Iowa based • Serving Quad Cities & Midwest • React / Next.js • No WordPress bloat
          </p>
        </header>

        {/* Core Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16" role="list" aria-label="Website development packages">{pricingPlans.map((plan, index) => (
            <article
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.highlight
                  ? 'bg-gradient-to-br from-green-500/20 to-blue-500/20 border-2 border-green-400 shadow-2xl shadow-green-500/20'
                  : 'bg-gray-800/70 border border-gray-700 hover:border-green-400/50'
              }`}
              itemScope 
              itemType="https://schema.org/Offer"
              role="listitem"
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
              <div className="text-5xl mb-4" aria-hidden="true">{plan.icon}</div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold text-white mb-2" itemProp="name">{plan.name}</h3>

              {/* Price */}
              <div className="mb-2">
                <span className="text-3xl font-bold text-green-400" itemProp="price">{plan.price}</span>
              </div>

              {/* Delivery Time */}
              <div className="mb-4">
                <span className="text-sm text-gray-300">⚡ <span itemProp="deliveryLeadTime">{plan.delivery}</span></span>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-line text-sm" itemProp="description">{plan.description}</p>

              {/* Features List */}
              <ul className="space-y-3 mb-8" role="list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300" role="listitem">
                    <svg
                      className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
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
                aria-label={`Get started with ${plan.name} package for your Iowa business`}
              >
                {plan.cta}
              </button>
              
              <meta itemProp="seller" content="SuperShift Labs" />
              <meta itemProp="availability" content="https://schema.org/InStock" />
              <meta itemProp="areaServed" content="Davenport, Iowa, Quad Cities, Midwest" />
            </article>
          ))}
        </div>

        {/* Advanced Solutions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            Advanced <span className="text-green-400">Solutions</span> for Iowa Businesses
          </h3>
          <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Advanced development solutions">
            {advancedPlans.map((plan, index) => (
              <article
                key={index}
                className="relative rounded-2xl p-8 bg-gray-800/70 border border-gray-700 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                itemScope 
                itemType="https://schema.org/Offer"
                role="listitem"
              >
                {/* Plan Icon */}
                <div className="text-5xl mb-4" aria-hidden="true">{plan.icon}</div>

                {/* Plan Name */}
                <h4 className="text-2xl font-bold text-white mb-2" itemProp="name">{plan.name}</h4>

                {/* Price */}
                <div className="mb-2">
                  <span className="text-3xl font-bold text-green-400" itemProp="price">{plan.price}</span>
                </div>

                {/* Delivery Time */}
                <div className="mb-4">
                  <span className="text-sm text-gray-300">⚡ <span itemProp="deliveryLeadTime">{plan.delivery}</span></span>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-sm" itemProp="description">{plan.description}</p>

                {/* Features List */}
                <ul className="space-y-3 mb-8" role="list">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300" role="listitem">
                      <svg
                        className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
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
                  className="w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 bg-gray-700 hover:bg-green-500 text-white hover:text-black"
                  aria-label={`Get quote for ${plan.name} package`}
                >
                  Get Quote
                </button>
                
                <meta itemProp="seller" content="SuperShift Labs" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
                <meta itemProp="areaServed" content="Davenport, Iowa, Quad Cities, Midwest" />
              </article>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            <span className="text-green-400">Add-ons</span> &amp; Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" role="list" aria-label="Additional services">
            {addOns.map((addon, index) => (
              <article
                key={index}
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300"
                itemScope 
                itemType="https://schema.org/Offer"
                role="listitem"
              >
                <h4 className="text-white font-semibold mb-2 text-sm" itemProp="name">{addon.name}</h4>
                <p className="text-green-400 font-bold text-lg" itemProp="price">{addon.price}</p>
                <meta itemProp="seller" content="SuperShift Labs" />
                <meta itemProp="availability" content="https://schema.org/InStock" />
              </article>
            ))}
          </div>
        </div>

        {/* All Packages Include */}
        <aside className="text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-400/30 rounded-2xl p-8" aria-labelledby="included-heading">
          <h3 id="included-heading" className="text-2xl font-bold text-white mb-6">
            All packages <span className="text-green-400">include</span>
          </h3>
          <ul className="flex flex-wrap justify-center gap-8 text-gray-300" role="list">
            <li className="flex items-center gap-3" role="listitem">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Modern React/Next.js stack</span>
            </li>
            <li className="flex items-center gap-3" role="listitem">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Mobile-first, blazing fast</span>
            </li>
            <li className="flex items-center gap-3" role="listitem">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">Free 30-day post-launch tweaks</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
};

export default Pricing;
