import React from 'react';
import { useSiteContent } from '../hooks/useSiteContent';

const About: React.FC = () => {
  const { content, loading: contentLoading } = useSiteContent('about');

  const loading = contentLoading;

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto"></div>
          <p className="mt-2 text-gray-300">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      className="py-20 bg-gray-900"
      aria-labelledby="about-heading"
      itemScope 
      itemType="https://schema.org/Organization"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span itemProp="name">{content.title || 'About SuperShift Labs - Davenport Iowa Web Development'}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" itemProp="slogan">
            {content.subtitle || 'Leading Iowa software agency transforming businesses through innovative web and mobile technology in Davenport and the Quad Cities'}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <article itemScope itemType="https://schema.org/AboutPage">
            <h3 className="text-3xl font-bold text-white mb-6">The SuperShift Philosophy</h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p itemProp="description">
                {content.description || 'Based in Davenport, Iowa, SuperShift Labs is a full-service software development agency specializing in custom web applications, mobile apps, and cloud solutions. We serve businesses throughout Iowa, the Quad Cities region, and the Midwest with cutting-edge technology and personalized service.'}
              </p>
              {content.mission && (
                <p>
                  <strong className="text-white">Our Mission:</strong> <span itemProp="mission">{content.mission}</span>
                </p>
              )}
              {content.story && <p itemProp="about">{content.story}</p>}
            </div>
            <meta itemProp="addressLocality" content="Davenport" />
            <meta itemProp="addressRegion" content="Iowa" />
            <meta itemProp="areaServed" content="Iowa, Davenport, Quad Cities, Midwest" />
          </article>
          
          <aside className="bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700" aria-labelledby="why-choose-heading">
            <h4 id="why-choose-heading" className="text-2xl font-bold text-white mb-6">Why Choose SuperShift Labs?</h4>
            <ul className="space-y-4" role="list">
              {(content.values || [
                'Skilled & Passionate Team – We bring diverse expertise and fresh thinking to every project.',
                'Proven Results – Successful projects delivered across different industries in Iowa and beyond.',
                'Full-Stack Approach – From design to deployment, we handle the entire build.',
                'Agile & Collaborative – Flexible process with clear communication at every stage.',
                'Local Iowa Presence – Based in Davenport, serving businesses throughout the Quad Cities and Midwest.',
                'Ongoing Partnership – Continuous support and optimization beyond launch.'
              ]).map((point: string, index: number) => (
                <li key={index} className="flex items-start gap-3" role="listitem">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0 shadow-glow" aria-hidden="true"></div>
                  <p className="text-gray-300">{point}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>
        
        <meta itemProp="url" content="https://supershiftlabs.com" />
        <meta itemProp="telephone" content="+1-563-XXX-XXXX" />
        <meta itemProp="email" content="hello@supershiftlabs.com" />
      </div>
    </section>
  );
};

export default About;