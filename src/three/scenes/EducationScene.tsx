import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';


/**
 * Campus Shade Trees along lawns and pathways
 * Kept cleanly off the main road corridor
 */
const CampusTrees: React.FC = () => {
  const trees = useMemo(() => [
    { pos: [-6, 0, -16], scale: 1.1 },
    { pos: [-24, 0, -18], scale: 1.25 },
    { pos: [-6, 0, 16], scale: 1.15 },
    { pos: [-25, 0, 18], scale: 1.2 },
    { pos: [14, 0, -16], scale: 1.0 },
    { pos: [16, 0, 14], scale: 1.05 },
  ], []);

  return (
    <group>
      {trees.map((t, idx) => (
        <group key={`tree-${idx}`} position={t.pos as [number, number, number]} scale={t.scale}>
          {/* Trunk */}
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.22, 0.32, 3.2, 8]} />
            <meshStandardMaterial color="#3A281A" roughness={0.9} />
          </mesh>
          {/* Foliage */}
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[2.0, 10, 10]} />
            <meshStandardMaterial color="#1D3E25" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[0.6, 4.4, 0.4]}>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="#244E2E" roughness={0.85} flatShading />
          </mesh>
          <mesh position={[-0.5, 4.2, -0.4]}>
            <sphereGeometry args={[1.4, 8, 8]} />
            <meshStandardMaterial color="#2B5B37" roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * Campus Teak & Stone Benches
 */
const CampusBenches: React.FC = () => {
  return (
    <group>
      {[-8, 8].map((bz, idx) => (
        <group key={`bench-${idx}`} position={[-9.5, 0, bz]} rotation={[0, Math.PI / 2, 0]}>
          {/* Wood Slat Seat */}
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[2.2, 0.1, 0.6]} />
            <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, 0.85, -0.26]}>
            <boxGeometry args={[2.2, 0.45, 0.08]} />
            <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
          </mesh>
          {/* Granite Leg Supports */}
          <mesh position={[-0.8, 0.22, 0]}>
            <boxGeometry args={[0.18, 0.45, 0.5]} />
            <meshStandardMaterial color="#262D38" roughness={0.8} />
          </mesh>
          <mesh position={[0.8, 0.22, 0]}>
            <boxGeometry args={[0.18, 0.45, 0.5]} />
            <meshStandardMaterial color="#262D38" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * Warm Campus Pathway Lanterns & Lights
 */
const CampusLights: React.FC<{ active: boolean }> = ({ active }) => {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (lightRef.current) {
      const targetIntensity = active ? 1.8 : 0.6;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 3.0
      );
    }
  });

  const positions = useMemo(() => [
    [-6.5, -6.5],
    [-6.5, 6.5],
    [-14.5, -8.5],
    [-14.5, 8.5],
  ], []);

  return (
    <group>
      {positions.map(([lx, lz], idx) => (
        <group key={`c-light-${idx}`} position={[lx, 0, lz]}>
          {/* Classical Post */}
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 3.0, 8]} />
            <meshStandardMaterial color="#1E232A" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Lantern Cage */}
          <mesh position={[0, 3.1, 0]}>
            <boxGeometry args={[0.42, 0.5, 0.42]} />
            <meshStandardMaterial color="#1E232A" metalness={0.8} />
          </mesh>
          {/* Warm Glowing Bulb */}
          <mesh position={[0, 3.1, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshBasicMaterial color="#FFFBEB" />
          </mesh>
          {idx === 0 && (
            <pointLight
              ref={lightRef}
              position={[0, 3.1, 0]}
              color="#FDE68A"
              intensity={1.2}
              distance={18}
            />
          )}
        </group>
      ))}
    </group>
  );
};

/**
 * Dedicated Campus Entrance Signboard on Stone Plinth
 * Positioned on the campus lawn beside the pathway, completely clear of the road corridor
 */
const CampusEntranceSign: React.FC = () => {
  return (
    <group position={[-8.5, 0, 5.0]} rotation={[0, Math.PI / 3, 0]}>
      {/* Stone Plinth Foundation */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[3.2, 0.5, 0.8]} />
        <meshStandardMaterial color="#2B3240" roughness={0.8} />
      </mesh>

      {/* Granite Monument Board */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[2.8, 1.3, 0.35]} />
        <meshStandardMaterial color="#171C24" roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Gold Trim Header */}
      <mesh position={[0, 1.72, 0.18]}>
        <planeGeometry args={[2.6, 0.08]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      {/* College Inscription */}
      <Text
        position={[0, 1.4, 0.19]}
        fontSize={0.16}
        color="#FFF7ED"
        letterSpacing={0.14}
      >
        OXFORD ENGINEERING COLLEGE
      </Text>
      <Text
        position={[0, 1.15, 0.19]}
        fontSize={0.11}
        color="#FDE68A"
        letterSpacing={0.1}
      >
        COMPUTER SCIENCE & ENGINEERING
      </Text>
      <Text
        position={[0, 0.9, 0.19]}
        fontSize={0.09}
        color="#94A3B8"
        letterSpacing={0.08}
      >
        TRICHY • ESTD 2001
      </Text>

      {/* Soft ground uplight */}
      <pointLight position={[0, 0.3, 0.5]} color="#FDE68A" intensity={0.8} distance={3.5} />
    </group>
  );
};

/**
 * Atmospheric Floating Leaves & Dust
 */
const CampusAtmosphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.25;
    groupRef.current.rotation.y = t * 0.02;
  });

  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      x: -12 + Math.sin(i * 1.7) * 12,
      y: 0.8 + (i % 6) * 0.9,
      z: -10 + (i * 1.0),
      scale: 0.035 + (i % 3) * 0.015,
      color: i % 2 === 0 ? '#FDE68A' : '#4ADE80',
    }));
  }, []);

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={`p-${i}`} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.scale, 6, 6]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Oxford Engineering College Main Landmark
 * Colonial-modern academic building in warm terracotta stone, sandstone entablature, and granite plinth
 */
const CollegeBuilding: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <group position={[-20, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Foundation Granite Base */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[42, 0.8, 14]} />
        <meshStandardMaterial color="#2B3240" roughness={0.9} />
      </mesh>

      {/* Central Academic Portico Base */}
      <mesh position={[0, 5.5, 1.5]}>
        <boxGeometry args={[14, 9.5, 9]} />
        <meshStandardMaterial color="#7A3D31" roughness={0.7} />
      </mesh>

      {/* Grand Entrance Sandstone Steps */}
      {[0, 1, 2, 3].map((step) => (
        <mesh key={`step-${step}`} position={[0, 0.2 + step * 0.18, 6.2 - step * 0.35]}>
          <boxGeometry args={[10 - step * 0.4, 0.18, 0.8]} />
          <meshStandardMaterial color="#D8C8B5" roughness={0.6} />
        </mesh>
      ))}

      {/* Sandstone Portico Pillars */}
      {[-4.2, -1.4, 1.4, 4.2].map((px, i) => (
        <mesh key={`pillar-${i}`} position={[px, 4.8, 5.8]} castShadow>
          <cylinderGeometry args={[0.34, 0.4, 7.8, 16]} />
          <meshStandardMaterial color="#EAE0D2" roughness={0.5} />
        </mesh>
      ))}

      {/* Portico Entablature Beam */}
      <mesh position={[0, 8.8, 5.8]}>
        <boxGeometry args={[11.5, 0.8, 1.6]} />
        <meshStandardMaterial color="#EAE0D2" roughness={0.5} />
      </mesh>

      {/* Triangular Classical Pediment */}
      <mesh position={[0, 10.6, 5.8]}>
        <coneGeometry args={[6.2, 2.8, 3]} />
        <meshStandardMaterial color="#EAE0D2" roughness={0.5} />
      </mesh>

      {/* College Inscription on Entablature */}
      <Text
        position={[0, 8.8, 6.62]}
        fontSize={0.34}
        color="#1E232A"
        letterSpacing={0.16}
      >
        OXFORD ENGINEERING COLLEGE
      </Text>

      {/* Grand Arched Entrance Doorway */}
      <mesh position={[0, 2.6, 6.05]}>
        <boxGeometry args={[3.8, 4.4, 0.2]} />
        <meshStandardMaterial color="#1C212B" metalness={0.8} />
      </mesh>
      {/* Warm Golden Lobby Light */}
      <pointLight position={[0, 2.8, 5.5]} color="#FEF08A" intensity={active ? 2.5 : 1.2} distance={9} />

      {/* Proportional Campus Cupola / Bell Tower */}
      <group position={[0, 12.0, 1.5]}>
        {/* Tower Base */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[4.2, 4.2, 4.2]} />
          <meshStandardMaterial color="#7A3D31" roughness={0.7} />
        </mesh>
        {/* Sandstone Cornice */}
        <mesh position={[0, 4.0, 0]}>
          <boxGeometry args={[4.6, 0.4, 4.6]} />
          <meshStandardMaterial color="#EAE0D2" roughness={0.5} />
        </mesh>
        {/* Open Belfry Columns */}
        {[-1.6, 1.6].map((bx, i) => (
          <group key={`belfry-${i}`}>
            <mesh position={[bx, 5.2, -1.6]}>
              <cylinderGeometry args={[0.18, 0.22, 2.0, 8]} />
              <meshStandardMaterial color="#EAE0D2" />
            </mesh>
            <mesh position={[bx, 5.2, 1.6]}>
              <cylinderGeometry args={[0.18, 0.22, 2.0, 8]} />
              <meshStandardMaterial color="#EAE0D2" />
            </mesh>
          </group>
        ))}
        {/* Spire Roof */}
        <mesh position={[0, 7.5, 0]}>
          <coneGeometry args={[2.5, 3.2, 8]} />
          <meshStandardMaterial color="#2B3A4A" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Delicate Finial */}
        <mesh position={[0, 9.4, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 8]} />
          <meshBasicMaterial color="#F59E0B" />
        </mesh>

        {/* Illuminated Campus Clock Face */}
        <mesh position={[0, 2.2, 2.15]}>
          <circleGeometry args={[1.1, 32]} />
          <meshStandardMaterial
            color="#FFFBEB"
            emissive="#FEF08A"
            emissiveIntensity={active ? 0.9 : 0.4}
          />
        </mesh>
        {/* Clock Ring */}
        <mesh position={[0, 2.2, 2.16]}>
          <ringGeometry args={[1.05, 1.2, 32]} />
          <meshStandardMaterial color="#1E232A" metalness={0.8} />
        </mesh>
        {/* Clock Hands */}
        <mesh position={[0, 2.35, 2.18]} rotation={[0, 0, 0.35]}>
          <boxGeometry args={[0.06, 0.7, 0.01]} />
          <meshBasicMaterial color="#1E232A" />
        </mesh>
        <mesh position={[0.2, 2.2, 2.18]} rotation={[0, 0, -1.1]}>
          <boxGeometry args={[0.06, 0.5, 0.01]} />
          <meshBasicMaterial color="#1E232A" />
        </mesh>
      </group>

      {/* Symmetrical Left Wing (Classrooms / Labs) */}
      <group position={[-14.5, 4.8, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[15, 8.8, 8]} />
          <meshStandardMaterial color="#7A3D31" roughness={0.7} />
        </mesh>
        {/* Mansard Hip Roof */}
        <mesh position={[0, 5.4, 0]}>
          <boxGeometry args={[15.6, 2.0, 8.6]} />
          <meshStandardMaterial color="#242E3B" roughness={0.6} />
        </mesh>
        {/* Double Row Windows */}
        {[-5.0, -1.8, 1.8, 5.0].map((wx, idx) => (
          <group key={`l-win-${idx}`}>
            <mesh position={[wx, -1.2, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial
                color="#FFFBEB"
                emissive="#FDE68A"
                emissiveIntensity={active ? 0.55 : 0.25}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[wx, 2.2, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial
                color="#FFFBEB"
                emissive="#FDE68A"
                emissiveIntensity={active ? 0.55 : 0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>

      {/* Symmetrical Right Wing (Library / Tech Labs) */}
      <group position={[14.5, 4.8, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[15, 8.8, 8]} />
          <meshStandardMaterial color="#7A3D31" roughness={0.7} />
        </mesh>
        {/* Mansard Hip Roof */}
        <mesh position={[0, 5.4, 0]}>
          <boxGeometry args={[15.6, 2.0, 8.6]} />
          <meshStandardMaterial color="#242E3B" roughness={0.6} />
        </mesh>
        {/* Windows */}
        {[-5.0, -1.8, 1.8, 5.0].map((wx, idx) => (
          <group key={`r-win-${idx}`}>
            <mesh position={[wx, -1.2, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial
                color="#FFFBEB"
                emissive="#FDE68A"
                emissiveIntensity={active ? 0.55 : 0.25}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[wx, 2.2, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial
                color="#FFFBEB"
                emissive="#FDE68A"
                emissiveIntensity={active ? 0.55 : 0.25}
                roughness={0.2}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

/**
 * CH 01 / CHAPTER 02 — EDUCATION: Oxford Engineering College
 * 
 * Features:
 * - Continuous, expansive green lawn across the entire scene (no harsh seams or void)
 * - Paved grand pathway leading from road to college steps
 * - Entrance signboard positioned safely on lawn away from road camera path
 */
export const EducationScene: React.FC = () => {
  const isActive = useJourneyStore((state) => state.currentChapter === 1);

  return (
    <group position={[-42, 0, -75]}>
      {/* Main College Building Landmark */}
      <CollegeBuilding active={isActive} />

      {/* 3. Grand Campus Paved Pathway (leading from traveler to college) */}
      <mesh position={[-10, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[18, 5.5]} />
        <meshStandardMaterial color="#505A69" roughness={0.7} />
      </mesh>
      {/* Stone Curb Borders along the pathway */}
      <mesh position={[-10, 0.035, -2.85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 0.3]} />
        <meshStandardMaterial color="#2B3240" roughness={0.8} />
      </mesh>
      <mesh position={[-10, 0.035, 2.85]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 0.3]} />
        <meshStandardMaterial color="#2B3240" roughness={0.8} />
      </mesh>

      {/* 4. Expansive Continuous Campus Green Lawn (covers entire quadrant seamlessly) */}
      <mesh position={[-15, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[160, 140]} />
        <meshStandardMaterial color="#22482A" roughness={0.95} />
      </mesh>

      {/* 5. Campus Entrance Monument Signboard (safely on lawn away from road) */}
      <CampusEntranceSign />

      {/* 6. Campus Pathway Lights */}
      <CampusLights active={isActive} />

      {/* 7. Teak & Stone Benches */}
      <CampusBenches />

      {/* 8. Shade Trees */}
      <CampusTrees />

      {/* 9. Atmospheric Drifting Dust & Golden Leaves */}
      <CampusAtmosphere />
    </group>
  );
};

export default EducationScene;
