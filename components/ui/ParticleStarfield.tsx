"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
  hasGlow: boolean;
}

export default function ParticleStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Mouse tracking for subtle parallax
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Initialize Stars
    let stars: Star[] = [];
    const getStarCount = () => {
      if (width < 640) return 55;
      if (width < 1024) return 85;
      return 130;
    };

    const initStars = () => {
      const count = getStarCount();
      stars = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 1.6 + 0.4; // 0.4px to 2.0px
        const baseAlpha = Math.random() * 0.55 + 0.2; // 0.2 to 0.75 alpha
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseAlpha,
          alpha: baseAlpha,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinklePhase: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          hasGlow: size > 1.3 && Math.random() > 0.4,
        });
      }
    };

    initStars();

    // Render Loop
    let time = 0;
    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const mouseOffsetX = (mouseX / width - 0.5) * 15;
      const mouseOffsetY = (mouseY / height - 0.5) * 15;

      // Draw Constellation Hairlines (delicate, low opacity)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            const lineAlpha = (1 - dist / 70) * 0.08 * ((stars[i].alpha + stars[j].alpha) / 2);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x + mouseOffsetX * (stars[i].size * 0.3), stars[i].y + mouseOffsetY * (stars[i].size * 0.3));
            ctx.lineTo(stars[j].x + mouseOffsetX * (stars[j].size * 0.3), stars[j].y + mouseOffsetY * (stars[j].size * 0.3));
            ctx.stroke();
          }
        }
      }

      // Draw Individual Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          // Slow organic movement
          star.x += star.vx;
          star.y += star.vy;

          // Wrap edges
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;

          // Twinkle effect
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * (star.baseAlpha * 0.45);
        }

        const renderX = star.x + mouseOffsetX * (star.size * 0.5);
        const renderY = star.y + mouseOffsetY * (star.size * 0.5);

        // Optional subtle white halo glow for prominent stars
        if (star.hasGlow) {
          const glowGrad = ctx.createRadialGradient(
            renderX,
            renderY,
            0,
            renderX,
            renderY,
            star.size * 4
          );
          glowGrad.addColorStop(0, `rgba(255, 255, 255, ${star.alpha * 0.35})`);
          glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(renderX, renderY, star.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Star Core (Crisp White)
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, Math.min(1, star.alpha))})`;
        ctx.beginPath();
        ctx.arc(renderX, renderY, star.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.85 }}
    />
  );
}
