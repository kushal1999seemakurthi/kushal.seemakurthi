# CLAUDE.md — ImmersivePort

This file provides guidance to Claude Code when working with code in this repository. It is the canonical specification for the ImmersivePort branch and mirrors the approved architectural plan in full structural detail.

---

## Context

The user (Senior Data Scientist, IIT Dharwad alumnus) is building a craft-piece portfolio at `/Users/kushalkumarseemakurthi/Desktop/Claude/Portfolio/kushal.seemakurthi` on the `ImmersivePort` branch. Today this branch contains only the legacy static HTML site (`index.html`, `main.js`, `style.css`) inherited from `main`. The mature Vite + React 19 + R3F + GSAP + Lenis + Tailwind v4 scaffold lives on the `Bot` branch and ships independently as the editorial-magazine portfolio.

**Why this project exists.** The user wants a conceptually distinct, immersive 3D portfolio inspired by Avatar: The Last Airbender's bending physics — but evoked, not literally referenced. The mechanic: as the visitor scrolls, the actual portfolio copy (and a single creature avatar) transmute through five elemental scenes — Air → Water → Earth → Fire → Spirit — with continuous element-to-element transitions. The site solves the recruiter-vs-peer audience tension via a Genshin-style path selector at entry: recruiters get a fast flat resume route; peers get the full immersive journey.

**Strategic positioning.** The `Bot` editorial site is the load-bearing portfolio (recruiter-safe, ships first, lives at root). ImmersivePort is the craft signature piece — allowed to be ambitious because it's not on the critical path. The plan reflects this: explicit kill/proceed gate after vertical slice; recruiter route delegates to the existing `Bot` deployment.

---

## Commands

- `npm run dev` — Vite dev server on port 3000, host 0.0.0.0.
- `npm run build` — production build via Vite.
- `npm run preview` — serve the built `dist/`.
- `npm run lint` — `tsc --noEmit` (typecheck only; no ESLint).
- `npm run clean` — remove `dist/`.

## Environment

`vite.config.ts` reads `GEMINI_API_KEY` from `.env.local` (copied from Bot, but unused here — the define block was dropped). The path alias `@/*` resolves to the project root. No `.env` file required for dev.

---

## Locked Design Decisions

| Decision | Choice |
|---|---|
| Section→element mapping | Air=Intro, Water=Experience, Earth=Skills, Fire=Projects, Spirit=Education+Closing |
| Recurring motif | **Creature transformation**: paper crane → koi → stone tortoise → phoenix → ink seal |
| Visitor agency | **Observer** + hover-to-reveal on artifacts (roles, projects, skills) |
| Ink identity | **Transmutes per element**: white (Air) → teal (Water) → ochre (Earth) → ember (Fire) → luminous gold (Spirit) |
| Path selector | HTML/CSS overlay pre-Canvas; recruiter path serves the deployed `Bot` site |
| IP discipline | East Asian ink-painting + classical four-elements vocabulary; **no** ATLA character silhouettes, named bending forms, or lion turtles |

---

## Architecture Overview

**Stack** (copied from `Bot` verbatim where applicable): Vite 6 + React 19 + TypeScript + R3F 9 + drei 10 + GSAP 3 + ScrollTrigger + Lenis + Three 0.184 + Tailwind v4 (no config file — single `@import "tailwindcss"` in index.css).

**The spine.** Five HTML `<section id="section-N">` blocks (matching the existing `Bot` pattern) drive five labeled segments of one master GSAP timeline. Lenis smooth-scroll feeds `ScrollTrigger.update` via the `gsap.ticker` raf bridge — same wiring as `Bot:src/App.tsx` lines 17–32, used verbatim. A single persistent `<Canvas>` sits `fixed inset-0 z-0`; HTML overlay is `relative z-10`.

**Continuous transition model.** Section seams use a continuous `transitionT: 0..1` uniform shared by text shaders, camera personality module, ink color, fog, and creature morph. Computed as: from 70% scroll-through of section N to 30% scroll-through of section N+1, ramp 0→1. **No discrete transition zones.** This eliminates jolt and lets ice/plants/forge/smoke bleed across the seam.

**One creature, five forms.** A single `<CreatureAvatar>` component holds five GLB or primitive-geometry forms with morph-target / cross-fade between them, anchored to the camera by section. Form changes are scrubbed by `transitionT` so the paper crane visibly *folds wet → koi*, koi *embeds in growing stone → tortoise*, etc.

**Element-conditional ink color.** A single `<ParticleText>` system reads per-element `uInkColor` from the element state config, blended by `transitionT`, so color shift across a transition is gradient (not hard cut).

### Three pieces that must stay in sync

1. **`src/App.tsx`** — owns page chrome and the five `<section id="section-0..4">` blocks. Initializes Lenis and wires it to GSAP's ticker:
   - `lenis.on('scroll', ScrollTrigger.update)`
   - `gsap.ticker.add(t => lenis.raf(t * 1000))`
   - `gsap.ticker.lagSmoothing(0, 0)` (disables lag smoothing so scrubbed animations don't auto-play)

   The 3D `<SceneRoot />` renders into a `fixed inset-0 z-0` layer; HTML overlay (sections + UI) is `relative z-10` with `mix-blend-multiply` compositing onto the 3D background.

2. **`src/scene/SceneRoot.tsx`** — React Three Fiber `<Canvas>`. Renders `<ElementStage />` (active element scene + transition layer), `<CameraRig />`, `<Lights />`, `<PostFX />`. Canvas background color (`#F9F7F2`) intentionally matches HTML body for seamless blending.

3. **`src/scene/CameraRig.tsx`** — scroll-driven camera director. On mount, builds a GSAP master timeline that scrubs `camera.position` and `camera.lookAt` through five waypoints (one per section) as scroll progresses. **The order and count of waypoints must exactly match the `<section id="section-N">` blocks in `App.tsx`**. Adding/removing/reordering a section requires editing both files.

---

## Section-by-Section Design

### § 0 — Path Selector (pre-Canvas)
- **Implementation:** flat HTML/CSS, no R3F mounted yet (Canvas warm-up window).
- **Visual:** parchment background, two ink-painted seals — ⚙ "ENG" (recruiter) and 🧠 "BRAIN" (peer). Subtle SVG ink-bleed on hover.
- **Behavior:** click ENG → `window.location` → deployed `Bot` URL (recruiter route). Click BRAIN → mount `<ImmersiveApp>` via dynamic `import()`, fade parchment, ink particles disperse upward into Air. Choice persisted in `localStorage["port:audience"]`.
- **Copy:** *"Choose your path through the work."*

### § 1 — Air = Introduction
- **Ink color:** white-ivory (`#F5EFE0` particles)
- **Creature form:** paper crane (single low-poly model, drifts on subtle bezier path across frame once during section)
- **Camera personality:** `drift` — FOV 75°, slow lateral parallax, low-frequency curl-noise offset on roll axis (≤1.5°), no pitch tremor
- **Scene:** 3 cloud layers (flat ink-stroke sprites at parallax depths) against sumi-e watercolor sky gradient; distant mountain wash silhouette; a faint distant calligrapher ghost (one-time appearance, plants the creator-of-the-work motif)
- **Content:** identity, role, headline accomplishments (re-use copy from `Bot:src/App.tsx` section-0)
- **Particle text behavior:** characters drift on curl noise, cohere into legible rest-pose during readability band (`uScrollProgress ∈ [0.30, 0.70]`)
- **Hover affordance:** none in Air — the section is observational/welcoming

### § 1→§ 2 transition — Ice Crystallization
- Ink particles slow over the last 30% of §1; freeze into 6-fold ice geometry; refract distant view briefly
- Crystals fracture, become liquid drips
- Camera dives downward following a falling drip; impacts a still water surface (ripples expanding outward) at start of §2
- `uInkColor` lerps `#F5EFE0` → `#5FB3B3` (teal); fog density rises; sky color cools

### § 2 — Water = Experience
- **Ink color:** teal (`#5FB3B3`)
- **Creature form:** koi — paper crane folds wet on entry; emerges as koi swimming downstream alongside the camera
- **Camera personality:** `oscillate` — FOV 60°, gentle sine motion (boat-on-water), refraction shader on lower half of screen during partial-submersion glances
- **Scene:** river flowing left-to-right (or downstream); 3 stone markers/lanterns lining the bank, one per role (most-recent role = deepest, widest part of river); soft rain at upper edges; caustic light patterns on a riverbed
- **Content:** Ushur (current), Junglee Games (upstream tributary), Kaglorisis (further upstream spring)
- **Particle text behavior:** role copy lives in flowing currents — readable in band, dissolves into downstream advection at edges
- **Hover affordance:** hover a marker → ink-drop bloom on water surface forms the role's title via cheap fragment-shader 2D fluid sim, then drifts away with full role detail

### § 2→§ 3 transition — Plant Emergence + Petrification
- Water saturates a riverbank; reeds and tendrils sprout
- Tendrils thicken, harden into bark, then to stone
- Koi swims to bank; comes to rest; stone wraps around it forming the tortoise shell
- Camera lifts upward following a vine into a stone canyon
- `uInkColor` lerps teal → ochre `#C9854F`; fog warms; light filters from above

### § 3 — Earth = Skills
- **Ink color:** ochre (`#C9854F`)
- **Creature form:** stone tortoise (the koi-stone composite resolves into the tortoise; sits at the foot of the tablets through the section)
- **Camera personality:** `rigid` — FOV 50°, dampened motion, occasional micro-tremor (1-frame perlin pulse) on each scroll-progress quartile
- **Scene:** three stone tablets emerging from the ground as scroll advances — one per skill category. Carved characters glow faintly. Vines threading stone seams (Water callback). Crystals embedded in walls.
- **Content:** ML/AI & LLMs / Vector & Databases / MLOps & Infra (carry over from Bot's section-2)
- **Particle text behavior:** stone-fracture mode — characters break into mineral fragments under hover, reassemble after
- **Hover affordance:** hover a tool/library carving → glows brighter, lifts slightly out of the stone, tag expands

### § 3→§ 4 transition — Pottery / Forge
- Glowing crack opens in a tablet; stone fragments slide into a circular furnace materializing around camera
- Tortoise's shell glows from within, cracks; fragments release a small phoenix that rises out
- Heat shimmer post-process activates; camera follows fragments into the heat
- `uInkColor` lerps ochre → ember-orange `#E84F1F`; fog reddens; ambient warms

### § 4 — Fire = Projects
- **Ink color:** ember-orange (`#E84F1F`)
- **Creature form:** phoenix — rises from cracked tortoise shell on entry; circles overhead through section
- **Camera personality:** `handheld` — FOV 70°, perlin offset (≤2px screen-space), heat-shimmer postFX (low-amplitude vertical sine distortion)
- **Scene:** central kiln/forge glow; project artifacts arrayed on anvils/pedestals around it; sparks rising as constellations
- **Content:** Enterprise RAG System ($4M+, 100K PDFs/mo, LangChain+GPT-4+Pinecone+FastAPI+Docker), Zero-Shot Classification API (RoBERTa, HF, K8s, 15+ deployments)
- **Particle text behavior:** ember-text mode — characters drift upward with buoyancy + curl turbulence, dissolve into smoke at the top of frame, regenerate from kiln
- **Hover affordance:** hover an artifact → camera does a 1.5s push-in, ember-text resolves to full case-study description with metrics as a spark constellation

### § 4→§ 5 transition — Smoke Condenses to Ink
- Sparks rise faster; smoke thickens and spirals upward
- Phoenix flies up into the spiral; dissolves into smoke
- Smoke condenses into liquid ink, flows into a central seal shape
- `uInkColor` lerps ember → luminous gold `#F2C76A`; ambient cools to white; calm settles

### § 5 — Spirit = Education + Closing
- **Ink color:** luminous gold (`#F2C76A`)
- **Creature form:** ink seal — the final calligraphic stamp the journey produced (the seal is what the calligrapher ghost from §1 is signing)
- **Camera personality:** `orbit` — FOV 55°, slow rotation around the central seal, final pull-back to wide
- **Scene:** large calligraphic seal at center (IIT Dharwad name carved, glowing softly, visitor's name in negative space). Four orbiting motifs around it: cloud wisp (Air), river fragment (Water), stone shard (Earth), ember (Fire) — each labeled with a section reference, clickable to jump back. Open journal floats below; blank page fills with contact info in ink as the section settles. Optional: faint calligrapher ghost from §1 walks into frame, places brush down, signs with the seal.
- **Content:** IIT Dharwad B.Tech CSE 2017–2021, CGPA 7.56/10, JEE Top 1%, district olympiad. Closing CTA / contact / resume link.
- **Particle text behavior:** harmonic return — particles re-form into seal glyphs, then to bio text, with all four element velocity fields blended at low amplitude
- **End state:** scroll-snap to a final wide. Visitor can scroll back up to revisit; seal-orbiting motifs are jump-back navigation.

---

## GPU-Instanced Particle Text System

`src/text/ParticleText.tsx` renders portfolio copy via **instanced point particles**, not rasterized text. Each glyph is sampled into a point cloud (via `troika-three-text` SDF rasterization at startup). Vertex/fragment shaders apply element-specific **velocity fields**:

- **Air:** `curl(noise)` — characters drift chaotically, cohere into legible rest-pose in scroll band [0.30, 0.70]
- **Water:** `flow(x, y)` — river-like advection sideways; role copy drifts downstream
- **Earth:** `gravity + fracture` — characters fall and shatter into mineral fragments
- **Fire:** `buoyancy + turbulence` — characters drift upward with smoke, dissolve at frame top, regenerate from kiln
- **Spirit:** `harmonic(phase)` — all four field modes blend at low amplitude, particles re-form seal glyphs

Element-conditional ink colors lerp smoothly across transitions via `uInkColor` + `uInkColorNext` uniforms, so color shift is **gradient, never hard cut**.

**Shader uniforms (`src/text/shaders/particleText.{vert,frag}.glsl`):**
- `uElementState` — current element index (0..4)
- `uTransitionT` — 0..1 cross-fade ramp across section seam
- `uTime` — global clock, drives noise fields
- `uScrollProgress` — 0..1 within current section
- `uInkColor`, `uInkColorNext` — per-element hex blended by `uTransitionT`
- `uFlowStrength` — amplitude scalar for velocity field
- `uReadability` — band gate [0.30, 0.70] snapping particles to legible rest-pose

---

## Single Creature Avatar with Morphing Forms

`src/creature/CreatureAvatar.tsx` holds five GLB or primitive-geometry forms (paper crane → koi → tortoise → phoenix → ink seal) with cross-fade orchestration driven by `transitionT`. This ensures the creature *visibly transforms* across each section seam (crane folds wet, koi embeds in stone, tortoise shell cracks releasing phoenix, phoenix dissolves into ink seal).

---

## Camera Personality Module

Each element has distinct camera behavior (`cameraMotion` in `ElementState`):

- **Air:** `drift` — FOV 75°, slow lateral parallax, low-frequency roll noise (≤1.5°)
- **Water:** `oscillate` — FOV 60°, gentle sine motion (boat-on-water), refraction shader on lower screen
- **Earth:** `rigid` — FOV 50°, dampened motion, micro-tremor pulses on scroll quartiles
- **Fire:** `handheld` — FOV 70°, 2px screen-space perlin offset, heat-shimmer postFX
- **Spirit:** `orbit` — FOV 55°, slow rotation around central seal, wide pull-back at end

Personality swaps are scrubbed by `transitionT` so camera motion **never jolts**.

---

## Component Tree

```
src/
├── main.tsx                       # mount, import './index.css'
├── App.tsx                        # Lenis+GSAP spine, route gate, layout (from Bot)
├── index.css                      # @import "tailwindcss"; + ink/calligraphy fonts
├── routes/
│   ├── PathSelector.tsx           # parchment + ENG/BRAIN seals (HTML/CSS)
│   └── ImmersiveApp.tsx           # lazy-loaded peer experience root
├── scene/
│   ├── SceneRoot.tsx              # <Canvas>, fixed inset-0 z-0, persistent
│   ├── ElementStage.tsx           # active element scene + transition layer
│   ├── CameraRig.tsx              # single camera + personality module
│   ├── Lights.tsx                 # default rig modulated per element
│   ├── PostFX.tsx                 # element-conditional EffectComposer
│   └── elements/
│       ├── AirScene.tsx
│       ├── WaterScene.tsx
│       ├── EarthScene.tsx
│       ├── FireScene.tsx
│       └── SpiritScene.tsx
├── creature/
│   ├── CreatureAvatar.tsx         # single component, morphs through 5 forms
│   ├── forms/                     # paper crane / koi / tortoise / phoenix / seal GLBs
│   └── creatureTransitions.ts     # cross-fade orchestration per transitionT
├── transitions/
│   ├── IceTransition.tsx          # Air→Water
│   ├── BloomTransition.tsx        # Water→Earth
│   ├── ForgeTransition.tsx        # Earth→Fire
│   └── SmokeTransition.tsx        # Fire→Spirit
├── text/
│   ├── ParticleText.tsx           # GPU-instanced particle text system
│   ├── glyphSampler.ts            # CPU: rasterize via troika SDF → point cloud
│   ├── shaders/
│   │   ├── particleText.vert.glsl # uniforms: uElementState, uTransitionT, uTime, uScrollProgress, uInkColor, uInkColorNext, uFlowStrength, uReadability
│   │   └── particleText.frag.glsl
│   └── velocityFields.ts          # curl(air), flow(water), gravity+fracture(earth), buoyancy+turbulence(fire), harmonic(spirit)
├── content/
│   ├── sections.ts                # 5 sections of typed copy
│   └── elementStates.ts           # ElementState[] config
├── audio/
│   ├── AudioBed.tsx               # 4 ambient stems crossfaded on scroll
│   └── stems/                     # air.ogg, water.ogg, earth.ogg, fire.ogg, spirit.ogg
├── hooks/
│   ├── useScrollProgress.ts       # global 0..1 + per-section progress
│   ├── useElementState.ts         # current element + transitionT 0..1
│   ├── useReducedMotion.ts        # respects prefers-reduced-motion
│   └── useDeviceTier.ts           # GPU probe → 'high' | 'mid' | 'low'
└── ui/
    ├── SectionHTML.tsx            # the 5 <section id="section-N"> blocks
    ├── EdgeCalligraphy.tsx        # vertical kanji-style nav
    └── ContactSeal.tsx            # final calligraphic CTA
```

### ElementState config (`src/content/elementStates.ts`)

```ts
export type ElementState = {
  name: 'air' | 'water' | 'earth' | 'fire' | 'spirit';
  inkColor: string;       // hex
  ambientColor: string;
  fogColor: string;
  fogDensity: number;     // exp2 fog
  fov: number;
  cameraDamping: number;  // 0..1
  cameraMotion: 'drift' | 'oscillate' | 'rigid' | 'handheld' | 'orbit';
  postFx: Array<'shimmer' | 'bloom' | 'grain' | 'chromatic' | 'refraction' | 'none'>;
  textShaderPreset: 0 | 1 | 2 | 3 | 4;
  creatureForm: 'crane' | 'koi' | 'tortoise' | 'phoenix' | 'seal';
  audioStem: string;
};
```

---

## Reusable from `Bot` (verbatim copy)

| File | Source on Bot | Notes |
|---|---|---|
| `package.json` | `Bot:package.json` | full deps; can drop `@google/genai` since unused |
| `vite.config.ts` | `Bot:vite.config.ts` | drop the `GEMINI_API_KEY` define block |
| `tsconfig.json` | `Bot:tsconfig.json` | unchanged |
| `index.html` | `Bot:index.html` | retitle to "Kushal Seemakurthi — ImmersivePort" |
| `src/main.tsx` | `Bot:src/main.tsx` | unchanged |
| `src/index.css` | `Bot:src/index.css` | unchanged base; add custom fonts via Tailwind v4 `@theme` block |
| Lenis+GSAP useEffect | `Bot:src/App.tsx` lines 17–32 | the `useEffect(() => { const lenis = new Lenis(...); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0,0); return () => { lenis.destroy(); ... }; }, [])` block — used verbatim |
| ScrollTrigger camera pattern | `Bot:src/components/Experience.tsx` lines 30–80 | `gsap.fromTo(camera.position, {...}, { scrollTrigger: { trigger: '#section-N', start: 'top bottom', end: 'top 20%', scrub: 1, immediateRender: false } })` — adapted into `CameraRig.tsx` master timeline |
| Section HTML structure | `Bot:src/App.tsx` `<section id="section-0..4" className="min-h-[100vh] relative ...">` | mirror the structure |

**NOT reused** (different concept): `Bot:src/components/Island.tsx`, `Stairs.tsx`, `Particles.tsx`, `InteractiveElements.tsx`.

---

## Conventions

- **Styling:** Tailwind v4 via `@tailwindcss/vite` plugin (no `tailwind.config.js`). Arbitrary-value classes (`text-[#1C1C1C]`, `[writing-mode:vertical-rl]`) are used for editorial typography.
- **Smooth scroll:** **Lenis-driven, never native.** Always route animations through Lenis + GSAP ScrollTrigger. Never call `window.scrollTo` or react to native scroll events.
- **Section ↔ Scene binding:** Section ID order in `App.tsx` must exactly match the order of scenes in `ElementStage.tsx`. Both are zero-indexed. If you add/remove/reorder a section, update both files and verify `useScrollProgress().currentSection` maps correctly.
- **Canvas state:** All 3D state (particle text, creature form, camera, fog, ink color) is derived from `useScrollProgress()` and `useElementState()`, not from local React state. This ensures deterministic scrubbing.
- **PostFX:** Only enable concurrent PostFX for the active element; stack >2 effects per frame will blow the 16.6ms frame budget on desktop.
- **Fonts & assets:** Custom fonts loaded via Tailwind v4 `@theme` block in `index.css`. 3D models (creature GLBs) sourced CC0 from Quaternius or Sketchfab; stored in `public/assets/creatures/` and loaded via `useGLTF`.

---

## Performance Budget (hard caps)

| Metric | Target |
|---|---|
| Initial JS gzipped (peer route) | < 2.5 MB |
| Initial JS gzipped (recruiter route) | < 120 KB |
| Total assets | < 8 MB |
| Particle count (high tier) | 40,000 |
| Particle count (mid tier) | 18,000 |
| Particle count (low tier) | 0 (fall back to MSDF + displacement) |
| Frame budget desktop | 16.6 ms (60 fps) |
| Frame budget mobile | 33 ms (30 fps) |
| Draw calls | < 80 / frame |
| Lights | 1 directional + 1 ambient + 1 hemi; **no shadow maps** |
| PostFX passes (concurrent) | ≤ 2 |
| Texture budget | 6 MB; KTX2/Basis where possible |
| Pixel ratio | desktop: device default capped at 2; mobile: locked at 1.5; low-tier: 1 |

**Things that will blow the budget:** shadow maps (dropped entirely), per-pixel transmission, multi-pass bloom + chromatic + grain stacked, particles >50k, troika dynamic re-tessellation per frame, raycaster against full scene per frame (use bounded BVH or section-scoped raycasts).

### Mobile fallback (`useDeviceTier()` returns `'low'`)

- ParticleText → MSDF text via `troika-three-text` with light vertex displacement only
- All PostFX disabled
- Creature avatar → static low-poly silhouette per section (no morph)
- dpr locked to 1
- Element transitions become flat color crossfades

### Accessibility fallback (`prefers-reduced-motion`)

- No Canvas mounted
- Five-section vertical layout, semantic HTML cards, Tailwind-styled
- Element accent colors retained as CSS gradients per section
- Same content, fully accessible

---

## Path Selector & Recruiter Route

`src/routes/PathSelector.tsx` is a pre-Canvas HTML/CSS overlay (parchment background, two ink-painted seals: ⚙ "ENG" for recruiters, 🧠 "BRAIN" for peers). Clicking ENG navigates to the deployed `Bot` site (fast resume route); clicking BRAIN dynamically imports `<ImmersiveApp>` and mounts the Canvas. Choice is persisted in `localStorage["port:audience"]`.

---

## Key Architectural Decisions

- **One master GSAP timeline, one Lenis instance:** All scroll-driven animation scrubbed by a single timeline bound to `ScrollTrigger` on the page's scroll container. Never create competing timelines or secondary scroll listeners.
- **Continuous `transitionT`:** Transitions bleed 70%→30% across section seams. Text shaders, camera, creature morph, ink color all read `transitionT` uniformly so nothing jolts.
- **No discrete transition zones:** The old pattern of "section A ends, transition plays, section B begins" is replaced with overlapped ramp windows. The four `*Transition.tsx` components are **not** full-screen overlays; they are shaders + uniforms blended into the existing scenes.
- **Canvas never unmounts:** The `<Canvas>` persists at `fixed inset-0 z-0` for the entire peer route. Scene content swaps via conditional render on `useElementState().currentElement`, not Canvas mount/unmount.
- **No shadow maps:** Global shadowMaps disabled at startup. Complex shadows are baked into textures; runtime lighting is flat diffuse + ambient.
- **Particle text readability band:** In scroll range [0.30, 0.70] of a section, particles snap to legible rest-pose. Outside band, velocity fields dominate for visual drama. This balances visceral motion with readability.

---

## Phased Delivery (8–12 weeks evening cadence)

### Phase 0 — Foundation (week 1)

**Deliverables:**
- Branch `ImmersivePort` reset to clean state; legacy `index.html` / `main.js` / `style.css` removed
- Files copied from `Bot`: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/index.css`
- `src/App.tsx` with the Lenis+GSAP `useEffect` block from `Bot:src/App.tsx` lines 17–32
- `src/scene/SceneRoot.tsx` — empty `<Canvas>` with placeholder cube, single directional light
- `src/hooks/useScrollProgress.ts` — exposes `{ globalProgress, sectionProgress, currentSection }`
- 5 HTML `<section id="section-0..4">` blocks at `min-h-[100vh]` with placeholder copy
- ScrollTrigger wires placeholder cube rotation to scroll progress

**Done definition:** `npm run dev` starts; scrolling the page rotates the cube smoothly; `npm run lint` and `npm run build` both succeed.

### Phase 1 — Vertical Slice + Kill/Proceed Gate (weeks 2–3)

**Deliverables:**
- `src/routes/PathSelector.tsx` fully functional (HTML/CSS, two seals, localStorage persistence, BRAIN click loads `ImmersiveApp` via dynamic import, ENG click navigates to deployed Bot URL)
- `src/scene/elements/AirScene.tsx` — three cloud parallax layers, sumi-e sky, calligrapher ghost
- `src/text/ParticleText.tsx` — GPU-instanced particle system in Air state only; uses curl-noise velocity field; `uReadability` band gate working
- `src/creature/CreatureAvatar.tsx` — paper crane form with bezier-path drift
- `src/transitions/IceTransition.tsx` — particles freeze → fracture → drip
- `src/scene/elements/WaterScene.tsx` — initial pass with river surface + caustics, no koi yet
- `src/scene/CameraRig.tsx` — drift personality (Air) and oscillate personality (Water) only

**🚦 KILL/PROCEED GATE at end of week 3:**

Test plan: open the site for **3 strangers** (non-developer friends, ideally one designer-conscious peer). Ask: *"What do you think this site is about? What did you feel?"* Without prompting.

- **Proceed criteria:** at least 2 of 3 use words like *magical, alive, calligraphy, intentional, beautiful*. None complain about readability or motion sickness. Particle text reads naturally without conscious effort.
- **Pivot criteria:** anyone calls it *gimmicky, hard to read, slow, confusing*. Particle text doesn't cohere into legible form during readability band on a real browser/device combo. Phase 2 budget unrealistic given Phase 1 actual hours.
- **Pivot path:** swap `ParticleText` for `troika-three-text` with element-themed vertex displacement. Keep all other architecture (camera personalities, transitions, creature, ink colors, scene composition). Continue Phase 2 with reduced ambition.

### Phase 2 — Full Peer Path (weeks 4–7)

- **Week 4:** Water complete (koi creature, tributary geometry, hover ink-drop bloom on roles); BloomTransition (plant emergence → petrification)
- **Week 5:** Earth complete (three stone tablets, vines/crystals, stone-fracture text mode, tortoise creature)
- **Week 6:** Fire complete (kiln/forge scene, ember text, phoenix creature, hover camera push-in on artifacts); ForgeTransition
- **Week 7:** Spirit complete (central seal, four orbiting motifs as jump-back nav, contact CTA in journal); SmokeTransition; ink-color transmutation across all transitions verified continuous

### Phase 3 — Recruiter Route + Accessibility (week 8)

- `/resume` route: redirects to deployed `Bot` URL (or static HTML fallback if Bot deploy is unavailable)
- `useDeviceTier` GPU probe + low-tier fallback (MSDF text + flat transitions)
- `useReducedMotion` full static fallback (no Canvas; semantic HTML per section)
- `localStorage["port:audience"]` persistence — on reload, the visitor goes directly to their last-chosen path
- axe-core a11y pass on the static fallback; keyboard navigation through sections; focus management

### Phase 4 — Audio + Polish + Ship (weeks 9–10)

- 4 ambient stems sourced (CC0 from Freesound or commissioned) and crossfaded on `useScrollProgress`
- Bundle analysis via `vite build --mode analyze`; tree-shake drei + postprocessing imports; lazy-load `ImmersiveApp`
- Lighthouse perf pass: target ≥85 mobile / ≥90 desktop on the recruiter route, ≥70 mobile / ≥85 desktop on the peer route
- Cloudflare Pages deploy: `npm run build`, output `dist/`, framework preset Vite, Node 20, `_headers` file for hashed-asset cache-control (`public, max-age=31536000, immutable`)
- README pass with architecture diagram + asset attributions

---

## Critical Files to Create (initial scaffold from Bot, then bespoke)

| Path | Origin |
|---|---|
| `package.json` | copy from `Bot:package.json` |
| `vite.config.ts` | copy from `Bot:vite.config.ts` (drop GEMINI define) |
| `tsconfig.json` | copy from `Bot:tsconfig.json` |
| `index.html` | copy from `Bot:index.html`, retitle |
| `src/main.tsx` | copy from `Bot:src/main.tsx` |
| `src/index.css` | copy from `Bot:src/index.css` |
| `src/App.tsx` | new (uses Bot's Lenis+GSAP useEffect verbatim) |
| `src/routes/PathSelector.tsx` | new |
| `src/routes/ImmersiveApp.tsx` | new (lazy-loaded) |
| `src/scene/SceneRoot.tsx` | new |
| `src/scene/CameraRig.tsx` | new (adapts Bot:Experience.tsx ScrollTrigger pattern) |
| `src/scene/ElementStage.tsx` | new |
| `src/scene/PostFX.tsx` | new |
| `src/scene/elements/{Air,Water,Earth,Fire,Spirit}Scene.tsx` | new (5 files) |
| `src/transitions/{Ice,Bloom,Forge,Smoke}Transition.tsx` | new (4 files) |
| `src/creature/CreatureAvatar.tsx` | new |
| `src/creature/creatureTransitions.ts` | new |
| `src/text/ParticleText.tsx` | new |
| `src/text/glyphSampler.ts` | new |
| `src/text/velocityFields.ts` | new |
| `src/text/shaders/particleText.{vert,frag}.glsl` | new (2 files) |
| `src/content/elementStates.ts` | new |
| `src/content/sections.ts` | new (port copy from `Bot:src/App.tsx` sections) |
| `src/hooks/use{ScrollProgress,ElementState,ReducedMotion,DeviceTier}.ts` | new (4 files) |
| `src/audio/AudioBed.tsx` | new |
| `src/ui/{SectionHTML,EdgeCalligraphy,ContactSeal}.tsx` | new (3 files) |

---

## Top Risks + Mitigations

1. **Particle text feels gimmicky or illegible (highest risk).** Mitigation: explicit Phase 1 stranger-test gate; `uReadability` band gate already designed in; pre-specified MSDF + displacement fallback with most architecture preserved keeps pivot cost low.
2. **Transition seams jolt the camera and break flow.** Mitigation: continuous `transitionT` (no discrete zones); single master GSAP timeline scrubbed by Lenis (never two timelines competing); per-element camera jitter is added in `useFrame` *after* GSAP writes, never fighting it; PostFX swap and camera move never happen in the same frame.
3. **Bundle bloat from drei + postprocessing dependencies.** Mitigation: import only used effects (`{ Bloom }` not `*`); `vite build --mode analyze` checked at end of each phase; `ImmersiveApp` is dynamic-imported so the recruiter route never pays the immersive cost; KTX2/Basis textures.
4. **Time overrun.** Mitigation: `Bot` editorial portfolio ships first as the load-bearing site, removing schedule pressure on ImmersivePort. Phase 1 kill-gate prevents compounding loss.
5. **IP / fan-art read.** Mitigation: explicit no-character / no-named-bending-form rule. Visual vocabulary is Chinese ink painting + classical four-elements; ATLA stays as private inspiration only. Have a designer-conscious friend verify on the Phase 1 walkthrough.

---

## Verification Plan

### Phase 0 verification (week 1 done)

```bash
npm install
npm run dev    # opens http://localhost:3000 (or 3001 if 3000 taken)
# Manual: scroll page; placeholder cube rotates smoothly with no jank
npm run lint   # tsc --noEmit, exit 0
npm run build  # vite build, exit 0; verify dist/ structure
```

### Phase 1 verification (kill/proceed gate, end of week 3)

- **Functional:** path selector shows on entry; ENG click navigates to Bot URL; BRAIN click fades parchment, mounts Canvas, scrolls into Air; Air→Water transition is smooth; particle text in Air is legible during scroll-progress band [0.30, 0.70].
- **Performance:** Chrome DevTools Performance tab on a 2021 MacBook Air: sustained 60 fps through scroll; no >50ms long tasks; on a 3-year-old Android phone: ≥30 fps.
- **Stranger test:** open the site fresh in front of 3 non-developer testers (designer-leaning ideally); ask open-ended *"what is this and how did it feel?"*; record exact words; pass criterion in Phase 1 deliverables above.

### Phase 2 verification (each week)

- All five elements + four transitions traversable end-to-end via scroll
- Visual continuity check: ink color smoothly transmutes across each transition (no hard cuts visible)
- Creature continuity check: each form transitions to the next *visibly* (paper crane folds wet, koi embeds in stone, tortoise shell cracks releasing phoenix, phoenix dissolves into seal)
- Hover affordances on Water roles, Earth tools, Fire artifacts all working with correct readability

### Phase 3 verification (week 8)

- `/resume` redirects correctly
- Toggle `prefers-reduced-motion` in OS settings → site renders fully accessible static fallback
- Throttle to 4× CPU + slow 3G in DevTools; low-tier fallback engages, no Canvas-driven jank
- axe-core scan on the static fallback: zero critical violations
- Tab through entire site; focus order matches visual order; all interactive elements reachable

### Phase 4 verification (ship)

- `vite build --mode analyze` confirms peer JS gzipped < 2.5 MB; recruiter route < 120 KB; total assets < 8 MB
- Lighthouse: recruiter route ≥85 mobile / ≥90 desktop; peer route ≥70 mobile / ≥85 desktop
- Cloudflare Pages deploy succeeds; site live at production URL; both `/` (path selector → peer or recruiter) and `/resume` (recruiter direct) work
- Real-device QA: iPhone 12 / Pixel 5 / iPad / 2021 MBA / desktop Chrome, Firefox, Safari latest

---

## Troubleshooting

- **Jittery camera or particle text:** Check that Lenis+GSAP ticker is wired correctly in `App.tsx` useEffect. Verify `gsap.ticker.lagSmoothing(0, 0)` is set (disables lag smoothing so scrubbed animations don't auto-play).
- **Section element appears out of order on scroll:** Verify `<section id="section-0..4">` count and order in `App.tsx` exactly matches waypoint count in `CameraRig.tsx`. Use `console.log(useElementState())` to confirm currentSection mapping.
- **Text particles don't cohere during scroll band:** Check `uScrollProgress` is being passed to particle shader. Verify `uReadability` band is [0.30, 0.70] in the shader. Test by logging shader uniforms in a custom material spy.
- **PostFX flicker or performance drop:** Disable all PostFX in `PostFX.tsx` and re-enable one at a time. Each concurrent pass consumes 1/6 of frame budget on desktop.
- **Mobile device falls back to low tier unexpectedly:** Check `useDeviceTier()` GPU capability probe. Add `?tier=high` to URL to force a tier for testing.

---

## Open Items (resolved later, do not block planning)

- Section→element mapping was defaulted to recommended; if the user wants Spirit-first or four-elements-only, sections shift but architecture is unaffected.
- Audio sources: choose between commissioned vs CC0 pack at Phase 4 kickoff.
- Whether `/resume` redirects to Bot's deployed URL or serves a duplicate static HTML resume in this repo — depends on Bot's eventual production URL.
- Creature GLB sourcing strategy: own Blender models vs Quaternius/Sketchfab CC0 + customize. Decide at Phase 1 kickoff (paper crane is the first one needed).

---

## File Structure Cheat Sheet

```
src/
├── App.tsx                          # Lenis + ScrollTrigger + 5 <section> blocks
├── routes/PathSelector.tsx          # pre-Canvas HTML/CSS selector
├── scene/
│   ├── SceneRoot.tsx                # <Canvas>
│   ├── ElementStage.tsx             # active element + transition layer
│   ├── CameraRig.tsx                # master timeline + camera personality
│   ├── Lights.tsx                   # diffuse + ambient + hemi rig
│   ├── PostFX.tsx                   # element-conditional effects
│   └── elements/
│       ├── AirScene.tsx             # clouds + calligrapher
│       ├── WaterScene.tsx           # river + caustics
│       ├── EarthScene.tsx           # stone tablets + vines
│       ├── FireScene.tsx            # kiln + anvils
│       └── SpiritScene.tsx          # seal + orbiting motifs
├── creature/CreatureAvatar.tsx      # morph orchestration
├── text/
│   ├── ParticleText.tsx             # instanced system
│   ├── velocityFields.ts            # curl, flow, gravity, buoyancy, harmonic
│   └── shaders/particleText.{vert,frag}.glsl
├── content/
│   ├── elementStates.ts             # ElementState[] config
│   └── sections.ts                  # copy for 5 sections
├── hooks/
│   ├── useScrollProgress.ts         # 0..1 global + per-section + currentSection
│   ├── useElementState.ts           # current element + transitionT
│   ├── useReducedMotion.ts          # a11y
│   └── useDeviceTier.ts             # GPU probe
└── ui/
    ├── SectionHTML.tsx              # 5 <section> overlay divs
    ├── EdgeCalligraphy.tsx          # vertical nav
    └── ContactSeal.tsx              # footer CTA
```
