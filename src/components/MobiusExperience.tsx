import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { buildPaperMobius }           from '../lib/mobius/mobius-geometry.js';
import { buildSectionedPaperTexture,
         buildBlankPaperTexture,
         buildPaperNormalMap,
         createPaperMaterial }         from '../lib/mobius/paper-materials.js';
import { createViewSystem }            from '../lib/mobius/camera-views.js';
import { setupPaperLighting,
         createPaperEnvironment,
         configureRendererForPaper }   from '../lib/mobius/scene-helpers.js';
import { renderBlocks }                from '../lib/mobius/content-renderers.js';
import { getTexturePreset }            from '../lib/mobius/texture-presets.js';
import { experiences }                 from '../data/experience';

// ─── View config ──────────────────────────────────────────────────────────────
type ViewType = 'orbit' | 'reference' | 'closeup';
const VIEWS: ViewType[]                   = ['orbit', 'reference', 'closeup'];
const VIEW_LABELS: Record<ViewType, string> = {
  orbit:     'Orbit',
  reference: 'Reference',
  closeup:   'Closeup',
};

// ─── Content theme — all canvas-pixel sizes doubled from base ─────────────────
const THEME = {
  heading: { color: '#2a1111', family: 'Playfair Display, Georgia, serif', size: 116 },
  body:    { color: '#5c2323', family: 'Inter, system-ui, sans-serif',     size: 54 },
  accent:  { color: '#4a1c1c' },
  spacing: { paragraph: 44, bullets: 44, divider: 40 },
};

// Double the list for the double-cover (uMax=4π) so content wraps seamlessly.
const SECTIONS = [...experiences, ...experiences];

function buildFrontTexture(): THREE.CanvasTexture {
  const preset = getTexturePreset('warm-paper');
  return buildSectionedPaperTexture({
    width: 16384,
    height: 2048,          // doubled
    sectionCount: SECTIONS.length,
    gutter: 0.18,
    drawBackground: preset.drawBackground,
    drawSection(ctx, { index, colX, innerW }) {
      const exp = SECTIONS[index];

      if (exp.tag) {
        ctx.fillStyle = '#4a1c1c';
        ctx.font = `bold 40px ${THEME.body.family}`;   // doubled
        ctx.textBaseline = 'top';
        const label = `  ${exp.tag.toUpperCase()}  `;
        const tw = ctx.measureText(label).width;
        ctx.fillRect(colX, 104, tw, 56);               // y, h doubled
        ctx.fillStyle = '#F4EFE6';
        ctx.fillText(label, colX, 112);                // y doubled
      }

      renderBlocks(ctx, [
        { type: 'heading',   text: exp.company, size: THEME.heading.size },
        { type: 'paragraph', text: exp.title,   size: 52, italic: true, color: THEME.accent.color },
        { type: 'paragraph', text: exp.date,    size: 44, color: '#7a4a4a' },
        { type: 'divider',   width: 0.5 },
        { type: 'bullets',   items: exp.bullets, size: 48 },
      ], { x: colX, y: 220, width: innerW, theme: THEME });  // y doubled
    },
  });
}

// ─── Main component ───────────────────────────────────────────────────────────
export function MobiusExperience() {
  const canvasRef      = useRef<HTMLCanvasElement>(null);
  const sectionRef     = useRef<HTMLDivElement>(null);
  const viewSystemRef  = useRef<ReturnType<typeof createViewSystem> | null>(null);
  const frontTexRef    = useRef<THREE.CanvasTexture | null>(null);
  const hoverRef       = useRef<{ dispose: () => void } | null>(null);

  // Accumulated wheel/touch delta drives texture offset
  const scrollTargetRef  = useRef(0);
  const scrollCurrentRef = useRef(0);

  // Hover-shake intensity, lerps 0 ↔ 1 so the motion eases in & out
  const shakeRef = useRef(0);

  const [view, setView]   = useState<ViewType>('orbit');
  const [ready, setReady] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [hoverPos, setHoverPos]     = useState({ x: 0, y: 0 });
  const hoveredIdxRef = useRef<number | null>(null);  // mirror for the render loop

  const cycleView = useCallback(() => {
    setView(prev => {
      const next = VIEWS[(VIEWS.indexOf(prev) + 1) % VIEWS.length];
      viewSystemRef.current?.apply(next);
      return next;
    });
  }, []);

  const goNext = useCallback(() => {
    document.getElementById('earth')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let mounted = true;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    configureRendererForPaper(renderer, { exposure: 1.05 });

    // ── Scene + camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    // Telephoto FOV — strip fills the wide canvas without overflowing top/bottom
    const camera = new THREE.PerspectiveCamera(28, canvas.clientWidth / canvas.clientHeight, 0.1, 200);
    camera.position.set(0, 1.6, 11.0);

    // ── Environment + lighting ────────────────────────────────────────────────
    const envTex = createPaperEnvironment(renderer);
    scene.environment          = envTex;
    scene.environmentIntensity = 0.55;
    setupPaperLighting(scene, { shadows: false });

    // ── Textures (deferred until fonts load) ──────────────────────────────────
    document.fonts.ready.then(() => {
      if (!mounted) return;

      const normalMap = buildPaperNormalMap({ width: 2048, height: 2048, repeat: [8, 2] });
      const frontTex  = buildFrontTexture();
      const backTex   = buildBlankPaperTexture({ width: 1024, height: 512 });

      frontTexRef.current = frontTex;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const frontMat = createPaperMaterial({
        map: frontTex, normalMap,
        color: 0xffffff, roughness: 0.86, sheen: 0.8, normalScale: 0.35,
        side: THREE.FrontSide,
      } as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const backMat = createPaperMaterial({
        map: backTex, normalMap,
        color: 0xffffff, roughness: 0.86, sheen: 0.5, normalScale: 0.35,
        side: THREE.BackSide,
      } as any);

      // ── Strip geometry — all proportions doubled ──────────────────────────
      const { group, front } = buildPaperMobius({
        frontMaterial: frontMat,
        backMaterial:  backMat,
        thickness: 0.036,
        shared: {
          R: 4.2, width: 1.1,
          segU: 1800, segV: 48,
          uMax: Math.PI * 4,
        },
      });
      group.rotation.set(-1.28, 0.32, 0);
      scene.add(group);

      // ── View system — created HERE (not earlier) so we can pass `target:
      //     group`. That unlocks per-view strip rotation: each view tweens
      //     the group's pose alongside the camera, which is the trick from
      //     the mobius-resume-3d skill that makes Close-up readable. ────────
      const vs = createViewSystem(camera, { tweenDuration: 0.75, target: group });
      vs.add('orbit', {
          orbit: true, fov: 28,
          orbitOptions: { radius: 11.0, height: 1.6, speed: 0.18, wobble: 0.4 },
          rot: [-1.28, 0.32, 0],
        })
        .add('reference', {
          cam: [0, 4.0, 12.0], look: [0, 0.5, 0], fov: 30,
          rot: [-1.28, 0.32, 0],
        })
        // Cinematic close-up: camera offset to the side + look offset matches
        // the skill's `closeup` config (×2 distances since our R is doubled).
        // The slight rot tweak (-1.32, 0.42) re-poses the strip so the front
        // face of one section squares up to the camera — that's why text reads.
        .add('closeup', {
          cam: [-2.8, 0.2, 8.6], look: [-0.8, 0, 0], fov: 26,
          rot: [-1.32, 0.42, 0],
        });
      vs.apply('orbit', { instant: true });
      viewSystemRef.current = vs;

      // ── Hover — canvas-relative NDC raycast onto the front face ───────────
      const raycaster = new THREE.Raycaster();
      const ndc       = new THREE.Vector2();
      let lastIdx     = -1;

      const onPointerMove = (e: PointerEvent) => {
        const rect = canvas.getBoundingClientRect();
        ndc.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
        ndc.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObject(front, false);
        if (hits.length > 0 && hits[0].uv) {
          // Reverse the scroll-driven texture offset so we land in canvas-section space
          let u = hits[0].uv.x + frontTex.offset.x;
          u = ((u % 1) + 1) % 1;
          const idx = Math.min(SECTIONS.length - 1, Math.floor(u * SECTIONS.length));
          if (idx !== lastIdx) {
            lastIdx = idx;
            hoveredIdxRef.current = idx;
            setHoveredIdx(idx);
          }
          // Viewport coords so the tooltip can use position:fixed and not
          // depend on which container it's rendered in.
          setHoverPos({ x: e.clientX, y: e.clientY });
        } else if (lastIdx !== -1) {
          lastIdx = -1;
          hoveredIdxRef.current = null;
          setHoveredIdx(null);
        }
      };
      const onPointerLeave = () => {
        if (lastIdx !== -1) {
          lastIdx = -1;
          hoveredIdxRef.current = null;
          setHoveredIdx(null);
        }
      };
      canvas.addEventListener('pointermove',  onPointerMove);
      canvas.addEventListener('pointerleave', onPointerLeave);
      hoverRef.current = {
        dispose: () => {
          canvas.removeEventListener('pointermove',  onPointerMove);
          canvas.removeEventListener('pointerleave', onPointerLeave);
        },
      };

      setReady(true);
    });

    // ── Wheel / touch → texture offset (only intercepted ON the canvas, so
    //     scrolling over heading/button passes through to the page normally) ─
    let touchStartY = 0;
    const SCROLL_SPEED = 0.0006;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollTargetRef.current += e.deltaY * SCROLL_SPEED;
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const dy = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      scrollTargetRef.current += dy * SCROLL_SPEED * 2;
    };

    canvas.addEventListener('wheel',      onWheel,      { passive: false });
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove',  onTouchMove,  { passive: false });

    // ── Render loop ───────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    function animate() {
      raf = requestAnimationFrame(animate);
      const dt      = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      scrollCurrentRef.current += (scrollTargetRef.current - scrollCurrentRef.current) * Math.min(1, dt * 5);
      if (frontTexRef.current) {
        frontTexRef.current.offset.x = scrollCurrentRef.current;
      }

      const vs = viewSystemRef.current;
      vs?.update(dt, elapsed);

      // Hover micro-motion. Lerp intensity in/out so it eases on hover-enter
      // and -leave (no snap), and use a low-frequency, low-amplitude wave —
      // a gentle "breath" rather than a shake.
      const target = hoveredIdxRef.current !== null ? 1 : 0;
      shakeRef.current += (target - shakeRef.current) * Math.min(1, dt * 4);
      if (vs && shakeRef.current > 0.005) {
        const t = elapsed * 1.6;                // ~0.25 Hz wave
        const k = shakeRef.current;
        camera.position.x += Math.sin(t)        * 0.022 * k;
        camera.position.y += Math.cos(t * 1.35) * 0.016 * k;
        camera.lookAt(vs.getLookTarget());
      }

      renderer.render(scene, camera);
    }
    animate();

    // ── Resize handler ────────────────────────────────────────────────────────
    const ro = new ResizeObserver(() => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(canvas);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('wheel',      onWheel);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove',  onTouchMove);
      hoverRef.current?.dispose();
      hoverRef.current      = null;
      renderer.dispose();
      envTex.dispose();
      frontTexRef.current   = null;
      viewSystemRef.current = null;
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full md:pl-[80px] flex flex-col py-12 relative overflow-hidden"
    >

      {/* Layer 0 — canvas spans the entire section so the strip can flow under
          the heading and button. Pointer events / touch-action live HERE so
          scroll and hover only fire when the cursor is over the strip; over
          the heading or button text, events pass to the page normally. */}
      <div
        className="absolute inset-0 z-0 cursor-pointer select-none"
        onClick={cycleView}
        role="button"
        aria-label={`Experience — click to switch to ${VIEW_LABELS[VIEWS[(VIEWS.indexOf(view) + 1) % VIEWS.length]]}`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ background: 'transparent', touchAction: 'none' }}
        />
      </div>

      {/* Layer 20 — heading. Sits ABOVE the canvas; the strip is visible
          flowing behind these blocks, between the cream page background and
          this serif text. The LEFT column (badge + heading + description)
          slides off-right when CLOSEUP is active, so the cinematic strip
          framing isn't fighting the title for attention. The RIGHT column
          (dots + view label) stays put — it's the legend for the active view. */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          {/* Left — slides right on closeup so the cinematic strip framing
              isn't fighting the title for attention; stays visible (just
              displaced + slightly receded) so the section remains anchored. */}
          <div
            className={`transition-all duration-700 ease-out will-change-transform ${
              view === 'closeup'
                ? 'translate-x-[34vw] opacity-70 pointer-events-none'
                : 'translate-x-0 opacity-100'
            }`}
          >
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-60 mb-8 border-b border-[#4a1c1c]/20 pb-2 inline-block">
              02 / Experience
            </div>
            <h2 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight mb-4">
              The Blueprint
            </h2>
            <p className="text-sm text-[#5c2323] leading-relaxed opacity-80 max-w-sm font-medium">
              My career as a Möbius strip — one continuous surface, no hard stops.
              Scroll to traverse; click to shift perspective.
            </p>
          </div>

          {/* Right — view legend, always visible */}
          <div className="flex flex-col items-start md:items-end gap-2 pb-1">
            <div className="flex items-center gap-3">
              {VIEWS.map(v => (
                <div key={v} className={`rounded-full transition-all duration-300 ${
                  view === v ? 'w-3 h-3 bg-[#4a1c1c]' : 'w-2 h-2 bg-[#4a1c1c]/30'
                }`} />
              ))}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono text-[#4a1c1c] opacity-60">
              {VIEW_LABELS[view]}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 10 — invisible spacer that holds the section's height open
          (so the canvas behind has room) and hosts overlays that should sit
          ON the strip area. pointer-events-none means it never blocks clicks
          to the canvas underneath. */}
      <div className="relative z-10 h-[580px] pointer-events-none">

        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#4a1c1c] opacity-30 animate-pulse">
              Rendering…
            </span>
          </div>
        )}

        {ready && view === 'orbit' && hoveredIdx === null && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center">
            <span className="text-[10px] uppercase tracking-widest font-mono text-[#4a1c1c] opacity-35">
              Scroll to traverse · Hover to inspect · Click to change view
            </span>
          </div>
        )}

      </div>

      {/* Hover tooltip — fixed to viewport so it follows cursor accurately
          regardless of which container it lives under in the DOM */}
      {hoveredIdx !== null && SECTIONS[hoveredIdx] && (
        <div
          className="fixed z-30 pointer-events-none transition-opacity duration-150"
          style={{
            left: `${hoverPos.x}px`,
            top:  `${hoverPos.y}px`,
            transform: 'translate(16px, -50%)',
          }}
        >
          <div className="bg-[#4a1c1c] text-[#F4EFE6] px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-mono whitespace-nowrap shadow-lg">
            {SECTIONS[hoveredIdx].company}
            <span className="opacity-60 ml-2">— {SECTIONS[hoveredIdx].title}</span>
          </div>
        </div>
      )}

      {/* Layer 20 — next-section button, also above the canvas */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-2 flex justify-end">
        <button
          onClick={goNext}
          className="group flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] font-medium text-[#4a1c1c] opacity-70 hover:opacity-100 transition-opacity"
        >
          <span>Next</span>
          <span className="flex items-center justify-center w-8 h-8 border border-[#4a1c1c]/40 rounded-full group-hover:bg-[#4a1c1c] group-hover:text-[#F4EFE6] transition-all duration-300">
            ↓
          </span>
        </button>
      </div>

    </div>
  );
}
