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

      // In Chapter 04 (Projects / Vande Bharat Express at Railway Gate):
      // Fly-over framing: elevated camera showing the paper airplane climbing up and crossing cleanly above the moving train
      if (journeyProgress >= 0.45 && journeyProgress <= 0.56) {
        if (journeyProgress <= 0.49) {
          // Approaching railway gate: wide establishing view of the crossing and approaching train
          const t = (journeyProgress - 0.45) / 0.04;
          effectiveCamZ = THREE.MathUtils.lerp(4.6, 5.5, t);
          effectiveCamY = THREE.MathUtils.lerp(1.25, 1.75, t);
          effectiveForwardDist = THREE.MathUtils.lerp(5.2, 6.2, t);
        } else if (journeyProgress <= 0.535) {
          // High fly-over: camera follows slightly elevated, looking slightly down over the airplane and the passing train
          const t = Math.sin(((journeyProgress - 0.49) / 0.045) * Math.PI);
          effectiveCamZ = THREE.MathUtils.lerp(4.6, isMobile ? 5.0 : 4.4, t);
          effectiveCamY = THREE.MathUtils.lerp(1.25, 1.85, t);
          effectiveLookX += (isMobile ? 0.15 : 0.35); // Look towards train passing across
          effectiveLookY = THREE.MathUtils.lerp(0.25, -0.15, t); // Look slightly downward at train & tracks
          effectiveForwardDist = 5.6;
        } else {
          // Gliding down past exit gate: smoothly restores standard chase camera
          const t = (journeyProgress - 0.535) / 0.025;
          effectiveCamZ = THREE.MathUtils.lerp(5.0, 4.6, t);
          effectiveCamY = THREE.MathUtils.lerp(1.75, 1.25, t);
        }
      }

      // In Chapter 05 (Technology Multi-Tier Cubes)
      if (journeyProgress >= 0.56 && journeyProgress <= 0.68) {
        effectiveCamZ = 4.8;
        effectiveCamY = 1.35;
        effectiveForwardDist = 5.2;
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

    // In Chapter 05 (Technology Showcase):
    // Dedicated straight-on framing directly facing the skills rack,
    // with the road curving in front and the paper airplane visibly flying along the path:
    if (journeyProgress >= 0.58 && journeyProgress <= 0.68) {
      const rackPos = new THREE.Vector3(-45.5, 0.2, -259.5);
      const rackYaw = 1.426;
      const forward = new THREE.Vector3(Math.sin(rackYaw), 0, Math.cos(rackYaw));
      const right = new THREE.Vector3(Math.cos(rackYaw), 0, -Math.sin(rackYaw));

      // Camera position: in front of rack (forward * 15.2), shifted right (right * 3.4) so rack sits straight-on in left 60%, elevated (up * 3.2)
      const showcaseCamPos = rackPos.clone()
        .addScaledVector(forward, isMobile ? 22.0 : 15.2)
        .addScaledVector(right, isMobile ? 0.8 : 3.4)
        .addScaledVector(up, isMobile ? 3.8 : 3.2);

      const showcaseLookTarget = rackPos.clone()
        .addScaledVector(right, isMobile ? 0.0 : 3.4)
        .addScaledVector(up, 2.7);

      // Smoothly blend in as plane approaches the curve (0.60 -> 0.63) and blend out as it leaves (0.655 -> 0.675)
      let blendFactor = 1.0;
      if (journeyProgress < 0.63) {
        blendFactor = (journeyProgress - 0.60) / 0.03;
      } else if (journeyProgress > 0.655) {
        blendFactor = (0.675 - journeyProgress) / 0.02;
      }
      blendFactor = THREE.MathUtils.clamp(blendFactor, 0, 1);
      const smoothBlend = THREE.MathUtils.smoothstep(blendFactor, 0, 1);

      targetCamPos.lerp(showcaseCamPos, smoothBlend);
      targetLook.lerp(showcaseLookTarget, smoothBlend);
    }

    // Smooth cinematic lerp (damping)
    const lerpSpeed = Math.min(1, delta * 3.6);
    currentCamPos.current.lerp(targetCamPos, lerpSpeed);
    currentLookTarget.current.lerp(targetLook, Math.min(1, delta * 4.4));

    cameraRef.current.position.copy(currentCamPos.current);
    cameraRef.current.lookAt(currentLookTarget.current);

    // Keep camera horizon perfectly flat and level in Chapter 05 showcase for straight-on viewing
    const inSkillsShowcase = journeyProgress >= 0.60 && journeyProgress <= 0.665;
    const targetRoll = inSkillsShowcase ? 0 : airplaneTransform.roll * 0.22;
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
