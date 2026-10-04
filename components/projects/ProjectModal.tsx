"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
import ProjectVisualPreview from "./ProjectVisualPreview";
import { X, CheckCircle2, Cpu, Wrench, BarChart2 } from "lucide-react";
import { useCursor } from "@/components/ui/CustomCursorContext";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="relative w-full max-w-5xl max-h-[90vh] bg-[#09090d] border border-white/15 shadow-2xl rounded-sm overflow-hidden flex flex-col z-10"
        >
          {/* Modal Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0c0c12]">
            <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
              <span className="text-white/40">{project.number}</span>
              <span className="w-3 h-[1px] bg-white/20" />
              <span>{project.category}</span>
            </div>

            <button
              type="button"
              onClick={onClose}
              onMouseEnter={() => setCursor("close", "CLOSE")}
              onMouseLeave={resetCursor}
              aria-label="Close modal"
              className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto px-6 sm:px-10 py-8 space-y-12 divide-y divide-white/[0.08]">
            {/* 1. Case Study Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 mb-4 rounded-none border border-white/10 bg-white/[0.02] font-mono text-[10px] tracking-widest text-neutral-300 uppercase">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: project.accentColor || "#ffffff" }}
                />
                {project.status} // {project.year}
              </div>

              <h2
                id="modal-title"
                className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight mb-4"
              >
                {project.title}
              </h2>

              <p className="text-lg sm:text-xl text-neutral-300 font-light leading-relaxed max-w-3xl">
                {project.caseStudy.tagline}
              </p>
            </div>

            {/* 2. Visual / Video Preview Showcase */}
            <div className="pt-8">
              <div className="h-[280px] sm:h-[360px] md:h-[440px]">
                <ProjectVisualPreview project={project} isHovered={true} />
              </div>
            </div>

            {/* 3. Overview & Problem / Solution Grid */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase">
                  <Cpu size={14} className="text-white" />
                  <span>SYSTEM OVERVIEW</span>
                </div>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light">
                  {project.caseStudy.overview}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-2">
                    THE CHALLENGE
                  </h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {project.caseStudy.problem}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-2">
                    ENGINEERED SOLUTION
                  </h4>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {project.caseStudy.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Architecture & Engineering Pipeline */}
            <div className="pt-8 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase">
                <Wrench size={14} className="text-white" />
                <span>ARCHITECTURE & PIPELINE SPECIFICATION</span>
              </div>

              <div className="p-6 bg-[#0e0e14] border border-white/10 rounded-sm">
                <h4 className="font-editorial-heading text-xl text-white uppercase mb-2">
                  {project.caseStudy.architecture.title}
                </h4>
                <p className="text-sm text-neutral-400 mb-6">
                  {project.caseStudy.architecture.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.caseStudy.architecture.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start gap-3 p-3.5 bg-black/40 border border-white/[0.06] text-xs sm:text-sm text-neutral-300"
                    >
                      <span className="font-mono text-[10px] text-neutral-500 mt-0.5">
                        0{pIdx + 1}
                      </span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Key Engineering Decisions */}
            <div className="pt-8 space-y-6">
              <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                KEY ENGINEERING DECISIONS & TRADEOFFS
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.caseStudy.engineeringDecisions.map((dec, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-5 bg-white/[0.02] border border-white/10 rounded-sm"
                  >
                    <h5 className="font-mono text-xs text-white font-medium tracking-wide uppercase mb-2">
                      {dec.title}
                    </h5>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {dec.rationale}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Technical Stack Matrix & Key Results */}
            <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
              <div>
                <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase mb-4">
                  TECHNOLOGIES & TOOLING
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="font-mono text-xs tracking-wider px-3 py-1.5 bg-white/[0.04] border border-white/10 text-neutral-200 uppercase"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-neutral-400 uppercase mb-4">
                  <BarChart2 size={14} className="text-emerald-400" />
                  <span>KEY IMPACT & METRICS</span>
                </div>
                <div className="space-y-2.5">
                  {project.caseStudy.outcomes.map((out, oIdx) => (
                    <div
                      key={oIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0a0a0e] flex items-center justify-between">
            <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
              PRESS ESC OR CLICK OUTSIDE TO CLOSE
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 font-mono text-xs tracking-widest bg-white text-black hover:bg-neutral-200 transition-colors uppercase font-medium"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
