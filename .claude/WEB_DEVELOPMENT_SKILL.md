# Web Development Skill — Reusable Framework

A comprehensive skill guide for modern web development projects based on proven patterns, testing methodologies, and development cycles.

---

## Development Cycle (8-week Evening Cadence)

### Phase 0 — Foundation (Week 1)
**Goal**: Establish scaffolding and verify build pipeline.

**Deliverables**:
- Clean git branch from main
- Stack configs copied and verified (`package.json`, `vite.config.ts`, `tsconfig.json`)
- Single root component with minimal interactivity
- Build, lint, dev scripts all passing
- Type checking: `tsc --noEmit` → exit 0

**Done Criteria**:
```bash
npm install        # No peer dependency warnings
npm run dev        # Opens browser on localhost:3000 (or next available port)
npm run lint       # tsc --noEmit exits with 0
npm run build      # vite build produces dist/ without errors
```

### Phase 1 — Vertical Slice + Kill/Proceed Gate (Weeks 2–3)
**Goal**: Build 1–2 core features end-to-end; test with real users before continuing.

**Deliverables**:
- One complete user journey (hero section → CTA → interaction)
- Placeholder for remaining sections
- All contact/link constants centralized (`constants.ts`)
- Responsive design on desktop + mobile
- No browser console errors or warnings

**Kill/Proceed Gate** (end of week 3):
- **Test with 3 strangers**: Open the site fresh, ask: "What do you think this is about? How does it feel?"
- **Proceed criteria**: At least 2 of 3 respond positively (e.g., "beautiful", "intuitive", "engaging"); no one complains about readability, performance, or motion sickness
- **Pivot criteria**: Anyone says "confusing", "slow", "hard to read", or performance drops below 30 fps on real device
- **Pivot path**: Reduce ambition (swap fancy animations for simpler approach); keep core architecture

### Phase 2 — Feature Complete (Weeks 4–7)
**Goal**: Build all remaining sections with consistent visual language.

**Deliverables**:
- All primary sections functional
- Cross-section transitions smooth (no hard cuts, no jank)
- Responsive layout verified on phone/tablet/desktop
- Asset management finalized (images, icons, colors centralized)
- No layout shift during load

**Testing**:
- **Lighthouse**: ≥85 mobile / ≥90 desktop (paint, FCP, LCP)
- **Real devices**: iPhone 12, Pixel 5, iPad, Mac, Windows
- **Browsers**: Chrome, Firefox, Safari latest

### Phase 3 — Accessibility & Recruiter Route (Week 8)
**Goal**: Make the site inclusive and recruiter-friendly.

**Deliverables**:
- Keyboard navigation: Tab through all interactive elements in order
- Screen reader support: Semantic HTML, ARIA labels where needed
- Recruiter quick path: `/resume` downloads PDF or links to external resume
- Reduced-motion fallback: Static HTML version if JS animations disabled
- Dark mode support (optional): `prefers-color-scheme: dark` respected

**Testing**:
- axe-core scan: zero critical violations
- WAVE evaluation: no contrast errors
- Manual keyboard test: all interactive elements reachable via Tab

### Phase 4 — Performance & Ship (Weeks 9–10)
**Goal**: Optimize bundle, validate performance budgets, deploy.

**Deliverables**:
- `vite build --mode analyze`: identify and tree-shake unused code
- Lazy-load non-critical modules (e.g., 3D scenes, heavy animations)
- Image optimization: WebP/AVIF with fallbacks
- Asset hashing: `vite.config.ts` configures immutable cache headers
- Production deploy via Cloudflare Pages / Vercel / similar

**Testing**:
- Bundle analysis: total JS < 2.5 MB gzipped
- Lighthouse full audit: ship when ≥85 mobile / ≥90 desktop
- Real 3G + 4× CPU throttle: still usable
- Monitoring: Sentry or similar error tracking enabled

---

## Core Principles

### 1. Single Source of Truth
- **Contacts**: `src/constants.ts` (email, links, resume path)
- **Copy**: Centralized in data files or components, never hardcoded across templates
- **Colors**: Tailwind `@theme` tokens in `index.css`, not raw hex scattered in JSX
- **Navigation**: Defined once in config, used everywhere

**Pattern**:
```ts
// src/constants.ts
export const EMAIL = 'user@example.com';
export const LINKEDIN = 'https://linkedin.com/in/user';

// App.tsx
import { EMAIL, LINKEDIN } from './constants';
const handleEmail = () => navigator.clipboard.writeText(EMAIL);
```

### 2. Scroll Architecture
- One global `useScroll()` in the root component
- Derive `activeSection` from scroll progress via discrete buckets (20% per section)
- Pass `activeSection` down as prop; never create competing scroll listeners
- Per-component parallax via local `useScroll({ target: containerRef })`

**Pattern**:
```tsx
// App.tsx
const { scrollYProgress } = useScroll();
const [activeSection, setActiveSection] = useState(0);
useMotionValueEvent(scrollYProgress, "change", (latest) => {
  if (latest < 0.125) setActiveSection(0);
  // ... rest of buckets
});

// Section.tsx
<Section activeSection={activeSection} id="about">
  {/* Section-local parallax */}
</Section>
```

### 3. Component Boundaries
- **Container** (`Section.tsx`): Handles scroll parallax, layout grid, responsive
- **Interactive** (`InteractiveCard.tsx`): Mouse hover effects, 3D tilt, focus states
- **Data Display** (`ProjectList.tsx`): Map over arrays, render items, no internal state
- **Micro-interaction** (`EmailButton.tsx`): Copy, feedback, state reset

**Rule**: A component does one thing well. Avoid God components.

### 4. State Management
- **Global scroll**: `useScroll()` + `useMotionValueEvent()` in App.tsx
- **Local animation**: `useMotionValue()` + `useSpring()` within component
- **UI feedback**: React `useState()` for transient states (email copied, menu open)
- **Never**: Competing timelines, manual RAF loops, context for global scroll

### 5. Responsive Design
- **Mobile-first**: Write styles for small screens first, add `md:` / `lg:` breakpoints
- **Grid-based**: Use Tailwind's 16-column grid for consistency
- **Test early**: Run `npm run dev` on actual phone (or Chrome DevTools) by week 2
- **Touch-friendly**: Buttons ≥44×44 px, tap targets well-spaced

**Pattern**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-16 gap-4">
  <div className="md:col-start-2 md:col-span-6">Mobile: full width; Desktop: col 2–7</div>
</div>
```

---

## Testing Strategy

### Unit Testing
- **What**: Individual components, utility functions
- **Tool**: Jest + React Testing Library (optional; not enforced if no test runner configured)
- **Coverage target**: ≥80% for business logic
- **Smoke test**: At least one test per major component

### Integration Testing
- **What**: Multi-component workflows (scroll triggers animation, button opens email, form submits)
- **Tool**: Playwright or Cypress (optional; manual testing acceptable for small sites)
- **Coverage**: Each user journey at least once
- **Performance**: No long tasks (> 50ms) during interactions

### Visual Regression Testing
- **What**: Screenshots of components/sections at key breakpoints
- **Tool**: Percy CI, Chromatic, or manual browser screenshots
- **Cadence**: After major layout changes
- **Platforms**: Desktop (1440px), Tablet (768px), Mobile (375px)

### Performance Testing
- **What**: Lighthouse scores, Core Web Vitals, bundle size
- **Tool**: Lighthouse CI, vite build analysis, Web Vitals npm package
- **Targets**:
  - LCP (Largest Contentful Paint): < 2.5s
  - FID (First Input Delay): < 100ms
  - CLS (Cumulative Layout Shift): < 0.1
  - Bundle (gzipped): < 2.5 MB (JS)
- **Cadence**: Before every deploy

### Accessibility Testing
- **What**: Keyboard navigation, screen reader, contrast, semantic HTML
- **Tool**: axe DevTools, WAVE, manual keyboard test
- **Cadence**: Weekly during development
- **Fix priority**: Critical (missing alt text) > Major (contrast fails) > Minor (suboptimal ARIA)

### User Testing
- **Kill/Proceed Gate** (week 3): 3 strangers, open-ended feedback
- **Beta Launch** (week 8): 5–10 target users, feature-specific tasks
- **Post-Launch** (ongoing): Analytics (page views, scroll depth, CTA clicks), error tracking (Sentry)

---

## Code Quality Standards

### Naming Conventions
- **Components**: PascalCase (`InteractiveCard`, `ProjectList`)
- **Constants**: UPPER_SNAKE_CASE (`RESUME_URL`, `MAX_ITEMS`)
- **Variables**: camelCase (`isOpen`, `scrollProgress`)
- **CSS classes**: kebab-case (`text-shadow-sm`, `pause-marquee`)

### File Organization
```
src/
├── App.tsx                   # Root, scroll state, layout
├── constants.ts              # All non-secret config (links, paths, copy)
├── components/               # Reusable UI components
│   ├── Section.tsx           # Layout wrapper with parallax
│   ├── InteractiveCard.tsx   # 3D hover card
│   ├── ProjectList.tsx       # Data display + mapping
│   └── ...
├── hooks/                    # Custom hooks (useScroll, useBreakpoint, etc.)
├── styles/                   # Global styles, @theme tokens, @keyframes
└── utils/                    # Pure functions (formatDate, clamp, etc.)
```

### Comments
- **Do**: Explain the WHY (business logic, constraint, workaround)
- **Don't**: Explain the WHAT (code is self-documenting via naming)
- **Example**:
  ```tsx
  // Clamping to prevent carousel from overshooting (physics constraint)
  const normalized = Math.max(0, Math.min(1, progress));
  
  // Bad:
  // Set max-width to 100%
  const maxWidth = '100%';  // DON'T DO THIS
  ```

### Commit Messages
```
type(scope): subject (50 chars max)

Detailed explanation (72 chars per line). Explain why, not what.
- Bullet 1
- Bullet 2

Fixes #123
Co-Authored-By: Collaborator <email@example.com>
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `perf`, `test`, `chore`

---

## Common Patterns & Anti-Patterns

### Pattern: Centralized Constants
✅ **Good**:
```ts
export const ROUTES = { home: '/', about: '/about', resume: '/resume' };
export const EMAIL = 'contact@example.com';
// Use everywhere
<a href={ROUTES.resume} download="Resume.pdf">Download</a>
```

❌ **Bad**:
```tsx
// Scattered across components
<a href="/about">About</a>
<a href={`mailto:contact@example.com`}>Email</a>
```

### Pattern: Motion Value Transforms
✅ **Good**:
```tsx
const x = useMotionValue(0);
const borderWidth = useTransform(x, [-0.5, 0.5], [1, 8]);  // No re-render
```

❌ **Bad**:
```tsx
const [x, setX] = useState(0);
const borderWidth = x * 14 + 1;  // Re-renders on every motion update
```

### Pattern: Responsive Grid
✅ **Good**:
```tsx
<div className="grid grid-cols-1 md:grid-cols-16 gap-4">
  <div className="md:col-start-2 md:col-span-6">Left</div>
  <div className="md:col-start-9 md:col-span-8">Right</div>
</div>
```

❌ **Bad**:
```tsx
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
  {/* Inline styles, not responsive, hard to maintain */}
</div>
```

### Anti-Pattern: Multiple Scroll Listeners
❌ **Avoid**:
```tsx
// App.tsx
const { scrollYProgress } = useScroll();

// SomeSection.tsx
const { scrollYProgress: sectionProgress } = useScroll(); // COMPETING LISTENER
```

✅ **Do This Instead**:
```tsx
// App.tsx: single global useScroll()
const { scrollYProgress } = useScroll();
const [activeSection, setActiveSection] = useState(0);

// SomeSection.tsx: receive activeSection as prop
<Section activeSection={activeSection}>
  {/* Conditional rendering based on prop */}
</Section>
```

---

## Deployment Checklist

Before shipping:
- [ ] `npm run lint` passes (type check + ESLint)
- [ ] `npm run build` succeeds, dist/ is valid
- [ ] Lighthouse ≥85 mobile / ≥90 desktop
- [ ] Tested on real device (phone + desktop)
- [ ] axe-core scan: zero critical violations
- [ ] All links are live (no 404s)
- [ ] Meta tags (title, description, OG image) set
- [ ] Favicon present
- [ ] 404 page exists (for SPA routing)
- [ ] Sentry / error tracking configured
- [ ] Analytics (if needed) integrated and tested
- [ ] .env secrets not in repo

---

## Reuse Across Projects

To apply this skill to a new project:

1. **Copy CLAUDE.md structure** from this project (adapt stack/phases as needed)
2. **Copy Phase 0 scaffold**: Next.js / Vite / similar, with Tailwind + ESLint
3. **Copy component patterns**: InteractiveCard, Section, DataDisplay
4. **Copy constants.ts**: Adapt for new project's links/config
5. **Copy testing matrix**: Lighthouse + axe + manual device testing
6. **Copy commit message template**: Enforce via git hooks or code review checklist

---

## Quick Start for New Project

```bash
# Week 1: Foundation
npm install
npm run dev        # Verify
npm run lint       # Verify
npm run build      # Verify

# Create constants.ts
export const SITE_NAME = 'New Project';
export const EMAIL = 'contact@example.com';

# Create src/components/Section.tsx (parallax wrapper)
# Create src/components/InteractiveCard.tsx (hover effect)

# Create App.tsx with useScroll() + bucket-based activeSection
# Wire constants into App.tsx

# Weeks 2–3: One full feature + kill/proceed gate
# Weeks 4–7: Remaining features
# Week 8: A11y + recruiter path
# Weeks 9–10: Performance + ship
```

---

## References & Further Reading

- [motion/react Docs](https://motion.dev) — scroll tracking, transforms, springs
- [Tailwind CSS v4](https://tailwindcss.com) — @theme, @layer, JIT compilation
- [Web Vitals](https://web.dev/vitals) — LCP, FID, CLS targets and tooling
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref) — accessibility
- [Git Conventional Commits](https://www.conventionalcommits.org) — commit message spec
