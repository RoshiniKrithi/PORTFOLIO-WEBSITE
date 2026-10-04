"use client";

import React from "react";
import { PERSONAL_INFO } from "@/data/constants";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 border-t border-white/[0.08] bg-[#060608]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        {/* Left Monogram */}
        <div>
          <div className="font-editorial-heading text-lg text-white uppercase tracking-tight">
            {PERSONAL_INFO.name}
          </div>
          <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-[0.2em] mt-1">
            COMPUTER SCIENCE × SOFTWARE × AI
          </p>
        </div>

        {/* Center / Right Copyright & Back to Top */}
        <div className="flex items-center gap-8 text-right font-mono text-[11px] text-neutral-500">
          <div>
            <span>© 2026 {PERSONAL_INFO.name}</span>
            <span className="block text-[9px] text-neutral-600 uppercase tracking-widest mt-0.5">
              BUILT WITH NEXT.JS & FRAMER MOTION
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            onMouseEnter={() => setCursor("link", "TOP")}
            onMouseLeave={resetCursor}
            aria-label="Back to top"
            className="group flex items-center justify-center w-10 h-10 border border-white/10 bg-white/[0.02] hover:bg-white/10 hover:border-white/30 rounded-sm transition-all duration-300 text-neutral-300 hover:text-white"
          >
            <ArrowUp
              size={14}
              className="group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
