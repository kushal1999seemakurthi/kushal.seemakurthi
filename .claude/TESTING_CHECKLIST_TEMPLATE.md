# Testing Checklist Template — Reusable Across Projects

Use this checklist at each phase to ensure quality gates are met.

---

## Pre-Commit Checklist (Every Commit)

- [ ] `npm run lint` passes (tsc + ESLint + Prettier)
- [ ] `npm run build` succeeds without errors or warnings
- [ ] Manual smoke test: feature works as expected in browser
- [ ] No `console.error` or `console.warn` in browser console
- [ ] No broken links or 404s
- [ ] Responsive design verified (resize browser to 375px, 768px, 1440px)

---

## Phase 0 Verification (Week 1)

### Build & Setup
- [ ] `npm install` completes without peer dependency warnings
- [ ] `npm run dev` opens browser on localhost:3000
- [ ] `npm run build` produces `dist/` folder
- [ ] `npm run lint` exits with 0
- [ ] `.gitignore` configured correctly (no node_modules, dist/, .env in repo)
- [ ] Git branch created from main, pushed to remote

### Initial Component
- [ ] Root component (`App.tsx`) loads without errors
- [ ] Placeholder section renders (text, basic styling)
- [ ] At least one call-to-action button functional (link or click handler)
- [ ] No layout shift on page load (CLS < 0.1)

---

## Phase 1 Verification (Weeks 2–3) + Kill/Proceed Gate

### Feature Complete
- [ ] Hero section: image + headline + 3 CTA buttons all functional
- [ ] Links work (Email opens mail app + copies to clipboard, LinkedIn/GitHub open new tab)
- [ ] Constants imported and used (no hardcoded links scattered in components)
- [ ] Responsive layout verified on 375px, 768px, 1440px viewports
- [ ] Mobile: all text readable without zoom, tap targets ≥44×44px

### Performance
- [ ] Lighthouse (Chrome DevTools, throttle to "Slow 4G + 4× CPU"):
  - FCP (First Contentful Paint): < 3s
  - LCP (Largest Contentful Paint): < 4s
- [ ] No long tasks (> 50ms) during interaction
- [ ] Asset sizes: images < 200 KB each, total bundle < 3 MB gzipped

### Accessibility
- [ ] Keyboard navigation: Tab through all buttons/links in order
- [ ] Focus visible: active element has visible outline
- [ ] Color contrast: text passes WCAG AA (≥4.5:1 for normal text)
- [ ] Alt text: all images have descriptive alt attributes

### Browser Compatibility
- [ ] Chrome latest: no console errors
- [ ] Firefox latest: no console errors
- [ ] Safari latest: layout correct, no rendering glitches
- [ ] Mobile Safari (iOS): touch interactions smooth, no viewport issues

### Kill/Proceed Gate (End of Week 3)
**Test with 3 non-developer users** (friends, colleagues, target audience):
1. Open site fresh in their browser (no instructions)
2. Ask open-ended: "What do you think this site is about? How does it feel?"
3. Record exact words — look for: "beautiful", "professional", "intuitive", "engaging"
4. Watch for: confusion, motion sickness, performance complaints

**Proceed**: ≥2 of 3 respond positively; no one complains about speed or usability  
**Pivot**: Anyone says "confusing", "slow", "hard to read"; FPS drops below 30 on real phone

---

## Phase 2 Verification (Weeks 4–7)

### Feature Completeness
- [ ] All 5 sections present and navigable
- [ ] Section transitions smooth (no jank, no hard cuts)
- [ ] All interactive elements functional (hover effects, clicks, scrolls)
- [ ] No placeholder text or broken references

### Responsive Design
- [ ] Mobile (375px): Single column layout, readable text, accessible buttons
- [ ] Tablet (768px): 2-3 column layout, balanced whitespace
- [ ] Desktop (1440px): Full layout, all features visible without scrolling past fold

### Visual Consistency
- [ ] Color palette consistent across sections (use constants or @theme tokens)
- [ ] Typography hierarchy clear (h1, h2, h3, body, caption all distinct)
- [ ] Spacing consistent (gaps, padding, margins aligned to 4px grid or similar)
- [ ] Image quality consistent (no pixelation, compression artifacts, or low res)

### Performance (Repeat from Phase 1)
- [ ] Lighthouse: ≥85 mobile / ≥90 desktop
- [ ] Core Web Vitals all green:
  - LCP < 2.5s
  - FID < 100ms (or INP < 200ms for newer metric)
  - CLS < 0.1
- [ ] Bundle size: JS gzipped < 2.5 MB
- [ ] No layout shifts during load or interaction

### Animation & Motion
- [ ] Scroll parallax smooth (60 fps, no jank)
- [ ] Hover effects instant (< 100ms response)
- [ ] Transitions between sections gradual (no hard cuts)
- [ ] Motion doesn't distract from content

### Testing on Real Devices
- [ ] **iPhone 12+**: all features work, layout correct, no horizontal scroll
- [ ] **Pixel 5+**: all features work, performance acceptable
- [ ] **iPad (2020+)**: layout scales correctly, touch interactions responsive
- [ ] **MacBook (2018+)**: 60 fps scrolling, no CPU spike
- [ ] **Windows (Ryzen 5, GTX 1660)**: 60 fps, no stuttering

---

## Phase 3 Verification (Week 8) — Accessibility & Recruiter Route

### Keyboard Navigation
- [ ] Tab order correct (moves left-to-right, top-to-bottom)
- [ ] Tab + Enter activates buttons
- [ ] Tab + Enter opens links (in same tab or new tab as expected)
- [ ] Escape closes any modals/overlays
- [ ] No keyboard traps (user can always Tab away)

### Screen Reader Support
- [ ] Use NVDA (Windows) or VoiceOver (Mac) to test
- [ ] Headings announced correctly (h1, h2, h3 order logical)
- [ ] Button/link purpose clear from text alone (avoid "Click here", use "Download Resume")
- [ ] Form fields labeled (or aria-label if visual label not possible)
- [ ] Images have alt text (or marked as decorative with `alt=""`)

### Color & Contrast
- [ ] axe DevTools scan: zero violations
- [ ] Manual check: text passes WCAG AA (≥4.5:1 for normal, ≥3:1 for large)
- [ ] Color not the only differentiator (e.g., error messages also use icons or text)

### Reduced Motion
- [ ] Set OS: Settings > Accessibility > Display > Reduce motion → On
- [ ] Animations disabled or significantly reduced
- [ ] Content still readable, no functionality lost
- [ ] Fallback: static HTML version renders correctly

### Recruiter Path
- [ ] `/resume` route exists and loads
- [ ] Resume PDF downloads (or external link works)
- [ ] All contact info present (email, phone, LinkedIn, GitHub)
- [ ] CTA buttons prominent and functional

---

## Phase 4 Verification (Weeks 9–10) — Performance & Ship

### Bundle Analysis
- [ ] Run: `vite build --mode analyze` (or use `vite-plugin-visualizer`)
- [ ] Identify largest chunks (ideally < 500 KB each)
- [ ] Tree-shake unused libraries (e.g., if using motion/react, import only used parts)
- [ ] Lazy-load non-critical sections (3D, heavy animations, modals)

### Final Lighthouse Audit
- [ ] **Performance**: ≥85 desktop / ≥75 mobile (stricter than Phase 2)
- [ ] **Accessibility**: ≥95
- [ ] **Best Practices**: ≥90
- [ ] **SEO**: ≥90

### Real Device + Network Simulation
- [ ] Throttle to "Slow 4G + 4× CPU" in DevTools
- [ ] Site still loads and interactive in < 5s
- [ ] Images load progressively (low-res placeholder → full-res)
- [ ] No layout shift as lazy-loaded content arrives

### Pre-Deploy Checklist
- [ ] All environment variables set (.env.production)
- [ ] API keys / secrets NOT in repo (use .env, not constants.ts)
- [ ] Analytics script loaded (Google Analytics, Plausible, etc.)
- [ ] Error tracking configured (Sentry, LogRocket, etc.)
- [ ] 404 page created (for SPA routing to undefined routes)
- [ ] Meta tags set (title, description, OG image)
- [ ] Favicon present and correct
- [ ] Robots.txt and sitemap.xml (if SEO relevant)
- [ ] CNAME / domain configured
- [ ] SSL certificate valid (HTTPS required)

### Post-Deploy Verification
- [ ] Site loads on production URL (no mixed http/https)
- [ ] All links work (no 404s, no external link breakage)
- [ ] Analytics dashboard showing traffic
- [ ] Error tracking dashboard initialized
- [ ] Mobile site renders correctly on real phone (not just DevTools emulation)
- [ ] Test on 4G network (go to a cafe, use real 4G phone)

---

## Ongoing Monitoring (Post-Launch)

### Weekly Checks
- [ ] Lighthouse score stable (no regression)
- [ ] Core Web Vitals in Google Search Console green
- [ ] Sentry error tracking: no new errors above baseline
- [ ] Analytics: bounce rate < 40%, avg session > 1 min

### Monthly Deep Dives
- [ ] Real user monitoring: trace slowest pages/interactions
- [ ] Browser compatibility: any new issues in less common browsers?
- [ ] Accessibility: spot-check keyboard nav + screen reader
- [ ] Mobile performance: test on 1–2 year old devices

### Incident Response
- [ ] Bundle size spike: investigate unused code, re-run analysis
- [ ] LCP regression: profile with Chrome DevTools, identify culprit (image, font, JS?)
- [ ] High error rate: Sentry stacktrace → root cause → fix + deploy
- [ ] User complaint: reproduce on real device, verify fix, add to regression suite

---

## Adaptation Guide

Use this template by:
1. Copy this file to your project: `.claude/TESTING_CHECKLIST.md`
2. Customize section names to match your project phases
3. Add project-specific tests (API endpoints, custom interactions)
4. Remove irrelevant items (e.g., if no form, skip form accessibility tests)
5. Adjust performance targets based on your audience (e.g., mostly mobile = lower LCP target)

**Example adaptations**:
- **E-commerce**: Add shopping cart flow, payment processing, inventory checks
- **SaaS dashboard**: Add authentication tests, permission checks, data export tests
- **Content blog**: Add SEO verification, RSS feed, search functionality
- **3D game**: Add input latency tests, GPU load tests, fallback for low-end devices
