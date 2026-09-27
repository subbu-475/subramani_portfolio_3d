import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

/**
 * CH 02 — CAREER: Futuristic Developer City & Corporate Towers
 * Positioned along the LEFT turn segment at WP7 (-42, 0, -170).
 * 
 * Buildings represent career milestones:
 * - Tower 1: KO Innovation Software Solutions (Associate Software Developer)
 * - Tower 2: Freelance / Self-Employed (Mobile App & Frappe Developer)
 * - Tower 3: Hilife.Ai Private Limited (Junior Full Stack Developer)
 * 
 * Interactive: Clicking any building illuminates it, updates the selected experience,
 * and reveals the complete milestone details in the clean HTML card.
 */
export const CareerScene: React.FC = () => {
  const selectedExperienceIndex = useJourneyStore((s) => s.selectedExperienceIndex);
  const setSelectedExperienceIndex = useJourneyStore((s) => s.setSelectedExperienceIndex);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const tower1LightRef = useRef<THREE.PointLight>(null);
  const tower2LightRef = useRef<THREE.PointLight>(null);
  const tower3LightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    // Dynamic light interpolation based on selection
    if (tower1LightRef.current) {
      const target = selectedExperienceIndex === 0 ? 3.0 : hoveredIndex === 0 ? 2.0 : 0.8;
      tower1LightRef.current.intensity = THREE.MathUtils.lerp(tower1LightRef.current.intensity, target, delta * 5);
    }
    if (tower2LightRef.current) {
      const target = selectedExperienceIndex === 1 ? 3.0 : hoveredIndex === 1 ? 2.0 : 0.8;
      tower2LightRef.current.intensity = THREE.MathUtils.lerp(tower2LightRef.current.intensity, target, delta * 5);
    }
    if (tower3LightRef.current) {
      const target = selectedExperienceIndex === 2 ? 3.0 : hoveredIndex === 2 ? 2.0 : 0.8;
      tower3LightRef.current.intensity = THREE.MathUtils.lerp(tower3LightRef.current.intensity, target, delta * 5);
    }
  });

  return (
    <group position={[-42, 0, -170]}>
      {/* City Boulevard Sidewalk on the Right side */}
      <mesh position={[7.5, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 36]} />
        <meshStandardMaterial color="#0A0E1D" roughness={0.8} />
      </mesh>

      {/* Modern Streetlamps along Boulevard */}
      {[-5.5, 5.5].map((sx, sideIdx) => (
        <group key={`career-lamps-${sideIdx}`}>
          {[-12, -4, 4, 12].map((sz, lampIdx) => (
            <group key={`c-lamp-${sideIdx}-${lampIdx}`} position={[sx, 0, sz]}>
              <mesh position={[0, 2.8, 0]}>
                <cylinderGeometry args={[0.06, 0.1, 5.6, 8]} />
                <meshStandardMaterial color="#1E293B" metalness={0.9} />
              </mesh>
              <mesh position={[sideIdx === 0 ? 0.6 : -0.6, 5.5, 0]}>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={1.5} />
              </mesh>
              <pointLight
                position={[sideIdx === 0 ? 0.6 : -0.6, 5.2, 0]}
                color="#00D9FF"
                intensity={1.0}
                distance={12}
              />
            </group>
          ))}
        </group>
      ))}

      {/* ========================================================= */}
      {/* 3D CORPORATE OFFICE TOWERS (LEFT SIDE, FACING ROAD)       */}
      {/* ========================================================= */}
      <group position={[-18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* ── TOWER 1: KO Innovation Software Solutions (Index 0) ── */}
        <group
          position={[-8, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedExperienceIndex(0);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredIndex(0);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredIndex(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Main Skyscraper Body */}
          <mesh position={[0, 12, 0]} castShadow receiveShadow>
            <boxGeometry args={[8, 24, 8]} />
            <meshStandardMaterial
              color={selectedExperienceIndex === 0 ? '#0B162C' : '#070C18'}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Illuminated Window Matrix */}
          {[...Array(10)].map((_, r) => {
            const isSelected = selectedExperienceIndex === 0;
            return (
              <mesh key={`ko-win-${r}`} position={[0, 3 + r * 1.9, 4.02]}>
                <planeGeometry args={[6.8, 1.0]} />
                <meshStandardMaterial
                  color="#00D9FF"
                  emissive="#00D9FF"
                  emissiveIntensity={isSelected ? 1.0 : hoveredIndex === 0 ? 0.7 : 0.4}
                />
              </mesh>
            );
          })}

          {/* Rooftop Corporate Signboard */}
          <group position={[0, 24.8, 4.05]}>
            <mesh>
              <boxGeometry args={[6.6, 1.2, 0.2]} />
              <meshStandardMaterial color="#0A1020" roughness={0.3} metalness={0.8} />
            </mesh>
            <Text
              position={[0, 0, 0.12]}
              fontSize={0.34}
              color="#00D9FF"
              letterSpacing={0.14}
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              KO INNOVATION
            </Text>
          </group>

          {/* Rooftop Antenna Spire */}
          <mesh position={[0, 26, 0]}>
            <cylinderGeometry args={[0.06, 0.15, 4.5, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 28.2, 0]}>
            <sphereGeometry args={[0.22, 8, 8]} />
            <meshBasicMaterial color="#00D9FF" />
          </mesh>

          {/* Interactive Spot / Point Light */}
          <pointLight
            ref={tower1LightRef}
            position={[0, 14, 5.5]}
            color="#00D9FF"
            distance={18}
            decay={2}
          />
        </group>

        {/* ── TOWER 2: Freelance / Self-Employed (Index 1) ── */}
        <group
          position={[4, 0, -2]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedExperienceIndex(1);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredIndex(1);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredIndex(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Main Studio Body */}
          <mesh position={[0, 9.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[7, 19, 7]} />
            <meshStandardMaterial
              color={selectedExperienceIndex === 1 ? '#18140E' : '#0D0B08'}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          {/* Warm Amber Window Matrix */}
          {[...Array(8)].map((_, r) => {
            const isSelected = selectedExperienceIndex === 1;
            return (
              <mesh key={`free-win-${r}`} position={[0, 2.5 + r * 1.8, 3.52]}>
                <planeGeometry args={[5.8, 0.9]} />
                <meshStandardMaterial
                  color="#FFC857"
                  emissive="#FFC857"
                  emissiveIntensity={isSelected ? 1.0 : hoveredIndex === 1 ? 0.7 : 0.4}
                />
              </mesh>
            );
          })}

          {/* Rooftop Studio Signboard */}
          <group position={[0, 19.8, 3.55]}>
            <mesh>
              <boxGeometry args={[5.6, 1.1, 0.2]} />
              <meshStandardMaterial color="#16120B" roughness={0.3} metalness={0.8} />
            </mesh>
            <Text
              position={[0, 0, 0.12]}
              fontSize={0.30}
              color="#FFC857"
              letterSpacing={0.12}
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              FREELANCE STUDIO
            </Text>
          </group>

          {/* Interactive Light */}
          <pointLight
            ref={tower2LightRef}
            position={[0, 11, 4.8]}
            color="#FFC857"
            distance={16}
            decay={2}
          />
        </group>

        {/* ── TOWER 3: Hilife.Ai Private Limited (Index 2) ── */}
        <group
          position={[14, 0, -4]}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedExperienceIndex(2);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveredIndex(2);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setHoveredIndex(null);
            document.body.style.cursor = 'auto';
          }}
        >
          {/* Main Lab Tower Body */}
          <mesh position={[0, 8, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.5, 16, 6.5]} />
            <meshStandardMaterial
              color={selectedExperienceIndex === 2 ? '#0E1726' : '#070C16'}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>

          {/* Cyan Windows */}
          {[...Array(7)].map((_, r) => {
            const isSelected = selectedExperienceIndex === 2;
            return (
              <mesh key={`hilife-win-${r}`} position={[0, 2.5 + r * 1.7, 3.28]}>
                <planeGeometry args={[5.4, 0.85]} />
                <meshStandardMaterial
                  color="#38BDF8"
                  emissive="#38BDF8"
                  emissiveIntensity={isSelected ? 0.9 : hoveredIndex === 2 ? 0.6 : 0.35}
                />
              </mesh>
            );
          })}

          {/* Rooftop Lab Signboard */}
          <group position={[0, 16.8, 3.3]}>
            <mesh>
              <boxGeometry args={[5.2, 1.0, 0.2]} />
              <meshStandardMaterial color="#0A101C" roughness={0.3} metalness={0.8} />
            </mesh>
            <Text
              position={[0, 0, 0.12]}
              fontSize={0.28}
              color="#38BDF8"
              letterSpacing={0.12}
              fontWeight="bold"
              anchorX="center"
              anchorY="middle"
            >
              HILIFE.AI
            </Text>
          </group>

          {/* Interactive Light */}
          <pointLight
            ref={tower3LightRef}
            position={[0, 10, 4.5]}
            color="#38BDF8"
            distance={14}
            decay={2}
          />
        </group>
      </group>
    </group>
  );
};

export default CareerScene;
