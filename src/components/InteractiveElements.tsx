import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

function LinkRock({ position, label, url }: { position: [number, number, number], label: string, url: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.1;
      if (hovered) {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
      }
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation(); // Stop raycast from penetrating to things behind
          setHover(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHover(false);
          document.body.style.cursor = 'auto';
        }}
        onClick={(e) => {
          e.stopPropagation();
          window.open(url, '_blank');
        }}
        castShadow
        receiveShadow
        scale={hovered ? 1.1 : 1}
      >
        <dodecahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial 
          color={hovered ? "#1C1C1C" : "#E2DFD2"} 
          roughness={0.6} 
          metalness={0.1}
          wireframe={hovered}
        />
        
        <Text
          position={[0, 0, 1]}
          fontSize={0.2}
          color={hovered ? "#1C1C1C" : "#1C1C1C"}
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          {label}
        </Text>
      </mesh>
    </group>
  );
}

export default function InteractiveElements() {
  return (
    <group>
      <LinkRock position={[-3, 1, 1]} label="LINKEDIN" url="https://linkedin.com" />
      <LinkRock position={[3, 1.5, -1]} label="GITHUB" url="https://github.com" />
      <LinkRock position={[0, -0.5, 4]} label="TWITTER" url="https://twitter.com" />
    </group>
  );
}
