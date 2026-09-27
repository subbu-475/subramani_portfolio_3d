import React, { useState } from 'react';
import { useJourneyStore } from '../store/journeyStore';
import { Settings } from 'lucide-react';

const QUALITY_OPTIONS = [
  { value: 'auto' as const, label: 'Auto' },
  { value: 'high' as const, label: 'High' },
  { value: 'low' as const, label: 'Low' },
];

export const QualitySettings: React.FC = () => {
  const qualityLevel = useJourneyStore((s) => s.qualityLevel);
  const setQualityLevel = useJourneyStore((s) => s.setQualityLevel);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2 pointer-events-none">
      {isOpen && (
        <div className="glass p-2 rounded-xl mb-2 pointer-events-auto flex flex-col gap-1">
          {QUALITY_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setQualityLevel(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-xs tracking-widest uppercase rounded-lg transition-colors text-left ${
                qualityLevel === option.value
                  ? 'bg-white/10 text-white font-medium' 
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-3 rounded-full pointer-events-auto text-white/50 hover:text-white transition-colors"
        title="Quality Settings"
      >
        <Settings size={20} />
      </button>
    </div>
  );
};
