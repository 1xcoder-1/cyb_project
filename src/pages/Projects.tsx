
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import ProjectCard from '../components/ProjectCard';
import { projects, Project } from '../data/projects';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'photography', label: 'Photography' },
    { id: 'video', label: 'Video' },
    { id: 'installation', label: 'Installation' },
    { id: 'performance', label: 'Performance' },
    { id: 'generative-art', label: 'Generative Art' },
  ];
  
  useEffect(() => {
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      if (activeFilter === 'all') {
        setFilteredProjects(projects);
      } else {
        setFilteredProjects(projects.filter(project => project.category.includes(activeFilter as any)));
      }
      
      setIsAnimating(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeFilter]);
  
  const handleFilterChange = (categoryId: string) => {
    if (categoryId === activeFilter) return;
    setActiveFilter(categoryId);
  };
  
  return (
    <Layout>
      <div className="pt-12 pb-24">
        <div className="container-custom">
          <div className="mb-16 max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-6 animate-fade-in">PROJECTS</h1>
            <p className="font-body text-lg text-white/80 animate-fade-in" style={{ animationDelay: "100ms" }}>
              Explore my body of work across different mediums and contexts, from photographic series 
              to immersive installations and live performances.
            </p>
          </div>
          
          <div className="mb-12 overflow-x-auto scrollbar-hidden">
            <div className="flex space-x-6 min-w-max">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleFilterChange(category.id)}
                  className={`py-2 px-5 font-body text-sm transition-all duration-300 ${
                    activeFilter === category.id 
                      ? 'glass-card text-white' 
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-500 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
          
          {filteredProjects.length === 0 && !isAnimating && (
            <div className="py-12 text-center">
              <p className="font-body text-white/70">No projects found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;
