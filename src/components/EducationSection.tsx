import { motion } from 'motion/react';
import { InteractiveCard } from './InteractiveCard';
import { LINKEDIN, GITHUB, RESUME, IIT_DHARWAD_URL } from '../constants';

interface EducationSectionProps {
  emailCopied: boolean;
  onEmailClick: () => void;
}

export function EducationSection({ emailCopied, onEmailClick }: EducationSectionProps) {
  return (
    <>
      {/* Education card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="md:col-start-2 md:col-span-8 flex flex-col items-start justify-center w-full relative flex-1 p-2"
      >
        <InteractiveCard className="p-10 relative w-full">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block">
            05 / Education
          </div>

          <a
            href={IIT_DHARWAD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mb-10 flex items-center gap-5 w-fit"
            title="Indian Institute of Technology Dharwad"
          >
            <div className="w-20 h-20 rounded-full border border-[#4a1c1c]/20 overflow-hidden bg-[#FCFAF5] flex items-center justify-center transition-all duration-500 group-hover:border-[#4a1c1c]/60 group-hover:shadow-[0_0_24px_rgba(74,28,28,0.12)]">
              <img
                src="/LOGO.png"
                alt="IIT Dharwad"
                className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] uppercase tracking-[0.25em] opacity-50 font-mono">Origin</span>
              <span className="text-sm font-serif italic text-[#4a1c1c] group-hover:opacity-70 transition-opacity">
                iitdh.ac.in ↗
              </span>
            </div>
          </a>

          <div className="max-w-xl space-y-6">
            <p className="font-serif italic text-3xl leading-relaxed text-[#5c2323]">
              IIT Dharwad B.Tech<br />Mechanical 2017–2021
            </p>
            <div className="h-[1px] w-12 bg-[#4a1c1c] my-8" />
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">
              JEE Advanced — Top 1% All India Rank
            </p>
            <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">
              District Olympiad Winner &nbsp;/&nbsp; CGPA 7.56 / 10
            </p>
          </div>
        </InteractiveCard>
      </motion.div>

      {/* Footer */}
      <footer className="col-span-full w-full pt-16 border-t border-[#4a1c1c]/20 mt-auto flex flex-col md:flex-row justify-between items-center gap-8 px-6 py-6 mt-12 relative z-20">
        <div className="text-[10px] tracking-widest uppercase opacity-60 flex flex-wrap gap-6 text-[#5c2323]">
          <span>Resolution: Adaptive</span>
          <span>Format: Grid</span>
          <span>Status: Online</span>
        </div>

        <div className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          <button
            onClick={onEmailClick}
            className="border-b border-[#4a1c1c] pb-1 hover:opacity-60 transition-opacity min-w-[60px] text-left"
          >
            {emailCopied ? 'Copied ✓' : 'Email'}
          </button>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href={GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
          <a
            href={RESUME}
            download="KushalSeemakurthi.pdf"
            className="border-b border-[#4a1c1c] pb-1 hover:opacity-60 transition-opacity flex items-center gap-2"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Resume
          </a>
        </div>
      </footer>
    </>
  );
}
