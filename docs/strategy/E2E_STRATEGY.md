# Seemakurthi Ecosystem — End-to-End Strategy

**Last updated:** 2026-05-10  
**Status:** Planning phase

---

## The Big Picture

Three independent surfaces, one shared AI brain, one creator (Kushal Kumar Seemakurthi — Senior Data Scientist).

```
                        seemakurthi.com
                        ┌─────────────┐
                        │     HUB     │ ← Discovery + routing
                        │  (Astro)    │
                        └──────┬──────┘
               ┌───────────────┼───────────────┐
               ↓               ↓               ↓
  kushal.seemakurthi.com  blog.seemakurthi.com  [AI Backend]
  ┌───────────────────┐  ┌──────────────────┐  ┌──────────────────┐
  │    PORTFOLIO      │  │      BLOG        │  │    AI BRAIN      │
  │  (React 19)       │  │  (Astro + MDX)   │  │  (CF Workers)    │
  │                   │  │                  │  │                  │
  │ • Elegant layout  │  │ • Revision (free)│  │ • Vectorize DB   │
  │ • Resume Analyzer │  │ • Study (Tier 1) │  │ • groq/compound  │
  │ • Project demos   │  │ • Voice AI (T2)  │  │ • Cross-surface  │
  │ • RAG chat        │  │ • Community      │  │   knowledge      │
  └───────────────────┘  └──────────────────┘  └──────────────────┘
```

---

## The Three Surfaces

### 1. Hub — seemakurthi.com
**Role:** First impression. Routes visitors to the right surface.  
**Audience:** Everyone who finds the domain  
**Tone:** Minimal, confident, professional  

**What it does:**
- Positions Kushal as a thinker + builder
- Routes to portfolio ("my work") or blog ("my thinking")
- Shows latest 3 blog posts via RSS
- Newsletter signup

**What it does NOT do:**
- Host content (everything is on portfolio or blog)
- Require auth or payment

### 2. Portfolio — kushal.seemakurthi.com
**Role:** Professional showcase + AI feature playground  
**Audience:** Recruiters, hiring managers, technical peers  
**Tone:** Elegant, interactive  

**What it does:**
- Clean multi-section layout with scroll-driven animations
- Resume download for recruiters
- Resume Analyzer AI feature (upload your resume → skill gap analysis)
- Projects showcase (Enterprise RAG, Zero-Shot API)
- Experience timeline (Ushur, Junglee Games, Kaglorisis)
- Contact (email copy + mailto)

**Currently built:** 100% complete (frontend only)  
**AI features:** Specs ready, implementation pending

### 3. Blog — blog.seemakurthi.com
**Role:** Subscription knowledge product + community  
**Audience:** Data scientists, ML engineers, AI enthusiasts  
**Tone:** Educational, rigorous, interactive  

**Three content modes:**
| Mode | Audience | Access | Content |
|------|----------|--------|---------|
| **Revision** | Everyone | Free | TL;DR, key concepts, high-level diagrams |
| **Study** | Learners | Tier 1 subscription | Full depth, math, interactive components, code playgrounds |
| **Catch Up** | Busy practitioners | Tier 2 subscription | Voice-driven AI tutor, conversational explanations |

---

## Shared Infrastructure

```
All three surfaces share:

┌──────────────────────────────────────────────────────┐
│                  Cloudflare Ecosystem                 │
│                                                      │
│  Pages          Workers           D1 + Vectorize     │
│  ├─ hub.cf      ├─ ai-agent       ├─ user DB         │
│  ├─ portfolio   ├─ resume-api     ├─ sessions        │
│  └─ blog        ├─ chat-api       └─ knowledge index │
│                 └─ sync-api                          │
└──────────────────────────────────────────────────────┘

Auth:      Better Auth (open source, Cloudflare D1 adapter)
Payments:  Polar.sh (open source-aligned, 4% flat fee)
Comments:  Remark42 (self-hosted, REST API for AI pipeline)
LLM:       groq/compound (free tier: 30 RPM, 70K TPM)
TTS:       OpenAI TTS for Tier 2 voice output ($0.015/1K chars)
STT:       Web Speech API (browser-native, free)
Newsletter: Buttondown (API-first, self-hosted subscriber list)
```

---

## User Journeys

### Recruiter Journey
```
Google "Kushal Seemakurthi"
  → kushal.seemakurthi.com (portfolio)
  → Download resume (PDF)
  → Upload their own resume → Resume Analyzer
  → See skill comparison
  → Contact via email
```

### Peer / ML Engineer Journey
```
Twitter/LinkedIn post → blog.seemakurthi.com/[post]
  → Read Revision mode (free)
  → Interested in depth → Subscribe Tier 1
  → Study mode: interactive components, code, math
  → Leave comment → community discussion
  → Discover more posts → subscribe to newsletter
```

### Power User Journey
```
Subscriber (Tier 2) arrives at blog post
  → Tap "Catch Up" mode
  → Mic icon activates
  → Speaks: "Explain the chunking strategy in simpler terms"
  → AI agent reads post context → groq/compound → TTS response
  → Conversational back-and-forth
  → Ends session → bookmark for revision
```

### Admin (Kushal) Journey
```
Login to /admin (Cloudflare Access → Google auth)
  → Admin AI sidebar opens
  → "Show me which posts have most engagement"
  → Agent queries analytics → returns insight
  → "Suggest a new post based on what readers are asking"
  → Agent queries Remark42 comments → surfaces frequent questions
  → Navigate: "Take me to the RAG post draft"
  → Agent navigates → edit buttons appear
```

---

## Revenue Model

**Free tier:** Revision mode, all posts  
**Tier 1 (~$5-9/mo):** Study mode — full depth, interactives, code  
**Tier 2 (~$14-19/mo):** Voice AI Catch Up — conversational AI tutor on any post  

**Projections (conservative):**
| Milestone | Subscribers | MRR |
|-----------|-------------|-----|
| Launch (Month 1-2) | 0 | $0 |
| First 10 posts (Month 3-4) | 20 Tier 1 | ~$100 |
| Community grows (Month 6) | 50 T1 + 10 T2 | ~$400 |
| Year 1 | 150 T1 + 30 T2 | ~$1,200 |

**Total infrastructure cost at 200 subscribers:** ~$15/mo (Remark42 VPS + Buttondown)

---

## Tech Stack Per Surface

### Hub (seemakurthi.com)
```
Framework:   Astro 4 (static, zero JS by default)
Styling:     Tailwind CSS v4
Deploy:      Cloudflare Pages
Blog feed:   Fetch from blog.seemakurthi.com/rss.xml
Newsletter:  Buttondown embed
Domain:      seemakurthi.com (apex, CNAME to CF Pages)
```

### Portfolio (kushal.seemakurthi.com)
```
Framework:   React 19 + TypeScript (existing, production — already live)
Animations:  motion/react (scroll-driven, hover effects)
Styling:     Tailwind CSS v4
Build:       Vite 6
AI features: Cloudflare Worker endpoints (to be implemented)
Deploy:      Cloudflare Pages
Domain:      kushal.seemakurthi.com (already live)
```

### Blog (blog.seemakurthi.com)
```
Framework:   Astro 4 + MDX (posts as .mdx files)
Auth:        Better Auth + Cloudflare D1
Payments:    Polar.sh
Comments:    Remark42 (self-hosted VPS)
Styling:     Tailwind CSS v4 (shared design tokens with hub)
AI:          Cloudflare Workers (same backend as portfolio)
Deploy:      Cloudflare Pages
Domain:      blog.seemakurthi.com (subdomain)
Newsletter:  Buttondown (subscriber management + RSS)
```

---

## Shared Design System

Both hub and blog use identical:
- Font: Inter (body), Playfair Display (headings)
- Color tokens: defined in a shared `@seemakurthi/tokens` package (npm private)
- Components: Header, Footer, SubscribeWidget, NewsletterBar
- Logo / brand marks

**Package strategy:** Publish `@seemakurthi/ui` as private npm package (or just copy-paste the Tailwind config for now, formalize later when it needs syncing more than twice a month).

---

## AI Brain — Cross-Surface Knowledge

### What it knows
```
Knowledge sources (embedded in Vectorize):
├── portfolio: projects, experience, skills, bio
├── hub: about text, philosophy
└── blog: all published posts (chunked by section)
    ├── RAG post chunks
    ├── Fine-tuning post chunks
    └── ... (grows with every new post)
```

### Sync pipeline
```
Any repo push → GitHub Action → extract + chunk content
  → POST /api/sync (Cloudflare Worker)
  → Embed with sentence-transformers (or Cloudflare AI)
  → Upsert into Vectorize with metadata: { source, url, date }
```

### Query flow
```
User query → embed query → search Vectorize (top-k chunks)
  → inject chunks into groq/compound prompt
  → generate contextual response
  → stream to frontend
```

---

## Repo Structure

Three independent repos, one parent directory:

```
~/Desktop/Claude/Portfolio/
├── kushal.seemakurthi/     ← Portfolio (existing, production)
├── hub.seemakurthi/        ← Hub (to be created)
└── blog.seemakurthi/       ← Blog (to be created)
```

Each repo is independently deployable. No monorepo. Shared styles copied manually (or via private npm if friction grows).

---

## Success Metrics (Year 1)

| Metric | Target |
|--------|--------|
| Blog posts published | 24 (2/month) |
| Newsletter subscribers | 500 |
| Paying Tier 1 subscribers | 100 |
| Paying Tier 2 subscribers | 25 |
| Portfolio Lighthouse score | ≥90 desktop / ≥85 mobile |
| AI feature adoption (Resume Analyzer) | 50 uses/month |
| Voice AI sessions | 100/month |
| Monthly recurring revenue | $750 |

---

## Open Decisions

| Decision | Status | Notes |
|----------|--------|-------|
| Pricing (Tier 1 & 2) | Pending | Validate content quality first |
| TTS provider (OpenAI vs ElevenLabs vs browser) | Pending | OpenAI recommended for Tier 2 quality |
| Comment moderation strategy | Pending | Remark42 admin or auto-moderate via AI |
| Shared UI package vs copy-paste | Pending | Copy-paste for now, formalize at Year 1 |
| Admin AI model selection | Pending | groq/compound unless deep reasoning needed |
