// utils/paper-materials.js
// ---------------------------------------------------------------------------
// Procedural paper textures + ready-to-use MeshPhysicalMaterial recipes.
//
// `buildSectionedPaperTexture` lets the caller draw their own content into
// each section slot — keeping the layout decoupled from your data shape.
// ---------------------------------------------------------------------------

import * as THREE from 'three';

/**
 * Build a wide canvas texture divided into N section slots laid horizontally.
 * The caller supplies a `drawSection(ctx, slot)` callback to render content
 * into each slot — keeps content/data decoupled from the texture builder.
 *
 * @param {object} opts
 * @param {number}   [opts.width=16384]      Canvas width (max 16384 on most GPUs).
 * @param {number}   [opts.height=1024]      Canvas height.
 * @param {number}    opts.sectionCount      Number of slots to divide the canvas into.
 * @param {number}   [opts.gutter=0.18]      Fraction of each slot reserved as side margin.
 * @param {function} opts.drawSection        Called for each section: (ctx, slot) => void.
 *                                            slot = { index, x0, x1, cx, colX, innerW, H, sectionW }.
 * @param {function} [opts.drawBackground]   Optional override for the paper background.
 * @returns {THREE.CanvasTexture}
 */
export function buildSectionedPaperTexture({
  width = 16384, height = 1024,
  sectionCount, drawSection, drawBackground,
  gutter = 0.18,
}) {
  const W = width, H = height;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  if (drawBackground) drawBackground(ctx, W, H);
  else _drawPaperBackground(ctx, W, H);

  const sectionW = W / sectionCount;
  const gutterPx = sectionW * gutter;
  const innerW   = sectionW - gutterPx * 2;

  for (let i = 0; i < sectionCount; i++) {
    const x0 = i * sectionW;
    drawSection(ctx, {
      index: i,
      x0, x1: x0 + sectionW, cx: x0 + sectionW / 2,
      colX: x0 + gutterPx,
      innerW, H, sectionW,
    });
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function _drawPaperBackground(ctx, W, H) {
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   '#f6ecd2');
  grad.addColorStop(0.5, '#efe2c0');
  grad.addColorStop(1,   '#e8d6a8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    img.data[i]   = Math.max(0, Math.min(255, img.data[i]   + n));
    img.data[i+1] = Math.max(0, Math.min(255, img.data[i+1] + n));
    img.data[i+2] = Math.max(0, Math.min(255, img.data[i+2] + n));
  }
  ctx.putImageData(img, 0, 0);

  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#7a5a30';
  for (let y = 0; y < H; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.07) * 1.5);
    ctx.lineTo(W, y + Math.sin(y * 0.07 + 1.4) * 1.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Soft top/bottom edge shading
  const top = ctx.createLinearGradient(0, 0, 0, 80);
  top.addColorStop(0, 'rgba(80,50,20,0.55)');
  top.addColorStop(1, 'rgba(80,50,20,0)');
  ctx.fillStyle = top;
  ctx.fillRect(0, 0, W, 80);
  const bot = ctx.createLinearGradient(0, H - 80, 0, H);
  bot.addColorStop(0, 'rgba(80,50,20,0)');
  bot.addColorStop(1, 'rgba(80,50,20,0.55)');
  ctx.fillStyle = bot;
  ctx.fillRect(0, H - 80, W, 80);
}

/**
 * Plain cream paper for the back face (opaque, no text bleed-through).
 */
export function buildBlankPaperTexture({ width = 1024, height = 256 } = {}) {
  const W = width, H = height;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0,   '#ecdcb4');
  grad.addColorStop(0.5, '#e4d09e');
  grad.addColorStop(1,   '#d8c089');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * 18;
    img.data[i]   = Math.max(0, Math.min(255, img.data[i]   + n));
    img.data[i+1] = Math.max(0, Math.min(255, img.data[i+1] + n));
    img.data[i+2] = Math.max(0, Math.min(255, img.data[i+2] + n));
  }
  ctx.putImageData(img, 0, 0);

  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = '#7a5a30';
  for (let y = 0; y < H; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.09) * 1.2);
    ctx.lineTo(W, y + Math.sin(y * 0.09 + 1.2) * 1.2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * Procedural normal map giving paper micro-grain. Pair with a sheen-enabled
 * material for the silk-like grazing-angle highlight that says "paper".
 */
export function buildPaperNormalMap({ width = 2048, height = 1024, repeat = [8, 1] } = {}) {
  const W = width, H = height;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = 'rgb(128,128,255)';
  ctx.fillRect(0, 0, W, H);

  const cell = 6;
  const cols = Math.ceil(W / cell), rows = Math.ceil(H / cell);
  const grid = new Float32Array(cols * rows);
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random();
  const sample = (x, y) => {
    const gx = x / cell, gy = y / cell;
    const x0 = Math.floor(gx), y0 = Math.floor(gy);
    const fx = gx - x0, fy = gy - y0;
    const a = grid[(y0 % rows) * cols + (x0 % cols)];
    const b = grid[(y0 % rows) * cols + ((x0 + 1) % cols)];
    const cc = grid[((y0 + 1) % rows) * cols + (x0 % cols)];
    const d = grid[((y0 + 1) % rows) * cols + ((x0 + 1) % cols)];
    const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
    return (a * (1 - sx) + b * sx) * (1 - sy) + (cc * (1 - sx) + d * sx) * sy;
  };
  const img = ctx.getImageData(0, 0, W, H);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const dx = (sample(x + 1, y) - sample(x - 1, y)) * 1.6 + (Math.random() - 0.5) * 0.18;
      const dy = (sample(x, y + 1) - sample(x, y - 1)) * 0.8 + (Math.random() - 0.5) * 0.18;
      const idx = (y * W + x) * 4;
      img.data[idx]     = Math.max(0, Math.min(255, 128 + dx * 90));
      img.data[idx + 1] = Math.max(0, Math.min(255, 128 + dy * 90));
      img.data[idx + 2] = 255;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  return tex;
}

/**
 * MeshPhysicalMaterial preset with sheen — looks like printed paper.
 */
export function createPaperMaterial({
  map, normalMap,
  color = 0xffffff,
  roughness = 0.86,
  sheen = 0.8,
  sheenColor = 0xfff2d8,
  sheenRoughness = 0.85,
  normalScale = 0.35,
  side = THREE.FrontSide,
} = {}) {
  return new THREE.MeshPhysicalMaterial({
    map, normalMap,
    color, roughness, metalness: 0.0,
    sheen, sheenRoughness,
    sheenColor: new THREE.Color(sheenColor),
    normalScale: new THREE.Vector2(normalScale, normalScale),
    side,
  });
}
