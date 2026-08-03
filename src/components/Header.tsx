import { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, MessageCircle, Volume2, VolumeX } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'motion/react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isReady: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

const MENU_IMAGES: Record<string, string> = {
  home: "/images/bol.jpg",
  gallery: "/images/lovrecina.jpg",
  location: "/images/brac.jpg",
  opportunity: "/images/postira.jpg",
  specifications: "/images/vidovagora.jpg",
};

const MENU_DROP_DURATION = 0.9;
const MENU_EXPAND_DURATION = 0.475;
const MENU_PANEL_DURATION = MENU_DROP_DURATION + MENU_EXPAND_DURATION;
const MENU_ENTER_DROP_DURATION = 0.7;
const MENU_ENTER_EXPAND_DURATION = 1.05;
const MENU_ENTER_DURATION = MENU_ENTER_DROP_DURATION + MENU_ENTER_EXPAND_DURATION;
const MENU_ENTER_DROP_PROGRESS = MENU_ENTER_DROP_DURATION / MENU_ENTER_DURATION;

const menuListVariants = {
  hidden: {},
  visible: { transition: { delayChildren: MENU_ENTER_DURATION, staggerChildren: 0.12 } },
};

const menuItemVariants = {
  hidden: { opacity: 0, y: '-115%', filter: 'blur(8px)', clipPath: 'inset(0% 100% 0% 0%)' },
  visible: {
    opacity: 1,
    y: '0%',
    filter: 'blur(0px)',
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: 0.74, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Header({ onNavigate, currentPage, isReady, isMuted, onToggleMute }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);
  const downwardTravel = useRef(0);
  const upwardTravel = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;
      setIsAtTop(currentScrollY <= 10);

      if (delta > 0) {
        downwardTravel.current += delta;
        upwardTravel.current = 0;
      } else if (delta < 0) {
        upwardTravel.current += Math.abs(delta);
        downwardTravel.current = 0;
      }

      if (currentScrollY > 100 && downwardTravel.current >= 12) {
        setIsVisible(false);
      } else if (upwardTravel.current >= 12 || currentScrollY <= 10) {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Location', id: 'location' },
    { name: 'Opportunity', id: 'opportunity' },
    { name: 'Specifications', id: 'specifications' },
  ];

  const handleNav = (id: string) => {
    onNavigate(id);
    // The destination mounts beneath the menu, then the panel retraces its
    // opening movement to reveal the deblurring page.
    setIsMenuOpen(false);
  };

  // Keep one stable preview throughout each menu session. Page-title hovers
  // affect only the title treatment, never the image on the right.
  const previewItem = MENU_IMAGES[currentPage] ? currentPage : 'home';
  const isTransparentHeroNav = currentPage === 'home' && isAtTop && !isMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[70] border-none transition-[translate,opacity,background-color,color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMenuOpen
            ? "bg-transparent text-black shadow-none"
            : isTransparentHeroNav
              ? "bg-transparent text-white shadow-none"
              : "bg-white text-black shadow-[0_8px_28px_rgba(26,26,26,0.08)]",
          isReady && isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-3 group z-[80]"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <div className="w-[31px] h-6 flex flex-col justify-center gap-1.5">
              <span className={cn("w-full h-0.5 group-hover:w-3/4 transition-all", isTransparentHeroNav ? "bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "bg-black")}></span>
              <span className={cn("w-full h-0.5", isTransparentHeroNav ? "bg-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : "bg-black")}></span>
            </div>}
            <span className={cn(
              "text-[10px] uppercase tracking-[0.25em] font-semibold transition-colors duration-700",
              isTransparentHeroNav ? "[text-shadow:0_1px_3px_rgba(0,0,0,0.8)]" : ""
            )}>Menu</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 z-[80]">
            <h1 
              className={cn(
                "header-brand text-xl tracking-[0.3em] uppercase font-serif cursor-pointer",
                isTransparentHeroNav ? "text-white [text-shadow:0_1px_4px_rgba(0,0,0,0.75)]" : "text-black"
              )}
              onClick={() => handleNav('home')}
            >
              Brač Estate
            </h1>
          </div>

          <div className="flex items-center gap-3 z-[80]">
            <button
              onClick={onToggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className={cn(
                "flex h-8 w-8 items-center justify-center hover:opacity-60 transition-[opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                isTransparentHeroNav ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" : ""
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMuted ? 'muted' : 'playing'}
                  initial={{ opacity: 0, scale: 0.75, rotate: -18, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.75, rotate: 18, filter: 'blur(6px)' }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center justify-center"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => handleNav('contact')}
              className={cn(
                "px-6 py-2.5 text-[10px] uppercase tracking-[0.2em] font-semibold transition-all flex items-center gap-2",
                isTransparentHeroNav
                  ? "border border-white bg-white text-black drop-shadow-[0_1px_3px_rgba(0,0,0,0.75)]"
                  : "bg-black text-white"
              )}
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            className="fixed inset-0 z-[60]"
          >
            <motion.div
              data-menu-panel
              initial={{ y: '-100%', left: '12.5vw', width: '75vw', height: '10vh' }}
              animate={{
                y: ['-100%', '0vh', '0vh'],
                left: ['12.5vw', '12.5vw', '0vw'],
                width: ['75vw', '75vw', '100vw'],
                height: ['10vh', '10vh', '100vh'],
              }}
              transition={{
                duration: MENU_ENTER_DURATION,
                times: [0, MENU_ENTER_DROP_PROGRESS, 1],
                ease: [[0.55, 0, 0.8, 0.35], [0.2, 0.45, 0.4, 1]],
              }}
              exit={{
                y: ['0vh', '1.2vh', '-100%'],
                left: ['0vw', '12.5vw', '12.5vw'],
                width: ['100vw', '75vw', '75vw'],
                height: ['100vh', '92vh', '92vh'],
                transition: {
                  duration: MENU_PANEL_DURATION,
                  times: [0, MENU_EXPAND_DURATION / MENU_PANEL_DURATION, 1],
                  ease: [[0.1, 0.5, 0.3, 1], [0.7, 0, 0.84, 0]],
                },
              }}
              className="absolute top-0 flex overflow-hidden bg-white pt-20"
            >
            <div className="flex flex-1 flex-col justify-center px-12 sm:px-24">
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={menuListVariants}
                className="flex flex-col gap-4"
              >
                {navItems.map((item) => (
                  <div key={item.id} className="overflow-hidden pr-8">
                    <motion.button
                      variants={menuItemVariants}
                      onClick={() => handleNav(item.id)}
                      className={cn(
                        "menu-page-link text-lg sm:text-xl font-serif text-left w-fit group flex items-center gap-4 py-2",
                        ""
                      )}
                    >
                      <span className="menu-page-number text-[10px] font-sans">0{navItems.indexOf(item) + 1}</span>
                      <span className="menu-page-label">
                        <span className={cn("menu-page-label-normal", currentPage === item.id ? "italic" : "")}>{item.name}</span>
                        <span aria-hidden="true" className="menu-page-label-italic">{item.name}</span>
                      </span>
                    </motion.button>
                  </div>
                ))}
                <div className="overflow-hidden">
                  <motion.button
                    variants={menuItemVariants}
                    onClick={() => handleNav('contact')}
                    className="mt-8 text-xs uppercase tracking-[0.3em] border-b border-black pb-1 w-fit flex items-center gap-3"
                  >
                    Direct Inquiry <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.nav>
            </div>

            <motion.div
              data-menu-image
              initial={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ delay: MENU_ENTER_DURATION, duration: 1.288, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-1 bg-white relative overflow-hidden items-center justify-center"
            >
              <img
                src={MENU_IMAGES[previewItem]}
                alt="Brač Estate"
                className="relative w-[60%] h-[60%] object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
