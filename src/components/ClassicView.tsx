import React from 'react';
import { profile } from '../data/profile';
import { education } from '../data/education';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { TECHNOLOGY_CATEGORIES, TECHNOLOGY_CUBES } from '../data/technologyCubes';
import { ContactForm } from './ContactForm';
import { ExternalLink, Sparkles, Briefcase, GraduationCap, Code, Layers, Mail, Compass, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { useJourneyStore } from '../store/journeyStore';

export const ClassicView: React.FC = () => {
  const { setViewMode } = useJourneyStore();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#050816] text-white selection:bg-[#00D9FF]/20 selection:text-[#00D9FF]">
      {/* Secondary Sub-Navbar for Fast Jumps */}
      <nav aria-label="Section Quick Jump" className="sticky top-[64px] z-30 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 sm:gap-2 text-[11px] font-mono tracking-wider text-white/70 uppercase">
            {[
              { id: 'about', label: 'ABOUT' },
              { id: 'experience', label: 'EXPERIENCE' },
              { id: 'projects', label: 'PROJECTS' },
              { id: 'skills', label: 'SKILLS' },
              { id: 'education', label: 'EDUCATION' },
              { id: 'contact', label: 'CONTACT' },
            ].map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="px-2.5 py-1 rounded-md hover:text-[#00D9FF] hover:bg-white/[0.04] transition-all cursor-pointer whitespace-nowrap"
              >
                {sec.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setViewMode('3d')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest font-semibold bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/40 hover:bg-[#00D9FF]/20 transition-all cursor-pointer whitespace-nowrap shrink-0 shadow-[0_0_12px_rgba(0,217,255,0.2)]"
          >
            <Compass size={12} className="animate-spin-slow" />
            <span>SWITCH TO 3D JOURNEY</span>
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-20 space-y-24 sm:space-y-32">
        {/* ======================================================== */}
        {/* 1. HERO SECTION                                         */}
        {/* ======================================================== */}
        <section id="hero" className="pt-4 sm:pt-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
            <span>PORTFOLIO // CLASSIC VIEW</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              SUBRAMANI
            </h1>
            <p className="text-lg sm:text-2xl font-mono font-semibold tracking-wider text-[#00D9FF] uppercase">
              FULL STACK DEVELOPER
            </p>
          </div>

          <p className="text-base sm:text-xl text-[#A7AFBF] max-w-2xl leading-relaxed font-normal">
            Building modern web, mobile and enterprise applications.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono text-white/80">
            {['React', 'Node.js', 'TypeScript', 'Frappe', 'Flutter', 'Python'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 rounded-full bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-black text-xs font-mono font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(0,217,255,0.4)] cursor-pointer"
            >
              VIEW PROJECTS
            </button>
            <button
              onClick={() => setViewMode('3d')}
              aria-label="Switch to 3D Experience"
              className="px-6 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/20 hover:border-[#FFC857]/60 text-white text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={14} className="text-[#FFC857]" />
              <span>LAUNCH 3D EXPERIENCE</span>
            </button>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 2. ABOUT SECTION                                        */}
        {/* ======================================================== */}
        <section id="about" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <Code size={16} />
            <span>01 // ABOUT</span>
          </div>

          <div className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 bg-[rgba(10,15,25,0.75)] backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/10 pb-6 text-center md:text-left">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">{profile.yearsExperience}</p>
                <p className="text-xs font-mono text-[#A7AFBF] uppercase tracking-wider pt-1">Years of Experience</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#00D9FF]">{profile.projectsCompleted}</p>
                <p className="text-xs font-mono text-[#A7AFBF] uppercase tracking-wider pt-1">Projects Delivered</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-[#FFC857]">{profile.location}</p>
                <p className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider pt-1">Based in Tamil Nadu</p>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-white/80 leading-relaxed font-normal">
              {profile.bio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. EXPERIENCE SECTION                                   */}
        {/* ======================================================== */}
        <section id="experience" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <Briefcase size={16} />
            <span>02 // EXPERIENCE</span>
          </div>

          <div className="space-y-5">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="glass p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-[#00D9FF]/40 transition-all space-y-4 bg-[rgba(10,15,25,0.75)] backdrop-blur-xl"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{exp.title}</h3>
                    <p className="text-sm font-semibold text-[#00D9FF] pt-0.5">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block text-xs font-mono px-3 py-1 rounded-full bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]">
                      {exp.period}
                    </span>
                    <p className="text-[11px] font-mono text-white/50 pt-1">{exp.location}</p>
                  </div>
                </div>

                <p className="text-sm text-white/75 leading-relaxed">{exp.description}</p>

                <div className="space-y-2 pt-1 border-t border-white/5">
                  <p className="text-xs font-mono uppercase tracking-wider text-white/40">Key Highlights</p>
                  <ul className="space-y-1.5 text-xs text-white/70">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-[#00D9FF] mt-0.5">▸</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] rounded-lg border border-white/10 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 4. PROJECTS SECTION                                     */}
        {/* ======================================================== */}
        <section id="projects" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <Layers size={16} />
            <span>03 // PROJECTS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="glass p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-[#FFC857]/40 transition-all space-y-4 bg-[rgba(5,8,22,0.85)] backdrop-blur-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFC857] bg-[#FFC857]/10 border border-[#FFC857]/30 px-2.5 py-0.5 rounded-full">
                      {proj.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{proj.shortDescription}</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[11px] font-mono bg-white/[0.04] rounded border border-white/10 text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {proj.github && (
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                    >
                      <Github size={14} />
                      <span>Code</span>
                    </a>
                  )}
                  {proj.demo && (
                    <a
                      href={proj.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono flex items-center gap-1 text-[#00D9FF] hover:underline"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 5. SKILLS & TECHNOLOGY SECTION                          */}
        {/* ======================================================== */}
        <section id="skills" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <Code size={16} />
            <span>04 // TECHNOLOGY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TECHNOLOGY_CATEGORIES.map((cat) => {
              const catCubes = TECHNOLOGY_CUBES.filter((c) => c.row === cat.row);
              return (
                <div
                  key={cat.id}
                  className="glass p-5 sm:p-6 rounded-3xl border border-white/10 space-y-3 bg-[rgba(10,15,25,0.75)] backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-[#00D9FF] font-bold">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] font-mono text-white/40">{catCubes.length} TECHNOLOGIES</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {catCubes.map((cube) => (
                      <span
                        key={cube.id}
                        className="px-3 py-1 text-xs font-mono rounded-lg border text-white/90"
                        style={{
                          backgroundColor: `${cube.bgColor}99`,
                          borderColor: `${cube.brandColor}50`,
                        }}
                      >
                        {cube.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* 6. EDUCATION SECTION                                    */}
        {/* ======================================================== */}
        <section id="education" className="space-y-6 scroll-mt-28">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <GraduationCap size={16} />
            <span>05 // EDUCATION</span>
          </div>

          {education.map((edu) => (
            <div
              key={edu.id}
              className="glass p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4 bg-[rgba(10,15,25,0.75)] backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <p className="text-sm font-semibold text-[#FFC857] pt-0.5">{edu.institution}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FFC857]/10 border border-[#FFC857]/30 text-[#FFC857]">
                    {edu.period}
                  </span>
                  <p className="text-[11px] font-mono text-white/50 pt-1">{edu.location}</p>
                </div>
              </div>

              <p className="text-sm text-white/75 leading-relaxed">{edu.description}</p>

              <div className="space-y-1.5 pt-2 border-t border-white/5 text-xs text-white/70">
                {edu.highlights.map((h, i) => (
                  <p key={i} className="flex items-start gap-2">
                    <span className="text-[#00D9FF]">▸</span>
                    <span>{h}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* ======================================================== */}
        {/* 7. CONTACT SECTION                                      */}
        {/* ======================================================== */}
        <section id="contact" className="space-y-8 scroll-mt-28 pb-12">
          <div className="flex items-center gap-2.5 text-[#00D9FF] text-xs font-mono uppercase tracking-[0.25em]">
            <Mail size={16} />
            <span>06 // CONTACT</span>
          </div>

          <div className="glass p-6 sm:p-10 rounded-3xl border border-white/10 space-y-8 bg-[rgba(10,15,25,0.75)] backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                LET'S BUILD SOMETHING.
              </h2>
              <p className="text-xs sm:text-sm text-[#A7AFBF]">
                Have an idea, project or opportunity? Let's turn it into a working product.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="px-4 py-2 rounded-full bg-[#00D9FF] text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-[#00D9FF]/90 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,217,255,0.3)]"
                >
                  <Mail size={13} />
                  <span>EMAIL ME</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <Github size={13} />
                  <span>GITHUB</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.09] border border-white/20 text-white text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <Linkedin size={13} />
                  <span>LINKEDIN</span>
                </a>
                <a
                  href="/resume.pdf"
                  download="Subramani_Resume.pdf"
                  aria-label="Download Subramani's Resume PDF"
                  className="px-4 py-2 rounded-full bg-[#FFC857]/10 hover:bg-[#FFC857]/20 border border-[#FFC857]/40 text-[#FFC857] text-xs font-mono font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5"
                >
                  <ExternalLink size={13} />
                  <span>DOWNLOAD RESUME</span>
                </a>
              </div>
            </div>

            <div className="max-w-md mx-auto pt-4 border-t border-white/10">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs font-mono text-white/40">
        <p>© {new Date().getFullYear()} Subramani V. All rights reserved.</p>
        <p className="text-[11px] pt-1 text-white/25">Built with React, Three.js & TypeScript</p>
      </footer>
    </main>
  );
};

export default ClassicView;
