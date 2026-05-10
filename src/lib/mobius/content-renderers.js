// utils/content-renderers.js
// ---------------------------------------------------------------------------
// Content-block renderers. Each renderer is a function:
//
//   (ctx, block, layout) => newY
//
// where `layout` is { x, y, width, theme } and the renderer draws the block
// starting at (x, y) within the given width, then returns the y-coordinate
// where the *next* block should start.
//
// `inferType(block)` lets callers write blocks loosely:
//   "a string"           → { type: "paragraph", text: "a string" }
//   ["a","b","c"]        → { type: "bullets",   items: ["a","b","c"] }
//   {Email:"x", Phone:1} → { type: "kv",        pairs: {Email:"x", Phone:1} }
// ---------------------------------------------------------------------------

/**
 * Convert loose user input into a normalized block object with a `type`.
 * @param {*} block
 * @returns {object}
 */
export function inferBlockType(block) {
  if (block == null) return null;
  if (typeof block === 'string') return { type: 'paragraph', text: block };
  if (Array.isArray(block)) {
    if (block.every(b => typeof b === 'string')) return { type: 'bullets', items: block };
    return { type: 'group', items: block.map(inferBlockType) };
  }
  if (typeof block === 'object') {
    if (block.type) return block;
    return { type: 'kv', pairs: block };
  }
  return null;
}

/** Returns the height of N wrapped lines from `wrapLines`. */
export function wrapLines(ctx, text, maxWidth) {
  const words = String(text).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) { lines.push(cur); cur = w; }
    else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

// ---------------------------------------------------------------------------
// Renderer registry
// ---------------------------------------------------------------------------
const REGISTRY = {};

export function registerRenderer(type, fn) { REGISTRY[type] = fn; }
export function getRenderer(type)          { return REGISTRY[type]; }

/**
 * Render a list of blocks vertically, returning the final y.
 */
export function renderBlocks(ctx, blocks, layout) {
  let y = layout.y;
  for (const raw of blocks) {
    const block = inferBlockType(raw);
    if (!block) continue;
    const fn = REGISTRY[block.type];
    if (!fn) {
      console.warn(`[content-renderers] unknown block type "${block.type}"`);
      continue;
    }
    y = fn(ctx, block, { ...layout, y });
  }
  return y;
}

// ---------------------------------------------------------------------------
// Built-in renderers
// ---------------------------------------------------------------------------

registerRenderer('paragraph', (ctx, block, { x, y, width, theme }) => {
  const fontSize = block.size ?? theme.body.size;
  const lineH    = block.lineHeight ?? Math.round(fontSize * 1.27);
  ctx.fillStyle    = block.color ?? theme.body.color;
  ctx.font         = `${block.italic ? 'italic ' : ''}${fontSize}px ${theme.body.family}`;
  ctx.textBaseline = 'top';
  const lines = wrapLines(ctx, block.text ?? '', width);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lineH));
  return y + lines.length * lineH + (block.spacing ?? theme.spacing.paragraph);
});

registerRenderer('bullets', (ctx, block, { x, y, width, theme }) => {
  const fontSize = block.size ?? theme.body.size;
  const lineH    = Math.round(fontSize * 1.27);
  const bullet   = block.bullet ?? '·';
  const indent   = fontSize * 1.1;
  ctx.fillStyle    = theme.body.color;
  ctx.font         = `${fontSize}px ${theme.body.family}`;
  ctx.textBaseline = 'top';
  let yy = y;
  for (const item of (block.items || [])) {
    if (item === '' || item == null) { yy += lineH * 0.45; continue; }
    ctx.fillText(bullet, x, yy);
    const lines = wrapLines(ctx, String(item), width - indent);
    lines.forEach((ln, i) => ctx.fillText(ln, x + indent, yy + i * lineH));
    yy += lines.length * lineH;
  }
  return yy + (block.spacing ?? theme.spacing.bullets);
});

registerRenderer('kv', (ctx, block, { x, y, width, theme }) => {
  const fontSize = block.size ?? theme.body.size;
  const lineH    = Math.round(fontSize * 1.32);
  const labelCol = Math.min(width * 0.35, 220);
  ctx.textBaseline = 'top';
  let yy = y;
  for (const [key, val] of Object.entries(block.pairs || {})) {
    ctx.fillStyle = theme.accent.color;
    ctx.font      = `bold ${fontSize}px ${theme.body.family}`;
    ctx.fillText(`${key}`, x, yy);
    ctx.fillStyle = theme.body.color;
    ctx.font      = `${fontSize}px ${theme.body.family}`;
    const valStr  = Array.isArray(val) ? val.join(' · ') : String(val);
    const lines   = wrapLines(ctx, valStr, width - labelCol);
    lines.forEach((ln, i) => ctx.fillText(ln, x + labelCol, yy + i * lineH));
    yy += Math.max(lineH, lines.length * lineH);
  }
  return yy + (block.spacing ?? theme.spacing.bullets);
});

registerRenderer('stats', (ctx, block, { x, y, width, theme }) => {
  const items = block.items || [];
  if (!items.length) return y;
  const colW = width / items.length;
  const valSize = block.valueSize ?? 64;
  const labSize = block.labelSize ?? 18;
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'center';
  items.forEach((it, i) => {
    const cx = x + colW * (i + 0.5);
    ctx.fillStyle = theme.heading.color;
    ctx.font      = `bold ${valSize}px ${theme.heading.family}`;
    ctx.fillText(String(it.value ?? ''), cx, y);
    ctx.fillStyle = theme.accent.color;
    ctx.font      = `${labSize}px ${theme.body.family}`;
    const lines = wrapLines(ctx, String(it.label ?? ''), colW - 10);
    lines.forEach((ln, j) => ctx.fillText(ln, cx, y + valSize + 6 + j * (labSize + 4)));
  });
  ctx.textAlign = 'left';
  return y + valSize + 6 + labSize + 12 + (block.spacing ?? theme.spacing.bullets);
});

registerRenderer('project', (ctx, block, { x, y, width, theme }) => {
  ctx.textBaseline = 'top';
  ctx.fillStyle = theme.heading.color;
  ctx.font      = `bold 30px ${theme.heading.family}`;
  ctx.fillText(block.name ?? '', x, y);
  let yy = y + 36;
  if (block.description) {
    ctx.fillStyle = theme.body.color;
    ctx.font      = `26px ${theme.body.family}`;
    const lines = wrapLines(ctx, block.description, width);
    lines.forEach((ln, i) => ctx.fillText(ln, x, yy + i * 32));
    yy += lines.length * 32 + 4;
  }
  if (block.impact) {
    ctx.fillStyle = theme.accent.color;
    ctx.font      = `italic 24px ${theme.body.family}`;
    ctx.fillText(`→ ${block.impact}`, x, yy);
    yy += 30;
  }
  return yy + (block.spacing ?? theme.spacing.bullets);
});

registerRenderer('divider', (ctx, block, { x, y, width, theme }) => {
  const len = (block.width ?? 0.6) * width;
  const cx  = x + width / 2;
  ctx.strokeStyle = theme.accent.color + 'aa';
  ctx.lineWidth   = 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - len / 2, y);
  ctx.lineTo(cx - 12,      y);
  ctx.moveTo(cx + 12,      y);
  ctx.lineTo(cx + len / 2, y);
  ctx.stroke();
  ctx.fillStyle = theme.accent.color;
  ctx.beginPath(); ctx.moveTo(cx, y - 6); ctx.lineTo(cx + 6, y); ctx.lineTo(cx, y + 6); ctx.lineTo(cx - 6, y); ctx.closePath(); ctx.fill();
  return y + 14 + (block.spacing ?? theme.spacing.divider);
});

registerRenderer('quote', (ctx, block, { x, y, width, theme }) => {
  ctx.textBaseline = 'top';
  ctx.fillStyle = theme.body.color;
  ctx.font      = `italic 32px ${theme.body.family}`;
  const lines = wrapLines(ctx, `"${block.text}"`, width);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * 40));
  let yy = y + lines.length * 40;
  if (block.author) {
    ctx.fillStyle = theme.accent.color;
    ctx.font      = `24px ${theme.body.family}`;
    ctx.fillText(`— ${block.author}`, x, yy + 8);
    yy += 36;
  }
  return yy + (block.spacing ?? theme.spacing.paragraph);
});

registerRenderer('tags', (ctx, block, { x, y, width, theme }) => {
  const items = block.items || [];
  const padX = 14, padY = 6, gap = 10, fs = block.size ?? 22;
  ctx.textBaseline = 'top';
  ctx.font = `${fs}px ${theme.body.family}`;
  let xx = x, yy = y;
  for (const it of items) {
    const tw = ctx.measureText(String(it)).width + padX * 2;
    if (xx + tw > x + width) { xx = x; yy += fs + padY * 2 + gap; }
    ctx.fillStyle = theme.accent.color + '33';
    _roundRect(ctx, xx, yy, tw, fs + padY * 2, 4);
    ctx.fill();
    ctx.fillStyle = theme.body.color;
    ctx.fillText(String(it), xx + padX, yy + padY);
    xx += tw + gap;
  }
  return yy + fs + padY * 2 + (block.spacing ?? theme.spacing.bullets);
});

registerRenderer('heading', (ctx, block, { x, y, width, theme }) => {
  const size = block.size ?? 36;
  ctx.fillStyle = theme.heading.color;
  ctx.font      = `bold ${size}px ${theme.heading.family}`;
  ctx.textBaseline = 'top';
  const lines = wrapLines(ctx, String(block.text ?? ''), width);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * (size + 4)));
  return y + lines.length * (size + 4) + (block.spacing ?? 14);
});

registerRenderer('group', (ctx, block, layout) => {
  return renderBlocks(ctx, block.items || [], layout);
});

function _roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);          ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);              ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
