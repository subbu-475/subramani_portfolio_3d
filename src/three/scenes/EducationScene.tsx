import React from 'react';
import { Text } from '@react-three/drei';

export const EducationScene: React.FC = () => {
  return (
    <group position={[0, 0, -45]}>
      {/* Warm Golden Campus Daylight */}
      <directionalLight position={[10, 22, 10]} intensity={1.8} color="#FFF2D6" />
      <pointLight position={[0, 14, -18]} intensity={2.6} color="#FDE047" distance={45} />

      {/* Campus Stone Courtyard Pathway */}
      <mesh position={[0, 0.01, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 30]} />
        <meshStandardMaterial color="#8896A6" roughness={0.7} />
      </mesh>
      {/* Stone Curb Trims */}
      <mesh position={[-5.1, 0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 30]} />
        <meshStandardMaterial color="#556475" roughness={0.8} />
      </mesh>
      <mesh position={[5.1, 0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 30]} />
        <meshStandardMaterial color="#556475" roughness={0.8} />
      </mesh>

      {/* Courtyard Green Lawns */}
      <mesh position={[-18, 0, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial color="#2E6038" roughness={0.9} />
      </mesh>
      <mesh position={[18, 0, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 30]} />
        <meshStandardMaterial color="#2E6038" roughness={0.9} />
      </mesh>

      {/* ========================================================= */}
      {/* 3D CLASSICAL UNIVERSITY ARCHITECTURAL FACADE & CLOCKTOWER */}
      {/* ========================================================= */}
      <group position={[0, 0, -25]}>
        {/* Left Wing */}
        <mesh position={[-15, 6, 0]}>
          <boxGeometry args={[18, 12, 8]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        <mesh position={[-15, 13, 0]}>
          <coneGeometry args={[11, 4.5, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Right Wing */}
        <mesh position={[15, 6, 0]}>
          <boxGeometry args={[18, 12, 8]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        <mesh position={[15, 13, 0]}>
          <coneGeometry args={[11, 4.5, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Central Entrance Pavilion */}
        <mesh position={[0, 7, 2]}>
          <boxGeometry args={[13, 14, 10]} />
          <meshStandardMaterial color="#9C3B2A" roughness={0.7} />
        </mesh>

        {/* Classical Colonnade Sandstone Pillars */}
        {[-4.5, -2.2, 2.2, 4.5].map((px, i) => (
          <mesh key={`edu-pillar-${i}`} position={[px, 4.5, 7.2]}>
            <cylinderGeometry args={[0.35, 0.42, 9, 16]} />
            <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
          </mesh>
        ))}

        {/* Entablature Beam */}
        <mesh position={[0, 9.4, 7.2]}>
          <boxGeometry args={[11, 0.9, 1.4]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>
        {/* Classical Triangular Pediment */}
        <mesh position={[0, 11.4, 7.2]}>
          <coneGeometry args={[6, 3.2, 3]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>

        {/* University Inscription */}
        <Text
          position={[0, 10.2, 7.95]}
          fontSize={0.44}
          color="#1E293B"
          letterSpacing={0.16}
          font={undefined}
        >
          OXFORD ENGINEERING COLLEGE
        </Text>

        {/* Majestic Central Clock Tower */}
        <mesh position={[0, 18, 1]}>
          <boxGeometry args={[5.5, 14, 5.5]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        {/* Clock Tower Balcony */}
        <mesh position={[0, 25.4, 1]}>
          <boxGeometry args={[6.2, 0.9, 6.2]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>
        {/* Spire Roof */}
        <mesh position={[0, 29.5, 1]}>
          <coneGeometry args={[3.2, 8, 8]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.4} />
        </mesh>

        {/* Illuminated Clock Face (Front) */}
        <mesh position={[0, 20, 3.82]}>
          <circleGeometry args={[1.65, 32]} />
          <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={0.9} />
        </mesh>
        {/* Clock Metallic Rim */}
        <mesh position={[0, 20, 3.84]}>
          <ringGeometry args={[1.55, 1.8, 32]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {/* Clock Hands */}
        <mesh position={[0, 20.2, 3.86]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.08, 1.0, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.3, 20, 3.86]} rotation={[0, 0, -1.2]}>
          <boxGeometry args={[0.08, 0.7, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>

        {/* Windows across facade */}
        {[-20, -16, -12, 12, 16, 20].map((wx, idx) => (
          <group key={`win-edu-${idx}`}>
            <mesh position={[wx, 3.5, 4.05]}>
              <planeGeometry args={[1.5, 2.4]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.35} />
            </mesh>
            <mesh position={[wx, 8.5, 4.05]}>
              <planeGeometry args={[1.5, 2.4]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Classical Iron Lampposts with Glowing Lanterns */}
      {[-5, 5].map((lx, i) => (
        <group key={`edu-lamp-${i}`} position={[lx, 0, -8]}>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 3.6, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[0.26, 16, 16]} />
            <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={1.6} />
          </mesh>
          <pointLight position={[0, 3.8, 0]} color="#FEF08A" intensity={1.8} distance={14} />
        </group>
      ))}

      {/* Campus Autumn & Green Trees */}
      {[-8, 8, -12, 12].map((tx, i) => (
        <group key={`c-tree-${i}`} position={[tx, 0, -15 - (i % 2) * 5]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 3.0, 8]} />
            <meshStandardMaterial color="#3B2613" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.2, 0]}>
            <sphereGeometry args={[2.2, 12, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#C2410C' : '#15803D'} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default EducationScene;
