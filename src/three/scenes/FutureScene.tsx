import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CH 07 — THE JOURNEY CONTINUES: Rocket Launch & Space Ascent
 * Positioned along the ascending LEFT turn segment at WP15 (-28, 15, -365).
 * Features a high-tech rocket launch pad, gantry tower, ascending spacecraft,
 * glowing propulsion particles, and transition into cosmic orbit.
 */
export const FutureScene: React.FC = () => {
  const rocketFlameRef = useRef<THREE.PointLight>(null);
  const planetRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (rocketFlameRef.current) {
      rocketFlameRef.current.intensity = 3.5 + Math.sin(state.clock.elapsedTime * 12) * 1.0;
    }
    if (planetRingRef.current) {
      planetRingRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group position={[-28, 15, -365]}>
      {/* ========================================================= */}
      {/* GROUND LAUNCH PAD COMPLEX (Below the ascending path)      */}
      {/* ========================================================= */}
      <group position={[14, -15, 20]}>
        {/* Launch Pad Hexagonal Concrete Base */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[14, 16, 1.0, 6]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
        {/* Flame Trench Blast Deflector */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[6, 7, 0.5, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.9} />
        </mesh>

        {/* Tall Launch Gantry Tower Structure */}
        <group position={[-8, 0, 0]}>
          {/* Main Tower Mast */}
          <mesh position={[0, 16, 0]}>
            <boxGeometry args={[3.2, 32, 3.2]} />
            <meshStandardMaterial color="#DC2626" metalness={0.7} roughness={0.3} wireframe={false} />
          </mesh>
          {/* Tower Cross Bracing Visual Simulation */}
          {[...Array(6)].map((_, i) => (
            <mesh key={`gantry-ring-${i}`} position={[0, 5 + i * 5, 0]}>
              <boxGeometry args={[3.6, 0.6, 3.6]} />
              <meshStandardMaterial color="#991B1B" metalness={0.8} />
            </mesh>
          ))}
          {/* Top Crane Arm */}
          <mesh position={[3.5, 31, 0]}>
            <boxGeometry args={[7.0, 1.2, 1.4]} />
            <meshStandardMaterial color="#DC2626" metalness={0.8} />
          </mesh>
          {/* Red Aviation Warning Beacon on top */}
          <mesh position={[0, 32.5, 0]}>
            <sphereGeometry args={[0.35, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>
          <pointLight position={[0, 32.5, 0]} color="#EF4444" intensity={2.5} distance={25} />
        </group>

        {/* High-Powered Launch Pad Floodlights */}
        {[-8, 8].map((fx, i) => (
          <group key={`flood-${i}`} position={[fx, 1.0, 9]}>
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[0.1, 0.15, 6, 8]} />
              <meshStandardMaterial color="#64748B" metalness={0.9} />
            </mesh>
            <mesh position={[0, 6.2, 0]} rotation={[0.4, 0, 0]}>
              <boxGeometry args={[1.2, 0.8, 0.6]} />
              <meshStandardMaterial color="#0284C7" emissive="#38BDF8" emissiveIntensity={1.5} />
            </mesh>
            <pointLight position={[0, 6.2, 0]} color="#38BDF8" intensity={3.0} distance={30} />
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* ASCENDING ROCKET / SPACECRAFT IN FLIGHT                   */}
      {/* ========================================================= */}
      <group position={[0, 2, -10]} rotation={[0.3, 0, 0]}>
        {/* Rocket Main Fuselage */}
        <mesh position={[0, 6, 0]}>
          <cylinderGeometry args={[1.4, 1.6, 12, 24]} />
          <meshStandardMaterial color="#F8FAFC" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Aerodynamic Nose Cone */}
        <mesh position={[0, 13.5, 0]}>
          <coneGeometry args={[1.4, 3.2, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Delta Wings / Aerodynamic Fins */}
        {[0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2].map((finAngle, idx) => (
          <mesh key={`fin-${idx}`} position={[0, 1.5, 0]} rotation={[0, finAngle, 0]}>
            <boxGeometry args={[0.15, 3.2, 4.2]} />
            <meshStandardMaterial color="#0284C7" metalness={0.8} />
          </mesh>
        ))}
        {/* Engine Nozzles */}
        <mesh position={[0, -0.6, 0]}>
          <cylinderGeometry args={[1.2, 0.8, 1.2, 16]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} />
        </mesh>
        {/* Rocket Thruster Flame & Plasma Glow */}
        <mesh position={[0, -3.2, 0]}>
          <coneGeometry args={[1.0, 4.2, 16]} />
          <meshBasicMaterial color="#FF6600" />
        </mesh>
        <pointLight ref={rocketFlameRef} position={[0, -2, 0]} color="#FF6600" intensity={4.0} distance={25} />
      </group>

      {/* ========================================================= */}
      {/* RINGED CELESTIAL PLANET IN THE SPACE SKY                  */}
      {/* ========================================================= */}
      <group position={[28, 20, -50]}>
        {/* Planet Sphere */}
        <mesh>
          <sphereGeometry args={[12, 48, 48]} />
          <meshStandardMaterial
            color="#C7D2FE"
            emissive="#4338CA"
            emissiveIntensity={0.6}
            roughness={0.6}
          />
        </mesh>
        {/* Planet Rings */}
        <mesh ref={planetRingRef} rotation={[1.1, 0.4, 0]}>
          <ringGeometry args={[15, 26, 64]} />
          <meshBasicMaterial color="#E0E7FF" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      </group>

    </group>
  );
};

export default FutureScene;
