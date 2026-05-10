// utils/mobius-geometry.js
// ---------------------------------------------------------------------------
// Möbius strip geometry with analytical normals and optional thickness offset.
//
// A real Möbius is non-orientable, so a 2π parameterization has a normal-flip
// seam. Default `uMax = 4π` walks the loop twice (the orientable double cover)
// — textures and offsets stay continuous around the surface.
//
// Provide `normalOffset` (and pair two meshes — one positive, one negative
// with `flipWinding: true`) to give the strip real paper thickness.
// ---------------------------------------------------------------------------

import * as THREE from 'three';

/**
 * @typedef {object} MobiusOpts
 * @property {number}  [R=1.4]            Major radius of the loop.
 * @property {number}  [width=0.95]       Half-width of the strip.
 * @property {number}  [segU=1400]        Segments around the loop.
 * @property {number}  [segV=28]          Segments across the strip.
 * @property {number}  [normalOffset=0]   Offset along surface normal (paper thickness).
 * @property {boolean} [flipWinding=false] Reverse triangle order + flip normals.
 * @property {number}  [uMax=4π]          Domain of u (default = double cover).
 */

/**
 * Build a Möbius BufferGeometry.
 * @param {MobiusOpts} opts
 * @returns {THREE.BufferGeometry}
 */
export function buildMobiusGeometry({
  R = 1.4, width = 0.95, segU = 1400, segV = 28,
  normalOffset = 0, flipWinding = false,
  uMax = Math.PI * 4,
} = {}) {
  const geo = new THREE.BufferGeometry();
  const positions = [];
  const uvs = [];
  const indices = [];
  const normals = [];

  for (let i = 0; i <= segU; i++) {
    const u = (i / segU) * uMax;
    for (let j = 0; j <= segV; j++) {
      const v = (j / segV - 0.5) * width * 2;
      const half = u / 2;
      const cu = Math.cos(u), su = Math.sin(u);
      const cosHalf = Math.cos(half), sinHalf = Math.sin(half);

      // Surface position
      const Px = (R + v * cosHalf) * cu;
      const Py = (R + v * cosHalf) * su;
      const Pz = v * sinHalf;

      // Analytical partials for a clean normal
      const dPxdu = -(R + v * cosHalf) * su + v * (-sinHalf / 2) * cu;
      const dPydu =  (R + v * cosHalf) * cu + v * (-sinHalf / 2) * su;
      const dPzdu =  v * cosHalf / 2;
      const dPxdv = cosHalf * cu;
      const dPydv = cosHalf * su;
      const dPzdv = sinHalf;
      let nx = dPydu * dPzdv - dPzdu * dPydv;
      let ny = dPzdu * dPxdv - dPxdu * dPzdv;
      let nz = dPxdu * dPydv - dPydu * dPxdv;
      const nl = Math.hypot(nx, ny, nz) || 1;
      nx /= nl; ny /= nl; nz /= nl;

      positions.push(Px + nx * normalOffset, Py + ny * normalOffset, Pz + nz * normalOffset);
      uvs.push(i / segU, j / segV);

      const sn = flipWinding ? -1 : 1;
      normals.push(nx * sn, ny * sn, nz * sn);
    }
  }
  for (let i = 0; i < segU; i++) {
    for (let j = 0; j < segV; j++) {
      const a = i * (segV + 1) + j;
      const b = a + (segV + 1);
      if (flipWinding) indices.push(a, a + 1, b,  b, a + 1, b + 1);
      else             indices.push(a, b, a + 1,  b, b + 1, a + 1);
    }
  }
  geo.setIndex(indices);
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv',       new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('normal',   new THREE.Float32BufferAttribute(normals, 3));
  return geo;
}

/**
 * Convenience: build a paired front+back paper-thick Möbius and return as
 * a THREE.Group ready to drop into a scene.
 *
 * @param {object} opts
 * @param {THREE.Material} opts.frontMaterial   Material for the printed face.
 * @param {THREE.Material} opts.backMaterial    Material for the blank face.
 * @param {number}         [opts.thickness=0.018] Paper thickness (offset along normal).
 * @param {MobiusOpts}     [opts.shared]          Shared geometry params.
 * @returns {{group: THREE.Group, front: THREE.Mesh, back: THREE.Mesh}}
 */
export function buildPaperMobius({
  frontMaterial,
  backMaterial,
  thickness = 0.018,
  shared = {},
}) {
  const frontGeom = buildMobiusGeometry({ ...shared, normalOffset:  thickness, flipWinding: false });
  const backGeom  = buildMobiusGeometry({ ...shared, normalOffset: -thickness, flipWinding: true  });

  const front = new THREE.Mesh(frontGeom, frontMaterial);
  const back  = new THREE.Mesh(backGeom,  backMaterial);
  front.castShadow = true;  front.receiveShadow = true;
  back.castShadow  = true;  back.receiveShadow  = true;

  const group = new THREE.Group();
  group.add(back);
  group.add(front);
  return { group, front, back };
}
