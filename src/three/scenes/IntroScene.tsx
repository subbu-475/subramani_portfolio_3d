import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const IntroScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.children.forEach((child, i) => {
        child.position.y += Math.sin(state.clock.elapsedTime * 0.2 + i) * 0.01;
      });
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <group ref={groupRef}>
        {/* Mountains */}
        {[...Array(8)].map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 40,
              Math.random() * 2 + 1,
              -5 - Math.random() * 25
            ]}
          >
            <coneGeometry args={[2 + Math.random() * 3, 4 + Math.random() * 6, 4]} />
            <meshStandardMaterial color="#11151A" wireframe={i % 2 === 0} />
          </mesh>
        ))}

        {/* Trees */}
        {[...Array(12)].map((_, i) => {
          const x = i % 2 === 0 ? -4 - Math.random() * 6 : 4 + Math.random() * 6;
          const z = -5 - Math.random() * 20;
          return (
            <group key={`tree-${i}`} position={[x, 0.5, z]}>
              <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 1]} />
                <meshStandardMaterial color="#0B0D10" />
              </mesh>
              <mesh position={[0, 1.5, 0]}>
                <coneGeometry args={[1, 3, 5]} />
                <meshStandardMaterial color="#06B6D4" wireframe />
              </mesh>
            </group>
          );
        })}

        {/* Clouds */}
        {[...Array(5)].map((_, i) => (
          <Float key={`cloud-${i}`} speed={2} rotationIntensity={0.1} floatIntensity={1}>
            <mesh
              position={[
                (Math.random() - 0.5) * 30,
                10 + Math.random() * 5,
                -10 - Math.random() * 15
              ]}
              scale={[3 + Math.random() * 2, 0.5, 2 + Math.random() * 2]}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="#3B82F6" transparent opacity={0.3} />
            </mesh>
          </Float>
        ))}

        {/* Horizon glowing line */}
        <mesh position={[0, 0.1, -30]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[100, 1]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Particles */}
      <group ref={particlesRef}>
        {[...Array(30)].map((_, i) => (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 20,
              Math.random() * 10,
              -Math.random() * 30
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#F8FAFC" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default IntroScene;
