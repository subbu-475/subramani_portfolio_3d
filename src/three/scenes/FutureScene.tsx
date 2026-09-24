import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const FutureScene: React.FC = () => {
  const planetRingRef = useRef<THREE.Mesh>(null);
  const roadLightRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (planetRingRef.current) {
      planetRingRef.current.rotation.z += delta * 0.05;
    }
    if (roadLightRef.current) {
      const mat = roadLightRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 2.5) * 0.25;
    }
  });

  return (
    <group position={[0, 0, -315]}>
      {/* Colossal Ringed Celestial Planet in Cosmic Sky (Matching Reference Panel 10) */}
      <group position={[-16, 20, -50]}>
        {/* Planet Sphere */}
        <mesh>
          <sphereGeometry args={[11, 48, 48]} />
          <meshStandardMaterial
            color="#C7D2FE"
            emissive="#4338CA"
            emissiveIntensity={0.5}
            roughness={0.7}
          />
        </mesh>
        {/* Planetary Rings */}
        <mesh ref={planetRingRef} rotation={[1.1, 0.4, 0]}>
          <ringGeometry args={[14, 24, 64]} />
          <meshBasicMaterial color="#E0E7FF" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Futuristic Highway Bridge extending towards horizon */}
      <group position={[0, 0, -15]}>
        {/* Bridge Road Deck */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 38]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Center Glowing Neon Road Guide Strip */}
        <mesh ref={roadLightRef} position={[0, 0.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.5, 38]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.9} />
        </mesh>

        {/* Bridge Side Railings with Glowing Edges */}
        {[-6, 6].map((rx, idx) => (
          <group key={`bridge-rail-${idx}`} position={[rx, 0, 0]}>
            <mesh position={[0, 0.9, 0]}>
              <boxGeometry args={[0.3, 1.8, 38]} />
              <meshStandardMaterial color="#1E293B" metalness={0.9} />
            </mesh>
            {/* Top Glowing Edge Strip */}
            <mesh position={[0, 1.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[0.25, 38]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
        ))}

        {/* Bridge Suspension Towers */}
        {[-6.2, 6.2].map((tx, idx) => (
          <group key={`tower-pylon-${idx}`} position={[tx, 0, -12]}>
            <mesh position={[0, 9, 0]}>
              <cylinderGeometry args={[0.3, 0.6, 18, 12]} />
              <meshStandardMaterial color="#334155" metalness={0.9} />
            </mesh>
            <mesh position={[0, 18.2, 0]}>
              <sphereGeometry args={[0.3, 8, 8]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Futuristic Utopia Crystalline City Spires on Horizon */}
      {[
        [-12, 14, -42, 3.5, 28],
        [-6, 18, -46, 3, 36],
        [0, 22, -48, 4, 44],
        [6, 17, -45, 3.2, 34],
        [14, 13, -40, 4, 26],
      ].map(([x, y, z, r, h], i) => (
        <group key={`fut-spire-${i}`} position={[x as number, y as number, z as number]}>
          <mesh>
            <coneGeometry args={[r as number, h as number, 6]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#0369A1"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </group>
      ))}

      {/* Dawn Horizon Lighting */}
      <pointLight position={[0, 8, -40]} color="#F97316" intensity={3} distance={50} />
      <directionalLight position={[0, 15, -30]} color="#38BDF8" intensity={1.5} />
    </group>
  );
};

export default FutureScene;
