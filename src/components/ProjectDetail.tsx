import React, { useState, useEffect } from 'react';
import { Project } from '../data/types';
import { AspectRatio } from './ui/aspect-ratio';
import { ChevronLeft, ChevronRight, X, Home } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogClose } from './ui/dialog';
import { Link } from 'react-router-dom';

interface ProjectDetailProps {
  project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [imageOrientation, setImageOrientation] = useState<'landscape' | 'portrait'>('landscape');
  
  useEffect(() => {
    setSelectedImageIndex(0);
    setIsLoading(true);
    setGalleryOpen(false);
  }, [project.id]);
  
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setImageOrientation(img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait');
    setIsLoading(false);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const navigateToPrevImage = () => {
    if (project.images && project.images.length > 0) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === 0 ? project.images!.length - 1 : prevIndex - 1
      );
      setIsLoading(true);
    }
  };

  const navigateToNextImage = () => {
    if (project.images && project.images.length > 0) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === project.images!.length - 1 ? 0 : prevIndex + 1
      );
      setIsLoading(true);
    }
  };
  
  const openGallery = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  const navigatePrevGallery = () => {
    if (project.images && project.images.length > 0) {
      setGalleryIndex((prevIndex) => 
        prevIndex === 0 ? project.images!.length - 1 : prevIndex - 1
      );
    }
  };

  const navigateNextGallery = () => {
    if (project.images && project.images.length > 0) {
      setGalleryIndex((prevIndex) => 
        prevIndex === project.images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };
  
  const formatCategory = (category: string) => {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const formattedCategories = project.category.map(formatCategory).join(', ');
  
  const renderThumbnails = () => {
    if (!project.images || project.images.length <= 1) return null;
    
    return (
      <div className="mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 w-full h-32 md:h-40 overflow-hidden rounded-md transition-all duration-300 ${
                index === selectedImageIndex ? 'ring-2 ring-white/80' : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img 
                src={image} 
                alt={`${project.title} thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <Button 
            variant="outline" 
            onClick={() => setGalleryOpen(true)}
            className="text-sm font-body tracking-wider border-white/30 hover:border-white hover:bg-white/5"
          >
            Gallery View
          </Button>
        </div>
      </div>
    );
  };
  
  const renderMedia = () => {
    if (project.youtubeIds && project.youtubeIds.length > 0) {
      return (
        <div className="space-y-8">
          {project.youtubeIds.map((youtubeId, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg">
              <AspectRatio ratio={16/9}>
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={`${project.title} - Video ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              </AspectRatio>
            </div>
          ))}
        </div>
      );
    } else if (project.youtubeId) {
      return (
        <div className="relative overflow-hidden rounded-lg">
          <AspectRatio ratio={16/9}>
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
          </AspectRatio>
        </div>
      );
    } else if (project.images && project.images.length > 0) {
      return (
        <div className="relative overflow-hidden rounded-lg">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          )}
          
          {project.images.length > 1 && (
            <>
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 border-0 z-10"
                onClick={navigateToPrevImage}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous image</span>
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 border-0 z-10"
                onClick={navigateToNextImage}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next image</span>
              </Button>
            </>
          )}
          
          <div className="flex justify-center">
            <img 
              src={project.images[selectedImageIndex]} 
              alt={project.title} 
              className={`transition-opacity duration-500 ${
                imageOrientation === 'portrait' 
                  ? 'max-h-[80vh] h-auto w-auto object-contain' 
                  : 'w-full h-auto'
              }`}
              style={{ opacity: isLoading ? 0.5 : 1 }}
              onLoad={handleImageLoad}
            />
          </div>
        </div>
      );
    } else if (project.videos && project.videos.length > 0) {
      return (
        <div className="relative overflow-hidden rounded-lg aspect-video">
          <video 
            src={project.videos[0]} 
            controls
            poster={project.thumbnail}
            className="w-full h-full object-cover"
            onLoadedData={handleVideoLoad}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else {
      return (
        <div className="relative overflow-hidden rounded-lg">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-auto"
            onLoad={handleImageLoad}
          />
        </div>
      );
    }
  };
  
  const renderImagesGrid = () => {
    if (project.youtubeIds && project.youtubeIds.length > 0 && project.images && project.images.length > 0) {
      return (
        <div className="mt-12">
          <h3 className="font-display text-xl tracking-wider mb-6">Installation Views</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.images.map((image, index) => (
              <div 
                key={index} 
                className="overflow-hidden rounded-lg cursor-pointer"
                onClick={() => openGallery(index)}
              >
                <img 
                  src={image} 
                  alt={`${project.title} view ${index + 1}`} 
                  className="w-full h-auto transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              onClick={() => setGalleryOpen(true)}
              className="text-sm font-body tracking-wider border-white/30 hover:border-white hover:bg-white/5"
            >
              Gallery View
            </Button>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-10">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wider mb-4">
          {project.title}
        </h1>
        <p className="font-body text-lg text-white/80 max-w-3xl">
          {project.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          {renderMedia()}
          {!project.youtubeIds && renderThumbnails()}
          {renderImagesGrid()}
        </div>
        
        <div className="glass-card p-8 self-start">
          <div className="mb-8">
            <h3 className="font-display text-lg tracking-wider mb-4">PROJECT DETAILS</h3>
            <p className="font-body text-white/80 whitespace-pre-line">{project.details}</p>
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-body text-sm text-white/60 mb-1">Category</h4>
                <p className="font-body">{formattedCategories}</p>
              </div>
              <div>
                <h4 className="font-body text-sm text-white/60 mb-1">Date</h4>
                <p className="font-body">{project.date}</p>
              </div>
              {project.client && (
                <div>
                  <h4 className="font-body text-sm text-white/60 mb-1">Client</h4>
                  <p className="font-body">{project.client}</p>
                </div>
              )}
              {project.location && (
                <div>
                  <h4 className="font-body text-sm text-white/60 mb-1">Location</h4>
                  <p className="font-body">{project.location}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="max-w-6xl p-0 bg-black/90 border-none">
          <div className="absolute right-4 top-4 z-10 flex gap-2">
            <Link to="/" className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <Home className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Link>
            <DialogClose className="rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          
          <div className="relative flex items-center justify-center w-full h-full min-h-[50vh] max-h-[80vh]">
            {project.images && (
              <img 
                src={project.images[galleryIndex]} 
                alt={`${project.title} view ${galleryIndex + 1}`} 
                className="max-h-full max-w-full object-contain"
              />
            )}
            
            {project.images && project.images.length > 1 && (
              <>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 border-0 z-10"
                  onClick={navigatePrevGallery}
                >
                  <ChevronLeft className="h-6 w-6" />
                  <span className="sr-only">Previous image</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 border-0 z-10"
                  onClick={navigateNextGallery}
                >
                  <ChevronRight className="h-6 w-6" />
                  <span className="sr-only">Next image</span>
                </Button>
              </>
            )}
          </div>
          
          {project.images && project.images.length > 1 && (
            <div className="p-4 bg-black/80">
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`relative flex-shrink-0 w-full h-20 overflow-hidden rounded-md transition-all duration-300 ${
                      index === galleryIndex ? 'ring-2 ring-white/80' : 'opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
