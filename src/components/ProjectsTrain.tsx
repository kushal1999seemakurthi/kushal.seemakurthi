import { InteractiveCard } from './InteractiveCard';

const projects = [
  {
    tag: "Core GenAI",
    highlight: "$4M+ Revenue Generated",
    title: "Enterprise RAG System",
    description: "Production RAG system processing 100K+ PDFs/month with hybrid search (dense + sparse), reranking, and streaming.",
    stack: "LangChain, GPT-4, Pinecone, FastAPI, Docker"
  },
  {
    tag: "Classification Pipeline",
    highlight: "",
    title: "Zero-Shot Classification API",
    description: "NLI-based API enabling instant deployment for 15+ enterprise use cases via prompt templates and few-shot learning, completely eliminating retraining cycles.",
    stack: "RoBERTa, Hugging Face, Kubernetes"
  },
  {
    tag: "Safety & Moderation",
    highlight: "",
    title: "Multilingual Hate Speech",
    description: "Code-mixed Hinglish fine-tuning achieving 91% F1-score; served 2M+ users with Prometheus monitoring.",
    stack: "mBERT, PyTorch, TorchServe"
  }
];

export function ProjectsTrain() {
  const CardList = () => (
    <>
      {projects.map((project, index) => (
        <div key={index} className="w-[320px] md:w-[420px] shrink-0 whitespace-normal h-[360px] mx-3">
          <InteractiveCard className="p-8 flex flex-col group cursor-pointer w-full h-full shadow-2xl bg-[#FCFAF5] justify-between border border-[#4a1c1c]/10 text-left">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="text-[10px] uppercase tracking-[0.15em] opacity-80">{project.tag}</div>
                {project.highlight && (
                  <div className="text-[9px] uppercase tracking-[0.2em] font-bold py-1 px-2 border border-[#4a1c1c]/40 text-[#4a1c1c] bg-[#4a1c1c]/5">
                    {project.highlight}
                  </div>
                )}
              </div>
              <h3 className="text-3xl font-serif leading-[1.1] tracking-tight mb-4 text-[#2a1111]">{project.title}</h3>
              <p className="text-sm italic opacity-80 border-l-2 border-[#4a1c1c]/40 pl-4 py-1 mb-6 text-[#5c2323]">
                {project.description}
              </p>
            </div>
            <div className="pt-6 border-t border-[#4a1c1c]/20 flex flex-col md:flex-row gap-4 justify-between mt-auto">
              <p className="text-[10px] uppercase tracking-widest font-mono opacity-90 leading-relaxed"><span className="font-bold mr-2 opacity-60">Stack</span> {project.stack}</p>
            </div>
          </InteractiveCard>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full relative flex overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 pl-4 sm:pl-6 lg:pl-8">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F4EFE6] to-transparent z-20 pointer-events-none hidden md:block"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F4EFE6] to-transparent z-20 pointer-events-none hidden md:block"></div>

      <div className="flex w-max pause-marquee py-8">
        <div className="flex animate-marquee shrink-0">
           <CardList />
           <CardList />
        </div>
        <div className="flex animate-marquee shrink-0">
           <CardList />
           <CardList />
        </div>
      </div>
    </div>
  );
}
