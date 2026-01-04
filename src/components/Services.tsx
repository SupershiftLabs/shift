import React, { useState, useMemo } from 'react';
import { useSiteContent, useServices } from '../hooks/useSiteContent';

const Services: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('services');
  const { services, loading: servicesLoading } = useServices();
  const [selectedService, setSelectedService] = useState<any>(null);

  // Memoize default services to avoid recreating on every render
  const defaultServices = useMemo(() => [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Custom websites and web applications for Iowa businesses. Built with React, Next.js, and modern technologies.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      fullDescription: 'We create high-performance, responsive websites and web applications for businesses in Davenport, Quad Cities, and throughout Iowa. Our team specializes in modern JavaScript frameworks and follows industry best practices to ensure your digital presence stands out in the competitive Iowa market.',
      features: [
        'Responsive & mobile-first design',
        'Progressive Web Apps (PWA)',
        'E-commerce solutions',
        'Content Management Systems',
        'API integration & development',
        'Performance optimization & SEO'
      ]
    },
    {
      icon: '📱',
      title: 'Mobile App Development',
      description: 'Native iOS and Android apps for Iowa businesses. Cross-platform solutions with exceptional user experiences.',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
      fullDescription: 'Transform your ideas into powerful mobile applications for Iowa customers. We build intuitive, feature-rich apps for iOS and Android that engage users and drive business growth across Davenport, Quad Cities, and the Midwest.',
      features: [
        'Native iOS & Android development',
        'Cross-platform solutions',
        'App Store & Play Store deployment',
        'Push notifications & real-time updates',
        'Offline functionality',
        'In-app purchases & monetization'
      ]
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and backend solutions. Real-time databases, authentication, and serverless architecture.',
      technologies: ['Supabase', 'Firebase', 'PostgreSQL', 'AWS'],
      fullDescription: 'Leverage enterprise-grade cloud infrastructure for your Iowa business. We implement modern backend solutions with real-time data, secure authentication, and scalable storage that grow with your Davenport or Quad Cities business.',
      features: [
        'Real-time database & sync',
        'Authentication & user management',
        'Cloud storage & CDN',
        'Serverless functions',
        'Database design & optimization',
        'API development & documentation'
      ]
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Professional brand identity and user interface design. Creating memorable digital experiences for Iowa businesses.',
      technologies: ['Figma', 'Adobe Creative', 'Branding', 'UI/UX'],
      fullDescription: 'Create a lasting impression with stunning visual design and cohesive brand identity for your Iowa business. Our design team in Davenport crafts beautiful, user-centered interfaces that enhance usability, increase conversion, and resonate with Midwest customers.',
      features: [
        'Brand identity & logo design',
        'UI/UX design & prototyping',
        'Design systems & style guides',
        'User research & testing',
        'Wireframing & mockups',
        'Accessibility & responsive design'
      ]
    }
  ], []); // Empty deps array - only create once

  const loading = contentLoading || servicesLoading;

  if (loading) {
    return (
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  const displayServices = services.length > 0 ? services : defaultServices;

  return (
    <>
      <section 
        id="services" 
        className="py-20 bg-gray-900"
        aria-labelledby="services-heading"
        itemScope
        itemType="https://schema.org/Service"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title || 'Web Development & Mobile App Services in Davenport, Iowa'}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {content.description || 'Professional software development services for Iowa businesses - custom web applications, mobile apps, cloud solutions, and UI/UX design'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {displayServices.map((service: any, index: number) => (
              <article 
                key={index}
                onClick={() => setSelectedService(service)}
                className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 cursor-pointer hover:border-green-500"
                role="listitem"
                itemScope
                itemType="https://schema.org/Service"
                aria-label={`Learn more about ${service.title} services`}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3" itemProp="name">{service.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed" itemProp="description">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4" aria-label={`Technologies used: ${(service.technologies || []).join(', ')}`}>
                  {(service.technologies || []).map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full font-medium"
                      itemProp="category"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button 
                  className="text-green-400 hover:text-green-300 font-medium text-sm flex items-center gap-2"
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <meta itemProp="provider" content="SuperShift Labs" />
                <meta itemProp="areaServed" content="Davenport, Iowa, Quad Cities" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          aria-describedby="service-modal-description"
        >
          <div 
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl" aria-hidden="true">{selectedService.icon}</div>
                <div>
                  <h3 id="service-modal-title" className="text-3xl font-bold text-white">{selectedService.title} in Davenport, Iowa</h3>
                  <p id="service-modal-description" className="text-gray-400 mt-1">{selectedService.description}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close service details"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Full Description */}
              <div className="mb-6">
                <h4 className="text-xl font-semibold text-white mb-3">Overview</h4>
                <p className="text-gray-300 leading-relaxed">
                  {selectedService.fullDescription || selectedService.description}
                </p>
              </div>

              {/* Features/Capabilities */}
              {selectedService.features && selectedService.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">What We Offer</h4>
                  <ul className="grid md:grid-cols-2 gap-3" role="list">
                    {selectedService.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300" role="listitem">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies */}
              {selectedService.technologies && selectedService.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xl font-semibold text-white mb-3">Technologies & Tools</h4>
                  <div className="flex flex-wrap gap-2" role="list">
                    {selectedService.technologies.map((tech: string, idx: number) => (
                      <span 
                        key={idx}
                        itemProp="category"
                        className="px-4 py-2 bg-green-900 text-green-300 rounded-lg font-medium"
                        role="listitem"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Button */}
              <div className="mt-8 pt-6 border-t border-gray-700">
                <button 
                  onClick={() => {
                    setSelectedService(null);
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                  aria-label={`Get started with ${selectedService.title} services for your business in Davenport, Iowa and the Quad Cities`}
                >
                  Get Started with {selectedService.title} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Wrap with React.memo to prevent unnecessary re-renders
export default React.memo(Services);