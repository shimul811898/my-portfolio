"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing circle */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-24 h-24 rounded-full bg-cyan-500/20 blur-xl"
        />

        {/* Rotating gradient track */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 rounded-full border-4 border-t-cyan-400 border-r-cyan-500/30 border-b-blue-600/10 border-l-cyan-400/80"
        />

        {/* Inner static branding symbol */}
        <span className="absolute text-xs font-mono font-bold text-cyan-400">⟨/⟩</span>
      </div>

      {/* Loading text with animated dots */}
      <div className="mt-6 flex items-center gap-1">
        <span className="text-sm font-mono tracking-widest text-slate-400 uppercase font-semibold">
          Loading
        </span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
          className="text-sm font-mono text-cyan-400 font-bold"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          className="text-sm font-mono text-cyan-400 font-bold"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
          className="text-sm font-mono text-cyan-400 font-bold"
        >
          .
        </motion.span>
      </div>
    </div>
  );
}
