import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const CodingScene: React.FC = () => {
  const glowRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.opacity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
    }
  });

  return (
    <group position={[0, 0, -80]}>
      {/* Desk */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[8, 0.2, 4]} />
        <meshStandardMaterial color="#11151A" />
      </mesh>

      {/* Main Monitor */}
      <group position={[-1, 2, -1]}>
        {/* Stand */}
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 0.8]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[1, 0.1, 1]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.4, 1.4]} />
          <meshBasicMaterial ref={glowRef} color="#06B6D4" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Second Monitor */}
      <group position={[2, 2, -0.8]} rotation={[0, -0.4, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.1, 0.3, 0.8]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[2, 2.5, 0.1]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[1.9, 2.4]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.4} />
        </mesh>
      </group>

      {/* Keyboard & Mouse */}
      <mesh position={[-1, 1.15, 0.5]} rotation={[-0.1, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.5]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      <mesh position={[0.2, 1.15, 0.5]}>
        <boxGeometry args={[0.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Coffee Cup */}
      <group position={[2.5, 1.25, 1]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.15, 0.3]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
      </group>

      {/* Desk Lamp */}
      <group position={[-3, 2, -1]} rotation={[0.2, 0.4, 0]}>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.1]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, 0.1, 0.2]} rotation={[1, 0, 0]}>
          <coneGeometry args={[0.2, 0.4, 16]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        <pointLight position={[0, -0.2, 0.4]} color="#F8FAFC" intensity={2} distance={5} />
      </group>

      {/* Floating Code Brackets / Symbols */}
      {[...Array(6)].map((_, i) => (
        <Float key={i} speed={3} rotationIntensity={2} floatIntensity={2}>
          <mesh position={[(i - 3) * 1.5, 3 + Math.random() * 2, -2 + Math.random() * 2]}>
            <torusGeometry args={[0.2, 0.05, 8, 16]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#06B6D4" : "#3B82F6"} wireframe />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

export default CodingScene;
