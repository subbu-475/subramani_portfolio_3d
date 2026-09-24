import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

interface SectionOverlayProps {
  chapter: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  position?: 'left' | 'right' | 'center';
}

export const SectionOverlay: React.FC<SectionOverlayProps> = ({ 
  chapter, 
  title, 
  subtitle, 
  children,
  position = 'left' 
}) => {
  const { currentChapter } = useJourneyStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isActive = currentChapter === chapter;

  useEffect(() => {
    if (isActive) {
      gsap.to(containerRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 });
    } else {
      gsap.to(containerRef.current, { autoAlpha: 0, y: 20, duration: 0.4, ease: 'power2.in' });
    }
  }, [isActive]);

  const positionClasses = {
    left: 'items-start text-left pl-12 md:pl-24',
    right: 'items-end text-right pr-12 md:pr-24',
    center: 'items-center text-center px-4',
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center">
      <div 
        ref={containerRef}
        className={`w-full max-w-7xl mx-auto flex flex-col invisible translate-y-5 ${positionClasses[position]}`}
      >
        <div className="glass p-8 md:p-12 rounded-2xl max-w-xl pointer-events-auto">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded">
              CH {String(chapter).padStart(2, '0')}
            </span>
            {subtitle && (
              <span className="text-xs tracking-widest text-white/50 uppercase">
                {subtitle}
              </span>
            )}
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-wider mb-6 uppercase">
            {title}
          </h2>
          
          <div className="text-white/70 leading-relaxed text-sm md:text-base">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
