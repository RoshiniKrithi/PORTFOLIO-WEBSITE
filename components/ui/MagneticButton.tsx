"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "./CustomCursorContext";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  cursorText?: string;
  cursorVariant?: "link" | "view" | "copy" | "expand";
  download?: boolean | string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  variant = "primary",
  cursorText,
  cursorVariant = "link",
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { setCursor, resetCursor } = useCursor();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.22, y: middleY * 0.22 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  const handleMouseEnter = () => {
    if (cursorText || cursorVariant) {
      setCursor(cursorVariant, cursorText);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-white text-black hover:bg-neutral-200 border border-white font-medium shadow-[0_0_20px_rgba(255,255,255,0.12)]";
      case "secondary":
        return "bg-[#121217] text-white hover:bg-[#1a1a24] border border-white/10 hover:border-white/25";
      case "outline":
        return "bg-transparent text-white hover:text-white border border-white/20 hover:border-white/60 backdrop-blur-sm";
      case "ghost":
        return "bg-transparent text-neutral-300 hover:text-white border-transparent hover:bg-white/[0.04]";
      default:
        return "bg-white text-black";
    }
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.2 }}
      className="inline-block"
    >
      <div
        className={`relative inline-flex items-center justify-center px-6 py-3.5 text-xs font-mono uppercase tracking-[0.18em] transition-all duration-300 rounded-sm overflow-hidden group ${getVariantClasses()} ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {/* Subtle shine effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel || (target === "_blank" ? "noopener noreferrer" : undefined)}
        download={download}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block bg-transparent p-0 border-0">
      {content}
    </button>
  );
}
