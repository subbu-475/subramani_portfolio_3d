import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

// Sky & Fog colors for the 9-stage day-to-space progression
// Stage 0 calibrated to a sophisticated cinematic travel palette:
// Deep charcoal slate zenith, warm sunset horizon, soft golden-hour mist
const SKY_COLORS = [
  { sky: '#1E232D', fog: '#2A2A34', density: 0.0015 }, // 0: Cinematic Sunset / Trailhead
  { sky: '#142033', fog: '#202D42', density: 0.0014 }, // 1: Education Campus
  { sky: '#4A3B32', fog: '#6B5344', density: 0.0018 }, // 2: Mid-Afternoon / First Code
  { sky: '#3D282E', fog: '#5C3843', density: 0.0018 }, // 3: Golden Hour / Career
  { sky: '#11141A', fog: '#171B22', density: 0.0016 }, // 4: Modern Architecture Gallery / Projects
  { sky: '#0A0F1D', fog: '#101625', density: 0.0015 }, // 5: Technology Laboratory / Skills
  { sky: '#07090E', fog: '#0C101A', density: 0.0016 }, // 6: Night City / Balcony
  { sky: '#1E1B4B', fog: '#2E1065', density: 0.0017 }, // 7: Dawn Horizon Skybridge (Deep Indigo/Violet Dawn)
  { sky: '#38182E', fog: '#451A03', density: 0.0015 }, // 8: Sunrise Observation Pavilion (Warm Amber/Gold Sunrise)
];

const scratchSkyColor = new THREE.Color();
const scratchFogColor = new THREE.Color();

export const Environment: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  const fogRef = useRef<THREE.FogExp2>(null);
  const bgColorRef = useRef<THREE.Color>(new THREE.Color('#1E232D'));
  const sunRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const dawnSunRef = useRef<THREE.Group>(null);
  const starsGroupRef = useRef<THREE.Group>(null);
  const groundRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const stageIdx = Math.max(0, Math.min(SKY_COLORS.length - 1, currentChapter));
    const config = SKY_COLORS[stageIdx];

    // Smoothly interpolate background sky color
    scratchSkyColor.set(config.sky);
    bgColorRef.current.lerp(scratchSkyColor, delta * 2.5);
    state.scene.background = bgColorRef.current;

    // Smoothly interpolate fog color and density
    if (fogRef.current) {
      scratchFogColor.set(config.fog);
      fogRef.current.color.lerp(scratchFogColor, delta * 2.5);
      fogRef.current.density = THREE.MathUtils.lerp(fogRef.current.density, config.density, delta * 2.0);
    }

    // Dynamic Natural Sun position across the journey
    if (sunRef.current) {
      if (journeyProgress < 0.60) {
        sunRef.current.visible = true;
        const sunZ = -70 - journeyProgress * 260;
        const sunY = Math.max(14, 24 - Math.abs(journeyProgress - 0.15) * 45);
        sunRef.current.position.set(20, sunY, sunZ);
      } else {
        sunRef.current.visible = false;
      }
    }

    // Dynamic Moon in Night Chapter (Ch 06)
    if (moonRef.current) {
      if (journeyProgress >= 0.58 && journeyProgress <= 0.74) {
        moonRef.current.visible = true;
        moonRef.current.position.set(-25, 38, -325);
      } else {
        moonRef.current.visible = false;
      }
    }

    // Radiant Golden Dawn Sunrise ahead of Skybridge (Ch 05 & 06)
    if (dawnSunRef.current) {
      if (journeyProgress >= 0.70) {
        dawnSunRef.current.visible = true;
        const sunriseY = THREE.MathUtils.lerp(10, 18, (journeyProgress - 0.70) / 0.30);
        dawnSunRef.current.position.set(-18, sunriseY, -445);
      } else {
        dawnSunRef.current.visible = false;
      }
    }

    // Stars visibility peaks at night and fades during dawn sunrise
    if (starsGroupRef.current) {
      const starOpacity = journeyProgress < 0.75
        ? THREE.MathUtils.clamp((journeyProgress - 0.45) * 3, 0, 1)
        : THREE.MathUtils.clamp(1 - (journeyProgress - 0.75) * 4, 0, 1);
      starsGroupRef.current.visible = starOpacity > 0.05;
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#2A2A34', 0.0015]} />

      {/* Main Ground Plane: Rich charcoal earth terrain */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, -180]}
        receiveShadow
      >
        <planeGeometry args={[800, 750, 16, 16]} />
        <meshStandardMaterial
          color="#13161C"
          roughness={0.92}
          metalness={0.06}
        />
      </mesh>

      {/* Natural, Soft Celestial Sun (nestled on mountain horizon, non-distracting) */}
      <group ref={sunRef} position={[20, 20, -70]}>
        {/* Soft Sun Core */}
        <mesh>
          <sphereGeometry args={[2.5, 32, 32]} />
          <meshBasicMaterial color="#FFF7ED" />
        </mesh>
        {/* Subtle, Delicate Golden Corona */}
        <mesh>
          <sphereGeometry args={[4.2, 24, 24]} />
          <meshBasicMaterial color="#FBBF24" transparent opacity={0.16} />
        </mesh>
        <mesh>
          <sphereGeometry args={[6.8, 24, 24]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.06} />
        </mesh>
      </group>

      {/* Celestial Moon for Night */}
      <group ref={moonRef} position={[-25, 38, -325]} visible={false}>
        <mesh>
          <sphereGeometry args={[4.5, 32, 32]} />
          <meshBasicMaterial color="#F8FAFC" />
        </mesh>
        <mesh>
          <sphereGeometry args={[7, 24, 24]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.22} />
        </mesh>
      </group>

      {/* Golden Dawn Sunrise at Horizon (Ch 05 & 06) */}
      <group ref={dawnSunRef} position={[-18, 14, -445]} visible={false}>
        {/* Luminous Sun Core */}
        <mesh>
          <sphereGeometry args={[7, 32, 32]} />
          <meshBasicMaterial color="#FEF08A" />
        </mesh>
        {/* Warm Golden Sunrise Corona */}
        <mesh>
          <sphereGeometry args={[14, 24, 24]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.35} />
        </mesh>
        {/* Soft Apricot Atmospheric Glow */}
        <mesh>
          <sphereGeometry args={[26, 24, 24]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.15} />
        </mesh>
        {/* Violet Horizon Sky Tint */}
        <mesh>
          <sphereGeometry args={[45, 24, 24]} />
          <meshBasicMaterial color="#EC4899" transparent opacity={0.05} />
        </mesh>
      </group>

      {/* Starfield Sky */}
      <group ref={starsGroupRef}>
        <Stars
          radius={180}
          depth={90}
          count={3500}
          factor={4.0}
          saturation={0.5}
          fade
          speed={0.5}
        />
      </group>
    </>
  );
};

export default Environment;
