import { useEffect, useRef, useCallback, useState } from 'react';
import { useJourneyStore, CHAPTERS_DATA } from './store/journeyStore';
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
import { SectionOverlay } from './components/SectionOverlay';
import { ContactForm } from './components/ContactForm';
import { Fallback2D } from './components/Fallback2D';
import { profile } from './data/profile';
import { education } from './data/education';
import { experiences } from './data/experience';
import { projects } from './data/projects';
import { GraduationCap, User, ArrowRight, ExternalLink } from 'lucide-react';

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
    jumpToChapter,
  } = useJourneyStore();

  const [hasWebGL, setHasWebGL] = useState(true);
  const scrollAccum = useRef(0);
  const maxScroll = 9000; // Virtual scroll units for 9 chapters

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

  const handleStartJourney = () => {
    const startVal = scrollAccum.current;
    const targetVal = maxScroll * (1 / (CHAPTERS_DATA.length - 1));
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

  if (!hasWebGL) {
    return <Fallback2D />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050505] relative select-none">
      {/* 3D World */}
      <World />

      {/* Loading Screen (Matching Reference Panel 1) */}
      <LoadingScreen />

      {/* Vertical Chapter Progression Timeline (Matching Reference Panels 4, 6, 7, 8, 9, 10) */}
      <VerticalTimeline />

      {/* Section Content Overlays */}
      {!isLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Chapter 00: Intro / Hero (Matching Reference Panel 2) */}
          <SectionOverlay chapter={0} title={profile.name} position="hero">
            <div className="space-y-4">
              <span className="text-white/80 text-xl font-medium tracking-wide block">
                Hi, I'm
              </span>
              <p className="text-cyan-400 text-xl sm:text-2xl font-bold tracking-wide -mt-2">
                {profile.shortTitle}
              </p>
              <p className="text-white/70 max-w-md text-sm leading-relaxed">
                I build digital experiences, solve real world problems and continuously learn.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartJourney}
                  className="flex items-center gap-3 px-7 py-3.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/50 hover:border-cyan-400 text-white font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:scale-105 pointer-events-auto cursor-pointer"
                >
                  START JOURNEY <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </SectionOverlay>

          {/* Chapter 01: Education (Matching Reference Panel 4) */}
          <SectionOverlay
            chapter={1}
            chapterNumberText="CHAPTER 01"
            title="EDUCATION"
            tagline="Where the journey began."
            description="The foundation, the learning, and the curiosity that started it all."
            position="left"
          >
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass p-6 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-2 mt-2"
              >
                <div className="flex items-center gap-3 text-cyan-400 mb-1">
                  <GraduationCap size={22} />
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                </div>
                <p className="text-cyan-400/90 text-xs font-semibold">{edu.institution}</p>
                <p className="text-white/40 text-[11px] font-mono">{edu.period}</p>
                <p className="text-white/60 text-xs pt-1 leading-relaxed">
                  Relevant coursework, skills and learning experience.
                </p>
              </div>
            ))}
          </SectionOverlay>

          {/* Chapter 02: First Line of Code (Matching Reference Panel 5) */}
          <SectionOverlay
            chapter={2}
            chapterNumberText="CHAPTER 02"
            title="FIRST LINE OF CODE"
            tagline="Curiosity became code."
            position="left"
          />
          {/* Right-side quote card for Chapter 02 (Matching Reference Panel 5) */}
          <SectionOverlay chapter={2} title="" position="right">
            <div className="glass p-6 rounded-2xl border border-white/10 max-w-sm shadow-2xl backdrop-blur-xl">
              <p className="text-white/80 text-sm leading-relaxed italic">
                "The moment I realized I can build, create and solve problems through code."
              </p>
            </div>
          </SectionOverlay>

          {/* Chapter 03: Career (Matching Reference Panel 6) */}
          <SectionOverlay
            chapter={3}
            chapterNumberText="CHAPTER 03"
            title="CAREER"
            tagline="Turning skills into impact."
            description="A journey of learning, building and contributing to real world products."
            position="left"
          />

          {/* Chapter 04: Projects (Matching Reference Panel 7) */}
          <SectionOverlay
            chapter={4}
            chapterNumberText="CHAPTER 04"
            title="PROJECTS"
            tagline="Ideas into real products."
            description="A collection of projects that solve real problems."
            position="left"
          >
            {/* Horizontal Project Thumbnail Cards Strip (Matching Reference Panel 7) */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 pt-4 overflow-x-auto max-w-lg">
              {projects.slice(0, 3).map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => openProjectDetail(proj.id)}
                  className="glass p-3.5 rounded-xl border border-white/10 hover:border-cyan-400/50 flex-1 min-w-[140px] text-left transition-all hover:scale-105 group"
                >
                  <p className="text-white font-semibold text-xs truncate group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </p>
                  <span className="text-[10px] text-white/50 capitalize font-mono block mt-0.5">
                    {proj.category} Solution
                  </span>
                </button>
              ))}
            </div>
          </SectionOverlay>

          {/* Chapter 05: Skills (Matching Reference Panel 8) */}
          <SectionOverlay
            chapter={5}
            chapterNumberText="CHAPTER 05"
            title="SKILLS"
            tagline="Tools that power my journey."
            description="Technologies I work with and continuously explore."
            position="left"
          />

          {/* Chapter 06: Where I Am Today / Present (Matching Reference Panel 9) */}
          <SectionOverlay
            chapter={6}
            chapterNumberText="CHAPTER 06"
            title="WHERE I AM TODAY"
            tagline="Building. Learning. Exploring."
            position="left"
          >
            <div className="glass p-6 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-3 mt-2">
              <div className="flex items-center gap-3 text-cyan-400">
                <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Associate Software Developer</h3>
                  <p className="text-cyan-400 text-xs">at KO Innovation Software Solutions</p>
                </div>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Working on meaningful products, collaborating with great people and continuously improving.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React', 'Node.js', 'Frappe', 'Flutter', 'MongoDB', 'AWS'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] bg-white/5 rounded border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </SectionOverlay>

          {/* Chapter 07: The Journey Continues (Matching Reference Panel 10) */}
          <SectionOverlay
            chapter={7}
            chapterNumberText="CHAPTER 07"
            title="THE JOURNEY CONTINUES"
            tagline="Still learning. Still building. Still moving forward."
            description="Excited for new opportunities, bigger challenges and greater impact."
            position="left"
          />

          {/* Chapter 08: Next Destination / Contact (Matching Reference Panel 11) */}
          <SectionOverlay
            chapter={8}
            chapterNumberText="CHAPTER 08"
            title="NEXT DESTINATION"
            tagline="Maybe we build something together."
            position="left"
          >
            <ContactForm />
          </SectionOverlay>
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
