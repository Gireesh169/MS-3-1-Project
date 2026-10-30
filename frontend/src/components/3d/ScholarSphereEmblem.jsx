import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 3D Holographic ScholarSphere Emblem (Scene 1)
 * Floating crystal core, orbital gyroscopic rings, and radiant illumination.
 */
export default function ScholarSphereEmblem({ position = [0, 0, 0] }) {
  const groupRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const ring3Ref = useRef();
  const coreRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.9) * 0.12;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = time * 0.35;
      ring1Ref.current.rotation.y = time * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.28;
      ring2Ref.current.rotation.z = time * 0.3;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = -time * 0.22;
      ring3Ref.current.rotation.z = -time * 0.25;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y = time * 0.4;
      coreRef.current.rotation.x = time * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central Radiance Light */}
      <pointLight color="#38bdf8" intensity={4.5} distance={8} />
      <pointLight color="#818cf8" intensity={2.5} distance={6} />

      {/* Crystal Core (Icosahedron / Diamond) */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.8}
          wireframe={false}
        />
      </mesh>

      {/* Inner Wireframe Glow */}
      <mesh>
        <octahedronGeometry args={[0.62, 0]} />
        <meshBasicMaterial
          color="#bae6fd"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Gyroscopic Orbital Ring 1 */}
      <group ref={ring1Ref}>
        <mesh>
          <torusGeometry args={[1.2, 0.022, 16, 64]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Gyroscopic Orbital Ring 2 */}
      <group ref={ring2Ref}>
        <mesh>
          <torusGeometry args={[1.45, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#4338ca"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Gyroscopic Orbital Ring 3 (Outer Gold Accent) */}
      <group ref={ring3Ref}>
        <mesh>
          <torusGeometry args={[1.7, 0.015, 16, 64]} />
          <meshStandardMaterial
            color="#f59e0b"
            emissive="#b45309"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </group>
    </group>
  );
}
