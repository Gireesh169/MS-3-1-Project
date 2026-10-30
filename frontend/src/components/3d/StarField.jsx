import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cinematic Cosmic StarField and Atmospheric Dust
 * Generates twinkling star particles and floating digital knowledge dust across the 3D library depth.
 */
export default function StarField({ count = 1800, depth = 70 }) {
  const pointsRef = useRef();
  const dustRef = useRef();

  // Generate star field points
  const [starPositions, starColors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color("#60a5fa"), // light blue
      new THREE.Color("#818cf8"), // indigo
      new THREE.Color("#c084fc"), // purple
      new THREE.Color("#ffffff"), // pure white
      new THREE.Color("#38bdf8"), // sky blue
    ];

    for (let i = 0; i < count; i++) {
      // Spread across a tunnel volume
      const radius = 5 + Math.random() * 22;
      const angle = Math.random() * Math.PI * 2;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = 10 - Math.random() * (depth + 15);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    return [positions, colors];
  }, [count, depth]);

  // Generate digital knowledge dust closer to camera path
  const [dustPositions] = useMemo(() => {
    const dustCount = 400;
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = 8 - Math.random() * (depth + 5);
    }
    return [positions];
  }, [depth]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.z = time * 0.015;
    }
    if (dustRef.current) {
      dustRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <group>
      {/* Distant stars */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={starPositions.length / 3}
            array={starPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={starColors.length / 3}
            array={starColors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>

      {/* Atmospheric digital knowledge dust */}
      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={dustPositions.length / 3}
            array={dustPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color="#38bdf8"
          transparent
          opacity={0.4}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Atmospheric Ambient Nebula Glows */}
      <mesh position={[0, -2, -15]}>
        <sphereGeometry args={[14, 16, 16]} />
        <meshBasicMaterial
          color="#0f172a"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[4, 2, -35]}>
        <sphereGeometry args={[12, 16, 16]} />
        <meshBasicMaterial
          color="#1e1b4b"
          transparent
          opacity={0.25}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
