import { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import GalleryPage from './components/GalleryPage';
import LocationPage from './components/LocationPage';
import OpportunityPage from './components/OpportunityPage';
import ContactPage from './components/ContactPage';
import SpecificationsPage from './components/SpecificationsPage';
import ParallaxImage from './components/ParallaxImage';
import { RevealText } from './components/Reveal';
import { initSmoothScroll, scrollToTop, scrollToElement } from './lib/scroll';
import { ArrowRight, Maximize, Trees, Waves, Mountain, Sun, Car, Bed, Landmark, Leaf } from 'lucide-react';
import { AnimatePresence, motion, useAnimationControls } from 'motion/react';

const WIPE_EASE = [0.76, 0, 0.24, 1] as const;

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
  { icon: Landmark, label: 'Heritage', value: 'Historic Stone Construction, 1890' },
  { icon: Leaf, label: 'Olive Grove', value: 'Private Olive Grove' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'site'>('all');
  const [introComplete, setIntroComplete] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const wipeControls = useAnimationControls();
  const isTransitioning = useRef(false);

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    const bodyCopy = Array.from(
      document.querySelectorAll<HTMLElement>('main p:not([data-no-blur-reveal]), footer p')
    );

    bodyCopy.forEach((element) => element.classList.add('body-copy-reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    // On internal page changes, let the white transition curtain begin moving
    // before body copy reveals so the blur-in remains visible to the visitor.
    const startDelay = currentPage === 'home' ? 0 : 450;
    const timer = window.setTimeout(() => {
      bodyCopy.forEach((element) => observer.observe(element));
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [currentPage]);

  useEffect(() => {
    document.body.style.overflow = introComplete ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [introComplete]);

  const chooseAudio = (withAudio: boolean) => {
    const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    setIsMuted(!withAudio);
    if (!audio) return;
    audio.volume = 0.1;
    audio.muted = !withAudio;
    if (withAudio) void audio.play().catch(() => setIsMuted(true));
  };

  const toggleMute = () => {
    const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    if (!audio) return;
    const nextMuted = !isMuted;
    audio.muted = nextMuted;
    setIsMuted(nextMuted);
    if (!nextMuted) void audio.play().catch(() => setIsMuted(true));
  };

  // White panel wipes up to cover the screen (favicon centred), holds briefly,
  // then wipes up again off the top to reveal the freshly-swapped page.
  const runTransition = async (apply: () => void) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    await wipeControls.start({ y: '0%', transition: { duration: 0.5, ease: WIPE_EASE } });
    apply();
    scrollToTop(true);
    await new Promise((resolve) => setTimeout(resolve, 450));
    await wipeControls.start({ y: '-100%', transition: { duration: 0.55, ease: WIPE_EASE } });
    wipeControls.set({ y: '100%' });
    isTransitioning.current = false;
  };

  const navigate = (page: string) => {
    if (page === currentPage) {
      scrollToTop();
      return;
    }
    runTransition(() => setCurrentPage(page));
  };

  const navigateToGallery = (filter: 'all' | 'site' = 'all') => {
    if (currentPage === 'gallery') {
      setGalleryFilter(filter);
      scrollToTop();
      return;
    }
    runTransition(() => {
      setGalleryFilter(filter);
      setCurrentPage('gallery');
    });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'gallery': return <GalleryPage initialFilter={galleryFilter} />;
      case 'location': return <LocationPage onNavigate={navigate} />;
      case 'opportunity': return <OpportunityPage onNavigate={navigate} />;
      case 'specifications': return <SpecificationsPage onNavigate={navigate} />;
      case 'contact': return <ContactPage />;
      default: return (
        <Home
          onNavigateToGallery={navigateToGallery}
          onNavigate={navigate}
          onAudioChoice={chooseAudio}
          onIntroComplete={() => setIntroComplete(true)}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onNavigate={navigate}
        currentPage={currentPage}
        isReady={introComplete}
        isMuted={isMuted}
        onToggleMute={toggleMute}
      />
      <main>
        {renderPage()}
      </main>
      <motion.div {...fadeIn}>
        <Footer onNavigate={navigate} />
      </motion.div>

      {/* Page transition curtain — wipes up to cover, then up again to reveal */}
      <motion.div
        initial={{ y: '100%' }}
        animate={wipeControls}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
        style={{ willChange: 'transform' }}
      >
        <img
          src="/images/bracfav.jpg"
          alt="Brač Estate"
          className="w-40 h-40 object-contain"
        />
      </motion.div>
    </div>
  );
}

interface HomeProps {
  onNavigateToGallery: (filter: 'all' | 'site') => void;
  onNavigate: (page: string) => void;
  onAudioChoice: (withAudio: boolean) => void;
  onIntroComplete: () => void;
}

const INTRO_EASE = [0.22, 1, 0.36, 1] as const;
const heroButtonVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(16px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.68, ease: INTRO_EASE } },
};

function Home({ onNavigateToGallery, onNavigate, onAudioChoice, onIntroComplete }: HomeProps) {
  const [entryDismissed, setEntryDismissed] = useState(false);
  const isEntering = useRef(false);
  const entryControls = useAnimationControls();
  const imageControls = useAnimationControls();
  const copyControls = useAnimationControls();
  const buttonControls = useAnimationControls();

  const beginHeroSequence = async (withAudio: boolean) => {
    if (isEntering.current) return;
    isEntering.current = true;
    onAudioChoice(withAudio);

    await entryControls.start({ opacity: 0, filter: 'blur(12px)', transition: { duration: 0.35, ease: 'easeOut' } });
    setEntryDismissed(true);

    await imageControls.start({
      width: '62vmin',
      height: '62vmin',
      opacity: 1,
      transition: { duration: 1.05, ease: INTRO_EASE },
    });
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    await imageControls.start({
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      transition: { duration: 1.15, ease: INTRO_EASE },
    });
    await copyControls.start({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.62, ease: INTRO_EASE },
    });
    await buttonControls.start('visible');
    onIntroComplete();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden bg-white">
        <motion.div
          initial={{ width: 0, height: 0, opacity: 0, borderRadius: 4 }}
          animate={imageControls}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
          style={{ willChange: 'width, height, opacity' }}
        >
          <img
            src="/images/brachero.jpg"
            alt="Brač Estate Hero"
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.15) 35%, transparent 60%)' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18, filter: 'blur(14px)' }}
          animate={copyControls}
          className="absolute inset-0 flex flex-col items-center justify-end text-white text-center px-6 pb-20"
        >
          <span className="text-xs uppercase tracking-[0.5em] mb-6">Brač, Croatia</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif mb-10 leading-tight">
            <span className="block">Historic</span>
            <span className="block">Stone Estate</span>
          </h1>
          <motion.div
            initial="hidden"
            animate={buttonControls}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              variants={heroButtonVariants}
              onClick={() => scrollToElement('#specs')}
              className="border border-white px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all"
            >
              Explore Details
            </motion.button>
            <motion.button
              variants={heroButtonVariants}
              onClick={() => { onNavigate('opportunity'); }}
              className="bg-white text-black px-10 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-200 transition-all"
            >
              View Opportunity
            </motion.button>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={buttonControls} variants={{ visible: { opacity: 1, transition: { delay: 0.7 } } }} className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-white/50"></div>
        </motion.div>

        <AnimatePresence>
          {!entryDismissed && (
            <motion.div
              animate={entryControls}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-white px-6 text-center"
            >
              <p data-no-blur-reveal className="mb-5 text-[10px] uppercase tracking-[0.5em] text-neutral-400">Brač, Croatia</p>
              <h1 className="mb-12 font-serif text-4xl tracking-[0.08em] sm:text-5xl">Brač Estate</h1>
              <div className="flex w-full max-w-xs flex-col gap-3">
                <button
                  onClick={() => void beginHeroSequence(true)}
                  className="border border-black bg-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-white transition-colors hover:bg-neutral-800"
                >
                  Enter with audio
                </button>
                <button
                  onClick={() => void beginHeroSequence(false)}
                  className="border border-black px-8 py-4 text-[10px] font-bold uppercase tracking-[0.28em] text-black transition-colors hover:bg-neutral-50"
                >
                  Enter without audio
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quick Specs */}
      <section id="specs" className="py-32 px-6 max-w-7xl mx-auto border-b border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-20">
          {[
            { label: 'Heritage', title: 'Historic Status', desc: 'Solid stone construction from 1890. Protected village status means no new development is permitted in Dol. Supply is fixed.' },
            { label: 'Proximity', title: '3.4km to Beach', desc: 'Short drive to the Adriatic coast. Postira town and its ferry port are 5 minutes away.' },
            { label: 'Potential', title: '3-Unit Potential', desc: 'Subdivide into three independent rental units, or keep it whole as one large private home. The detached stable adds a fourth option: income unit, guest annexe, or workshop. Plans available on request.' }
          ].map((spec, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ ...fadeIn.transition, delay: i * 0.2 }}
              className="text-center md:text-left group cursor-default"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-4 block group-hover:text-black transition-colors">{spec.label}</span>
              <h3 className="text-3xl font-serif italic mb-4 group-hover:translate-x-2 transition-transform"><RevealText delay={i * 0.1}>{spec.title}</RevealText></h3>
              <p className="text-sm text-neutral-500 leading-relaxed">{spec.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Specs CTA */}
      <section className="py-10 px-6 max-w-7xl mx-auto border-b border-black/5">
        <motion.div {...fadeIn} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-500">Full technical breakdown of the property: area, rooms, utilities, and more.</p>
          <button
            onClick={() => { onNavigate('specifications'); }}
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
            <h2 className="text-4xl font-serif mb-6"><RevealText>Property Details</RevealText></h2>
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
          <p className="text-sm text-neutral-500">See the investment options: short-term lets, resale, co-living, and more.</p>
          <button
            onClick={() => { onNavigate('opportunity'); }}
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
            <h2 className="text-5xl font-serif mb-6"><RevealText>The Property</RevealText></h2>
            <p className="text-neutral-500 leading-relaxed mb-8">
              Site photos of the property as it currently stands, alongside beaches and landscapes of Brač.
            </p>
            <button onClick={() => onNavigateToGallery('site')} className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold border-b border-black pb-1 group">
              View Full Gallery <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>
          <motion.div {...fadeIn} transition={{ ...fadeIn.transition, delay: 0.2 }} className="overflow-hidden">
            <ParallaxImage
              src="/images/opportunityhero.jpg"
              alt="Brač Property"
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
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="masonry-item relative">
            <ParallaxImage
              src="/siteuppergarden.jpg"
              alt="Upper Garden Site Photo"
              aspectRatio="aspect-square"
            />
          </motion.div>
<motion.div {...fadeIn} transition={{ delay: 0.6 }} className="masonry-item">
            <ParallaxImage
              src="/images/lovrecina.jpg"
              alt="Lovrecina Beach"
              aspectRatio="aspect-[4/3]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.8 }} className="masonry-item relative">
            <ParallaxImage
              src="/sitekitchen.jpg"
              alt="Kitchen Site Photo"
              aspectRatio="aspect-[4/3]"
            />
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 1.0 }} className="masonry-item">
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
              onClick={() => { onNavigate('location'); }}
              className="border border-black px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-neutral-50 transition-all"
            >
              View Location
            </button>
            <button
              onClick={() => { onNavigate('contact'); }}
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
          <h2 className="text-2xl font-serif tracking-[0.3em] uppercase mb-6"><RevealText>Brač Estate</RevealText></h2>
          <p className="text-neutral-500 text-sm max-w-xs">
            A stone renovation project in Dol, Brač, for investors and renovators alike.
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
