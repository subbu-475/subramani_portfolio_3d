import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getJourneyPosition, getJourneyTangent, getJourneyNormal } from './JourneyPath';
import { getChapterByProgress } from '../data/journey';

export const Camera: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const isMobile = useJourneyStore((state) => state.isMobile);

  const currentCamPos = useRef(new THREE.Vector3(0, 2.0, 7.5));
  const currentLookTarget = useRef(new THREE.Vector3(0, 1.2, -15));

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Get current character position & stable perpendicular normal from spline
    const travelerPos = getJourneyPosition(journeyProgress);
    const tangent = getJourneyTangent(journeyProgress).normalize();
    const normal = getJourneyNormal(journeyProgress); // handles vertical tangent
    const up = new THREE.Vector3(0, 1, 0);

    // Get camera config for the current chapter
    const chapterData = getChapterByProgress(journeyProgress);
    const [camX, camY, camZ] = chapterData.cameraOffset;
    const [lookX, lookY, lookZ] = chapterData.lookOffset;

    // Mobile aspect ratio distance modifier
    const distanceMult = isMobile ? 1.3 : 1.0;
    const lateralShift = isMobile ? camX * 0.4 : camX;

    // Compute camera target position in world space:
    // travelerPos + (normal * lateral) + (up * height) + (tangent * -distance)
    const targetCamPos = travelerPos.clone()
      .addScaledVector(normal, lateralShift)
      .addScaledVector(up, camY)
      .addScaledVector(tangent, -camZ * distanceMult);

    // Subtle cinematic breathing / steadycam micro-sway
    const swayX = Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
    const swayY = Math.cos(state.clock.elapsedTime * 0.25) * 0.025;
    targetCamPos.x += swayX;
    targetCamPos.y += swayY;

    // Compute camera look target in world space
    const forwardDist = Math.abs(lookZ);
    const targetLook = travelerPos.clone()
      .addScaledVector(normal, lookX)
      .addScaledVector(up, lookY)
      .addScaledVector(tangent, forwardDist);

    // Smooth cinematic lerp (damping) — slightly slower for dramatic turns
    const lerpSpeed = Math.min(1, delta * 3.2);
    currentCamPos.current.lerp(targetCamPos, lerpSpeed);
    currentLookTarget.current.lerp(targetLook, Math.min(1, delta * 4.0));

    cameraRef.current.position.copy(currentCamPos.current);
    cameraRef.current.lookAt(currentLookTarget.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.0, 7.5]}
      fov={isMobile ? 58 : 50}
      near={0.1}
      far={1200}
    />
  );
};

export default Camera;
