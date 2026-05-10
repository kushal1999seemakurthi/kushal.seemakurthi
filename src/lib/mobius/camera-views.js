// utils/camera-views.js
// ---------------------------------------------------------------------------
// Reusable camera view-preset system.
//
//  - Register named views (camera position, look-at, fov, optional target rot)
//  - Tween smoothly between them (cubic ease)
//  - Optional "orbit" view that rotates the camera around a target
//  - Bind buttons or call apply(name) imperatively
//  - Call update(dt) every frame from your render loop
// ---------------------------------------------------------------------------

import * as THREE from 'three';

/**
 * @typedef {object} ViewPreset
 * @property {string}  [label]           Human-readable label.
 * @property {[number,number,number]} [cam]   Camera world position.
 * @property {[number,number,number]} [look]  World point the camera looks at.
 * @property {[number,number,number]} [rot]   Optional Euler rotation applied to the
 *                                            target Object3D (useful for letting a
 *                                            view also re-orient the model).
 * @property {number}  [fov]             FOV in degrees.
 * @property {boolean} [orbit]           If true, this view auto-orbits around look.
 * @property {object}  [orbitOptions]    { radius, height, speed, wobble }
 */

/**
 * Create a view-preset manager bound to a camera.
 *
 * @param {THREE.PerspectiveCamera} camera
 * @param {object} [options]
 * @param {THREE.Object3D} [options.target]  Optional object whose rotation a view can drive.
 * @param {number} [options.tweenDuration=0.7] Seconds to tween between views.
 */
export function createViewSystem(camera, { target, tweenDuration = 0.7 } = {}) {
  /** @type {Record<string, ViewPreset>} */
  const views = {};

  let currentName = null;
  let currentView = null;
  let viewT = 1;
  let orbiting = false;

  let fromCam  = camera.position.clone();
  let fromLook = new THREE.Vector3();
  let fromRot  = target ? target.rotation.clone() : new THREE.Euler();
  let fromFov  = camera.fov;
  let toCam    = fromCam.clone();
  let toLook   = fromLook.clone();
  let toRot    = fromRot.clone();
  let toFov    = fromFov;

  const _tmpLook = new THREE.Vector3();
  const _baseCam = new THREE.Vector3();
  const listeners = new Set();

  function add(name, preset) {
    views[name] = preset;
    return api;
  }

  function apply(name, { instant = false } = {}) {
    const v = views[name];
    if (!v) {
      console.warn(`[camera-views] no view named "${name}"`);
      return;
    }
    currentName = name;
    currentView = v;
    orbiting    = !!v.orbit;

    fromCam.copy(camera.position);
    fromLook.copy(toLook);
    if (target) fromRot.copy(target.rotation);
    fromFov = camera.fov;

    if (!v.orbit) {
      if (v.cam)  toCam.set(...v.cam);
      if (v.look) toLook.set(...v.look);
      if (v.rot && target) toRot.set(...v.rot);
    }
    if (typeof v.fov === 'number') toFov = v.fov;

    viewT = instant ? 1 : 0;
    if (instant) _snap();

    listeners.forEach(fn => fn(name, v));
    return api;
  }

  function _snap() {
    if (!currentView.orbit) {
      camera.position.copy(toCam);
      camera.lookAt(toLook);
      if (target) target.rotation.copy(toRot);
    }
    camera.fov = toFov;
    camera.updateProjectionMatrix();
  }

  /**
   * Drive the per-frame tween + orbit. Returns the *base* camera position
   * (before any post-effects like cursor parallax) so you can stack effects.
   * @param {number} dt        Seconds since last frame
   * @param {number} elapsed   Total elapsed seconds (for orbit animation)
   * @returns {THREE.Vector3}  Base camera position used this frame.
   */
  function update(dt, elapsed = 0) {
    if (orbiting) {
      const o = currentView.orbitOptions || {};
      const r = o.radius ?? 6.2;
      const h = o.height ?? 0.9;
      const s = o.speed  ?? 0.18;
      const w = o.wobble ?? 0.4;
      _baseCam.set(
        Math.cos(elapsed * s) * r,
        h + Math.sin(elapsed * s * 0.72) * w,
        Math.sin(elapsed * s) * r,
      );
      _tmpLook.set(0, 0, 0);
      camera.fov = currentView.fov ?? camera.fov;
    } else if (viewT < 1) {
      viewT = Math.min(1, viewT + dt / tweenDuration);
      const k = _easeInOutCubic(viewT);
      _baseCam.lerpVectors(fromCam, toCam, k);
      _tmpLook.lerpVectors(fromLook, toLook, k);
      if (target) {
        target.rotation.set(
          fromRot.x + (toRot.x - fromRot.x) * k,
          fromRot.y + (toRot.y - fromRot.y) * k,
          fromRot.z + (toRot.z - fromRot.z) * k,
        );
      }
      camera.fov = fromFov + (toFov - fromFov) * k;
    } else {
      _baseCam.copy(toCam);
      _tmpLook.copy(toLook);
    }
    camera.position.copy(_baseCam);
    camera.lookAt(_tmpLook);
    camera.updateProjectionMatrix();
    return _baseCam;
  }

  /**
   * Wire a set of buttons (with `data-view="name"`) to apply views.
   * Adds an `active` class to the current view's button.
   * @param {string|HTMLElement} containerOrSelector
   */
  function bindButtons(containerOrSelector) {
    const root = typeof containerOrSelector === 'string'
      ? document.querySelector(containerOrSelector)
      : containerOrSelector;
    if (!root) return;
    const buttons = [...root.querySelectorAll('[data-view]')];
    buttons.forEach(btn => {
      btn.addEventListener('click', () => apply(btn.dataset.view));
    });
    onChange((name) => {
      buttons.forEach(b => b.classList.toggle('active', b.dataset.view === name));
    });
    return api;
  }

  function onChange(fn)  { listeners.add(fn);    return () => listeners.delete(fn); }

  /** Currently visible base camera position (no parallax applied). */
  function getBaseCameraPosition() { return _baseCam; }
  /** Current look-at target. */
  function getLookTarget()         { return _tmpLook; }
  function getCurrentName()        { return currentName; }

  const api = {
    add, apply, update, bindButtons, onChange,
    getBaseCameraPosition, getLookTarget, getCurrentName,
  };
  return api;
}

function _easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
