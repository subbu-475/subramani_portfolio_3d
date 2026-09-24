import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

export const Environment: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.008;
      });
    }
  });

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fogExp2 attach="fog" args={['#050505', 0.008]} />

      {/* Solid Dark Base Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -190]}>
        <planeGeometry args={[1200, 800]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Wireframe Perspective Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -190]}>
        <planeGeometry args={[120, 800, 40, 300]} />
        <meshBasicMaterial color="#0F172A" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Continuous Atmospheric Road connecting all 9 chapters */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, -190]}>
        <planeGeometry args={[2.4, 800]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.12} />
      </mesh>

      {/* Dense Celestial Starfield */}
      <Stars radius={140} depth={60} count={8000} factor={4} saturation={0} fade speed={0.8} />

      {/* Ambient Floating Stardust Particles along the journey path */}
      <group ref={particlesRef}>
        {[...Array(45)].map((_, i) => (
          <mesh
            key={`env-part-${i}`}
            position={[
              (Math.sin(i * 2.3) * 20),
              1 + Math.random() * 8,
              -Math.random() * 380
            ]}
          >
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#F8FAFC" transparent opacity={0.4} />
          </mesh>
        ))}
      </group>
    </>
  );
};

export default Environment;
