import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles() {
  const count = 500;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initialize random positions and factors
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 10 + Math.random() * 100;
      const speed = 0.005 + Math.random() / 200;
      const xFactor = -30 + Math.random() * 60;
      const yFactor = -30 + Math.random() * 60;
      const zFactor = -30 + Math.random() * 60;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#1C1C1C" opacity={0.2} transparent />
    </instancedMesh>
  );
}
