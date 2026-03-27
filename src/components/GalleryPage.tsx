import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { motion } from "motion/react";
import ParallaxImage from "./ParallaxImage";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", alt: "Modern Refurbished Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=1200", alt: "Luxury Interior Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1200", alt: "Modern Pool Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200", alt: "Refurbished Kitchen Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1200", alt: "Living Room Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&q=80&w=1200", alt: "Bedroom Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600585154542-6379b14616fd?auto=format&fit=crop&q=80&w=1200", alt: "Bathroom Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18fb6f3ea?auto=format&fit=crop&q=80&w=1200", alt: "Dining Area Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&q=80&w=1200", alt: "Terrace Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200", alt: "Garden Render", category: "render" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1200", alt: "Current Site Exterior", category: "site" },
  { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200", alt: "Current Site View", category: "site" },
  { src: "https://images.unsplash.com/photo-1544551763-47a0159c963f?auto=format&fit=crop&q=80&w=1200", alt: "Current Site Stone Detail", category: "site" },
  { src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1200", alt: "Current Site Courtyard", category: "site" },
  { src: "https://images.unsplash.com/photo-1514222139-b7830d1784b7?auto=format&fit=crop&q=80&w=1200", alt: "Adriatic Coastline", category: "site" },
  { src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200", alt: "Local Village Architecture", category: "site" },
  { src: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200", alt: "Stone House Detail", category: "site" },
  { src: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200", alt: "Mountain View", category: "site" },
  { src: "https://images.unsplash.com/photo-1518005020250-675f04484825?auto=format&fit=crop&q=80&w=1200", alt: "Garden Path", category: "site" },
  { src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200", alt: "Sunset over Brač", category: "site" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState<"all" | "render" | "site">("all");

  const filteredImages = filter === "all" ? IMAGES : IMAGES.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div {...fadeIn} className="mb-16 text-center">
        <h2 className="text-5xl font-serif mb-8">Gallery</h2>
        
        <div className="flex justify-center gap-12 mb-12">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'render', label: '3D Renders' },
            { id: 'site', label: 'Site Photos' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id as any)}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] font-bold pb-2 border-b-2 transition-all",
                filter === btn.id ? "border-black text-black" : "border-transparent text-neutral-400 hover:text-black"
              )}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="masonry-grid masonry-grid-4">
        {filteredImages.map((img, i) => (
          <motion.div 
            key={img.src} 
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="masonry-item group cursor-pointer overflow-hidden bg-neutral-100 relative"
            onClick={() => setIndex(IMAGES.indexOf(img))}
          >
            <ParallaxImage
              src={img.src}
              alt={img.alt}
              aspectRatio={i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/2]"}
              className="w-full"
            />
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-white/90 backdrop-blur-sm text-[8px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded-full shadow-sm">
                {img.category === 'render' ? '3D Render' : 'Site Photo'}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
            </div>
          </motion.div>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={IMAGES}
      />
    </div>
  );
}

// Helper function for conditional classes (since it's not imported in this file yet)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
