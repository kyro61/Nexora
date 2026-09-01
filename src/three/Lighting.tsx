import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightingProps {
  scrollProgress: number;
  isLuminescentMode?: boolean;
}

export const Lighting: React.FC<LightingProps> = ({
  scrollProgress,
  isLuminescentMode = false
}) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const bottomLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const movementSpotRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    // 10-Chapter Master Lighting Choreography
    let ambientIntensity = 0.3;
    let keyIntensity = 1.2;
    let rimIntensity = 2.0;
    let fillIntensity = 0.5;
    let bottomIntensity = 0.2;
    let movementSpotIntensity = 0.0;

    const keyColor = new THREE.Color('#FFFFFF');
    const rimColor = new THREE.Color('#D6D0C5');
    const fillColor = new THREE.Color('#8F9AA6');

    if (isLuminescentMode) {
      // Super-LumiNova Dark Chamber
      ambientIntensity = 0.04;
      keyIntensity = 0.15;
      rimIntensity = 0.4;
      fillIntensity = 0.05;
      bottomIntensity = 0.02;
      movementSpotIntensity = 0.0;
    } else if (scrollProgress <= 0.08) {
      // CHAPTER 01 — THE VOID (0.00 -> 0.08)
      // Almost complete darkness with razor-thin golden rim light revealing the watch silhouette
      const t = scrollProgress / 0.08;
      ambientIntensity = 0.03 + t * 0.05;
      keyIntensity = 0.12 + t * 0.35;
      rimIntensity = 1.8 + t * 0.8;
      fillIntensity = 0.05 + t * 0.1;
      bottomIntensity = 0.04;
      rimColor.set('#B08D57'); // Gold rim
    } else if (scrollProgress > 0.08 && scrollProgress <= 0.18) {
      // CHAPTER 02 — REVEAL (0.08 -> 0.18)
      // Lighting sweeps across metal case, bezel, sapphire crystal, dial, crown, strap
      const t = (scrollProgress - 0.08) / 0.1;
      ambientIntensity = 0.25;
      keyIntensity = 1.2 + t * 0.6;
      rimIntensity = 2.4;
      fillIntensity = 0.4 + t * 0.3;
      bottomIntensity = 0.2;
      keyColor.set('#FFFFFF');
      rimColor.set('#E8E2D5');
    } else if (scrollProgress > 0.18 && scrollProgress <= 0.30) {
      // CHAPTER 03 — ORBIT (0.18 -> 0.30)
      // Side profile, crown, lugs, bezel thickness, crystal, strap connection
      ambientIntensity = 0.35;
      keyIntensity = 1.8;
      rimIntensity = 2.6;
      fillIntensity = 0.7;
      bottomIntensity = 0.3;
      rimColor.set('#F4EFE6');
    } else if (scrollProgress > 0.30 && scrollProgress <= 0.42) {
      // CHAPTER 04 — ENTER THE WATCH (0.30 -> 0.42)
      // Concentrated light entering through sapphire crystal into dial
      ambientIntensity = 0.3;
      keyIntensity = 2.2;
      rimIntensity = 2.0;
      fillIntensity = 0.5;
      movementSpotIntensity = 2.5;
      keyColor.set('#E6F0FA'); // Clean crystal sheen
    } else if (scrollProgress > 0.42 && scrollProgress <= 0.55) {
      // CHAPTER 05 — INSIDE THE MOVEMENT (0.42 -> 0.55)
      // Inside movement: high contrast highlights on jewels, gears, bridges, balance wheel
      ambientIntensity = 0.22;
      keyIntensity = 2.5;
      rimIntensity = 3.2;
      fillIntensity = 0.4;
      movementSpotIntensity = 4.5;
      keyColor.set('#F0F4F8'); // Crisp surgical illumination
      rimColor.set('#D4AF37'); // Warm gold on bridges & balance
    } else if (scrollProgress > 0.55 && scrollProgress <= 0.62) {
      // CHAPTER 06 — MACRO JOURNEY (0.55 -> 0.62)
      // Microscopic component highlights
      ambientIntensity = 0.26;
      keyIntensity = 2.6;
      rimIntensity = 3.0;
      fillIntensity = 0.5;
      movementSpotIntensity = 4.0;
      keyColor.set('#FFFFFF');
      rimColor.set('#E8D8B8');
    } else if (scrollProgress > 0.62 && scrollProgress <= 0.72) {
      // CHAPTER 07 — EXPLODED VIEW (0.62 -> 0.72)
      // Multi-directional studio array for floating 3D separated components
      ambientIntensity = 0.4;
      keyIntensity = 2.2;
      rimIntensity = 2.8;
      fillIntensity = 0.8;
      bottomIntensity = 0.4;
      keyColor.set('#FFFFFF');
      rimColor.set('#E5D5BA');
    } else if (scrollProgress > 0.72 && scrollProgress <= 0.80) {
      // CHAPTER 08 — RECONSTRUCTION (0.72 -> 0.80)
      // Warm golden hour artisanal workshop mood ("CRAFTED BY HAND")
      ambientIntensity = 0.38;
      keyIntensity = 2.0;
      rimIntensity = 2.4;
      fillIntensity = 0.7;
      bottomIntensity = 0.35;
      keyColor.set('#FFF2DC');
      rimColor.set('#D4AF37');
    } else if (scrollProgress > 0.80 && scrollProgress <= 0.90) {
      // CHAPTER 09 — COLLECTION (0.80 -> 0.90)
      // Broad multi-zone studio lighting illuminating the 4 spatial timepieces
      ambientIntensity = 0.35;
      keyIntensity = 2.2;
      rimIntensity = 2.4;
      fillIntensity = 0.8;
      bottomIntensity = 0.3;
      keyColor.set('#FFFFFF');
      rimColor.set('#E8E0D2');
    } else {
      // CHAPTER 10 — FINAL HERO (0.90 -> 1.00)
      // Iconic high-contrast luxury commercial finale
      ambientIntensity = 0.28;
      keyIntensity = 2.2;
      rimIntensity = 3.0;
      fillIntensity = 0.6;
      bottomIntensity = 0.25;
      keyColor.set('#FFFFFF');
      rimColor.set('#D6D0C5');
    }

    if (ambientLightRef.current) ambientLightRef.current.intensity = ambientIntensity;
    if (keyLightRef.current) {
      keyLightRef.current.intensity = keyIntensity;
      keyLightRef.current.color.copy(keyColor);
    }
    if (rimLightRef.current) {
      rimLightRef.current.intensity = rimIntensity;
      rimLightRef.current.color.copy(rimColor);
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = fillIntensity;
      fillLightRef.current.color.copy(fillColor);
    }
    if (bottomLightRef.current) bottomLightRef.current.intensity = bottomIntensity;
    if (movementSpotRef.current) movementSpotRef.current.intensity = movementSpotIntensity;
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.3} color="#FFFFFF" />

      {/* Main Studio Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[4.5, 6.0, 4.5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Razor Edge Rim Light for Luxury Metal Specular Highlights */}
      <directionalLight
        ref={rimLightRef}
        position={[-5.0, 4.5, -4.5]}
        intensity={2.2}
      />

      {/* Soft Fill Light */}
      <directionalLight
        ref={fillLightRef}
        position={[-4.0, -2.0, 4.0]}
        intensity={0.6}
        color="#8F9AA6"
      />

      {/* Studio Reflector Underglow */}
      <directionalLight
        ref={bottomLightRef}
        position={[0, -5.0, 2.0]}
        intensity={0.3}
        color="#332B20"
      />

      {/* Movement Macro Spotlight */}
      <spotLight
        ref={movementSpotRef}
        position={[0, 3.5, 2.0]}
        target-position={[0, 0, 0]}
        angle={0.4}
        penumbra={0.7}
        intensity={0}
        color="#FFF4DC"
      />
    </>
  );
};
