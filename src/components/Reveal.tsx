import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import type { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Masks its content behind a baseline and lets it rise up into place once it
 * scrolls into view. Wrap heading text with this for an editorial line-reveal.
 * Keep sizing / margins / colour on the parent heading element; this only
 * handles the clip + rise.
 */
export function RevealText({ children, delay = 0, className }: RevealTextProps) {
  const ref = useRef(null);
  // Hold the trigger until the element has risen ~30% up from the bottom edge,
  // so the animation plays where it can actually be seen rather than off-screen.
  const inView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  return (
    <span ref={ref} className={`block overflow-hidden ${className ?? ''}`}>
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={{ y: inView ? '0%' : '115%' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default RevealText;
