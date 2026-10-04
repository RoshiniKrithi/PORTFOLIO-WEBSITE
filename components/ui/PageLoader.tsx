"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080a] text-[#f4f4f6]"
        >
          <div className="w-full max-w-sm px-8 flex flex-col items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-3 text-xs tracking-[0.3em] font-mono text-neutral-400 uppercase"
            >
              <span>A ROSHINI KRITHI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </motion.div>

            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ left: "-100%", width: "100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 0.8, ease: "easeInOut", repeat: Infinity }}
                className="absolute top-0 bottom-0 bg-gradient-to-r from-transparent via-white to-transparent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-[11px] font-mono text-neutral-500 tracking-wider"
            >
              INITIALIZING SYSTEMS...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
