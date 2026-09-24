import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

const CHAPTERS = [
  { id: 0, num: '01', title: 'The Beginning' },
  { id: 1, num: '02', title: 'Education' },
  { id: 2, num: '03', title: 'First Code' },
  { id: 3, num: '04', title: 'Career' },
  { id: 4, num: '05', title: 'Projects' },
  { id: 5, num: '06', title: 'Skills' },
  { id: 6, num: '07', title: 'Present' },
  { id: 7, num: '08', title: 'Contact' },
];

export const JourneyMenu: React.FC = () => {
  const { isMenuOpen, closeMenu, currentChapter, setJourneyProgress } = useJourneyStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(
        menuRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(menuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.2 });
        }
      });
    }
  }, [isMenuOpen]);

  const handleChapterClick = (chapterId: number) => {
    const progress = chapterId / 7; // 0 to 1
    setJourneyProgress(Math.min(progress, 0.999));
    closeMenu();
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-30 invisible"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMenu} />
      <div
        ref={menuRef}
        className="absolute top-0 right-0 w-full max-w-md h-full bg-[#0B0D10]/90 backdrop-blur-xl border-l border-white/10 p-12 flex flex-col justify-center"
      >
        <h2 className="text-white/40 tracking-[0.2em] text-sm uppercase mb-8">Chapters</h2>
        <ul className="space-y-6">
          {CHAPTERS.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => handleChapterClick(chapter.id)}
                className={`group flex items-center gap-4 text-left w-full transition-colors ${
                  currentChapter === chapter.id ? 'text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                <span className="text-xs font-mono opacity-50">
                  {chapter.num}
                </span>
                <span className="text-xl tracking-wider uppercase font-medium">
                  {chapter.title}
                </span>
                {currentChapter === chapter.id && (
                  <span className="h-[1px] flex-grow bg-white/20 ml-4" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
