import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getJourneyPosition } from './JourneyPath';

// 9-stage cinematic time-of-day progression matching the user's narrative:
// 0: Morning (Village main road, golden sunrise)
// 1: Late Morning / Afternoon (College education, bright campus)
// 2: Mid-Afternoon / Evening start (First line of code, cozy workspace)
// 3: Evening / Golden hour (Career boulevard, corporate towers)
// 4: Sunset (Projects tech showroom, golden sunset fire)
// 5: Twilight / Early Evening (Skills holographic galaxy, purple indigo)
// 6: Night (Where I am today, corporate skyline balcony, neon city)
// 7: Pre-Dawn / Rocket launch ascent into space
// 8: Deep space orbital station
const TIME_STAGES = [
  // 0: Morning Dawn (Golden sunrise on village road)
  { ambient: '#fde68a', dir: '#f59e0b', intensity: 2.2, dirPos: [20, 30, 20] as [number, number, number] },
  // 1: Late Morning (Bright clear campus daylight)
  { ambient: '#f1f5f9', dir: '#fffbeb', intensity: 2.4, dirPos: [-20, 45, 10] as [number, number, number] },
  // 2: Mid-Afternoon (Warm amber afternoon light)
  { ambient: '#fed7aa', dir: '#fb923c', intensity: 2.0, dirPos: [25, 35, 15] as [number, number, number] },
  // 3: Golden Hour / Evening (Deep golden hour on city towers)
  { ambient: '#fdba74', dir: '#ea580c', intensity: 2.2, dirPos: [-30, 22, 20] as [number, number, number] },
  // 4: Sunset (Vibrant orange/purple sunset over tech pavilion)
  { ambient: '#e9d5ff', dir: '#c026d3', intensity: 1.9, dirPos: [25, 18, 15] as [number, number, number] },
  // 5: Twilight / Dusk (Deep indigo twilight with neon cyan)
  { ambient: '#818cf8', dir: '#00f0ff', intensity: 1.8, dirPos: [-20, 25, 15] as [number, number, number] },
  // 6: Night City (Crisp moonlight and neon city glow)
  { ambient: '#38bdf8', dir: '#60a5fa', intensity: 1.6, dirPos: [25, 35, 20] as [number, number, number] },
  // 7: Space Ascent (Cosmic blue with rocket flame warmth)
  { ambient: '#60a5fa', dir: '#38bdf8', intensity: 1.8, dirPos: [-20, 50, 20] as [number, number, number] },
  // 8: Deep Space (High contrast orbital sunlight)
  { ambient: '#38bdf8', dir: '#00f0ff', intensity: 2.0, dirPos: [0, 80, 25] as [number, number, number] },
];

export const Lighting: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);
  const travelerKeyRef = useRef<THREE.DirectionalLight>(null);
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

    // Dynamic traveler tracking key light
    getJourneyPosition(journeyProgress, travelerPosVec.current);
    const travelerPos = travelerPosVec.current;

    if (travelerKeyRef.current) {
      // Light stays calibrated relative to traveler position from camera direction
      travelerKeyRef.current.position.set(
        travelerPos.x + 3,
        travelerPos.y + 8,
        travelerPos.z + 8
      );
      travelerKeyRef.current.color.lerp(new THREE.Color(config.dir), delta * 3.0);
      travelerKeyRef.current.intensity = config.intensity;

      targetObjRef.current.position.set(travelerPos.x, travelerPos.y + 0.9, travelerPos.z);
      travelerKeyRef.current.target = targetObjRef.current;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.1} />

      {/* Global Sun/Moon/Cosmic directional light */}
      <directionalLight
        ref={dirRef}
        position={[20, 30, 20]}
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
        position={[3, 8, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0002}
      />

      {/* Subtle Rim Light behind character for crisp silhouette */}
      <pointLight position={[0, 3, -4]} color="#FDE047" intensity={0.6} distance={15} />
    </>
  );
};

export default Lighting;
