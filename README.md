# Kushal Seemakurthi — Portfolio

An elegant single-page portfolio for Kushal Kumar Seemakurthi, Senior Data Scientist. Features scroll-driven animations, interactive components, and AI-powered features including resume analysis and RAG-based chat.

> **Ecosystem strategy docs** (hub + portfolio + blog) live one level up at `../docs/strategy/` — see [E2E_STRATEGY.md](../docs/strategy/E2E_STRATEGY.md), [PHASE_PLAN.md](../docs/strategy/PHASE_PLAN.md).

**Live:** https://kushal.seemakurthi.com

---

## Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Run Locally
```bash
npm install
npm run dev          # Vite dev server on localhost:3000
npm run build        # Production build → dist/
npm run lint         # Type check only (tsc --noEmit)
npm run preview      # Serve dist/ locally
```

### Set Environment Variables
Create `.env.local` (never commit to git):
```bash
GROQ_API_KEY=gsk_xxxxx                    # For AI features (free tier)
VITE_API_URL=http://localhost:3000        # Dev; https://kushal.seemakurthi.com (prod)
```

---

## Documentation Guide for AI Agents

The `docs/` directory is organized by topic. **Use this guide to find the right documentation:**

### 🏗️ Starting a New Feature?
→ **[Architecture](docs/architecture/INDEX.md)** — Portfolio structure, component hierarchy, scroll design  
→ **[AI Features](docs/ai-features/INDEX.md)** — Resume Analyzer, Chat RAG, Multi-Agent specifications  

### 🛠️ Implementing or Fixing Code?
→ **[CLAUDE.md](CLAUDE.md)** — Build commands, architecture overview, content location  
→ **[Development](docs/development/INDEX.md)** — Scroll patterns, component design, testing strategy  
→ **[Testing Checklist](docs/development/testing-checklist.md)** — Phase-by-phase QA verification  

### 🚀 Deploying or Managing Secrets?
→ **[Deployment](docs/deployment/INDEX.md)** — Cloudflare Pages, environment variables, production setup  

### 📊 Evaluating AI Models?
→ **[Model Evaluations](docs/model-evaluations/INDEX.md)** — groq/compound & openai/gpt-oss-120b test results  
→ **[BUSINESS Reasoning Test](docs/model-evaluations/GROQ_COMPOUND_EVAL.md)** — Deep dive into model capabilities  

---

## Project Structure

```
kushal.seemakurthi/
├── docs/                           # Full documentation (organized by topic)
│   ├── model-evaluations/          # LLM test results & analysis
│   ├── architecture/               # Design & structure
│   ├── ai-features/                # Feature specs & roadmap
│   ├── development/                # Patterns, testing, workflows
│   └── deployment/                 # Production setup & secrets
│
├── src/
│   ├── App.tsx                     # Root component (5 sections)
│   ├── components/                 # Reusable UI (Section, InteractiveCard, etc.)
│   ├── constants.ts                # Links, emails, asset paths
│   ├── index.css                   # Tailwind + custom tokens
│   └── main.tsx                    # Entry point
│
├── public/
│   ├── profile.jpg                 # Hero image
│   ├── KushalSeemakurthi.pdf       # Resume (download)
│   └── iitdharwad-logo.png         # IIT Dharwad logo
│
├── CLAUDE.md                        # Dev environment & commands
├── package.json                     # Dependencies
├── vite.config.ts                   # Build config
├── tsconfig.json                    # TypeScript config
└── README.md                        # This file
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + TypeScript |
| **Styling** | Tailwind CSS v4 (no config file) |
| **Animations** | motion/react (Framer Motion) |
| **Build** | Vite 6 + TypeScript |
| **API** | Express (for file uploads) |
| **LLM** | groq/compound (free tier) |
| **Embeddings** | Sentence Transformers (open-source) |
| **Vector DB** | Pinecone free tier (when RAG is implemented) |
| **Deployment** | Cloudflare Pages |

---

## Features

### Current
✅ **Five-Section Portfolio** — Interactive scroll-driven layout (Air, Water, Earth, Fire, Spirit)  
✅ **Contact Integration** — Email copy-to-clipboard + mailto handler  
✅ **Resume Download** — One-click PDF download for recruiters  
✅ **Responsive Design** — Mobile, tablet, desktop optimized  

### In Progress
🔄 **Resume Analyzer** — Upload resume → AI extracts skills → compares to Kushal's profile  

### Planned
📋 **Learn from My Work Chat** — RAG-based Q&A about projects & experience  
🤖 **Multi-Agent Consultant** — 4 specialized agents for career advice, skill recommendations, etc.  
✨ **AI-Generated Summaries** — Auto-generate project descriptions for different audiences  

---

## AI Features Architecture

**Tech Stack (Free Tier):**
- **LLM:** Groq (`groq/compound`) — 30 RPM, 70K TPM, free
- **Embeddings:** Sentence Transformers — open-source, local
- **Vector DB:** Pinecone — free (100K vectors)
- **File Upload:** Multer + pdf-parse
- **Cost:** $0-5/month

**Implementation Status:**
- [x] Model evaluation (BUSINESS dimension: B+ score)
- [ ] Resume Analyzer backend
- [ ] Resume Analyzer frontend
- [ ] Deploy & test
- [ ] RAG setup (Pinecone)
- [ ] Chat interface

---

## For AI Agents: Common Tasks

### Adding a new API feature
1. Read [AI Features Roadmap](docs/ai-features/INDEX.md)
2. Check [Resume Analyzer spec](docs/ai-features/resume-analyzer.md) for patterns
3. Add dependencies to `package.json`
4. Create backend endpoint in `src/api/`
5. Create frontend component in `src/components/`
6. Test with curl before frontend integration

### Debugging scroll issues
1. Review [Scroll Architecture](docs/development/web-dev-patterns.md)
2. Verify single `useScroll()` in App.tsx
3. Check `activeSection` state (log at 0.125, 0.375, 0.625, 0.875 thresholds)
4. Test on real phone (DevTools can hide issues)

### Deploying changes
1. Run `npm run lint && npm run build` locally
2. Run Lighthouse audit (target ≥85 mobile / ≥90 desktop)
3. Push to main branch
4. Verify Cloudflare Pages deploy succeeds
5. Test production URL on real device

### Choosing an LLM
- **For structured output (Resume Analyzer):** groq/compound (free, fast, polished)
- **For deep reasoning:** Claude 3.5 Sonnet (paid, but higher quality)
- **For exploration:** Use higher max_tokens (4096+) to reduce truncation

See [Model Evaluations](docs/model-evaluations/INDEX.md) for full comparison.

---

## Performance Targets

| Metric | Target |
|--------|--------|
| **Lighthouse (mobile)** | ≥85 |
| **Lighthouse (desktop)** | ≥90 |
| **LCP** | < 2.5s |
| **FID** | < 100ms |
| **CLS** | < 0.1 |
| **JS Bundle (gzipped)** | < 2.5 MB |

---

## Contact & Links

📧 **Email:** kushal@seemakurthi.com  
💼 **LinkedIn:** https://www.linkedin.com/in/kushal-kumar-57211317b/  
🐙 **GitHub:** https://github.com/kushal1999seemakurthi  
🎓 **Education:** IIT Dharwad, B.Tech CSE 2017–2021, CGPA 7.56/10  

---

## Development Commands

```bash
# Development
npm run dev           # Start Vite dev server
npm run build         # Production build
npm run preview       # Serve production build locally
npm run lint          # TypeScript type check only
npm run clean         # Delete dist/ folder

# AI Agent Helpers
# Model testing (groq/compound):
export GROQ_API_KEY=$(cat ~/.groq_key)
# Then run curl commands from docs/model-evaluations/

# Check Lighthouse locally (after npm run build):
npm run preview       # Then run Lighthouse audit in Chrome DevTools
```

---

## Key Documentation Files

| File | Purpose |
|------|---------|
| [CLAUDE.md](CLAUDE.md) | Dev environment, build commands, architecture overview |
| [docs/architecture/INDEX.md](docs/architecture/INDEX.md) | Portfolio structure & design decisions |
| [docs/ai-features/INDEX.md](docs/ai-features/INDEX.md) | AI feature roadmap & specs |
| [docs/development/INDEX.md](docs/development/INDEX.md) | Testing, patterns, best practices |
| [docs/deployment/INDEX.md](docs/deployment/INDEX.md) | Production deployment & secrets |
| [docs/model-evaluations/INDEX.md](docs/model-evaluations/INDEX.md) | LLM comparison & test results |

---

## License & Attribution

This portfolio is a personal project by Kushal Kumar Seemakurthi. Built with React 19, motion/react, Tailwind CSS, and Vite.

---

**Last updated:** 2026-05-09  
**Status:** Active development (Tier 1 AI features in progress)
