import React from 'react';
import { Text } from '@react-three/drei';

/**
 * CH 06 — WHERE I AM TODAY: Neon Corporate Night City Balcony
 * Positioned along the RIGHT turn segment at WP13 (-8, 0.8, -315).
 * The observation terrace is on the RIGHT side of the road (positive X),
 * looking out over the illuminated corporate city skyline at night.
 */
export const PresentScene: React.FC = () => {
  return (
    <group position={[-8, 0.8, -315]}>
      {/* ========================================================= */}
      {/* 3D OBSERVATION TERRACE & BALCONY (RIGHT SIDE, FACING ROAD) */}
      {/* ========================================================= */}
      <group position={[14, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Balcony Floor Plate */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Glowing Deck Strip */}
        <mesh position={[0, 0.12, 6.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[20, 0.15]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Modern Glass Railing Overlook */}
        <group position={[0, 1.2, 7.8]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[20, 1.8, 0.08]} />
            <meshStandardMaterial
              color="#38BDF8"
              transparent
              opacity={0.35}
              roughness={0.1}
            />
          </mesh>
          {/* Top Handrail */}
          <mesh position={[0, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.08, 0.08, 20, 16]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        </group>

        {/* Architectural Posts */}
        {[-9, -4.5, 0, 4.5, 9].map((px, i) => (
          <mesh key={`b-post-${i}`} position={[px, 1.0, 7.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2.0, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
        ))}

        {/* Current Role Holographic Display */}
        <group position={[0, 3.8, 7.5]}>
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[7.2, 1.8, 0.15]} />
            <meshStandardMaterial color="#0B132B" metalness={0.9} />
          </mesh>
          <Text
            position={[0, 0.4, 0.02]}
            fontSize={0.35}
            color="#00F0FF"
            letterSpacing={0.1}
          >
            WHERE I AM TODAY
          </Text>
          <Text
            position={[0, -0.1, 0.02]}
            fontSize={0.24}
            color="#FEF08A"
            letterSpacing={0.06}
          >
            ASSOCIATE SOFTWARE DEVELOPER
          </Text>
          <Text
            position={[0, -0.5, 0.02]}
            fontSize={0.19}
            color="#94A3B8"
          >
            KO Innovation Software Solutions
          </Text>
          <pointLight position={[0, 0, 0.5]} color="#00F0FF" intensity={1.8} distance={8} />
        </group>

        {/* Distant Night City Corporate Skyline Vista */}
        <group position={[0, 0, 18]}>
          {[
            [-22, 16, 12, 8, 32, 8, '#0284C7'],
            [-12, 22, 16, 7, 44, 7, '#06B6D4'],
            [-2, 28, 20, 9, 56, 9, '#3B82F6'],
            [9, 20, 15, 8, 40, 8, '#0284C7'],
            [20, 25, 18, 9, 50, 9, '#06B6D4'],
            [30, 15, 12, 7, 30, 7, '#3B82F6'],
          ].map(([x, y, z, w, h, d, glowColor], i) => (
            <group key={`night-tower-${i}`} position={[x as number, y as number, z as number]}>
              <mesh>
                <boxGeometry args={[w as number, h as number, d as number]} />
                <meshStandardMaterial color="#0B132B" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Window Grids */}
              {[...Array(8)].map((_, r) => (
                <mesh key={`win-${i}-${r}`} position={[0, -10 + r * 3.2, (d as number) / 2 + 0.05]}>
                  <planeGeometry args={[(w as number) * 0.8, 1.2]} />
                  <meshStandardMaterial
                    color={glowColor as string}
                    emissive={glowColor as string}
                    emissiveIntensity={0.6}
                  />
                </mesh>
              ))}
              {/* Vertical neon accent stripe */}
              <mesh position={[0, 0, (d as number) / 2 + 0.08]}>
                <planeGeometry args={[0.3, (h as number) * 0.85]} />
                <meshBasicMaterial color={glowColor as string} />
              </mesh>
            </group>
          ))}

          {/* Suspended Sky-Bridges */}
          <mesh position={[-7, 18, 18]}>
            <boxGeometry args={[12, 1.0, 1.5]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
          <mesh position={[14, 17, 16]}>
            <boxGeometry args={[12, 1.0, 1.5]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

export default PresentScene;
