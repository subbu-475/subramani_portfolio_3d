import React from 'react';
import { useJourneyStore, CHAPTERS_DATA } from '../store/journeyStore';

export const VerticalTimeline: React.FC = () => {
  const { currentChapter, isLoading, jumpToChapter } = useJourneyStore();

  if (isLoading) return null;

  return (
    <aside
      aria-label="Chapter progression timeline"
      className="fixed left-6 sm:left-10 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex flex-col items-center select-none"
    >
      {/* Top timeline decorative cap */}
      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mb-2 shadow-[0_0_8px_#06b6d4]" />

      {/* Vertical Spine Line */}
      <div className="relative flex flex-col items-center gap-4 py-2">
        {/* Continuous connector line */}
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/15 -z-10" />

        {CHAPTERS_DATA.map((ch) => {
          const isCurrent = currentChapter === ch.id;
          const isPassed = ch.id < currentChapter;

          return (
            <button
              key={ch.id}
              onClick={() => jumpToChapter(ch.id)}
              className="group pointer-events-auto relative flex items-center justify-center p-1.5 focus:outline-none transition-transform hover:scale-125"
              title={`${ch.num}. ${ch.title}`}
            >
              {/* Node Circle */}
              <div
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? 'w-3 h-3 bg-cyan-400 shadow-[0_0_12px_#06b6d4] ring-4 ring-cyan-400/20'
                    : isPassed
                    ? 'w-2 h-2 bg-white/80'
                    : 'w-2 h-2 bg-transparent border border-white/30 group-hover:border-white'
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute left-6 text-[10px] font-mono tracking-widest uppercase text-white bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {ch.num} {ch.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Bottom timeline decorative cap */}
      <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2" />
    </aside>
  );
};

export default VerticalTimeline;
