import { motion } from 'motion/react';
import { InteractiveCard } from './InteractiveCard';
import { skillCategories } from '../data/skills';

export function SkillsGrid() {
  // Split 6 categories into 3 columns of 2
  const columns = [
    skillCategories.slice(0, 2),
    skillCategories.slice(2, 4),
    skillCategories.slice(4, 6),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="md:col-start-1 md:col-span-16 grid grid-cols-1 md:grid-cols-14 gap-6 items-stretch mt-32 px-4"
    >
      <div className="col-span-full mb-12 text-center md:text-left md:col-start-2">
        <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b inline-block pb-2 border-[#4a1c1c]/20">
          03 / Capabilities
        </div>
        <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
          Technical Stack{' '}
          <span className="block mt-3 italic opacity-60 text-4xl md:text-5xl">Hall of Fame</span>
        </h2>
      </div>

      <div className="col-span-full md:col-start-2 md:col-span-13 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            {col.map((category) => (
              <div key={category.label}>
                <InteractiveCard className="p-8">
                  <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </InteractiveCard>
              </div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
