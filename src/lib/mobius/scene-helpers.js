// utils/scene-helpers.js
// ---------------------------------------------------------------------------
// Reusable scene scaffolding: lighting rig, wooden desk plane, paper-friendly
// procedural environment map, tone-mapping defaults.
// ---------------------------------------------------------------------------

import * as THREE from 'three';

/**
 * 3-point + bounce lighting tuned for paper. Returns the lights so you can
 * tweak them or enable shadow casting.
 *
 * @param {THREE.Scene} scene
 * @param {object} [opts]
 * @param {boolean} [opts.shadows=true]
 * @returns {{key: THREE.DirectionalLight, fill: THREE.DirectionalLight,
 *           rim: THREE.SpotLight, bounce: THREE.HemisphereLight,
 *           ambient: THREE.AmbientLight}}
 */
export function setupPaperLighting(scene, { shadows = true } = {}) {
  const ambient = new THREE.AmbientLight(0xfff0d4, 0.32);
  scene.add(ambient);

  const key = new THREE.DirectionalLight(0xffe2a8, 1.65);
  key.position.set(4.5, 5.5, 3.5);
  if (shadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.near = 1;
    key.shadow.camera.far  = 20;
    key.shadow.camera.left = -5; key.shadow.camera.right = 5;
    key.shadow.camera.top  =  5; key.shadow.camera.bottom = -5;
    key.shadow.bias        = -0.0008;
    key.shadow.normalBias  =  0.02;
    key.shadow.radius      =  4;
  }
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xb8c8e8, 0.55);
  fill.position.set(-5, 3, 4);
  scene.add(fill);

  const rim = new THREE.SpotLight(0xffd189, 1.4, 18, Math.PI / 4, 0.6, 1.2);
  rim.position.set(2, 3, -3);
  rim.target.position.set(0, 0, 0);
  scene.add(rim); scene.add(rim.target);

  const bounce = new THREE.HemisphereLight(0x8a6a3a, 0x1a1208, 0.45);
  scene.add(bounce);

  return { ambient, key, fill, rim, bounce };
}

/**
 * Procedural wood desk plane that receives shadows. Use a directional light's
 * shadow caster to drop a soft shadow under the strip.
 *
 * @param {object} [opts]
 * @param {THREE.WebGLRenderer} [opts.renderer]  For anisotropy max.
 * @param {[number, number]} [opts.size=[28, 14]]
 * @param {number} [opts.y=-0.95]                Vertical position.
 */
export function createDeskPlane({
  renderer, size = [28, 14], y = -0.95,
} = {}) {
  const W = 2048, H = 1024;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   '#5a3a1f');
  grad.addColorStop(0.5, '#4a2e18');
  grad.addColorStop(1,   '#372214');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  for (let i = 0; i < 380; i++) {
    const yy = Math.random() * H;
    const a  = 0.05 + Math.random() * 0.18;
    const w  = 1 + Math.random() * 2;
    ctx.strokeStyle = `rgba(${Math.random() < 0.5 ? '20,12,6' : '90,60,32'},${a})`;
    ctx.lineWidth = w;
    ctx.beginPath();
    ctx.moveTo(0, yy);
    for (let x = 0; x < W; x += 18) {
      ctx.lineTo(x, yy + Math.sin(x * 0.012 + i) * (1.5 + Math.random() * 2));
    }
    ctx.stroke();
  }

  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    img.data[i]   = Math.max(0, Math.min(255, img.data[i]   + n));
    img.data[i+1] = Math.max(0, Math.min(255, img.data[i+1] + n));
    img.data[i+2] = Math.max(0, Math.min(255, img.data[i+2] + n));
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.repeat.set(2, 1);
  if (renderer) tex.anisotropy = renderer.capabilities.getMaxAnisotropy();

  const mat = new THREE.MeshStandardMaterial({
    map: tex, roughness: 0.78, metalness: 0.0, color: 0x9c8068,
  });
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(...size), mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = y;
  mesh.receiveShadow = true;
  return mesh;
}

/**
 * Procedural environment map (warm sky → dim floor) for IBL on paper.
 * Saves shipping an HDR while still giving a believable reflection response.
 *
 * @param {THREE.WebGLRenderer} renderer
 * @returns {THREE.Texture}    Set this on `scene.environment`.
 */
export function createPaperEnvironment(renderer) {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 128;
  const g = c.getContext('2d');
  const grad = g.createLinearGradient(0, 0, 0, 128);
  grad.addColorStop(0.00, '#f3d2a0');
  grad.addColorStop(0.45, '#7e5a34');
  grad.addColorStop(0.55, '#3a2818');
  grad.addColorStop(1.00, '#100a06');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.mapping     = THREE.EquirectangularReflectionMapping;
  tex.colorSpace  = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  pmrem.dispose();
  return envTex;
}

/**
 * Apply paper-friendly tone-mapping defaults to a renderer.
 */
export function configureRendererForPaper(renderer, { exposure = 1.05 } = {}) {
  renderer.outputColorSpace      = THREE.SRGBColorSpace;
  renderer.toneMapping           = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure   = exposure;
  renderer.shadowMap.enabled     = true;
  renderer.shadowMap.type        = THREE.PCFSoftShadowMap;
}
