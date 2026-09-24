import React from 'react';
import { experiences } from '../../data/experience';

export const PresentScene: React.FC = () => {
  return (
    <group position={[0, 0, -270]}>
      {/* Observation Terrace / Sky-Bridge Balcony (Matching Reference Panel 9) */}
      <group position={[0, 0, -8]}>
        {/* Balcony Floor Plate */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 16]} />
          <meshStandardMaterial color="#0F172A" roughness={0.3} metalness={0.7} />
        </mesh>
        {/* Glowing Deck Line */}
        <mesh position={[0, 0.12, 6]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[18, 0.15]} />
          <meshBasicMaterial color="#00F0FF" />
        </mesh>

        {/* Modern Glass Railing Overlook */}
        <group position={[0, 1.2, 7.8]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[18, 1.8, 0.08]} />
            <meshPhysicalMaterial
              color="#38BDF8"
              transparent
              opacity={0.35}
              roughness={0.1}
              transmission={0.8}
            />
          </mesh>
          {/* Top Handrail */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 18, 16]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#334155" metalness={0.9} />
          </mesh>
        </group>

        {/* Balcony Architectural Posts */}
        {[-8, -4, 0, 4, 8].map((px, i) => (
          <mesh key={`b-post-${i}`} position={[px, 1.0, 7.8]}>
            <cylinderGeometry args={[0.06, 0.06, 2.0, 8]} />
            <meshStandardMaterial color="#64748B" metalness={0.9} />
          </mesh>
        ))}
      </group>

      {/* Futuristic Skyline Vista at Twilight */}
      {/* Golden Dusk Horizon Sky Glow */}
      <mesh position={[0, 12, -45]}>
        <planeGeometry args={[100, 30]} />
        <meshBasicMaterial color="#312E81" />
      </mesh>
      <mesh position={[0, 6, -44.8]}>
        <planeGeometry args={[100, 16]} />
        <meshBasicMaterial color="#EA580C" transparent opacity={0.4} />
      </mesh>

      {/* Crystalline Futuristic Towers in Vista */}
      {[
        [-18, 14, -36, 6, 28, 6, '#0284C7'],
        [-10, 18, -42, 5, 36, 5, '#06B6D4'],
        [-2, 22, -46, 7, 44, 7, '#3B82F6'],
        [7, 16, -40, 6, 32, 6, '#0284C7'],
        [16, 20, -44, 7, 40, 7, '#06B6D4'],
        [24, 12, -38, 5, 24, 5, '#3B82F6'],
      ].map(([x, y, z, w, h, d, glowColor], i) => (
        <group key={`vista-tower-${i}`} position={[x as number, y as number, z as number]}>
          <mesh>
            <boxGeometry args={[w as number, h as number, d as number]} />
            <meshStandardMaterial color="#0B132B" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Vertical light stripes */}
          <mesh position={[0, 0, (d as number) / 2 + 0.05]}>
            <planeGeometry args={[0.4, (h as number) * 0.8]} />
            <meshBasicMaterial color={glowColor as string} />
          </mesh>
        </group>
      ))}

      {/* Suspended Sky-Bridges between Towers */}
      <mesh position={[-6, 15, -44]}>
        <boxGeometry args={[10, 0.8, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
      <mesh position={[11, 14, -42]}>
        <boxGeometry args={[10, 0.8, 1.2]} />
        <meshStandardMaterial color="#1E293B" metalness={0.8} />
      </mesh>
    </group>
  );
};

export default PresentScene;
