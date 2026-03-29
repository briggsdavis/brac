import { useState, useEffect, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, Download, Maximize, Trees, Waves, Mountain, Sun, Car, Bath, Bed, Utensils, Wifi, Thermometer, ShieldCheck, Landmark, Ruler, MapPin } from "lucide-react";

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
  { icon: Ruler,      label: "Total Area",     value: "140 m²" },
  { icon: Bed,        label: "Bedrooms",        value: "4" },
  { icon: Bath,       label: "Bathrooms",       value: "1" },
  { icon: Utensils,   label: "Kitchen",         value: "1 Full Kitchen" },
  { icon: Sun,        label: "Terrace",         value: "Private Terrace" },
  { icon: Trees,      label: "Gardens",         value: "Upper & Lower Garden" },
  { icon: Waves,      label: "Sea View",        value: "Adriatic Sea View" },
  { icon: Mountain,   label: "Mountain View",   value: "From the House" },
  { icon: Car,        label: "Parking",         value: "Small Car Nearby" },
  { icon: Maximize,   label: "Plot Size",       value: "~300 m² Total Plot" },
  { icon: Landmark,   label: "Heritage Status", value: "18th-Century Protected" },
  { icon: MapPin,     label: "Location",        value: "Dol, Brač, Croatia" },
];

const AMENITIES = [
  { icon: Wifi,        label: "Starlink-Ready Infrastructure" },
  { icon: Thermometer, label: "Underfloor Heating Potential" },
  { icon: ShieldCheck, label: "Solid Stone Construction" },
  { icon: Sun,         label: "South-Facing Aspect" },
  { icon: Trees,       label: "Mature Olive & Fig Trees" },
  { icon: Waves,       label: "Sea-View Garden Terrace" },
  { icon: Mountain,    label: "Panoramic Mountain Views" },
  { icon: Landmark,    label: "Historic Village Setting" },
  { icon: Car,         label: "Road Access" },
  { icon: MapPin,      label: "5 min to Postira Ferry Port" },
  { icon: Bed,         label: "Multi-Unit Subdivision Ready" },
  { icon: Maximize,    label: "Architectural Plans Available" },
];

const FLOORS = [
  {
    number: "01",
    label: "Ground Floor",
    brief: "The working heart of the estate — kitchen, dining, and utility.",
    description: "The ground floor spans approximately 45 m² and forms the practical core of the home. It features a full kitchen with a stone hearth, a spacious open-plan dining and living area, one bedroom, and a utility room with direct access to the lower garden. Original vaulted stone ceilings have been preserved throughout, providing natural insulation and an unmatched aesthetic. The bathroom is also located on this level, making the ground floor fully self-contained — ideal as a standalone rental unit or primary living space.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=900",
    alt: "Ground Floor Kitchen",
    rooms: ["Kitchen with stone hearth", "Open-plan dining & living", "1 Bedroom", "1 Bathroom", "Utility room", "Lower garden access"],
  },
  {
    number: "02",
    label: "First Floor",
    brief: "The social floor — generous living space and private terrace.",
    description: "The first floor is the largest level at approximately 55 m², designed around a generous central living room that opens onto the private stone terrace. Two bedrooms sit on either side, both with views over the valley. The terrace — accessible via original arched double doors — faces south-west, capturing the afternoon sun and offering an unobstructed view toward the Adriatic. This level is ideal as a luxury rental unit or the main entertaining space of a private family estate.",
    image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=900",
    alt: "First Floor Living Room",
    rooms: ["Open living room", "Private stone terrace", "2 Bedrooms", "SW valley & sea views", "Arched original doorways", "Natural stone flooring"],
  },
  {
    number: "03",
    label: "Upper Floor & Roof Terrace",
    brief: "Panoramic retreat — the highest point with mountain and sea views.",
    description: "The upper floor (~40 m²) is the most dramatic level of the estate. One large bedroom suite with exposed timber roof beams occupies the main space, while a second mezzanine-style room offers flexibility as a studio, office, or guest bedroom. A staircase leads directly to the flat roof terrace, which offers 360-degree views of the Dol valley, the Brač mountain ridge, and on clear days, a direct sightline to the Adriatic Sea. This level is best suited as a master suite or a premium short-stay rental unit commanding the highest nightly rate.",
    image: "https://images.unsplash.com/photo-1600607687940-47a0f9259017?auto=format&fit=crop&q=80&w=900",
    alt: "Upper Floor Bedroom",
    rooms: ["Master bedroom suite", "Exposed timber roof beams", "Mezzanine studio/office", "Roof terrace access", "360° panoramic views", "Mountain & sea sightlines"],
  },
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
};

export default function SpecificationsPage() {
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
          A rare historic stone estate in Dol, one of Brač's oldest and most protected inland villages.
          Originally built in the 18th century, the property offers 140 m² across three floors with four bedrooms,
          upper and lower gardens, a private terrace, and panoramic views stretching from the Brač mountain ridge
          to the Adriatic Sea. Sold as a renovation project with architectural subdivision plans available on request.
        </p>
      </motion.div>

      {/* Image Carousel */}
      <motion.div {...fadeIn} className="mb-24">
        <div
          className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-100 cursor-pointer group"
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

      {/* Amenities */}
      <motion.div {...fadeIn} className="mb-24 py-16 px-8 bg-neutral-50 rounded-3xl">
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3 block">What's Included</span>
          <h3 className="text-3xl font-serif">Amenities & Features</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AMENITIES.map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.05 }}
              className="flex items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-neutral-500" />
              </div>
              <span className="text-sm text-neutral-700">{item.label}</span>
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
          <p className="text-sm text-neutral-500 mt-1">Architectural layout — PDF, A3 format</p>
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

    </div>
  );
}
