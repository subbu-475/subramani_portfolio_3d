import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useJourneyStore } from '../store/journeyStore';
import Environment from './Environment';
import Camera from './Camera';
import PaperAirplane from './PaperAirplane';
import Lighting from './Lighting';
import Effects from './Effects';
import Road from './Road';

import IntroScene from './scenes/IntroScene';
import EducationScene from './scenes/EducationScene';
import CareerScene from './scenes/CareerScene';
import ProjectsScene from './scenes/ProjectsScene';
import SkillsScene from './scenes/SkillsScene';
import FutureScene from './scenes/FutureScene';
import ContactScene from './scenes/ContactScene';

const SceneManager: React.FC = () => {
  const journeyProgress = useJourneyStore((state) => state.journeyProgress);

  return (
    <>
      {/* 
        Keep scenes mounted in GPU memory to avoid expensive WebGL shader re-compilation
        and buffer re-uploading stutters. Three.js completely skips rendering and matrix
        evaluations when visible={false} (0 draw calls), ensuring a silky smooth 60 FPS.
      */}
      <group visible={journeyProgress <= 0.20}>
        <IntroScene />
      </group>
      <group visible={journeyProgress <= 0.38}>
        <EducationScene />
      </group>
      <group visible={journeyProgress >= 0.14 && journeyProgress <= 0.52}>
        <CareerScene />
      </group>
      <group visible={journeyProgress >= 0.34 && journeyProgress <= 0.62}>
        <ProjectsScene />
      </group>
      <group visible={journeyProgress >= 0.46 && journeyProgress <= 0.80}>
        <SkillsScene />
      </group>
      <group visible={journeyProgress >= 0.60 && journeyProgress <= 0.94}>
        <FutureScene />
      </group>
      <group visible={journeyProgress >= 0.74}>
        <ContactScene />
      </group>
    </>
  );
};

const World: React.FC = () => {
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);
  const isMobile = useJourneyStore((state) => state.isMobile);

  const getDpr = (): [number, number] => {
    if (isMobile) return [1, 1];
    if (qualityLevel === 'low') return [1, 1];
    if (qualityLevel === 'high') return [1, 1.75];
    return [1, 1.5]; // auto
  };

  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        dpr={getDpr()}
        shadows={qualityLevel === 'high'}
        gl={{
          antialias: qualityLevel !== 'low',
          powerPreference: 'high-performance',
          alpha: false,
          stencil: false,
          depth: true,
        }}
        camera={{ fov: 55, near: 0.1, far: 800 }}
      >
        <Suspense fallback={null}>
          <Camera />
          <PaperAirplane />
          <Lighting />
          <Environment />
          <Road />

          <SceneManager />

          <Effects />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default World;
