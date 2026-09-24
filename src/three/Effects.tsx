import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useJourneyStore } from '../store/journeyStore';

const Effects: React.FC = () => {
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);

  if (qualityLevel === 'low') return null;

  return (
    <EffectComposer disableNormalPass>
      <Bloom 
        luminanceThreshold={0.5} 
        luminanceSmoothing={0.9} 
        intensity={qualityLevel === 'high' ? 1.5 : 1} 
      />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};

export default Effects;
