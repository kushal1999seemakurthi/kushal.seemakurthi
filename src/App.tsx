import { useScroll, useMotionValueEvent, motion } from 'motion/react';
import { useState } from 'react';
import { Section } from './components/Section';
import { SidebarNav } from './components/SidebarNav';
import { HeroSection } from './components/HeroSection';
import { MobiusExperience } from './components/MobiusExperience';
import { SkillsGrid } from './components/SkillsGrid';
import { ProjectsTrain } from './components/ProjectsTrain';
import { EducationSection } from './components/EducationSection';
import { EMAIL } from './constants';

// Section order must stay in sync with SidebarNav's sections array and elemental IDs.
const SECTION_THRESHOLDS = [0.125, 0.375, 0.625, 0.875];

export default function App() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmail = () => {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    window.location.href = `mailto:${EMAIL}`;
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = SECTION_THRESHOLDS.findIndex((t) => latest < t);
    setActiveSection(idx === -1 ? SECTION_THRESHOLDS.length : idx);
  });

  return (
    <main className="relative w-full text-[#4a1c1c] font-sans bg-[#F4EFE6]">
      <SidebarNav activeSection={activeSection} />

      <div className="relative w-full overflow-hidden">

        {/* 01 — Introduction */}
        <Section id="air" className="py-24" isHero={true}>
          <HeroSection emailCopied={emailCopied} onEmailClick={handleEmail} />
        </Section>

        {/* 02 — Experience */}
        <section id="water" className="relative w-full">
          <MobiusExperience />
        </section>

        {/* 03 — Skills */}
        <Section id="earth" className="py-24">
          <SkillsGrid />
        </Section>

        {/* 04 — Projects */}
        <Section id="fire" className="py-24 max-w-[100vw]">
          <div className="col-span-full w-full pt-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="p-10 text-center mx-auto"
            >
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 inline-block border-b border-[#4a1c1c]/20 pb-2">
                04 / Projects
              </div>
              <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-2">
                Featured Works
              </h2>
              <p className="text-sm text-[#5c2323] opacity-80 max-w-md mx-auto mb-4 font-medium">
                Hover over any project in the ribbon to pause and view its details.
              </p>
            </motion.div>
            <ProjectsTrain />
          </div>
        </Section>

        {/* 05 — Education + Footer */}
        <Section id="spirit" className="py-24 min-h-[100vh] flex flex-col justify-between">
          <EducationSection emailCopied={emailCopied} onEmailClick={handleEmail} />
        </Section>

      </div>
    </main>
  );
}
