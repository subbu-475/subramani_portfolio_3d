import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const { currentChapter, isMenuOpen, toggleMenu, isSoundEnabled, toggleSound, jumpToChapter } =
    useJourneyStore();
  const [scrolled, setScrolled] = useState(false);

  const handleSoundToggle = () => {
    ambientSound.toggle();
    toggleSound();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 pointer-events-none ${
        scrolled
          ? 'bg-[#0B0D12]/75 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 flex justify-between items-center">
        {/* Minimal Subramani Brand */}
        <button
          onClick={() => jumpToChapter(0)}
          className="pointer-events-auto text-sm sm:text-base font-bold tracking-[0.25em] text-white/90 hover:text-white transition-colors uppercase focus:outline-none cursor-pointer"
        >
          SUBRAMANI
        </button>

        {/* Minimal Navigation Links & Controls */}
        <nav aria-label="Main Navigation" className="flex items-center gap-6 sm:gap-8 pointer-events-auto">
          {/* Minimal Nav Items */}
          <div className="hidden md:flex items-center gap-7 text-[11px] font-medium tracking-[0.2em] text-white/70 uppercase">
            <button
              onClick={() => jumpToChapter(0)}
              className={`transition-colors cursor-pointer ${
                currentChapter === 0 ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              JOURNEY
            </button>
            <button
              onClick={() => jumpToChapter(4)}
              className={`transition-colors cursor-pointer ${
                currentChapter === 4 ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              PROJECTS
            </button>
            <button
              onClick={() => jumpToChapter(5)}
              className={`transition-colors cursor-pointer ${
                currentChapter === 5 ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              SKILLS
            </button>
            <button
              onClick={() => jumpToChapter(8)}
              className={`transition-colors cursor-pointer ${
                currentChapter === 8 ? 'text-white font-semibold' : 'hover:text-white'
              }`}
            >
              CONTACT
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className="flex items-center justify-center w-8 h-8 rounded-full glass border border-white/10 text-white/70 hover:text-white transition-all cursor-pointer"
            title={isSoundEnabled ? 'Mute ambient audio' : 'Enable ambient audio'}
            aria-label="Toggle ambient sound"
          >
            {isSoundEnabled ? (
              <Volume2 size={14} className="text-amber-300" />
            ) : (
              <VolumeX size={14} />
            )}
          </button>

          {/* Minimal Drawer Toggle */}
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center w-8 h-8 rounded-full glass border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
            aria-label="Open Journey Menu"
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
