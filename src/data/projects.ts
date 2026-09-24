export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  technologies: string[];
  github: string;
  demo: string;
  challenges: string[];
  featured: boolean;
  category: 'web' | 'mobile' | 'enterprise' | 'fullstack';
}

export const projects: Project[] = [
  {
    id: 'sss-smart-tech',
    title: 'SSS Smart Tech Platform',
    shortDescription:
      'Corporate digital solutions platform for data services, cybersecurity, and full-stack development',
    longDescription:
      'A modern corporate website and digital platform for SSS Smart Tech providing comprehensive tech services including data warehouse modernization, cybersecurity solutions, full-stack web development, and digital services. Designed with responsive layouts, fluid animations, and robust SEO optimizations.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'SEO Optimization', 'Node.js'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://ssssmarttech.com/',
    challenges: [
      'Designing high-performance, responsive UI for comprehensive agency service offerings',
      'Implementing structured schema data and SEO meta tags for search visibility',
      'Optimizing asset loading speed and cross-browser accessibility',
    ],
    featured: true,
    category: 'web',
  },
  {
    id: 'sss-smarthub',
    title: 'SSS SmartHub Portal',
    shortDescription:
      'Centralized client portal & administrative management hub with Razorpay payment integration',
    longDescription:
      'A secure client management dashboard for SSS Smart Tech featuring user authentication, client service tracking, role-based access control, billing management, and seamless Razorpay payment gateway checkout.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Razorpay SDK', 'Tailwind CSS', 'REST API'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://smarthub.ssssmarttech.net/login',
    challenges: [
      'Integrating secure Razorpay online payment checkout workflow',
      'Implementing robust client authentication and portal security',
      'Building intuitive administrative dashboard and service status tracking',
    ],
    featured: true,
    category: 'fullstack',
  },
  {
    id: 'frappe-erp',
    title: 'Frappe ERP Custom App',
    shortDescription:
      'Custom business management solution built with Frappe Framework and ERPNext',
    longDescription:
      'A tailor-made ERPNext extension and custom Frappe application designed for client business automation. Features custom Doctypes, server scripts, automated workflows, custom print formats, role-based access control, and RESTful API endpoints for external integrations.',
    technologies: ['Frappe Framework', 'ERPNext', 'Python', 'MariaDB', 'JavaScript', 'REST API'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://frappe.io',
    challenges: [
      'Architecting complex custom Doctypes and workflow logic in Frappe',
      'Creating high-performance server scripts and custom Jinja print templates',
      'Exposing secure REST APIs for seamless client mobile app synchronization',
    ],
    featured: true,
    category: 'enterprise',
  },
  {
    id: 'service-booking',
    title: 'Freelance Service Booking App',
    shortDescription:
      'Cross-platform mobile application for service scheduling and order tracking',
    longDescription:
      'A freelance mobile application built using Flutter for service booking, real-time status updates, push notifications, and payment processing, backed by a robust Frappe / Node.js API.',
    technologies: ['Flutter', 'Dart', 'Frappe Framework', 'Node.js', 'REST API', 'Stripe'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://flutter.dev',
    challenges: [
      'Developing responsive cross-platform UI with Flutter',
      'Implementing real-time order tracking and push notifications',
      'Ensuring seamless API communication between mobile app and Frappe backend',
    ],
    featured: true,
    category: 'mobile',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    shortDescription: 'Full-stack MERN e-commerce solution with admin dashboard',
    longDescription:
      'A comprehensive e-commerce platform built with the MERN stack featuring user authentication, product management, shopping cart functionality, payment integration with Stripe, and a complete admin dashboard for managing orders and inventory.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'JWT'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://ecommerce-demo.vercel.app',
    challenges: [
      'Implementing secure payment processing with Stripe',
      'Managing complex state for shopping cart and user sessions',
      'Optimizing database queries for product search and filtering',
    ],
    featured: false,
    category: 'fullstack',
  },
  {
    id: 'task-manager',
    title: 'Task Management App',
    shortDescription: 'Collaborative project management tool with real-time updates',
    longDescription:
      'A collaborative task management application similar to Trello, featuring real-time updates using Socket.io, drag-and-drop functionality, team collaboration, file attachments, and comprehensive project analytics.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    github: 'https://github.com/Subbu-475',
    demo: 'https://taskmanager-demo.vercel.app',
    challenges: [
      'Implementing real-time collaboration with Socket.io',
      'Managing complex drag-and-drop interactions',
      'Optimizing performance for large datasets',
    ],
    featured: false,
    category: 'fullstack',
  },
];
