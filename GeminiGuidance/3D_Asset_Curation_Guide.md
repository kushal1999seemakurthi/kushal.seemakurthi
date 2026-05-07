# 📦 Aegis Immersive: 3D Asset Curation & Optimization Guide

*This guide is part of the Aegis Immersive Architecture. It outlines how to source, license, and prepare 3D models for high-performance WebGL applications without needing to model everything from scratch in Blender.*

> ℹ️ **ImmersivePort Creature GLBs — Six Forms Needed.** Source the following CC0 creature models (in order of priority for Phase 1): (1) paper crane, (2) koi fish, (3) stone tortoise, (4) agile squirrel, (5) phoenix, (6) ink seal / calligraphic form. Quaternius and Sketchfab CC0 are the recommended starting points. Store all creature GLBs in `public/assets/creatures/`. The squirrel (form 4) is a narrative intermediate between tortoise and phoenix in the Earth→Fire transition — ensure it conveys speed and nimble energy, not passivity.

## 1. The "Zero Copyright" Goldmines (100% CC0)
If you want to avoid copyright issues entirely, look for **CC0 (Public Domain)** assets. You can use these commercially without any attribution or licensing fees.

* **Poly Haven:** The highest-quality free resource available. Offers highly realistic, professionally scanned 3D models, textures, and HDRIs (for scene lighting). 100% CC0.
* **Kenney.nl:** Often called the "patron saint of indie developers." Offers thousands of low-poly, stylized 3D assets. Because of the low-poly style, these are extremely lightweight and perfect for web performance. 100% CC0.
* **Quaternius:** Offers hundreds of free, low-poly, and often pre-animated 3D models. Excellent for interactive web elements, character models, and modular environments. 100% CC0.

## 2. The WebGL-Specific Curators
* **PMNDRS Market:** Hosted by the Poimandres open-source collective (creators of React Three Fiber). This is a curated market of 3D models specifically optimized for the web. Assets are pre-compressed, properly scaled, and ready for browser environments. Licensing is usually highly permissive.

## 3. The Mega-Marketplaces (Require Filtering)
These sites have massive libraries but require careful filtering for price, license type, and file weight.

* **Sketchfab:** The largest 3D library on the web. 
    * *How to use:* Always check the **"Downloadable"** box.
    * *Licensing:* Pay close attention to the Creative Commons tag. Many are **CC-BY** (requires you to visually credit the creator on your site). If you want zero attribution, you must specifically filter for **CC0**.
* **TurboSquid & CGTrader:** Used heavily by AAA game studios and VFX artists.
    * *How to use:* Use the "Free" filters and check the Royalty-Free licensing terms. 
    * *Warning:* Models here are often massive (millions of polygons). You will almost always need to manually decimate (reduce polygons) in Blender before these are safe to use on a website.

## 4. ⚠️ Crucial Download Rules for Edge-Hosting
To keep your zero-server, edge-hosted site lightning fast, you must enforce these rules when downloading external assets:

1. **Format:** ALWAYS download the **`.glb`** or **`.gltf`** format. These are the "JPEGs of 3D" and are natively read by Three.js. Do not download `.obj` or `.fbx` unless you are prepared to convert and compress them yourself.
2. **Poly Count:** Search for "Low-Poly." High polygon counts will crash mobile browsers or cause severe battery drain. Aim to keep individual objects well under 50,000 vertices.
3. **Textures:** If given a choice of texture resolution, download **`1k`** or **`2k`** textures. You almost never need `4k` or `8k` textures for a web browser; they will severely bloat your initial load time without providing a noticeable visual benefit on a standard screen.
