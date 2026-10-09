"use client";

import React from "react";
import { motion } from "framer-motion";
import { CURRENTLY_ITEMS } from "@/data/constants";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { Sparkles, ArrowRight } from "lucide-react";
import ScrambleText from "@/components/ui/ScrambleText";

export default function CurrentlySection() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative py-24 md:py-32 border-t border-white/[0.08] bg-[#070709]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-2">
              <Sparkles size={13} className="text-emerald-400" />
              <span>06</span>
            </div>
            <h2 className="font-editorial-heading text-3xl sm:text-4xl text-white uppercase tracking-tight">
              <ScrambleText text="CURRENTLY ENGAGED IN" duration={420} />
            </h2>
          </div>
        </div>

        {/* Horizontal Editorial Grid / Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CURRENTLY_ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setCursor("link", "EXPLORING")}
              onMouseLeave={resetCursor}
              className="p-5 bg-[#0b0b10] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between group rounded-sm"
            >
              <div className="font-mono text-[10px] text-neutral-500 mb-6 flex items-center justify-between">
                <span>0{idx + 1}</span>
                <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-white" />
              </div>

              <div>
                <p className="font-mono text-xs text-neutral-200 group-hover:text-white transition-colors leading-relaxed">
                  {item}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-white/[0.04] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] text-neutral-500 tracking-widest uppercase">
                  ACTIVE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
