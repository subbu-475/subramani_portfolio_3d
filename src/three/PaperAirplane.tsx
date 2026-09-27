import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getAirplaneFlightPosition, getAirplaneFlightTransform } from './JourneyPath';

/**
 * Creates custom procedural 3D Folded Origami Paper Airplane Geometry
 * High precision, faceted paper folds, underbody keel, dihedral swept wings and winglets.
 */
function createOrigamiAirplaneGeometry(): THREE.BufferGeometry {
  const geom = new THREE.BufferGeometry();

  // Positions array for faceted triangles (3 vertices per face)
  const vertices: number[] = [];

  // Helper to push a triangle
  const pushTri = (
    p1: [number, number, number],
    p2: [number, number, number],
    p3: [number, number, number]
  ) => {
    vertices.push(...p1, ...p2, ...p3);
  };

  // 1. Key 3D Fold Coordinates
  const Nose: [number, number, number] = [0, 0.02, -1.15];
  const SpineTail: [number, number, number] = [0, 0.05, 0.82];

  const KeelMid: [number, number, number] = [0, -0.22, -0.05];
  const KeelTail: [number, number, number] = [0, -0.26, 0.82];

  // Main Wingtips (slight upward dihedral tilt)
  const WingL: [number, number, number] = [-0.92, 0.14, 0.72];
  const WingR: [number, number, number] = [0.92, 0.14, 0.72];

  // Inner Crease Flaps (the classic origami diagonal fold layers)
  const FlapL: [number, number, number] = [-0.18, 0.08, 0.78];
  const FlapR: [number, number, number] = [0.18, 0.08, 0.78];

  // Up-turned Winglet folds
  const WingletTopL: [number, number, number] = [-0.92, 0.32, 0.72];
  const WingletFrontL: [number, number, number] = [-0.88, 0.14, 0.28];

  const WingletTopR: [number, number, number] = [0.92, 0.32, 0.72];
  const WingletFrontR: [number, number, number] = [0.88, 0.14, 0.28];

  // 2. Build Triangles

  // --- Left Main Wing Panels ---
  pushTri(Nose, FlapL, WingL);
  pushTri(Nose, SpineTail, FlapL);

  // --- Right Main Wing Panels ---
  pushTri(Nose, WingR, FlapR);
  pushTri(Nose, FlapR, SpineTail);

  // --- Left Upturned Winglet ---
  pushTri(WingletFrontL, WingletTopL, WingL);

  // --- Right Upturned Winglet ---
  pushTri(WingletFrontR, WingR, WingletTopR);

  // --- Left Underbody Keel (Fuselage Grip) ---
  pushTri(Nose, KeelMid, SpineTail);
  pushTri(SpineTail, KeelMid, KeelTail);

  // --- Right Underbody Keel (Fuselage Grip) ---
  pushTri(Nose, SpineTail, KeelMid);
  pushTri(SpineTail, KeelTail, KeelMid);

  geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geom.computeVertexNormals();

  return geom;
}

/**
 * Continuous Glowing Flight Trail connecting the chapters
 */
/**
 * Continuous Glowing Flight Trail connecting the chapters
 */
const FlightTrail: React.FC<{ progress: number }> = ({ progress }) => {
  const pointsCount = 70;
  const lastProgressRef = useRef(-1);
  const scratchPosRef = useRef(new THREE.Vector3());

  const [lineObj, lineGeometry] = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(pointsCount * 3);
    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#FDE047',
      transparent: true,
      opacity: 0.65,
    });
    const line = new THREE.Line(geom, mat);
    return [line, geom];
  }, [pointsCount]);

  useFrame(() => {
    // Only recalculate spline points when progress actually changes
    if (Math.abs(progress - lastProgressRef.current) < 0.0004) return;
    lastProgressRef.current = progress;

    const posAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
    const currentMax = Math.max(0.001, progress);

    for (let i = 0; i < pointsCount; i++) {
      const t = (i / (pointsCount - 1)) * currentMax;
      getAirplaneFlightPosition(t, scratchPosRef.current);
      posAttr.setXYZ(i, scratchPosRef.current.x, scratchPosRef.current.y - 0.05, scratchPosRef.current.z);
    }
    posAttr.needsUpdate = true;
  });

  if (progress <= 0.005) return null;

  return <primitive object={lineObj} />;
};

/**
 * Wingtip Vapor Particle Streamers
 */
const WingtipParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const count = 28;

  const [pointsObj, geo, dummyVecs] = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const alphas = new Float32Array(count);
    const vecs: { pos: THREE.Vector3; life: number; speed: number }[] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = 0;
      pos[i * 3 + 1] = 0;
      pos[i * 3 + 2] = 0;
      alphas[i] = 0;
      vecs.push({
        pos: new THREE.Vector3(0, -100, 0),
        life: Math.random(),
        speed: 0.8 + Math.random() * 0.6,
      });
    }

    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      color: '#FEF08A',
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pts = new THREE.Points(g, mat);
    return [pts, g, vecs];
  }, [count]);

  useFrame((_, delta) => {
    if (!active) return;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;

    dummyVecs.forEach((p, idx) => {
      p.life += delta * p.speed;
      if (p.life > 1.0) {
        p.life = 0;
        // Emit from left or right wingtip with slight random offset
        const side = idx % 2 === 0 ? -0.9 : 0.9;
        p.pos.set(side + (Math.random() - 0.5) * 0.1, 0.1, 0.7 + (Math.random() - 0.5) * 0.2);
      } else {
        // Drift backward and dissipate
        p.pos.z += delta * 3.5;
        p.pos.y -= delta * 0.2;
      }
      posAttr.setXYZ(idx, p.pos.x, p.pos.y, p.pos.z);
    });
    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return <primitive object={pointsObj} />;
};

export interface PaperAirplaneProps {
  scale?: number;
}

/**
 * Premium 3D Folded Paper Airplane Component
 * 
 * Replaces the human traveler as the hero protagonist of Subramani's portfolio.
 * Features:
 * - Handcrafted origami faceted geometry
 * - Authentic warm ivory paper material with double-sided lighting response
 * - Wing monogram inscription "SUBRAMANI // EXP-01"
 * - Aerodynamic banking, pitch, yaw, and thermals fluttering
 * - Soft ground projection shadow
 * - Glowing continuous flight trail connecting the chapters
 * - Dedicated golden rim lighting highlighting the crisp folded edges
 */
export const PaperAirplane: React.FC<PaperAirplaneProps> = ({ scale = 0.36 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Mesh>(null);

  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  // Geometry
  const origamiGeometry = useMemo(() => createOrigamiAirplaneGeometry(), []);

  // Material: authentic, warm, premium heavy-stock paper
  const paperMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FAF7F0',       // Warm ivory paper
      roughness: 0.68,        // Soft matte paper sheen
      metalness: 0.04,
      side: THREE.DoubleSide,
      shadowSide: THREE.DoubleSide,
    });
  }, []);

  // Crease accent line material for origami fold shadows
  const creaseMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#D4CEBF',
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
  }, []);

  // Interpolated flight transforms
  const currentPos = useRef(new THREE.Vector3());
  const currentQuat = useRef(new THREE.Quaternion());

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Get smooth aerodynamic transform for current journey progress
    const t = state.clock.elapsedTime;
    const { pos, quat } = getAirplaneFlightTransform(journeyProgress, t);

    // Smooth position interpolation along road center
    currentPos.current.lerp(pos, Math.min(1, delta * 6.5));
    groupRef.current.position.copy(currentPos.current);

    // Smooth quaternion slerp: 100% aligned with road tangent, zero gimbal or axis error
    currentQuat.current.slerp(quat, Math.min(1, delta * 6.0));
    if (meshRef.current) {
      meshRef.current.quaternion.copy(currentQuat.current);
    }

    // Dynamic ground contact shadow
    if (shadowRef.current) {
      const alt = Math.max(0.1, currentPos.current.y);
      shadowRef.current.position.set(currentPos.current.x, 0.02, currentPos.current.z);
      // Shadow expands and softens with altitude
      const shadowScale = THREE.MathUtils.clamp(0.4 + alt * 0.22, 0.35, 1.4);
      shadowRef.current.scale.set(shadowScale, shadowScale, shadowScale);
      const shadowMat = shadowRef.current.material as THREE.MeshBasicMaterial;
      if (shadowMat) {
        shadowMat.opacity = THREE.MathUtils.clamp(0.5 - alt * 0.09, 0.06, 0.5);
      }
    }
  });

  const isAirborne = journeyProgress > 0.035 && journeyProgress < 0.98;

  return (
    <>
      {/* 1. Continuous Golden Flight Trail across chapters */}
      <FlightTrail progress={journeyProgress} />

      {/* 2. Primary Paper Airplane Group */}
      <group ref={groupRef}>
        <group ref={meshRef} scale={[scale, scale, scale]}>
          {/* Main Folded Paper Origami Mesh */}
          <mesh
            geometry={origamiGeometry}
            material={paperMaterial}
            castShadow
            receiveShadow
          />

          {/* Subtle Crease Overlay highlighting origami folds */}
          <mesh
            geometry={origamiGeometry}
            material={creaseMaterial}
          />

          {/* Elegant "SUBRAMANI" Typography Inscription on Right Wing */}
          <group
            position={[0.38, 0.12, 0.42]}
            rotation={[-Math.PI / 2, 0, -0.22]}
          >
            <Text
              fontSize={0.066}
              color="#374151"
              letterSpacing={0.16}
              anchorX="center"
              anchorY="middle"
            >
              SUBRAMANI
            </Text>
            <Text
              position={[0, -0.065, 0]}
              fontSize={0.036}
              color="#D97706"
              letterSpacing={0.24}
              anchorX="center"
              anchorY="middle"
            >
              EXP-01 // JOURNEY
            </Text>
          </group>

          {/* Minimalist Geometric Wing Inscription on Left Wing */}
          <group
            position={[-0.38, 0.12, 0.42]}
            rotation={[-Math.PI / 2, 0, 0.22]}
          >
            <Text
              fontSize={0.08}
              color="#9CA3AF"
              letterSpacing={0.1}
              anchorX="center"
              anchorY="middle"
            >
              ▲
            </Text>
          </group>

          {/* Dedicated Local Warm Rim Light */}
          <pointLight
            position={[0, 0.6, -0.8]}
            color="#FEF08A"
            intensity={1.2}
            distance={2.8}
          />

          {/* Wingtip Aerodynamic Vapor Streamers */}
          <WingtipParticles active={isAirborne} />
        </group>
      </group>

      {/* 3. Soft Dynamic Ground Projection Shadow */}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.32, 32]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

export default PaperAirplane;
