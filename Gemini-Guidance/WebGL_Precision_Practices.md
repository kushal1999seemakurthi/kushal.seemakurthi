# 🎯 WebGL Precision & Interaction Guide

*This document is an extension of the Aegis Immersive Architecture, detailing how to position, animate, and interact with 3D elements outside the standard HTML/CSS DOM.*

## 1. The Visual Pipeline (Blender to Browser)
In WebGL, layout is rarely done via trial-and-error code. The source of truth for positioning originates in 3D modeling software.

* **Scene Setup:** Tools like **Blender** or **Cinema4D** are used to model assets, establish initial coordinates, and set camera focal lengths.
* **Texture Baking:** Complex shadows and lighting are "baked" into flat image textures to save GPU computation at runtime.
* **The Export:** Scenes are exported as `.glb` or `.gltf` files. These files store the precise coordinates (X, Y, Z position, scale, and rotation) of every object.
* **The Import:** Three.js parses the `.glb` file. Developers target specific meshes by their assigned names (e.g., `scene.getObjectByName('Hero_Product')`) to attach logic, ensuring the object appears exactly where the 3D artist placed it.

## 2. Mathematical Precision (Vectors & Quaternions)
Positioning in Three.js relies entirely on a 3D Cartesian coordinate system.

* **Position (`Vector3`):** Every object’s position is defined by an X (horizontal), Y (vertical), and Z (depth) value. Modifying `mesh.position.set(x, y, z)` is the WebGL equivalent of absolute positioning.
* **Rotation (Euler vs. Quaternions):** * **Euler Angles:** Rotations measured in radians along the X, Y, and Z axes. Prone to "Gimbal Lock" (where two axes align, losing a degree of freedom).
    * **Quaternions:** A 4D mathematical complex used by Three.js internally to calculate rotations smoothly and avoid Gimbal Lock. When performing complex 3D rotations, animating the object's `quaternion` is much safer and more precise than adjusting its rotation directly.

## 3. Interaction via Raycasting
Standard DOM events (`onclick`, `onmouseenter`) do not work on WebGL canvases because the browser only sees a single `<canvas>` element, not the 3D objects inside it.

* **The Concept:** Raycasting solves this by projecting an invisible mathematical line (a "ray") from the 2D mouse coordinates on the screen, through the camera's lens, and into the 3D scene.
* **Hit Detection:** The Raycaster checks if this line intersects with any 3D geometry (polygons). 
* **Execution:** If an intersection is detected, the Raycaster returns the exact 3D coordinate of the hit, the distance from the camera, and the specific face of the mesh that was clicked. This data is used to trigger hover states, highlight objects, or emit particles at the exact point of contact.

## 4. Animation Timelines (GSAP Integration)
Pixel-perfect animation requires deterministic state management, achieved using tools like **GSAP (GreenSock)**.

* **State-to-State Interpolation:** Instead of defining speed or duration, animations are defined by mathematical states. 
    * *State A:* `Vector3(0, 0, 0)`
    * *State B:* `Vector3(5, 2, -10)`
* **Scrubbing:** GSAP handles the interpolation between these vectors. By binding the GSAP timeline to the user's scroll position (via ScrollTrigger), the scroll wheel acts as a "scrubber" on a video player, moving the 3D objects precisely along their calculated paths forward and backward without dropping frames.
