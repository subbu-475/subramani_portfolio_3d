export interface SkillCategory {
  id: string;
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  category: string;
  icon?: string;
  projectsUsedIn?: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: [
      { name: 'React.js', category: 'frontend', projectsUsedIn: ['sss-smart-tech', 'sss-smarthub', 'ecommerce', 'task-manager'] },
      { name: 'TypeScript', category: 'frontend', projectsUsedIn: ['sss-smart-tech', 'sss-smarthub', 'task-manager'] },
      { name: 'JavaScript', category: 'frontend', projectsUsedIn: ['frappe-erp'] },
      { name: 'Tailwind CSS', category: 'frontend', projectsUsedIn: ['sss-smart-tech', 'sss-smarthub'] },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Flutter', category: 'frontend', projectsUsedIn: ['service-booking'] },
    ],
  },
  {
    id: 'backend',
    name: 'Backend',
    skills: [
      { name: 'Node.js', category: 'backend', projectsUsedIn: ['sss-smarthub', 'ecommerce', 'task-manager'] },
      { name: 'Express.js', category: 'backend', projectsUsedIn: ['ecommerce'] },
      { name: 'Python', category: 'backend', projectsUsedIn: ['frappe-erp'] },
      { name: 'Frappe Framework', category: 'backend', projectsUsedIn: ['frappe-erp', 'service-booking'] },
      { name: 'ERPNext', category: 'backend', projectsUsedIn: ['frappe-erp'] },
      { name: 'REST APIs', category: 'backend', projectsUsedIn: ['frappe-erp', 'service-booking'] },
      { name: 'GraphQL', category: 'backend' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    skills: [
      { name: 'MongoDB', category: 'database', projectsUsedIn: ['ecommerce'] },
      { name: 'PostgreSQL', category: 'database', projectsUsedIn: ['task-manager'] },
      { name: 'MariaDB', category: 'database', projectsUsedIn: ['frappe-erp'] },
      { name: 'MySQL', category: 'database' },
      { name: 'Redis', category: 'database', projectsUsedIn: ['task-manager'] },
    ],
  },
  {
    id: 'devops',
    name: 'DevOps & Tools',
    skills: [
      { name: 'Docker', category: 'devops' },
      { name: 'AWS', category: 'devops' },
      { name: 'Git', category: 'devops' },
      { name: 'Linux', category: 'devops' },
      { name: 'CI/CD', category: 'devops' },
    ],
  },
  {
    id: 'other',
    name: 'Other',
    skills: [
      { name: 'Socket.io', category: 'other', projectsUsedIn: ['task-manager'] },
      { name: 'Stripe API', category: 'other', projectsUsedIn: ['ecommerce', 'service-booking'] },
      { name: 'Razorpay', category: 'other', projectsUsedIn: ['sss-smarthub'] },
      { name: 'JWT', category: 'other', projectsUsedIn: ['ecommerce'] },
      { name: 'Dart', category: 'other', projectsUsedIn: ['service-booking'] },
    ],
  },
];

export const allSkills: Skill[] = skillCategories.flatMap((cat) => cat.skills);
