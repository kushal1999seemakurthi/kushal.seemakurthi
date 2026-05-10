import { motion, useSpring, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import { InteractiveCard } from './InteractiveCard';
import { experiences } from '../data/experience';

export function ExperienceStack() {
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  const progressSpring = useSpring(0, { stiffness: 150, damping: 25 });
  const targetRef = useRef(0);

  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current += e.deltaY * 0.0015;
      progressSpring.set(targetRef.current);
    };

    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
       startY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
       const y = e.touches[0].clientY;
       const delta = startY - y;
       targetRef.current += delta * 0.003; 
       progressSpring.set(targetRef.current);
       startY = y;
       e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('touchstart', onTouchStart, { passive: false });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    
    return () => {
       el.removeEventListener('wheel', onWheel);
       el.removeEventListener('touchstart', onTouchStart);
       el.removeEventListener('touchmove', onTouchMove);
    };
  }, [progressSpring]);

  return (
    <div className="w-full md:pl-[80px] min-h-[100svh] flex flex-col justify-center py-24 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
        
        {/* Text column */}
        <div className="lg:col-span-5 flex flex-col pt-12 z-20">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block self-start">
            02 / Experience
          </div>
          <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-8 text-shadow-sm">
            The Blueprint
          </h2>
          <p className="text-sm text-[#5c2323] leading-relaxed opacity-80 max-w-sm font-medium">
             Hover over the timeline and use your mouse wheel (or swipe) to explore my journey in an infinite loop. <br/><br/>
             Move your cursor completely aside into this text area to scroll normally to the next section.
          </p>
        </div>

        {/* Wheel column */}
        <div 
          className="lg:col-span-7 relative h-[600px] w-full perspective-[1200px] cursor-ns-resize mt-12 lg:mt-0" 
          ref={wheelContainerRef}
        >
          {experiences.map((exp, index) => {
            const N = experiences.length;
            
            const y = useTransform(progressSpring, v => -Math.sin((v - index / N) * Math.PI * 2) * 220); 
            const z = useTransform(progressSpring, v => Math.cos((v - index / N) * Math.PI * 2) * 200); 
            
            const scale = useTransform(progressSpring, v => {
              const zVal = Math.cos((v - index / N) * Math.PI * 2);
              return 0.7 + ((zVal + 1) / 2) * 0.3; 
            });
            
            const opacity = useTransform(progressSpring, v => {
              const zVal = Math.cos((v - index / N) * Math.PI * 2);
              return Math.max(0, 0.1 + zVal * 0.9);
            });
            
            const rotateX = useTransform(progressSpring, v => {
              const yVal = Math.sin((v - index / N) * Math.PI * 2);
              return yVal * 35; 
            });
            
            const zIndex = useTransform(progressSpring, v => {
               const zVal = Math.cos((v - index / N) * Math.PI * 2);
               return Math.round((zVal + 1) * 50);
            });

            return (
              <motion.div
                key={index}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
                style={{
                  scale,
                  y,
                  opacity,
                  rotateX,
                  zIndex,
                  transformPerspective: 1200,
                  transformOrigin: "center center",
                }}
              >
                <InteractiveCard className="p-8 h-auto w-full max-w-xl flex flex-col justify-between shadow-2xl mx-auto border-[#4a1c1c]/10 bg-[#FCFAF5]">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-[10px] uppercase tracking-[0.15em] opacity-80 font-mono">{exp.date}</div>
                      {exp.tag && (
                        <div className="text-[10px] uppercase tracking-[0.15em] bg-[#4a1c1c] text-[#F4EFE6] px-2 py-0.5">
                          {exp.tag}
                        </div>
                      )}
                    </div>
                    <h3 className="font-serif text-3xl mb-1 mt-2 text-[#2a1111]">{exp.company}</h3>
                    <div className="text-xs font-bold uppercase tracking-wider mb-4 opacity-70 text-[#4a1c1c]">{exp.title}</div>
                    <ul className="text-sm text-[#5c2323] leading-relaxed list-outside list-disc ml-4 space-y-2 mb-2 marker:text-[#4a1c1c]/40">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </InteractiveCard>
              </motion.div>
            );
          })}

          {/* Controls UI Hints */}
          <div className="absolute inset-x-0 bottom-[-20px] flex justify-between px-8 pointer-events-none opacity-30 text-[10px] uppercase tracking-widest font-mono">
             <span>↑ Scroll</span>
             <span>Wheel / Swipe ↓</span>
          </div>
        </div>
      </div>
    </div>
  );
}
