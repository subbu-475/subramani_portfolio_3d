import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { projects } from '../data/projects';
import { X, ExternalLink } from 'lucide-react';
import { Github } from './Icons';
import gsap from 'gsap';

export const ProjectDetail: React.FC = () => {
  const activeProjectId = useJourneyStore((s) => s.activeProjectId);
  const isProjectDetailOpen = useJourneyStore((s) => s.isProjectDetailOpen);
  const closeProjectDetail = useJourneyStore((s) => s.closeProjectDetail);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const project = projects.find((p) => p.id === activeProjectId);

  useEffect(() => {
    if (isProjectDetailOpen && project) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(
        contentRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.2 });
        }
      });
    }
  }, [isProjectDetailOpen, project]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 invisible">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeProjectDetail} />
      <div
        ref={contentRef}
        className="absolute top-0 right-0 w-full max-w-lg h-full bg-[#0B0D10]/95 backdrop-blur-xl border-l border-white/10 p-8 overflow-y-auto"
      >
        <button
          onClick={closeProjectDetail}
          className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {project && (
          <div className="mt-12">
            <span className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-2 block">
              {project.category}
            </span>
            <h2 className="text-3xl font-bold tracking-wider mb-2 uppercase">{project.title}</h2>
            <p className="text-white/50 text-sm mb-6">{project.shortDescription}</p>
            <p className="text-white/70 leading-relaxed mb-8">{project.longDescription}</p>
            
            <div className="mb-8">
              <h3 className="text-sm tracking-widest text-white/40 uppercase mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-sm tracking-widest text-white/40 uppercase mb-4">Challenges & Solutions</h3>
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-sm">
                    <span className="text-cyan-500 mt-0.5">▸</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors text-sm">
                <Github size={16} /> Source
              </a>
              <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 glass hover:bg-white/10 transition-colors rounded-lg font-medium text-white text-sm">
                <ExternalLink size={16} /> Live Demo
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
