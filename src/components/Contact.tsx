import React, { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useSiteContent } from '../hooks/useSiteContent';

// Social media icons component
const SocialIcon = ({ icon, name }: { icon: string; name: string }) => {
  const icons = {
    facebook: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    instagram: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.508 0-4.541-2.036-4.541-4.544s2.033-4.544 4.541-4.544c2.508 0 4.544 2.036 4.544 4.544s-2.036 4.544-4.544 4.544zm7.519 0c-2.508 0-4.541-2.036-4.541-4.544s2.033-4.544 4.541-4.544c2.508 0 4.544 2.036 4.544 4.544s-2.036 4.544-4.544 4.544z"/>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    x: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    )
  };
  
  return icons[icon as keyof typeof icons] || (
    <span className="text-sm font-bold">{name[0]}</span>
  );
};

const Contact: React.FC = () => {
  // Force use hardcoded contact info instead of database
  const contactInfo = {
    title: "Let's Build Something Amazing",
    description: "Ready to transform your digital presence? Get in touch and let's discuss your project.",
    email: 'admin@supershiftlabs.com',
    phone: '+13195370228',
    whatsapp: '+13195370228',
    location: 'Davenport, IA, USA',
    socialLinks: [
      { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61584803090279', icon: 'facebook' },
      { name: 'Instagram', url: 'https://www.instagram.com/supershiftlabs/', icon: 'instagram' }
    ]
  };
  
  const { content: dbContent, loading } = useSiteContent('contact', contactInfo);
  
  // Always use hardcoded contact info, but merge with database for title/description
  const content = {
    ...contactInfo,
    title: dbContent.title || contactInfo.title,
    description: dbContent.description || contactInfo.description
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Try Supabase first if configured, otherwise log locally
      if (isSupabaseConfigured) {
        // Save to Supabase
        const { error: supabaseError } = await supabase
          .from('contacts')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              message: `Company: ${formData.company}\n\n${formData.message}`
            }
          ]);

        if (supabaseError) {
          throw supabaseError;
        }
        console.log('Form submitted to database successfully');
      } else {
        // Frontend-only mode - just log the submission
        const formSubmission = {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
          timestamp: new Date().toISOString()
        };

        console.log('Contact form submitted (frontend-only mode):', formSubmission);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', company: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to submit form. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-2 text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-green-900 border border-green-700 rounded-2xl p-12">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-3xl font-bold text-green-300 mb-4">Message Sent!</h3>
            <p className="text-green-400 text-lg">
              Thanks for reaching out! We'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="contact" 
      className="py-20 bg-gray-800"
      aria-labelledby="contact-heading"
      itemScope 
      itemType="https://schema.org/ContactPage"
    >
      <div className="max-w-7xl mx-auto px-6">
        <header className="text-center mb-16">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title || "Let's Build Something Amazing in Davenport"}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {content.description || "Ready to transform your Iowa business with modern web and mobile solutions? Get in touch and let's discuss your project."}
          </p>
        </header>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            {error && (
              <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4" role="alert">
                <p className="text-red-300">{error}</p>
              </div>
            )}
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6"
              itemScope 
              itemType="https://schema.org/ContactForm"
              aria-label="Contact form to reach SuperShift Labs"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="your@email.com"
                    aria-required="true"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="contact-company" className="block text-sm font-medium text-gray-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="contact-company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Details *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project, goals, and timeline..."
                  aria-required="true"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-green-500/25"
                aria-label="Send message to SuperShift Labs"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <aside 
            className="space-y-8"
            itemScope 
            itemType="https://schema.org/LocalBusiness"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch with Our Davenport Team</h3>
              <ul className="space-y-4" role="list">
                <li className="flex items-center gap-4" role="listitem">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <span className="text-green-400">📧</span>
                  </div>
                  <div itemProp="email">
                    <p className="font-medium text-white">Email</p>
                    <a href={`mailto:${content.email}`} className="text-gray-300 hover:text-green-400 transition-colors">
                      {content.email}
                    </a>
                  </div>
                </li>
                
                <li className="flex items-center gap-4" role="listitem">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <span className="text-green-400">📱</span>
                  </div>
                  <div itemProp="telephone">
                    <p className="font-medium text-white">Phone</p>
                    <a href={`tel:${content.phone}`} className="text-gray-300 hover:text-green-400 transition-colors">
                      {content.phone}
                    </a>
                  </div>
                </li>
                
                <li className="flex items-center gap-4" role="listitem">
                  <div className="w-10 h-10 bg-green-900 rounded-lg flex items-center justify-center" aria-hidden="true">
                    <span className="text-green-400">📍</span>
                  </div>
                  <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">
                      <span itemProp="addressLocality">Davenport</span>, <span itemProp="addressRegion">IA</span>, <span itemProp="addressCountry">USA</span>
                    </p>
                  </div>
                </li>
              </ul>
              <meta itemProp="name" content="SuperShift Labs" />
              <meta itemProp="areaServed" content="Davenport, Iowa, Quad Cities, Midwest" />
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${(content.whatsapp || content.phone || '+13195370228').replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-600/25 text-center"
              aria-label="Chat with SuperShift Labs on WhatsApp"
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>Chat on WhatsApp</span>
              </div>
            </a>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Follow SuperShift Labs</h4>
              <nav className="flex gap-4" aria-label="Social media links">
                {content.socialLinks?.map((social: any, index: number) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white group"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} name={social.name} />
                  </a>
                )) || [
                  { name: 'Facebook', icon: 'facebook', url: 'https://www.facebook.com/profile.php?id=61584803090279' },
                  { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/supershiftlabs/' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 hover:bg-green-600 rounded-lg flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-white"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <SocialIcon icon={social.icon} name={social.name} />
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default Contact;