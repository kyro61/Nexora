import React, { useMemo } from 'react';
import * as THREE from 'three';

interface WatchCaseProps {
  metalColor?: string;
  isLuminescentMode?: boolean;
  disassemblyFactor?: number;
}

export const WatchCase: React.FC<WatchCaseProps> = ({
  metalColor = '#D4AF37',
  isLuminescentMode = false,
  disassemblyFactor = 0
}) => {
  const materials = useMemo(() => {
    return {
      caseMetal: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#0d2830' : metalColor,
        metalness: 0.95,
        roughness: 0.18,
        emissive: isLuminescentMode ? '#003344' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.3 : 0
      }),
      polishedBezel: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#103842' : metalColor,
        metalness: 0.98,
        roughness: 0.08
      }),
      sapphireCrystal: new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.94,
        opacity: 1,
        transparent: true,
        roughness: 0.02,
        ior: 1.77,
        thickness: 0.18,
        reflectivity: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        specularIntensity: 1.0
      }),
      strapLeather: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#050a0d' : '#141416',
        roughness: 0.88,
        metalness: 0.05
      }),
      strapStitch: new THREE.MeshStandardMaterial({
        color: '#B08D57',
        roughness: 0.5
      })
    };
  }, [metalColor, isLuminescentMode]);

  // Exploded disassembly vector offsets
  const crystalZ = 0.85 * disassemblyFactor;
  const bezelZ = 0.65 * disassemblyFactor;
  const caseZ = 0.0;
  const casebackZ = -0.65 * disassemblyFactor;
  const strapZ = -0.25 * disassemblyFactor;

  return (
    <group name="WatchCaseArchitecture">
      {/* 01: Double-Domed Sapphire Crystal */}
      <group position={[0, 0, 0.16 + crystalZ]}>
        <mesh material={materials.sapphireCrystal}>
          <cylinderGeometry args={[0.98, 0.98, 0.03, 64]} />
        </mesh>
        {/* Crystal Bevel Rim */}
        <mesh position={[0, 0, 0.015]} material={materials.sapphireCrystal}>
          <torusGeometry args={[0.96, 0.02, 16, 64]} />
        </mesh>
      </group>

      {/* 02: Polished Mirror-Beveled Bezel */}
      <group position={[0, 0, 0.12 + bezelZ]}>
        <mesh material={materials.polishedBezel} castShadow receiveShadow>
          <cylinderGeometry args={[1.08, 1.14, 0.06, 64]} />
        </mesh>
        {/* Bezel Step */}
        <mesh position={[0, 0, 0.03]} material={materials.polishedBezel}>
          <torusGeometry args={[1.04, 0.025, 16, 64]} />
        </mesh>
      </group>

      {/* 03: Monobloc Case Middle & Lugs */}
      <group position={[0, 0, caseZ]}>
        {/* Cylindrical Main Case Body */}
        <mesh material={materials.caseMetal} castShadow receiveShadow>
          <cylinderGeometry args={[1.16, 1.16, 0.22, 64]} />
        </mesh>

        {/* 4 Ergonomic Sculpted Lugs */}
        {/* Top-Right Lug */}
        <mesh position={[0.74, 1.05, -0.04]} rotation={[0.22, 0, -0.25]} material={materials.caseMetal} castShadow>
          <boxGeometry args={[0.24, 0.62, 0.18]} />
        </mesh>
        {/* Top-Left Lug */}
        <mesh position={[-0.74, 1.05, -0.04]} rotation={[0.22, 0, 0.25]} material={materials.caseMetal} castShadow>
          <boxGeometry args={[0.24, 0.62, 0.18]} />
        </mesh>
        {/* Bottom-Right Lug */}
        <mesh position={[0.74, -1.05, -0.04]} rotation={[-0.22, 0, 0.25]} material={materials.caseMetal} castShadow>
          <boxGeometry args={[0.24, 0.62, 0.18]} />
        </mesh>
        {/* Bottom-Left Lug */}
        <mesh position={[-0.74, -1.05, -0.04]} rotation={[-0.22, 0, -0.25]} material={materials.caseMetal} castShadow>
          <boxGeometry args={[0.24, 0.62, 0.18]} />
        </mesh>

        {/* Knurled Winding Crown at 3 o'clock */}
        <group position={[1.22, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh material={materials.caseMetal} castShadow>
            <cylinderGeometry args={[0.18, 0.2, 0.12, 32]} />
          </mesh>
          {/* Fluted knurling ring */}
          <mesh position={[0, 0.05, 0]} material={materials.polishedBezel}>
            <torusGeometry args={[0.18, 0.02, 12, 32]} />
          </mesh>
        </group>
      </group>

      {/* 04: Exhibition Sapphire Caseback */}
      <group position={[0, 0, -0.12 + casebackZ]}>
        {/* Screw-Down Outer Caseback Ring */}
        <mesh material={materials.polishedBezel} castShadow receiveShadow>
          <cylinderGeometry args={[1.14, 1.08, 0.04, 64]} />
        </mesh>
        {/* Sapphire Observation Window */}
        <mesh position={[0, 0, -0.015]} material={materials.sapphireCrystal}>
          <cylinderGeometry args={[0.82, 0.82, 0.015, 48]} />
        </mesh>
      </group>

      {/* 05: Integrated Hand-Stitched Leather Strap */}
      <group position={[0, 0, strapZ]}>
        {/* Top Strap Segment (12 o'clock) */}
        <group position={[0, 1.85, -0.16]} rotation={[-0.28, 0, 0]}>
          <mesh material={materials.strapLeather} castShadow>
            <boxGeometry args={[1.22, 1.25, 0.12]} />
          </mesh>
          {/* Left Stitching */}
          <mesh position={[-0.52, 0, 0.065]} material={materials.strapStitch}>
            <boxGeometry args={[0.02, 1.18, 0.01]} />
          </mesh>
          {/* Right Stitching */}
          <mesh position={[0.52, 0, 0.065]} material={materials.strapStitch}>
            <boxGeometry args={[0.02, 1.18, 0.01]} />
          </mesh>
        </group>

        {/* Bottom Strap Segment (6 o'clock) */}
        <group position={[0, -1.85, -0.16]} rotation={[0.28, 0, 0]}>
          <mesh material={materials.strapLeather} castShadow>
            <boxGeometry args={[1.22, 1.25, 0.12]} />
          </mesh>
          {/* Left Stitching */}
          <mesh position={[-0.52, 0, 0.065]} material={materials.strapStitch}>
            <boxGeometry args={[0.02, 1.18, 0.01]} />
          </mesh>
          {/* Right Stitching */}
          <mesh position={[0.52, 0, 0.065]} material={materials.strapStitch}>
            <boxGeometry args={[0.02, 1.18, 0.01]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
