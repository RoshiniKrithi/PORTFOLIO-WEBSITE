"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/data/projects";
import { Eye, Cpu } from "lucide-react";

interface ProjectVisualPreviewProps {
  project: Project;
  isHovered: boolean;
  isXRayActive?: boolean;
}

export default function ProjectVisualPreview({
  project,
  isHovered,
  isXRayActive = false,
}: ProjectVisualPreviewProps) {
  const [videoError, setVideoError] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [localXRay, setLocalXRay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const xRayMode = isXRayActive || localXRay;

  useEffect(() => {
    if (videoRef.current && isVideoLoaded) {
      if (isHovered && !xRayMode) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, isVideoLoaded, xRayMode]);

  // Generative Canvas Visual & X-Ray Blueprint Simulation
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.025;
      const width = (canvas.width = canvas.offsetWidth);
      const height = (canvas.height = canvas.offsetHeight);

      ctx.clearRect(0, 0, width, height);

      // --- X-RAY / WIREFRAME BLUEPRINT MODE ---
      if (xRayMode) {
        // Deep Blueprint Navy Background
        ctx.fillStyle = "#040914";
        ctx.fillRect(0, 0, width, height);

        // High-precision Blueprint Grid
        ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
        ctx.lineWidth = 1;
        const gridSize = 24;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Isometric Architecture Wireframe Boxes
        const cx = width * 0.5;
        const cy = height * 0.5;
        const boxSize = Math.min(width, height) * 0.32;

        // Draw 3-layer neural architecture stack / pipeline
        for (let l = -1; l <= 1; l++) {
          const layerY = cy + l * 42;
          const pulse = Math.sin(time * 3 + l) * 0.2 + 0.8;
          ctx.strokeStyle = `rgba(0, 255, 170, ${0.5 * pulse})`;
          ctx.lineWidth = 1.5;

          // Isometric rhomboid
          ctx.beginPath();
          ctx.moveTo(cx, layerY - 24);
          ctx.lineTo(cx + boxSize, layerY);
          ctx.lineTo(cx, layerY + 24);
          ctx.lineTo(cx - boxSize, layerY);
          ctx.closePath();
          ctx.stroke();

          // Fill tint
          ctx.fillStyle = `rgba(0, 240, 255, 0.04)`;
          ctx.fill();

          // Connect vertical edges
          if (l < 1) {
            const nextY = cy + (l + 1) * 42;
            ctx.strokeStyle = "rgba(0, 240, 255, 0.35)";
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(cx - boxSize, layerY);
            ctx.lineTo(cx - boxSize, nextY);
            ctx.moveTo(cx + boxSize, layerY);
            ctx.lineTo(cx + boxSize, nextY);
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }

        // Scanning Laser Sweep in X-Ray
        const laserY = (Math.sin(time * 1.5) * 0.5 + 0.5) * height;
        const laserGrad = ctx.createLinearGradient(0, laserY - 15, 0, laserY + 15);
        laserGrad.addColorStop(0, "rgba(0, 255, 200, 0)");
        laserGrad.addColorStop(0.5, "rgba(0, 255, 200, 0.6)");
        laserGrad.addColorStop(1, "rgba(0, 255, 200, 0)");
        ctx.fillStyle = laserGrad;
        ctx.fillRect(0, laserY - 15, width, 30);

        // Technical HUD Telemetry
        ctx.font = "10px monospace";
        ctx.fillStyle = "#00ffaa";
        ctx.fillText("X-RAY ARCHITECTURE BLUEPRINT // SCHEMATIC ACTIVE", 20, 28);
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`TOPOLOGY: RESIDUAL_DENSE_NET [FP16] // TENSOR_SHAPE: [38, 512, 512]`, 20, 46);
        ctx.fillStyle = "#67e8f9";
        ctx.fillText(`PIPELINE_HASH: 0x9F2E78A // LATENCY_PROFILER: REALTIME`, 20, height - 20);

      } else {
        // --- STANDARD SIMULATION MODE ---
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, "#0b0b10");
        bgGrad.addColorStop(1, "#121219");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        if (project.id === "leaf-disease") {
          ctx.strokeStyle = "rgba(16, 185, 129, 0.12)";
          ctx.lineWidth = 1;
          for (let x = 0; x < width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
          }
          for (let y = 0; y < height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }

          const scanY = (Math.sin(time) * 0.5 + 0.5) * height;
          const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
          scanGrad.addColorStop(0, "rgba(16, 185, 129, 0)");
          scanGrad.addColorStop(0.5, "rgba(16, 185, 129, 0.45)");
          scanGrad.addColorStop(1, "rgba(16, 185, 129, 0)");
          ctx.fillStyle = scanGrad;
          ctx.fillRect(0, scanY - 30, width, 60);

          const boxX = width * 0.25;
          const boxY = height * 0.2;
          const boxW = width * 0.5;
          const boxH = height * 0.6;
          ctx.strokeStyle = "rgba(16, 185, 129, 0.7)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(boxX, boxY, boxW, boxH);

          const tick = 12;
          ctx.fillStyle = "#10b981";
          ctx.fillRect(boxX - 2, boxY - 2, tick, 3);
          ctx.fillRect(boxX - 2, boxY - 2, 3, tick);
          ctx.fillRect(boxX + boxW - tick + 2, boxY - 2, tick, 3);
          ctx.fillRect(boxX + boxW - 1, boxY - 2, 3, tick);

          ctx.font = "10px monospace";
          ctx.fillStyle = "#10b981";
          ctx.fillText("MODEL: MobileNetV2 // INFERENCE: 78ms", boxX, boxY - 10);
          ctx.fillStyle = "#e5e5e5";
          ctx.fillText("TARGET: Solanum lycopersicum", boxX + 10, boxY + 24);
          ctx.fillStyle = "#10b981";
          ctx.fillText("DIAGNOSIS: Early Blight (97.4% CONF)", boxX + 10, boxY + 42);
          ctx.fillStyle = "#9ca3af";
          ctx.fillText("STATUS: ISOLATION RECOMMENDED", boxX + 10, boxY + boxH - 14);

        } else if (project.id === "code-arena") {
          ctx.strokeStyle = "rgba(56, 189, 248, 0.15)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let x = 0; x < width; x += 5) {
            const y =
              height * 0.5 +
              Math.sin(x * 0.02 + time * 2) * 25 +
              Math.cos(x * 0.05 + time) * 15;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
          ctx.stroke();

          ctx.font = "11px monospace";
          ctx.fillStyle = "#38bdf8";
          ctx.fillText("● CONTEST AGGREGATOR // LIVE SYNC ACTIVE", 24, 35);
          ctx.fillStyle = "#e2e8f0";
          ctx.fillText("→ CODEFORCES DIV. 2 : 01h 42m 18s REMAINING", 24, 65);
          ctx.fillText("→ LEETCODE WEEKLY 418 : OPEN FOR REGISTRATION", 24, 88);
          ctx.fillText("→ CODECHEF STARTERS : RATING SYNCED (+48 PTS)", 24, 111);
          ctx.fillStyle = "#64748b";
          ctx.fillText("POSTGRESQL QUERY LATENCY: 9.4ms // WEBSOCKETS: 6/6", 24, height - 24);

        } else if (project.id === "eloria-luxe") {
          const cx = width * 0.5;
          const cy = height * 0.5;
          const points = 8;
          const radius = Math.min(width, height) * 0.28;
          ctx.strokeStyle = "rgba(251, 191, 36, 0.45)";
          ctx.lineWidth = 1.2;

          for (let i = 0; i < points; i++) {
            const angle = (i / points) * Math.PI * 2 + time * 0.5;
            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * (radius * 0.6);

            ctx.beginPath();
            ctx.moveTo(cx, cy - radius);
            ctx.lineTo(x, y);
            ctx.lineTo(cx, cy + radius);
            ctx.stroke();
          }

          ctx.font = "11px monospace";
          ctx.fillStyle = "#fbbf24";
          ctx.fillText("ELORIA LUXE // HAUTE COUTURE ENGINE", 24, 35);
          ctx.fillStyle = "#d4d4d8";
          ctx.fillText("AI ENSEMBLE RECOMMENDATIONS ACTIVE", 24, height - 42);
          ctx.fillStyle = "#71717a";
          ctx.fillText("RAZORPAY GATEWAY ENCRYPTED (HMAC-SHA256)", 24, height - 24);

        } else {
          const cx = width * 0.5;
          const cy = height * 0.5;
          const nodes = 7;
          const nodeRadius = Math.min(width, height) * 0.32;

          for (let i = 0; i < nodes; i++) {
            const a1 = (i / nodes) * Math.PI * 2 + time * 0.3;
            const x1 = cx + Math.cos(a1) * nodeRadius;
            const y1 = cy + Math.sin(a1) * nodeRadius;

            for (let j = i + 1; j < nodes; j++) {
              const a2 = (j / nodes) * Math.PI * 2 + time * 0.3;
              const x2 = cx + Math.cos(a2) * nodeRadius;
              const y2 = cy + Math.sin(a2) * nodeRadius;

              const distAlpha = Math.sin(time * 2 + i + j) * 0.25 + 0.25;
              ctx.strokeStyle = `rgba(168, 85, 247, ${distAlpha})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x1, y1);
              ctx.lineTo(x2, y2);
              ctx.stroke();
            }

            ctx.fillStyle = "#a855f7";
            ctx.beginPath();
            ctx.arc(x1, y1, 4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.font = "11px monospace";
          ctx.fillStyle = "#c084fc";
          ctx.fillText("AURA GPT // TRANSFORMER DECODER", 24, 35);
          ctx.fillStyle = "#e9d5ff";
          ctx.fillText("MULTI-HEAD ATTENTION × 32K BPE TOKENS", 24, 58);
          ctx.fillStyle = "#7e22ce";
          ctx.fillText("RAG LATENCY: 92ms // LoRA r=16 PEFT ACTIVE", 24, height - 24);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [project.id, xRayMode]);

  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] md:min-h-[360px] bg-[#0c0c11] overflow-hidden rounded-sm border border-white/[0.06] group/preview">
      {/* Image Preview if provided */}
      {project.imageSrc && !xRayMode ? (
        <img
          src={project.imageSrc}
          alt={project.title}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      ) : null}

      {/* Video preview with fallback to Canvas */}
      {project.videoSrc && !videoError && !project.imageSrc && !xRayMode ? (
        <video
          ref={videoRef}
          src={project.videoSrc}
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setIsVideoLoaded(true)}
          onError={() => setVideoError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      ) : null}

      {/* Generative Interactive Canvas Fallback & X-Ray Blueprint */}
      {(!project.imageSrc || xRayMode) && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
      )}

      {/* Subtle Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-black/30 pointer-events-none" />

      {/* Top Status Bar & X-Ray Mode Quick Trigger */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-none border border-white/10 bg-black/70 backdrop-blur-md font-mono text-[9px] tracking-widest text-neutral-300 uppercase">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: xRayMode ? "#00ffaa" : project.accentColor || "#ffffff" }}
          />
          {xRayMode ? "X-RAY BLUEPRINT ACTIVE" : project.status}
        </span>

        {/* X-Ray Hover / Hold Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLocalXRay(!localXRay);
          }}
          onMouseEnter={(e) => {
            e.stopPropagation();
            setLocalXRay(true);
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            setLocalXRay(false);
          }}
          className={`px-2.5 py-1 border transition-all duration-300 font-mono text-[9px] tracking-widest uppercase flex items-center gap-1.5 backdrop-blur-md ${
            xRayMode
              ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
              : "bg-black/60 border-white/15 text-neutral-400 hover:text-white hover:border-white/30"
          }`}
        >
          <Cpu size={11} className={xRayMode ? "text-cyan-300 animate-spin" : ""} />
          <span>{xRayMode ? "X-RAY ON" : "HOLD FOR X-RAY"}</span>
        </button>
      </div>

      {/* Bottom Quick Stats */}
      {project.stats && (
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 overflow-x-auto pointer-events-none z-10">
          {project.stats.slice(0, 2).map((st, sIdx) => (
            <div
              key={sIdx}
              className="bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/10 text-[10px] font-mono flex items-center gap-1.5"
            >
              <span className="text-neutral-400">{st.label}:</span>
              <span className="text-white font-medium">{st.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
