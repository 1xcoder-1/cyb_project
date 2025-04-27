
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProjectCard from '../components/ProjectCard';
import { projects, Project } from '../data/projects';

const Index: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [isAnimating, setIsAnimating] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
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
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-blur-in');
            entry.target.classList.remove('opacity-0');
            // Once the animation is triggered, unobserve the element
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    if (projectsRef.current) {
      observer.observe(projectsRef.current);
    }
    
    return () => {
      if (projectsRef.current) {
        observer.unobserve(projectsRef.current);
      }
    };
  }, []);
  
  return (
    <Layout>
      <HeroSection />
      
      <div id="featured-projects" className="py-24 relative opacity-0" ref={projectsRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/50 to-black/0 opacity-50" />
        
        <div className="container-custom relative z-10">
          <div className="mb-12 max-w-4xl">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-6 animate-fade-in">PROJECTS</h2>
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
      
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10" />
        
        <div className="container-custom relative z-10">
          <div className="glass-card p-12 md:p-16 text-center max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-8 animate-fade-in">
              LET'S CREATE SOMETHING <span className="text-gradient">TOGETHER</span>
            </h2>
            
            <p className="font-body text-lg text-white/80 mb-10 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
              I'm always open to collaborations and new projects. 
              Reach out at <a href="mailto:chebel@gmail.com" className="text-white hover:text-white/80 transition-colors">chebel@gmail.com</a> to discuss how we can bring your vision to life.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
