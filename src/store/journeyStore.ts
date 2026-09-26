import { create } from 'zustand';
import { JOURNEY_CHAPTERS, getChapterIndexByProgress } from '../data/journey';

export interface ChapterMeta {
  id: number;
  num: string;
  title: string;
  subtitle: string;
}

export const CHAPTERS_DATA: ChapterMeta[] = [
  { id: 0, num: '01', title: 'The Beginning', subtitle: 'Home' },
  { id: 1, num: '02', title: 'Education', subtitle: 'University' },
  { id: 2, num: '03', title: 'Career', subtitle: 'Experience' },
  { id: 3, num: '04', title: 'Projects', subtitle: 'Vande Bharat Express' },
  { id: 4, num: '05', title: 'Technology', subtitle: 'Technology Lab' },
  { id: 5, num: '06', title: 'Present', subtitle: 'Current Chapter' },
  { id: 6, num: '07', title: 'Future', subtitle: "What's Next" },
  { id: 7, num: '08', title: 'Contact', subtitle: "Let's Connect" },
];

export interface JourneyState {
  // Current chapter (0-indexed, 0 to 7)
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
  selectedProjectIndex: number;
  selectedSkillCategoryIndex: number;
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
  jumpToChapter: (chapterId: number) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
  openProjectDetail: (projectId: string) => void;
  closeProjectDetail: () => void;
  setSelectedProjectIndex: (index: number) => void;
  setSelectedSkillCategoryIndex: (index: number) => void;
  openSkillDetail: (skillName: string) => void;
  closeSkillDetail: () => void;
  setQualityLevel: (level: 'auto' | 'low' | 'high') => void;
  setIsMobile: (isMobile: boolean) => void;
  setPrefersReducedMotion: (prefers: boolean) => void;
  toggleSound: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  currentChapter: 0,
  totalChapters: CHAPTERS_DATA.length,
  chapterNames: CHAPTERS_DATA.map((c) => c.title),

  isLoading: true,
  loadingProgress: 0,
  isWorldReady: false,

  journeyProgress: 0,

  isMenuOpen: false,
  isProjectDetailOpen: false,
  activeProjectId: null,
  selectedProjectIndex: 0,
  selectedSkillCategoryIndex: 0,
  isSkillDetailOpen: false,
  activeSkillName: null,

  qualityLevel: 'auto',
  isMobile: false,
  prefersReducedMotion: false,

  isSoundEnabled: false,

  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  setLoadingProgress: (progress) =>
    set({ loadingProgress: progress, isLoading: progress < 100 }),
  setWorldReady: () =>
    set({ isWorldReady: true, isLoading: false, loadingProgress: 100 }),

  setJourneyProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const chapter = getChapterIndexByProgress(clamped);
    set({ journeyProgress: clamped, currentChapter: chapter });
  },

  jumpToChapter: (chapterId: number) => {
    const targetProgress = JOURNEY_CHAPTERS[chapterId]?.landmarkProgress ?? Math.min(0.999, chapterId / (CHAPTERS_DATA.length - 1));
    set({ journeyProgress: targetProgress, currentChapter: chapterId, isMenuOpen: false });
  },

  toggleMenu: () => set((s) => ({ isMenuOpen: !s.isMenuOpen })),
  closeMenu: () => set({ isMenuOpen: false }),
  openProjectDetail: (projectId) =>
    set({ isProjectDetailOpen: true, activeProjectId: projectId }),
  closeProjectDetail: () =>
    set({ isProjectDetailOpen: false, activeProjectId: null }),
  setSelectedProjectIndex: (index) => set({ selectedProjectIndex: index }),
  setSelectedSkillCategoryIndex: (index) => set({ selectedSkillCategoryIndex: index }),
  openSkillDetail: (skillName) =>
    set({ isSkillDetailOpen: true, activeSkillName: skillName }),
  closeSkillDetail: () =>
    set({ isSkillDetailOpen: false, activeSkillName: null }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
  toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),
}));
