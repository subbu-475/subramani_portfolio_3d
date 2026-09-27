import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';

export const InteractionHint: React.FC = () => {
  const currentChapter = useJourneyStore((s) => s.currentChapter);
  const isLoading = useJourneyStore((s) => s.isLoading);
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

  // Only show on chapter 0 (Intro / Hero) if user hasn't scrolled yet
  if (isLoading || currentChapter !== 0 || hasScrolled) return null;

  return (
    <div className="fixed bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 select-none">
      {/* Minimalist Mouse / Scroll Pill */}
      <div className="w-4 h-7 rounded-full border border-white/40 flex items-start justify-center p-1">
        <div className="w-1 h-1.5 bg-amber-300/90 rounded-full animate-bounce" />
      </div>
      <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
        SCROLL TO EXPLORE
      </span>
    </div>
  );
};

export default InteractionHint;
