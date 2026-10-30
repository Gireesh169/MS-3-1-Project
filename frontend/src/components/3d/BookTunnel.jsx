import React, { useMemo } from "react";
import FloatingBook from "./FloatingBook";
import OpenBook from "./OpenBook";
import { BOOK_DATA } from "../../utils/bookTextures";

/**
 * 3D Digital Library Book Tunnel
 * Spreads academic books and journals across 3D coordinates (Left, Right, Above, Below, Near, Far).
 * Controls cinematic flight waypoints, opening books, journal rotations, and convergence.
 */
export default function BookTunnel({ scrollProgress = 0 }) {
  // Pre-calculate positions and rotations for books along the Z-axis path
  const booksConfig = useMemo(() => {
    return [
      // ================= SCENE 1: Universe of Knowledge (Z: 2 to -4) =================
      {
        book: BOOK_DATA[0],
        pos: [-2.6, 0.4, 2.5],
        rot: [0.1, 0.4, -0.15],
        scale: 0.95,
        speed: 1.1,
        behavior: "orbit",
      },
      {
        book: BOOK_DATA[1],
        pos: [2.5, -0.3, 1.8],
        rot: [-0.15, -0.5, 0.1],
        scale: 1.0,
        speed: 0.9,
        behavior: "orbit",
      },
      {
        book: BOOK_DATA[2],
        pos: [-1.8, -1.2, 0.5],
        rot: [0.2, 0.2, 0.25],
        scale: 0.9,
        speed: 1.3,
        behavior: "orbit",
      },
      {
        book: BOOK_DATA[3],
        pos: [1.9, 1.4, -1.0],
        rot: [-0.25, -0.3, -0.2],
        scale: 0.95,
        speed: 1.0,
        behavior: "orbit",
      },

      // ================= SCENE 2: The Scroll-In Tunnel (Z: -4 to -18) =================
      {
        book: BOOK_DATA[4],
        pos: [-3.2, 1.2, -5.0],
        rot: [0.1, 0.6, -0.1],
        scale: 1.05,
        speed: 1.2,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[5],
        pos: [3.4, -0.8, -7.5],
        rot: [-0.2, -0.5, 0.15],
        scale: 1.1,
        speed: 0.8,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[6],
        pos: [-2.8, -1.6, -10.5],
        rot: [0.3, 0.3, 0.2],
        scale: 1.0,
        speed: 1.4,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[7], // Academic Journal
        pos: [2.9, 1.7, -13.0],
        rot: [-0.1, -0.7, -0.1],
        scale: 1.1,
        speed: 1.1,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[8],
        pos: [-3.5, 0.2, -16.0],
        rot: [0.15, 0.45, 0.05],
        scale: 1.0,
        speed: 0.95,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[9],
        pos: [3.3, -1.1, -18.5],
        rot: [-0.2, -0.4, 0.1],
        scale: 1.05,
        speed: 1.0,
        behavior: "tunnel",
      },

      // ================= SCENE 3: Knowledge Without Boundaries (Z: -20 to -26) =================
      {
        book: BOOK_DATA[0],
        pos: [-4.2, 1.8, -21.0],
        rot: [0.2, 0.7, -0.2],
        scale: 1.15,
        speed: 0.85,
        behavior: "partAside",
      },
      {
        book: BOOK_DATA[1],
        pos: [4.4, -1.5, -23.5],
        rot: [-0.25, -0.65, 0.2],
        scale: 1.2,
        speed: 1.05,
        behavior: "partAside",
      },
      {
        book: BOOK_DATA[2],
        pos: [-4.0, -1.8, -25.5],
        rot: [0.1, 0.8, 0.15],
        scale: 1.1,
        speed: 1.2,
        behavior: "partAside",
      },

      // ================= SCENE 4: Floating Platform Features (Z: -27 to -40) =================
      // Feature 1: Discover a World of Books (Showcase covers)
      {
        book: BOOK_DATA[3],
        pos: [-1.7, 0.2, -28.0],
        rot: [0.05, 0.25, -0.05],
        scale: 1.25,
        speed: 1.1,
        behavior: "showcase",
      },
      {
        book: BOOK_DATA[4],
        pos: [2.6, 0.8, -30.0],
        rot: [-0.08, -0.3, 0.06],
        scale: 1.15,
        speed: 0.9,
        behavior: "showcase",
      },

      // Feature 2: Explore Academic Journals (Rotating Journal in 3D)
      {
        book: BOOK_DATA[7], // Journal
        pos: [1.8, -0.1, -33.5],
        rot: [0.1, -0.2, 0.08],
        scale: 1.3,
        speed: 1.3,
        behavior: "showcase",
      },
      {
        book: BOOK_DATA[5],
        pos: [-2.9, -1.2, -35.0],
        rot: [0.15, 0.45, -0.1],
        scale: 1.0,
        speed: 1.0,
        behavior: "tunnel",
      },

      // Feature 3: Access Knowledge Seamlessly (Glow & Open Path)
      {
        book: BOOK_DATA[6],
        pos: [-1.9, 0.9, -37.5],
        rot: [0.1, 0.35, -0.12],
        scale: 1.15,
        speed: 0.95,
        behavior: "showcase",
      },
      {
        book: BOOK_DATA[8],
        pos: [2.8, -0.6, -39.0],
        rot: [-0.15, -0.4, 0.15],
        scale: 1.1,
        speed: 1.1,
        behavior: "tunnel",
      },

      // Feature 4: Your Learning Journey (Floating Path)
      {
        book: BOOK_DATA[9],
        pos: [-2.4, -0.5, -41.0],
        rot: [0.12, 0.5, 0.08],
        scale: 1.05,
        speed: 1.25,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[1],
        pos: [2.3, 1.3, -42.5],
        rot: [-0.18, -0.35, -0.1],
        scale: 1.0,
        speed: 1.0,
        behavior: "tunnel",
      },

      // ================= SCENE 6: Convergence Halo near Login (Z: -48 to -53) =================
      {
        book: BOOK_DATA[0],
        pos: [-3.0, 1.8, -48.5],
        rot: [0.1, 0.6, -0.1],
        scale: 0.85,
        speed: 0.7,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[2],
        pos: [3.0, 1.7, -49.0],
        rot: [-0.1, -0.6, 0.1],
        scale: 0.85,
        speed: 0.75,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[4],
        pos: [-3.2, -1.8, -50.0],
        rot: [0.2, 0.5, 0.15],
        scale: 0.8,
        speed: 0.8,
        behavior: "tunnel",
      },
      {
        book: BOOK_DATA[7],
        pos: [3.1, -1.7, -50.5],
        rot: [-0.15, -0.55, -0.1],
        scale: 0.8,
        speed: 0.8,
        behavior: "tunnel",
      },
    ];
  }, []);

  return (
    <group>
      {/* 1. All floating books positioned through 3D space */}
      {booksConfig.map((cfg, index) => (
        <FloatingBook
          key={`book_${index}`}
          bookInfo={cfg.book}
          initialPosition={cfg.pos}
          initialRotation={cfg.rot}
          scale={cfg.scale}
          floatSpeed={cfg.speed}
          floatDistance={0.16}
          behavior={cfg.behavior}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* 2. Scene 5 Grand Open Book (Focal Point at Z: -45) */}
      <OpenBook position={[0, -0.7, -45.0]} scale={1.65} />
    </group>
  );
}
