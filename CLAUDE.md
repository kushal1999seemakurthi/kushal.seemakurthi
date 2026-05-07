# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # Vite dev server on port 3000, host 0.0.0.0
npm run build     # production build → dist/
npm run preview   # serve dist/ locally
npm run lint      # tsc --noEmit (type-check only)
npm run clean     # rm -rf dist
```

No test runner is configured.

## Architecture

An immersive, single-page portfolio for Kushal Seemakurthi (Senior Data Scientist). Five sections map to five elements — Air (Introduction), Water (Experience), Earth (Skills), Fire (Projects), Spirit (Education) — each with a distinct visual identity and interaction pattern.

**Stack:** React 19 + TypeScript + Vite + `motion/react` (Framer Motion) + Tailwind v4 (`@tailwindcss/vite`, no config file). `@react-three/fiber` and `three` are installed but **not yet used** — they are reserved for a future immersive 3D layer.

### Scroll architecture

`App.tsx` owns the single `useScroll()` instance that tracks `scrollYProgress` (0→1) over the full page. A `useMotionValueEvent` listener maps this to `activeSection` (0–4) via fixed 20% bucket thresholds and passes it down to `SidebarNav`. This is the **only source of truth** for which section is active — do not create competing scroll listeners.

`Section.tsx` uses a **second, local** `useScroll({ target: containerRef })` scoped to its own element. It drives per-section `opacity` and `y` parallax independently of the global progress. Hero section (`isHero={true}`) opts out of this motion wrapper.

`ExperienceStack.tsx` intercepts `wheel` and `touchmove` events on its container div to drive a 3D cylindrical card carousel via `useSpring`, **without affecting page scroll**. The scroll intercept is intentional — users must move the cursor outside the experience zone to scroll normally.

### Component responsibilities

| Component | What it does |
|---|---|
| `SidebarNav` | Fixed 80px left sidebar; vertical text labels; `scrollIntoView` on click; active state from `activeSection` prop |
| `BackgroundScenes` | **Stub** — currently renders an empty div. Intended to swap elemental scene JPGs from `Scenes/` based on `activeSection`. The 8 scene images (Air, Water, Earth, Fire, Reset, and 4 transitions) are ready in `Scenes/*.jpg` but are not yet wired up. |
| `Section` | Scroll-aware wrapper — `min-h-[100svh]`, 16-column CSS grid, fade+parallax via `motion/react`. Pass `isHero={true}` to disable the motion wrapper for above-the-fold content. |
| `InteractiveCard` | Mouse-tracking 3D tilt using `useMotionValue` + `useSpring`; dynamic border widths give the illusion of depth; resets on mouse leave. |
| `ExperienceStack` | 3D wheel carousel. Each card's `y`, `z`, `scale`, `opacity`, `rotateX` are driven by a single `progressSpring` value via `useTransform`. Cards are laid out on a circular path using sin/cos math against the normalized spring value. |
| `ProjectsTrain` | Infinite marquee: two duplicate `CardList` sets, each with `animate-marquee` CSS animation. Entire marquee pauses on hover via `pause-marquee` class. |

### Styling conventions

Tailwind v4 — no `tailwind.config.js`. Theme tokens are in `src/index.css` under `@theme`:

```
--color-air / water / earth / fire / spirit  (elemental backgrounds)
--font-serif: Playfair Display, Cormorant Garamond
--font-sans: Inter
```

**Important:** Component files currently use raw hex values (`#4a1c1c`, `#F4EFE6`, `#FCFAF5`, `#5c2323`, `#2a1111`) rather than the CSS custom properties. The `@theme` tokens exist but are not yet consumed. When adding new styled elements, prefer the raw hex values that are already in use to stay consistent.

The `.writing-vertical` class in `index.css` applies `writing-mode: vertical-rl` — used by `SidebarNav`.

The `.pause-marquee:hover .animate-marquee` + `@keyframes marquee` pattern in `index.css` controls `ProjectsTrain`'s hover-pause behavior.

### Content location

All portfolio content is **hardcoded in component files**, not in a separate data layer:
- Experience entries → `src/components/ExperienceStack.tsx` (`experiences` array, lines 5–51)
- Project entries → `src/components/ProjectsTrain.tsx` (`projects` array, lines 3–25)
- Skills tags → inline in `App.tsx` (Earth section, lines 151–202)
- Bio, contact links, education → inline in `App.tsx`

### Assets

- `public/profile.jpg` — hero photo (served at `/profile.jpg`). Has an `onError` fallback to an Unsplash URL.
- `Scenes/*.jpg` — 8 elemental scene images (Air, Water, Earth, Fire, Reset, Air2Water, Water2Earth, Earth2Fire). **Not yet used.** These should be connected to `BackgroundScenes.tsx` when implementing the elemental background swap.

### Section IDs

Sections use elemental IDs (`air`, `water`, `earth`, `fire`, `spirit`), not numeric ones. `SidebarNav` and `App.tsx` must stay in sync on these IDs and their order.
