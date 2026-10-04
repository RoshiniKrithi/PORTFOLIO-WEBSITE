"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LaserDividerProps {
  className?: string;
  delay?: number;
}

export default function LaserDivider({ className = "", delay = 0.15 }: LaserDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className={`relative w-full h-[1px] my-8 overflow-hidden ${className}`}>
      {/* Background Dim Base Line */}
      <div className="absolute inset-0 bg-white/[0.08]" />

      {/* Laser Pulse Shoot Transition */}
      {isInView && (
        <motion.div
          initial={{ left: "-15%", width: "15%" }}
          animate={{ left: "115%", width: "25%" }}
          transition={{
            duration: 0.85,
            delay: delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-[-1px] bottom-[-1px] bg-gradient-to-r from-transparent via-white to-cyan-300 pointer-events-none"
          style={{
            boxShadow: "0 0 14px 2px rgba(255, 255, 255, 0.9), 0 0 28px 4px rgba(56, 189, 248, 0.6)",
          }}
        />
      )}

      {/* Permanent Subtly Animated Ambient Gradient */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
        className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent"
      />
    </div>
  );
}
