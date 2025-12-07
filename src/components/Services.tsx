import React, { useState } from 'react';
import { useSiteContent, useServices } from '../hooks/useSiteContent';

const Services: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('services');
  const { services, loading: servicesLoading } = useServices();
  const [selectedService, setSelectedService] = useState<any>(null);

  // Default fallback services data with detailed descriptions
  const defaultServices = [
    {
      icon: '🌐',
      title: 'Web Development',
      description: 'Modern websites and web applications built with React, Next.js, and cutting-edge technologies.',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      fullDescription: 'We create high-performance, responsive websites and web applications that deliver exceptional user experiences. Our team specializes in modern JavaScript frameworks and follows industry best practices to ensure your digital presence stands out.',
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
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
      fullDescription: 'Transform your ideas into powerful mobile applications that work seamlessly across iOS and Android platforms. We build intuitive, feature-rich apps that engage users and drive business growth.',
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
      description: 'Modern backend solutions using Supabase and Firebase for real-time databases and authentication.',
      technologies: ['Supabase', 'Firebase', 'PostgreSQL', 'Real-time APIs'],
      fullDescription: 'Leverage the power of cloud infrastructure to build scalable, secure, and reliable applications. We implement modern backend solutions that handle real-time data, authentication, and storage with ease.',
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
      title: 'Design & Branding',
      description: 'Complete brand identity and UI/UX design that creates memorable digital experiences.',
      technologies: ['Figma', 'Adobe Creative', 'Branding', 'UI/UX'],
      fullDescription: 'Create a lasting impression with stunning visual design and cohesive brand identity. Our design team crafts beautiful, user-centered interfaces that not only look great but also enhance usability and conversion.',
      features: [
        'Brand identity & logo design',
        'UI/UX design & prototyping',
        'Design systems & style guides',
        'User research & testing',
        'Wireframing & mockups',
        'Accessibility & responsive design'
      ]
    }
  ];

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
      <section id="services" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {content.title || 'Our Services'}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {content.description || 'We provide comprehensive digital solutions to transform your business ideas into reality'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayServices.map((service: any, index: number) => (
              <div 
                key={index}
                onClick={() => setSelectedService(service)}
                className="bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700 cursor-pointer hover:border-green-500"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(service.technologies || []).map((tech: string, techIndex: number) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button className="text-green-400 hover:text-green-300 font-medium text-sm flex items-center gap-2">
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedService && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedService.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-white">{selectedService.title}</h3>
                  <p className="text-gray-400 mt-1">{selectedService.description}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedService(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <ul className="grid md:grid-cols-2 gap-3">
                    {selectedService.features.map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-300">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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
                  <div className="flex flex-wrap gap-2">
                    {selectedService.technologies.map((tech: string, idx: number) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-green-900 text-green-300 rounded-lg font-medium"
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
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Get Started with {selectedService.title}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;