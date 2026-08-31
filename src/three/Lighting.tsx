import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LightingProps {
  scrollProgress: number;
  isLuminescentMode?: boolean;
}

export const Lighting: React.FC<LightingProps> = ({ scrollProgress, isLuminescentMode = false }) => {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const bottomLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);
  const movementSpotRef = useRef<THREE.SpotLight>(null);

  useFrame(() => {
    // 9-Scene Master Lighting Choreography
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
      // SCENE 01 — VOID (0.00 -> 0.08)
      // Almost complete darkness with razor-thin rim light revealing the watch silhouette
      const t = scrollProgress / 0.08;
      ambientIntensity = 0.04 + t * 0.06;
      keyIntensity = 0.15 + t * 0.4;
      rimIntensity = 1.6 + t * 1.0;
      fillIntensity = 0.05 + t * 0.15;
      bottomIntensity = 0.05;
      rimColor.set('#B08D57'); // Gold rim
    } else if (scrollProgress > 0.08 && scrollProgress <= 0.18) {
      // SCENE 02 — FIRST REVEAL (0.08 -> 0.18)
      // Lighting sweeps across metal case, bezel, sapphire crystal, and dial
      const t = (scrollProgress - 0.08) / 0.10;
      ambientIntensity = 0.25;
      keyIntensity = 1.2 + t * 0.6;
      rimIntensity = 2.4;
      fillIntensity = 0.4 + t * 0.3;
      bottomIntensity = 0.2;
      keyColor.set('#FFFFFF');
      rimColor.set('#E8E2D5');
    } else if (scrollProgress > 0.18 && scrollProgress <= 0.30) {
      // SCENE 03 — ORBIT (0.18 -> 0.30)
      // Dynamic lighting moves as camera orbits the case, crown, lugs, side profile
      ambientIntensity = 0.35;
      keyIntensity = 1.8;
      rimIntensity = 2.6;
      fillIntensity = 0.7;
      bottomIntensity = 0.3;
      rimColor.set('#F4EFE6');
    } else if (scrollProgress > 0.30 && scrollProgress <= 0.42) {
      // SCENE 04 — ENTER THE WATCH (0.30 -> 0.42)
      // Concentrated light entering through sapphire crystal into dial
      ambientIntensity = 0.3;
      keyIntensity = 2.2;
      rimIntensity = 2.0;
      fillIntensity = 0.5;
      movementSpotIntensity = 2.0;
      keyColor.set('#E6F0FA'); // Clean crystal sheen
    } else if (scrollProgress > 0.42 && scrollProgress <= 0.56) {
      // SCENE 05 — THE MECHANISM (0.42 -> 0.56)
      // Inside movement: high contrast highlights on jewels, gears, bridges, balance wheel
      ambientIntensity = 0.22;
      keyIntensity = 2.4;
      rimIntensity = 3.2;
      fillIntensity = 0.4;
      movementSpotIntensity = 4.5;
      keyColor.set('#F0F4F8'); // Crisp surgical illumination
      rimColor.set('#D4AF37'); // Warm gold on bridges & balance
    } else if (scrollProgress > 0.56 && scrollProgress <= 0.68) {
      // SCENE 06 — EXPLODED WATCH (0.56 -> 0.68)
      // Multi-directional studio array for floating 3D separated components
      ambientIntensity = 0.4;
      keyIntensity = 2.0;
      rimIntensity = 2.8;
      fillIntensity = 0.8;
      bottomIntensity = 0.4;
      keyColor.set('#FFFFFF');
      rimColor.set('#E5D5BA');
    } else if (scrollProgress > 0.68 && scrollProgress <= 0.78) {
      // SCENE 07 — CRAFTSMANSHIP (0.68 -> 0.78)
      // Warm golden hour artisanal workshop mood
      ambientIntensity = 0.38;
      keyIntensity = 1.9;
      rimIntensity = 2.2;
      fillIntensity = 0.7;
      bottomIntensity = 0.35;
      keyColor.set('#FFF4E0');
      rimColor.set('#D4AF37');
    } else if (scrollProgress > 0.78 && scrollProgress <= 0.88) {
      // SCENE 08 — COLLECTION (0.78 -> 0.88)
      // Broad multi-zone studio lighting illuminating the 3 spatial timepieces
      ambientIntensity = 0.35;
      keyIntensity = 2.2;
      rimIntensity = 2.4;
      fillIntensity = 0.8;
      bottomIntensity = 0.3;
      keyColor.set('#FFFFFF');
      rimColor.set('#E8E0D2');
    } else {
      // SCENE 09 — FINAL HERO (0.88 -> 1.00)
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
