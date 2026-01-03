"use client";
import React, { useState } from 'react';
import { useSiteContent, useProjects } from '../hooks/useSiteContent';

const Projects: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const { content, loading: contentLoading } = useSiteContent('projects');
  const { projects, loading: projectsLoading } = useProjects();

  const loading = contentLoading || projectsLoading;

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  const filteredProjects = filter === 'all' ? projects : projects.filter((p: any) => p.category === filter);

  return (
    <section 
      id="projects" 
      className="py-20 bg-gray-800"
      aria-labelledby="projects-heading"
      itemScope 
      itemType="https://schema.org/CreativeWork"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-white mb-4">
            {content.title || 'Our Projects - Iowa Web & Mobile App Portfolio'}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {content.description || 'Explore our portfolio of successful digital solutions and innovative applications built for Iowa businesses in Davenport, Quad Cities, and beyond'}
          </p>
          
          <div className="flex justify-center gap-4 mb-8" role="tablist" aria-label="Filter projects by category">
            {['all', 'web', 'mobile'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                role="tab"
                aria-selected={filter === category}
                aria-label={`Show ${category === 'all' ? 'all' : category} projects`}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-green-600 text-white shadow-lg shadow-green-500/25'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {filteredProjects.map((project: any) => (
            <article 
              key={project.id}
              className="bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-700"
              itemScope 
              itemType="https://schema.org/CreativeWork"
              role="listitem"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image || '/placeholder.svg'}
                  alt={`${project.title} - ${project.category} project by SuperShift Labs in Davenport, Iowa`}
                  itemProp="image"
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex gap-2">
                    {project.demo_url && (
                      <a 
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2" itemProp="name">{project.title}</h3>
                <p className="text-gray-300 mb-4" itemProp="description">{project.description}</p>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                  {(project.technologies || []).map((tech: string, index: number) => (
                    <span 
                      key={index}
                      itemProp="keywords"
                      className="px-3 py-1 bg-green-900 text-green-300 text-sm rounded-full font-medium"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <meta itemProp="author" content="SuperShift Labs" />
                <meta itemProp="creator" content="SuperShift Labs" />
                <meta itemProp="provider" content="SuperShift Labs, Davenport, Iowa" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;