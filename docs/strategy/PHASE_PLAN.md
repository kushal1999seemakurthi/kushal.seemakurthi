# Phased Build Plan — Content First, Monetization Later

**Last updated:** 2026-05-10  
**Philosophy:** Ship working content fast. Prove readers want depth before building subscription infrastructure.

---

## Why Content First?

Building auth + payments + voice AI before having readers is backwards. No one subscribes to an empty blog.

**Sequence logic:**
1. Publish good Revision-mode content → readers arrive
2. Readers engage (comments, shares, newsletter) → validate demand
3. Build Study mode → gate it, launch Tier 1
4. Voice AI → launch Tier 2 for power users
5. Admin AI → optimize based on real data

Every phase delivers something shippable. No phase requires the previous one to be perfect.

---

## Phase 0 — Foundation (Weeks 1–2)

**Goal:** Hub live, blog skeleton live, first post published.

### Hub (seemakurthi.com)
- [ ] Create `hub.seemakurthi.com` Astro repo
- [ ] Hero section: name, role, one-liner
- [ ] Two CTAs: "See my work" → portfolio, "Read my thinking" → blog
- [ ] Static placeholder where latest posts will appear (empty for now)
- [ ] Newsletter signup (Buttondown embed — free to start)
- [ ] Deploy to Cloudflare Pages

### Blog (blog.seemakurthi.com)
- [ ] Create `blog.seemakurthi.com` Astro + MDX repo
- [ ] Base template: header (hub + portfolio links) + subscribe bar + footer
- [ ] Revision mode layout only (no auth, no gates)
- [ ] Frontmatter schema defined (see BLOG_PLAN.md)
- [ ] Write and publish **1 post in Revision mode**: "RAG from Scratch"
- [ ] Remark42 comments installed (self-hosted VPS)
- [ ] Deploy to Cloudflare Pages

### Done Criteria
```
- seemakurthi.com loads; both CTAs navigate correctly
- blog.seemakurthi.com loads; 1 post readable
- No console errors, no broken links
- Lighthouse ≥80 on both
- Remark42 comments visible under first post
```

---

## Phase 1 — Content Velocity (Weeks 3–8)

**Goal:** Publish 8–10 posts covering core ML/AI topics. Build the Study mode template. No auth yet — all content free.

### Content (Bi-weekly cadence)
Write each post in **both** Revision and Study mode formats simultaneously (not one then the other):
- [ ] "Fine-tuning vs RAG: when to use which"
- [ ] "Vector databases compared: Pinecone vs Weaviate vs Chroma"
- [ ] "Chunking strategies for production RAG systems"
- [ ] "LLM token economics: what you're actually paying for"
- [ ] "Building a production MLOps pipeline from scratch"
- [ ] "Evaluation frameworks for LLMs (RAGAS, DeepEval, custom)"
- [ ] "Multi-agent systems: orchestration patterns"
- [ ] "Embeddings explained visually" (first interactive component)
- [ ] "The ML project lifecycle: from notebook to prod"

### Technical (Build Study Mode UI)
- [ ] Mode selector component (Revision / Study / Catch Up tabs at top of post)
- [ ] Study mode content wrapper (shows extended content)
- [ ] Catch Up mode placeholder (grayed out, "Coming soon — subscribe")
- [ ] First interactive component: `<EmbeddingVisualizer>` (D3.js, 2D scatter plot)
- [ ] `<CodePlayground>` via Sandpack (run code in browser)
- [ ] `<MathBlock>` via KaTeX
- [ ] `<MermaidDiagram>` for architecture diagrams
- [ ] Hub: wire blog RSS to show latest 3 posts dynamically

### Done Criteria
```
- 8+ posts published (Revision mode)
- 3+ posts have Study mode content written (not gated yet)
- 2+ interactive components working in Study mode
- Newsletter has first 50 subscribers
- Comments section active on popular posts
```

---

## Phase 2 — Community (Weeks 9–10)

**Goal:** Validate engagement signals before building subscription infrastructure.

### Community Health Checks
- [ ] Review comment quality on top 3 posts — are readers asking substantive questions?
- [ ] Extract top comment themes → AI admin pipeline prototype (manual for now)
- [ ] Newsletter open rate > 30%? Click rate > 5%?
- [ ] Which posts drove most time-on-page? (Cloudflare Analytics)

### Polish
- [ ] Related posts sidebar (from frontmatter `related` field)
- [ ] Tag/category filter page at `/blog/tags`
- [ ] Search (Pagefind — static, free, built at build time)
- [ ] Table of contents (auto-generated from headings, sticky sidebar)
- [ ] Reading progress bar

### Decision Gate
**Proceed to Phase 3 if:** ≥200 newsletter subscribers AND average session > 3 min on Study mode posts AND readers actively asking questions in comments.

**Adjust if:** Engagement low → revisit content topics based on what readers comment about most.

---

## Phase 3 — Monetization Infrastructure (Weeks 11–14)

**Goal:** Add auth + payment + content gating. Gate Study mode behind Tier 1.

### Auth (Better Auth)
- [ ] Install Better Auth in blog repo
- [ ] Configure Cloudflare D1 adapter (user sessions + roles table)
- [ ] Google OAuth login
- [ ] Email magic link login (for non-Google users)
- [ ] User role schema: `free | tier1 | tier2`

### Payments (Polar.sh)
- [ ] Create Polar.sh organization: seemakurthi
- [ ] Define Tier 1 product: "Study Mode Access" (~$5-9/mo)
- [ ] Polar.sh webhook → Worker → update user role in D1 on subscription
- [ ] Subscriber management dashboard on Polar.sh

### Content Gating
- [ ] Middleware: check auth + role before serving Study mode content
- [ ] Graceful fallback: Study mode teaser shows 20% of content + subscribe CTA
- [ ] "Already subscribed? Log in" prompt
- [ ] Post list: lock icon on Study mode posts for non-subscribers
- [ ] Grace period: 30 days free Study mode for existing newsletter subscribers

### Email
- [ ] Transactional emails via Buttondown or Resend (subscription confirmation, billing)
- [ ] "Welcome to Study Mode" onboarding email sequence (3 emails)

### Done Criteria
```
- User can sign up, log in, see their tier
- Stripe test checkout completes
- After payment, Study mode unlocks immediately (webhook <5s)
- Grace period works for newsletter subscribers
- Lighthouse score unchanged after auth additions
```

---

## Phase 4 — Voice AI / Catch Up Mode (Weeks 15–18)

**Goal:** Build and ship the Tier 2 voice-driven AI tutor.

### Polar.sh Tier 2
- [ ] Define Tier 2 product: "AI Tutor Access" (~$14-19/mo)
- [ ] Tier 2 includes Tier 1 benefits
- [ ] Upgrade flow for existing Tier 1 subscribers

### Voice Pipeline
- [ ] Mic button UI in Catch Up mode tab
- [ ] Web Speech API integration (browser STT, free)
- [ ] POST transcript to Cloudflare Worker endpoint
- [ ] Worker: fetch current post context from Vectorize → groq/compound → response text
- [ ] OpenAI TTS: convert response text → audio stream → play in browser
- [ ] Conversation history: last 5 exchanges (context window management)
- [ ] Fallback: text input if user denies mic permission

### UX
- [ ] "Listening..." visual indicator
- [ ] AI "thinking" state
- [ ] Audio playback controls (pause, replay)
- [ ] Session transcript saved locally (localStorage, not server)

### Done Criteria
```
- Full voice cycle works: speak → transcript → AI response → audio reply
- Gated behind Tier 2 auth check
- Latency: user hears response < 5s after speaking
- Works on Chrome, Safari mobile (Web Speech API support)
- Fallback text input functional
```

---

## Phase 5 — Cross-Surface AI Brain (Weeks 19–22)

**Goal:** Vectorize index knows everything about portfolio + hub + blog. AI features on portfolio go live.

### Knowledge Sync Pipeline
- [ ] GitHub Action in each repo (portfolio, hub, blog)
- [ ] On push to main: extract content → chunk → embed → POST to sync Worker
- [ ] Worker: upsert into Vectorize with metadata `{ source, url, title, date }`
- [ ] Initial bulk embed: all existing blog posts + portfolio content

### Portfolio AI Features
- [ ] Resume Analyzer backend (Worker: PDF upload → groq extract skills → compare → analysis)
- [ ] Resume Analyzer frontend (upload component + results display)
- [ ] "Ask Kushal" chat on portfolio (queries cross-surface Vectorize)

### Hub Updates
- [ ] "Ask me anything" chat on hub (simple UI, full AI brain behind it)

### Done Criteria
```
- Resume Analyzer: upload PDF → receive skill gap report < 15s
- Vectorize search returns relevant chunks from correct source surface
- Sync pipeline fires automatically on any push (test with test post)
```

---

## Phase 6 — Admin AI Assistant (Weeks 23–26)

**Goal:** Kushal has an AI copilot for blog management, analytics, and content strategy.

### Admin Panel
- [ ] `/admin` route (Cloudflare Access → Google auth gate)
- [ ] Dashboard: post list, subscriber count, top posts by engagement
- [ ] Draft posts visible (frontmatter `status: draft`)
- [ ] Edit buttons on each section (links to GitHub file edit)

### Admin AI Agent
- [ ] Sidebar panel with chat interface (admin only)
- [ ] Tool: `navigate_to(url)` — AI navigates admin panel
- [ ] Tool: `fetch_analytics(period, metric)` — queries Cloudflare Analytics
- [ ] Tool: `list_comments(post_slug)` — queries Remark42 API
- [ ] Tool: `suggest_post(context)` — queries comment themes + analytics → LLM suggestion
- [ ] Tool: `enhance_post(slug, section)` — reads post + suggests improvements

### Content Strategy Loop
```
Weekly: Admin AI surfaces top comment questions
  → Kushal picks 1 → writes new post addressing it
  → AI agent validates: "Does this post answer the question?"
  → Publish
```

### Done Criteria
```
- Admin login works (Google account only)
- Dashboard shows real data (not mock)
- Agent can navigate, fetch analytics, and list comments via natural language
- Post suggestion pipeline runs weekly (or on demand)
```

---

## Summary Timeline

| Phase | Weeks | What Ships | Revenue Impact |
|-------|-------|-----------|---------------|
| **0: Foundation** | 1–2 | Hub live, blog live, 1 post | $0 |
| **1: Content** | 3–8 | 8–10 posts, Study mode UI | $0 (free) |
| **2: Community** | 9–10 | Comments, search, polish | $0 |
| **3: Monetize** | 11–14 | Tier 1, auth, payments | First $ |
| **4: Voice AI** | 15–18 | Tier 2, Catch Up mode | MRR grows |
| **5: AI Brain** | 19–22 | Cross-surface AI, Resume Analyzer | — |
| **6: Admin AI** | 23–26 | Admin copilot, analytics | Efficiency |

**Rule:** Never skip to the next phase unless done criteria of current phase are met.

---

## Content Calendar (Phase 0–1 Posts)

| # | Title | Mode | Interactive Component |
|---|-------|------|--------------------|
| 1 | RAG from Scratch | Revision + Study | MermaidDiagram (RAG flow) |
| 2 | Fine-tuning vs RAG | Revision + Study | Comparison table |
| 3 | Vector DBs Compared | Revision + Study | Performance chart (D3) |
| 4 | Chunking Strategies | Revision + Study | CodePlayground |
| 5 | LLM Token Economics | Revision + Study | Cost calculator |
| 6 | Production MLOps | Revision + Study | MermaidDiagram |
| 7 | LLM Evaluation Frameworks | Revision + Study | RAGAS demo |
| 8 | Multi-Agent Patterns | Revision + Study | Architecture viz |
| 9 | Embeddings Visually | Revision + Study | EmbeddingVisualizer (D3) |
| 10 | ML Project Lifecycle | Revision + Study | Timeline component |
