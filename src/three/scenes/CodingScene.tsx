import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CH 02 — FIRST LINE OF CODE: Cozy Developer Studio / Garage
 * Positioned along the RIGHT turn segment at WP5 (-8, 0, -125).
 * The studio is placed on the RIGHT side of the road (positive X),
 * facing -X towards the traveler walking along the road.
 */
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
    <group position={[-8, 0, -125]}>
      {/* Suburban Road Pavement */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 32]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Suburban Sidewalk on Left */}
      <mesh position={[-7, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.9} />
      </mesh>
      {/* Street Trees on Left */}
      {[-10, 0, 10].map((tz, idx) => (
        <group key={`sub-tree-${idx}`} position={[-9, 0, tz]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.2, 0.28, 3.0, 8]} />
            <meshStandardMaterial color="#4A3525" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.0, 0]}>
            <sphereGeometry args={[2.0, 10, 10]} />
            <meshStandardMaterial color="#1E4D2B" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* ========================================================= */}
      {/* 3D COZY CODING GARAGE / ROOM (RIGHT SIDE, FACING ROAD)   */}
      {/* ========================================================= */}
      <group position={[12, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Dark Wood Studio Floor */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 12]} />
          <meshStandardMaterial color="#1C1917" roughness={0.8} />
        </mesh>

        {/* Exposed Dark Brick Back Wall */}
        <mesh position={[0, 4.5, -6]}>
          <planeGeometry args={[14, 9]} />
          <meshStandardMaterial color="#292524" roughness={0.9} />
        </mesh>
        {/* Left Brick Wall */}
        <mesh position={[-7, 4.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[12, 9]} />
          <meshStandardMaterial color="#201C1A" roughness={0.9} />
        </mesh>
        {/* Right Brick Wall */}
        <mesh position={[7, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[12, 9]} />
          <meshStandardMaterial color="#201C1A" roughness={0.9} />
        </mesh>
        {/* Ceiling */}
        <mesh position={[0, 9, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[14, 12]} />
          <meshStandardMaterial color="#1C1917" roughness={0.9} />
        </mesh>

        {/* Warm Studio Ambiance Light leaking out */}
        <pointLight position={[0, 5, 0]} color="#FED7AA" intensity={2.5} distance={18} />
        <pointLight position={[0, 3, 4]} color="#F97316" intensity={1.8} distance={12} />

        {/* Neon Sign: Good Code, Better Tomorrow */}
        <group position={[2.5, 5.2, -5.8]}>
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[4.8, 1.8, 0.1]} />
            <meshStandardMaterial color="#0C0A09" metalness={0.9} />
          </mesh>
          <Text
            position={[0, 0.35, 0.06]}
            fontSize={0.34}
            color="#FF9900"
            letterSpacing={0.08}
          >
            Good Code
          </Text>
          <Text
            position={[0, -0.22, 0.06]}
            fontSize={0.30}
            color="#FF6600"
            letterSpacing={0.08}
          >
            Better Tomorrow
          </Text>
          <pointLight ref={neonLightRef} position={[0, 0, 0.4]} color="#FF7700" intensity={2.2} distance={8} />
        </group>

        {/* Developer Desk Workstation */}
        <group position={[0, 0, -2.5]}>
          {/* Wooden Desk Top */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[6.5, 0.14, 2.8]} />
            <meshStandardMaterial color="#3B2615" roughness={0.6} />
          </mesh>
          {/* Desk Steel Legs */}
          {[-2.9, 2.9].map((lx, i) => (
            <mesh key={`desk-leg-${i}`} position={[lx, 0.9, 0]}>
              <boxGeometry args={[0.1, 1.8, 2.5]} />
              <meshStandardMaterial color="#0F172A" metalness={0.9} />
            </mesh>
          ))}

          {/* Left Monitor */}
          <group position={[-1.5, 2.9, -0.4]} rotation={[0, 0.22, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.4, 1.5, 0.08]} />
              <meshStandardMaterial color="#09090B" metalness={0.8} />
            </mesh>
            <mesh ref={leftScreenRef} position={[0, 0, 0.045]}>
              <planeGeometry args={[2.28, 1.38]} />
              <meshStandardMaterial
                color="#020617"
                emissive="#06B6D4"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, -0.9, -0.1]}>
              <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>

          {/* Right Monitor */}
          <group position={[1.5, 2.9, -0.4]} rotation={[0, -0.22, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.4, 1.5, 0.08]} />
              <meshStandardMaterial color="#09090B" metalness={0.8} />
            </mesh>
            <mesh ref={rightScreenRef} position={[0, 0, 0.045]}>
              <planeGeometry args={[2.28, 1.38]} />
              <meshStandardMaterial
                color="#020617"
                emissive="#10B981"
                emissiveIntensity={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0, -0.9, -0.1]}>
              <cylinderGeometry args={[0.06, 0.06, 0.6, 8]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
          </group>

          {/* Glowing RGB Backlit Keyboard */}
          <mesh position={[0, 1.9, 0.35]}>
            <boxGeometry args={[1.8, 0.04, 0.6]} />
            <meshStandardMaterial color="#1E293B" emissive="#3B82F6" emissiveIntensity={0.4} />
          </mesh>

          {/* Coffee Mug */}
          <mesh position={[1.8, 2.0, 0.3]}>
            <cylinderGeometry args={[0.12, 0.1, 0.28, 12]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
          </mesh>

          {/* Brass Desk Lamp */}
          <group position={[-2.4, 2.4, 0.2]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.2, 0.24, 0.08, 12]} />
              <meshStandardMaterial color="#D97706" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
              <meshStandardMaterial color="#D97706" metalness={0.8} />
            </mesh>
            <mesh position={[0.2, 1.0, 0]} rotation={[0, 0, -0.5]}>
              <coneGeometry args={[0.3, 0.4, 12]} />
              <meshStandardMaterial color="#D97706" metalness={0.8} />
            </mesh>
            <pointLight position={[0.3, 0.9, 0]} color="#FEF08A" intensity={2.0} distance={5} />
          </group>
        </group>

        {/* Developer Bookshelf on Left Wall */}
        <group position={[-6.2, 3.5, 0]} rotation={[0, Math.PI / 2, 0]}>
          <mesh>
            <boxGeometry args={[3.5, 4.5, 0.6]} />
            <meshStandardMaterial color="#3E2712" roughness={0.8} />
          </mesh>
          {/* Books */}
          {[-1.2, -0.6, 0, 0.6, 1.2].map((bx, i) => (
            <mesh key={`book-${i}`} position={[bx, 0.5, 0.1]}>
              <boxGeometry args={[0.25, 1.1, 0.4]} />
              <meshStandardMaterial color={['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][i]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
};

export default CodingScene;
