import React from "react";
import { motion } from "framer-motion";

/**
 * Scene 1: Enter the Universe of Knowledge
 * Prominently presents ScholarSphere, the core motto, and scroll indicator.
 */
export default function Scene1Universe({ progress }) {
  // Visible between progress 0.00 and 0.16
  const isVisible = progress <= 0.16;
  const opacity = Math.max(0, Math.min(1, 1 - progress / 0.14));

  if (!isVisible && opacity <= 0) return null;

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-between pointer-events-none px-6 py-20 z-20 text-center transition-opacity duration-300"
      style={{ opacity }}
    >
      {/* Top spacer */}
      <div />

      {/* Center Hero Information */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center pointer-events-auto"
      >
        {/* Glow emblem badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-950/70 border border-blue-500/40 backdrop-blur-md mb-6 shadow-lg shadow-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-cyan-300 uppercase">
            SCHOLARSPHERE DIGITAL PLATFORM
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl">
          Welcome to a{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400">
            Universe of Knowledge
          </span>
        </h1>

        {/* Supporting Motto */}
        <p className="mt-6 text-xl sm:text-2xl md:text-3xl text-slate-300 font-light tracking-wide max-w-2xl drop-shadow">
          Discover. Explore. Learn. Grow.
        </p>

        {/* Subtle detail pill */}
        <p className="mt-4 text-xs sm:text-sm text-slate-400/90 max-w-lg">
          A continuous 3D digital repository connecting academic books, research journals, and authenticated knowledge.
        </p>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex flex-col items-center pointer-events-auto cursor-pointer"
        onClick={() => {
          window.scrollBy({ top: window.innerHeight * 0.9, behavior: "smooth" });
        }}
      >
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 animate-pulse">
          Scroll to Begin Your Journey
        </span>
        <div className="w-6 h-10 rounded-full border-2 border-slate-500/60 flex items-start justify-center p-1.5 backdrop-blur-sm bg-slate-950/40">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-1.5 h-2.5 rounded-full bg-gradient-to-b from-cyan-400 to-blue-500"
          />
        </div>
      </motion.div>
    </div>
  );
}
