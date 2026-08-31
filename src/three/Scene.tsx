import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Lighting } from './Lighting';
import { Environment } from './Environment';
import { WatchModel } from './WatchModel';
import { CameraRig } from './CameraRig';
import { SpatialCollection } from './SpatialCollection';
import { MechanicalAnnotations } from './MechanicalAnnotations';
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
  // During collection stage (0.78 - 0.88), hide single watch or let collection take over
  const isCollectionStage = scrollProgress >= 0.78 && scrollProgress <= 0.88;

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
        camera={{ position: [0, -0.28, 7.5], fov: 38, near: 0.1, far: 60 }}
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
          {/* Master Cinematic Camera Rig */}
          <CameraRig
            scrollProgress={scrollProgress}
            isInspectMode={isInspectMode}
            manualOrbit={manualOrbit}
          />

          {/* Master 9-Scene Studio Lighting */}
          <Lighting
            scrollProgress={scrollProgress}
            isLuminescentMode={isLuminescentMode}
          />

          {/* Ambient Micro-Atmosphere & Soft Ground Shadows */}
          <Environment scrollProgress={scrollProgress} />

          {/* Primary Interactive Watch Engine */}
          {!isCollectionStage && (
            <WatchModel
              model={model}
              scrollProgress={scrollProgress}
              disassemblyProgress={disassemblyProgress}
              isLuminescentMode={isLuminescentMode}
            />
          )}

          {/* Spatial 3D Collection Showcase (Scene 08: 0.78 -> 0.88) */}
          <SpatialCollection
            scrollProgress={scrollProgress}
            currentModelId={model.id}
            isLuminescentMode={isLuminescentMode}
          />

          {/* Spatial 3D Micro-Annotations (Scene 05 & 06) */}
          <MechanicalAnnotations scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
};
