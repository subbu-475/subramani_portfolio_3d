import React, { useEffect, useRef } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { allSkills } from '../data/skills';
import { projects } from '../data/projects';
import { X } from 'lucide-react';
import gsap from 'gsap';

export const SkillDetail: React.FC = () => {
  const { activeSkillName, isSkillDetailOpen, closeSkillDetail } = useJourneyStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const skill = allSkills.find(s => s.name === activeSkillName);
  const relatedProjects = skill?.projectsUsedIn
    ? projects.filter(p => skill.projectsUsedIn?.includes(p.id))
    : [];

  useEffect(() => {
    if (isSkillDetailOpen && skill) {
      gsap.to(containerRef.current, { autoAlpha: 1, duration: 0.3 });
      gsap.fromTo(
        contentRef.current,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power3.out' }
      );
    } else {
      gsap.to(contentRef.current, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => {
          gsap.to(containerRef.current, { autoAlpha: 0, duration: 0.2 });
        }
      });
    }
  }, [isSkillDetailOpen, skill]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 invisible flex items-end justify-center pb-24">
      <div className="absolute inset-0 bg-black/30" onClick={closeSkillDetail} />
      <div
        ref={contentRef}
        className="relative z-10 glass-strong p-8 rounded-2xl max-w-md w-full mx-4"
      >
        <button
          onClick={closeSkillDetail}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        {skill && (
          <div>
            <span className="text-xs tracking-[0.3em] text-cyan-500 uppercase mb-1 block">
              {skill.category}
            </span>
            <h3 className="text-2xl font-bold tracking-wider mb-4 uppercase">{skill.name}</h3>
            
            {relatedProjects.length > 0 && (
              <div>
                <h4 className="text-xs tracking-widest text-white/40 uppercase mb-3">Used in Projects</h4>
                <div className="flex flex-wrap gap-2">
                  {relatedProjects.map(p => (
                    <span key={p.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/70">
                      {p.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
