import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createBookMaterials } from "../../utils/bookTextures";

/**
 * 3D Floating Book Component
 * Features realistic thickness, covers, spine, and subtle physical floating movement.
 */
export default function FloatingBook({
  bookInfo,
  initialPosition = [0, 0, 0],
  initialRotation = [0, 0, 0],
  scale = 1,
  floatSpeed = 1,
  floatDistance = 0.15,
  scrollProgress = 0,
  behavior = "tunnel", // "orbit", "tunnel", "partAside", "showcase"
}) {
  const meshRef = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  // Standard book proportions (width, height, thickness)
  const dimensions = useMemo(() => [1.3, 1.85, 0.26], []);

  // Generate 6-face book materials
  const materials = useMemo(() => {
    return createBookMaterials(bookInfo);
  }, [bookInfo]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Natural floating oscillation
    const floatY = Math.sin(time * floatSpeed + randomOffset) * floatDistance;
    const floatRotX = Math.sin(time * 0.7 * floatSpeed + randomOffset) * 0.05;
    const floatRotY = Math.cos(time * 0.5 * floatSpeed + randomOffset) * 0.05;

    let targetX = initialPosition[0];
    let targetY = initialPosition[1] + floatY;
    let targetZ = initialPosition[2];

    let rotX = initialRotation[0] + floatRotX;
    let rotY = initialRotation[1] + floatRotY;
    let rotZ = initialRotation[2];

    // Behavior: Orbit around center (for Scene 1)
    if (behavior === "orbit") {
      const orbitAngle = time * 0.15 * floatSpeed + randomOffset;
      const radius = Math.sqrt(
        initialPosition[0] * initialPosition[0] +
        initialPosition[2] * initialPosition[2]
      ) || 3.5;
      targetX = Math.cos(orbitAngle) * radius;
      targetZ = Math.sin(orbitAngle) * radius;
      rotY = -orbitAngle + Math.PI / 2;
    }

    // Behavior: Tunnel - Part aside as camera approaches (Scene 3 & 4)
    if (behavior === "tunnel" || behavior === "partAside") {
      // If camera gets within Z distance, part outwards
      const cameraZ = state.camera.position.z;
      const distZ = cameraZ - targetZ;

      if (distZ > -5 && distZ < 6) {
        const sideMultiplier = initialPosition[0] >= 0 ? 1 : -1;
        const pushDistance = (6 - Math.abs(distZ)) * 0.28;
        targetX += sideMultiplier * pushDistance;
        rotY += sideMultiplier * 0.15;
      }
    }

    // Behavior: Showcase cover towards camera (Scene 4)
    if (behavior === "showcase") {
      rotY = Math.sin(time * 0.4) * 0.25;
      rotX = 0.05;
    }

    // Smooth lerp to target
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, rotX, 0.06);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, rotY, 0.06);
    meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, rotZ, 0.06);
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      rotation={initialRotation}
      scale={scale}
      material={materials}
      castShadow
      receiveShadow
    >
      <boxGeometry args={dimensions} />
    </mesh>
  );
}
