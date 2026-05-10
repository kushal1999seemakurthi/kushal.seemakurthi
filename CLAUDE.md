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

An elegant, single-page portfolio for Kushal Seemakurthi (Senior Data Scientist). Five sections — Introduction, Experience, Skills, Projects, Education — with scroll-driven animations and interactive components. Sections use elemental IDs (`air`, `water`, `earth`, `fire`, `spirit`) for scroll tracking internally, but the design is clean and professional without an elemental visual theme.

**Stack:** React 19 + TypeScript + Vite + `motion/react` (Framer Motion) + Tailwind v4 (`@tailwindcss/vite`, no config file). `three` and `@react-three/fiber` are **not yet installed** — they will be added when implementing the Möbius strip experience section.

### Scroll architecture

`App.tsx` owns the single `useScroll()` instance that tracks `scrollYProgress` (0→1) over the full page. A `useMotionValueEvent` listener maps this to `activeSection` (0–4) via fixed 20% bucket thresholds and passes it down to `SidebarNav`. This is the **only source of truth** for which section is active — do not create competing scroll listeners.

`Section.tsx` uses a **second, local** `useScroll({ target: containerRef })` scoped to its own element. It drives per-section `opacity` and `y` parallax independently of the global progress. Hero section (`isHero={true}`) opts out of this motion wrapper.

`ExperienceStack.tsx` intercepts `wheel` and `touchmove` events on its container div to drive a 3D cylindrical card carousel via `useSpring`, **without affecting page scroll**. The scroll intercept is intentional — users must move the cursor outside the experience zone to scroll normally.

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

### Data layer

All content lives in `src/data/` as typed arrays — **do not hardcode content in component files**:

| File | Type | Used by |
|---|---|---|
| `src/data/experience.ts` | `Experience[]` | `ExperienceStack` (→ `MobiusExperience`) |
| `src/data/projects.ts` | `Project[]` | `ProjectsTrain` |
| `src/data/skills.ts` | `SkillCategory[]` | `SkillsGrid` |

Bio, contact links, and URLs live in `src/constants.ts`.

### Component responsibilities

`App.tsx` is a thin orchestrator (~60 lines). Section components own their own JSX; infrastructure components are shared:

**Section components** (one per elemental section):

| Component | Section | What it does |
|---|---|---|
| `HeroSection` | air | Profile image + floating badges + bio card + CTA buttons |
| `ExperienceStack` | water | 3D wheel carousel — **being replaced by MobiusExperience** |
| `SkillsGrid` | earth | Bento grid of 6 skill categories, reads from `data/skills.ts` |
| `ProjectsTrain` | fire | Infinite marquee of project cards, reads from `data/projects.ts` |
| `EducationSection` | spirit | Education card + site footer (shares `emailCopied` state from App) |

**Infrastructure components** (shared / reusable):

| Component | What it does |
|---|---|
| `Section` | Scroll-aware wrapper — `min-h-[100svh]`, 16-column CSS grid, fade+parallax. Pass `isHero={true}` to skip the motion wrapper for above-the-fold content. |
| `SidebarNav` | Fixed 80px left sidebar; vertical labels; `scrollIntoView` on click; active state comes from `App.tsx`. |
| `InteractiveCard` | Mouse-tracking 3D tilt via `useMotionValue` + `useSpring`; dynamic border widths simulate depth; resets on mouse leave. |

### Assets

- `public/profile.jpg` — hero photo (served at `/profile.jpg`). Has an `onError` fallback to an Unsplash URL.
- `Scenes/*.jpg` — 8 elemental scene images (Air, Water, Earth, Fire, Reset, Air2Water, Water2Earth, Earth2Fire). **Not yet used.** These should be connected to `BackgroundScenes.tsx` when implementing the elemental background swap.

### Section IDs

Sections use elemental IDs (`air`, `water`, `earth`, `fire`, `spirit`), not numeric ones. `SidebarNav` and `App.tsx` must stay in sync on these IDs and their order.
