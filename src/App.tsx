/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Scene from './components/Scene';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      wheelMultiplier: 1,
    });
    
    lenis.on('scroll', ScrollTrigger.update as any);
    
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
    <div className="bg-[#F9F7F2] text-[#1C1C1C] font-serif relative w-full min-h-screen selection:bg-[#1C1C1C] selection:text-[#F9F7F2]">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      {/* Editorial UI Overlay */}
      <div className="relative z-10 pointer-events-none">
        <header className="flex justify-between items-baseline px-6 md:px-12 pt-10 border-b border-[#1C1C1C]/10 pb-4 mix-blend-multiply sticky top-0 bg-[#F9F7F2]/80 backdrop-blur-md pointer-events-auto z-50">
          <div className="text-xs md:text-sm tracking-[0.2em] font-sans font-bold uppercase italic">Issue No. 1</div>
          <div className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-center hidden sm:block">Seemakurthi<br/>Kushal Kumar</div>
          <div className="text-2xl md:text-4xl font-black tracking-tighter uppercase text-center sm:hidden">Kushal</div>
          <div className="text-xs md:text-sm tracking-[0.2em] font-sans font-bold uppercase italic text-right whitespace-pre-line hidden md:block">
            Senior Data Scientist{'\n'}IIT Dharwad Alumnus
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-12 gap-0 px-6 md:px-12 mix-blend-multiply">
          <div className="hidden md:flex col-span-1 border-r border-[#1C1C1C]/10 flex-col pt-12 gap-12 sticky top-48 h-max">
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#1C1C1C]">Introduction</div>
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#1C1C1C]/40">Experience</div>
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#1C1C1C]/40">Skills</div>
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#1C1C1C]/40">Projects</div>
            <div className="[writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.3em] font-sans font-semibold text-[#1C1C1C]/40">Education</div>
          </div>

          <div className="col-span-1 md:col-span-11 md:pl-12 pt-12 relative">
            
            {/* 1. Introduction */}
            <section id="section-0" className="min-h-[100vh] relative flex flex-col justify-center pointer-events-auto pb-32">
              <div className="absolute -left-4 top-1/4 text-[120px] md:text-[240px] font-black text-[#1C1C1C]/5 leading-none select-none">01</div>
              <h1 className="text-[60px] md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 z-10 relative">
                Senior Data<br/>Scientist
              </h1>
              
              <div className="flex gap-8 mb-12 relative z-10">
                <div className="w-px h-auto bg-[#1C1C1C] my-2"></div>
                <p className="text-xl md:text-2xl leading-relaxed italic text-[#1C1C1C]/80 max-w-xl">
                  4.5 years building production-scale GenAI, NLP, and Document AI systems. Expert in LLMs, RAG architectures, transformer fine-tuning, and MLOps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans relative z-10">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Impact</h4>
                  <p className="text-xs leading-relaxed text-justify">
                    Led 12-engineer cross-functional POD delivering solutions generating 7% of company ARR; achieved 99%+ efficiency improvements and 50%+ latency optimization at scale.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Recognition</h4>
                  <p className="text-xs leading-relaxed text-justify">
                    Ushur Champion Award recipient, recognized for leading customer-centric AI products directly contributing to revenue growth.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Experience */}
            <section id="section-1" className="min-h-[100vh] relative flex flex-col justify-center pointer-events-auto pb-32">
              <div className="absolute -left-4 top-1/4 text-[120px] md:text-[240px] font-black text-[#1C1C1C]/5 leading-none select-none">02</div>
              <h1 className="text-[60px] md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 z-10 relative">
                The<br/>Blueprint
              </h1>
              
              <div className="flex gap-8 mb-12 relative z-10">
                <div className="w-px h-auto bg-[#1C1C1C] my-2"></div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Ushur</h3>
                  <p className="text-sm font-sans uppercase tracking-widest text-[#1C1C1C]/60 mb-6">Senior Data Scientist & POD Lead  •  2021 — Present</p>
                  <p className="text-lg leading-relaxed italic text-[#1C1C1C]/80">
                    Architected multi-agent document intelligence platform processing 100K+ documents/month with 90-94% extraction accuracy.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans relative z-10 pl-9 md:pl-[3.5rem]">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Junglee Games</h4>
                  <p className="text-xs leading-relaxed text-justify mb-2"><b>Applied Data Science Intern</b></p>
                  <p className="text-xs leading-relaxed text-justify">
                    Fine-tuned multilingual BERT (mBERT) on Hinglish/Hindi/English chat achieving 91% F1-score across 3 languages; deployed real-time moderation for 2M+ daily users.
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50">Kaglorisis</h4>
                  <p className="text-xs leading-relaxed text-justify mb-2"><b>Data Science Intern</b></p>
                  <p className="text-xs leading-relaxed text-justify">
                    Trained YOLOv3 on 50K annotated traffic images achieving 88% mAP@0.5 at 30 FPS; deployed on NVIDIA Jetson edge achieving 40% inference speedup.
                  </p>
                </div>
              </div>
            </section>

            {/* 3. Skills */}
            <section id="section-2" className="min-h-[100vh] relative flex flex-col justify-center pointer-events-auto pb-32">
              <div className="absolute -left-4 top-1/4 text-[120px] md:text-[240px] font-black text-[#1C1C1C]/5 leading-none select-none">03</div>
              <h1 className="text-[60px] md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 z-10 relative">
                Technical<br/>Arsenal
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 font-sans relative z-10">
                 <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50 border-b border-[#1C1C1C]/20 pb-2">ML/AI & LLMs</h4>
                  <ul className="text-xs leading-loose">
                    <li>PyTorch, TensorFlow, Hugging Face</li>
                    <li>LangChain, LlamaIndex, DSPy, LiteLLM</li>
                    <li>OpenAI/Anthropic API</li>
                    <li>GPT-3/4, Llama 2/3, BERT, RoBERTa</li>
                    <li>LoRA, QLoRA, PEFT</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50 border-b border-[#1C1C1C]/20 pb-2">Vector & Databases</h4>
                  <ul className="text-xs leading-loose">
                    <li>Pinecone, Weaviate, ChromaDB</li>
                    <li>FAISS, Elasticsearch</li>
                    <li>PostgreSQL, MongoDB</li>
                    <li>SQL, Apache Spark, ETL</li>
                  </ul>
                </div>
                 <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-4 opacity-50 border-b border-[#1C1C1C]/20 pb-2">MLOps & Infra</h4>
                  <ul className="text-xs leading-loose">
                    <li>Docker, Kubernetes</li>
                    <li>AWS (SageMaker, EC2, S3)</li>
                    <li>Azure (OpenAI, Form Recognizer)</li>
                    <li>MLflow, W&B, GitHub Actions, Grafana</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Projects */}
            <section id="section-3" className="min-h-[100vh] relative flex flex-col justify-center pointer-events-auto pb-32">
              <div className="absolute -left-4 top-1/4 text-[120px] md:text-[240px] font-black text-[#1C1C1C]/5 leading-none select-none">04</div>
              <h1 className="text-[60px] md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 z-10 relative">
                The<br/>Artifacts
              </h1>

              <div className="flex gap-8 mb-12 relative z-10">
                <div className="w-px h-auto bg-[#1C1C1C] my-2"></div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Enterprise RAG System</h3>
                  <p className="text-sm font-sans tracking-tight text-[#1C1C1C]/60 mb-4">LangChain, GPT-4, Pinecone, FastAPI, Docker</p>
                  <p className="text-lg leading-relaxed italic text-[#1C1C1C]/80">
                    Production RAG system processing 100K+ PDFs/month with hybrid search, reranking, and streaming. Generated $4M+ revenue.
                  </p>
                </div>
              </div>

              <div className="flex gap-8 mb-12 relative z-10">
                <div className="w-px h-auto bg-[#1C1C1C] my-2"></div>
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Zero-Shot Classification API</h3>
                  <p className="text-sm font-sans tracking-tight text-[#1C1C1C]/60 mb-4">RoBERTa, Hugging Face, Kubernetes</p>
                  <p className="text-lg leading-relaxed italic text-[#1C1C1C]/80">
                    NLI-based API enabling instant deployment for 15+ enterprise use cases via prompt templates and few-shot learning.
                  </p>
                </div>
              </div>
            </section>

             {/* 5. Education */}
            <section id="section-4" className="min-h-[100vh] relative flex flex-col justify-center pointer-events-auto pb-32">
              <div className="absolute -left-4 top-1/4 text-[120px] md:text-[240px] font-black text-[#1C1C1C]/5 leading-none select-none">05</div>
              <h1 className="text-[60px] md:text-[110px] leading-[0.85] font-black tracking-tighter uppercase mb-8 z-10 relative">
                The<br/>Foundation
              </h1>

              <div className="flex gap-8 mb-12 relative z-10">
                <div className="w-px h-auto bg-[#1C1C1C] my-2"></div>
                <div className="max-w-xl">
                  <h3 className="text-3xl font-bold tracking-tight mb-2">IIT Dharwad</h3>
                  <p className="text-sm font-sans uppercase tracking-widest text-[#1C1C1C]/60 mb-6">B.Tech, Computer Science & Engineering  •  2017 — 2021</p>
                  <p className="text-xl leading-relaxed italic text-[#1C1C1C]/80 mb-6">
                    CGPA: 7.56 / 10.0
                  </p>
                  <ul className="text-xs font-sans leading-loose text-justify">
                    <li><span className="font-bold">JEE Advanced:</span> Ranked Top 1% nationally</li>
                    <li><span className="font-bold">Olympiad:</span> District 2nd in Maths & Science</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}

