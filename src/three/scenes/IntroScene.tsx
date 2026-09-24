import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

export const IntroScene: React.FC = () => {
  const jumpToChapter = useJourneyStore((state) => state.jumpToChapter);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Golden Sunset Sun on Horizon */}
      <mesh position={[0, 8, -45]}>
        <sphereGeometry args={[7, 32, 32]} />
        <meshBasicMaterial color="#FF9E40" />
      </mesh>
      {/* Sun glow halo */}
      <mesh position={[0, 8, -44.8]}>
        <ringGeometry args={[7, 18, 32]} />
        <meshBasicMaterial color="#FFB049" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[0, 10, -35]} color="#FFA64D" intensity={3} distance={80} />

      {/* Mountain Range (Layer 1 - Distant peaks) */}
      <mesh position={[-18, 7, -38]}>
        <coneGeometry args={[14, 18, 5]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      {/* Snow cap on peak 1 */}
      <mesh position={[-18, 12.5, -37.8]}>
        <coneGeometry args={[6, 7, 5]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
      </mesh>

      <mesh position={[0, 9, -42]}>
        <coneGeometry args={[18, 22, 6]} />
        <meshStandardMaterial color="#0F172A" roughness={0.9} />
      </mesh>
      {/* Snow cap on center peak */}
      <mesh position={[0, 15, -41.8]}>
        <coneGeometry args={[8, 10, 6]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.5} />
      </mesh>

      <mesh position={[18, 6, -36]}>
        <coneGeometry args={[12, 16, 5]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      {/* Snow cap on peak 3 */}
      <mesh position={[18, 11, -35.8]}>
        <coneGeometry args={[5, 6, 5]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.5} />
      </mesh>

      {/* Midground Hills */}
      <mesh position={[-10, 2, -25]}>
        <coneGeometry args={[9, 9, 6]} />
        <meshStandardMaterial color="#141E1B" roughness={0.9} />
      </mesh>
      <mesh position={[12, 2.5, -28]}>
        <coneGeometry args={[11, 10, 6]} />
        <meshStandardMaterial color="#141E1B" roughness={0.9} />
      </mesh>

      {/* Pine Trees lining the trail */}
      {[
        [-4.2, -6], [-5.5, -12], [-4.8, -18], [-6.2, -24], [-5.0, -30],
        [4.8, -8], [5.8, -14], [4.5, -20], [6.0, -26], [5.2, -32],
      ].map(([x, z], i) => (
        <group key={`pine-${i}`} position={[x, 0, z]}>
          {/* Trunk */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.2, 0.25, 1.4, 8]} />
            <meshStandardMaterial color="#3B2613" roughness={0.9} />
          </mesh>
          {/* Foliage Cones */}
          <mesh position={[0, 2.0, 0]}>
            <coneGeometry args={[1.5, 2.0, 6]} />
            <meshStandardMaterial color="#143422" roughness={0.8} />
          </mesh>
          <mesh position={[0, 3.0, 0]}>
            <coneGeometry args={[1.1, 1.8, 6]} />
            <meshStandardMaterial color="#1B432C" roughness={0.8} />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <coneGeometry args={[0.7, 1.4, 6]} />
            <meshStandardMaterial color="#22543D" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Winding Trail Ground Plane */}
      <mesh position={[0, -0.01, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 50]} />
        <meshStandardMaterial color="#3E2E1F" roughness={0.95} />
      </mesh>
      {/* Dirt path rocks & details */}
      {[...Array(16)].map((_, i) => (
        <mesh
          key={`rock-${i}`}
          position={[
            (Math.sin(i * 3) * 1.8),
            0.05,
            -2 - i * 2.2
          ]}
          rotation={[0, i, 0]}
        >
          <dodecahedronGeometry args={[0.1 + (i % 3) * 0.05, 0]} />
          <meshStandardMaterial color="#6B5C4D" roughness={0.9} />
        </mesh>
      ))}

      {/* 3D Wooden Directional Signpost (Matching Reference Panel 2 exactly) */}
      <group position={[3.6, 0, -4]}>
        {/* Main rustic vertical post */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 4.4, 8]} />
          <meshStandardMaterial color="#452B14" roughness={0.9} />
        </mesh>

        {/* Post cap */}
        <mesh position={[0, 4.45, 0]}>
          <coneGeometry args={[0.18, 0.2, 8]} />
          <meshStandardMaterial color="#2E1C0C" />
        </mesh>

        {/* Sign 1: EDUCATION */}
        <group
          position={[0.5, 3.8, 0.1]}
          onClick={() => jumpToChapter(1)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.36, 0.08]} />
            <meshStandardMaterial color="#6B4423" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            EDUCATION →
          </Text>
        </group>

        {/* Sign 2: CAREER */}
        <group
          position={[-0.5, 3.2, 0.05]}
          onClick={() => jumpToChapter(3)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.36, 0.08]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            ← CAREER
          </Text>
        </group>

        {/* Sign 3: PROJECTS */}
        <group
          position={[0.5, 2.6, 0.1]}
          onClick={() => jumpToChapter(4)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.36, 0.08]} />
            <meshStandardMaterial color="#6B4423" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            PROJECTS →
          </Text>
        </group>

        {/* Sign 4: SKILLS */}
        <group
          position={[-0.5, 2.0, 0.05]}
          onClick={() => jumpToChapter(5)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.36, 0.08]} />
            <meshStandardMaterial color="#5C3A1E" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            ← SKILLS
          </Text>
        </group>

        {/* Sign 5: FUTURE */}
        <group
          position={[0.5, 1.4, 0.1]}
          onClick={() => jumpToChapter(7)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.36, 0.08]} />
            <meshStandardMaterial color="#6B4423" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" font={undefined} letterSpacing={0.1}>
            FUTURE →
          </Text>
        </group>
      </group>

      {/* Floating Golden Dust Particles */}
      <Float speed={1.5} floatIntensity={1}>
        {[...Array(24)].map((_, i) => (
          <mesh
            key={`dust-${i}`}
            position={[
              (Math.sin(i * 1.5) * 12),
              1 + (i % 6) * 1.2,
              -4 - (i * 1.5)
            ]}
          >
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#FDBA74" transparent opacity={0.6} />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

export default IntroScene;
