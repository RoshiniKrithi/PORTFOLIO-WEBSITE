"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { metricsData, MetricCardData } from "@/data/metrics";
import { useCursor } from "@/components/ui/CustomCursorContext";
import { Trophy, Flame, Code2, Zap, TrendingUp, BarChart3, Activity } from "lucide-react";

export default function MetricsSection() {
  const { setCursor, resetCursor } = useCursor();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [metricMode, setMetricMode] = useState<"RATINGS" | "TELEMETRY">("RATINGS");

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "LEETCODE":
        return <Trophy size={16} className="text-amber-400" />;
      case "CODEFORCES":
        return <Code2 size={16} className="text-sky-400" />;
      case "CODECHEF":
        return <Flame size={16} className="text-purple-400" />;
      case "MILESTONES":
        return <Zap size={16} className="text-emerald-400" />;
      default:
        return <Activity size={16} />;
    }
  };

  // Generate SVG Sparkline Path
  const generateSparklinePath = (points: number[], width = 200, height = 40) => {
    if (!points || points.length < 2) return "";
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;

    return points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 8) - 4;
        return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <section id="metrics" className="relative py-28 md:py-36 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
          <SectionHeading
            number="01"
            category="COMPETITIVE PROGRAMMING & DISCIPLINE"
            title="ENGINEERING BY THE NUMBERS"
            subtitle="A snapshot of consistency, competitive programming, and problem-solving discipline across global competitive judges."
            className="mb-0 md:mb-0"
          />

          {/* 
            ====================================================================
            Tactile Metrics Mode Sliding Toggle Switch
            Allows instant toggling between Ratings Overview & Deep Telemetry
            ====================================================================
          */}
          <div className="flex items-center p-1 bg-[#101016] border border-white/10 rounded-full shrink-0 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setMetricMode("RATINGS")}
              className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors rounded-full ${metricMode === "RATINGS" ? "text-black font-bold" : "text-neutral-400 hover:text-white"
                }`}
            >
              {metricMode === "RATINGS" && (
                <motion.div
                  layoutId="metric-mode-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-lg"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <BarChart3 size={13} />
                OVERVIEW &amp; RATINGS
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMetricMode("TELEMETRY")}
              className={`relative px-4 py-2 text-xs font-mono tracking-widest uppercase transition-colors rounded-full ${metricMode === "TELEMETRY" ? "text-black font-bold" : "text-neutral-400 hover:text-white"
                }`}
            >
              {metricMode === "TELEMETRY" && (
                <motion.div
                  layoutId="metric-mode-pill"
                  className="absolute inset-0 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <TrendingUp size={13} />
                DEEP TELEMETRY &amp; SPARKLINE
              </span>
            </button>
          </div>
        </div>

        {/* 4 Major Metric Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-px lg:bg-white/[0.07] border border-white/[0.07] overflow-hidden rounded-sm mt-8">
          {metricsData.map((card: MetricCardData, idx: number) => {
            const isHovered = hoveredCard === card.platform;
            const isTelemetry = metricMode === "TELEMETRY";
            const activeStat = isTelemetry ? card.telemetryStat : card.mainStat;
            const activeMetrics = isTelemetry ? card.telemetryMetrics : card.metrics;

            return (
              <motion.div
                key={card.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setMetricMode(metricMode === "RATINGS" ? "TELEMETRY" : "RATINGS")}
                onMouseEnter={() => {
                  setHoveredCard(card.platform);
                  setCursor("view", isTelemetry ? "OVERVIEW" : "TELEMETRY");
                }}
                onMouseLeave={() => {
                  setHoveredCard(null);
                  resetCursor();
                }}
                className={`relative p-7 sm:p-8 bg-[#0a0a0e] transition-all duration-500 flex flex-col justify-between group cursor-pointer ${isHovered ? "bg-[#111117]" : "hover:bg-[#0d0d12]"
                  }`}
              >
                {/* Top Header */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                      {getPlatformIcon(card.platform)}
                      <span>{card.platform}</span>
                    </div>

                    <span
                      className={`font-mono text-[9px] tracking-widest px-2 py-0.5 rounded-none border transition-colors ${isTelemetry
                        ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                        : "border-white/10 text-neutral-400 bg-white/[0.02]"
                        }`}
                    >
                      {isTelemetry ? "TELEMETRY" : card.badge || "VERIFIED"}
                    </span>
                  </div>

                  {/* Main Stat / Animated Telemetry Number */}
                  <div className="mb-6 relative min-h-[90px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={isTelemetry ? "telemetry" : "ratings"}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                      >
                        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase block mb-1">
                          {activeStat.label}
                        </span>
                        <motion.div
                          animate={{ scale: isHovered ? 1.03 : 1 }}
                          transition={{ duration: 0.3 }}
                          className={`font-editorial-heading text-4xl sm:text-5xl tracking-tight ${isTelemetry ? "text-emerald-300" : "text-white"
                            }`}
                        >
                          {activeStat.value}
                        </motion.div>
                        {activeStat.subtext && (
                          <p className="font-mono text-[11px] text-neutral-400 mt-1">
                            {activeStat.subtext}
                          </p>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Animated Trajectory Sparkline Graph (Visible in Telemetry Mode) */}
                  <AnimatePresence>
                    {isTelemetry && card.sparkline && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="mb-6 pt-2 pb-2 overflow-hidden"
                      >
                        <div className="flex items-center justify-between font-mono text-[9px] text-neutral-500 mb-1">
                          <span>RATING TRAJECTORY</span>
                          <span className="text-emerald-400">+GAIN</span>
                        </div>
                        <svg
                          className="w-full h-10 overflow-visible"
                          viewBox="0 0 200 40"
                          preserveAspectRatio="none"
                        >
                          <motion.path
                            d={generateSparklinePath(card.sparkline, 200, 40)}
                            fill="none"
                            stroke={card.highlightColor || "#10b981"}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                          />
                        </svg>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sub-Metrics Rows */}
                <div className="pt-6 border-t border-white/[0.06] space-y-3">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isTelemetry ? "sub-telemetry" : "sub-ratings"}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-3"
                    >
                      {activeMetrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="flex items-center justify-between text-xs font-mono"
                        >
                          <span className="text-neutral-500 tracking-wider uppercase text-[10px]">
                            {m.label}
                          </span>
                          <div className="text-right">
                            <span className="text-neutral-200 font-medium">{m.value}</span>
                            {m.sublabel && (
                              <span className="text-[9px] text-neutral-500 block">
                                {m.sublabel}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Subtle bottom active highlight line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  style={{
                    backgroundColor: isTelemetry ? "#10b981" : card.highlightColor || "#ffffff",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
