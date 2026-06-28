import Lenis from 'lenis';

let lenis: Lenis | null = null;

/**
 * Starts Lenis smooth scrolling, giving the page a subtle inertia/weight.
 * Returns a teardown function. Lenis drives the real window scroll position,
 * so Framer Motion's useScroll / useInView and the scroll listeners keep working.
 */
export function initSmoothScroll(): () => void {
  if (lenis) return () => {};
  lenis = new Lenis({
    lerp: 0.085, // lower = heavier / more gliding
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
    smoothWheel: true,
  });

  let frame = 0;
  const loop = (time: number) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(loop);
  };
  frame = requestAnimationFrame(loop);

  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

/** Jump (or glide) to the top of the page. Use immediate while a transition covers the screen. */
export function scrollToTop(immediate = false): void {
  if (lenis) lenis.scrollTo(0, { immediate });
  else window.scrollTo(0, 0);
}

/** Smoothly scroll to an element, leaving `topGap` px of room above it (e.g. for the fixed header). */
export function scrollToElement(target: string | HTMLElement, topGap = 0): void {
  if (lenis) {
    lenis.scrollTo(target, { offset: -topGap });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - topGap;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
