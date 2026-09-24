export const profile = {
  name: 'Subramani',
  fullName: 'Subramani V',
  title: 'Software Engineer | Web, Mobile & Frappe Developer',
  shortTitle: 'Full Stack Developer',
  email: 'subbudme475@gmail.com',
  phone: '+91 9159029499',
  location: 'Trichy, India',
  github: 'https://github.com/Subbu-475',
  linkedin: 'https://www.linkedin.com/in/subramani-v-847291211',
  portfolio: 'https://subramani-portfolio-three.vercel.app',
  yearsExperience: '2.5+',
  projectsCompleted: '50+',
  bio: [
    "Hello! I'm Subramani, a passionate Full Stack Developer, Freelance App Specialist, and Frappe Developer with over 2.5+ years of professional experience in building modern web & mobile applications.",
    "I specialize in the MERN stack (MongoDB, Express.js, React.js, Node.js), Frappe Framework / ERPNext, Flutter, and Python/TypeScript for crafting robust, scalable client and enterprise solutions. As a freelance developer, I partner with businesses to transform complex workflows into streamlined applications.",
    "When I'm not coding, you can find me exploring new open-source technologies, optimizing ERPNext custom applications, or sharing knowledge through mentoring.",
  ],
  tagline: 'Building full-stack experiences that scale. Passionate about creating innovative web solutions with modern technologies and best practices.',
  social: {
    github: 'https://github.com/Subbu-475',
    linkedin: 'https://www.linkedin.com/in/subramani-v-847291211',
    email: 'mailto:subbudme475@gmail.com',
  },
} as const;

export type Profile = typeof profile;
