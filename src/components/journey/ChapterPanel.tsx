import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useJourneyStore } from '../../store/journeyStore';

export interface ChapterPanelProps {
  chapter: number;
  chapterNumberText?: string;
  title: string;
  tagline?: string;
  description?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right' | 'center' | 'hero';
}

export const ChapterPanel: React.FC<ChapterPanelProps> = ({
  chapter,
  chapterNumberText,
  title,
  tagline,
  description,
  children,
  position = 'left',
}) => {
  const { currentChapter, isMobile } = useJourneyStore();
  const panelRef = useRef<HTMLDivElement>(null);

  const isActive = currentChapter === chapter;

  useEffect(() => {
    if (!panelRef.current) return;

    if (isActive) {
      gsap.fromTo(
        panelRef.current,
        {
          autoAlpha: 0,
          y: isMobile ? 30 : 20,
          scale: 0.98,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0.1,
        }
      );
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: isMobile ? 20 : 15,
        scale: 0.98,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  }, [isActive, isMobile]);

  // Desktop positioning classes ensuring zero overlap with character in opposite third
  const desktopAlignment = {
    hero: 'items-start text-left pl-10 md:pl-28 justify-center',
    left: 'items-start text-left pl-10 md:pl-28 justify-center',
    right: 'items-end text-left pr-10 md:pr-28 justify-center',
    center: 'items-center text-center px-4 justify-center',
  }[position];

  // Mobile layout: anchored to bottom half as an elegant bottom sheet so the 3D character above is fully visible
  const mobileClasses = 'items-center justify-end pb-8 px-4';

  return (
    <div
      ref={panelRef}
      className={`absolute inset-0 pointer-events-none flex flex-col invisible ${
        isMobile ? mobileClasses : desktopAlignment
      }`}
    >
      <div
        className={`w-full max-w-xl pointer-events-auto transition-all ${
          isMobile
            ? 'glass p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl max-h-[52vh] overflow-y-auto'
            : ''
        }`}
      >
        {/* Chapter Header */}
        <div className="space-y-1.5">
          {chapterNumberText && (
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-cyan-400 uppercase font-semibold">
                {chapterNumberText}
              </span>
            </div>
          )}

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-white drop-shadow-lg">
            {title}
          </h2>

          {tagline && (
            <p className="text-sm sm:text-base font-semibold text-cyan-200/90 tracking-wide">
              {tagline}
            </p>
          )}

          {description && (
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg">
              {description}
            </p>
          )}
        </div>

        {/* Custom Content Slot */}
        {children && <div className="pt-3">{children}</div>}
      </div>
    </div>
  );
};

export default ChapterPanel;
