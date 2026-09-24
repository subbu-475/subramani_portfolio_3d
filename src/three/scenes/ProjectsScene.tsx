import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { projects } from '../../data/projects';

export const ProjectsScene: React.FC = () => {
  const openProjectDetail = useJourneyStore((state) => state.openProjectDetail);
  const signGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (signGlowRef.current) {
      signGlowRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
    }
  });

  return (
    <group position={[0, 0, -180]}>
      {/* Illuminated Tech Showroom Plaza Ground */}
      <mesh position={[0, 0.01, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 32]} />
        <meshStandardMaterial color="#0B132B" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Glowing Plaza Border Insets */}
      <mesh position={[0, 0.03, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[11, 11.2, 32]} />
        <meshBasicMaterial color="#00F0FF" />
      </mesh>

      {/* Main Glass Tech Pavilion Architecture (Matching Reference Panel 7) */}
      <group position={[0, 0, -22]}>
        {/* Modern Curved Roof Canopy */}
        <mesh position={[0, 7.5, 0]}>
          <boxGeometry args={[22, 1.2, 14]} />
          <meshStandardMaterial color="#1C2541" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Illuminated Sign: PROJECTS (Matching Reference Panel 7) */}
        <group position={[0, 8.8, 6.2]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[9, 1.8, 0.3]} />
            <meshStandardMaterial color="#0B132B" metalness={0.9} />
          </mesh>
          <Text
            position={[0, 0, 0.2]}
            fontSize={0.88}
            color="#00F0FF"
            letterSpacing={0.25}
            font={undefined}
          >
            PROJECTS
          </Text>
          <pointLight ref={signGlowRef} position={[0, 0, 1.5]} color="#00F0FF" intensity={2.2} distance={18} />
        </group>

        {/* Glass Curtain Walls */}
        <mesh position={[0, 3.8, 6.4]}>
          <planeGeometry args={[20, 6.5]} />
          <meshPhysicalMaterial
            color="#38BDF8"
            transparent
            opacity={0.35}
            roughness={0.1}
            transmission={0.6}
            thickness={0.5}
          />
        </mesh>
        {/* Support Architectural Pillars */}
        {[-9, -4.5, 4.5, 9].map((px, i) => (
          <mesh key={`p-pillar-${i}`} position={[px, 3.8, 6.8]}>
            <cylinderGeometry args={[0.2, 0.2, 7.2, 16]} />
            <meshStandardMaterial color="#3A506B" metalness={0.9} roughness={0.1} />
          </mesh>
        ))}

        {/* Interior Tech Showroom Warm Spotlights */}
        <pointLight position={[-5, 5, 0]} color="#38BDF8" intensity={2} distance={15} />
        <pointLight position={[5, 5, 0]} color="#F59E0B" intensity={2} distance={15} />
      </group>

      {/* 3D Interactive Project Hologram Display Pods on Plaza */}
      {projects.map((project, idx) => {
        const xOffset = idx % 2 === 0 ? -4.5 : 4.5;
        const zOffset = -5 - Math.floor(idx / 2) * 6;
        const color = ['#00F0FF', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'][idx % 6];

        return (
          <group
            key={project.id}
            position={[xOffset, 0, zOffset]}
            onClick={(e) => {
              e.stopPropagation();
              openProjectDetail(project.id);
            }}
            onPointerOver={() => (document.body.style.cursor = 'pointer')}
            onPointerOut={() => (document.body.style.cursor = 'auto')}
          >
            {/* Tech Pedestal Base */}
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[1.2, 1.4, 0.8, 16]} />
              <meshStandardMaterial color="#0B132B" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Glowing Base Ring */}
            <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.9, 1.15, 32]} />
              <meshBasicMaterial color={color} />
            </mesh>

            {/* Floating Interactive 3D Artifact */}
            <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
              <group position={[0, 2.0, 0]}>
                <mesh>
                  {idx % 3 === 0 ? (
                    <octahedronGeometry args={[0.75, 0]} />
                  ) : idx % 3 === 1 ? (
                    <dodecahedronGeometry args={[0.7, 0]} />
                  ) : (
                    <icosahedronGeometry args={[0.7, 0]} />
                  )}
                  <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.8}
                    wireframe={false}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
                <mesh scale={1.2}>
                  <icosahedronGeometry args={[0.7, 1]} />
                  <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
                </mesh>
              </group>
            </Float>

            {/* Project Floating Title Label */}
            <Text
              position={[0, 3.4, 0]}
              fontSize={0.28}
              color="#FFFFFF"
              maxWidth={3.5}
              textAlign="center"
              font={undefined}
            >
              {project.title}
            </Text>
            <Text
              position={[0, 3.0, 0]}
              fontSize={0.18}
              color={color}
              font={undefined}
              letterSpacing={0.08}
            >
              [ CLICK TO INSPECT ]
            </Text>
          </group>
        );
      })}
    </group>
  );
};

export default ProjectsScene;
