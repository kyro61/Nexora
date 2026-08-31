import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
  isInspectMode: boolean;
  manualOrbit: { x: number; y: number; zoom: number };
}

// 10-Phase Cinematic Interpolation Keyframes
interface Keyframe {
  progress: number;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  watchRot: [number, number, number];
  fov: number;
}

const CINEMATIC_TIMELINE: Keyframe[] = [
  {
    // Phase A: Hero - Floating in atmospheric darkness
    progress: 0.0,
    camPos: [0, -0.1, 5.4],
    lookAt: [0, 0, 0],
    watchRot: [0.15, -0.2, 0.05],
    fov: 42
  },
  {
    // Phase B: The Watch Emerges & Approaches
    progress: 0.14,
    camPos: [0.8, 0.2, 4.0],
    lookAt: [0, 0, 0],
    watchRot: [0.35, 0.5, -0.1],
    fov: 40
  },
  {
    // Phase C: Case Profile & Screwed Crown
    progress: 0.28,
    camPos: [2.6, -0.15, 2.2],
    lookAt: [0.3, 0, 0],
    watchRot: [0.1, 1.25, 0.0],
    fov: 38
  },
  {
    // Phase D: Crystal Entrance & Dial Macro
    progress: 0.42,
    camPos: [0.2, 0.5, 1.9],
    lookAt: [0, 0.1, 0.15],
    watchRot: [-0.3, 0.15, 0.05],
    fov: 35
  },
  {
    // Phase E: Disassembly Sequence (The Art of Precision)
    progress: 0.55,
    camPos: [1.1, 1.3, 3.4],
    lookAt: [0, 0.4, 0],
    watchRot: [0.45, 0.4, -0.1],
    fov: 44
  },
  {
    // Phase F: Deep Inside Calibre NX-901 (Oscillating Balance)
    progress: 0.68,
    camPos: [0.18, -0.25, 1.05],
    lookAt: [0.18, -0.32, 0.1],
    watchRot: [0.05, 0.0, 0.0],
    fov: 36
  },
  {
    // Phase G: Mechanical Reconstruction
    progress: 0.78,
    camPos: [-1.4, 0.6, 3.1],
    lookAt: [0, 0, 0],
    watchRot: [0.3, -0.65, 0.15],
    fov: 40
  },
  {
    // Phase H: Craftsmanship Angle
    progress: 0.88,
    camPos: [-0.9, -0.35, 2.4],
    lookAt: [0, 0, 0],
    watchRot: [-0.2, -0.4, -0.1],
    fov: 38
  },
  {
    // Phase I/J: Final Hero / Commercial Shot
    progress: 1.0,
    camPos: [0.35, 0.25, 3.4],
    lookAt: [0, 0, 0],
    watchRot: [0.25, 0.35, -0.05],
    fov: 38
  }
];

export const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgress,
  isInspectMode,
  manualOrbit
}) => {
  const { camera, pointer } = useThree();
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 5.4));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Find surrounding keyframes and interpolate
  const getInterpolatedState = (p: number) => {
    const clampedP = Math.max(0, Math.min(1, p));

    let k1 = CINEMATIC_TIMELINE[0];
    let k2 = CINEMATIC_TIMELINE[CINEMATIC_TIMELINE.length - 1];

    for (let i = 0; i < CINEMATIC_TIMELINE.length - 1; i++) {
      if (clampedP >= CINEMATIC_TIMELINE[i].progress && clampedP <= CINEMATIC_TIMELINE[i + 1].progress) {
        k1 = CINEMATIC_TIMELINE[i];
        k2 = CINEMATIC_TIMELINE[i + 1];
        break;
      }
    }

    const range = k2.progress - k1.progress;
    const factor = range > 0 ? (clampedP - k1.progress) / range : 0;
    
    // Smooth easeInOut cubic interpolation
    const ease = factor < 0.5 ? 4 * factor * factor * factor : 1 - Math.pow(-2 * factor + 2, 3) / 2;

    const camPos = new THREE.Vector3(
      THREE.MathUtils.lerp(k1.camPos[0], k2.camPos[0], ease),
      THREE.MathUtils.lerp(k1.camPos[1], k2.camPos[1], ease),
      THREE.MathUtils.lerp(k1.camPos[2], k2.camPos[2], ease)
    );

    const lookAt = new THREE.Vector3(
      THREE.MathUtils.lerp(k1.lookAt[0], k2.lookAt[0], ease),
      THREE.MathUtils.lerp(k1.lookAt[1], k2.lookAt[1], ease),
      THREE.MathUtils.lerp(k1.lookAt[2], k2.lookAt[2], ease)
    );

    const fov = THREE.MathUtils.lerp(k1.fov, k2.fov, ease);

    return { camPos, lookAt, fov };
  };

  useFrame((_, delta) => {
    const targetState = getInterpolatedState(scrollProgress);

    if (isInspectMode) {
      // Manual 3D Orbit & Zoom Mode
      const radius = 3.5 * manualOrbit.zoom;
      const phi = THREE.MathUtils.degToRad(90 - manualOrbit.y);
      const theta = THREE.MathUtils.degToRad(manualOrbit.x);

      const targetX = radius * Math.sin(phi) * Math.sin(theta);
      const targetY = radius * Math.cos(phi);
      const targetZ = radius * Math.sin(phi) * Math.cos(theta);

      currentCamPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 5);
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
    } else {
      // Cinematic Scroll Interpolation + Subtle Cursor Parallax
      const mouseParallaxX = pointer.x * 0.15;
      const mouseParallaxY = pointer.y * 0.12;

      const destPos = new THREE.Vector3(
        targetState.camPos.x + mouseParallaxX,
        targetState.camPos.y + mouseParallaxY,
        targetState.camPos.z
      );

      // Smooth lag dampening
      currentCamPos.current.lerp(destPos, delta * 3.5);
      currentLookAt.current.lerp(targetState.lookAt, delta * 3.5);
    }

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetState.fov, delta * 3);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
