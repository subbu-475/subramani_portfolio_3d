import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useJourneyStore } from './store/journeyStore';
import World from './three/World';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { JourneyMenu } from './components/JourneyMenu';
import { VerticalTimeline } from './components/VerticalTimeline';
import { InteractionHint } from './components/InteractionHint';
import { CustomCursor } from './components/CustomCursor';
import { ProjectDetail } from './components/ProjectDetail';
import { SkillDetail } from './components/SkillDetail';
import { QualitySettings } from './components/QualitySettings';
import { ChapterPanel } from './components/journey/ChapterPanel';
import { ContactForm } from './components/ContactForm';
import { ClassicView } from './components/ClassicView';
import { profile } from './data/profile';
import { experiences } from './data/experience';
import { PROJECT_COMPARTMENTS } from './data/projectCompartments';
import { TECHNOLOGY_CUBES, TECHNOLOGY_CATEGORIES, type TechnologyCubeData } from './data/technologyCubes';
import { JOURNEY_CHAPTERS } from './data/journey';
import {
  ExternalLink,
  Sparkles,
  Mail,
} from 'lucide-react';
import { Github, Linkedin } from './components/Icons';

const TechBrandIcon: React.FC<{ cube: TechnologyCubeData }> = ({ cube }) => {
  if (cube.id === 'react') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
        <circle cx="50" cy="50" r="10" fill="#00D8FF" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="5" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="5" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="42" ry="16" stroke="#00D8FF" strokeWidth="5" transform="rotate(120 50 50)" />
      </svg>
    );
  }
  if (cube.id === 'typescript') {
    return <span className="font-extrabold text-sm text-[#3178C6]">TS</span>;
  }
  if (cube.id === 'javascript') {
    return <span className="font-extrabold text-sm text-[#F7DF1E]">JS</span>;
  }
  if (cube.id === 'nodejs') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
        <polygon points="50,12 86,33 86,74 50,95 14,74 14,33" stroke="#339933" strokeWidth="6" fill="#33993325" />
        <text x="50" y="59" textAnchor="middle" fill="#339933" fontSize="26" fontWeight="bold">JS</text>
      </svg>
    );
  }
  if (cube.id === 'python') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
        <path d="M48,16 C30,16 30,26 30,26 L30,34 L48,34 L48,38 L22,38 C14,38 10,48 10,58 C10,68 18,72 26,72 L32,72 L32,64 C32,54 40,54 48,54 L62,54 C70,54 74,48 74,38 C74,28 70,16 48,16 Z" fill="#3776AB" />
        <path d="M52,84 C70,84 70,74 70,74 L70,66 L52,66 L52,62 L78,62 C86,62 90,52 90,42 C90,32 82,28 74,28 L68,28 L68,36 C68,46 60,46 52,46 L38,46 C30,46 26,52 26,62 C26,72 30,84 52,84 Z" fill="#FFD43B" />
      </svg>
    );
  }
  if (cube.id === 'docker') {
    return (
      <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none">
        <path d="M10,55 C12,45 28,45 42,48 C50,45 68,45 80,55 C92,65 85,78 68,78 C42,78 20,75 10,55 Z" fill="#2496ED" />
        <rect x="30" y="38" width="10" height="8" fill="#2496ED" />
        <rect x="44" y="38" width="10" height="8" fill="#2496ED" />
        <rect x="44" y="28" width="10" height="8" fill="#2496ED" />
      </svg>
    );
  }
  return (
    <span className="text-sm font-extrabold" style={{ color: cube.brandColor }}>
      {cube.name.slice(0, 2).toUpperCase()}
    </span>
  );
};

function App() {
  const {
    setJourneyProgress,
    setWorldReady,
    setLoadingProgress,
    setIsMobile,
    setPrefersReducedMotion,
    journeyProgress,
    isLoading,
    openProjectDetail,
    selectedProjectIndex,
    setSelectedProjectIndex,
    selectedExperienceIndex,
    setSelectedExperienceIndex,
    selectedSkillCategoryIndex,
    setSelectedSkillCategoryIndex,
    selectedTechCubeId,
    setSelectedTechCubeId,
    viewMode,
    jumpToChapter,
  } = useJourneyStore();

  const activeExp = useMemo(() => {
    return experiences[selectedExperienceIndex] || experiences[0];
  }, [selectedExperienceIndex]);

  const activeTechCube = useMemo(() => {
    return TECHNOLOGY_CUBES.find((c) => c.id === selectedTechCubeId) || TECHNOLOGY_CUBES[0];
  }, [selectedTechCubeId]);

  const [hasWebGL, setHasWebGL] = useState(true);
  const scrollAccum = useRef(0);
  const maxScroll = 7000; // Virtual scroll units for 7 chapters

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      if (!supported) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Detect mobile and reduced motion
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(isMobile);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    setPrefersReducedMotion(prefersReducedMotion);
  }, [setIsMobile, setPrefersReducedMotion]);

  // Loading sequence
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 16 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => setWorldReady(), 450);
      } else {
        setLoadingProgress(progress);
      }
    }, 120);
    return () => clearInterval(interval);
  }, [setLoadingProgress, setWorldReady]);

  // Scroll handler - maps wheel/touch to journey progress
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current = Math.max(
        0,
        Math.min(maxScroll, scrollAccum.current + e.deltaY * 1.6)
      );
      const progress = scrollAccum.current / maxScroll;
      setJourneyProgress(progress);
    },
    [setJourneyProgress]
  );

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Touch support
  const touchStartY = useRef(0);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = touchStartY.current - e.touches[0].clientY;
      touchStartY.current = e.touches[0].clientY;
      scrollAccum.current = Math.max(
        0,
        Math.min(maxScroll, scrollAccum.current + deltaY * 3.2)
      );
      setJourneyProgress(scrollAccum.current / maxScroll);
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [setJourneyProgress]);

  // Sync scroll accumulator when menu or timeline jumps
  useEffect(() => {
    scrollAccum.current = journeyProgress * maxScroll;
  }, [journeyProgress]);

  // Keyboard navigation support (Arrow keys, PageUp/Down, Space, Home, End, 1-7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in form inputs or textareas
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollAccum.current = Math.min(maxScroll, scrollAccum.current + 360);
        setJourneyProgress(scrollAccum.current / maxScroll);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollAccum.current = Math.max(0, scrollAccum.current - 360);
        setJourneyProgress(scrollAccum.current / maxScroll);
      } else if (e.key === 'Home') {
        e.preventDefault();
        jumpToChapter(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        jumpToChapter(6);
      } else if (e.key >= '1' && e.key <= '7') {
        const chapterIdx = parseInt(e.key, 10) - 1;
        jumpToChapter(chapterIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jumpToChapter, setJourneyProgress]);

  const handleStartJourney = () => {
    const startVal = scrollAccum.current;
    const targetProgress = JOURNEY_CHAPTERS[1]?.landmarkProgress ?? 0.16;
    const targetVal = maxScroll * targetProgress;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - t, 3);
      const val = startVal + (targetVal - startVal) * ease;
      scrollAccum.current = val;
      setJourneyProgress(val / maxScroll);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  if (!hasWebGL || viewMode === 'classic') {
    return (
      <div className="w-full min-h-screen bg-[#050816]">
        <Navbar />
        <ClassicView />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050816] relative select-none">
      {/* 3D World */}
      <World />

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Vertical Chapter Progression Timeline */}
      <VerticalTimeline />

      {/* Section Content Overlays */}
      {!isLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Chapter 00: Home / Hero — SUBRAMANI */}
          <ChapterPanel chapter={0} position="hero">
            <div className="space-y-4 sm:space-y-5">
              {/* Content hierarchy: NAME → ROLE → DESCRIPTION → TECH STACK → CTA */}
              <div className="space-y-1">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.05] drop-shadow-lg">
                  SUBRAMANI
                </h1>
                <p className="text-base sm:text-lg md:text-xl font-mono font-bold tracking-widest text-[#00D9FF] uppercase">
                  FULL STACK DEVELOPER
                </p>
              </div>

              <p className="text-sm sm:text-base md:text-lg text-[#94A3B8] leading-relaxed font-normal max-w-sm sm:max-w-md">
                "Building modern web, mobile & enterprise applications."
              </p>

              {/* Technology Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['React', 'Node.js', 'TypeScript', 'Frappe', 'Flutter', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/10 text-white/90 text-xs font-mono font-medium backdrop-blur-sm shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <button
                  onClick={handleStartJourney}
                  className="px-6 py-3 rounded-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,217,255,0.4)] cursor-pointer pointer-events-auto transform hover:scale-[1.02]"
                >
                  EXPLORE MY JOURNEY
                </button>
                <button
                  onClick={() => jumpToChapter(3)}
                  className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 hover:border-[#FFC857]/60 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer pointer-events-auto"
                >
                  VIEW PROJECTS
                </button>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 01: Education */}
          <ChapterPanel
            chapter={1}
            chapterNumberText="01 EDUCATION"
            title="EDUCATION"
            tagline="Where the journey began."
            position="right"
          >
            <div className="glass p-5 sm:p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-3 bg-[rgba(5,8,22,0.85)] mt-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Bachelor of Engineering in Computer Science
                </h3>
                <span className="text-xs font-mono font-semibold text-[#FFC857]">
                  Oxford Engineering College
                </span>
              </div>

              <div className="flex items-center justify-between text-white/70 text-xs font-mono border-t border-white/10 pt-2.5">
                <span className="text-[#00D9FF] font-medium">2023 – 2026</span>
                <span>Pirattiyur, Trichy</span>
              </div>

              <p className="text-xs text-white/80 leading-relaxed pt-1.5 border-t border-white/5">
                Focused on software engineering, algorithms and web development.
              </p>
            </div>
          </ChapterPanel>

          {/* Chapter 02: Career */}
          <ChapterPanel
            chapter={2}
            chapterNumberText="02 CAREER"
            title="DEVELOPER CITY"
            tagline="Career Milestones & Corporate Towers"
            description="Each building represents a stage in my professional journey. Click a building to inspect details."
            position="right"
          >
            <div className="space-y-3 max-w-lg max-h-[50vh] sm:max-h-[54vh] overflow-y-auto pr-1">
              {/* Milestone Selector Tabs */}
              <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                {experiences.map((exp, idx) => {
                  const isSel = idx === selectedExperienceIndex;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedExperienceIndex(idx)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSel
                          ? 'bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] font-bold shadow-sm'
                          : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={isSel ? 'text-[#00D9FF] font-bold' : 'text-white/35'}>0{idx + 1}</span>
                      <span className="tracking-wider">{exp.company.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Milestone Card */}
              <div className="glass p-5 rounded-2xl border border-white/10 hover:border-[#00D9FF]/40 transition-all space-y-3 backdrop-blur-xl bg-[rgba(5,8,22,0.88)] shadow-2xl">
                <div className="flex items-start justify-between gap-2 border-b border-white/10 pb-2">
                  <div>
                    <h4 className="text-white font-bold text-base tracking-tight">{activeExp.title}</h4>
                    <p className="text-[#00D9FF] text-xs font-semibold pt-0.5">{activeExp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] whitespace-nowrap">
                      {activeExp.period}
                    </span>
                    <p className="text-[10px] font-mono text-white/40 pt-0.5">{activeExp.location}</p>
                  </div>
                </div>

                <p className="text-[#94A3B8] text-xs leading-relaxed">
                  {activeExp.description}
                </p>

                {/* Key Responsibilities & Achievements */}
                <div className="space-y-1.5 pt-1 border-t border-white/5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    RESPONSIBILITIES & ACHIEVEMENTS
                  </span>
                  <div className="space-y-1">
                    {activeExp.achievements.map((ach, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-white/80">
                        <span className="text-[#00D9FF] mt-0.5">▸</span>
                        <span className="leading-snug">{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="pt-1.5 border-t border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest block">
                    TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeExp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 03: Projects — Project Railway Terminal */}
          <ChapterPanel
            chapter={3}
            chapterNumberText="03 PROJECTS"
            title="PROJECT RAILWAY TERMINAL"
            tagline="High-speed journey of built software solutions."
            description="A project express arrives at the terminal. Each train compartment represents a project category."
            position="left"
          >
            <div className="space-y-2.5 max-w-sm sm:max-w-md pt-0.5">
              {/* Category Train Compartment Coach Selector */}
              <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                {PROJECT_COMPARTMENTS.map((comp, idx) => {
                  const isSel = idx === selectedProjectIndex;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setSelectedProjectIndex(idx)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSel
                          ? 'bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] font-bold shadow-sm'
                          : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={isSel ? 'text-[#00D9FF] font-bold' : 'text-white/35'}>{comp.coachCode}</span>
                      <span className="tracking-wider">{comp.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Project Information Panel */}
              <div className="glass p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-2.5 bg-[rgba(10,15,25,0.85)]">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
                  <span className="text-[#00D9FF] font-semibold tracking-widest uppercase flex items-center gap-1.5">
                    <span>COACH {PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachCode}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70 text-[10px]">{PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachType}</span>
                  </span>
                  <span className="text-[#FFC857] uppercase tracking-wider text-[10px] bg-[#FFC857]/10 px-2 py-0.5 rounded border border-[#FFC857]/30">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.categoryName}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase leading-snug">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.title}
                  </h3>
                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.description}
                  </p>
                </div>

                {/* Inline Technology Stack Tags */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    ROLE: FULL STACK DEVELOPER
                  </span>
                  <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono text-[#00D9FF] font-medium">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/85 text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA & Links */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openProjectDetail(PROJECT_COMPARTMENTS[selectedProjectIndex]?.projectId || 'ecommerce')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00D9FF]/20 hover:bg-[#00D9FF]/30 border border-[#00D9FF]/50 hover:border-[#00D9FF] text-[#00D9FF] text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
                  >
                    <span>VIEW PROJECT</span>
                    <span>→</span>
                  </button>
                  {PROJECT_COMPARTMENTS[selectedProjectIndex]?.demoUrl && (
                    <a
                      href={PROJECT_COMPARTMENTS[selectedProjectIndex].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-white/60 hover:text-white transition-colors"
                    >
                      <span>LIVE SITE</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                  {PROJECT_COMPARTMENTS[selectedProjectIndex]?.githubUrl && (
                    <a
                      href={PROJECT_COMPARTMENTS[selectedProjectIndex].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-white/60 hover:text-white transition-colors"
                    >
                      <span>GITHUB</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 04: Technology */}
          <ChapterPanel
            chapter={4}
            chapterNumberText="04 TECHNOLOGY"
            title="TECHNOLOGY CITY"
            tagline="Tools that power my journey."
            description="A structured technology city organizing modern frontend, backend, database and devops tooling."
            position="right"
          >
            <div className="space-y-4 pt-1">
              {/* Category Pill Navigation Chips */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                {TECHNOLOGY_CATEGORIES.map((cat) => {
                  const isSel = cat.row === selectedSkillCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedSkillCategoryIndex(cat.row);
                        const firstCube = TECHNOLOGY_CUBES.find((c) => c.row === cat.row);
                        if (firstCube) setSelectedTechCubeId(firstCube.id);
                      }}
                      className={`px-3 py-1 rounded-lg text-[11px] font-mono font-medium tracking-wider transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#00D9FF]/20 border border-[#00D9FF] text-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.3)]'
                          : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Technology Detail Card */}
              <div className="glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-4 bg-[rgba(10,15,25,0.85)]">
                {/* Top Row: Icon + Title + Category Pill */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-lg"
                      style={{
                        backgroundColor: activeTechCube.bgColor,
                        borderColor: activeTechCube.brandColor,
                        boxShadow: `0 0 16px ${activeTechCube.brandColor}40`,
                      }}
                    >
                      <TechBrandIcon cube={activeTechCube} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {activeTechCube.name}
                      </h3>
                    </div>
                  </div>

                  <span
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider font-semibold border"
                    style={{
                      color: activeTechCube.brandColor,
                      borderColor: `${activeTechCube.brandColor}60`,
                      backgroundColor: `${activeTechCube.brandColor}18`,
                    }}
                  >
                    {activeTechCube.shortTag}
                  </span>
                </div>

                <p className="text-white/80 text-xs sm:text-[13px] leading-relaxed">
                  {activeTechCube.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {activeTechCube.features.map((feature: string, fIdx: number) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-white/90 text-[11px] font-mono"
                    >
                      <span className="text-[#00D9FF] text-[11px]">⬡</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 05: Future — Launch Hub */}
          <ChapterPanel
            chapter={5}
            chapterNumberText="05 FUTURE"
            title="NEXT DESTINATION"
            tagline="Future Launch Hub"
            description="The airplane arrives at a futuristic launch platform preparing to launch toward the sky."
            position="left"
          >
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-4 mt-1 bg-[rgba(10,15,25,0.85)]">
              <div className="flex items-center gap-2 text-[#00D9FF] text-xs font-mono tracking-widest uppercase">
                <Sparkles size={16} />
                <span>EXPEDITION HORIZONS</span>
              </div>

              {/* Visual concept: AI • SYSTEM DESIGN • CLOUD • DEVOPS • OPEN SOURCE */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
                {['AI', 'SYSTEM DESIGN', 'CLOUD', 'DEVOPS', 'OPEN SOURCE'].map((pillar, pIdx) => (
                  <div
                    key={pillar}
                    className={`flex items-center gap-2 p-2 rounded-xl bg-white/[0.04] border border-white/10 ${
                      pIdx === 0 ? 'col-span-2 border-[#00D9FF]/40 bg-[#00D9FF]/10 text-[#00D9FF] font-bold' : 'text-white/80'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00D9FF]" />
                    <span>{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs text-white/70 border-t border-white/10 pt-3">
                <div className="flex items-start gap-2">
                  <span className="text-[#00D9FF] mt-0.5">▸</span>
                  <span>Expanding deep expertise in distributed backend systems & AI integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00D9FF] mt-0.5">▸</span>
                  <span>Creating high-reliability enterprise ERP architectures and real-time platforms</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#00D9FF] mt-0.5">▸</span>
                  <span>Contributing to open-source developer ecosystems and global products</span>
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 06: Contact — Control Room */}
          <ChapterPanel
            chapter={6}
            chapterNumberText="06 CONTACT"
            title="LET'S BUILD SOMETHING."
            tagline="Have an idea, project or opportunity? Let's turn it into a working product."
            position="center"
          >
            <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 max-w-xl mx-auto shadow-2xl backdrop-blur-2xl space-y-6 bg-[rgba(10,15,25,0.85)]">
              {/* Buttons: EMAIL ME, GITHUB, LINKEDIN, DOWNLOAD RESUME */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-4 py-2 rounded-full bg-[#00D9FF] text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#00D9FF]/90 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,217,255,0.3)] cursor-pointer"
                >
                  <Mail size={13} />
                  <span>EMAIL ME</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Github size={13} />
                  <span>GITHUB</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Linkedin size={13} />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Subramani_Resume.pdf"
                  aria-label="Download Subramani's Resume PDF"
                  className="px-4 py-2 rounded-full bg-[#FFC857]/10 hover:bg-[#FFC857]/20 border border-[#FFC857]/40 text-[#FFC857] text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink size={13} />
                  <span>DOWNLOAD RESUME</span>
                </a>
              </div>

              <div className="pt-2 border-t border-white/10">
                <ContactForm />
              </div>
            </div>
          </ChapterPanel>
        </div>

      )}

      {/* Global UI Overlays */}
      <Navbar />
      <JourneyMenu />
      <InteractionHint />
      <CustomCursor />
      <ProjectDetail />
      <SkillDetail />
      <QualitySettings />
    </div>
  );
}

export default App;
