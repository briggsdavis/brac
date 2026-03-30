import { useState, useEffect, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ChevronDown, Download, Maximize, Trees, Waves, Mountain, Sun, Car, Bath, Bed, Utensils, ShieldCheck, Landmark, Ruler, MapPin, Zap, Droplets, Wrench, ArrowRight } from "lucide-react";

const CAROUSEL_IMAGES = [
  { src: "/sitekitchen.jpg", alt: "Kitchen Site Photo" },
  { src: "/sitekitechenpt2.jpg", alt: "Kitchen Site Photo Two" },
  { src: "/sitebedroom.jpg", alt: "Bedroom Site Photo" },
  { src: "/sitebathroom.jpg", alt: "Bathroom Site Photo" },
  { src: "/siteliving.jpg", alt: "Living Room Site Photo" },
  { src: "/sitelivingtwo.jpg", alt: "Living Room Site Photo Two" },
  { src: "/sitestable.jpg", alt: "Stable Site Photo" },
  { src: "/sitestableone.jpg", alt: "Stable Site Photo One" },
  { src: "/sitestabletwo.jpg", alt: "Stable Site Photo Two" },
  { src: "/siteterrace.jpg", alt: "Terrace Site Photo" },
  { src: "/sitelowergarden.jpg", alt: "Lower Garden Site Photo" },
  { src: "/sitelowergardenone.jpg", alt: "Lower Garden Site Photo One" },
  { src: "/siteuppergarden.jpg", alt: "Upper Garden Site Photo" },
  { src: "/siteuppergardentwo.jpg", alt: "Upper Garden Site Photo Two" },
  { src: "/siteroad.jpg", alt: "Road Site Photo" },
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
    label: "The Upper House",
    brief: "Two floors of stone construction with mountain views, sea breezes, a private terrace, and a beautiful Mediterranean garden.",
    subSections: [
      {
        heading: "The House",
        description: "The upper house spans two floors of solid stone construction, connected by an outdoor stone staircase. All bedrooms face the mountain and benefit from a natural sea breeze, with views out over the Dol valley and the surrounding village. Rooms are filled with natural light throughout the day. The first floor has a kitchen, a bathroom, and a hallway connecting the living spaces. The second floor opens onto a private terrace with open views across the Adriatic.",
        rooms: [
          "Kitchen",
          "Bathroom",
          "Hallway / walkway",
          "All bedrooms face the mountain",
          "Natural sea breeze throughout",
          "Views over the valley and village",
          "Abundant natural light",
          "Private top-floor terrace — Adriatic views",
          "Outdoor staircase connecting both floors",
        ],
        image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=900",
        alt: "Upper House",
      },
      {
        heading: "The Upper Garden",
        description: "Above the house, the upper garden climbs the hillside and feels entirely private. A terrace dining area sits directly in front with uninterrupted views of the ocean — perfect for long Mediterranean evenings. A solid tool shed of approximately 10 m² provides serious storage alongside a dedicated grilling and barbecue area. The garden is generously planted — lavender, an olive tree, and a fig tree give it a mature, established feel. Planting spaces are abundant throughout.",
        rooms: [
          "Terrace dining area — direct Adriatic views",
          "Tool shed (~10 m²)",
          "Grilling / barbecue area",
          "Mature olive and fig trees",
          "Lavender and Mediterranean planting",
          "Garden rises up the mountain",
          "Ample additional planting space",
          "Direct access from the upper house",
        ],
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=900",
        alt: "Upper Garden",
      },
    ],
  },
  {
    number: "02",
    label: "The Cellar",
    brief: "A ground-level stone space of approximately 40 m² with water access and strong conversion potential.",
    subSections: [
      {
        heading: "The Cellar",
        description: "The cellar sits at ground level beneath the upper house and covers approximately 40 m². The structure is solid and full of character. There is a window, and the entrance is framed by a set of large, heavy original doors. Water access is already in place. Currently used for tool storage, but with planning and renovation this space could be converted into a self-contained studio or one-bedroom unit — entirely independent from the floors above.",
        rooms: [
          "~40 m²",
          "Window",
          "Large original entrance doors",
          "Water access in place",
          "Currently used for tool storage",
          "Ground-level independent access",
          "Conversion potential — studio or 1-bed unit",
        ],
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=900",
        alt: "The Cellar",
      },
    ],
  },
  {
    number: "03",
    label: "The Stable",
    brief: "A detached two-floor stone ruin — 92 m² total — with exceptional independent conversion potential.",
    subSections: [
      {
        heading: "The Stable",
        description: "The stable is a detached stone structure spread across two floors, each measuring 46 m² — giving a total footprint of 92 m². It is currently a ruin, but a substantial and authentic one: the stonework is historic, solidly constructed, and fully in keeping with the character of the rest of the property. A large door connects it to the lower garden, and the structure is fully independent from the main house. With the right renovation, this becomes a generous independent unit — a guest annexe, a holiday let, or a second home in its own right.",
        rooms: [
          "46 m² per floor · 92 m² total",
          "Two floors",
          "Detached from main house",
          "Authentic historic stone construction",
          "Large door connecting to lower garden",
          "Currently a ruin — stone shell intact",
          "1-bed or 2-bed conversion potential",
          "Fully independent access",
        ],
        image: "https://images.unsplash.com/photo-1518005020250-675f04484825?auto=format&fit=crop&q=80&w=900",
        alt: "The Stable",
      },
    ],
  },
  {
    number: "04",
    label: "The Gardens",
    brief: "Upper and lower gardens connected by a long stone staircase, full of Mediterranean planting and character.",
    subSections: [
      {
        heading: "Upper & Lower Gardens",
        description: "The property has two distinct gardens — upper and lower — connected by a long stone staircase that runs through the heart of the plot. The upper garden rises into the hillside behind the house and features a terrace dining area with sea views, a tool shed, a grilling area, and mature planting including lavender, an olive tree, and a fig tree. The lower garden sits in front of the cellar and stable — sheltered and private, with views of both the sea and the mountains. Gates can be fitted to the connecting staircase to divide the property cleanly into separate units, ideal for rental management. Both gardens have generous planting spaces waiting to be filled.",
        rooms: [
          "Upper and lower gardens",
          "Long stone staircase connecting both levels",
          "Gate points for property subdivision",
          "Terrace dining area (upper) — Adriatic views",
          "Tool shed and grilling area (upper)",
          "Sea and mountain views from lower garden",
          "Lavender, olive tree, fig tree",
          "Generous planting spaces throughout",
          "Sheltered, private, and full of character",
        ],
        image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=900",
        alt: "The Gardens",
      },
    ],
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
          <p className="text-4xl font-serif">€143,000</p>
          <p className="text-xs text-neutral-400 mt-1">As-is condition</p>
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
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    {floor.subSections.map((sub, j) => (
                      <div key={j} className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-black/5">
                        {/* Text */}
                        <motion.div
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: j * 0.12 + 0.1, ease: [0.22, 1, 0.36, 1] }}
                          className="p-8 lg:p-12 flex flex-col justify-center gap-6"
                        >
                          {floor.subSections.length > 1 && (
                            <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">{sub.heading}</p>
                          )}
                          <p className="text-sm text-neutral-600 leading-relaxed">{sub.description}</p>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-3">Features & Rooms</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {sub.rooms.map((room, k) => (
                                <motion.li
                                  key={k}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: j * 0.12 + 0.2 + k * 0.03, ease: [0.22, 1, 0.36, 1] }}
                                  className="flex items-center gap-2 text-sm text-neutral-700"
                                >
                                  <span className="w-1 h-1 rounded-full bg-black flex-shrink-0" />
                                  {room}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                        {/* Image */}
                        <motion.div
                          initial={{ opacity: 0, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: j * 0.12 + 0.05, ease: [0.22, 1, 0.36, 1] }}
                          className="aspect-[4/3] lg:aspect-auto lg:min-h-[320px] overflow-hidden"
                        >
                          <img
                            src={sub.image}
                            alt={sub.alt}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </motion.div>
                      </div>
                    ))}
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
