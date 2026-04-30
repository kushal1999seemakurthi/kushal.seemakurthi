import React from 'react';

export default function Island(props: any) {
  const { index, ...groupProps } = props;

  return (
    <group {...groupProps}>
      {/* Base platform shared across all islands */}
      <mesh receiveShadow castShadow position={[0, -1, 0]}>
        <cylinderGeometry args={[10, 8, 2, 8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
      
      {/* Variations to make each island visually distinct as you travel deeper */}
      
      {/* Intro Island (0) */}
      {index === 0 && (
        <>
          <mesh receiveShadow castShadow position={[3, 0.5, -4]} rotation={[0, Math.PI / 4, 0]}>
            <boxGeometry args={[1, 4, 1]} />
            <meshStandardMaterial color="#E2DFD2" roughness={0.8} />
          </mesh>
          <mesh receiveShadow castShadow position={[-4, 0, -3]}>
            <cylinderGeometry args={[0.5, 0.5, 3, 16]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.5} />
          </mesh>
          <mesh receiveShadow castShadow position={[-2, -0.5, -5]}>
            <dodecahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#F9F7F2" roughness={1} wireframe />
          </mesh>
        </>
      )}

      {/* Experience Island (1) */}
      {index === 1 && (
        <>
          <mesh receiveShadow castShadow position={[-3, 1.5, 2]}>
            <boxGeometry args={[1.5, 6, 1.5]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.2} metalness={0.5} />
          </mesh>
          <mesh receiveShadow castShadow position={[4, 0, -2]}>
            <boxGeometry args={[2, 3, 2]} />
            <meshStandardMaterial color="#E2DFD2" roughness={1} />
          </mesh>
        </>
      )}

      {/* Skills Island (2) */}
      {index === 2 && (
        <>
          <mesh receiveShadow castShadow position={[0, 0, 0]}>
            <torusGeometry args={[3, 0.5, 16, 32]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.8} wireframe />
          </mesh>
          <mesh receiveShadow castShadow position={[0, 1.5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[4, 0.1, 16, 64]} />
            <meshStandardMaterial color="#E2DFD2" />
          </mesh>
        </>
      )}

      {/* Projects Island (3) */}
      {index === 3 && (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh key={i} receiveShadow castShadow position={[-4 + i * 2, i * 0.5, -3 + i]}>
              <boxGeometry args={[1, 1 + i, 1]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#1C1C1C" : "#E2DFD2"} />
            </mesh>
          ))}
        </>
      )}

      {/* Education Island (4) */}
      {index === 4 && (
        <>
          <mesh receiveShadow castShadow position={[0, 2, 0]}>
            <octahedronGeometry args={[3, 0]} />
            <meshStandardMaterial color="#1C1C1C" roughness={0.2} metalness={0.8} wireframe />
          </mesh>
        </>
      )}
    </group>
  );
}
