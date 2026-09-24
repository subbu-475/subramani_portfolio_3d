# Subramani — Interactive 3D Developer Journey Portfolio

> A premium, cinematic, interactive 3D developer portfolio built with React, TypeScript, Three.js, React Three Fiber, GSAP, and Tailwind CSS.
>
> **Core Concept:** *"Walk through my journey as a developer."*
> The visitor travels through a stylized 3D world, discovering education, first code, professional career, projects, technical skills, and current/future destinations.

---

## 🌟 Features & Highlights

- **Cinematic 3D World:**
  - Continuous 3D road extending along the -Z axis through 8 dedicated chapters.
  - Third-person over-the-shoulder perspective with smooth camera damping and movement.
  - Stylized 3D visitor character/avatar that walks and travels along the road.
  - Environmental storytelling: procedural mountains, clouds, university campus, developer workspace with glowing code monitor, Career City with branded company towers, interactive Project artifacts, Technology Galaxy of orbiting nodes, and a futuristic Spaceport portal.
  - Atmospheric fog and dynamic time-of-day lighting transitions (Morning → Afternoon → Golden Hour → Sunset → Night → Dawn).
  - Postprocessing bloom & vignette (with automatic quality scaling).

- **Navigation & Interaction:**
  - **Scroll-to-Travel:** Smooth wheel and touch swipe input mapped along the journey spline.
  - **Interactive Chapters Menu:** Quick jump to any of the 8 chapters at any time without having to walk the entire route.
  - **Interactive Timeline Indicator:** Bottom-left chapter progress display with clickable timeline dots.
  - **Custom Cursor:** Minimal desktop cursor that expands when hovering over interactive 3D or UI elements.
  - **Interactive 3D Objects:** Clickable project artifacts and technology nodes that reveal rich sliding panels.
  - **Ambient Sound Engine:** Self-contained Web Audio API synthesizer with lowpass drone and pink noise texture (starts muted; toggleable in header).
  - **Performance Quality Switcher:** Quick toggle between `AUTO`, `HIGH`, and `LOW` (disables post-processing, simplifies meshes, and lowers DPR).
  - **WebGL Fallback:** Automatic detection that falls back to a clean, accessible 2D cinematic portfolio if WebGL is unavailable.
  - **Accessibility:** Full support for `prefers-reduced-motion`.
  - **SEO Optimized:** Proper Open Graph, Twitter cards, meta descriptions, and `<noscript>` crawlers content.

---

## 🧭 The 8 Chapters

1. **Chapter 01 — The Beginning:** Road to the horizon, procedural mountains, sunrise, and character introduction.
2. **Chapter 02 — Education:** Oxford Engineering College campus, BE Computer Science, academic milestones.
3. **Chapter 03 — The First Line of Code:** Developer workspace, dual monitors, coffee cup, and animated code terminal.
4. **Chapter 04 — Career City:** 3D buildings representing **KO Innovation Software Solutions**, **Freelance / Self-Employed**, and **Hilife.Ai**.
5. **Chapter 05 — Project World:** Geometric interactive artifacts for SSS Smart Tech, SSS SmartHub, Frappe ERP App, Service Booking, E-Commerce, and Task Management.
6. **Chapter 06 — Technology Galaxy:** Orbiting planetary nodes for React, TypeScript, Node.js, Frappe, Flutter, MongoDB, PostgreSQL, Docker, and AWS.
7. **Chapter 07 — Current Chapter:** Where Subramani is today — Associate Software Developer & Freelance Enterprise Developer.
8. **Chapter 08 — Next Destination:** Spaceport portal terminal with an interactive contact form and social links.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **3D Graphics:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`)
- **Post-Processing:** `@react-three/postprocessing`
- **Animation:** GSAP
- **State Management:** Zustand
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Typography:** Space Grotesk + JetBrains Mono
- **Audio:** Web Audio API (Zero external assets)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or pnpm

### Installation

```bash
# Clone or navigate to the directory
cd d:/Portfolio_Subramani

# Install dependencies
npm install
```

### Development

To start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173/` (or the next available port displayed in the terminal).

### Production Build

To build the project for production:

```bash
npm run build
```

This generates an optimized, minified bundle inside the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 Deployment

You can deploy the contents of `dist/` to any static hosting service:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
Configure your GitHub Actions workflow or push the `dist/` directory to the `gh-pages` branch.

---

## 📝 How to Update Content (Data-Driven Architecture)

All personal data, experience, projects, education, and skills are isolated into structured TypeScript data files in `src/data/`. You never need to touch the 3D scene code to update your information.

### 1. How to Change Profile Information
Open [`src/data/profile.ts`](file:///d:/Portfolio_Subramani/src/data/profile.ts):
```ts
export const profile = {
  name: 'Subramani',
  fullName: 'Subramani V',
  title: 'Software Engineer | Web, Mobile & Frappe Developer',
  email: 'subbudme475@gmail.com',
  phone: '+91 9159029499',
  location: 'Trichy, India',
  github: 'https://github.com/Subbu-475',
  linkedin: 'https://www.linkedin.com/in/subramani-v-847291211',
  tagline: '...',
  // ...
};
```

### 2. How to Add a Project
Open [`src/data/projects.ts`](file:///d:/Portfolio_Subramani/src/data/projects.ts) and append a new object to the `projects` array:
```ts
{
  id: 'my-new-project',
  title: 'My Project Name',
  shortDescription: 'One line description',
  longDescription: 'Comprehensive overview of architecture and features',
  technologies: ['React', 'Node.js', 'PostgreSQL'],
  github: 'https://github.com/Subbu-475/repo',
  demo: 'https://demo-url.com',
  challenges: ['Challenge 1 resolved', 'Challenge 2 resolved'],
  featured: true,
  category: 'web' // 'web' | 'mobile' | 'enterprise' | 'fullstack'
}
```
The 3D **Project World** will automatically generate an interactive 3D node and make it clickable!

### 3. How to Add Experience
Open [`src/data/experience.ts`](file:///d:/Portfolio_Subramani/src/data/experience.ts) and add a new entry:
```ts
{
  id: 'company-slug',
  title: 'Senior Software Engineer',
  company: 'Company Name',
  location: 'City / Remote',
  period: '2026 - Present',
  current: true,
  description: 'Role overview...',
  achievements: [
    'Key milestone 1',
    'Key milestone 2'
  ],
  technologies: ['React', 'TypeScript', 'Node.js']
}
```

### 4. How to Add a Skill
Open [`src/data/skills.ts`](file:///d:/Portfolio_Subramani/src/data/skills.ts):
Add your skill under the appropriate category (`frontend`, `backend`, `database`, `devops`, or `other`):
```ts
{ 
  name: 'GraphQL', 
  category: 'backend', 
  projectsUsedIn: ['sss-smart-tech'] 
}
```
It will automatically join the orbiting **Technology Galaxy** in 3D with interactive click details!

### 5. How to Replace 3D Models / Assets
Currently, all scenes use lightweight, high-performance **procedural 3D geometries** (cones, boxes, cylinders, spheres, and meshes) to ensure fast 60fps rendering across desktop and mobile devices without multi-megabyte GLB loading bottlenecks.

If you wish to load external `.glb` / `.gltf` 3D models exported from Blender:
1. Place your `.glb` file inside the `public/models/` folder (e.g. `public/models/avatar.glb` or `public/models/car.glb`).
2. In any scene component (e.g., `src/three/scenes/IntroScene.tsx` or `src/three/Character.tsx`):
```tsx
import { useGLTF } from '@react-three/drei';

function CustomModel() {
  const { scene } = useGLTF('/models/avatar.glb');
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />;
}
```
3. Preload the model for zero latency:
```tsx
useGLTF.preload('/models/avatar.glb');
```

---

## 📱 Responsive & Performance Guidelines

- **Desktop (1920×1080, 1440×900, 1366×768):** Full cinematic quality, post-processing bloom, custom cursor, and deep starfield.
- **Mobile & Tablet (390×844, 375×812, 768×1024):** Touch drag scrolling, auto-scaled pixel ratio (`dpr={1}`), custom cursor hidden, and responsive text sizing.
- **Quality Setting:** The gear icon in the bottom-right allows switching between `AUTO`, `HIGH`, and `LOW` rendering tiers on any device.

---

## 📄 License

MIT © [Subramani V](https://github.com/Subbu-475). All rights reserved.
