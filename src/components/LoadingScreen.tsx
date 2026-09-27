import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

export const LoadingScreen: React.FC = () => {
  const loadingProgress = useJourneyStore((s) => s.loadingProgress);
  const isWorldReady = useJourneyStore((s) => s.isWorldReady);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 15, letterSpacing: '0.15em' },
        { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 1.2, ease: 'power3.out' }
      );
    }
  }, []);

  useEffect(() => {
    if (isWorldReady && containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
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
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 sm:p-12 bg-[#050816] text-white overflow-hidden select-none"
    >
      {/* Subtle Star / Nebula Aura in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/20 via-[#050816]/80 to-[#050816] pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex justify-between items-center text-xs tracking-[0.25em] text-white/50 uppercase font-mono z-10">
        <span>SUBRAMANI</span>
        <span>A DEVELOPER'S JOURNEY</span>
      </div>

      {/* Center Cinematic Card */}
      <div className="flex flex-col items-center justify-center text-center z-10 max-w-xl mx-auto w-full">
        <h1
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[0.35em] text-white mb-3"
        >
          SUBRAMANI
        </h1>
        <p className="text-white/60 tracking-[0.25em] text-xs sm:text-sm uppercase font-mono mb-10">
          Full Stack Developer
        </p>

        {/* Loading Progress Box */}
        <div className="w-full max-w-md space-y-3">
          <p className="text-xs font-mono tracking-widest text-[#00D9FF] uppercase animate-pulse">
            INITIALIZING JOURNEY...
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-[0_0_15px_#06b6d4] transition-all duration-200 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono text-cyan-300 min-w-10 text-right">
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Quote (Matching Reference Panel 1) */}
      <div className="text-center z-10 pb-4">
        <p className="text-xs sm:text-sm text-white/40 tracking-wider italic font-light">
          "A journey of curiosity, code and continuous learning."
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
