import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cinematic Scroll-Linked Camera Controller
 * Uses CatmullRom splines for silky smooth, cinematic 3D flight through the universe of books.
 * Interpolates both camera position and look-at orientation, and adds subtle organic mouse parallax.
 */
export default function CameraController({ scrollProgress = 0, isMobile = false }) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const mousePos = useRef({ x: 0, y: 0 });

  // Camera flight trajectory spline points
  const { cameraSpline, lookAtSpline } = useMemo(() => {
    const camPoints = [
      new THREE.Vector3(0, 0, isMobile ? 9.0 : 7.2),      // t = 0.00: Scene 1 Wide View
      new THREE.Vector3(0, 0.15, 3.8),                    // t = 0.15: Transition to Tunnel
      new THREE.Vector3(0.35, 0.25, -6.0),                // t = 0.28: Scene 2 Flying inside tunnel
      new THREE.Vector3(-0.35, 0.1, -17.0),               // t = 0.42: Scene 3 Knowledge Without Boundaries
      new THREE.Vector3(0.28, 0.0, -28.0),                // t = 0.56: Scene 4 Features showcase
      new THREE.Vector3(-0.15, 0.25, -36.5),              // t = 0.70: Approaching Open Book
      new THREE.Vector3(0.0, 0.35, -42.8),                // t = 0.85: Scene 5 Focus on Grand Open Book
      new THREE.Vector3(0.0, 0.12, -44.2),                // t = 0.95: Scene 6 Login convergence
      new THREE.Vector3(0.0, 0.08, -44.8),                // t = 1.00: Final Login Portal
    ];

    const lookPoints = [
      new THREE.Vector3(0, 0, 0),                         // t = 0.00: Look at central emblem
      new THREE.Vector3(0, 0.05, -3.0),                   // t = 0.15
      new THREE.Vector3(0, 0, -15.0),                     // t = 0.28: Look down tunnel
      new THREE.Vector3(0, 0, -27.0),                     // t = 0.42: Look into cosmic space
      new THREE.Vector3(0, -0.05, -37.0),                 // t = 0.56: Look at features
      new THREE.Vector3(0, -0.3, -45.0),                  // t = 0.70: Look at glowing open book
      new THREE.Vector3(0, -0.6, -45.0),                  // t = 0.85: Gaze down onto open pages
      new THREE.Vector3(0, -0.2, -50.0),                  // t = 0.95: Look into login sanctuary
      new THREE.Vector3(0, -0.1, -50.0),                  // t = 1.00
    ];

    return {
      cameraSpline: new THREE.CatmullRomCurve3(camPoints),
      lookAtSpline: new THREE.CatmullRomCurve3(lookPoints),
    };
  }, [isMobile]);

  // Track subtle mouse movement for organic parallax
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current.x = (e.clientX / window.innerWidth - 0.5) * 0.45;
      mousePos.current.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    // Clamp scroll progress between 0 and 1
    const t = Math.max(0, Math.min(1, scrollProgress));

    // Sample target position along the smooth 3D CatmullRom spline
    const targetCamPos = cameraSpline.getPoint(t);
    const targetLookAt = lookAtSpline.getPoint(t);

    // Apply subtle mouse parallax
    const parallaxX = mousePos.current.x * (1 - t * 0.5);
    const parallaxY = -mousePos.current.y * (1 - t * 0.5);

    // Smoothly lerp camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamPos.x + parallaxX, 0.07);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamPos.y + parallaxY, 0.07);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamPos.z, 0.07);

    // Smoothly lerp look-at target
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, targetLookAt.x, 0.07);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, targetLookAt.y, 0.07);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, targetLookAt.z, 0.07);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
