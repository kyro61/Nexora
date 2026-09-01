import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WATCH_COLLECTION } from '../data/watchData';
import { Watch } from './Watch';

interface SpatialCollectionProps {
  scrollProgress: number;
  currentModelId?: string;
  isLuminescentMode?: boolean;
}

export const SpatialCollection: React.FC<SpatialCollectionProps> = ({
  scrollProgress,
  isLuminescentMode = false
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Active in Chapter 09: 0.79 -> 0.91
  const isCollectionPhase = scrollProgress >= 0.78 && scrollProgress <= 0.92;

  // Compute smooth visibility factor
  let visibility = 0;
  if (scrollProgress >= 0.78 && scrollProgress < 0.82) {
    visibility = (scrollProgress - 0.78) / 0.04;
  } else if (scrollProgress >= 0.82 && scrollProgress <= 0.88) {
    visibility = 1.0;
  } else if (scrollProgress > 0.88 && scrollProgress <= 0.92) {
    visibility = 1.0 - (scrollProgress - 0.88) / 0.04;
  }

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetScale = isCollectionPhase ? Math.max(0.001, visibility) : 0.0001;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      delta * 6
    );

    // Subtle individual spatial movements
    const t = state.clock.elapsedTime;
    const watch1 = groupRef.current.getObjectByName('Collection-aurelis');
    const watch2 = groupRef.current.getObjectByName('Collection-obsidian');
    const watch3 = groupRef.current.getObjectByName('Collection-vantage');
    const watch4 = groupRef.current.getObjectByName('Collection-eclat');

    if (watch1) watch1.rotation.y = -0.3 + Math.sin(t * 0.6) * 0.05;
    if (watch2) watch2.rotation.y = -0.1 + Math.sin(t * 0.6 + 1.2) * 0.04;
    if (watch3) watch3.rotation.y = 0.15 + Math.sin(t * 0.6 + 2.4) * 0.05;
    if (watch4) watch4.rotation.y = 0.35 + Math.sin(t * 0.6 + 3.6) * 0.06;
  });

  if (!isCollectionPhase && visibility <= 0.001) return null;

  const aurelis = WATCH_COLLECTION.find((w) => w.id === 'aurelis') || WATCH_COLLECTION[0];
  const obsidian = WATCH_COLLECTION.find((w) => w.id === 'obsidian') || WATCH_COLLECTION[1];
  const vantage = WATCH_COLLECTION.find((w) => w.id === 'vantage') || WATCH_COLLECTION[2];
  const eclat = WATCH_COLLECTION.find((w) => w.id === 'eclat') || WATCH_COLLECTION[3];

  return (
    <group ref={groupRef} name="SpatialCollectionStage">
      {/* 01: NOXORA AURELIS (Far Left) */}
      <group
        name="Collection-aurelis"
        position={[-3.3, 0.1, -0.6]}
        rotation={[0.15, -0.3, 0.04]}
      >
        <Watch
          metalColor={aurelis.metalColor}
          dialColor={aurelis.dialColor}
          accentColor={aurelis.accentColor}
          rotorColor={aurelis.rotorColor}
          scale={0.88}
          isLuminescentMode={isLuminescentMode}
        />
      </group>

      {/* 02: NOXORA OBSIDIAN (Mid Left) */}
      <group
        name="Collection-obsidian"
        position={[-1.1, 0.0, 0.1]}
        rotation={[0.12, -0.1, 0.0]}
      >
        <Watch
          metalColor={obsidian.metalColor}
          dialColor={obsidian.dialColor}
          accentColor={obsidian.accentColor}
          rotorColor={obsidian.rotorColor}
          scale={0.92}
          isLuminescentMode={isLuminescentMode}
        />
      </group>

      {/* 03: NOXORA VANTAGE (Mid Right) */}
      <group
        name="Collection-vantage"
        position={[1.1, 0.0, 0.1]}
        rotation={[0.12, 0.15, 0.0]}
      >
        <Watch
          metalColor={vantage.metalColor}
          dialColor={vantage.dialColor}
          accentColor={vantage.accentColor}
          rotorColor={vantage.rotorColor}
          scale={0.92}
          isLuminescentMode={isLuminescentMode}
        />
      </group>

      {/* 04: NOXORA ÉCLAT (Far Right) */}
      <group
        name="Collection-eclat"
        position={[3.3, 0.1, -0.6]}
        rotation={[0.15, 0.35, -0.04]}
      >
        <Watch
          metalColor={eclat.metalColor}
          dialColor={eclat.dialColor}
          accentColor={eclat.accentColor}
          rotorColor={eclat.rotorColor}
          scale={0.88}
          isLuminescentMode={isLuminescentMode}
        />
      </group>
    </group>
  );
};
