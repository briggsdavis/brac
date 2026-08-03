import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { motion } from "motion/react";
import ParallaxImage from "./ParallaxImage";
import { RevealText } from "./Reveal";

const IMAGES = [
  { src: "/sitekitchen.jpg", alt: "Kitchen Site Photo", category: "site" },
  { src: "/sitekitechenpt2.jpg", alt: "Kitchen Site Photo Two", category: "site" },
  { src: "/sitebedroom.jpg", alt: "Bedroom Site Photo", category: "site" },
  { src: "/sitebathroom.jpg", alt: "Bathroom Site Photo", category: "site" },
  { src: "/siteliving.jpg", alt: "Living Room Site Photo", category: "site" },
  { src: "/sitelivingtwo.jpg", alt: "Living Room Site Photo Two", category: "site" },
  { src: "/sitestable.jpg", alt: "Stable Site Photo", category: "site" },
  { src: "/sitestableone.jpg", alt: "Stable Site Photo One", category: "site" },
  { src: "/sitestabletwo.jpg", alt: "Stable Site Photo Two", category: "site" },
  { src: "/siteterrace.jpg", alt: "Terrace Site Photo", category: "site" },
  { src: "/sitelowergarden.jpg", alt: "Lower Garden Site Photo", category: "site" },
  { src: "/sitelowergardenone.jpg", alt: "Lower Garden Site Photo One", category: "site" },
  { src: "/siteuppergarden.jpg", alt: "Upper Garden Site Photo", category: "site" },
  { src: "/siteuppergardentwo.jpg", alt: "Upper Garden Site Photo Two", category: "site" },
  { src: "/siteroad.jpg", alt: "Road Site Photo", category: "site" },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 }
};

export default function GalleryPage({ initialFilter = "all" }: { initialFilter?: "all" | "site" }) {
  const [index, setIndex] = useState(-1);
  const [filter, setFilter] = useState<"all" | "site">(initialFilter);

  const filteredImages = filter === "all" ? IMAGES : IMAGES.filter(img => img.category === filter);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <motion.div {...fadeIn} className="mb-16 text-center">
        <h2 className="text-5xl font-serif mb-8"><RevealText>Gallery</RevealText></h2>

        <div className="flex justify-center gap-12 mb-12">
          {[
            { id: 'all', label: 'All Photos' },
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

      <div className="masonry-grid masonry-grid-3">
        {filteredImages.map((img, i) => (
          <motion.div 
            key={img.src} 
            layout
            initial={{ opacity: 0, boxShadow: '0 18px 45px rgba(26, 26, 26, 0)' }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileInView={{ boxShadow: '0 18px 45px rgba(26, 26, 26, 0.12)' }}
            viewport={{ once: true, margin: '0px 0px -30% 0px' }}
            transition={{
              duration: 0.5,
              boxShadow: { duration: 0.65, delay: 1.94, ease: [0.22, 1, 0.36, 1] },
            }}
            className="masonry-item group cursor-pointer overflow-hidden relative"
            onClick={() => setIndex(IMAGES.indexOf(img))}
          >
            <ParallaxImage
              src={img.src}
              alt={img.alt}
              aspectRatio={i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-square" : "aspect-[3/2]"}
              className="w-full"
            />
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-white/80 backdrop-blur-sm text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 rounded shadow-sm text-neutral-700">
                Site Photo
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
