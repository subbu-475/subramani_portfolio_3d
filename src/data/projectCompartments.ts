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
    title: 'E-Commerce Platform',
    categoryName: '01 — E-Commerce Platform',
    tagline: 'High-conversion online shopping and payment platforms.',
    description: 'High-conversion digital storefronts with dynamic product catalogs, cart state management, and frictionless Stripe & Razorpay payment workflows.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    features: ['Dynamic Product Catalogs', 'Cart State Management', 'Stripe & Razorpay Checkout', 'Order Lifecycle Tracking'],
    projectId: 'ecommerce',
    demoUrl: 'https://ecommerce-demo.vercel.app',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#00D9FF',
  },
  {
    id: 'hrms',
    number: '02',
    coachCode: 'C1',
    coachType: 'AC CHAIR CAR',
    title: 'HRMS Application',
    categoryName: '02 — HRMS Application',
    tagline: 'Streamlining workforce operations and employee telemetry.',
    description: 'Centralized workforce platforms covering employee lifecycle, automated attendance, leave cycles, compensation, and organizational compliance.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL'],
    features: ['Employee Lifecycle Management', 'Automated Attendance Tracking', 'Leave Approval Engine', 'Workforce Analytics'],
    projectId: 'task-manager',
    demoUrl: 'https://taskmanager-demo.vercel.app',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#10B981',
  },
  {
    id: 'frappe-erp',
    number: '03',
    coachCode: 'C2',
    coachType: 'AC CHAIR CAR',
    title: 'Frappe / ERP Application',
    categoryName: '03 — Frappe / ERP Application',
    tagline: 'Automating business operations with custom Frappe & ERPNext apps.',
    description: 'Custom ERPNext solutions and tailored Frappe applications engineered for enterprise workflow automation, server scripting, and secure RESTful endpoints.',
    technologies: ['Frappe Framework', 'ERPNext', 'Python', 'MariaDB', 'REST API'],
    features: ['Custom DocTypes & Logic', 'Automated Server Scripts', 'Role-Based Access Control', 'ERP Module Extensions'],
    projectId: 'frappe-erp',
    demoUrl: 'https://frappe.io',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#FFC857',
  },
  {
    id: 'service-booking',
    number: '04',
    coachCode: 'C3',
    coachType: 'AC CHAIR CAR',
    title: 'Service Booking Application',
    categoryName: '04 — Service Booking Application',
    tagline: 'Real-time booking and scheduling mobile application.',
    description: 'Cross-platform mobile application delivering real-time service booking, instant push notifications, order tracking, and seamless payment processing.',
    technologies: ['Flutter', 'Dart', 'Frappe Framework', 'Node.js', 'REST API', 'Stripe'],
    features: ['Real-Time Booking Flow', 'Instant Push Notifications', 'Live Order & Status Updates', 'Secure Checkout'],
    projectId: 'service-booking',
    demoUrl: 'https://flutter.dev',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#38BDF8',
  },
  {
    id: 'task-management',
    number: '05',
    coachCode: 'C4',
    coachType: 'AC CHAIR CAR',
    title: 'Task Management Application',
    categoryName: '05 — Task Management Application',
    tagline: 'Collaborative task telemetry and client management hubs.',
    description: 'Centralized project and task management dashboard with real-time updates via Socket.io, drag-and-drop workflow tracking, and Razorpay client billing.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    features: ['Real-Time Socket.io Sync', 'Kanban Task Boards', 'Client Portal & Billing', 'Project Analytics'],
    projectId: 'sss-smarthub',
    demoUrl: 'https://smarthub.ssssmarttech.net/login',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#F59E0B',
  },
  {
    id: 'business-platform',
    number: '06',
    coachCode: 'C5',
    coachType: 'AC CHAIR CAR',
    title: 'Business / Web Platform',
    categoryName: '06 — Business / Web Platform',
    tagline: 'High-availability corporate digital platforms and client solutions.',
    description: 'Enterprise web solutions and digital portal platforms built with React and Node.js, delivering high-performance SEO, payment gateway checkout, and cloud scalability.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Razorpay', 'Vite'],
    features: ['Corporate Digital Services', 'Centralized Admin Dashboard', 'Secure Payment Checkout', 'SEO & Performance Optimized'],
    projectId: 'sss-smart-tech',
    demoUrl: 'https://ssssmarttech.com/',
    githubUrl: 'https://github.com/Subbu-475',
    accentColor: '#34D399',
  },
];
