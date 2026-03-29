import { useState, useEffect } from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';
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
        feature: "A well-known pebble cape that shifts shape with the tides. One of the most visited beaches in Croatia.",
        maps: "https://maps.google.com/?q=Zlatni+Rat+Bol",
        image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Lovrečina Bay",
        distance: "12 min",
        feature: "A rare sandy beach on an island of pebbles, sheltered by a pine forest and home to early Roman ruins along the shoreline.",
        maps: "https://maps.google.com/?q=Lovrečina+Bay",
        image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Hundreds of Unexplored Coves",
        distance: "All Around",
        feature: "The island has a large number of secluded pebble coves and sea caves, many only reachable on foot or by boat. Most see very little foot traffic.",
        maps: "https://maps.google.com/?q=Brac+Island+Croatia",
        image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "towns",
    category: "Nearby Towns",
    items: [
      {
        name: "Postira",
        distance: "5 min drive",
        feature: "The nearest coastal town. Has a weekly market, supermarket, medical centre, and ferry connection to Split on the mainland.",
        maps: "https://maps.google.com/?q=Postira+Brac",
        image: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Supetar",
        distance: "15 min",
        feature: "The island's main town. Restaurants, bars, ATMs, and daily fast-ferry service to Split (50 min crossing).",
        maps: "https://maps.google.com/?q=Supetar+Brac",
        image: "https://images.unsplash.com/photo-1514222139-b7830d1784b7?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  {
    id: "culture",
    category: "Culture & Heritage",
    items: [
      {
        name: "Chapel of Mikail",
        distance: "45 min hike",
        feature: "A small stone chapel in the mountains above Dol. About 45 minutes on foot along old shepherd paths through pine and scrub. Good views over the island and towards the Adriatic from the top.",
        maps: "https://maps.google.com/?q=Dol+Brac+hiking",
        image: "https://images.unsplash.com/photo-1544551763-47a0159c963f?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Blaca Hermitage",
        distance: "45 min",
        feature: "A 16th-century monastery built into the cliffs of a remote canyon. Well-preserved and largely unchanged. Worth visiting if you have a full day.",
        maps: "https://maps.google.com/?q=Blaca+Hermitage",
        image: "https://images.unsplash.com/photo-1518005020250-675f04484825?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Škrip",
        distance: "8 min",
        feature: "The oldest continuously inhabited settlement on Brač, with an Illyrian fortress, Roman mausoleum, and a small island museum inside a 16th-century castle.",
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
        feature: "Well-regarded family restaurant known for slow-roasted Brač lamb cooked under the peka. Popular with locals and visitors.",
        maps: "https://maps.google.com/?q=Konoba+Kopačina",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
      },
      {
        name: "Pustinja Blaca",
        distance: "40 min",
        feature: "Restaurant at the Blaca monastery site. Traditional food, remote setting, surrounded by olive groves.",
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
        feature: "At 778m, the highest peak of any Adriatic island. On clear days the views stretch to the Italian coast. A trail from Bol takes around 2.5 hours on foot.",
        maps: "https://maps.google.com/?q=Vidova+Gora",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=1200"
      },
      {
        name: "Dol Village",
        distance: "0 min",
        feature: "The village where the property is located. Stone houses, cave dwellings, and olive groves. Protected settlement with no new development permitted.",
        maps: "https://maps.google.com/?q=Dol+Brac",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200"
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

export default function LocationPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
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
          <h2 className="text-5xl sm:text-7xl font-serif mb-6">The Area</h2>
          <p className="text-neutral-500 max-w-xl font-light leading-relaxed">
            Dol sits inland on Brač, within easy reach of the coast, beaches, and the island's main towns.
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

        {/* Funnel CTA → Contact */}
        {onNavigate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-24 pt-16 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Next Step</p>
              <p className="font-serif text-3xl">Make an Enquiry</p>
              <p className="text-sm text-neutral-500 mt-2">Reach out to arrange a viewing or request the full investment pack.</p>
            </div>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo(0, 0); }}
              className="flex items-center gap-3 bg-black text-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all hover:scale-105 flex-shrink-0"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
