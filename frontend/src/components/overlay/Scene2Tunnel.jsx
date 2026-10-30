import React from "react";
import { motion } from "framer-motion";

/**
 * Scene 2: Scroll into the Books
 * Accompanies camera travel as the user plunges into the 3D book tunnel.
 */
export default function Scene2Tunnel({ progress }) {
  // Active between 0.18 and 0.33
  const isVisible = progress >= 0.17 && progress <= 0.34;
  if (!isVisible) return null;

  // Compute smooth fade-in and fade-out
  let opacity = 1;
  if (progress < 0.22) {
    opacity = (progress - 0.17) / 0.05;
  } else if (progress > 0.29) {
    opacity = (0.34 - progress) / 0.05;
  }
  opacity = Math.max(0, Math.min(1, opacity));

  return (
    <div
      className="fixed inset-0 flex flex-col justify-end p-8 sm:p-14 pointer-events-none z-20 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div className="max-w-xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-950/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl space-y-3"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              SECTOR: DIGITAL VAULT // DEPTH LEVEL 2
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Entering the World of Books
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed font-light">
            Journeying through curated academic collections. Every title is preserved in digital 3D space with high-fidelity indexing and peer-reviewed provenance.
          </p>

          <div className="pt-1 flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span>VELOCITY: DYNAMIC</span>
            <span>•</span>
            <span>TOPIC: ADVANCED COMPUTING</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
