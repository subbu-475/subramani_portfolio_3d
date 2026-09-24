export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
}

export const education: Education[] = [
  {
    id: 'oxford-engineering',
    degree: 'Bachelor of Engineering in Computer Science (BE)',
    institution: 'Oxford Engineering College',
    location: 'Pirattiyur, Trichy',
    period: '2023 - 2026',
    description:
      'Focused on software engineering, algorithms, and web development.',
    highlights: [
      'Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems',
      'Senior Project: E-learning platform with real-time collaboration features',
    ],
  },
];

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
}

export const certifications: Certification[] = [
  {
    id: 'python',
    title: 'Python',
    issuer: 'Synergy Academy',
    date: '2022',
    credentialId: 'PY-CDA-2023-001',
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack',
    issuer: 'UDEMY',
    date: '2023',
    credentialId: 'UDEMY-DEV-2023-MERN-0022',
  },
  {
    id: 'react',
    title: 'React',
    issuer: 'UDEMY',
    date: '2024',
    credentialId: 'UDEMY-DEV-2024-MERN-0022',
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    issuer: 'UDEMY',
    date: '2025',
    credentialId: 'UDEMY-DEV-2025-TS-0022',
  },
  {
    id: 'flutter',
    title: 'Flutter',
    issuer: 'UDEMY',
    date: '2025',
    credentialId: 'UDEMY-DEV-2025-FL-0022',
  },
];
