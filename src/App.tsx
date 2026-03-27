import { useState } from 'react';
import Header from './components/Header';
import GalleryPage from './components/GalleryPage';
import LocationPage from './components/LocationPage';
import OpportunityPage from './components/OpportunityPage';
import ContactPage from './components/ContactPage';
import ParallaxImage from './components/ParallaxImage';
import { ArrowRight, Maximize, Trees, Waves, Mountain, Sun, Car, Bath, Bed, Utensils } from 'lucide-react';
import { motion } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const PROPERTY_STATS = [
  { icon: Maximize, label: 'Area', value: '140 Meters Squared' },
  { icon: Trees, label: 'Gardens', value: 'Upper and Lower Garden' },
  { icon: Waves, label: 'Sea View', value: 'View of the Sea in the Garden' },
  { icon: Mountain, label: 'Mountain View', value: 'Mountain View from the House' },
  { icon: Sun, label: 'Terrace', value: 'Private Terrace' },
  { icon: Car, label: 'Parking', value: 'Parking for a small car further up the road' },
  { icon: Bath, label: 'Bathroom', value: '1 Bathroom' },
  { icon: Bed, label: 'Bedrooms', value: '4 Bedrooms' },
  { icon: Utensils, label: 'Kitchen', value: '1 Kitchen' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'gallery': return <GalleryPage />;
      case 'location': return <LocationPage />;
      case 'opportunity': return <OpportunityPage />;
      case 'contact': return <ContactPage />;
      default: return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {renderPage()}
      </main>
      <motion.div {...fadeIn}>
        <Footer onNavigate={setCurrentPage} />
      </motion.div>
    </div>
  );
}

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage 
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1920" 
            alt="Brač Estate Hero" 
            className="h-full"
            aspectRatio="aspect-auto"
          />
        </div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs uppercase tracking-[0.5em] mb-6"
          >
            Brač, Croatia
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-6 leading-tight"
          >
            Historic <br /> Stone Estate
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="max-w-sm text-[10px] sm:text-xs font-light tracking-wide opacity-80 mb-10"
          >
            A rare investment opportunity in the heart of Dol. Three-unit potential with panoramic Adriatic views.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button 
              onClick={() => {
                const el = document.getElementById('specs');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="border border-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all"
            >
              Explore Details
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/50"></div>
        </div>
      </section>

      {/* Quick Specs */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto border-b border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
          {[
            { label: 'Heritage', title: 'Historic Status', desc: 'Protected stone architecture dating back to the 18th century, meticulously preserved.' },
            { label: 'Proximity', title: '2.2km to Beach', desc: 'A short drive or scenic walk to the crystal clear waters of the Adriatic coast.' },
            { label: 'Yield', title: '3-Unit Potential', desc: 'Architectural plans ready for subdivision into three independent luxury residences.' }
          ].map((spec, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.2 }}
              className="text-center md:text-left group cursor-default"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 block group-hover:text-black transition-colors">{spec.label}</span>
              <h3 className="text-3xl font-serif italic mb-4 group-hover:translate-x-2 transition-transform">{spec.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Property Stats Section */}
      <section className="py-32 px-6 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-16 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 block">The Estate</span>
            <h2 className="text-4xl font-serif mb-6">Property Details</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {PROPERTY_STATS.map((stat, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ ...fadeIn.transition, delay: i * 0.1 }}
                whileHover={{ y: -10, backgroundColor: '#fff' }}
                className="p-8 border border-black/5 rounded-2xl transition-all duration-500 group flex flex-col items-center text-center"
              >
                <stat.icon className="w-6 h-6 mb-6 text-neutral-400 group-hover:text-black transition-colors" />
                <p className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">{stat.label}</p>
                <p className="font-serif text-lg leading-tight">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Masonry Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          {...fadeIn}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <h2 className="text-5xl font-serif mb-6">The Vision</h2>
            <p className="text-neutral-500 leading-relaxed">
              Merging historic Mediterranean charm with contemporary minimalist luxury. 
              Our vision for the Brač Estate focuses on light, stone, and space.
            </p>
          </div>
          <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 group">
            View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

        <div className="masonry-grid masonry-grid-2">
          <motion.div {...fadeIn} className="masonry-item">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1200" 
              alt="Exterior" 
              aspectRatio="aspect-[4/5]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="masonry-item">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1200" 
              alt="Detail" 
              aspectRatio="aspect-square"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="masonry-item">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1544551763-47a0159c963f?auto=format&fit=crop&q=80&w=1200" 
              alt="Interior" 
              aspectRatio="aspect-[3/4]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.6 }} className="masonry-item">
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1600" 
              alt="View" 
              aspectRatio="aspect-[16/9]"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}

function Footer({ onNavigate }: { onNavigate: (p: string) => void }) {
  return (
    <footer className="bg-neutral-50 py-20 px-6 border-t border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-serif tracking-[0.3em] uppercase mb-6">Brač Estate</h2>
          <p className="text-neutral-500 text-sm max-w-xs">
            A curated investment opportunity in Dol, Brač. 
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold mb-6">Navigation</h4>
          <ul className="space-y-3 text-sm text-neutral-500">
            <li><button onClick={() => onNavigate('home')} className="hover:text-black hover:translate-x-1 transition-all">Home</button></li>
            <li><button onClick={() => onNavigate('gallery')} className="hover:text-black hover:translate-x-1 transition-all">Gallery</button></li>
            <li><button onClick={() => onNavigate('location')} className="hover:text-black hover:translate-x-1 transition-all">Location</button></li>
            <li><button onClick={() => onNavigate('opportunity')} className="hover:text-black hover:translate-x-1 transition-all">Opportunity</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-black hover:translate-x-1 transition-all">Contact</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-widest text-neutral-400">© 2026 Brač Investment Estate. All rights reserved.</p>
        <div className="flex items-center gap-8">
          <a 
            href="https://briggsdavis.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] uppercase tracking-widest text-neutral-400 hover:text-black transition-colors"
          >
            Made by BriggsDavis
          </a>
        </div>
      </div>
    </footer>
  );
}
