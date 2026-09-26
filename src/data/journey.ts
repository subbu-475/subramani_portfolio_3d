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
    // Establishing hero composition: character prominent on right-center, open vista on left for text
    cameraOffset: [-1.4, 1.35, 3.8],
    lookOffset: [0.35, 1.25, -14],
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
    // Cinematic composition: college on left, traveler in foreground facing entrance, negative space on right
    cameraOffset: [1.2, 1.65, 4.6],
    lookOffset: [-1.4, 1.55, -2.8],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on right-center, looking at studio on right
    cameraOffset: [-1.35, 1.55, 4.4],
    lookOffset: [1.2, 1.45, -3.2],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on left-center, looking up at towers on left
    cameraOffset: [1.25, 1.60, 4.5],
    lookOffset: [-1.4, 1.55, -3.2],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on right-center, looking at tech showroom on right
    cameraOffset: [-1.35, 1.55, 4.4],
    lookOffset: [1.2, 1.45, -3.2],
    landmarkSide: 'right',
  },
  {
    id: 'skills',
    chapter: '06',
    title: 'Technology',
    subtitle: 'Technology Lab',
    tagline: 'Tools that power my journey.',
    progressStart: 0.56,
    progressEnd: 0.68,
    landmarkProgress: 0.64,
    timeOfDay: 'twilight',
    cameraMode: 'observatory',
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on left-center, looking at skill arena on left
    cameraOffset: [1.25, 1.60, 4.5],
    lookOffset: [-1.4, 1.55, -3.2],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on right-center, looking out at night skyline on right
    cameraOffset: [-1.35, 1.55, 4.4],
    lookOffset: [1.2, 1.50, -3.4],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent on left-center, looking up at ascending rocket
    cameraOffset: [1.25, 1.55, 4.6],
    lookOffset: [-1.2, 2.2, -4.5],
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
    // Consistent cinematic framing matching Ch 1 & 2: traveler prominent in orbit, looking at space station
    cameraOffset: [1.2, 1.55, 4.6],
    lookOffset: [-0.6, 1.2, -4.0],
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
