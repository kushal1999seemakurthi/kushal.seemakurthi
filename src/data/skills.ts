export interface SkillCategory {
  label: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    label: "Programming & Data",
    tags: ["Python", "NumPy", "Pandas", "scikit-learn", "SQL", "R", "Apache Spark", "ETL"],
  },
  {
    label: "Vector & Databases",
    tags: ["Pinecone", "Weaviate", "ChromaDB", "FAISS", "Elasticsearch", "PostgreSQL", "MongoDB"],
  },
  {
    label: "ML/AI & LLMs",
    tags: [
      "PyTorch", "TensorFlow", "Hugging Face", "LangChain", "LlamaIndex",
      "DSPy", "LiteLLM", "OpenAI", "Anthropic", "MS AI Foundry",
    ],
  },
  {
    label: "Advanced Techniques",
    tags: [
      "LoRA / QLoRA", "RAG", "Prompt Engineering", "Few-shot Learning",
      "Transfer Learning", "Ontology Extraction", "PEFT",
    ],
  },
  {
    label: "Models & Architectures",
    tags: [
      "GPT-3/4", "Llama 2/3", "BERT", "RoBERTa", "mBERT",
      "SpanBERT", "BART", "YOLOv3", "FastText", "ULMFiT",
    ],
  },
  {
    label: "MLOps & Infra",
    tags: ["Docker", "Kubernetes", "AWS", "Azure", "MLflow", "W&B", "GitHub Actions", "Grafana"],
  },
];
