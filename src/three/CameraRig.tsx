import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { getInterpolatedTimelineState } from '../animations/scrollTimeline';

interface CameraRigProps {
  scrollProgress: number;
  isInspectMode: boolean;
  manualOrbit: { x: number; y: number; zoom: number };
}

export const CameraRig: React.FC<CameraRigProps> = ({
  scrollProgress,
  isInspectMode,
  manualOrbit
}) => {
  const { camera, pointer } = useThree();
  const currentCamPos = useRef(new THREE.Vector3(0, -0.3, 8.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    const timelineState = getInterpolatedTimelineState(scrollProgress);

    if (isInspectMode) {
      // Free 3D User Orbit Inspection Mode
      const radius = 3.6 * manualOrbit.zoom;
      const phi = THREE.MathUtils.degToRad(90 - manualOrbit.y);
      const theta = THREE.MathUtils.degToRad(manualOrbit.x);

      const targetX = radius * Math.sin(phi) * Math.sin(theta);
      const targetY = radius * Math.cos(phi);
      const targetZ = radius * Math.sin(phi) * Math.cos(theta);

      currentCamPos.current.lerp(new THREE.Vector3(targetX, targetY, targetZ), delta * 5);
      currentLookAt.current.lerp(new THREE.Vector3(0, 0, 0), delta * 5);
    } else {
      // Master Scroll-Driven Cinematic Camera Tracking + Controlled Subtle Parallax
      const mouseParallaxX = pointer.x * 0.1;
      const mouseParallaxY = pointer.y * 0.06;

      const destPos = new THREE.Vector3(
        timelineState.camPos.x + mouseParallaxX,
        timelineState.camPos.y + mouseParallaxY,
        timelineState.camPos.z
      );

      // Smooth lag dampening for genuine optical mass & cinematic weight
      currentCamPos.current.lerp(destPos, delta * 3.8);
      currentLookAt.current.lerp(timelineState.lookAt, delta * 3.8);
    }

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);

    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, timelineState.fov, delta * 3.2);
      camera.updateProjectionMatrix();
    }
  });

  return null;
};
