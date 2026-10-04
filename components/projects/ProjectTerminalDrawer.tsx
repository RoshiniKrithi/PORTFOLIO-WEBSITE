"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ChevronDown, ChevronUp, Play, CheckCircle2, Copy, Check } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectTerminalDrawerProps {
  project: Project;
}

export default function ProjectTerminalDrawer({ project }: ProjectTerminalDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [logIndex, setLogIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getProjectLogs = (id: string) => {
    switch (id) {
      case "leaf-disease":
        return [
          "[INIT] Loading TensorFlow 2.16 & MobileNetV2 depthwise backbone...",
          "[CUDA] GPU device detected: NVIDIA Tensor Core (FP16 mode enabled)",
          "[MODEL] Loaded weights: mobilenet_v2_pathology_38class.h5 (3.4M params)",
          "[INPUT] Preprocessing tensor shape: [1, 3, 224, 224] (norm: [-1, 1])",
          "[INFERENCE] Forward pass completed in 78.4ms",
          "[PREDICTION] Top-1: Solanum lycopersicum - Early Blight (Confidence: 97.42%)",
          "[DB] SQLite: INSERT INTO diagnostic_history (id, plant, conf) VALUES ('diag_892', 'Tomato', 0.974)",
          "[HTTP] POST /api/v1/predict -> 200 OK (84ms total roundtrip)",
        ];
      case "code-arena":
        return [
          "[CRON] Worker triggered: Syncing contest feeds from 6 competitive judges...",
          "[API] GET https://codeforces.com/api/contest.list -> 200 OK (112ms)",
          "[GRAPHQL] POST https://leetcode.com/graphql (ContestScheduleQuery) -> 200 OK",
          "[TRANSFORM] Normalized 14 upcoming rounds across UTC/IST timezone offsets",
          "[PG_POOL] PostgreSQL connection acquired (active: 12, idle: 8)",
          "[SQL] UPSERT INTO contests (id, platform, start_time) VALUES (...) [Executed in 9.2ms]",
          "[WS] Broadcasted contest_delta payload to 1,420 connected WebSocket clients",
          "[STATUS] Schedule sync completed with 0 errors (99.9% uptime)",
        ];
      case "eloria-luxe":
        return [
          "[AUTH] Received JWT session token -> HMAC-SHA256 signature verified",
          "[CART] Atomic transaction started for cart_session_88192",
          "[RECOMMENDER] Computing collaborative style affinity matrix (k=8 nearest neighbors)...",
          "[PAYMENT] Razorpay order_id created: order_NVx892a01k9 (Amount: $2,450.00)",
          "[WEBHOOK] POST /api/v1/payments/verify -> HMAC-SHA256 header verified",
          "[INVENTORY] Stock decremented atomically (SKU: EL-SILK-PARIS-04)",
          "[REDIS] Cache invalidated for key: products:facet:silk:luxury",
          "[HTTP] Transaction committed -> 200 OK (1.18s checkout latency)",
        ];
      case "aura-gpt":
        return [
          "[BOOT] Initializing PyTorch 2.4 Decoder-only Transformer pipeline...",
          "[TOKENIZER] Loaded BPE Vocab (32,000 merge tokens, UTF-8 byte fallback)",
          "[ROPE] Rotary Positional Embeddings initialized (max_seq_len: 4096)",
          "[LORA] Injected Low-Rank Adapters (r=16, alpha=32, target_modules: [q_proj, v_proj])",
          "[RAG] FAISS Dense Vector lookup: 4 nearest context chunks fetched in 88ms",
          "[INFERENCE] FlashAttention CUDA kernel forward pass (top_p=0.9, temp=0.7)",
          "[STREAM] Yielding tokens delta over Server-Sent Events (48.2 tokens/sec)",
          "[MEMORY] Peak VRAM allocated: 3.84 GB / 8.00 GB",
        ];
      default:
        return [
          "[INIT] Service initialized",
          "[READY] Accepting connections",
        ];
    }
  };

  const logs = getProjectLogs(project.id);

  // Progressive log streaming when opened
  useEffect(() => {
    if (!isOpen) {
      setLogIndex(0);
      return;
    }

    setLogIndex(1);
    const interval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < logs.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isOpen, logs.length]);

  const handleCopyLogs = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(logs.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full mt-4" onClick={(e) => e.stopPropagation()}>
      {/* Drawer Toggle Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-[#0e0e14] hover:bg-[#14141c] border border-white/[0.08] hover:border-white/20 transition-all duration-300 font-mono text-[10px] text-neutral-300 tracking-wider uppercase rounded-sm"
      >
        <div className="flex items-center gap-2">
          <Terminal size={12} className="text-emerald-400" />
          <span>EXPAND ARCHITECTURE RAW LOGS</span>
        </div>
        <div className="flex items-center gap-1.5 text-neutral-500">
          <span className="text-[9px]">{isOpen ? "COLLAPSE" : "LIVE TELEMETRY"}</span>
          {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </div>
      </button>

      {/* Slide-Open Mini Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#07070a] border-x border-b border-white/[0.1] rounded-b-sm"
          >
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#0a0a0f] border-b border-white/[0.06] font-mono text-[9px] text-neutral-500">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-neutral-400 font-bold">{project.id}.telemetry.log</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-emerald-400 text-[9px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
                <button
                  type="button"
                  onClick={handleCopyLogs}
                  className="hover:text-white flex items-center gap-1 transition-colors"
                  title="Copy logs"
                >
                  {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  <span>{copied ? "COPIED" : "COPY"}</span>
                </button>
              </div>
            </div>

            {/* Streamed Log Output */}
            <div
              ref={scrollRef}
              className="p-4 font-mono text-[11px] leading-relaxed space-y-1.5 text-neutral-300 max-h-52 overflow-y-auto"
            >
              {logs.slice(0, logIndex).map((log, lIdx) => {
                const isHighlight =
                  log.includes("200 OK") ||
                  log.includes("Confidence") ||
                  log.includes("broadcasted") ||
                  log.includes("committed");

                return (
                  <motion.div
                    key={lIdx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex items-start gap-2 ${
                      isHighlight ? "text-emerald-300 font-medium" : "text-neutral-400"
                    }`}
                  >
                    <span className="text-neutral-600 select-none">{">"}</span>
                    <span>{log}</span>
                  </motion.div>
                );
              })}
              {logIndex < logs.length && (
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-xs">
                  <span className="animate-pulse">_</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
