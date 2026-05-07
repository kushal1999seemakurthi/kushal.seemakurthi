/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Section } from './components/Section';
import { SidebarNav } from './components/SidebarNav';
import { BackgroundScenes } from './components/BackgroundScenes';
import { InteractiveCard } from './components/InteractiveCard';
import { ExperienceStack } from './components/ExperienceStack';
import { ProjectsTrain } from './components/ProjectsTrain';
import { EMAIL, LINKEDIN, GITHUB, IIT_DHARWAD_URL, RESUME } from './constants';

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
    if (latest < 0.125) setActiveSection(0);
    else if (latest < 0.375) setActiveSection(1);
    else if (latest < 0.625) setActiveSection(2);
    else if (latest < 0.875) setActiveSection(3);
    else setActiveSection(4);
  });
  
  return (
    <main className="relative w-full text-[#4a1c1c] font-sans bg-[#F4EFE6]">
      <SidebarNav activeSection={activeSection} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundScenes />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Air Section */}
        <Section id="air" className="py-24" isHero={true}>
           {/* Image on the left */}
           <motion.div
             initial={{ opacity: 0, filter: 'blur(10px)' }}
             animate={{ opacity: 1, filter: 'blur(0px)' }}
             transition={{ duration: 1 }}
             className="md:col-start-2 md:col-span-6 flex items-center justify-center min-h-[60vh] relative p-4 lg:p-8"
           >
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto group perspective-[1000px]">
                 {/* Decorative offset border */}
                 <div className="absolute inset-0 border border-[#4a1c1c]/30 translate-x-4 translate-y-4 rounded-[120px] transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6"></div>
                 
                 {/* Image container */}
                 <div className="absolute inset-0 bg-[#4a1c1c]/5 overflow-hidden rounded-[120px] z-10 border-2 border-[#FCFAF5] shadow-[0_20px_40px_-15px_rgba(74,28,28,0.2)]">
                   <img 
                     src="/profile.jpg" 
                     alt="Kushal Kumar" 
                     className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105 saturate-[0.8] group-hover:saturate-100"
                     referrerPolicy="no-referrer"
                     onError={(e) => {
                       e.currentTarget.src = "https://images.unsplash.com/photo-1543610892-0b1f7e6d8c1c?q=80&w=800&auto=format&fit=crop";
                     }}
                   />
                   {/* Subtle overlay to tie the image to the color palette */}
                   <div className="absolute inset-0 bg-[#F4EFE6]/10 mix-blend-overlay pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
                 </div>

                 {/* Floating Badge 1 */}
                 <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute -right-4 md:-right-8 top-32 bg-[#FCFAF5] border border-[#4a1c1c]/10 shadow-lg px-4 py-3 z-20 flex items-center gap-2"
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4a1c1c] shadow-[0_0_8px_rgba(74,28,28,0.6)] animate-pulse"></div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#2a1111] font-bold">Chasing ARR</span>
                 </motion.div>

                 {/* Floating Badge 2 */}
                 <motion.div 
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    className="absolute -left-6 md:-left-12 bottom-24 bg-[#FCFAF5] border border-[#4a1c1c]/10 shadow-lg px-4 py-3 z-20 flex items-center gap-2"
                 >
                    <svg className="w-3.5 h-3.5 text-[#4a1c1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#2a1111] font-bold whitespace-nowrap">Driving Business Usecases</span>
                 </motion.div>
              </div>
           </motion.div>

           {/* Content on the right */}
           <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-start-9 md:col-span-7 flex flex-col justify-center min-h-[60vh] relative p-2"
           >
              <InteractiveCard className="p-10 relative">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block">01 / Introduction</div>
                  <h1 className="text-5xl lg:text-7xl font-serif leading-[1.1] tracking-tight text-shadow-sm text-[#2a1111]">
                    Seemakurthi<br/><span className="italic opacity-80">Kushal Kumar</span>
                  </h1>
                  <div className="text-xl font-medium tracking-wide mt-6 opacity-80 text-[#4a1c1c]">
                    Senior Data Scientist & POD Lead
                  </div>
                  <div className="w-[1px] h-12 bg-[#4a1c1c]/40 my-8 ml-2"></div>
                  <p className="text-sm md:text-base leading-relaxed text-[#5c2323] max-w-[500px] mb-8 font-medium">
                    Expert in LLMs, RAG architectures, parameter-efficient fine-tuning, and MLOps. 4.5+ years building production-scale GenAI, NLP, and Document AI systems that deliver high accuracy and massive latency gains.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center border-t border-[#4a1c1c]/20 pt-8 mt-4">
                    <button onClick={handleEmail} className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex min-w-[90px]">
                      {emailCopied ? 'Copied ✓' : 'Email'}
                    </button>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex">LinkedIn</a>
                    <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex">GitHub</a>
                    <a href={RESUME} download="KushalSeemakurthi.pdf" className="text-[10px] items-center justify-center uppercase tracking-widest border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] transition-colors px-6 py-3 bg-transparent inline-flex gap-2">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Resume
                    </a>
                  </div>
                </div>
              </InteractiveCard>
           </motion.div>
        </Section>

        {/* Water Section -> Experience */}
        <section id="water" className="relative z-10 w-full pointer-events-none">
          <div className="w-full pointer-events-auto">
            <ExperienceStack />
          </div>
        </section>

        {/* Earth Section */}
        <Section id="earth" className="py-24">
           {/* Earth has a tree in the center. Let's place the content split into columns avoiding the center. */}
           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.8 }}
             className="md:col-start-1 md:col-span-16 grid grid-cols-1 md:grid-cols-14 gap-6 items-stretch mt-32 px-4"
           >
             <div className="col-span-full mb-12 text-center md:text-left md:col-start-2">
                 <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b inline-block pb-2 border-[#4a1c1c]/20">03 / Capabilities</div>
                 <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">Technical Stack <span className="block mt-3 italic opacity-60 text-4xl md:text-5xl">Hall of Fame</span></h2>
             </div>
             
             {/* Bento Grid */}
             <div className="col-span-full md:col-start-2 md:col-span-13 grid grid-cols-1 lg:grid-cols-3 gap-6">
                 
                 <div className="flex flex-col gap-6">
                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">Programming & Data</h3>
                     <div className="flex flex-wrap gap-2">
                       {['Python', 'NumPy', 'Pandas', 'scikit-learn', 'SQL', 'R', 'Apache Spark', 'ETL'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>

                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">Vector & Databases</h3>
                     <div className="flex flex-wrap gap-2">
                       {['Pinecone', 'Weaviate', 'ChromaDB', 'FAISS', 'Elasticsearch', 'PostgreSQL', 'MongoDB'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>
                 </div>
                 
                 <div className="flex flex-col gap-6">
                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">ML/AI & LLMs</h3>
                     <div className="flex flex-wrap gap-2">
                       {['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'LlamaIndex', 'DSPy', 'LiteLLM', 'OpenAI', 'Anthropic', 'MS AI Foundry'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>

                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">Advanced Techniques</h3>
                     <div className="flex flex-wrap gap-2">
                       {['LoRA / QLoRA', 'RAG', 'Prompt Engineering', 'Few-shot Learning', 'Transfer Learning', 'Ontology Extraction', 'PEFT'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>
                 </div>

                 <div className="flex flex-col gap-6">
                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">Models & Architectures</h3>
                     <div className="flex flex-wrap gap-2">
                       {['GPT-3/4', 'Llama 2/3', 'BERT', 'RoBERTa', 'mBERT', 'SpanBERT', 'BART', 'YOLOv3', 'FastText', 'ULMFiT'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>

                   <InteractiveCard className="p-8">
                     <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase border-b border-[#4a1c1c]/20 pb-4 mb-5">MLOps & Infra</h3>
                     <div className="flex flex-wrap gap-2">
                       {['Docker', 'Kubernetes', 'AWS', 'Azure', 'MLflow', 'W&B', 'GitHub Actions', 'Grafana'].map(tag => (
                         <span key={tag} className="text-[9px] font-mono uppercase tracking-widest px-3 py-1.5 border border-[#4a1c1c]/20 hover:bg-[#4a1c1c] hover:text-[#F4EFE6] cursor-pointer transition-colors bg-transparent">{tag}</span>
                       ))}
                     </div>
                   </InteractiveCard>
                 </div>
                 
             </div>
           </motion.div>
        </Section>

        {/* Fire Section */}
        <Section id="fire" className="py-24 max-w-[100vw]">
            <div className="col-span-full w-full pt-12">
               <motion.div 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.8 }}
                 className="p-10 text-center mx-auto"
               >
                 <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 inline-block border-b border-[#4a1c1c]/20 pb-2">04 / Projects</div>
                 <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-2">Featured Works</h2>
                 <p className="text-sm text-[#5c2323] opacity-80 max-w-md mx-auto mb-4 font-medium">Hover over any project in the ribbon to pause and view its details.</p>
               </motion.div>
               
               <ProjectsTrain />
            </div>
        </Section>

        {/* Spirit Section */}
        <Section id="spirit" className="py-24 min-h-[100vh] flex flex-col justify-between">
            {/* Spirit has bird on the right, position content heavily to the left */}
            <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="md:col-start-2 md:col-span-8 flex flex-col items-start justify-center w-full relative flex-1 p-2"
            >
               <InteractiveCard className="p-10 relative w-full">
                 <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block">05 / Education</div>
                 
                 {/* Institution Logo */}
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
                     <span className="text-sm font-serif italic text-[#4a1c1c] group-hover:opacity-70 transition-opacity">iitdh.ac.in ↗</span>
                   </div>
                 </a>

                 <div className="max-w-xl space-y-6">
                   <p className="font-serif italic text-3xl leading-relaxed text-[#5c2323]">IIT Dharwad B.Tech<br/>CSE 2017–2021</p>
                   <div className="h-[1px] w-12 bg-[#4a1c1c] my-8"></div>
                   <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">JEE Advanced — Top 1% All India Rank</p>
                   <p className="text-[11px] uppercase tracking-[0.2em] opacity-80">District Olympiad Winner &nbsp;/&nbsp; CGPA 7.56 / 10</p>
                 </div>
               </InteractiveCard>
            </motion.div>
            
            <footer className="col-span-full w-full pt-16 border-t border-[#4a1c1c]/20 mt-auto flex flex-col md:flex-row justify-between items-center gap-8 px-6 py-6 mt-12 relative z-20">
               <div className="text-[10px] tracking-widest uppercase opacity-60 flex flex-wrap gap-6 text-[#5c2323]">
                 <span>Resolution: Adaptive</span>
                 <span>Format: Grid</span>
                 <span>Status: Online</span>
               </div>
               
               <div className="flex flex-wrap items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
                  <button onClick={handleEmail} className="border-b border-[#4a1c1c] pb-1 hover:opacity-60 transition-opacity min-w-[60px] text-left">
                    {emailCopied ? 'Copied ✓' : 'Email'}
                  </button>
                  <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">LinkedIn</a>
                  <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">GitHub</a>
                  <a href={RESUME} download="KushalSeemakurthi.pdf" className="border-b border-[#4a1c1c] pb-1 hover:opacity-60 transition-opacity flex items-center gap-2">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Resume
                  </a>
               </div>
            </footer>
        </Section>
      </div>

    </main>
  );
}
