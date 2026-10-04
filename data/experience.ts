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
    location: "Remote / Hybrid",
    period: "JUNE 2025 — PRESENT",
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
