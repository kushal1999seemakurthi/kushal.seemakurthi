import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  isHero?: boolean;
}

export function Section({ id, children, className = '', isHero = false }: SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Opacity
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Vertical Shift (Subtle Parallax)
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);
  
  return (
    <section 
      id={id} 
      ref={containerRef}
      className={`min-h-[100svh] w-full flex items-center relative z-10 pointer-events-none ${className}`}
    >
      <motion.div 
        style={isHero ? {} : { opacity, y }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-16 gap-4 pointer-events-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}
