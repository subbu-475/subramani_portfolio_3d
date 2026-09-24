import React, { useEffect, useState } from 'react';
import { Mouse } from 'lucide-react';
import gsap from 'gsap';

export const InteractionHint: React.FC = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(false);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleScroll);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 transition-opacity duration-1000 opacity-70">
      <div className="animate-bounce">
        <Mouse size={24} className="text-white" />
      </div>
      <span className="text-[10px] tracking-[0.3em] text-white uppercase font-medium">
        Scroll to travel
      </span>
    </div>
  );
};
