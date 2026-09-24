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

    // Camera travels along Z from +3.2 down to -356.8
    const targetZ = -360 * journeyProgress + 3.2;

    // Smoothly interpolate camera position along Z
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      delta * 4.5
    );

    // Subtle natural breathing / cinematic sway
    const swayAmount = qualityLevel === 'low' ? 0.08 : 0.15;
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.35) * swayAmount,
      delta * 2
    );

    // Camera height placed at eye/shoulder level (1.75m)
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      Math.cos(state.clock.elapsedTime * 0.25) * 0.06 + 1.75,
      delta * 2.5
    );

    // Look slightly ahead of character toward trail horizon (look target Y = 1.15)
    cameraRef.current.lookAt(
      cameraRef.current.position.x * 0.2,
      1.15,
      cameraRef.current.position.z - 14
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 1.75, 8]}
      fov={52}
      near={0.1}
      far={1200}
    />
  );
};

export default Camera;
