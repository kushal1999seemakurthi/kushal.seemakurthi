import React, { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Island from './Island';
import Stairs from './Stairs';
import InteractiveElements from './InteractiveElements';
import Particles from './Particles';

gsap.registerPlugin(ScrollTrigger);

export const ISLANDS: { pos: [number, number, number], scale: [number, number, number] }[] = [
  { pos: [0, 0, 0], scale: [1, 1, 1] },                     // 0: Intro
  { pos: [25, -6, -45], scale: [1.2, 1.2, 1.2] },           // 1: Experience
  { pos: [-20, -12, -90], scale: [1.2, 1.2, 1.2] },         // 2: Skills
  { pos: [20, -18, -135], scale: [1.2, 1.2, 1.2] },         // 3: Projects
  { pos: [-5, -24, -180], scale: [1, 1, 1] }                // 4: Education
];

export default function Experience() {
  const { camera } = useThree();

  useLayoutEffect(() => {
    // We create transitions for each island based on the HTML section IDs
    const CAM_POSITIONS = ISLANDS.map((island, index) => {
      if (index === 0) return new THREE.Vector3(0, 5, 10);
      const isEven = index % 2 === 0;
      const camOffsetX = isEven ? 10 : -10;
      return new THREE.Vector3(
        island.pos[0] + camOffsetX,
        island.pos[1] + 6,
        island.pos[2] + 18
      );
    });

    const CAM_ROTATIONS = ISLANDS.map((island, index) => {
      const dummy = new THREE.PerspectiveCamera();
      dummy.position.copy(CAM_POSITIONS[index]);
      dummy.lookAt(island.pos[0], island.pos[1], island.pos[2]);
      return dummy.rotation;
    });

    // Initial Camera Setup
    camera.position.copy(CAM_POSITIONS[0]);
    camera.rotation.copy(CAM_ROTATIONS[0]);

    ISLANDS.forEach((island, index) => {
      if (index === 0) return; // Initially looking at start

      const targetId = `#section-${index}`;
      
      const startPos = CAM_POSITIONS[index - 1];
      const endPos = CAM_POSITIONS[index];

      const startRot = CAM_ROTATIONS[index - 1];
      const endRot = CAM_ROTATIONS[index];

      // Move camera strictly when we scroll into the corresponding specific HTML section
      gsap.fromTo(camera.position,
        {
          x: startPos.x,
          y: startPos.y,
          z: startPos.z
        },
        {
          scrollTrigger: {
            trigger: targetId,
            start: 'top bottom', // Start transition when section enters screen
            end: 'top 20%',      // End transition when section settles in screen
            scrub: 1,
            immediateRender: false,
          },
          x: endPos.x,
          y: endPos.y,
          z: endPos.z,
          ease: 'power2.inOut'
        }
      );

      // Rotate camera identically to point at the island during motion
      gsap.fromTo(camera.rotation,
        {
          x: startRot.x,
          y: startRot.y,
          z: startRot.z
        },
        {
          scrollTrigger: {
            trigger: targetId,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1,
            immediateRender: false,
          },
          x: endRot.x,
          y: endRot.y,
          z: endRot.z,
          ease: 'power2.inOut'
        }
      );
    });

  }, [camera]);

  return (
    <group>
      {/* Islands */}
      {ISLANDS.map((island, idx) => (
        <Island key={idx} position={island.pos} scale={island.scale} index={idx} />
      ))}
      
      {/* 3D Links mapped on Intro Island */}
      <InteractiveElements />
      
      {/* Dynamic Stairs Bridges between islands */}
      {ISLANDS.map((island, idx) => {
        if (idx === 0) return null;
        return <Stairs key={`stairs-${idx}`} start={ISLANDS[idx-1].pos} end={island.pos} index={idx} />
      })}
      
      {/* Editorial fog/particles */}
      <Particles />
    </group>
  );
}

