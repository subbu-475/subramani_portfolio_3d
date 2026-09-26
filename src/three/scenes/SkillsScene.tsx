import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

interface SkillItem {
  name: string;
  category: string;
  color: string;
  logo: string;
  orbitRadius: number;
  speed: number;
  initialAngle: number;
}

const SKILLS_LIST: SkillItem[] = [
  { name: 'React.js', category: 'Frontend', color: '#61DAFB', logo: '/logos/react.svg', orbitRadius: 4.8, speed: 0.35, initialAngle: 0 },
  { name: 'TypeScript', category: 'Language', color: '#3178C6', logo: '/logos/typescript.svg', orbitRadius: 5.6, speed: 0.30, initialAngle: 0.8 },
  { name: 'Node.js', category: 'Backend', color: '#539E43', logo: '/logos/nodejs.svg', orbitRadius: 6.4, speed: 0.26, initialAngle: 1.6 },
  { name: 'Python', category: 'Backend', color: '#387EB8', logo: '/logos/python.svg', orbitRadius: 7.2, speed: 0.22, initialAngle: 2.4 },
  { name: 'MongoDB', category: 'Database', color: '#13AA52', logo: '/logos/mongodb.svg', orbitRadius: 8.0, speed: 0.20, initialAngle: 3.2 },
  { name: 'Docker', category: 'DevOps', color: '#2496ED', logo: '/logos/docker.svg', orbitRadius: 8.8, speed: 0.18, initialAngle: 4.0 },
  { name: 'Flutter', category: 'Mobile', color: '#02569B', logo: '/logos/flutter.svg', orbitRadius: 9.5, speed: 0.16, initialAngle: 4.8 },
  { name: 'JavaScript', category: 'Language', color: '#F7DF1E', logo: '/logos/javascript.svg', orbitRadius: 10.2, speed: 0.14, initialAngle: 5.6 },
];

/**
 * Single textured skill medallion featuring real SVG image of the tech stack
 */
const SkillMedallion: React.FC<{
  skill: SkillItem;
  onClick: () => void;
}> = ({ skill, onClick }) => {
  const meshRef = useRef<THREE.Group>(null);
  const texture = useTexture(skill.logo);

  useFrame((state) => {
    if (meshRef.current) {
      const angle = skill.initialAngle + state.clock.elapsedTime * skill.speed;
      const x = Math.cos(angle) * skill.orbitRadius;
      const z = Math.sin(angle) * skill.orbitRadius;
      const y = 3.5 + Math.sin(state.clock.elapsedTime * 1.5 + skill.initialAngle) * 0.4;
      meshRef.current.position.set(x, y, z);
      // Billboard facing camera/road
      meshRef.current.rotation.y = -angle + Math.PI / 2;
    }
  });

  return (
    <group
      ref={meshRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
        {/* Glow Halo */}
        <mesh position={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.9, 0.9, 0.08, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={0.7}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Real Logo Face Front */}
        <mesh position={[0, 0, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.08, 32]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Real Logo Face Back */}
        <mesh position={[0, 0, -0.08]} rotation={[-Math.PI / 2, Math.PI, 0]}>
          <cylinderGeometry args={[0.78, 0.78, 0.08, 32]} />
          <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Outer Cyan Ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.95, 0.04, 8, 32]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Skill Name Floating Tag */}
        <Text
          position={[0, 1.25, 0]}
          fontSize={0.28}
          color="#FFFFFF"
          letterSpacing={0.06}
        >
          {skill.name}
        </Text>
        <Text
          position={[0, 0.98, 0]}
          fontSize={0.18}
          color={skill.color}
          letterSpacing={0.04}
        >
          {skill.category.toUpperCase()}
        </Text>
      </Float>
    </group>
  );
};

/**
 * CH 05 — TECHNOLOGY GALAXY: Holographic Arena with Real Tech Stack Logos
 * Positioned along the LEFT turn segment at WP11 (-42, 0.2, -265).
 * The holographic dais is on the LEFT side of the road (negative X),
 * facing +X towards the traveler walking along the path.
 */
export const SkillsScene: React.FC = () => {
  const openSkillDetail = useJourneyStore((state) => state.openSkillDetail);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const reactAtomRing1 = useRef<THREE.Group>(null);
  const reactAtomRing2 = useRef<THREE.Group>(null);
  const reactAtomRing3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.15;

    // React atomic orbital ring rotations
    if (reactAtomRing1.current) reactAtomRing1.current.rotation.y += delta * 1.2;
    if (reactAtomRing2.current) reactAtomRing2.current.rotation.x += delta * 1.0;
    if (reactAtomRing3.current) reactAtomRing3.current.rotation.z += delta * 1.1;
  });

  return (
    <group position={[-42, 0.2, -265]}>
      {/* ========================================================= */}
      {/* 3D HOLOGRAPHIC SKILLS ARENA (LEFT SIDE, FACING ROAD)      */}
      {/* ========================================================= */}
      <group position={[-18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Main Circular Platform Base */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[12, 13, 0.4, 48]} />
          <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Concentric Cybernetic Rings on Floor */}
        <mesh ref={ring1Ref} position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[10.5, 11.2, 48]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[7.8, 8.3, 36]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[4.2, 4.6, 32]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.9} />
        </mesh>

        {/* Vertical Hologram Beacon Emitters around dais perimeter */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const px = Math.cos(angle) * 11;
          const pz = Math.sin(angle) * 11;
          return (
            <group key={`emitter-${i}`} position={[px, 0.4, pz]}>
              <mesh position={[0, 0.3, 0]}>
                <cylinderGeometry args={[0.15, 0.22, 0.6, 12]} />
                <meshStandardMaterial color="#1E293B" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0.62, 0]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshBasicMaterial color="#00F0FF" />
              </mesh>
              {/* Vertical light ray */}
              <mesh position={[0, 2.5, 0]}>
                <cylinderGeometry args={[0.02, 0.05, 4.5, 8]} />
                <meshBasicMaterial color="#00F0FF" transparent opacity={0.25} />
              </mesh>
            </group>
          );
        })}

        {/* Centerpiece: Glowing React Atom Hologram */}
        <group
          position={[0, 4.0, 0]}
          onClick={() => openSkillDetail('React.js')}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'auto')}
        >
          {/* Central Nucleus */}
          <mesh>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
              color="#00F0FF"
              emissive="#00F0FF"
              emissiveIntensity={1.5}
              roughness={0.1}
            />
          </mesh>
          <pointLight position={[0, 0, 0]} color="#00F0FF" intensity={3.5} distance={15} />

          {/* Three Orbital Rings of the React Logo */}
          <group ref={reactAtomRing1} rotation={[0.6, 0, 0]}>
            <mesh>
              <torusGeometry args={[3.2, 0.08, 16, 64]} />
              <meshBasicMaterial color="#00F0FF" />
            </mesh>
          </group>
          <group ref={reactAtomRing2} rotation={[-0.6, 0.8, 0]}>
            <mesh>
              <torusGeometry args={[3.2, 0.08, 16, 64]} />
              <meshBasicMaterial color="#38BDF8" />
            </mesh>
          </group>
          <group ref={reactAtomRing3} rotation={[0, 0.9, 0.7]}>
            <mesh>
              <torusGeometry args={[3.2, 0.08, 16, 64]} />
              <meshBasicMaterial color="#818CF8" />
            </mesh>
          </group>
        </group>

        {/* Orbiting Real Tech Logo Medallions */}
        <Suspense fallback={null}>
          {SKILLS_LIST.map((skill) => (
            <SkillMedallion
              key={skill.name}
              skill={skill}
              onClick={() => openSkillDetail(skill.name)}
            />
          ))}
        </Suspense>
      </group>
    </group>
  );
};

export default SkillsScene;
