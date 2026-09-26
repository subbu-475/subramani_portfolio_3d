import { create } from 'zustand';
import { JOURNEY_CHAPTERS, getChapterIndexByProgress } from '../data/journey';

export interface ChapterMeta {
  id: number;
  num: string;
  title: string;
  subtitle: string;
}

export const CHAPTERS_DATA: ChapterMeta[] = [
  { id: 0, num: '00', title: 'The Beginning', subtitle: 'Home' },
  { id: 1, num: '01', title: 'Education', subtitle: 'University Campus' },
  { id: 2, num: '02', title: 'Career & Experience', subtitle: 'Career City' },
  { id: 3, num: '03', title: 'Projects', subtitle: 'Railway Terminal' },
  { id: 4, num: '04', title: 'Technology', subtitle: 'Technology City' },
  { id: 5, num: '05', title: 'Future', subtitle: 'Launch Hub' },
  { id: 6, num: '06', title: 'Contact', subtitle: 'Control Room' },
];

export interface JourneyState {
  // Mode: 3D Experience or Classic Portfolio View
  viewMode: '3d' | 'classic';
  setViewMode: (mode: '3d' | 'classic') => void;
  toggleViewMode: () => void;

  // Current chapter (0-indexed, 0 to 6)
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
  selectedExperienceIndex: number;
  selectedSkillCategoryIndex: number;
  selectedTechCubeId: string;
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
  setSelectedExperienceIndex: (index: number) => void;
  setSelectedSkillCategoryIndex: (index: number) => void;
  setSelectedTechCubeId: (id: string) => void;
  openSkillDetail: (skillName: string) => void;
  closeSkillDetail: () => void;
  setQualityLevel: (level: 'auto' | 'low' | 'high') => void;
  setIsMobile: (isMobile: boolean) => void;
  setPrefersReducedMotion: (prefers: boolean) => void;
  toggleSound: () => void;
}

export const useJourneyStore = create<JourneyState>((set) => ({
  viewMode: '3d',
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () => set((s) => ({ viewMode: s.viewMode === '3d' ? 'classic' : '3d' })),

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
  selectedExperienceIndex: 0,
  selectedSkillCategoryIndex: 0,
  selectedTechCubeId: 'react',
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
  setSelectedExperienceIndex: (index) => set({ selectedExperienceIndex: index }),
  setSelectedSkillCategoryIndex: (index) => set({ selectedSkillCategoryIndex: index }),
  setSelectedTechCubeId: (id) => set({ selectedTechCubeId: id }),
  openSkillDetail: (skillName) =>
    set({ isSkillDetailOpen: true, activeSkillName: skillName }),
  closeSkillDetail: () =>
    set({ isSkillDetailOpen: false, activeSkillName: null }),
  setQualityLevel: (level) => set({ qualityLevel: level }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setPrefersReducedMotion: (prefers) => set({ prefersReducedMotion: prefers }),
  toggleSound: () => set((s) => ({ isSoundEnabled: !s.isSoundEnabled })),
}));
