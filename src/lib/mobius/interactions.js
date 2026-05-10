// utils/interactions.js
// ---------------------------------------------------------------------------
// Reusable interaction primitives for scroll-driven 3D pages.
//
//   createScrollFlow(texture, options)     → texture U-offset follows page scroll
//   createCursorParallax(options)          → cursor offset, applied per-frame
//   createIdleRotation(object, options)    → subtle breathing rotation
//   createMobiusHover(options)             → raycast hover on the strip with
//                                            section index resolution and callbacks
//
// All factories return an object with `update(dt)` (where applicable) and
// `dispose()` so they can be cleanly torn down on unmount.
// ---------------------------------------------------------------------------

import * as THREE from 'three';

// ---------------------------------------------------------------------------
// Scroll-driven texture flow
// ---------------------------------------------------------------------------
/**
 * Map page scroll to texture U-offset, with smoothing.
 * Lets you build the "strip rotates as you scroll, silhouette stable" effect.
 *
 * @param {THREE.Texture} texture
 * @param {object} [opts]
 * @param {number}  [opts.loops=1]      How many full texture passes per page scroll.
 * @param {number}  [opts.smoothing=6]  Higher = snappier follow.
 * @param {number}  [opts.direction=-1] +1 or -1 to flip flow direction.
 * @param {(p:number, idx:number)=>void} [opts.onProgress] Called every scroll with
 *        normalized progress (0..1) and active section index (if `sectionCount` set).
 * @param {number}  [opts.sectionCount] Total sections; enables idx in onProgress.
 * @param {HTMLElement|Window} [opts.scrollEl=window]
 * @param {HTMLElement} [opts.trackEl] Element whose height defines the scroll range.
 *                                     If omitted, document scrollHeight is used.
 */
export function createScrollFlow(texture, {
  loops = 1, smoothing = 6, direction = -1,
  onProgress, sectionCount,
  scrollEl = window, trackEl,
} = {}) {
  let target = 0;
  let current = 0;
  let progress = 0;

  const getMax = () => {
    const docH = trackEl ? trackEl.scrollHeight : document.documentElement.scrollHeight;
    return docH - window.innerHeight;
  };

  const onScroll = () => {
    const max = getMax();
    const y   = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
    progress  = max > 0 ? Math.max(0, Math.min(1, y / max)) : 0;
    target    = progress * loops;
    if (onProgress) {
      const idx = sectionCount
        ? Math.min(sectionCount - 1, Math.floor(progress * sectionCount + 1e-4))
        : -1;
      onProgress(progress, idx);
    }
  };

  scrollEl.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return {
    /** Call every frame from your render loop. */
    update(dt) {
      current += (target - current) * Math.min(1, dt * smoothing);
      texture.offset.x = direction * current;
    },
    getProgress() { return progress; },
    dispose() { scrollEl.removeEventListener('scroll', onScroll); },
  };
}

// ---------------------------------------------------------------------------
// Cursor parallax
// ---------------------------------------------------------------------------
/**
 * Track normalized cursor position with smoothing. Apply it on top of any
 * camera position you produce in the render loop.
 *
 * @example
 *   const parallax = createCursorParallax({ strength: [0.35, 0.18] });
 *   // in render loop:
 *   parallax.update(dt);
 *   parallax.applyTo(camera, baseCameraPosition);
 *
 * @param {object} [opts]
 * @param {[number,number]} [opts.strength=[0.35, 0.18]]  X / Y world-units of drift.
 * @param {number} [opts.smoothing=4]
 * @param {boolean} [opts.invertY=true]                    Cursor down = camera up.
 */
export function createCursorParallax({
  strength = [0.35, 0.18], smoothing = 4, invertY = true,
} = {}) {
  const state = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e) => {
    state.tx = (e.clientX / window.innerWidth)  * 2 - 1;
    state.ty = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('mousemove', onMove);

  return {
    update(dt) {
      state.x += (state.tx - state.x) * Math.min(1, dt * smoothing);
      state.y += (state.ty - state.y) * Math.min(1, dt * smoothing);
    },
    /** Apply the parallax offset to `camera.position`, starting from `base`. */
    applyTo(camera, base) {
      camera.position.set(
        base.x + state.x * strength[0],
        base.y + (invertY ? -1 : 1) * state.y * strength[1],
        base.z,
      );
    },
    getOffset() { return { x: state.x, y: state.y }; },
    dispose() { window.removeEventListener('mousemove', onMove); },
  };
}

// ---------------------------------------------------------------------------
// Idle rotation
// ---------------------------------------------------------------------------
/**
 * A whisper of breathing motion on an Object3D so the scene isn't dead-still
 * when the user isn't interacting. Drives axes you specify with sin waves.
 *
 * @param {THREE.Object3D} object
 * @param {object} [opts]
 * @param {{x?:number,y?:number,z?:number}} [opts.amplitude={z:0.012}] radians
 * @param {{x?:number,y?:number,z?:number}} [opts.speed={z:0.35}]
 * @param {{x?:number,y?:number,z?:number}} [opts.center={}]            base radians
 */
export function createIdleRotation(object, {
  amplitude = { z: 0.012 },
  speed     = { z: 0.35 },
  center    = {},
} = {}) {
  const c = {
    x: center.x ?? object.rotation.x,
    y: center.y ?? object.rotation.y,
    z: center.z ?? object.rotation.z,
  };
  return {
    update(dt, elapsed) {
      ['x', 'y', 'z'].forEach((axis) => {
        const a = amplitude[axis] ?? 0;
        const s = speed[axis]     ?? 0;
        if (a !== 0) object.rotation[axis] = c[axis] + Math.sin(elapsed * s) * a;
      });
    },
  };
}

// ---------------------------------------------------------------------------
// Hover (raycast) on the Möbius strip — resolves to a section index
// ---------------------------------------------------------------------------
/**
 * Raycast against the strip; resolve hover to a section index and fire callbacks.
 * Works for any mesh whose UV.x maps linearly across the content layout.
 *
 * @param {object} opts
 * @param {THREE.Camera} opts.camera
 * @param {THREE.Object3D[]} opts.targets        Meshes to raycast against (front mesh, etc.)
 * @param {number} opts.sectionCount             Number of sections laid across UV.x.
 * @param {THREE.Texture} [opts.scrollTexture]   Texture used by `createScrollFlow` —
 *                                                so hover uv.x is interpreted relative
 *                                                to the live texture offset.
 * @param {(idx:number, hit: THREE.Intersection)=>void} [opts.onEnter]  Called when hover
 *                                                                       enters a NEW section.
 * @param {(idx:number, hit: THREE.Intersection)=>void} [opts.onMove]    Called every move while hovering.
 * @param {()=>void}                                     [opts.onLeave]  Called when cursor leaves the strip.
 * @param {HTMLElement} [opts.dom=document.body]  Element to listen on.
 * @param {string} [opts.cursorOnHover='pointer'] CSS cursor while hovering, '' to disable.
 */
export function createMobiusHover({
  camera, targets, sectionCount,
  scrollTexture, onEnter, onMove, onLeave,
  dom = document.body, cursorOnHover = 'pointer',
} = {}) {
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let lastIdx = -1;
  let isOver  = false;
  let prevCursor = '';

  const setCursor = (val) => {
    if (!cursorOnHover) return;
    if (dom.style.cursor !== val) {
      if (!isOver) prevCursor = dom.style.cursor;
      dom.style.cursor = val;
    }
  };

  const onPointerMove = (e) => {
    ndc.x =  (e.clientX / window.innerWidth)  * 2 - 1;
    ndc.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(targets, false);
    if (hits.length > 0) {
      const hit = hits[0];
      // Resolve the canvas U beneath the cursor. Three.js samples the texture
      // as: sampled_canvas_uv = surface_uv + texture.offset, so we ADD the
      // offset (not subtract) to reverse the scroll-flow back to canvas space.
      let u = hit.uv ? hit.uv.x : 0;
      if (scrollTexture) u = (u + scrollTexture.offset.x) % 1;
      if (u < 0) u += 1;
      const idx = Math.min(sectionCount - 1, Math.floor(u * sectionCount));
      if (!isOver) {
        isOver = true;
        setCursor(cursorOnHover);
      }
      if (idx !== lastIdx) {
        lastIdx = idx;
        onEnter && onEnter(idx, hit);
      }
      onMove && onMove(idx, hit);
    } else if (isOver) {
      isOver = false;
      lastIdx = -1;
      setCursor(prevCursor || '');
      onLeave && onLeave();
    }
  };

  const onPointerOut = () => {
    if (isOver) {
      isOver = false;
      lastIdx = -1;
      setCursor(prevCursor || '');
      onLeave && onLeave();
    }
  };

  dom.addEventListener('pointermove', onPointerMove);
  dom.addEventListener('pointerleave', onPointerOut);

  return {
    /** Section index currently under the cursor, or -1 if none. */
    getActiveIndex() { return lastIdx; },
    isHovering()     { return isOver; },
    dispose() {
      dom.removeEventListener('pointermove', onPointerMove);
      dom.removeEventListener('pointerleave', onPointerOut);
      if (cursorOnHover) dom.style.cursor = prevCursor || '';
    },
  };
}

// ---------------------------------------------------------------------------
// Click-to-jump dot navigation
// ---------------------------------------------------------------------------
/**
 * Build a row of clickable dots that jump the page to each section.
 * Keeps an `active` class in sync with scroll progress.
 *
 * @param {HTMLElement} container   Empty element to fill with dots.
 * @param {number} sectionCount
 * @param {object} [opts]
 * @param {string[]} [opts.titles]  Tooltip titles per section.
 * @param {HTMLElement} [opts.scrollTrack]  Element whose height = scroll range.
 */
export function createDotNav(container, sectionCount, { titles = [], scrollTrack } = {}) {
  container.innerHTML = '';
  const dots = [];
  for (let i = 0; i < sectionCount; i++) {
    const d = document.createElement('div');
    d.className = 'dot';
    d.dataset.idx = i;
    if (titles[i]) d.title = titles[i];
    d.addEventListener('click', () => {
      const docH = scrollTrack ? scrollTrack.scrollHeight : document.documentElement.scrollHeight;
      const max  = docH - window.innerHeight;
      const target = (i / sectionCount) * max + (max * 0.5) / sectionCount;
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
    container.appendChild(d);
    dots.push(d);
  }
  return {
    setActive(i) {
      dots.forEach((d, k) => d.classList.toggle('active', k === i));
    },
    dots,
  };
}
