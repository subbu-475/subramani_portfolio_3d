import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

const Camera: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;
    
    // progress is 0 to 1, spread over 8 chapters (index 0 to 7)
    // max distance is -280.
    const targetZ = -280 * journeyProgress;
    
    // Smoothly interpolate camera position
    cameraRef.current.position.z = THREE.MathUtils.lerp(
      cameraRef.current.position.z,
      targetZ,
      delta * 5
    );
    
    // Slight side to side movement based on time for cinematic feel
    cameraRef.current.position.x = THREE.MathUtils.lerp(
      cameraRef.current.position.x,
      Math.sin(state.clock.elapsedTime * 0.5) * 2,
      delta * 2
    );
    
    cameraRef.current.position.y = THREE.MathUtils.lerp(
      cameraRef.current.position.y,
      Math.cos(state.clock.elapsedTime * 0.3) * 1 + 2, // Base height is 2
      delta * 2
    );
    
    cameraRef.current.lookAt(
      cameraRef.current.position.x, 
      0, 
      cameraRef.current.position.z - 20
    );
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2, 10]}
      fov={60}
      near={0.1}
      far={1000}
    />
  );
};

export default Camera;
