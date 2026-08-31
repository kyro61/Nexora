import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WATCH_COLLECTION } from '../data/watchData';
import { WatchModel } from './WatchModel';

interface SpatialCollectionProps {
  scrollProgress: number;
  currentModelId: string;
  onSelectModel?: (id: string) => void;
  isLuminescentMode?: boolean;
}

export const SpatialCollection: React.FC<SpatialCollectionProps> = ({
  scrollProgress,
  currentModelId,
  isLuminescentMode = false
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Active in Scene 08: 0.78 -> 0.88
  const isCollectionPhase = scrollProgress >= 0.76 && scrollProgress <= 0.91;

  // Compute smooth visibility factor
  let visibility = 0;
  if (scrollProgress >= 0.76 && scrollProgress < 0.80) {
    visibility = (scrollProgress - 0.76) / 0.04;
  } else if (scrollProgress >= 0.80 && scrollProgress <= 0.86) {
    visibility = 1.0;
  } else if (scrollProgress > 0.86 && scrollProgress <= 0.91) {
    visibility = 1.0 - (scrollProgress - 0.86) / 0.05;
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetScale = isCollectionPhase ? Math.max(0.001, visibility) : 0.0001;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);
    
    // Slow subtle rotation for side watches
    const t = state.clock.elapsedTime;
    const leftWatch = groupRef.current.getObjectByName('CollectionWatch-aurelis');
    const rightWatch = groupRef.current.getObjectByName('CollectionWatch-vantage');

    if (leftWatch) {
      leftWatch.rotation.y = THREE.MathUtils.lerp(leftWatch.rotation.y, -0.25 + Math.sin(t * 0.5) * 0.05, delta * 2);
    }
    if (rightWatch) {
      rightWatch.rotation.y = THREE.MathUtils.lerp(rightWatch.rotation.y, 0.25 + Math.sin(t * 0.5 + 1) * 0.05, delta * 2);
    }
  });

  if (!isCollectionPhase && visibility <= 0.001) return null;

  const aurelis = WATCH_COLLECTION.find((w) => w.id === 'aurelis') || WATCH_COLLECTION[0];
  const obsidian = WATCH_COLLECTION.find((w) => w.id === 'obsidian') || WATCH_COLLECTION[1];
  const vantage = WATCH_COLLECTION.find((w) => w.id === 'vantage') || WATCH_COLLECTION[2];

  return (
    <group ref={groupRef} name="SpatialCollectionStage">
      {/* Left: Aurelis 18k Rose Gold */}
      <group
        name="CollectionWatch-aurelis"
        position={[-2.4, 0, -0.4]}
        rotation={[0.15, -0.28, 0.05]}
      >
        <WatchModel
          model={aurelis}
          scrollProgress={scrollProgress}
          disassemblyProgress={0}
          isLuminescentMode={isLuminescentMode}
        />
      </group>

      {/* Center: Obsidian DLC Stealth Titanium */}
      <group
        name="CollectionWatch-obsidian"
        position={[0.0, 0, 0.2]}
        rotation={[0.12, 0.0, 0.0]}
      >
        <WatchModel
          model={obsidian}
          scrollProgress={scrollProgress}
          disassemblyProgress={0}
          isLuminescentMode={isLuminescentMode}
        />
      </group>

      {/* Right: Vantage 904L High-Frequency Chronometer */}
      <group
        name="CollectionWatch-vantage"
        position={[2.4, 0, -0.4]}
        rotation={[0.15, 0.28, -0.05]}
      >
        <WatchModel
          model={vantage}
          scrollProgress={scrollProgress}
          disassemblyProgress={0}
          isLuminescentMode={isLuminescentMode}
        />
      </group>
    </group>
  );
};
