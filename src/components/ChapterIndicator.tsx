import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

const CHAPTER_NAMES = [
  'The Beginning',
  'Education',
  'First Code',
  'Career',
  'Projects',
  'Skills',
  'Present',
  'Contact',
];
const TOTAL_CHAPTERS = 8;

export const ChapterIndicator: React.FC = () => {
  const { currentChapter, isLoading, setJourneyProgress } = useJourneyStore();
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [currentChapter]);

  if (isLoading) return null;

  const handleDotClick = (index: number) => {
    const targetProgress = index / (TOTAL_CHAPTERS - 1);
    setJourneyProgress(Math.min(targetProgress, 0.999));
  };

  return (
    <div className="fixed bottom-6 left-6 z-20 pointer-events-none">
      <div className="glass px-5 py-3.5 rounded-2xl flex flex-col gap-2.5 max-w-xs sm:max-w-sm pointer-events-auto shadow-2xl backdrop-blur-xl border border-white/10">
        <div ref={textRef} className="flex items-baseline justify-between gap-4">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400">
            CHAPTER {String(currentChapter + 1).padStart(2, '0')} / {String(TOTAL_CHAPTERS).padStart(2, '0')}
          </span>
          <span className="text-xs font-semibold tracking-wider text-white uppercase truncate">
            {CHAPTER_NAMES[currentChapter] || 'The Beginning'}
          </span>
        </div>

        {/* Interactive Timeline Dots */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {CHAPTER_NAMES.map((name, idx) => {
            const isPassed = idx < currentChapter;
            const isCurrent = idx === currentChapter;
            return (
              <button
                key={name}
                onClick={() => handleDotClick(idx)}
                className="group relative flex items-center justify-center p-1 cursor-pointer focus:outline-none"
                title={`${idx + 1}. ${name}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isCurrent
                      ? 'w-3 h-3 bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
                      : isPassed
                      ? 'w-1.5 h-1.5 bg-white/70 hover:bg-white'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/50'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
