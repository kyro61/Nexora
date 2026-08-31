import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraRigProps {
  scrollProgress: number;
  isInspectMode: boolean;
  manualOrbit: { x: number; y: number; zoom: number };
}

// 9 Named Cinematic Master Camera States (0.00 -> 1.00)
export type CameraStateName =
  | 'VOID'
  | 'REVEAL'
  | 'ORBIT'
  | 'CRYSTAL'
  | 'MOVEMENT'
  | 'EXPLODED'
  | 'CRAFT'
  | 'COLLECTION'
  | 'FINAL';

export interface CameraKeyframe {
  name: CameraStateName;
  progress: number;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  watchRot: [number, number, number];
  fov: number;
}

export const CAMERA_STATES: CameraKeyframe[] = [
  {
    // SCENE 01 — VOID (0.00 -> 0.08)
    // Far away silhouette in atmospheric void, below eye level
    name: 'VOID',
    progress: 0.0,
    camPos: [0.0, -0.28, 7.5],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.1, -0.15, 0.02],
    fov: 38
  },
  {
    // SCENE 02 — FIRST REVEAL (0.08 -> 0.18)
    // Camera approaches watch, rotates ~25 deg, lighting sweeps metal
    name: 'REVEAL',
    progress: 0.13,
    camPos: [0.65, 0.22, 4.3],
    lookAt: [0.0, 0.05, 0.0],
    watchRot: [0.25, 0.44, -0.08],
    fov: 40
  },
  {
    // SCENE 03 — ORBIT (0.18 -> 0.30)
    // Camera performs cinematic orbit revealing case thickness, crown, lugs, side profile
    name: 'ORBIT',
    progress: 0.24,
    camPos: [2.75, -0.12, 2.1],
    lookAt: [0.25, 0.0, 0.0],
    watchRot: [0.08, 1.22, 0.0],
    fov: 37
  },
  {
    // SCENE 04 — ENTER THE WATCH (0.30 -> 0.42)
    // Camera pushes toward sapphire crystal and physically penetrates into the dial
    name: 'CRYSTAL',
    progress: 0.36,
    camPos: [0.1, 0.16, 1.35],
    lookAt: [0.0, 0.04, 0.1],
    watchRot: [-0.15, 0.12, 0.04],
    fov: 42
  },
  {
    // SCENE 05 — THE MECHANISM (0.42 -> 0.56)
    // Inside the mechanical movement: gears, balance wheel, jewels, escapement
    name: 'MOVEMENT',
    progress: 0.49,
    camPos: [0.18, -0.26, 0.95],
    lookAt: [0.18, -0.32, 0.08],
    watchRot: [0.04, 0.0, 0.0],
    fov: 38
  },
  {
    // SCENE 06 — EXPLODED WATCH (0.56 -> 0.68)
    // Camera pulls back, components physically separate along 3D vectors
    name: 'EXPLODED',
    progress: 0.62,
    camPos: [1.25, 1.15, 3.85],
    lookAt: [0.0, 0.25, 0.0],
    watchRot: [0.42, 0.38, -0.08],
    fov: 45
  },
  {
    // SCENE 07 — CRAFTSMANSHIP (0.68 -> 0.78)
    // Watch reconstructs, camera moves to macro artisanal craftsmanship angle
    name: 'CRAFT',
    progress: 0.73,
    camPos: [-1.35, 0.48, 3.15],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.28, -0.62, 0.12],
    fov: 39
  },
  {
    // SCENE 08 — COLLECTION (0.78 -> 0.88)
    // Wide spatial stage revealing the 3 luxury timepieces side by side
    name: 'COLLECTION',
    progress: 0.83,
    camPos: [0.0, 0.18, 5.1],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.15, 0.1, 0.0],
    fov: 44
  },
  {
    // SCENE 09 — FINAL HERO (0.88 -> 1.00)
    // Iconic studio master frame, primary timepiece centered in pristine light
    name: 'FINAL',
    progress: 1.0,
    camPos: [0.32, 0.18, 3.45],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.22, 0.32, -0.04],
    fov: 38
  }
];

export const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgress,
  isInspectMode,
  manualOrbit
}) => {
  const { camera, pointer } = useThree();
  const currentCamPos = useRef(new THREE.Vector3(0, -0.28, 7.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Multi-keyframe smooth interpolation
  const getInterpolatedState = (p: number) => {
    const clampedP = Math.max(0, Math.min(1, p));

    let k1 = CAMERA_STATES[0];
    let k2 = CAMERA_STATES[CAMERA_STATES.length - 1];

    for (let i = 0; i < CAMERA_STATES.length - 1; i++) {
      if (clampedP >= CAMERA_STATES[i].progress && clampedP <= CAMERA_STATES[i + 1].progress) {
        k1 = CAMERA_STATES[i];
        k2 = CAMERA_STATES[i + 1];
        break;
      }
    }

    const range = k2.progress - k1.progress;
    const factor = range > 0 ? (clampedP - k1.progress) / range : 0;

    // Smooth Hermite / Cubic S-curve interpolation
    const ease = factor * factor * (3 - 2 * factor);

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

    const watchRot = [
      THREE.MathUtils.lerp(k1.watchRot[0], k2.watchRot[0], ease),
      THREE.MathUtils.lerp(k1.watchRot[1], k2.watchRot[1], ease),
      THREE.MathUtils.lerp(k1.watchRot[2], k2.watchRot[2], ease)
    ] as [number, number, number];

    const fov = THREE.MathUtils.lerp(k1.fov, k2.fov, ease);

    return { camPos, lookAt, watchRot, fov };
  };

  useFrame((_, delta) => {
    const targetState = getInterpolatedState(scrollProgress);

    if (isInspectMode) {
      // Free 3D Orbit Inspection Mode
      const radius = 3.6 * manualOrbit.zoom;
      const phi = THREE.MathUtils.degToRad(90 - manualOrbit.y);
      const theta = THREE.MathUtils.degToRad(manualOrbit.x);

      const targetX = radius * Math.sin(phi) * Math.sin(theta);
      const targetY = radius * Math.cos(phi);
      const targetZ = radius * Math.sin(phi) * Math.cos(theta);

      currentCamPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 5);
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
    } else {
      // Cinematic Master Scroll Progress + Controlled Mouse Parallax
      const mouseParallaxX = pointer.x * 0.12;
      const mouseParallaxY = pointer.y * 0.08;

      const destPos = new THREE.Vector3(
        targetState.camPos.x + mouseParallaxX,
        targetState.camPos.y + mouseParallaxY,
        targetState.camPos.z
      );

      // Smooth lag dampening for true cinematic weight
      currentCamPos.current.lerp(destPos, delta * 3.8);
      currentLookAt.current.lerp(targetState.lookAt, delta * 3.8);
    }

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetState.fov, delta * 3.2);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
