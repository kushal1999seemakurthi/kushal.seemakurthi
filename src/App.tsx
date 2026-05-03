import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SceneRoot from './scene/SceneRoot';
import { broadcastScrollProgress } from './hooks/useScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', () => {
      ScrollTrigger.update();
      broadcastScrollProgress();
    });

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000));
    };
  }, []);

  return (
    <div className="bg-[#F9F7F2] text-[#1C1C1C] font-serif relative w-full min-h-screen">
      {/* 3D Canvas Layer */}
      <div className="fixed inset-0 z-0">
        <SceneRoot />
      </div>

      {/* HTML Overlay */}
      <div className="relative z-10">
        {/* Section 0: Introduction (Air) */}
        <section id="section-0" className="min-h-[100vh] relative flex flex-col justify-center px-8 md:px-16 py-32">
          <h1 className="text-5xl md:text-7xl font-black mb-8">Introduction</h1>
          <p className="text-lg md:text-xl max-w-2xl">Section 0 placeholder — Air element</p>
        </section>

        {/* Section 1: Experience (Water) */}
        <section id="section-1" className="min-h-[100vh] relative flex flex-col justify-center px-8 md:px-16 py-32">
          <h1 className="text-5xl md:text-7xl font-black mb-8">Experience</h1>
          <p className="text-lg md:text-xl max-w-2xl">Section 1 placeholder — Water element</p>
        </section>

        {/* Section 2: Skills (Earth) */}
        <section id="section-2" className="min-h-[100vh] relative flex flex-col justify-center px-8 md:px-16 py-32">
          <h1 className="text-5xl md:text-7xl font-black mb-8">Skills</h1>
          <p className="text-lg md:text-xl max-w-2xl">Section 2 placeholder — Earth element</p>
        </section>

        {/* Section 3: Projects (Fire) */}
        <section id="section-3" className="min-h-[100vh] relative flex flex-col justify-center px-8 md:px-16 py-32">
          <h1 className="text-5xl md:text-7xl font-black mb-8">Projects</h1>
          <p className="text-lg md:text-xl max-w-2xl">Section 3 placeholder — Fire element</p>
        </section>

        {/* Section 4: Education (Spirit) */}
        <section id="section-4" className="min-h-[100vh] relative flex flex-col justify-center px-8 md:px-16 py-32">
          <h1 className="text-5xl md:text-7xl font-black mb-8">Education</h1>
          <p className="text-lg md:text-xl max-w-2xl">Section 4 placeholder — Spirit element</p>
        </section>
      </div>
    </div>
  );
}
