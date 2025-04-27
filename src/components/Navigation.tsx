import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlignRight, X } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleMenuToggle = () => {
    console.log("Menu toggle clicked, current state:", isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div>
          <Link to="/" className="font-display text-xl tracking-wider">
            CYB MUSIC
          </Link>
        </div>
        
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <Link 
                to="/" 
                className={`font-body text-sm transition-colors ${
                  isActive('/') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                HOME
              </Link>
            </li>
            
            <li>
            <Link 
                to="/about" 
                className={`font-body text-sm transition-colors ${
                  isActive('/about') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                ABOUT
              </Link>
            </li>
            <li>
            <Link 
                to="/sketchbook" 
                className={`font-body text-sm transition-colors ${
                  isActive('/sketchbook') || isActive('/photodiary') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                SKETCHBOOK
              </Link>
            </li>
            <li>
            <Link 
                to="/contact" 
                className={`font-body text-sm transition-colors ${
                  isActive('/about') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="md:hidden">
          <Button
            ref={menuButtonRef}
            variant="ghost"
            size="icon"
            onClick={handleMenuToggle}
            className="text-white relative z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <AlignRight />}
          </Button>
        </div>
      </div>
      
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="fixed top-0 left-0 w-full container-custom py-6 flex justify-between items-center">
            <div>
              <Link to="/" className="font-display text-xl tracking-wider">
              CYB MUSIC
              </Link>
            </div>
          </div>
          
          <nav className="fixed inset-0 pt-24 container-custom">
            <ul className="flex flex-col gap-8">
              <li>
                <Link 
                  to="/" 
                  className={`font-body text-2xl transition-colors ${
                    isActive('/') ? 'text-white' : 'text-white/60'
                  }`}
                >
                  HOME
                </Link>
              </li>
              <li>
              <Link 
                  to="/about" 
                  className={`font-body text-2xl transition-colors ${
                    isActive('/about') ? 'text-white' : 'text-white/60'
                  }`}
                >
                  ABOUT
                </Link>
              </li>
              <li>
                
                <Link 
                  to="/sketchbook" 
                  className={`font-body text-2xl transition-colors ${
                    isActive('/sketchbook') || isActive('/photodiary') ? 'text-white' : 'text-white/60'
                  }`}
                >
                  SKETCHBOOK
                </Link>
              </li>
              <li>
            <Link 
                to="/contact" 
                className={`font-body text-sm transition-colors ${
                  isActive('/about') ? 'text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                Contact
              </Link>
            </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
