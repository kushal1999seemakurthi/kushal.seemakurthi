import { motion } from 'motion/react';

interface SidebarNavProps {
  activeSection: number;
}

export function SidebarNav({ activeSection }: SidebarNavProps) {
  const sections = [
    { label: 'Introduction', id: 'air' },
    { label: 'Experience', id: 'water' },
    { label: 'Skills', id: 'earth' },
    { label: 'Projects', id: 'fire' },
    { label: 'Education', id: 'spirit' }
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed left-0 top-0 h-full w-[80px] border-r border-[#4a1c1c]/10 hidden md:flex flex-col items-center justify-center py-12 z-50">
      <div className="flex flex-col gap-16">
        {sections.map((section, idx) => (
          <div 
            key={section.label}
            onClick={() => scrollToSection(section.id)}
            className={`writing-vertical rotate-180 text-[10px] tracking-[0.2em] uppercase transition-all duration-500 font-medium cursor-pointer hover:opacity-100 ${activeSection === idx ? 'opacity-100 text-[#4a1c1c]' : 'opacity-40 text-[#5c2323]'}`}
          >
            {section.label}
          </div>
        ))}
      </div>
    </div>
  );
}
