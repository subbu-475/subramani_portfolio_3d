import React from 'react';
import { profile } from '../data/profile';
import { Mail, Send } from 'lucide-react';
import { Github, Linkedin } from './Icons';

export const ContactForm: React.FC = () => {
  return (
    <div className="glass p-8 rounded-2xl w-full max-w-lg pointer-events-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-2">Next Destination</h2>
        <p className="text-white/60">Maybe we build something together.</p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
          />
        </div>
        <button className="w-full bg-white text-black font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/90 transition-colors uppercase tracking-widest text-sm mt-2">
          Start a Conversation <Send size={16} />
        </button>
      </form>

      <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-6">
        <a href={profile.github} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
          <Github size={24} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-white/50 hover:text-white transition-colors">
          <Linkedin size={24} />
        </a>
        <a href={`mailto:${profile.email}`} className="text-white/50 hover:text-white transition-colors">
          <Mail size={24} />
        </a>
      </div>
    </div>
  );
};
