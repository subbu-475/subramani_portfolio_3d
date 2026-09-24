import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const CodingScene: React.FC = () => {
  const leftScreenRef = useRef<THREE.Mesh>(null);
  const rightScreenRef = useRef<THREE.Mesh>(null);
  const neonLightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftScreenRef.current) {
      const mat = leftScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.85 + Math.sin(t * 3.5) * 0.15;
    }
    if (rightScreenRef.current) {
      const mat = rightScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.95 + Math.cos(t * 4) * 0.15;
    }
    if (neonLightRef.current) {
      neonLightRef.current.intensity = 2.2 + (Math.sin(t * 10) > 0.9 ? 0.4 : 0);
    }
  });

  return (
    <group position={[0, 0, -90]}>
      {/* Dark Wood Studio Floor */}
      <mesh position={[0, 0.01, -8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 20]} />
        <meshStandardMaterial color="#0C0A09" roughness={0.8} />
      </mesh>

      {/* Exposed Dark Brick Back Wall */}
      <mesh position={[0, 6, -16]}>
        <planeGeometry args={[24, 14]} />
        <meshStandardMaterial color="#1C1412" roughness={0.9} />
      </mesh>
      {/* Side Brick Walls */}
      <mesh position={[-11, 6, -8]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#140E0D" roughness={0.9} />
      </mesh>
      <mesh position={[11, 6, -8]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[18, 14]} />
        <meshStandardMaterial color="#140E0D" roughness={0.9} />
      </mesh>

      {/* Orange Neon Sign: Good Code Better Tomorrow (Matching Reference Image) */}
      <group position={[4.5, 5.8, -15.8]}>
        <Text
          position={[0, 0.38, 0]}
          fontSize={0.42}
          color="#FF9900"
          font={undefined}
          letterSpacing={0.08}
        >
          Good Code
        </Text>
        <Text
          position={[0, -0.18, 0]}
          fontSize={0.38}
          color="#FF6600"
          font={undefined}
          letterSpacing={0.08}
        >
          Better Tomorrow
        </Text>
        <pointLight ref={neonLightRef} position={[0, 0, 0.4]} color="#FF7700" intensity={2.2} distance={10} />
      </group>

      {/* Developer Desk Workstation */}
      <group position={[0, 0, -6.5]}>
        {/* Solid Wooden Desk Top */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[7.2, 0.16, 3.2]} />
          <meshStandardMaterial color="#2B1D14" roughness={0.6} />
        </mesh>
        {/* Desk Steel Legs */}
        {[-3.3, 3.3].map((lx, i) => (
          <mesh key={`leg-${i}`} position={[lx, 0.9, 0]}>
            <boxGeometry args={[0.1, 1.8, 2.8]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} />
          </mesh>
        ))}

        {/* Dual Curved Code Monitors */}
        {/* Left Monitor (Syntax Colored Lines) */}
        <group position={[-1.6, 3.1, -0.6]} rotation={[0, 0.22, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 1.8, 0.08]} />
            <meshStandardMaterial color="#09090B" metalness={0.8} />
          </mesh>
          <mesh ref={leftScreenRef} position={[0, 0, 0.045]}>
            <planeGeometry args={[2.68, 1.68]} />
            <meshStandardMaterial
              color="#020617"
              emissive="#06B6D4"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Syntax Highlighted Code Lines */}
          {[...Array(9)].map((_, i) => (
            <mesh key={`c-line-${i}`} position={[-0.4 + (i % 3) * 0.15, 0.6 - i * 0.14, 0.05]}>
              <planeGeometry args={[0.8 + (i % 4) * 0.35, 0.035]} />
              <meshBasicMaterial color={i % 3 === 0 ? '#38BDF8' : i % 3 === 1 ? '#F59E0B' : '#A855F7'} />
            </mesh>
          ))}
          <mesh position={[0, -0.7, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>

        {/* Right Monitor */}
        <group position={[1.6, 3.1, -0.6]} rotation={[0, -0.22, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 1.8, 0.08]} />
            <meshStandardMaterial color="#09090B" metalness={0.8} />
          </mesh>
          <mesh ref={rightScreenRef} position={[0, 0, 0.045]}>
            <planeGeometry args={[2.68, 1.68]} />
            <meshStandardMaterial
              color="#050B14"
              emissive="#3B82F6"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Terminal / Live Preview Lines */}
          {[...Array(7)].map((_, i) => (
            <mesh key={`t-line-${i}`} position={[-0.5, 0.5 - i * 0.16, 0.05]}>
              <planeGeometry args={[1.2 + (i % 3) * 0.2, 0.035]} />
              <meshBasicMaterial color={i === 0 ? '#10B981' : '#E2E8F0'} />
            </mesh>
          ))}
          <mesh position={[0, -0.7, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>

        {/* Screen Glow */}
        <pointLight position={[0, 3.2, -0.2]} color="#06B6D4" intensity={2.2} distance={8} />

        {/* Mechanical Backlit Keyboard */}
        <mesh position={[0, 1.91, 0.5]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.55]} />
          <meshStandardMaterial color="#09090B" metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.93, 0.5]} rotation={[-0.05, 0, 0]}>
          <planeGeometry args={[1.42, 0.48]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.65} />
        </mesh>

        {/* Mouse */}
        <mesh position={[1.1, 1.91, 0.5]}>
          <boxGeometry args={[0.18, 0.06, 0.3]} />
          <meshStandardMaterial color="#18181B" />
        </mesh>

        {/* Studio Audio Monitor Speakers */}
        <mesh position={[-3.1, 2.5, -0.6]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.6, 1.0, 0.6]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} />
        </mesh>
        <mesh position={[3.1, 2.5, -0.6]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.6, 1.0, 0.6]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} />
        </mesh>

        {/* Warm Brass Desk Lamp */}
        <group position={[-2.8, 1.88, 0.6]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} />
          </mesh>
          <mesh position={[0.2, 1.2, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.25, 0.4, 16]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} />
          </mesh>
          <pointLight position={[0.3, 1.0, 0]} color="#FEF08A" intensity={2.4} distance={6} />
        </group>

        {/* Coffee Mug */}
        <mesh position={[2.2, 1.98, 0.6]}>
          <cylinderGeometry args={[0.14, 0.12, 0.28, 16]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

export default CodingScene;
