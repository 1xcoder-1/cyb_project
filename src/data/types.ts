
export interface Project {
  id: number;
  title: string;
  slug: string;
  category: ('photography' | 'video' | 'installation' | 'performance' | 'generative-art')[];
  thumbnail: string;
  images?: string[];
  videos?: string[];
  description: string;
  client?: string;
  date: string;
  location?: string;
  isFeatured?: boolean;
  details?: string;
  youtubeId?: string;
  youtubeIds?: string[];
}
