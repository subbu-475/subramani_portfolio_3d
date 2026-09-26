import React, { useEffect, useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../utils/audio';

export const Navbar: React.FC = () => {
  const {
    currentChapter,
    isMenuOpen,
    toggleMenu,
    isSoundEnabled,
    toggleSound,
    jumpToChapter,
    viewMode,
    toggleViewMode,
  } = useJourneyStore();
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
          ? 'bg-[#050816]/90 backdrop-blur-md border-b border-white/10 py-3.5'
          : 'bg-gradient-to-b from-[#050816]/95 via-[#050816]/50 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 flex justify-between items-center">
        {/* Minimal Subramani Brand */}
        <button
          onClick={() => jumpToChapter(0)}
          aria-label="Subramani Home"
          className="pointer-events-auto text-sm sm:text-base font-bold tracking-[0.25em] text-white hover:text-[#00D9FF] transition-colors uppercase focus:outline-none cursor-pointer flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse shadow-[0_0_8px_#00D9FF]" />
          <span>SUBRAMANI</span>
        </button>

        {/* Minimal Navigation Links & Controls: SUBRAMANI | JOURNEY | PROJECTS | SKILLS | CONTACT */}
        <nav aria-label="Main Navigation" className="flex items-center gap-5 sm:gap-7 pointer-events-auto">
          {/* Minimal Nav Items */}
          <div className="hidden md:flex items-center gap-6 text-[11px] font-mono tracking-[0.18em] text-white/70 uppercase">
            <button
              onClick={() => jumpToChapter(1)}
              aria-label="Navigate to Journey section"
              className={`transition-colors cursor-pointer py-1 ${
                currentChapter <= 2
                  ? 'text-[#00D9FF] font-bold border-b-2 border-[#00D9FF]'
                  : 'hover:text-white'
              }`}
            >
              JOURNEY
            </button>
            <button
              onClick={() => jumpToChapter(3)}
              aria-label="Navigate to Projects section"
              className={`transition-colors cursor-pointer py-1 ${
                currentChapter === 3
                  ? 'text-[#00D9FF] font-bold border-b-2 border-[#00D9FF]'
                  : 'hover:text-white'
              }`}
            >
              PROJECTS
            </button>
            <button
              onClick={() => jumpToChapter(4)}
              aria-label="Navigate to Skills section"
              className={`transition-colors cursor-pointer py-1 ${
                currentChapter === 4
                  ? 'text-[#00D9FF] font-bold border-b-2 border-[#00D9FF]'
                  : 'hover:text-white'
              }`}
            >
              SKILLS
            </button>
            <button
              onClick={() => jumpToChapter(6)}
              aria-label="Navigate to Contact section"
              className={`transition-colors cursor-pointer py-1 ${
                currentChapter >= 5
                  ? 'text-[#00D9FF] font-bold border-b-2 border-[#00D9FF]'
                  : 'hover:text-white'
              }`}
            >
              CONTACT
            </button>
          </div>

          {/* 3D Experience vs Classic View Switcher */}
          <button
            onClick={toggleViewMode}
            aria-label={viewMode === '3d' ? 'Switch to Lightweight Classic Portfolio View' : 'Switch to Interactive 3D Journey'}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider font-semibold border transition-all cursor-pointer backdrop-blur-md shadow-sm"
            style={{
              backgroundColor: viewMode === '3d' ? 'rgba(0, 217, 255, 0.12)' : 'rgba(255, 200, 87, 0.12)',
              borderColor: viewMode === '3d' ? 'rgba(0, 217, 255, 0.35)' : 'rgba(255, 200, 87, 0.35)',
              color: viewMode === '3d' ? '#00D9FF' : '#FFC857',
            }}
            title={viewMode === '3d' ? 'Switch to Lightweight Classic Portfolio View' : 'Switch to Interactive 3D Journey'}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: viewMode === '3d' ? '#00D9FF' : '#FFC857' }}
            />
            <span>{viewMode === '3d' ? '3D EXPERIENCE' : 'CLASSIC VIEW'}</span>
          </button>

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
            className="flex items-center justify-center w-8 h-8 rounded-full glass border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer md:hidden"
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
