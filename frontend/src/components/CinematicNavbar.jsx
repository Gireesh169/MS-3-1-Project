import React from "react";
import { Link } from "react-router-dom";

/**
 * Minimalist Floating Cinematic Header
 * Displays ScholarSphere branding, scroll progress indicator, and entrance link.
 */
export default function CinematicNavbar({ scrollProgress = 0 }) {
  // Determine chapter based on progress
  const getChapterName = (p) => {
    if (p < 0.18) return "Chapter I: Universe of Knowledge";
    if (p < 0.35) return "Chapter II: The Digital Library";
    if (p < 0.50) return "Chapter III: Knowledge Without Boundaries";
    if (p < 0.74) return "Chapter IV: Platform Capabilities";
    if (p < 0.88) return "Chapter V: Open Book Discovery";
    return "Chapter VI: Portal Entrance";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center space-x-3 group bg-slate-950/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all shadow-lg"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-sm shadow-md group-hover:scale-105 transition-transform">
            📚
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors leading-none">
              ScholarSphere
            </span>
            <span className="text-[10px] font-semibold text-blue-400 tracking-wider uppercase mt-0.5">
              Digital Platform
            </span>
          </div>
        </Link>

        {/* Current Chapter Pill with Progress Bar */}
        <div className="hidden md:flex flex-col items-center bg-slate-950/60 backdrop-blur-md px-5 py-2 rounded-2xl border border-white/10 shadow-lg">
          <span className="text-xs font-semibold text-slate-300 tracking-wide">
            {getChapterName(scrollProgress)}
          </span>
          <div className="w-48 h-1 bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full transition-all duration-150"
              style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center space-x-3">
          <Link
            to="/login"
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-md shadow-blue-500/20 border border-blue-400/30 transition-all hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}
