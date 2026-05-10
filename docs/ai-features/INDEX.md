# AI Features Documentation

Specifications, implementation guides, and test results for AI-powered portfolio features.

---

## Implemented Features

*(None yet — in planning phase)*

---

## Planned Features (Tier Priority)

### Tier 1: High Impact, Medium Effort

**[Resume Analyzer](resume-analyzer.md)** — RECOMMENDED START  
- User uploads resume PDF
- AI extracts skills and experience
- Compares to Kushal's profile
- Returns skill gaps + personalized learning roadmap
- **Status:** Specification complete, ready for implementation
- **Est. time:** 3-4 days
- **Wow factor:** ⭐⭐⭐⭐

**[Learn from My Work Chat](chat-rag.md)** — PHASE 2  
- Interactive chat about portfolio projects
- Retrieval-Augmented Generation (RAG) from blog posts + projects
- Adaptive explanations (junior/mid/senior/non-tech level)
- **Status:** Specification complete
- **Est. time:** 4-5 days
- **Wow factor:** ⭐⭐⭐⭐⭐ (Live RAG demo)

### Tier 2: Advanced, Higher Effort

**[Multi-Agent Consultant](multi-agent.md)** — PHASE 3 (OPTIONAL)  
- 4 specialized agents: Project, Career, Skill, Interview
- Agents collaborate to answer complex questions
- **Status:** Specification complete
- **Est. time:** 5-7 days
- **Wow factor:** ⭐⭐⭐⭐⭐ (Cutting-edge)

### Tier 3: Generative Features

**[AI-Generated Summaries](summaries.md)** — PHASE 4 (OPTIONAL)  
- Auto-generate project summaries from multiple perspectives
- Executive, Technical, Learning, Recruiter views
- **Status:** Specification complete
- **Est. time:** 2-3 days
- **Wow factor:** ⭐⭐⭐

---

## Tech Stack (Finalized)

| Component | Choice | Cost |
|-----------|--------|------|
| **LLM** | groq/compound (Groq free tier) | Free (30 RPM, 70K TPM) |
| **Fallback LLM** | Claude 3.5 Sonnet | ~$3/1M tokens (backup) |
| **Embeddings** | Sentence Transformers (open-source, local) | Free |
| **Vector DB** | Pinecone free tier | Free (100K vectors) |
| **PDF Parsing** | pdf-parse (npm) | Free |
| **File Upload** | Multer (npm) | Free |

**Total estimated cost:** $0-5/month

---

## Model Evaluation Status

Both models tested across 5 reasoning dimensions:

**groq/compound** (In Progress)
- [x] BUSINESS — B+ (polished, runway-aware)
- [ ] MATH — Pending
- [ ] POLITICAL — Pending
- [ ] EMOTIONAL — Pending
- [ ] PROBLEM-SOLVING — Pending

**openai/gpt-oss-120b** (Reference, Complete)
- [x] All 5 tests complete
- [x] Overall: A- (high reasoning quality, token-limited)

See [Model Evaluations](../model-evaluations/INDEX.md) for full analysis.

---

## Implementation Roadmap

**Week 1:** Resume Analyzer setup + PDF parsing  
**Week 2:** Skill extraction + comparison logic + frontend component  
**Week 3:** Deploy + test  
**Week 4-5:** Learn from My Work Chat (RAG setup + frontend)  
**Week 6+:** Optional: Multi-Agent, Summaries, Polish  

---

## For AI Agents

**Starting Resume Analyzer?**
1. Read [resume-analyzer.md](resume-analyzer.md) for full spec
2. Check cost breakdown (free tier sufficient)
3. Follow implementation steps (5 phases)
4. Reference code examples in spec

**Implementing RAG?**
1. Review [chat-rag.md](chat-rag.md)
2. Understand Pinecone free tier limits (100K vectors)
3. Set up embedding pipeline (Sentence Transformers)
4. Reference the particle text system for frontend patterns

**Model selection decision?**
1. Check [Model Evaluations](../model-evaluations/INDEX.md)
2. groq/compound is production-ready (free, tested on BUSINESS)
3. If higher reasoning depth needed, use Claude API with higher token budget
