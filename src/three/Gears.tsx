import React, { useMemo } from 'react';
import * as THREE from 'three';

interface GearsProps {
  metalColor?: string;
  isLuminescentMode?: boolean;
}

// Procedural high-detail toothed gear generator
function createToothedGearGeometry(
  radius: number,
  innerRadius: number,
  teeth: number,
  toothDepth: number,
  spokeCount = 4
): THREE.BufferGeometry {
  const shape = new THREE.Shape();
  const toothAngle = (Math.PI * 2) / teeth;

  for (let i = 0; i < teeth; i++) {
    const angle = i * toothAngle;
    const a1 = angle;
    const a2 = angle + toothAngle * 0.25;
    const a3 = angle + toothAngle * 0.45;
    const a4 = angle + toothAngle * 0.75;
    const a5 = angle + toothAngle;

    const rOuter = radius + toothDepth;
    const rBase = radius;

    if (i === 0) {
      shape.moveTo(Math.cos(a1) * rBase, Math.sin(a1) * rBase);
    }
    shape.lineTo(Math.cos(a2) * rBase, Math.sin(a2) * rBase);
    shape.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
    shape.lineTo(Math.cos(a4) * rOuter, Math.sin(a4) * rOuter);
    shape.lineTo(Math.cos(a5) * rBase, Math.sin(a5) * rBase);
  }

  // Central arbor hole
  const holePath = new THREE.Path();
  holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
  shape.holes.push(holePath);

  // Spoke cutouts
  if (spokeCount > 0 && innerRadius < radius * 0.7) {
    const spokeAngle = (Math.PI * 2) / spokeCount;
    const rMin = innerRadius + 0.04;
    const rMax = radius - 0.04;

    for (let s = 0; s < spokeCount; s++) {
      const startA = s * spokeAngle + 0.15;
      const endA = (s + 1) * spokeAngle - 0.15;
      const cutout = new THREE.Path();
      cutout.absarc(0, 0, rMax, startA, endA, false);
      cutout.absarc(0, 0, rMin, endA, startA, true);
      cutout.closePath();
      shape.holes.push(cutout);
    }
  }

  const extrudeSettings: THREE.ExtrudeGeometryOptions = {
    steps: 1,
    depth: 0.025,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2
  };

  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.center();
  return geom;
}

export const Gears: React.FC<GearsProps> = ({
  metalColor = '#D4AF37',
  isLuminescentMode = false
}) => {
  // Geometries for wheels
  const barrelGeom = useMemo(() => createToothedGearGeometry(0.38, 0.08, 48, 0.03, 5), []);
  const centerGeom = useMemo(() => createToothedGearGeometry(0.3, 0.06, 36, 0.025, 4), []);
  const thirdGeom = useMemo(() => createToothedGearGeometry(0.24, 0.05, 30, 0.02, 4), []);
  const fourthGeom = useMemo(() => createToothedGearGeometry(0.18, 0.04, 24, 0.018, 3), []);
  const escapeGeom = useMemo(() => createToothedGearGeometry(0.14, 0.03, 15, 0.025, 0), []);
  const windingPinionGeom = useMemo(() => createToothedGearGeometry(0.12, 0.03, 18, 0.015, 0), []);

  const materials = useMemo(() => {
    return {
      brassGold: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00E5FF' : metalColor,
        metalness: 0.92,
        roughness: 0.22,
        emissive: isLuminescentMode ? '#003344' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.3 : 0
      }),
      steelGear: new THREE.MeshStandardMaterial({
        color: isLuminescentMode ? '#00FFCC' : '#E0E8F0',
        metalness: 0.95,
        roughness: 0.16,
        emissive: isLuminescentMode ? '#004433' : '#000000',
        emissiveIntensity: isLuminescentMode ? 0.3 : 0
      }),
      polishedPinion: new THREE.MeshStandardMaterial({
        color: '#D0D8E0',
        metalness: 0.98,
        roughness: 0.08
      })
    };
  }, [metalColor, isLuminescentMode]);

  return (
    <group name="GearTrainKinematics">
      {/* 01: Mainspring Barrel */}
      <group position={[0.42, 0.38, 0]}>
        <mesh geometry={barrelGeom} material={materials.brassGold} castShadow receiveShadow />
        <mesh position={[0, 0, 0.03]} material={materials.steelGear}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 24]} />
        </mesh>
      </group>

      {/* 02: Center Wheel */}
      <group position={[0, 0, 0.02]}>
        <mesh geometry={centerGeom} material={materials.brassGold} castShadow receiveShadow />
        <mesh position={[0, 0, 0.02]} material={materials.polishedPinion}>
          <cylinderGeometry args={[0.05, 0.05, 0.03, 20]} />
        </mesh>
      </group>

      {/* 03: Third Wheel */}
      <group position={[-0.26, 0.22, 0.03]}>
        <mesh geometry={thirdGeom} material={materials.brassGold} castShadow receiveShadow />
        <mesh position={[0, 0, 0.02]} material={materials.polishedPinion}>
          <cylinderGeometry args={[0.04, 0.04, 0.025, 18]} />
        </mesh>
      </group>

      {/* 04: Fourth Wheel (Seconds Wheel) */}
      <group position={[-0.24, -0.16, 0.04]}>
        <mesh geometry={fourthGeom} material={materials.brassGold} castShadow receiveShadow />
        <mesh position={[0, 0, 0.02]} material={materials.polishedPinion}>
          <cylinderGeometry args={[0.035, 0.035, 0.025, 16]} />
        </mesh>
      </group>

      {/* 05: Escapement Wheel (Steel) */}
      <group position={[0.02, -0.34, 0.045]}>
        <mesh geometry={escapeGeom} material={materials.steelGear} castShadow receiveShadow />
        <mesh position={[0, 0, 0.02]} material={materials.polishedPinion}>
          <cylinderGeometry args={[0.025, 0.025, 0.02, 14]} />
        </mesh>
      </group>

      {/* 06: Winding & Crown Wheel Pinions */}
      <group position={[0.62, 0.02, 0.015]}>
        <mesh geometry={windingPinionGeom} material={materials.steelGear} castShadow />
      </group>
    </group>
  );
};
