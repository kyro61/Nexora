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
    // Phase 1 (0.0 - 0.15): Mysterious silhouette, faint atmospheric rim
    // Phase 2 (0.15 - 0.45): High-end studio lighting revealing metallic brushing & crystal
    // Phase 3 (0.45 - 0.72): Technical movement illumination (sharp highlights on jewels & gears)
    // Phase 4 (0.72 - 0.88): Warm golden craftsmanship lighting
    // Phase 5 (0.88 - 1.0): Iconic high-contrast dark studio finale

    let ambientIntensity = 0.4;
    let keyIntensity = 1.2;
    let rimIntensity = 2.0;
    let fillIntensity = 0.6;
    let movementSpotIntensity = 0.0;
    const keyColor = new THREE.Color('#FFFFFF');
    const rimColor = new THREE.Color('#D6D0C5');

    if (isLuminescentMode) {
      ambientIntensity = 0.05;
      keyIntensity = 0.2;
      rimIntensity = 0.5;
      fillIntensity = 0.1;
      movementSpotIntensity = 0.0;
    } else if (scrollProgress < 0.15) {
      // Intro silhouette
      const t = scrollProgress / 0.15;
      ambientIntensity = 0.08 + t * 0.2;
      keyIntensity = 0.3 + t * 1.0;
      rimIntensity = 1.2 + t * 1.5;
      fillIntensity = 0.1 + t * 0.4;
    } else if (scrollProgress >= 0.15 && scrollProgress < 0.45) {
      // Case and dial reveal
      ambientIntensity = 0.35;
      keyIntensity = 1.6;
      rimIntensity = 2.4;
      fillIntensity = 0.8;
      rimColor.set('#E8E2D5');
    } else if (scrollProgress >= 0.45 && scrollProgress < 0.72) {
      // Disassembly & Movement micro-details
      ambientIntensity = 0.25;
      keyIntensity = 2.2;
      rimIntensity = 3.0;
      fillIntensity = 0.5;
      movementSpotIntensity = 3.5;
      keyColor.set('#F0F4F8'); // Crisp surgical illumination for gears & jewels
      rimColor.set('#B08D57'); // Gold warmth on bridges
    } else if (scrollProgress >= 0.72 && scrollProgress < 0.88) {
      // Craftsmanship warm golden hour
      ambientIntensity = 0.4;
      keyIntensity = 1.8;
      rimIntensity = 2.2;
      fillIntensity = 0.7;
      keyColor.set('#FFF6E5');
      rimColor.set('#D4AF37');
    } else {
      // Final hero shot
      ambientIntensity = 0.3;
      keyIntensity = 2.0;
      rimIntensity = 2.8;
      fillIntensity = 0.6;
      rimColor.set('#E6D3B3');
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
    if (fillLightRef.current) fillLightRef.current.intensity = fillIntensity;
    if (movementSpotRef.current) movementSpotRef.current.intensity = movementSpotIntensity;
    if (bottomLightRef.current) bottomLightRef.current.intensity = isLuminescentMode ? 0.05 : 0.3;
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0.3} color="#ffffff" />
      
      {/* Studio Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[4, 6, 4]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Razor Rim Light for Metal Bevels */}
      <directionalLight
        ref={rimLightRef}
        position={[-5, 4, -4]}
        intensity={2.2}
      />

      {/* Soft Fill Light */}
      <directionalLight
        ref={fillLightRef}
        position={[-4, -2, 4]}
        intensity={0.6}
        color="#8F9AA6"
      />

      {/* Under-Glow Reflector Light */}
      <directionalLight
        ref={bottomLightRef}
        position={[0, -5, 2]}
        intensity={0.3}
        color="#332B20"
      />

      {/* Macro Movement Focus Spotlight */}
      <spotLight
        ref={movementSpotRef}
        position={[0, 3, 2]}
        target-position={[0, 0, 0]}
        angle={0.45}
        penumbra={0.8}
        intensity={0}
        color="#FFEAC2"
      />
    </>
  );
};
