import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

export const LoadingScreen: React.FC = () => {
  const { loadingProgress, isWorldReady } = useJourneyStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20, letterSpacing: '0.1em' },
        { opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.5, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (isWorldReady && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
        },
      });
    }
  }, [isWorldReady]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
    >
      <h1 ref={textRef} className="text-4xl md:text-6xl font-bold uppercase tracking-[0.3em] mb-4">
        SUBRAMANI
      </h1>
      <p className="text-white/60 tracking-widest text-sm uppercase mb-12">
        A Developer's Journey
      </p>
      
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        />
      </div>
      <p className="mt-4 text-xs text-white/40">{Math.round(loadingProgress)}%</p>
    </div>
  );
};
