export interface ProjectCompartment {
  id: string;
  number: string; // '01', '02', '03', '04', '05', '06'
  coachCode: string; // 'EC1', 'C1', 'C2', 'C3', 'C4', 'C5'
  coachType: string; // 'EXECUTIVE CHAIR CAR', 'AC CHAIR CAR'
  title: string;
  categoryName: string;
  tagline: string;
  description: string;
  technologies: string[];
  features: string[];
  projectId: string;
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
}

export const PROJECT_COMPARTMENTS: ProjectCompartment[] = [
  {
    id: 'ecommerce',
    number: '01',
    coachCode: 'EC1',
    coachType: 'EXECUTIVE CHAIR CAR',
    title: 'E-COMMERCE',
    categoryName: '01 — E-COMMERCE & COMMERCE CLOUD',
    tagline: 'High-conversion online shopping experiences.',
    description: 'High-conversion digital storefronts with dynamic product catalogs, persistent shopping cart state, and frictionless payment workflows.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'Tailwind CSS'],
    features: ['Product Catalog & Filtering', 'Shopping Cart & Saved Items', 'Razorpay & Stripe Checkout', 'Real-time Order Processing'],
    projectId: 'ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#38BDF8',
  },
  {
    id: 'erp-business',
    number: '02',
    coachCode: 'C1',
    coachType: 'AC CHAIR CAR',
    title: 'ERP & BUSINESS',
    categoryName: '02 — ERP & BUSINESS AUTOMATION',
    tagline: 'Automating enterprise workflows & business systems.',
    description: 'Custom ERPNext solutions and Frappe applications designed for end-to-end operational automation, server scripting, and audit compliance.',
    technologies: ['Frappe Framework', 'ERPNext', 'Python', 'MariaDB', 'REST APIs'],
    features: ['Custom DocTypes & Schemas', 'Automated Approval Workflows', 'Role-Based Access Control', 'Ledger & Inventory Integration'],
    projectId: 'frappe-erp',
    demoUrl: 'https://frappe.io',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#F59E0B',
  },
  {
    id: 'hrms-workforce',
    number: '03',
    coachCode: 'C2',
    coachType: 'AC CHAIR CAR',
    title: 'HRMS & WORKFORCE',
    categoryName: '03 — HRMS & WORKFORCE PLATFORMS',
    tagline: 'Streamlining employee management & workforce analytics.',
    description: 'Centralized workforce platforms covering employee lifecycle, automated attendance, leave cycles, and organizational compliance.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    features: ['Automated Attendance Tracking', 'Leave Approval Engine', 'Payroll & Compensation Records', 'HR Telemetry & Analytics'],
    projectId: 'task-manager',
    demoUrl: 'https://taskmanager-demo.vercel.app',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#10B981',
  },
  {
    id: 'mobile-apps',
    number: '04',
    coachCode: 'C3',
    coachType: 'AC CHAIR CAR',
    title: 'MOBILE APPS',
    categoryName: '04 — MOBILE & SPATIAL APPS',
    tagline: 'Crafting responsive cross-platform native experiences.',
    description: 'High-performance mobile applications delivering real-time service booking, instant push notifications, and offline data sync.',
    technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'REST APIs'],
    features: ['Intuitive Service Booking Flow', 'Instant Push Notifications', 'Live Order & GPS Tracking', 'Offline First Architecture'],
    projectId: 'service-booking',
    demoUrl: 'https://flutter.dev',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#60A5FA',
  },
  {
    id: 'admin-analytics',
    number: '05',
    coachCode: 'C4',
    coachType: 'AC CHAIR CAR',
    title: 'ADMIN & ANALYTICS',
    categoryName: '05 — ADMIN & ANALYTICS DASHBOARDS',
    tagline: 'Data visualization, telemetry & executive reporting.',
    description: 'Comprehensive business intelligence dashboards transforming raw multi-source telemetry into real-time interactive charts and actionable insights.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Tailwind CSS', 'Redis'],
    features: ['Real-time KPI Monitoring', 'Interactive Analytical Charts', 'Permission Matrix Management', 'Automated Export & Reports'],
    projectId: 'sss-smarthub',
    demoUrl: 'https://smarthub.ssssmarttech.net/login',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#FBBF24',
  },
  {
    id: 'saas-web',
    number: '06',
    coachCode: 'C5',
    coachType: 'AC CHAIR CAR',
    title: 'SAAS & WEB',
    categoryName: '06 — SAAS & CLOUD NATIVE PLATFORMS',
    tagline: 'Scalable cloud applications & multi-tenant client portals.',
    description: 'Enterprise corporate platforms and SaaS engines engineered with SEO optimization, high availability, and fluid interfaces.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Docker', 'Vite'],
    features: ['Multi-Tenant Client Portal', 'Role-Based Authentication', 'SEO & Performance Optimized', 'Continuous Cloud Delivery'],
    projectId: 'sss-smart-tech',
    demoUrl: 'https://ssssmarttech.com/',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#34D399',
  },
];
