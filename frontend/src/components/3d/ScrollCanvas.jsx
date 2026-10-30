import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import CameraController from "./CameraController";
import BookTunnel from "./BookTunnel";
import StarField from "./StarField";
import ScholarSphereEmblem from "./ScholarSphereEmblem";

/**
 * 3D WebGL Canvas for ScholarSphere Scroll Journey
 * Configures cinematic lighting, fog, camera, stars, books tunnel, and open book climax.
 */
export default function ScrollCanvas({ scrollProgress = 0 }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-0">
      <Canvas
        camera={{
          position: [0, 0, isMobile ? 9.0 : 7.2],
          fov: isMobile ? 62 : 48,
          near: 0.1,
          far: 120,
        }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
        }}
      >
        {/* Cinematic Deep Space Fog */}
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 12, 65]} />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={0.9} color="#94a3b8" />
        <directionalLight
          position={[6, 8, 5]}
          intensity={2.2}
          color="#f8fafc"
          castShadow
        />
        <directionalLight
          position={[-6, -4, -10]}
          intensity={1.2}
          color="#38bdf8"
        />
        <directionalLight
          position={[0, 5, -25]}
          intensity={1.5}
          color="#818cf8"
        />

        <Suspense fallback={null}>
          {/* Cosmic Starfield & Atmospheric Particles */}
          <StarField count={isMobile ? 900 : 1800} depth={65} />

          {/* Scene 1 Central Emblem */}
          <ScholarSphereEmblem position={[0, 0, 0]} />

          {/* 3D Digital Library Books Tunnel & Open Book */}
          <BookTunnel scrollProgress={scrollProgress} />

          {/* Smooth Scroll-Controlled Camera */}
          <CameraController
            scrollProgress={scrollProgress}
            isMobile={isMobile}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
