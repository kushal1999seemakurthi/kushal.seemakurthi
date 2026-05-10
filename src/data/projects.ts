export interface Project {
  tag: string;
  highlight: string;
  title: string;
  description: string;
  stack: string;
}

export const projects: Project[] = [
  {
    tag: "Core GenAI",
    highlight: "$4M+ Revenue Generated",
    title: "Enterprise RAG System",
    description:
      "Production RAG system processing 100K+ PDFs/month with hybrid search (dense + sparse), reranking, and streaming.",
    stack: "LangChain, GPT-4, Pinecone, FastAPI, Docker",
  },
  {
    tag: "Classification Pipeline",
    highlight: "",
    title: "Zero-Shot Classification API",
    description:
      "NLI-based API enabling instant deployment for 15+ enterprise use cases via prompt templates and few-shot learning, completely eliminating retraining cycles.",
    stack: "RoBERTa, Hugging Face, Kubernetes",
  },
  {
    tag: "Safety & Moderation",
    highlight: "",
    title: "Multilingual Hate Speech",
    description:
      "Code-mixed Hinglish fine-tuning achieving 91% F1-score; served 2M+ users with Prometheus monitoring.",
    stack: "mBERT, PyTorch, TorchServe",
  },
];
