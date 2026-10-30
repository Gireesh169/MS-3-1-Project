import React, { useState, useEffect } from "react";
import { useScroll, useSpring } from "framer-motion";
import ScrollCanvas from "../components/3d/ScrollCanvas";
import CinematicNavbar from "../components/CinematicNavbar";
import Scene1Universe from "../components/overlay/Scene1Universe";
import Scene2Tunnel from "../components/overlay/Scene2Tunnel";
import Scene3Reveal from "../components/overlay/Scene3Reveal";
import Scene4Features from "../components/overlay/Scene4Features";
import Scene5OpenBook from "../components/overlay/Scene5OpenBook";
import Scene6LoginPortal from "../components/overlay/Scene6LoginPortal";

/**
 * ScholarSphere — Cinematic 3D Scroll Journey
 * A continuous, scroll-driven 3D digital library storytelling experience.
 */
export default function Landing() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Native scroll progress from 0.0 to 1.0
  const { scrollYProgress } = useScroll();

  // Smooth cinematic inertia spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.0005,
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setScrollProgress(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Waypoints for side tracker
  const waypoints = [
    { title: "Universe", threshold: 0.0 },
    { title: "Vault", threshold: 0.22 },
    { title: "Reveal", threshold: 0.40 },
    { title: "Features", threshold: 0.60 },
    { title: "Discovery", threshold: 0.80 },
    { title: "Portal", threshold: 0.95 },
  ];

  return (
    <div className="relative bg-[#030712] text-white selection:bg-cyan-500 selection:text-black">
      {/* 1. Cinematic Floating Navbar */}
      <CinematicNavbar scrollProgress={scrollProgress} />

      {/* 2. Fullscreen Fixed 3D Canvas */}
      <ScrollCanvas scrollProgress={scrollProgress} />

      {/* 3. HTML Storytelling Overlays synced to Scroll */}
      <Scene1Universe progress={scrollProgress} />
      <Scene2Tunnel progress={scrollProgress} />
      <Scene3Reveal progress={scrollProgress} />
      <Scene4Features progress={scrollProgress} />
      <Scene5OpenBook progress={scrollProgress} />
      <Scene6LoginPortal progress={scrollProgress} />

      {/* 4. Minimalist Right-Hand Waypoint Dot Indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-4 pointer-events-none">
        {waypoints.map((wp, idx) => {
          const isActive =
            idx === waypoints.length - 1
              ? scrollProgress >= wp.threshold
              : scrollProgress >= wp.threshold && scrollProgress < waypoints[idx + 1].threshold;

          return (
            <button
              key={wp.title}
              onClick={() => {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                window.scrollTo({
                  top: maxScroll * wp.threshold,
                  behavior: "smooth",
                });
              }}
              className="group pointer-events-auto flex items-center space-x-2 focus:outline-none"
              title={wp.title}
            >
              <span
                className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "text-cyan-400 opacity-100 translate-x-0"
                    : "text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                }`}
              >
                {wp.title}
              </span>
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-cyan-400 ring-4 ring-cyan-400/20 scale-125"
                    : "bg-slate-700 hover:bg-slate-500"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* 5. Tall Scroll Canvas Drive Track (700vh for deep, gradual cinematic storytelling) */}
      <div className="relative w-full h-[700vh] pointer-events-none" />
    </div>
  );
}
