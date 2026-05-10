# Blog Plan — blog.seemakurthi.com

**Last updated:** 2026-05-10  
**Repo:** `blog.seemakurthi/` (to be created)  
**Deploy target:** blog.seemakurthi.com (Cloudflare Pages)

---

## Purpose

A subscription knowledge product for ML/AI practitioners. Three reading modes serve different levels of time and depth. Community via comments. Content strategy informed by reader data.

---

## Repo Setup

```bash
cd ~/Desktop/Claude/Portfolio
npm create astro@latest blog.seemakurthi -- --template minimal --typescript strict
cd blog.seemakurthi
npx astro add tailwind mdx
git init && git branch -M main
```

**Stack:** Astro 4 + MDX + Tailwind CSS v4  
**Auth:** Better Auth (added in Phase 3)  
**Payments:** Polar.sh (added in Phase 3)  
**Comments:** Remark42 (added in Phase 0)  
**Deploy:** Cloudflare Pages

---

## Content Model

### Frontmatter Schema (every post)

```yaml
---
title: "RAG from Scratch"
slug: "rag-from-scratch"
date: 2026-05-15
updated: 2026-05-15
status: published          # draft | published
tags: [rag, llm, retrieval]
category: technical        # technical | career | mlops | personal
difficulty: intermediate   # beginner | intermediate | advanced
estimatedMinutes: 18
prerequisites: []          # slugs of recommended prior reading
related: []                # slugs of related posts
isInteractive: true        # signals embedded interactive components
modes:
  revision: true           # has revision mode content
  study: true              # has study mode content (may be draft initially)
  catchup: false           # voice AI ready (later phase)
---
```

### Three Content Modes

Each post file contains **both** Revision and Study mode content, conditionally rendered:

```mdx
<!-- rag-from-scratch.mdx -->
import { RevisionOnly, StudyOnly } from '../components/modes'

<RevisionOnly>
## What is RAG? (2-minute read)

RAG stands for Retrieval-Augmented Generation. Instead of relying on
what the model was trained on, you fetch relevant documents at query
time and give them to the model as context.

**Key insight:** The model's knowledge has a cutoff date. RAG bypasses this.

**When to use it:** When your data changes frequently, when you need citations,
or when fine-tuning is too expensive.
</RevisionOnly>

<StudyOnly>
## How RAG Works Internally

### The Retrieval Pipeline

At query time, three things happen in sequence:

**1. Query embedding**
Your question is passed through an embedding model to produce a dense vector.

$$\vec{q} = \text{Embed}(\text{question})$$

**2. Nearest-neighbor search**
The query vector is compared against your document index...

<EmbeddingVisualizer data={embeddingData} />

**3. Context injection**
Top-k chunks are injected into the prompt...

<CodePlayground
  code={`from langchain import RAGChain\n...`}
  language="python"
/>
</StudyOnly>
```

---

## Base Template (every page)

```
┌──────────────────────────────────────────────────┐
│  HEADER                                          │
│  blog.seemakurthi.com    Portfolio ↗   Hub ↗    │
│                                    [Subscribe]   │
├──────────────────────────────────────────────────┤
│  POST HEADER                                     │
│  Title                                           │
│  tag · difficulty · X min read · date            │
│  [Revision] [Study 🔒] [Catch Up 🔒]  ← tabs    │
├──────────────────────────────────────────────────┤
│  TABLE OF CONTENTS (sticky sidebar, desktop)     │
├──────────────────────────────────────────────────┤
│  POST CONTENT (mode-gated)                       │
│                                                  │
│  [Interactive components if Study mode]          │
├──────────────────────────────────────────────────┤
│  RELATED POSTS (from frontmatter.related)        │
├──────────────────────────────────────────────────┤
│  COMMENTS (Remark42)                             │
├──────────────────────────────────────────────────┤
│  SUBSCRIBE CTA                                   │
│  "Enjoyed this? Get the next one in your inbox"  │
├──────────────────────────────────────────────────┤
│  FOOTER                                          │
│  Hub · Portfolio · LinkedIn · GitHub             │
└──────────────────────────────────────────────────┘
```

---

## Three Reading Modes

### Revision Mode (Free — everyone)
- TL;DR (3–5 bullet points)
- Key concept definitions
- High-level diagram (Mermaid or static image)
- "What you'll learn in Study mode" teaser
- ~5 min read

### Study Mode (Tier 1 — ~$5-9/mo)
- Full post content
- Mathematical derivations (KaTeX)
- Code examples with runnable playground (Sandpack)
- Interactive visualizations (D3.js components)
- Implementation trade-offs and production notes
- ~15-25 min read

### Catch Up Mode (Tier 2 — ~$14-19/mo)
- Mic button → voice input (Web Speech API)
- User asks questions about the post
- AI agent answers conversationally (groq/compound → TTS)
- Context-aware (knows which post you're on)
- Session transcript shown

---

## Interactive Component Library

Build these progressively — one per new post that needs it:

| Component | Technology | Used in |
|-----------|-----------|---------|
| `<MathBlock>` | KaTeX | Math-heavy posts |
| `<MermaidDiagram>` | Mermaid.js | Architecture posts |
| `<CodePlayground>` | Sandpack | All technical posts |
| `<EmbeddingVisualizer>` | D3.js | Embeddings post |
| `<ConceptCard>` | CSS animation | All posts (collapsible) |
| `<RAGDemo>` | Custom (calls AI worker) | RAG post |
| `<CostCalculator>` | React island | Token economics post |
| `<PerformanceChart>` | Recharts | Vector DB comparison |
| `<QuizBlock>` | React island | Revision-mode testing |

---

## File Structure

```
blog.seemakurthi/
├── src/
│   ├── pages/
│   │   ├── index.astro            ← Blog listing
│   │   ├── tags/[tag].astro       ← Tag filter pages
│   │   └── [slug].astro           ← Individual post
│   ├── content/
│   │   └── posts/
│   │       ├── rag-from-scratch.mdx
│   │       └── ...
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── TableOfContents.astro
│   │   ├── modes/
│   │   │   ├── RevisionOnly.astro
│   │   │   ├── StudyOnly.astro
│   │   │   ├── CatchUpMode.tsx    ← React island (needs interactivity)
│   │   │   └── ModeSelector.tsx   ← Tab switcher
│   │   ├── interactive/
│   │   │   ├── EmbeddingVisualizer.tsx
│   │   │   ├── CodePlayground.tsx
│   │   │   ├── MermaidDiagram.astro
│   │   │   ├── MathBlock.astro
│   │   │   └── ConceptCard.astro
│   │   ├── Subscribe.astro        ← Buttondown embed
│   │   └── Comments.astro         ← Remark42 embed
│   ├── styles/
│   │   └── tokens.css             ← Shared design tokens (same as hub)
│   └── lib/
│       ├── auth.ts                ← Better Auth (Phase 3)
│       └── posts.ts               ← Post collection helpers
├── public/
│   └── rss.xml                    ← Auto-generated by Astro
├── astro.config.mjs
├── package.json
└── README.md
```

---

## Listing Page (index.astro)

```
┌──────────────────────────────────────────┐
│ BLOG                                     │
│ "Notes on building AI systems"           │
├──────────────────────────────────────────┤
│ [All] [Technical] [MLOps] [Career]       ← category filter
│ [Beginner] [Intermediate] [Advanced]     ← difficulty filter
├──────────────────────────────────────────┤
│ FEATURED                                 │
│ Latest post — full card                  │
├──────────────────────────────────────────┤
│ ALL POSTS (grid)                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐  │
│ │ title    │ │ title    │ │ title    │  │
│ │ tag      │ │ tag      │ │ tag      │  │
│ │ X min    │ │ X min    │ │ X min    │  │
│ └──────────┘ └──────────┘ └──────────┘  │
└──────────────────────────────────────────┘
```

Search: Pagefind (static, zero-cost, built at Astro build time)

---

## Comments — Remark42

**Why Remark42:** Full REST API lets the admin AI agent query comment themes.  
**Who can comment:** Anyone with Google, GitHub, or email login (low friction).

```astro
<!-- Comments.astro -->
<div id="remark42" />
<script>
  var remark_config = {
    host: 'https://comments.seemakurthi.com',  // self-hosted on VPS
    site_id: 'blog',
    components: ['embed']
  };
  // ... load remark42 script
</script>
```

**Data pipeline to admin AI:**
```
Remark42 REST API → fetch comments for slug → extract questions/themes
→ groq/compound: "What are readers asking most about this post?"
→ Admin dashboard: "Readers want more on chunking strategies"
→ Kushal: write follow-up post
```

---

## Auth & Gating (Phase 3 additions)

### Better Auth setup
```ts
// lib/auth.ts
import { betterAuth } from 'better-auth';
import { D1Adapter } from 'better-auth/adapters/cloudflare-d1';

export const auth = betterAuth({
  database: D1Adapter(env.DB),
  socialProviders: {
    google: { clientId: env.GOOGLE_ID, clientSecret: env.GOOGLE_SECRET }
  },
  plugins: [magicLink()]
});
```

### Role-based gating
```astro
---
// [slug].astro
import { getSession } from '../lib/auth';
const session = await getSession(Astro.request);
const canAccessStudy = ['tier1', 'tier2'].includes(session?.user?.role);
---

{canAccessStudy ? (
  <StudyContent />
) : (
  <StudyTeaser />  // shows 20% + subscribe CTA
)}
```

---

## Polar.sh Subscription Products

```
Product 1: "Study Mode Access"
  Price: ~$7/mo or $60/yr
  Benefits: Full Study mode content on all posts

Product 2: "AI Tutor Access"
  Price: ~$17/mo or $150/yr  
  Benefits: Study Mode + Voice AI Catch Up on all posts
```

Webhook flow:
```
Polar subscription created →
  POST /api/webhooks/polar →
  Worker validates signature →
  Update user.role in D1 ('tier1' or 'tier2') →
  User refreshes → Study mode unlocks
```

---

## Deployment

```
Cloudflare Pages settings:
  Build command:     npx astro build
  Output directory:  dist
  Node version:      20

Environment variables (added per phase):
  Phase 0: REMARK42_HOST
  Phase 3: BETTER_AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
           POLAR_WEBHOOK_SECRET
  Phase 4: OPENAI_API_KEY (TTS)
  Phase 5: GROQ_API_KEY, VECTORIZE_INDEX_NAME

Custom domain:
  blog.seemakurthi.com → CF Pages deployment
```

---

## Phase Roadmap for Blog

| Phase | What's Built |
|-------|-------------|
| **0** | Repo setup, base template, Revision mode only, 1 post, Remark42 |
| **1** | 8–10 posts, Study mode UI (ungated), interactive components |
| **2** | Search (Pagefind), tag pages, related posts, TOC |
| **3** | Better Auth, Polar.sh, Study mode gated behind Tier 1 |
| **4** | Catch Up mode (voice AI), Tier 2 gate |
| **5** | AI sync pipeline, Vectorize knowledge base |
| **6** | Admin panel, admin AI agent tools |

---

## Done Criteria (Phase 0)

- [ ] blog.seemakurthi.com loads with listing page
- [ ] First post readable in Revision mode
- [ ] Remark42 comments visible below post
- [ ] Subscribe button submits to Buttondown
- [ ] Hub + Portfolio links in header work
- [ ] Lighthouse ≥90 (Astro static)
- [ ] RSS feed at /rss.xml (Astro generates this)
- [ ] Mobile layout clean (375px)
