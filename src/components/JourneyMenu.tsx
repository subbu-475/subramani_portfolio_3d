import React, { useEffect, useRef } from 'react';
import { useJourneyStore, CHAPTERS_DATA } from '../store/journeyStore';
import { X } from 'lucide-react';
import gsap from 'gsap';

export const JourneyMenu: React.FC = () => {
  const isMenuOpen = useJourneyStore((s) => s.isMenuOpen);
  const currentChapter = useJourneyStore((s) => s.currentChapter);
  const closeMenu = useJourneyStore((s) => s.closeMenu);
  const jumpToChapter = useJourneyStore((s) => s.jumpToChapter);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.45, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.35,
        ease: 'power3.in',
        onComplete: () => {
          gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.2 });
        },
      });
    }
  }, [isMenuOpen]);

  const handleSelectChapter = (chapterId: number) => {
    jumpToChapter(chapterId);
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 invisible">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={closeMenu}
      />

      {/* Slide-out Drawer Panel (Matching Reference Panel 3) */}
      <div
        ref={menuRef}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0B0D10]/95 backdrop-blur-2xl border-l border-white/10 p-8 sm:p-12 flex flex-col justify-between overflow-y-auto"
      >
        <div>
          {/* Drawer Header */}
          <div className="flex justify-between items-center pb-8 border-b border-white/10 mb-8">
            <h2 className="text-sm font-mono tracking-[0.25em] text-white/70 uppercase">
              THE JOURNEY
            </h2>
            <button
              onClick={closeMenu}
              className="text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Numbered Chapters List */}
          <ul className="space-y-4">
            {CHAPTERS_DATA.map((ch) => {
              const isActive = currentChapter === ch.id;
              return (
                <li key={ch.id}>
                  <button
                    onClick={() => handleSelectChapter(ch.id)}
                    className={`group flex items-center justify-between w-full py-2.5 px-3 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-white/10 text-white font-medium shadow-[inset_0_0_15px_rgba(6,182,212,0.15)] border border-cyan-500/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`text-xs font-mono ${
                          isActive ? 'text-cyan-400 font-bold' : 'text-white/40'
                        }`}
                      >
                        {ch.num}
                      </span>
                      <span className="text-base tracking-wider uppercase">
                        {ch.title}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-white/40 group-hover:text-white/70 transition-colors">
                      {ch.subtitle}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Drawer Footer Metadata */}
        <div className="pt-8 border-t border-white/10 text-[11px] font-mono text-white/40 flex justify-between items-center">
          <span>SUBRAMANI V</span>
          <span>FULL STACK DEVELOPER</span>
        </div>
      </div>
    </div>
  );
};

export default JourneyMenu;
