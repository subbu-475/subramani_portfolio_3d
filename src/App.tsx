import { useEffect, useRef, useCallback, useState } from 'react';
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
import { Fallback2D } from './components/Fallback2D';
import { profile } from './data/profile';
import { education } from './data/education';
import { experiences } from './data/experience';
import { projects } from './data/projects';
import { skillCategories } from './data/skills';
import { JOURNEY_CHAPTERS } from './data/journey';
import {
  GraduationCap,
  User,
  ArrowRight,
  ExternalLink,
  Terminal,
  Sparkles,
} from 'lucide-react';

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
    openSkillDetail,
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

  if (!hasWebGL) {
    return <Fallback2D />;
  }

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#050505] relative select-none">
      {/* 3D World */}
      <World />

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Vertical Chapter Progression Timeline */}
      <VerticalTimeline />

      {/* Section Content Overlays */}
      {!isLoading && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Chapter 00: Intro / Hero */}
          <ChapterPanel chapter={0} title={profile.name} position="hero">
            <div className="space-y-4">
              <span className="text-white/80 text-xl font-medium tracking-wide block">
                Hi, I'm
              </span>
              <p className="text-cyan-400 text-xl sm:text-2xl font-bold tracking-wide -mt-2">
                {profile.shortTitle}
              </p>
              <p className="text-white/70 max-w-md text-sm leading-relaxed">
                {profile.bio}
              </p>
              <div className="pt-2">
                <button
                  onClick={handleStartJourney}
                  className="flex items-center gap-3 px-7 py-3.5 bg-cyan-950/50 hover:bg-cyan-900/70 border border-cyan-400/50 hover:border-cyan-400 text-white font-semibold text-xs tracking-[0.2em] uppercase rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all transform hover:scale-105 pointer-events-auto cursor-pointer"
                >
                  START JOURNEY <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 01: Education (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={1}
            chapterNumberText="CHAPTER 01"
            title="EDUCATION"
            tagline="Where the journey began."
            description="The foundation, the learning, and the curiosity that started it all."
            position="right"
          >
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass p-5 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-2 mt-2"
              >
                <div className="flex items-center gap-3 text-cyan-400 mb-1">
                  <GraduationCap size={22} />
                  <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                </div>
                <p className="text-cyan-400/90 text-xs font-semibold">{edu.institution}</p>
                <div className="flex items-center justify-between text-white/50 text-[11px] font-mono">
                  <span>{edu.period}</span>
                  <span>{edu.location}</span>
                </div>
                <p className="text-white/60 text-xs pt-1 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            ))}
          </ChapterPanel>

          {/* Chapter 02: First Line of Code (Landmark on RIGHT -> Overlay on LEFT) */}
          <ChapterPanel
            chapter={2}
            chapterNumberText="CHAPTER 02"
            title="FIRST LINE OF CODE"
            tagline="Curiosity became code."
            description="The pivotal moment when logic and problem solving clicked into place."
            position="left"
          >
            <div className="glass p-5 sm:p-6 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Terminal size={16} />
                <span>DEVELOPER ROOTS</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed italic border-l-2 border-cyan-400/60 pl-3">
                "The moment I realized I can build, create and solve problems through code."
              </p>
              <div className="space-y-1.5 pt-1 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Explored algorithms, data structures & modern full-stack web</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Transitioned from curious student to product builder</span>
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 03: Career (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={3}
            chapterNumberText="CHAPTER 03"
            title="CAREER"
            tagline="Turning skills into impact."
            description="A journey of building and contributing to enterprise products and client platforms."
            position="right"
          >
            <div className="space-y-3 max-w-lg max-h-[46vh] sm:max-h-[50vh] overflow-y-auto pr-1">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="glass p-4 rounded-xl border border-white/10 hover:border-cyan-400/40 transition-all space-y-2 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-white font-bold text-sm">{exp.title}</h4>
                      <p className="text-cyan-400 text-xs font-semibold">{exp.company}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/5 border border-white/10 text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ChapterPanel>

          {/* Chapter 04: Projects (Landmark on RIGHT -> Overlay on LEFT) */}
          <ChapterPanel
            chapter={4}
            chapterNumberText="CHAPTER 04"
            title="PROJECTS"
            tagline="Ideas into real products."
            description="Selected enterprise, mobile, and web applications built from scratch."
            position="left"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 max-w-lg">
              {projects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => openProjectDetail(proj.id)}
                  className="glass p-3.5 rounded-xl border border-white/10 hover:border-cyan-400/50 text-left transition-all hover:scale-[1.02] group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">
                      {proj.category}
                    </span>
                    <ExternalLink size={12} className="text-white/40 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <h4 className="text-white font-bold text-xs truncate group-hover:text-cyan-400 transition-colors">
                    {proj.title}
                  </h4>
                  <p className="text-white/50 text-[11px] line-clamp-2 mt-1 leading-snug">
                    {proj.shortDescription}
                  </p>
                </button>
              ))}
            </div>
          </ChapterPanel>

          {/* Chapter 05: Technology Galaxy (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={5}
            chapterNumberText="CHAPTER 05"
            title="TECHNOLOGY GALAXY"
            tagline="Tools that power my journey."
            description="Core technologies, frameworks, and database architectures."
            position="right"
          >
            <div className="space-y-2.5 max-w-lg max-h-[46vh] overflow-y-auto pr-1">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="glass p-3 rounded-xl border border-white/10 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-semibold block">
                    {cat.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => openSkillDetail(s.name)}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-white/5 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-400 text-white/80 hover:text-cyan-300 transition-all cursor-pointer"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ChapterPanel>

          {/* Chapter 06: Where I Am Today (Landmark on RIGHT -> Overlay on LEFT) */}
          <ChapterPanel
            chapter={6}
            chapterNumberText="CHAPTER 06"
            title="WHERE I AM TODAY"
            tagline="Building. Learning. Exploring."
            position="left"
          >
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-3 mt-1">
              <div className="flex items-center gap-3 text-cyan-400">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Associate Software Developer</h3>
                  <p className="text-cyan-400 text-xs">at KO Innovation Software Solutions</p>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">
                Building high-performance full-stack applications, scalable backend microservices, and custom Frappe ERP solutions.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['React', 'Node.js', 'TypeScript', 'Frappe ERP', 'Flutter', 'MongoDB', 'AWS', 'Docker'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] font-mono bg-white/5 rounded border border-white/10 text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 07: The Journey Continues (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={7}
            chapterNumberText="CHAPTER 07"
            title="THE JOURNEY CONTINUES"
            tagline="Still learning. Still building. Still moving forward."
            description="Excited for new opportunities, bigger engineering challenges, and greater impact."
            position="right"
          >
            <div className="glass p-5 rounded-2xl border border-white/10 max-w-md shadow-2xl backdrop-blur-xl space-y-3 mt-1">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                <Sparkles size={16} />
                <span>NEXT HORIZONS</span>
              </div>
              <div className="space-y-2 text-xs text-white/70">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Expanding deep expertise in distributed backend systems & AI integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Creating high-reliability enterprise ERP architectures and real-time platforms</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span>Contributing to open-source developer ecosystems and global products</span>
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 08: Next Destination / Contact (In Deep Space) */}
          <ChapterPanel
            chapter={8}
            chapterNumberText="CHAPTER 08"
            title="NEXT DESTINATION"
            tagline="Maybe we build something together."
            position="left"
          >
            <ContactForm />
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
