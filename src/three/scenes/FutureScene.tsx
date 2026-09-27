import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Single Holographic Innovation Monolith
 * Elegant semi-transparent glass pillar displaying an Expedition Horizon pillar
 */
interface MonolithProps {
  position: [number, number, number];
  title: string;
  category: string;
  accentColor: string;
  iconType: 'ai' | 'cloud' | 'system' | 'opensource';
}

const InnovationMonolith: React.FC<MonolithProps> = ({
  position,
  title,
  category,
  accentColor,
  iconType,
}) => {
  const iconRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (iconRef.current) {
      iconRef.current.rotation.y += delta * 0.7;
      iconRef.current.rotation.x = Math.sin(delta * 0.5) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Dark Titanium Base Plinth */}
      <mesh position={[0, 0.2, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.4, 1.4]} />
        <meshStandardMaterial color="#0A0F1D" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Glowing Recessed Plinth Trim */}
      <mesh position={[0, 0.41, 0]}>
        <boxGeometry args={[2.24, 0.04, 1.44]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.8} />
      </mesh>

      {/* Holographic Vertical Glass Slab */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1.8, 3.2, 0.08]} />
        <meshStandardMaterial
          color="#0F172A"
          transparent
          opacity={0.45}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Sleek Outer Metal Frame Rim */}
      <mesh position={[0, 2.2, 0]}>
        <boxGeometry args={[1.86, 3.26, 0.06]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.9}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* 3D Category & Title Text */}
      <Text
        position={[0, 3.4, 0.06]}
        fontSize={0.13}
        color={accentColor}
        letterSpacing={0.12}
        anchorX="center"
        anchorY="middle"
      >
        {category}
      </Text>
      <Text
        position={[0, 3.12, 0.06]}
        fontSize={0.22}
        color="#FFFFFF"
        letterSpacing={0.08}
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>

      {/* Floating 3D Geometric Icon inside Holographic Chamber */}
      <group ref={iconRef} position={[0, 1.8, 0]}>
        {iconType === 'ai' && (
          <mesh>
            <icosahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color="#00D9FF"
              emissive="#00D9FF"
              emissiveIntensity={1.4}
              wireframe
            />
          </mesh>
        )}
        {iconType === 'cloud' && (
          <group>
            {[-0.2, 0, 0.2].map((y, i) => (
              <mesh key={`cloud-tier-${i}`} position={[0, y, 0]}>
                <cylinderGeometry args={[0.45 - i * 0.08, 0.45 - i * 0.08, 0.1, 16]} />
                <meshStandardMaterial
                  color="#F59E0B"
                  emissive="#F59E0B"
                  emissiveIntensity={1.4}
                  wireframe
                />
              </mesh>
            ))}
          </group>
        )}
        {iconType === 'system' && (
          <mesh>
            <octahedronGeometry args={[0.45, 0]} />
            <meshStandardMaterial
              color="#10B981"
              emissive="#10B981"
              emissiveIntensity={1.5}
              wireframe
            />
          </mesh>
        )}
        {iconType === 'opensource' && (
          <mesh>
            <dodecahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color="#A855F7"
              emissive="#A855F7"
              emissiveIntensity={1.5}
              wireframe
            />
          </mesh>
        )}
      </group>

      {/* Subtle Orbital Hologram Ring */}
      <mesh ref={ringRef} position={[0, 1.8, 0]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.62, 0.015, 12, 32]} />
        <meshBasicMaterial color={accentColor} transparent opacity={0.6} />
      </mesh>

      {/* Single Soft Local Glow */}
      <pointLight position={[0, 2.0, 0.6]} color={accentColor} intensity={1.4} distance={6} />
    </group>
  );
};

/**
 * Dawn Sea of Clouds
 * Soft stylized morning cloud billows drifting beneath the skybridge
 */
const DawnCloudSea: React.FC = () => {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!cloudsRef.current) return;
    const t = state.clock.elapsedTime * 0.15;
    cloudsRef.current.position.x = Math.sin(t) * 1.5;
    cloudsRef.current.position.z = Math.cos(t * 0.8) * 2.0;
  });

  const cloudPuffs = useMemo(() => {
    const list = [];
    const colors = ['#EDE9FE', '#FDE68A', '#FBCFE8', '#C7D2FE', '#E0E7FF'];
    for (let i = 0; i < 18; i++) {
      const angle = (i / 18) * Math.PI * 2;
      const dist = 12 + (i % 5) * 4.5;
      list.push({
        x: Math.cos(angle) * dist + ((i % 3) - 1) * 4,
        y: -4.5 + Math.sin(i * 1.4) * 1.2,
        z: Math.sin(angle) * (dist * 1.3) + ((i % 4) - 2) * 5,
        radius: 3.2 + (i % 4) * 1.4,
        color: colors[i % colors.length],
        opacity: 0.45 + (i % 3) * 0.12,
      });
    }
    return list;
  }, []);

  return (
    <group ref={cloudsRef}>
      {cloudPuffs.map((c, idx) => (
        <mesh key={`cloud-puff-${idx}`} position={[c.x, c.y, c.z]}>
          <sphereGeometry args={[c.radius, 12, 12]} />
          <meshStandardMaterial
            color={c.color}
            roughness={0.9}
            transparent
            opacity={c.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
};

/**
 * CH 05 — FUTURE: Dawn Horizon Skybridge & Innovation Observatory
 * 
 * Replaces the dark space/rocket launch with a magnificent architectural glass skydeck
 * overlooking a sea of morning clouds, heading into the golden dawn sunrise.
 * Features 4 Holographic Innovation Monoliths (AI, Cloud, System Design, Open Source),
 * illuminated flush runway guide strips, and panoramic sunrise mountain views.
 */
export const FutureScene: React.FC = () => {
  return (
    <group position={[-22, 3.8, -365]}>
      {/* ========================================================= */}
      {/* 1. ARCHITECTURAL CANTILEVERED GLASS SKYBRIDGE DECK         */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Main Structural Titanium Underside Girder */}
        <mesh position={[0, -0.6, 0]} receiveShadow>
          <boxGeometry args={[14, 1.0, 56]} />
          <meshStandardMaterial color="#0B132B" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Aerodynamic Tapered Underbelly Struts */}
        {[-20, -8, 4, 16].map((sz, i) => (
          <mesh key={`strut-${i}`} position={[0, -1.8, sz]} rotation={[0, 0, 0]}>
            <coneGeometry args={[4.5, 2.2, 4]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.3} />
          </mesh>
        ))}

        {/* Frosted Architectural Glass Deck Surface */}
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <boxGeometry args={[13.6, 0.15, 55.6]} />
          <meshStandardMaterial
            color="#141E33"
            roughness={0.2}
            metalness={0.5}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Golden Runway Centerline Double Guide Strip */}
        <mesh position={[-0.15, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 55.0]} />
          <meshBasicMaterial color="#FFC857" />
        </mesh>
        <mesh position={[0.15, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 55.0]} />
          <meshBasicMaterial color="#FFC857" />
        </mesh>

        {/* Cyan Runway Edge Lighting Guide Strips */}
        <mesh position={[-5.8, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 55.0]} />
          <meshBasicMaterial color="#00D9FF" />
        </mesh>
        <mesh position={[5.8, 0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 55.0]} />
          <meshBasicMaterial color="#00D9FF" />
        </mesh>

        {/* Recessed Amber Threshold Landing Markers */}
        {[-24, -12, 0, 12, 24].map((mz, idx) => (
          <group key={`thresh-${idx}`} position={[0, 0.14, mz]}>
            {[-4.5, -3.5, 3.5, 4.5].map((mx, j) => (
              <mesh key={`m-${j}`} position={[mx, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.3, 0.8]} />
                <meshBasicMaterial color="#F59E0B" />
              </mesh>
            ))}
          </group>
        ))}

        {/* Left & Right Glass Balustrade Overlook Railings */}
        {[-6.6, 6.6].map((rx, idx) => (
          <group key={`rail-${idx}`} position={[rx, 0.7, 0]}>
            {/* Seamless Glass Balustrade Panel */}
            <mesh>
              <boxGeometry args={[0.06, 1.2, 55.6]} />
              <meshStandardMaterial
                color="#38BDF8"
                transparent
                opacity={0.3}
                roughness={0.1}
                metalness={0.2}
              />
            </mesh>
            {/* Top Brushed Titanium Handrail */}
            <mesh position={[0, 0.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 55.6, 12]} />
              <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Vertical Support Stanchions */}
            {[-25, -15, -5, 5, 15, 25].map((stz, si) => (
              <mesh key={`stanchion-${si}`} position={[0, 0, stz]}>
                <cylinderGeometry args={[0.04, 0.04, 1.2, 8]} />
                <meshStandardMaterial color="#64748B" metalness={0.9} />
              </mesh>
            ))}
          </group>
        ))}

        {/* Forward Horizon Pylon Masts (Framing the Sunrise ahead) */}
        {[-6.8, 6.8].map((px, pi) => (
          <group key={`pylon-${pi}`} position={[px, 4.0, -27]}>
            <mesh rotation={[0.15, 0, pi === 0 ? 0.08 : -0.08]}>
              <cylinderGeometry args={[0.1, 0.35, 10, 8]} />
              <meshStandardMaterial color="#0F172A" metalness={0.9} roughness={0.3} />
            </mesh>
            {/* Illuminated Cyan Tip Beacon */}
            <mesh position={[0, 5.2, -0.7]}>
              <sphereGeometry args={[0.18, 12, 12]} />
              <meshBasicMaterial color="#00D9FF" />
            </mesh>
          </group>
        ))}
      </group>

      {/* ========================================================= */}
      {/* 2. FOUR HOLOGRAPHIC INNOVATION MONOLITHS                  */}
      {/* Arranged safely along outer deck edges to frame view      */}
      {/* ========================================================= */}
      <InnovationMonolith
        position={[-4.5, 0.1, 14]}
        category="NEXT HORIZON 01"
        title="AI & INTELLIGENCE"
        accentColor="#00D9FF"
        iconType="ai"
      />

      <InnovationMonolith
        position={[4.5, 0.1, 5]}
        category="NEXT HORIZON 02"
        title="CLOUD ARCHITECTURE"
        accentColor="#F59E0B"
        iconType="cloud"
      />

      <InnovationMonolith
        position={[-4.5, 0.1, -6]}
        category="NEXT HORIZON 03"
        title="SYSTEM DESIGN"
        accentColor="#10B981"
        iconType="system"
      />

      <InnovationMonolith
        position={[4.5, 0.1, -16]}
        category="NEXT HORIZON 04"
        title="OPEN SOURCE"
        accentColor="#A855F7"
        iconType="opensource"
      />

      {/* ========================================================= */}
      {/* 3. SEA OF MORNING CLOUDS BENEATH THE SKYBRIDGE            */}
      {/* ========================================================= */}
      <DawnCloudSea />

      {/* Soft Ambient Bridge Runway Lighting */}
      <pointLight position={[0, 3.5, 0]} color="#FEF08A" intensity={1.8} distance={28} />
    </group>
  );
};

export default FutureScene;
