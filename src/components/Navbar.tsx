import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { isMenuOpen, toggleMenu, isSoundEnabled, toggleSound } = useJourneyStore();
  const [scrolled, setScrolled] = useState(false);

  const handleSoundToggle = () => {
    ambientSound.toggle();
    toggleSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${
        scrolled ? 'bg-white/5 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="pointer-events-auto flex items-center gap-3">
          <span className="text-xl font-bold tracking-[0.25em] text-white">
            SUBRAMANI
          </span>
          <span className="hidden sm:inline-block text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded-full tracking-wider">
            JOURNEY
          </span>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={handleSoundToggle}
            className="flex items-center justify-center w-10 h-10 rounded-full glass text-white/70 hover:text-white hover:border-white/20 transition-all"
            title={isSoundEnabled ? 'Mute ambient audio' : 'Enable ambient audio'}
            aria-label="Toggle ambient sound"
          >
            {isSoundEnabled ? <Volume2 size={16} className="text-cyan-400" /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={toggleMenu}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white/90 hover:text-white transition-all uppercase glass px-5 py-2.5 rounded-full border border-white/10 hover:border-cyan-500/40"
          >
            {isMenuOpen ? (
              <>CLOSE <X size={15} /></>
            ) : (
              <>CHAPTERS <Menu size={15} /></>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
