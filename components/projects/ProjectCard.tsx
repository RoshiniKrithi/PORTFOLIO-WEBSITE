"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import ProjectVisualPreview from "./ProjectVisualPreview";
import ProjectTerminalDrawer from "./ProjectTerminalDrawer";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { ArrowUpRight, Layers, Sparkles, Cpu } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  index: number;
}

export default function ProjectCard({ project, onSelect, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<"PREVIEW" | "X-RAY">("PREVIEW");
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [dispersion, setDispersion] = useState(0);
  const lastMouseRef = useRef({ x: 0, y: 0, time: performance.now() });
  const cardRef = useRef<HTMLElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });

    // Calculate mouse velocity for chromatic aberration dispersion
    const now = performance.now();
    const dt = Math.max(1, now - lastMouseRef.current.time);
    const dx = e.clientX - lastMouseRef.current.x;
    const dy = e.clientY - lastMouseRef.current.y;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    setDispersion(Math.min(2.5, speed * 1.8));
    lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(project)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        setCursor("view", "CASE STUDY");
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setDispersion(0);
        resetCursor();
      }}
      className="group relative cursor-pointer flex flex-col justify-between p-6 sm:p-8 bg-[#09090d] border border-white/[0.08] hover:border-white/25 transition-all duration-500 rounded-sm overflow-hidden"
      style={{
        boxShadow: isHovered
          ? `${-dispersion}px 0 rgba(255, 30, 60, 0.45), ${dispersion}px 0 rgba(0, 230, 255, 0.45), 0 20px 40px -15px rgba(0,0,0,0.8)`
          : "none",
      }}
    >
      {/* Raytraced Optical Glass Rim Sweep */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-sm"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 80%)`,
        }}
      />

      {/* Top Meta Bar + Smooth Interactive View Mode Toggle */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-4 font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
          <div className="flex items-center gap-2.5">
            <span className="text-white/40">{project.number}</span>
            <span className="w-3 h-[1px] bg-white/20" />
            <span className="text-neutral-300 font-medium">{project.category}</span>
          </div>

          {/* Simple Tactile Sliding Toggle Pill */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center p-0.5 bg-[#121218] border border-white/10 rounded-full"
          >
            <button
              type="button"
              onClick={() => setViewMode("PREVIEW")}
              className={`relative px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase transition-colors rounded-full ${
                viewMode === "PREVIEW" ? "text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {viewMode === "PREVIEW" && (
                <motion.div
                  layoutId={`toggle-pill-${project.id}`}
                  className="absolute inset-0 bg-white rounded-full shadow-sm"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <Sparkles size={9} />
                LIVE
              </span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode("X-RAY")}
              className={`relative px-2.5 py-1 text-[9px] font-mono tracking-widest uppercase transition-colors rounded-full ${
                viewMode === "X-RAY" ? "text-black font-bold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {viewMode === "X-RAY" && (
                <motion.div
                  layoutId={`toggle-pill-${project.id}`}
                  className="absolute inset-0 bg-cyan-300 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.6)]"
                  transition={{ type: "spring", stiffness: 480, damping: 34 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1">
                <Cpu size={9} />
                X-RAY
              </span>
            </button>
          </div>
        </div>

        {/* Project Title */}
        <h3 className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl text-white tracking-tight uppercase mb-4 group-hover:text-neutral-100 transition-colors">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed mb-6">
          {project.shortDescription}
        </p>
      </div>

      {/* Visual / Video Preview Component with Direct Toggle Integration */}
      <div className="my-2 relative z-10">
        <ProjectVisualPreview
          project={project}
          isHovered={isHovered}
          isXRayActive={viewMode === "X-RAY"}
        />
      </div>

      {/* Interactive Terminal Drawer (Live Docker/PyTorch Telemetry Logs) */}
      <div className="relative z-10">
        <ProjectTerminalDrawer project={project} />
      </div>

      {/* Tech Stack Pills & Bottom CTA */}
      <div className="pt-6 mt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech, tIdx) => (
            <span
              key={tIdx}
              className="font-mono text-[10px] tracking-wider px-2.5 py-1 bg-white/[0.03] border border-white/10 text-neutral-300 uppercase rounded-none"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="font-mono text-[10px] tracking-wider px-2 py-1 text-neutral-500">
              +{project.technologies.length - 4} MORE
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-neutral-400 group-hover:text-white transition-colors uppercase">
          <Layers size={12} />
          <span>VIEW ARCHITECTURE</span>
        </div>
      </div>

      {/* Subtle border highlight line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: project.accentColor || "#ffffff" }}
      />
    </motion.article>
  );
}
