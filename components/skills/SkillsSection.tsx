"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, SkillCategory } from "@/data/skills";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { Code, Database, Sparkles, Terminal, LayoutGrid, Network, Cpu } from "lucide-react";
import NeuralSkillGraph from "./NeuralSkillGraph";

export default function SkillsSection() {
  const { setCursor, resetCursor } = useCursor();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"matrix" | "topology">("topology");

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "languages":
        return <Code size={16} className="text-sky-400" />;
      case "web-databases":
        return <Database size={16} className="text-amber-400" />;
      case "aiml-core":
        return <Sparkles size={16} className="text-purple-400" />;
      default:
        return <Terminal size={16} />;
    }
  };

  return (
    <section id="skills" className="relative py-28 md:py-36 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header with View Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            number="04"
            category="SYSTEMS & TECHNOLOGIES"
            title="THE TOOLKIT"
            subtitle="Technologies I use to design, build, debug, and ship software systems."
          />

          {/* View Switcher Toggle */}
          <div className="flex items-center gap-1.5 p-1.5 bg-[#09090f] border border-white/[0.12] rounded-sm self-start md:self-auto shadow-xl">
            <button
              onClick={() => {
                setViewMode("topology");
                setCursor("link", "Neural Topology");
              }}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-sm ${
                viewMode === "topology"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <Network size={14} className={viewMode === "topology" ? "text-black" : "text-sky-400"} />
              <span>Neural Topology</span>
              <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${viewMode === "topology" ? "bg-black/10 text-neutral-800" : "bg-sky-500/20 text-sky-400"}`}>
                LIVE
              </span>
            </button>

            <button
              onClick={() => {
                setViewMode("matrix");
                setCursor("link", "Editorial Matrix");
              }}
              onMouseLeave={resetCursor}
              className={`flex items-center gap-2 px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded-sm ${
                viewMode === "matrix"
                  ? "bg-white text-black font-semibold shadow-lg"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={14} className={viewMode === "matrix" ? "text-black" : "text-neutral-400"} />
              <span>Editorial Matrix</span>
            </button>
          </div>
        </div>

        {/* View Transition Area */}
        <AnimatePresence mode="wait">
          {viewMode === "topology" ? (
            <motion.div
              key="topology-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <NeuralSkillGraph />
            </motion.div>
          ) : (
            <motion.div
              key="matrix-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {skillCategories.map((cat: SkillCategory, idx: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 bg-[#09090d] border border-white/[0.08] hover:border-white/20 transition-all duration-500 rounded-sm flex flex-col justify-between group"
                >
                  <div>
                    {/* Category Header */}
                    <div className="flex items-center justify-between gap-2 mb-4 font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(cat.id)}
                        <span>{cat.categoryNumber}</span>
                      </div>
                    </div>

                    <h3 className="font-editorial-heading text-xl sm:text-2xl text-white uppercase mb-2 group-hover:text-neutral-200 transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-neutral-400 mb-8 font-light">
                      {cat.subtitle}
                    </p>

                    {/* Skill Pills Grid */}
                    <div className="flex flex-wrap gap-2.5">
                      {cat.skills.map((skill, sIdx) => {
                        const isHovered = hoveredSkill === skill.name;

                        return (
                          <div
                            key={sIdx}
                            onMouseEnter={() => {
                              setHoveredSkill(skill.name);
                              setCursor("link", skill.name);
                            }}
                            onMouseLeave={() => {
                              setHoveredSkill(null);
                              resetCursor();
                            }}
                            className={`flex items-center justify-between gap-3 px-3 py-2 border transition-all duration-300 rounded-none cursor-default ${
                              isHovered
                                ? "bg-white text-black border-white"
                                : "bg-white/[0.02] text-neutral-200 border-white/[0.08] hover:border-white/25"
                            }`}
                          >
                            <span className="font-mono text-xs font-medium uppercase tracking-wide">
                              {skill.name}
                            </span>
                            {skill.tag && (
                              <span
                                className={`font-mono text-[9px] tracking-wider uppercase ${
                                  isHovered ? "text-neutral-700" : "text-neutral-500"
                                }`}
                              >
                                {skill.tag}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Line */}
                  <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between font-mono text-[9px] text-neutral-500 tracking-wider uppercase">
                    <span>VERIFIED PROFICIENCY</span>
                    <span>PRODUCTION READY</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
