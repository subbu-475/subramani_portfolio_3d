import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const FutureScene: React.FC = () => {
  const ringsRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child) => {
        child.position.y += 0.02;
        if (child.position.y > 10) child.position.y = -2;
      });
    }
  });

  return (
    <group position={[0, 0, -240]}>
      {/* Infinity Road */}
      <mesh position={[0, 0.05, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 60]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Abstract Structures */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-6, 5, -10]}>
          <icosahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#3B82F6" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1}>
        <mesh position={[6, 4, -15]}>
          <octahedronGeometry args={[2, 0]} />
          <meshBasicMaterial color="#F97316" wireframe />
        </mesh>
      </Float>

      {/* Floating Rings */}
      <group ref={ringsRef} position={[0, 4, -25]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[8, 0.1, 16, 100]} />
          <meshBasicMaterial color="#06B6D4" />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0.2, 0.2]} scale={[1.2, 1.2, 1.2]}>
          <torusGeometry args={[8, 0.05, 16, 100]} />
          <meshBasicMaterial color="#3B82F6" />
        </mesh>
      </group>

      {/* Light Beams */}
      {[...Array(6)].map((_, i) => (
        <mesh key={`beam-${i}`} position={[(i % 2 === 0 ? -8 : 8), 10, -5 - (i * 5)]}>
          <boxGeometry args={[0.2, 20, 0.2]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#06B6D4" : "#F97316"} transparent opacity={0.5} />
        </mesh>
      ))}

      {/* Horizon Sun/Star */}
      <mesh position={[0, 8, -40]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color="#F97316" />
      </mesh>

      {/* Ascending Particles */}
      <group ref={particlesRef}>
        {[...Array(40)].map((_, i) => (
          <mesh
            key={`asc-part-${i}`}
            position={[
              (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 10,
              -Math.random() * 30
            ]}
          >
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial color="#F8FAFC" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default FutureScene;
