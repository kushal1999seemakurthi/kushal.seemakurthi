import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Experience from './Experience';

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 5, 10], fov: 45 }}
      shadows
      dpr={[1, 2]}
    >
      <color attach="background" args={['#F9F7F2']} />
      <fog attach="fog" args={['#F9F7F2', 20, 150]} />
      
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[15, 20, 10]} 
        intensity={1.2} 
        castShadow 
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight 
        position={[-15, 10, -5]} 
        intensity={0.3} 
        color="#E2DFD2"
      />
      
      <Experience />
    </Canvas>
  );
}
