import React from "react";
import { motion } from "framer-motion";

/**
 * Scene 3: ScholarSphere Reveal
 * "Knowledge Without Boundaries" appears floating smoothly in the 3D cosmos.
 */
export default function Scene3Reveal({ progress }) {
  // Active between 0.35 and 0.49
  const isVisible = progress >= 0.34 && progress <= 0.49;
  if (!isVisible) return null;

  let opacity = 1;
  if (progress < 0.38) {
    opacity = (progress - 0.34) / 0.04;
  } else if (progress > 0.45) {
    opacity = (0.49 - progress) / 0.04;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6 pointer-events-none z-20 text-center transition-opacity duration-300"
      style={{ opacity }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto flex flex-col items-center pointer-events-auto"
      >
        {/* Floating Halo Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 backdrop-blur-md mb-6 shadow-xl shadow-cyan-500/10">
          <span className="text-cyan-400 text-sm">✦</span>
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
            UNIFIED DIGITAL REPOSITORY
          </span>
        </div>

        {/* Cinematic Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight drop-shadow-2xl">
          Knowledge{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Without Boundaries
          </span>
        </h2>

        {/* Supporting Description */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-slate-200 font-light leading-relaxed max-w-2xl drop-shadow">
          ScholarSphere brings books, academic journals, and digital learning resources together in one accessible platform.
        </p>

        {/* Floating Trust Indicators */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-300">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
            🛡️ Peer-Reviewed Archives
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
            ⚡ Microservices Scalability
          </div>
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-sm">
            🔒 Secure JWT Access Control
          </div>
        </div>
      </motion.div>
    </div>
  );
}
