"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function ShaderTextHeading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [fluidTime, setFluidTime] = useState(0);

  // Mouse coordinate interpolation
  const mouseRef = useRef({
    targetX: 50,
    targetY: 50,
    currentX: 50,
    currentY: 50,
    hoverStrength: 0,
    targetHover: 0,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    mouseRef.current.targetX = x;
    mouseRef.current.targetY = y;
    mouseRef.current.targetHover = 1.0;
    setMousePos({ x, y });
    setIsHovered(true);
  }, []);

  const handleMouseEnter = useCallback(() => {
    mouseRef.current.targetHover = 1.0;
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.targetHover = 0.0;
    setIsHovered(false);
  }, []);

  // 60fps Fluid Noise Loop & Vector Motion
  useEffect(() => {
    let animationFrameId: number;
    let startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = (now - startTime) * 0.001;
      setFluidTime(elapsed);

      // Lerp mouse coordinates
      const m = mouseRef.current;
      m.currentX += (m.targetX - m.currentX) * 0.08;
      m.currentY += (m.targetY - m.currentY) * 0.08;
      m.hoverStrength += (m.targetHover - m.hoverStrength) * 0.06;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Calculate dynamic liquid gradient angles based on time and mouse
  const gradAngle = (fluidTime * 25) % 360;
  const mx = mouseRef.current.currentX;
  const my = mouseRef.current.currentY;
  const hover = mouseRef.current.hoverStrength;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full select-none cursor-default mb-10 py-1 group"
    >
      {/* 
        ========================================================================
        1. Typographic Mask Setup (CSS Canvas Mapping)
        Uses background-clip: text with dynamic multi-stop cosmic lava fluid
        (Deep Burgundy #4a0e17, Charcoal #111111, High-Contrast White #ffffff,
        and Vibrant Glowing Red #ff1a40 on cursor interaction)
        ========================================================================
      */}
      <div className="relative font-editorial-heading text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem] xl:text-[6.5rem] tracking-[-0.035em] uppercase leading-[0.92]">
        {/* Line 1: I BUILD */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="block relative"
        >
          <span
            className="block text-transparent bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(400px circle at ${mx}% ${my}%, #ff1a40 0%, #4a0e17 ${25 + hover * 20}%, #ffffff ${65 + Math.sin(fluidTime * 1.5) * 15}%, #111111 100%), linear-gradient(${gradAngle}deg, #ffffff 0%, #4a0e17 40%, #ff1a40 70%, #ffffff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${hover * 25}px rgba(255, 26, 64, ${0.4 * hover}))`,
            }}
          >
            I BUILD
          </span>
        </motion.div>

        {/* Line 2: DIGITAL SYSTEMS */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="block relative"
        >
          <span
            className="block text-transparent bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(450px circle at ${mx}% ${my}%, #ff2a4d 0%, #4a0e17 ${30 + hover * 25}%, #ffffff ${70 + Math.cos(fluidTime * 1.8) * 15}%, #111111 100%), linear-gradient(${gradAngle + 90}deg, #ffffff 10%, #4a0e17 45%, #ff2a4d 75%, #ffffff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${hover * 25}px rgba(255, 26, 64, ${0.4 * hover}))`,
            }}
          >
            DIGITAL SYSTEMS
          </span>
        </motion.div>

        {/* Line 3: AT THE INTERSECTION */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.29, ease: [0.16, 1, 0.3, 1] }}
          className="block relative"
        >
          <span
            className="block text-transparent bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(450px circle at ${mx}% ${my}%, #ff1a40 0%, #4a0e17 ${28 + hover * 20}%, #ffffff ${68 + Math.sin(fluidTime * 2.0) * 12}%, #111111 100%), linear-gradient(${gradAngle + 180}deg, #ffffff 0%, #ff1a40 35%, #4a0e17 65%, #ffffff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${hover * 25}px rgba(255, 26, 64, ${0.4 * hover}))`,
            }}
          >
            AT THE INTERSECTION
          </span>
        </motion.div>

        {/* Line 4: OF SOFTWARE & AI. */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="block relative"
        >
          <span
            className="block text-transparent bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `radial-gradient(500px circle at ${mx}% ${my}%, #ff1a40 0%, #ff2a4d 20%, #4a0e17 ${40 + hover * 25}%, #ffffff ${75 + Math.cos(fluidTime * 1.4) * 15}%, #111111 100%), linear-gradient(${gradAngle + 270}deg, #ffffff 0%, #4a0e17 30%, #ff1a40 60%, #ffffff 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: `drop-shadow(0 0 ${hover * 30}px rgba(255, 26, 64, ${0.5 * hover}))`,
            }}
          >
            OF SOFTWARE &amp; AI.
          </span>
        </motion.div>
      </div>

      {/* 
        Interactive Kinetic Ambient Light Ripple
        Emits a radiant cosmic aura directly at the pointer coordinates
      */}
      <div
        className="pointer-events-none absolute inset-0 z-20 mix-blend-screen transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.6 : 0.15,
          background: `radial-gradient(380px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 26, 64, 0.38) 0%, rgba(74, 14, 23, 0.22) 40%, transparent 70%)`,
        }}
      />

      {/* Semantic Accessible Heading for SEO & Screen Readers */}
      <h1 className="sr-only">
        I BUILD DIGITAL SYSTEMS AT THE INTERSECTION OF SOFTWARE & AI. — A Roshini Krithi
      </h1>
    </div>
  );
}
