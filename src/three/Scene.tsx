import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { WatchModel } from './WatchModel';
import { CameraRig } from './CameraRig';
import { WatchModelSpec } from '../types';

interface SceneProps {
  model: WatchModelSpec;
  scrollProgress: number;
  disassemblyProgress: number;
  isInspectMode: boolean;
  isLuminescentMode: boolean;
  manualOrbit: { x: number; y: number; zoom: number };
  onCanvasPointerDown?: (e: React.PointerEvent) => void;
  onCanvasPointerMove?: (e: React.PointerEvent) => void;
  onCanvasPointerUp?: () => void;
}

export const Scene: React.FC<SceneProps> = ({
  model,
  scrollProgress,
  disassemblyProgress,
  isInspectMode,
  isLuminescentMode,
  manualOrbit,
  onCanvasPointerDown,
  onCanvasPointerMove,
  onCanvasPointerUp
}) => {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-auto z-0"
      onPointerDown={onCanvasPointerDown}
      onPointerMove={onCanvasPointerMove}
      onPointerUp={onCanvasPointerUp}
      style={{ cursor: isInspectMode ? 'grab' : 'default' }}
    >
      <Canvas
        shadows
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        camera={{ position: [0, 0, 5.4], fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
      >
        <Suspense fallback={null}>
          <CameraRig
            scrollProgress={scrollProgress}
            isInspectMode={isInspectMode}
            manualOrbit={manualOrbit}
          />

          <Lighting
            scrollProgress={scrollProgress}
            isLuminescentMode={isLuminescentMode}
          />

          <Environment scrollProgress={scrollProgress} />

          <WatchModel
            model={model}
            scrollProgress={scrollProgress}
            disassemblyProgress={disassemblyProgress}
            isLuminescentMode={isLuminescentMode}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
