import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Floating Holographic Contact Node Pedestal
 */
const ContactPedestal: React.FC<{
  position: [number, number, number];
  label: string;
  icon: string;
  color: string;
}> = ({ position, label, icon, color }) => {
  const nodeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!nodeRef.current) return;
    const t = state.clock.elapsedTime * 1.5;
    nodeRef.current.position.y = position[1] + Math.sin(t) * 0.08;
    nodeRef.current.rotation.y = t * 0.4;
  });

  return (
    <group position={[position[0], 0, position[2]]}>
      {/* Sleek Dark Titanium Pedestal Column */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.22, 0.32, 1.0, 16]} />
        <meshStandardMaterial color="#0A0F1D" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Illuminated Base Ring */}
      <mesh position={[0, 1.01, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.04, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
      </mesh>

      {/* Floating Holographic Node */}
      <group ref={nodeRef} position={[0, position[1], 0]}>
        <mesh>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.5}
            wireframe
          />
        </mesh>
        <Text
          position={[0, 0.45, 0]}
          fontSize={0.16}
          color="#FFFFFF"
          letterSpacing={0.1}
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.12}
          color={color}
          letterSpacing={0.08}
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </group>
    </group>
  );
};

/**
 * CH 06 — CONTACT: The Sunrise Pavilion & Touchdown Terrace
 * 
 * Replaces the dark outer-space station with a magnificent open-air sunrise terrace
 * at the terminus of the Skybridge overlooking the golden dawn horizon.
 * Features:
 * - Expansive circular glass observation deck
 * - Architectural Walnut/Slate Touchdown Desk (poetically echoing the Chapter 00 launch desk)
 * - Holographic interactive contact beacons
 * - Warm morning sunlight welcoming collaboration
 */
export const ContactScene: React.FC = () => {
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <group position={[-4, 5.8, -405]}>
      {/* ========================================================= */}
      {/* 1. CIRCULAR SUNRISE OBSERVATION TERRACE                    */}
      {/* ========================================================= */}
      <group position={[0, 0, 0]}>
        {/* Terrace Base Concrete & Titanium Plinth */}
        <mesh position={[0, 0.15, 0]} receiveShadow>
          <cylinderGeometry args={[8.8, 9.6, 0.5, 36]} />
          <meshStandardMaterial color="#0A0F1D" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* Frosted Glass Observation Deck Floor */}
        <mesh position={[0, 0.42, 0]} receiveShadow>
          <cylinderGeometry args={[8.6, 8.6, 0.08, 36]} />
          <meshStandardMaterial
            color="#141E33"
            roughness={0.15}
            metalness={0.4}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Radiant Golden Outer Edge Ring */}
        <mesh position={[0, 0.47, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[8.4, 8.6, 36]} />
          <meshStandardMaterial color="#FFC857" emissive="#FFC857" emissiveIntensity={1.8} />
        </mesh>

        {/* Perimeter Glass Balustrade Overlooking Sunrise */}
        <mesh position={[0, 1.05, 0]}>
          <cylinderGeometry args={[8.5, 8.5, 1.1, 36, 1, true]} />
          <meshStandardMaterial
            color="#38BDF8"
            transparent
            opacity={0.3}
            roughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Polished Brass Top Rail */}
        <mesh position={[0, 1.62, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[8.5, 0.04, 12, 36]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Subtle Rotating Geometric Floor Halo */}
        <mesh ref={haloRef} position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.0, 32]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.45} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. ORIGAMI TOUCHDOWN DESK PLATFORM (WP17 Terminus)        */}
      {/* Echoes Chapter 00 launch desk for full-circle completion  */}
      {/* ========================================================= */}
      <group position={[0, 0.46, 0]}>
        {/* Dark Walnut Plinth */}
        <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 0.32, 1.2]} />
          <meshStandardMaterial color="#141822" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Warm Brass Inlay Trim */}
        <mesh position={[0, 0.325, 0]}>
          <boxGeometry args={[1.62, 0.02, 1.22]} />
          <meshStandardMaterial color="#FFC857" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Blueprint Touchdown Platform Sheet */}
        <mesh position={[0, 0.34, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1.3, 0.9]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>

        {/* Luminous Golden Touchdown Target Ring */}
        <mesh position={[0, 0.345, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.22, 0.26, 24]} />
          <meshBasicMaterial color="#FFC857" />
        </mesh>
        <mesh position={[0, 0.345, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.38, 0.40, 24]} />
          <meshBasicMaterial color="#00D9FF" transparent opacity={0.6} />
        </mesh>

        {/* Focused Golden Morning Spotlight on the resting Paper Airplane */}
        <spotLight
          position={[0, 3.2, 0.6]}
          color="#FFFBEB"
          intensity={2.8}
          distance={6.0}
          angle={0.65}
          penumbra={0.7}
        />
      </group>

      {/* ========================================================= */}
      {/* 3. FOUR HOLOGRAPHIC CONTACT PEDESTALS                     */}
      {/* ========================================================= */}
      <ContactPedestal
        position={[-3.8, 1.4, -2.5]}
        label="EMAIL"
        icon="hello@subramani.dev"
        color="#00D9FF"
      />
      <ContactPedestal
        position={[3.8, 1.4, -2.5]}
        label="GITHUB"
        icon="github.com"
        color="#A855F7"
      />
      <ContactPedestal
        position={[-4.2, 1.4, 2.2]}
        label="LINKEDIN"
        icon="connect"
        color="#38BDF8"
      />
      <ContactPedestal
        position={[4.2, 1.4, 2.2]}
        label="RESUME"
        icon="download"
        color="#FFC857"
      />

      {/* Warm Golden Sunrise Terrace Ambient Lighting */}
      <pointLight position={[0, 4.0, 0]} color="#FEF08A" intensity={1.8} distance={24} />
    </group>
  );
};

export default ContactScene;
