import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useJourneyStore } from '../../store/journeyStore';

export interface ChapterPanelProps {
  chapter: number;
  chapterNumberText?: string;
  title?: string;
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
          y: isMobile ? 25 : 15,
          scale: 0.99,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.08,
        }
      );
    } else {
      gsap.to(panelRef.current, {
        autoAlpha: 0,
        y: isMobile ? 15 : 10,
        scale: 0.99,
        duration: 0.35,
        ease: 'power2.in',
      });
    }
  }, [isActive, isMobile]);

  // Desktop positioning: hero occupies approx 35-40% width on left, zero overlap with traveler
  const desktopAlignment = {
    hero: 'items-start text-left pl-8 sm:pl-14 md:pl-18 lg:pl-28 justify-center',
    left: 'items-start text-left pl-10 md:pl-24 justify-center',
    right: 'items-end text-left pr-8 sm:pr-12 md:pr-16 lg:pr-24 justify-center',
    center: 'items-center text-center px-4 justify-center',
  }[position];

  // Mobile layout: anchored carefully in bottom sheet leaving character visible in top half
  const mobileClasses = position === 'hero'
    ? 'items-center justify-end pb-20 px-5'
    : 'items-center justify-end pb-8 px-4';

  const isHero = position === 'hero';
  const isRight = position === 'right';

  return (
    <div
      ref={panelRef}
      className={`absolute inset-0 pointer-events-none flex flex-col invisible ${
        isMobile ? mobileClasses : desktopAlignment
      }`}
    >
      <div
        className={`pointer-events-auto transition-all ${
          isHero
            ? isMobile
              ? 'w-full max-w-sm glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl'
              : 'w-[38vw] max-w-[460px] min-w-[340px]'
            : isRight
            ? isMobile
              ? 'w-full max-w-xl glass p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl max-h-[52vh] overflow-y-auto'
              : 'w-[32vw] max-w-[460px] min-w-[340px]'
            : isMobile
            ? 'w-full max-w-xl glass p-5 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-2xl max-h-[52vh] overflow-y-auto'
            : 'w-full max-w-xl'
        }`}
      >
        {/* Chapter Header (omitted if hero or title not provided) */}
        {!isHero && title && (
          <div className="space-y-1">
            {chapterNumberText && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#00D9FF] uppercase font-semibold">
                  {chapterNumberText}
                </span>
              </div>
            )}

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight uppercase text-white drop-shadow-md">
              {title}
            </h2>

            {tagline && (
              <p className="text-xs sm:text-sm font-semibold text-[#FFC857] tracking-wide">
                {tagline}
              </p>
            )}

            {description && (
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-lg">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Custom Content Slot */}
        {children && <div className={isHero ? '' : 'pt-3'}>{children}</div>}
      </div>
    </div>
  );
};

export default ChapterPanel;
