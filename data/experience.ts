export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "ENGINEERING" | "LEADERSHIP";
  description: string;
  bullets: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
}

export const experiences: ExperienceItem[] = [
  {
    id: "learnlogicify",
    role: "Full Stack Development Intern",
    organization: "LEARNLOGICIFY",
    location: "Coimbatore,India",
    period: "JUNE 2025",
    type: "ENGINEERING",
    description:
      "Developed responsive web applications, built reusable UI components, worked across frontend and backend systems, and contributed to application performance optimization.",
    bullets: [
      "Architected and deployed responsive full-stack features using React, Node.js, and modern RESTful APIs.",
      "Engineered reusable, accessible UI component libraries following atomic design principles.",
      "Optimized client-side rendering pathways and asset pipelines, reducing First Contentful Paint by 35%.",
      "Collaborated on backend service integrations, schema designs, and database query optimization.",
    ],
    technologies: ["React", "JavaScript", "Node.js", "REST APIs", "UI Engineering", "Tailwind CSS"],
    metrics: [
      { label: "PERFORMANCE GAIN", value: "+35%" },
      { label: "COMPONENTS BUILT", value: "40+" },
    ],
  },
  {
    id: "merkisys",
    role: "Full Stack Developer Intern",
    organization: "MERKISYS",
    location: "Coimbatore, India",
    period: "April 2026 - PRESENT",
    type: "ENGINEERING",
    description:
      "Worked on a full-stack Customer & Document Automation Portal designed as a SaaS-style administrative platform to streamline customer management, project workflows, document processing, and automated PDF generation.",
    bullets: [
      "Customer & Workflow Management: Developed and enhanced customer, client, account, job, and project management workflows, including search, validation, status tracking, quick-view interfaces, CSV export, job assignment, revision defaults, and project workflow features.",
      "Document Automation & Bridge Layer: Engineered template-aware document mapping workflows that dynamically place business data onto existing PDF coversheets while preserving their original structure and layout.",
      "PDF Processing & Automated Generation: Worked with pdf-lib and pdf-parse to support PDF parsing, manipulation, field placement, document processing, and automated document generation workflows.",
      "Authentication & Role-Based Access: Worked with JWT-based authentication, password reset workflows, role-based permissions, and dynamic navigation based on authenticated user roles.",
      "Dashboard & Frontend Engineering: Contributed to responsive administrative interfaces, dashboard metric cards, interactive Chart.js visualizations, search and validation flows, loading states, empty states, and reusable frontend functionality using modern JavaScript.",
      "Backend & Database Integration: Worked across Node.js, Express.js, Sequelize ORM, and MySQL to integrate frontend workflows with backend APIs, business logic, and persistent application data.",
      "Testing & Application Reliability: Worked with Vitest, jsdom, and fast-check for application testing, including functional and property-based testing of important application workflows.",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "JavaScript",
      "MySQL",
      "Sequelize",
      "PDF Automation",
      "pdf-lib",
      "JWT",
      "Chart.js",
      "Vitest",
    ],
    metrics: [
      { label: "FOCUS", value: "PDF Automation" },
      { label: "STACK", value: "Node & MySQL" },
    ],
  },
  {
    id: "toastmasters",
    role: "Secretary & Distinguished Speaker",
    organization: "KIT TOASTMASTERS INTERNATIONAL CLUB",
    location: "Coimbatore, India",
    period: "2024 — PRESENT",
    type: "LEADERSHIP",
    description:
      "Elected club secretary leading executive communications, organizing university-wide speech contests, and representing the club in competitive evaluation divisions.",
    bullets: [
      "Evaluation Contest Winner: Demonstrated critical analytical thinking and structured real-time feedback under competitive time limits.",
      "Distinguished Speaker: Delivered technical and persuasive speeches to cross-disciplinary audiences.",
      "Executive Administration: Managed club operations, records, membership correspondence, and public relations.",
      "Mentored junior undergraduates in public speaking, impromptu articulation, and collaborative leadership.",
    ],
    technologies: [
      "Executive Leadership",
      "Evaluation Contest Winner",
      "Distinguished Speaker",
      "Strategic Communication",
    ],
    metrics: [
      { label: "HONOR", value: "Contest Winner" },
      { label: "ROLE", value: "Club Secretary" },
    ],
  },
];
