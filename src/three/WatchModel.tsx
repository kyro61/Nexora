import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { WatchModelSpec } from '../types';
import { WatchMovement } from './WatchMovement';

interface WatchModelProps {
  model: WatchModelSpec;
  scrollProgress: number;
  disassemblyProgress: number;
  isLuminescentMode?: boolean;
  manualRotation?: [number, number, number];
}

export const WatchModel: React.FC<WatchModelProps> = ({
  model,
  scrollProgress,
  disassemblyProgress,
  isLuminescentMode = false,
  manualRotation = [0, 0, 0]
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const secondHandRef = useRef<THREE.Group>(null);
  const minuteHandRef = useRef<THREE.Group>(null);
  const hourHandRef = useRef<THREE.Group>(null);

  // High-End Luxury PBR Materials
  const materials = useMemo(() => {
    const isEclat = model.id === 'eclat';
    const isObsidian = model.id === 'obsidian';

    return {
      // Primary Case Metal (Polished + Brushed)
      caseMetal: new THREE.MeshStandardMaterial({
        color: model.metalColor,
        metalness: isEclat ? 0.4 : 0.94,
        roughness: isObsidian ? 0.35 : 0.16,
        roughnessMap: null,
        envMapIntensity: 1.6,
        name: 'caseMetal'
      }),

      // Mirror Chamfer Accents
      mirrorBevel: new THREE.MeshStandardMaterial({
        color: model.metalColor,
        metalness: 0.98,
        roughness: 0.04,
        name: 'mirrorBevel'
      }),

      // Sapphire Crystal (Physical Refraction & Transmission)
      sapphireCrystal: new THREE.MeshPhysicalMaterial({
        color: '#FFFFFF',
        transmission: 0.97,
        opacity: 1,
        transparent: true,
        roughness: 0.02,
        ior: 1.77, // Real Corundum Sapphire index
        thickness: 0.25,
        specularIntensity: 1.4,
        specularColor: '#EBF6FF',
        name: 'sapphireCrystal'
      }),

      // Ceramic Bezel
      ceramicBezel: new THREE.MeshStandardMaterial({
        color: isObsidian ? '#0d0e10' : '#141416',
        metalness: 0.85,
        roughness: 0.08,
        name: 'ceramicBezel'
      }),

      // Dial Surface
      dialBase: new THREE.MeshStandardMaterial({
        color: model.dialColor,
        metalness: isObsidian ? 0.3 : 0.75,
        roughness: isObsidian ? 0.6 : 0.28,
        name: 'dialBase'
      }),

      // Faceted Indices (18k Gold or Rhodium)
      goldIndices: new THREE.MeshStandardMaterial({
        color: model.accentColor,
        metalness: 0.96,
        roughness: 0.12,
        name: 'goldIndices'
      }),

      // Super-LumiNova Grade X1 Luminescent Inlay
      lumeMaterial: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFAA' : '#E8F5E9',
        emissive: isLuminescentMode ? '#00FFAA' : '#001A0E',
        emissiveIntensity: isLuminescentMode ? 2.5 : 0.05,
        roughness: 0.3,
        name: 'lumeMaterial'
      }),

      // Hands (Polished with Center Lume)
      handMetal: new THREE.MeshStandardMaterial({
        color: model.accentColor,
        metalness: 0.98,
        roughness: 0.08,
        name: 'handMetal'
      }),

      // Sweeping Chronograph Seconds Hand (Accent)
      secondsHandMetal: new THREE.MeshStandardMaterial({
        color: model.id === 'vantage' ? '#3B82F6' : model.accentColor,
        metalness: 0.95,
        roughness: 0.1,
        name: 'secondsHandMetal'
      }),

      // Fine Leather / Metal Strap
      strapMaterial: new THREE.MeshStandardMaterial({
        color: isObsidian ? '#121316' : model.id === 'vantage' ? model.metalColor : '#181512',
        metalness: model.id === 'vantage' ? 0.92 : 0.1,
        roughness: model.id === 'vantage' ? 0.25 : 0.72,
        name: 'strapMaterial'
      }),

      // Strap Stitching Accent
      stitchMaterial: new THREE.MeshBasicMaterial({
        color: '#8A7B67',
        name: 'stitchMaterial'
      })
    };
  }, [model, isLuminescentMode]);

  // Smooth Sweeping Clock Movement & Idle Micro Motion
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Sweeping seconds hand (smooth 8 beats per second motion)
    if (secondHandRef.current) {
      // 1 revolution per 60 seconds
      secondHandRef.current.rotation.z = -t * (Math.PI * 2 / 60) * 1.5;
    }

    // Minute Hand (advances with time)
    if (minuteHandRef.current) {
      minuteHandRef.current.rotation.z = -t * (Math.PI * 2 / 3600) * 1.5 - (Math.PI * 0.35);
    }

    // Hour Hand
    if (hourHandRef.current) {
      hourHandRef.current.rotation.z = -t * (Math.PI * 2 / 43200) * 1.5 - (Math.PI * 0.7);
    }
  });

  // Disassembly Exploded View Vertical Offsets
  const d = disassemblyProgress; // 0.0 to 1.0
  const crystalY = d * 1.6;
  const bezelY = d * 1.1;
  const dialY = d * 0.55;
  const handsY = d * 0.75;
  const caseBackY = -d * 0.9;
  const strapY = -d * 0.4;

  return (
    <group
      ref={rootRef}
      rotation={[manualRotation[0], manualRotation[1], manualRotation[2]]}
      name="NoxoraMasterWatch"
    >
      {/* ================================================================ */}
      {/* 1. FRONT SAPPHIRE CRYSTAL (Double Domed)                          */}
      {/* ================================================================ */}
      <group position={[0, 0, 0.38 + crystalY]}>
        <mesh material={materials.sapphireCrystal} castShadow receiveShadow>
          <cylinderGeometry args={[1.22, 1.22, 0.06, 64]} />
        </mesh>
        {/* Anti-reflective blue/violet sheen border */}
        <mesh position={[0, 0, 0.032]}>
          <ringGeometry args={[1.18, 1.22, 64]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* ================================================================ */}
      {/* 2. CERACHROM / POLISHED BEZEL RING                                */}
      {/* ================================================================ */}
      <group position={[0, 0, 0.32 + bezelY]}>
        {/* Outer Bezel Ring */}
        <mesh material={materials.ceramicBezel} castShadow receiveShadow>
          <torusGeometry args={[1.26, 0.09, 24, 64]} />
        </mesh>

        {/* Tachymeter / Minute Marker Etchings */}
        {[...Array(12)].map((_, idx) => {
          const angle = (idx * Math.PI * 2) / 12;
          return (
            <mesh
              key={idx}
              position={[Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0.05]}
              rotation={[0, 0, angle + Math.PI / 2]}
              material={materials.goldIndices}
            >
              <boxGeometry args={[0.02, 0.06, 0.01]} />
            </mesh>
          );
        })}
      </group>

      {/* ================================================================ */}
      {/* 3. MULTI-LAYERED DIAL ARCHITECTURE                                */}
      {/* ================================================================ */}
      <group position={[0, 0, 0.18 + dialY]}>
        {/* Main Dial Plate */}
        <mesh material={materials.dialBase} receiveShadow castShadow>
          <cylinderGeometry args={[1.18, 1.18, 0.04, 64]} />
        </mesh>

        {/* Outer Minute Track Ring */}
        <mesh position={[0, 0, 0.022]} material={materials.mirrorBevel}>
          <ringGeometry args={[1.08, 1.16, 64]} />
        </mesh>

        {/* 60 Minute Track Micro-Hashes */}
        {[...Array(60)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 60;
          const isMajor = i % 5 === 0;
          return (
            <mesh
              key={`hash-${i}`}
              position={[Math.cos(angle) * 1.12, Math.sin(angle) * 1.12, 0.025]}
              rotation={[0, 0, angle + Math.PI / 2]}
              material={isMajor ? materials.goldIndices : materials.caseMetal}
            >
              <boxGeometry args={[isMajor ? 0.015 : 0.008, isMajor ? 0.05 : 0.025, 0.005]} />
            </mesh>
          );
        })}

        {/* 12 Applied Faceted Hour Indices with Super-LumiNova */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const isDouble12 = i === 3; // 12 o'clock (Three.js coordinates)
          return (
            <group
              key={`hour-${i}`}
              position={[Math.cos(angle) * 0.94, Math.sin(angle) * 0.94, 0.028]}
              rotation={[0, 0, angle + Math.PI / 2]}
            >
              {/* Gold Index Frame */}
              <mesh material={materials.goldIndices} castShadow>
                <boxGeometry args={[isDouble12 ? 0.07 : 0.05, 0.18, 0.02]} />
              </mesh>
              {/* Luminescent Center Insert */}
              <mesh position={[0, 0, 0.012]} material={materials.lumeMaterial}>
                <boxGeometry args={[isDouble12 ? 0.04 : 0.025, 0.14, 0.01]} />
              </mesh>
            </group>
          );
        })}

        {/* Openworked Balance Aperture (Exposing the Glucydur Heartbeat) */}
        <mesh position={[0.3, -0.38, 0.025]}>
          <ringGeometry args={[0.26, 0.32, 36]} />
          <meshStandardMaterial color={model.accentColor} metalness={0.96} roughness={0.15} />
        </mesh>

        {/* Embossed Brand Logo & Geneva Inscription */}
        <group position={[0, 0.5, 0.025]}>
          <mesh material={materials.goldIndices}>
            <boxGeometry args={[0.34, 0.045, 0.008]} />
          </mesh>
          <mesh position={[0, -0.06, 0]} material={materials.goldIndices}>
            <boxGeometry args={[0.2, 0.02, 0.005]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================ */}
      {/* 4. FACETED HANDS & SWEEPING SECONDS                               */}
      {/* ================================================================ */}
      <group position={[0, 0, 0.28 + handsY]}>
        {/* Central Hand Arbor Cap */}
        <mesh position={[0, 0, 0.06]} material={materials.goldIndices}>
          <cylinderGeometry args={[0.06, 0.06, 0.04, 24]} />
        </mesh>

        {/* Hour Hand */}
        <group ref={hourHandRef} position={[0, 0, 0.02]}>
          <mesh position={[0, 0.28, 0]} material={materials.handMetal} castShadow>
            <boxGeometry args={[0.06, 0.56, 0.015]} />
          </mesh>
          {/* Hour Lume Strip */}
          <mesh position={[0, 0.32, 0.01]} material={materials.lumeMaterial}>
            <boxGeometry args={[0.025, 0.38, 0.01]} />
          </mesh>
          {/* Triangular Diamond Tip */}
          <mesh position={[0, 0.58, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.handMetal}>
            <boxGeometry args={[0.042, 0.042, 0.015]} />
          </mesh>
        </group>

        {/* Minute Hand */}
        <group ref={minuteHandRef} position={[0, 0, 0.035]}>
          <mesh position={[0, 0.42, 0]} material={materials.handMetal} castShadow>
            <boxGeometry args={[0.05, 0.84, 0.015]} />
          </mesh>
          {/* Minute Lume Strip */}
          <mesh position={[0, 0.46, 0.01]} material={materials.lumeMaterial}>
            <boxGeometry args={[0.02, 0.62, 0.01]} />
          </mesh>
          <mesh position={[0, 0.86, 0]} rotation={[0, 0, Math.PI / 4]} material={materials.handMetal}>
            <boxGeometry args={[0.035, 0.035, 0.015]} />
          </mesh>
        </group>

        {/* Sweeping Needle Seconds Hand */}
        <group ref={secondHandRef} position={[0, 0, 0.05]}>
          {/* Needle Blade */}
          <mesh position={[0, 0.48, 0]} material={materials.secondsHandMetal} castShadow>
            <boxGeometry args={[0.016, 1.02, 0.01]} />
          </mesh>
          {/* Counterbalance Tail */}
          <mesh position={[0, -0.22, 0]} material={materials.secondsHandMetal}>
            <boxGeometry args={[0.024, 0.44, 0.01]} />
          </mesh>
          {/* Open Skeletonized Counterweight Ring */}
          <mesh position={[0, -0.26, 0]} material={materials.secondsHandMetal}>
            <torusGeometry args={[0.05, 0.012, 12, 24]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================ */}
      {/* 5. IN-HOUSE CALIBRE NX-901 MOVEMENT ENGINE                        */}
      {/* ================================================================ */}
      <WatchMovement
        model={model}
        disassemblyProgress={disassemblyProgress}
        isLuminescentMode={isLuminescentMode}
      />

      {/* ================================================================ */}
      {/* 6. PRIMARY TIMEPIECE CASE, LUGS & SCREWED CROWN                   */}
      {/* ================================================================ */}
      <group position={[0, 0, 0]}>
        {/* Main Middle Case Body */}
        <mesh material={materials.caseMetal} castShadow receiveShadow>
          <cylinderGeometry args={[1.32, 1.34, 0.38, 64]} />
        </mesh>

        {/* Polished Mirror Case Chamfer Ring */}
        <mesh position={[0, 0, 0.19]} material={materials.mirrorBevel}>
          <torusGeometry args={[1.33, 0.03, 16, 64]} />
        </mesh>
        <mesh position={[0, 0, -0.19]} material={materials.mirrorBevel}>
          <torusGeometry args={[1.33, 0.03, 16, 64]} />
        </mesh>

        {/* Sculpted Ergonomic Lugs (Top & Bottom Pairs) */}
        {[
          // Top Left
          { pos: [-0.85, 1.38, -0.05], rot: [0.12, 0, 0.22] },
          // Top Right
          { pos: [0.85, 1.38, -0.05], rot: [0.12, 0, -0.22] },
          // Bottom Left
          { pos: [-0.85, -1.38, -0.05], rot: [-0.12, 0, -0.22] },
          // Bottom Right
          { pos: [0.85, -1.38, -0.05], rot: [-0.12, 0, 0.22] }
        ].map((lug, lIdx) => (
          <group key={`lug-${lIdx}`} position={lug.pos as [number, number, number]} rotation={lug.rot as [number, number, number]}>
            <mesh material={materials.caseMetal} castShadow receiveShadow>
              <boxGeometry args={[0.26, 0.65, 0.32]} />
            </mesh>
            {/* Mirror Chamfer Edge on Lug */}
            <mesh position={[0, 0, 0.16]} material={materials.mirrorBevel}>
              <boxGeometry args={[0.24, 0.62, 0.02]} />
            </mesh>
          </group>
        ))}

        {/* Screwed Precision Crown (3 o'clock position) */}
        <group position={[1.42, 0, 0]}>
          {/* Crown Stem Tube */}
          <mesh rotation={[0, 0, Math.PI / 2]} material={materials.mirrorBevel}>
            <cylinderGeometry args={[0.12, 0.12, 0.14, 24]} />
          </mesh>
          {/* Knurled Grip Crown Head */}
          <mesh position={[0.12, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={materials.caseMetal} castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.18, 24]} />
          </mesh>
          {/* Embossed NOXORA Monogram Medallion on Crown */}
          <mesh position={[0.22, 0, 0]} rotation={[0, Math.PI / 2, 0]} material={materials.goldIndices}>
            <cylinderGeometry args={[0.16, 0.16, 0.02, 24]} />
          </mesh>
        </group>
      </group>

      {/* ================================================================ */}
      {/* 7. SAPPHIRE EXHIBITION CASE BACK                                  */}
      {/* ================================================================ */}
      <group position={[0, 0, -0.22 + caseBackY]}>
        {/* Steel / Gold Case Back Bezel */}
        <mesh material={materials.caseMetal} castShadow receiveShadow>
          <cylinderGeometry args={[1.28, 1.28, 0.06, 64]} />
        </mesh>
        {/* Exhibition Sapphire Window */}
        <mesh position={[0, 0, -0.032]} material={materials.sapphireCrystal}>
          <cylinderGeometry args={[0.96, 0.96, 0.02, 48]} />
        </mesh>
        {/* Caseback Engravings */}
        <mesh position={[0, 0, -0.035]} material={materials.goldIndices}>
          <ringGeometry args={[1.02, 1.22, 48]} />
        </mesh>
      </group>

      {/* ================================================================ */}
      {/* 8. ARTICULATED STRAP / BRACELET LINKS                             */}
      {/* ================================================================ */}
      <group position={[0, 0, -0.05 + strapY]}>
        {/* Top Strap Segment */}
        <group position={[0, 2.1, -0.3]} rotation={[-0.32, 0, 0]}>
          <mesh material={materials.strapMaterial} castShadow>
            <boxGeometry args={[1.22, 1.3, 0.12]} />
          </mesh>
          {/* Saddle Stitching Accent Lines */}
          <mesh position={[-0.52, 0, 0.065]} material={materials.stitchMaterial}>
            <boxGeometry args={[0.025, 1.2, 0.01]} />
          </mesh>
          <mesh position={[0.52, 0, 0.065]} material={materials.stitchMaterial}>
            <boxGeometry args={[0.025, 1.2, 0.01]} />
          </mesh>
        </group>

        {/* Bottom Strap Segment */}
        <group position={[0, -2.1, -0.3]} rotation={[0.32, 0, 0]}>
          <mesh material={materials.strapMaterial} castShadow>
            <boxGeometry args={[1.22, 1.3, 0.12]} />
          </mesh>
          {/* Saddle Stitching Accent Lines */}
          <mesh position={[-0.52, 0, 0.065]} material={materials.stitchMaterial}>
            <boxGeometry args={[0.025, 1.2, 0.01]} />
          </mesh>
          <mesh position={[0.52, 0, 0.065]} material={materials.stitchMaterial}>
            <boxGeometry args={[0.025, 1.2, 0.01]} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
