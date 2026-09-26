import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { projects } from '../../data/projects';

/**
 * CH 04 — PROJECTS: Tech Showroom Pavilion
 * Positioned along the RIGHT turn segment at WP9 (-8, 0, -220).
 * The pavilion is placed on the RIGHT side of the road (positive X),
 * facing -X towards the traveler walking along the road.
 */
export const ProjectsScene: React.FC = () => {
  const openProjectDetail = useJourneyStore((state) => state.openProjectDetail);
  const signGlowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (signGlowRef.current) {
      signGlowRef.current.intensity = 2.0 + Math.sin(state.clock.elapsedTime * 3) * 0.4;
    }
  });

  return (
    <group position={[-8, 0, -220]}>
      {/* ========================================================= */}
      {/* 3D TECH EXHIBITION PAVILION (RIGHT SIDE, FACING ROAD)     */}
      {/* ========================================================= */}
      <group position={[14, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Plaza Ground Plate */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[26, 30]} />
          <meshStandardMaterial color="#0B132B" roughness={0.4} metalness={0.6} />
        </mesh>
        {/* Glowing Plaza Border Insets */}
        <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[11, 11.2, 32]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Main Glass Tech Pavilion Canopy */}
        <group position={[0, 0, -10]}>
          {/* Curved Roof Canopy */}
          <mesh position={[0, 7.5, 0]}>
            <boxGeometry args={[22, 1.2, 14]} />
            <meshStandardMaterial color="#1C2541" metalness={0.8} roughness={0.2} />
          </mesh>

          {/* Illuminated Sign: PROJECTS */}
          <group position={[0, 8.8, 6.2]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[9, 1.8, 0.3]} />
              <meshStandardMaterial color="#0B132B" metalness={0.9} />
            </mesh>
            <Text
              position={[0, 0, 0.2]}
              fontSize={0.85}
              color="#00F0FF"
              letterSpacing={0.25}
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

        {/* 3D Interactive Project Hologram Display Pods */}
        {projects.map((project, idx) => {
          const xOffset = idx % 2 === 0 ? -4.5 : 4.5;
          const zOffset = 3 - Math.floor(idx / 2) * 5.5;
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
              {/* Pedestal Base */}
              <mesh position={[0, 0.4, 0]}>
                <cylinderGeometry args={[1.2, 1.4, 0.8, 16]} />
                <meshStandardMaterial color="#1E293B" metalness={0.8} />
              </mesh>
              {/* Glowing Pedestal Ring */}
              <mesh position={[0, 0.82, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.8, 1.15, 24]} />
                <meshBasicMaterial color={color} />
              </mesh>
              <pointLight position={[0, 1.2, 0]} color={color} intensity={1.5} distance={6} />

              {/* Floating Geometric Project Artifact */}
              <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
                <group position={[0, 1.8, 0]}>
                  {idx % 3 === 0 && (
                    <mesh>
                      <octahedronGeometry args={[0.65, 0]} />
                      <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                      />
                    </mesh>
                  )}
                  {idx % 3 === 1 && (
                    <mesh>
                      <dodecahedronGeometry args={[0.6, 0]} />
                      <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                      />
                    </mesh>
                  )}
                  {idx % 3 === 2 && (
                    <mesh>
                      <icosahedronGeometry args={[0.62, 0]} />
                      <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0.6}
                        roughness={0.2}
                        metalness={0.8}
                      />
                    </mesh>
                  )}

                  {/* Project Title Text */}
                  <Text
                    position={[0, 1.0, 0]}
                    fontSize={0.24}
                    color="#FFFFFF"
                    letterSpacing={0.06}
                  >
                    {project.title}
                  </Text>
                  {/* Category Subtext */}
                  <Text
                    position={[0, 0.72, 0]}
                    fontSize={0.17}
                    color={color}
                    letterSpacing={0.04}
                  >
                    {project.category.toUpperCase()}
                  </Text>
                </group>
              </Float>
            </group>
          );
        })}
      </group>
    </group>
  );
};

export default ProjectsScene;
