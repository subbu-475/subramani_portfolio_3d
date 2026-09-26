import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../../store/journeyStore';
import {
  TECHNOLOGY_CUBES,
  TECHNOLOGY_CATEGORIES,
  type TechnologyCubeData,
  type TechnologyCategoryMeta,
} from '../../data/technologyCubes';
import { getCubeFrontTexture } from '../utils/createCubeTexture';

/**
 * CHAPTER 05 — TECHNOLOGY: 3D MULTI-TIERED SKILL CUBES WALL
 * 
 * - Placed to the SIDE of the road on an elevated modern plaza platform
 * - The main road path is 100% open and unobstructed
 * - 5 Stepped tiers: FRONTEND, BACKEND, DATABASE, DEVOPS, TOOLS
 * - Left-side dark category indicator blocks with glowing neon strips
 * - 40 authentic 3D technology cubes (8 per row) with brand logos & illuminated top plates
 * - Clean rectangular bevel edges with ZERO diagonal cross lines
 * - Continuous horizontal neon shelf underglow lines
 * - Interactive hover, selection lift, and dynamic sync with the HUD card
 */

// Shared reusable geometries with EdgesGeometry (guarantees NO diagonal cross lines!)
const CUBE_EDGES_GEO = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.102, 1.102, 0.852));
const CAT_EDGES_GEO = new THREE.EdgesGeometry(new THREE.BoxGeometry(2.302, 1.102, 0.852));

// ─── 1. INDIVIDUAL 3D TECH CUBE ──────────────────────────────────────────────
interface TechCubeProps {
  cube: TechnologyCubeData;
  isSelected: boolean;
  onSelect: (id: string, categoryRow: number) => void;
}

const TechCube: React.FC<TechCubeProps> = ({ cube, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const cubeGroupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Load the 512x512 crisp vector CanvasTexture for the front face
  const frontTexture = useMemo(() => getCubeFrontTexture(cube), [cube]);

  // Create 6 face materials:
  // [0: +X, 1: -X, 2: +Y (Top), 3: -Y, 4: +Z (Front), 5: -Z]
  const materials = useMemo(() => {
    // Side and back material (sleek dark housing)
    const sideMat = new THREE.MeshStandardMaterial({
      color: cube.bgColor,
      roughness: 0.35,
      metalness: 0.3,
    });

    // Top illuminated plate (glossy brand color acrylic)
    const topMat = new THREE.MeshStandardMaterial({
      color: cube.brandColor,
      emissive: cube.brandColor,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.2,
    });

    // Bottom plate
    const bottomMat = new THREE.MeshStandardMaterial({
      color: '#080D1A',
      roughness: 0.8,
    });

    // Front face with crisp logo & text texture (zero white emissive to preserve rich colors)
    const frontMat = new THREE.MeshStandardMaterial({
      map: frontTexture,
      roughness: 0.15,
      metalness: 0.1,
      emissive: '#000000',
    });

    return [sideMat, sideMat, topMat, bottomMat, frontMat, sideMat];
  }, [cube, frontTexture]);

  useFrame((_, delta) => {
    if (!cubeGroupRef.current) return;

    // Smooth forward lift when hovered or selected
    const targetZ = hovered ? 0.28 : isSelected ? 0.22 : 0;
    const targetY = hovered ? 0.14 : isSelected ? 0.08 : 0;

    cubeGroupRef.current.position.z = THREE.MathUtils.lerp(
      cubeGroupRef.current.position.z,
      targetZ,
      delta * 8.0
    );
    cubeGroupRef.current.position.y = THREE.MathUtils.lerp(
      cubeGroupRef.current.position.y,
      targetY,
      delta * 8.0
    );

    if (lightRef.current) {
      const targetIntensity = hovered ? 2.8 : isSelected ? 2.0 : 0.45;
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        targetIntensity,
        delta * 6.0
      );
    }
  });

  return (
    <group
      ref={cubeGroupRef}
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(cube.id, cube.row);
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
      {/* Main Cube Body (1.1m width x 1.1m height x 0.85m depth) */}
      <mesh material={materials} castShadow receiveShadow>
        <boxGeometry args={[1.1, 1.1, 0.85]} />
      </mesh>

      {/* Clean Rectangular Outer Bevel Edges (NO diagonal cross lines!) */}
      <lineSegments geometry={CUBE_EDGES_GEO}>
        <lineBasicMaterial
          color={cube.brandColor}
          transparent
          opacity={hovered ? 1.0 : isSelected ? 0.85 : 0.25}
        />
      </lineSegments>

      {/* Front Face Glass Gloss Highlight Edge */}
      <mesh position={[0, 0.54, 0.43]}>
        <boxGeometry args={[1.08, 0.03, 0.02]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={hovered ? 1.2 : isSelected ? 0.8 : 0.2}
        />
      </mesh>

      {/* Forward/Downward Ambient Point Light */}
      <pointLight
        ref={lightRef}
        position={[0, 0.4, 0.7]}
        color={cube.brandColor}
        distance={2.8}
        decay={2}
        intensity={0.5}
      />
    </group>
  );
};

// ─── 2. CATEGORY INDICATOR BLOCK (LEFT SIDE OF EACH ROW) ─────────────────────
interface CategoryBlockProps {
  category: TechnologyCategoryMeta;
  isSelected: boolean;
  onSelect: () => void;
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ category, isSelected, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={[-5.6, 0, 0]}
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
      {/* Matte Dark Beveled Indicator Housing Block */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.3, 1.1, 0.85]} />
        <meshStandardMaterial color="#0A101D" roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Clean Rectangular Outer Bevel Edges (NO diagonal cross lines!) */}
      <lineSegments geometry={CAT_EDGES_GEO}>
        <lineBasicMaterial
          color={category.glowColor}
          transparent
          opacity={isSelected ? 1.0 : hovered ? 0.8 : 0.35}
        />
      </lineSegments>

      {/* Front Face Text Label */}
      <Text
        position={[0, 0, 0.44]}
        fontSize={0.24}
        color={isSelected ? '#FFFFFF' : '#E2E8F0'}
        letterSpacing={0.16}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        {category.name}
      </Text>

      {/* Bottom Glowing Neon Indicator Strip */}
      <mesh position={[0, -0.52, 0.44]}>
        <boxGeometry args={[2.1, 0.08, 0.04]} />
        <meshStandardMaterial
          color={category.glowColor}
          emissive={category.glowColor}
          emissiveIntensity={isSelected ? 3.5 : hovered ? 2.5 : 1.4}
        />
      </mesh>
    </group>
  );
};

// ─── 3. SINGLE TIER SHELF ROW WITH 8 CUBES ────────────────────────────────────
interface TierRowProps {
  category: TechnologyCategoryMeta;
  cubes: TechnologyCubeData[];
  shelfY: number;
  shelfZ: number;
  selectedCubeId: string;
  isCategorySelected: boolean;
  onSelectCube: (id: string, categoryRow: number) => void;
  onSelectCategory: (row: number) => void;
}

const TierRow: React.FC<TierRowProps> = ({
  category,
  cubes,
  shelfY,
  shelfZ,
  selectedCubeId,
  isCategorySelected,
  onSelectCube,
  onSelectCategory,
}) => {
  // 8 cubes horizontally distributed: pitch = 1.31m
  // Start X = -3.85m, End X = +5.32m
  const cubeStartX = -3.85;
  const cubePitch = 1.31;

  return (
    <group position={[0, shelfY, shelfZ]}>
      {/* ── 1. Category Indicator Block on Left ── */}
      <CategoryBlock
        category={category}
        isSelected={isCategorySelected}
        onSelect={() => onSelectCategory(category.row)}
      />

      {/* ── 2. Shelf Structure Underneath Cubes ── */}
      {/* Dark Structural Shelf Step Base */}
      <mesh position={[0.2, -0.62, -0.05]} receiveShadow>
        <boxGeometry args={[14.2, 0.16, 1.2]} />
        <meshStandardMaterial color="#070C16" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Continuous Glowing Horizontal Neon Shelf Underglow Line */}
      <mesh position={[0.2, -0.56, 0.52]}>
        <boxGeometry args={[13.9, 0.05, 0.04]} />
        <meshStandardMaterial
          color={category.glowColor}
          emissive={category.glowColor}
          emissiveIntensity={isCategorySelected ? 3.2 : 1.5}
        />
      </mesh>

      {/* Shelf Downward Line Point Light */}
      <pointLight
        position={[0, -0.7, 0.8]}
        color={category.glowColor}
        distance={6}
        decay={2}
        intensity={isCategorySelected ? 2.2 : 1.0}
      />

      {/* ── 3. The 8 Ordered 3D Technology Cubes ── */}
      {cubes.map((cube, colIdx) => {
        const posX = cubeStartX + colIdx * cubePitch;
        const isSelected = cube.id === selectedCubeId;

        return (
          <group key={cube.id} position={[posX, 0, 0]}>
            <TechCube
              cube={cube}
              isSelected={isSelected}
              onSelect={onSelectCube}
            />
          </group>
        );
      })}
    </group>
  );
};

// ─── 4. MAIN TECHNOLOGY SCENE COMPONENT ──────────────────────────────────────
export const SkillsScene: React.FC = () => {
  const selectedSkillCategoryIndex = useJourneyStore((state) => state.selectedSkillCategoryIndex);
  const setSelectedSkillCategoryIndex = useJourneyStore((state) => state.setSelectedSkillCategoryIndex);
  const selectedTechCubeId = useJourneyStore((state) => state.selectedTechCubeId);
  const setSelectedTechCubeId = useJourneyStore((state) => state.setSelectedTechCubeId);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  // Stepped keyboard riser settings for 4 ordered category tiers:
  // Row 3 (DevOps, bottom / front) -> Row 0 (Frontend, top / back)
  const tierConfigs = useMemo(() => [
    { row: 0, y: 4.5, z: -3.0 }, // Row 0: FRONTEND (Top & furthest back)
    { row: 1, y: 3.1, z: -2.0 }, // Row 1: BACKEND
    { row: 2, y: 1.7, z: -1.0 }, // Row 2: DATABASE
    { row: 3, y: 0.3, z:  0.0 }, // Row 3: DEVOPS (Bottom & closest)
  ], []);

  // Group cubes by row (0 to 3)
  const cubesByRow = useMemo(() => {
    const map = new Map<number, TechnologyCubeData[]>();
    for (let r = 0; r < 4; r++) {
      map.set(
        r,
        TECHNOLOGY_CUBES.filter((c) => c.row === r).sort((a, b) => a.col - b.col)
      );
    }
    return map;
  }, []);

  // Smoothly sync category tab when scrolling through Chapter 04
  useFrame(() => {
    if (journeyProgress >= 0.56 && journeyProgress <= 0.68) {
      const t = (journeyProgress - 0.56) / (0.68 - 0.56);
      const step = Math.min(3, Math.max(0, Math.floor(t * 4)));
      if (step !== selectedSkillCategoryIndex) {
        setSelectedSkillCategoryIndex(step);
      }
    }
  });

  const handleSelectCube = (id: string, row: number) => {
    setSelectedTechCubeId(id);
    setSelectedSkillCategoryIndex(row);
  };

  const handleSelectCategory = (row: number) => {
    setSelectedSkillCategoryIndex(row);
    // Auto-select the first cube in that category
    const rowCubes = cubesByRow.get(row);
    if (rowCubes && rowCubes.length > 0) {
      setSelectedTechCubeId(rowCubes[0].id);
    }
  };

  return (
    // ══════════════════════════════════════════════════════════════════════════
    // WORLD POSITION & ORIENTATION:
    // Placed on the side of the road at the apex of the road curve:
    // Position: [-45.5, 0.2, -259.5], Yaw: 1.426 rad (81.7 deg).
    // Directly faces the road curve and the oncoming paper airplane!
    // The road curves gracefully right in front of the skills section!
    // ══════════════════════════════════════════════════════════════════════════
    <group position={[-45.5, 0.2, -259.5]} rotation={[0, 1.426, 0]}>
      {/* ── 1. Expansive High-Gloss Dark Base Platform with Chamfer ── */}
      <mesh position={[0, -0.22, -1.5]} receiveShadow>
        <boxGeometry args={[16.2, 0.44, 6.6]} />
        <meshStandardMaterial color="#050811" roughness={0.15} metalness={0.6} />
      </mesh>

      {/* Surrounding Neon Cyber Edge Accent Lines on Ground */}
      <mesh position={[0, 0.01, 1.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[16.0, 0.08]} />
        <meshStandardMaterial color="#00D8FF" emissive="#00D8FF" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[-7.95, 0.01, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[6.5, 0.08]} />
        <meshStandardMaterial color="#00D8FF" emissive="#00D8FF" emissiveIntensity={2.0} />
      </mesh>
      <mesh position={[7.95, 0.01, -1.5]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[6.5, 0.08]} />
        <meshStandardMaterial color="#00D8FF" emissive="#00D8FF" emissiveIntensity={2.0} />
      </mesh>

      {/* Connecting Illuminated Promenade from Plaza Platform to Road */}
      <mesh position={[0, 0.005, 3.8]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14.0, 4.0]} />
        <meshStandardMaterial color="#0A0E18" roughness={0.6} />
      </mesh>

      {/* ── 2. Back Wall Solid Riser Frame (Black Backdrop for Contrast) ── */}
      <mesh position={[0, 2.5, -3.6]} receiveShadow>
        <boxGeometry args={[15.6, 5.4, 0.5]} />
        <meshStandardMaterial color="#060A14" roughness={0.8} />
      </mesh>

      {/* ── 3. The 5 Stepped Shelf Tiers of 3D Cubes ── */}
      {TECHNOLOGY_CATEGORIES.map((cat) => {
        const config = tierConfigs[cat.row];
        const rowCubes = cubesByRow.get(cat.row) || [];
        const isCatSelected = cat.row === selectedSkillCategoryIndex;

        return (
          <TierRow
            key={cat.id}
            category={cat}
            cubes={rowCubes}
            shelfY={config.y}
            shelfZ={config.z}
            selectedCubeId={selectedTechCubeId}
            isCategorySelected={isCatSelected}
            onSelectCube={handleSelectCube}
            onSelectCategory={handleSelectCategory}
          />
        );
      })}

      {/* ── 4. Overhead Cinematic Stage Lights ── */}
      <pointLight position={[0, 9.0, -1.0]} color="#E2E8F0" intensity={1.8} distance={25} />
      <pointLight position={[-6.0, 7.0, 2.0]} color="#00D8FF" intensity={1.4} distance={18} />
      <pointLight position={[6.0, 7.0, 2.0]} color="#38BDF8" intensity={1.4} distance={18} />
    </group>
  );
};

export default SkillsScene;
