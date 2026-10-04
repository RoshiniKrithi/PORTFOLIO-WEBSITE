"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ScrambleText from "./ScrambleText";
import LaserDivider from "./LaserDivider";

interface SectionHeadingProps {
  number: string;
  category: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export default function SectionHeading({
  number,
  category,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const containerRef = useRef<HTMLDivElement>(null);

  // Variable Font Weight Morph on Scroll Viewport Proximity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center", "end start"],
  });

  // Smooth spring interpolation for font-weight (300 -> 800 -> 400)
  const rawFontWeight = useTransform(
    scrollYProgress,
    [0, 0.45, 0.55, 1],
    [300, 800, 800, 400]
  );
  const smoothFontWeight = useSpring(rawFontWeight, {
    stiffness: 280,
    damping: 30,
  });

  // Subtle letter-spacing morph (-0.01em -> -0.04em)
  const rawLetterSpacing = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-0.01em", "-0.04em", "-0.02em"]
  );

  return (
    <div
      ref={containerRef}
      className={`mb-16 md:mb-24 ${isCenter ? "text-center mx-auto" : ""} ${className}`}
    >
      {/* Category / Number Metadata */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] text-neutral-400 uppercase mb-4 ${
          isCenter ? "justify-center" : ""
        }`}
      >
        <span className="text-white/40">{number}</span>
        <span className="w-4 h-[1px] bg-white/20" />
        <span>{category}</span>
      </motion.div>

      {/* Main Editorial Title with Variable Weight Morph & Character Decryption */}
      <motion.h2
        style={{
          fontWeight: smoothFontWeight,
          letterSpacing: rawLetterSpacing,
        }}
        className="font-editorial-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-[1.02]"
      >
        <ScrambleText text={title} duration={480} triggerOnHover={true} />
      </motion.h2>

      {/* Optional Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl leading-relaxed font-normal ${
            isCenter ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Editorial Laser Line Wipe Transition */}
      <LaserDivider delay={0.2} className="mt-8" />
    </div>
  );
}
