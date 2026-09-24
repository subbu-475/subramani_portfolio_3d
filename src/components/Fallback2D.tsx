import React from 'react';
import { profile } from '../data/profile';
import { education } from '../data/education';
import { experiences } from '../data/experience';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { ContactForm } from './ContactForm';
import { ExternalLink } from 'lucide-react';
import { Github } from './Icons';

export const Fallback2D: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white px-6 py-16 max-w-4xl mx-auto space-y-24">
      {/* Intro */}
      <header className="text-center space-y-6 pt-12">
        <p className="text-xs font-mono uppercase tracking-[0.4em] text-cyan-400">
          Every journey starts somewhere
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {profile.fullName}
        </h1>
        <p className="text-xl text-white/70">{profile.title}</p>
        <p className="max-w-xl mx-auto text-white/50 text-sm leading-relaxed">
          {profile.tagline}
        </p>
      </header>

      {/* Education */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
          01 // Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="glass p-6 rounded-2xl border border-white/10 space-y-2">
            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
            <p className="text-cyan-400">{edu.institution} — {edu.location}</p>
            <p className="text-xs text-white/40">{edu.period}</p>
            <p className="text-sm text-white/60 pt-2">{edu.description}</p>
            <ul className="list-disc list-inside text-xs text-white/50 space-y-1 pt-2">
              {edu.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
          02 // Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="glass p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                <span className="text-xs font-mono text-cyan-400">{exp.period}</span>
              </div>
              <p className="text-sm text-white/70">{exp.company} — {exp.location}</p>
              <p className="text-sm text-white/60">{exp.description}</p>
              <ul className="space-y-1 text-xs text-white/50">
                {exp.achievements.map((ach, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400">▸</span> {ach}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {exp.technologies.map((t) => (
                  <span key={t} className="px-2 py-0.5 text-[11px] bg-white/5 rounded-md border border-white/10 text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
          03 // Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="glass p-6 rounded-2xl border border-white/10 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                <p className="text-xs text-white/60 leading-relaxed">{proj.shortDescription}</p>
                <div className="flex flex-wrap gap-1 pt-2">
                  {proj.technologies.slice(0, 5).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[10px] bg-white/5 rounded border border-white/10 text-white/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <a href={proj.github} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1.5 text-white/60 hover:text-white">
                  <Github size={14} /> Code
                </a>
                <a href={proj.demo} target="_blank" rel="noreferrer" className="text-xs flex items-center gap-1.5 text-cyan-400 hover:underline">
                  <ExternalLink size={14} /> Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
          04 // Skills
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="glass p-5 rounded-2xl border border-white/10 space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-white/50">{cat.name}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span key={s.name} className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-white/80">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono uppercase tracking-[0.3em] text-cyan-400">
          05 // Contact
        </h2>
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};
