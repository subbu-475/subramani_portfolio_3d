import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import { skillCategories, type Skill } from '../../data/skills';

/**
 * Single Physical Technology Lab Station in Chapter 06
 */
const LabStation: React.FC<{
  categoryIndex: number;
  title: string;
  subtitle: string;
  skills: Skill[];
  isSelected: boolean;
  onSelect: () => void;
  onSkillClick: (skillName: string) => void;
  position: [number, number, number];
}> = ({
  categoryIndex,
  title,
  subtitle,
  skills,
  isSelected,
  onSelect,
  onSkillClick,
  position,
}) => {
  const [hovered, setHovered] = useState(false);
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const primaryScreenRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.PointLight>(null);

  useFrame((state, delta) => {
    if (spotlightRef.current) {
      const targetIntensity = isSelected ? 3.4 : hovered ? 1.8 : 0.6;
      spotlightRef.current.intensity = THREE.MathUtils.lerp(
        spotlightRef.current.intensity,
        targetIntensity,
        delta * 4.0
      );
    }
    if (primaryScreenRef.current) {
      const mat = primaryScreenRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        const targetEmissive = isSelected ? 0.35 : hovered ? 0.2 : 0.08;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 4.0);
      }
    }
    if (pulseRef.current) {
      const t = state.clock.elapsedTime;
      pulseRef.current.intensity = isSelected
        ? 1.8 + Math.sin(t * 3.0) * 0.4
        : 0.4;
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
      {/* Ceiling Architectural Spotlight above Station */}
      <spotLight
        ref={spotlightRef}
        position={[0, 6.2, 1.6]}
        color={isSelected ? '#FFFBEB' : '#E2E8F0'}
        intensity={isSelected ? 3.4 : 0.6}
        distance={10.5}
        angle={0.42}
        penumbra={0.7}
      />

      {/* ========================================================= */}
      {/* SOLID ARCHITECTURAL CONSOLE BASE                          */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Recessed Dark Bronze Reveal */}
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[3.0, 0.1, 1.7]} />
          <meshStandardMaterial color="#4A3B2C" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Main Dark Slate Console Plinth */}
        <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.72, 1.9]} />
          <meshStandardMaterial
            color={isSelected ? '#1A202C' : hovered ? '#171B24' : '#12151D'}
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>

        {/* Top Trim Accent Inlay */}
        <mesh position={[0, 0.815, 0]}>
          <boxGeometry args={[3.22, 0.02, 1.92]} />
          <meshStandardMaterial
            color={isSelected ? '#38BDF8' : hovered ? '#0284C7' : '#2A303C'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Station Front Placard */}
        <group position={[0, 0.45, 0.97]}>
          <Text
            position={[-1.2, 0.14, 0]}
            fontSize={0.16}
            color={isSelected ? '#38BDF8' : '#94A3B8'}
            letterSpacing={0.1}
            anchorX="left"
          >
            {`0${categoryIndex + 1}`}
          </Text>
          <Text
            position={[-0.8, 0.14, 0]}
            fontSize={0.15}
            color="#F8FAFC"
            letterSpacing={0.06}
            anchorX="left"
            maxWidth={2.0}
          >
            {title.toUpperCase()}
          </Text>
          <Text
            position={[-0.8, -0.10, 0]}
            fontSize={0.10}
            color={isSelected ? '#38BDF8' : '#64748B'}
            letterSpacing={0.08}
            anchorX="left"
          >
            {subtitle.toUpperCase()}
          </Text>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 3D PHYSICAL LABORATORY WORKSTATION / HARDWARE             */}
      {/* ========================================================= */}
      <group position={[0, 0.82, 0]}>
        {/* ========================================================= */}
        {/* 1. FRONTEND WORKSTATION: Curved Panoramic Display         */}
        {/* ========================================================= */}
        {categoryIndex === 0 && (
          <group position={[0, 0, 0]}>
            {/* Monitor Mount Bracket */}
            <mesh position={[0, 0.35, -0.2]}>
              <boxGeometry args={[0.3, 0.7, 0.15]} />
              <meshStandardMaterial color="#2B303C" metalness={0.9} />
            </mesh>
            {/* Curved Primary Panoramic Glass Monitor */}
            <mesh position={[0, 1.15, 0]}>
              <boxGeometry args={[2.8, 1.6, 0.06]} />
              <meshStandardMaterial color="#0A0C10" metalness={0.9} roughness={0.2} />
            </mesh>
            <mesh ref={primaryScreenRef} position={[0, 1.15, 0.035]}>
              <planeGeometry args={[2.68, 1.48]} />
              <meshStandardMaterial
                color="#0F172A"
                emissive="#0284C7"
                emissiveIntensity={0.2}
                roughness={0.2}
              />
            </mesh>
            {/* UI Component Layout Lines */}
            <group position={[0, 1.15, 0.04]}>
              <mesh position={[0, 0.58, 0]}>
                <planeGeometry args={[2.5, 0.1]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
              <mesh position={[-0.7, 0.12, 0]}>
                <planeGeometry args={[1.0, 0.68]} />
                <meshBasicMaterial color="#142033" />
              </mesh>
              <mesh position={[0.6, 0.12, 0]}>
                <planeGeometry args={[1.2, 0.68]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
              {/* Active React / TS Code Highlight Pill */}
              <mesh position={[-0.8, -0.42, 0]}>
                <planeGeometry args={[0.75, 0.22]} />
                <meshBasicMaterial color="#0284C7" />
              </mesh>
            </group>
            {/* Articulated Portrait Tablet on Right Arm */}
            <group position={[1.65, 0.85, 0.1]} rotation={[0, -0.3, 0]}>
              <mesh>
                <boxGeometry args={[0.65, 1.1, 0.04]} />
                <meshStandardMaterial color="#1E232E" metalness={0.8} />
              </mesh>
              <mesh position={[0, 0, 0.024]}>
                <planeGeometry args={[0.58, 1.02]} />
                <meshStandardMaterial color="#090D16" emissive="#38BDF8" emissiveIntensity={0.15} />
              </mesh>
            </group>
          </group>
        )}

        {/* ========================================================= */}
        {/* 2. BACKEND WORKSTATION: Dual Terminal & Telemetry Rack   */}
        {/* ========================================================= */}
        {categoryIndex === 1 && (
          <group position={[0, 0, 0]}>
            {/* Server Rack Tower (Behind Console) */}
            <group position={[0, 1.25, -0.6]}>
              <mesh>
                <boxGeometry args={[1.3, 2.5, 0.8]} />
                <meshStandardMaterial color="#0B0E14" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* Server Blade Slots & Status LEDs */}
              {[-0.8, -0.4, 0, 0.4, 0.8].map((sy, i) => (
                <group key={`blade-${i}`} position={[0, sy, 0.41]}>
                  <mesh>
                    <planeGeometry args={[1.15, 0.26]} />
                    <meshBasicMaterial color="#1E232E" />
                  </mesh>
                  <mesh position={[-0.45, 0, 0.005]}>
                    <circleGeometry args={[0.025, 8]} />
                    <meshBasicMaterial color={i % 2 === 0 ? '#10B981' : '#38BDF8'} />
                  </mesh>
                </group>
              ))}
            </group>

            {/* Dual Terminal Monitors */}
            {/* Left Screen: Python & Frappe Logic */}
            <group position={[-0.78, 1.0, -0.05]} rotation={[0, 0.16, 0]}>
              <mesh>
                <boxGeometry args={[1.35, 0.95, 0.05]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={primaryScreenRef} position={[0, 0, 0.028]}>
                <planeGeometry args={[1.28, 0.88]} />
                <meshStandardMaterial
                  color="#0F172A"
                  emissive="#0284C7"
                  emissiveIntensity={0.2}
                />
              </mesh>
              {/* Terminal code lines */}
              {[-0.25, -0.12, 0.01, 0.14, 0.26].map((cy, i) => (
                <mesh key={`b-code-${i}`} position={[-0.15 + (i % 2) * 0.1, cy, 0.032]}>
                  <planeGeometry args={[0.7 + (i % 3) * 0.2, 0.045]} />
                  <meshBasicMaterial color={i === 0 ? '#F59E0B' : '#38BDF8'} />
                </mesh>
              ))}
            </group>

            {/* Right Screen: REST APIs & Microservices */}
            <group position={[0.78, 1.0, -0.05]} rotation={[0, -0.16, 0]}>
              <mesh>
                <boxGeometry args={[1.35, 0.95, 0.05]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0.028]}>
                <planeGeometry args={[1.28, 0.88]} />
                <meshStandardMaterial color="#090D16" emissive="#10B981" emissiveIntensity={0.15} />
              </mesh>
              {/* Endpoint Status Blocks */}
              {[-0.22, 0.02, 0.24].map((ey, i) => (
                <mesh key={`b-api-${i}`} position={[0, ey, 0.032]}>
                  <planeGeometry args={[1.1, 0.14]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
              ))}
            </group>
          </group>
        )}

        {/* ========================================================= */}
        {/* 3. DATABASE STATION: Modular Storage Tower & Metrics      */}
        {/* ========================================================= */}
        {categoryIndex === 2 && (
          <group position={[0, 0, 0]}>
            {/* Sleek Central Storage Column */}
            <mesh position={[0, 1.05, -0.2]}>
              <cylinderGeometry args={[0.55, 0.65, 2.1, 24]} />
              <meshStandardMaterial color="#1E232E" metalness={0.8} roughness={0.3} />
            </mesh>
            {/* Tiered Database Storage Rings */}
            {[-0.6, -0.2, 0.2, 0.6].map((ry, i) => (
              <mesh key={`db-ring-${i}`} position={[0, 1.05 + ry, -0.2]}>
                <cylinderGeometry args={[0.58, 0.58, 0.12, 24]} />
                <meshStandardMaterial
                  color={i === 1 ? '#0284C7' : '#2A303C'}
                  metalness={0.9}
                  emissive={i === 1 ? '#0284C7' : '#000000'}
                  emissiveIntensity={0.3}
                />
              </mesh>
            ))}

            {/* Left Schema Screen */}
            <group position={[-1.0, 0.95, 0.1]} rotation={[0, 0.25, 0]}>
              <mesh>
                <boxGeometry args={[1.2, 0.8, 0.04]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={primaryScreenRef} position={[0, 0, 0.024]}>
                <planeGeometry args={[1.12, 0.72]} />
                <meshStandardMaterial color="#0B132B" emissive="#06B6D4" emissiveIntensity={0.2} />
              </mesh>
              {/* Table / Collection schema rows */}
              {[-0.2, 0, 0.2].map((dy, i) => (
                <mesh key={`db-row-${i}`} position={[0, dy, 0.028]}>
                  <planeGeometry args={[0.95, 0.11]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
              ))}
            </group>

            {/* Right Cache / Throughput Gauge Screen */}
            <group position={[1.0, 0.95, 0.1]} rotation={[0, -0.25, 0]}>
              <mesh>
                <boxGeometry args={[1.2, 0.8, 0.04]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh position={[0, 0, 0.024]}>
                <planeGeometry args={[1.12, 0.72]} />
                <meshStandardMaterial color="#090D16" emissive="#10B981" emissiveIntensity={0.2} />
              </mesh>
              {/* Redis throughput bars */}
              {[-0.2, 0, 0.2].map((my, i) => (
                <mesh key={`db-metric-${i}`} position={[0, my, 0.028]}>
                  <planeGeometry args={[0.95, 0.09]} />
                  <meshBasicMaterial color="#15803D" />
                </mesh>
              ))}
            </group>
          </group>
        )}

        {/* ========================================================= */}
        {/* 4. DEVOPS STATION: Cloud Telemetry & Container Console    */}
        {/* ========================================================= */}
        {categoryIndex === 3 && (
          <group position={[0, 0, 0]}>
            {/* Cloud Server Tower (Right Side) */}
            <group position={[1.0, 1.25, -0.4]}>
              <mesh>
                <boxGeometry args={[0.85, 2.5, 0.85]} />
                <meshStandardMaterial color="#0B0E14" metalness={0.9} roughness={0.2} />
              </mesh>
              {/* Container stack lights */}
              {[-0.8, -0.3, 0.2, 0.7].map((cy, i) => (
                <mesh key={`c-light-${i}`} position={[0, cy, 0.435]}>
                  <planeGeometry args={[0.65, 0.28]} />
                  <meshBasicMaterial color="#0284C7" />
                </mesh>
              ))}
            </group>

            {/* CI/CD Pipeline & Deployment Console (Center-Left) */}
            <group position={[-0.45, 1.05, 0]}>
              <mesh>
                <boxGeometry args={[1.9, 1.2, 0.05]} />
                <meshStandardMaterial color="#0A0C10" metalness={0.9} />
              </mesh>
              <mesh ref={primaryScreenRef} position={[0, 0, 0.028]}>
                <planeGeometry args={[1.82, 1.12]} />
                <meshStandardMaterial color="#0B132B" emissive="#0284C7" emissiveIntensity={0.22} />
              </mesh>
              {/* 5-Stage Pipeline Tracker */}
              <group position={[0, 0, 0.034]}>
                <mesh position={[0, 0.38, 0]}>
                  <planeGeometry args={[1.65, 0.1]} />
                  <meshBasicMaterial color="#1E293B" />
                </mesh>
                {/* 5 pipeline step badges */}
                {[-0.6, -0.3, 0, 0.3, 0.6].map((px, i) => (
                  <mesh key={`pipe-step-${i}`} position={[px, 0.08, 0]}>
                    <planeGeometry args={[0.22, 0.22]} />
                    <meshBasicMaterial color="#10B981" />
                  </mesh>
                ))}
                {/* Deployment Log Console */}
                <mesh position={[0, -0.32, 0]}>
                  <planeGeometry args={[1.65, 0.38]} />
                  <meshBasicMaterial color="#0F172A" />
                </mesh>
              </group>
            </group>
          </group>
        )}

        {/* Ambient Station Workstation Glow */}
        <pointLight
          ref={pulseRef}
          position={[0, 0.6, 0.5]}
          color={isSelected ? '#38BDF8' : '#FEF08A'}
          intensity={isSelected ? 1.8 : 0.4}
          distance={6}
        />
      </group>

      {/* ========================================================= */}
      {/* COMPACT INTERACTIVE TECH CHIPS DISPLAYED AT STATION       */}
      {/* ========================================================= */}
      <group position={[0, 0.03, 1.35]}>
        {skills.slice(0, 6).map((skill, si) => {
          const col = si % 3;
          const row = Math.floor(si / 3);
          const cx = (col - 1) * 0.95;
          const cz = row * 0.35;

          return (
            <group
              key={skill.name}
              position={[cx, 0.02, cz]}
              onClick={(e) => {
                e.stopPropagation();
                onSkillClick(skill.name);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
              }}
            >
              {/* Chip Plaque */}
              <mesh position={[0, 0.02, 0]}>
                <boxGeometry args={[0.85, 0.04, 0.26]} />
                <meshStandardMaterial
                  color={isSelected ? '#1E293B' : '#141822'}
                  metalness={0.7}
                  roughness={0.4}
                />
              </mesh>
              <Text
                position={[0, 0.045, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
                fontSize={0.075}
                color={isSelected ? '#38BDF8' : '#94A3B8'}
                letterSpacing={0.06}
                anchorX="center"
              >
                {skill.name}
              </Text>
            </group>
          );
        })}
      </group>
    </group>
  );
};

/**
 * Modern Laboratory Botanical Planter
 */
const LabBotanical: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Dark Slate Ceramic Pot */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.38, 0.32, 1.0, 16]} />
        <meshStandardMaterial color="#1E232E" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.98, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.35, 16]} />
        <meshStandardMaterial color="#151210" roughness={0.95} />
      </mesh>
      {/* Sculpted Architectural Foliage */}
      {[-0.12, 0, 0.12].map((ox, i) =>
        [-0.1, 0.1].map((oz, j) => (
          <mesh
            key={`l-leaf-${i}-${j}`}
            position={[ox, 1.5 + (i % 2) * 0.2, oz]}
            rotation={[0, (i * 2 + j) * 0.7, (ox * 0.25)]}
          >
            <planeGeometry args={[0.2, 1.2]} />
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
 * CH 05 / CHAPTER 06 — TECHNOLOGY LABORATORY
 * 
 * Futuristic yet realistic technology laboratory featuring:
 * - Dark architectural stone composite floor with illuminated runner line
 * - 4 dedicated physical 3D stations: Frontend, Backend, Database, DevOps
 * - Coordinated museum/lab ceiling spotlights focusing on active station
 * - Glass partition fins and titanium column structures
 * - Smooth scroll-driven station activation
 */
export const SkillsScene: React.FC = () => {
  const selectedSkillCategoryIndex = useJourneyStore((state) => state.selectedSkillCategoryIndex);
  const setSelectedSkillCategoryIndex = useJourneyStore((state) => state.setSelectedSkillCategoryIndex);
  const openSkillDetail = useJourneyStore((state) => state.openSkillDetail);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  // Sync scroll progress through Chapter 06 (0.56 to 0.68) to automatically activate stations on scroll
  useFrame(() => {
    if (journeyProgress >= 0.56 && journeyProgress <= 0.68) {
      const step = Math.min(3, Math.max(0, Math.floor(((journeyProgress - 0.56) / 0.12) * 4)));
      if (step !== selectedSkillCategoryIndex) {
        setSelectedSkillCategoryIndex(step);
      }
    }
  });

  // Coordinates for the 4 physical stations along lab promenade
  const stationPositions: [number, number, number][] = [
    [-11.5, 0, -3.2],
    [-3.8, 0, -4.2],
    [3.8, 0, -4.2],
    [11.5, 0, -3.2],
  ];

  const stationSubtitles = [
    'UI & Web Engineering',
    'APIs & Business Logic',
    'Clusters & Schemas',
    'Cloud & Pipelines',
  ];

  return (
    <group position={[-42, 0.2, -265]}>
      {/* Laboratory Pavilion Enclosure (Left side of road, facing +X towards road/traveler) */}
      <group position={[-16, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* ========================================================= */}
        {/* ARCHITECTURAL LABORATORY ENCLOSURE                        */}
        {/* ========================================================= */}

        {/* Polished Dark Laboratory Floor */}
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[38, 28]} />
          <meshStandardMaterial
            color="#0C1019"
            roughness={0.38}
            metalness={0.2}
          />
        </mesh>

        {/* Subtle Illuminated Pathway Runner (Embedded LED runner) */}
        <mesh position={[0, 0.025, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[36, 0.08]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.5} />
        </mesh>

        {/* Minimalist Matte Exhibition Back Wall */}
        <mesh position={[0, 4.5, -7.5]}>
          <boxGeometry args={[38, 9.0, 0.4]} />
          <meshStandardMaterial color="#141822" roughness={0.9} />
        </mesh>

        {/* Dark Coffer Ceiling with Recessed Beams */}
        <mesh position={[0, 8.8, 0]}>
          <boxGeometry args={[38, 0.4, 28]} />
          <meshStandardMaterial color="#0A0D14" roughness={0.85} />
        </mesh>

        {/* Subtle Ceiling Track Light Rails */}
        {[-4.5, 4.5].map((rz, i) => (
          <mesh key={`lab-rail-${i}`} position={[0, 8.55, rz]}>
            <boxGeometry args={[36, 0.12, 0.18]} />
            <meshStandardMaterial color="#1E232E" metalness={0.9} />
          </mesh>
        ))}

        {/* Tempered Glass Divider Fins between Station Bays */}
        {[-7.6, 0, 7.6].map((gx, i) => (
          <mesh key={`lab-glass-${i}`} position={[gx, 3.2, -3.8]}>
            <boxGeometry args={[0.06, 5.5, 4.6]} />
            <meshPhysicalMaterial
              color="#CBD5E1"
              transparent
              opacity={0.3}
              roughness={0.08}
              transmission={0.88}
              thickness={0.4}
            />
          </mesh>
        ))}

        {/* Structural Titanium Columns */}
        {[-16.5, -7.6, 0, 7.6, 16.5].map((cx, i) => (
          <mesh key={`lab-col-${i}`} position={[cx, 4.5, 9.5]}>
            <boxGeometry args={[0.35, 9.0, 0.35]} />
            <meshStandardMaterial color="#1B202C" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}

        {/* Minimalist Modern Laboratory Botanicals */}
        <LabBotanical position={[-16.5, 0, 6.5]} />
        <LabBotanical position={[16.5, 0, 6.5]} />
        <LabBotanical position={[-16.5, 0, -5.5]} />
        <LabBotanical position={[16.5, 0, -5.5]} />

        {/* ========================================================= */}
        {/* 4 DEDICATED PHYSICAL TECHNOLOGY STATIONS                  */}
        {/* ========================================================= */}
        {skillCategories.slice(0, 4).map((cat, idx) => (
          <LabStation
            key={cat.id}
            categoryIndex={idx}
            title={cat.name}
            subtitle={stationSubtitles[idx]}
            skills={cat.skills}
            isSelected={idx === selectedSkillCategoryIndex}
            onSelect={() => setSelectedSkillCategoryIndex(idx)}
            onSkillClick={(skillName) => openSkillDetail(skillName)}
            position={stationPositions[idx]}
          />
        ))}

        {/* Illuminated Paved Entrance Linking to Road Corridor */}
        <mesh position={[0, 0.015, 13.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[14, 8]} />
          <meshStandardMaterial color="#1A202C" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
};

export default SkillsScene;
