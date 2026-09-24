import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

const Camera: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Total distance across 9 chapters is 360 units
    const targetZ = -360 * journeyProgress + 4;

    // Smoothly interpolate camera position along Z
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle natural breathing / cinematic sway
    const swayAmount = qualityLevel === 'low' ? 0.3 : 0.8;
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.35) * swayAmount,
      delta * 2
    );

    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      Math.cos(state.clock.elapsedTime * 0.25) * 0.3 + 2.3, // Third person height
      delta * 2.5
    );

    // Look slightly ahead of character toward horizon
    cameraRef.current.lookAt(
      cameraRef.current.position.x * 0.3,
      1.8,
      cameraRef.current.position.z - 18
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.3, 10]}
      fov={55}
      near={0.1}
      far={1200}
    />
  );
};

export default Camera;
