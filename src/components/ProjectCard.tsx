
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../data/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Calculate animation delay based on index
  const animationDelay = `${index * 100}ms`;
  
  // Category label styling
  const getCategoryStyle = (category: string) => {
    switch (category) {
      case 'photography':
        return 'bg-blue-500/20 text-blue-200';
      case 'video':
        return 'bg-purple-500/20 text-purple-200';
      case 'installation':
        return 'bg-teal-500/20 text-teal-200';
      case 'performance':
        return 'bg-orange-500/20 text-orange-200';
      case 'generative-art':
        return 'bg-pink-500/20 text-pink-200';
      default:
        return 'bg-white/10 text-white';
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    const rotateX = y * -10;
    const rotateY = x * 10;
    
    imageRef.current.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.05, 1.05, 1.05)
    `;
  };
  
  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    
    imageRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setIsHovered(false);
  };
  
  // Get the primary category (first in the array) for display
  const primaryCategory = project.category[0] || '';
  
  // Format the category for display
  const formatCategory = (category: string) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  return (
    <Link 
      to={`/projects/${project.slug}`}
      className="group block animate-fade-in" 
      style={{ animationDelay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        ref={imageRef}
        className="relative overflow-hidden rounded-lg transition-transform duration-500 ease-out-expo"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="w-full pb-[100%] relative overflow-hidden rounded-lg">
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 transition-opacity duration-500" />
        
          <div className="absolute inset-0 p-6 flex flex-col justify-end transition-all duration-500 ease-out-expo">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-body tracking-wider mb-3 ${getCategoryStyle(primaryCategory)}`}>
              {formatCategory(primaryCategory)}
            </span>
            <h3 className="font-display text-xl tracking-wider mb-2">{project.title}</h3>
            <p className="font-body text-sm text-white/80 hidden md:block md:opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 ease-out-expo">{project.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
