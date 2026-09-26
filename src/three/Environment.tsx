import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

// Sky & Fog colors for the 9-stage day-to-space progression
const SKY_COLORS = [
  { sky: '#c27847', fog: '#e0a070', density: 0.0020 }, // 0: Morning Dawn / Village
  { sky: '#2563eb', fog: '#60a5fa', density: 0.0018 }, // 1: Late Morning / College
  { sky: '#b45309', fog: '#d97706', density: 0.0020 }, // 2: Mid-Afternoon / First Code
  { sky: '#9a3412', fog: '#ea580c', density: 0.0020 }, // 3: Golden Hour / Career
  { sky: '#581c87', fog: '#7e22ce', density: 0.0022 }, // 4: Sunset / Projects
  { sky: '#1e1b4b', fog: '#312e81', density: 0.0020 }, // 5: Twilight / Skills
  { sky: '#030712', fog: '#090d1a', density: 0.0018 }, // 6: Night City / Balcony
  { sky: '#010206', fog: '#030712', density: 0.0006 }, // 7: Space Ascent
  { sky: '#000103', fog: '#010204', density: 0.0001 }, // 8: Orbital Deep Space
];

export const Environment: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  const fogRef = useRef<THREE.FogExp2>(null);
  const bgColorRef = useRef<THREE.Color>(new THREE.Color('#c27847'));
  const sunRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Group>(null);
  const starsGroupRef = useRef<THREE.Group>(null);
  const groundRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const stageIdx = Math.max(0, Math.min(SKY_COLORS.length - 1, currentChapter));
    const config = SKY_COLORS[stageIdx];

    // Smoothly interpolate background sky color
    bgColorRef.current.lerp(new THREE.Color(config.sky), delta * 2.5);
    state.scene.background = bgColorRef.current;

    // Smoothly interpolate fog color and density
    if (fogRef.current) {
      fogRef.current.color.lerp(new THREE.Color(config.fog), delta * 2.5);
      fogRef.current.density = THREE.MathUtils.lerp(fogRef.current.density, config.density, delta * 2.0);
    }

    // Dynamic Sun position across day
    if (sunRef.current) {
      if (journeyProgress < 0.60) {
        sunRef.current.visible = true;
        const sunZ = -40 - journeyProgress * 300;
        const sunY = Math.max(12, 32 - Math.abs(journeyProgress - 0.18) * 55);
        sunRef.current.position.set(22, sunY, sunZ);
      } else {
        sunRef.current.visible = false;
      }
    }

    // Dynamic Moon in Night Chapter (Ch 06)
    if (moonRef.current) {
      if (journeyProgress >= 0.62 && journeyProgress <= 0.82) {
        moonRef.current.visible = true;
        moonRef.current.position.set(-25, 38, -325);
      } else {
        moonRef.current.visible = false;
      }
    }

    // Planet Earth in Space Chapters (Ch 07, 08)
    if (earthRef.current) {
      if (journeyProgress >= 0.75) {
        earthRef.current.visible = true;
        earthRef.current.rotation.y += delta * 0.02;
        earthRef.current.position.set(-15, -45, -395);
      } else {
        earthRef.current.visible = false;
      }
    }

    // Stars visibility fades in towards evening and peaks in space
    if (starsGroupRef.current) {
      const starOpacity = THREE.MathUtils.clamp((journeyProgress - 0.45) * 3, 0, 1);
      starsGroupRef.current.visible = starOpacity > 0.05;
    }
  });

  return (
    <>
      <fogExp2 ref={fogRef} attach="fog" args={['#e0a070', 0.002]} />

      {/* Main Ground Plane */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, -180]}
        receiveShadow
      >
        <planeGeometry args={[800, 750, 16, 16]} />
        <meshStandardMaterial
          color="#1c1917"
          roughness={0.90}
          metalness={0.08}
        />
      </mesh>


      {/* Celestial Sun */}
      <group ref={sunRef} position={[22, 18, -60]}>
        <mesh>
          <sphereGeometry args={[8.5, 32, 32]} />
          <meshBasicMaterial color="#FFB049" />
        </mesh>
        {/* Sun Corona Halo */}
        <mesh>
          <sphereGeometry args={[13, 24, 24]} />
          <meshBasicMaterial color="#FDBA74" transparent opacity={0.25} />
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

      {/* Planet Earth visible below in Space (Ch 07 & 08) */}
      <group ref={earthRef} position={[-15, -45, -395]} visible={false}>
        <mesh>
          <sphereGeometry args={[42, 48, 48]} />
          <meshStandardMaterial
            color="#1D4ED8"
            emissive="#0F172A"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[42.1, 32, 32]} />
          <meshStandardMaterial
            color="#15803D"
            transparent
            opacity={0.5}
            roughness={0.9}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[43.5, 32, 32]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.28} />
        </mesh>
      </group>

      {/* Starfield Sky */}
      <group ref={starsGroupRef}>
        <Stars
          radius={180}
          depth={90}
          count={8000}
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
