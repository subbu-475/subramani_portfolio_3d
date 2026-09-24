import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { allSkills } from '../../data/skills';

const categoryColors: Record<string, string> = {
  frontend: '#3B82F6',
  backend: '#06B6D4',
  database: '#10B981',
  devops: '#F97316',
  other: '#8B5CF6',
};

const SkillsScene: React.FC = () => {
  return (
    <group position={[0, 0, -200]}>
      {/* Section label */}
      <Text
        position={[0, 10, -10]}
        fontSize={1.5}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        TECHNOLOGIES
      </Text>

      {/* Central Core */}
      <mesh position={[0, 2, -10]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshStandardMaterial color="#F97316" emissive="#F97316" emissiveIntensity={0.5} wireframe />
      </mesh>
      
      {allSkills.slice(0, 20).map((skill, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 6 + (i % 3) * 4;
        const x = Math.cos(angle) * radius;
        const z = -10 + Math.sin(angle) * radius;
        const y = 1 + Math.sin(i * 0.7) * 3;
        return (
          <SkillNode
            key={skill.name}
            name={skill.name}
            position={[x, y, z]}
            color={categoryColors[skill.category] || '#F8FAFC'}
            size={0.6 + (skill.projectsUsedIn?.length || 0) * 0.15}
            speed={0.2 + (i % 5) * 0.1}
          />
        );
      })}
    </group>
  );
};

interface SkillNodeProps {
  name: string;
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}

const SkillNode: React.FC<SkillNodeProps> = ({ name, position, color, size, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const openSkillDetail = useJourneyStore(state => state.openSkillDetail);
  const [hovered, setHovered] = React.useState(false);
  const initialY = useRef(position[1]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY.current + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.5;
      meshRef.current.rotation.y += 0.005;
      
      const targetScale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <group>
      <mesh 
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          openSkillDetail(name);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'none';
        }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial 
          color={color} 
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.8 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />
        {hovered && (
          <Text
            position={[0, size + 0.8, 0]}
            fontSize={0.5}
            color="#F8FAFC"
            anchorX="center"
            anchorY="middle"
          >
            {name}
          </Text>
        )}
      </mesh>
    </group>
  );
};

export default SkillsScene;
