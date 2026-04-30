# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Vite dev server on port 3000, host 0.0.0.0. Set `DISABLE_HMR=true` to disable HMR/file watching (used inside AI Studio to prevent flicker during agent edits).
- `npm run build` — production build via Vite.
- `npm run preview` — serve the built `dist/`.
- `npm run lint` — `tsc --noEmit` (typecheck only; there is no ESLint config).
- `npm run clean` — remove `dist/`.

There is no test runner configured.

## Environment

`vite.config.ts` reads `GEMINI_API_KEY` from `.env.local` and inlines it as `process.env.GEMINI_API_KEY` at build time. The path alias `@/*` resolves to the project root (see `tsconfig.json` and `vite.config.ts`).

## Architecture

This is a single-page personal portfolio (Seemakurthi Kushal Kumar) built as a layered scrollytelling experience: an editorial-magazine HTML/Tailwind layout sits on top of a fixed full-viewport WebGL scene, and both are driven from the same scroll position.

The three pieces that have to stay in sync:

1. **`src/App.tsx`** — owns the page chrome and the five `<section id="section-0..4">` blocks (Introduction, Experience, Skills, Projects, Education). It also initializes **Lenis** smooth scroll and wires it into GSAP's ticker so `ScrollTrigger.update` fires off Lenis frames rather than native scroll. The 3D `<Scene />` is rendered into a `fixed inset-0 z-0` layer; the editorial UI is `relative z-10` and uses `mix-blend-multiply` so the text composites onto the WebGL background.

2. **`src/components/Scene.tsx`** — the React Three Fiber `<Canvas>`. Renders `<Experience />` plus lighting/fog. Background color (`#F9F7F2`) intentionally matches the HTML body so the canvas blends seamlessly behind the magazine layout.

3. **`src/components/Experience.tsx`** — the scroll-driven camera director. The exported `ISLANDS` array defines one 3D "island" per section (position + scale). On mount, `Experience` builds a GSAP `ScrollTrigger` per `#section-N` element that interpolates `camera.position` and `camera.lookAt` between successive islands. **The number and order of `ISLANDS` entries must match the `<section id="section-N">` blocks in `App.tsx` exactly** — adding/removing/reordering a section requires editing both files.

Other 3D components (`Island.tsx`, `Stairs.tsx`, `InteractiveElements.tsx`, `Particles.tsx`) are scene content rendered inside `Experience`. They are positioned in world space relative to the `ISLANDS` coordinates.

## Conventions

- Styling is **Tailwind v4** via the `@tailwindcss/vite` plugin (no `tailwind.config.js`); arbitrary-value classes (`text-[#1C1C1C]`, `[writing-mode:vertical-rl]`) are used heavily for the editorial look.
- Smooth scroll is **Lenis-driven, not native** — never call `window.scrollTo` or rely on native scroll events for animation; route through Lenis/GSAP ScrollTrigger.
- The repo originally came from Google AI Studio (see `README.md`); the `@google/genai` dependency and `GEMINI_API_KEY` plumbing remain but are not currently used by the rendered portfolio.
