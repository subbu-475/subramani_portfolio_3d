export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const experiences: Experience[] = [
  {
    id: 'ko-innovation',
    title: 'Associate Software Developer',
    company: 'KO Innovation Software Solutions',
    location: 'Trichy',
    period: 'May 2025 - Present',
    current: true,
    description:
      'Lead developer for enterprise web applications serving 10k+ users. Architected and implemented scalable microservices using Node.js and React.',
    achievements: [
      'Reduced application load time by 40% through code splitting and optimization',
      'Led a team of 4 developers in implementing new feature modules',
      'Implemented CI/CD pipeline reducing deployment time by 60%',
      'Mentored junior developers and conducted technical interviews',
    ],
    technologies: [
      'React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL',
      'Flutter', 'AWS', 'Docker', 'Redis',
    ],
  },
  {
    id: 'freelance',
    title: 'Freelance App & Frappe Developer',
    company: 'Freelance / Self-Employed',
    location: 'Remote / Trichy',
    period: '2024 - Present',
    current: true,
    description:
      'Designing, building, and deploying custom mobile applications, web apps, and Frappe/ERPNext enterprise solutions for clients.',
    achievements: [
      'Architected custom Frappe framework apps and ERPNext module extensions for business process automation',
      'Developed cross-platform mobile applications using Flutter with REST API backend integration',
      'Collaborated directly with clients from requirements gathering to cloud deployment and ongoing maintenance',
      'Built custom REST APIs, doctypes, automated workflows, and payment gateway integrations',
    ],
    technologies: [
      'Frappe Framework', 'ERPNext', 'Python', 'Flutter', 'React',
      'Node.js', 'PostgreSQL', 'MariaDB', 'REST APIs',
    ],
  },
  {
    id: 'hilife-ai',
    title: 'Junior Full Stack Developer',
    company: 'Hilife.Ai Private Limited',
    location: 'Trichy',
    period: 'Jan 2024 - Apr 2025',
    current: false,
    description:
      'Developed and maintained multiple client projects using the MERN stack. Collaborated with design and product teams to deliver high-quality solutions.',
    achievements: [
      'Built 5+ client applications from concept to deployment',
      'Implemented real-time features using Socket.io for collaborative tools',
      'Integrated third-party APIs including payment gateways and social media',
      'Achieved 99.9% uptime for production applications',
    ],
    technologies: [
      'React', 'Express.js', 'MongoDB', 'Node.js', 'MySQL',
      'Socket.io', 'Stripe API', 'JWT',
    ],
  },
];
