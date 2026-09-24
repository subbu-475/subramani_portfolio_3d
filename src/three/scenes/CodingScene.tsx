import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const CodingScene: React.FC = () => {
  const leftScreenRef = useRef<THREE.Mesh>(null);
  const rightScreenRef = useRef<THREE.Mesh>(null);
  const neonRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (leftScreenRef.current) {
      const mat = leftScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.9 + Math.sin(t * 4) * 0.15;
    }
    if (rightScreenRef.current) {
      const mat = rightScreenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1.0 + Math.cos(t * 3.5) * 0.12;
    }
    if (neonRef.current) {
      // Subtle neon flicker
      const flicker = 1 + (Math.sin(t * 12) > 0.95 ? 0.3 : 0);
      neonRef.current.children.forEach((child) => {
        if ('material' in child) {
          const m = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
          if (m.emissive) m.emissiveIntensity = 2.5 * flicker;
        }
      });
    }
  });

  return (
    <group position={[0, 0, -90]}>
      {/* Room Floor */}
      <mesh position={[0, 0, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial color="#0A0808" roughness={0.8} />
      </mesh>

      {/* Exposed Dark Brick Back Wall */}
      <mesh position={[0, 5, -12]}>
        <planeGeometry args={[22, 12]} />
        <meshStandardMaterial color="#1C1412" roughness={0.9} />
      </mesh>
      {/* Side Walls */}
      <mesh position={[-10, 5, -6]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#140E0D" roughness={0.9} />
      </mesh>
      <mesh position={[10, 5, -6]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#140E0D" roughness={0.9} />
      </mesh>

      {/* Orange Neon Sign: "Good Code Better Tomorrow" (Matching Reference Panel 5) */}
      <group ref={neonRef} position={[4.2, 5.8, -11.8]}>
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.42}
          color="#FFA500"
          font={undefined}
          letterSpacing={0.08}
        >
          Good Code
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.4}
          color="#FF7700"
          font={undefined}
          letterSpacing={0.08}
        >
          Better Tomorrow
        </Text>
        {/* Neon Light Source */}
        <pointLight position={[0, 0, 0.5]} color="#FF8800" intensity={2.5} distance={12} />
      </group>

      {/* Developer Desk Workstation */}
      <group position={[0, 0, -7]}>
        {/* Solid Wooden Desk Top */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[7.2, 0.16, 3.2]} />
          <meshStandardMaterial color="#2B1D14" roughness={0.6} />
        </mesh>
        {/* Steel Legs */}
        {[-3.3, 3.3].map((lx, i) => (
          <group key={`leg-${i}`}>
            <mesh position={[lx, 0.9, -1.2]}>
              <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
              <meshStandardMaterial color="#0F172A" metalness={0.9} />
            </mesh>
            <mesh position={[lx, 0.9, 1.2]}>
              <cylinderGeometry args={[0.06, 0.06, 1.8, 8]} />
              <meshStandardMaterial color="#0F172A" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Dual Panoramic Curved Monitors */}
        {/* Left Monitor (Code Editor with colorful syntax lines) */}
        <group position={[-1.6, 3.1, -0.6]} rotation={[0, 0.22, 0]}>
          {/* Bezel */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 1.8, 0.08]} />
            <meshStandardMaterial color="#09090B" metalness={0.8} />
          </mesh>
          {/* Screen */}
          <mesh ref={leftScreenRef} position={[0, 0, 0.045]}>
            <planeGeometry args={[2.68, 1.68]} />
            <meshStandardMaterial
              color="#020617"
              emissive="#06B6D4"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Code Syntax Lines on Left Screen */}
          {[...Array(9)].map((_, i) => (
            <mesh
              key={`codeline-${i}`}
              position={[-0.4 + (i % 3) * 0.15, 0.6 - i * 0.14, 0.05]}
            >
              <planeGeometry args={[0.8 + (i % 4) * 0.35, 0.035]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? '#38BDF8' : i % 3 === 1 ? '#F59E0B' : '#A855F7'}
              />
            </mesh>
          ))}
          {/* Monitor Stand */}
          <mesh position={[0, -0.7, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>

        {/* Right Monitor (Terminal / Live Preview) */}
        <group position={[1.6, 3.1, -0.6]} rotation={[0, -0.22, 0]}>
          {/* Bezel */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 1.8, 0.08]} />
            <meshStandardMaterial color="#09090B" metalness={0.8} />
          </mesh>
          {/* Screen */}
          <mesh ref={rightScreenRef} position={[0, 0, 0.045]}>
            <planeGeometry args={[2.68, 1.68]} />
            <meshStandardMaterial
              color="#050B14"
              emissive="#3B82F6"
              emissiveIntensity={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Terminal / Output lines on Right Screen */}
          {[...Array(7)].map((_, i) => (
            <mesh key={`termline-${i}`} position={[-0.5, 0.5 - i * 0.16, 0.05]}>
              <planeGeometry args={[1.2 + (i % 3) * 0.2, 0.035]} />
              <meshBasicMaterial color={i === 0 ? '#10B981' : '#E2E8F0'} />
            </mesh>
          ))}
          {/* Stand */}
          <mesh position={[0, -0.7, -0.2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.9, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.8} />
          </mesh>
        </group>

        {/* Screen Ambient Glow on Desk */}
        <pointLight position={[0, 3.2, -0.2]} color="#06B6D4" intensity={2} distance={8} />

        {/* Studio Audio Monitor Speakers */}
        <mesh position={[-3.1, 2.5, -0.6]} rotation={[0, 0.35, 0]}>
          <boxGeometry args={[0.6, 1.0, 0.6]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} />
        </mesh>
        <mesh position={[3.1, 2.5, -0.6]} rotation={[0, -0.35, 0]}>
          <boxGeometry args={[0.6, 1.0, 0.6]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} />
        </mesh>

        {/* Mechanical Keyboard with RGB glow */}
        <mesh position={[0, 1.91, 0.5]} rotation={[-0.05, 0, 0]}>
          <boxGeometry args={[1.5, 0.05, 0.55]} />
          <meshStandardMaterial color="#09090B" metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.93, 0.5]} rotation={[-0.05, 0, 0]}>
          <planeGeometry args={[1.42, 0.48]} />
          <meshBasicMaterial color="#06B6D4" transparent opacity={0.6} />
        </mesh>

        {/* Gaming Mouse */}
        <mesh position={[1.1, 1.91, 0.5]}>
          <boxGeometry args={[0.18, 0.06, 0.3]} />
          <meshStandardMaterial color="#18181B" roughness={0.4} />
        </mesh>

        {/* Warm Desk Lamp */}
        <group position={[-2.8, 1.88, 0.6]}>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} />
          </mesh>
          <mesh position={[0.2, 1.2, 0]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[0.25, 0.4, 16]} />
            <meshStandardMaterial color="#CA8A04" metalness={0.8} />
          </mesh>
          <pointLight position={[0.3, 1.0, 0]} color="#FEF08A" intensity={2.2} distance={6} />
        </group>

        {/* Ceramic Coffee Mug */}
        <mesh position={[2.2, 1.98, 0.6]}>
          <cylinderGeometry args={[0.14, 0.12, 0.28, 16]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

export default CodingScene;
