import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { experiences } from '../../data/experience';

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
    <group position={[0, 0, -135]}>
      {/* City Boulevard Road & Sidewalk */}
      <mesh position={[0, 0.01, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 34]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Center Road Markings */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`stripe-${i}`}
          position={[0, 0.03, -3 - i * 5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.3, 2.5]} />
          <meshBasicMaterial color="#FDE047" />
        </mesh>
      ))}

      {/* Sidewalks */}
      <mesh position={[-8, 0.1, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 34]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>
      <mesh position={[8, 0.1, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[5, 34]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Modern Streetlamps along Boulevard */}
      {[-6, 6].map((sx, sideIdx) => (
        <group key={`side-lamps-${sideIdx}`}>
          {[-4, -12, -20, -28].map((sz, lampIdx) => (
            <group key={`lamp-${sideIdx}-${lampIdx}`} position={[sx, 0, sz]}>
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

      {/* Tower 1 (Left - KO Innovation Software Solutions) */}
      <group position={[-12, 0, -18]}>
        {/* Main Skyscraper Body */}
        <mesh position={[0, 11, 0]}>
          <boxGeometry args={[7, 22, 7]} />
          <meshStandardMaterial color="#0B131E" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Illuminated Window Matrix */}
        {[...Array(9)].map((_, r) => (
          <mesh key={`ko-win-${r}`} position={[0, 3 + r * 1.8, 3.52]}>
            <planeGeometry args={[5.8, 0.9]} />
            <meshStandardMaterial
              color="#0284C7"
              emissive="#06B6D4"
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
        {/* Rooftop Antenna Spire with blinking beacon */}
        <mesh position={[0, 24, 0]}>
          <cylinderGeometry args={[0.06, 0.15, 4, 8]} />
          <meshStandardMaterial color="#64748B" metalness={0.9} />
        </mesh>
        <mesh position={[0, 26, 0]}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>

        {/* 3D Floating Beacon Pin (Matching Reference Panel 6) */}
        <group ref={beacon1Ref} position={[4, 11.5, 2]}>
          <Float speed={2} floatIntensity={0.5}>
            {/* Holographic Glowing Pin */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <coneGeometry args={[0.25, 0.8, 8]} rotation={[Math.PI, 0, 0]} />
              <meshStandardMaterial color="#06B6D4" emissive="#06B6D4" emissiveIntensity={1.5} />
            </mesh>
            {/* Info Badge */}
            <group position={[0, 0.9, 0]}>
              <mesh>
                <boxGeometry args={[4.2, 1.1, 0.1]} />
                <meshStandardMaterial color="#030712" transparent opacity={0.85} roughness={0.3} />
              </mesh>
              <Text position={[0, 0.22, 0.08]} fontSize={0.22} color="#38BDF8" font={undefined}>
                {experiences[0]?.company || 'KO Innovation Software'}
              </Text>
              <Text position={[0, -0.18, 0.08]} fontSize={0.16} color="#94A3B8" font={undefined}>
                Associate Software Developer (2025 - Present)
              </Text>
            </group>
          </Float>
        </group>
      </group>

      {/* Tower 2 (Right Center - Freelance & Frappe Enterprise) */}
      <group position={[13, 0, -22]}>
        <mesh position={[0, 9, 0]}>
          <boxGeometry args={[6.5, 18, 6.5]} />
          <meshStandardMaterial color="#0E1726" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Windows */}
        {[...Array(7)].map((_, r) => (
          <mesh key={`fr-win-${r}`} position={[0, 3 + r * 2.0, 3.28]}>
            <planeGeometry args={[5.2, 1.0]} />
            <meshStandardMaterial
              color="#D97706"
              emissive="#F59E0B"
              emissiveIntensity={0.7}
            />
          </mesh>
        ))}

        {/* 3D Floating Beacon Pin */}
        <group ref={beacon2Ref} position={[-3.5, 9.5, 2]}>
          <Float speed={2.2} floatIntensity={0.5}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0, -0.6, 0]}>
              <coneGeometry args={[0.25, 0.8, 8]} rotation={[Math.PI, 0, 0]} />
              <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={1.5} />
            </mesh>
            <group position={[0, 0.9, 0]}>
              <mesh>
                <boxGeometry args={[4.2, 1.1, 0.1]} />
                <meshStandardMaterial color="#030712" transparent opacity={0.85} roughness={0.3} />
              </mesh>
              <Text position={[0, 0.22, 0.08]} fontSize={0.22} color="#FDBA74" font={undefined}>
                {experiences[1]?.company || 'Freelance / Self-Employed'}
              </Text>
              <Text position={[0, -0.18, 0.08]} fontSize={0.16} color="#94A3B8" font={undefined}>
                App & Frappe Developer (2024 - Present)
              </Text>
            </group>
          </Float>
        </group>
      </group>

      {/* Tower 3 (Left Midground - Hilife.Ai) */}
      <group position={[-9, 0, -32]}>
        <mesh position={[0, 7.5, 0]}>
          <boxGeometry args={[6, 15, 6]} />
          <meshStandardMaterial color="#0F172A" metalness={0.8} />
        </mesh>
        {[...Array(6)].map((_, r) => (
          <mesh key={`hi-win-${r}`} position={[0, 2.5 + r * 1.8, 3.02]}>
            <planeGeometry args={[4.8, 0.8]} />
            <meshStandardMaterial
              color="#2563EB"
              emissive="#3B82F6"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}

        {/* 3D Floating Beacon Pin */}
        <group ref={beacon3Ref} position={[3, 8.5, 2]}>
          <Float speed={1.9} floatIntensity={0.5}>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#3B82F6" emissive="#3B82F6" emissiveIntensity={2} />
            </mesh>
            <group position={[0, 0.8, 0]}>
              <mesh>
                <boxGeometry args={[3.8, 0.9, 0.1]} />
                <meshStandardMaterial color="#030712" transparent opacity={0.85} roughness={0.3} />
              </mesh>
              <Text position={[0, 0.18, 0.08]} fontSize={0.2} color="#93C5FD" font={undefined}>
                {experiences[2]?.company || 'Hilife.Ai Pvt Ltd'}
              </Text>
              <Text position={[0, -0.16, 0.08]} fontSize={0.15} color="#94A3B8" font={undefined}>
                Junior Full Stack Developer
              </Text>
            </group>
          </Float>
        </group>
      </group>

      {/* Distant City Skyline Silhouettes */}
      {[
        [-22, 14, -40, 8, 28, 8],
        [-15, 16, -46, 7, 32, 7],
        [0, 18, -48, 8, 36, 8],
        [16, 15, -44, 8, 30, 8],
        [24, 12, -38, 7, 24, 7],
      ].map(([x, y, z, w, h, d], i) => (
        <mesh key={`distant-sky-${i}`} position={[x, y, z]}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color="#020617" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
};

export default CareerScene;
