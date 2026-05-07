# Claude Design Prompts

Comprehensive design system and UX specifications for ImmersivePort generated via Claude AI. Use these prompts to generate design tokens, interaction patterns, accessibility guidelines, and visual language documentation.

---

## Design System Generation

**Prompt:**
```
Create a comprehensive design system for an immersive 3D portfolio website called "ImmersivePort" 
inspired by Avatar: The Last Airbender's elemental bending physics and East Asian ink painting aesthetics.

The site features five elemental sections that transform continuously as users scroll:
1. Air (Introduction) — white-ivory, calm, welcoming
2. Water (Experience) — teal, flowing, adaptive
3. Earth (Skills) — ochre, grounded, stable
4. Fire (Projects) — ember-orange, energetic, transformative
5. Spirit (Education + Closing) — luminous gold, connective, celestial

Generate a design system that includes:

1. **Color Palette** with hex codes, RGB, and HSL values for:
   - Primary element colors (Air, Water, Earth, Fire, Spirit)
   - Neutral colors (canvas background, text)
   - Semantic colors (hover, active, disabled states)
   - Transition color ramps between each element

2. **Typography System**:
   - Font families (serif for headings, sans-serif for UI)
   - Font sizes and weights (hero, section, body, caption)
   - Line heights and letter spacing
   - Responsive scaling rules for mobile/tablet/desktop

3. **Spacing System**:
   - Base unit spacing scale (4px, 8px, 16px, 24px, 48px, 96px)
   - Padding and margin conventions
   - Gap rules for grid/flex layouts
   - White space principles per element

4. **Component Library**:
   - Card variants per element (role cards, project cards, skill tags)
   - Button states and hover effects
   - Badge/tag styling for skills and tech stacks
   - Modal/overlay patterns

5. **Motion and Animation**:
   - Transition durations and easing functions
   - Scroll-triggered animation triggers
   - Hover and interaction feedback patterns
   - Element-specific velocity field animations

Format the output as a structured design tokens file with clear examples and usage guidelines.
```

## Particle Text Styling

**Prompt:**
```
Design a comprehensive visual language for GPU-instanced particle text animations used in the 
ImmersivePort portfolio website. The particle system renders portfolio copy as instanced 3D points 
that move according to element-specific velocity fields.

For each element (Air, Water, Earth, Fire, Spirit), define:

1. **Velocity Field Behavior**:
   - Air: curl noise drift (chaotic, organic motion)
   - Water: flow field advection (sideways river-like movement)
   - Earth: gravity + fracture (downward with shattering)
   - Fire: buoyancy + turbulence (upward with smoke-like swirling)
   - Spirit: harmonic blend (all fields at low amplitude, particles reform into seal glyphs)

2. **Color Transitions**:
   - Particle color per element
   - Color blending during section transitions
   - Opacity curves during readability bands
   - Glow/emission intensity per element

3. **Readability Engineering**:
   - Scroll band [30%, 70%] where particles snap to legible rest-pose
   - Outside band behavior (enhanced velocity field strength)
   - Text coherence vs. visual drama balance

4. **Performance Optimization**:
   - Particle count targets per device tier (high: 40k, mid: 18k, low: MSDF fallback)
   - Instancing strategy to minimize draw calls
   - LOD (level of detail) culling for off-screen particles
   - GPU memory budget allocation

5. **Interaction Patterns**:
   - Hover affordances that dissolve particles and reform text detail
   - Click feedback with particle bursts
   - Section transition particle choreography

Provide shader pseudocode and shader uniform specifications for implementation in GLSL.
```

## Camera Animation & Visual Flow

**Prompt:**
```
Design a cinematic camera system for an immersive 3D scrollytelling portfolio that creates visual 
continuity across five elemental scenes while maintaining user agency through scroll-based scrubbing.

Define camera behavior for each element:

1. **Air (Introduction)**:
   - Camera personality: drift
   - FOV: 75°
   - Movement pattern: slow lateral parallax with low-frequency roll noise (≤1.5°)
   - Focal point: paper crane drifting across frame
   - Visual tone: observational, peaceful

2. **Water (Experience)**:
   - Camera personality: oscillate
   - FOV: 60°
   - Movement pattern: gentle sine motion (boat-on-water rocking)
   - Focal point: koi fish swimming alongside
   - Visual tone: fluid, adaptive, immersive

3. **Earth (Skills)**:
   - Camera personality: rigid
   - FOV: 50°
   - Movement pattern: dampened motion with micro-tremors on scroll quartiles
   - **Camera angle: low, looking slightly upward** toward the two stone tablets and the central Shiv Ling-style pillar (whose peak is out of frame)
   - Focal point: the tall central pillar as axis; two tablets flank on either side
   - Visual tone: grounded, stable, monumental, reverential

4. **Fire (Projects)**:
   - Camera personality: handheld
   - FOV: 70°
   - Movement pattern: perlin noise offset (≤2px screen-space)
   - **Camera perspective: back-POV** — viewer is positioned directly behind/below the ascending phoenix; only partial wings and back of head visible at the bottom of frame; creature ascends toward the ember-sun in upper center; vast cloud sky fills the upper two-thirds of the frame
   - Focal point: rising ember-sun in upper center; phoenix wings frame left/right edges
   - Visual tone: ascending, energetic, transcendent, vast

5. **Spirit (Education)**:
   - Camera personality: orbit
   - FOV: 55°
   - Movement pattern: slow rotation around central seal
   - Focal point: celestial motifs in orbit
   - Visual tone: transcendent, reflective, comprehensive

Design the **transition camera movements** between elements:

- Air→Water: camera dives downward following a falling drip, impacts still water
- Water→Earth: camera lifts upward following growing vines into stone canyon
- Earth→Fire: camera follows stone fragments sliding into furnace (push-in)
- Fire→Spirit: camera pulls back and upward as smoke spirals and condenses

For each transition, specify:
- Duration (in scroll percentage, not time)
- Interpolation curve (ease-in, ease-out, ease-in-out)
- Position waypoints (start X,Y,Z → end X,Y,Z)
- Rotation quaternion targets
- FOV ramp if applicable

Provide GSAP timeline pseudocode showing how these movements are scrubbed by scroll position.
```

## Interaction & Hover States

**Prompt:**
```
Design a comprehensive interaction system for ImmersivePort that balances immersive 3D effects 
with responsive, intuitive user feedback.

Define hover and click behaviors for interactive elements per section:

**Air (Introduction)**:
- No hover affordances — section is observational
- Subtle particle density increase on mousemove
- No clickable elements

**Water (Experience)**:
- Hover markers (stone lanterns on riverbank) → ink-drop bloom effect
- Bloom appears on water surface via 2D fluid simulation shader
- Click marker → scroll smoothly to full role details
- Hover text → particles cohere into legible formation
- Cursor changes to pointer over markers

**Earth (Skills)**:
- Hover tool/library tag → glow brighter, lift slightly out of stone, tag box expands
- Hover reveals full tech stack description
- Click tag → scroll to full skill category card
- Stone-fracture text mode on hover (particles break into shards, reassemble on unhover)
- Visual feedback: warm glow (#FFE4B5 overlay at 20% opacity)

**Fire (Projects)**:
- Hover project card → camera does 1.5s push-in on artifact
- Hover → ember-text resolves to full case-study description
- Metrics appear as spark constellation animations
- Click card → detailed project modal (or section scroll)
- Visual feedback: heat shimmer intensification, particle upward drift acceleration

**Spirit (Education)**:
- Hover orbiting motifs → highlight border, fade other elements to 40% opacity
- Motif glow increases, orbital speed accelerates slightly
- Click motif → smooth scroll to that section (Air/Water/Earth/Fire)
- Hover journal → pages animate as if being written
- Contact CTA buttons with standard hover darken/glow effect

**Global Interactions**:
- Scroll position indicator on sidebar (desktop only)
- Smooth scroll hijacking via Lenis (never native scroll)
- Keyboard navigation: arrow keys scroll sections, numbers jump to section
- Touch: swipe down = scroll down, haptic feedback on section transitions (if available)

Define for each interaction:
- Visual feedback (color change, glow, scale, rotation)
- Timing (duration, easing curve, delay)
- Sound/haptic feedback (if applicable)
- Accessibility alternative (keyboard, screen reader announcement)

Provide CSS and GSAP timeline pseudocode for each interaction.
```

## Accessibility & Inclusive Design

**Prompt:**
```
Design a comprehensive accessibility strategy for ImmersivePort that ensures the experience is 
inclusive for users with disabilities while maintaining the core artistic vision.

Define solutions for:

1. **Vision Accessibility**:
   - High-contrast mode (double text brightness, increase color saturation)
   - Large text mode (scale all fonts +25%)
   - Focus indicators (bright border around interactive elements)
   - Screen reader compatibility (semantic HTML, ARIA labels, heading hierarchy)
   - Color blindness: ensure no critical info is conveyed by color alone

2. **Motion Accessibility** (prefers-reduced-motion):
   - Disable all animations and particle motion
   - Show static high-quality hero images instead of 3D scenes
   - Replace scroll-triggered effects with instant state changes
   - Keep elemental color gradients as CSS backgrounds
   - Preserve all content and interactive elements

3. **Cognitive Accessibility**:
   - Clear, readable typography (no decorative fonts in body text)
   - Generous whitespace and visual breaks
   - Consistent navigation patterns
   - Plain language in microcopy
   - Limit animation to <5 concurrent elements at once

4. **Motor Accessibility**:
   - Keyboard-navigable interface (Tab through all interactive elements)
   - Focus order matches visual top-to-bottom, left-to-right order
   - Minimum click target size: 44×44px (mobile), 36×36px (desktop)
   - Alternative to scroll: section navigation buttons at bottom of each section
   - Voice control support (if applicable)

5. **Auditory Accessibility**:
   - Captions for any video content
   - Transcripts for audio ambient stems
   - Visual indicators when audio plays
   - No critical content conveyed by sound alone

6. **Temporal Accessibility**:
   - No time-based interactions or auto-playing animations
   - Users can pause, rewind, replay any effect
   - Scroll-based timing (not frame-based)

Define a **static fallback experience** for users with:
- prefers-reduced-motion enabled
- Low-end devices (GPU tier: low)
- JavaScript disabled

This fallback should:
- Render all content as semantic HTML with CSS-only styling
- Show high-quality hero images in place of 3D scenes
- Use CSS gradients to represent element colors
- Maintain full content and interaction capability
- Pass axe-core accessibility audit with zero critical violations
- Achieve WCAG 2.1 Level AA compliance

Provide HTML structure, CSS patterns, and ARIA labels for implementing accessible components.
```

## Visual Hierarchy & Information Architecture

**Prompt:**
```
Design a visual hierarchy system for ImmersivePort that guides users' attention through each 
section while maintaining the immersive 3D aesthetic.

Define typographic and spatial hierarchy for:

**Hero Content** (section headings):
- Font size: 110px (desktop), 60px (tablet), 42px (mobile)
- Font weight: 900
- Color: #1C1C1C
- Letter spacing: tight (-1px)
- Spacing above: 48px, below: 32px
- Line height: 0.85 (for multi-line impact)

**Primary Content** (descriptive text, role titles, project names):
- Font size: 24px (desktop), 18px (tablet), 16px (mobile)
- Font weight: 600
- Color: #1C1C1C
- Letter spacing: normal (0px)
- Line height: 1.3

**Secondary Content** (body text, descriptions, metrics):
- Font size: 16px (desktop), 14px (tablet), 13px (mobile)
- Font weight: 400
- Color: #1C1C1C (80% opacity for lighter text)
- Letter spacing: +0.3px
- Line height: 1.6

**Tertiary Content** (tags, labels, captions):
- Font size: 12px (desktop), 11px (tablet), 10px (mobile)
- Font weight: 600
- Color: #1C1C1C (60% opacity)
- Letter spacing: +0.5px (uppercase: +0.3em)
- Text transform: uppercase
- Line height: 1.4

**Visual Hierarchy Through Space**:
- Content padding: 32px/48px (section interior)
- Card padding: 24px (internal content)
- Gap between cards: 32px (grid)
- Vertical section spacing: min-height 100vh (viewport height)

**Visual Hierarchy Through Color**:
- Primary text: #1C1C1C (100%)
- Secondary text: #1C1C1C (80%)
- Tertiary text: #1C1C1C (60%)
- Disabled/inactive: #1C1C1C (40%)
- Dividers/borders: #1C1C1C (10%)
- Element-specific overlays: per-element ink color at 5-20% opacity

**Focal Points Per Section**:
- Air: paper crane in center-left, title in upper-left
- Water: koi fish center-right, role cards below
- Earth: stone tablets center, skill tags as callouts
- Fire: forge glow center, project cards orbiting
- Spirit: seal center, orbiting motifs around

Provide CSS custom properties (--text-hero, --text-primary, etc.) for theming.
```

## Transition & Animation Choreography

**Prompt:**
```
Design a comprehensive animation system for the four elemental transitions in ImmersivePort 
that creates visual continuity and narrative momentum as users scroll between sections.

**Transition 1: Air→Water (Ice Crystallization)**

Duration: 30% of scroll window (from 70% of Air section to 30% of Water section)

Animation sequence:
1. Ink particles slow down (velocity field strength ramps to 50%)
2. Particles freeze into 6-fold ice crystal geometry (0-33% of transition)
3. Ice refracts distant view with bloom effect (10-50%)
4. Crystals fracture and become liquid drips (33-66%)
5. Camera dives downward following a falling drip (50-100%)
6. Drip impacts still water surface, ripples expand outward (90-100%)

Color ramp: #F5EFE0 (Air white) → #5FB3B3 (Water teal)
Fog changes: light → dense
Camera movement: lateral drift → downward dive
Sound: subtle whoosh and water splash

---

**Transition 2: Water→Earth (Plant Emergence + Petrification)**

Duration: 30% of scroll window (from 70% of Water section to 30% of Earth section)

Animation sequence:
1. Water saturates riverbank, particle density increases (0-25%)
2. Reeds and tendrils sprout from particles (20-40%)
3. Tendrils thicken into bark texture (35-60%)
4. Bark hardens into stone, color shifts to ochre (55-80%)
5. Koi fish swims to shore, comes to rest (40-70%)
6. Stone wraps around koi, forming tortoise shell (70-90%)
7. Camera lifts upward following a vine into stone canyon (70-100%)

Color ramp: #5FB3B3 (Water teal) → #C9854F (Earth ochre)
Fog changes: damp → warm and earthy
Camera movement: oscillating boat motion → upward lift
Lighting: cool reflections → warm stone glow
Sound: water draining, stone settling, vine growing

---

**Transition 3: Earth→Fire (Pottery/Forge)**

Duration: 30% of scroll window (from 70% of Earth section to 30% of Fire section)

Animation sequence:
1. A glowing crack appears in stone tablet center (0-20%)
2. Crack expands with heat shimmer; pottery kiln materializes on right (15-35%)
3. Stone fragments slide into kiln furnace (30-60%)
4. Kiln materializes around camera view at ground-level (40-70%)
5. Tortoise shell glows from within (45-65%)
6. **Shell cracks and releases an AGILE SQUIRREL** — not a phoenix; the squirrel is small, fast, nervous with transformation energy (60-75%)
7. **Squirrel leaps toward the kiln fire and ignites** (70-85%)
8. **Phoenix emerges from the squirrel's ignition** and rises upward (80-100%)
9. Heat shimmer post-process activates and intensifies (60-100%)
10. Camera follows squirrel at ground-level, then pivots upward to track phoenix ascent (75-100%)

Color ramp: #C9854F (Earth ochre) → #E84F1F (Fire ember)
Fog changes: stone dust → heat haze
Camera movement: rigid low-angle → ground-level tracking → upward pivot (back-POV on phoenix)
Lighting: cool stone → hot forge glow with bloom
Post-FX: chromatic aberration (0-30%), heat shimmer (30-100%)
Sound: stone cracking, kiln ignition, small scurrying, sudden burst of flame, phoenix cry

---

**Transition 4: Fire→Spirit (Smoke Condenses to Ink)**

Duration: 30% of scroll window (from 70% of Fire section to 30% of Spirit section)

Animation sequence:
1. Spark emission rate increases (particles drift upward faster)
2. Smoke generation increases, particle color shifts to orange
3. Smoke spiral tightens and spirals upward faster (0-40%)
4. Phoenix flies upward into spiral center (30-60%)
5. Phoenix dissolves into smoke, silhouette fades (60-75%)
6. Smoke condenses into liquid ink, gains viscosity (50-80%)
7. Ink flows toward central seal shape (70-100%)
8. Seal glows with luminous gold light (80-100%)
9. Camera pulls back and upward (70-100%), FOV widens
10. Ambient light cools from warm to cool white

Color ramp: #E84F1F (Fire ember) → #F2C76A (Spirit gold)
Fog changes: hot haze → cool mist
Particle system: buoyancy drift → harmonic oscillation
Lighting: warm forge glow → cool celestial light
Post-FX: heat shimmer fades out, bloom increases on seal
Sound: wind rising, phoenix dissolving, ink flowing, silence settling

---

**Technical Implementation**:

For each transition, define:
- Uniform ramps: uTransitionT (0..1), uFogDensity, uParticleVelocityStrength
- Particle behavior: velocity field blend, color lerp, size/opacity curves
- Camera path: Catmull-Rom spline with precise waypoints
- Shader effects: chromatic aberration amount, heat shimmer frequency/amplitude
- Lighting changes: directional intensity, ambient color, fog color
- Post-FX stack: enable/disable/intensity curves per effect

Provide GLSL shader uniforms and Three.js animation timeline specifications.
```

---

## Usage Instructions

1. **For Design System Generation:**
   - Copy the "Design System Generation" prompt to Claude
   - Request output format: JSON for programmatic use or Markdown for documentation
   - Generate design tokens file for import into Tailwind config

2. **For Interaction Design:**
   - Copy relevant section prompts (Particle Text, Camera, Interaction, etc.)
   - Request pseudocode or implementation examples
   - Use output to inform component API design in React/Three.js

3. **For Accessibility:**
   - Copy the "Accessibility & Inclusive Design" prompt
   - Request WCAG 2.1 Level AA compliance checklist
   - Generate semantic HTML templates for static fallback

4. **For Animation:**
   - Copy "Transition & Animation Choreography" prompt
   - Request GLSL shader code and Three.js timeline code
   - Use output for ScrollTrigger configuration

---

## Prompt Customization Tips

- **Adjust verbosity:** Add "Provide a concise overview in bullet points" for shorter responses
- **Request code examples:** Add "Include TypeScript/JavaScript examples" for implementation-ready output
- **Specify format:** Add "Format output as a Figma design spec" or "Create a developers' guide"
- **Add constraints:** Add "Keep total response under 2000 words" for focused output
- **Request variations:** Add "Provide 3 alternative approaches for [topic]" for design options

---

## Cross-Reference

- **Gemini Prompts:** Use image outputs to inform color choices and visual direction
- **Sketch Prompts:** Use wireframes to inform responsive breakpoints and layout spacing
- **CLAUDE.md:** Refer to architectural constraints (performance budget, component tree, phase deliverables)
