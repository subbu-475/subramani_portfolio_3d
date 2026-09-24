import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

export const IntroScene: React.FC = () => {
  const jumpToChapter = useJourneyStore((state) => state.jumpToChapter);
  const riverRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
    if (riverRef.current) {
      // Subtle water shimmer
      const mat = riverRef.current.material as THREE.MeshStandardMaterial;
      mat.roughness = 0.2 + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Golden Sunset Sun on Horizon */}
      <mesh position={[8, 11, -55]}>
        <sphereGeometry args={[9, 32, 32]} />
        <meshBasicMaterial color="#FF9933" />
      </mesh>
      {/* Sun Atmosphere Glow Halo */}
      <mesh position={[8, 11, -54.8]}>
        <ringGeometry args={[9, 24, 32]} />
        <meshBasicMaterial color="#FFB049" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[8, 13, -40]} color="#FFA64D" intensity={3.5} distance={90} />

      {/* Majestic Mountain Valley (Layer 1 - Distant Alpine Peaks) */}
      <group position={[0, 0, -48]}>
        {/* Left Giant Snow Peak */}
        <mesh position={[-20, 10, 0]}>
          <coneGeometry args={[16, 22, 5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.9} />
        </mesh>
        <mesh position={[-20, 16.5, 0.2]}>
          <coneGeometry args={[7, 9, 5]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
        </mesh>

        {/* Center Golden Mountain Peak */}
        <mesh position={[4, 12, -4]}>
          <coneGeometry args={[20, 26, 6]} />
          <meshStandardMaterial color="#2B2118" roughness={0.9} />
        </mesh>
        <mesh position={[4, 19.5, -3.8]}>
          <coneGeometry args={[9, 11, 6]} />
          <meshStandardMaterial color="#FEF3C7" roughness={0.5} />
        </mesh>

        {/* Right Jagged Peak */}
        <mesh position={[24, 9, 2]}>
          <coneGeometry args={[15, 20, 5]} />
          <meshStandardMaterial color="#1E293B" roughness={0.9} />
        </mesh>
        <mesh position={[24, 15, 2.2]}>
          <coneGeometry args={[6.5, 8, 5]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.5} />
        </mesh>
      </group>

      {/* Midground Valley Ridges with Pine Forest Slopes */}
      <mesh position={[-14, 4, -32]}>
        <coneGeometry args={[14, 12, 6]} />
        <meshStandardMaterial color="#192A20" roughness={0.9} />
      </mesh>
      <mesh position={[18, 5, -34]}>
        <coneGeometry args={[16, 14, 6]} />
        <meshStandardMaterial color="#192A20" roughness={0.9} />
      </mesh>

      {/* 3D Winding Sunset River through the Valley (Reflective Water) */}
      <mesh ref={riverRef} position={[0, 0.02, -28]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7, 44]} />
        <meshStandardMaterial
          color="#38BDF8"
          roughness={0.2}
          metalness={0.8}
          emissive="#0284C7"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Procedural Pine Trees Lining Valley and Trail */}
      {[
        [-4.5, -6], [-6.2, -12], [-5.2, -18], [-7.5, -24], [-6.0, -32],
        [4.8, -8], [6.5, -14], [5.2, -20], [7.8, -26], [6.2, -34],
        [-12, -28], [-15, -35], [14, -28], [16, -36]
      ].map(([x, z], i) => (
        <group key={`tree-${i}`} position={[x, 0, z]}>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.2, 0.28, 1.6, 8]} />
            <meshStandardMaterial color="#3B2613" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <coneGeometry args={[1.6, 2.2, 6]} />
            <meshStandardMaterial color="#143422" roughness={0.85} />
          </mesh>
          <mesh position={[0, 3.4, 0]}>
            <coneGeometry args={[1.2, 1.9, 6]} />
            <meshStandardMaterial color="#1B432C" roughness={0.85} />
          </mesh>
          <mesh position={[0, 4.3, 0]}>
            <coneGeometry args={[0.75, 1.5, 6]} />
            <meshStandardMaterial color="#22543D" roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Foreground Rocky Trail Ground */}
      <mesh position={[0, 0, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 28]} />
        <meshStandardMaterial color="#4A3A2A" roughness={0.95} />
      </mesh>
      {/* Rocky Boulders on Foreground Ridge */}
      {[-3.5, 3.2, -4.8, 4.4].map((rx, i) => (
        <mesh key={`boulder-${i}`} position={[rx, 0.25, -3 - i * 3]} rotation={[0.2, i, 0]}>
          <dodecahedronGeometry args={[0.4 + (i % 2) * 0.15, 0]} />
          <meshStandardMaterial color="#6E5D4B" roughness={0.9} />
        </mesh>
      ))}

      {/* ========================================================= */}
      {/* 3D WOODEN DIRECTIONAL SIGNPOST (Matching Reference Image) */}
      {/* ========================================================= */}
      <group position={[3.6, 0, -3.2]}>
        {/* Timber Post */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.13, 0.16, 4.4, 8]} />
          <meshStandardMaterial color="#3E2712" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.45, 0]}>
          <coneGeometry args={[0.18, 0.22, 8]} />
          <meshStandardMaterial color="#26170A" />
        </mesh>

        {/* 1. EDUCATION (Arrow Right) */}
        <group
          position={[0.55, 3.8, 0.1]}
          onClick={() => jumpToChapter(1)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.65, 0.4, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            🎓 EDUCATION →
          </Text>
        </group>

        {/* 2. EXPERIENCE (Arrow Right) */}
        <group
          position={[0.55, 3.2, 0.05]}
          onClick={() => jumpToChapter(3)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.65, 0.4, 0.08]} />
            <meshStandardMaterial color="#4A2F17" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            💼 EXPERIENCE →
          </Text>
        </group>

        {/* 3. PROJECTS (Arrow Right) */}
        <group
          position={[0.55, 2.6, 0.1]}
          onClick={() => jumpToChapter(4)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.65, 0.4, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            &lt;/&gt; PROJECTS →
          </Text>
        </group>

        {/* 4. SKILLS (Arrow Right) */}
        <group
          position={[0.55, 2.0, 0.05]}
          onClick={() => jumpToChapter(5)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.65, 0.4, 0.08]} />
            <meshStandardMaterial color="#4A2F17" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            ⚙ SKILLS →
          </Text>
        </group>

        {/* 5. FUTURE (Arrow Right) */}
        <group
          position={[0.55, 1.4, 0.1]}
          onClick={() => jumpToChapter(7)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.65, 0.4, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            ⟁ FUTURE →
          </Text>
        </group>
      </group>

      {/* Floating Stardust Particles */}
      <group ref={particlesRef}>
        {[...Array(30)].map((_, i) => (
          <mesh
            key={`dust-${i}`}
            position={[
              (Math.sin(i * 1.7) * 14),
              1 + (i % 6) * 1.5,
              -2 - (i * 1.2)
            ]}
          >
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#FDBA74" transparent opacity={0.65} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default IntroScene;
