import { motion } from 'motion/react';
import { InteractiveCard } from './InteractiveCard';
import { EMAIL, LINKEDIN, GITHUB, RESUME } from '../constants';

interface HeroSectionProps {
  emailCopied: boolean;
  onEmailClick: () => void;
}

export function HeroSection({ emailCopied, onEmailClick }: HeroSectionProps) {
  return (
    <>
      {/* Profile image — left column */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
        className="md:col-start-2 md:col-span-6 flex items-center justify-center min-h-[60vh] relative p-4 lg:p-8"
      >
        <div className="relative w-full aspect-[3/4] max-w-sm mx-auto group perspective-[1000px]">
          {/* Decorative offset border */}
          <div className="absolute inset-0 border border-[#4a1c1c]/30 translate-x-4 translate-y-4 rounded-[120px] transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6" />

          {/* Image */}
          <div className="absolute inset-0 bg-[#4a1c1c]/5 overflow-hidden rounded-[120px] z-10 border-2 border-[#FCFAF5] shadow-[0_20px_40px_-15px_rgba(74,28,28,0.2)]">
            <img
              src="/profile.jpg"
              alt="Kushal Kumar"
              className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1543610892-0b1f7e6d8c1c?q=80&w=800&auto=format&fit=crop";
              }}
            />
            <div className="absolute inset-0 bg-[#F4EFE6]/10 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-0" />
          </div>

          {/* Floating badge — ARR */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-4 md:-right-8 top-32 bg-[#FCFAF5] border border-[#4a1c1c]/10 shadow-lg px-4 py-3 z-20 flex items-center gap-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4a1c1c] shadow-[0_0_8px_rgba(74,28,28,0.6)] animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#2a1111] font-bold">Chasing ARR</span>
          </motion.div>

          {/* Floating badge — business */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -left-6 md:-left-12 bottom-24 bg-[#FCFAF5] border border-[#4a1c1c]/10 shadow-lg px-4 py-3 z-20 flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-[#4a1c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#2a1111] font-bold whitespace-nowrap">
              Driving Business Usecases
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Bio card — right column */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-start-9 md:col-span-7 flex flex-col justify-center min-h-[60vh] relative p-2"
      >
        <InteractiveCard className="p-10 relative">
          <div className="relative z-10">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block">
              01 / Introduction
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-shadow-sm text-[#2a1111]">
              Seemakurthi<br />
              <span className="italic opacity-80">Kushal Kumar</span>
            </h1>
            <div className="text-xl font-medium tracking-wide mt-6 opacity-80 text-[#4a1c1c]">
              Senior Data Scientist & POD Lead
            </div>
            <div className="w-[1px] h-12 bg-[#4a1c1c]/40 my-8 ml-2" />
            <p className="text-sm md:text-base leading-relaxed text-[#5c2323] max-w-[500px] mb-8 font-medium">
              Expert in LLMs, RAG architectures, parameter-efficient fine-tuning, and MLOps.
              4.5+ years building production-scale GenAI, NLP, and Document AI systems that
              deliver high accuracy and massive latency gains.
            </p>

            <div className="flex flex-wrap gap-4 items-center border-t border-[#4a1c1c]/20 pt-8 mt-4">
              <button
                onClick={onEmailClick}
                className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex min-w-[90px]"
              >
                {emailCopied ? 'Copied ✓' : 'Email'}
              </button>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex"
              >
                LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex"
              >
                GitHub
              </a>
              <a
                href={RESUME}
                download="KushalSeemakurthi.pdf"
                className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex gap-2"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Resume
              </a>
            </div>
          </div>
        </InteractiveCard>
      </motion.div>
    </>
  );
}
