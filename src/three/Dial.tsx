import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DialProps {
  dialColor?: string;
  accentColor?: string;
  metalColor?: string;
  isLuminescentMode?: boolean;
  disassemblyFactor?: number;
}

export const Dial: React.FC<DialProps> = ({
  dialColor = '#171717',
  accentColor = '#B08D57',
  metalColor = '#D4AF37',
  isLuminescentMode = false,
  disassemblyFactor = 0
}) => {
  const hourHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Group>(null);

  // Time-driven or continuous movement of hands
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Continuous mechanical smooth sweeping hands
    if (secondHandRef.current) {
      secondHandRef.current.rotation.z = -time * 0.8;
    }
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -time * 0.8 / 60 - 0.5;
    }
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -time * 0.8 / 720 - 1.8;
    }
  });

  const materials = useMemo(() => {
    return {
      dialFace: new THREE.MeshStandardMaterial({
        color: dialColor,
        roughness: 0.35,
        metalness: 0.65
      }),
      chapterRing: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#0a1e24' : '#111113',
        roughness: 0.25,
        metalness: 0.8
      }),
      appliedIndex: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFCC' : metalColor,
        roughness: 0.15,
        metalness: 0.95,
        emissive: isLuminescentMode ? '#00FFCC' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.7 : 0
      }),
      lumeMaterial: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFCC' : '#E8F5E9',
        emissive: isLuminescentMode ? '#00FFCC' : '#4CAF50',
        emissiveIntensity: isLuminescentMode ? 1.0 : 0.05,
        roughness: 0.3
      }),
      handsGold: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFCC' : metalColor,
        roughness: 0.12,
        metalness: 0.98,
        emissive: isLuminescentMode ? '#00FFCC' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.5 : 0
      }),
      secondHand: new THREE.MeshStandardMaterial({
        color: accentColor,
        roughness: 0.2,
        metalness: 0.9
      })
    };
  }, [dialColor, accentColor, metalColor, isLuminescentMode]);

  // Exploded offsets
  const dialZ = 0.22 * disassemblyFactor;
  const handsZ = 0.44 * disassemblyFactor;

  return (
    <group name="DialAndHandsAssembly">
      {/* 01: Layered Dial Plate */}
      <group position={[0, 0, 0.08 + dialZ]}>
        {/* Main Sunburst Dial Disc */}
        <mesh material={materials.dialFace} receiveShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.02, 64]} />
        </mesh>

        {/* Outer Circular Chapter Ring with Step Relief */}
        <mesh position={[0, 0, 0.012]} material={materials.chapterRing}>
          <ringGeometry args={[0.78, 0.94, 64]} />
        </mesh>

        {/* Open Balance Aperture at 7 o'clock */}
        <group position={[0.22, -0.38, 0.015]}>
          {/* Beveled Gold Aperture Ring */}
          <mesh material={materials.appliedIndex}>
            <torusGeometry args={[0.28, 0.018, 16, 48]} />
          </mesh>
        </group>

        {/* 12 Applied Faceted Hour Markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const isCard = i % 3 === 0;
          const x = Math.sin(angle) * 0.78;
          const y = Math.cos(angle) * 0.78;
          return (
            <group key={i} position={[x, y, 0.015]} rotation={[0, 0, -angle]}>
              <mesh material={materials.appliedIndex} castShadow>
                <boxGeometry args={[isCard ? 0.05 : 0.035, isCard ? 0.16 : 0.11, 0.02]} />
              </mesh>
              {/* Lume Strip */}
              <mesh position={[0, 0, 0.012]} material={materials.lumeMaterial}>
                <boxGeometry args={[isCard ? 0.022 : 0.015, isCard ? 0.12 : 0.07, 0.005]} />
              </mesh>
            </group>
          );
        })}

        {/* 60 Sub-Minute Tick Markers */}
        {Array.from({ length: 60 }).map((_, m) => {
          if (m % 5 === 0) return null; // Hour marker already exists
          const angle = (m / 60) * Math.PI * 2;
          const x = Math.sin(angle) * 0.88;
          const y = Math.cos(angle) * 0.88;
          return (
            <mesh key={`m-${m}`} position={[x, y, 0.012]} rotation={[0, 0, -angle]}>
              <boxGeometry args={[0.01, 0.035, 0.005]} />
              <meshBasicMaterial color={isLuminescentMode ? '#00FFCC' : '#777777'} />
            </mesh>
          );
        })}

        {/* Sub-Dial at 12 o'clock (Power Reserve Gauge) */}
        <group position={[0, 0.38, 0.014]}>
          <mesh material={materials.chapterRing}>
            <circleGeometry args={[0.22, 32]} />
          </mesh>
          <mesh material={materials.appliedIndex}>
            <ringGeometry args={[0.21, 0.22, 32]} />
          </mesh>
          {/* Indicator Hand */}
          <mesh rotation={[0, 0, 0.6]} position={[0, 0, 0.008]} material={materials.appliedIndex}>
            <boxGeometry args={[0.015, 0.14, 0.005]} />
          </mesh>
        </group>
      </group>

      {/* 02: Faceted Dauphine Hands Assembly */}
      <group position={[0, 0, 0.11 + handsZ]}>
        {/* Central Hand Pinion Cap */}
        <mesh position={[0, 0, 0.04]} material={materials.handsGold}>
          <cylinderGeometry args={[0.045, 0.045, 0.03, 24]} />
        </mesh>

        {/* Hour Hand (Faceted Dauphine) */}
        <group ref={hourHandRef} position={[0, 0, 0.015]}>
          <mesh position={[0, 0.24, 0]} material={materials.handsGold} castShadow>
            <coneGeometry args={[0.04, 0.48, 4]} />
          </mesh>
          <mesh position={[0, 0.22, 0.006]} material={materials.lumeMaterial}>
            <boxGeometry args={[0.014, 0.26, 0.004]} />
          </mesh>
        </group>

        {/* Minute Hand (Elongated Faceted Dauphine) */}
        <group ref={minuteHandRef} position={[0, 0, 0.025]}>
          <mesh position={[0, 0.36, 0]} material={materials.handsGold} castShadow>
            <coneGeometry args={[0.036, 0.72, 4]} />
          </mesh>
          <mesh position={[0, 0.34, 0.006]} material={materials.lumeMaterial}>
            <boxGeometry args={[0.012, 0.42, 0.004]} />
          </mesh>
        </group>

        {/* Sweeping Seconds Hand */}
        <group ref={secondHandRef} position={[0, 0, 0.035]}>
          <mesh position={[0, 0.38, 0]} material={materials.secondHand} castShadow>
            <boxGeometry args={[0.01, 0.88, 0.006]} />
          </mesh>
          {/* Counterweight */}
          <mesh position={[0, -0.16, 0]} material={materials.secondHand}>
            <boxGeometry args={[0.018, 0.16, 0.006]} />
          </mesh>
          <mesh position={[0, -0.22, 0]} material={materials.secondHand}>
            <circleGeometry args={[0.035, 16]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
