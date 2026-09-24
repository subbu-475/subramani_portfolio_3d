import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';

interface SkillHolo {
  name: string;
  category: string;
  color: string;
  orbitRadius: number;
  speed: number;
  initialAngle: number;
  size: number;
}

const SKILLS_HOLO: SkillHolo[] = [
  { name: 'Node.js', category: 'Backend', color: '#22C55E', orbitRadius: 5.5, speed: 0.35, initialAngle: 0, size: 0.75 },
  { name: 'MongoDB', category: 'Database', color: '#10B981', orbitRadius: 6.2, speed: 0.28, initialAngle: 1.2, size: 0.72 },
  { name: 'TypeScript', category: 'Frontend', color: '#3B82F6', orbitRadius: 5.8, speed: 0.32, initialAngle: 2.3, size: 0.74 },
  { name: 'JavaScript', category: 'Language', color: '#EAB308', orbitRadius: 6.8, speed: 0.25, initialAngle: 3.5, size: 0.7 },
  { name: 'Python', category: 'Backend', color: '#38BDF8', orbitRadius: 7.2, speed: 0.22, initialAngle: 4.4, size: 0.7 },
  { name: 'Docker', category: 'DevOps', color: '#06B6D4', orbitRadius: 7.8, speed: 0.2, initialAngle: 5.2, size: 0.68 },
  { name: 'Frappe / ERP', category: 'Enterprise', color: '#F97316', orbitRadius: 8.2, speed: 0.18, initialAngle: 0.6, size: 0.72 },
  { name: 'Flutter', category: 'Mobile', color: '#0284C7', orbitRadius: 8.5, speed: 0.16, initialAngle: 2.8, size: 0.68 },
];

export const SkillsScene: React.FC = () => {
  const openSkillDetail = useJourneyStore((state) => state.openSkillDetail);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const reactAtomRing1 = useRef<THREE.Group>(null);
  const reactAtomRing2 = useRef<THREE.Group>(null);
  const reactAtomRing3 = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.2;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.15;

    // React atomic orbital ring rotations
    if (reactAtomRing1.current) reactAtomRing1.current.rotation.y += delta * 1.2;
    if (reactAtomRing2.current) reactAtomRing2.current.rotation.x += delta * 1.0;
    if (reactAtomRing3.current) reactAtomRing3.current.rotation.z += delta * 1.1;
  });

  return (
    <group position={[0, 0, -225]}>
      {/* Sci-Fi Hologram Platform / Dais (Matching Reference Panel 8) */}
      <group position={[0, 0, -10]}>
        {/* Main Circular Platform Base */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[11, 12, 0.4, 48]} />
          <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Concentric Cybernetic Rings on Floor */}
        <mesh ref={ring1Ref} position={[0, 0.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[9.5, 10.2, 48]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.8} />
        </mesh>
        <mesh ref={ring2Ref} position={[0, 0.43, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.8, 7.3, 36]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.2, 3.6, 32]} />
          <meshBasicMaterial color="#00F0FF" transparent opacity={0.9} />
        </mesh>

        {/* Vertical Hologram Beacon Emitters around dais perimeter */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const px = Math.cos(angle) * 10;
          const pz = Math.sin(angle) * 10;
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
      </group>

      {/* Centerpiece: Massive Glowing React Atom Hologram (Matching Reference Panel 8) */}
      <group
        position={[0, 4.5, -10]}
        onClick={() => openSkillDetail('React.js')}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'auto')}
      >
        <Float speed={2} floatIntensity={0.6}>
          {/* React Core Sphere */}
          <mesh>
            <sphereGeometry args={[1.1, 32, 32]} />
            <meshStandardMaterial
              color="#00D8FF"
              emissive="#00D8FF"
              emissiveIntensity={1.5}
              roughness={0.2}
            />
          </mesh>
          <pointLight color="#00D8FF" intensity={3} distance={15} />

          {/* Atomic Orbital Ring 1 */}
          <group ref={reactAtomRing1} rotation={[Math.PI / 4, 0, 0]}>
            <mesh>
              <torusGeometry args={[2.2, 0.06, 16, 64]} />
              <meshBasicMaterial color="#00D8FF" />
            </mesh>
          </group>

          {/* Atomic Orbital Ring 2 */}
          <group ref={reactAtomRing2} rotation={[-Math.PI / 4, 0, 0]}>
            <mesh>
              <torusGeometry args={[2.2, 0.06, 16, 64]} />
              <meshBasicMaterial color="#00D8FF" />
            </mesh>
          </group>

          {/* Atomic Orbital Ring 3 */}
          <group ref={reactAtomRing3} rotation={[0, 0, Math.PI / 2]}>
            <mesh>
              <torusGeometry args={[2.2, 0.06, 16, 64]} />
              <meshBasicMaterial color="#00D8FF" />
            </mesh>
          </group>

          {/* React Label */}
          <Text
            position={[0, -1.8, 0]}
            fontSize={0.42}
            color="#FFFFFF"
            letterSpacing={0.12}
            font={undefined}
          >
            React
          </Text>
        </Float>
      </group>

      {/* Orbiting 3D Holographic Skill Spheres */}
      {SKILLS_HOLO.map((skill) => (
        <OrbitingSkillNode
          key={skill.name}
          skill={skill}
          onClick={() => openSkillDetail(skill.name)}
        />
      ))}
    </group>
  );
};

const OrbitingSkillNode: React.FC<{ skill: SkillHolo; onClick: () => void }> = ({
  skill,
  onClick,
}) => {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (nodeRef.current) {
      const angle = skill.initialAngle + state.clock.elapsedTime * skill.speed;
      const x = Math.cos(angle) * skill.orbitRadius;
      const z = -10 + Math.sin(angle) * skill.orbitRadius;
      const y = 4.2 + Math.sin(state.clock.elapsedTime * 1.5 + skill.initialAngle) * 0.6;
      nodeRef.current.position.set(x, y, z);
    }
  });

  return (
    <group
      ref={nodeRef}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = 'auto')}
    >
      <mesh>
        <sphereGeometry args={[skill.size, 24, 24]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>
      {/* Outer Hologram Wireframe Aura */}
      <mesh scale={1.3}>
        <icosahedronGeometry args={[skill.size, 1]} />
        <meshBasicMaterial color={skill.color} wireframe transparent opacity={0.4} />
      </mesh>
      {/* Skill Name */}
      <Text
        position={[0, skill.size + 0.45, 0]}
        fontSize={0.28}
        color="#FFFFFF"
        font={undefined}
        anchorX="center"
        anchorY="middle"
      >
        {skill.name}
      </Text>
    </group>
  );
};

export default SkillsScene;
