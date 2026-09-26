import React from 'react';
import { Text } from '@react-three/drei';

/**
 * CH 01 — EDUCATION: Oxford Engineering College
 * Positioned along the LEFT turn segment at WP3 (-42, 0, -75).
 * The college facade is placed on the LEFT side of the road (negative X),
 * facing +X towards the traveler walking along the pathway.
 */
export const EducationScene: React.FC = () => {
  return (
    <group position={[-42, 0, -75]}>
      {/* Bright Late Morning Sunlight */}
      <directionalLight position={[-15, 25, 10]} intensity={1.8} color="#FFF8DC" />
      <pointLight position={[-14, 15, 0]} intensity={2.4} color="#FEF08A" distance={50} />

      {/* Campus Courtyard Pathway (flanking the road) */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 36]} />
        <meshStandardMaterial color="#64748B" roughness={0.7} />
      </mesh>
      {/* Stone Curb Trims */}
      <mesh position={[-6.1, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 36]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>
      <mesh position={[6.1, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.4, 36]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Courtyard Green Lawns on the RIGHT side of the road */}
      <mesh position={[18, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 36]} />
        <meshStandardMaterial color="#226435" roughness={0.85} />
      </mesh>

      {/* Campus Stone Benches on the Right Lawn */}
      {[ -8, 0, 8 ].map((bz, idx) => (
        <group key={`bench-${idx}`} position={[8.5, 0, bz]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh position={[0, 0.45, 0]}>
            <boxGeometry args={[2.2, 0.12, 0.6]} />
            <meshStandardMaterial color="#CBD5E1" roughness={0.7} />
          </mesh>
          <mesh position={[-0.8, 0.22, 0]}>
            <boxGeometry args={[0.2, 0.45, 0.5]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.8} />
          </mesh>
          <mesh position={[0.8, 0.22, 0]}>
            <boxGeometry args={[0.2, 0.45, 0.5]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ========================================================= */}
      {/* 3D OXFORD ENGINEERING COLLEGE (LEFT SIDE, FACING ROAD)   */}
      {/* ========================================================= */}
      <group position={[-18, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        {/* Left Wing */}
        <mesh position={[-16, 6, 0]}>
          <boxGeometry args={[18, 12, 8]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        <mesh position={[-16, 13, 0]}>
          <coneGeometry args={[11, 4.5, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Right Wing */}
        <mesh position={[16, 6, 0]}>
          <boxGeometry args={[18, 12, 8]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        <mesh position={[16, 13, 0]}>
          <coneGeometry args={[11, 4.5, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Central Entrance Pavilion */}
        <mesh position={[0, 7, 2]}>
          <boxGeometry args={[14, 14, 10]} />
          <meshStandardMaterial color="#9C3B2A" roughness={0.7} />
        </mesh>

        {/* Sandstone Colonnade Pillars */}
        {[-5.0, -2.5, 2.5, 5.0].map((px, i) => (
          <mesh key={`col-pillar-${i}`} position={[px, 4.5, 7.2]}>
            <cylinderGeometry args={[0.38, 0.45, 9, 16]} />
            <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
          </mesh>
        ))}

        {/* Entablature Beam */}
        <mesh position={[0, 9.5, 7.2]}>
          <boxGeometry args={[12, 0.9, 1.4]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>

        {/* Triangular Pediment */}
        <mesh position={[0, 11.6, 7.2]}>
          <coneGeometry args={[6.5, 3.4, 3]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>

        {/* College Name Inscription */}
        <Text
          position={[0, 10.3, 7.95]}
          fontSize={0.44}
          color="#1E293B"
          letterSpacing={0.16}
        >
          OXFORD ENGINEERING COLLEGE
        </Text>

        {/* Degree & Year Subtitle */}
        <Text
          position={[0, 8.8, 7.95]}
          fontSize={0.24}
          color="#8E3525"
          letterSpacing={0.1}
        >
          B.E. COMPUTER SCIENCE & ENGINEERING (2020 - 2024)
        </Text>

        {/* Central Clock Tower */}
        <mesh position={[0, 18, 1]}>
          <boxGeometry args={[6.0, 14, 6.0]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        {/* Balcony */}
        <mesh position={[0, 25.5, 1]}>
          <boxGeometry args={[6.6, 0.9, 6.6]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>
        {/* Spire Roof */}
        <mesh position={[0, 29.8, 1]}>
          <coneGeometry args={[3.4, 8.5, 8]} />
          <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.4} />
        </mesh>

        {/* Illuminated Clock Face */}
        <mesh position={[0, 20, 4.05]}>
          <circleGeometry args={[1.75, 32]} />
          <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[0, 20, 4.07]}>
          <ringGeometry args={[1.65, 1.9, 32]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {/* Clock Hands */}
        <mesh position={[0, 20.2, 4.09]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.08, 1.1, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.3, 20, 4.09]} rotation={[0, 0, -1.2]}>
          <boxGeometry args={[0.08, 0.8, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>

        {/* Windows across facade */}
        {[-21, -17, -13, 13, 17, 21].map((wx, idx) => (
          <group key={`c-win-${idx}`}>
            <mesh position={[wx, 3.5, 4.05]}>
              <planeGeometry args={[1.6, 2.5]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.35} />
            </mesh>
            <mesh position={[wx, 8.5, 4.05]}>
              <planeGeometry args={[1.6, 2.5]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.35} />
            </mesh>
          </group>
        ))}

        {/* Entrance Gate & Arch */}
        <mesh position={[0, 2.5, 7.3]}>
          <boxGeometry args={[4.2, 5.0, 0.3]} />
          <meshStandardMaterial color="#1E293B" metalness={0.9} />
        </mesh>
      </group>

      {/* Classical Iron Lampposts along path */}
      {[-4.5, 4.5].map((lx, i) => (
        <group key={`edu-lamp-${i}`} position={[lx, 0, -10]}>
          <mesh position={[0, 2.0, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 4.0, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
          <mesh position={[0, 4.1, 0]}>
            <sphereGeometry args={[0.28, 16, 16]} />
            <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={1.5} />
          </mesh>
          <pointLight position={[0, 4.1, 0]} color="#FEF08A" intensity={1.8} distance={15} />
        </group>
      ))}

      {/* Campus Trees */}
      {[ -12, 12 ].map((tx, i) => (
        <group key={`campus-tree-${i}`} position={[14, 0, tx]}>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 3.6, 8]} />
            <meshStandardMaterial color="#3B2613" roughness={0.9} />
          </mesh>
          <mesh position={[0, 4.8, 0]}>
            <sphereGeometry args={[2.5, 12, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#15803D' : '#C2410C'} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default EducationScene;
