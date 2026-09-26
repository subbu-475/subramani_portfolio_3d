import React, { useMemo } from 'react';
import { useJourneyStore } from '../store/journeyStore';

/**
 * Clean Origami Paper Airplane SVG Icon
 */
const OrigamiAirplaneIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 2L11 13" />
    <path d="M22 2L15 22L11 13L2 9L22 2Z" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

interface FlightDestination {
  id: number;
  num: string;
  title: string;
  progress: number;
}

/**
 * 6 Core Journey Destinations connected by the Paper Airplane Flight:
 * 01 EDUCATION
 * 02 EXPERIENCE
 * 03 PROJECTS
 * 04 SKILLS
 * 05 FUTURE
 * 06 CONTACT
 */
const FLIGHT_DESTINATIONS: FlightDestination[] = [
  { id: 1, num: '01', title: 'EDUCATION', progress: 0.17 },
  { id: 2, num: '02', title: 'CAREER', progress: 0.38 },
  { id: 3, num: '03', title: 'PROJECTS', progress: 0.51 },
  { id: 4, num: '04', title: 'TECHNOLOGY', progress: 0.64 },
  { id: 5, num: '05', title: 'FUTURE', progress: 0.82 },
  { id: 6, num: '06', title: 'CONTACT', progress: 0.96 },
];

export const VerticalTimeline: React.FC = () => {
  const { journeyProgress, isLoading, setJourneyProgress, jumpToChapter } = useJourneyStore();

  // Determine active flight destination index based on continuous journey progress
  const activeDestIndex = useMemo(() => {
    if (journeyProgress < 0.28) return 0; // 01 Education
    if (journeyProgress < 0.46) return 1; // 02 Career
    if (journeyProgress < 0.58) return 2; // 03 Projects
    if (journeyProgress < 0.72) return 3; // 04 Technology
    if (journeyProgress < 0.88) return 4; // 05 Future
    return 5;                             // 06 Contact
  }, [journeyProgress]);

  if (isLoading) return null;

  const handleDestinationClick = (dest: FlightDestination) => {
    jumpToChapter(dest.id);
    setJourneyProgress(dest.progress);
  };

  return (
    <aside
      aria-label="Flight journey progress indicator"
      className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none max-w-[94vw]"
    >
      <nav
        aria-label="Flight Route"
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full glass border border-white/10 shadow-2xl backdrop-blur-xl bg-[#090D18]/85"
      >
        {FLIGHT_DESTINATIONS.map((dest, idx) => {
          const isActive = idx === activeDestIndex;
          const isPassed = idx < activeDestIndex;

          return (
            <React.Fragment key={dest.num}>
              <button
                onClick={() => handleDestinationClick(dest)}
                className={`group relative flex items-center gap-1 sm:gap-1.5 py-1 px-1.5 sm:px-2 rounded-full transition-all duration-300 cursor-pointer focus:outline-none ${
                  isActive
                    ? 'text-amber-300 bg-amber-400/10 font-bold shadow-sm'
                    : isPassed
                    ? 'text-white/65 hover:text-white hover:bg-white/5'
                    : 'text-white/30 hover:text-white/60 hover:bg-white/5'
                }`}
                title={`${dest.num} ${dest.title}`}
              >
                {/* Paper Airplane Indicator on Active Chapter */}
                {isActive ? (
                  <span className="text-amber-300 animate-pulse drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]">
                    <OrigamiAirplaneIcon className="w-3.5 h-3.5 transform -rotate-12" />
                  </span>
                ) : (
                  <span
                    className={`w-1 h-1 rounded-full transition-colors ${
                      isPassed ? 'bg-amber-400/60' : 'bg-white/20'
                    }`}
                  />
                )}

                {/* Chapter Number */}
                <span className="text-[10px] sm:text-[11px] font-mono tracking-tight">
                  {dest.num}
                </span>

                {/* Chapter Title (Desktop View) */}
                <span
                  className={`hidden md:inline text-[10px] font-mono tracking-wider uppercase transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-white/40 group-hover:text-white/70'
                  }`}
                >
                  {dest.title}
                </span>

                {/* Mobile Hover Tooltip */}
                <span className="md:hidden absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-wider uppercase text-white bg-black/95 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {dest.title}
                </span>
              </button>

              {/* Elegant Flight Path Dash Separator */}
              {idx < FLIGHT_DESTINATIONS.length - 1 && (
                <span
                  className={`text-[9px] font-mono select-none px-0.5 transition-colors ${
                    isPassed ? 'text-amber-400/40' : 'text-white/15'
                  }`}
                >
                  ⇢
                </span>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
};

export default VerticalTimeline;
