# Development Documentation

Patterns, workflows, testing strategies, and best practices learned during portfolio development.

---

## Core Documents

- **[Testing Checklist](testing-checklist.md)** — Phase-by-phase QA verification (Lighthouse targets, real-device testing, accessibility)
- **[Web Dev Patterns](web-dev-patterns.md)** — Reusable React + motion/react patterns (scroll architecture, component design, state management)
- **[Git Workflow](git-workflow.md)** — Branch strategy, commit message format, deployment flow

---

## Key Patterns

### Scroll Architecture (motion/react)
- Single global `useScroll()` in App.tsx
- `activeSection` state derived via fixed 20% bucket thresholds (0.125, 0.375, 0.625, 0.875)
- Per-component local scroll listeners via `useScroll({ target: containerRef })`
- **Rule:** Never create competing scroll listeners

### Component Hierarchy
```
Section (parallax wrapper)
├── Hero (no motion, above-fold)
└── Content (fade + parallax)

Interactive Elements
├── InteractiveCard (mouse-tracking 3D tilt)
├── ExperienceStack (3D carousel, wheel-driven)
└── ProjectsTrain (infinite marquee)
```

### State Management
- Global scroll: motion/react hooks
- Local animation: useMotionValue + useSpring
- UI feedback: React useState (transient states like "copied")

---

## Testing Strategy

**Pre-commit:**
- `npm run lint` (type checking)
- `npm run build` (production build)
- Manual smoke test (scroll, hover, click)
- Browser console clean (no errors/warnings)

**Phase gates:**
- **Phase 1 (Week 3):** Stranger test (3 non-developers, open feedback)
- **Phase 2 (Weekly):** Lighthouse ≥85 mobile / ≥90 desktop
- **Phase 3 (Week 8):** Accessibility (axe-core, keyboard navigation, screen reader)
- **Phase 4 (Week 10):** Performance budgets, real-device testing, production deployment

**Real-device matrix:**
- iPhone 12+ (iOS)
- Pixel 5+ (Android)
- iPad (2020+)
- MacBook (2018+)
- Windows desktop

---

## Common Pitfalls & Fixes

| Problem | Root Cause | Solution |
|---------|-----------|----------|
| Jank on scroll | Competing scroll listeners | Single useScroll() in App; pass state as props |
| Marquee bounces | Only one CardList set | Duplicate both sets for seamless loop |
| PNG not committed | .gitignore *.png | Add !public/ and !public/*.png negation |
| Branch checkout fails | Untracked files conflict | rm auto-generated files before checkout |

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse (mobile) | ≥85 |
| Lighthouse (desktop) | ≥90 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| JS bundle (gzipped) | < 2.5 MB |
| Total assets | < 8 MB |

---

## Deployment Pipeline

1. **Local development:** `npm run dev` (Vite on localhost:3000)
2. **Build verification:** `npm run build` (produces dist/)
3. **Performance check:** Lighthouse audit before push
4. **Git workflow:** Feature branch → PR review → merge to main
5. **Deploy:** Cloudflare Pages auto-deploys on main branch push
6. **Post-deploy:** Verify production URL, test on real device, monitor errors

---

## For AI Agents

**Implementing a new component?**
1. Check [Web Dev Patterns](web-dev-patterns.md) for scroll/animation patterns
2. Follow component boundary rules (one responsibility per component)
3. Use Tailwind v4 syntax (no config file)
4. Test on mobile first

**Optimizing performance?**
1. Review [Testing Checklist](testing-checklist.md) Phase 4
2. Run `vite build --mode analyze` to find bundle bloat
3. Lazy-load non-critical features
4. Use motion/react transforms (not React state) for animations

**Debugging scroll issues?**
1. Verify single useScroll() in App.tsx
2. Check for competing motion value listeners
3. Log activeSection state at key scroll progress values
4. Test on real device (DevTools emulation can hide issues)

**Before committing?**
1. Run full test checklist from [Testing Checklist](testing-checklist.md)
2. Follow commit message format from [Git Workflow](git-workflow.md)
3. Verify no secrets in .env files
4. Test locally on phone (or DevTools mobile view)
