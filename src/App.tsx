import { useState } from 'react';
import Header from './components/Header';
import GalleryPage from './components/GalleryPage';
import LocationPage from './components/LocationPage';
import OpportunityPage from './components/OpportunityPage';
import ContactPage from './components/ContactPage';
import SpecificationsPage from './components/SpecificationsPage';
import ParallaxImage from './components/ParallaxImage';
import { ArrowRight, Maximize, Trees, Waves, Mountain, Sun, Car, Bed, Landmark, Leaf } from 'lucide-react';
import { motion } from 'motion/react';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const PROPERTY_STATS = [
  { icon: Maximize, label: 'Area', value: '166 Meters Squared' },
  { icon: Trees, label: 'Gardens', value: 'Upper and Lower Garden' },
  { icon: Waves, label: 'Sea View', value: 'Sea View' },
  { icon: Mountain, label: 'Mountain View', value: 'Mountain View from the House' },
  { icon: Sun, label: 'Terrace', value: 'Private Terrace' },
  { icon: Car, label: 'Parking', value: 'Parking for a small car further up the road' },
  { icon: Bed, label: 'Bedrooms', value: '3 Bedrooms' },
  { icon: Maximize, label: 'Stable', value: 'Detached Stone Stable Included' },
  { icon: Landmark, label: 'Heritage', value: 'Historic Stone Construction — 1890' },
  { icon: Leaf, label: 'Olive Grove', value: 'Private Olive Grove' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'render' | 'site'>('all');

  const navigateToGallery = (filter: 'all' | 'render' | 'site' = 'all') => {
    setGalleryFilter(filter);
    setCurrentPage('gallery');
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'gallery': return <GalleryPage initialFilter={galleryFilter} />;
      case 'location': return <LocationPage onNavigate={setCurrentPage} />;
      case 'opportunity': return <OpportunityPage onNavigate={setCurrentPage} />;
      case 'specifications': return <SpecificationsPage onNavigate={setCurrentPage} />;
      case 'contact': return <ContactPage />;
      default: return <Home onNavigateToGallery={navigateToGallery} onNavigate={setCurrentPage} />;
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

function Home({ onNavigateToGallery, onNavigate }: { onNavigateToGallery: (filter: 'all' | 'render' | 'site') => void; onNavigate: (page: string) => void }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/brachero.jpg"
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
            A rare investment opportunity in the heart of Dol. Three-unit potential with panoramic Adriatic views, plus a detached stone stable with its own conversion potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
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
            <button
              onClick={() => { onNavigate('opportunity'); window.scrollTo(0, 0); }}
              className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all"
            >
              View Opportunity
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
            { label: 'Heritage', title: 'Historic Status', desc: 'Stone construction dating back to the 18th century. Protected village status — no new development permitted in Dol.' },
            { label: 'Proximity', title: '2.2km to Beach', desc: 'Short drive to the Adriatic coast. Postira town and its ferry port are 5 minutes away.' },
            { label: 'Yield', title: '3-Unit Potential', desc: 'Subdivision plans available for three independent units. Detached stone stable also included with its own conversion potential.' }
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

      {/* Quick Specs CTA */}
      <section className="py-10 px-6 max-w-7xl mx-auto border-b border-black/5">
        <motion.div {...fadeIn} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">Full technical breakdown of the property — area, rooms, utilities, and more.</p>
          <button
            onClick={() => { onNavigate('specifications'); window.scrollTo(0, 0); }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 group flex-shrink-0"
          >
            View Full Specifications <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
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

      {/* Opportunity CTA */}
      <section className="py-10 px-6 max-w-7xl mx-auto border-b border-black/5">
        <motion.div {...fadeIn} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">See the investment options — short-term lets, resale, co-living, and more.</p>
          <button
            onClick={() => { onNavigate('opportunity'); window.scrollTo(0, 0); }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 group flex-shrink-0"
          >
            Explore the Opportunity <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>
      </section>

      {/* Home Masonry Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div {...fadeIn}>
            <h2 className="text-5xl font-serif mb-6">The Property</h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              A closer look at the property — from 3D renders of proposed renovation concepts, to on-site photography, and the stunning nearby beaches of Brač.
            </p>
            <button onClick={() => onNavigateToGallery('render')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 group">
              View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="overflow-hidden">
            <ParallaxImage
              src="/images/opportunityhero.jpg"
              alt="Renovation Render"
              aspectRatio="aspect-[4/3]"
            />
          </motion.div>
        </div>

        <div className="masonry-grid masonry-grid-2">
          <motion.div {...fadeIn} className="masonry-item">
            <ParallaxImage
              src="/images/dolvillagetwo.jpg"
              alt="Dol Village"
              aspectRatio="aspect-[4/5]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="masonry-item">
            <ParallaxImage 
              src="/renderfront.jpg"
              alt="Render Front"
              aspectRatio="aspect-square"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="masonry-item">
            <ParallaxImage
              src="/siteterrace.jpg"
              alt="Site Terrace"
              aspectRatio="aspect-[3/4]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.6 }} className="masonry-item">
            <ParallaxImage
              src="/images/lovrecina.jpg"
              alt="Lovrecina Beach"
              aspectRatio="aspect-[16/9]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.8 }} className="masonry-item">
            <ParallaxImage
              src="/images/multi.jpg"
              alt="Multi"
              aspectRatio="aspect-[4/3]"
            />
          </motion.div>
        </div>

        {/* Home Contact CTA */}
        <motion.div {...fadeIn} className="mt-20 py-16 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-1">Ready to proceed?</p>
            <p className="font-serif text-3xl">Get in Touch</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => { onNavigate('location'); window.scrollTo(0, 0); }}
              className="border border-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-50 transition-all"
            >
              View Location
            </button>
            <button
              onClick={() => { onNavigate('contact'); window.scrollTo(0, 0); }}
              className="bg-black text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-800 transition-all"
            >
              Contact Us
            </button>
          </div>
        </motion.div>
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
            <li><button onClick={() => onNavigate('specifications')} className="hover:text-black hover:translate-x-1 transition-all">Specifications</button></li>
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
