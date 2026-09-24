import React from 'react';
import { Text } from '@react-three/drei';
import { experiences } from '../../data/experience';

const CareerScene: React.FC = () => {
  return (
    <group position={[0, 0, -120]}>
      {/* Glow Road */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2, 30]} />
        <meshBasicMaterial color="#06B6D4" transparent opacity={0.2} />
      </mesh>

      {/* KO Innovation (Tallest) */}
      <group position={[-4, 4, 0]}>
        <mesh>
          <boxGeometry args={[3, 8, 3]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        {[...Array(6)].map((_, i) => (
          <mesh key={`ko-win-${i}`} position={[0, i - 2, 1.51]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#06B6D4" />
          </mesh>
        ))}
        <Text
          position={[0, 4.5, 0]}
          fontSize={0.5}
          color="#06B6D4"
          anchorX="center"
          anchorY="middle"
        >
          {experiences[0]?.company || 'KO Innovation'}
        </Text>
      </group>

      {/* Freelance (Medium) */}
      <group position={[4, 3, -5]}>
        <mesh>
          <boxGeometry args={[3, 6, 3]} />
          <meshStandardMaterial color="#0B0D10" />
        </mesh>
        {[...Array(4)].map((_, i) => (
          <mesh key={`fr-win-${i}`} position={[0, i - 1, 1.51]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#F97316" />
          </mesh>
        ))}
        <Text
          position={[0, 3.5, 0]}
          fontSize={0.5}
          color="#F97316"
          anchorX="center"
          anchorY="middle"
        >
          {experiences[1]?.company || 'Freelance'}
        </Text>
      </group>

      {/* Hilife.Ai (Shorter) */}
      <group position={[-5, 2, -10]}>
        <mesh>
          <boxGeometry args={[3, 4, 3]} />
          <meshStandardMaterial color="#11151A" />
        </mesh>
        {[...Array(3)].map((_, i) => (
          <mesh key={`hi-win-${i}`} position={[0, i - 0.5, 1.51]}>
            <planeGeometry args={[2, 0.5]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>
        ))}
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.5}
          color="#3B82F6"
          anchorX="center"
          anchorY="middle"
        >
          {experiences[2]?.company || 'Hilife.Ai'}
        </Text>
      </group>

      {/* Street Lights */}
      {[...Array(4)].map((_, i) => (
        <group key={`light-${i}`} position={[i % 2 === 0 ? -1.5 : 1.5, 0, (i * -4)]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3]} />
            <meshStandardMaterial color="#0B0D10" />
          </mesh>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[0.2, 8, 8]} />
            <meshBasicMaterial color="#F8FAFC" />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default CareerScene;
