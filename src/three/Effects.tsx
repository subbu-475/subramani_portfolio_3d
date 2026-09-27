import React from 'react';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useJourneyStore } from '../store/journeyStore';

export const Effects: React.FC = () => {
  const qualityLevel = useJourneyStore((state) => state.qualityLevel);

  if (qualityLevel === 'low') return null;

  return (
    <EffectComposer multisampling={qualityLevel === 'high' ? 2 : 0}>
      {/* 
        Subtle, filmic bloom:
        High threshold (0.82) ensures only bright light fixtures and neon edges bloom,
        preventing the traveler or landscape from becoming washed out.
      */}
      <Bloom 
        luminanceThreshold={0.82} 
        luminanceSmoothing={0.7} 
        intensity={qualityLevel === 'high' ? 0.45 : 0.3} 
      />
      {/* Filmic cinematic camera vignette */}
      <Vignette eskil={false} offset={0.12} darkness={0.9} />
    </EffectComposer>
  );
};

export default Effects;
