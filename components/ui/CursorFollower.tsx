"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useCursor } from "./CustomCursorContext";

export default function CursorFollower() {
  const { cursorVariant, cursorText } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case "view":
        return {
          width: 72,
          height: 72,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          color: "#08080a",
          border: "none",
          scale: 1,
        };
      case "link":
        return {
          width: 44,
          height: 44,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          scale: 1,
        };
      case "copy":
      case "copied":
        return {
          width: 80,
          height: 80,
          backgroundColor: cursorVariant === "copied" ? "#10b981" : "rgba(255, 255, 255, 0.95)",
          color: cursorVariant === "copied" ? "#ffffff" : "#08080a",
          border: "none",
          scale: 1,
        };
      case "close":
        return {
          width: 54,
          height: 54,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "#08080a",
          border: "none",
          scale: 1,
        };
      case "expand":
        return {
          width: 60,
          height: 60,
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.6)",
          scale: 1.1,
        };
      default:
        return {
          width: 12,
          height: 12,
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          border: "none",
          scale: 1,
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      <motion.div
        className="pointer-events-none fixed top-0 left-0 flex items-center justify-center rounded-full text-center select-none shadow-2xl"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: styles.width,
          height: styles.height,
          backgroundColor: styles.backgroundColor,
          scale: styles.scale,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 300,
        }}
      >
        {cursorText && (
          <span className="pointer-events-none font-mono text-[10px] font-bold tracking-widest uppercase px-1 text-black select-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
