import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Distant Birds Flock gliding across the golden sunset sky
 */
const DistantBirds: React.FC = () => {
  const birdsRef = useRef<THREE.Group>(null);

  // Bird flap cycle & path
  useFrame((state) => {
    if (!birdsRef.current) return;
    const t = state.clock.elapsedTime * 0.4;
    // Glide slowly across the distant mountain horizon
    birdsRef.current.position.x = 24 + Math.sin(t * 0.25) * 8;
    birdsRef.current.position.z = -120 + Math.cos(t * 0.25) * 12;
    birdsRef.current.position.y = 22 + Math.sin(t * 0.5) * 1.5;
  });

  const birdShapes = useMemo(() => {
    return [
      { offset: [0, 0, 0], scale: 0.18, phase: 0 },
      { offset: [-2.2, 0.4, 1.8], scale: 0.15, phase: 0.4 },
      { offset: [2.4, -0.3, 1.2], scale: 0.16, phase: 0.8 },
      { offset: [-4.2, 0.9, 3.4], scale: 0.13, phase: 1.2 },
      { offset: [4.6, 0.2, 2.8], scale: 0.14, phase: 1.6 },
    ];
  }, []);

  return (
    <group ref={birdsRef} position={[24, 22, -120]}>
      {birdShapes.map((b, i) => (
        <group key={`bird-${i}`} position={b.offset as [number, number, number]} scale={b.scale}>
          {/* Left Wing */}
          <mesh rotation={[0, 0, 0.25]}>
            <planeGeometry args={[1.2, 0.25]} />
            <meshBasicMaterial color="#1E232A" side={THREE.DoubleSide} />
          </mesh>
          {/* Right Wing */}
          <mesh position={[1.1, 0, 0]} rotation={[0, 0, -0.25]}>
            <planeGeometry args={[1.2, 0.25]} />
            <meshBasicMaterial color="#1E232A" side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
};


/**
 * Distant City Skyline Silhouette on the Horizon
 * Symbolizes Subramani's destination in tech & software engineering
 */
const DistantCitySkyline: React.FC = () => {
  const towers = useMemo(() => {
    return [
      { x: -14, w: 2.4, h: 14, d: 2.4, z: -85 },
      { x: -10, w: 3.2, h: 22, d: 3.0, z: -88 },
      { x: -5, w: 2.8, h: 18, d: 2.8, z: -86 },
      { x: 0, w: 3.6, h: 26, d: 3.5, z: -92 }, // Center spire tower
      { x: 6, w: 3.0, h: 20, d: 3.0, z: -87 },
      { x: 11, w: 2.5, h: 15, d: 2.5, z: -85 },
      { x: 16, w: 3.4, h: 17, d: 3.2, z: -89 },
      { x: 22, w: 2.2, h: 12, d: 2.2, z: -84 },
    ];
  }, []);

  return (
    <group position={[0, 0, 0]}>
      {towers.map((t, idx) => (
        <group key={`tower-${idx}`} position={[t.x, t.h / 2, t.z]}>
          {/* Main Tower Mass */}
          <mesh>
            <boxGeometry args={[t.w, t.h, t.d]} />
            <meshStandardMaterial
              color="#1A202C"
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          {/* Subtle Warm Window Glow Points on select high floors */}
          {idx % 2 === 0 && (
            <mesh position={[0, t.h * 0.35, t.d * 0.51]}>
              <planeGeometry args={[t.w * 0.7, 0.4]} />
              <meshBasicMaterial color="#FDE047" transparent opacity={0.65} />
            </mesh>
          )}
          {/* Antenna Spire on tallest tower */}
          {idx === 3 && (
            <mesh position={[0, t.h / 2 + 3, 0]}>
              <cylinderGeometry args={[0.08, 0.15, 6, 8]} />
              <meshBasicMaterial color="#E2E8F0" />
            </mesh>
          )}
        </group>
      ))}

      {/* Soft city haze glow on the horizon */}
      <mesh position={[4, 10, -95]}>
        <planeGeometry args={[70, 24]} />
        <meshBasicMaterial
          color="#D97736"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};

/**
 * Natural Scenic Trees along the Roadside
 * Clean, stylized pine and cypress trees in muted deep forest greens
 */
const ScenicTrees: React.FC = () => {
  const treePositions = useMemo(() => {
    return [
      // Left side roadside trees (flanking, not blocking)
      { pos: [-6.8, 0, -8], scale: 1.1, rot: 0.2 },
      { pos: [-8.2, 0, -16], scale: 1.3, rot: -0.4 },
      { pos: [-7.4, 0, -25], scale: 1.0, rot: 0.6 },
      { pos: [-9.5, 0, -34], scale: 1.4, rot: 0.1 },
      { pos: [-8.0, 0, -44], scale: 1.2, rot: -0.3 },

      // Right side roadside trees (receding in distance)
      { pos: [7.8, 0, -10], scale: 1.2, rot: -0.1 },
      { pos: [9.2, 0, -20], scale: 1.4, rot: 0.5 },
      { pos: [8.4, 0, -30], scale: 1.1, rot: -0.2 },
      { pos: [10.0, 0, -42], scale: 1.3, rot: 0.3 },
    ];
  }, []);

  return (
    <group>
      {treePositions.map((t, idx) => (
        <group
          key={`scenic-tree-${idx}`}
          position={t.pos as [number, number, number]}
          scale={t.scale}
          rotation={[0, t.rot, 0]}
        >
          {/* Slender Trunk */}
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.14, 0.22, 2.8, 8]} />
            <meshStandardMaterial color="#2D241E" roughness={0.9} />
          </mesh>

          {/* Tier 1 Pine Foliage */}
          <mesh position={[0, 3.2, 0]}>
            <coneGeometry args={[1.5, 2.4, 7]} />
            <meshStandardMaterial color="#1B2B20" roughness={0.85} flatShading />
          </mesh>

          {/* Tier 2 Pine Foliage */}
          <mesh position={[0, 4.4, 0]}>
            <coneGeometry args={[1.2, 2.1, 7]} />
            <meshStandardMaterial color="#213527" roughness={0.85} flatShading />
          </mesh>

          {/* Tier 3 Pine Foliage (Top) */}
          <mesh position={[0, 5.5, 0]}>
            <coneGeometry args={[0.8, 1.8, 7]} />
            <meshStandardMaterial color="#273F2F" roughness={0.8} flatShading />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/**
 * Minimalist Origin Milestone Marker
 * Premium dark stone obelisk with subtle coordinates and soft golden rim
 */
const OriginMilestone: React.FC = () => {
  return (
    <group position={[4.2, 0, -3.5]}>
      {/* Stone Plinth */}
      <mesh position={[0, 0.15, 0]} receiveShadow>
        <boxGeometry args={[0.9, 0.3, 0.9]} />
        <meshStandardMaterial color="#1F232B" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Sleek Dark Granite Marker */}
      <mesh position={[0, 0.95, 0]} castShadow>
        <boxGeometry args={[0.5, 1.4, 0.5]} />
        <meshStandardMaterial color="#141820" roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Subtle Golden Inlay Stripe */}
      <mesh position={[0, 1.35, 0.255]}>
        <planeGeometry args={[0.36, 0.04]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      {/* Subtle indicator beacon light */}
      <pointLight position={[0, 1.7, 0]} color="#FDE047" intensity={0.4} distance={4} />
    </group>
  );
};

/**
 * Atmospheric Golden Sunset Dust Particles
 * Subtle motes drifting on the evening breeze
 */
const SunsetDustMotes: React.FC = () => {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.elapsedTime;
    particlesRef.current.position.y = Math.sin(t * 0.3) * 0.3;
    particlesRef.current.rotation.y = t * 0.015;
  });

  const motes = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      x: (Math.sin(i * 1.8) * 14),
      y: 0.8 + (i % 7) * 0.8,
      z: -2 - (i * 1.6),
      scale: 0.03 + (i % 3) * 0.015,
      opacity: 0.3 + (i % 4) * 0.12,
    }));
  }, []);

  return (
    <group ref={particlesRef}>
      {motes.map((m, i) => (
        <mesh key={`dust-${i}`} position={[m.x, m.y, m.z]}>
          <sphereGeometry args={[m.scale, 6, 6]} />
          <meshBasicMaterial
            color="#FEF08A"
            transparent
            opacity={m.opacity}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * Architectural Launch Desk Platform at WP0 (Origin)
 * Resting base for the Paper Airplane before journey departure.
 */
const LaunchDeskPlatform: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Heavy Architectural Slate/Walnut Desk Plinth */}
      <mesh position={[0, 0.20, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.35, 0.40, 1.05]} />
        <meshStandardMaterial color="#141822" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Recessed Warm Brass Trim Edge */}
      <mesh position={[0, 0.405, 0]}>
        <boxGeometry args={[1.37, 0.015, 1.07]} />
        <meshStandardMaterial color="#D97706" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Technical Flight Route Map Sheet on desk */}
      <mesh position={[0, 0.415, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1.1, 0.8]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Blueprint Grid Lines */}
      <mesh position={[0, 0.417, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.05, 0.75]} />
        <meshBasicMaterial color="#38BDF8" wireframe transparent opacity={0.25} />
      </mesh>

      {/* Soft Architectural Overhead Spotlight focusing on the resting paper airplane */}
      <spotLight
        position={[0, 2.6, 0.4]}
        color="#FFFBEB"
        intensity={2.2}
        distance={5.0}
        angle={0.55}
        penumbra={0.8}
      />
    </group>
  );
};

/**
 * IntroScene: Premium Cinematic Opening Scene
 * 
 * Replaces the generic low-poly village with a spacious, breathtaking landscape:
 * - Natural open road leading into the distance
 * - Distant subtle city skyline silhouette on the horizon
 * - Clean scenic pine trees framing the composition
 * - Architectural Launch Desk Platform where the Paper Airplane takes off
 * - Elegant departure milestone marker
 * - Floating golden evening dust particles & gliding birds
 */
export const IntroScene: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* 1. Paper Airplane Launch Desk Platform */}
      <LaunchDeskPlatform />

      {/* 2. Distant City Skyline Destination */}
      <DistantCitySkyline />

      {/* 3. Gliding Horizon Birds */}
      <DistantBirds />

      {/* 4. Natural Scenic Roadside Trees */}
      <ScenicTrees />

      {/* 5. Minimalist Origin Marker */}
      <OriginMilestone />

      {/* 6. Atmospheric Golden Sunset Dust Particles */}
      <SunsetDustMotes />
    </group>
  );
};

export default IntroScene;
