import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';
import { getAirplaneFlightPosition } from './JourneyPath';

// 8-stage cinematic time-of-day progression matching the 8 chapters:
// 0: The Beginning (Golden Hour Sunset, trailhead scenic road)
// 1: Education (Late Morning / Afternoon, bright campus)
// 2: Career (Evening / Golden hour, corporate towers)
// 3: Project Express (Evening railway station, warm station lighting)
// 4: Technology Laboratory (Warm white / soft gold primary lab lighting)
// 5: Night City (Where I am today, corporate skyline balcony)
// 6: Space Ascent (Pre-Dawn / Rocket launch ascent into space)
// 7: Deep space orbital station
const TIME_STAGES = [
  // 0: The Beginning
  { ambient: '#E8E3DA', dir: '#FCD34D', intensity: 2.2, dirPos: [18, 22, -30] as [number, number, number] },
  // 1: Education
  { ambient: '#F2EFEB', dir: '#FDE68A', intensity: 2.3, dirPos: [-20, 35, 15] as [number, number, number] },
  // 2: Career
  { ambient: '#FDBA74', dir: '#EA580C', intensity: 2.2, dirPos: [-30, 22, 20] as [number, number, number] },
  // 3: Project Express Railway Station
  { ambient: '#182436', dir: '#FEF3C7', intensity: 2.2, dirPos: [15, 32, -215] as [number, number, number] },
  // 4: Technology Laboratory
  { ambient: '#CBD5E1', dir: '#FFFBEB', intensity: 2.1, dirPos: [-20, 28, 15] as [number, number, number] },
  // 5: Night City
  { ambient: '#38BDF8', dir: '#60A5FA', intensity: 1.6, dirPos: [25, 35, 20] as [number, number, number] },
  // 6: Dawn Horizon Skybridge (Deep Indigo ambient, Warm Golden Dawn Sun)
  { ambient: '#312E81', dir: '#F59E0B', intensity: 2.4, dirPos: [-20, 24, -390] as [number, number, number] },
  // 7: Sunrise Observation Pavilion (Golden Sunrise Morning Light)
  { ambient: '#FDE68A', dir: '#F97316', intensity: 2.6, dirPos: [0, 20, -420] as [number, number, number] },
];

const scratchColor = new THREE.Color();
const scratchVec = new THREE.Vector3();

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
      scratchColor.set(config.ambient);
      ambientRef.current.color.lerp(scratchColor, delta * 2.5);
    }
    if (dirRef.current) {
      scratchColor.set(config.dir);
      dirRef.current.color.lerp(scratchColor, delta * 2.5);
      dirRef.current.intensity = THREE.MathUtils.lerp(dirRef.current.intensity, config.intensity, delta * 2.5);
      scratchVec.set(config.dirPos[0], config.dirPos[1], config.dirPos[2]);
      dirRef.current.position.lerp(scratchVec, delta * 2.0);
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
      scratchColor.set(config.dir);
      travelerKeyRef.current.color.lerp(scratchColor, delta * 3.0);
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
      // Warm golden rim in day/sunset, lavender in night, golden sunrise rim at dawn
      const rimColor = stageIdx <= 4 ? '#FEF08A' : stageIdx === 5 ? '#A5B4FC' : '#FDE047';
      scratchColor.set(rimColor);
      travelerRimRef.current.color.lerp(scratchColor, delta * 3.0);
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

      {/* Dynamic Key Light following Subramani along the journey - fill light without redundant shadow map */}
      <primitive object={targetObjRef.current} />
      <directionalLight
        ref={travelerKeyRef}
        position={[2.5, 6, 5]}
        intensity={1.8}
        castShadow={false}
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
