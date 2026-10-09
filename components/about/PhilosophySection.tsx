"use client";

import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PhilosophySection() {
  return (
    <section id="about" className="relative py-32 md:py-44 border-t border-white/[0.08] overflow-hidden">
      {/* Editorial Decorative Watermark */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 font-editorial-heading text-[12vw] text-white/[0.015] pointer-events-none select-none uppercase tracking-tighter">
        ENGINEERING
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <SectionHeading
          number="05"
          category="PERSPECTIVE & CORE ETHOS"
          title="PHILOSOPHY"
          subtitle="How I think about systems architecture, clean abstractions, and applied intelligence."
        />

        {/* Large Typography Statement */}
        <div className="max-w-5xl">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-editorial-heading text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] text-white uppercase tracking-tight leading-[1.02] mb-12"
          >
            I&apos;M INTERESTED IN THE SPACE WHERE{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">
              ENGINEERING MEETS INTELLIGENCE.
            </span>
          </motion.blockquote>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/[0.08]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-4 font-mono text-xs text-neutral-400 tracking-widest uppercase"
            >
              THE APPROACH
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-8 space-y-6 text-base sm:text-lg text-neutral-300 font-light leading-relaxed"
            >
              <p>
                I enjoy turning complex technical problems into simple, useful products — from
                full-stack systems and developer tools to AI-powered applications.
              </p>
              <p className="text-neutral-400 text-sm sm:text-base">
                Whether formulating low-latency REST endpoints, training custom neural vision
                classifiers, or fine-tuning transformer weights, I prioritize rigorous algorithmic
                soundness, clean modular component hierarchies, and measurable performance.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
