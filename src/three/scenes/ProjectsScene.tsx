import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { projects } from '../../data/projects';

const projectColors = ['#3B82F6', '#06B6D4', '#F97316', '#F8FAFC', '#8B5CF6', '#10B981'];
const projectPositions: [number, number, number][] = [
  [-8, 2, -5],
  [8, 3, -10],
  [-6, 4, -16],
  [7, 2, -22],
  [-8, 3, -28],
  [6, 4, -34],
];

const ProjectsScene: React.FC = () => {
  const openProjectDetail = useJourneyStore(state => state.openProjectDetail);
  
  return (
    <group position={[0, 0, -160]}>
      {/* Section label */}
      <Text
        position={[0, 8, 0]}
        fontSize={1.5}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
        font={undefined}
      >
        PROJECTS
      </Text>

      {projects.map((project, i) => (
        <ProjectObject 
          key={project.id}
          id={project.id}
          title={project.title}
          position={projectPositions[i] || [0, 3, -(i * 6)]}
          color={projectColors[i % projectColors.length]}
          onClick={() => openProjectDetail(project.id)}
          geometryType={i % 3}
        />
      ))}
    </group>
  );
};

interface ProjectObjectProps {
  id: string;
  title: string;
  position: [number, number, number];
  color: string;
  onClick: () => void;
  geometryType: number;
}

const ProjectObject: React.FC<ProjectObjectProps> = ({ position, color, title, onClick, geometryType }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = React.useState(false);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.5;
      
      const targetScale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    }
  });

  const geometry = geometryType === 0 
    ? <octahedronGeometry args={[2, 0]} />
    : geometryType === 1
    ? <dodecahedronGeometry args={[2, 0]} />
    : <icosahedronGeometry args={[2, 0]} />;

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={position}>
        <mesh 
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
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
          {geometry}
          <meshStandardMaterial 
            color={color} 
            emissive={hovered ? color : '#000000'} 
            emissiveIntensity={hovered ? 0.8 : 0.1}
            wireframe={!hovered}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
        {hovered && (
          <Text
            position={[0, 3.5, 0]}
            fontSize={0.6}
            color="#F8FAFC"
            anchorX="center"
            anchorY="middle"
            maxWidth={8}
          >
            {title}
          </Text>
        )}
      </group>
    </Float>
  );
};

export default ProjectsScene;
