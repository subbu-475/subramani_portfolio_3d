import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const Environment: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.01;
      });
    }
  });

  return (
    <>
      <color attach="background" args={['#050505']} />
      <fogExp2 attach="fog" args={['#050505', 0.012]} />


      {/* Solid Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -150]}>
        <planeGeometry args={[1000, 600]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Wireframe Grid */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -150]}>
        <planeGeometry args={[100, 600, 50, 300]} />
        <meshBasicMaterial color="#11151A" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Continuous Road connecting everything */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -150]}>
        <planeGeometry args={[2, 600]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.15} />
      </mesh>

      {/* Dense Stars */}
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1} />

      {/* Global floating particles along the path */}
      <group ref={particlesRef}>
        {[...Array(30)].map((_, i) => (
          <mesh
            key={`env-part-${i}`}
            position={[
              (Math.random() - 0.5) * 40,
              Math.random() * 10,
              -Math.random() * 300
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#F8FAFC" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </>
  );
};

export default Environment;
