import React from "react";
import { motion } from "framer-motion";

/**
 * Scene 5: Enter the Digital Library (Open Book Focal Point)
 * "Every Book Opens a New World" • "Your next discovery is waiting."
 */
export default function Scene5OpenBook({ progress }) {
  // Active between 0.75 and 0.89
  const isVisible = progress >= 0.75 && progress <= 0.89;
  if (!isVisible) return null;

  let opacity = 1;
  if (progress < 0.78) {
    opacity = (progress - 0.75) / 0.03;
  } else if (progress > 0.86) {
    opacity = (0.89 - progress) / 0.03;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-start pt-24 sm:pt-32 p-6 pointer-events-none z-20 text-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl mx-auto flex flex-col items-center pointer-events-auto bg-slate-950/60 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl"
      >
        {/* Glow Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-400/40 text-blue-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-lg shadow-blue-500/10">
          <span className="text-amber-400 text-sm">📖</span>
          <span>THE GRAND CODEX</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Every Book Opens a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-blue-400">
            New World
          </span>
        </h2>

        {/* Supporting text */}
        <p className="mt-4 text-base sm:text-xl text-slate-200 font-light max-w-lg">
          Your next discovery is waiting.
        </p>

        {/* Ambient hint */}
        <div className="mt-6 flex items-center space-x-3 text-xs text-cyan-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Gaze into the pages below as digital knowledge ascends</span>
        </div>
      </motion.div>
    </div>
  );
}
