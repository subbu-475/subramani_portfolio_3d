import { create } from 'zustand';

export interface JourneyState {
  // Current chapter (0-indexed)
  currentChapter: number;
  totalChapters: number;
  chapterNames: string[];

  // Loading
  isLoading: boolean;
  loadingProgress: number;
  isWorldReady: boolean;

  // Journey progress (0 to 1)
  journeyProgress: number;

  // UI state
  isMenuOpen: boolean;
  isProjectDetailOpen: boolean;
  activeProjectId: string | null;
  isSkillDetailOpen: boolean;
  activeSkillName: string | null;

  // Performance
  qualityLevel: 'auto' | 'low' | 'high';
  isMobile: boolean;
  prefersReducedMotion: boolean;

  // Sound
  isSoundEnabled: boolean;

  // Actions
  setCurrentChapter: (chapter: number) => void;
  setLoadingProgress: (progress: number) => void;
  setWorldReady: () => void;
  setJourneyProgress: (progress: number) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openProjectDetail: (projectId: string) => void;
  closeProjectDetail: () => void;
  openSkillDetail: (skillName: string) => void;
  closeSkillDetail: () => void;
  setQualityLevel: (level: 'auto' | 'low' | 'high') => void;
  setIsMobile: (isMobile: boolean) => void;
  setPrefersReducedMotion: (prefers: boolean) => void;
  toggleSound: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  currentChapter: 0,
  totalChapters: 8,
  chapterNames: [
    'The Beginning',
    'Education',
    'First Code',
    'Career',
    'Projects',
    'Skills',
    'Present',
    'Contact',
  ],

  isLoading: true,
  loadingProgress: 0,
  isWorldReady: false,

  journeyProgress: 0,

  isMenuOpen: false,
  isProjectDetailOpen: false,
  activeProjectId: null,
  isSkillDetailOpen: false,
  activeSkillName: null,

  qualityLevel: 'auto',
  isMobile: false,
  prefersReducedMotion: false,

  isSoundEnabled: false,

  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setLoadingProgress: (progress) => set({ loadingProgress: progress, isLoading: progress < 100 }),
  setWorldReady: () => set({ isWorldReady: true, isLoading: false, loadingProgress: 100 }),
  setJourneyProgress: (progress) => {
    const chapterCount = 8;
    const chapter = Math.min(
      Math.floor(progress * chapterCount),
      chapterCount - 1
    );
    set({ journeyProgress: progress, currentChapter: chapter });
  },
  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openProjectDetail: (projectId) =>
    set({ isProjectDetailOpen: true, activeProjectId: projectId }),
  closeProjectDetail: () =>
    set({ isProjectDetailOpen: false, activeProjectId: null }),
  openSkillDetail: (skillName) =>
    set({ isSkillDetailOpen: true, activeSkillName: skillName }),
  closeSkillDetail: () =>
    set({ isSkillDetailOpen: false, activeSkillName: null }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
  toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),
}));
