export interface ChapterData {
  id: string;
  chapter: string; // '01', '02', etc.
  title: string;
  subtitle: string;
  tagline: string;
  progressStart: number;
  progressEnd: number;
  landmarkProgress: number; // exact point where character reaches focal landmark
  timeOfDay: 'morning' | 'late-morning' | 'afternoon' | 'golden-hour' | 'sunset' | 'twilight' | 'night' | 'space';
  cameraMode:
    | 'follow'
    | 'wide-establishing'
    | 'side-workspace'
    | 'street-level'
    | 'project-showcase'
    | 'observatory'
    | 'balcony-overlook'
    | 'launch-ascent'
    | 'orbital';
  cameraOffset: [number, number, number]; // [lateral, height, behind] relative to path tangent/normal
  lookOffset: [number, number, number];
  /** Side of the road where the main landmark is placed */
  landmarkSide: 'center' | 'left' | 'right';
}

export const JOURNEY_CHAPTERS: ChapterData[] = [
  {
    id: 'beginning',
    chapter: '01',
    title: 'The Beginning',
    subtitle: 'Home',
    tagline: 'Every journey starts somewhere.',
    progressStart: 0.0,
    progressEnd: 0.10,
    landmarkProgress: 0.03,
    timeOfDay: 'morning',
    cameraMode: 'follow',
    // Camera centered behind character, looking straight forward along village road
    cameraOffset: [0, 2.0, 7.5],
    lookOffset: [0, 1.2, -15],
    landmarkSide: 'center',
  },
  {
    id: 'education',
    chapter: '02',
    title: 'Education',
    subtitle: 'University',
    tagline: 'Where the journey began.',
    progressStart: 0.10,
    progressEnd: 0.22,
    landmarkProgress: 0.17,
    timeOfDay: 'late-morning',
    cameraMode: 'wide-establishing',
    // Camera on RIGHT of path, looking LEFT at college campus
    cameraOffset: [5.0, 2.8, 7.5],
    lookOffset: [-3.5, 3.0, -10],
    landmarkSide: 'left',
  },
  {
    id: 'first-code',
    chapter: '03',
    title: 'First Line of Code',
    subtitle: 'Learning',
    tagline: 'Curiosity became code.',
    progressStart: 0.22,
    progressEnd: 0.33,
    landmarkProgress: 0.29,
    timeOfDay: 'afternoon',
    cameraMode: 'side-workspace',
    // Camera on LEFT, looking RIGHT at coding room
    cameraOffset: [-4.0, 2.0, 5.5],
    lookOffset: [3.0, 1.5, -6],
    landmarkSide: 'right',
  },
  {
    id: 'career',
    chapter: '04',
    title: 'Career',
    subtitle: 'Experience',
    tagline: 'Turning skills into impact.',
    progressStart: 0.33,
    progressEnd: 0.45,
    landmarkProgress: 0.40,
    timeOfDay: 'golden-hour',
    cameraMode: 'street-level',
    // Camera on RIGHT, looking LEFT at office towers
    cameraOffset: [4.5, 2.5, 8.0],
    lookOffset: [-3.0, 3.5, -14],
    landmarkSide: 'left',
  },
  {
    id: 'projects',
    chapter: '05',
    title: 'Project World',
    subtitle: 'My Work',
    tagline: 'Ideas into real products.',
    progressStart: 0.45,
    progressEnd: 0.56,
    landmarkProgress: 0.52,
    timeOfDay: 'sunset',
    cameraMode: 'project-showcase',
    // Camera on LEFT, looking RIGHT at tech pavilion
    cameraOffset: [-3.5, 2.0, 7.0],
    lookOffset: [2.5, 1.5, -8],
    landmarkSide: 'right',
  },
  {
    id: 'skills',
    chapter: '06',
    title: 'Technology Galaxy',
    subtitle: 'Technologies',
    tagline: 'Tools that power my journey.',
    progressStart: 0.56,
    progressEnd: 0.68,
    landmarkProgress: 0.64,
    timeOfDay: 'twilight',
    cameraMode: 'observatory',
    // Camera on RIGHT, elevated, looking LEFT at holographic arena
    cameraOffset: [3.5, 3.2, 8.5],
    lookOffset: [-2.5, 2.0, -10],
    landmarkSide: 'left',
  },
  {
    id: 'today',
    chapter: '07',
    title: 'Where I Am Today',
    subtitle: 'Current Chapter',
    tagline: 'Building. Learning. Exploring.',
    progressStart: 0.68,
    progressEnd: 0.79,
    landmarkProgress: 0.75,
    timeOfDay: 'night',
    cameraMode: 'balcony-overlook',
    // Camera on LEFT, looking RIGHT at neon city skyline
    cameraOffset: [-3.0, 2.2, 7.0],
    lookOffset: [2.0, 1.8, -18],
    landmarkSide: 'right',
  },
  {
    id: 'future',
    chapter: '08',
    title: 'The Journey Continues',
    subtitle: "What's Next",
    tagline: 'Still learning. Still building. Still moving forward.',
    progressStart: 0.79,
    progressEnd: 0.92,
    landmarkProgress: 0.87,
    timeOfDay: 'space',
    cameraMode: 'launch-ascent',
    // Camera below and behind during ascent, looking upward
    cameraOffset: [0, -1.5, 10.0],
    lookOffset: [0, 6.0, -20],
    landmarkSide: 'left',
  },
  {
    id: 'contact',
    chapter: '09',
    title: 'Next Destination',
    subtitle: "Let's Connect",
    tagline: "Let's build something together.",
    progressStart: 0.92,
    progressEnd: 1.0,
    landmarkProgress: 0.96,
    timeOfDay: 'space',
    cameraMode: 'orbital',
    // Floating orbital camera
    cameraOffset: [4.0, 2.0, 8.5],
    lookOffset: [-1.5, 0.5, -12],
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
