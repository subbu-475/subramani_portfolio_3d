import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { experiences } from '../../data/experience';

/**
 * CH 03 — CAREER: Tech City Boulevard & Corporate Towers
 * Positioned along the LEFT turn segment at WP7 (-42, 0, -170).
 * The office towers are placed on the LEFT side of the road (negative X),
 * facing +X towards the traveler walking along the boulevard.
 */
export const CareerScene: React.FC = () => {
  const beacon1Ref = useRef<THREE.Group>(null);
  const beacon2Ref = useRef<THREE.Group>(null);
  const beacon3Ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beacon1Ref.current) beacon1Ref.current.position.y = 11.5 + Math.sin(t * 2) * 0.3;
    if (beacon2Ref.current) beacon2Ref.current.position.y = 9.5 + Math.cos(t * 2.2) * 0.3;
    if (beacon3Ref.current) beacon3Ref.current.position.y = 8.5 + Math.sin(t * 1.8 + 1) * 0.3;
  });

  return (
    <group position={[-42, 0, -170]}>
      {/* City Boulevard Sidewalk on the Right side */}
      <mesh position={[7.5, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 36]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Modern Streetlamps along Boulevard (both sides) */}
      {[-5.5, 5.5].map((sx, sideIdx) => (
        <group key={`career-lamps-${sideIdx}`}>
          {[-12, -4, 4, 12].map((sz, lampIdx) => (
            <group key={`c-lamp-${sideIdx}-${lampIdx}`} position={[sx, 0, sz]}>
              <mesh position={[0, 2.8, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 5.6, 8]} />
                <meshStandardMaterial color="#1E293B" metalness={0.9} />
              </mesh>
              <mesh position={[sideIdx === 0 ? 0.6 : -0.6, 5.5, 0]}>
                <sphereGeometry args={[0.26, 16, 16]} />
                <meshStandardMaterial color="#FEF08A" emissive="#FDE047" emissiveIntensity={1.8} />
              </mesh>
              <pointLight
                position={[sideIdx === 0 ? 0.6 : -0.6, 5.2, 0]}
                color="#FEF08A"
                intensity={1.6}
                distance={14}
              />
            </group>
          ))}
        </group>
      ))}

      {/* ========================================================= */}
      {/* 3D CORPORATE OFFICE TOWERS (LEFT SIDE, FACING ROAD)       */}
      {/* ========================================================= */}
      <group position={[-18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Tower 1 (Center-Left: KO Innovation Software Solutions) */}
        <group position={[-8, 0, 0]}>
          {/* Main Skyscraper Body */}
          <mesh position={[0, 12, 0]}>
            <boxGeometry args={[8, 24, 8]} />
            <meshStandardMaterial color="#0B131E" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Illuminated Window Matrix */}
          {[...Array(10)].map((_, r) => (
            <mesh key={`ko-win-${r}`} position={[0, 3 + r * 1.9, 4.02]}>
              <planeGeometry args={[6.8, 1.0]} />
              <meshStandardMaterial
                color="#0284C7"
                emissive="#06B6D4"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
          {/* Rooftop Antenna Spire */}
          <mesh position={[0, 26, 0]}>
            <cylinderGeometry args={[0.06, 0.15, 4.5, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 28.2, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshBasicMaterial color="#EF4444" />
          </mesh>

          {/* 3D Floating Beacon Pin */}
          <group ref={beacon1Ref} position={[0, 11.5, 5.2]}>
            <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.8, 1.8, 0.25]} />
                <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.6} />
              </mesh>
              <Text
                position={[0, 0.35, 0.18]}
                fontSize={0.28}
                color="#FFFFFF"
                letterSpacing={0.06}
              >
                {experiences[0]?.company || 'KO Innovation'}
              </Text>
              <Text
                position={[0, -0.15, 0.18]}
                fontSize={0.22}
                color="#FEF08A"
                letterSpacing={0.04}
              >
                {experiences[0]?.title || 'Associate Software Developer'}
              </Text>
              <Text
                position={[0, -0.55, 0.18]}
                fontSize={0.18}
                color="#94A3B8"
              >
                {experiences[0]?.period || '02/2025 - Present'}
              </Text>
            </Float>
          </group>
        </group>

        {/* Tower 2 (Center: Freelance / Self-Employed Tower) */}
        <group position={[4, 0, -2]}>
          <mesh position={[0, 9.5, 0]}>
            <boxGeometry args={[7, 19, 7]} />
            <meshStandardMaterial color="#1E1B18" metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Amber Window Matrix */}
          {[...Array(8)].map((_, r) => (
            <mesh key={`free-win-${r}`} position={[0, 2.5 + r * 1.8, 3.52]}>
              <planeGeometry args={[5.8, 0.9]} />
              <meshStandardMaterial
                color="#D97706"
                emissive="#F59E0B"
                emissiveIntensity={0.7}
              />
            </mesh>
          ))}
          {/* Beacon */}
          <group ref={beacon2Ref} position={[0, 9.5, 4.6]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.4, 1.6, 0.25]} />
                <meshStandardMaterial color="#D97706" emissive="#D97706" emissiveIntensity={0.5} />
              </mesh>
              <Text
                position={[0, 0.3, 0.18]}
                fontSize={0.26}
                color="#FFFFFF"
                letterSpacing={0.05}
              >
                {experiences[1]?.company || 'Freelance'}
              </Text>
              <Text
                position={[0, -0.15, 0.18]}
                fontSize={0.20}
                color="#FDE047"
              >
                {experiences[1]?.title || 'Full Stack Developer'}
              </Text>
              <Text
                position={[0, -0.5, 0.18]}
                fontSize={0.17}
                color="#E2E8F0"
              >
                {experiences[1]?.period || '06/2024 - 01/2025'}
              </Text>
            </Float>
          </group>
        </group>

        {/* Tower 3 (Right: Hilife.Ai Pvt Ltd) */}
        <group position={[14, 0, -4]}>
          <mesh position={[0, 8, 0]}>
            <boxGeometry args={[6.5, 16, 6.5]} />
            <meshStandardMaterial color="#0E1726" metalness={0.8} roughness={0.2} />
          </mesh>
          {[...Array(7)].map((_, r) => (
            <mesh key={`hilife-win-${r}`} position={[0, 2.5 + r * 1.7, 3.28]}>
              <planeGeometry args={[5.4, 0.85]} />
              <meshStandardMaterial
                color="#0284C7"
                emissive="#38BDF8"
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
          {/* Beacon */}
          <group ref={beacon3Ref} position={[0, 8.5, 4.2]}>
            <Float speed={2.2} rotationIntensity={0.2} floatIntensity={0.3}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[4.2, 1.6, 0.25]} />
                <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.5} />
              </mesh>
              <Text
                position={[0, 0.3, 0.18]}
                fontSize={0.26}
                color="#FFFFFF"
                letterSpacing={0.05}
              >
                {experiences[2]?.company || 'Hilife.Ai Pvt Ltd'}
              </Text>
              <Text
                position={[0, -0.15, 0.18]}
                fontSize={0.20}
                color="#7DD3FC"
              >
                {experiences[2]?.title || 'Python Intern'}
              </Text>
              <Text
                position={[0, -0.5, 0.18]}
                fontSize={0.17}
                color="#CBD5E1"
              >
                {experiences[2]?.period || '11/2023 - 04/2024'}
              </Text>
            </Float>
          </group>
        </group>
      </group>
    </group>
  );
};

export default CareerScene;
