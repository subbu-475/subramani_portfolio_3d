import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const { isMobile } = useJourneyStore();
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMouseMove);

    gsap.ticker.add(() => {
      gsap.set(cursor, {
        x: mouseX,
        y: mouseY,
      });
    });

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button';
      
      gsap.to(cursor, {
        scale: isClickable ? 3 : 1,
        duration: 0.2,
      });
    };

    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleHover);
      gsap.ticker.remove(() => {});
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
    />
  );
};
