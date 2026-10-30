import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

/**
 * Scene 6: Final Login Transition
 * "Your Journey Starts Here" • "Sign in to discover your world of knowledge."
 * Features Login and Create Account buttons, ScholarSphere crest, and portal backdrop.
 */
export default function Scene6LoginPortal({ progress }) {
  // Active in final range [0.90, 1.00]
  const isVisible = progress >= 0.89;
  if (!isVisible) return null;

  const opacity = Math.min(1, Math.max(0, (progress - 0.89) / 0.05));

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-6 sm:p-12 z-30 transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Soft dark vignette backdrop for login focus */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-lg bg-slate-900/90 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl shadow-blue-500/20 text-center relative overflow-hidden pointer-events-auto"
      >
        {/* Decorative radiant glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* ScholarSphere Core Logo */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 p-0.5 mx-auto mb-6 shadow-xl shadow-cyan-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
            📚
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Your Journey Starts Here
        </h2>

        {/* Supporting Text */}
        <p className="mt-3 text-base text-slate-300 font-light leading-relaxed max-w-md mx-auto">
          Sign in to discover your world of knowledge.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/login"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/25 border border-cyan-400/40 transition-all hover:scale-[1.02] text-center"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="w-full sm:w-1/2 py-3.5 px-6 rounded-xl font-bold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 shadow-sm transition-all hover:scale-[1.02] text-center"
          >
            Create Account
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center space-x-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center space-x-1">
            <span className="text-cyan-400">✓</span>
            <span>JWT Secured</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-cyan-400">✓</span>
            <span>Peer-Reviewed</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-cyan-400">✓</span>
            <span>Cloud Library</span>
          </span>
        </div>

        {/* Replay Journey Link */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="mt-6 text-xs text-cyan-400/80 hover:text-cyan-300 underline underline-offset-4 transition-colors font-mono uppercase tracking-wider"
        >
          ↑ Return to Universe Beginning
        </button>
      </motion.div>
    </div>
  );
}
