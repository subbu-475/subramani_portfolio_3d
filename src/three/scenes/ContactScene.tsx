import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

const ContactScene: React.FC = () => {
  const portalRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.z = state.clock.elapsedTime * -0.1;
    }
  });

  return (
    <group position={[0, 0, -280]}>
      {/* Landing Platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[8, 8, 0.5, 32]} />
        <meshStandardMaterial color="#11151A" />
      </mesh>
      
      {/* Platform inner ring */}
      <mesh position={[0, 0.26, 0]}>
        <cylinderGeometry args={[6, 6, 0.1, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>

      {/* Light Pillars */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <group key={`pillar-${i}`} position={[Math.cos(angle) * 7, 2, Math.sin(angle) * 7]}>
            <mesh>
              <cylinderGeometry args={[0.2, 0.2, 4]} />
              <meshStandardMaterial color="#0B0D10" />
            </mesh>
            <mesh position={[0, 2, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#06B6D4" />
            </mesh>
          </group>
        );
      })}

      {/* Portal Ring */}
      <group position={[0, 8, -5]}>
        <mesh ref={portalRef}>
          <torusGeometry args={[5, 0.5, 16, 64]} />
          <meshBasicMaterial color="#F97316" />
        </mesh>
        
        {/* Portal ambient particles */}
        <group ref={particlesRef}>
          {[...Array(20)].map((_, i) => {
            const angle = Math.random() * Math.PI * 2;
            const r = 4 + Math.random() * 2;
            return (
              <mesh
                key={`port-part-${i}`}
                position={[Math.cos(angle) * r, Math.sin(angle) * r, (Math.random() - 0.5) * 2]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#06B6D4" />
              </mesh>
            );
          })}
        </group>
      </group>

      {/* Small Spacecraft */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, 3, 0]} rotation={[0.2, Math.PI, 0]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1, 1.5, 3]} />
            <meshStandardMaterial color="#0B0D10" />
          </mesh>
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[1, 2, 16]} />
            <meshStandardMaterial color="#0B0D10" />
          </mesh>
          <mesh position={[0, -1.6, 0]}>
            <cylinderGeometry args={[1.2, 0.8, 0.5]} />
            <meshBasicMaterial color="#06B6D4" />
          </mesh>
        </group>
      </Float>

      {/* Next Destination Text */}
      <Text
        position={[0, 15, -5]}
        fontSize={1}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        NEXT DESTINATION
      </Text>
    </group>
  );
};

export default ContactScene;
