
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Mail, Phone } from 'lucide-react';

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Find all elements with animate-on-scroll class within this entry
            const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
              el.classList.add('animate-fade-in');
              el.classList.remove('opacity-0');
            });
            
            // Once the animation is triggered for this section, unobserve it
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    
    // Observe the section container itself
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-24 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-bl from-blue-600/5 via-purple-600/5 to-transparent rounded-full blur-3xl" />
      
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <div className="overflow-hidden">
              <h2 className="font-display text-3xl md:text-4xl tracking-wider mb-8 animate-on-scroll opacity-0">
                ABOUT <span className="text-gradient">CHEBEL</span>
              </h2>
            </div>
            
            <div className="animate-on-scroll opacity-0" style={{ transitionDelay: "100ms" }}>
              <p className="font-body text-white/80 mb-6">
                I am Renata Chebel, a Brazilian multimedia artist working at the intersection of nature, technology, and spirituality. My practice combines generative art, video, photography, projection mapping and physical installations to explore themes of the sacred, the feminine, memory, ancestry and our relationship with the environment. With a background in journalism, storytelling remains at the heart of everything I create.
              </p>
              
              <p className="font-body text-white/80 mb-6">
                My experimental and ever-evolving artistic practice also includes performance, soundscapes and embroidery, often blurring the boundaries between the digital and the handmade, the ancestral and the futuristic. 
              </p>
              
              <p className="font-body text-white/80 mb-6">
                My work has been presented at international festivals and art events such as the Bombay Beach Biennale (USA), the Taiwan Technology and Culture Expo, MAPP (Canada) and Amazonia Mapping (Brazil). I'm especially drawn to collaborative and site-specific projects that blend ancient wisdom with emerging technologies.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-8">
                <a 
                  href="https://instagram.com/infinitachebel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center font-body text-sm tracking-wider group hover:text-white/90"
                >
                  <Instagram size={18} className="mr-2" />
                  @infinitachebel
                </a>
                
                <a 
                  href="https://instagram.com/iluminachebel" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center font-body text-sm tracking-wider group hover:text-white/90"
                >
                  <Instagram size={18} className="mr-2" />
                  @iluminachebel
                </a>
              </div>
              
              <Link 
                to="/about" 
                className="inline-flex items-center font-body text-sm tracking-wider group"
              >
                MORE ABOUT ME
                <ArrowRight 
                  size={16} 
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                />
              </Link>
            </div>
          </div>
          
          <div className="animate-on-scroll opacity-0 mt-8 md:mt-20" style={{ transitionDelay: "200ms" }}>
            <div className="relative perspective max-w-md mx-auto md:mx-0">
              <div 
                className="relative rounded-lg overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out-expo shadow-xl"
              >
                <img 
                  src="/lovable-uploads/6e9f6cab-d469-4093-b39b-ec290d5e5006.png" 
                  alt="Chebel performing VJ set" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-body text-sm text-white/60 mb-1">Based in</h4>
                <p className="font-body">Brazil</p>
              </div>
              <div>
                <h4 className="font-body text-sm text-white/60 mb-1">Experience</h4>
                <p className="font-body">15+ Years</p>
              </div>
            </div>
            
            <div className="glass-card p-6 mt-8">
              <div className="flex items-center mb-4">
                <Mail size={18} className="mr-3 text-white/70" />
                <span className="font-body">chebel@gmail.com</span>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-white/70" />
                <span className="font-body">+55(11)98556-4289</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
