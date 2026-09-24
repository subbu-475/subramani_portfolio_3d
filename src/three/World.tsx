import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useJourneyStore } from '../store/journeyStore';
import Environment from './Environment';
import Camera from './Camera';
import Lighting from './Lighting';
import Effects from './Effects';
import Character from './Character';

import IntroScene from './scenes/IntroScene';
import EducationScene from './scenes/EducationScene';
import CodingScene from './scenes/CodingScene';
import CareerScene from './scenes/CareerScene';
import ProjectsScene from './scenes/ProjectsScene';
import SkillsScene from './scenes/SkillsScene';
import FutureScene from './scenes/FutureScene';
import ContactScene from './scenes/ContactScene';

const World: React.FC = () => {
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);
  const isMobile = useJourneyStore((state) => state.isMobile);

  const getDpr = (): [number, number] => {
    if (isMobile) return [1, 1];
    if (qualityLevel === 'low') return [1, 1];
    if (qualityLevel === 'high') return [1, 2];
    return [1, 1.5]; // auto
  };

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        dpr={getDpr()}
        shadows={qualityLevel !== 'low'}
        gl={{
          antialias: qualityLevel !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
        }}
        camera={{ fov: 60, near: 0.1, far: 500 }}
      >
        <color attach="background" args={['#050505']} />
        <Suspense fallback={null}>
          <Camera />
          <Character />
          <Lighting />
          <Environment />
          
          <group>
            <IntroScene />
            <EducationScene />
            <CodingScene />
            <CareerScene />
            <ProjectsScene />
            <SkillsScene />
            <FutureScene />
            <ContactScene />
          </group>
          
          <Effects />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default World;
