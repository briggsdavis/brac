import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useState } from "react";
import { motion } from "motion/react";
import ParallaxImage from "./ParallaxImage";
import PropertyVideo from "./PropertyVideo";
import { RevealText } from "./Reveal";

const IMAGE_FILES = [
  "IMG_8289.jpg",
  "IMG_8290.jpg",
  "IMG_8291.jpg",
  "IMG_8292.jpg",
  "IMG_8293.jpg",
  "IMG_8294.jpg",
  "IMG_8295.jpg",
  "IMG_8296.jpg",
  "IMG_8297.jpg",
  "IMG_8298.jpg",
  "IMG_8299.jpg",
  "IMG_8300.jpg",
  "IMG_8302.jpg",
  "IMG_8303.jpg",
  "IMG_8304.jpg",
  "IMG_8305.jpg",
  "IMG_8306.jpg",
  "IMG_8307.jpg",
  "IMG_8308.jpg",
  "IMG_8309.jpg",
  "IMG_8311.jpg",
  "IMG_8312.jpg",
  "IMG_8313.jpg",
  "IMG_8314.jpg",
  "IMG_8315.jpg",
  "IMG_8316.jpg",
  "IMG_8317.jpg",
  "IMG_8318.jpg",
  "IMG_8319.jpg",
  "IMG_8320.jpg",
  "IMG_8321.jpg",
  "IMG_8322.jpg",
  "IMG_8324.jpg",
  "IMG_8325.jpg",
  "IMG_8326.jpg",
  "IMG_8327.jpg",
  "IMG_8328.jpg",
  "IMG_8329.jpg",
  "IMG_8331.jpg",
  "IMG_8332.jpg",
  "IMG_8333.jpg",
  "IMG_8334.jpg",
  "IMG_8335.jpg",
  "IMG_8336.jpg",
  "IMG_8337.jpg",
  "IMG_8338.jpg",
  "IMG_8339.jpg",
  "IMG_8340.jpg",
  "IMG_8341.jpg",
  "IMG_8344.jpg",
];

const IMAGES = IMAGE_FILES.map((filename, index) => ({
  src: `/gallery/${filename}`,
  alt: `Property gallery photo ${index + 1}`,
  category: "site",
}));

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

      <PropertyVideo className="mb-20" />

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
