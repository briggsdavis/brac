import { useState, useEffect } from 'react';
import { X, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const MENU_IMAGES: Record<string, string> = {
  home: "https://images.unsplash.com/photo-1544551763-47a0159c963f?auto=format&fit=crop&q=80&w=1000",
  gallery: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=1000",
  location: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=1000",
  opportunity: "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?auto=format&fit=crop&q=80&w=1000",
  specifications: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
};

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const audio = document.getElementById('bg-audio') as HTMLAudioElement | null;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Location', id: 'location' },
    { name: 'Opportunity', id: 'opportunity' },
    { name: 'Specifications', id: 'specifications' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[70] transition-transform duration-500 ease-in-out bg-white/80 backdrop-blur-md border-b border-black/5",
          isVisible || isMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-3 group z-[80]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
              <span className="w-full h-0.5 bg-black group-hover:w-3/4 transition-all"></span>
              <span className="w-full h-0.5 bg-black"></span>
            </div>}
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 z-[80]">
            <h1 
              className="text-xl tracking-[0.3em] uppercase font-serif cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleNav('home')}
            >
              Brač Estate
            </h1>
          </div>

          <div className="flex items-center gap-3 z-[80]">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="hover:scale-110 transition-transform"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="bg-black text-white px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-neutral-800 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span className="hidden sm:inline">Contact</span>
              <MessageCircle className="w-4 h-4 sm:hidden" />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white pt-20 flex"
          >
            <div className="flex-1 flex flex-col justify-center px-12 sm:px-24">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => handleNav(item.id)}
                    className={cn(
                      "text-lg sm:text-xl font-serif text-left hover:italic transition-all w-fit group flex items-center gap-4 py-2",
                      currentPage === item.id ? "italic underline underline-offset-8" : ""
                    )}
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-sans">0{navItems.indexOf(item) + 1}</span>
                    <span className="group-hover:translate-x-2 transition-transform">{item.name}</span>
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => handleNav('contact')}
                  className="mt-8 text-xs uppercase tracking-[0.3em] border-b border-black pb-1 w-fit"
                >
                  Direct Inquiry
                </motion.button>
              </nav>
            </div>

            <div className="hidden lg:flex flex-1 bg-neutral-50 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {hoveredItem && (
                  <motion.img
                    key={hoveredItem}
                    src={MENU_IMAGES[hoveredItem]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </AnimatePresence>
              {!hoveredItem && (
                <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                  <p className="font-serif italic text-neutral-300 text-2xl">Select a destination</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
