import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getAirplaneFlightPosition } from './JourneyPath';

// 9-stage cinematic time-of-day progression matching the user's narrative:
// 0: Golden Hour Sunset (Trailhead scenic road, warm sunset light, charcoal shadows)
// 1: Late Morning / Afternoon (College education, bright campus)
// 2: Mid-Afternoon / Evening start (First line of code, cozy workspace)
// 3: Evening / Golden hour (Career boulevard, corporate towers)
// 4: Sunset (Projects tech showroom, golden sunset fire)
// 5: Twilight / Early Evening (Skills holographic galaxy, purple indigo)
// 6: Night (Where I am today, corporate skyline balcony, neon city)
// 7: Pre-Dawn / Rocket launch ascent into space
// 8: Deep space orbital station
const TIME_STAGES = [
  // 0: Cinematic Sunset Golden Hour (Soft sun, ambient warm fill, deep charcoal depth)
  { ambient: '#E8E3DA', dir: '#FCD34D', intensity: 2.2, dirPos: [18, 22, -30] as [number, number, number] },
  // 1: Golden Campus Sunlight (Warm directional sun, lifted ambient fill, subtle rim light)
  { ambient: '#F2EFEB', dir: '#FDE68A', intensity: 2.3, dirPos: [-20, 35, 15] as [number, number, number] },
  // 2: Mid-Afternoon (Warm amber afternoon light)
  { ambient: '#FED7AA', dir: '#FB923C', intensity: 2.0, dirPos: [25, 35, 15] as [number, number, number] },
  // 3: Golden Hour / Evening (Deep golden hour on city towers)
  { ambient: '#FDBA74', dir: '#EA580C', intensity: 2.2, dirPos: [-30, 22, 20] as [number, number, number] },
  // 4: Modern Architecture Gallery (Warm gallery ambient fill, clean directional lighting)
  { ambient: '#D1D5DB', dir: '#FFF7ED', intensity: 2.1, dirPos: [20, 28, 15] as [number, number, number] },
  // 5: Technology Laboratory (Warm white / soft gold primary lab lighting with clean ambient fill)
  { ambient: '#CBD5E1', dir: '#FFFBEB', intensity: 2.1, dirPos: [-20, 28, 15] as [number, number, number] },
  // 6: Night City (Crisp moonlight and neon city glow)
  { ambient: '#38BDF8', dir: '#60A5FA', intensity: 1.6, dirPos: [25, 35, 20] as [number, number, number] },
  // 7: Space Ascent (Cosmic blue with rocket flame warmth)
  { ambient: '#60A5FA', dir: '#38BDF8', intensity: 1.8, dirPos: [-20, 50, 20] as [number, number, number] },
  // 8: Deep Space (High contrast orbital sunlight)
  { ambient: '#38BDF8', dir: '#00F0FF', intensity: 2.0, dirPos: [0, 80, 25] as [number, number, number] },
];

export const Lighting: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const travelerKeyRef = useRef<THREE.DirectionalLight>(null);
  const travelerRimRef = useRef<THREE.PointLight>(null);
  const targetObjRef = useRef<THREE.Object3D>(new THREE.Object3D());
  const travelerPosVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const stageIdx = Math.max(0, Math.min(TIME_STAGES.length - 1, currentChapter));
    const config = TIME_STAGES[stageIdx];

    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(config.ambient), delta * 2.5);
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(new THREE.Color(config.dir), delta * 2.5);
      dirRef.current.intensity = THREE.MathUtils.lerp(dirRef.current.intensity, config.intensity, delta * 2.5);
      dirRef.current.position.lerp(new THREE.Vector3(...config.dirPos), delta * 2.0);
    }

    // Dynamic airplane tracking key light & rim light
    getAirplaneFlightPosition(journeyProgress, travelerPosVec.current);
    const travelerPos = travelerPosVec.current;

    if (travelerKeyRef.current) {
      // Light stays calibrated relative to traveler position from camera direction
      travelerKeyRef.current.position.set(
        travelerPos.x + 2.5,
        travelerPos.y + 6.0,
        travelerPos.z + 5.0
      );
      travelerKeyRef.current.color.lerp(new THREE.Color(config.dir), delta * 3.0);
      travelerKeyRef.current.intensity = config.intensity * 0.9;

      targetObjRef.current.position.set(travelerPos.x, travelerPos.y + 0.9, travelerPos.z);
      travelerKeyRef.current.target = targetObjRef.current;
    }

    // Precise tracking Rim Light positioned behind character relative to camera
    if (travelerRimRef.current) {
      travelerRimRef.current.position.set(
        travelerPos.x,
        travelerPos.y + 1.8,
        travelerPos.z - 2.2
      );
      // Warm golden rim in day/sunset, cyan/cool rim in twilight/night/space
      const rimColor = stageIdx <= 4 ? '#FEF08A' : stageIdx === 5 ? '#A5B4FC' : '#38BDF8';
      travelerRimRef.current.color.lerp(new THREE.Color(rimColor), delta * 3.0);
      // Consistent rich rim light across all stages matching Chapter 1 & 2
      travelerRimRef.current.intensity = 2.2;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.9} />

      {/* Global Sun/Moon/Cosmic directional light */}
      <directionalLight
        ref={dirRef}
        position={[18, 22, -30]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.0005}
      />

      {/* Dynamic Key Light following Subramani along the journey */}
      <primitive object={targetObjRef.current} />
      <directionalLight
        ref={travelerKeyRef}
        position={[2.5, 6, 5]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />

      {/* Tracking Rim Light behind character for crisp cinematic separation */}
      <pointLight
        ref={travelerRimRef}
        position={[0, 1.8, -2.2]}
        color="#FEF08A"
        intensity={2.4}
        distance={8}
      />
    </>
  );
};

export default Lighting;
