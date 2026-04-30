import React, { useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StairsProps {
  start: [number, number, number];
  end: [number, number, number];
  index: number;
}

export default function Stairs({ start, end, index }: StairsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const STEPS = 20;

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const steps = groupRef.current.children;
    const triggerId = `#section-${index}`;

    steps.forEach((step, i) => {
      const isLeft = i % 2 === 0;
      const progress = (i + 1) / (STEPS + 1);
      
      // Calculate final target position for this step (interpolated between start and end)
      const endX = start[0] + (end[0] - start[0]) * progress;
      // Arch upward in the middle of the bridge slightly
      const arc = Math.sin(progress * Math.PI) * 2;
      const endY = start[1] + (end[1] - start[1]) * progress + arc;
      const endZ = start[2] + (end[2] - start[2]) * progress;

      // Start position (scattered around the start island)
      const startX = start[0] + (isLeft ? -20 : 20);
      const startY = start[1] - 10 + (Math.random() * 10);
      const startZ = start[2] - 10 + (Math.random() * 10);
      
      gsap.set(step.position, {
        x: startX,
        y: startY,
        z: startZ,
      });
      
      gsap.set(step.rotation, {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2,
      });

      // Animate to final position matching the scroll trigger
      gsap.to(step.position, {
        scrollTrigger: {
          trigger: triggerId,
          start: 'top bottom', // Start building as section comes into view
          end: 'top 20%',      // Finish building as section settling
          scrub: 1,
        },
        x: endX,
        y: endY,
        z: endZ,
        ease: 'back.out(1.2)'
      });
      
      gsap.to(step.rotation, {
        scrollTrigger: {
          trigger: triggerId,
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1,
        },
        x: 0,
        y: Math.atan2((end[0] - start[0]), (end[2] - start[2])), // Orient facing forward along bridge
        z: 0,
        ease: 'power2.out'
      });
    });

  }, [start, end, index]);

  return (
    <group ref={groupRef}>
      {Array.from({ length: STEPS }).map((_, i) => (
        <mesh key={i} receiveShadow castShadow>
          <boxGeometry args={[4, 0.2, 1.5]} />
          <meshStandardMaterial color="#1C1C1C" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

