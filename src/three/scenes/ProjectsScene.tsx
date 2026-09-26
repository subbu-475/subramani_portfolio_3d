import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { projects, type Project } from '../../data/projects';

/**
 * Single Curated Physical Exhibit Display in the Technology Gallery
 */
const ExhibitDisplay: React.FC<{
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  position: [number, number, number];
}> = ({ project, index, isSelected, onSelect, position }) => {
  const [hovered, setHovered] = useState(false);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (spotlightRef.current) {
      const targetIntensity = isSelected ? 3.4 : hovered ? 1.6 : 0.6;
      spotlightRef.current.intensity = THREE.MathUtils.lerp(
        spotlightRef.current.intensity,
        targetIntensity,
        delta * 4.0
      );
    }
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const targetEmissive = isSelected ? 0.35 : hovered ? 0.2 : 0.08;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 4.0);
      }
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Dedicated Museum Gallery Ceiling Spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 5.8, 1.4]}
        color={isSelected ? '#FFFBEB' : '#E2E8F0'}
        intensity={isSelected ? 3.4 : 0.6}
        distance={9.5}
        angle={0.42}
        penumbra={0.7}
      />

      {/* ========================================================= */}
      {/* ARCHITECTURAL BASALT EXHIBIT PLINTH                       */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Recessed Warm Bronze Base Reveal */}
        <mesh position={[0, 0.06, 0]}>
          <boxGeometry args={[3.0, 0.12, 1.8]} />
          <meshStandardMaterial color="#574130" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Main Basalt Stone Plinth Block */}
        <mesh position={[0, 0.48, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.76, 2.0]} />
          <meshStandardMaterial
            color={isSelected ? '#1E232E' : hovered ? '#1A1E26' : '#14171E'}
            roughness={0.85}
            metalness={0.15}
          />
        </mesh>

        {/* Subtle Bronze Top Perimeter Inlay */}
        <mesh position={[0, 0.865, 0]}>
          <boxGeometry args={[3.22, 0.02, 2.02]} />
          <meshStandardMaterial
            color={isSelected ? '#F59E0B' : hovered ? '#D97706' : '#333842'}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>

        {/* Museum Exhibit Placard on Front Face */}
        <group position={[0, 0.48, 1.02]}>
          {/* Index Number */}
          <Text
            position={[-1.2, 0.16, 0]}
            fontSize={0.16}
            color={isSelected ? '#FBBF24' : '#94A3B8'}
            letterSpacing={0.1}
            anchorX="left"
          >
            {String(index + 1).padStart(2, '0')}
          </Text>

          {/* Project Title */}
          <Text
            position={[-0.8, 0.16, 0]}
            fontSize={0.14}
            color="#F8FAFC"
            letterSpacing={0.04}
            anchorX="left"
            maxWidth={2.0}
          >
            {project.title.toUpperCase()}
          </Text>

          {/* Category Subtitle */}
          <Text
            position={[-0.8, -0.10, 0]}
            fontSize={0.10}
            color={isSelected ? '#FBBF24' : '#64748B'}
            letterSpacing={0.08}
            anchorX="left"
          >
            {project.category.toUpperCase()} • EXHIBIT
          </Text>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 3D PHYSICAL EXHIBIT HARDWARE / DISPLAY                    */}
      {/* ========================================================= */}
      <group position={[0, 0.88, 0]}>
        {/* Exhibit 0: SSS Smart Tech Platform — Curved Ultra-Thin OLED Display */}
        {index === 0 && (
          <group position={[0, 0, 0]}>
            {/* Display Stand Bracket */}
            <mesh position={[0, 0.4, -0.2]}>
              <boxGeometry args={[0.3, 0.8, 0.15]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.05, 0]}>
              <boxGeometry args={[1.2, 0.08, 0.8]} />
              <meshStandardMaterial color="#1E232E" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* OLED Display Frame */}
            <mesh position={[0, 1.15, 0]}>
              <boxGeometry args={[2.7, 1.6, 0.06]} />
              <meshStandardMaterial color="#0A0C10" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Illuminated UI Screen */}
            <mesh ref={screenRef} position={[0, 1.15, 0.035]}>
              <planeGeometry args={[2.58, 1.48]} />
              <meshStandardMaterial
                color="#0F172A"
                emissive="#0F243A"
                emissiveIntensity={0.2}
                roughness={0.3}
              />
            </mesh>
            {/* Simulated UI Content Blocks */}
            <group position={[0, 1.15, 0.04]}>
              {/* Header Bar */}
              <mesh position={[0, 0.58, 0]}>
                <planeGeometry args={[2.4, 0.12]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
              {/* Logo Pill */}
              <mesh position={[-0.95, 0.58, 0.005]}>
                <planeGeometry args={[0.32, 0.06]} />
                <meshBasicMaterial color="#38BDF8" />
              </mesh>
              {/* Hero Banner Card */}
              <mesh position={[0, 0.22, 0]}>
                <planeGeometry args={[2.4, 0.46]} />
                <meshBasicMaterial color="#142033" />
              </mesh>
              {/* Service Cards Grid */}
              {[-0.8, 0, 0.8].map((cx, i) => (
                <mesh key={`c-serv-${i}`} position={[cx, -0.32, 0]}>
                  <planeGeometry args={[0.7, 0.42]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
              ))}
            </group>
          </group>
        )}

        {/* Exhibit 1: SSS SmartHub Portal — Angled Dashboard Touch Kiosk */}
        {index === 1 && (
          <group position={[0, 0, 0]}>
            {/* Angled Column Pedestal */}
            <mesh position={[0, 0.45, -0.1]} rotation={[0.2, 0, 0]}>
              <cylinderGeometry args={[0.25, 0.35, 1.0, 16]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Angled Touch Screen Housing */}
            <group position={[0, 0.95, 0]} rotation={[-0.32, 0, 0]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[2.3, 1.5, 0.08]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} roughness={0.2} />
              </mesh>
              <mesh ref={screenRef} position={[0, 0, 0.045]}>
                <planeGeometry args={[2.2, 1.38]} />
                <meshStandardMaterial
                  color="#0F172A"
                  emissive="#122538"
                  emissiveIntensity={0.25}
                  roughness={0.3}
                />
              </mesh>
              {/* Dashboard Layout: Metric Tiles & Razorpay Status Bar */}
              <group position={[0, 0, 0.05]}>
                <mesh position={[-0.55, 0.35, 0]}>
                  <planeGeometry args={[0.95, 0.4]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
                <mesh position={[0.55, 0.35, 0]}>
                  <planeGeometry args={[0.95, 0.4]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
                {/* Analytics Chart Strip */}
                <mesh position={[0, -0.22, 0]}>
                  <planeGeometry args={[2.05, 0.55]} />
                  <meshBasicMaterial color="#172554" />
                </mesh>
                {/* Razorpay Badge */}
                <mesh position={[0.7, -0.42, 0.005]}>
                  <planeGeometry args={[0.45, 0.1]} />
                  <meshBasicMaterial color="#0284C7" />
                </mesh>
              </group>
            </group>
          </group>
        )}

        {/* Exhibit 2: Frappe ERP Custom App — Enterprise Workstation Display */}
        {index === 2 && (
          <group position={[0, 0, 0]}>
            {/* Dual Monitor Stand */}
            <mesh position={[0, 0.4, -0.3]}>
              <cylinderGeometry args={[0.1, 0.14, 0.8, 12]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} />
            </mesh>
            <mesh position={[0, 0.75, -0.25]}>
              <boxGeometry args={[1.8, 0.06, 0.1]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} />
            </mesh>
            {/* Monitor 1: ERPNext Schema (Left) */}
            <group position={[-0.78, 1.05, -0.1]} rotation={[0, 0.18, 0]}>
              <mesh>
                <boxGeometry args={[1.35, 0.95, 0.05]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={screenRef} position={[0, 0, 0.028]}>
                <planeGeometry args={[1.28, 0.88]} />
                <meshStandardMaterial
                  color="#111827"
                  emissive="#1F2937"
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* DocType Schema Rows */}
              {[-0.25, -0.05, 0.15].map((ry, i) => (
                <mesh key={`doc-row-${i}`} position={[0, ry, 0.032]}>
                  <planeGeometry args={[1.1, 0.12]} />
                  <meshBasicMaterial color="#374151" />
                </mesh>
              ))}
            </group>
            {/* Monitor 2: Python / REST Terminal (Right) */}
            <group position={[0.78, 1.05, -0.1]} rotation={[0, -0.18, 0]}>
              <mesh>
                <boxGeometry args={[1.35, 0.95, 0.05]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0.028]}>
                <planeGeometry args={[1.28, 0.88]} />
                <meshStandardMaterial
                  color="#090D16"
                  emissive="#0F172A"
                  emissiveIntensity={0.3}
                />
              </mesh>
              {/* Code lines */}
              {[-0.28, -0.15, -0.02, 0.11, 0.24].map((cy, i) => (
                <mesh key={`code-line-${i}`} position={[-0.2 + (i % 2) * 0.1, cy, 0.032]}>
                  <planeGeometry args={[0.7 + (i % 3) * 0.2, 0.05]} />
                  <meshBasicMaterial color={i === 0 ? '#F59E0B' : '#38BDF8'} />
                </mesh>
              ))}
            </group>
          </group>
        )}

        {/* Exhibit 3: Freelance Booking App — Mobile Device Exhibition Pedestal */}
        {index === 3 && (
          <group position={[0, 0, 0]}>
            {/* Slender Architectural Bronze Pedestal */}
            <mesh position={[0, 0.45, 0]}>
              <cylinderGeometry args={[0.08, 0.14, 0.9, 12]} />
              <meshStandardMaterial color="#785135" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Angled Phone Cradle */}
            <group position={[0, 1.05, 0]} rotation={[-0.2, 0, 0]}>
              {/* Precision Smartphone Chassis */}
              <mesh>
                <boxGeometry args={[0.9, 1.8, 0.07]} />
                <meshStandardMaterial color="#1E232E" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Phone Screen Display */}
              <mesh ref={screenRef} position={[0, 0, 0.038]}>
                <planeGeometry args={[0.82, 1.7]} />
                <meshStandardMaterial
                  color="#0F172A"
                  emissive="#0369A1"
                  emissiveIntensity={0.25}
                  roughness={0.2}
                />
              </mesh>
              {/* Mobile Booking App UI mock */}
              <group position={[0, 0, 0.042]}>
                {/* Header notch */}
                <mesh position={[0, 0.76, 0]}>
                  <planeGeometry args={[0.24, 0.04]} />
                  <meshBasicMaterial color="#0A0C10" />
                </mesh>
                {/* Hero Booking Card */}
                <mesh position={[0, 0.42, 0]}>
                  <planeGeometry args={[0.72, 0.46]} />
                  <meshBasicMaterial color="#0284C7" />
                </mesh>
                {/* Calendar / Slots */}
                {[-0.05, -0.32, -0.58].map((sy, i) => (
                  <mesh key={`slot-${i}`} position={[0, sy, 0]}>
                    <planeGeometry args={[0.72, 0.2]} />
                    <meshBasicMaterial color="#1E293B" />
                  </mesh>
                ))}
              </group>
            </group>
          </group>
        )}

        {/* Exhibit 4: E-Commerce Platform — Interactive Storefront Tablet Kiosk */}
        {index === 4 && (
          <group position={[0, 0, 0]}>
            {/* Kiosk Spine */}
            <mesh position={[0, 0.45, -0.05]}>
              <boxGeometry args={[0.25, 0.9, 0.15]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} />
            </mesh>
            {/* Framed Tablet */}
            <group position={[0, 1.0, 0]} rotation={[-0.26, 0, 0]}>
              <mesh>
                <boxGeometry args={[2.2, 1.4, 0.06]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={screenRef} position={[0, 0, 0.034]}>
                <planeGeometry args={[2.1, 1.3]} />
                <meshStandardMaterial
                  color="#0F172A"
                  emissive="#1E293B"
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* E-Commerce Product Grid */}
              <group position={[0, 0, 0.038]}>
                {/* Navbar with Cart Badge */}
                <mesh position={[0, 0.52, 0]}>
                  <planeGeometry args={[2.0, 0.1]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
                <mesh position={[0.82, 0.52, 0.005]}>
                  <circleGeometry args={[0.045, 16]} />
                  <meshBasicMaterial color="#10B981" />
                </mesh>
                {/* 4 Product Cards */}
                {[-0.52, 0.52].map((px) =>
                  [0.18, -0.28].map((py, j) => (
                    <mesh key={`pcard-${px}-${j}`} position={[px, py, 0]}>
                      <planeGeometry args={[0.9, 0.4]} />
                      <meshBasicMaterial color="#1F2937" />
                    </mesh>
                  ))
                )}
              </group>
            </group>
          </group>
        )}

        {/* Exhibit 5: Task Management App — Kanban Display Station */}
        {index === 5 && (
          <group position={[0, 0, 0]}>
            {/* Display Stand */}
            <mesh position={[0, 0.45, -0.15]}>
              <cylinderGeometry args={[0.12, 0.16, 0.9, 12]} />
              <meshStandardMaterial color="#2B303C" metalness={0.8} />
            </mesh>
            {/* Widescreen Monitor */}
            <group position={[0, 1.1, 0]}>
              <mesh>
                <boxGeometry args={[2.6, 1.5, 0.06]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={screenRef} position={[0, 0, 0.034]}>
                <planeGeometry args={[2.48, 1.38]} />
                <meshStandardMaterial
                  color="#0B132B"
                  emissive="#141E33"
                  emissiveIntensity={0.22}
                />
              </mesh>
              {/* Kanban 3-Column Board */}
              <group position={[0, 0, 0.038]}>
                {/* Column Headers: Todo, Progress, Done */}
                {[-0.78, 0, 0.78].map((kx, ci) => (
                  <group key={`kcol-${ci}`} position={[kx, 0, 0]}>
                    <mesh position={[0, 0.52, 0]}>
                      <planeGeometry args={[0.68, 0.12]} />
                      <meshBasicMaterial color="#1E293B" />
                    </mesh>
                    {/* Task cards */}
                    {[-0.28, 0.0, 0.28].map((ty, ti) => (
                      <mesh key={`tcard-${ci}-${ti}`} position={[0, ty, 0]}>
                        <planeGeometry args={[0.68, 0.22]} />
                        <meshBasicMaterial color="#1F2937" />
                      </mesh>
                    ))}
                  </group>
                ))}
              </group>
            </group>
          </group>
        )}
      </group>
    </group>
  );
};

/**
 * Minimalist Indoor Gallery Botanical Planter
 */
const GalleryPlanter: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Matte Ceramic Pot */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.42, 0.35, 1.1, 16]} />
        <meshStandardMaterial color="#D6CEBF" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 1.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.39, 16]} />
        <meshStandardMaterial color="#1F1B18" roughness={0.95} />
      </mesh>
      {/* Stylized Architectural Snake Plant Foliage */}
      {[-0.15, 0, 0.15].map((ox, i) =>
        [-0.12, 0.12].map((oz, j) => (
          <mesh
            key={`leaf-${i}-${j}`}
            position={[ox, 1.7 + (i % 2) * 0.2, oz]}
            rotation={[0, (i * 2 + j) * 0.6, (ox * 0.3)]}
          >
            <planeGeometry args={[0.22, 1.3]} />
            <meshStandardMaterial
              color="#1B382B"
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))
      )}
    </group>
  );
};

/**
 * CH 04 / CHAPTER 05 — PROJECTS: Modern Technology Exhibition Gallery
 * 
 * Elegant museum gallery space featuring:
 * - Polished dark concrete stone floor with bronze inlay
 * - Minimalist architectural back wall with warm baseboard wash
 * - 6 physical 3D exhibit pedestals with tailored device models
 * - Ceiling gallery track spotlights dynamically accenting the selected exhibit
 * - Minimalist ceramic planters and architectural glass partition fins
 */
export const ProjectsScene: React.FC = () => {
  const selectedProjectIndex = useJourneyStore((state) => state.selectedProjectIndex);
  const setSelectedProjectIndex = useJourneyStore((state) => state.setSelectedProjectIndex);

  // Gallery Exhibit Coordinates along curved promenade
  const exhibitPositions: [number, number, number][] = [
    [-12.5, 0, 0.0],
    [-7.5, 0, -1.4],
    [-2.5, 0, -2.2],
    [2.5, 0, -2.2],
    [7.5, 0, -1.4],
    [12.5, 0, 0.0],
  ];

  return (
    <group position={[-8, 0, -220]}>
      {/* Gallery Hall Pavilion (Right side of road, facing -X towards traveler) */}
      <group position={[14, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* ========================================================= */}
        {/* ARCHITECTURAL INTERIOR GALLERY ENCLOSURE                  */}
        {/* ========================================================= */}

        {/* Polished Dark Concrete / Basalt Stone Floor */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[36, 26]} />
          <meshStandardMaterial
            color="#12151C"
            roughness={0.45}
            metalness={0.15}
          />
        </mesh>

        {/* Subtle Bronze Inlay Grid Accent Lines */}
        {[-10, -5, 0, 5, 10].map((lx, i) => (
          <mesh key={`grid-x-${i}`} position={[lx, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.04, 25.8]} />
            <meshStandardMaterial color="#44352A" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}
        {[-8, -2, 4, 10].map((lz, j) => (
          <mesh key={`grid-z-${j}`} position={[0, 0.025, lz]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[35.8, 0.04]} />
            <meshStandardMaterial color="#44352A" metalness={0.7} roughness={0.3} />
          </mesh>
        ))}

        {/* Minimalist Matte Exhibition Back Wall */}
        <mesh position={[0, 4.5, -6.5]}>
          <boxGeometry args={[36, 9.0, 0.4]} />
          <meshStandardMaterial color="#161920" roughness={0.9} />
        </mesh>

        {/* Architectural Bronze Baseboard Line */}
        <mesh position={[0, 0.15, -6.28]}>
          <boxGeometry args={[36, 0.3, 0.04]} />
          <meshStandardMaterial color="#574130" metalness={0.8} />
        </mesh>

        {/* Warm Ambient Gallery Baseboard Cove Wash */}
        <pointLight position={[0, 0.4, -5.8]} color="#FED7AA" intensity={1.5} distance={20} />

        {/* Gallery Ceiling with Recessed Coffer Beam Fixtures */}
        <mesh position={[0, 8.8, 0]}>
          <boxGeometry args={[36, 0.4, 26]} />
          <meshStandardMaterial color="#0F1218" roughness={0.85} />
        </mesh>
        {/* Recessed Track Light Beams */}
        {[-6, 6].map((tz, i) => (
          <group key={`track-${i}`} position={[0, 8.55, tz]}>
            <mesh>
              <boxGeometry args={[34, 0.12, 0.2]} />
              <meshStandardMaterial color="#2B303C" metalness={0.9} />
            </mesh>
          </group>
        ))}

        {/* Slender Structural Architectural Columns */}
        {[-16.5, -5.5, 5.5, 16.5].map((cx, i) => (
          <mesh key={`col-${i}`} position={[cx, 4.5, 11]}>
            <boxGeometry args={[0.35, 9.0, 0.35]} />
            <meshStandardMaterial color="#1A1E26" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Architectural Tempered Glass Divider Panels */}
        {[-5.0, 5.0].map((gx, i) => (
          <mesh key={`glass-div-${i}`} position={[gx, 3.2, -3.0]}>
            <boxGeometry args={[0.06, 5.5, 5.0]} />
            <meshPhysicalMaterial
              color="#CBD5E1"
              transparent
              opacity={0.3}
              roughness={0.1}
              transmission={0.85}
              thickness={0.4}
            />
          </mesh>
        ))}

        {/* Minimalist Gallery Botanicals */}
        <GalleryPlanter position={[-15.5, 0, 7.5]} />
        <GalleryPlanter position={[15.5, 0, 7.5]} />
        <GalleryPlanter position={[-15.5, 0, -4.5]} />
        <GalleryPlanter position={[15.5, 0, -4.5]} />

        {/* ========================================================= */}
        {/* 6 CURATED 3D EXHIBIT PLATFORMS                            */}
        {/* ========================================================= */}
        {projects.map((project, idx) => (
          <ExhibitDisplay
            key={project.id}
            project={project}
            index={idx}
            isSelected={idx === selectedProjectIndex}
            onSelect={() => setSelectedProjectIndex(idx)}
            position={exhibitPositions[idx]}
          />
        ))}

        {/* Gallery Entrance Paved Walkway Link to Main Road */}
        <mesh position={[0, 0.015, 14]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 8]} />
          <meshStandardMaterial color="#1E232E" roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
};

export default ProjectsScene;
