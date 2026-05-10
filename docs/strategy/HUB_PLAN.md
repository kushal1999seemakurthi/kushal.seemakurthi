# Hub Plan — seemakurthi.com

**Last updated:** 2026-05-10  
**Repo:** `hub.seemakurthi/` (to be created)  
**Deploy target:** seemakurthi.com (Cloudflare Pages)

---

## Purpose

The hub is a one-page gateway. It answers: *"Who is this person and where do I go?"*

It does not host content. It routes visitors to the right surface and gives enough context to make that choice meaningful.

---

## Repo Setup

```bash
# Create alongside existing repos
cd ~/Desktop/Claude/Portfolio
npm create astro@latest hub.seemakurthi -- --template minimal --typescript strict
cd hub.seemakurthi
npx astro add tailwind
git init && git branch -M main
```

**Stack:** Astro 4 + Tailwind CSS v4  
**Deploy:** Cloudflare Pages (auto-deploy on main push)  
**Domain:** seemakurthi.com → Cloudflare CNAME

---

## Page Structure

Single page. No routing. Loads fast — Astro ships zero JS by default.

```
┌──────────────────────────────────────────┐
│  HEADER                                  │
│  seemakurthi.com          [Newsletter ↗] │
├──────────────────────────────────────────┤
│  HERO                                    │
│                                          │
│  Hi, I'm Kushal.                         │
│  Senior Data Scientist.                  │
│  I build AI systems and write about it.  │
│                                          │
│  [See my work ↗]   [Read my thinking ↗] │
├──────────────────────────────────────────┤
│  LATEST FROM THE BLOG (3 posts via RSS)  │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │ Post 1   │ │ Post 2   │ │ Post 3   │ │
│  │ tag      │ │ tag      │ │ tag      │ │
│  └──────────┘ └──────────┘ └──────────┘ │
├──────────────────────────────────────────┤
│  NEWSLETTER CTA                          │
│  "Weekly notes on AI systems"            │
│  [Email input]  [Subscribe]              │
├──────────────────────────────────────────┤
│  FOOTER                                  │
│  LinkedIn  GitHub  Email                 │
└──────────────────────────────────────────┘
```

---

## Content

### Hero Copy
```
Hi, I'm Kushal Kumar Seemakurthi.
Senior Data Scientist — building production AI systems
at the intersection of LLMs, RAG, and MLOps.

→ See my work     (kushal.seemakurthi.com)
→ Read my thinking (blog.seemakurthi.com)
```

### Latest Posts (dynamic via RSS)
- Fetches `blog.seemakurthi.com/rss.xml` at build time
- Shows: title, date, tag, read time
- Falls back to static links if RSS unavailable
- Astro's `fetch()` at build time = zero client JS

### Newsletter (Buttondown)
- Embed Buttondown's form widget
- No custom auth needed — Buttondown handles it
- Subscriber data owned by you (Buttondown exports cleanly)

---

## Shared Design Tokens

Match the blog's visual language:

```css
/* tokens.css — copy to both hub and blog */
--font-serif: 'Playfair Display', Georgia, serif;
--font-sans: 'Inter', system-ui, sans-serif;
--color-text: #1a1a1a;
--color-muted: #6b7280;
--color-accent: #2563eb;
--color-surface: #ffffff;
--color-border: #e5e7eb;
```

---

## Files to Create

```
hub.seemakurthi/
├── src/
│   ├── pages/
│   │   └── index.astro       ← Single page
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── LatestPosts.astro  ← fetches RSS
│   │   ├── Newsletter.astro   ← Buttondown embed
│   │   └── Footer.astro
│   └── styles/
│       └── tokens.css
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── README.md
```

---

## RSS Integration

```astro
---
// LatestPosts.astro
const rss = await fetch('https://blog.seemakurthi.com/rss.xml');
const text = await rss.text();
// parse XML, extract top 3 items
// during Phase 0: returns empty → show placeholder
---
```

Phase 0: hardcode 1 post link as placeholder  
Phase 1: wire RSS once blog has multiple posts

---

## Deployment

```
Cloudflare Pages settings:
  Build command:     npx astro build
  Output directory:  dist
  Node version:      20

Custom domain:
  seemakurthi.com → CF Pages deployment
  (apex domain requires DNS A record or CF proxied CNAME workaround)
```

---

## Phase Roadmap for Hub

| Phase | Changes |
|-------|---------|
| **0** | Hero + 2 CTAs + placeholder blog section + newsletter |
| **1** | Wire RSS (show 3 real posts dynamically) |
| **3+** | Add subscriber count ("Join 200 readers") |
| **5+** | "Ask me anything" input (routes to cross-surface AI) |

---

## Done Criteria (Phase 0)

- [ ] seemakurthi.com loads < 1s (LCP)
- [ ] Both CTAs navigate to correct domains
- [ ] Newsletter form submits (Buttondown confirmation email received)
- [ ] Mobile layout clean (375px)
- [ ] Lighthouse ≥95 (Astro static should be trivial)
- [ ] No broken links
