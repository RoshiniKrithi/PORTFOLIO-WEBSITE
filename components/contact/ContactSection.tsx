"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/data/constants";
import { useCursor } from "@/components/ui/CustomCursorContext";
import MagneticButton from "@/components/ui/MagneticButton";
import { Copy, Check, ArrowUpRight, Mail } from "lucide-react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setCursor("copied", "COPIED ✓");
    setTimeout(() => {
      setCopied(false);
      resetCursor();
    }, 2500);
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-t from-white/[0.03] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header Metadata */}
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-8">
          <span className="text-white/40">07</span>
          <span className="w-4 h-[1px] bg-white/20" />
          <span>START A DIALOGUE</span>
        </div>

        {/* Huge Headline */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h2 className="font-editorial-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] uppercase text-white tracking-[-0.03em] leading-[0.92]">
            <span className="block">LET&apos;S BUILD</span>
            <span className="block text-white/90">SOMETHING</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              INTERESTING.
            </span>
          </h2>
        </motion.div>

        {/* Supporting text & Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-8 border-t border-white/[0.08]">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-xl">
              Open to full-stack engineering roles, AI/ML initiatives, high-impact collaborations,
              and technical conversations.
            </p>

            {/* Email Copy Card */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <div
                onClick={handleCopyEmail}
                onMouseEnter={() => setCursor("copy", copied ? "COPIED" : "CLICK TO COPY")}
                onMouseLeave={resetCursor}
                className="cursor-pointer group flex items-center gap-3 px-5 py-3.5 bg-[#0f0f15] border border-white/10 hover:border-white/30 rounded-sm transition-all duration-300 select-none"
              >
                <Mail size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
                <span className="font-mono text-xs sm:text-sm text-white tracking-wider">
                  {PERSONAL_INFO.email}
                </span>
                <span className="ml-2 pl-3 border-l border-white/10 text-neutral-400 group-hover:text-white transition-colors">
                  {copied ? (
                    <Check size={14} className="text-emerald-400" />
                  ) : (
                    <Copy size={14} />
                  )}
                </span>
              </div>

              <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                {copied ? "COPIED TO CLIPBOARD ✓" : "CLICK TO COPY EMAIL"}
              </span>
            </div>
          </div>

          {/* Direct CTA Buttons & Social Links */}
          <div className="lg:col-span-5 flex flex-col gap-4 lg:items-end">
            <MagneticButton
              href={`mailto:${PERSONAL_INFO.email}`}
              variant="primary"
              cursorText="MAIL"
              cursorVariant="link"
              className="w-full sm:w-auto"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={14} />
            </MagneticButton>

            <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs text-neutral-400">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor("link", "GITHUB")}
                onMouseLeave={resetCursor}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>GITHUB</span>
                <ArrowUpRight size={12} />
              </a>
              <span className="text-white/20">/</span>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor("link", "LINKEDIN")}
                onMouseLeave={resetCursor}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight size={12} />
              </a>
              <span className="text-white/20">/</span>
              <a
                href={SOCIAL_LINKS.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursor("link", "LEETCODE")}
                onMouseLeave={resetCursor}
                className="hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <span>LEETCODE</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
