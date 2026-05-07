# Google Sketch Design Creation Prompts

UI/UX wireframes and layout specifications for ImmersivePort using Google Drawings or Sketch.

## Path Selector Screen

**Design Brief:**
```
Create a full-screen parchment-textured overlay design showing two centered seal stamps (chops).

Layout:
- Background: soft cream gradient (#F9F7F2 to #F5EFE0) with subtle ink-wash texture
- Title at top (25% down): "Choose your path through the work" in serif font, 48px, charcoal (#1C1C1C)
- Two large circular seals side-by-side, centered vertically at 50%
  - Left seal: ⚙ symbol with text "ENG" below, 180x180px, dark stroke with cream fill
  - Right seal: 🧠 symbol with text "BRAIN" below, 180x180px, dark stroke with cream fill
  - Gap between seals: 60px
- Hover state: subtle ink-bleed SVG animation around each seal (ripple outward)
- Click feedback: fade parchment to white, particles disperse upward
- Footer: "Scroll to explore →" in smaller serif, centered at bottom, 60% opacity

Canvas size: 1920x1080
Responsive breakpoint: stack seals vertically on mobile <768px
```

## Air Section Layout

**Design Brief:**
```
Create a composition showing the introduction screen (Section 0).

Layout (16-column grid):
- Left column (1-2): empty gutter
- Content area (3-14):
  - Hero headline: "Senior Data" on line 1, "Scientist" on line 2
    Font: 110px, font-weight: 900, color: #1C1C1C, line-height: 0.85
  - Divider line: 1px vertical bar, 2px height
  - Hero tagline: "4.5 years building production-scale GenAI, NLP, and Document AI systems"
    Font: 24px, serif, italic, color: #1C1C1C/80, max-width: 600px
  - 2-column grid below for metadata:
    - Col 1 | "IMPACT": descriptive text
    - Col 2 | "RECOGNITION": award mention
  - Floating element: paper crane silhouette drifting from left to right across the section
    (CSS animation or 3D scene overlay)
- Right column (15-16): empty gutter

Background: cream (#F9F7F2) with subtle cloud layers in background at 5% opacity
Text color overlay: charcoal (#1C1C1C) with mix-blend-multiply on 3D layer

Responsive: single-column on mobile, full grid on desktop
Particle system: Air curl-noise drift with readability band [30%, 70%] scroll
```

## Water Section Layout

**Design Brief:**
```
Create the Experience section (Section 1) composition.

Layout (16-column grid):
- Left column (1-2): empty gutter
- Content area (3-14):
  - Section number: "02" in 240px font-weight: 900, color: #1C1C1C/5
  - Hero headline: "The Blueprint" 110px, font-weight: 900, uppercase
  - 3-column role cards:
    - Card 1: "Ushur (Current)" — role summary, hover → ink-drop bloom effect
    - Card 2: "Junglee Games (Tributary)" — role summary, hover → ink-drop bloom
    - Card 3: "Kaglorisis (Spring)" — role summary, hover → ink-drop bloom
  - Each card: 280x400px, light border (teal #5FB3B3/20), serif font 14px, padding 24px
  - Floating element: koi fish swimming downstream from left to right
- Right column (15-16): empty gutter

Background: cream (#F9F7F2)
River scene: 3D render overlay showing flowing water with caustics, stone markers
Text blend: mix-blend-multiply on koi/river
Particle system: Water flow-field advection, role text drifts downstream
Hover affordance: marker hover → 2D fluid sim ink-drop appears on water surface

Responsive: stack cards vertically on mobile
```

## Earth Section Layout

**Design Brief:**
```
Create the Skills section (Section 2) composition.

Layout (16-column grid):
- Left column (1-2): empty gutter
- Content area (3-14):
  - Section number: "03" in 240px font-weight: 900, color: #1C1C1C/5
  - Hero headline: "Foundations" 110px, font-weight: 900, uppercase
  - SCENE STRUCTURE: Two stone tablets flanking a tall central Shiv Ling-style pillar
    - Tablet LEFT: "ML/AI & LLMs"
      Tags: LLaMA 2, GPT-4, Claude, RAG, prompt engineering, fine-tuning
    - CENTRAL PILLAR: "MLOps & Infra" (foundational — the pillar that supports everything)
      Peak is out of frame; pillar rises through canyon center
      Tags: Docker, K8s, FastAPI, Airflow, GitHub Actions, monitoring
    - Tablet RIGHT: "Vectors & DBs"
      Tags: Pinecone, Weaviate, pgvector, FAISS, semantic search, embeddings
  - Each tablet: 280x500px, ochre border (#C9854F/40), serif carving text 13px
  - Central pillar: 120px wide, full viewport height, same ochre styling
  - Camera angle: low-angle view, user looks up slightly toward tablets and pillar
  - Hover on tag → glow brighter, lift slightly out of stone, tag box expands
  - Floating element: stone tortoise at the base of the central pillar
- Right column (15-16): empty gutter

Background: cream (#F9F7F2)
Stone scene: 3D render — two tablets + central pillar, vines threading cracks, crystals in walls
Particle system: Earth gravity + fracture, characters break into mineral shards
Lighting: warm filtered light from above, casting long shadows down the canyon

Responsive: stack tablets vertically on mobile; pillar becomes a horizontal divider
```

## Fire Section Layout

**Design Brief:**
```
Create the Projects section (Section 3) composition.

CORE VISUAL CONCEPT: Back-POV perspective — viewer is behind/below the phoenix ascending.
The 3D background shows: phoenix wings framing left and right edges of viewport; ember-sun 
in center upper area; vast luminous cloud sky filling upper two-thirds of the frame.
The content overlays onto the spacious open sky area.

Layout (16-column grid):
- Content overlays onto the back-POV phoenix scene (not a separate panel)
- Section number: "04" in 240px font-weight: 900, color: #E84F1F/10 (ember ghost)
- Hero headline: "Forged Works" 110px, font-weight: 900, uppercase, anchored upper-left
- 2-column project cards float in the cloud sky area:
    - Project 1: "Enterprise RAG System" (left, ~40% from top)
      Subtitle: "$4M+ ARR | 100K+ PDFs/month"
      Stack: LangChain, GPT-4, Pinecone, FastAPI, Docker
      Metrics: 99%+ efficiency, 50%+ latency reduction
      Card: 380x420px, ember border (#E84F1F/40), semi-transparent background, serif text 12px
    - Project 2: "Zero-Shot Classification API" (right, ~40% from top)
      Subtitle: "15+ Production Deployments"
      Stack: RoBERTa, HuggingFace, Kubernetes, MLflow
      Metrics: <200ms P99 latency, 94% accuracy
      Card: 380x420px, same styling
- Phoenix wings visible at LEFT and RIGHT edges (just wing tips and feathers)
- Phoenix back-of-head barely visible at BOTTOM CENTER
- Spark constellations orbit the project cards (decorative, not interactive)
- Hover on card → camera push-in 1.5s ease, full case-study description appears

Background: back-POV phoenix ascending toward ember sun
Particle system: Fire buoyancy + turbulence, characters drift upward into the cloud sky
Heat shimmer: vertical sine distortion post-FX
Lighting: warm ember glow from below, cool luminous clouds from above

Responsive: full-height scroll on mobile; cards stack below phoenix POV top third
```

## Spirit Section Layout

**Design Brief:**
```
Create the Education + Closing section (Section 4) composition.

Layout (centered, responsive):
- Central focus: large ink seal (chop stamp) glowing in luminous gold (#F2C76A)
  Size: 280x280px, centered on screen, with slow rotation animation
- Four orbiting motifs around the seal (clickable jump-back navigation):
  - Top: cloud wisp (Air section) label "Air" below
  - Right: river fragment (Water section) label "Water" below
  - Bottom: stone shard (Earth section) label "Earth" below
  - Left: ember (Fire section) label "Fire" below
  - Each motif: 60x60px, orbital radius 180px from center, slow clockwise rotation
- Below seal (at 60% down):
  - Open journal with blank pages slowly filling with gold ink
  - Education block: "IIT Dharwad B.Tech CSE 2017–2021 | CGPA 7.56/10"
  - JEE rank: "Top 1% All India Rank"
  - Honors: "District Olympiad Winner"
  - Font: 16px serif, color: #1C1C1C, centered
- Footer (bottom 20%):
  - Contact CTA: "Let's create together"
  - Links: Email, LinkedIn, GitHub, Resume (PDF)
  - Font: 14px serif, color: #1C1C1C, centered

Background: cream (#F9F7F2)
Floating elements:
  - Central seal glows softly, rotating slowly
  - Four orbiting motifs trail luminous paths
  - Faint calligrapher ghost walks into frame and places the seal (optional 3D animation)
Particle system: Spirit harmonic return, particles re-form seal glyphs then to text
Lighting: cool white ambient with soft gold glow on seal
Scroll-snap: final wide view locks at bottom, visitor can scroll back up to revisit

Responsive: single-column on mobile, seal centered, motifs arranged in + pattern below
```

## Vertical Navigation (Desktop Only)

**Design Brief:**
```
Create a sticky left sidebar navigation (hidden on mobile).

Layout:
- Fixed left column, spans full viewport height
- Appears only on desktop (>768px)
- 1px border-right: #1C1C1C/10
- Vertical spacing: 48px between items

Items (top-to-bottom):
1. "Introduction" — [writing-mode: vertical-rl], rotate-180, 10px font-size, tracking-widest, color: #1C1C1C
2. "Experience" — same style, color: #1C1C1C/40 (inactive)
3. "Skills" — same style, color: #1C1C1C/40
4. "Projects" — same style, color: #1C1C1C/40
5. "Education" — same style, color: #1C1C1C/40

Active state: current section label is color: #1C1C1C (full opacity)
Inactive state: color: #1C1C1C/40 (40% opacity)

Transition: smooth opacity transition as user scrolls (0.3s easing)

Width: 80px
Padding: 16px left, 12px right
```

---

## Mobile Responsive Breakpoints

```
- Desktop (≥1024px): full grid layout, sidebar nav, floating elements visible
- Tablet (768px–1023px): 12-column grid, sidebar nav hidden, reduced floating elements
- Mobile (<768px): single column, stacked cards, no sidebar, particle system simplified
- Extra small (<375px): 1px padding reduction, font-sizes scaled -10%
```

## Accessibility Overlays

For `prefers-reduced-motion`, create static card layout:

```
- No floating elements (crane, koi, tortoise, phoenix, seal)
- No animations or transitions
- All sections stacked vertically with clear visual breaks
- Element colors retained as CSS gradients:
  - Air section bg: linear-gradient(to bottom, #F9F7F2, #F5EFE0)
  - Water section bg: linear-gradient(to bottom, #F9F7F2, #E8F5F5)
  - Earth section bg: linear-gradient(to bottom, #F9F7F2, #F0E8E0)
  - Fire section bg: linear-gradient(to bottom, #F9F7F2, #FFF0E8)
  - Spirit section bg: linear-gradient(to bottom, #F9F7F2, #FFFBF0)
- All text semantic HTML, keyboard-navigable
- Cards displayed in grid, no 3D transformations
```

---

## Design Export Checklist

- [ ] Path Selector mockup (1920×1080)
- [ ] Air Section mockup (1920×1080)
- [ ] Water Section mockup (1920×1080)
- [ ] Earth Section mockup (1920×1080)
- [ ] Fire Section mockup (1920×1080)
- [ ] Spirit Section mockup (1920×1080)
- [ ] Mobile layouts (<375px, 768px, 1024px)
- [ ] Navigation sidebar (desktop)
- [ ] Accessibility high-contrast variant
- [ ] Color palette swatch sheet
- [ ] Typography specimen sheet
