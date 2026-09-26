import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

export const IntroScene: React.FC = () => {
  const jumpToChapter = useJourneyStore((state) => state.jumpToChapter);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* ========================================================= */}
      {/* MORNING SUNRISE GOLDEN AMBIANCE                          */}
      {/* ========================================================= */}

      {/* Morning Sunrise Sun on Front Horizon */}
      <mesh position={[12, 14, -65]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial color="#FFB049" />
      </mesh>
      {/* Sun Atmosphere Glow Halo */}
      <mesh position={[12, 14, -64.8]}>
        <ringGeometry args={[10, 26, 32]} />
        <meshBasicMaterial color="#FDBA74" transparent opacity={0.35} />
      </mesh>
      <pointLight position={[12, 16, -50]} color="#FFA64D" intensity={3.0} distance={100} />


      {/* ========================================================= */}
      {/* LEFT SIDE: TALL PALM TREES & PADDY FIELD                  */}
      {/* ========================================================= */}
      {/* Lush Green Paddy Fields on the Left */}
      <mesh position={[-16, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 50]} />
        <meshStandardMaterial color="#2E5A27" roughness={0.85} />
      </mesh>

      {/* Tall Coconut Palm Trees along the Left Field */}
      {[-8, -16, -24, -32].map((pz, idx) => (
        <group key={`palm-${idx}`} position={[-6.5 - (idx % 2) * 1.5, 0, pz]}>
          {/* Slender curved trunk */}
          <mesh position={[0, 2.5, 0]} rotation={[0.08, 0, (idx % 2 === 0 ? 0.08 : -0.06)]}>
            <cylinderGeometry args={[0.18, 0.28, 5.2, 8]} />
            <meshStandardMaterial color="#5C4033" roughness={0.9} />
          </mesh>
          {/* Palm Fronds Canopy */}
          {[0, 1, 2, 3, 4, 5].map((angleIdx) => {
            const rotY = (angleIdx / 6) * Math.PI * 2;
            return (
              <mesh
                key={`frond-${angleIdx}`}
                position={[0, 5.1, 0]}
                rotation={[0.45, rotY, 0]}
              >
                <coneGeometry args={[0.7, 3.2, 4]} />
                <meshStandardMaterial color="#1E4D2B" roughness={0.8} />
              </mesh>
            );
          })}
          {/* Coconuts cluster */}
          <mesh position={[0, 4.8, 0]}>
            <sphereGeometry args={[0.3, 6, 6]} />
            <meshStandardMaterial color="#8B7355" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ========================================================= */}
      {/* RIGHT SIDE: VILLAGE HUT & BANYAN TREE                     */}
      {/* ========================================================= */}
      {/* Traditional Thatched-Roof Village Hut */}
      <group position={[9, 0, -18]} rotation={[0, -0.2, 0]}>
        {/* Hut Mud Walls */}
        <mesh position={[0, 1.3, 0]}>
          <boxGeometry args={[4.2, 2.6, 3.8]} />
          <meshStandardMaterial color="#A07855" roughness={0.9} />
        </mesh>
        {/* Thatched Straw Roof */}
        <mesh position={[0, 3.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[3.6, 2.0, 4]} />
          <meshStandardMaterial color="#D4A373" roughness={0.95} />
        </mesh>
        {/* Wooden Doorway */}
        <mesh position={[-1.2, 0.9, 1.92]}>
          <boxGeometry args={[1.0, 1.8, 0.1]} />
          <meshStandardMaterial color="#4A2F17" roughness={0.9} />
        </mesh>
        {/* Wooden Window */}
        <mesh position={[1.1, 1.4, 1.92]}>
          <boxGeometry args={[0.8, 0.8, 0.08]} />
          <meshStandardMaterial color="#3E2712" roughness={0.9} />
        </mesh>
        {/* Warm Morning Interior Glow */}
        <pointLight position={[0, 1.5, 0.5]} color="#FF9933" intensity={1.8} distance={8} />
      </group>

      {/* Sprawling Banyan Tree beside the Hut */}
      <group position={[11, 0, -30]}>
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.6, 0.85, 4.5, 10]} />
          <meshStandardMaterial color="#4A3525" roughness={0.9} />
        </mesh>
        {/* Expansive Foliage Canopy */}
        <mesh position={[0, 4.8, 0]}>
          <sphereGeometry args={[3.8, 12, 12]} />
          <meshStandardMaterial color="#1B4D2E" roughness={0.85} />
        </mesh>
        <mesh position={[-1.5, 4.2, 1]}>
          <sphereGeometry args={[2.4, 8, 8]} />
          <meshStandardMaterial color="#143D24" roughness={0.85} />
        </mesh>
      </group>

      {/* Village Stone Compound Wall on Right */}
      <mesh position={[6.2, 0.45, -12]}>
        <boxGeometry args={[0.5, 0.9, 16]} />
        <meshStandardMaterial color="#6E5D4B" roughness={0.9} />
      </mesh>

      {/* Leaning Bicycle against Compound Wall */}
      <group position={[5.8, 0.5, -9]} rotation={[0, 0, -0.15]}>
        {/* Wheels */}
        <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.03, 8, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.8} />
        </mesh>
        <mesh position={[0.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.35, 0.03, 8, 16]} />
          <meshStandardMaterial color="#1F2937" metalness={0.8} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.15, 0]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
          <meshStandardMaterial color="#2563EB" metalness={0.7} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3D DIRECTIONAL SIGNPOST (Turns LEFT to Education!)       */}
      {/* ========================================================= */}
      <group position={[3.2, 0, -32]}>
        {/* Timber Post */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.12, 0.15, 4.4, 8]} />
          <meshStandardMaterial color="#3E2712" roughness={0.9} />
        </mesh>
        <mesh position={[0, 4.45, 0]}>
          <coneGeometry args={[0.18, 0.22, 8]} />
          <meshStandardMaterial color="#26170A" />
        </mesh>

        {/* 1. EDUCATION (Arrow LEFT - Since road turns left here!) */}
        <group
          position={[-0.55, 3.8, 0.1]}
          onClick={() => jumpToChapter(1)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" letterSpacing={0.1}>
            ← 🎓 COLLEGE
          </Text>
        </group>

        {/* 2. CAREER */}
        <group
          position={[0.55, 3.2, 0.05]}
          onClick={() => jumpToChapter(3)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#4A2F17" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" letterSpacing={0.1}>
            💼 CAREER →
          </Text>
        </group>

        {/* 3. PROJECTS */}
        <group
          position={[0.55, 2.6, 0.1]}
          onClick={() => jumpToChapter(4)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" letterSpacing={0.1}>
            &lt;/&gt; PROJECTS →
          </Text>
        </group>

        {/* 4. SKILLS */}
        <group
          position={[-0.55, 2.0, 0.05]}
          onClick={() => jumpToChapter(5)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#4A2F17" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" letterSpacing={0.1}>
            ← ⚙ SKILLS
          </Text>
        </group>

        {/* 5. FUTURE / SPACE */}
        <group
          position={[0.55, 1.4, 0.1]}
          onClick={() => jumpToChapter(7)}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          <mesh>
            <boxGeometry args={[1.75, 0.42, 0.08]} />
            <meshStandardMaterial color="#54361C" roughness={0.8} />
          </mesh>
          <Text position={[0, 0, 0.05]} fontSize={0.16} color="#FFF7ED" letterSpacing={0.1}>
            🚀 SPACE →
          </Text>
        </group>
      </group>

      {/* Floating Golden Morning Stardust */}
      <group ref={particlesRef}>
        {[...Array(35)].map((_, i) => (
          <mesh
            key={`morning-dust-${i}`}
            position={[
              (Math.sin(i * 1.5) * 16),
              0.8 + (i % 6) * 1.2,
              -5 - (i * 1.1)
            ]}
          >
            <sphereGeometry args={[0.045, 6, 6]} />
            <meshBasicMaterial color="#FDBA74" transparent opacity={0.65} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default IntroScene;
