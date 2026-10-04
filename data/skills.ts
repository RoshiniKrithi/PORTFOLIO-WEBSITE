export interface SkillCategory {
  id: string;
  categoryNumber: string;
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level?: string;
    tag?: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    categoryNumber: "01",
    title: "PROGRAMMING LANGUAGES",
    subtitle: "Core syntax, paradigms, and algorithm implementations",
    skills: [
      { name: "Java", tag: "OOP & Enterprise" },
      { name: "C", tag: "Systems & Memory" },
      { name: "C++", tag: "Competitive & STL" },
      { name: "JavaScript", tag: "Modern ES6+" },
      { name: "Python", tag: "AI/ML & Scripting" },
      { name: "SQL", tag: "Relational Queries" },
    ],
  },
  {
    id: "web-databases",
    categoryNumber: "02",
    title: "WEB & DATABASES",
    subtitle: "Modern client-server architectures, protocols, and data layers",
    skills: [
      { name: "React.js", tag: "UI & State" },
      { name: "Node.js", tag: "Async Backends" },
      { name: "Tailwind CSS", tag: "Design Systems" },
      { name: "MongoDB", tag: "NoSQL & Aggregations" },
      { name: "PostgreSQL", tag: "ACID & Relational" },
      { name: "SQLite", tag: "Embedded Fast DB" },
      { name: "HTML5 / Semantic", tag: "DOM & A11y" },
      { name: "CSS3 / Modern", tag: "Animations & Grid" },
    ],
  },
  {
    id: "aiml-core",
    categoryNumber: "03",
    title: "AI / ML & COMPUTER SCIENCE CORE",
    subtitle: "Neural architectures, algorithmic complexity, and systems foundations",
    skills: [
      { name: "PyTorch", tag: "Deep Learning" },
      { name: "TensorFlow", tag: "Vision & Models" },
      { name: "Transformers", tag: "Self-Attention" },
      { name: "NLP", tag: "Language Processing" },
      { name: "RAG", tag: "Vector Augmentation" },
      { name: "Agentic AI", tag: "Autonomous Tools" },
      { name: "FastAPI", tag: "Async Inference API" },
      { name: "DSA", tag: "Algorithms & Complexity" },
      { name: "Operating Systems", tag: "Concurrency & POSIX" },
      { name: "DBMS", tag: "Indexing & Transactions" },
    ],
  },
];
