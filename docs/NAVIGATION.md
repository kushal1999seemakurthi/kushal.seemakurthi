# Documentation Navigation Guide

**Quick reference for AI agents to find the right documentation for any task.**

---

## By Task Type

### 🚀 **I'm implementing a new feature**
1. **Understand the feature spec** → [docs/ai-features/](ai-features/INDEX.md)
2. **See similar component patterns** → [docs/development/web-dev-patterns.md](development/INDEX.md)
3. **Development commands** → [CLAUDE.md](../CLAUDE.md)
4. **Verify it's working** → [docs/development/testing-checklist.md](development/INDEX.md)

**Example:** Implementing Resume Analyzer?  
→ Read [ai-features/resume-analyzer.md](ai-features/INDEX.md) → Check code patterns in [development/web-dev-patterns.md](development/INDEX.md) → Test with [testing-checklist.md](development/INDEX.md)

---

### 🐛 **I'm debugging or fixing code**
1. **What's the architecture?** → [docs/architecture/portfolio-structure.md](architecture/INDEX.md)
2. **What are the patterns?** → [docs/development/web-dev-patterns.md](development/INDEX.md)
3. **Common issues & fixes** → [docs/development/git-workflow.md](development/INDEX.md)
4. **How do I test?** → [docs/development/testing-checklist.md](development/INDEX.md)

**Example:** Scroll behavior is janky?  
→ Review [Scroll Architecture in web-dev-patterns](development/INDEX.md) → Check for competing listeners → Test on real phone

---

### 🚢 **I'm deploying to production**
1. **How does deployment work?** → [docs/deployment/cloudflare-pages.md](deployment/INDEX.md)
2. **Where are the secrets?** → [docs/deployment/environment-setup.md](deployment/INDEX.md)
3. **What to check before deploy?** → [docs/development/testing-checklist.md](development/INDEX.md) (Phase 4)
4. **Monitoring & verification** → [docs/deployment/INDEX.md](deployment/INDEX.md)

**Example:** Adding a new API key for Pinecone?  
→ Generate key → Store in [.env.local](../README.md) locally → Add to [Cloudflare secrets](deployment/INDEX.md) → Redeploy

---

### 🤖 **I'm choosing an LLM or evaluating models**
1. **Which model for my use case?** → [docs/model-evaluations/INDEX.md](model-evaluations/INDEX.md)
2. **See test results** → [docs/model-evaluations/GROQ_COMPOUND_EVAL.md](model-evaluations/GROQ_COMPOUND_EVAL.md)
3. **Cost & performance trade-offs** → [docs/ai-features/INDEX.md](ai-features/INDEX.md) (Tech Stack section)

**Example:** Should I use groq/compound or Claude?  
→ Check [Model Evaluations](model-evaluations/INDEX.md) → Compare on your dimension → [Cost breakdown](ai-features/INDEX.md)

---

### 📚 **I'm learning the codebase (first time)**
**Read in this order:**
1. [README.md](../README.md) — Overview & tech stack
2. [CLAUDE.md](../CLAUDE.md) — How to build & run
3. [docs/architecture/portfolio-structure.md](architecture/INDEX.md) — What the code does
4. [docs/development/web-dev-patterns.md](development/INDEX.md) — How the code is organized
5. Skim [src/App.tsx](../src/App.tsx) — See actual code

---

### ✅ **I'm verifying quality before shipping**
1. **Testing checklist** → [docs/development/testing-checklist.md](development/INDEX.md)
2. **Performance targets** → [README.md](../README.md) (Performance Targets section)
3. **Run Lighthouse** → See [testing-checklist.md Phase 4](development/INDEX.md)
4. **Real device testing** → See [testing-checklist.md Phase 2](development/INDEX.md)

---

## By Technology

### React + motion/react
- **Setup & basics** → [CLAUDE.md](../CLAUDE.md)
- **Scroll patterns** → [docs/development/web-dev-patterns.md](development/INDEX.md)
- **Common issues** → [docs/development/INDEX.md](development/INDEX.md) (Common Pitfalls table)

### Tailwind CSS v4
- **Token system** → [docs/architecture/portfolio-structure.md](architecture/INDEX.md) (Styling conventions)
- **Responsive grid** → [docs/development/web-dev-patterns.md](development/INDEX.md)

### API Integration (Express)
- **Resume Analyzer** → [docs/ai-features/resume-analyzer.md](ai-features/INDEX.md)
- **Chat RAG** → [docs/ai-features/chat-rag.md](ai-features/INDEX.md)

### Groq / Claude API
- **Model comparison** → [docs/model-evaluations/INDEX.md](model-evaluations/INDEX.md)
- **Cost & quotas** → [docs/ai-features/INDEX.md](ai-features/INDEX.md)
- **Implementation examples** → [docs/ai-features/resume-analyzer.md](ai-features/INDEX.md)

### Cloudflare Pages
- **Deploy setup** → [docs/deployment/cloudflare-pages.md](deployment/INDEX.md)
- **Secrets management** → [docs/deployment/environment-setup.md](deployment/INDEX.md)
- **Monitoring** → [docs/deployment/INDEX.md](deployment/INDEX.md)

---

## By Phase (Development Timeline)

### Phase 0 — Foundation (Week 1)
- [CLAUDE.md](../CLAUDE.md) — Setup & verify build
- [docs/development/testing-checklist.md](development/INDEX.md) — Phase 0 verification

### Phase 1 — Vertical Slice (Weeks 2–3)
- [docs/architecture/portfolio-structure.md](architecture/INDEX.md) — Understand layout
- [docs/development/web-dev-patterns.md](development/INDEX.md) — Component patterns
- [docs/development/testing-checklist.md](development/INDEX.md) — Phase 1 verification + kill/proceed gate

### Phase 2 — Feature Complete (Weeks 4–7)
- [docs/development/web-dev-patterns.md](development/INDEX.md) — Advanced patterns
- [docs/development/testing-checklist.md](development/INDEX.md) — Phase 2 verification (Lighthouse, real devices)

### Phase 3 — AI Features (Weeks 8+)
- [docs/ai-features/INDEX.md](ai-features/INDEX.md) — Feature specs
- [docs/model-evaluations/INDEX.md](model-evaluations/INDEX.md) — Model selection
- [docs/development/testing-checklist.md](development/INDEX.md) — Phase 3 a11y verification

### Phase 4 — Performance & Ship (Weeks 9–10)
- [docs/development/testing-checklist.md](development/INDEX.md) — Phase 4 verification
- [docs/deployment/cloudflare-pages.md](deployment/INDEX.md) — Production deploy
- [docs/deployment/environment-setup.md](deployment/INDEX.md) — Secrets & monitoring

---

## File Tree (Quick Reference)

```
docs/
├── NAVIGATION.md                          ← You are here
├── model-evaluations/
│   ├── INDEX.md                           # Model comparison summary
│   ├── GROQ_COMPOUND_EVAL.md             # Detailed groq/compound analysis
│   └── openai-gpt-oss-120b/               # (to be created) Reference model results
├── architecture/
│   ├── INDEX.md                           # Architecture overview
│   ├── portfolio-structure.md             # Component hierarchy, styling
│   ├── immersive-port-plan.md            # (future) 3D elemental portfolio spec
│   └── ai-features.md                    # (future) Detailed feature designs
├── ai-features/
│   ├── INDEX.md                           # Feature roadmap
│   ├── resume-analyzer.md                 # (to be created) Resume analyzer spec
│   ├── chat-rag.md                       # (to be created) RAG chat spec
│   ├── multi-agent.md                    # (to be created) Multi-agent spec
│   └── summaries.md                      # (to be created) Auto-summary spec
├── development/
│   ├── INDEX.md                           # Dev patterns & best practices
│   ├── testing-checklist.md              # (to be created) Phase-by-phase QA
│   ├── web-dev-patterns.md               # (to be created) React + motion patterns
│   └── git-workflow.md                   # (to be created) Branch & commit strategy
└── deployment/
    ├── INDEX.md                           # Deployment overview
    ├── cloudflare-pages.md               # (to be created) Production setup
    └── environment-setup.md              # (to be created) Secrets & env vars
```

---

## Finding Docs by Question

| Question | Answer |
|----------|--------|
| **How do I run the project?** | [CLAUDE.md](../CLAUDE.md) |
| **What's the project structure?** | [README.md](../README.md) + [architecture/INDEX.md](architecture/INDEX.md) |
| **How do I build a new feature?** | [ai-features/INDEX.md](ai-features/INDEX.md) + [development/INDEX.md](development/INDEX.md) |
| **What's the scroll architecture?** | [development/web-dev-patterns.md](development/INDEX.md) |
| **How do I test?** | [development/testing-checklist.md](development/INDEX.md) |
| **How do I deploy?** | [deployment/cloudflare-pages.md](deployment/INDEX.md) |
| **Where are the secrets?** | [deployment/environment-setup.md](deployment/INDEX.md) |
| **Which LLM should I use?** | [model-evaluations/INDEX.md](model-evaluations/INDEX.md) |
| **What's the tech stack?** | [README.md](../README.md) (Tech Stack section) |
| **What are the performance targets?** | [README.md](../README.md) (Performance Targets section) |
| **How do I fix [common issue]?** | [development/INDEX.md](development/INDEX.md) (Common Pitfalls) |

---

## Pro Tips for AI Agents

1. **Start with README.md** — It's the entry point and links to everything
2. **Use the index files** — Each directory has an INDEX.md with a quick reference
3. **Check the decision matrix tables** — Performance targets, model comparisons, pitfalls all use tables for fast scanning
4. **Follow the "For AI Agents" section** — Most docs have a dedicated section with next steps
5. **Link back to CLAUDE.md** — When in doubt about build commands or structure, CLAUDE.md is canonical

---

**Last updated:** 2026-05-09
