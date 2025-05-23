import React, { useEffect, useRef } from 'react';
import { ArrowDownIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroImages = [

  {
    url: "/2 concert.jpg",
    alt: "Woman with lotus flowers in water"
  },
  {
    url: "/4 live-music.jpg",
    alt: "Person with book"
  },
  {
    url: "/8 microphone.jpg",
    alt: "Hands holding shell"
  },
  {
    url: "/1 audio.jpg",
    alt: "Person with metallic material"
  },
  {
    url: "/6 recording-studio.jpg",
    alt: "Abstract painting with figures in pink"
  },
  {
    url: "/12.jpg",
    alt: "Abstract painting with figures in pink"
  }, 
   {
    url: "/13.avif",
    alt: "Abstract painting with figures in pink"
  },
  {
    url: "/14.avif",
    alt: "Abstract painting with figures in pink"
  },
  
];

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const startIndex = useRef<number>(Math.floor(Math.random() * heroImages.length));
  const [activeIndex, setActiveIndex] = React.useState(startIndex.current);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeIndex + 1) % heroImages.length;
      setActiveIndex(next);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const elements = containerRef.current.querySelectorAll('.parallax');
      elements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '1');
        const rotateX = y * 10 * speed;
        const rotateY = x * 10 * speed;
        const translateX = x * 20 * speed;
        const translateY = y * 20 * speed;
        
        (el as HTMLElement).style.transform = `
          translate(${translateX}px, ${translateY}px)
          rotateX(${rotateX}deg) rotateY(${rotateY}deg)
        `;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex flex-col items-center overflow-hidden" ref={containerRef}>
      <div 
        className="absolute top-0 right-0 w-full h-full opacity-30 bg-gradient-to-b from-violet-900/20 via-transparent to-transparent"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(120, 40, 200, 0.15), transparent 40%)'
        }}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-full h-full opacity-30 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(40, 80, 200, 0.15), transparent 40%)'
        }}
      />
      
      <div className="w-full h-screen absolute inset-0 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={heroImages[activeIndex].url} 
            alt={heroImages[activeIndex].alt}
            className="w-full h-full object-cover opacity-70"
            style={{ 
              transform: 'scale(1.05)',
              transition: 'transform 6s ease-in-out'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>
        </div>
      </div>
      
      <div className="container-custom relative z-10 flex flex-col justify-center items-start h-full pt-20">
        <div className="perspective max-w-2xl mt-10">
          <div className="preserve-3d backface-hidden">
            <h1 className="font-display text-xl md:text-2xl lg:text-3xl tracking-wider leading-none mb-4 md:mb-6 animate-fade-in text-gradient parallax" data-speed="0.5">
              MULTIMEDIA ARTIST
            </h1>
            
            <div className="overflow-hidden mb-8 mt-4">
              <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl animate-slide-up parallax" data-speed="0.3">
              Bringing melodies to life, one note at a time. 🎶 Dive into a world of rhythm, emotion, and pure musical magic. Let’s make every moment unforgettable with music.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-5 mt-10 animate-fade-in" style={{ animationDelay: "400ms" }}>
              <Link 
                to="/projects" 
                className="parallax glass-card py-4 px-8 text-sm font-body tracking-wider transition-all duration-500 hover:scale-105 hover:bg-white/10"
                data-speed="0.8"
              >
                Bestselling Songs
              </Link>
              <Link 
                to="/about" 
                className="parallax py-4 px-8 text-sm font-body tracking-wider border border-white/30 transition-all duration-500 hover:border-white hover:bg-white/5"
                data-speed="0.9"
              >
                ABOUT ME
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToProjects}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-float text-white/60 hover:text-white transition-colors duration-300 z-10"
      >
        <span className="font-body text-xs tracking-widest mb-2">SCROLL</span>
        <ArrowDownIcon size={20} />
      </button>
    </section>
  );
};

export default HeroSection;
