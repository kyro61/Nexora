/**
 * NOXORA Master Scroll & Camera Timeline Engine (0.00 -> 1.00)
 * 
 * CHAPTER 01 — THE VOID           (0.00 -> 0.08)
 * CHAPTER 02 — REVEAL             (0.08 -> 0.18)
 * CHAPTER 03 — ORBIT              (0.18 -> 0.30)
 * CHAPTER 04 — ENTER THE WATCH    (0.30 -> 0.42)
 * CHAPTER 05 — INSIDE MOVEMENT    (0.42 -> 0.55)
 * CHAPTER 06 — MACRO JOURNEY      (0.55 -> 0.62)
 * CHAPTER 07 — EXPLODED VIEW      (0.62 -> 0.72)
 * CHAPTER 08 — RECONSTRUCTION     (0.72 -> 0.80)
 * CHAPTER 09 — COLLECTION         (0.80 -> 0.90)
 * CHAPTER 10 — FINAL HERO         (0.90 -> 1.00)
 */

import * as THREE from 'three';

export type CameraChapter =
  | 'VOID'
  | 'REVEAL'
  | 'ORBIT'
  | 'CRYSTAL'
  | 'MOVEMENT'
  | 'MACRO'
  | 'EXPLODED'
  | 'CRAFT'
  | 'COLLECTION'
  | 'FINAL';

export interface CameraKeyframe {
  chapter: CameraChapter;
  progress: number;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  watchRot: [number, number, number];
  fov: number;
  exposure: number;
}

export const MASTER_CAMERA_KEYFRAMES: CameraKeyframe[] = [
  {
    // CHAPTER 01 — THE VOID (0.00 -> 0.08)
    // Far away silhouette in deep atmospheric void, below eye level
    chapter: 'VOID',
    progress: 0.0,
    camPos: [0.0, -0.3, 8.0],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.08, -0.12, 0.02],
    fov: 36,
    exposure: 0.2
  },
  {
    // CHAPTER 02 — REVEAL (0.08 -> 0.18)
    // Camera approaches, watch rotates ~25 deg, lighting sweeps across metal
    chapter: 'REVEAL',
    progress: 0.13,
    camPos: [0.6, 0.2, 4.2],
    lookAt: [0.0, 0.04, 0.0],
    watchRot: [0.22, 0.44, -0.06],
    fov: 39,
    exposure: 1.1
  },
  {
    // CHAPTER 03 — ORBIT (0.18 -> 0.30)
    // Cinematic orbit: side profile, crown, lugs, bezel thickness, crystal
    chapter: 'ORBIT',
    progress: 0.24,
    camPos: [2.8, -0.1, 2.0],
    lookAt: [0.2, 0.0, 0.0],
    watchRot: [0.06, 1.25, 0.0],
    fov: 37,
    exposure: 1.2
  },
  {
    // CHAPTER 04 — ENTER THE WATCH (0.30 -> 0.42)
    // Approaches dial, sapphire crystal fills viewport, camera physically penetrates
    chapter: 'CRYSTAL',
    progress: 0.36,
    camPos: [0.08, 0.12, 1.25],
    lookAt: [0.0, 0.02, 0.08],
    watchRot: [-0.12, 0.1, 0.03],
    fov: 44,
    exposure: 1.25
  },
  {
    // CHAPTER 05 — INSIDE THE MOVEMENT (0.42 -> 0.55)
    // Inside calibre NX-901: gears rotate, balance oscillates, jewels glisten
    chapter: 'MOVEMENT',
    progress: 0.485,
    camPos: [0.16, -0.24, 0.88],
    lookAt: [0.16, -0.3, 0.06],
    watchRot: [0.03, 0.0, 0.0],
    fov: 40,
    exposure: 1.3
  },
  {
    // CHAPTER 06 — MACRO JOURNEY (0.55 -> 0.62)
    // Microscopic navigation past gear teeth, jewels, springs, bridges, screws
    chapter: 'MACRO',
    progress: 0.585,
    camPos: [-0.22, 0.18, 0.72],
    lookAt: [-0.05, 0.12, 0.0],
    watchRot: [0.15, -0.3, 0.08],
    fov: 46,
    exposure: 1.35
  },
  {
    // CHAPTER 07 — EXPLODED VIEW (0.62 -> 0.72)
    // Camera pulls backward. Watch physically disassembles into separate layers
    chapter: 'EXPLODED',
    progress: 0.67,
    camPos: [1.35, 1.2, 4.1],
    lookAt: [0.0, 0.25, 0.0],
    watchRot: [0.44, 0.36, -0.08],
    fov: 45,
    exposure: 1.2
  },
  {
    // CHAPTER 08 — RECONSTRUCTION (0.72 -> 0.80)
    // Watch reconstructs smoothly, warm golden hour atelier lighting
    chapter: 'CRAFT',
    progress: 0.76,
    camPos: [-1.25, 0.45, 3.2],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.26, -0.58, 0.1],
    fov: 39,
    exposure: 1.15
  },
  {
    // CHAPTER 09 — COLLECTION (0.80 -> 0.90)
    // Wide stage revealing 4 luxury timepieces in 3D (Aurelis, Obsidian, Vantage, Éclat)
    chapter: 'COLLECTION',
    progress: 0.85,
    camPos: [0.0, 0.16, 5.2],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.14, 0.08, 0.0],
    fov: 44,
    exposure: 1.2
  },
  {
    // CHAPTER 10 — FINAL HERO (0.90 -> 1.00)
    // Deep luxury darkness surrounds watch, iconic commercial finale
    chapter: 'FINAL',
    progress: 1.0,
    camPos: [0.3, 0.18, 3.4],
    lookAt: [0.0, 0.0, 0.0],
    watchRot: [0.2, 0.3, -0.04],
    fov: 38,
    exposure: 1.15
  }
];

/**
 * Calculates smooth interpolated camera and watch state at any scroll progress p (0 -> 1)
 */
export function getInterpolatedTimelineState(p: number) {
  const clampedP = Math.max(0, Math.min(1, p));

  let k1 = MASTER_CAMERA_KEYFRAMES[0];
  let k2技巧 = MASTER_CAMERA_KEYFRAMES[MASTER_CAMERA_KEYFRAMES.length - 1];

  for (let i技巧 = 0; i技巧 < MASTER_CAMERA_KEYFRAMES.length - 1; i技巧++) {
    if (clampedP >= MASTER_CAMERA_KEYFRAMES[i技巧].progress && clampedP <= MASTER_CAMERA_KEYFRAMES[i技巧 + 1].progress) {
      k1 = MASTER_CAMERA_KEYFRAMES[i技巧];
      k2技巧 = MASTER_CAMERA_KEYFRAMES[i技巧 + 1];
      break;
    }
  }

  const range = k2技巧.progress - k1.progress;
  const factor = range > 0 ? (clampedP - k1.progress) / range : 0;

  // Smooth Hermite Cubic Easing: S-curve (3f^2 - 2f^3)
  const ease = factor * factor * (3 - 2 * factor);

  const camPos = new THREE.Vector3(
    THREE.MathUtils.lerp(k1.camPos[0], k2技巧.camPos[0], ease),
    THREE.MathUtils.lerp(k1.camPos[1], k2技巧.camPos[1], ease),
    THREE.MathUtils.lerp(k1.camPos[2], k2技巧.camPos[2], ease)
  );

  const lookAt = new THREE.Vector3(
    THREE.MathUtils.lerp(k1.lookAt[0], k2技巧.lookAt[0], ease),
    THREE.MathUtils.lerp(k1.lookAt[1], k2技巧.lookAt[1], ease),
    THREE.MathUtils.lerp(k1.lookAt[2], k2技巧.lookAt[2], ease)
  );

  const watchRot = [
    THREE.MathUtils.lerp(k1.watchRot[0], k2技巧.watchRot[0], ease),
    THREE.MathUtils.lerp(k1.watchRot[1], k2技巧.watchRot[1], ease),
    THREE.MathUtils.lerp(k1.watchRot[2], k2技巧.watchRot[2], ease)
  ] as [number, number, number];

  const fov = THREE.MathUtils.lerp(k1.fov, k2技巧.fov, ease);
  const exposure = THREE.MathUtils.lerp(k1.exposure, k2技巧.exposure, ease);

  return {
    chapter: k1.chapter,
    camPos,
    lookAt,
    watchRot,
    fov,
    exposure,
    rawProgress: clampedP
  };
}

/**
 * Calculates the disassembly separation progress for the Exploded View (Chapter 07)
 * Starts separating at 0.62, reaches maximum at 0.68, and smoothly returns by 0.76 (Chapter 08 Reconstruction)
 */
export function getExplodedDisassemblyProgress(p: number): number {
  if (p < 0.61 || p > 0.77) return 0;
  
  if (p >= 0.61 && p <= 0.67) {
    // Disassembling outwards
    const f = (p - 0.61) / 0.06;
    return f * f * (3 - 2 * f);
  } else if (p > 0.67 && p <= 0.71) {
    // Peak hold
    return 1.0;
  } else if (p > 0.71 && p <= 0.77) {
    // Reconstructing inwards
    const f = 1 - (p - 0.71) / 0.06;
    return f * f * (3 - 2 * f);
  }
  return 0;
}
