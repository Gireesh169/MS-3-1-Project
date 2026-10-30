import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Scene 4: Floating Platform Details
 * Reveals 4 distinct features sequentially as the camera glides past corresponding 3D books and journals.
 */
export default function Scene4Features({ progress }) {
  // Active in range [0.50, 0.74]
  if (progress < 0.49 || progress > 0.75) return null;

  // Determine which feature is currently active
  let currentFeature = null;
  let align = "center";

  if (progress >= 0.49 && progress < 0.56) {
    currentFeature = {
      id: 1,
      badge: "FEATURE 01 • CURATED CATALOG",
      icon: "📚",
      heading: "Discover a World of Books",
      description:
        "Explore a growing collection of digital books across science, technology, engineering, mathematics, and more.",
      visualBadge: "50,000+ Titles Across All Disciplines",
    };
    align = "left";
  } else if (progress >= 0.56 && progress < 0.62) {
    currentFeature = {
      id: 2,
      badge: "FEATURE 02 • PEER-REVIEWED ARCHIVES",
      icon: "📰",
      heading: "Explore Academic Journals",
      description:
        "Discover academic journals and research resources that help you explore ideas and expand your knowledge.",
      visualBadge: "Indexed Research & Global Publications",
    };
    align = "right";
  } else if (progress >= 0.62 && progress < 0.68) {
    currentFeature = {
      id: 3,
      badge: "FEATURE 03 • INSTANT ACCESSIBILITY",
      icon: "⚡",
      heading: "Access Knowledge Seamlessly",
      description:
        "Access digital content through a platform designed to make learning and research easier.",
      visualBadge: "Low-Latency Microservices Gateway",
    };
    align = "left";
  } else if (progress >= 0.68 && progress <= 0.75) {
    currentFeature = {
      id: 4,
      badge: "FEATURE 04 • PERSONALIZED INTELLIGENCE",
      icon: "📈",
      heading: "Your Learning Journey",
      description:
        "Continue exploring, revisit your reading history, and discover new learning resources.",
      visualBadge: "Usage Telemetry & Reading Analytics",
    };
    align = "right";
  }

  if (!currentFeature) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center p-6 sm:p-12 pointer-events-none z-20">
      <div
        className={`w-full max-w-7xl flex ${
          align === "left"
            ? "justify-start"
            : align === "right"
            ? "justify-end"
            : "justify-center"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFeature.id}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 0.94 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="w-full max-w-lg bg-slate-950/75 backdrop-blur-xl p-8 rounded-3xl border border-white/15 shadow-2xl shadow-blue-950/50 pointer-events-auto space-y-4"
          >
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-400/30 text-cyan-400 text-xs font-mono font-bold">
                <span>{currentFeature.icon}</span>
                <span>{currentFeature.badge}</span>
              </div>
              <span className="text-xs font-mono text-slate-400">0{currentFeature.id} / 04</span>
            </div>

            {/* Feature Heading */}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {currentFeature.heading}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              {currentFeature.description}
            </p>

            {/* Visual Indicator Pill */}
            <div className="pt-2 flex items-center space-x-2 text-xs font-medium text-slate-400 border-t border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{currentFeature.visualBadge}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
