import React from 'react';
import { Float } from '@react-three/drei';

const EducationScene: React.FC = () => {
  return (
    <group position={[0, 0, -40]}>
      {/* Main Building */}
      <group position={[0, 2.5, -5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[10, 5, 8]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[6, 2, 4]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        {/* Windows */}
        {[...Array(8)].map((_, i) => (
          <mesh key={`window-${i}`} position={[(i % 4) * 2 - 3, 0.5, 4.01]}>
            <planeGeometry args={[1, 2]} />
            <meshBasicMaterial color="#06B6D4" />
          </mesh>
        ))}
      </group>

      {/* Entrance Gate */}
      <group position={[0, 2, 2]}>
        <mesh position={[-3, 0, 0]}>
          <boxGeometry args={[0.5, 4, 0.5]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[3, 0, 0]}>
          <boxGeometry args={[0.5, 4, 0.5]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[0, 2.25, 0]}>
          <boxGeometry args={[6.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
      </group>

      {/* Trees along pathway */}
      {[...Array(4)].map((_, i) => {
        const x = i % 2 === 0 ? -4 : 4;
        const z = i * 2;
        return (
          <group key={`ed-tree-${i}`} position={[x, 0.5, z]}>
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 1]} />
              <meshStandardMaterial color="#0B0D10" />
            </mesh>
            <mesh position={[0, 1, 0]}>
              <sphereGeometry args={[1, 8, 8]} />
              <meshStandardMaterial color="#06B6D4" wireframe />
            </mesh>
          </group>
        );
      })}

      {/* Books Stack */}
      <group position={[-5, 0.5, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0.2, 0]}>
          <boxGeometry args={[1.5, 0.2, 2]} />
          <meshStandardMaterial color="#3B82F6" />
        </mesh>
        <mesh position={[0, 0.2, 0]} rotation={[0, -0.1, 0]}>
          <boxGeometry args={[1.4, 0.3, 1.8]} />
          <meshStandardMaterial color="#06B6D4" />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[0, 0.3, 0]}>
          <boxGeometry args={[1.2, 0.25, 1.6]} />
          <meshStandardMaterial color="#F97316" />
        </mesh>
      </group>

      {/* Desk and Laptop */}
      <group position={[5, 1, 0]}>
        <mesh position={[0, -0.4, 0]}>
          <boxGeometry args={[3, 0.1, 2]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        <group position={[0, 0, 0]}>
          <mesh position={[0, -0.05, 0.5]} rotation={[-0.1, 0, 0]}>
            <boxGeometry args={[1, 0.05, 0.8]} />
            <meshStandardMaterial color="#0B0D10" />
          </mesh>
          <mesh position={[0, 0.3, 0.1]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[1, 0.8, 0.05]} />
            <meshStandardMaterial color="#0B0D10" />
          </mesh>
          <mesh position={[0, 0.3, 0.13]} rotation={[-0.4, 0, 0]}>
            <planeGeometry args={[0.9, 0.7]} />
            <meshBasicMaterial color="#06B6D4" />
          </mesh>
        </group>
      </group>

      {/* Notice Board */}
      <group position={[-6, 2, 4]}>
        <mesh position={[0, -1, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 1.5, 0.1]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[1.8, 1.3]} />
          <meshBasicMaterial color="#F8FAFC" transparent opacity={0.1} />
        </mesh>
      </group>
    </group>
  );
};

export default EducationScene;
