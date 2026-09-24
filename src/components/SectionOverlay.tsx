import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

interface SectionOverlayProps {
  chapter: number;
  chapterNumberText?: string;
  title: string;
  tagline?: string;
  description?: string;
  children?: React.ReactNode;
  position?: 'left' | 'right' | 'center' | 'bottom-left' | 'hero';
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({
  chapter,
  chapterNumberText,
  title,
  tagline,
  description,
  children,
  position = 'left',
}) => {
  const { currentChapter } = useJourneyStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const isActive = currentChapter === chapter;

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.15,
      });
    } else {
      gsap.to(containerRef.current, {
        autoAlpha: 0,
        y: 18,
        duration: 0.35,
        ease: 'power2.in',
      });
    }
  }, [isActive]);

  const positionClasses = {
    hero: 'items-start text-left pl-8 sm:pl-20 md:pl-28 justify-center',
    left: 'items-start text-left pl-8 sm:pl-20 md:pl-28 justify-center',
    right: 'items-end text-right pr-8 sm:pr-20 md:pr-28 justify-center',
    center: 'items-center text-center px-4 justify-center',
    'bottom-left': 'items-start text-left pl-8 sm:pl-20 md:pl-28 justify-end pb-24',
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none flex flex-col invisible translate-y-4 ${positionClasses[position]}`}
    >
      <div className="w-full max-w-xl flex flex-col gap-4 pointer-events-auto">
        {/* Chapter Header */}
        <div className="space-y-1.5">
          {chapterNumberText && (
            <span className="text-[11px] font-mono tracking-[0.3em] text-cyan-400 uppercase block font-semibold">
              {chapterNumberText}
            </span>
          )}

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight uppercase text-white drop-shadow-md">
            {title}
          </h2>

          {tagline && (
            <p className="text-sm sm:text-base font-medium text-white/90 tracking-wide">
              {tagline}
            </p>
          )}

          {description && (
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-lg">
              {description}
            </p>
          )}
        </div>

        {/* Content Children (Glass cards, interactive lists, etc.) */}
        {children && <div className="pt-2">{children}</div>}
      </div>
    </div>
  );
};

export default SectionOverlay;
