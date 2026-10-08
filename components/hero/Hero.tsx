"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { useCursor } from "@/components/ui/CustomCursorContext";
import ShaderTextHeading from "./ShaderTextHeading";

export default function Hero() {
  const { setCursor, resetCursor } = useCursor();

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
      {/* Decorative Subtle Background Crosshairs */}
      <div className="absolute top-24 left-6 sm:left-10 lg:left-16 text-white/10 font-mono text-xs select-none">
        +
      </div>
      <div className="absolute top-24 right-6 sm:right-10 lg:right-16 text-white/10 font-mono text-xs select-none">
        +
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 relative z-10 flex-1 flex flex-col justify-center">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 font-mono text-[10px] tracking-[0.2em] text-emerald-400 uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{PERSONAL_INFO.availability}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[10px] tracking-[0.25em] text-neutral-400 uppercase"
          >
            {PERSONAL_INFO.subTagline}
          </motion.div>
        </div>

        {/* Visual Shader Path Text Headline */}
        <ShaderTextHeading />

        {/* Bio & Editorial Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 xl:col-span-6"
          >
            <p className="text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              I&apos;m <span className="text-white font-medium">{PERSONAL_INFO.name}</span> — a
              Computer Science undergraduate focused on{" "}
              <span className="text-neutral-100">Full-Stack Engineering</span>,{" "}
              <span className="text-neutral-100">Artificial Intelligence</span>, and building
              products that solve meaningful problems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-6 flex flex-col gap-2 font-mono text-[11px] text-neutral-400 tracking-wider lg:items-end"
          >
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">CORE FOCUS:</span>
              <span className="text-neutral-200">Full-Stack × Applied AI × Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">LOCATION:</span>
              <span className="text-neutral-200">{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">EXPERTISE:</span>
              <span className="text-neutral-200">React, PyTorch, Node.js, DSA</span>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-white/[0.08]"
        >
          <MagneticButton
            href="#work"
            variant="primary"
            cursorText="EXPLORE"
            cursorVariant="view"
          >
            <span>VIEW WORK</span>
            <span className="text-xs">↓</span>
          </MagneticButton>

          <MagneticButton
            href={PERSONAL_INFO.resumePath}
            download="roshini-krithi-resume.pdf"
            variant="outline"
            cursorText="PDF"
            cursorVariant="link"
          >
            <FileDown size={14} className="opacity-70" />
            <span>DOWNLOAD RESUME</span>
          </MagneticButton>

          <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
            <MagneticButton
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              variant="ghost"
              cursorText="LINKEDIN"
              cursorVariant="link"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight size={12} />
            </MagneticButton>

            <MagneticButton
              href={SOCIAL_LINKS.github}
              target="_blank"
              variant="ghost"
              cursorText="GITHUB"
              cursorVariant="link"
            >
              <span>GITHUB</span>
              <ArrowUpRight size={12} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pt-12 flex items-center justify-between">
        <motion.a
          href="#metrics"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          onMouseEnter={() => setCursor("link", "SCROLL")}
          onMouseLeave={resetCursor}
          className="group flex items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-neutral-500 hover:text-neutral-300 uppercase transition-colors"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown
            size={12}
            className="group-hover:translate-y-1 transition-transform duration-300"
          />
        </motion.a>

      </div>
    </section>
  );
}
