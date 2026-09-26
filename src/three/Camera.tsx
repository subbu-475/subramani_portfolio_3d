import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getAirplaneFlightTransform, getJourneyNormal, getJourneyTangent } from './JourneyPath';
import { getChapterByProgress } from '../data/journey';

export const Camera: React.FC = () => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);
  const isMobile = useJourneyStore((state) => state.isMobile);
  const selectedSkillCategoryIndex = useJourneyStore((state) => state.selectedSkillCategoryIndex);

  const currentCamPos = useRef(new THREE.Vector3(0, 1.3, 3.8));
  const currentLookTarget = useRef(new THREE.Vector3(0, 1.1, -12));
  const currentRoll = useRef(0);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Get current paper airplane flight transform
    const airplaneTransform = getAirplaneFlightTransform(journeyProgress, state.clock.elapsedTime);
    const airplanePos = airplaneTransform.pos;
    const tangent = getJourneyTangent(journeyProgress).normalize();
    const normal = getJourneyNormal(journeyProgress);
    const up = new THREE.Vector3(0, 1, 0);

    // Get camera config for the current chapter
    const chapterData = getChapterByProgress(journeyProgress);

    // Smooth transition from Home Desk establishing shot to Airborne Chase Camera
    let effectiveCamX: number;
    let effectiveCamY: number;
    let effectiveCamZ: number;
    let effectiveLookX: number;
    let effectiveLookY: number;
    let effectiveForwardDist: number;

    if (journeyProgress < 0.08) {
      const t = THREE.MathUtils.clamp(journeyProgress / 0.06, 0, 1);
      // Desk shot: framing airplane and desk on right-center, 100% fully visible
      effectiveCamX = THREE.MathUtils.lerp(-1.3, isMobile ? 0 : -0.2, t);
      effectiveCamY = THREE.MathUtils.lerp(0.95, 1.25, t);
      effectiveCamZ = THREE.MathUtils.lerp(3.6, 4.6, t);
      effectiveLookX = THREE.MathUtils.lerp(0.35, 0, t);
      effectiveLookY = THREE.MathUtils.lerp(0.12, 0.25, t);
      effectiveForwardDist = THREE.MathUtils.lerp(2.2, 5.0, t);
    } else {
      // Airborne third-person follow mode
      effectiveCamX = isMobile ? 0 : -0.2;
      effectiveCamY = 1.25;
      effectiveCamZ = 4.6;
      effectiveLookX = (chapterData.landmarkSide === 'left' ? -0.35 : chapterData.landmarkSide === 'right' ? 0.35 : 0);
      effectiveLookY = 0.25;
      effectiveForwardDist = 5.2;

      // In Chapter 04 (Projects / Project Express Railway Station):
      // Wide establishing shot on entry, platform & train tracking, and selected compartment framing
      if (journeyProgress >= 0.45 && journeyProgress <= 0.56) {
        if (journeyProgress <= 0.49) {
          // Approaching station: wide establishing view of the railway canopy
          const t = (journeyProgress - 0.45) / 0.04;
          effectiveCamZ = THREE.MathUtils.lerp(4.6, 5.8, t);
          effectiveCamY = THREE.MathUtils.lerp(1.25, 1.65, t);
          effectiveForwardDist = THREE.MathUtils.lerp(5.2, 6.2, t);
        } else if (journeyProgress <= 0.54) {
          // Tracking along platform: cinematic close framing on active compartment
          const t = Math.sin(((journeyProgress - 0.49) / 0.05) * Math.PI);
          effectiveCamZ = THREE.MathUtils.lerp(4.6, isMobile ? 4.8 : 3.9, t);
          effectiveCamY = THREE.MathUtils.lerp(1.25, 1.15, t);
          effectiveLookX += (isMobile ? 0.2 : 0.48); // Look towards train & platform on right
          effectiveLookY = THREE.MathUtils.lerp(0.25, 0.22, t);
        } else {
          // Departing station: pulls back as airplane accelerates ahead of the train
          const t = (journeyProgress - 0.54) / 0.02;
          effectiveCamZ = THREE.MathUtils.lerp(4.6, 5.4, t);
          effectiveCamY = THREE.MathUtils.lerp(1.25, 1.55, t);
        }
      }

      // In Chapter 06 (Technology Lab), smoothly sweep camera focus across active stations
      if (journeyProgress >= 0.56 && journeyProgress <= 0.68) {
        const stationShift = (selectedSkillCategoryIndex - 1.5) * 0.35;
        effectiveLookX += stationShift;
        effectiveCamX += stationShift * 0.18;
      }
    }

    // Compute camera target position in world space:
    // Follows behind and slightly above the Paper Airplane's actual flight altitude
    const targetCamPos = airplanePos.clone()
      .addScaledVector(normal, effectiveCamX)
      .addScaledVector(up, effectiveCamY)
      .addScaledVector(tangent, -effectiveCamZ * (isMobile ? 1.2 : 1.0));

    // Subtle cinematic breathing / steadycam micro-sway
    const swayX = Math.sin(state.clock.elapsedTime * 0.3) * 0.015;
    const swayY = Math.cos(state.clock.elapsedTime * 0.2) * 0.01;
    targetCamPos.x += swayX;
    targetCamPos.y += swayY;

    // Compute camera look target in world space (aimed through and slightly ahead of the airplane)
    const targetLook = airplanePos.clone()
      .addScaledVector(normal, isMobile ? 0 : effectiveLookX)
      .addScaledVector(up, effectiveLookY)
      .addScaledVector(tangent, effectiveForwardDist);

    // Smooth cinematic lerp (damping)
    const lerpSpeed = Math.min(1, delta * 3.6);
    currentCamPos.current.lerp(targetCamPos, lerpSpeed);
    currentLookTarget.current.lerp(targetLook, Math.min(1, delta * 4.4));

    cameraRef.current.position.copy(currentCamPos.current);
    cameraRef.current.lookAt(currentLookTarget.current);

    // Subtle cinematic camera banking into turns matching airplane roll
    const targetRoll = airplaneTransform.roll * 0.22;
    currentRoll.current = THREE.MathUtils.lerp(currentRoll.current, targetRoll, delta * 4.0);
    cameraRef.current.rotateZ(currentRoll.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[-1.4, 1.4, 4.0]}
      fov={isMobile ? 54 : 46}
      near={0.1}
      far={1200}
    />
  );
};

export default Camera;
