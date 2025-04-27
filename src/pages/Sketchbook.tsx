
import React from 'react';
import Layout from '../components/Layout';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sketchbook: React.FC = () => {
  return (
    <Layout>
      <div className="pt-12 pb-24">
        <div className="container-custom">
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center font-body text-sm text-white/70 hover:text-white transition-colors duration-300"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="mb-16 max-w-4xl">
            <h1 className="font-display text-4xl md:text-5xl tracking-wider mb-12 animate-fade-in">SKETCHBOOK</h1>
          </div>
          
          <div className="w-full overflow-hidden glass-card rounded-lg">
            {/* Replace iframe with a direct link for mobile */}
            <div className="relative pb-[150%] md:pb-[100%] w-full h-0">
              <iframe 
                src="https://chebel.tumblr.com" 
                className="absolute top-0 left-0 w-full h-full border-0"
                title="Chebel Tumblr"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
              ></iframe>
            </div>
          </div>
          
          {/* Removed the duplicate Back to Home button here */}
        </div>
      </div>
    </Layout>
  );
};

export default Sketchbook;
