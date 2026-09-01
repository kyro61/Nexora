import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WatchModelSpec } from '../types';
import { Watch } from './Watch';
import { getInterpolatedTimelineState } from '../animations/scrollTimeline';

interface WatchModelProps {
  model: WatchModelSpec;
  scrollProgress: number;
  disassemblyProgress: number;
  isLuminescentMode?: boolean;
  manualRotation?: [number, number, number];
}

/**
 * WatchModel acts as the primary facade and container for the 3D watch.
 * It coordinates scroll-based watch orientation and passes model parameters to the modular <Watch /> system.
 */
export const WatchModel: React.FC<WatchModelProps> = ({
  model,
  scrollProgress,
  disassemblyProgress,
  isLuminescentMode = false,
  manualRotation = [0, 0, 0]
}) => {
  const rootRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!rootRef.current) return;

    const timelineState = getInterpolatedTimelineState(scrollProgress);

    // Smoothly interpolate watch rotation according to timeline keyframes
    const targetRotX = timelineState.watchRot[0] + manualRotation[0];
    const targetRotY = timelineState.watchRot[1] + manualRotation[1];
    const targetRotZ = timelineState.watchRot[2] + manualRotation[2];

    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, targetRotX, delta * 4);
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, targetRotY, delta * 4);
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, targetRotZ, delta * 4);
  });

  return (
    <group ref={rootRef} name="PrimaryWatchContainer">
      <Watch
        metalColor={model.metalColor}
        dialColor={model.dialColor}
        accentColor={model.accentColor}
        rotorColor={model.rotorColor}
        isLuminescentMode={isLuminescentMode}
        disassemblyFactor={disassemblyProgress}
      />
    </group>
  );
};
