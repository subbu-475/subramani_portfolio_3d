import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const ContactScene: React.FC = () => {
  const beaconRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (beaconRef.current) {
      // Blinking aviation beacon light
      beaconRef.current.intensity = Math.sin(state.clock.elapsedTime * 5) > 0.4 ? 2.5 : 0.2;
    }
  });

  return (
    <group position={[0, 0, -360]}>
      {/* Tarmac Runway Ground */}
      <mesh position={[0, 0.01, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial color="#0A0E17" roughness={0.6} />
      </mesh>
      {/* Runway Centerline Markings */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={`runway-stripe-${i}`}
          position={[0, 0.03, -3 - i * 6]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[0.5, 3.5]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      ))}
      {/* Runway Edge Blue & Amber Taxi Lights */}
      {[-12, 12].map((lx, side) => (
        <group key={`runway-lights-${side}`}>
          {[-4, -12, -20, -28].map((lz, idx) => (
            <mesh key={`rl-${idx}`} position={[lx, 0.15, lz]}>
              <cylinderGeometry args={[0.08, 0.12, 0.3, 8]} />
              <meshBasicMaterial color={idx % 2 === 0 ? '#38BDF8' : '#F59E0B'} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Modern Airport / Spaceport Terminal Building (Matching Reference Panel 11) */}
      <group position={[10, 0, -24]}>
        {/* Curved Terminal Canopy / Hangar */}
        <mesh position={[0, 7.5, 0]}>
          <boxGeometry args={[16, 12, 22]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Illuminated Sign: NEXT DESTINATION (Matching Reference Panel 11) */}
        <group position={[-8.1, 9, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[9, 1.8, 0.2]} />
            <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.8} />
          </mesh>
          <Text
            position={[0, 0, 0.15]}
            fontSize={0.65}
            color="#FFFFFF"
            letterSpacing={0.15}
            font={undefined}
          >
            NEXT DESTINATION
          </Text>
        </group>

        {/* Terminal Panoramic Glass Windows */}
        <mesh position={[-8.05, 4.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[18, 6]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Airliner / Passenger Shuttle Aircraft on Runway (Matching Reference Panel 11) */}
      <group position={[-7, 0, -22]} rotation={[0, 0.25, 0]}>
        {/* Fuselage */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[1.2, 1.3, 16, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Nose Cone */}
        <mesh position={[0, 2.2, 9]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.2, 2.4, 16]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.3} />
        </mesh>
        {/* Cockpit Glass */}
        <mesh position={[0, 2.7, 8.2]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[1.4, 0.5, 0.8]} />
          <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Main Wings */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[16, 0.15, 3.2]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>
        {/* Jet Engines */}
        {[-3.5, 3.5].map((ex, i) => (
          <mesh key={`engine-${i}`} position={[ex, 1.1, -0.5]}>
            <cylinderGeometry args={[0.55, 0.55, 2.8, 16]} rotation={[Math.PI / 2, 0, 0]} />
            <meshStandardMaterial color="#94A3B8" metalness={0.8} />
          </mesh>
        ))}
        {/* Tail Fin */}
        <mesh position={[0, 4.2, -6.8]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.2, 3.2, 2.2]} />
          <meshStandardMaterial color="#0284C7" />
        </mesh>
        {/* Red Aviation Warning Beacon on Tail */}
        <mesh position={[0, 5.8, -7.2]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#EF4444" />
        </mesh>
        <pointLight ref={beaconRef} position={[0, 5.8, -7.2]} color="#EF4444" distance={15} />
      </group>

      {/* Golden Sunset Sky Backdrop for Terminal */}
      <directionalLight position={[-15, 12, -40]} color="#F97316" intensity={2.2} />
      <pointLight position={[10, 8, -20]} color="#38BDF8" intensity={1.8} distance={20} />
    </group>
  );
};

export default ContactScene;
