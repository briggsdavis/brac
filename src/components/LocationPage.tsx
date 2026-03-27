import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import ParallaxImage from './ParallaxImage';

const LOCATION_DATA = [
  {
    id: "beaches",
    category: "Beaches",
    items: [
      {
        name: "Zlatni Rat (Bol)",
        distance: "35 min",
        feature: "World-famous pebble cape",
        maps: "https://maps.google.com/?q=Zlatni+Rat+Bol",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Lovrečina Bay",
        distance: "12 min",
        feature: "Sandy beach with Roman ruins",
        maps: "https://maps.google.com/?q=Lovrečina+Bay",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "culture",
    category: "Culture",
    items: [
      {
        name: "Blaca Hermitage",
        distance: "45 min",
        feature: "16th-century cliffside monastery",
        maps: "https://maps.google.com/?q=Blaca+Hermitage",
        image: "https://images.unsplash.com/photo-1544551763-47a0159c963f?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Škrip Museum",
        distance: "8 min",
        feature: "Oldest village on the island",
        maps: "https://maps.google.com/?q=Škrip+Museum",
        image: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "dining",
    category: "Dining",
    items: [
      {
        name: "Konoba Kopačina",
        distance: "5 min",
        feature: "Famous Brač lamb (Donji Humac)",
        maps: "https://maps.google.com/?q=Konoba+Kopačina",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Pustinja Blaca",
        distance: "40 min",
        feature: "Traditional stone-oven dining",
        maps: "https://maps.google.com/?q=Pustinja+Blaca",
        image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "nature",
    category: "Nature",
    items: [
      {
        name: "Vidova Gora",
        distance: "25 min",
        feature: "Highest peak of the Adriatic islands",
        maps: "https://maps.google.com/?q=Vidova+Gora",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200"
      },
      {
        name: "Dol Village",
        distance: "0 min",
        feature: "Eco-ethno village with cave dwellings",
        maps: "https://maps.google.com/?q=Dol+Brac",
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200"
      },
      {
        name: "Island of Brač",
        distance: "Exploration",
        feature: "Famous for white stone and olive oil",
        maps: "https://maps.google.com/?q=Brac+Island",
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1200"
      }
    ]
  }
];

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

export default function LocationPage() {
  const [activeSection, setActiveSection] = useState(LOCATION_DATA[0].id);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = LOCATION_DATA.map(cat => document.getElementById(cat.id));
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach(section => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(section.id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto flex">
      {/* Sidebar Navigation */}
      <div className="hidden lg:block fixed left-12 top-1/2 -translate-y-1/2 z-40">
        <div className="flex flex-col gap-8 relative">
          <motion.div 
            className="absolute left-0 top-0 w-[1px] bg-black origin-top h-full"
            style={{ scaleY }}
          />
          <div className="absolute left-0 top-0 w-[1px] bg-neutral-200 h-full -z-10" />
          
          {LOCATION_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToSection(cat.id)}
              className="group relative flex items-center py-1"
            >
              <motion.div 
                className="h-[1px] bg-black transition-all duration-500"
                animate={{ 
                  width: activeSection === cat.id ? 40 : 12,
                  opacity: activeSection === cat.id ? 1 : 0.3
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 lg:pl-32">
        <motion.div {...fadeIn} className="mb-20">
          <h2 className="text-5xl sm:text-7xl font-serif mb-6">The Radius</h2>
          <p className="text-neutral-500 max-w-xl font-light leading-relaxed">
            Dol is perfectly positioned. A quiet sanctuary that remains connected to the island's most vibrant destinations.
          </p>
        </motion.div>

        <div className="space-y-32">
          {LOCATION_DATA.map((cat) => (
            <section key={cat.id} id={cat.id} className="scroll-mt-32">
              <motion.div {...fadeIn} className="mb-12">
                <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-4">{cat.category}</h3>
                <div className="h-[1px] w-20 bg-black/10" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {cat.items.map((item, i) => (
                  <motion.div 
                    key={item.name}
                    {...fadeIn}
                    transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                    className="group"
                  >
                    <div className="mb-8 overflow-hidden rounded-sm">
                      <ParallaxImage
                        src={item.image}
                        alt={item.name}
                        aspectRatio="aspect-[4/3]"
                        className="w-full transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-2xl font-serif italic">{item.name}</h4>
                      <span className="text-[10px] uppercase tracking-widest font-bold bg-neutral-100 px-3 py-1.5 rounded-full">{item.distance}</span>
                    </div>
                    <p className="text-neutral-500 text-sm font-light leading-relaxed mb-6">{item.feature}</p>
                    <a
                      href={item.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold border-b border-black pb-1 hover:opacity-50 transition-all"
                    >
                      View on Maps <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
