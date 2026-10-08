"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { experiences } from "@/data/experience";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { Briefcase, Award, CheckCircle2, ChevronRight } from "lucide-react";

export default function ExperienceSection() {
  const { setCursor, resetCursor } = useCursor();
  const [activeTab, setActiveTab] = useState<string>(experiences[0].id);

  return (
    <section id="experience" className="relative py-28 md:py-36 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <SectionHeading
          number="03"
          category="HISTORY & TRACK RECORD"
          title="EXPERIENCE & LEADERSHIP"
          subtitle="Software engineering internships, leadership appointments, and competitive speaking distinctions."
        />

        {/* Editorial Timeline & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation / Index */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {experiences.map((exp, idx) => {
              const isSelected = activeTab === exp.id;
              const isEngineering = exp.type === "ENGINEERING";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onClick={() => setActiveTab(exp.id)}
                  onMouseEnter={() => setCursor("link", exp.organization)}
                  onMouseLeave={resetCursor}
                  className={`cursor-pointer p-6 sm:p-7 border transition-all duration-300 rounded-sm ${
                    isSelected
                      ? "bg-[#101017] border-white/25 shadow-lg shadow-black/50"
                      : "bg-[#09090d] border-white/[0.07] hover:border-white/15 hover:bg-[#0c0c11]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px] tracking-[0.2em] text-neutral-400 uppercase">
                    <span className="flex items-center gap-1.5">
                      {isEngineering ? (
                        <Briefcase size={12} className="text-sky-400" />
                      ) : (
                        <Award size={12} className="text-amber-400" />
                      )}
                      {exp.type}
                    </span>
                    <span>{exp.period}</span>
                  </div>

                  <h3 className="font-editorial-heading text-xl sm:text-2xl text-white uppercase mb-1">
                    {exp.organization}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-400 font-mono">
                    {exp.role}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-500">
                    <span>{exp.location}</span>
                    <ChevronRight
                      size={14}
                      className={`transition-transform duration-300 ${
                        isSelected ? "translate-x-1 text-white" : ""
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Detail Case */}
          <div className="lg:col-span-7">
            {experiences
              .filter((e) => e.id === activeTab)
              .map((activeExp) => (
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="p-8 sm:p-10 bg-[#0c0c12] border border-white/[0.1] rounded-sm space-y-8"
                >
                  {/* Header */}
                  <div>
                    <div className="font-mono text-[11px] tracking-widest text-emerald-400 uppercase mb-2">
                      {activeExp.period}
                    </div>

                    <h3 className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl text-white uppercase mb-2">
                      {activeExp.role}
                    </h3>
                    <p className="font-mono text-sm text-neutral-300">
                      {activeExp.organization} — {activeExp.location}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                    {activeExp.description}
                  </p>

                  {/* Highlights / Responsibilities */}
                  <div className="space-y-3">
                    <div className="font-mono text-xs tracking-widest text-neutral-400 uppercase">
                      KEY CONTRIBUTIONS & IMPACT
                    </div>
                    {activeExp.bullets.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed"
                      >
                        <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack / Competencies */}
                  <div className="pt-6 border-t border-white/[0.08]">
                    <div className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase mb-3">
                      DOMAIN COMPETENCIES & TOOLING
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeExp.technologies.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-mono text-[11px] tracking-wider px-3 py-1.5 bg-white/[0.04] border border-white/10 text-neutral-200 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
