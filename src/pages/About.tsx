
import React from 'react';
import Layout from '../components/Layout';
import { Instagram, Mail, Phone } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-12 animate-fade-in">
            ABOUT <span className="text-gradient">ME</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
          <div className="md:col-span-2 order-2 md:order-1">
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <p className="font-body text-lg">
                I am Renata Chebel, a Brazilian multimedia artist working at the intersection of nature, technology, and spirituality. My practice combines generative art, video, photography, projection mapping, and physical installations to explore themes of the sacred, the feminine, memory, ancestry and our evolving relationship with the environment. With a background in journalism, storytelling remains at the heart of everything I create.
              </p>
              
              <p className="font-body">
                My experimental and ever-evolving artistic practice also includes performance, soundscapes, and embroidery, often blurring the boundaries between the digital and the handmade, the ancestral and the futuristic. 
              </p>
              
              <p className="font-body">
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
            </div>
            
            <div className="mt-12 space-y-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <h2 className="font-display text-2xl tracking-wider">EDUCATION & TRAINING</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-2">BA in Journalism</h3>
                  <p className="font-body text-white/70 mb-1">University of São Paulo - Brazil</p>
                  <p className="font-body text-sm text-white/50">2003 - 2008</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-2">Digital Photography</h3>
                  <p className="font-body text-white/70 mb-1">Central Saint Martins</p>
                  <p className="font-body text-sm text-white/50">2008</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-2">Fine Art Digital Printing</h3>
                  <p className="font-body text-white/70 mb-1">ICP - NYC</p>
                  <p className="font-body text-sm text-white/50">2015</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-2">Production Design</h3>
                  <p className="font-body text-white/70 mb-1">School of Visual Arts - NYC</p>
                  <p className="font-body text-sm text-white/50">2013</p>
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="font-display text-lg mb-2">Spatial Poetry</h3>
                  <p className="font-body text-white/70 mb-1">Bauhaus-Universität Weimar</p>
                  <p className="font-body text-sm text-white/50">2017</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="sticky top-24 space-y-8">
              <div className="relative perspective">
                <div className="relative rounded-lg overflow-hidden transform hover:rotate-0 transition-transform duration-700 ease-out-expo shadow-xl">
                  <img 
                    src="/lovable-uploads/3c95e198-3ec7-4fc8-a131-4fc720de16a3.png" 
                    alt="Chebel Portrait" 
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="font-display text-xl mb-2">Chebel</h3>
                  <p className="font-body text-white/70">Multimedia Artist</p>
                </div>
              </div>
              
              <div className="relative perspective mt-8">
                <div className="relative rounded-lg overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-700 ease-out-expo shadow-xl">
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
                <div className="flex items-start mb-4">
                  <div className="bg-white/10 p-3 rounded-md mr-4">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">Email</h3>
                    <p className="font-body text-white/70">chebel@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/10 p-3 rounded-md mr-4">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-lg mb-1">Phone</h3>
                    <p className="font-body text-white/70">+55(11)98556-4289</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
