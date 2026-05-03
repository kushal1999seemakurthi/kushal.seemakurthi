import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function PlaceholderCube() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  React.useEffect(() => {
    if (!meshRef.current) return;

    gsap.fromTo(
      meshRef.current.rotation,
      { z: 0, x: 0, y: 0 },
      {
        z: Math.PI * 2,
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          immediateRender: false,
        },
      }
    );
  }, []);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={0x1c1c1c} />
    </mesh>
  );
}

export default function SceneRoot() {
  return (
    <Canvas
      gl={{
        antialias: true,
        alpha: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
      }}
      camera={{
        position: [0, 0, 5],
        fov: 75,
      }}
      style={{
        background: '#F9F7F2',
      }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <PlaceholderCube />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
