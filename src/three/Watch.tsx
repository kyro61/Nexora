import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WatchCase } from './WatchCase';
import { Dial } from './Dial';
import { Movement } from './Movement';

export interface WatchProps {
  metalColor?: string;
  dialColor?: string;
  accentColor?: string;
  rotorColor?: string;
  isLuminescentMode?: boolean;
  disassemblyFactor?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: number;
  isInteractive?: boolean;
}

export const Watch: React.FC<WatchProps> = ({
  metalColor = '#D4AF37',
  dialColor = '#171717',
  accentColor = '#B08D57',
  rotorColor = '#BFA068',
  isLuminescentMode = false,
  disassemblyFactor = 0,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  scale = 1,
  isInteractive = false
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && !isInteractive) {
      // Subtle organic breathing float
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.03;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      scale={[scale, scale, scale]}
      name="NoxoraWatchManufacture"
    >
      {/* 01: Case, Bezel, Crystal, Crown, Strap & Caseback */}
      <WatchCase
        metalColor={metalColor}
        isLuminescentMode={isLuminescentMode}
        disassemblyFactor={disassemblyFactor}
      />

      {/* 02: Layered Dial & Dauphine Hands */}
      <Dial
        dialColor={dialColor}
        accentColor={accentColor}
        metalColor={metalColor}
        isLuminescentMode={isLuminescentMode}
        disassemblyFactor={disassemblyFactor}
      />

      {/* 03: Manufacture Calibre Movement (Gears, Regulating Organ, Bridges, Rotor) */}
      <Movement
        metalColor={metalColor}
        rotorColor={rotorColor}
        isLuminescentMode={isLuminescentMode}
        disassemblyFactor={disassemblyFactor}
      />
    </group>
  );
};
