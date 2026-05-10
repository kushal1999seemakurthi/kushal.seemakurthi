export interface Experience {
  date: string;
  tag: string;
  company: string;
  title: string;
  bullets: string[];
}

export const experiences: Experience[] = [
  {
    date: "Apr 2025 - Present",
    tag: "Current",
    company: "Ushur",
    title: "Sr. Data Scientist & POD Lead",
    bullets: [
      "Led 12-engineer POD contributing to 7% of company ARR.",
      "Architected multi-agent document intelligence platform (Azure Form Recognizer, GPT-4, Pinecone) processing 100K+ docs/month with 90-94% accuracy.",
      "Engineered RFP processing pipeline reducing turnaround from 5 days to ~12 minutes.",
      "Built Confidence Estimation systems & HITL platforms driving 30% increase in daily usage.",
      "Winner of the Ushur Champion Award.",
    ],
  },
  {
    date: "Nov 2021 - Mar 2025",
    tag: "",
    company: "Ushur",
    title: "Data Scientist",
    bullets: [
      "Built SmartMail email classification & extraction platform for 20k-40k emails/week, achieving 90-92% accuracy.",
      "Designed RAG-based pipeline for 1,000+ daily broker submissions at 92% accuracy.",
      "Created custom DSL (Lark parser) achieving 95% reduction in manual effort.",
      "Implemented MLOps pipeline achieving 50% latency reduction via INT8 + ONNX.",
    ],
  },
  {
    date: "Sep 2021 - Oct 2021",
    tag: "",
    company: "Junglee Games",
    title: "Applied Data Science Intern",
    bullets: [
      "Fine-tuned robust multilingual BERT on Hinglish/Hindi/English achieving 91% F1-score.",
      "Deployed real-time moderation for 2M+ daily users.",
    ],
  },
  {
    date: "Aug 2021 - Sep 2021",
    tag: "",
    company: "Kaglorisis",
    title: "Data Science Intern",
    bullets: [
      "Trained YOLOv3 on 50K annotated traffic images achieving 88% mAP@0.5.",
      "Deployed on NVIDIA Jetson edge with TensorRT achieving 40% inference speedup.",
    ],
  },
];
