export interface ChapterData {
  id: string;
  chapter: string; // '01', '02', etc.
  title: string;
  subtitle: string;
  tagline: string;
  progressStart: number;
  progressEnd: number;
  landmarkProgress: number; // exact point where character reaches focal landmark
  timeOfDay: 'morning' | 'late-morning' | 'afternoon' | 'golden-hour' | 'sunset' | 'twilight' | 'night' | 'space' | 'dawn' | 'sunrise';
  cameraMode:
    | 'follow'
    | 'wide-establishing'
    | 'side-workspace'
    | 'street-level'
    | 'project-showcase'
    | 'observatory'
    | 'balcony-overlook'
    | 'launch-ascent'
    | 'orbital'
    | 'skybridge'
    | 'terrace';
  cameraOffset: [number, number, number]; // [lateral, height, behind] relative to path tangent/normal
  lookOffset: [number, number, number];
  /** Side of the road where the main landmark is placed */
  landmarkSide: 'center' | 'left' | 'right';
}

export const JOURNEY_CHAPTERS: ChapterData[] = [
  {
    id: 'beginning',
    chapter: '00',
    title: 'The Beginning',
    subtitle: 'Home',
    tagline: 'Every journey starts somewhere.',
    progressStart: 0.0,
    progressEnd: 0.10,
    landmarkProgress: 0.03,
    timeOfDay: 'morning',
    cameraMode: 'follow',
    cameraOffset: [-1.4, 1.35, 3.8],
    lookOffset: [0.35, 1.25, -14],
    landmarkSide: 'center',
  },
  {
    id: 'education',
    chapter: '01',
    title: 'Education',
    subtitle: 'University Campus',
    tagline: 'Where the journey began.',
    progressStart: 0.10,
    progressEnd: 0.28,
    landmarkProgress: 0.17,
    timeOfDay: 'late-morning',
    cameraMode: 'wide-establishing',
    cameraOffset: [1.2, 1.65, 4.6],
    lookOffset: [-1.4, 1.55, -2.8],
    landmarkSide: 'left',
  },
  {
    id: 'career',
    chapter: '02',
    title: 'Career & Experience',
    subtitle: 'Career City',
    tagline: 'Turning skills into impactful enterprise systems.',
    progressStart: 0.28,
    progressEnd: 0.46,
    landmarkProgress: 0.38,
    timeOfDay: 'golden-hour',
    cameraMode: 'street-level',
    cameraOffset: [1.25, 1.60, 4.5],
    lookOffset: [-1.4, 1.55, -3.2],
    landmarkSide: 'left',
  },
  {
    id: 'projects',
    chapter: '03',
    title: 'Projects',
    subtitle: 'Railway Terminal',
    tagline: 'High-speed journey of built software solutions.',
    progressStart: 0.46,
    progressEnd: 0.58,
    landmarkProgress: 0.51,
    timeOfDay: 'sunset',
    cameraMode: 'project-showcase',
    cameraOffset: [-1.35, 1.55, 4.4],
    lookOffset: [1.2, 1.45, -3.2],
    landmarkSide: 'right',
  },
  {
    id: 'skills',
    chapter: '04',
    title: 'Technology',
    subtitle: 'Technology City',
    tagline: 'Tools that power my engineering journey.',
    progressStart: 0.58,
    progressEnd: 0.72,
    landmarkProgress: 0.64,
    timeOfDay: 'twilight',
    cameraMode: 'observatory',
    cameraOffset: [1.25, 1.60, 4.5],
    lookOffset: [-1.4, 1.55, -3.2],
    landmarkSide: 'left',
  },
  {
    id: 'future',
    chapter: '05',
    title: 'Future',
    subtitle: 'Horizon Skybridge',
    tagline: 'Next Destination • AI, System Design & Cloud Architecture.',
    progressStart: 0.72,
    progressEnd: 0.88,
    landmarkProgress: 0.82,
    timeOfDay: 'dawn',
    cameraMode: 'skybridge',
    cameraOffset: [1.25, 1.55, 4.6],
    lookOffset: [-0.8, 1.35, -4.5],
    landmarkSide: 'left',
  },
  {
    id: 'contact',
    chapter: '06',
    title: 'Contact',
    subtitle: 'Sunrise Pavilion',
    tagline: "Let's build something extraordinary together.",
    progressStart: 0.88,
    progressEnd: 1.0,
    landmarkProgress: 0.96,
    timeOfDay: 'sunrise',
    cameraMode: 'terrace',
    cameraOffset: [1.2, 1.55, 4.6],
    lookOffset: [-0.4, 1.2, -4.0],
    landmarkSide: 'center',
  },
];

export function getChapterByProgress(progress: number): ChapterData {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < JOURNEY_CHAPTERS.length; i++) {
    const ch = JOURNEY_CHAPTERS[i];
    if (p >= ch.progressStart && p <= ch.progressEnd) {
      return ch;
    }
  }
  return JOURNEY_CHAPTERS[JOURNEY_CHAPTERS.length - 1];
}

export function getChapterIndexByProgress(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  for (let i = 0; i < JOURNEY_CHAPTERS.length; i++) {
    const ch = JOURNEY_CHAPTERS[i];
    if (p >= ch.progressStart && p <= ch.progressEnd) {
      return i;
    }
  }
  return JOURNEY_CHAPTERS.length - 1;
}

/**
 * Returns the interpolated time-of-day factor (0 = morning, 1 = space).
 * Used by Lighting and Environment for smooth transitions.
 */
export function getTimeOfDayFactor(progress: number): number {
  return Math.max(0, Math.min(1, progress));
}
