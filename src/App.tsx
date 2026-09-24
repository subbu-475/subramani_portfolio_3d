import { useEffect, useRef, useCallback, useState } from 'react';
import { useJourneyStore } from './store/journeyStore';
import World from './three/World';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { JourneyMenu } from './components/JourneyMenu';
import { ChapterIndicator } from './components/ChapterIndicator';
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

function App() {
  const {
    setJourneyProgress,
    setWorldReady,
    setLoadingProgress,
    setIsMobile,
    setPrefersReducedMotion,
    journeyProgress,
    isLoading,
  } = useJourneyStore();

  const [hasWebGL, setHasWebGL] = useState(true);
  const scrollAccum = useRef(0);
  const maxScroll = 8000; // Total virtual scroll distance

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

  // Simulate loading progress then mark ready
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setLoadingProgress(100);
        setTimeout(() => setWorldReady(), 400);
      } else {
        setLoadingProgress(progress);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [setLoadingProgress, setWorldReady]);

  // Scroll handler - maps wheel/touch to journey progress
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      scrollAccum.current = Math.max(
        0,
        Math.min(maxScroll, scrollAccum.current + e.deltaY * 1.5)
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
        Math.min(maxScroll, scrollAccum.current + deltaY * 3)
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

  // Sync scroll accumulator when menu navigation changes progress
  useEffect(() => {
    scrollAccum.current = journeyProgress * maxScroll;
  }, [journeyProgress]);

  const handleStartJourney = () => {
    const startVal = scrollAccum.current;
    const targetVal = maxScroll * (1 / 7);
    const duration = 1200;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
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
    <div className="w-screen h-screen overflow-hidden bg-[#050505] relative">
      {/* 3D World */}
      <World />

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Section Content Overlays */}
      {!isLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Chapter 01: The Beginning */}
          <SectionOverlay chapter={0} title="The Beginning" position="center">
            <div className="text-center space-y-3">
              <p className="text-white/40 text-[11px] tracking-[0.4em] uppercase">
                Every journey starts somewhere
              </p>
              <p className="text-xs tracking-widest text-cyan-400 font-mono uppercase">
                Welcome to my journey
              </p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-[0.1em] text-white">
                Hi, I'm {profile.name}.
              </h1>
              <p className="text-cyan-400 text-sm md:text-base tracking-wider max-w-md mx-auto font-medium">
                {profile.title}
              </p>
              <p className="text-white/70 max-w-md mx-auto leading-relaxed text-sm pt-1">
                I build digital experiences, solve problems and continuously learn.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleStartJourney}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-semibold text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.7)] transition-all transform hover:scale-105 pointer-events-auto cursor-pointer"
                >
                  START JOURNEY
                </button>
              </div>
            </div>
          </SectionOverlay>

          {/* Chapter 02: Education */}
          <SectionOverlay chapter={1} title="Education" subtitle="Where it began" position="left">
            {education.map((edu) => (
              <div key={edu.id} className="space-y-2">
                <h3 className="text-xl font-bold text-cyan-400">{edu.degree}</h3>
                <p className="text-white/90 font-medium">{edu.institution}</p>
                <p className="text-white/40 text-xs font-mono">{edu.location} · {edu.period}</p>
                <p className="text-white/70 text-sm">{edu.description}</p>
                <ul className="space-y-1.5 pt-2">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="text-white/60 text-xs flex items-start gap-2">
                      <span className="text-cyan-400 mt-0.5">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </SectionOverlay>

          {/* Chapter 03: First Code */}
          <SectionOverlay chapter={2} title="First Line of Code" subtitle="Curiosity became code" position="right">
            <div className="font-mono text-xs sm:text-sm text-cyan-300 bg-black/60 border border-white/10 p-4 rounded-xl mb-4 shadow-inner">
              <p className="text-white/40 mb-1">{'// Curiosity became code'}</p>
              <p><span className="text-blue-400">const</span> journey = {'{'}</p>
              <p className="pl-4">curiosity: <span className="text-orange-400">true</span>,</p>
              <p className="pl-4">learning: <span className="text-orange-400">true</span>,</p>
              <p className="pl-4">building: <span className="text-orange-400">true</span>,</p>
              <p>{'}'};</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              From writing my first line of code to building full-stack platforms —
              what started as sheer curiosity grew into a lifelong craft of software engineering.
            </p>
          </SectionOverlay>

          {/* Chapter 04: Career */}
          <SectionOverlay chapter={3} title="Career City" subtitle="Professional journey" position="left">
            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-2">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 border-cyan-500/30 pl-4 py-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{exp.title}</h3>
                    {exp.current && (
                      <span className="text-[10px] tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-cyan-400 text-xs font-medium">{exp.company}</p>
                  <p className="text-white/40 text-[11px] font-mono">{exp.location} · {exp.period}</p>
                  <p className="text-white/60 text-xs leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </SectionOverlay>

          {/* Chapter 05: Projects */}
          <SectionOverlay chapter={4} title="Project World" subtitle="What I built" position="right">
            <p className="text-white/70 text-sm mb-3">
              Each building and node represents a major project in production or development.
            </p>
            <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              Approach and click any floating artifact to inspect details.
            </p>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/50 space-y-1">
              <p>• {profile.projectsCompleted} Projects Completed</p>
              <p>• Enterprise ERP, Client Portals, Mobile & MERN</p>
            </div>
          </SectionOverlay>

          {/* Chapter 06: Skills */}
          <SectionOverlay chapter={5} title="Technology Galaxy" subtitle="Tools of the trade" position="left">
            <p className="text-white/70 text-sm mb-3">
              Explore the orbit of languages, frameworks, databases, and tools.
            </p>
            <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              Click any planetary node to explore associated projects.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['React.js', 'Node.js', 'Frappe / ERPNext', 'Flutter', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-[11px] bg-white/5 border border-white/10 rounded-full text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </SectionOverlay>

          {/* Chapter 07: Present */}
          <SectionOverlay chapter={6} title="Current Chapter" subtitle="Where I am today" position="center">
            <div className="text-center space-y-4">
              <p className="text-2xl sm:text-3xl font-light text-white/90 leading-relaxed tracking-wide">
                Building.<br />
                Learning.<br />
                Exploring.
              </p>
              <div className="space-y-2 pt-2">
                {experiences.filter((e) => e.current).map((exp) => (
                  <div key={exp.id} className="p-3 bg-white/5 border border-white/10 rounded-xl max-w-sm mx-auto">
                    <p className="text-cyan-400 font-medium text-sm">{exp.title}</p>
                    <p className="text-white/50 text-xs">{exp.company} · {exp.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </SectionOverlay>

          {/* Chapter 08: Contact */}
          <SectionOverlay chapter={7} title="Next Destination" subtitle="The journey continues" position="center">
            <ContactForm />
          </SectionOverlay>
        </div>
      )}

      {/* UI Overlays */}
      <Navbar />
      <JourneyMenu />
      <ChapterIndicator />
      <InteractionHint />
      <CustomCursor />
      <ProjectDetail />
      <SkillDetail />
      <QualitySettings />
    </div>
  );
}

export default App;
