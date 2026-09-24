import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { isMenuOpen, toggleMenu, isSoundEnabled, toggleSound, jumpToChapter } =
    useJourneyStore();
  const [scrolled, setScrolled] = useState(false);

  const handleSoundToggle = () => {
    ambientSound.toggle();
    toggleSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${
        scrolled
          ? 'bg-[#050505]/70 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        {/* Brand Logo (Matching Reference Panel 2) */}
        <button
          onClick={() => jumpToChapter(0)}
          className="pointer-events-auto text-lg sm:text-xl font-bold tracking-[0.25em] text-white hover:text-cyan-400 transition-colors uppercase focus:outline-none"
        >
          SUBRAMANI
        </button>

        {/* Center / Right Links + Controls */}
        <nav aria-label="Main Navigation" className="flex items-center gap-6 sm:gap-8 pointer-events-auto">
          {/* Quick Links (Matching Reference Panel 2) */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.2em] text-white/70 uppercase">
            <button
              onClick={() => jumpToChapter(0)}
              className="hover:text-white transition-colors"
            >
              JOURNEY
            </button>
            <button
              onClick={() => jumpToChapter(4)}
              className="hover:text-white transition-colors"
            >
              PROJECTS
            </button>
            <button
              onClick={() => jumpToChapter(5)}
              className="hover:text-white transition-colors"
            >
              SKILLS
            </button>
            <button
              onClick={() => jumpToChapter(8)}
              className="hover:text-white transition-colors"
            >
              CONTACT
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center justify-center w-9 h-9 rounded-full glass text-white/70 hover:text-white hover:border-cyan-500/40 transition-all"
            title={isSoundEnabled ? 'Mute ambient audio' : 'Enable ambient audio'}
            aria-label="Toggle ambient sound"
          >
            {isSoundEnabled ? (
              <Volume2 size={15} className="text-cyan-400" />
            ) : (
              <VolumeX size={15} />
            )}
          </button>

          {/* Hamburger Drawer Toggle */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-9 h-9 rounded-full glass text-white/80 hover:text-white hover:border-cyan-500/40 transition-all"
            aria-label="Open Journey Menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
