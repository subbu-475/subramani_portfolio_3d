import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CH 08 — NEXT DESTINATION: Deep Space Orbital Station / Contact Hub
 * Positioned in high orbit at WP16 (-12, 42, -388).
 * Features an orbital space station with rotating solar arrays,
 * communications dish, docking ring, and floating contact terminal.
 */
export const ContactScene: React.FC = () => {
  const stationRef = useRef<THREE.Group>(null);
  const dishRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += delta * 0.08;
    }
    if (dishRef.current) {
      dishRef.current.rotation.z += delta * 0.15;
    }
    if (beaconRef.current) {
      beaconRef.current.intensity = Math.sin(state.clock.elapsedTime * 4) > 0.3 ? 2.8 : 0.4;
    }
  });

  return (
    <group position={[-12, 42, -388]}>
      {/* ========================================================= */}
      {/* 3D ORBITAL SPACE STATION / CONTACT HUB                    */}
      {/* ========================================================= */}
      <group ref={stationRef} position={[0, 4, -16]}>
        {/* Central Habitat Cylinder Module */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[2.8, 2.8, 14, 24]} />
          <meshStandardMaterial color="#E2E8F0" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Observation Cupola Dome */}
        <mesh position={[0, 2.8, 0]}>
          <sphereGeometry args={[1.5, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.8}
            roughness={0.1}
            transmission={0.7}
          />
        </mesh>

        {/* Docking Ring with Cyan Glow */}
        <mesh position={[-7.2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[2.2, 0.25, 16, 32]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>
        <pointLight position={[-7.2, 0, 0]} color="#00F0FF" intensity={2.0} distance={10} />

        {/* Left Solar Panel Truss & Array */}
        <group position={[0, 0, 7]}>
          <mesh position={[0, 0, 1.5]}>
            <cylinderGeometry args={[0.2, 0.2, 3.0, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          {/* Photovoltaic Solar Panel Wing */}
          <mesh position={[0, 0, 6.5]} rotation={[0.4, 0, 0]}>
            <boxGeometry args={[7.0, 0.12, 7.5]} />
            <meshStandardMaterial color="#1E3A8A" emissive="#1D4ED8" emissiveIntensity={0.3} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Panel Grid Lines */}
          <mesh position={[0, 0.08, 6.5]} rotation={[0.4, 0, 0]}>
            <planeGeometry args={[6.8, 7.2]} />
            <meshBasicMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>

        {/* Right Solar Panel Truss & Array */}
        <group position={[0, 0, -7]}>
          <mesh position={[0, 0, -1.5]}>
            <cylinderGeometry args={[0.2, 0.2, 3.0, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0, -6.5]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[7.0, 0.12, 7.5]} />
            <meshStandardMaterial color="#1E3A8A" emissive="#1D4ED8" emissiveIntensity={0.3} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.08, -6.5]} rotation={[-0.4, 0, 0]}>
            <planeGeometry args={[6.8, 7.2]} />
            <meshBasicMaterial color="#38BDF8" wireframe />
          </mesh>
        </group>

        {/* Parabolic Communication Dish */}
        <group ref={dishRef} position={[7.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 1.8, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 1.2, 0]}>
            <sphereGeometry args={[1.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#CBD5E1" metalness={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 2.0, 0]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <pointLight ref={beaconRef} position={[0, 2.0, 0]} color="#EF4444" intensity={2.0} distance={15} />
        </group>
      </group>

      {/* ========================================================= */}
      {/* CLEAN ARCHITECTURAL AIRPLANE LANDING PLATFORM               */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Solid Circular Landing Pad Plinth */}
        <mesh position={[0, 0.18, 0]} receiveShadow>
          <cylinderGeometry args={[4.2, 4.6, 0.36, 32]} />
          <meshStandardMaterial color="#0F172A" roughness={0.6} metalness={0.4} />
        </mesh>

        {/* Outer Warm Golden Inlay Ring */}
        <mesh position={[0, 0.37, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 3.9, 48]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>

        {/* Inner Cyan Guidance Landing Circle */}
        <mesh position={[0, 0.375, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 1.88, 32]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>

        {/* Center Touchdown Crosshair */}
        <mesh position={[0, 0.376, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color="#FDE047" transparent opacity={0.8} />
        </mesh>
        <mesh position={[0, 0.376, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[1.2, 0.04]} />
          <meshBasicMaterial color="#FDE047" transparent opacity={0.8} />
        </mesh>

        {/* Soft Golden Landing Pad Spotlight */}
        <spotLight
          position={[0, 5.0, 0]}
          color="#FFFBEB"
          intensity={2.6}
          distance={10}
          angle={0.5}
          penumbra={0.8}
        />
      </group>

    </group>
  );
};

export default ContactScene;
