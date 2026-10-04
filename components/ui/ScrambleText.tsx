"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "framer-motion";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number; // duration in ms
  triggerOnHover?: boolean;
  onComplete?: () => void;
}

const GLYPHS = "█▓░$#&%<>[]{}+*~=_/\\|";

export default function ScrambleText({
  text,
  className = "",
  duration = 450,
  triggerOnHover = true,
  onComplete,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const hasAnimatedRef = useRef(false);

  const startScramble = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const length = text.length;
    const fps = 30;
    const totalFrames = Math.max(12, Math.floor((duration / 1000) * fps));
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        if (text[i] === " " || text[i] === "\n") {
          scrambled += text[i];
        } else if (i < revealedCount) {
          scrambled += text[i];
        } else if (i < revealedCount + 4) {
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          scrambled += GLYPHS[Math.floor(Math.random() * 5)];
        }
      }

      setDisplayText(scrambled);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
        if (onComplete) onComplete();
      }
    }, 1000 / fps);
  }, [text, duration, isScrambling, onComplete]);

  useEffect(() => {
    if (isInView && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;
      startScramble();
    }
  }, [isInView, startScramble]);

  const handleMouseEnter = () => {
    if (triggerOnHover && !isScrambling) {
      startScramble();
    }
  };

  return (
    <span
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none cursor-default font-editorial-heading transition-colors ${className}`}
    >
      {displayText}
    </span>
  );
}
