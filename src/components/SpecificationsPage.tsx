import { useState, useEffect, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, Download, Maximize, Trees, Waves, Mountain, Sun, Car, Bath, Bed, Utensils, ShieldCheck, Landmark, Ruler, MapPin, Zap, Droplets, Wrench, ArrowRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1600", alt: "Refurbished Interior Render" },
  { src: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=1600", alt: "Luxury Interior Render" },
  { src: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1600", alt: "Pool Render" },
  { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1600", alt: "Kitchen Render" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=1600", alt: "Living Room Render" },
  { src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1600", alt: "Exterior Stone Detail" },
  { src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1600", alt: "Site View" },
  { src: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1600", alt: "Adriatic View" },
];

const SPECS = [
  { icon: Ruler,      label: "Total Area",       value: "166 m²" },
  { icon: Landmark,   label: "Year Built",       value: "1890" },
  { icon: Bed,        label: "Bedrooms",         value: "4" },
  { icon: Bath,       label: "Bathrooms",        value: "1" },
  { icon: Utensils,   label: "Kitchen",          value: "1 Full Kitchen" },
  { icon: Sun,        label: "Terrace",          value: "Private Terrace" },
  { icon: Trees,      label: "Gardens",          value: "Upper & Lower Garden" },
  { icon: Waves,      label: "Sea View",         value: "Adriatic Sea View" },
  { icon: Mountain,   label: "Mountain View",    value: "From the House" },
  { icon: Car,        label: "Parking",          value: "Small Car Nearby" },
  { icon: Maximize,   label: "Plot Size",        value: "~300 m² Total Plot" },
  { icon: ShieldCheck, label: "Construction",    value: "Solid Stone" },
  { icon: MapPin,     label: "Marina",           value: "5 min to Postira" },
  { icon: Wrench,     label: "Utility Room",     value: "Upper Garden Level" },
  { icon: Trees,      label: "Mature Trees",     value: "Olive, Fig & Mulberry" },
  { icon: Zap,        label: "Utilities",        value: "Electricity, Water & Internet" },
  { icon: Droplets,   label: "Drainage",         value: "Septic Tank" },
  { icon: Landmark,   label: "Heritage Status",  value: "19th-Century Protected" },
  { icon: MapPin,     label: "Location",         value: "Dol, Brač, Croatia" },
  { icon: Maximize,   label: "Stable",           value: "Detached, conversion potential" },
];


const FLOORS = [
  {
    number: "01",
    label: "Ground Floor",
    brief: "Kitchen, dining area, bathroom and direct access to the lower garden.",
    description: "The ground floor covers approximately 45 m². It has a kitchen with a stone hearth, an open dining and living area, one bedroom, a bathroom, and a utility room. There is direct access to the lower garden from this level. The original vaulted stone ceilings are intact throughout, which helps with natural temperature regulation. The floor is self-contained and could function independently as a single unit.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=900",
    alt: "Ground Floor Kitchen",
    rooms: ["Kitchen with stone hearth", "Open dining and living area", "1 Bedroom", "1 Bathroom", "Utility room", "Lower garden access"],
  },
  {
    number: "02",
    label: "First Floor",
    brief: "Central living room with access to the private stone terrace.",
    description: "The first floor is the largest at approximately 55 m². A central living room opens onto the stone terrace via the original arched double doors. Two bedrooms sit either side, both with views over the valley. The terrace faces south-west and has an open view towards the Adriatic. This floor could be used as the main living level or as a separate unit.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=900",
    alt: "First Floor Living Room",
    rooms: ["Central living room", "Private stone terrace", "2 Bedrooms", "South-west valley and sea views", "Original arched doorways", "Stone flooring throughout"],
  },
  {
    number: "03",
    label: "Upper Floor and Roof Terrace",
    brief: "Top floor bedroom with roof terrace access and views over the valley and sea.",
    description: "The upper floor is approximately 40 m². There is one main bedroom with exposed timber roof beams and a smaller secondary room that could work as a studio, office, or additional sleeping space. A staircase leads to the flat roof terrace, which has open views of the Dol valley, the mountains, and on clear days the Adriatic. This level works well as the top unit in a subdivision or as the main bedroom suite in a single-family arrangement.",
    image: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=900",
    alt: "Upper Floor Bedroom",
    rooms: ["Main bedroom", "Exposed timber roof beams", "Secondary room / office", "Roof terrace access", "Valley and sea views", "Mountain views"],
  },
  {
    number: "04",
    label: "The Stable",
    brief: "Detached stone stable with its own garden access. Potential for conversion into a self-contained unit.",
    description: "Also included in the sale is a detached stone stable at garden level, separate from the main house. The original stone shell and vaulted ceiling are intact. The structure has its own entrance directly from the lower garden and is fully independent from the main building. It could be converted into a studio or one-bedroom apartment. Possible uses include a holiday let, home office, guest accommodation, or caretaker's quarters. Planning would be subject to local authority approval.",
    image: "https://images.unsplash.com/photo-1518005020250-675f04484825?auto=format&fit=crop&q=80&w=900",
    alt: "Stone Stable Exterior",
    rooms: ["Detached stone structure", "Original vaulted ceiling", "Independent garden entrance", "Lower garden frontage", "Studio or 1-bed conversion potential", "Fully separate from main house"],
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function SpecificationsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [expandedFloor, setExpandedFloor] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCarouselIndex((i) => (i + 1) % CAROUSEL_IMAGES.length);
  }, []);

  const prev = () => {
    setCarouselIndex((i) => (i - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">

      {/* Header + Price */}
      <motion.div {...fadeIn} className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-4 block">Technical Overview</span>
          <h2 className="text-5xl sm:text-6xl font-serif leading-tight">Specifications</h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Asking Price</p>
          <p className="text-4xl font-serif">€120,000</p>
          <p className="text-xs text-neutral-400 mt-1">Negotiable · As-is condition</p>
        </div>
      </motion.div>

      {/* Brief Description */}
      <motion.div {...fadeIn} className="mb-20 max-w-3xl">
        <p className="text-lg text-neutral-600 leading-relaxed font-serif italic">
          A historic stone property in Dol, Brač, constructed in 1890.
          The main house covers 166 m² across three floors with four bedrooms, upper and lower gardens, a private terrace,
          and views of the mountains and sea. A detached stone stable is also included in the sale.
          Sold as a renovation project. Subdivision plans available on request.
        </p>
      </motion.div>

      {/* Image Carousel */}
      <motion.div {...fadeIn} className="mb-24">
        <div
          className="relative aspect-[16/9] overflow-hidden bg-neutral-100 cursor-pointer group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onClick={() => setLightboxIndex(carouselIndex)}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={carouselIndex}
              src={CAROUSEL_IMAGES[carouselIndex].src}
              alt={CAROUSEL_IMAGES[carouselIndex].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>

          {/* Overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-[10px] uppercase tracking-[0.3em] font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Open Gallery
            </span>
          </div>

          {/* Prev / Next */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {CAROUSEL_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCarouselIndex(i); }}
                className={`rounded-full transition-all duration-300 ${i === carouselIndex ? "w-6 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
              />
            ))}
          </div>

          {/* Caption */}
          <div className="absolute bottom-10 left-6">
            <span className="text-white/80 text-[10px] uppercase tracking-[0.3em]">
              {CAROUSEL_IMAGES[carouselIndex].alt}
            </span>
          </div>
        </div>
      </motion.div>

      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={CAROUSEL_IMAGES}
      />

      {/* Specs Grid */}
      <motion.div {...fadeIn} className="mb-24">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3 block">By the Numbers</span>
          <h3 className="text-3xl font-serif">Property Details</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {SPECS.map((spec, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.05 }}
              className="p-6 border border-black/5 rounded-2xl flex flex-col gap-3 hover:border-black/20 transition-colors"
            >
              <spec.icon className="w-5 h-5 text-neutral-400" />
              <div>
                <p className="text-[9px] uppercase tracking-widest text-neutral-400 mb-1">{spec.label}</p>
                <p className="font-serif text-base leading-tight">{spec.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>


      {/* Floor Descriptions */}
      <motion.div {...fadeIn} className="mb-24">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3 block">Layout</span>
          <h3 className="text-3xl font-serif">Floor by Floor</h3>
        </div>

        <div className="space-y-4">
          {FLOORS.map((floor, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.1 }}
              className="border border-black/5 rounded-2xl overflow-hidden"
            >
              {/* Floor header — always visible */}
              <button
                className="w-full flex items-center gap-6 p-8 text-left hover:bg-neutral-50 transition-colors group"
                onClick={() => setExpandedFloor(expandedFloor === i ? null : i)}
              >
                <span className="font-serif italic text-2xl text-neutral-300 w-8 flex-shrink-0">{floor.number}</span>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">{floor.label}</p>
                  <p className="font-serif text-xl">{floor.brief}</p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${expandedFloor === i ? "rotate-180" : ""}`}
                />
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expandedFloor === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-black/5">
                      {/* Text */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center gap-6">
                        <p className="text-sm text-neutral-600 leading-relaxed">{floor.description}</p>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">Rooms & Features</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {floor.rooms.map((room, j) => (
                              <li key={j} className="flex items-center gap-2 text-sm text-neutral-700">
                                <span className="w-1 h-1 rounded-full bg-black flex-shrink-0" />
                                {room}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Image */}
                      <div className="aspect-[4/3] lg:aspect-auto lg:min-h-[320px] overflow-hidden">
                        <img
                          src={floor.image}
                          alt={floor.alt}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floor Plan Download */}
      <motion.div {...fadeIn} className="flex flex-col sm:flex-row items-center justify-between gap-6 py-12 px-8 border border-black/5 rounded-2xl">
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Technical Documents</p>
          <p className="font-serif text-2xl">Floor Plan</p>
          <p className="text-sm text-neutral-500 mt-1">Architectural layout, PDF format</p>
        </div>
        <a
          href="https://wa.me/251944825058?text=Hi%2C%20I%27d%20like%20to%20request%20the%20floor%20plan%20for%20the%20Bra%C4%8D%20Estate."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-black text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105 rounded-xl flex-shrink-0"
        >
          <Download className="w-4 h-4" />
          Request Floor Plan
        </a>
      </motion.div>

      {/* Funnel CTA → Opportunity */}
      {onNavigate && (
        <motion.div {...fadeIn} className="mt-16 pt-16 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Next Step</p>
            <p className="font-serif text-3xl">Explore the Opportunity</p>
            <p className="text-sm text-neutral-500 mt-2">See investment scenarios, rental projections, and resale potential.</p>
          </div>
          <button
            onClick={() => { onNavigate('opportunity'); window.scrollTo(0, 0); }}
            className="flex items-center gap-3 bg-black text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105 flex-shrink-0"
          >
            View Opportunities <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

    </div>
  );
}
