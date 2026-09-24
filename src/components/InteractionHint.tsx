import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';

export const InteractionHint: React.FC = () => {
  const { currentChapter, isLoading } = useJourneyStore();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(true);
    };

    window.addEventListener('wheel', handleScroll, { once: true });
    window.addEventListener('touchmove', handleScroll, { once: true });

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, []);

  // Only show on chapter 0 (Intro) if user hasn't scrolled yet
  if (isLoading || currentChapter !== 0 || hasScrolled) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 select-none">
      {/* Mouse Icon with Animated Scroll Wheel */}
      <div className="w-5 h-8 rounded-full border-2 border-white/60 flex items-start justify-center p-1 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
        <div className="w-1 h-2 bg-cyan-400 rounded-full animate-bounce shadow-[0_0_8px_#06b6d4]" />
      </div>
      <span className="text-[10px] font-mono tracking-[0.25em] text-white/70 uppercase">
        SCROLL TO TRAVEL
      </span>
    </div>
  );
};

export default InteractionHint;
