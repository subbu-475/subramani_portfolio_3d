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
import { PROJECT_COMPARTMENTS } from './data/projectCompartments';
import { skillCategories } from './data/skills';
import { JOURNEY_CHAPTERS } from './data/journey';
import {
  User,
  ExternalLink,
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
    selectedProjectIndex,
    setSelectedProjectIndex,
    selectedSkillCategoryIndex,
    setSelectedSkillCategoryIndex,
  } = useJourneyStore();

  const selectedSkillCategory = skillCategories[selectedSkillCategoryIndex] || skillCategories[0];

  const [hasWebGL, setHasWebGL] = useState(true);
  const scrollAccum = useRef(0);
  const maxScroll = 8000; // Virtual scroll units for 8 chapters

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
          {/* Chapter 00: Intro / Hero — The Journey Begins */}
          <ChapterPanel chapter={0} position="hero">
            <div className="space-y-4 sm:space-y-5">
              {/* 1. Small uppercase label */}
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.22em] text-amber-200/80 uppercase">
                  THE JOURNEY BEGINS
                </span>
              </div>

              {/* 2. Large headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-md">
                I'm Subramani.
              </h1>

              {/* 3. Medium accent text */}
              <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wider text-amber-300 uppercase">
                FULL STACK DEVELOPER
              </p>

              {/* 4. Small readable text */}
              <p className="text-xs sm:text-sm md:text-[15px] text-stone-300/85 leading-relaxed font-normal max-w-sm sm:max-w-md">
                I build software, explore technology, and keep moving forward.
              </p>

              {/* 5. Minimalist START THE JOURNEY Button */}
              <div className="pt-2 sm:pt-3">
                <button
                  onClick={handleStartJourney}
                  className="group flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 hover:border-amber-300/60 rounded-full text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-md cursor-pointer pointer-events-auto transform hover:translate-x-1"
                >
                  <span>START THE JOURNEY</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 01: Education (Landmark on LEFT -> Overlay in negative space on RIGHT) */}
          <ChapterPanel
            chapter={1}
            chapterNumberText="CHAPTER 02"
            title="EDUCATION"
            tagline="Where the journey began."
            position="right"
          >
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-3 bg-[#10141C]/80 mt-2"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    Bachelor of Engineering in Computer Science
                  </h3>
                  <span className="text-xs font-mono font-semibold text-amber-300">
                    (BE)
                  </span>
                </div>

                <div className="border-t border-white/10 pt-2.5 space-y-1">
                  <p className="text-xs sm:text-sm font-semibold text-white/90">
                    {edu.institution}
                  </p>
                  <div className="flex items-center justify-between text-white/60 text-[11px] font-mono">
                    <span className="text-amber-200/90 font-medium">2023 – 2026</span>
                    <span>{edu.location}</span>
                  </div>
                </div>

                <p className="text-xs text-white/75 leading-relaxed pt-1.5 border-t border-white/5">
                  {edu.description}
                </p>
              </div>
            ))}
          </ChapterPanel>

          {/* Chapter 02: Career (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={2}
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

          {/* Chapter 03: Projects / Project Express Railway Station */}
          {/* Chapter 03: Projects / Indian Vande Bharat Express at Railway Gate */}
          <ChapterPanel
            chapter={3}
            chapterNumberText="CHAPTER 04"
            title="VANDE BHARAT EXPRESS"
            tagline="Project Express • Level Crossing"
            description="The Indian Vande Bharat Express crosses the journey path, with each compartment highlighting built software solutions."
            position="left"
          >
            <div className="space-y-2.5 max-w-sm sm:max-w-md pt-0.5">
              {/* 1. Indian Railways Vande Bharat Ticket UI */}
              <div className="glass p-3 rounded-xl border border-orange-500/40 bg-[#0A1325]/90 shadow-xl space-y-1.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-1 text-[10px] font-mono">
                  <span className="text-orange-400 font-bold tracking-widest flex items-center gap-1.5">
                    <span>🚆</span>
                    <span>VANDE BHARAT // 20608 PROJECT EXPRESS</span>
                  </span>
                  <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-500/30">GATE LC-47</span>
                </div>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono text-white/70 pt-0.5">
                  <div>
                    <span className="text-white/40 block text-[9px]">ENGINEER:</span>
                    <span className="text-white font-semibold">SUBRAMANI</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px]">COACH:</span>
                    <span className="text-orange-400 font-semibold">{PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachCode} • {PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachType}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px]">SPEED:</span>
                    <span className="text-cyan-300 font-semibold">160 KM/H</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px]">DESTINATION:</span>
                    <span className="text-amber-300 font-semibold">PRODUCTION READY</span>
                  </div>
                </div>
              </div>

              {/* 2. Floating Train Compartment Coach Selector */}
              <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md">
                {PROJECT_COMPARTMENTS.map((comp, idx) => {
                  const isSel = idx === selectedProjectIndex;
                  return (
                    <button
                      key={comp.id}
                      onClick={() => setSelectedProjectIndex(idx)}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSel
                          ? 'bg-orange-500/25 border border-orange-500/70 text-orange-200 font-bold shadow-sm'
                          : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className={isSel ? 'text-orange-400 font-bold' : 'text-white/35'}>{comp.coachCode}</span>
                      <span className="tracking-wider">{comp.title}</span>
                    </button>
                  );
                })}
              </div>

              {/* 3. Selected Compartment Information Panel */}
              <div className="glass p-4 sm:p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-2.5 bg-[#0B1321]/95">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
                  <span className="text-orange-400 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                    <span>COACH {PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachCode}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-white/70 text-[10px]">{PROJECT_COMPARTMENTS[selectedProjectIndex]?.coachType}</span>
                  </span>
                  <span className="text-cyan-400 uppercase tracking-wider text-[10px] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                    PROJECT CATEGORY
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight uppercase leading-snug">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.categoryName}
                  </h3>
                  <p className="text-xs text-amber-200/90 font-medium italic pt-0.5">
                    "{PROJECT_COMPARTMENTS[selectedProjectIndex]?.tagline}"
                  </p>
                  <p className="text-xs text-white/70 leading-relaxed pt-1">
                    {PROJECT_COMPARTMENTS[selectedProjectIndex]?.description}
                  </p>
                </div>

                {/* Inline Technology Stack Tags */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono text-cyan-300 font-medium">
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

                {/* Action CTA & Live Demo */}
                <div className="pt-1.5 flex items-center gap-3">
                  <button
                    onClick={() => openProjectDetail(PROJECT_COMPARTMENTS[selectedProjectIndex]?.projectId || 'ecommerce')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 hover:border-amber-400 text-amber-200 text-xs font-mono font-semibold tracking-wider uppercase transition-all cursor-pointer group shadow-sm"
                  >
                    <span>EXPLORE PROJECTS</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </button>
                  {PROJECT_COMPARTMENTS[selectedProjectIndex]?.demoUrl && (
                    <a
                      href={PROJECT_COMPARTMENTS[selectedProjectIndex].demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 04: Technology Lab (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={4}
            chapterNumberText="CHAPTER 05"
            title="TECHNOLOGY"
            tagline="Tools that power my journey."
            position="right"
          >
            <div className="space-y-3 max-w-sm pt-1">
              {/* Compact Category Navigation Chips */}
              <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                {skillCategories.slice(0, 4).map((cat, idx) => {
                  const isSel = idx === selectedSkillCategoryIndex;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedSkillCategoryIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSel
                          ? 'bg-cyan-500/20 border border-cyan-400/70 text-cyan-300 font-semibold shadow-sm'
                          : 'bg-transparent border border-transparent text-white/50 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span className="text-[10px] text-white/40">{String(idx + 1).padStart(2, '0')}</span>
                      <span>{cat.name.split(' ')[0].toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>

              {/* Station Info & Skill Chips Card */}
              <div className="glass p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl space-y-3 bg-[#0C1220]/90">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
                  <span className="text-cyan-400 font-semibold tracking-widest uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    STATION {String(selectedSkillCategoryIndex + 1).padStart(2, '0')}
                  </span>
                  <span className="text-white/40 uppercase tracking-wider text-[10px]">
                    {selectedSkillCategory.name}
                  </span>
                </div>

                {/* Compact Skills Chips */}
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {selectedSkillCategory.skills.map((skill) => (
                    <button
                      key={skill.name}
                      onClick={() => openSkillDetail(skill.name)}
                      className="px-2.5 py-1 text-[11px] font-mono rounded-lg bg-white/[0.06] hover:bg-cyan-950/70 border border-white/10 hover:border-cyan-400 text-white/85 hover:text-cyan-200 transition-all cursor-pointer flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-cyan-400/60 group-hover:bg-cyan-300" />
                      <span>{skill.name}</span>
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-white/40 pt-1 flex items-center justify-between">
                  <span>Interactive 3D Station</span>
                  <span className="text-cyan-400/80">Click skill for details</span>
                </div>
              </div>
            </div>
          </ChapterPanel>

          {/* Chapter 05: Where I Am Today (Landmark on RIGHT -> Overlay on LEFT) */}
          <ChapterPanel
            chapter={5}
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
              <p className="text-white/80 text-xs leading-relaxed">
                {profile.bio}
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

          {/* Chapter 06: The Journey Continues (Landmark on LEFT -> Overlay on RIGHT) */}
          <ChapterPanel
            chapter={6}
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

          {/* Chapter 07: Contact (Landing Platform) */}
          <ChapterPanel
            chapter={7}
            chapterNumberText="CHAPTER 08"
            title="LET'S BUILD SOMETHING TOGETHER"
            tagline="Touchdown. Where one journey ends, the next project takes flight."
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
