import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Grand Open Book Component (Scene 5 & 6 Focal Point)
 * Features curved page wings, spine binding, floating turning page,
 * upward rising knowledge particles, and warm golden/cyan illumination.
 */
export default function OpenBook({ position = [0, -0.6, -45], scale = 1.6 }) {
  const groupRef = useRef();
  const turningPageRef = useRef();
  const particlesRef = useRef();

  // Create page textures with realistic manuscript lines and academic diagram
  const [leftPageTexture, rightPageTexture] = useMemo(() => {
    // Left Page
    const canvasL = document.createElement("canvas");
    canvasL.width = 512;
    canvasL.height = 768;
    const ctxL = canvasL.getContext("2d");

    ctxL.fillStyle = "#faf6ed";
    ctxL.fillRect(0, 0, 512, 768);

    // Page margin border
    ctxL.strokeStyle = "rgba(180, 160, 130, 0.4)";
    ctxL.lineWidth = 1;
    ctxL.strokeRect(36, 40, 440, 688);

    // Left page header
    ctxL.fillStyle = "#0f172a";
    ctxL.font = "bold 16px 'Georgia', serif";
    ctxL.fillText("SCHOLARSPHERE • KNOWLEDGE REPOSITORY", 50, 75);

    ctxL.fillStyle = "#94a3b8";
    ctxL.font = "12px sans-serif";
    ctxL.fillText("PAGE 42", 420, 75);

    // Divider
    ctxL.fillStyle = "rgba(180, 160, 130, 0.4)";
    ctxL.fillRect(50, 90, 412, 1);

    // Text lines
    ctxL.fillStyle = "#334155";
    for (let y = 125; y < 450; y += 22) {
      const lineLen = 320 + Math.sin(y) * 60;
      ctxL.fillRect(50, y, lineLen, 3);
    }

    // Academic diagram box
    ctxL.strokeStyle = "#38bdf8";
    ctxL.lineWidth = 2;
    ctxL.strokeRect(50, 480, 412, 200);

    ctxL.fillStyle = "rgba(56, 189, 248, 0.08)";
    ctxL.fillRect(50, 480, 412, 200);

    // Diagram illustration (orbital rings & network)
    ctxL.save();
    ctxL.translate(256, 580);
    ctxL.beginPath();
    ctxL.arc(0, 0, 45, 0, Math.PI * 2);
    ctxL.strokeStyle = "#0284c7";
    ctxL.stroke();

    ctxL.beginPath();
    ctxL.ellipse(0, 0, 70, 25, Math.PI / 4, 0, Math.PI * 2);
    ctxL.strokeStyle = "#f59e0b";
    ctxL.stroke();

    ctxL.beginPath();
    ctxL.arc(0, 0, 8, 0, Math.PI * 2);
    ctxL.fillStyle = "#38bdf8";
    ctxL.fill();
    ctxL.restore();

    ctxL.fillStyle = "#64748b";
    ctxL.font = "italic 11px sans-serif";
    ctxL.fillText("Fig. 1.1: Distributed Microservices Knowledge Graph Architecture", 70, 700);

    // Right Page
    const canvasR = document.createElement("canvas");
    canvasR.width = 512;
    canvasR.height = 768;
    const ctxR = canvasR.getContext("2d");

    ctxR.fillStyle = "#fcf9f2";
    ctxR.fillRect(0, 0, 512, 768);

    ctxR.strokeStyle = "rgba(180, 160, 130, 0.4)";
    ctxR.lineWidth = 1;
    ctxR.strokeRect(36, 40, 440, 688);

    // Header
    ctxR.fillStyle = "#0f172a";
    ctxR.font = "bold 16px 'Georgia', serif";
    ctxR.fillText("CHAPTER IV: DIGITAL DISCOVERY", 50, 75);

    ctxR.fillStyle = "#94a3b8";
    ctxR.font = "12px sans-serif";
    ctxR.fillText("PAGE 43", 420, 75);

    ctxR.fillStyle = "rgba(180, 160, 130, 0.4)";
    ctxR.fillRect(50, 90, 412, 1);

    // Large Drop Cap 'K'
    ctxR.fillStyle = "#0284c7";
    ctxR.font = "bold 64px 'Georgia', serif";
    ctxR.fillText("K", 50, 170);

    ctxR.fillStyle = "#334155";
    ctxR.fillRect(105, 125, 355, 3);
    ctxR.fillRect(105, 147, 355, 3);
    ctxR.fillRect(105, 169, 355, 3);

    for (let y = 195; y < 680; y += 22) {
      const lineLen = 340 + Math.cos(y) * 50;
      ctxR.fillRect(50, y, lineLen, 3);
    }

    const texL = new THREE.CanvasTexture(canvasL);
    const texR = new THREE.CanvasTexture(canvasR);
    return [texL, texR];
  }, []);

  // Rising particles (knowledge sparks)
  const particleCount = 80;
  const [particlePositions, particleVelocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.8;
      pos[i * 3 + 1] = Math.random() * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = 0.01 + Math.random() * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.008;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Subtle breathing float for the book
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.08;
      groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.06;
    }

    // Turning page oscillation (catching the breeze of discovery)
    if (turningPageRef.current) {
      const turnAngle = Math.sin(time * 1.2) * 0.35 + 0.1;
      turningPageRef.current.rotation.y = turnAngle;
    }

    // Update rising knowledge particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        positions[i * 3] += particleVelocities[i * 3];
        positions[i * 3 + 2] += particleVelocities[i * 3 + 2];

        // Loop back to book surface
        if (positions[i * 3 + 1] > 3.0) {
          positions[i * 3 + 1] = 0.1;
          positions[i * 3] = (Math.random() - 0.5) * 2.4;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
        }
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Soft warm/cyan book illumination */}
      <pointLight position={[0, 0.8, 0]} color="#38bdf8" intensity={3.5} distance={7} />
      <pointLight position={[0, 0.4, 0.5]} color="#f59e0b" intensity={2.0} distance={5} />

      {/* Hardcover Backing (Dark Navy Leather) */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 10, 0, 0]}>
        <boxGeometry args={[3.2, 0.1, 2.2]} />
        <meshStandardMaterial color="#0c182b" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Book Spine Center Gutter */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 10, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 2.1, 16]} />
        <meshStandardMaterial color="#08101e" roughness={0.5} />
      </mesh>

      {/* Left Page Wing (Angled slightly open) */}
      <group position={[-0.78, 0, 0]} rotation={[-Math.PI / 10, -0.16, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.45, 0.06, 2.05]} />
          <meshStandardMaterial
            map={leftPageTexture}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* Right Page Wing (Angled slightly open) */}
      <group position={[0.78, 0, 0]} rotation={[-Math.PI / 10, 0.16, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.45, 0.06, 2.05]} />
          <meshStandardMaterial
            map={rightPageTexture}
            roughness={0.7}
            metalness={0.05}
          />
        </mesh>
      </group>

      {/* Turning Floating Page (Oscillating) */}
      <group ref={turningPageRef} position={[0, 0.05, 0]} rotation={[-Math.PI / 10, 0, 0]}>
        <mesh position={[0.7, 0.08, 0]} rotation={[0, 0, 0.08]}>
          <planeGeometry args={[1.35, 1.95]} />
          <meshStandardMaterial
            map={rightPageTexture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* Rising Knowledge Particles (Sparks of Insight) */}
      <points ref={particlesRef} position={[0, 0.2, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#67e8f9"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Holographic Glowing ScholarSphere Ring above Open Book */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.75, 0.02, 16, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
