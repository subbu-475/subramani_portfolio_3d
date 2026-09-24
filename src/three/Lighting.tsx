import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useJourneyStore } from '../store/journeyStore';

const lightingColors = [
  '#ffffff', // Intro: neutral
  '#ffebb3', // Education: morning light
  '#e2f1f8', // Coding: afternoon
  '#ffd37f', // Career: golden hour
  '#ff7b54', // Projects: sunset
  '#1a1a2e', // Skills: night
  '#ff9a76', // Future: dawn
  '#ffffff', // Contact: neutral
];

const Lighting: React.FC = () => {
  const currentChapter = useJourneyStore((state) => state.currentChapter);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const dirRef = useRef<THREE.DirectionalLight>(null);

  useFrame((state, delta) => {
    if (ambientRef.current && dirRef.current) {
      const targetColor = new THREE.Color(lightingColors[currentChapter] || '#ffffff');
      ambientRef.current.color.lerp(targetColor, delta * 2);
      dirRef.current.color.lerp(targetColor, delta * 2);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.4} />
      <directionalLight
        ref={dirRef}
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
      />
      <pointLight position={[-10, 10, -20]} color="#3B82F6" intensity={2} />
      <pointLight position={[10, 5, -80]} color="#06B6D4" intensity={2} />
      <pointLight position={[-5, 8, -160]} color="#F97316" intensity={2} />
    </>
  );
};

export default Lighting;
