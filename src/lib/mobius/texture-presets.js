// utils/texture-presets.js
// ---------------------------------------------------------------------------
// Named texture presets — paper background painters + matching theme tokens.
// Use the registry: pick a preset by name in your config:
//   texture: { preset: "warm-paper" }
// ---------------------------------------------------------------------------

const PRESETS = {};

export function registerTexturePreset(name, preset) { PRESETS[name] = preset; }
export function getTexturePreset(name) {
  return PRESETS[name] || PRESETS['warm-paper'];
}
export function listTexturePresets() { return Object.keys(PRESETS); }

/**
 * Each preset returns:
 *   {
 *     drawBackground(ctx, W, H): void,
 *     theme: {
 *       heading: { color, family },
 *       body:    { color, family, size },
 *       accent:  { color },
 *       spacing: { paragraph, bullets, divider },
 *     },
 *     backColor:  hex string for the back of the paper
 *     deskTone:   hex tint for the desk
 *   }
 */

// ---------------------------------------------------------------------------
// warm-paper (default)
// ---------------------------------------------------------------------------
registerTexturePreset('warm-paper', {
  drawBackground(ctx, W, H) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   '#f6ecd2');
    grad.addColorStop(0.5, '#efe2c0');
    grad.addColorStop(1,   '#e8d6a8');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    _grain(ctx, W, H, 14);
    _fibers(ctx, W, H, '#7a5a30', 0.06);
    _edges(ctx, W, H, 80, 80, 'rgba(80,50,20,0.55)');
  },
  theme: {
    heading: { color: '#1a140a', family: 'Georgia, "Times New Roman", serif' },
    body:    { color: '#1a140a', family: 'Georgia, serif', size: 30 },
    accent:  { color: '#6b3410' },
    spacing: { paragraph: 16, bullets: 18, divider: 18 },
  },
  backColor: '#e9d6a6',
  deskTone:  '#9c8068',
});

// ---------------------------------------------------------------------------
// parchment — older, more amber, more grain
// ---------------------------------------------------------------------------
registerTexturePreset('parchment', {
  drawBackground(ctx, W, H) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0,   '#e9d3a0');
    grad.addColorStop(0.5, '#d8b878');
    grad.addColorStop(1,   '#bd9450');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    _grain(ctx, W, H, 22);
    _fibers(ctx, W, H, '#5a3a18', 0.10);
    // age stains
    for (let i = 0; i < 14; i++) {
      const x = Math.random() * W, y = Math.random() * H;
      const r = 60 + Math.random() * 180;
      const rg = ctx.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, 'rgba(80,50,16,0.18)');
      rg.addColorStop(1, 'rgba(80,50,16,0)');
      ctx.fillStyle = rg; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    _edges(ctx, W, H, 100, 100, 'rgba(60,36,12,0.7)');
  },
  theme: {
    heading: { color: '#1a0c02', family: 'Georgia, "Times New Roman", serif' },
    body:    { color: '#241404', family: 'Georgia, serif', size: 30 },
    accent:  { color: '#7a3a08' },
    spacing: { paragraph: 16, bullets: 18, divider: 18 },
  },
  backColor: '#c79c5a',
  deskTone:  '#7d5836',
});

// ---------------------------------------------------------------------------
// dark-paper — black canvas, cream ink (like a Moleskine)
// ---------------------------------------------------------------------------
registerTexturePreset('dark-paper', {
  drawBackground(ctx, W, H) {
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, '#1c1612');
    grad.addColorStop(1, '#0e0a08');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, W, H);
    _grain(ctx, W, H, 8);
    _fibers(ctx, W, H, '#3a2a18', 0.18);
  },
  theme: {
    heading: { color: '#f3e9d2', family: 'Georgia, "Times New Roman", serif' },
    body:    { color: '#e0d0a8', family: 'Georgia, serif', size: 30 },
    accent:  { color: '#d9a05a' },
    spacing: { paragraph: 16, bullets: 18, divider: 18 },
  },
  backColor: '#15110d',
  deskTone:  '#3a2a18',
});

// ---------------------------------------------------------------------------
// blueprint — engineer's blueprint, cyan grid, white ink
// ---------------------------------------------------------------------------
registerTexturePreset('blueprint', {
  drawBackground(ctx, W, H) {
    ctx.fillStyle = '#0e2845';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(170,210,255,0.20)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 64) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += 64) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(170,210,255,0.45)';
    for (let x = 0; x <= W; x += 320) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y <= H; y += 320) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    _grain(ctx, W, H, 6);
  },
  theme: {
    heading: { color: '#eaf2ff', family: '"Courier New", monospace' },
    body:    { color: '#cfdcef', family: '"Courier New", monospace', size: 28 },
    accent:  { color: '#7fc1ff' },
    spacing: { paragraph: 16, bullets: 18, divider: 18 },
  },
  backColor: '#0a1c34',
  deskTone:  '#1f324d',
});

// ---------------------------------------------------------------------------
// modern-white — clean white card with sans-serif
// ---------------------------------------------------------------------------
registerTexturePreset('modern-white', {
  drawBackground(ctx, W, H) {
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, W, H);
    _grain(ctx, W, H, 6);
  },
  theme: {
    heading: { color: '#0a0a0a', family: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
    body:    { color: '#1a1a1a', family: '"Helvetica Neue", Helvetica, Arial, sans-serif', size: 30 },
    accent:  { color: '#0066cc' },
    spacing: { paragraph: 16, bullets: 18, divider: 18 },
  },
  backColor: '#e8e8e8',
  deskTone:  '#cfcfcf',
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function _grain(ctx, W, H, amount) {
  const img = ctx.getImageData(0, 0, W, H);
  for (let i = 0; i < img.data.length; i += 4) {
    const n = (Math.random() - 0.5) * amount;
    img.data[i]   = Math.max(0, Math.min(255, img.data[i]   + n));
    img.data[i+1] = Math.max(0, Math.min(255, img.data[i+1] + n));
    img.data[i+2] = Math.max(0, Math.min(255, img.data[i+2] + n));
  }
  ctx.putImageData(img, 0, 0);
}

function _fibers(ctx, W, H, color, alpha) {
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  for (let y = 0; y < H; y += 3) {
    ctx.beginPath();
    ctx.moveTo(0, y + Math.sin(y * 0.07) * 1.5);
    ctx.lineTo(W, y + Math.sin(y * 0.07 + 1.4) * 1.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function _edges(ctx, W, H, top, bot, color) {
  const tg = ctx.createLinearGradient(0, 0, 0, top);
  tg.addColorStop(0, color); tg.addColorStop(1, color.replace(/[\d.]+\)$/, '0)'));
  ctx.fillStyle = tg; ctx.fillRect(0, 0, W, top);
  const bg = ctx.createLinearGradient(0, H - bot, 0, H);
  bg.addColorStop(0, color.replace(/[\d.]+\)$/, '0)')); bg.addColorStop(1, color);
  ctx.fillStyle = bg; ctx.fillRect(0, H - bot, W, bot);
}
