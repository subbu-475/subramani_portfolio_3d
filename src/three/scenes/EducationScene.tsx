import React from 'react';
import { Float, Text } from '@react-three/drei';

export const EducationScene: React.FC = () => {
  return (
    <group position={[0, 0, -45]}>
      {/* Warm Campus Daylight */}
      <directionalLight position={[10, 20, 10]} intensity={1.8} color="#FFF2D6" />
      <pointLight position={[0, 14, -18]} intensity={2.5} color="#FDE047" distance={40} />

      {/* Campus Courtyard Stone Pathway */}
      <mesh position={[0, 0.01, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 30]} />
        <meshStandardMaterial color="#94A3B8" roughness={0.7} />
      </mesh>
      {/* Stone curb trims */}
      <mesh position={[-4.1, 0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 30]} />
        <meshStandardMaterial color="#64748B" roughness={0.8} />
      </mesh>
      <mesh position={[4.1, 0.05, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 30]} />
        <meshStandardMaterial color="#64748B" roughness={0.8} />
      </mesh>

      {/* Courtyard Green Lawns */}
      <mesh position={[-16, 0, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 30]} />
        <meshStandardMaterial color="#2E6038" roughness={0.9} />
      </mesh>
      <mesh position={[16, 0, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[24, 30]} />
        <meshStandardMaterial color="#2E6038" roughness={0.9} />
      </mesh>

      {/* Main Classical University Facade */}
      <group position={[0, 0, -26]}>
        {/* Main Building Base / Wing Left */}
        <mesh position={[-14, 5, 0]}>
          <boxGeometry args={[16, 10, 8]} />
          <meshStandardMaterial color="#993D2C" roughness={0.7} />
        </mesh>
        {/* Wing Left Roof */}
        <mesh position={[-14, 11, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[10, 4, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Main Building Base / Wing Right */}
        <mesh position={[14, 5, 0]}>
          <boxGeometry args={[16, 10, 8]} />
          <meshStandardMaterial color="#993D2C" roughness={0.7} />
        </mesh>
        {/* Wing Right Roof */}
        <mesh position={[14, 11, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[10, 4, 4]} />
          <meshStandardMaterial color="#1E293B" roughness={0.6} />
        </mesh>

        {/* Central Entrance Pavilion */}
        <mesh position={[0, 6, 2]}>
          <boxGeometry args={[12, 12, 10]} />
          <meshStandardMaterial color="#A84332" roughness={0.7} />
        </mesh>

        {/* Sandstone Pillars / Portico */}
        {[-4, -2, 2, 4].map((px, i) => (
          <mesh key={`pillar-${i}`} position={[px, 4, 7.2]}>
            <cylinderGeometry args={[0.35, 0.4, 8, 16]} />
            <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
          </mesh>
        ))}
        {/* Portico Architrave / Pediment */}
        <mesh position={[0, 8.4, 7.2]}>
          <boxGeometry args={[10, 0.8, 1.2]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>
        {/* Triangular Classical Pediment */}
        <mesh position={[0, 10.2, 7.2]} rotation={[0, 0, 0]}>
          <coneGeometry args={[5.5, 2.8, 3]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>

        {/* UNIVERSITY Inscription */}
        <Text
          position={[0, 9.2, 7.82]}
          fontSize={0.42}
          color="#1E293B"
          letterSpacing={0.15}
          font={undefined}
        >
          OXFORD ENGINEERING COLLEGE
        </Text>

        {/* Grand Clock Tower */}
        <mesh position={[0, 16, 1]}>
          <boxGeometry args={[5, 12, 5]} />
          <meshStandardMaterial color="#8E3525" roughness={0.7} />
        </mesh>
        {/* Clock Tower Top Balcony */}
        <mesh position={[0, 22.4, 1]}>
          <boxGeometry args={[5.6, 0.8, 5.6]} />
          <meshStandardMaterial color="#E2D0B8" roughness={0.6} />
        </mesh>
        {/* Clock Tower Spire */}
        <mesh position={[0, 26, 1]}>
          <coneGeometry args={[3, 7, 8]} />
          <meshStandardMaterial color="#1E293B" roughness={0.5} metalness={0.3} />
        </mesh>

        {/* Illuminated Clock Face (Front) */}
        <mesh position={[0, 18, 3.56]} rotation={[0, 0, 0]}>
          <circleGeometry args={[1.5, 32]} />
          <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={0.8} />
        </mesh>
        {/* Clock Rim */}
        <mesh position={[0, 18, 3.58]}>
          <ringGeometry args={[1.4, 1.6, 32]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} />
        </mesh>
        {/* Clock Hands */}
        <mesh position={[0, 18.2, 3.6]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.08, 0.9, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.25, 18, 3.6]} rotation={[0, 0, -1.2]}>
          <boxGeometry args={[0.08, 0.6, 0.02]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>

        {/* Building Windows */}
        {[-18, -14, -10, 10, 14, 18].map((wx, idx) => (
          <group key={`win-${idx}`}>
            <mesh position={[wx, 3, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.3} roughness={0.2} />
            </mesh>
            <mesh position={[wx, 7, 4.05]}>
              <planeGeometry args={[1.4, 2.2]} />
              <meshStandardMaterial color="#38BDF8" emissive="#0284C7" emissiveIntensity={0.3} roughness={0.2} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Campus Classical Lampposts */}
      {[-5, 5].map((lx, i) => (
        <group key={`lamp-${i}`} position={[lx, 0, -8]}>
          <mesh position={[0, 1.8, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 3.6, 8]} />
            <meshStandardMaterial color="#0F172A" metalness={0.9} />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#FFFBEB" emissive="#FEF08A" emissiveIntensity={1.2} />
          </mesh>
          <pointLight position={[0, 3.8, 0]} color="#FEF08A" intensity={1.5} distance={15} />
        </group>
      ))}

      {/* Campus Deciduous Trees */}
      {[-7, 7, -10, 10].map((tx, i) => (
        <group key={`campus-tree-${i}`} position={[tx, 0, -14 - (i % 2) * 5]}>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.25, 0.35, 2.8, 8]} />
            <meshStandardMaterial color="#3B2613" roughness={0.9} />
          </mesh>
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[2.0, 12, 12]} />
            <meshStandardMaterial color={i % 2 === 0 ? '#C2410C' : '#15803D'} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default EducationScene;
