import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export default function ParallaxImage({ src, alt, className, aspectRatio = "aspect-video" }: ParallaxImageProps) {
  const ref = useRef(null);
  // Hold the wipe until the image is ~30% up from the bottom edge so it plays
  // in view rather than finishing before it scrolls into sight.
  const inView = useInView(ref, { once: true, margin: '0px 0px -30% 0px' });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={{ clipPath: inView ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden group ${aspectRatio} ${className}`}
    >
      <motion.img
        style={{ y, scale: 1.05 }}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}
