"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { RotateCcw, Zap, Sparkles, Filter, Info, Move } from "lucide-react";

interface NodeData {
  id: string;
  name: string;
  category: "languages" | "web-databases" | "aiml-core";
  categoryLabel: string;
  tag: string;
  level: "Mastery" | "Advanced" | "Proficient";
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX?: number;
  targetY?: number;
  isDragging?: boolean;
}

interface EdgeData {
  source: string;
  target: string;
  strength: number;
  label?: string;
}

interface Photon {
  source: string;
  target: string;
  progress: number;
  speed: number;
  color: string;
}

const CATEGORY_CONFIG = {
  languages: {
    color: "#38bdf8", // Sky blue
    glow: "rgba(56, 189, 248, 0.35)",
    lightGlow: "rgba(56, 189, 248, 0.08)",
    label: "Languages",
    number: "01",
    centroidXRatio: 0.18,
    centroidYRatio: 0.5,
  },
  "web-databases": {
    color: "#f59e0b", // Amber/Gold
    glow: "rgba(245, 158, 11, 0.35)",
    lightGlow: "rgba(245, 158, 11, 0.08)",
    label: "Web & Data",
    number: "02",
    centroidXRatio: 0.5,
    centroidYRatio: 0.5,
  },
  "aiml-core": {
    color: "#a855f7", // Violet/Purple
    glow: "rgba(168, 85, 247, 0.35)",
    lightGlow: "rgba(168, 85, 247, 0.08)",
    label: "AI / ML & Core",
    number: "03",
    centroidXRatio: 0.82,
    centroidYRatio: 0.5,
  },
};

const INITIAL_NODES: Omit<NodeData, "x" | "y" | "vx" | "vy">[] = [
  // Languages (01) - Sleek radii (14 - 18px)
  { id: "python", name: "Python", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "AI/ML & Scripting", level: "Mastery", radius: 18 },
  { id: "cpp", name: "C++", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "Competitive & STL", level: "Mastery", radius: 17 },
  { id: "javascript", name: "JavaScript", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "Modern ES6+", level: "Mastery", radius: 17 },
  { id: "java", name: "Java", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "OOP & Enterprise", level: "Advanced", radius: 15 },
  { id: "c", name: "C", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "Systems & Memory", level: "Advanced", radius: 14 },
  { id: "sql", name: "SQL", category: "languages", categoryLabel: "01 PROGRAMMING", tag: "Relational Queries", level: "Mastery", radius: 14 },

  // Web & Databases (02)
  { id: "react", name: "React.js", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "UI & State Architecture", level: "Mastery", radius: 18 },
  { id: "nodejs", name: "Node.js", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "Async Backends & APIs", level: "Mastery", radius: 17 },
  { id: "tailwind", name: "Tailwind CSS", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "Design Systems & UI", level: "Mastery", radius: 15 },
  { id: "postgresql", name: "PostgreSQL", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "ACID & Relational", level: "Advanced", radius: 16 },
  { id: "mongodb", name: "MongoDB", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "NoSQL & Aggregations", level: "Advanced", radius: 15 },
  { id: "sqlite", name: "SQLite", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "Embedded Fast DB", level: "Advanced", radius: 13 },
  { id: "html5", name: "HTML5 / Semantic", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "DOM & A11y", level: "Mastery", radius: 13 },
  { id: "css3", name: "CSS3 / Modern", category: "web-databases", categoryLabel: "02 WEB & DATA", tag: "Animations & Grid", level: "Mastery", radius: 13 },

  // AI/ML & Core (03)
  { id: "pytorch", name: "PyTorch", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Deep Learning & Tensors", level: "Mastery", radius: 18 },
  { id: "transformers", name: "Transformers", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Self-Attention & LLMs", level: "Mastery", radius: 17 },
  { id: "fastapi", name: "FastAPI", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Async Inference API", level: "Mastery", radius: 16 },
  { id: "rag", name: "RAG", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Vector Embeddings & Search", level: "Mastery", radius: 16 },
  { id: "agentic_ai", name: "Agentic AI", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Autonomous Tools & LLMs", level: "Advanced", radius: 16 },
  { id: "tensorflow", name: "TensorFlow", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Vision & Deep Models", level: "Advanced", radius: 15 },
  { id: "nlp", name: "NLP", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Language Processing", level: "Advanced", radius: 15 },
  { id: "dsa", name: "DSA", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "1,150+ Problems Solved", level: "Mastery", radius: 17 },
  { id: "os", name: "Operating Systems", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Concurrency & POSIX", level: "Advanced", radius: 14 },
  { id: "dbms", name: "DBMS", category: "aiml-core", categoryLabel: "03 AI/ML & CORE", tag: "Indexing & Transactions", level: "Advanced", radius: 14 },
];

const INITIAL_EDGES: EdgeData[] = [
  // AI/ML Sub-network
  { source: "python", target: "pytorch", strength: 0.9 },
  { source: "python", target: "tensorflow", strength: 0.8 },
  { source: "python", target: "fastapi", strength: 0.9 },
  { source: "pytorch", target: "transformers", strength: 0.95 },
  { source: "transformers", target: "rag", strength: 0.9 },
  { source: "transformers", target: "agentic_ai", strength: 0.9 },
  { source: "rag", target: "fastapi", strength: 0.85 },
  { source: "pytorch", target: "nlp", strength: 0.8 },
  { source: "transformers", target: "nlp", strength: 0.85 },
  { source: "agentic_ai", target: "fastapi", strength: 0.8 },

  // Web & Full-Stack Sub-network
  { source: "javascript", target: "react", strength: 0.95 },
  { source: "javascript", target: "nodejs", strength: 0.9 },
  { source: "react", target: "tailwind", strength: 0.85 },
  { source: "react", target: "html5", strength: 0.75 },
  { source: "html5", target: "css3", strength: 0.85 },
  { source: "nodejs", target: "mongodb", strength: 0.85 },
  { source: "nodejs", target: "postgresql", strength: 0.85 },
  { source: "nodejs", target: "sqlite", strength: 0.7 },
  { source: "postgresql", target: "sql", strength: 0.9 },
  { source: "sqlite", target: "sql", strength: 0.85 },

  // Cross-Domain Bridges (AI to Web & Full-Stack)
  { source: "fastapi", target: "react", strength: 0.7 },
  { source: "fastapi", target: "postgresql", strength: 0.65 },
  { source: "python", target: "sql", strength: 0.6 },

  // Core Systems & DSA Bridges
  { source: "cpp", target: "dsa", strength: 0.95 },
  { source: "cpp", target: "c", strength: 0.85 },
  { source: "c", target: "os", strength: 0.9 },
  { source: "java", target: "dsa", strength: 0.8 },
  { source: "java", target: "dbms", strength: 0.75 },
  { source: "dbms", target: "sql", strength: 0.9 },
  { source: "dbms", target: "postgresql", strength: 0.8 },
  { source: "os", target: "dbms", strength: 0.65 },
  { source: "dsa", target: "python", strength: 0.7 },
];

export default function NeuralSkillGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeData | null>(null);
  const [pulseWave, setPulseWave] = useState<number>(0);

  // Mutable state for 60fps simulation loop
  const nodesRef = useRef<NodeData[]>([]);
  const edgesRef = useRef<EdgeData[]>(INITIAL_EDGES);
  const photonsRef = useRef<Photon[]>([]);
  const dragNodeRef = useRef<NodeData | null>(null);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const isHoveringCanvasRef = useRef(false);

  // Initialize node physics positions with spacious constellation distribution
  const initSimulation = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    nodesRef.current = INITIAL_NODES.map((node) => {
      const cfg = CATEGORY_CONFIG[node.category];
      const centerX = width * cfg.centroidXRatio;
      const centerY = height * cfg.centroidYRatio;

      // Calculate clean radial offset within cluster
      const catNodes = INITIAL_NODES.filter((n) => n.category === node.category);
      const catIndex = catNodes.findIndex((n) => n.id === node.id);
      const angle = (catIndex / catNodes.length) * Math.PI * 2 + (node.category === "languages" ? 0.3 : node.category === "aiml-core" ? -0.3 : 0);
      const dist = 75 + (catIndex % 3) * 55;

      return {
        ...node,
        x: centerX + Math.cos(angle) * dist,
        y: centerY + Math.sin(angle) * (dist * 0.9),
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        targetX: centerX,
        targetY: centerY,
      };
    });

    // Seed continuous traveling photons along synapses
    photonsRef.current = [];
    INITIAL_EDGES.forEach((edge, i) => {
      if (i % 2 === 0) {
        const sourceNode = INITIAL_NODES.find((n) => n.id === edge.source);
        photonsRef.current.push({
          source: edge.source,
          target: edge.target,
          progress: Math.random(),
          speed: 0.003 + Math.random() * 0.004,
          color: sourceNode ? CATEGORY_CONFIG[sourceNode.category].color : "#fff",
        });
      }
    });
  }, []);

  // Handle pulse shockwave trigger
  const triggerPulse = () => {
    setPulseWave(Date.now());
    nodesRef.current.forEach((node) => {
      const angle = Math.random() * Math.PI * 2;
      const force = 2.5 + Math.random() * 3;
      node.vx += Math.cos(angle) * force;
      node.vy += Math.sin(angle) * force;
    });
  };

  // Re-stabilize / Reset
  const resetGraph = () => {
    initSimulation();
    setSelectedNode(null);
    setHoveredNode(null);
  };

  useEffect(() => {
    initSimulation();

    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvasRef.current.width = width * dpr;
      canvasRef.current.height = height * dpr;
      canvasRef.current.style.width = `${width}px`;
      canvasRef.current.style.height = `${height}px`;

      // Update target centroids for new dimensions
      nodesRef.current.forEach((node) => {
        const cfg = CATEGORY_CONFIG[node.category];
        node.targetX = width * cfg.centroidXRatio;
        node.targetY = height * cfg.centroidYRatio;
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Canvas Force-Directed Animation Loop
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;
      const activeHover = hoveredNode;
      const activeSelect = selectedNode;
      const activeFilter = activeCategory;

      // 1. Force-Directed Physics Step
      // Repulsion between all node pairs with wide, generous safety buffer
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          // Coulomb repulsion with generous padding (75px+)
          const minSafeDist = n1.radius + n2.radius + 68;
          const repulsionForce = Math.min(320, (minSafeDist * minSafeDist * 2.2) / distSq);
          const fx = (dx / dist) * repulsionForce;
          const fy = (dy / dist) * repulsionForce;

          if (!n1.isDragging) {
            n1.vx -= fx * 0.07;
            n1.vy -= fy * 0.07;
          }
          if (!n2.isDragging) {
            n2.vx += fx * 0.07;
            n2.vy += fy * 0.07;
          }
        }
      }

      // Spring attraction along edges with wide desired distance (160px - 190px)
      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const n1 = nodes.find((n) => n.id === edge.source);
        const n2 = nodes.find((n) => n.id === edge.target);
        if (!n1 || !n2) continue;

        const dx = n2.x - n1.x;
        const dy = n2.y - n1.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const desiredDist = 175; // Much wider spacing so nodes never bunch up
        const delta = dist - desiredDist;
        const springForce = delta * 0.0018 * edge.strength;

        const fx = (dx / dist) * springForce;
        const fy = (dy / dist) * springForce;

        if (!n1.isDragging) {
          n1.vx += fx;
          n1.vy += fy;
        }
        if (!n2.isDragging) {
          n2.vx -= fx;
          n2.vy -= fy;
        }
      }

      // Gravitational attraction toward category centroids & bounds collision
      nodes.forEach((node) => {
        if (!node.isDragging && node.targetX && node.targetY) {
          const cdx = node.targetX - node.x;
          const cdy = node.targetY - node.y;
          node.vx += cdx * 0.0018;
          node.vy += cdy * 0.0018;

          // Gentle center pull
          const gx = width / 2 - node.x;
          const gy = height / 2 - node.y;
          node.vx += gx * 0.0003;
          node.vy += gy * 0.0003;
        }

        // Apply friction / velocity damping
        if (!node.isDragging) {
          node.vx *= 0.88;
          node.vy *= 0.88;
          node.x += node.vx;
          node.y += node.vy;
        }

        // Boundary constraints with padding
        const pad = node.radius + 30;
        if (node.x < pad) { node.x = pad; node.vx *= -0.5; }
        if (node.x > width - pad) { node.x = width - pad; node.vx *= -0.5; }
        if (node.y < pad + 35) { node.y = pad + 35; node.vy *= -0.5; }
        if (node.y > height - pad - 25) { node.y = height - pad - 25; node.vy *= -0.5; }
      });

      // 2. Draw Subtle Cluster Halos in background
      Object.entries(CATEGORY_CONFIG).forEach(([catKey, cfg]) => {
        const catNodes = nodes.filter((n) => n.category === catKey);
        if (catNodes.length === 0) return;

        let avgX = 0;
        let avgY = 0;
        catNodes.forEach((n) => {
          avgX += n.x;
          avgY += n.y;
        });
        avgX /= catNodes.length;
        avgY /= catNodes.length;

        const isCatActive = activeFilter === "all" || activeFilter === catKey;
        const grad = ctx.createRadialGradient(avgX, avgY, 20, avgX, avgY, 240);
        grad.addColorStop(0, isCatActive ? cfg.lightGlow : "rgba(255,255,255,0.01)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(avgX, avgY, 240, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Synapse Edges
      edges.forEach((edge) => {
        const n1 = nodes.find((n) => n.id === edge.source);
        const n2 = nodes.find((n) => n.id === edge.target);
        if (!n1 || !n2) return;

        const isHighlighted =
          (activeHover && (activeHover.id === n1.id || activeHover.id === n2.id)) ||
          (activeSelect && (activeSelect.id === n1.id || activeSelect.id === n2.id));

        const isDimmed =
          (activeHover && activeHover.id !== n1.id && activeHover.id !== n2.id) ||
          (activeFilter !== "all" && n1.category !== activeFilter && n2.category !== activeFilter);

        ctx.beginPath();
        ctx.moveTo(n1.x, n1.y);
        ctx.lineTo(n2.x, n2.y);

        if (isHighlighted) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
          ctx.lineWidth = 2.0;
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 8;
        } else if (isDimmed) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
          ctx.lineWidth = 0.6;
          ctx.shadowBlur = 0;
        } else {
          // Subtle gradient between node colors
          const edgeGrad = ctx.createLinearGradient(n1.x, n1.y, n2.x, n2.y);
          edgeGrad.addColorStop(0, CATEGORY_CONFIG[n1.category].color + "33");
          edgeGrad.addColorStop(1, CATEGORY_CONFIG[n2.category].color + "33");
          ctx.strokeStyle = edgeGrad;
          ctx.lineWidth = 1.0;
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.shadowBlur = 0; // reset
      });

      // 4. Draw Traveling Synapse Photons (Energy Packets)
      photonsRef.current.forEach((photon) => {
        const n1 = nodes.find((n) => n.id === photon.source);
        const n2 = nodes.find((n) => n.id === photon.target);
        if (!n1 || !n2) return;

        photon.progress += photon.speed;
        if (photon.progress > 1) {
          photon.progress = 0;
        }

        const px = n1.x + (n2.x - n1.x) * photon.progress;
        const py = n1.y + (n2.y - n1.y) * photon.progress;

        const isDimmed =
          (activeHover && activeHover.id !== n1.id && activeHover.id !== n2.id) ||
          (activeFilter !== "all" && n1.category !== activeFilter && n2.category !== activeFilter);

        if (!isDimmed) {
          ctx.beginPath();
          ctx.arc(px, py, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = photon.color;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 5. Draw Nodes & Labels
      nodes.forEach((node) => {
        const cfg = CATEGORY_CONFIG[node.category];
        const isHovered = activeHover?.id === node.id;
        const isSelected = activeSelect?.id === node.id;
        const isNeighbor =
          activeHover &&
          edges.some(
            (e) =>
              (e.source === activeHover.id && e.target === node.id) ||
              (e.target === activeHover.id && e.source === node.id)
          );

        const isDimmed =
          (activeHover && !isHovered && !isNeighbor) ||
          (activeFilter !== "all" && node.category !== activeFilter);

        const currentRadius = isHovered || isSelected ? node.radius + 3 : node.radius;

        // A. Outer Glow Halo
        if (!isDimmed) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 6, 0, Math.PI * 2);
          ctx.fillStyle = isHovered || isSelected ? cfg.glow : "rgba(255, 255, 255, 0.02)";
          ctx.fill();
        }

        // B. Pulsing Orbit Ring (if hovered or selected)
        if (isHovered || isSelected) {
          const orbitTime = Date.now() * 0.002;
          ctx.beginPath();
          ctx.arc(node.x, node.y, currentRadius + 8, 0, Math.PI * 2);
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.lineDashOffset = -orbitTime * 10;
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // C. Core Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);

        if (isHovered || isSelected) {
          ctx.fillStyle = "#0c0c14";
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.shadowColor = cfg.color;
          ctx.shadowBlur = 12;
        } else if (isNeighbor) {
          ctx.fillStyle = "#09090e";
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth = 1.5;
          ctx.shadowColor = cfg.color;
          ctx.shadowBlur = 6;
        } else if (isDimmed) {
          ctx.fillStyle = "rgba(10, 10, 14, 0.3)";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = "#09090d";
          ctx.strokeStyle = cfg.color;
          ctx.lineWidth = 1.2;
          ctx.shadowColor = cfg.glow;
          ctx.shadowBlur = 4;
        }

        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        // D. Inner Neural Center Dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 4 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#ffffff" : isDimmed ? "rgba(255,255,255,0.15)" : cfg.color;
        ctx.fill();

        // E. Typography Label with Sleek Dark Pill Background
        ctx.font = isHovered || isSelected ? "600 11px JetBrains Mono, monospace" : "500 10px JetBrains Mono, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const labelY = node.y + currentRadius + 14;
        const textMetrics = ctx.measureText(node.name);
        const textWidth = textMetrics.width;

        // Background pill
        ctx.fillStyle = isDimmed ? "rgba(6, 6, 9, 0.5)" : "rgba(9, 9, 13, 0.85)";
        ctx.beginPath();
        if (typeof ctx.roundRect === "function") {
          ctx.roundRect(node.x - textWidth / 2 - 6, labelY - 8, textWidth + 12, 16, 3);
        } else {
          ctx.rect(node.x - textWidth / 2 - 6, labelY - 8, textWidth + 12, 16);
        }
        ctx.fill();

        ctx.strokeStyle = isHovered
          ? cfg.color
          : isDimmed
            ? "rgba(255, 255, 255, 0.03)"
            : "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Label text
        if (isHovered || isSelected) {
          ctx.fillStyle = "#ffffff";
        } else if (isNeighbor) {
          ctx.fillStyle = "#f3f4f6";
        } else if (isDimmed) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        }

        ctx.fillText(node.name, node.x, labelY);
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [initSimulation, activeCategory, hoveredNode, selectedNode]);

  // Pointer & Drag Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedNode = nodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 10;
    });

    if (clickedNode) {
      clickedNode.isDragging = true;
      dragNodeRef.current = clickedNode;
      setSelectedNode(clickedNode);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mousePosRef.current = { x, y };

    if (dragNodeRef.current) {
      dragNodeRef.current.x = x;
      dragNodeRef.current.y = y;
      dragNodeRef.current.vx = 0;
      dragNodeRef.current.vy = 0;
      return;
    }

    const hoverTarget = nodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 10;
    });

    if (hoverTarget !== hoveredNode) {
      setHoveredNode(hoverTarget || null);
      if (hoverTarget) {
        setCursor("link", `Node: ${hoverTarget.name}`);
      } else {
        resetCursor();
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (dragNodeRef.current) {
      dragNodeRef.current.isDragging = false;
      dragNodeRef.current = null;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch { }
    }
  };

  // Connected nodes calculation for HUD inspector
  const activeInspectorNode = hoveredNode || selectedNode;
  const connectedEdges = useMemo(() => {
    if (!activeInspectorNode) return [];
    return INITIAL_EDGES.filter(
      (e) => e.source === activeInspectorNode.id || e.target === activeInspectorNode.id
    );
  }, [activeInspectorNode]);

  const connectedNodes = useMemo(() => {
    if (!activeInspectorNode) return [];
    const neighborIds = connectedEdges.map((e) =>
      e.source === activeInspectorNode.id ? e.target : e.source
    );
    return INITIAL_NODES.filter((n) => neighborIds.includes(n.id));
  }, [activeInspectorNode, connectedEdges]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[660px] sm:h-[720px] lg:h-[760px] bg-[#060609] border border-white/[0.08] rounded-sm overflow-hidden select-none"
      onMouseEnter={() => { isHoveringCanvasRef.current = true; }}
      onMouseLeave={() => {
        isHoveringCanvasRef.current = false;
        setHoveredNode(null);
        resetCursor();
      }}
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Top HUD Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-[#0d0d12]/90 backdrop-blur-md border border-white/[0.08] rounded-sm text-xs font-mono">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 transition-all uppercase tracking-wider text-[10px] ${activeCategory === "all"
                ? "bg-white text-black font-semibold shadow-sm"
                : "text-neutral-400 hover:text-white"
              }`}
          >
            All Clusters ({INITIAL_NODES.length})
          </button>
          <button
            onClick={() => setActiveCategory("languages")}
            className={`px-3 py-1.5 transition-all uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${activeCategory === "languages"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                : "text-neutral-400 hover:text-sky-300"
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            01 Languages
          </button>
          <button
            onClick={() => setActiveCategory("web-databases")}
            className={`px-3 py-1.5 transition-all uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${activeCategory === "web-databases"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "text-neutral-400 hover:text-amber-300"
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            02 Web & DB
          </button>
          <button
            onClick={() => setActiveCategory("aiml-core")}
            className={`px-3 py-1.5 transition-all uppercase tracking-wider text-[10px] flex items-center gap-1.5 ${activeCategory === "aiml-core"
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/40"
                : "text-neutral-400 hover:text-purple-300"
              }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            03 AI/ML & Core
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerPulse}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d12]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/30 text-neutral-300 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm"
            title="Inject kinetic energy pulse"
          >
            <Zap size={12} className="text-amber-400" />
            <span>Kinetic Pulse</span>
          </button>
          <button
            onClick={resetGraph}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d12]/90 backdrop-blur-md border border-white/[0.08] hover:border-white/30 text-neutral-300 hover:text-white font-mono text-[10px] uppercase tracking-wider transition-all rounded-sm"
            title="Re-stabilize node coordinates"
          >
            <RotateCcw size={12} className="text-sky-400" />
            <span>Stabilize</span>
          </button>
        </div>
      </div>

      {/* Main Physics Canvas */}
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Tactical Hint Overlay (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-2 bg-[#09090e]/80 backdrop-blur-md border border-white/[0.06] rounded-sm font-mono text-[10px] text-neutral-400">
        <Move size={12} className="text-neutral-500" />
      </div>

      {/* Active Node Inspector Telemetry Card (Bottom Right HUD) */}
      <AnimatePresence>
        {activeInspectorNode && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 right-4 z-30 w-80 sm:w-96 p-4 bg-[#09090f]/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-sm pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_CONFIG[activeInspectorNode.category].color }}
                />
                <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                  {activeInspectorNode.categoryLabel}
                </span>
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 border border-white/10 bg-white/[0.04] text-neutral-300">
                {activeInspectorNode.level}
              </span>
            </div>

            {/* Node Name & Tag */}
            <div className="mb-3">
              <div className="font-editorial-heading text-2xl text-white font-bold tracking-tight">
                {activeInspectorNode.name}
              </div>
              <div className="font-mono text-xs text-neutral-400 mt-0.5">
                {activeInspectorNode.tag}
              </div>
            </div>

            {/* Connected Subsystems */}
            <div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center justify-between">
                <span>INTERLINKED SYNAPSES ({connectedNodes.length})</span>
                <span>DEGREE: {connectedEdges.length}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
                {connectedNodes.map((n) => (
                  <span
                    key={n.id}
                    className="font-mono text-[10px] px-2 py-1 bg-white/[0.04] border border-white/[0.08] text-neutral-200 rounded-none flex items-center gap-1.5"
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: CATEGORY_CONFIG[n.category].color }}
                    />
                    {n.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
